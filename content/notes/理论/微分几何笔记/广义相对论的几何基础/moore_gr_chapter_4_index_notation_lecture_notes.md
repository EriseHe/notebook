# Chapter 4 — Index Notation (Lecture Notes based on T. A. Moore, *A General Relativity Workbook*)

> **Goal of this chapter.** Replace bulky matrix equations with a compact, precise index notation that scales to tensors and keeps track of how objects transform. We follow Moore’s notation **exactly** and highlight why each formula matters, where it’s used, and how to read/manipulate it safely.

---

## 4.1 Lorentz Transformation in component and index forms

**What it concerns & why.** The Lorentz transformation (LT) maps components of four‑vectors between inertial frames. Matrix notation gets unwieldy; index notation expresses the *same content* with far fewer symbols and generalizes naturally.

### Matrix form (as in the text)
For an arbitrary four‑vector $A$ with components $(A^t,A^x,A^y,A^z)$, the LT to a primed frame is
$$\begin{aligned}
A'^t &= \Lambda^t{}_tA^t+\Lambda^t{}_xA^x+\Lambda^t{}_yA^y+\Lambda^t{}_zA^z,\\
A'^x &= \Lambda^x{}_tA^t+\Lambda^x{}_xA^x+\Lambda^x{}_yA^y+\Lambda^x{}_zA^z,\\
A'^y &= \Lambda^y{}_tA^t+\Lambda^y{}_xA^x+\Lambda^y{}_yA^y+\Lambda^y{}_zA^z,\\
A'^z &= \Lambda^z{}_tA^t+\Lambda^z{}_xA^x+\Lambda^z{}_yA^y+\Lambda^z{}_zA^z,
\end{aligned}
\tag{4.1}$$
with inverse

$$\begin{aligned}
A^t &= (\Lambda^{-1})^t{}_tA'^t+(\Lambda^{-1})^t{}_xA'^x+(\Lambda^{-1})^t{}_yA'^y+(\Lambda^{-1})^t{}_zA'^z,\\
A^x &= (\Lambda^{-1})^x{}_tA'^t+(\Lambda^{-1})^x{}_xA'^x+(\Lambda^{-1})^x{}_yA'^y+(\Lambda^{-1})^x{}_zA'^z,\\

A^y &= (\Lambda^{-1})^y{}_tA'^t+(\Lambda^{-1})^y{}_xA'^x+(\Lambda^{-1})^y{}_yA'^y+(\Lambda^{-1})^y{}_zA'^z,\\
A^z &= (\Lambda^{-1})^z{}_tA'^t+(\Lambda^{-1})^z{}_xA'^x+(\Lambda^{-1})^z{}_yA'^y+(\Lambda^{-1})^z{}_zA'^z.
\end{aligned}
\tag{4.2}$$

*Significance.* (4.1)–(4.2) encode linearity of the transformation and prepare the ground for the abstract replacement $\Lambda^\mu{}_{\nu}$.

### Abstract indices & Einstein summation
We compress (4.1) to
$$A'^\mu = \Lambda^\mu{}_{\nu}A^\nu,\qquad A^\mu=(\Lambda^{-1})^\mu{}_{\nu}A'^\nu,\tag{4.5}$$
with the understanding that any index that appears **once up and once down in a term is implicitly summed** over $t,x,y,z$. As a stepping stone, Moore first writes the summation explicitly as
$$A'^\mu=\sum_{\nu=t,x,y,z}\Lambda^\mu{}_{\nu}A^\nu.\tag{4.4}$$
He also introduces the generic component placeholder
$$A^\mu\ \text{stands for}\ A^t,\ A^x,\ A^y,\ A^z.\tag{4.3}$$
*Significance.* This is the core of index notation: it packs *matrix multiplication* into a single line and scales to higher‑rank objects naturally.

---

## 4.2 The metric tensor and scalar products

**What it concerns & why.** The metric $\eta_{\mu\nu}$ defines spacetime intervals and dot products and also raises/lowers indices. Its placement of indices (both down) is **not decoration**—it prescribes how to sum.

### Components of the Minkowski metric
$$\eta_{\mu\nu} =\begin{pmatrix}
\eta_{tt}&\eta_{tx}&\eta_{ty}&\eta_{tz}\\
\eta_{xt}&\eta_{xx}&\eta_{xy}&\eta_{xz}\\
\eta_{yt}&\eta_{yx}&\eta_{yy}&\eta_{yz}\\
\eta_{zt}&\eta_{zx}&\eta_{zy}&\eta_{zz}
\end{pmatrix}
=\begin{pmatrix}
-1&0&0&0\\
0&1&0&0\\
0&0&1&0\\
0&0&0&1
\end{pmatrix}.
\tag{4.6}$$

### Interval, dot product, magnitude (all in index form)
$$\boxed{\,ds^2=\eta_{\mu\nu}\,dx^\mu dx^\nu\,}\tag{4.7}$$
Expanding the (implied) double sum reproduces $ds^2=-dt^2+dx^2+dy^2+dz^2$. Likewise,

$$
\begin{align}
A\cdot B=\eta_{\mu\nu}A^\mu B^\nu\tag{4.9}\\
A^2=A\cdot A=\eta_{\mu\nu}A^\mu A^\nu\tag{4.10}
\end{align}$$

*Significance.* (4.7) is the metric equation of SR; (4.9)–(4.10) define Lorentz‑invariant scalar products compactly. The **index positions** encode how the sums run and thus how to raise/lower indices (explored fully in Ch. 6).

---

## 4.3 The Kronecker delta and identity relations

**What it concerns & why.** $\delta^\mu{}_{\nu}$ is the index form of the identity matrix; it “passes through” components and appears in proofs of invariance.

### Definition and matrix form
$$\delta^\mu{}_{\nu}=\begin{pmatrix}
1&0&0&0\\ 0&1&0&0\\ 0&0&1&0\\ 0&0&0&1
\end{pmatrix}.\tag{4.11}$$
**Identity under composition** (LT followed by its inverse):
$$(\Lambda^{-1})^\mu{}_{\alpha}\,\Lambda^\alpha{}_{\nu}=\delta^\mu{}_{\nu}.\tag{4.12}$$
**Selector action** (useful summation identity):
$$\delta^\mu{}_{\nu}A^\nu=A^\mu.\tag{4.13}$$
*Significance.* (4.12)–(4.13) justify common manipulations: swapping dummy indices, inserting identities, and checking free vs. bound indices.

---

## 4.4 Electromagnetic field tensor and compact Maxwell–Lorentz equations

**What it concerns & why.** Electromagnetism fits naturally into index notation via an antisymmetric tensor $F_{\mu\nu}$. This makes Lorentz covariance and the structure of Maxwell’s equations and the Lorentz force **manifest**.

### Components of $F_{\mu\nu}$ (GR units)
$$F_{\mu\nu}=\begin{pmatrix}
0& E_x& E_y& E_z\\
- E_x& 0& B_z& -B_y\\
- E_y& -B_z& 0& B_x\\
- E_z& B_y& -B_x& 0
\end{pmatrix},\qquad F_{\mu\nu}=-F_{\nu\mu}.
\tag{4.14}$$
### Lorentz force law (four‑vector form)
$$\boxed{\,\dfrac{dp^\mu}{d\tau}=q\,F_{\mu\nu}\,\eta^{\nu\alpha}u_{\alpha}\,}\tag{4.15}$$
Reading (4.15): $F_{\mu\nu}$ is lowered–lowered; $\eta^{\nu\alpha}$ raises the index on $F$ (equivalently lowers on $u$) so that the contraction gives a four‑vector.

### Maxwell–Ampère + Gauss (inhomogeneous) in one line
$$\boxed{\,\partial_\nu F^{\mu\nu}=4\pi k\,J^\mu\,}\tag{4.16}$$
with four‑current $J^\mu=(\rho,\,\rho v_x,\,\rho v_y,\,\rho v_z)$. (The superscript $\nu$ on $\partial_\nu$ is treated as a lowered index for summation.)

*Significance.* (4.14) packages $\mathbf E$ and $\mathbf B$ into one antisymmetric object; (4.15) is the Lorentz force in covariant form; (4.16) compresses Gauss’s law and the Ampère–Maxwell relation. (Chapter 7 develops these fully.)

---

## 4.5 Free vs. bound (dummy) indices

**What it concerns & why.** A **free index** labels the component you are talking about; a **bound index** indicates a sum. Consistency of free indices ensures both sides of an equation have the *same type* of object.

### Example: total four‑momentum of two particles
$$P^\mu_{\text{tot}}=P_1^\mu+P_2^\mu=\Lambda^\mu{}_{\nu}P_1^\nu+\Lambda^\mu{}_{\alpha}P_2^\alpha.\tag{4.17}$$
Here $\mu$ is **free** (the statement holds component‑wise), while $\nu$ and $\alpha$ are **bound** (summed over).

*Quick rule‑of‑thumb.* If an index appears exactly once up and once down **within a term**, it’s bound (summed). If it appears only once **in the equation**, it’s free.

---

## 4.6 Rules for safe manipulation (Moore’s list)

1. **Same free indices across terms.** You may only add/equate quantities with the same set of free indices (same vertical positions). Examples of *bad* forms Moore flags: $A^2=\eta_{\alpha\beta}A^\mu A^\nu$, $A^\mu=E^\nu$, $A^\mu=B_\mu$ (mismatched variance).
2. **Renaming is allowed—but globally and safely.** You may rename any index provided you (i) rename **every** occurrence consistently, and (ii) don’t create a clash within a term by reusing a letter that’s already bound there. Examples of *bad* renaming: $A'^\mu=\Lambda^\mu{}_{\nu}A^\nu\to A'^\mu=\Lambda^\mu{}_{\mu}A^\mu$ (illegal self‑collision within a term).
3. **Fundamental rule: when in doubt, write it out.** Expand the implied sums and use ordinary algebra to verify your step.

*Significance.* These guardrails prevent silent errors—especially when distributing, factoring, or inserting identities like $\delta^\mu{}_{\nu}$.

---

## 4.7 Useful identities (worked in index notation)

**Why they matter.** These condense invariance statements and common derivatives into compact identities you’ll reuse constantly.

### (i) Metric invariance under the LT
$$\boxed{\,\eta_{\alpha\beta}=\eta_{\mu\nu}\,\Lambda^\mu{}_{\alpha}\,\Lambda^\nu{}_{\beta}\,}\tag{4.18}$$
This is the abstract statement that an LT preserves the Minkowski inner product.

### (ii) Same identity for the inverse transformation
$$\boxed{\,\eta_{\alpha\beta}=\eta_{\mu\nu}\,(\Lambda^{-1})^\mu{}_{\alpha}\,(\Lambda^{-1})^\nu{}_{\beta}\,}\tag{4.19}$$

### (iii) Derivative of a squared magnitude
Start with $A^2=\eta_{\mu\nu}A^\mu A^\nu$. Differentiate w.r.t. a parameter $\tau$ (e.g., proper time), using that $\eta_{\mu\nu}$ is constant in SR:
$$\frac{d}{d\tau}(A^2)=2\,\eta_{\mu\nu}\,A^\mu\,\frac{dA^\nu}{d\tau}.\tag{4.20}$$
*Significance.* Frequently used for four‑velocity/acceleration relations, normalizations, and conserved quantities.

### (iv) Antisymmetry of $F_{\mu\nu}$ kills symmetric contractions
Because $F_{\mu\nu}=-F_{\nu\mu}$ and $u_\alpha u_\beta$ is symmetric, any full contraction vanishes, e.g.
$$F_{\mu\nu}\,\eta^{\mu\alpha}\eta^{\nu\beta}u_{\alpha}u_{\beta}=0.\tag{4.21}$$
*Significance.* This expresses that the electromagnetic field tensor does no work “along” the four‑velocity in that particular contraction; it’s the covariant shadow of $\mathbf v\cdot(\mathbf v\times \mathbf B)=0$.

---

## 4.8 Reading and using index notation effectively
- Track **free vs. bound** indices first; then check **variance** (up/down) before manipulating.
- When unsure, insert $\delta^\mu{}_{\nu}$ or expand sums: it’s a safe way to verify equivalences.
- Remember: **index position encodes meaning**, not style—changing a position changes the object.

**Where next.** Chapter 5 extends this notation beyond inertial, Cartesian coordinates; Chapter 6 formalizes *tensors*, raising/lowering, and why gradients of tensors need care (covariant derivatives). Chapter 7 shows how the same notation unifies electromagnetism.

