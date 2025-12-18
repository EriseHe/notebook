---
title:
date: 2025-11-03
---
# MATH 545 — Differential Geometry I (11/03/25)

## 1. Hopf–Rinow: geodesic completeness $\Rightarrow$ metric completeness

> [!theorem|1.1] Thm (Hopf–Rinow 1931)
> For a connected Riemannian manifold, **metric completeness** and **geodesic completeness** are equivalent

We have checked **metric $\Rightarrow$ geodesic**.  
Goal today: **geodesic $\Rightarrow$ metric**.

---

> [!lemma|1.2] Lemma
> Suppose $\exp_p$ is defined on all of $T_pM$ (i.e. all geodesic rays from $p$ exist for $t\to\infty$).  
> Then for all $q\in M$, there exists a **length-minimizing geodesic** from $p$ to $q$

### 1.1 Aiming at $q$

> [!definition|1.3] “aims at $q$”
> A geodesic segment $\gamma:[0,b]\to M$ with $\gamma(0)=p$ **aims at $q$** if
> $$
> d(p,q)=d\bigl(p,\gamma(b)\bigr)+d\bigl(\gamma(b),q\bigr)
> $$

---

### 1.2 Claim 1 (existence of aiming segments)

> [!lemma|1.4] Claim 1
> There exists a geodesic segment starting at $p$ that aims at $q$

**Proof.** Choose $\epsilon>0$ so that the closed geodesic ball $\overline{B_\epsilon(p)}$ is well-defined, and set $S_\epsilon=\partial B_\epsilon(p)$.

- If $q\in\overline{B_\epsilon(p)}$, then we already know the radial geodesic from $p$ to $q$ is length-minimizing (Gauss Lemma)
- Assume $q\notin\overline{B_\epsilon(p)}$. Then $S_\epsilon$ is compact (since $\exp_p$ gives a homeomorphism from $\{\,|v|=\epsilon\,\}$ onto $S_\epsilon$), so the continuous function $d(\,\cdot\,,q)$ attains its minimum on $S_\epsilon$ at some $x\in S_\epsilon$

Let $\Gamma$ be any piecewise regular path from $p$ to $q$. Since $q\notin\overline{B_\epsilon(p)}$, the path $\Gamma$ must meet $S_\epsilon$; let $y\in S_\epsilon$ be such an intersection point, and write $\Gamma=\sigma_1*\sigma_2$ where $\sigma_1$ goes from $p$ to $y$ and $\sigma_2$ goes from $y$ to $q$.

Then
- $l(\sigma_1)\ge \epsilon$ (any curve from $p$ to $S_\epsilon$ has length at least the radius)
- $l(\sigma_2)\ge d(y,q)\ge d(x,q)$ by the definition of $x$

Hence
$$
\begin{aligned}
l(\Gamma)
&=l(\sigma_1)+l(\sigma_2)\\
&\ge \epsilon + d(x,q)
\end{aligned}
$$
Taking the infimum over all such $\Gamma$ gives
$$
d(p,q)\ge \epsilon+d(x,q)
$$
On the other hand, by the triangle inequality and $d(p,x)=\epsilon$,
$$
d(p,q)\le d(p,x)+d(x,q)=\epsilon+d(x,q)
$$
Therefore
$$
d(p,q)=\epsilon+d(x,q)
$$
So the radial geodesic segment from $p$ to $x$ aims at $q$ by definition  
$\square$

---

### 1.3 Claim 2 (extend aiming all the way to $q$)

Now set $T=d(p,q)$ and let
$$
I=\{\,l(\gamma):\gamma\ \text{is a geodesic aimed at }q\,\}\subset(0,T]
$$
Claim 1 $\Rightarrow I\neq\varnothing$. Continuity of distance $\Rightarrow I=(0,b]$ for some $b\le T$.

> [!lemma|1.5] Claim 2
> $I=(0,T]$

**Proof.** We show $I$ is open in $(0,T]$.

Let $t<T$ with $t\in I$, and let $\gamma$ be a geodesic that aims at $q$ with $l(\gamma)=t$. Write $y=\gamma(t)$.

Choose $\delta>0$ so that $\overline{B_\delta(y)}$ is a geodesic ball and $q\notin\overline{B_\delta(y)}$. By Claim 1 (applied at the point $y$), we can choose $z\in S_\delta(y)$ so that the radial geodesic segment $\tau$ from $y$ to $z$ aims at $q$.

Since $\gamma$ aims at $q$ and $\tau$ aims at $q$,
$$
\begin{aligned}
T
&=d(p,q)\\
&=\underbrace{d(p,y)}_{=\,t}+\underbrace{d(y,q)}_{=\,T-t}
\end{aligned}
$$
and
$$
\begin{aligned}
d(y,q)
&=\underbrace{d(y,z)}_{=\,\delta}+d(z,q)
\end{aligned}
$$
so
$$
d(z,q)=T-t-\delta
$$
By the triangle inequality,
$$
\begin{aligned}
T
&=d(p,q)\\
&\le d(p,z)+d(z,q)\\
&=d(p,z)+(T-t-\delta)
\end{aligned}
$$
Hence $d(p,z)\ge t+\delta$.

But the concatenated curve $\gamma+\tau$ goes from $p$ to $z$ and has length
$$
l(\gamma+\tau)=l(\gamma)+l(\tau)=t+\delta
$$
So $\gamma+\tau$ is length-minimizing from $p$ to $z$.

By the Variation Theorem, a length-minimizing curve is a regular geodesic, hence $\gamma+\tau$ is a geodesic segment from $p$ of length $t+\delta$ that aims at $q$. Therefore $t+\delta\in I$.

So $I$ is open. Since $I$ is also of the form $(0,b]$, we must have $b=T$, i.e. $I=(0,T]$  
$\square$

---

### 1.4 Conclusion of Lemma 1.2

Since $T=d(p,q)\in I$, there exists a geodesic segment of length $T$ starting at $p$ that aims at $q$.  
But “aims at $q$” at length $T$ forces $\gamma(T)=q$, hence we obtain a **length-minimizing geodesic from $p$ to $q$**  
$\square$

---

> [!theorem|1.6] Thm (Improved part 2 of Hopf–Rinow)
> Suppose $\exp_p$ exists on all of $T_pM$ for some $p\in M$.  
> Then $M$ is metrically complete

**Proof.** Let $\{q_i\}\subset M$ be a Cauchy sequence. By Lemma 1.2, for each $i$ there exists $v_i\in T_pM$ such that
$$
q_i=\exp_p(v_i)
$$
and
$$
\|v_i\|=d(p,q_i)
$$
Since $\{q_i\}$ is Cauchy, the numbers $d(p,q_i)$ are bounded, hence $\|v_i\|\le C$ for all $i$.

Thus $\{v_i\}$ lies in the closed ball $\{\,v\in T_pM:\|v\|\le C\,\}$, so there exists a subsequence $\{v_{i_k}\}$ and a vector $v$ such that
$$
v_{i_k}\to v
$$
By continuity of $\exp_p$,
$$
q_{i_k}=\exp_p(v_{i_k})\to \exp_p(v)=:q
$$
Hence $\{q_i\}$ has a convergent subsequence, and since $\{q_i\}$ is Cauchy, it follows that $q_i\to q$. Therefore $M$ is complete  
$\square$

---

> [!proposition|1.7] Cor
> $M$ is complete if and only if any two points can be joined by a length-minimizing geodesic
