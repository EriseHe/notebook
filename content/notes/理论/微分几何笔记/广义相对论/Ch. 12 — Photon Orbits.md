
> **Goal of this chapter.** Obtain the equations of motion for photons in Schwarzschild spacetime by taking the **massless limit** of geodesic first integrals; cast the null condition as an **energy‑like radial equation** with an effective potential; then relate coordinate components to **locally orthonormal frames (LOFs)** to compute angles, critical capture, and observed energies. All formulas use Moore’s notation. Each main result is derived in **one continuous aligned environment**; underbraces annotate algebraic substitutions only. Explanatory comments are outside the math blocks.

---

## 12.1 Why photons need special handling and the impact parameter $b$
Proper time along a photon worldline is zero, so we cannot use $d/d\tau$ directly. We therefore combine the **conserved quantities** from Ch. 10 into ratios that remain finite as $m\to0$. The **impact parameter** $b$ is defined by
$$\begin{aligned}
\boxed{\ b\;\equiv\;\frac{Q}{e}\ }&=\frac{\;r^2\,\dfrac{d\phi}{d\tau}\;}{\big(1-\dfrac{2GM}{r}\big)\,\dfrac{dt}{d\tau}}
\;=\;\boxed{\ \frac{r^2}{\;1-\dfrac{2GM}{r}\;}\,\frac{d\phi}{dt}\ }\\[4pt]
&\underbrace{=\;r\ \text{(in flat space, where }1-2GM/r\to1\text{ and }r^2\,d\phi/dt\text{ is the transverse speed)} }_{\text{classical impact parameter}}
\end{aligned}\tag{12.1}$$
The last equality shows that $b$ reduces to the classical impact parameter in flat space. For curved space, $b$ is the conserved ratio $Q/e$ for null geodesics.

---

## 12.2 Null condition → radial equation in $t$
Use the Schwarzschild line element on the equatorial plane ($\theta=\pi/2$) and the null condition $ds^2=0$:
$$\begin{aligned}
0&= -\Big(1-\frac{2GM}{r}\Big)dt^2 + \Big(1-\frac{2GM}{r}\Big)^{-1}\!dr^2 + r^2 d\phi^2 \\
&\Rightarrow\ \Big(1-\frac{2GM}{r}\Big)
= \Big(1-\frac{2GM}{r}\Big)^{-1}\!\Big(\frac{dr}{dt}\Big)^2 + r^2\Big(\frac{d\phi}{dt}\Big)^2 \\
&\Rightarrow\ \boxed{\ 1 \,=\, \frac{1}{\big(1-\tfrac{2GM}{r}\big)^{2}}\Big(\frac{dr}{dt}\Big)^2 + \Big(1-\frac{2GM}{r}\Big)\,\frac{b^2}{r^2}\ } \qquad \Big[\,\underbrace{\frac{d\phi}{dt}=\frac{1-2GM/r}{r^2}\,b}_{\text{from (12.1)}}\,\Big]
\end{aligned}\tag{12.3}$$
This expresses the null condition entirely in terms of $r(t)$ and the conserved $b$.

Divide by $b^2$ to obtain the **energy‑like** form with an effective potential $V(r)$:
$$\boxed{\ \frac{1}{b^2}\;=\;\underbrace{\frac{1}{b^2\,\big(1-\tfrac{2GM}{r}\big)^{2}}\Big(\frac{dr}{dt}\Big)^2}_{\text{radial “kinetic” term}}\; +\; \underbrace{\frac{1-\tfrac{2GM}{r}}{r^2}}_{\displaystyle V(r)}\ }\tag{12.4}$$
The potential $V(r)=(1-2GM/r)/r^2$ has a peak at $r=3GM$; photons with $1/b^2$ larger than this peak spiral inward, with the **critical** case $b^2=27(GM)^2$ corresponding to the unstable circular photon orbit at $r=3GM$.

**Flat‑space check.** Setting $GM\to0$ gives
$$\boxed{\ \frac{1}{b^2}=\frac{1}{b^2}\Big(\frac{dr}{dt}\Big)^2 + \frac{1}{r^2}\quad\text{(flat space)} }\tag{12.5}$$
which says a light ray from infinity always returns to infinity (no potential barrier).

---

## 12.3 Locally orthonormal frames (LOFs) for static observers
A stationary observer constructs a **locally orthonormal tetrad** $\{\mathcal O_t,\mathcal O_x,\mathcal O_y,\mathcal O_z\}$ at a point $P$, satisfying
$$\boxed{\ \mathcal O_x\!\cdot\!\mathcal O_x = \mathcal O_y\!\cdot\!\mathcal O_y = \mathcal O_z\!\cdot\!\mathcal O_z = +1,\quad \mathcal O_t\!\cdot\!\mathcal O_t=-1,\quad \mathcal O_a\!\cdot\!\mathcal O_b=0\ (a\neq b) }\tag{12.6}$$
so the metric in the LOF is Minkowski:
$$\boxed{\ (g_{\mu\nu})_{\text{LOF}} = \eta_{\mu\nu} }\tag{12.7}$$
If $A$ is any four‑vector with components $A^\mu$ in Schwarzschild coordinates and $(\mathcal O_a)^\mu$ are the **Schwarzschild components** of the LOF basis vectors, the observed components follow from scalar products:
$$\boxed{\ A_{\text{obs}}^{\,t}= -\,\mathcal O_t\!\cdot\!A,\quad A_{\text{obs}}^{\,x}= \mathcal O_x\!\cdot\!A,\quad A_{\text{obs}}^{\,y}= \mathcal O_y\!\cdot\!A,\quad A_{\text{obs}}^{\,z}= \mathcal O_z\!\cdot\!A }\tag{12.8–12.9}$$
For a static observer aligned with the Schwarzschild directions $(\phi,-\theta,r)$, the tetrad components are
$$\boxed{\ (\mathcal O_t)^\mu=\Big(\frac{1}{\sqrt{1-\tfrac{2GM}{r}}},0,0,0\Big),\quad (\mathcal O_x)^\mu=\Big(0,\frac{1}{r\sin\theta},0,0\Big),\quad (\mathcal O_y)^\mu=\Big(0,0,\frac{1}{r},0\Big),\quad (\mathcal O_z)^\mu=\Big(0,0,0,\sqrt{1-\tfrac{2GM}{r}}\Big) }\tag{12.10}$$
These satisfy $\mathcal O_a\!\cdot\!\mathcal O_b=\eta_{ab}$ with the Schwarzschild metric.

---

## 12.4 Photon four‑momentum in Schwarzschild coordinates
For a massive particle, $p^\mu=m\,dx^\mu/d\tau$ and using $e=(1-2GM/r)\,dt/d\tau$ one may write
$$\boxed{\ p^\mu = \Big(\frac{E}{1-\tfrac{2GM}{r}},\;p^\phi,\;p^\theta,\;p^r\Big),\qquad E\equiv m e }\tag{12.11}$$
Taking the **massless limit** defines the photon case by keeping $E$ (energy at infinity) finite. On the equatorial plane ($\theta=\pi/2$) the conserved ratio (12.1) and the null condition yield
$$\boxed{\ p^t=\frac{E}{1-\tfrac{2GM}{r}},\qquad p^\phi=\frac{E\,b}{r^2},\qquad p^\theta=0,\qquad p^r=\pm E\,\sqrt{\,1-\Big(1-\tfrac{2GM}{r}\Big)\frac{b^2}{r^2}\;} }\tag{12.12a–b}$$
where the sign of $p^r$ distinguishes outgoing (+) from ingoing (−) photons.

---

## 12.5 Critical escape angle for stationary observers
Let a static observer at radius $r$ emit a photon in the equatorial plane making an angle $\psi$ with the **radially outward** direction ($\mathcal O_z$). In the LOF, the photon speed is 1, so
$$\boxed{\ \sin\psi=\frac{v_{x,\text{obs}}}{1}=\frac{(\mathcal O_x\!\cdot\!p)}{-\,(\mathcal O_t\!\cdot\!p)} }\tag{12.13}$$
Using (12.10) and (12.12) in the dot products and imposing the **critical** condition $b^2=27(GM)^2$ (the top of $V(r)$) gives
$$\boxed{\ \sin\psi_c\;=\;\frac{3\sqrt{3}\,GM}{r}\,\sqrt{1-\frac{2GM}{r}}\ }\tag{12.14}$$
As $r\to\infty$, $\sin\psi_c\to0$ so $\psi_c\to180^\circ$ (escape in almost any direction). At $r=3GM$, $\sin\psi_c=1\Rightarrow\psi_c=90^\circ$ (photon sphere). As $r\to2GM$, $\psi_c\to0^\circ$: even radially outward light is captured.

---

## **12.6 Energy measured by a stationary observer (blueshift)**
**The energy measured in the LOF is $E_{\text{obs}}\equiv -\,\mathcal O_t\!\cdot\!p$. Using (12.10) and (12.12),**
**$$\boxed{\ E_{\text{obs}}\;=\;\frac{E}{\sqrt{1-\tfrac{2GM}{r}}}\;>\;E\quad(\text{diverges as }r\to2GM) }\tag{12.15}$$**
**This blueshift reflects that local clocks run slower than the clock at infinity. Conversely, light sent upward is redshifted as seen at infinity.**

---

## Concept summary (matching the chapter)
- **Conserved ratio:** $b=Q/e$ stays finite for null geodesics and equals $r^2 d\phi/dt\,/\,(1-2GM/r)$ (12.1).
- **Radial null equation:** $1= (dr/dt)^2/(1-2GM/r)^2 + (1-2GM/r)\,b^2/r^2$ (12.3); energy‑like form with $V(r)=(1-2GM/r)/r^2$ (12.4). Peak at $r=3GM$ sets $b_c^2=27(GM)^2$.
- **Flat‑space limit:** $1/b^2=(1/b^2)(dr/dt)^2+1/r^2$ (12.5).
- **LOF/tetrad:** orthonormality (12.6–12.7), component extraction by dot products (12.8–12.9), explicit static‑observer tetrad (12.10).
- **Photon four‑momentum:** components (12.12a–b).
- **Critical escape angle:** $\sin\psi_c=(3\sqrt{3}GM/r)\sqrt{1-2GM/r}$ (12.14).
- **Observed energy:** $E_{\text{obs}}=E/\sqrt{1-2GM/r}$ (12.15).

> **Where this leads.** Chapter 14 puts the event horizon at $r=2GM$ under the microscope and explains which assumptions behind (12.14) fail at and inside the horizon, completing the picture of capture, lensing, and escape. 

