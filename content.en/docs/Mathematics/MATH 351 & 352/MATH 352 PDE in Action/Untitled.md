# Numerical Solution of Ordinary Differential Equations

## Introduction

The subject of this Chapter is the numerical approximation of the Cauchy problem:

$$(1) \quad \frac{dy}{dt} = f(t,y) \quad \text{in } t > 0 \quad (I.C.)$$

with 
$$y(0) = y_0 \text{ given}.$$

or, more in general, a system:

$$(2) \quad \frac{d\mathbf{y}}{dt} = \mathbf{f}(t,\mathbf{y}) \quad \text{in } t > 0$$

with 
$$\mathbf{y}(0) = \mathbf{y}_0.$$

Let's recall some basic results on the function $f$. It is said to be Lipschitz continuous in an interval $I$ if there exists a positive $L > 0$ s.t.

$$|f(t,y_1) - f(t,y_2)| < L |y_1 - y_2|.$$

Clearly, if $f$ is differentiable with continuity in $I$, it is also Lipschitz continuous with $L \leq \max_I \left|\frac{\partial f}{\partial y}\right|$.

### Local Theorem

If $f$ is Lipschitz continuous in a range $t \in I_1$ and $y \in I \subseteq \mathbb{R}$, then $\exists$ an interval $\hat{I} \subseteq I$ where the solution to $(1)$ exists and is unique.

### Global Theorem

If the $f$ is Lipschitz continuous $\forall t \in I$ and $y \in \mathbb{R}$, then the solution $\exists$ uniquely in $I$.

## Stability Definitions

From the practical point of view, it is important to consider also the perturbed case:

$$(1_\epsilon): \quad \frac{dy_\epsilon}{dt} = f(t, y_\epsilon) + \delta(t) \quad t \geq 0$$

$$y^\epsilon(0) = y_0 + \epsilon$$

with $|\delta(t)| \leq \epsilon \quad \forall t \geq 0$

If there exists a finite constant $C$ such that

$$|y - y_\epsilon| < C\epsilon \quad (*)$$

then we say that the solution is Lyapunov stable.

In general, $C$ may depend on $t$, so that $(*)$ may hold on finite intervals (and not over the entire $[0,\infty)$ axis).

To have a stronger concept, we advocate the ASYMPTOTIC STABILITY:

$$\lim_{t \to \infty} |y(t) - y_\epsilon(t)| = 0.$$

From the engineering point of view, this is a central concept, as the theory of control (Automatical Control, Feedback control) relies on this definition.

## Remark

The Cauchy problem has a formal (quite useless) solution:

$$y(t) = y_0 + \int_0^t f(\tau, y(\tau))d\tau$$

connecting the solution in $t$ with its past.

This is basically an alternative formulation of the problem and, in fact, will be used to formulate possible numerical approximation alternative to the ones based on $(1)$.

## Some Simple Examples

To begin with, we can split the time interval in subintervals, for instance with a uniform reticulation with step $\Delta t$.

![Time discretization with points at 0, Δt, 2Δt, 3Δt...]

Then, we can use the formula:

$$\frac{dy}{dt}(t_i) \simeq \frac{y(t_{i+1}) - y(t_i)}{\Delta t}$$

that we know is accurate with an error scaling with $\Delta t$. In this way, we have:

[From now on, the approximation of the solution $y(t)$ in $t_i$ will be denoted with $u_i$]

$$\frac{u_{i+1} - u_i}{\Delta t} = f(t_i, u_i)$$

In practice, starting at $t = 0$:
$$\begin{align}
u_1 &= u_0 + \Delta t \, f(t_0, u_0) \quad \rightsquigarrow \quad (u_0 = y_0) \\
u_2 &= u_1 + \Delta t \, f(t_1, u_1)
\end{align}$$

We can easily compute the approximation $u_i$ of $y(t_i)$.

On the other hand, we could do:

$$\frac{u_i - u_{i-1}}{\Delta t} = f(t_i, u_i)$$

leading to:

$$u_1 = u_0 + \Delta t \, f(t_1, u_1) \quad (u_0 = y_0)$$

This is not as easy as before: it's a NONLINEAR (ALGEBRAIC) EQUATION; we know how to solve it (first Chapter), but it is a computational additional cost. Then, similarly, we have:

$$u_2 = u_1 + \Delta t \, f(t_2, u_2)$$

We have also another option:

$$\frac{dy}{dt}(t_i) \simeq \frac{u_{i+1} - u_{i-1}}{2\Delta t}$$

In this case, the error scales with $O(\Delta t^2)$. So, in practice we have:

$$u_{i+1} = 2\Delta t \, f(t_i, u_i) + u_{i-1}$$

or specifically: $u_2 = 2\Delta t \, f(t_1, u_1) + u_0 \quad (u_0 = y_0)$

I need to know $u_1$, not just $u_0$, then we can use the method.

With these three examples, we have already found many possible types of methods:

**Implicit vs Explicit**
- **Implicit**: Solve a non-linear equation
- **Explicit**: No need of solving equations

**One Step vs Multistep**
- **One Step**: $u_{i+1} = g(\Delta t, u_i)$
- **Multistep**: $u_{i+1} = g(\Delta t, u_i, u_{i-1}, u_{i-2}...)$

At the top of this, we have the problem of the accuracy and - even most importantly- of the CONVERGENCE.

In fact, the basic requirement we need is that the method is convergent:

$$\lim_{\Delta t \to 0} |y(t_i) - u_i| = 0$$

Then, if we find that $|y(t_i) - u_i| \sim O(\Delta t^p)$ then the accuracy or the order of the method is $p$.

Nature (implicit/explicit), Number of steps and most important CONVERGENCE and accuracy (order) are the categories for analyzing and ranking different methods.

Before we embark ourselves in a general analysis, however, let's focus on a specific case, where important concepts will be highlighted.

## Analysis of Forward Euler

The method:

$$\frac{u_{i+1} - u_i}{\Delta t} = f(t_i, u_i)$$

is called Forward Euler.

Let's consider it in detail.

To start with, let's introduce the distinction of "consistency" and truncation error.

If we have the exact solution $y_{ex}(t)$ it is easily realized that

$$\frac{y_{ex}(t_{i+1}) - y_{ex}(t_i)}{\Delta t} \neq f(t_i, y_{ex}(t_i))$$

For instance,

$$\frac{dy}{dt} = \lambda y \quad y(0) = 1 \implies y_{ex} = e^{\lambda t}$$

then

$$\frac{e^{\lambda(t_i+\Delta t)} - e^{\lambda t_i}}{\Delta t} = e^{\lambda t_i} \frac{e^{\lambda \Delta t} - 1}{\Delta t} \neq \lambda e^{\lambda t_i} \quad (\lambda y(t_i))$$

We can be more specific:

$$y_{ex}(t_{i+1}) = y_{ex}(t_i) + \frac{dy_{ex}}{dt}(t_i)\Delta t + \frac{1}{2}\frac{d^2y_{ex}}{dt^2}(t_i)\Delta t^2 + ...$$

Now:

$$\frac{y_{ex}(t_{i+1}) - y_{ex}(t_i)}{\Delta t} = \frac{dy_{ex}(t_i)}{dt} + \frac{1}{2}\frac{d^2y_{ex}(t_i)}{dt^2}\Delta t + ...$$

This gives us:

$$\frac{y_{ex}(t_{i+1}) - y_{ex}(t_i)}{\Delta t} = f(t_i, y_{ex}(t_i)) + \left[\frac{\Delta t}{2}\frac{d^2y_{ex}}{dt^2}\right]$$

Forward Euler $\quad \quad \quad$ Local Truncation Error (LTE)

In some sense, the truncation error is the residual we get when we pretend the exact solution to solve the numerical scheme.

Now, to investigate how the error of Forward Euler works, let's consider the following picture:

![Error propagation diagram showing exact solution trajectory and numerical approximation]

From the picture it is evident that the error:

$$e_{i+1} = y_{ex}(t_{i+1}) - u_{i+1}$$

is the result of two contributions:

$$e_{i+1} = \underbrace{y_{ex}(t_{i+1}) - u^*_{i+1}}_{\text{generated at the local step}} + \underbrace{u^*_{i+1} - u_{i+1}}_{\text{propagated from previous steps}}$$

From the previous definition:

$$y_{ex}(t_{i+1}) = y_{ex}(t_i) + \Delta t \, f(t_i, y_{ex}(t_i)) + \Delta t \, \tau_{i+1}$$

where $\tau_{i+1} = \frac{\Delta t}{2}\frac{d^2y_{ex}(t_i)}{dt^2}$ is the local TE.

$$u^*_{i+1} = y_{ex}(t_i) + \Delta t \, f(t_i, y_{ex}(t_i))$$

$$y_{ex}(t_{i+1}) - u^*_{i+1} = \Delta t \, \tau_i$$

Now, let's focus on the other part.

This second component $u^*_{i+1} - u_{i+1}$ is inherited from the previous errors.

$$u^*_{i+1} = y_{ex}(t_i) + \Delta t \, f(t_i, y_{ex}(t_i))$$
$$u_{i+1} = u_i + \Delta t \, f(t_i, u_i)$$

Using the Lipschitz assumption $|f(t,y) - f(t,u)| \leq L |y-u|$ we have:

$$|u^*_{i+1} - u_{i+1}| \leq |e_i| + \Delta t \, L |e_i| = (1 + \Delta t \, L)|e_i|$$

where $e_i = y_{ex}(t_i) - u_i$

All together, we have:

$$|e_{i+1}| \leq \Delta t |\tau_i| + (1 + \Delta t \, L)|e_i|$$

Now, take $|\tau^*| = \max_i |\tau_i| = \text{GLOBAL TRUNCATION ERROR}$.

Then:

$$|e_{i+1}| \leq \underbrace{\Delta t |\tau^*|}_{\text{local}} + \underbrace{(1 + \Delta t \, L)}_{\text{propagated}}|e_i|$$

Assume that $e_0 = 0$ (no errors on the initial conditions). Then we have:

$$|e_1| \leq \Delta t |\tau^*|$$
$$|e_2| \leq \Delta t |\tau^*| + (1 + \Delta t \, L)|e_1| \leq \Delta t |\tau^*|(1 + (1+\Delta t \, L))$$
$$|e_3| \leq \Delta t |\tau^*| + (1+\Delta t \, L)|e_2| \leq \Delta t |\tau^*|(1 + (1+\Delta t \, L) + (1+\Delta t \, L)^2)$$

We infer:

$$|e_K| \leq \Delta t |\tau^*| \sum_{j=0}^{K-1}(1+\Delta t \, L)^j = \Delta t |\tau^*|\frac{(1+\Delta t \, L)^K - 1}{1 - 1 - \Delta t \, L} = \frac{|\tau^*|}{L}((1+\Delta t \, L)^K - 1)$$

Notice that:

$$(1 + x)^K \leq \exp(xK)$$

So:

$$|e_K| \leq \frac{|\tau^*|}{L}(\exp(LKh) - 1) = \frac{|\tau^*|}{L}(\exp(Lt_K) - 1)$$

where $K\Delta t = t_K$

Now, if we want to have a bound on the error in the interval $[0,T]$, we have:

$$|e| \leq \frac{|\tau^*|}{L}(\exp(LT) - 1)$$

We have proved the following Theorem:

## Convergence of Forward Euler

If the initial data are exact, and $f$ is Lipschitz continuous with respect to the $y$-argument, with a solution $\in C^2(0,T)$, then FE converges.

In fact:

$$|\tau^*| = \frac{1}{2}\Delta t \max_i |y^{''}| \xrightarrow{\Delta t \to 0} 0$$

and $|e| \leq |\tau^*|\frac{\exp(LT) - 1}{L} \xrightarrow{\Delta t \to 0} 0$ is bounded.

**FE is convergent with order 1.**

Beyond the Theorem per se (we will generalize it to other methods), it is important to notice that the convergence is the consequences of two peculiarities:

**(1)** $\tau^* \xrightarrow{\Delta t \to 0} 0$ the LTE/GTE vanishes as $\Delta t \to 0$, so locally the error is under control.

This property is called **CONSISTENCY**.

**(2)** The factor $\frac{\exp(LT) - 1}{L}$ is independent of $\Delta t$ (or, in general, doesn't blow up for $\Delta t \to 0$). This is related to the way the error propagates so it is a "global" property through the constant $L$.

The control of the error in time is called **STABILITY**.

In some sense, we can say that:

**CONVERGENCE = CONSISTENCY + STABILITY**

In spite of the intuitive arguments we used here, we will see that this is a good representation of general results (Lax-Richtmyer equivalence Theorem) holding for method using linear combinations of the function $f$ evaluated in the points $(t_i, u_i)$.

# Other One-Step Methods

So far, we have two one-step methods (forward and backward Euler). Let's see other two. It is instructive to see how they are devised.

## Crank-Nicolson

From $y(t) = y_0 + \int_0^t f(\tau, y(\tau))d\tau$ we can organize the following method:

![Timeline showing points $t_0, t_1, t_2, t_3, t_4, t_5, t_6, t_7$]

Localize: $y(t_{n+1}) = y(t_n) + \int_{t_n}^{t_{n+1}} f(\tau, y(\tau)) d\tau$

Discretize: approximate the integral with the trapezoidal rule:

$$u_{n+1} = u_n + \frac{f(t_{n+1}, u_{n+1}) + f(t_n, u_n)}{2} \Delta t$$

This is a Second Order (EXERCISE) one-step implicit method.

## Heun

Let's start from Crank-Nicolson and make it "explicit".

On the right hand side of CN we set:

$$u_{n+1} \simeq u_n + \Delta t \, f(t_n, u_n) \quad \text{(Explicit Euler)}$$

We obtain the scheme:

$$u_{n+1} = u_n + \Delta t \frac{f(t_{n+1}, u_n+\Delta t f(t_n, u_n)) + f(t_n, u_n)}{2}$$

This is called Heun. It is One-step, still 2nd order (EXERCISE).

## The Concept of Zero-Stability

Let's start applying the concept to one-step methods in the form:

$$u_{n+1} = u_n + \Delta t \, \Phi(u_n, t_n, f_n; \Delta t)$$

Let's consider the perturbed scheme:

$$\begin{cases}
w_{n+1} = w_n + \Delta t (\Phi(z_n, t_n, f(t_n, z_n); \Delta t) + \delta_n) \\
w_0 = y_0 + \delta_0 & \text{with } |\delta_i| \leq \varepsilon
\end{cases}$$

We say that the method is zero-stable if for $\Delta t < \Delta t_0$, there exists a constant $C > 0$ such that

$$|u_n - z_n| \leq C\varepsilon$$

for $\varepsilon > 0$ sufficiently small.
($C$ and $\Delta t_0$ depend on problem data, $T_{fin}$, $f$).

It is possible to prove the following theorem:

**Theorem:** If $\Phi$ is Lipschitz continuous with respect to the dependence on $u_n$ ($\exists \Delta > 0$: $|\Phi(u_n) - \Phi(z_n)| \leq \Delta |u_n - z_n|$), then the One-step method is zero-stable.

Lipschitz continuity in this case is enough for zero-stability (and it is generally a consequence of Lipschitz continuity of $f$).

Then, we have another theorem. It generalizes the theorem for the explicit Euler.

**Theorem:** If $\Phi$ is like in the previous theorem, then:

$$|y(t_n) - u_n| \leq \left(|y_0 - u_0| + t_n \, \tau(\Delta t)\right) e^{L t_n}.$$

Therefore, if:
- $\tau(\Delta t) \to 0$ with $\Delta t$
- $y_0 - u_0 \to 0$ with $\Delta t$

the method is convergent

(and the order is $\Delta t^p$, with $p = \min(p_1, p_2)$ where:
- $\tau(\Delta t) \sim O(\Delta t^{p_1})$
- $y_0 - u_0 \sim O(\Delta t^{p_2})$ (generally $p = p_1$).

In other terms:

For one-step method (not true for multi-step):

$$\Phi \text{ Lipschitz continuous } \Rightarrow \text{ Method zero-stable} + \text{Consistency} \Rightarrow \text{CONVERGENCE}$$

$\Rightarrow$ If $\Phi$ is Lipschitz continuous, consistency $\Rightarrow$ convergence.

## The Concept of Absolute Stability

The zero-stability is a property of the numerical scheme, required by the presence of roundoff errors and other possible perturbations.

However, there is another (maybe more engineering) concept of stability related to the nature of the problem to solve.

In simple words, we want that, if a problem is asymptotically stable, the numerical approximation is asymptotically stable too.

Is this happening? Let's consider the prototype of asymptotically stable problem (Model Problem).

Let's consider the Cauchy problem:

$$\begin{cases}
\frac{dy}{dt} = \lambda y & t > 0 \\
y(0) = y_0
\end{cases}$$

We know that the solution is asymptotically stable for $\lambda < 0$ $(y_{ex} = y_0 e^{\lambda t} \xrightarrow{t \to \infty} 0 \text{ for } \lambda < 0)$

In fact: $\frac{dz}{dt} = \lambda z$ with $z(0) = y_0 + \varepsilon \Rightarrow z - y = \varepsilon e^{\lambda t} \xrightarrow{t\to\infty} 0$ for $\lambda < 0$.

### Remark

For a system: $\begin{cases} \frac{d\mathbf{y}}{dt} = A\mathbf{y} & \mathbf{y} \in \mathbb{R}^n \\ \mathbf{y}(0) = \mathbf{y}_0 & A \in \mathbb{R}^{n \times n} \end{cases}$

the asymptotic stability is guaranteed if THE REAL PART OF ALL THE EIGENVALUES is negative.

To be general, from now on we will consider $\lambda \in \mathbb{C}$ also for the scalar case. In particular, the left-plane $\text{Real}(\lambda) < 0$ is the region of the complex plane where the original problem is asymptotically stable.

#### Question: is the solution of the model problem with Explicit Euler asymptotically vanishing as the exact solution?

Notice that the question is not related to the behavior of the solution for $\Delta t \to 0$, but for $\Delta t$ given and $t \to +\infty$.

Let's see:
$$\frac{dy}{dt} = \lambda y \quad \text{EE}: \frac{u_{i+1} - u_i}{\Delta t} = \lambda u_i$$

$$u_{i+1} = (1 + \lambda \Delta t) u_i \quad (\text{Re}(\lambda) < 0)$$

$$|u_{i+1}| = |1 + \lambda \Delta t| |u_i| \Rightarrow |u_{i+1}| = |1 + \lambda \Delta t|^{i+1} |u_0|$$

The solution asymptotically vanishes if $|1 + \lambda \Delta t| < 1$

Intuitively, if $\lambda$ is Real and negative:

$$|1 + \lambda \Delta t| < 1$$
$$\Downarrow$$
$$-1 < 1 + \lambda \Delta t < 1$$
$$\Downarrow$$
$$-2 < \lambda \Delta t < 0$$
$$\Downarrow$$
$$\Delta t < \frac{2}{|\lambda|}$$

So, if $\Delta t > \frac{2}{|\lambda|}$ the numerical solution is not stable.

For $\lambda$ complex, we can draw the region of the plane $\lambda \Delta t$ where the solution is stable.

![Complex plane diagram showing unit circle with center at (-1,0)]

Unit circle with center in $(-1, 0)$

(In magenta the region of stability of the problem).

So, the method is reproducing the asymptotic behavior of the exact solution ONLY UNDER THE CONDITION THAT:

$$\lambda \Delta t \in \text{Unit Circle centered in } (-1, 0).$$

#### What happens with Implicit Euler?

$$\frac{1}{|1 - \lambda \Delta t|} < 1 \quad \forall \Delta t,$$

so $u^{n+1} \xrightarrow{n \to \infty} 0 \quad \forall \Delta t$

There is a big difference between the two Eulers: one is stable under some conditions, the other is unconditionally stable.

#### What about Crank-Nicolson?

$$u^{n+1} = u^n + \Delta t \frac{\lambda u^{n+1} + \lambda u^n}{2} \Rightarrow u^{n+1} = \frac{1 + \frac{\Delta t}{2}\lambda}{1 - \frac{\Delta t}{2}\lambda} u^n$$

Again, for $\lambda \in \mathbb{C}$ we have:

$$\left|\frac{1 + \frac{\Delta t}{2}\lambda}{1 - \frac{\Delta t}{2}\lambda}\right| < 1 \quad \forall \Delta t$$

so also CN is stable with no condition.

## DEFINITION

A method is said to be ABSOLUTELY STABLE if the solution of the model problem $\frac{dy}{dt} = \lambda y$ vanishes asymptotically when $t \to +\infty$.

We say that the method is UNCONDITIONALLY ABSOLUTELY STABLE if this happens $\forall \Delta t > 0$. On the contrary, it is said to be CONDITIONALLY STABLE if we have limitations on $\Delta t$.

## Another Example: Heun

$$u^{n+1} = u^n + \frac{\Delta t}{2}(\lambda(u^n + \Delta t \lambda u^n) + \lambda u^n) = \left(1 + \Delta t \lambda + \frac{\Delta t^2 \lambda^2}{2}\right) u^n$$

Now, consider the curve $\frac{\Delta t^2 \lambda^2}{2} + \Delta t \lambda + 1$ for $\lambda < 0$

We see that we need:

$$0 < \Delta t < \frac{2}{|\lambda|}$$

(as for Explicit Euler).

In the complex plane, the region is slightly larger than for Explicit Euler.

## REMARK: We found that the explicit methods are conditionally stable, while the implicit ones are unconditionally stable.

In general, we do not have unconditionally stable explicit methods, but we do have implicit methods that are only conditionally stable.

The region of absolute stability is the portion of $\mathbb{C}^-$ for $\lambda \Delta t$ to belong to such that the method is absolutely stable. Unconditional absolute stability (a.k.a A-stability) is when this region is the entire left plane $\mathbb{C}^-$.

The concept of absolute stability somehow clarifies what are the criteria to select a method for a problem.

In fact, let's first consider the general case(s):

1. $\frac{dy}{dt} = f(t,y) \simeq f(t,y_0) + \frac{\partial f}{\partial t}(t-t_0) + \frac{\partial f}{\partial y}(t,y_0)(y-y_0)$

   so we can locally take $\lambda \simeq \frac{\partial f}{\partial y}(t,y_0)$

2. For a system: $\frac{d\mathbf{y}}{dt} = A \mathbf{y} \Rightarrow \lambda = eig(A)$

3. $\frac{d\mathbf{y}}{dt} = \mathbf{F}(t,\mathbf{y})$ (nonlinear system)

   $\Rightarrow \lambda = eig\left(\frac{\partial \mathbf{F}}{\partial \mathbf{y}}(t_0, y_0) \right)$ - Jacobian

Now, for a general problem, we have:

| Method | Nature | Accuracy | Limitations on $\Delta t$ |
|--------|--------|----------|--------------------------|
| FE     | Explicit | 1      | $\Delta t < \frac{2}{|\lambda|}$ |
| BE     | Implicit | 1      | NO |
| CN     | Implicit | 2      | NO |
| H      | Explicit | 2      | $\Delta t < \frac{2}{|\lambda|}$ |

Implicit Methods are more computationally expensive.

In an extreme synthesis:

![Comparison of FE and BE with timeline]

With FE each step is low-cost (Explicit) but we may need to do many for the conditional stability.

With BE each step is more expensive, but we need to do (generally) fewer steps.

$\Rightarrow$ The optimal choice is largely problem dependent.

# Multistep Methods

The mid-point method is just an example of multi-step methods:

$$u_{n+1} = u_{n-1} + 2\Delta t \, f(t_n, u_n)$$

In general, a multistep method with $p$ steps take the form:

$$u_{n+1} - \sum_0^p a_j u_{n-j} = \Delta t \sum_{j=-1}^p b_j f(t_{n-j}, u_{n-j})$$

The method is IMPLICIT when $b_{-1} \neq 0$.

## Example:

$$y(t_{n+1}) = y(t_{n-1}) + \int_{t_{n-1}}^{t_{n+1}} f(\tau, y(\tau)) d\tau$$

$$\Downarrow \text{ SIMPSON}$$

$$u_{n+1} = u_{n-1} + 2\Delta t \frac{f(t_{n+1}, u_{n+1}) + 4f(t_n, u_n) + f(t_{n-1}, u_{n-1})}{6} =$$

$$= u_{n-1} + \frac{\Delta t}{3}(f(t_{n+1}, u_{n+1}) + 4f(t_n, u_n) + f(t_{n-1}, u_{n-1}))$$

$$\mathbf{a} = \begin{bmatrix} 0 \\ 1 \end{bmatrix} a_0, a_1 \quad \mathbf{b} = \begin{bmatrix} \frac{1}{3} \\ \frac{4}{3} \\ \frac{1}{3} \end{bmatrix} b_{-1}, b_0, b_1$$

In general, we have two approaches for deriving a Multi-step methods:

## BDF (Backward Difference Formulas)

$$\frac{dy}{dt}(t_{n+1}) = f(t_{n+1}, u_{n+1})$$
$$\downarrow$$
approximate this with a backward finite difference, e.g.,

$$\frac{dy}{dt}(t_{n+1}) \simeq \frac{\frac{3}{2}u_{n+1} - 2u_n + \frac{1}{2}u_{n-1}}{\Delta t}$$

$$\Rightarrow u_{n+1} = \frac{4}{3}u_n - \frac{1}{3}u_{n-1} + \Delta t f(t_{n+1}, u_{n+1})$$

They are all in the form:

$$\mathbf{b} = \begin{bmatrix} 1 \\ 0 \\ \vdots \\ 0 \end{bmatrix}$$

## Adams

In this case, we start from:

$$y(t_{n+1}) = y(t_n) + \int_{t_n}^{t_{n+1}} f(\tau, y(\tau)) d\tau$$

Now, we replace $f$ with an interpolation:

1. We interpolate $f$ over the nodes: $n-p, n-p+1, ... n$ so to have an explicit method (Adams-Bashforth)
2. We interpolate $f$ over the nodes: $n-p, n-p+1, ... n, n+1$