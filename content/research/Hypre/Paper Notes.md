---
title: "Paper Notes"
---


# Abstract

Algebraic multigrid (AMG) solvers are widely used for large sparse systems $\mathbf{Au}=\mathbf{f}$, yet their performance is highly sensitive to hard-to-tune parameters that rely on heuristic selection. Online learning has recently proven effective for tuning simple iterative solvers, such as SOR, but extending these methods to AMG is challenging due to hierarchy-dependent costs and complex parameter configuration spaces. In this work, we propose a *hierarchical bandit-reinforcement learning framework* that exploits the setup-solve structure of HYPRE’s BoomerAMG to enable adaptive multi-parameter tuning across linear systems. For $\textit{setup}$, we cast a Shared Linear Upper Confidence Bound (LinUCB) bandit, using an AMG-native work-unit loss, and prove its asymptotic behaviors to [achieve the best instance-optimal policy]; for $\textit{solve}$, we define a cycle-based MDP from residual reduction signals and train a PPO policy to update multi-parameters online at each iteration. Our experiments demonstrate consistent time-to-solution improvements over default configurations and Gaussian-process-based tuners, showing that bandits-RL online learning provides an effective approach to automating multigrid parameter selection. 

# Introduction

Large-scale simulation, optimization, and inverse problems often *repeatedly* reduce to solving sparse linear systems $Au=f$, especially those arising from discretization of time-dependent partial differential equations. The dominant computational cost is no longer [(less often?)] a single hard solve, but the \emph{aggregate} time-to-solution over a long stream of related (but not identical) heterogeneous systems. Hence, there has been an increasing urge to accelerate this process in wide range of science and engineering application. 

Algebraic multigrid (AMG) methods, one of the [most popular] iterative solver and preconditionor, sit at the center of this workflow due to their efficiency and scalability in extremely large problems. However, the practical performance of AMG in production is famously [fragile(is this really true? or should we say it is parameter-dependent? but its kinda repetitive to say that. I meant to say something that it is very sensitive, and depedent]. That is, two matrices with the same size and sparsity can exhibit dramatically different convergence and setup behavior under varying parameter settings. Solving with AMG often involves meticulous selection over a [large (maybes its too strong to say? what is the right word)] number of mixed-typed parameters. While many selection methods has been developed over the years, an explicit relations between AMG parameters and runtime performance remains unknown. Finding a set of near-optimal multi-parameter for a specific sets of problem therefore rely heavily on heuristics and empirical observations. This forces practitioners into a recurring, expensive loop of trial-and-error tuning that is unscalable in modern scientific computing pipelines.

In this paper, we develop a machine learning tuning framework for BoomerAMG, one of most commonly used parellel algebraic multigrid solver developed by hypre. A major reason tuning persists is that AMG is not a single algorithm but a \emph{family} of interacting design choices. 


















at the same time, the black-box nature o AMG does not imply arbitrariness. 

At the same time, the black-box nature of AMG does not imply arbitrariness. Practitioners know---often painfully---that solver behavior is patterned: families of problems induce recurring ``regimes'' (e.g., strongly anisotropic diffusion, variable coefficients, near-incompressibility, high-contrast materials), and within each regime there are parameter ranges that reliably produce efficient hierarchies. This observation motivates a different question: can we learn how to choose AMG setup parameters from experience, online, as we process a stream of linear systems---using only cheap, computable signals---while still retaining principled performance guarantees?

This paper answers this question for the multi-parameter setup tuning of BoomerAMG by reframing tuning as a \emph{contextual bandit} problem with a solver-native cost model. The core challenge is combinatorial: if we discretize each setup knob and treat each parameter combination as an independent ``arm,'' the action space explodes, and flat bandit algorithms become sample-inefficient. The key idea we adopt is to \emph{share statistical strength across configurations} using a feature-based model: rather than learning each parameter combination separately, we learn a predictive mapping from (i) problem/hierarchy descriptors and (ii) candidate parameter settings to expected solver cost.

Concretely, we consider a sequence of instances $\{(\mathbf{A}_t,\mathbf{b}_t)\}_{t=1}^T$. On each round $t$, we observe a context vector $c_t$ consisting of inexpensive descriptors (e.g., matrix sparsity statistics, diagonal-dominance proxies, and/or light-weight hierarchy summaries). We then choose a setup configuration $s_t$ (a vector containing continuous and discrete BoomerAMG setup parameters) and execute BoomerAMG under that configuration to obtain a measurable cost. Because AMG setup decisions trade off hierarchy complexity against convergence, we evaluate configurations using a solver-native proxy for time-to-solution based on \emph{work units}:
\ma$$thrm{WU}_t(s)\;\approx\;
\underbrace{k_t(s)}_{\#\text{ cycles to converge}}
\cdot
\underbrace{\mathrm{WU}_{\text{cycle},t}(s)}_{\text{relative work per cycle}},
$$
where $\mathrm{WU}_{\text{cycle},t}(s)$ is estimated from level-wise operator/interpolation complexities (e.g., normalized sums of $\nnz(A_\ell)$ and $\nnz(P_\ell)$ weighted by relaxation sweeps). This choice makes the feedback \emph{AMG-native}: it penalizes both ``slow convergence'' and ``overly expensive hierarchies,'' aligning the learning objective with practical runtime rather than a single surrogate such as iteration count.

To learn from these observations efficiently in a high-dimensional tuning space, we use a \emph{contextual linear bandit} approach (LinUCB and linear Thompson sampling variants) built on a feature map $\phi(c,s)$ that encodes not only the raw context and parameter values, but also their interactions. In other words, we do not assume that AMG performance is linear in the hyperparameters themselves; rather, we assume it is well-approximated by a linear model in a sufficiently expressive feature representation:
$$
\mathbb{E}\!\left[\mathrm{WU}_t(s)\mid c_t\right]\approx \theta^\top \phi(c_t,s).
$$
This framing provides the practical benefit we need---generalization across configurations---while keeping computation scalable to thousands of instances and enabling regret guarantees of the standard form ``best in hindsight within the model class,'' without requiring explicit spectral formulas for BoomerAMG.

The resulting system has a clean operational interpretation: as the solver processes more instances, it accumulates evidence about which parameter patterns work in which regimes (as summarized by $c_t$), then uses optimism (UCB) to balance exploration and exploitation. Early on, it explores multiple setups to learn the mapping; later, it concentrates on configurations predicted to minimize work. Importantly, this learning happens \emph{online}: the tuning policy adapts as new instances arrive, and it does so using only quantities already natural to the AMG pipeline.

Contribution






A natural response to BoomerAMG parameter sensitivity is to treat tuning as a global optimization problem, but this view contributes limitedly to BoomerAMG in two respects. First, the parameter space is high-dimensional, mixed-type, and expensive to evaluate, so monolithic probabilistic optimization becomes increasingly costly as the number of tunable parameters and solver calls grows. Second, such formulations ignore the fact that BoomerAMG exposes feedback at different stages of execution. In particular, solve-phase decisions are made repeatedly over multigrid cycles, and each choice influences the subsequent residual trajectory and future work. This makes solve tuning fundamentally a sequential control problem rather than a one-shot parameter search, which naturally motivates reinforcement learning.

At the same time, not all BoomerAMG decisions have the same temporal structure. Setup choices are made once per instance, before the hierarchy is applied, and must adapt across a stream of changing matrices; solve choices are made repeatedly within a fixed hierarchy and can exploit cycle-level feedback such as residual norms and recent reduction factors. We therefore view BoomerAMG tuning through a unified decision-theoretic lens with two horizons: a long-horizon sequential problem in the solve phase and a one-step, instance-level decision problem in the setup phase. The latter is naturally modeled by online bandit learning---or, when matrix features are incorporated explicitly, by contextual bandits---while the former is modeled by reinforcement learning. This yields a phase-aware framework in which setup and solve are learned differently, but for the same underlying reason: they are distinct feedback-driven decision problems.

% --- Paragraph 5 (merged): Brief gap + key observation + framework preview (bandits + RL) ---
Despite substantial prior work on multigrid parameter selection, performance modeling, and data-driven parameter optimization, existing approaches only address the difficulty of tuning BoomerAMG over a \emph{sequence-of-systems} in parts [need citations \citep{gahvari2011modeling,caldana2024deep}?]. 

# Related Work

\paragraph{Heuristic and expert-designed AMG tuning.}
Algebraic multigrid has long relied on carefully engineered heuristics for strength-of-connection, coarse/fine splitting, interpolation, truncation, and smoothing; see the classical AMG literature and standard reviews \citep{ruge1987algebraic,stuben2001review}. In particular, BoomerAMG exposes a rich collection of such design choices in a parallel production solver, including multiple coarsening, interpolation, and relaxation variants \citep{henson2002boomeramg,hypre_boomeramg_docs}. While these heuristics make AMG broadly effective, they also leave practical performance highly sensitive to problem-dependent parameter choices. A long-standing theme in the AMG literature is therefore that practical performance depends strongly on tuning hierarchy-construction heuristics rather than on a single universally optimal configuration. As a result, users typically rely on expert defaults, manual tuning, and benchmark-specific rules of thumb rather than on closed-form prescriptions.

\paragraph{Performance modeling and work-aware views of AMG.}
A second line of work studies AMG performance through analytical and empirical cost models. These works emphasize that practical efficiency depends not only on asymptotic convergence, but also on hierarchy complexity, communication, memory traffic, and coarse-grid bottlenecks \citep{gahvari2011modeling,baker2014preparing,gahvari2014hybrid}. For BoomerAMG in particular, performance models show that setup decisions can strongly affect both operator complexity and downstream cycle cost, so iteration count alone is often an incomplete objective \citep{gahvari2011modeling}. This perspective directly motivates work-aware tuning criteria for online learning: a useful signal must reflect both hierarchy construction and the cost of applying that hierarchy.

\paragraph{Offline autotuning, surrogate optimization, and learned parameter predictors.}
Recent work has increasingly treated AMG parameter selection as an offline black-box optimization problem. In the broader autotuning literature, Bayesian optimization and Gaussian-process surrogates are standard tools for expensive configuration search \citep{morita2022bo,gptune_general}. AMG-specific examples include deep-learning-based strong-threshold prediction \citep{zou2023autoamg,caldana2024deep}, joint prediction of threshold and smoother choices \citep{antonietti2025annamg}, and Gaussian-process-based parameter prediction for selected PDE families \citep{zhang2025kernel}. These approaches provide evidence that AMG parameters are learnable from matrix data, but they are predominantly \emph{offline} and often \emph{problem-family-specific}: they rely on pretraining or surrogate fitting over a fixed workload, and they do not directly address online adaptation over streams of systems using solver-native feedback.

\paragraph{Learning AMG components rather than tuning exposed parameters.}
A related literature uses machine learning to redesign parts of multigrid itself, for example by learning prolongation operators or coarsening rules \citep{greenfeld2019learning,luz2020learning,taghibakhshi2021optimization}. These works show that data-driven models can capture nontrivial structure in hierarchy design, often improving convergence relative to classical heuristics. However, they usually target the synthesis of new multigrid components rather than the online tuning of a production solver's existing parameter interface, and they typically require substantial offline training. Our focus is complementary: we retain BoomerAMG as a black-box industrial solver and ask how to adapt its exposed setup and solve parameters online.

\paragraph{Online learning for iterative solvers: bandits and reinforcement learning.}
The closest prior work in spirit is \citet{khodak2024learning}, who show that bandit algorithms can tune the relaxation parameter of SOR across a sequence of linear systems and asymptotically compete with the best fixed parameter in hindsight. They further study a contextual setting based on diagonal-shift families \(A_t = A + c_t I\), where low-dimensional structure enables stronger contextual learning guarantees \citep{khodak2024learning}. More recently, online bandit learning has also been used to adapt preconditioners inside transient PDE simulations \citep{khodak2025pcgbandit}. Reinforcement learning has likewise been explored for multigrid parameter control, for example via PPO-based adaptation in h/p-multigrid solvers \citep{huergo2024rlmultigrid}. These works establish the promise of online learning for solver adaptation, but they do not resolve the specific challenge posed by industrial AMG setup tuning. In particular, they do not address the distinct role of \emph{setup} decisions in algebraic multigrid, where hierarchy construction creates an expensive upstream choice that shapes all downstream cycle behavior.

\paragraph{Positioning of the present work.}
Our work is closest in spirit to online solver tuning by bandits and RL, but differs from prior approaches in three ways. First, unlike the SOR setting of \citet{khodak2024learning}, we target a modern black-box multilevel solver whose parameter space is mixed-type and whose costs are hierarchy-dependent rather than analytically spectral. In BoomerAMG, setup parameters alter the hierarchy topology itself through discrete branching, thresholding, and multilevel sparsity trade-offs, so the clean analytic structure available for SOR does not carry over directly. Second, unlike offline surrogate or neural predictors for AMG parameters \citep{zou2023autoamg,caldana2024deep,zhang2025kernel}, we focus on the \emph{online sequence-of-systems regime}, where the learner must adapt from solver-native feedback without repeated offline retraining. Third, unlike monolithic black-box search, we exploit the setup--solve decomposition of BoomerAMG itself: setup is treated as an instance-level hierarchy-construction decision with a work--convergence trade-off, whereas solve is treated as a sequential control problem with cycle-level feedback. This distinction motivates a phase-aware design in which setup and solve are learned differently.

More broadly, our work is also related to structured contextual bandits. If one is willing to posit that the expected work-aware cost admits a learnable dependence on problem features and setup actions, e.g.
$$
\mathbb{E}[\mathrm{WU}_t(s)\mid c_t] \approx \theta^\top \phi(c_t,s),
$$
then contextual linear or kernelized bandits provide a natural alternative to independent-arm search. However, unlike the one-dimensional contextual structure available in SOR, such assumptions for industrial AMG are not analytically given and must instead be motivated through solver-native features and empirical validation. Our formulation therefore sits between classical heuristic AMG tuning and fully learned black-box surrogates: we exploit solver structure where available, but do not assume an explicit spectral formula for BoomerAMG performance.
# BoomerAMG

Consider a set of linear systems of the form
$$
\mathbf{A_{t}}\mathbf{u_{t}}=\mathbf{f_{t}}
$$
where $A$ denotes a $n\times n$ matrix, and $t$ the number of instances.







Challenge: Khodak et al. (ICLR 2024) 的工作很棒，但依赖 SOR 的显式性质 (unimodality/explicit spectral dependence)。然而，工业界真正强大的求解器（如 BoomerAMG）是黑盒的，没有这种漂亮的性质。

Insight: 虽然 BoomerAMG 是黑盒，但它在物理参数上依然具有平滑性 (Smoothness) 或 可学习性 (Learnability)。

Method: 我们不使用离散的 Tsallis-INF（因为维数灾难），也不使用简单的 ChebCB（因为没有解析解）。我们提出使用 Kernelized Contextual Bandits (或 Neural Bandits)。

Theory: 我们利用 RKHS 理论（或 Eluder Dimension），证明了即使没有显式的谱半径公式，只要 Solver 的行为是平滑的，我们依然能保证找到最优参数，且 Regret 是亚线性的。





我觉得我们用bandits学习amg的setup还是很有意义 因为如果setup做得好捕捉到了矩阵的物理特性 solve就会非常快 


我们其实是在找“given matrix的特征“和”AMG如何最有效的建立hierarchy“之间的某些关系  就比方如果矩阵是anisotropic，那我就可以把 StrongThreshold 设大一点因为这样收敛快 这个角度上说在AMG的setup上用CB很有意义 用TsallisINF那类独立的arm随机搜索会很浪费 

我看edmond他们理论上知道SOR的$\omega^*$ 和c之间存在一个V形的光滑函数关系 所以他们直接用Chebyshev CB来逼近这种关系 而amg的parameter非常复杂没对于这种未知黑盒关系 我想知道有没有可能假设matrix的某些特征和work units之间存在像这样的某种关系
$$\mathbb{E}\!\left[\mathrm{WU}_t(s)\mid c_t\right]\approx \theta^\top \phi(c_t,s)$$
如果可以假设的话 我们就可以用LinUCB bandits不会有纬度爆炸也; linUCB正好可以解决维度炸的问题 是半连续 它学的是背后的连续曲线 








