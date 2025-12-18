---
date: 2025-11-10
---

## 1. Relating $Rm$ to $\widetilde{Rm}$ for $M \subset \widetilde{M}$

> [!theorem|1.1] Weingarten Formula
> For $X,Y \in T(M)$ and $N \in N(M)$,
> $$
> \langle \widetilde{\nabla}_X N, Y\rangle = - \langle N, \mathrm{II}(X,Y)\rangle
> $$

**Proof.** On $M$, $\langle N, Y\rangle = 0$, hence
$$
\begin{aligned}
0
&= X\langle N, Y\rangle \\
&= \langle \widetilde{\nabla}_X N, Y\rangle + \langle N, \widetilde{\nabla}_X Y\rangle \\
&= \langle \widetilde{\nabla}_X N, Y\rangle + \langle N, \mathrm{II}(X,Y)\rangle
\end{aligned}
$$
which implies the formula.

---

> [!theorem|1.2] Gauss equation
> For $X,Y,Z,W \in T(M)$,
> $$
> Rm(X,Y,Z,W)
> = \widetilde{Rm}(X,Y,Z,W)
> + \langle \mathrm{II}(X,W), \mathrm{II}(Y,Z)\rangle
> - \langle \mathrm{II}(X,Z), \mathrm{II}(Y,W)\rangle
> $$

**Proof (sketch, following the note).** On $M$, by the Gauss formula,
$$
\widetilde{\nabla}_Y Z = \nabla_Y Z + \mathrm{II}(Y,Z)
$$
so
$$
\begin{aligned}
\widetilde{\nabla}_X\widetilde{\nabla}_Y Z
&=\widetilde{\nabla}_X\big(\nabla_Y Z + \mathrm{II}(Y,Z)\big) \\
\Rightarrow\quad
\langle \widetilde{\nabla}_X\widetilde{\nabla}_Y Z, W\rangle
&=\langle \nabla_X\nabla_Y Z, W\rangle
-\underbrace{\langle \mathrm{II}(Y,Z), \mathrm{II}(X,W)\rangle}_{\text{Weingarten}}
\end{aligned}
$$
and similarly with $X \leftrightarrow Y$. Also,
$$
\langle \widetilde{\nabla}_{[X,Y]} Z, W\rangle
=
\langle \nabla_{[X,Y]} Z, W\rangle
\quad\text{on }M
$$
Combining these inside the curvature definition gives the stated Gauss equation.

---

## 2. Special case: surface $\Sigma \subset \mathbb{R}^3$

$\Sigma$ is orientable if $\exists$ a unit normal vector field  
$$
\Rightarrow\quad N\Sigma \simeq \Sigma \times \mathbb{R}
\qquad (\text{trivial})
$$

With $N$ fixed, we can write $\mathrm{II}$ in a scalar form
$$
h(X,Y) := \langle \mathrm{II}(X,Y), N\rangle
\qquad \text{sym. }\binom{2}{0}\text{-tensor}
$$
or equivalently
$$
\mathrm{II}(X,Y) = h(X,Y)N
$$

By the Weingarten formula,
$$
h(X,Y) = -\langle \widetilde{\nabla}_X N, Y\rangle
\qquad\text{for vector fields }X,Y\text{ on }\Sigma
$$

In coords,
$$
\widetilde{\nabla}_{\partial_j}N = N_j
\qquad (\text{as a vector in }\mathbb{R}^3)
$$
so
$$
\widetilde{\nabla}_X N = dN(X)
$$
and Weingarten becomes
$$
h(X,Y) = \langle -dN(X), Y\rangle
$$

The Gauss curvature was
$$
K := \det dN
$$
Given an orthonormal basis for $T_pM$ $\{E_1,E_2\}$,
$$
K = \det\big[h(E_i,E_j)\big]
$$

For $\dim=2$, $Rm$ has only one independent function, and the Gauss equation gives
$$
\begin{aligned}
Rm(E_1,E_2,E_2,E_1)
&= \widetilde{Rm}(\cdots)
+ \langle \mathrm{II}(E_1,E_1), \mathrm{II}(E_2,E_2)\rangle
- \|\mathrm{II}(E_1,E_2)\|^2 \\
&=\underbrace{0}_{\text{for }\mathbb{R}^3}
+ \langle \mathrm{II}(E_1,E_1), \mathrm{II}(E_2,E_2)\rangle
- \|\mathrm{II}(E_1,E_2)\|^2 \\
&= K(p)
\end{aligned}
$$

We can reconstruct $Rm(\cdot,\cdot,\cdot,\cdot)$ using symmetries. The resulting formula applies to any surface, since $Rm$ is a local isometry invariant.

---

## 3. Curvature tensor identities on a Riemannian surface

> [!theorem|3.1] Curvature tensor on a surface
> For a Riemannian surface $\Sigma$, $\exists$ a function $K \in C^\infty(\Sigma)$ such that
> $$
> Rm(X,Y,Z,W)
> =K\cdot\big[\langle X,W\rangle\langle Y,Z\rangle-\langle X,Z\rangle\langle Y,W\rangle\big]
> $$
> or
> $$
> R_{ijkl}=K\big[g_{il}g_{jk}-g_{ik}g_{jl}\big]
> $$

> [!corollary|3.2] Ricci and scalar curvature on a surface
> For surfaces,
> $$
> Rc(X,Y)=K\langle X,Y\rangle
> \qquad (R_{ij}=Kg_{ij})
> $$
> and
> $$
> S=2K
> $$

---

## 4. Sectional curvature

Given $p \in M$, a plane $\Pi \subset T_pM$ defines a $2$-dim submanifold near $p$ by
$$
\Pi \longmapsto S_\Pi = \exp_p(\Pi)
$$

> [!definition|4.1] Sectional curvature
> The sectional curvature is the function
> $$
> \Pi \longmapsto K(\Pi)=\text{Gauss curvature of }\Sigma\text{ at }p
> $$
> where $\Sigma = S_\Pi$.

Let $Rm =$ curvature of $M$, $\overline{Rm} =$ curvature of $\Sigma$.  
If $X,Y$ span $\Pi$, then by the Gauss curvature formula,
$$
K(\Pi)=\frac{\overline{Rm}(X,Y,Y,X)}{|X|^2|Y|^2-\langle X,Y\rangle^2}
=:\,K(X,Y)
$$
In fact we can use $Rm$ in place of $\overline{Rm}$ here.

> [!proposition|4.2] Sectional curvature via $Rm$
> For $X,Y$ a basis for the plane $\Pi \subset T_pM$,
> $$
> K(X,Y)=\frac{Rm(X,Y,Y,X)}{|X|^2|Y|^2-\langle X,Y\rangle^2}
> $$

**Proof (as in the note).** Use $g$ for $M$, $\bar g$ for $\Sigma=\exp_p(\Pi)$.  
**Claim:** $\mathrm{II}$ vanishes on $T_p\Sigma$.

For $V \in \Pi$, let $\gamma(t)=\exp_p(tV)$. Then $\gamma$ is a geodesic in $M$, so
$$
D_t\dot\gamma=0
$$
By the Gauss formula,
$$
D_t\dot\gamma=\bar D_t\dot\gamma+\mathrm{II}(\dot\gamma,\dot\gamma)
$$
Since $\bar D_t\dot\gamma \in TM$ and $\mathrm{II}$ is normal,
$$
D_t\dot\gamma=0
\;\Rightarrow\;
\bar D_t\dot\gamma=0
\ \text{ and }\ 
\mathrm{II}(\dot\gamma,\dot\gamma)=0
$$
Evaluating at $t=0$ gives $\mathrm{II}(V,V)=0$, hence (by symmetry) $\mathrm{II}=0 on\ T_pM$ (i.e. on $T_p\Sigma \subset T_pM$).

By the Gauss equation,
$$
Rm(\cdots)=\overline{Rm}(\cdots)+(\text{terms involving }\mathrm{II})
$$
so
$$
Rm(\cdots)=\overline{Rm}(\cdots)\quad \text{on }T_p\Sigma
$$

**Note.** The argument only shows $\mathrm{II}=0$ at $p$, not at other points of $\Sigma$.
