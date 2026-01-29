---
date: 2025-11-17
---


## 1. Trivial Jacobi Fields and Normal Jacobi Fields

### 1.1 Trivial Jacobi fields
The following are *trivial Jacobi fields* (coming from reparametrizations of the same geodesic):

$$
\begin{aligned}
J_0(t) &= \dot{\gamma}(t)
&\longleftrightarrow\quad \Gamma(s,t) &= \gamma(t+s) \\
J_1(t) &= t\,\dot{\gamma}(t)
&\longleftrightarrow\quad \Gamma(s,t) &= \gamma(e^s t)
\end{aligned}
$$

Note that these are both tangential to $\gamma$.

> [!definition|1.1] Normal Jacobi field
> A normal Jacobi field along $\gamma$ satisfies $J \perp \dot{\gamma}$ at all pts

> [!lemma|1.2] Normality from one point
> If $J$ is a Jacobi field and $J$ and $D_tJ$ are $\perp \dot{\gamma}$ at one point, then $J$ is a normal Jacobi field

**Proof**  
Let $f(t):=\langle J,\dot{\gamma}\rangle$. Since $\gamma$ is a geodesic, $D_t\dot{\gamma}=0$, hence
$$
\begin{aligned}
f'(t)
&=\frac{d}{dt}\langle J,\dot{\gamma}\rangle \\
&=\langle D_tJ,\dot{\gamma}\rangle+\langle J,D_t\dot{\gamma}\rangle \\
&=\langle D_tJ,\dot{\gamma}\rangle
\end{aligned}
$$
Differentiating again gives
$$
\begin{aligned}
f''(t)
&=\langle D_t^2J,\dot{\gamma}\rangle \\
&=\langle -Rm(J,\dot{\gamma})\dot{\gamma},\dot{\gamma}\rangle \\
&=-Rm(J,\dot{\gamma},\dot{\gamma},\dot{\gamma}) \\
&=0
\end{aligned}
$$
where the last line is by antisymmetry. Thus $f$ is affine in $t$.

If at some $t_0$ we have $J(t_0)\perp \dot{\gamma}(t_0)$ and $(D_tJ)(t_0)\perp \dot{\gamma}(t_0)$, then
$f(t_0)=0$ and $f'(t_0)=0$. Since $f''\equiv 0$, this forces $f'\equiv 0$ and hence $f\equiv 0$, so $J\perp\dot{\gamma}$ for all $t$.

## 2. Radial Jacobi Fields

Our goal is to study families of radial geodesics from a pt $p$.

> [!definition|2.1] Radial Jacobi field
> Given $V=\dot{\gamma}(0)$ at $p$ and $W\in T_pM$, let
> $$
> \Gamma(s,t):=\exp_p\big(t(V+sW)\big)
> $$
> The associated radial Jacobi field is
> $$
> J=\partial_s\Gamma(0,t)
> $$

### 2.1 Geodesic normal coordinates description
This looks simple in geodesic normal coord's:

$$
x^1,\dots,x^n\ \longleftrightarrow\ \exp_p(x^iE_i)
$$

for an orthonormal basis $E_i$ of $T_pM$. For $\Gamma(s,t)$ as above, in these coord's
$$
x^i(s,t)=t\big(V^i+sW^i\big)
$$
so
$$
J=t\,W^i\partial_i
$$

> [!lemma|2.2] Radial Jacobi field in geodesic normal coords
> In geodesic normal coord's at $p$, the unique radial Jacobi field with $D_tJ|_0=W\in T_pM$ is
> $$
> J(t)=t\,W^i\partial_i
> $$

## 3. Constant Curvature Metrics and the Jacobi Equation

> [!definition|3.1] Constant curvature
> $M$ has constant curvature if $K(\Pi)=k$ at all pts

In this case,
$$
R(X,Y)Z=k\big(\langle Y,Z\rangle X-\langle X,Z\rangle Y\big)
$$

In the Jacobi eq., we then have (for $\gamma$ unit speed)
$$
R(J,\dot{\gamma})\dot{\gamma}=kJ-k\langle J,\dot{\gamma}\rangle\dot{\gamma}
$$
If $J$ is normal, $\langle J,\dot{\gamma}\rangle=0$, so the Jacobi eq. reduces to
$$
D_t^2J=-kJ
$$

> [!lemma|3.2] Radial normal Jacobi fields in constant curvature
> If $M$ has constant curvature $k$, then radial normal $J$-fields on $\gamma$ have the form
> $$
> J(t)=u(t)E(t)
> $$
> where $E$ is parallel along $\gamma$ and
> $$
> u(t)=
> \begin{cases}
> \dfrac{1}{\sqrt{k}}\sin(\sqrt{k}\,t) & k>0 \\
> t & k=0 \\
> \dfrac{1}{\sqrt{-k}}\sinh(\sqrt{-k}\,t) & k<0
> \end{cases}
> $$

**Proof sketch**  
With $E$ parallel, the equation becomes $\ddot{u}=-ku$, so solve for $u$. This yields $(n-1)$ independent solutions.

## 4. Application: Constant Curvature Determines $g$ Locally

Let $x^i$ be geodesic normal coord's at $p$. The radial vector field is
$$
\partial_r=\frac{x^i}{r}\partial_i
$$
for $x\neq 0$.

Suppose $X=X^i\partial_i$ is tangent to the geodesic sphere $S_r$. Our goal is to compute $|X|$.

Define the Jacobi field
$$
J(t)=\frac{t}{r}X^i\partial_i
$$
so $J(r)=X$.

Gauss lemma: $X$ tangent to $S_r$ implies $\langle X,\partial_r\rangle=0$, hence $J$ is normal.

By the previous lemma, we can write $J=u_hE$ with $E$ parallel along $\gamma$. Then
$$
\begin{aligned}
|X|
&=|J(r)| \\
&=|u_h(r)|\,|E(r)| \\
&=|u_h(r)|\,|E(0)|
\end{aligned}
$$
Also $D_tJ(0)=E(0)$ since $\dot{u}_h(0)=1$, so
$$
E(0)=\frac{1}{r}X^i\partial_i\Big|_p
$$
At $p$, $\{\partial_i\}$ is an orthonormal basis.

This is easiest to write in polar coord's $(r,w)\in \mathbb{R}_+\times S^{n-1}$ with
$$
(r,w)\mapsto x=rw\in\mathbb{R}^n\mapsto \exp_p(x^iE_i)
$$
Let $h$ denote the standard metric on the unit sphere $S^{n-1}\subset\mathbb{R}^n$ (restriction of Euclidean).

Thus for constant curvature $h$, the metric in geodesic polar coord's at any pt has the form
$$
g=dr^2+u_h^2(r)\cdot h
$$
where
$$
u_h^2(r)=
\begin{cases}
r^2 & h=0 \\
\dfrac{1}{h}\sin^2(hr) & h>0 \\
\dfrac{1}{|h|}\sinh^2(|h|r) & h<0
\end{cases}
$$

> [!corollary|4.1] Local isometry
> Constant curvature metrics are locally isometric at all pts

## 5. Conjugate Points

### 5.1 When does $\exp_p$ fail to be a local diffeo?
Intuition: failure corresponds to crossing of nearby geodesics

This corresponds to a non-trivial Jacobi field vanishing at $p$ and $q$.

Suppose $M$ is complete, so there is a geodesic segment between any two pts $p$ and $q$.

> [!definition|5.1] Conjugate points
> $p$ and $q$ are conjugate pts if, along a geodesic segment $\gamma$ from $p$ to $q$, there is a non-zero Jacobi field along $\gamma$ that vanishes at both $p$ and $q$

> [!proposition|5.2] Local diffeo criterion via conjugate points
> Given $p\in M$, $\exp_p$ extends to a local diffeo in a nbd of $v$ iff the pt $q=\exp_p(v)$ is not conjugate to $p$ along
> $$
> \gamma(t)=\exp_p(tv)
> $$
