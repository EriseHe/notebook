
## Problem Formulation

We consider a sequence of linear systems

$$
\mathbf{A}^{(t)}\mathbf{u}^{(t)}=\mathbf{f}^{(t)}, \qquad t = 1,2,\dots,T,
$$

where each $\mathbf A^{(t)} \in \mathbb{R}^{n\times n}$ is large and sparse. For the following work, the parenthesized superscript $(t)$ denotes the *problem-instance index* in the sequence.  
We use this notation to distinguish instance-level variation from other structural indices that arise later, such as multigrid levels, cycle counters, or parameter coordinates.

For a single instance $(\mathbf{A^{(t)}},\mathbf{f^{(t)}})$, we focus on the use of $\BoomerAMG$ as a configurable procedure parameterized by $\boldsymbol{\theta}^{(t)} \in \mathbf\Theta$ where

$$
\mathbf\Theta= \mathbf\Theta_{\mathrm{setup}} \times  \mathbf\Theta_{\mathrm{solve}}
$$

is divided into two independent configuration spaces of $\BoomerAMG$. This formulation is intentionally general to accommodate later phase-specific usage for one-shot instance-level decisions and within-instance adaptive decisions. For this paper, the specific setup-phase multi-parameters $\boldsymbol{\theta}_{\mathrm{setup}}$ used for hierarchy construction and the solve-phase $\boldsymbol{\theta}_{\mathrm{solve}}$ used during the solve are summarized in Table~\ref{tab:boomeramg-params}.

### Costs, and objectives

**Table.** Representative $\BoomerAMG$ parameters considered in this work, grouped into setup-phase and solve-phase controls. Here, $r$ denotes a real-valued parameter, $i$ an integer-valued parameter, and $c$ a categorical parameter.  

**Cost.**  
Given an instance $(\mathbf{A}^{(t)},\mathbf{f}^{(t)})$ and a solver configuration $\boldsymbol{\theta}^{(t)}$, $\BoomerAMG$ induces a computational cost. In this work, we consider two solver-relevant performance metrics: the measured wall-clock runtime $T_{\mathrm{wall}}^{(t)}$, and a machine-agnostic surrogate for setup-solve work cost. We report wall-clock time as the primary external performance metric, and use the structural surrogate as one lower-variance learning signal. Wall-clock time can vary substantially due to hardware effects, communication overhead, and other sources of system noise; to obtain a more stable signal for learning, we therefore use a hierarchy-based proxy that reflects the dominant arithmetic work of a V-cycle while abstracting away machine-dependent variability.

In particular, for setup-phase, we model the cost of entire algorithm by working units as the surrogate, which provides a deterministic way to evaluate BoomerAMG hierchery.

**Objective.**  
Our goal is to select configurations across the sequence so as to minimize cumulative cost:

$$
\min \sum_{t=1}^{T} T_{wall^{(t)}\bigl(\theta^{(t)}\bigr).
$$

In the online setting, the choice of $\theta^{(t)}$ may depend only on information available before solving instance $t$, such as summary features of the current system and the performance observed on previous instances. This sequential decision viewpoint provides a common abstraction for both contextual bandit methods for setup control and reinforcement-learning-based methods for solve-phase control.

**Context (instance features).**  
For each instance $t$, we define a context vector

$$
s_t \coloneqq \Phi(\mathbf{A}^{(t)}) \in \mathcal{S},
$$

where $\Phi$ includes matrix-derived features (e.g., measures of anisotropy, coefficient variation, sparsity statistics, or stencil proxies). We assume $\Phi$ is computationally cheap relative to a full solve and does not require additional expensive matrix computations beyond what is already available in the application stack.

### Mixed-type action space

The configuration space $\Theta$ for BoomerAMG includes categorical, integer, and continuous parameters controlling hierarchy construction and V-cycle behavior. We partition

$$
\Theta^{(t)}= \Theta^{(t)}_{\text{setup}} \times \Theta^{(t)}_{\text{solve}}\in \mathcal{A},
$$

corresponding to parameters chosen once per instance (setup) and parameters adapted across V-cycles (solve). Specifically, the main parameters in BoomerAMG available to tune are listed in the table below:

### Costs, comparators, and online objective

Given a set of parameter choice $(\theta^{(t)}_{1}, \theta^{(t)}_{2},...) \in \Theta^{(t)}$ for instance $t$, running the solver induces a realized cost

$$
\ell_t(\theta^{(t)}_i) \in \mathbb{R}_{+},
$$

which correspond to a solver-native work proxy as a surrogate for wall-time. We assume bandit feedback: at time $t$ we only observe $\ell_t(\theta_t)$ for the chosen $\theta_t$, not the costs of other configurations. AMG must balance the effectiveness of smoothing against the complexity of coarse-grid correction---a ``multigrid seesaw'' in which improving one component can deteriorate the other \citep{stuben2001algebraic}. Because coarse-grid operators are typically formed algebraically via the Galerkin product, operator complexity can grow on coarser levels, increasing stencil density and communication cost in parallel settings \citep{desterck2006reducing}.

Aggressive coarsening or thresholding may reduce hierarchy size and memory footprint, but it often degrades convergence; restoring convergence typically requires longer-range interpolation or stronger smoothing, which in turn increases setup cost and per-cycle work \citep{desterck2006reducing,yang2010long}. This tension is amplified on modern architectures, where highly effective sequential smoothers are replaced by more parallel-friendly variants whose performance is sensitive to partitioning and off-processor communication \citep{baker2011multigrid}. As a result, default heuristics that work well for simpler problems can perform poorly (or incur excessive complexity) for 3D unstructured meshes and heterogeneous couplings, making AMG performance deeply instance-dependent \citep{caldana2024deep}.

## Setup Phase: Bandits

Once BoomerAMG tuning is cast as learning over a mixed-type, phase-coupled control space, the central issue is what mathematical structure can be imposed on that space without misrepresenting the solver. The following three questions are therefore decisive. First, how should one represent an action space that contains both categorical algorithmic choices and numerical tuning variables, when the former may induce discontinuous changes in the hierarchy while the latter are often meaningful only conditionally on those choices? Second, which interactions are weak enough to approximate, and which are so strong that the corresponding variables must be modeled jointly, since freezing one block can systematically distort the ranking of another? Third, in the absence of a closed-form optimal BoomerAMG policy. These questions are prior to algorithm choice, and determine whether a contextual linear model is interpretable, whether a hierarchical search strategy is principled rather than ad hoc, and whether any subsequent guarantee concerns a mathematically meaningful notion of near-optimality.

Our approach is based on the observation that the BoomerAMG loss landscape is best viewed as a stratified family of local models rather than a single globally regular surface. Writing the action as $u=(b,z)$, with $b\in\mathcal B$ the categorical branch and $z\in\mathcal Z_b$ the associated branch-valid numerical parameters, we define

$$
\ell_t(u)=\ell_t(b,z), \qquad \mathcal U=\bigsqcup_{b\in\mathcal B}(\{b\}\times\mathcal Z_b).
$$

This decomposition explicitly acknowledges that categorical choices such as coarsening and interpolation type induce discontinuous changes in the hierarchy construction and therefore should not be embedded as scalar coordinates in a smooth parametric model. Smoothness, when present, is assumed only locally within $\mathcal Z_b$, not across distinct branches. Moreover, because setup parameters interact nontrivially, we do not impose a separable ansatz of the form $\ell_t(b,z)=g_t(b)+h_t(z)$; instead, the principal hierarchy-construction variables are tuned jointly within branch-specific blocks. In this way, the learning problem becomes one of identifying both a favorable branch $b$ and an effective local configuration $z$, subject to the solver's admissibility constraints. Since no closed-form globally optimal BoomerAMG policy is available, performance is measured relative to the best policy in a prescribed comparator class, rather than an unattainable absolute oracle. This yields a scientifically meaningful notion of learning while preserving the end-to-end computational perspective required in practical AMG tuning.

We first learn a setup selector mapping contexts to setup configurations. Let $\mathcal{U}\subseteq\Theta_{\text{setup}}$ be a finite candidate set of admissible setup configurations (``arms''). A contextual bandit policy chooses $u_t \in \mathcal{U}$ given $s_t$, observes a realized loss, and updates online.

**Bandit algorithm.**

### LinUCB for Setup-phase Selection

\label{sec:setup_linucb}

\citet{khodak2024learning} demonstrates that online bandits can tune classical iterative methods such as SOR with strong theoretical guarantees. A flat finite-arm bandit works well enough because (i) single-parameter tuning can be reduced to a small discrete action set, (ii) they wanted robust guarantees with minimal modeling assumptions, and (iii) the compute cost makes exploration feasible.

However, their analysis leverages solver-specific structure, notably explicit spectral dependence and unimodality of the optimal relaxation parameter, that is unavailable in AMG. In contrast, the hierarchy construction, discrete branching logic, and multilevel interactions in $\BoomerAMG$ preclude a clean closed-form characterization (e.g., an explicit spectral-radius formula) of performance as a function of tuning parameters. Although $\BoomerAMG$ lacks explicit analytic structure, its *observed performance* (e.g., work per cycle and residual reduction) often varies *smoothly* with respect to both (i) problem features extracted from the input matrix and (ii) setup parameter choices. Intuitively, a good setup captures salient physical structure of the operator (e.g., anisotropy), yielding a hierarchy that makes the subsequent solve phase substantially easier. This suggests learning a mapping from *matrix context* to *effective hierarchy-construction choices*, rather than treating each configuration as an independent arm in a combinatorial search.

**Why not independent-arm bandits or Chebyshev surrogates?**  
A direct discretization of $\mathcal{S}$ leads to a prohibitive number of arms, making independent-arm algorithms (e.g., Tsallis-INF) sample-inefficient under mixed-type, multi-parameter tuning. Moreover, unlike SOR where the dependence of $\omega^\star$ on a scalar shift admits specialized approximation (e.g., Chebyshev-based contextual bandits), AMG setup lacks a known one-dimensional structure or an analytic optimum that would justify such specialized surrogates. We therefore seek a *shared* model that generalizes across actions via a learnable functional dependence on $(c_t,s)$.

**Linear realizability as a learnability assumption.**  
We posit that the *expected* work-aware cost is approximately predictable from a feature embedding $\phi(c,s)\in\mathbb{R}^d$:

$$
\mathbb{E}\!\left[\mathrm{WU}_t(s)\mid c_t\right]
\;\approx\;
\theta^\top \phi(c_t,s),
$$

for some unknown parameter vector $\theta\in\mathbb{R}^d$. The feature map $\phi(c,s)$ can encode mixed-type actions by combining (i) scaled continuous coordinates, (ii) one-hot encodings for categorical variants, and (iii) interaction terms with context features, enabling generalization across the mixed configuration space without enumerating arms.

**LinUCB for mixed-type setup selection.**  
Under $\eqref{eq:lin_model}$, setup tuning becomes a *contextual bandit* problem: given $c_t$, choose $s_t$ to minimize the realized work-aware cost. We adopt LinUCB to balance exploration and exploitation by maintaining a ridge-regression estimate $\hat{\theta}_t$ and an uncertainty radius. Concretely, let

$$
V_t = \lambda I + \sum_{\tau=1}^{t-1} \phi(c_\tau,s_\tau)\phi(c_\tau,s_\tau)^\top,
\qquad
\hat{\theta}_t = V_t^{-1}\sum_{\tau=1}^{t-1}\phi(c_\tau,s_\tau)\,\mathrm{WU}_\tau(s_\tau),
$$

with regularization $\lambda>0$. For each candidate setup action $s\in\mathcal{S}$ at instance $t$, LinUCB forms an optimistic estimate (for minimization) via

$$
\mathrm{LCB}_t(s)
=
\hat{\theta}_t^\top \phi(c_t,s)
-
\alpha_t\sqrt{\phi(c_t,s)^\top V_t^{-1}\phi(c_t,s)},
$$

and selects

$$
s_t \in \arg\min_{s\in\mathcal{S}} \mathrm{LCB}_t(s).
$$

This approach explicitly addresses the mixed-type, multi-parameter nature of AMG setup: rather than exploring an exponential number of discrete arms, LinUCB learns a shared low-dimensional surrogate over $(c,s)$ and refines it online from solver-native feedback.

**Smoothness-based guarantees without explicit spectral formulas.**  
The appeal of $\eqref{eq:lin_model}$ is that it does not require an explicit spectral-radius characterization of AMG convergence. Instead, it assumes that solver performance is *learnable* from context-action features. Under standard linear contextual bandit assumptions (bounded features, sub-Gaussian noise, and realizability), LinUCB achieves sublinear regret of order $\tilde{O}(d\sqrt{T})$, implying convergence to the best context-dependent setup policy in hindsight. More generally, if the mapping $(c,s)\mapsto \mathbb{E}[\mathrm{WU}_t(s)\mid c]$ lies in an RKHS with bounded norm, kernelized UCB yields analogous sublinear regret bounds, and eluder-dimension arguments provide guarantees for broader function classes (e.g., generalized linear or neural bandits). In this work, we use LinUCB as a principled and scalable instantiation (equivalently, kernelized UCB with a linear kernel), and treat richer function classes as a natural extension when linear features are insufficient.

From a scientific-computing perspective, the contextual-bandit view formalizes the common heuristic intuition that setup should adapt to operator structure: for example, anisotropy-related features in $c_t$ may favor stronger connections or more aggressive coarsening/interpolation choices. Our approach aims to learn such relationships directly from solver-native cost feedback, enabling sample-efficient online adaptation of BoomerAMG setup parameters over streams of linear systems.

Using the setup loss in Eq.~\eqref{eq:wu_loss}, we instantiate a contextual UCB policy (in loss-minimization form) to choose $u_t \in \mathcal{U}$ from context $s_t$.

**From UCB to LCB (loss form).**  
Classical UCB for rewards selects

$$
a_t=\arg\max_{a}\left(\widehat{\mu}_{a,t}+\beta_t\,\mathrm{rad}_{a,t}\right).
$$

For loss minimization, the equivalent optimistic rule is

$$
a_t=\arg\min_{a}\left(\widehat{\ell}_{a,t}-\beta_t\,\mathrm{rad}_{a,t}\right),
$$

which balances low predicted loss and high uncertainty.

**Disjoint LinUCB model.**  
Let $\phi_t=\Psi(s_t)\in\mathbb{R}^{d}$ be setup features for instance $t$. For each arm $u\in\mathcal{U}$, assume

$$
\mathbb{E}\!\left[\ell_t^{\mathrm{WU}}(u)\mid s_t\right]\approx \phi_t^\top \theta_u .
$$

With ridge parameter $\lambda>0$, maintain

$$
A_{u,t}=\lambda I+\!\!\sum_{\tau<t:\,u_\tau=u}\!\!\phi_\tau\phi_\tau^\top,\quad
b_{u,t}=\!\!\sum_{\tau<t:\,u_\tau=u}\!\!\ell_\tau\,\phi_\tau,\quad
\widehat{\theta}_{u,t}=A_{u,t}^{-1}b_{u,t},
$$

where $\ell_\tau=\ell_\tau^{\mathrm{WU}}(u_\tau)$. The arm-selection rule is

$$
u_t=\arg\min_{u\in\mathcal{U}}
\left(
\phi_t^\top\widehat{\theta}_{u,t}
-\alpha_t\sqrt{\phi_t^\top A_{u,t}^{-1}\phi_t}
\right).
$$

After observing $\ell_t$, only the selected arm is updated:

$$
A_{u_t,t+1}=A_{u_t,t}+\phi_t\phi_t^\top,\qquad
b_{u_t,t+1}=b_{u_t,t}+\ell_t\,\phi_t.
$$

**Instantiation in this project.**  
`\texttt{LinUCB\_AMG.py}` and `\texttt{LinUCB\_AMG\_v2.py}` implement the disjoint per-arm formulation above with $A_{u,1}=\lambda I$, Sherman--Morrison inverse updates, and random tie-breaking among equal LCB scores. `\texttt{LinUCB\_AMG.py}` uses constant exploration $\alpha_t\equiv\alpha$, while `\texttt{LinUCB\_AMG\_v2.py}` adds optional decay $\alpha_t=\alpha/\sqrt{t+1}$ (internal zero-based counter). In our setup stream, $\phi_t=[1,s_{1,t},s_{2,t},s_{3,t},c_{\mathrm{diag},t}]^\top$, and each arm is a BoomerAMG setup tuple from a finite Cartesian grid (e.g., `\texttt{strong\_threshold}`, `\texttt{coarsen\_type}`, `\texttt{interp\_type}`, or `\texttt{max\_row\_sum}/\texttt{trunc\_factor}`).