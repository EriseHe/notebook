## Problem 3

**Statement.** Let $M$ be a manifold with smooth boundary $\partial M$. Let $g$ be a Riemannian metric smooth on $M$ such that $\partial M$ is strictly convex. Prove that for $(x,v)\in \partial_+SM\setminus \partial_0SM$, the geodesic $\gamma_{x,v}(t)$ stays in $M$ for sufficiently small $t>0$.

### Big picture / idea

Near a boundary point, a manifold with boundary looks like a half-space:
$$
H^n=\{(x^1,\dots,x^n)\in \mathbb{R}^n : x^n\ge 0\}.
$$

So locally the boundary is just the hyperplane
$$
x^n=0,
$$
and the interior is the region
$$
x^n>0.
$$

Now if a geodesic starts at the boundary and its initial velocity points strictly inward, then its $x^n$-coordinate must start increasing immediately. That means for small positive time the geodesic moves into the interior, hence stays in $M$.

So the proof is really a one-variable calculus argument applied to the function
$$
h(t):=\rho(\gamma(t)),
$$
where $\rho$ is a boundary defining function.

The important conceptual point is:

- $\rho=0$ on the boundary
- $\rho>0$ in the interior
- if $h'(0)>0$, then $h(t)>0$ for small $t>0$

That is the whole mechanism.

---

### Step 1: choose a boundary chart

Because $M$ is a smooth manifold with boundary, there exists a coordinate neighborhood $(U,\varphi)$ around $x$ such that
$$
\varphi(U)\subset H^n=\{(x^1,\dots,x^n)\in \mathbb{R}^n : x^n\ge 0\},
$$
with
$$
\varphi(x)=0,
$$
and
$$
\varphi(U\cap \partial M)=\varphi(U)\cap \{x^n=0\}.
$$

Thus in these coordinates:

- $M$ corresponds locally to the half-space $x^n\ge 0$
- $\partial M$ corresponds locally to $x^n=0$
- $\operatorname{Int}(M)$ corresponds locally to $x^n>0$

Define the local boundary defining function
$$
\rho := x^n \circ \varphi.
$$

Then on $U$ we have
$$
U\cap M = \{\rho \ge 0\},
\qquad
U\cap \partial M = \{\rho = 0\},
\qquad
U\cap \operatorname{Int}(M)=\{\rho>0\}.
$$

Also
$$
d\rho \neq 0
\qquad \text{on } U\cap \partial M.
$$

---

### Step 2: study the boundary defining function along the geodesic

Let
$$
\gamma(t):=\gamma_{x,v}(t)
$$
be the geodesic determined by
$$
\gamma(0)=x,
\qquad
\dot\gamma(0)=v.
$$

Define
$$
h(t):=\rho(\gamma(t)).
$$

This is a smooth real-valued function of $t$ for $|t|$ small, because $\rho$ and $\gamma$ are smooth.

At $t=0$,
$$
\begin{aligned}
h(0)
&= \rho(\gamma(0)) \\
&= \rho(x) \\
&= 0,
\end{aligned}
$$
since $x\in \partial M$.

Differentiate:
$$
\begin{aligned}
h'(0)
&= \frac{d}{dt}\Big|_{t=0}\rho(\gamma(t)) \\
&= d\rho_x(\dot\gamma(0)) \\
&= d\rho_x(v).
\end{aligned}
$$

---

### Step 3: interpret the condition $(x,v)\in \partial_+SM\setminus \partial_0SM$

The set $\partial_0SM$ consists of tangent vectors at the boundary that are tangent to $\partial M$. So
$$
(x,v)\notin \partial_0SM
$$
means $v$ is **not tangent** to the boundary.

The set $\partial_+SM$ consists of boundary unit vectors pointing inward. In terms of the defining function $\rho$, inward means
$$
d\rho_x(v)>0.
$$

Therefore, from
$$
(x,v)\in \partial_+SM\setminus \partial_0SM,
$$
we get
$$
h'(0)=d\rho_x(v)>0.
$$

This is the key inequality.

---

### Step 4: use one-variable calculus

Since $h'$ is continuous and $h'(0)>0$, there exists $\varepsilon>0$ such that
$$
h'(t)>\frac12 h'(0)>0
\qquad \text{for all } 0\le t\le \varepsilon.
$$

Now integrate from $0$ to $t$:
$$
\begin{aligned}
h(t)-h(0)
&= \int_0^t h'(s)\,ds \\
&> \int_0^t \frac12 h'(0)\,ds \\
&= \frac{t}{2}h'(0).
\end{aligned}
$$

Since $h(0)=0$ and $h'(0)>0$, this gives
$$
\begin{aligned}
h(t)
&> \frac{t}{2}h'(0) \\
&> 0
\end{aligned}
$$
for every $t\in (0,\varepsilon]$.

Thus
$$
\rho(\gamma(t))>0
\qquad \text{for } 0<t\le \varepsilon.
$$

But $\rho>0$ is exactly the local condition for being in the interior of $M$. Therefore
$$
\gamma(t)\in \operatorname{Int}(M)\subset M
\qquad \text{for } 0<t\le \varepsilon.
$$

Hence
$$
\boxed{\gamma_{x,v}(t)\text{ stays in }M\text{ for sufficiently small }t>0.}
$$

---

### Why strict convexity is not actually used here

For the statement as written, the assumption of strict convexity is stronger than needed.

The reason is simple:

- because $(x,v)\notin \partial_0SM$, the geodesic starts with a **nonzero normal component**
- because $(x,v)\in \partial_+SM$, that normal component points **into** $M$
- so the first derivative $h'(0)$ is already positive, and that alone is enough

Strict convexity becomes important in the harder borderline case
$$
(x,v)\in \partial_0SM,
$$
where the initial velocity is tangent to the boundary. In that case
$$
h'(0)=0,
$$
so one must look at the second derivative $h''(0)$, and strict convexity is exactly what controls that sign.

So for this problem, the proof is actually more elementary than the hypotheses might suggest.

---
