
## 38.1 Overview

For Schwarzschild, the surface $r = 2GM$ is both

- an **infinite-redshift surface** ($g_{tt}=0$) and  
- an **event horizon**

so outgoing light and clocks “freeze” there as seen from infinity.

In Kerr spacetime, the surface where $g_{tt}=0$ **does not** coincide with the event horizon.  
The infinite-redshift surface instead **encloses** the horizon and bounds the **ergoregion**.

---

## 38.2 Infinite-Redshift Surface

A clock at rest in Kerr spacetime ($dr = d\theta = d\phi = 0$) measures proper time

$$
d\tau = \sqrt{-g_{tt}}\,dt
$$

Thus any location with $g_{tt}=0$ is an **infinite-redshift surface**: clocks there tick at zero rate relative to infinity.

Setting the full Kerr $g_{tt}$ to zero gives two such surfaces

$$
r = GM \pm \sqrt{(GM)^2 - a^2\cos^2\theta}
\tag{38.1}
$$

For $a < GM$ the **outer** surface

$$
r_e = GM + \sqrt{(GM)^2 - a^2\cos^2\theta}
\tag{38.2}
$$

is the outer boundary of the **ergoregion** and is usually what we mean by the infinite-redshift surface.

---

## 38.3 Static Limit and Allowed Angular Velocities

Consider an observer kept at constant $r$ and $\theta$ but free in $\phi$.  
A timelike worldline requires

$$
0 \le d\tau^2 = -ds^2
= -\big(g_{tt}\,dt^2 + 2g_{t\phi}\,dt\,d\phi + g_{\phi\phi}\,d\phi^2\big)
$$

Dividing by $dt^2$ and defining $\Omega \equiv d\phi/dt$ gives

$$
0 \ge g_{tt} + 2g_{t\phi}\Omega + g_{\phi\phi}\Omega^2
\tag{38.3}
$$

This quadratic inequality implies a range

$$
\Omega_{\min} \le \Omega \le \Omega_{\max}
$$

where

$$
\begin{aligned}
\Omega_{\min}
&=
-\frac{g_{t\phi}}{g_{\phi\phi}}
-\frac{\sqrt{[g_{t\phi}]^2 - g_{tt}g_{\phi\phi}}}{g_{\phi\phi}} \\[4pt]
\Omega_{\max}
&=
-\frac{g_{t\phi}}{g_{\phi\phi}}
+\frac{\sqrt{[g_{t\phi}]^2 - g_{tt}g_{\phi\phi}}}{g_{\phi\phi}}
\end{aligned}
\tag{38.4}
$$

> [!remark|38.1] Interpretation of $\Omega_{\min}$ and $\Omega_{\max}$
> At a given $(r,\theta)$, any physical observer at rest in $r$ and $\theta$ must rotate with an angular velocity $\Omega$ in this interval.

On the **outer infinite-redshift surface** ($g_{tt}=0$), equation 38.4 gives $\Omega_{\min}=0$.  
Thus only photons can remain at rest there; massive particles must have $0 < \Omega \le \Omega_{\max}$ and co-rotate with the source.

For $r$ **inside** the infinite-redshift surface, $g_{tt}>0$ and the square-root term is smaller than $|g_{t\phi}|$, so both $\Omega_{\min}$ and $\Omega_{\max}$ are positive:

$$
0 < \Omega_{\min} \le \Omega \le \Omega_{\max}
\quad\text{(inside the infinite-redshift surface)}
\tag{38.6}
$$

No observer can remain static with respect to infinity inside this region, hence the term **static limit** for the infinite-redshift surface.

---

## 38.4 Event Horizon Radius

As $r$ decreases further inside the ergoregion, $g_{tt}$ continues to grow and eventually the quantity

$$
[g_{t\phi}]^2 - g_{tt}g_{\phi\phi}
$$

becomes negative, so the allowed range of $\Omega$ disappears; even a powered spacecraft cannot maintain constant $r$.  
This is interpreted as an **event horizon** where all timelike worldlines must move inward.

Using equation 37.4,

$$
[g_{t\phi}]^2 - g_{tt}g_{\phi\phi}
=
(r^2 + a^2 - 2GMr)\sin^2\theta
\equiv R^2\sin^2\theta
$$

so the horizon is located where $R^2 = 0$:

$$
0 = R^2 = r^2 + a^2 - 2GMr
\quad\Rightarrow\quad
r_\pm = GM \pm \sqrt{(GM)^2 - a^2}
\tag{38.7}
$$

The **outer horizon** is at $r = r_+ = GM + \sqrt{(GM)^2 - a^2}$  
In the limit $a \to 0$, this becomes $r_+ = 2GM$ as in Schwarzschild.

---

## 38.5 Geometry and Area of the Event Horizon

On the horizon $r = r_+$, the induced 2-metric (in $(\theta,\phi)$ coordinates) is

$$
ds^2
=
\rho_+^2 d\theta^2
+
\left(\frac{2GMr_+}{\rho_+}\right)^2
\sin^2\theta\,d\phi^2
\qquad
\text{where }\rho_+^2 \equiv r_+^2 + a^2\cos^2\theta
\tag{38.8}
$$

Because both $g_{\theta\theta}$ and $g_{\phi\phi}$ depend on $\theta$, this surface is **not** a perfect sphere unless $a=0$; it is more like an oblate spheroid whose shape becomes flatter as $a$ increases.

From this metric one can show that the physical area of the event horizon is

$$
A = 8\pi GMr_+
\tag{38.9}
$$

> [!remark|38.2] Horizon area
> For $a=0$, this reduces to the Schwarzschild value $A = 16\pi G^2M^2$.

---

## 38.6 Locating the Time Coordinate: The $t\phi$ Submatrix

To understand which coordinate is “time-like” inside and outside the horizon, consider the $t\phi$ submatrix of the Kerr metric

$$
g_{\mu\nu}
=
\begin{bmatrix}
g_{tt} & g_{t\phi} \\
g_{\phi t} & g_{\phi\phi}
\end{bmatrix}
\quad
(t\phi\ \text{submatrix})
\tag{38.10}
$$

A general coordinate transformation $x^\mu \to x'^\alpha$ gives

$$
g'_{\alpha\beta}
=
\frac{\partial x^\mu}{\partial x'^\alpha}
\frac{\partial x^\nu}{\partial x'^\beta}
g_{\mu\nu}
\tag{38.11}
$$

If there is a time coordinate hidden in some combination $T(t,\phi)$, we can locally transform the submatrix to

$$
g'_{\mu\nu}
=
\begin{bmatrix}
-1 & 0 \\
0 & 1
\end{bmatrix}
\quad
(T\Phi\ \text{submatrix, time coordinate lurking})
\tag{38.12a}
$$

If both $t$ and $\phi$ are purely spatial, the best we can do is

$$
g'_{\mu\nu}
=
\begin{bmatrix}
1 & 0 \\
0 & 1
\end{bmatrix}
\quad
(T\Phi\ \text{submatrix, no time coordinate})
\tag{38.12b}
$$

The **sign of the determinant** of the submatrix cannot change under such a local transformation. Thus a time coordinate exists behind $(t,\phi)$ if and only if

$$
\det
\begin{bmatrix}
g_{tt} & g_{t\phi} \\
g_{\phi t} & g_{\phi\phi}
\end{bmatrix}
=
g_{tt}g_{\phi\phi} - [g_{t\phi}]^2
< 0
\tag{38.13}
$$

Using $[g_{t\phi}]^2 - g_{tt}g_{\phi\phi} = R^2\sin^2\theta$, this determinant is negative outside $r = r_+$, so there is a genuine time coordinate in the ergoregion.

Inside $r = r_+$, we have $[g_{t\phi}]^2 - g_{tt}g_{\phi\phi} < 0$ and $g_{rr} < 0$, so $t$ and $\phi$ are spatial and $r$ becomes the time coordinate. Thus $r = r_+$ is indeed an **event horizon**.

---

## 38.7 Cosmic Censorship

Equation 38.7 has real solutions only if

$$
a \le GM
$$

If $a > GM$, there is **no** event horizon; Kerr spacetime then contains a true geometric singularity where

$$
r^2 + a^2\cos^2\theta = 0
$$

that is not cloaked by a horizon (a **naked singularity**).

> [!definition|38.3] Cosmic Censorship Hypothesis
> Gravitational collapse of any physically reasonable mass distribution never produces a naked singularity; instead, singularities are always hidden behind event horizons.

The hypothesis (proposed by Penrose) remains unproven, but arguments and stability considerations suggest that spacetimes with $a > GM$ are unstable and radiate until $a < GM$, or cannot form in realistic collapse.  
We therefore assume **astrophysical Kerr black holes** satisfy $a < GM$ and have their singularities always enclosed by event horizons.
