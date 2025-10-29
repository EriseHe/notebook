---
title: "Ch. 10 — Particle Orbits"
---


> **Goal of this chapter.** Use the geodesic equation in Schwarzschild spacetime to derive conserved quantities, the radial “energy” equation with an **effective potential** $V(r)$, circular‑orbit conditions (including the ISCO), and simple astrophysical implications. All formulas preserve Moore’s notation; each result is derived in **one continuous aligned environment**. Underbraces are used only for **derivation clarifications**.

---

## 10.1 Geodesic equation (working form)
We start from the lowered‑index geodesic equation (from Ch. 8), written component‑wise as
$$\boxed{\ 0 \,=\, \frac{d}{d\tau}\!\Big(g_{\mu\nu}\,\frac{dx^{\nu}}{d\tau}\Big)\;-
\tfrac12\,\partial_{\mu}g_{\alpha\beta}\,\frac{dx^{\alpha}}{d\tau}\,\frac{dx^{\beta}}{d\tau}\ }\tag{10.1}$$
This form is convenient in Schwarzschild coordinates because $g_{\mu\nu}$ is diagonal and depends only on $r$.

---

## 10.2 Schwarzschild metric and components
Metric (GR units):
$$\boxed{\ ds^2 = -\Big(1-\tfrac{2GM}{r}\Big)dt^2 + \Big(1-\tfrac{2GM}{r}\Big)^{-1}\!dr^2 + r^2 d\theta^2 + r^2\sin^2\!\theta\,d\phi^2 }\tag{10.2}$$
Read off the nonzero components:
$$\boxed{\ g_{tt}=-(1-\tfrac{2GM}{r}),\quad g_{rr}=(1-\tfrac{2GM}{r})^{-1},\quad g_{\theta\theta}=r^2,\quad g_{\phi\phi}=r^2\sin^2\!\theta }\tag{10.3}$$

---

## 10.3 Conserved quantities from symmetries
### (a) Time‑translation symmetry → energy per unit mass $e$
$$\begin{aligned}
0&=\frac{d}{d\tau}\!\Big(g_{t\nu}\,\frac{dx^{\nu}}{d\tau}\Big)-\tfrac12\,\partial_{t}g_{\alpha\beta}\,\frac{dx^{\alpha}}{d\tau}\,\frac{dx^{\beta}}{d\tau}
\\
&=\frac{d}{d\tau}\!\Big(g_{tt}\,\frac{dt}{d\tau}\Big)\;\underbrace{-\;0}_{\partial_t g_{\alpha\beta}=0}\;\Rightarrow\;\boxed{\ g_{tt}\,\frac{dt}{d\tau}=\text{const}\equiv -e }\\[2pt]
&\Rightarrow\;\boxed{\ e=(1-\tfrac{2GM}{r})\,\frac{dt}{d\tau} }
\end{aligned} \tag{10.5}$$
The constant $e$ is the **relativistic energy per unit mass at infinity** (since at $r\!\to\!\infty$, $e\to u^t$).

### (b) Rotational symmetry about z‑axis → angular momentum per unit mass $Q$
$$\begin{aligned}
0&=\frac{d}{d\tau}\!\Big(g_{\phi\nu}\,\frac{dx^{\nu}}{d\tau}\Big)-\tfrac12\,\partial_{\phi}g_{\alpha\beta}\,\frac{dx^{\alpha}}{d\tau}\,\frac{dx^{\beta}}{d\tau}
\\
&=\frac{d}{d\tau}\!\Big(g_{\phi\phi}\,\frac{d\phi}{d\tau}\Big)\;\underbrace{-\;0}_{\partial_\phi g_{\alpha\beta}=0}\;\Rightarrow\;\boxed{\ g_{\phi\phi}\,\frac{d\phi}{d\tau}=\text{const}\equiv Q }\\[2pt]
&\Rightarrow\;\boxed{\ Q=r^2\sin^2\!\theta\,\frac{d\phi}{d\tau} }\tag{10.7}
\end{aligned}$$
Every geodesic lies in a plane through the origin; set $\theta=\pi/2$ (equatorial plane) so $Q=r^2\,d\phi/d\tau$.

---

## 10.4 Radial “energy” equation and effective potential
Use normalization $u\!\cdot\!u=-1$ on the equatorial plane ($\theta=\pi/2$, $d\theta=0$):
$$\begin{aligned}
-1&=g_{tt}\Big(\frac{dt}{d\tau}\Big)^2+g_{rr}\Big(\frac{dr}{d\tau}\Big)^2+g_{\phi\phi}\Big(\frac{d\phi}{d\tau}\Big)^2\\[2pt]
&= -\,\frac{e^2}{\,1-\frac{2GM}{r}\,}\;\underbrace{+\;\Big(1-\tfrac{2GM}{r}\Big)^{-1}\Big(\frac{dr}{d\tau}\Big)^2}_{g_{rr}(dr/d\tau)^2}\;+\;\frac{Q^2}{r^2}\\[2pt]
&\Rightarrow\;\Big(\frac{dr}{d\tau}\Big)^2\;=\;e^2-\Big(1-\tfrac{2GM}{r}\Big)\Big(1+\frac{Q^2}{r^2}\Big) \\[2pt]
&\Rightarrow\;\boxed{\ \tfrac12\Big(\frac{dr}{d\tau}\Big)^2\;=\;E\;-
\underbrace{\Big[\,\frac{GM}{r}+\frac{Q^2}{2r^2}-\frac{GMQ^2}{r^3}\,\Big]}_{\displaystyle V(r)}\ }\tag{10.8–10.9}
\end{aligned}$$
where $E\equiv \tfrac12(e^2-1)$. This has the **conservation form** $E=K+V(r)$ with “radial kinetic energy per unit mass” $K=\tfrac12 (dr/d\tau)^2$.

**Newtonian analogue.** With Newtonian time $t$ and $Q=r^2\,d\phi/dt$, the energy equation is
$$\boxed{\ \tfrac12\Big(\frac{dr}{dt}\Big)^2 + V_N(r) = E_N,\qquad V_N(r) = -\frac{GM}{r}+\frac{Q^2}{2r^2} }\tag{10.10}$$
The **only formal difference** is the extra $-GMQ^2/r^3$ term in $V(r)$ for Schwarzschild.

---

## 10.5 Circular orbits and Kepler’s third law
### (a) Circular‑orbit radii from $dV/dr=0$
$$\begin{aligned}
0&=\frac{dV}{dr}=\frac{GM}{r^2}-\frac{Q^2}{r^3}+\frac{3GMQ^2}{r^4}
\;\Rightarrow\; GM r^2 - Q^2 r + 3GMQ^2=0\\
&\Rightarrow\;\boxed{\ r_c=\frac{Q^2}{2GM}\Big(1\pm\sqrt{1-12\,(GM/Q)^2}\Big) }\tag{10.11}
\end{aligned}$$
The smaller root is **unstable**, the larger **stable**.

### (b) Kepler’s third law (period as measured at infinity)
For a circular orbit, $dr/d\tau=0$. Using $Q=r^2\,d\phi/d\tau$ and $e=(1-2GM/r)\,dt/d\tau$, one finds the angular speed seen at infinity $\Omega\equiv d\phi/dt=Q/(e\,r^2)$. Eliminating $e$ via the circular‑orbit condition yields
$$\boxed{\ \Omega^2=\frac{GM}{r_c^3}\ \;\Longleftrightarrow\;\ T^2=\frac{4\pi^2}{GM}\,r_c^3 }\tag{10.12}$$
This is **Kepler’s law** with the period $T$ measured by an observer at infinity.

---

## 10.6 Radial acceleration equations (model‑friendly form)
Differentiate the energy equations w.r.t. their parameters:
$$\begin{aligned}
\text{Schwarzschild: }\quad 0&=\frac{d}{d\tau}\Big[\tfrac12\Big(\frac{dr}{d\tau}\Big)^2+V(r)\Big]
=\frac{dr}{d\tau}\,\frac{d^2 r}{d\tau^2}+\frac{dV}{dr}\,\frac{dr}{d\tau}\\[2pt]
&\Rightarrow\;\boxed{\ \frac{d^2 r}{d\tau^2}= -\,\frac{GM}{r^2}+\frac{Q^2}{r^3}-\frac{3GMQ^2}{r^4} }\tag{10.13}
\end{aligned}$$
$$\boxed{\ \text{Newtonian:}\quad \frac{d^2 r}{dt^2}= -\,\frac{GM}{r^2}+\frac{Q^2}{r^3} }\tag{10.14}$$
For **pure radial motion**, $Q=0$, giving $d^2 r/d\tau^2= -GM/r^2$ (same radial field law).

---

## 10.7 Stability and the innermost stable circular orbit (ISCO)
Stability requires $d^2 V/dr^2\big|_{r_c}>0$. Applying this to (10.11) gives the condition
$$\boxed{\ Q^2>12\,G^2M^2\quad\Longleftrightarrow\quad r_c>6GM }\tag{10.6*}$$
The equality defines the **ISCO** at $r_{\text{ISCO}}=6GM$. Below this, no stable circular orbits exist in Schwarzschild spacetime.

---

## 10.8 Energy at the ISCO and accretion efficiency
For a circular orbit (equatorial), combine normalization with the constants $e,Q$:
$$\begin{aligned}
-1&=g_{tt}\Big(\frac{dt}{d\tau}\Big)^2+g_{\phi\phi}\Big(\frac{d\phi}{d\tau}\Big)^2
= -\,\frac{e^2}{1-\frac{2GM}{r}}+\frac{Q^2}{r^2}\\[2pt]
&\Rightarrow\;\boxed{\ e^2=\Big(1-\tfrac{2GM}{r}\Big)\Big(1+\frac{Q^2}{r^2}\Big) }\tag{10.15}
\end{aligned}$$
At the ISCO, $r=6GM$ and $Q^2=12G^2M^2$. Hence
$$\begin{aligned}
 e^2&=\Big(1-\tfrac{1}{3}\Big)\Big(1+\tfrac{1}{3}\Big)=\tfrac{8}{9}\;\Rightarrow\;\boxed{\ e=\sqrt{\tfrac{8}{9}}\approx0.943 }\\[2pt]
&\Rightarrow\;\boxed{\ \Delta e \equiv 1-e \approx 0.057 }\tag{10.16}
\end{aligned}$$
Thus, matter spiraling in from infinity to the ISCO radiates $\sim5.7\%$ of its rest‑mass energy before plunging.

---

## 10.9 Disk luminosity and characteristic temperature
Assuming the inner annulus $[R,2R]$ dominates and radiates as a blackbody:
$$\boxed{\ L=\sigma\,A\,T^4 }\quad (\sigma=5.67\times10^{-8}\,\mathrm{W\,m^{-2}\,K^{-4}})\tag{10.17}$$
Since $A\propto R^2$ and $R\sim r_{\text{ISCO}}\propto GM$, one finds
$$\boxed{\ T\;\propto\;L^{1/4}\,M^{-1/2}\;\approx\;10^{6}\,\mathrm{K}\;\Big(\tfrac{L}{L_\odot}\Big)^{1/4}\Big(\tfrac{M}{M_\odot}\Big)^{-1/2} }\tag{10.18}$$
Hence stellar‑mass compact objects with stellar‑like luminosities have **X‑ray** inner‑disk temperatures (photon energies $\sim$ keV).

---

## Concept summary
- Geodesic first integrals: $e=(1-2GM/r)\,dt/d\tau$ and $Q=r^2 d\phi/d\tau$ (10.5, 10.7).
- Radial energy equation: $\tfrac12(dr/d\tau)^2=E-V(r)$ with $V(r)=GM/r+Q^2/(2r^2)-GMQ^2/r^3$ (10.8–10.9).
- Circular orbits: roots (10.11); Kepler law at infinity (10.12).
- Acceleration form for integration (10.13) vs Newtonian (10.14).
- Stability ⇒ ISCO at $6GM$; ISCO energy and $\Delta e\approx0.057$ (10.15–10.16).
- Disk blackbody estimate and $T$ scaling (10.17–10.18).

