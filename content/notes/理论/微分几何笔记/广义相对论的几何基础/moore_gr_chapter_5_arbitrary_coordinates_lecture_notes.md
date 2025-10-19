# Chapter 5 — Arbitrary Coordinates (Lecture Notes based on T. A. Moore, *A General Relativity Workbook*)

> **Goal of this chapter.** Develop a coordinate‑independent way to write physics by introducing **coordinate bases**, the **metric tensor** in arbitrary coordinates, and **transformation laws** for vectors and metrics. This generalizes the principle of relativity beyond inertial Cartesian frames and prepares us for curved spacetimes.

---

## 5.0 Motivation and setup
**What it concerns & why.** In curved spacetimes (and even in flat spaces with curvilinear coordinates), Cartesian assumptions fail. We therefore:
- attach smooth coordinates \((u,w)\) (in 2D for clarity),
- define a **coordinate basis** at each point so that coordinate differentials themselves are the components of displacements,
- introduce a **metric tensor** \(g_{\alpha\beta}\) that relates coordinate separations to physical distances,
- derive **transformation laws** under general coordinate changes \(x^\mu\mapsto x'^\mu(x)\).

---

## 5.1 Coordinate basis and components
**Definition & significance.** At each point \(P\), define basis vectors \(\mathbf e_u,\mathbf e_w\) tangent to the coordinate curves such that any infinitesimal displacement can be written as a linear combination with the coordinate differentials as coefficients. This makes the coordinates themselves the **components** of the displacement in that basis.

**Core decomposition (text Eq. 5.1).**
\[
\boxed{\ ds = du\,\mathbf e_u + dw\,\mathbf e_w = dx^{\mu}\,\mathbf e_{\mu} \ }\tag{5.1}
\]
*Why it matters.* With this choice, \(du\) and \(dw\) are literally the components of \(ds\) in the \((\mathbf e_u,\mathbf e_w)\) basis. This is what will make later transformation laws simple.

**Example (polar‑like):** In 2D with \((r,\theta)\), the coordinate basis has directions varying with position and magnitudes
\[\operatorname{mag}(\mathbf e_r)=1,\qquad \operatorname{mag}(\mathbf e_\theta)=r,\]
so that \(ds=dr\,\mathbf e_r+d\theta\,\mathbf e_\theta\). (Conventional unit vectors \(\hat{\mathbf e}_r,\hat{\boldsymbol\theta}\) do **not** form a coordinate basis since \(ds=dr\,\hat{\mathbf e}_r+r\,d\theta\,\hat{\boldsymbol\theta}\).)

**General vector components (text Eq. 5.2).** For any vector \(\mathbf A\), define its components by
\[
\boxed{\ \mathbf A = A^{\mu}\,\mathbf e_{\mu}\ }\quad\ (\mu\in\{u,w\}).\tag{5.2}
\]

---

## 5.2 Metric tensor in a coordinate basis
**What it concerns & why.** The metric encodes how to turn coordinate separations into physical distances. In arbitrary coordinates, the “Pythagorean” relation becomes a quadratic form in differentials with **position‑dependent** coefficients.

**Definition via inner product (text Eq. 5.3).**
\[
\begin{aligned}
\,ds^2 &= ds\cdot ds = (du\,\mathbf e_u + dw\,\mathbf e_w)\cdot(du\,\mathbf e_u + dw\,\mathbf e_w)\\
&= du^2\,(\mathbf e_u\cdot\mathbf e_u) + du\,dw\,(\mathbf e_u\cdot\mathbf e_w) + dw\,du\,(\mathbf e_w\cdot\mathbf e_u) + dw^2\,(\mathbf e_w\cdot\mathbf e_w)\\
&= (dx^{\alpha}\,dx^{\beta})\,(\mathbf e_{\alpha}\cdot\mathbf e_{\beta})\equiv g_{\alpha\beta}\,dx^{\alpha}dx^{\beta}.
\end{aligned}\tag{5.3}
\]
*Why it matters.* \(g_{\alpha\beta}=\mathbf e_{\alpha}\cdot\mathbf e_{\beta}\) captures both non‑orthogonality and non‑unit lengths of basis vectors, and can vary with position.

---

## 5.3 General coordinate transformations
Consider a smooth change of coordinates \((u,w)\mapsto (p(u,w),\,q(u,w))\). The chain rule gives the relation between differentials.

**Chain rule (text Eq. 5.4).**
\[
\boxed{\ dp = \frac{\partial p}{\partial u}\,du + \frac{\partial p}{\partial w}\,dw,\qquad dq = \frac{\partial q}{\partial u}\,du + \frac{\partial q}{\partial w}\,dw\ }\tag{5.4}
\]

Introduce abstract indices: write \(x'^\mu=(p,q)\), \(x^{\nu}=(u,w)\). Then

**Differentials in index form (text Eq. 5.5).**
\[
\boxed{\ dx'^\mu = \frac{\partial x'^\mu}{\partial x^{\nu}}\,dx^{\nu} \equiv \frac{\partial x'^\mu}{\partial x^{\nu}}\,dx^{\nu} }\tag{5.5}
\]
*Why it matters.* The coefficients \(\partial x'^\mu/\partial x^{\nu}\) are the **Jacobian** of the coordinate change. Because \(dx^\mu\) are also the components of \(ds\) in the coordinate basis, this directly dictates how vector components transform.

**Vector component transformation (text Eq. 5.6).** Since \(\mathbf A=A^{\nu}\,\mathbf e_{\nu}=A'^\mu\,\mathbf e'_{\mu}\) and component vectors are defined so that components transform like differentials:
\[
\boxed{\ A'^\mu = \frac{\partial x'^\mu}{\partial x^{\nu}}\,A^{\nu} }\tag{5.6}
\]
**Reverse transformation (text Eq. 5.7).**
\[
\boxed{\ A^{\alpha} = \frac{\partial x^{\alpha}}{\partial x'^\mu}\,A'^\mu }\tag{5.7}
\]

**Inverse‑Jacobian identity (text Eq. 5.8).** The chain rule implies
\[
\boxed{\ \frac{\partial x'^\mu}{\partial x^{\alpha}}\,\frac{\partial x^{\alpha}}{\partial x'^\nu} = \delta^{\mu}{}_{\nu} }\tag{5.8}
\]
which, written out for \((p,q)\) and \((u,w)\), yields the pair (text Eqs. 5.9a–b):
\[
\begin{aligned}
&\frac{\partial p}{\partial u}\,\frac{\partial u}{\partial p}+\frac{\partial p}{\partial w}\,\frac{\partial w}{\partial p}=1,\qquad &&\frac{\partial q}{\partial u}\,\frac{\partial u}{\partial p}+\frac{\partial q}{\partial w}\,\frac{\partial w}{\partial p}=0,\\
&\frac{\partial p}{\partial u}\,\frac{\partial u}{\partial q}+\frac{\partial p}{\partial w}\,\frac{\partial w}{\partial q}=0,\qquad &&\frac{\partial q}{\partial u}\,\frac{\partial u}{\partial q}+\frac{\partial q}{\partial w}\,\frac{\partial w}{\partial q}=1.
\end{aligned}\tag{5.9a–b}
\]
*Why it matters.* (5.8)–(5.9) assert that the Jacobian and its inverse compose to the identity; these are heavily used to simplify expressions.

---

## 5.4 Invariance of \(ds^2\) and the metric transformation law
**Physical postulate.** The squared distance \(ds^2\) between infinitesimally separated points is coordinate‑independent. Therefore,

**Invariance (text Eq. 5.10).**
\[
\boxed{\ ds'^2 = ds^2 }\quad\Rightarrow\quad g'_{\mu\nu}\,dx'^\mu dx'^\nu = g_{\alpha\beta}\,dx^{\alpha}dx^{\beta}.\tag{5.10}
\]
Using (5.5) and comparing coefficients yields the **metric transformation rule** (text Eq. 5.11):
\[
\boxed{\ g'_{\mu\nu} = \frac{\partial x^{\alpha}}{\partial x'^\mu}\,\frac{\partial x^{\beta}}{\partial x'^\nu}\,g_{\alpha\beta} }\qquad\Longleftrightarrow\qquad
\boxed{\ g_{\alpha\beta} = \frac{\partial x'^\mu}{\partial x^{\alpha}}\,\frac{\partial x'^\nu}{\partial x^{\beta}}\,g'_{\mu\nu} }.\tag{5.11}
\]
*Why it matters.* This is how we compute \(g\) in any new coordinate system once we know the old \(g\) and the coordinate map.

---

## 5.5 Specialization: flat spacetime and Lorentz transformations
**Context.** Cartesian‑like coordinates in an IRF form a coordinate basis, and Lorentz transformations are a special case of (5.6) with linear maps.

**Standard LT between IRFs (text Eq. 5.12).** For relative speed \(\beta\) along \(+x\),
\[
\boxed{\ t' = \gamma(t-\beta x),\quad x' = \gamma(-\beta t + x),\quad y'=y,\quad z'=z }\tag{5.12}\]
with inverse \(\beta\to-\beta\).

**Jacobian matrices (text Eqs. 5.13a–b).**
\[
\boxed{\ \frac{\partial x'^\mu}{\partial x^{\nu}} = \begin{pmatrix}\gamma&-\gamma\beta&0&0\\-\gamma\beta&\gamma&0&0\\0&0&1&0\\0&0&0&1\end{pmatrix} \equiv \Lambda^{\mu}{}_{\nu} }\tag{5.13a}
\]
\[
\boxed{\ \frac{\partial x^{\mu}}{\partial x'^\nu} = \begin{pmatrix}\gamma&\gamma\beta&0&0\\\gamma\beta&\gamma&0&0\\0&0&1&0\\0&0&0&1\end{pmatrix} = (\Lambda^{-1})^{\mu}{}_{\nu} }\tag{5.13b}
\]
*Why it matters.* Here the Jacobian is constant; this is not true for general curvilinear transformations.

**Vector transformation reduces to LT (text Eq. 5.14).** Using (5.6) with (5.13):
\[
\boxed{\ A'^\mu = \frac{\partial x'^\mu}{\partial x^{\nu}}\,A^{\nu} = \Lambda^{\mu}{}_{\nu}\,A^{\nu} }\tag{5.14}
\]
**Inverse‑Jacobian identity (LT form, text Eq. 5.15).**
\[
\boxed{\ \frac{\partial x'^\mu}{\partial x^{\alpha}}\,\frac{\partial x^{\alpha}}{\partial x'^\nu} = \delta^{\mu}{}_{\nu} }\tag{5.15}
\]
**Minkowski metric invariance (text Eq. 5.16).** Denoting \(\eta_{\mu\nu}=\mathrm{diag}(-1,1,1,1)\),
\[
\boxed{\ \eta_{\alpha\beta} = \frac{\partial x^{\mu}}{\partial x'^\alpha}\,\frac{\partial x^{\nu}}{\partial x'^\beta}\,\eta_{\mu\nu} \;\;\Longleftrightarrow\;\; \eta_{\mu\nu} = (\Lambda^{-1})^{\alpha}{}_{\mu}(\Lambda^{-1})^{\beta}{}_{\nu}\,\eta_{\alpha\beta} }\tag{5.16}
\]
*Why it matters.* (5.16) states that Lorentz transformations preserve the Minkowski inner product, i.e. the interval.

---

## 5.6 Example: metric on a sphere (curved 2D surface)
**What it concerns & why.** In curved spaces we are *forced* to use curvilinear coordinates. For the 2D surface of a sphere of radius \(R\), latitude–longitude coordinates \((\theta,\phi)\) provide a canonical example that will reappear in spherically symmetric spacetimes.

**Result (text Eq. 5.17).**
\[
\boxed{\ ds^2 = g_{\mu\nu}\,dx^{\mu}dx^{\nu} = R^2\,d\theta^2 + R^2\sin^2\!\theta\,d\phi^2 }\quad\Longrightarrow\quad
\boxed{\ g_{\mu\nu} = \begin{pmatrix}R^2 & 0\\ 0 & R^2\sin^2\!\theta\end{pmatrix} }\tag{5.17}
\]
*Significance.* This shows explicitly how metric components can depend on position and how curvilinear coordinates encode intrinsic curvature (here of the sphere’s surface).

---

## 5.7 Reading & using the formulas
- **Always** track which basis you’re in: components are basis‑dependent but tensors like \(ds^2\) are not.
- Use **(5.6)** to transform vector components and **(5.11)** to transform metric components under any smooth change of coordinates.
- In flat spacetime with Cartesian bases, these reduce to the familiar Lorentz formulas **(5.14–5.16)**.

---

## Concept summary (matching the chapter)
- **Coordinate basis:** \(ds=dx^{\mu}\,\mathbf e_{\mu}\) (Eq. 5.1); vector components defined by \(\mathbf A=A^{\mu}\mathbf e_{\mu}\) (Eq. 5.2).
- **Metric:** \(ds^2=g_{\alpha\beta}dx^{\alpha}dx^{\beta}\) (Eq. 5.3); captures non‑orthogonality and scale.
- **Transformations:** \(dx'^\mu=(\partial x'^\mu/\partial x^{\nu})dx^{\nu}\) (Eq. 5.5); \(A'^\mu=(\partial x'^\mu/\partial x^{\nu})A^{\nu}\) (Eq. 5.6); inverse via (5.7) and identity (5.8–5.9).
- **Metric law:** \(g'_{\mu\nu}=(\partial x^{\alpha}/\partial x'^\mu)(\partial x^{\beta}/\partial x'^\nu)g_{\alpha\beta}\) (Eq. 5.11) from invariance of \(ds^2\) (Eq. 5.10).
- **Flat‑space special case:** LT equations (5.12), Jacobians (5.13), vector LT (5.14), identity (5.15), and \(\eta\) invariance (5.16).
- **Curved‑surface example:** sphere metric (5.17).

> **Where this leads.** Chapter 6 formalizes **tensors** and their ranks, shows how to **raise/lower indices** with the metric and its inverse, and lists the basic tensor operations (sum, product, contraction) that preserve covariance—even in arbitrary coordinates.

