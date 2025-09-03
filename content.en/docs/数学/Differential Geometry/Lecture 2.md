# 1. Parametrized Curves in $\mathbb{R}^3$

Let $I\subset \mathbb{R}$ be an open interval. A **(smooth) curve** is a map
$$
\gamma:I\to\mathbb{R}^3,\qquad \gamma\in C^\infty.
$$
We write $\dot\gamma(t)=\dfrac{d\gamma}{dt}(t)$ for its **velocity**.
## 1.1 Regular Curves

A curve $\gamma$ is **regular** if
$$
\dot\gamma(t)\neq 0 \quad\text{for all } t\in I .
$$
### 1.1.1 Arc-Length Function

Fix $t_0\in I$. The **arc-length** from $t_0$ to $t\in I$ is

$$
s(t)\;=\;\int_{t_0}^{t}\bigl\lVert \dot\gamma(u)\bigr\rVert\,du .
$$

Differentiating,

$$
\frac{ds}{dt}=\bigl\lVert \dot\gamma(t)\bigr\rVert
\quad\text{(the speed).}
$$

For a regular curve, $\frac{ds}{dt}>0$ for all $t\in I$; hence $s(t)$ is strictly increasing and smooth.
### 1.1.2 Re-parametrization by Arc Length

By the Inverse Function Theorem, the monotone smooth map $s:I\to s(I)$ has a smooth inverse $t=t(s)$.

Define the **unit-speed (arc-length) reparametrization**
$$
\widetilde\gamma(s)\;=\;\gamma\bigl(t(s)\bigr), \qquad s\in s(I).
$$
Then
$$
\frac{d\widetilde\gamma}{ds}
= \dot\gamma\bigl(t(s)\bigr)\,\frac{dt}{ds}
= \dot\gamma\bigl(t(s)\bigr)\,\frac{1}{\lVert \dot\gamma\bigl(t(s)\bigr)\rVert},
$$
so
$$
\bigl\lVert \widetilde\gamma'(s)\bigr\rVert = 1
\quad\text{for all } s\in s(I).
$$

**Lemma.** Every regular curve admits a reparametrization by arc length (i.e., a unit-speed parameterization).

## 1.2 Example: Circle of radius $r$ (angular velocity $\omega$)

Let

$$
\gamma(t)=\big(r\cos(\omega t),\, r\sin(\omega t)\big),\qquad t\in\mathbb{R}.
$$

1. **Speed**

   $$
   \|\dot\gamma(t)\|=\|(-r\omega\sin(\omega t),\, r\omega\cos(\omega t))\|=r\omega .
   $$

2. **Arc length and inversion** (take $s(0)=0$):

   $$
   s(t)=\int_0^t \|\dot\gamma(u)\|\,du=r\omega t
   \quad\Rightarrow\quad
   t=\frac{s}{r\omega}.
   $$

3. **Unit-speed reparametrization**
$$
   \gamma(s)=\gamma\!\left(\tfrac{s}{r\omega}\right)
   =\big(r\cos(\tfrac{s}{r}),\, r\sin(\tfrac{s}{r})\big).
   $$
4. **Derivatives w\.r.t. arc length $s$**
$$
   \gamma'(s)=\Big(-\sin\!\big(\tfrac{s}{r}\big),\, \cos\!\big(\tfrac{s}{r}\big)\Big),
   \qquad
   \|\gamma'(s)\|=1,
$$
$$
   \gamma''(s)=\Big(-\tfrac{1}{r}\cos\!\big(\tfrac{s}{r}\big),\, -\tfrac{1}{r}\sin\!\big(\tfrac{s}{r}\big)\Big),
   \qquad
   \|\gamma''(s)\|=\tfrac{1}{r}.
   $$
Hence the **curvature of the circle** is $\kappa=\dfrac{1}{r}$.
## 1.2 Curvature (definition)
For a **regular** curve $\gamma:I\to\mathbb{R}^3$ written in **unit-speed** (arc-length) parameter $s$,
$$
\boxed{\;\kappa(s)=\|\gamma''(s)\|\;}
$$
(i.e., curvature is the norm of the second derivative for a unit-speed parametrization).
### 1.2.1 Orthogonality of velocity and acceleration in unit speed

**Observation.** For a unit-speed parametrization,
$$
\gamma'(s)\cdot\gamma'(s)=1.
$$
Differentiating,
$$
2\,\gamma'(s)\cdot\gamma''(s)=0
\quad\Rightarrow\quad
\gamma'(s)\perp \gamma''(s).
$$
Thus the acceleration vector is normal to the curve when parametrized by arc length.
### 1.2.2 Chain Rule for Re-parametrization

In general, the arc-length function $s(t)$ is difficult to compute explicitly.
Given a parametrized curve $\gamma(t)$, we can instead use the chain rule.

Let
$$
v := \frac{ds}{dt} = \|\dot{\gamma}(t)\| \quad\text{(the speed)}.
$$
Then
$$
\frac{d}{dt} = v \frac{d}{ds}, \qquad 
\frac{d}{ds} = \frac{1}{v}\frac{d}{dt}.
$$
From this it follows that
$$
\frac{d\gamma}{ds} = \frac{1}{v}\dot{\gamma}(t),
$$
which is the **unit tangent vector**. Differentiating again,
$$
\begin{aligned}
\frac{d^2\gamma}{ds^2}
&= \frac{1}{v}\frac{d}{dt}\!\left(\frac{\dot{\gamma}(t)}{v}\right) \\[6pt]
&= \frac{1}{v}\left(\frac{\ddot{\gamma}(t)}{v} - \frac{\dot{v}}{v^2}\dot{\gamma}(t)\right).
\end{aligned}
$$
## 1.3 Formula for Curvature

Thus the curvature is
$$
\kappa = \left\lVert \frac{d^2\gamma}{ds^2} \right\rVert 
= \frac{\|\;v^2\ddot{\gamma}(t) - \dot{v}\,\dot{\gamma}(t)\;\|}{v^3}.
$$
**Cross Product Formula (Check)**: In $\mathbb{R}^3$, an equivalent formula for curvature is
$$
\boxed{\;\kappa = \frac{\|\dot{\gamma}(t)\times\ddot{\gamma}(t)\|}{\|\dot{\gamma}(t)\|^3}\;}
$$
This form is often easier to compute in practice.

# 2. Surfaces in $\mathbb{R}^3$
## 2.1 Coordinate patch

A **coordinate patch** is a $C^\infty$ map
$$
X: U \;\to\; \mathbb{R}^3,
$$
where $U \subset \mathbb{R}^2$ is an **open, connected** set, such that $X$ is **regular**. We will use coordinates
$$
(u^1, u^2) \quad\text{on } U.
$$

> [!remark|*]
> We will use **Einstein summation convention**: upper and lower indices are used to signify how objects transform under a change of coordinates. 
> This will streamline notation when expressing surface geometry (e.g., metric tensor, Christoffel symbols, curvature).
### 2.1.1 Coordinate Vectors

$$
\sigma_i := \frac{\partial X}{\partial u^i}, \qquad i=1,2.
$$
These are vectors in $\mathbb{R}^3$, tangent to the surface.
### 2.1.2 Regularity

**Regular** means:

* The differential $DX$ has maximal rank (=2).
* Equivalently, $\sigma_1$ and $\sigma_2$ are linearly independent at each point.

## 2.2 Smooth Surfaces

A **smooth surface** $S \subset \mathbb{R}^3$ is a set equipped with an **atlas** of regular coordinate patches such that every point of $S$ lies in some patch.

Blackboard Sketches:
* A grid in the $(u^1,u^2)$-plane maps to a curvilinear grid on the surface in $\mathbb{R}^3$.
* The tangent vectors $\sigma_1, \sigma_2$ span the tangent plane at each point.
* Regularity means these tangent vectors are independent, so the patch is locally non-degenerate.
