---
title: "Ch. 9 — The Schwarzschild Metric"
---


> **Goal of this chapter.** Introduce the Schwarzschild metric as a spherically symmetric, time‑independent vacuum solution; interpret its coordinates **operationally** (circumferential radial coordinate and time at infinity); and derive gravitational redshift and the large‑radius Newtonian limit. Every formula is preserved and each key result is derived in **one continuous aligned environment** with under‑brace comments.

---

## 9.1 Spherical coordinates for flat spacetime ⇒ metric forms (review)
**Why this matters.** We need the flat‑space spherical metric as a reference to recognize what Schwarzschild changes.

**(9.1) Metric on a 2‑sphere (radius $R$) in $(\theta,\phi)$:**
$$\boxed{\ ds^2 = R^2\,d\theta^2 + R^2\sin^2\!\theta\,d\phi^2 }\tag{9.1}$$
**(9.2) Flat Minkowski spacetime in spherical coordinates $(t,r,\theta,\phi)$:**
$$\boxed{\ ds^2 = -dt^2 + dr^2 + r^2\,d\theta^2 + r^2\sin^2\!\theta\,d\phi^2 }\tag{9.2}$$

---

## 9.2 The Schwarzschild metric and its properties
**Statement (vacuum, static, spherically symmetric):**
$$\boxed{\ ds^2 = -\Big(1-\frac{r_s}{r}\Big)dt^2 + \Big(1-\frac{r_s}{r}\Big)^{-1}\!dr^2 + r^2\,d\theta^2 + r^2\sin^2\!\theta\,d\phi^2 }\tag{9.3}$$
*Significance.* Same angular part as (9.1); deviations sit in $g_{tt}$ and $g_{rr}$, depending only on $r$, and approaching flat space as $r\to\infty$.

---

## 9.3 Meaning of the Schwarzschild $r$: circumferential radial coordinate
**Derivation of (9.4)–(9.5) in one aligned block.** For a circle at constant $r$, equatorial plane $(\theta=\pi/2)$, and fixed time $(dt=0)$:
$$\begin{aligned}
&ds^2=\underbrace{0}_{dt=0}+\underbrace{0}_{dr=0}+\underbrace{0}_{d\theta=0}+r^2\,d\phi^2 \;\Rightarrow\; ds=r\,d\phi,\tag{9.4}\\[2pt]
&C\equiv\int ds = \int_0^{2\pi} r\,d\phi = 2\pi r \;\Rightarrow\; \boxed{\ r = \dfrac{C}{2\pi} }\,.\tag{9.5}
\end{aligned}$$
$\underbrace{\text{Thus, }r\text{ is fixed by circumference, not by radial distance from the origin.}}_{\text{“circumferential” radial coordinate}}$

**Radial distance is *not* $r$ (9.6).** Along a purely radial line $(dt=d\theta=d\phi=0)$:
$$\boxed{\ ds^2=\Big(1-\frac{r_s}{r}\Big)^{-1}dr^2\ \Rightarrow\ ds=\frac{dr}{\sqrt{1-r_s/r}}\;>\;|dr| }\tag{9.6}$$
*Significance.* Curvature shows up as the discrepancy between circumferential radius and actual radial distance measured within the geometry.

**Analogy on a sphere (9.7).** For a circle of fixed latitude $\theta$ on a sphere of radius $R$:
$$\boxed{\ r\equiv\frac{C}{2\pi}=R\sin\theta\quad\text{while the surface radius is }R\theta>R\sin\theta }\tag{9.7}$$

---

## 9.4 Fixing $r_s$ by the Newtonian limit (initial free‑fall acceleration)
**Geodesic‑based initial proper‑time acceleration (9.8) vs Newton (9.9).** For a particle *released from rest* at radius $r$, the geodesic equation gives
$$\boxed{\ \frac{d^2 r}{d\tau^2}\Big|_{\text{initial}}= -\,\frac{1}{2}\,\frac{r_s}{r^2} }\tag{9.8}$$
Newton’s law for a particle dropped from rest at $r$ is
$$\boxed{\ \frac{d^2 r}{dt^2}= -\,\frac{GM}{r^2} }\tag{9.9}$$
**Matching and conclusion in one aligned block.** At the instant of release from rest at large $r$, $dt\approx d\tau$ (and the distinction between $r$ and radial distance is negligible), so equating magnitudes:
$$\begin{aligned}
\frac{1}{2}\,\frac{r_s}{r^2}\;&\approx\;\frac{GM}{r^2} \quad\Longrightarrow\quad \boxed{\ r_s=2GM }\,.
\end{aligned}$$
**Rewrite (9.3) with $r_s=2GM$ ⇒ (9.10):**
$$\boxed{\ ds^2 = -\Big(1-\frac{2GM}{r}\Big)dt^2 + \Big(1-\frac{2GM}{r}\Big)^{-1}\!dr^2 + r^2\,d\theta^2 + r^2\sin^2\!\theta\,d\phi^2 }\tag{9.10}$$

---

## 9.5 Meaning of the Schwarzschild $t$: “time at infinity” and gravitational time dilation
**Clock at rest at radius $r$** (so $dr=d\theta=d\phi=0$). From (9.10):
$$\begin{aligned}
\Delta\tau_r
&= \int\!\sqrt{\,-g_{tt}\,}\,dt
= \int\!\sqrt{\,1-\tfrac{2GM}{r}\,}\,dt
\;\Rightarrow\; \boxed{\ \Delta\tau_r=\sqrt{1-\tfrac{2GM}{r}}\;\Delta t\ }\tag{9.11}
\end{aligned}$$
$\underbrace{\Delta t\text{ is the }t\text{‑meter separation (time at infinity); }\Delta\tau_r\text{ is the *local* proper time.}}_{\text{Clocks lower in }r\text{ run slower relative to }t\text{ at }\infty}$

---

## 9.6 Gravitational redshift from $F_{\mu\nu}$-free kinematics
**Two successive wave crests** emitted at $r_E$ and received at $r_R>r_E$ have the **same $\Delta t$** separation at both locations (because the metric is time‑independent), but different proper‑time separations measured by local clocks.

**Derive (9.12a–b) in one aligned block.**
$$\begin{aligned}
\text{At emission: }&\ \Delta\tau_E=\sqrt{1-\tfrac{2GM}{r_E}}\,\Delta t\;\Rightarrow\; \lambda_E=\Delta\tau_E,\\
\text{At reception: }&\ \Delta\tau_R=\sqrt{1-\tfrac{2GM}{r_R}}\,\Delta t\;\Rightarrow\; \lambda_R=\Delta\tau_R,\\[2pt]
\Rightarrow\;&\ \boxed{\ \frac{\Delta\tau_R}{\Delta\tau_E}=\sqrt{\frac{1-\tfrac{2GM}{r_R}}{1-\tfrac{2GM}{r_E}}}\ }\tag{9.12a}\\
&\ \boxed{\ \frac{\lambda_R}{\lambda_E}=\sqrt{\frac{1-\tfrac{2GM}{r_R}}{1-\tfrac{2GM}{r_E}}}\;>\;1\quad( r_R>r_E) }\tag{9.12b}
\end{aligned}$$
$\underbrace{\text{Light climbing out (}r_R>r_E\text{) is red‑shifted; divergence as }r_E\to2GM\,.}_{\text{Signals from }r\le2GM\text{ never reach infinity}}$

**Large‑$r$ (weak‑field) approximation (9.13) in one aligned block.** Using $\sqrt{1-\varepsilon}\approx 1-\tfrac{1}{2}\varepsilon$ when $\varepsilon\ll1$:
$$\begin{aligned}
\frac{\lambda_R}{\lambda_E}
&=\sqrt{\frac{1-\tfrac{2GM}{r_R}}{1-\tfrac{2GM}{r_E}}}
\;\approx\;\frac{1-\tfrac{GM}{r_R}}{\,1-\tfrac{GM}{r_E}\,}
\;\approx\;\big(1-\tfrac{GM}{r_R}\big)\big(1+\tfrac{GM}{r_E}\big)\\
&\approx\;1+GM\Big(\frac{1}{r_E}-\frac{1}{r_R}\Big)\,.
\ \boxed{\ \text{(9.13) weak‑field redshift form} }\tag{9.13}
\end{aligned}$$

**Small height $h\ll r_E$ limit (9.14) in one aligned block.** Let $r_R=r_E+h$ and $g\equiv GM/r_E^2$:
$$\begin{aligned}
\frac{\lambda_R}{\lambda_E}
&\approx\;1+GM\Big(\frac{1}{r_E}-\frac{1}{r_E+h}\Big)
\;\approx\;1+GM\Big(\frac{1}{r_E}-\frac{1}{r_E}-\frac{h}{r_E^2}\Big)\\
&\approx\;1+\frac{GM}{r_E^2}\,h\;=\;\boxed{\ 1+g\,h\ }\quad\text{(with }2GM\ll r\text{ and }h\ll r_E\text{).}\tag{9.14}
\end{aligned}$$
*Significance.* Matches the equivalence‑principle elevator argument for gravitational redshift in a uniform field over small heights.

---

## 9.7 Concept summary (matching the chapter)
- **Metric:** Schwarzschild form (9.3), rewritten with $r_s=2GM$ as (9.10).
- **$r$ meaning:** circumferential radius via (9.4)–(9.5); radial distance along a geodesic $> |\Delta r|$ via (9.6); spherical analogy (9.7).
- **Newtonian limit:** initial free‑fall acceleration (9.8) matches Newton (9.9) $\Rightarrow r_s=2GM$.
- **Time at infinity:** clocks at fixed $r$ run slow by $\sqrt{1-2GM/r}$ vs $t$ (9.11).
- **Redshift:** exact (9.12a–b); weak‑field (9.13); small‑height (9.14).

> **Where this leads.** Next chapters use (9.10) to analyze free fall, orbits, photon spheres, and the event horizon, and then interpret measurements made by static and free‑fall observers in Schwarzschild spacetime.

