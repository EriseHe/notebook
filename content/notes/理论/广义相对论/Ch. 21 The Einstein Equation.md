---
title: "Ch. 21 The Einstein Equation"
---

## 21.1 Overview: From Newtonian Gravity to Einstein’s Equation

In Newtonian gravity, Gauss’s law for the gravitational field is
$$
\vec\nabla\cdot\vec g = -4\pi G\rho
\qquad\Rightarrow\qquad
\nabla^2\Phi = 4\pi G\rho
\tag{21.1}
$$
where $\vec g = -\vec\nabla\Phi$ is the gravitational field and $\Phi$ is the gravitational potential, while $\rho$ is the mass density.

From chapter 20 we know that the relativistic generalization of $\rho$ is the **stress–energy tensor** $T^{\mu\nu}$.  
We therefore expect the relativistic field equation to relate some curvature tensor $G^{\mu\nu}$ to $T^{\mu\nu}$:
$$
G^{\mu\nu} = \kappa T^{\mu\nu}
\tag{21.2}
$$
where $\kappa$ is a constant and $G^{\mu\nu}$ is a symmetric second-rank tensor describing spacetime curvature. We will call $G^{\mu\nu}$ the **Einstein tensor**.

### Constraints on $G^{\mu\nu}$

Because $G^{\mu\nu}$ is to describe curvature:

1. It should be built from the **Riemann tensor** and the metric $g_{\mu\nu}$, since these are the tensors that describe spacetime geometry.
2. Since $T^{\mu\nu}$ is symmetric, $G^{\mu\nu}$ must also be symmetric.
3. Local conservation of four-momentum implies $\nabla_\mu T^{\mu\nu}=0$, so taking the covariant divergence of equation (21.2) gives
   $$
   \nabla_\mu G^{\mu\nu} = 0
   $$
4. In the **Newtonian limit** (weak fields, slow motion) the $tt$-component should reduce to the Poisson equation $\nabla^2\Phi = 4\pi G\rho$.

Our task is to construct such a $G^{\mu\nu}$.

---

## 21.2 First and Second Guesses for $G^{\mu\nu}$

### 21.2.1 First Guess: The Ricci Tensor

The simplest contraction of the Riemann tensor is the **Ricci tensor**, defined by
$$
R_{\beta\nu} \equiv R^\alpha_{\ \beta\alpha\nu}
\tag{21.3}
$$

> [!definition|21.1] Ricci tensor  
> $R_{\mu\nu}$ is obtained from the Riemann tensor by contracting on one upper and one lower index: $R_{\mu\nu} \equiv R^\alpha_{\ \mu\alpha\nu}$

Raising both indices with the metric gives
$$
\begin{aligned}
R^{\mu\nu}
&\equiv g^{\mu\beta} g^{\nu\sigma} R_{\beta\sigma} \\[4pt]
&= g^{\mu\beta} g^{\nu\sigma} R^\alpha_{\ \beta\alpha\sigma} \\[4pt]
&= g^{\mu\beta} g^{\nu\sigma} g^{\alpha\gamma} R_{\gamma\beta\alpha\sigma}
\end{aligned}
\tag{21.4}
$$

Because the Riemann tensor satisfies $R_{\alpha\beta\gamma\sigma}=R_{\gamma\sigma\alpha\beta}$, the Ricci tensor is symmetric:
$$
\begin{aligned}
R^{\nu\mu}
&= g^{\nu\beta} g^{\mu\sigma} g^{\alpha\gamma} R_{\alpha\beta\gamma\sigma} \\[4pt]
&= g^{\nu\beta} g^{\mu\sigma} g^{\alpha\gamma}
   \underbrace{R_{\gamma\sigma\alpha\beta}}_{\text{symmetry of }R_{\alpha\beta\gamma\sigma}} \\[4pt]
&= g^{\mu\beta} g^{\nu\sigma} g^{\alpha\gamma} R_{\alpha\beta\gamma\sigma} \\[4pt]
&\equiv R^{\mu\nu}
\end{aligned}
\tag{21.5}
$$

So $R^{\mu\nu}$ satisfies the symmetry requirement.  
However, in general
$$
\nabla_\nu R^{\mu\nu} \neq 0
$$
so this first guess fails the divergence-free condition.

### 21.2.2 Second Guess: Adding the Curvature Scalar

We next look for other symmetric rank-2 tensors constructed linearly from the metric and Riemann tensor.

Define the **curvature scalar**
$$
\begin{aligned}
R &\equiv g^{\beta\nu} R_{\beta\nu} \\[4pt]
  &= g^{\beta\nu} R^\alpha_{\ \beta\alpha\nu} \\[4pt]
  &= g^{\beta\nu} g^{\alpha\gamma} R_{\alpha\beta\gamma\nu}
\end{aligned}
\tag{21.6}
$$

> [!definition|21.2] Curvature scalar  
> $R \equiv g^{\mu\nu}R_{\mu\nu}$ is the full contraction of the Ricci tensor

Both $g^{\mu\nu}$ and $g^{\mu\nu}R$ are symmetric rank-2 tensors. In fact, the only symmetric second-rank tensors **linear** in the Riemann tensor are
$$
R^{\mu\nu},\qquad g^{\mu\nu},\qquad g^{\mu\nu}R
$$

So we try a linear combination
$$
G^{\mu\nu} = R^{\mu\nu} + b\,g^{\mu\nu}R + \Lambda g^{\mu\nu}
$$
with constants $b$ and $\Lambda$, and demand
$$
\nabla_\nu G^{\mu\nu}
= \nabla_\nu\!\left(R^{\mu\nu} + b\,g^{\mu\nu}R + \Lambda g^{\mu\nu}\right) = 0
\tag{21.7}
$$

Since the metric is covariantly constant and $\Lambda$ is constant,
$$
\nabla_\nu(\Lambda g^{\mu\nu}) = 0
\tag{21.8}
$$
so the problem reduces to finding $b$ such that
$$
\nabla_\nu(R^{\mu\nu} + b\,g^{\mu\nu}R) = 0
\tag{21.9}
$$

Using the (contracted) Bianchi identity one can show that this holds identically **if and only if**
$$
b = -\tfrac12
$$
Therefore
$$
R^{\mu\nu} - \tfrac12 g^{\mu\nu}R + \Lambda g^{\mu\nu} = \kappa T^{\mu\nu}
\tag{21.10}
$$
satisfies all the constraints: both sides are symmetric, divergence-free, and constructed linearly from the metric and the Riemann tensor.

---

## 21.3 The Einstein Tensor and Equivalent Forms

### 21.3.1 Definition of the Einstein Tensor

Motivated by equation (21.10), we define

> [!definition|21.3] Einstein tensor  
> $$
> G^{\mu\nu} \equiv R^{\mu\nu} - \tfrac12 g^{\mu\nu}R
> $$
> It is symmetric and obeys $\nabla_\nu G^{\mu\nu}=0$

Thus the Einstein equation can be written in its most general form as
$$
G^{\mu\nu} + \Lambda g^{\mu\nu} = \kappa T^{\mu\nu}
\tag{21.12}
$$

### 21.3.2 Alternative Form

Contract equation (21.10) with $g_{\mu\nu}$:
$$
\begin{aligned}
g_{\mu\nu}R^{\mu\nu}
- \tfrac12 g_{\mu\nu}g^{\mu\nu}R
+ \Lambda g_{\mu\nu}g^{\mu\nu}
&= \kappa g_{\mu\nu}T^{\mu\nu} \\[4pt]
\underbrace{R}_{g_{\mu\nu}R^{\mu\nu}}
- \underbrace{\tfrac12(4)R}_{g_{\mu\nu}g^{\mu\nu} = 4}
+ \underbrace{4\Lambda}_{g_{\mu\nu}g^{\mu\nu} = 4}
&= \kappa T
\end{aligned}
$$
so
$$
-R + 4\Lambda = \kappa T
\tag{21.13}
$$
where $T \equiv g_{\mu\nu}T^{\mu\nu} = T^\mu_{\ \mu}$.

Now subtract $\tfrac12 g^{\mu\nu}$ times equation (21.13) from equation (21.10) and move the $\Lambda$ term to the right:
$$
\begin{aligned}
R^{\mu\nu} - \tfrac12 g^{\mu\nu}R + \Lambda g^{\mu\nu}
&= \kappa T^{\mu\nu} \\[4pt]
R^{\mu\nu}
&= \kappa\Big(T^{\mu\nu} - \tfrac12 g^{\mu\nu}T\Big) + \Lambda g^{\mu\nu}
\end{aligned}
\tag{21.14}
$$

This is an equivalent and very useful form of the Einstein equation.

---

## 21.4 Fixing $\kappa$ and the Newtonian Limit

We now determine $\kappa$ by demanding that the Einstein equation reproduce the Newtonian tidal equation in the appropriate limit.

From chapter 18, the Newtonian equation of tidal deviation is
$$
\frac{d^2 n^i}{dt^2}
= -\eta^{ij}[\partial_i\partial_j\Phi]\,n^k
\tag{21.15}
$$
while the relativistic geodesic deviation equation is
$$
\left(\frac{d^2 n^\alpha}{d\tau^2}\right)
= -R^\alpha_{\ \mu\nu\sigma}u^\mu u^\nu n^\sigma
\tag{21.16}
$$

### 21.4.1 The Newtonian Limit

To take the Newtonian limit we assume:

1. The gravitational field is weak (spacetime nearly flat).
2. Objects move with speeds $\ll 1$ in this field.
3. The mass–energy density $\rho = T^{tt}$ is much larger than all other $T^{\mu\nu}$ components in the source.

Assumption 1 lets us choose nearly cartesian coordinates $(t,x,y,z)$ such that $g_{\mu\nu}\approx\eta_{\mu\nu}$ and covariant derivatives reduce to ordinary derivatives.  
Assumption 2 implies that for freely falling matter,
$$
u^t \approx 1,
\qquad
u^x,u^y,u^z \approx 0,
\qquad
\tau\approx t
$$

Hence the spatial components of equation (21.16) become
$$
\begin{aligned}
\frac{d^2 n^i}{dt^2}
&= -R^i_{\ \mu\nu\sigma}u^\mu u^\nu n^\sigma \\[4pt]
&\approx -R^i_{\ t j t} n^j
\end{aligned}
\tag{21.17}
$$
where $i$ and $j$ run over spatial indices only.

Comparing equations (21.15) and (21.17) we identify
$$
\eta^{jk}\partial_j\partial_k\Phi
\equiv \nabla^2\Phi
\approx R^k_{\ t k t}
\equiv R_{tt}
\tag{21.18}
$$

Since the metric is nearly flat,
$$
R^{tt} = g^{t\mu}g^{t\nu}R_{\mu\nu}
\approx \eta^{tt}\eta^{tt}R_{tt}
= (-1)(-1)R_{tt}
= R_{tt}
$$
so $R^{tt}\approx \nabla^2\Phi$.

### 21.4.2 Matching to Poisson’s Equation

Take the $tt$-component of equation (21.14):
$$
R^{tt}
= \kappa\Big(T^{tt} - \tfrac12 g^{tt}T\Big) + \Lambda g^{tt}
\tag{21.19}
$$

In our limit $\rho = T^{tt}\gg$ all other components, so
$$
T = g_{\mu\nu}T^{\mu\nu}
\approx \eta_{\mu\nu}T^{\mu\nu}
\approx \eta_{tt}T^{tt}
= -\rho
$$

Substitute into (21.19) and use $g^{tt}\approx\eta^{tt}=-1$:
$$
\begin{aligned}
\nabla^2\Phi
&\approx R^{tt} \\[4pt]
&= \kappa\Big(\rho - \tfrac12(-1)(-\rho)\Big) + \Lambda(-1) \\[4pt]
&=\kappa\Big(\rho - \tfrac12\rho\Big) - \Lambda \\[4pt]
&= \tfrac12\kappa\rho - \Lambda
\end{aligned}
\tag{21.20}
$$

To recover the Newtonian equation $\nabla^2\Phi = 4\pi G\rho$ we must have
$$
\kappa = 8\pi G,
\qquad
\Lambda \ll 4\pi G\rho
$$
in ordinary astrophysical situations.

---

## 21.5 The Cosmological Constant

Equation (21.20) shows that the $\Lambda$ term acts (in the Newtonian limit) like a **negative energy density** present even in vacuum ($\rho=0$). On solar-system scales this effect is negligible, implying
$$
\frac{\Lambda}{8\pi G} \ll 10^{-7}\,\text{kg/m}^3
$$

Einstein originally introduced $\Lambda$ to permit a static universe solution, then abandoned it after Hubble’s discovery of cosmic expansion, calling it “the worst mistake I ever made.” However, modern observations (starting with supernova data in 1998 and supported by cosmic microwave background measurements) indicate that the universe’s expansion is accelerating, consistent with a small but nonzero cosmological constant. Current data suggest
$$
\frac{\Lambda}{8\pi G} \approx 0.7\times 10^{-26}\,\text{kg/m}^3
$$
large enough to affect the universe as a whole but negligible on smaller scales.

Physicists now usually treat $\Lambda$ as part of the **stress–energy of the vacuum**, moving it to the right-hand side of the field equation:
$$
T^{\mu\nu}_\text{vac} \equiv -\frac{\Lambda}{8\pi G} g^{\mu\nu}
\tag{21.21}
$$

> [!definition|21.4] Vacuum stress–energy  
> The stress–energy tensor associated with the cosmological constant is
> $T^{\mu\nu}_\text{vac} = -\dfrac{\Lambda}{8\pi G} g^{\mu\nu}$

---

## 21.6 Final Forms of the Einstein Equation

Including both matter and vacuum contributions, the Einstein equation is often written as
$$
G^{\mu\nu}
= 8\pi G\big(T^{\mu\nu} + T^{\mu\nu}_\text{vac}\big)
\equiv 8\pi G\,T^{\mu\nu}_\text{all}
\tag{21.22}
$$

Using the alternative form (21.14) with $\kappa=8\pi G$ and $T^{\mu\nu}_\text{vac}$ from (21.21) gives
$$
R^{\mu\nu}
= 8\pi G\Big(T^{\mu\nu}_\text{all}
- \tfrac12 g^{\mu\nu}T_\text{all}\Big)
\tag{21.23}
$$
where $T_\text{all} \equiv g_{\alpha\beta}T^{\alpha\beta}_\text{all}$.

> [!remark|21.5] Role of the vacuum term  
> One can check that
> $$
> T^{\mu\nu}_\text{vac} - \tfrac12 g^{\mu\nu}T_\text{vac}
> = \frac{\Lambda}{8\pi G} g^{\mu\nu}
> $$
> so the vacuum term in $T^{\mu\nu}_\text{all}$ reproduces the $\Lambda g^{\mu\nu}$ term in equation (21.14)

### 21.6.1 Complexity and Solution Methods

Because $R^{\mu\nu}$ and $G^{\mu\nu}$ are nonlinear in the metric (they contain products of first derivatives and second derivatives of $g_{\mu\nu}$), the Einstein equation represents up to **ten coupled, nonlinear, second-order PDEs** for the metric components in four dimensions.

Typical strategies:

- Use symmetry to guess a metric ansatz with as few unknown functions as possible, then solve the resulting reduced equations (e.g., Schwarzschild, FRW metrics).
- When symmetry is insufficient, solve the Einstein equation **numerically** using powerful computational methods.

Despite the difficulty of finding solutions, the equation allows deep conceptual questions, such as whether singularities are always hidden behind event horizons (the **Cosmic Censorship Hypothesis**), to be formulated precisely.

---

### 21.7 Summary of the Chapter

- We sought a tensor equation generalizing $\nabla^2\Phi = 4\pi G\rho$.
- Constraints (built from curvature, symmetric, divergence-free, correct Newtonian limit) led uniquely to
  $$
  G^{\mu\nu} + \Lambda g^{\mu\nu} = 8\pi G T^{\mu\nu}
  $$
- The Einstein tensor is $G^{\mu\nu} \equiv R^{\mu\nu} - \tfrac12 g^{\mu\nu}R$.
- Matching to the Newtonian tidal equation fixes $\kappa = 8\pi G$.
- The constant $\Lambda$ behaves like a uniform vacuum energy density and is usually interpreted via a vacuum stress–energy tensor $T^{\mu\nu}_\text{vac}$.
- In practice, the most useful form for calculations is
  $$
  R^{\mu\nu} = 8\pi G\Big(T^{\mu\nu}_\text{all}
  - \tfrac12 g^{\mu\nu}T_\text{all}\Big)
  $$

This completes the construction of the Einstein equation, the central field equation of general relativity.
