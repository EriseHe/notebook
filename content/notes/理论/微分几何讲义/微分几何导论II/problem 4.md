## 1.1 Problem 4: Boundary Distance Determines Volume for Simple Metrics

### 1.1.1 Statement

Let $M$ be a compact manifold with smooth boundary $\partial M$. Let $g_1$ and $g_2$ be two simple Riemannian metrics on $M$. Assume
$$
d_{g_1}(x,y)=d_{g_2}(x,y)
\qquad
\text{for all }x,y\in\partial M
$$
Prove
$$
\operatorname{Vol}(M,g_1)=\operatorname{Vol}(M,g_2)
$$


## 1.2 Definitions and setup

### 1.2.1 Boundary distance function

For a Riemannian metric $g$, the boundary distance function is the restriction of the Riemannian distance function to boundary points:
$$
d_g|_{\partial M\times\partial M}
$$

where

$$
d_g(x,y)=\inf_{\gamma:x\to y}\ell_g(\gamma)
$$

and

$$
\ell_g(\gamma)=\int |\dot\gamma(t)|_g\,dt
$$

So the hypothesis means that the two metrics give the same distance between every pair of boundary points.

---

### 1.2.2 Simple metric

A metric $g$ on $M$ is called simple if:

$$
\boxed{
\begin{aligned}
&\text{the boundary }\partial M\text{ is strictly convex}\\
&\text{the metric is non-trapping}\\
&\text{there are no conjugate points}
\end{aligned}
}
$$

For this problem, the important consequences are:

$$
\boxed{
\text{simple}
\Longrightarrow
\text{each inward boundary vector gives one clean boundary-to-boundary geodesic}
}
$$

and

$$
\boxed{
\text{simple}
\Longrightarrow
\text{Santaló's formula applies}
}
$$

---

### 1.2.3 Unit sphere bundle

For a metric $g$, define

$$
SM=\{(x,v):x\in M,\ v\in T_xM,\ |v|_g=1\}
$$

The boundary of $SM$ is

$$
\partial SM=\{(x,v)\in SM:x\in\partial M\}
$$

Let $\nu$ be the inward-pointing unit normal vector field on $\partial M$.

Define

$$
\mu(x,v):=\langle v,\nu(x)\rangle_g
$$

Then

$$
\partial_+SM=\{(x,v)\in\partial SM:\langle v,\nu(x)\rangle_g\ge 0\}
$$

is the inward-pointing boundary of $SM$.

Similarly,

$$
\partial_-SM=\{(x,v)\in\partial SM:\langle v,\nu(x)\rangle_g\le 0\}
$$

is the outward-pointing boundary of $SM$.

---

### 1.2.4 Geodesic flow and exit time

For $(x,v)\in SM$, let

$$
\gamma_{x,v}(t)
$$

be the unit-speed geodesic satisfying

$$
\gamma_{x,v}(0)=x,
\qquad
\dot\gamma_{x,v}(0)=v
$$

The geodesic flow is

$$
\phi_t(x,v)=\bigl(\gamma_{x,v}(t),\dot\gamma_{x,v}(t)\bigr)
$$

For $(x,v)\in\partial_+SM$, define the exit time

$$
\tau_g(x,v)
$$

by

$$
\gamma_{x,v}(\tau_g(x,v))\in\partial M
$$

So $\tau_g(x,v)$ is the travel time of the geodesic starting at the boundary in the inward direction and returning to the boundary.

---

### 1.2.5 Lens data

The lens data of $(M,g)$ is

$$
\boxed{
\left(\tau_g|_{\partial_+SM},\alpha_g\right)
}
$$

where $\alpha_g$ is the scattering relation

$$
\alpha_g(x,v)=\phi_{\tau_g(x,v)}(x,v)
$$

For Problem 4, we only need the exit time part:

$$
\tau_g|_{\partial_+SM}
$$

---

## 1.3 The textbook facts we are allowed to use

### 1.3.1 Fact 1: Boundary distance determines the boundary metric

If

$$
d_{g_1}=d_{g_2}
\qquad
\text{on }\partial M\times\partial M
$$

then, after a boundary-fixing diffeomorphism, one may assume

$$
g_1|_{\partial M}=g_2|_{\partial M}
$$

Since volume is invariant under pullback by a diffeomorphism, this gauge change does not change the conclusion.

So from now on, assume

$$
\boxed{
g_1|_{\partial M}=g_2|_{\partial M}
}
$$

This implies that the boundary unit sphere bundles agree:

$$
\boxed{
\partial_+SM_{g_1}=\partial_+SM_{g_2}
}
$$

and the boundary measures agree:

$$
\boxed{
\mu_1\,d\Sigma^{2n-2}_{1}
=
\mu_2\,d\Sigma^{2n-2}_{2}
}
$$

We denote this common boundary measure by

$$
d\mu=\mu\,d\Sigma^{2n-2}
$$

---

### 1.3.2 Fact 2: Boundary distance determines exit time for simple metrics

For simple metrics,

$$
d_{g_1}=d_{g_2}
\qquad
\text{on }\partial M\times\partial M
$$

and

$$
g_1|_{\partial M}=g_2|_{\partial M}
$$

imply equality of lens data:

$$
\alpha_{g_1}=\alpha_{g_2},
\qquad
\tau_{g_1}|_{\partial_+SM}
=
\tau_{g_2}|_{\partial_+SM}
$$

For Problem 4, the needed part is

$$
\boxed{
\tau_{g_1}(x,v)=\tau_{g_2}(x,v)
\qquad
\text{for all }(x,v)\in\partial_+SM
}
$$

Geometrically, this is because in a simple manifold, an inward boundary vector determines a unique geodesic from one boundary point to another, and its length is exactly the boundary distance between the endpoints.

---

### 1.3.3 Fact 3: Santaló's formula

For a compact non-trapping manifold with strictly convex boundary,

$$
\boxed{
\int_{SM} f\,d\Sigma^{2n-1}
=
\int_{\partial_+SM}
\int_0^{\tau(x,v)}
f(\phi_t(x,v))\,dt
\,
\mu(x,v)\,d\Sigma^{2n-2}
}
$$

where

$$
\mu(x,v)=\langle v,\nu(x)\rangle_g
$$

Equivalently,

$$
d\mu=\mu\,d\Sigma^{2n-2}
$$

so Santaló becomes

$$
\boxed{
\int_{SM} f\,d\Sigma^{2n-1}
=
\int_{\partial_+SM}
\int_0^{\tau(x,v)}
f(\phi_t(x,v))\,dt
\,d\mu(x,v)
}
$$

---

## 1.4 Apply Santaló with $f\equiv 1$

For each metric $g_i$, $i=1,2$, apply Santaló's formula to

$$
f\equiv 1
$$

Then

$$
\begin{aligned}
\int_{SM_i}1\,d\Sigma^{2n-1}_i
&=
\int_{\partial_+SM_i}
\int_0^{\tau_i(x,v)}
1\,dt
\,d\mu_i(x,v) \\
&=
\int_{\partial_+SM_i}
\tau_i(x,v)\,d\mu_i(x,v)
\end{aligned}
$$

Thus

$$
\boxed{
\operatorname{Vol}(SM_i,g_i)
=
\int_{\partial_+SM_i}
\tau_i(x,v)\,d\mu_i(x,v)
}
$$

where

$$
\tau_i=\tau_{g_i}
$$

---

## 1.5 Compare the two metrics

Because the boundary distance functions agree, the boundary metrics agree after gauge, so

$$
\partial_+SM_1=\partial_+SM_2
$$

and

$$
d\mu_1=d\mu_2=d\mu
$$

Because the metrics are simple, boundary distance determines exit time:

$$
\tau_1=\tau_2
\qquad
\text{on }\partial_+SM
$$

Therefore

$$
\begin{aligned}
\operatorname{Vol}(SM_1,g_1)
&=
\int_{\partial_+SM_1}\tau_1(x,v)\,d\mu_1(x,v) \\
&=
\int_{\partial_+SM}\tau_1(x,v)\,d\mu(x,v) \\
&=
\int_{\partial_+SM}\tau_2(x,v)\,d\mu(x,v) \\
&=
\int_{\partial_+SM_2}\tau_2(x,v)\,d\mu_2(x,v) \\
&=
\operatorname{Vol}(SM_2,g_2)
\end{aligned}
$$

So

$$
\boxed{
\operatorname{Vol}(SM_1,g_1)
=
\operatorname{Vol}(SM_2,g_2)
}
$$

---

## 1.6 Relate $\operatorname{Vol}(SM,g)$ to $\operatorname{Vol}(M,g)$

The unit sphere bundle is fibered over $M$:

$$
SM=\bigcup_{x\in M}S_xM
$$

For each $x\in M$,

$$
S_xM=\{v\in T_xM:|v|_g=1\}
$$

is an $(n-1)$-dimensional unit sphere.

Let

$$
\sigma_{n-1}=\operatorname{Vol}(S^{n-1})
$$

Then

$$
\begin{aligned}
\operatorname{Vol}(SM,g)
&=
\int_{SM}1\,d\Sigma^{2n-1} \\
&=
\int_M\int_{S_xM}1\,dS_x\,dV_g(x) \\
&=
\int_M \sigma_{n-1}\,dV_g(x) \\
&=
\sigma_{n-1}\operatorname{Vol}(M,g)
\end{aligned}
$$

So for $i=1,2$,

$$
\boxed{
\operatorname{Vol}(SM_i,g_i)
=
\sigma_{n-1}\operatorname{Vol}(M,g_i)
}
$$

---

## 1.7 Final conclusion

From Step 4,

$$
\operatorname{Vol}(SM_1,g_1)
=
\operatorname{Vol}(SM_2,g_2)
$$

Using Step 5,

$$
\begin{aligned}
\sigma_{n-1}\operatorname{Vol}(M,g_1)
&=
\sigma_{n-1}\operatorname{Vol}(M,g_2)
\end{aligned}
$$

Since

$$
\sigma_{n-1}>0
$$

we divide by $\sigma_{n-1}$:

$$
\boxed{
\operatorname{Vol}(M,g_1)=\operatorname{Vol}(M,g_2)
}
$$

This proves the claim.

---









## 1.8 Compact derivation for oral presentation

$$
\begin{aligned}
d_{g_1}|_{\partial M\times\partial M}
=
d_{g_2}|_{\partial M\times\partial M}
&\Longrightarrow
g_1|_{\partial M}=g_2|_{\partial M}
&&\text{boundary determination} \\
&\Longrightarrow
d\mu_1=d\mu_2
&&\text{same boundary metric} \\
&\Longrightarrow
\tau_{g_1}|_{\partial_+SM}
=
\tau_{g_2}|_{\partial_+SM}
&&\text{simple metrics determine lens data}
\end{aligned}
$$

By Santaló with $f\equiv 1$,

$$
\begin{aligned}
\operatorname{Vol}(SM_i,g_i)
&=
\int_{SM_i}1\,d\Sigma^{2n-1}_i \\
&=
\int_{\partial_+SM_i}
\int_0^{\tau_i(x,v)}
1\,dt
\,d\mu_i(x,v) \\
&=
\int_{\partial_+SM_i}
\tau_i(x,v)\,d\mu_i(x,v)
\end{aligned}
$$

Hence

$$
\begin{aligned}
\operatorname{Vol}(SM_1,g_1)
&=
\int_{\partial_+SM}\tau_1\,d\mu \\
&=
\int_{\partial_+SM}\tau_2\,d\mu \\
&=
\operatorname{Vol}(SM_2,g_2)
\end{aligned}
$$

Finally,

$$
\begin{aligned}
\operatorname{Vol}(SM_i,g_i)
&=
\int_M\int_{S_xM}1\,dS_x\,dV_{g_i}(x) \\
&=
\sigma_{n-1}\operatorname{Vol}(M,g_i)
\end{aligned}
$$

Therefore

$$
\boxed{
\operatorname{Vol}(M,g_1)=\operatorname{Vol}(M,g_2)
}
$$