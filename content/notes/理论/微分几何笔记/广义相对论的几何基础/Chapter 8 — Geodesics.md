
> **Goal of this chapter.** Derive the **geodesic equation** from the “longest proper time” principle, convert it to a form with the **metric’s derivatives** (equivalent to the Christoffel‑symbol form), and note the normalization identities and the lightlike limit. All formulas match Moore’s notation and numbering; each main result is derived in **one continuous aligned environment** with occasional $\underbrace{\cdots}_{\text{comment}}$.

---

## 8.1 Timelike geodesics as extremal proper time
**Setup.** Label a trial worldline between two timelike‑separated events $A\to B$ by a parameter $\sigma\in[0,1]$ and write $x^\mu(\sigma)$. The proper time accumulated along this curve is
$$\boxed{\ \tau[x(\cdot)]\;=\;\int_{\sigma_A}^{\sigma_B}\!\sqrt{\,-g_{\mu\nu}\big(x(\sigma)\big)\,\frac{dx^\mu}{d\sigma}\,\frac{dx^\nu}{d\sigma}\,}\;d\sigma\ }\tag{8.1}$$
**Variational analogy.** Compare with action $S=\int L\,dt$ and the Euler–Lagrange (EL) equations (text Eqs. 8.2–8.3):
$$\begin{aligned}
S[q] &= \int L\big(q_i,\dot q_i\big)\,dt,\tag{8.2}\\
0&=\frac{d}{dt}\Big(\frac{\partial L}{\partial\dot q_i}\Big)-\frac{\partial L}{\partial q_i}.\tag{8.3}
\end{aligned}$$
Here take the **Lagrangian** for our worldline to be
$$\boxed{\ L\big(x,\dot x\big)\;\equiv\;\sqrt{\,-g_{\mu\nu}(x)\,\dot x^{\mu}\,\dot x^{\nu}\,}\,,\quad \dot x^{\mu}\equiv\frac{dx^{\mu}}{d\sigma}.\ }\tag{8.4}$$
Apply EL to $x^\alpha(\sigma)$:
$$\boxed{\ 0\;=\;\frac{d}{d\sigma}\Big(\frac{\partial L}{\partial\dot x^{\alpha}}\Big)-\frac{\partial L}{\partial x^{\alpha}}\ }\tag{8.5}$$

---

## 8.2 EL derivatives → first geodesic form (with a lowered index)
**Continuous derivation of (8.12).** Compute the EL pieces for $L=\sqrt{-Q}$ with $Q\equiv g_{\mu\nu}\dot x^{\mu}\dot x^{\nu}$:
$$\begin{aligned}
\frac{\partial L}{\partial\dot x^{\alpha}}&=\frac{1}{2\,\sqrt{-Q}}\,\frac{\partial(-Q)}{\partial\dot x^{\alpha}}
=\frac{1}{2L}\,\big(-2\,g_{\alpha\nu}\,\dot x^{\nu}\big)
= -\,\frac{g_{\alpha\nu}\,\dot x^{\nu}}{L}\,,\quad\underbrace{\frac{\partial(-Q)}{\partial\dot x^{\alpha}}}_{=-2g_{\alpha\nu}\dot x^{\nu}} \\[4pt]
\frac{\partial L}{\partial x^{\alpha}}&=\frac{1}{2L}\,\underbrace{\frac{\partial(-Q)}{\partial x^{\alpha}}}_{=-\,\partial_{\alpha}g_{\mu\nu}\,\dot x^{\mu}\dot x^{\nu}}
= -\,\frac{1}{2L}\,\partial_{\alpha}g_{\mu\nu}\,\dot x^{\mu}\dot x^{\nu}}\,.
\end{aligned}$$
Insert into EL (8.5) and multiply through by $L$:
$$\begin{aligned}
0&=\frac{d}{d\sigma}\Big( -\,g_{\alpha\nu}\,\dot x^{\nu}\,\Big)\;\color{#777}{+\;\underbrace{\Big(-g_{\alpha\nu}\,\dot x^{\nu}\Big)\,\frac{d}{d\sigma}\ln L}_{\text{from }\frac{d}{d\sigma}(1/L)}}\;+\;\frac{1}{2}\,\partial_{\alpha}g_{\mu\nu}\,\dot x^{\mu}\dot x^{\nu}\\[4pt]
&\Rightarrow\;\; \frac{d}{d\sigma}\big(g_{\alpha\nu}\,\dot x^{\nu}\big)
\;=\;\frac{1}{2}\,\partial_{\alpha}g_{\mu\nu}\,\dot x^{\mu}\dot x^{\nu}
\;\;\underbrace{-\;\Big(g_{\alpha\nu}\,\dot x^{\nu}\Big)\,\frac{d}{d\sigma}\ln L}_{\text{reparametrization term}}\,.
\end{aligned}$$
Now **choose proper time** as parameter ($\sigma=\tau$) so that $L=\sqrt{-g_{\mu\nu}\,\dot x^{\mu}\dot x^{\nu}}=1$ (by definition of $\tau$), hence $\tfrac{d}{d\sigma}\ln L=0$. Relabel $\dot x\to d x/d\tau$. We obtain Moore’s first geodesic form:
$$\boxed{\ 0\;=\;\frac{d}{d\tau}\big(g_{\alpha\nu}\,\frac{dx^{\nu}}{d\tau}\big)
-\frac{1}{2}\,\partial_{\alpha}g_{\mu\nu}\,\frac{dx^{\mu}}{d\tau}\,\frac{dx^{\nu}}{d\tau}\ }\tag{8.12}$$
$\underbrace{\text{All indices are lowered on the metric; the result is a covector equation.}}_{\text{good starting point for eliminating }g\text{ derivatives}}$

---

## 8.3 Product/chain rule expansion toward the raised‑index form
Differentiate the first term in (8.12) explicitly (product + chain rule):
$$\boxed{\ \frac{d}{d\tau}\Big(g_{\alpha\beta}\,\frac{dx^{\beta}}{d\tau}\Big)
= \underbrace{\partial_{\mu}g_{\alpha\beta}\,\frac{dx^{\mu}}{d\tau}\,\frac{dx^{\beta}}{d\tau}}_{\text{metric varies with position}}
+ g_{\alpha\beta}\,\frac{d^2x^{\beta}}{d\tau^{2}}\ }\tag{8.13}$$
Insert (8.13) into (8.12), move the acceleration term to the left, and multiply by the **inverse metric** $g^{\rho\alpha}$ (so that $g^{\rho\alpha}g_{\alpha\beta}=\delta^{\rho}{}_{\beta}$):
$$\begin{aligned}
0&=\frac{d^2x^{\rho}}{d\tau^{2}}
+\underbrace{\frac{1}{2}\,g^{\rho\alpha}\Big(\partial_{\mu}g_{\alpha\nu}+\partial_{\nu}g_{\alpha\mu}-\partial_{\alpha}g_{\mu\nu}\Big)}_{\displaystyle \Gamma^{\rho}{}_{\mu\nu}}\,\frac{dx^{\mu}}{d\tau}\,\frac{dx^{\nu}}{d\tau}\\[-2pt]
&\hspace{8.4em}\boxed{\qquad\qquad\text{(Moore’s explicit raised‑index form, Eq. 8.14)}\qquad}\;
\end{aligned}\tag{8.14}$$
$\underbrace{\Gamma^{\rho}{}_{\mu\nu}}_{\text{Christoffel symbols of the second kind}}$ are built **only** from $g_{\mu\nu}$ and its derivatives; no new physics is being introduced—just a compact name for the combination in parentheses.

---

## 8.4 Checks and interpretation
**Flat Cartesian check.** If $g_{\mu\nu}=\eta_{\mu\nu}=\mathrm{diag}(-1,1,1,1)$ (constant), then all $\partial g=0\Rightarrow\Gamma=0$, so (8.14) gives
$$\frac{d^2x^{\rho}}{d\tau^2}=0\quad\Rightarrow\quad\text{inertial straight‑line motion.}$$
**Curvilinear/curved case.** If $g$ varies (either due to curvature or choice of coordinates), the **coordinate acceleration** is generally nonzero even for free fall; the geodesic encodes this.

---

## 8.5 Normalization identities (helpful when solving)
For any **timelike** worldline parameterized by $\tau$:
$$\boxed{\ u\cdot u \;=\; g_{\mu\nu}\,\frac{dx^{\mu}}{d\tau}\,\frac{dx^{\nu}}{d\tau}\;=\;-1\ }\tag{8.15}$$
Taking one $\tau$‑derivative and using (8.14) typically reproduces one geodesic component; more importantly, (8.15) fixes the **scale** of $\tau$ (EL alone cannot). In a 2D **spatial** surface with pathlength $s$:
$$\boxed{\ g_{\mu\nu}\,\frac{dx^{\mu}}{ds}\,\frac{dx^{\nu}}{ds}\;=\;+1\ }\tag{8.16}$$

---

## 8.6 Lightlike geodesics (photon limit)
For photons, $d\tau=0$ along the worldline, so (8.1)–(8.5) with $\sigma=\tau$ are not applicable. A practical route is to take the **massless limit** of timelike geodesics: rewrite the equations in terms of ratios that remain finite as $m\to0$ (e.g., divide one geodesic component by another so that the affine‑parameter scale cancels). In practice we often use **an affine parameter** $\lambda$ and the same raised‑index form (8.14) with $d/d\tau\to d/d\lambda$, plus the **null** normalization $g_{\mu\nu}\,dx^{\mu}/d\lambda\,dx^{\nu}/d\lambda=0$.

---

## Concept thread
1) Extremize proper time (8.1) via EL with $L=\sqrt{-g\dot x\dot x}$ (8.4–8.5). 2) Compute EL derivatives and **fix the parameter to proper time** to remove the reparameterization term → lowered‑index form (8.12). 3) Expand via product/chain rule (8.13) and raise with $g^{\rho\alpha}$ → explicit raised‑index form (8.14). 4) Use normalization (8.15)/(8.16) while solving. 5) Handle photons with an affine parameter and the same structural equation.

