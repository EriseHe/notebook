> **Goal of this chapter.** Diagnose the apparent “pathologies” at $r=2GM$ in Schwarzschild spacetime, separate **coordinate** from **geometric** problems, and show what the event horizon means physically: a one‑way surface where $r$ becomes a **time‑like** coordinate. All formulas match Moore’s notation. Each derivation is kept in a single aligned block; underbraces annotate algebraic substitutions only. Commentary appears outside the math blocks.

---

## 14.1 Schwarzschild metric and redshift reminder
The metric and the gravitational redshift from Ch. 9 are our starting points.

**Metric (14.1)**
$$\boxed{\ ds^2 = -\Big(1-\tfrac{2GM}{r}\Big)dt^2 + \Big(1-\tfrac{2GM}{r}\Big)^{-1}\!dr^2 + r^2 d\theta^2 + r^2\sin^2\!\theta\,d\phi^2 }\tag{14.1}$$

**Redshift (14.2)** for light emitted at $r_E$ and received at $r_R$:
$$\boxed{\ \frac{\lambda_R}{\lambda_E}=\sqrt{\frac{1-\tfrac{2GM}{r_R}}{1-\tfrac{2GM}{r_E}}}\ }\tag{14.2}$$
As $r_E\to2GM^+$, the denominator $\to0$ and $\lambda_R/\lambda_E\to\infty$ (infinite redshift).

---

## 14.2 What “goes wrong” at $r=2GM$: catalog via equations of motion
Table 14.1 in the text summarizes geodesic equations (equatorial plane). The patterns that signal trouble for **Schwarzschild coordinates** are:
- **Stationary worldline at $r=2GM$ is null** (no proper time elapses).
- **Signals from $r=2GM$** are infinitely redshifted at larger $r$.
- **Coordinate freeze:** for infall, $dr/dt\to0$ and $d\phi/dt\to0$ as $r\to2GM^+$.
- **$g_{rr}\to\infty$** so $ds/dr$ diverges for a $t=$const radial slice.

We make each of these explicit below.

### (a) Stationary worldline at $r=2GM$ is lightlike
Set $dr=d\theta=d\phi=0$ in (14.1):
$$\begin{aligned}
-ds^2&= \Big(1-\tfrac{2GM}{r}\Big)\,dt^2 \\
&\Rightarrow\;\boxed{\ ds^2=0\ \text{ at }\ r=2GM }\tag{14.5}
\end{aligned}$$
So no massive particle can remain at rest at $r=2GM$.

### (b) “Freezing” as seen from infinity
For a *massive* geodesic with constants $e=(1-2GM/r)\,dt/d\tau$ and $Q=r^2\,d\phi/d\tau$, one finds (Table 14.1 forms)
$$\begin{aligned}
\frac{dr}{dt}&=\pm\Big(1-\tfrac{2GM}{r}\Big)\sqrt{\,1-\Big(1-\tfrac{2GM}{r}\Big)\Big(1+\frac{Q^2}{r^2}\Big)\frac{1}{e^2}\,}\,,\\
\frac{d\phi}{dt}&=\Big(1-\tfrac{2GM}{r}\Big)\frac{Q}{e\,r^2} \,.
\end{aligned}$$
Both factors $\propto(1-2GM/r)$ drive the **coordinate** rates to zero as $r\to2GM^+$.

For a *photon* with $b=Q/e$ (Ch. 12),
$$\frac{dr}{dt}=\pm\Big(1-\tfrac{2GM}{r}\Big)\sqrt{\,1-\Big(1-\tfrac{2GM}{r}\Big)\frac{b^2}{r^2}\,}\,,\qquad
\frac{d\phi}{dt}=\Big(1-\tfrac{2GM}{r}\Big)\frac{b}{r^2},$$
again showing $dr/dt,\,d\phi/dt\to0$ as $r\to2GM^+$.

---

## 14.3 Coordinate vs. geometric pathology
A **geometric pathology** would make physical distances/times ill‑defined. But two checks show **finiteness** at the horizon, indicating a **coordinate** problem instead.

### (i) Finite radial proper distance to the horizon (14.3)
Along a $t=$const radial line, $ds=dr/\sqrt{1-2GM/r}$. The distance from $r=R$ down to $r=2GM$ is
$$\begin{aligned}
\mathcal D(R\to2GM)
&=\int_{2GM}^{R}\!\frac{dr}{\sqrt{1-\tfrac{2GM}{r}}} \\
&=\boxed{\ \sqrt{R\big(R-2GM\big)}\;+
GM\,\ln\!\Bigg|\frac{\sqrt{R}+\sqrt{R-2GM}}{\sqrt{2GM}}\Bigg|\ }\tag{14.3}
\end{aligned}$$
This is finite (e.g., $R=3GM\Rightarrow\mathcal D\approx3.05\,GM$).

### (ii) Finite proper time to fall past the horizon (14.4)
For a particle released from rest at $r=R$, the proper time to $r=0$ (passing $2GM$ en route) is
$$\boxed{\ \Delta\tau\;=\;\frac{\pi\,R^{3/2}}{\sqrt{8GM}}\ }\tag{14.4}$$
For a solar‑mass black hole and $R=1000\,GM$, this gives $\Delta\tau\approx0.18\,\mathrm{s}$.

These results argue strongly that the divergence at $r=2GM$ is a **coordinate pathology** of Schwarzschild coordinates.

---

## 14.4 Why $t$ fails and why $r$ becomes time‑like inside
Outside the horizon ($r>2GM$), $g_{tt}<0$ and $g_{rr}>0$; $t$ behaves as time and $r,\theta,\phi$ as space. Inside ($r<2GM$), the signs flip: $g_{tt}>0$, $g_{rr}<0$. Thus $r$ is **time‑like**, and $t$ becomes **space‑like**. No worldline (timelike or null) can stay at fixed $r$ inside; advancing into the future means **decreasing $r$**.

Even inside, surfaces of constant $r$ retain their **spherical** geometry (circumferential meaning of $r$ is unchanged); what changes is that no material object can be static with respect to those spheres.

---

## 14.5 The future inside the horizon is $r=0$
Use the radial acceleration equation from Ch. 10 (valid for all $r$):
$$\boxed{\ \frac{d^2 r}{d\tau^2}= -\,\frac{GM}{r^2}+\frac{Q^2}{r^3}-\frac{3GMQ^2}{r^4}\ }\tag{10.13}$$
For $r<3GM$ the bracketed combination is negative, so $d^2r/d\tau^2<0$ irrespective of $Q$; any freely‑falling worldline inevitably moves inward. Box 14.3 further shows that the **maximum** proper time any object can survive after crossing $r=2GM$ is
$$\boxed{\ \Delta\tau_{\max}=\pi\,GM }\quad\text{(inside the horizon).}$$
Thus the future of any infaller inside the horizon ends at the singularity $r=0$ after a finite proper time.

---

## 14.6 Event horizon as a one‑way surface
At $r=2GM$, timelike and null worldlines can **enter**, but none can **exit**. A spaceship outside may, with enough fuel, climb back to larger $r$; once it crosses $2GM$, its future (like time’s arrow) points strictly inward. This is the operational meaning of an **event horizon**.

---

## 14.7 Why Schwarzschild coordinates struggle, and what fixes it
Defining $t$ as “time at infinity” makes sense only for events that can communicate with infinity. Inside the horizon, such assignment is impossible even in principle, and the roles of $t$ and $r$ swap. The cure is to adopt coordinates that are regular across $r=2GM$ and keep time‑/space‑like character everywhere (e.g., **Eddington–Finkelstein** or **Kruskal–Szekeres**), which the next chapter develops.

---

## Concept summary (matching the chapter)
- Metric (14.1); redshift (14.2) → infinite redshift as $r_E\to2GM$.
- Stationary worldline at $2GM$ is null (14.5); $dr/dt$ and $d\phi/dt$ $\to0$ at the horizon.
- Finite radial distance to the horizon (14.3) and finite free‑fall proper time (14.4) ⇒ **coordinate**, not geometric, pathology at $2GM$.
- Inside: $g_{tt}>0,\ g_{rr}<0$ → $r$ is time‑like; all futures lead to $r=0$ in finite $\tau$ ($\le\pi GM$).
- Event horizon = one‑way membrane; Schwarzschild $t$ fails inside; use horizon‑penetrating coordinates next.

