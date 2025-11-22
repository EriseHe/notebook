## 37.1 Conserved Quantities

Geodesic equation
$$
0=\frac{d}{d\tau}\!\left(g_{\mu\nu}\frac{dx^\nu}{d\tau}\right)
-\frac12\partial_\mu g_{\alpha\beta}
\frac{dx^\alpha}{d\tau}\frac{dx^\beta}{d\tau}
\tag{37.1}
$$

Because $g_{\mu\nu}$ is independent of $t$ and $\phi$, there are two conserved quantities $e$ and $\ell$:
$$
\begin{aligned}
\mu=t\Longrightarrow\quad
e &\equiv -g_{tt}\frac{dt}{d\tau} - g_{t\phi}\frac{d\phi}{d\tau}
\\
\mu=\phi\Longrightarrow\quad
\ell &\equiv g_{t\phi}\frac{dt}{d\tau} + g_{\phi\phi}\frac{d\phi}{d\tau}
\end{aligned}
$$
At $r\to\infty$, these conserved quantities becomes:
$$\begin{align}
 & e \approx +\frac{dt}{d\tau}\qquad\;\;\;\;\text{ (relativistic energy per unit mass)} \\
 & \ell  \approx  r^{2}\sin^{2}\theta \frac{d\phi}{d\tau} \;\;\text{ (the z–component of angular momentum per unit mass)}
\end{align}$$
Solving (37.2) for $dt/d\tau$ and $d\phi/d\tau$:
$$
\begin{aligned}
\frac{dt}{d\tau}
&=
\frac{g_{\phi\phi}e + g_{t\phi}\ell}{
\Delta_\phi}
\\
\frac{d\phi}{d\tau}
&=
\frac{-g_{t\phi}e - g_{tt}\ell}{\Delta_\phi}
\end{aligned}
\tag{37.3}
$$

where $\Delta_{\phi}= g_{t\phi}^2 - g_{\phi\phi}g_{tt}$. The key combination simplifies to
$$
g_{t\phi}^2 - g_{tt}g_{\phi\phi}
=
[r^2 + a^2 - 2GMr]\sin^2\theta
\equiv R^2\sin^2\theta
\tag{37.4}
$$

(here $R$ is a new symbol, unrelated to its use in the previous chapter).

## 37.2 Metric Components in the Equatorial Plane

For Kerr Metric in Boyer-Lindguist coordinates, we define:
$$
\boxed{\rho^2 \equiv r^2 + a^2\cos^2\theta,
\qquad
R^2 \equiv r^2 + a^2 - 2GMr}
$$
Everywhere in Kerr spacetime becomes
$$
g_{\mu\nu}
=
\begin{pmatrix}
-\left(1-\dfrac{2GMr}{\rho^2}\right) & 0 & 0 & -\dfrac{2GMra\sin^2\theta}{\rho^2} \\[6pt]
0 & \dfrac{\rho^2}{R^2} & 0 & 0 \\[6pt]
0 & 0 & \rho^2 & 0 \\[6pt]
-\dfrac{2GMra\sin^2\theta}{\rho^2} & 0 & 0 & \left(r^2 + a^2 + \dfrac{2GMra^2\sin^2\theta}{\rho^2}\right)\sin^2\theta
\end{pmatrix}
$$

In the **equatorial plane** ($\theta=\frac{\pi}{2}$) where $\rho^2=r^2$, $\sin^2\theta=1$:

$$
g_{\mu\nu}
=
\begin{pmatrix}
-\left(1-\dfrac{2GM}{r}\right) & 0 & 0 & -\dfrac{2GMa}{r} \\[6pt]
0 & \dfrac{r^{2}}{R^{2}} & 0 & 0 \\[6pt]
0 & 0 & r^{2} & 0 \\[6pt]
-\dfrac{2GMa}{r} & 0 & 0 & r^{2}+a^{2}+\dfrac{2GMa^{2}}{r}
\end{pmatrix}
$$

A particle starting with ${} \theta=\frac{\pi}{2} {}$ and $\frac{d\theta}{d\tau}=0$ remains in this plane, so equatorial orbits are consistent.


## 37.3 Equatorial Equations of Motion

For a massive particle, $u\cdot u=-1$ gives in the equatorial plane

$$
-1
=
g_{tt}\!\left(\frac{dt}{d\tau}\right)^2
+ g_{rr}\!\left(\frac{dr}{d\tau}\right)^2
+ g_{\phi\phi}\!\left(\frac{d\phi}{d\tau}\right)^2
+ 2g_{t\phi}\frac{dt}{d\tau}\frac{d\phi}{d\tau}
\tag{37.6}
$$

Substituting (37.3) with the equatorial $g_{\mu\nu}$ and simplifying leads to an **energy-like equation**

$$
\boxed{
\tilde E \equiv \tfrac12(e^2 - 1)
=
\tfrac12\!\left(\frac{dr}{d\tau}\right)^2
- \frac{GM}{r}
+ \frac{\ell^2 + a^2(1-e^2)}{2r^2}
- \frac{GM(\ell - ea)^2}{r^3}
}
\tag{37.7}
$$

For Schwarzschild ($a=0$) this reduces to

$$
\tilde E
=
\tfrac12\!\left(\frac{dr}{d\tau}\right)^2
- \frac{GM}{r}
+ \frac{\ell^2}{2r^2}
- \frac{GM\ell^2}{r^3}
\tag{37.8}
$$

Taking $d/d\tau$ of (37.7) and dividing by $2\,dr/d\tau$ gives a **force-like equation**

$$
\boxed{
\frac{d^2 r}{d\tau^2}
=
-\frac{GM}{r^2}
+ \frac{\ell^2 + a^2(1-e^2)}{r^3}
- \frac{3GM(\ell - ae)^2}{r^4}
}
\tag{37.9}
$$

From (37.3) we also obtain the azimuthal equation

$$
\boxed{
\frac{d\phi}{d\tau}
=
\frac{-g_{t\phi}e - g_{tt}\ell}{R^2}
=
\frac{(2GMa/r)e + (1-2GM/r)\ell}{r^2 - 2GMr + a^2}
}
\tag{37.10}
$$

Equations (37.9) and (37.10) fully determine equatorial motion for given $M,a,e,\ell$.

---

## 37.4 Zero-Angular-Momentum Trajectories

Set $\ell=0$ in (37.10):

$$
\boxed{
\frac{d\phi}{d\tau}
=
\frac{2GMae}{R^2}
=
\frac{2GMae}{r(r^2 - 2GMr + a^2)}
\quad\text{when }\ell=0
}
\tag{37.11}
$$

Even with zero angular momentum at infinity, $d\phi/d\tau\neq 0$; the particle acquires azimuthal motion **with** the source’s rotation (frame dragging / gravitomagnetism).

---

## 37.5 Kepler’s Third Law in Kerr Spacetime

For equatorial circular orbits ($dr/d\tau=0$) with $\mu=r$ in (37.1) and using $d\phi/d\tau = \Omega\,dt/d\tau$:

$$
0
=
\left(\frac{dt}{d\tau}\right)^2
\left(
\partial_r g_{tt}
+ 2\partial_r g_{t\phi}\Omega
+ \partial_r g_{\phi\phi}\Omega^2
\right)
\tag{37.13}
$$

Solving the quadratic for $\Omega \equiv d\phi/dt$ gives

$$
\boxed{
\Omega
=
\frac{\sqrt{GM}}{r^{3/2} \pm a\sqrt{GM}},
\qquad
T \equiv \left|\frac{2\pi}{\Omega}\right|
=
\sqrt{\frac{4\pi^2 r^3}{GM}} \pm 2\pi a
}
\tag{37.14}
$$

Upper sign: orbit **with** the source’s rotation; lower sign: **against**. For $a\to 0$, this reduces to Kepler’s third law.

---

## 37.6 Circular Orbit (ISCO)

### 37.6.1 Circular orbit

For $\mu = r$, geodesic is:
$$
\begin{aligned}
\phi&=\cancel{ \frac{d}{d \tau}\left(g_{rr} \frac{d r}{d \tau}\right)}-\frac{1}{2}\left[\partial_r g_{t t}\left(\frac{d t}{d \tau}\right)^2+\cancel{\partial_r q_{rr}\left(\frac{d r}{d \tau}\right)^2}+\cancel{\partial_r g_{\theta \theta}\left(\frac{d \theta}{d \tau}\right)^2}+\partial_r g_{\phi\phi}\left(\frac{d \phi}{d \tau}\right)^2+2 \partial_r g_{t \phi} \frac{d t}{d \tau} \frac{d \phi}{d \tau}\right]\\
& =\left(\frac{d t}{d \tau}\right)^2\left(\partial_r g_{r r}+2 \partial_r g_{t\phi} \Omega+\partial_r g_{\phi\phi} \Omega^2\right)
\end{aligned}
$$

### 37.6.2 Innermost Stable Circular Orbit (ISCO)

For Schwarzschild, the ISCO radius was $r=6GM$. In Kerr, imposing the circular-orbit conditions on the effective potential yields

$$
\boxed{
r^2 - 6GMr - 3a^2 \pm 8a\sqrt{GMr} = 0
}
\tag{37.15}
$$

- Upper sign: co-rotating orbit (“with”)  
- Lower sign: counter-rotating orbit (“against”)

Special cases:

- $a=0$ ⇒ $r=6GM$ (Schwarzschild result)  
- Extreme Kerr $a=GM$ ⇒ $r=GM$ for co-rotating, $r=9GM$ for counter-rotating orbits
