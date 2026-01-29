---
date: 2025-11-12
---

## 1. Sectional curvature determines the full curvature tensor

> [!lemma|1.1] Sectional curvature determines $\operatorname{Rm}$
> The sectional curvature function $K(\cdot,\cdot)$ determines $\operatorname{Rm}(\cdot,\cdot,\cdot,\cdot)$
>
> **Proof**  
> $K(X,Y)$ determines $\operatorname{Rm}(X,Y,Y,X)$.  
> Using the symmetries, we can show this determines $\operatorname{Rm}(\ \cdot\ ,\ \cdot\ ,\ \cdot\ ,\ \cdot\ )$ completely.

### 1.1 Interpreting Ricci in terms of sectional curvature

Recall that
$$
\operatorname{Rc}(Y,Z)=\sum_{i=1}^n \operatorname{Rm}(E_i,Y,Z,E_i)
$$
for $\{E_i\}$ orthonormal.

Since $\operatorname{Rc}$ is bilinear and symmetric, it is determined by its diagonal values.

Given a unit vector $V\in T_pM$, set $E_1=V$ and complete to an orthonormal basis $E_2,\dots,E_n$. Then
$$
K(V,E_i)=\operatorname{Rm}(E_i,V,V,E_i)
$$
and hence
$$
\operatorname{Rc}(V,V)=\sum_{i=2}^n K(V,E_i)
$$
So $\operatorname{Rc}(V,V)$ is the “average” sectional curvature over sections containing $V$.

### 1.2 Special case: $\dim=3$

For an orthonormal basis $E_1,E_2,E_3$
$$
\begin{pmatrix}
\operatorname{Rc}(E_1,E_1)\\
\operatorname{Rc}(E_2,E_2)\\
\operatorname{Rc}(E_3,E_3)
\end{pmatrix}
=
\begin{pmatrix}
1&0&1\\
1&1&0\\
0&1&1
\end{pmatrix}
\begin{pmatrix}
K(E_1,E_2)\\
K(E_2,E_3)\\
K(E_3,E_1)
\end{pmatrix}
$$
This matrix is invertible, so $\operatorname{Rc}$ determines $K$ (and $\operatorname{Rm}$) for $\dim=3$.

### 1.3 Scalar curvature

Scalar curvature $S=\operatorname{tr}\operatorname{Rc}$, so
$$
S=\sum_{j\neq k} K(E_j,E_k)
$$
for an orthonormal basis.

Thus $S$ is the “average” sectional curvature over all sections.

---

## 2. Sample curvature theorems

> [!theorem|2.1] Cartan–Hadamard (1898, 1928)
> If $M$ is a complete Riemannian manifold with negative sectional curvature $(K(\cdot,\cdot)\le 0\text{ at all pts})$, then for any $p\in M$, $\exp_p:T_pM\to M$ is a covering map.

> [!definition|2.2] Covering map
> A map $\pi:\widetilde M\to M$ is a covering map if $\pi$ is a smooth surjective map such that every point of $M$ has a neighborhood $U$ such that each component of $\pi^{-1}(U)$ maps diffeomorphically to $U$.

> [!remark|2.3] Universal cover in Cartan–Hadamard
> (CH $\Rightarrow$ the “universal cover” of $M$ is $\cong\mathbb{R}^n$)

> [!theorem|2.4] Bonnet (1867, surfaces)
> Suppose $M$ is a complete Riemannian manifold with
> $$
> K(\cdot,\cdot)\ge \frac{1}{R^2}>0
> $$
> Then $M$ is compact and $\operatorname{diam}M\le \pi R$  
> (In a good proof $\Rightarrow$ the universal cover of $M$ is compact)

> [!proposition|2.5] Classification of manifolds with constant curvature
> If $K(\cdot,\cdot)=\text{constant}$, then by scaling we can assume $K(\cdot,\cdot)=-1,0,\text{ or }1$.  
> The universal cover is isometric to
> $$
> \left\{
> \begin{aligned}
> S^n &\qquad K=1\\
> \mathbb{R}^n &\qquad K=0\\
> \mathbb{H}^n &\qquad K=-1
> \end{aligned}
> \right.
> $$

---

## 3. Jacobi fields

Our goal is to understand how geodesics behave under curvature assumptions (intuitively: positive vs flat vs negative curvature).

### 3.1 Variations and the variation field

Consider a geodesic $\gamma(t)$ extended to a variation $\Gamma[s,t]$ (smooth).

For each $s$, the curve $\gamma_s=\Gamma[s,\cdot]$ is regular.

The variation field of $\Gamma$ is
$$
V:=\partial_s\Gamma\big|_{s=0}
$$

Define
$$
S:=\partial_s\Gamma,\qquad T:=\partial_t\Gamma
$$
so $V(t)=S(0,t)$.

> [!lemma|3.1] Symmetry lemma
> $$
> D_tS=D_sT
> $$
> For the proof, we use the fact that $[S,T]=0$.

> [!lemma|3.2] Commutation with curvature along a variation
> For a vector field $Z$ along $\Gamma$
> $$
> D_sD_tZ-D_tD_sZ=R(S,T)Z
> $$
>
> **Proof** (by definition)
> $$
> \begin{aligned}
> R(S,T)Z
> &=\nabla_S\nabla_T Z-\nabla_T\nabla_S Z-\nabla_{[S,T]}Z\\
> &=\nabla_S\nabla_T Z-\nabla_T\nabla_S Z
> \qquad \underbrace{([S,T]=0)}_{\text{used here}}
> \end{aligned}
> $$

### 3.2 The Jacobi equation

> [!theorem|3.3] Jacobi equation
> Suppose $\Gamma$ is a variation of $\gamma$ such that the curves $\gamma_s$ are geodesic. Then the variation field $V$ satisfies
> $$
> D_t^2V+R(V,\dot\gamma)\dot\gamma=0
> $$
>
> **Proof**  
> $\gamma_s$ geodesic means $D_tT=0$ on $\Gamma$. Apply $D_s$
> $$
> \begin{aligned}
> 0
> &=D_sD_tT\\
> &=D_tD_sT+R(S,T)T
> \qquad \underbrace{([S,T]=0)}_{\text{used here}}
> \end{aligned}
> $$
> Using $D_sT=D_tS$ (symmetry lemma)
> $$
> 0=D_t^2S+R(S,T)T
> $$
> Now use $S(0,t)=V(t)$ and $T(0,t)=\dot\gamma(t)$ to obtain
> $$
> D_t^2V+R(V,\dot\gamma)\dot\gamma=0
> $$

> [!definition|3.4] Jacobi field
> A Jacobi field is a vector field $V$ along a geodesic $\gamma$ such that
> $$
> D_t^2V+R(V,\dot\gamma)\dot\gamma=0
> $$

### 3.3 Local form (parallel orthonormal frame)

In local coordinates, choose an orthonormal frame $\{E_i\}$ which is parallel along $\gamma$
$$
\langle E_i,E_j\rangle=\delta_{ij},\qquad D_tE_i=0
$$
Let
$$
V=v^iE_i
$$
Then, since the frame is parallel,
$$
D_t^2V=\ddot v^iE_i
$$
and the Jacobi equation becomes
$$
\ddot v^i+R_{jkl}{}^{i}\,v^j\,\dot\gamma^k\,\dot\gamma^l=0
$$
This is a 2nd order linear system, so we have existence and uniqueness given $v^i(0)$ and $\dot v^i(0)$ for $i=1,\dots,n$.

> [!proposition|3.5] Jacobi initial value problem
> Given a geodesic $\gamma$ with $p=\gamma(0)$ and $X,Y\in T_pM$, there is a unique Jacobi field $J$ with
> $$
> J(0)=X,\qquad \partial_tJ(0)=Y
> $$

### 3.4 Trivial cases and normal Jacobi fields

Trivial cases
$$
\begin{aligned}
J_0(t)&=\dot\gamma(t)
\qquad \text{corresponds to}\qquad
\Gamma[s,t]=\gamma(t+s)\\
J_1(t)&=t\,\dot\gamma(t)
\qquad \text{corresponds to}\qquad
\Gamma[s,t]=\gamma(e^s t)
\end{aligned}
$$
Note that these are both tangential to $\gamma$.

> [!definition|3.6] Normal Jacobi field
> A normal Jacobi field along $\gamma$ satisfies $J\perp \dot\gamma$ at all pts
