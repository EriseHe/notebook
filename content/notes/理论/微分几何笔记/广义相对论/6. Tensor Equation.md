---
title: 6. 张量方程
---

> **Big picture.** In relativity (and differential geometry), the *form* of a physical law must not depend on your coordinate labels. Quantities whose components change in a precisely prescribed way under coordinate changes are called **tensors**. Indices up (superscripts) and down (subscripts) encode how components transform.


## 1. 坐标变换与张量概念
Let $x^\mu\mapsto x'^{\,\mu}(x)$. Write the Jacobians
$$
\frac{\partial x'^{\,\mu}}{\partial x^\nu},\qquad
\frac{\partial x^\mu}{\partial x'^{\,\nu}} .
$$
### 1.1 向量（逆变分量） 
A **vector** $A$ has components $A^\mu$ that transform by the push-forward:
$$
\boxed{A'^{\,\mu}=\frac{\partial x'^{\,\mu}}{\partial x^\nu}\,A^\nu.}
\tag{V}
$$
### 1.2 余向量（协变分量，1-形式）
A **covector** $B$ (aka 1-form) has components $B_\mu$ that transform by the pull-back:
$$
\boxed{B'_{\nu}=\frac{\partial x^\mu}{\partial x'^{\,\nu}}\,B_\mu.}
\tag{C}
$$
> **Why one index up vs. down?** Each **upper** index contributes a factor $\partial x' / \partial x$; each **lower** index contributes a factor $\partial x / \partial x'$.
## 2. 梯度是一个余向量
The gradient is a covector. For a scalar field $\Phi(x)$, define its gradient (as a 1-form)
$$
(\mathrm{d}\Phi)_\mu \equiv \partial_\mu \Phi=\frac{\partial \Phi}{\partial x^\mu}.
$$
Under a coordinate change,
$$
\begin{aligned}
\partial'_{\nu}\Phi
&=\frac{\partial}{\partial x'^{\,\nu}}\Phi(x(x'))\\
&=\frac{\partial x^\mu}{\partial x'^{\,\nu}}\,
\frac{\partial \Phi}{\partial x^\mu}
=\frac{\partial x^\mu}{\partial x'^{\,\nu}}\;\partial_\mu \Phi,
\end{aligned}
$$
which matches the covector rule $(\mathrm{d}\Phi)'_{\nu}= \tfrac{\partial x^\mu}{\partial x'^{\,\nu}}(\mathrm{d}\Phi)_\mu$.
## 3. 度量、指标升降与不变量配对
Let $g_{\mu\nu}$ be the (coordinate-basis) **metric tensor**. It lowers indices; its matrix inverse $g^{\mu\nu}$ raises them:
$$
A_\mu \equiv g_{\mu\nu}A^\nu,\qquad
A^\mu \equiv g^{\mu\nu}A_\nu,\qquad
g^{\mu\alpha}g_{\alpha\nu}=\delta^\mu_{\ \nu}.
$$
### 3.1 降指标得到余向量 (Lowering an index gives a covector)
If $A^\mu$ is a vector, then $A_\mu=g_{\mu\nu}A^\nu$ transforms as a covector. In detail:
$$
\begin{aligned}
A'_{\nu}
&=g'_{\nu\mu}A'^{\,\mu}
=\Big(\frac{\partial x^\alpha}{\partial x'^{\,\nu}}
      \frac{\partial x^\beta}{\partial x'^{\,\mu}}g_{\alpha\beta}\Big)
  \Big(\frac{\partial x'^{\,\mu}}{\partial x^\sigma}A^\sigma\Big)\\
&=\frac{\partial x^\alpha}{\partial x'^{\,\nu}}\,
   g_{\alpha\beta}\,\delta^\beta_{\ \sigma}\,A^\sigma
=\frac{\partial x^\alpha}{\partial x'^{\,\nu}}\,A_\alpha,
\end{aligned}
$$
which is exactly the covector law.
### 3.2 向量与余向量的标量积: Scalar (coordinate-invariant) pairing
The contraction of a covector and vector is a true scalar:
$$
\boxed{A\cdot B:=A^\mu B_\mu
=A'^{\,\mu}B'_{\mu}.}
$$
Derivation:
$$
\begin{aligned}
A'^{\,\mu}B'_{\mu}
&=\Big(\frac{\partial x'^{\,\mu}}{\partial x^\alpha}A^\alpha\Big)
  \Big(\frac{\partial x^\beta}{\partial x'^{\,\mu}}B_\beta\Big)
=\delta^\beta_{\ \alpha}\,A^\alpha B_\beta
=A^\mu B_\mu.
\end{aligned}
$$
### 3.3 逆度量的变换: Inverse metric transforms with two upper indices
By definition $g^{\mu\alpha}g_{\alpha\nu}=\delta^\mu_{\ \nu}$. Using the metric’s transformation,
$$
g'_{\mu\nu}=\frac{\partial x^\alpha}{\partial x'^{\,\mu}}
            \frac{\partial x^\beta}{\partial x'^{\,\nu}}\,g_{\alpha\beta},
$$
one finds
$$
\boxed{g'^{\mu\nu}
=\frac{\partial x'^{\,\mu}}{\partial x^\alpha}
 \frac{\partial x'^{\,\nu}}{\partial x^\beta}\,g^{\alpha\beta}.}
$$
## 4.  $n$阶张量 ($n$-th Rank Tensors)
An **$n$-th rank tensor** $T$ with $p$ upper and $q$ lower indices $(p+q=n)$ transforms as
$$
\boxed{
T'^{\mu_1\cdots\mu_p}{}_{\nu_1\cdots\nu_q}
=\Big(\prod_{i=1}^{p}\frac{\partial x'^{\,\mu_i}}{\partial x^{\alpha_i}}\Big)
 \Big(\prod_{j=1}^{q}\frac{\partial x^{\beta_j}}{\partial x'^{\,\nu_j}}\Big)
 T^{\alpha_1\cdots\alpha_p}{}_{\beta_1\cdots\beta_q}.
}
$$
* Each **upper** index contributes a factor $\partial x'/\partial x$.
* Each **lower** index contributes a factor $\partial x/\partial x'$.
* A **scalar** is rank $0$ (no factors): $\Phi'=\Phi$.

**Examples (rank 2):**
$$
\begin{aligned}
&\text{Metric: } g'_{\mu\nu}=\frac{\partial x^\alpha}{\partial x'^{\,\mu}}
                     \frac{\partial x^\beta}{\partial x'^{\,\nu}}\,g_{\alpha\beta},\\
&\text{Inverse metric: } g'^{\mu\nu}=\frac{\partial x'^{\,\mu}}{\partial x^\alpha}
                     \frac{\partial x'^{\,\nu}}{\partial x^\beta}\,g^{\alpha\beta},\\
&\text{Kronecker delta: } \delta^\mu_{\ \nu}\ \text{(mixed, transforms to itself).}
\end{aligned}
$$

## 5. 张量运算（Building New Tensors from Old）
Given tensors $S,T$:
1. **Sum (same type):** $U = S+T$ is a tensor of the *same* index type (only if indices match exactly).
2. **Tensor product:** $(S\otimes T)^{\cdots}{}_{\cdots}=S^{\cdots}{}_{\cdots}\,T^{\cdots}{}_{\cdots}$
   Rank adds: $ \mathrm{rank}(S\otimes T)=\mathrm{rank}(S)+\mathrm{rank}(T)$.
3. **Contraction:** Sum over one upper–lower pair, reducing rank by $2$.
$$
   R^\mu{}_\nu := g^{\alpha\beta}R^\mu{}_{\nu\alpha\beta},\quad
   A\cdot B=A^\mu B_\mu.
$$
4. **Raise/lower:** Use $g^{\mu\nu}$ or $g_{\mu\nu}$ to move indices without changing rank:
   $$
   T^\mu{}_{\nu}\ \leftrightarrow\ T^{\mu\alpha}g_{\alpha\nu},\qquad
   T_{\mu\nu}\ \leftrightarrow\ g_{\mu\alpha}g_{\nu\beta}T^{\alpha\beta}.
   $$
All four operations preserve tensorial character.
## 6. 为什么张量重要：协变方程（Covariant Equations）
If a physical law can be written as
$$
\boxed{A^{\mu_1\cdots}{}_{\nu_1\cdots}=B^{\mu_1\cdots}{}_{\nu_1\cdots}}
$$
with **matching index pattern** on both sides, then *both sides transform the same way* in any coordinate system. The equation is **manifestly covariant**—true in all frames once true in one frame. This is how GR encodes physics independently of coordinates.
## 7. Subtlety: Gradients of Non-Scalars

The gradient of a **scalar** is a covector (Sec. 2). But the naive “gradient of a vector”,
$$
(\partial_\nu A^\mu)\,,
$$
**does not** transform as a tensor because of second-derivative (inhomogeneous) terms from the product rule acting on the Jacobian:
$$
\begin{aligned}
\partial'_{\nu} A'^{\,\mu}
&=\partial'_{\nu}\!\left(
\frac{\partial x'^{\,\mu}}{\partial x^\alpha}A^\alpha
\right)\\
&=\underbrace{\frac{\partial x^\beta}{\partial x'^{\,\nu}}
              \frac{\partial x'^{\,\mu}}{\partial x^\alpha}
              \partial_{\beta}A^\alpha}_{\text{looks tensorial}}
\;+\;
\underbrace{\frac{\partial^2 x'^{\,\mu}}{\partial x'^{\,\nu}\partial x^\alpha}\,A^\alpha}_{\text{spoils tensoriality}}.
\end{aligned}
\tag{\*}
$$
To repair this in curved/accelerated coordinates, one introduces a **connection** and the **covariant derivative** $\nabla_\nu A^\mu$, which *does* transform tensorially.
## 8. Flat Cartesian Special Case (sanity check)

In ordinary Cartesian coordinates of flat space, $g_{\mu\nu}=\mathrm{diag}(1,1,\dots)$. Then
$$
\mathrm{d}s^2=g_{\mu\nu}\,\mathrm{d}x^\mu\mathrm{d}x^\nu
=\sum_\mu (\mathrm{d}x^\mu)^2,
$$
and there is **no distinction** between up/down components numerically (though the index positions still carry transformation meaning when you change coordinates).
## 9. Worked Micro-Derivations (for practice)

### 9.1 Coordinate-invariance of $A^\mu B_\mu$

$$
\begin{aligned}
A'^{\,\mu}B'_{\mu}
&=\Big(\frac{\partial x'^{\,\mu}}{\partial x^\alpha}A^\alpha\Big)
  \Big(\frac{\partial x^\beta}{\partial x'^{\,\mu}}B_\beta\Big)
=\delta^\beta_{\ \alpha}\,A^\alpha B_\beta
=A^\mu B_\mu.
\end{aligned}
$$

### 9.2 Lowering an index is covariant
$$
\begin{aligned}
A'_{\nu}
&=g'_{\nu\mu}A'^{\,\mu} \\
&=\Big(\frac{\partial x^\alpha}{\partial x'^{\,\nu}}
       \frac{\partial x^\beta}{\partial x'^{\,\mu}}g_{\alpha\beta}\Big)
  \Big(\frac{\partial x'^{\,\mu}}{\partial x^\sigma}A^\sigma\Big)\\
&=\frac{\partial x^\alpha}{\partial x'^{\,\nu}}g_{\alpha\beta}\delta^\beta_{\ \sigma}A^\sigma
=\frac{\partial x^\alpha}{\partial x'^{\,\nu}}A_\alpha.
\end{aligned}
$$
### 9.3 Inverse metric transformation

Demand $g'^{\mu\alpha}g'_{\alpha\nu}=\delta^\mu_{\ \nu}$:

$$
\begin{aligned}
g'^{\mu\alpha}\Big(\frac{\partial x^\beta}{\partial x'^{\,\alpha}}
\frac{\partial x^\gamma}{\partial x'^{\,\nu}}g_{\beta\gamma}\Big)
&=\delta^\mu_{\ \nu}
\quad\Rightarrow\quad
g'^{\mu\alpha}\frac{\partial x^\beta}{\partial x'^{\,\alpha}}
=\frac{\partial x'^{\,\mu}}{\partial x^\gamma}g^{\gamma\beta},
\end{aligned}
$$

hence $g'^{\mu\nu}=\frac{\partial x'^{\,\mu}}{\partial x^\alpha}\frac{\partial x'^{\,\nu}}{\partial x^\beta}g^{\alpha\beta}$.
## 10. Quick Reference (What to Memorize)

* **Vector:** $A'^{\,\mu}=\dfrac{\partial x'^{\,\mu}}{\partial x^\nu}A^\nu$.
* **Covector:** $B'_{\mu}=\dfrac{\partial x^\nu}{\partial x'^{\,\mu}}B_\nu$.
* **Gradient of scalar:** $\partial_\mu\Phi$ is a covector.
* **Metric lowers:** $A_\mu=g_{\mu\nu}A^\nu$; inverse metric raises: $A^\mu=g^{\mu\nu}A_\nu$.
* **Invariant scalar:** $A^\mu B_\mu$ (and more generally, any full contraction).
* **Rank-$n$ tensor:** product of $n$ Jacobian factors, one per index; up indices get $\partial x'/\partial x$, down indices get $\partial x/\partial x'$.
* **Tensor algebra:** sum (same type), tensor product (add rank), contraction (−2 rank), raise/lower (same rank).
* **Caveat:** $\partial_\nu A^\mu$ is **not** a tensor in general; use covariant derivatives in curved/accelerated coordinates.