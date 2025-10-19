# Chapter 6 — Tensor Equations (Lecture Notes based on T. A. Moore, *A General Relativity Workbook*)

> **Goal of this chapter.** Generalize vectors to **tensors**, explain why indices appear **up vs. down**, and show how tensor expressions remain valid in **any** coordinate system. We follow Moore’s notation exactly and insert derivation steps inline (no separate section).

---

## 6.1 From vectors to covectors

**What it concerns & why.** A (four-)vector is defined operationally by **how its components transform** under a change of coordinates. This motivates the dual notion—a **covector**—and ultimately the definition of general tensors.

### Vectors (transformation law)
For coordinates $x^\mu\mapsto x'^\mu(x)$, a vector’s components transform as
$$\boxed{\ A'^\mu=\frac{\partial x'^\mu}{\partial x^{\nu}}\,A^{\nu} \ }\tag{6.1}$$
*Significance.* This says: “vectors transform like differentials $dx^\mu$.” It’s the linear, Jacobian push‑forward of components.

### Covectors (a different transformation)
A **covector** (1‑form) has components that transform oppositely:
$$\boxed{\ B'_\mu=\frac{\partial x^{\nu}}{\partial x'^\mu}\,B_\nu \ }\tag{6.2}$$
*Why down indices?* The index appears as a **subscript** so that the implied sum $B_\mu A^\mu$ is well‑formed (one up, one down).

---

## 6.2 Two canonical covectors: gradients and lowered vectors

### (i) Gradient of a scalar is a covector
Let $\phi(x^\mu)$ be a scalar field (frame‑independent value at each event). Define
$$\boxed{\ \partial_\mu\phi\equiv\frac{\partial\phi}{\partial x^{\mu}} \ }\tag{6.3}$$
Using the chain rule,
$$\begin{aligned}
\partial'_\mu\phi &= \frac{\partial}{\partial x'^\mu}\,\phi(x(x'))
=\frac{\partial x^{\nu}}{\partial x'^\mu}\,\frac{\partial\phi}{\partial x^{\nu}}
=\frac{\partial x^{\nu}}{\partial x'^\mu}\,\partial_\nu\phi,
\end{aligned}\tag{6.4}$$
which matches (6.2), so $\partial_\mu\phi$ is a covector.

### (ii) Lowering an index with the metric produces a covector
Given a vector $A^{\mu}$, define its lowered partner by
$$\boxed{\ A_\mu\equiv g_{\mu\nu}\,A^{\nu} \ }\tag{6.5}$$
**Derivation that $A_\mu$ transforms as a covector.** Using (5.11) for $g'_{\mu\nu}$ and (6.1) for $A'^\nu$:
$$\begin{aligned}
A'_\mu &= g'_{\mu\nu}\,A'^\nu
=\Big(\frac{\partial x^{\alpha}}{\partial x'^\mu}\frac{\partial x^{\beta}}{\partial x'^\nu}g_{\alpha\beta}\Big)
\Big(\frac{\partial x'^\nu}{\partial x^{\gamma}}A^{\gamma}\Big)\\
&=\frac{\partial x^{\alpha}}{\partial x'^\mu}\,\underbrace{\Big(\frac{\partial x^{\beta}}{\partial x'^\nu}\frac{\partial x'^\nu}{\partial x^{\gamma}}\Big)}_{\delta^{\beta}{}_{\gamma}}\,g_{\alpha\beta}\,A^{\gamma}
=\frac{\partial x^{\alpha}}{\partial x'^\mu}\,g_{\alpha\gamma}A^{\gamma}\\
&=\frac{\partial x^{\alpha}}{\partial x'^\mu}\,A_\alpha\
\end{aligned}\tag{6.6}$$
which is exactly (6.2). Hence lowering an index yields a covector.

**Flat Euclidean example (text result).** In 2D Cartesian coordinates, $ds^2=dx^2+dy^2\Rightarrow g_{\mu\nu}=\begin{bmatrix}1&0\\0&1\end{bmatrix}$, so vectors and covectors coincide: $A_\mu=A^{\mu}$ (no distinction). Moore writes this as
$$\boxed{\ g_{\mu\nu}=\begin{bmatrix}1&0\\0&1\end{bmatrix} }\tag{6.7}$$

---

## 6.3 Vector–covector scalar product is invariant
Define the scalar product of $A^{\mu}$ and $B_\mu$ by $A^\mu B_\mu$. Using (6.1) and (6.2):
$$\begin{aligned}
A'^\mu B'_\mu
&=\Big(\frac{\partial x'^\mu}{\partial x^{\alpha}}A^{\alpha}\Big)\Big(\frac{\partial x^{\beta}}{\partial x'^\mu}B_\beta\Big)
=\underbrace{\Big(\frac{\partial x'^\mu}{\partial x^{\alpha}}\frac{\partial x^{\beta}}{\partial x'^\mu}\Big)}_{\delta^{\beta}{}_{\alpha}}\,A^{\alpha}B_\beta
= A^{\alpha}B_\alpha.
\end{aligned}\tag{6.8}$$
*Significance.* $A^\mu B_\mu$ is a true scalar—has the same value in all coordinate systems.

---

## 6.4 Inverse metric and index gymnastics

**Inverse metric definition.** $g^{\mu\nu}$ is defined to be the (matrix) inverse of $g_{\mu\nu}$:
$$\boxed{\ g^{\mu\alpha}g_{\alpha\nu}=\delta^{\mu}{}_{\nu} }\tag{6.10}$$
**Transformation of $g^{\mu\nu}$.** Invert the law (5.11) for $g_{\mu\nu}$ or differentiate the identity (6.10); either way one finds
$$\boxed{\ g'^{\mu\nu} = \frac{\partial x'^\mu}{\partial x^{\alpha}}\frac{\partial x'^\nu}{\partial x^{\beta}}\,g^{\alpha\beta} }\tag{6.11}$$
**Derivation sketch.** Start with $\delta^{\mu}{}_{\nu}=g^{\mu\alpha}g_{\alpha\nu}$. Transform both sides and use (5.11) for $g_{\alpha\nu}$ plus chain‑rule identities to isolate $g'^{\mu\nu}$.

**Index raising/lowering.** Using $g^{\mu\nu}$ and $g_{\mu\nu}$, we convert index position without changing the underlying geometric object, e.g.
$$R^{\mu}{}_{\nu}=g^{\mu\alpha}R_{\alpha\nu},\qquad T_{\mu\nu}=g_{\mu\alpha}Y^{\alpha}{}_{\nu}.\quad\text{(As in Table 6.2)}$$
*Significance.* Index position encodes transformation behavior: “up” behaves as a vector index; “down” as a covector index.

---

## 6.5 Definition of a tensor (rank, indices, and the master law)

**Definition.** An $n$th‑rank tensor $T$ in $D$ dimensions has $D^n$ components $T^{\mu\nu\dots}{}_{\alpha\beta\dots}$ that transform under coordinate changes according to
$$\boxed{\ T'^{\mu\nu\dots}{}_{\alpha\beta\dots}
=\frac{\partial x'^\mu}{\partial x^{r}}\frac{\partial x'^\nu}{\partial x^{\sigma}}\cdots
\frac{\partial x^{\gamma}}{\partial x'^\alpha}\frac{\partial x^{\delta}}{\partial x'^\beta}\cdots
\,T^{r\sigma\dots}{}_{\gamma\delta\dots} }\tag{6.12}$$
Each **upper** index comes with a factor $\partial x'/{\partial x}$; each **lower** index comes with a factor $\partial x/{\partial x'}$.

**Special cases (as in the text).**
- Scalar (rank 0): $\phi'=\phi$. $(6.13)$
- Vector (rank 1): (6.1). Covector (rank 1): (6.2).
- Metric $g_{\mu\nu}$ (rank 2, lower‑lower) transforms as in (5.11). Inverse metric $g^{\mu\nu}$ (rank 2, upper‑upper) transforms as in (6.11).
- Other rank‑2 examples: $F^{\mu\nu}$ (EM tensor), $T_{\mu\nu}$ (stress–energy), $\delta^{\mu}{}_{\nu}$ (Kronecker delta).

*Significance.* If two sides of an equation are tensors of the same type (same free indices up/down), the **equation** is valid in **every** coordinate system (manifest covariance).

---

## 6.6 Tensor operations that preserve tensor character

**Addition:** Only between tensors of the same rank and index placement.

**Tensor product:** $A^{\mu}B_{\nu}$ has rank 2; components are all pairwise products.

**Contraction:** Summing over one upper and one lower index reduces rank by 2 (e.g. $R^{\mu}{}_{\mu}=\operatorname{tr}R$).

**Raising/lowering:** With $g^{\mu\nu}$ and $g_{\mu\nu}$, as above.

*Significance.* These rules (Table 6.2) build complex, still‑covariant expressions from simple tensors. For example,
$$A\cdot B= A^{\mu}g_{\mu\nu}B^{\nu} \quad\text{or}\quad A_\mu B^{\mu}$$
are equivalent contractions yielding a scalar.

---

## 6.7 Why gradients of tensors are usually **not** tensors
Let $A^{\mu}(x)$ be a vector field. Consider its gradient components $\partial_\nu A^{\mu}$. Under a general coordinate change,
$$\begin{aligned}
\partial'_\nu A'^\mu
&=\frac{\partial}{\partial x'^\nu}\Big(\frac{\partial x'^\mu}{\partial x^{\alpha}}A^{\alpha}\Big)
=\frac{\partial x^{\beta}}{\partial x'^\nu}\,\frac{\partial}{\partial x^{\beta}}\Big(\frac{\partial x'^\mu}{\partial x^{\alpha}}A^{\alpha}\Big)\\
&=\frac{\partial x^{\beta}}{\partial x'^\nu}\Big[\underbrace{\frac{\partial^2 x'^\mu}{\partial x^{\beta}\partial x^{\alpha}}}_{\neq 0\ \text{in general}}A^{\alpha}
+\frac{\partial x'^\mu}{\partial x^{\alpha}}\,\partial_\beta A^{\alpha}\Big].
\end{aligned}\tag{6.14}$$
*Significance.* The second term would have the tensorial form of (6.12), but the **first term**—with second derivatives of the transformation—spoils tensoriality unless the Jacobian is constant (e.g., Lorentz transformations in Cartesian coordinates). This is precisely why covariant derivatives are needed later.

---

## 6.8 Concept summary (matching the chapter)
- **Vectors** vs **covectors**: (6.1) vs (6.2). Gradient $\partial_\mu\phi$ is a covector (6.3–6.4).
- **Lowering with $g_{\mu\nu}$** produces covectors (6.5–6.6). In orthonormal Cartesian space, $g_{\mu\nu}=\delta_{\mu\nu}$ (6.7).
- **Vector–covector contraction** is invariant (6.8).
- **Inverse metric** $g^{\mu\nu}$ satisfies $g^{\mu\alpha}g_{\alpha\nu}=\delta^{\mu}{}_{\nu}$ (6.10) and transforms as in (6.11).
- **Tensor definition** via master law (6.12); scalars (6.13) and standard rank‑2 examples.
- **Operations** (sum, product, contraction, raising/lowering) preserve tensor character (Table 6.2).
- **Gradients of tensors** are not tensors in general (6.14)—motivation for covariant derivatives later.

> **Where this leads.** Chapters 7–9 exploit tensor equations (electromagnetism, curvature via metrics) and then introduce **covariant differentiation** to restore tensorial transformation of derivatives in arbitrary coordinates.

