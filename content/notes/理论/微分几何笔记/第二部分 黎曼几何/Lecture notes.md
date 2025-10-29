---
title: "Lecture notes"
date: 2025-10-22
---
# 1 Covariant Derivative and Geodesic Equation

_Last time:_

Covariant derivative $D_t X$ along a curve $\gamma$:

$$
\gamma \text{ geodesic } \Longleftrightarrow D_t \dot{\gamma} = 0
$$

In coordinates:

$$
D_t \dot{\gamma} 
= \left[ \ddot{\gamma}^i + \Gamma^i_{jk} \dot{\gamma}^j \dot{\gamma}^k \right] \partial_i
$$


# 2 Exponential Map

Define  
$$
\exp : U \subset TM \longrightarrow M
$$
(_open set_)

For $V \in T_p M$,

$$
\exp_p(V) = \gamma_V(1)
$$

where $\gamma_V$ is a geodesic satisfying  

$$
\gamma_V(0) = p, \quad \dot{\gamma}_V(0) = V
$$

(assuming $\gamma_V$ is defined at $t = 1$).

$$
(U \subset TM \text{ if } \gamma_V \text{ exists at } t = 1)
$$

### 2.1.1 Diagram (conceptual sketch)

A tangent vector $V \in T_p M$ at point $p$ on the manifold $M$ defines a geodesic $\gamma_V(t)$.  
The endpoint of that geodesic at $t=1$ is $\exp_p(V)$.

$$
p \xrightarrow[\text{along geodesic } \gamma_V]{\ \ V\ \ } \exp_p(V)
$$
# 3 Rescaling Lemma

**Lemma.**  
If $\gamma$ is a geodesic and $c > 0$,  
then we can define a new geodesic $\eta(t) = \gamma(ct)$.

**Proof.**  
The chain rule gives  
$$
\dot{\eta} = c \dot{\gamma}.
$$
**Check:** compare covariant accelerations:
$$
\nabla_{\dot{\eta}} \dot{\eta} 
= c^2 \nabla_{\dot{\gamma}} \dot{\gamma}.
$$
Since $\nabla_{\dot{\gamma}} \dot{\gamma} = 0$,  
it follows that $\nabla_{\dot{\eta}} \dot{\eta} = 0.$ Hence, $\eta$ is also a geodesic.

**Corollary.**  
$$
\gamma_V(t) = \exp_p(tV).
$$

**Proposition.**  
The set $U$ on which $\exp$ is defined is open in $TM$,  
and $\exp$ is smooth.

**Proof.**  
The proof reduces to an ODE regularity argument. We consider the system:
$$
\ddot{u}^j = f^j(t, u),
$$
where $f^j$ is a smooth function of $(t, u, \dot{u}) \in \mathbb{R} \times \mathbb{R}^n \times \mathbb{R}^n.$ The initial conditions are
$$
u^j(t = 0) = p^j \in \mathbb{R}, \quad
\dot{u}^j(t = 0) = v^j \in \mathbb{R}
$$
Thus, by standard ODE theory, solutions depend smoothly on initial data —  
implying $\exp$ is smooth and defined on an open subset $U \subset TM.$


# 4 Differential of the Exponential Map

In **Euclidean space** $\mathbb{R}^n$:
$$
\exp_p(V) = p + V
$$
The term *"exponential"* refers to the property of its **differential**:
$$
\begin{align} 
\exp_p   :   &  T_p M \longrightarrow M  \\
d(\exp_p )_X :   &  T_X (T_p M) \longrightarrow T_{\exp_p(X)} M
\end{align}
$$
But $T_p M$ is a vector space, so we have a **natural identification**:
$$
T_X (T_p M) \cong T_p M.
$$
Therefore, for $X = 0$, we get:
$$
d(\exp_p)_0 : T_p M \longrightarrow T_p M.
$$
# 5 Computation of $d(\exp_p)_0$

**By definition:**
$$
d(\exp_p)_X(V) 
= \left. \frac{d}{dt} \exp_p(X + tV) \right|_{t=0}
$$
At $X = 0$:
$$
\begin{align}
d(\exp_p)_0(V) 
= &  \left. \frac{d}{dt} \exp_p(tV) \right|_{t=0} \\
= &  \dot{\gamma}_V(0)  \\
= &  V 
\end{align}
$$

where we let $\gamma_V(t) = \exp_p(tV)$. Note that $\gamma_V(0) = p\Longrightarrow\dot{\gamma}_V(0) = V.$ Then:

$$
\frac{d}{dt} \exp_p(tV) \Big|_{t=0} 

$$
Hence:
$$
\boxed{d(\exp_p)_0 = \mathrm{id} \text{ on } T_p M.}
$$
# 6 Inverse Function Theorem (Recall)

Given $f : U \subset \mathbb{R}^n \to V \subset \mathbb{R}^n$ a $C^\infty$ function, if $df(x_0)$ is invertible for some $x_0 \in U$, then there exist neighborhoods $U\ni x_0$, $V\ni f(x_0)$ such that

$$
f : U\longrightarrow V
$$
is a **diffeomorphism**. ($C^\infty$ map with $C^\infty$ inverse).

**Theorem**

Because $d(\exp_p)_0 = \mathrm{id}$, the exponential map $\exp_p$ is a **local diffeomorphism** near $0$. Thus, there exist neighborhoods  
$$
U \subset T_p M, \quad V \subset M \quad\text{ with
} (0 \in U)
$$
with , such that
$$
\exp_p : U \longrightarrow V
$$
is a diffeomorphism.

### 7.1.1 Example: The Unit Sphere ${} \mathbb{S}^2 \subset \mathbb{R}^3 {}$

At point $p \in \mathbb{S}^2$:
$$
\exp_p : \{\, V \in T_p M : \|V\| < \pi \,\} \longrightarrow \mathbb{S}^2 \setminus \{-p\}.
$$
That is, the exponential map is a diffeomorphism from the open ball
$$
B_\pi(0) \subset T_p S^2
$$
onto the sphere with the antipodal point removed:
$$
S^2 \setminus \{-p\}.
$$
*Geometrically:*  
on the sphere, geodesics starting at $p$ remain non-intersecting up to distance $\pi$;  
beyond that, they meet again at the antipodal point $-p$.

# 8 Geodesic Normal Coordinate at $p$

Choose an orthonormal basis 