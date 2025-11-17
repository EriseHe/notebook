
> **Goal of this chapter.** Introduce four‑vectors as the natural objects in relativity, define the four‑velocity and four‑momentum, and show how inner products and energy–momentum relations become compact and frame‑independent in index notation. All formulas below match the chapter’s notation and numbering; added steps fill in derivations and interpretation.

---

## 3.1 Describing motion in terms of proper time
**What it concerns & why.** Use the particle’s own proper time $\tau$ (frame‑independent) to parametrize motion $x^\mu(\tau) = (t(\tau),x(\tau),y(\tau),z(\tau))$. This treats all spacetime coordinates symmetrically and makes Lorentz transformations linear on components.

---

## 3.2 Four‑displacement and four‑velocity
**Definition (text Eq. 3.1).** For an infinitesimal step along a worldline,
$$\begin{aligned}
&\text{four‑displacement:}\quad ds^\mu = \frac{dx^\mu}{d\tau}\,d\tau,\\
&\text{four‑velocity:}\quad u^\mu = \frac{dx^\mu}{d\tau} = \bigg(\frac{dt}{d\tau},\,\frac{dx}{d\tau},\,\frac{dy}{d\tau},\,\frac{dz}{d\tau}\bigg),
\end{aligned}\tag{3.1}$$
so that $u^\mu$ is tangent to the worldline.

**Lorentz transformation of $ds^\mu$ (text Eq. 3.2).** For frames in standard orientation,
$$\begin{pmatrix}dt'\\ dx'\\ dy'\\ dz'\end{pmatrix}
= \begin{pmatrix}\gamma & -\gamma\beta & 0 & 0\\ -\gamma\beta & \gamma & 0 & 0\\ 0&0&1&0\\ 0&0&0&1\end{pmatrix}
\begin{pmatrix}dt\\ dx\\ dy\\ dz\end{pmatrix}.\tag{3.2}$$
Because $d\tau$ is invariant, **four‑velocity transforms linearly** (text Eq. 3.3):
$$\begin{pmatrix}u'^t\\ u'^x\\ u'^y\\ u'^z\end{pmatrix}
= \begin{pmatrix}\gamma & -\gamma\beta & 0 & 0\\ -\gamma\beta & \gamma & 0 & 0\\ 0&0&1&0\\ 0&0&0&1\end{pmatrix}
\begin{pmatrix}u^t\\ u^x\\ u^y\\ u^z\end{pmatrix}.\tag{3.3}$$
*Significance.* Contrast with the nonlinear transformation of ordinary velocity components; this linearity is why four‑vectors are fundamental.

---

## 3.3 Scalar product, magnitude, and the interval
We use the Minkowski metric $\eta_{\mu\nu}=\mathrm{diag}(-1,1,1,1)$ (GR units).

**Scalar product (text Eq. 3.4) and squared magnitude (text Eq. 3.5):**
$$A\cdot B = \eta_{\mu\nu}A^\mu B^\nu,\qquad A^2 = A\cdot A = - (A^t)^2 + (A^x)^2 + (A^y)^2 + (A^z)^2.\tag{3.4–3.5}$$
**Interval (text Eq. 3.6):**
$$\boxed{\ ds^2 = \eta_{\mu\nu} \, dx^\mu dx^\nu = -dt^2+dx^2+dy^2+dz^2\ },\tag{3.6}$$
which is frame‑independent.

**Normalization of four‑velocity (text Eq. 3.7):** Using $ds^2=-d\tau^2$ along a timelike worldline,
$$\begin{aligned}
U\cdot U &= \eta_{\mu\nu}u^\mu u^\nu = \eta_{\mu\nu}\frac{dx^\mu}{d\tau}\frac{dx^\nu}{d\tau}
= \frac{1}{d\tau^2}\,\eta_{\mu\nu}dx^\mu dx^\nu \\
&= \frac{ds^2}{d\tau^2} = -1.
\end{aligned}\tag{3.7}$$
*Significance.* $U\cdot U=-1$ holds for any massive particle, independent of frame.

---

## 3.4 Four‑velocity vs. ordinary velocity
**Time dilation (text Eq. 3.8):**
$$\boxed{\ d\tau = dt\,\sqrt{1-v^2}\ },\qquad v^2\equiv v_x^2+v_y^2+v_z^2.\tag{3.8}$$
**Components (text Eq. 3.9):** Using $\gamma\equiv 1/\sqrt{1-v^2}$,
$$\begin{aligned}
&u^t = \frac{dt}{d\tau} = \gamma,\\
&u^x = \frac{dx}{d\tau} = \gamma v_x,\quad u^y = \gamma v_y,\quad u^z = \gamma v_z.
\end{aligned}\tag{3.9}$$
**Recovering $\mathbf v$ from $u^\mu$ (text Eq. 3.10):**
$$\boxed{\ v_i = \frac{u^i}{u^t}\ (i=x,y,z) }\quad\Rightarrow\quad \mathbf v = \frac{\mathbf u}{u^t}.\tag{3.10}$$
**Special cases (text Eqs. 3.11–3.12):**
$$\text{At rest:}\ \ u^\mu=(1,0,0,0).\tag{3.11}$$
For $v\ll 1$, $\gamma\approx 1$ so
$$\ u^\mu \approx (1, v_x, v_y, v_z).\tag{3.12}$$
*Significance.* These tie geometric (four‑vector) descriptors to measurable 3‑velocity; (3.10) is used constantly when switching representations.

---

## 3.5 Four‑momentum
**Definition (text Eq. 3.13):** For mass $m$ (frame‑independent in SR/GR),
$$\boxed{\ p^\mu = m\,u^\mu }\quad\Rightarrow\quad p^\mu = (\gamma m,\,\gamma m v_x,\,\gamma m v_y,\,\gamma m v_z).\tag{3.13}$$
**Invariant mass relation (text Eq. 3.14):**
$$\boxed{\ p\cdot p = m^2\,(u\cdot u) = -m^2 }.\tag{3.14}$$
**Newtonian limit (text Eq. 3.15):** For $v\ll 1$, the spatial components reduce to $\mathbf p\approx m\mathbf v$.\tag{3.15}

*Significance.* (3.14) is the covariant statement that rest mass is an invariant.

---

## 3.6 Relativistic energy and 3‑momentum
**Definitions and master relation (text Eq. 3.16):** Let
$$E \equiv p^t,\qquad \mathbf p \equiv (p^x,p^y,p^z),\qquad p^2 \equiv \mathbf p\cdot\mathbf p.$$
From $p\cdot p=-m^2$ and signature $(-+++)$,
$$\boxed{\ E^2 - p^2 = m^2 },\qquad E=\gamma m,\quad \mathbf p=\gamma m\,\mathbf v.\tag{3.16}$$
**Low‑speed expansion (text Eq. 3.17):** With $\gamma = 1+\tfrac12 v^2+\cdots$,
$$E = \gamma m \approx m + \tfrac12 m v^2 + \cdots.\tag{3.17}$$
**Kinetic energy identification (text Eq. 3.18):**
$$\boxed{\ E = m + K }\quad\Rightarrow\quad K=E-m.\tag{3.18}$$
*Significance.* (3.16) is the energy–momentum invariant; (3.17)–(3.18) connect back to Newtonian intuition.

---

## 3.7 Four‑momentum of light
Proper time along a null worldline is zero, so $u^\mu$ is undefined for photons. Still, photons carry energy and momentum, so we **define** (text Eq. 3.19) the light four‑momentum by its time component:
$$\boxed{\ p^\mu \equiv \big(E,\ E v_x,\ E v_y,\ E v_z\big) },\qquad |\mathbf v|=1.\tag{3.19}$$
Then from (3.16), the photon's mass follows (text Eq. 3.20):
$$\boxed{\ m_\gamma = 0 }.\tag{3.20}$$
*Significance.* This guarantees $p^\mu$ is parallel to the null worldline and matches observed energy–momentum of light.

---

## 3.8 Energy measured by a given observer
Let an observer at rest in some inertial frame have four‑velocity $U_{\text{obs}}^\mu=(1,0,0,0)$ in that frame. For any passing object with four‑momentum $p^\mu$, the energy measured in the observer’s frame is (text Eq. 3.21)
$$\boxed{\ E_{\text{(obs)}} = -\,p\cdot U_{\text{obs}} }\ = -\,\eta_{\mu\nu}p^\mu U_{\text{obs}}^\nu = p^t.\tag{3.21}$$
Because the scalar product is invariant, we may evaluate $-p\cdot U_{\text{obs}}$ in any convenient frame to get the same energy.

---

## Worked micro‑derivations (added, consistent with text)

### A. Normalization of four‑velocity from (3.8)–(3.9)
$$\begin{aligned}
U\cdot U &= -\gamma^2 + \gamma^2 v^2 = -\gamma^2(1-v^2) = -1.
\end{aligned}$$

### B. Energy–momentum invariant from (3.13)–(3.16)
$$\begin{aligned}
&p\cdot p = - (p^t)^2 + p^2 = -E^2 + p^2 = -m^2 \quad\Rightarrow\quad E^2 - p^2 = m^2.
\end{aligned}$$

---

## Concept summary (matching the chapter)
- **Four‑vector:** transforms linearly under Lorentz transformations (Eq. 3.3).
- **Four‑velocity:** $u^\mu=dx^\mu/d\tau$, invariant norm $u\cdot u=-1$ (Eq. 3.7).
- **Four‑momentum:** $p^\mu=mu^\mu$; invariant mass via $p\cdot p=-m^2$ (Eq. 3.14).
- **Energy–momentum relation:** $E^2-p^2=m^2$ (Eq. 3.16); low‑speed $E\approx m+\tfrac12 mv^2$ (Eq. 3.17).
- **Photon:** $m=0$, $p^\mu=(E, E\mathbf v)$ with $|\mathbf v|=1$ (Eqs. 3.19–3.20).
- **Observer energy:** $E_{\text{(obs)}}=-p\cdot U_{\text{obs}}$ (Eq. 3.21).

> **Where this leads.** Chapter 4 formalizes index notation (free vs. bound indices, metric placement). Chapters 5–6 generalize to arbitrary coordinates and tensors; Chapter 7 applies the same machinery to electromagnetism.

