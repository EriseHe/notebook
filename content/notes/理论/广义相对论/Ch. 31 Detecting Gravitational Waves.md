## 31.1 Weak-Field Gravitational Waves and Lorentz Gauge

We work in the weak-field limit, where the metric is written as a small perturbation
on flat spacetime and we use **Lorentz gauge**.  
The trace–reversed metric perturbation is denoted by $H^{\mu\nu}$.

In empty space the linearized Einstein equation becomes a simple wave equation
subject to a gauge condition:

$$
\partial^\alpha\partial_\alpha H^{\mu\nu}=0
\quad\text{with}\quad
\partial_\mu H^{\mu\nu}=0
\tag{31.1}
$$

Even after fixing Lorentz gauge, there remains residual gauge freedom: if
$H^{\mu\nu}$ is a solution of (31.1), then so is

$$
\begin{aligned}
H'^{\mu\nu}
&=H^{\mu\nu}
 -\partial^\mu\xi^\nu
 -\partial^\nu\xi^\mu
 +\eta^{\mu\nu}\partial_\alpha\xi^\alpha
\end{aligned}
$$

provided the gauge vector $\xi^\mu$ itself satisfies the homogeneous wave equation

$$
\partial^\alpha\partial_\alpha \xi^\mu = 0
\tag{31.2}
$$

This residual freedom will be used to reach the **transverse–traceless (TT) gauge**.

---

## 31.2 Plane-Wave Solutions

Because (31.1) is just the usual wave equation, we look for plane-wave solutions of
the form

$$
H^{\mu\nu}(t,x,y,z)
= A^{\mu\nu}\cos(k_\sigma x^\sigma)
= A^{\mu\nu}\cos(\vec k\cdot\vec r-\omega t)
\tag{31.3}
$$

where

- $A^{\mu\nu}$ is a constant matrix (the **amplitude tensor**),  
- $k_\sigma=[-\omega,k_x,k_y,k_z]$ is the wave four–vector.

The symmetry of $H^{\mu\nu}$ (inherited from $h^{\mu\nu}$), Lorentz gauge, and the
Einstein equation together imply

$$
\begin{aligned}
\text{Einstein equation} &\Rightarrow k^\sigma k_\sigma = 0
\\[3pt]
\text{Lorentz gauge} &\Rightarrow k_\mu A^{\mu\nu}=0
\\[3pt]
\text{Symmetry} &\Rightarrow A^{\mu\nu}=A^{\nu\mu}

\end{aligned}
$$

### 31.2.1 Wave Speed

The first condition gives the **dispersion relation**:

$$
\begin{aligned}
0
&=k^\sigma k_\sigma
 =k_\beta k_\gamma \eta^{\beta\gamma}\\[3pt]
&=\underbrace{(-\omega)^2\eta^{tt}}_{=-\omega^2}
  +\underbrace{k^2\eta^{zz}}_{=+k^2}
\end{aligned}
$$

so

$$
\begin{aligned}
0
&=-\omega^2+k^2
\\[3pt]
&\Rightarrow \omega^2=k^2
\Rightarrow \omega = k
\Rightarrow v \equiv \frac{\omega}{k}=1
\end{aligned}
\tag{31.5}
$$

Thus **gravitational waves propagate at the speed of light** $v=1$ (in GR units).

---

## 31.3 Transverse–Traceless (TT) Gauge

We now use the residual gauge freedom (31.2) to further simplify $H^{\mu\nu}$.

Consider a gauge transformation with

$$
\xi^\mu = B^\mu\sin(k_\sigma x^\sigma)
\tag{31.6}
$$

where $B^\mu$ is a constant vector and $k_\sigma$ is the same wave vector as in
(31.3). Then

$$
\partial^\sigma\partial_\sigma \xi^\mu
=
\partial^\sigma\partial_\sigma\bigl(B^\mu\sin(k_\sigma x^\sigma)\bigr)
=
-\,k^\sigma k_\sigma B^\mu\sin(k_\sigma x^\sigma)
=0
\tag{31.7}
$$

since $k^\sigma k_\sigma=0$ from (31.4a).  
So this transformation preserves Lorentz gauge.

> [!definition|31.1] Transverse–traceless (TT) gauge
> By an appropriate choice of the constants $B^\mu$, one can use the gauge
> transformation (31.6) to impose
> $$
> A^\mu{}_\mu = 0
> \quad\text{and}\quad
> A^\mu{}_0 = 0
> \tag{31.8}
> $$
> i.e. the trace of the amplitude tensor vanishes and all time–components are zero.
> A plane-wave solution satisfying (31.1) and (31.8) is said to be in
> **transverse–traceless gauge** and is denoted by $H^{\mu\nu}_{TT}$.

In TT gauge the trace of $h_{\mu\nu}$ vanishes, so the trace–reversed perturbation
coincides with the original one:

$$
h^{TT}_{\mu\nu}
\equiv
\left(H^{TT}\right)_{\mu\nu}
-\tfrac12\eta_{\mu\nu} h^{TT}
=
\left(H^{TT}\right)_{\mu\nu}
\tag{31.9}
$$

This is a very convenient gauge: $h^{TT}_{\mu\nu}$ itself obeys the simple wave
equation and is purely spatial and traceless.

---

## 31.4. Wave Propagating in the $+z$ Direction

To make things concrete, consider a wave moving in the $+z$ direction.  
A suitable wave four–vector is

$$
k_\sigma=[-\omega,0,0,\omega]
\tag{31.10}
$$

where $\omega$ is the angular frequency.

In this case, the Lorentz–gauge condition $k_\mu A^{\mu\nu}=0$ gives

$$
0=k_\mu A^{\mu\nu} = -\omega A^{t\nu} + \omega A^{z\nu}
\quad\Rightarrow\quad
A^{t\nu}=A^{z\nu}
$$

Using this, plus symmetry $A^{\mu\nu}=A^{\nu\mu}$ and the TT conditions
$A^\mu{}_0=0$, $A^\mu{}_\mu=0$, one finds that

$$
\begin{aligned}
&\text{TT gauge and symmetry:} &&A^{t\nu}=A^{z\nu}=0
\\[3pt]
&\text{TT gauge and symmetry:} &&A^{\nu t}=A^{\nu z}=0
\\[3pt]
&\text{TT gauge:} &&A^{xx}+A^{yy}=0
\end{aligned}
\tag{31.11}
$$

Thus only the purely spatial transverse components survive, with

- $A^{xx}\equiv A_+$,  
- $A^{yy}=-A_+$,  
- $A^{xy}=A^{yx}\equiv A_\times$,

and all other components zero. The most general TT plane wave moving in the
$+z$ direction therefore has

$$
A^{\mu\nu}
=
A_+
\begin{bmatrix}
0 & 0 & 0 & 0\\
0 & 1 & 0 & 0\\
0 & 0 & -1 & 0\\
0 & 0 & 0 & 0
\end{bmatrix}
+
A_\times
\begin{bmatrix}
0 & 0 & 0 & 0\\
0 & 0 & 1 & 0\\
0 & 1 & 0 & 0\\
0 & 0 & 0 & 0
\end{bmatrix}
\tag{31.12}
$$

> [!definition|31.2] Gravitational-wave polarizations
> For a wave propagating in the $+z$ direction:
> - $A_+$ corresponds to the **“upright” or “plus” polarization**,
> - $A_\times$ corresponds to the **“diagonal” or “cross” polarization**.
> Any plane wave is a linear combination of these two independent polarizations.

---

## 31.5 Physical Effects of a TT Wave

To interpret the wave physically, it is convenient to work directly with the metric
perturbation $h^{TT}_{\mu\nu}=H^{TT}_{\mu\nu}$.  
In TT gauge the total metric is

$$
g_{\mu\nu} = \eta_{\mu\nu} + h^{TT}_{\mu\nu}
$$

For a wave traveling in the $+z$ direction, only the spatial transverse components
$h^{TT}_{ij}$ ($i,j=x,y$) are nonzero.

Consider a test particle initially at rest. To leading order its four–velocity is

$$
u^\alpha = [( -g_{tt})^{1/2},0,0,0] \approx [1,0,0,0]
$$

Using the geodesic equation (linearized in the perturbation) one can show that, in TT
coordinates,

$$
\frac{d^2 x^\alpha}{d\tau^2}
= -\Gamma^\alpha_{\mu\nu}u^\mu u^\nu
\approx 0
\tag{31.13}
$$

This seems to say “the wave has no effect,” but the catch is: **TT coordinates are
comoving with the free particles**. Their coordinate positions stay fixed, while the
physical distances between them change because the spatial metric itself oscillates.

So to see the real effect of the wave, we must compute proper separations using the
metric.

---

## 31.6. Ring of Particles in the Transverse Plane

Imagine a ring of freely–falling particles in the $xy$–plane ($z=0$) with center at the
origin. Before the wave arrives, the ring has radius $R$ and particles are at angles
$\theta$ with Cartesian coordinates

$$
\Delta x = R\cos\theta,
\qquad
\Delta y = R\sin\theta
$$

These **coordinate** displacements remain fixed in TT gauge, but the **physical**
distance $\Delta s$ from each particle to the center oscillates.

The spatial line element in the transverse plane, for small perturbations, is

$$
\begin{aligned}
(\Delta s)^2
&=\bigl[\delta_{ij}+h^{TT}_{ij}(t)\bigr]\Delta x^i\Delta x^j
\\[3pt]
&=
\Delta x^2 + \Delta y^2
+ h^{TT}_{xx}\Delta x^2
+ 2 h^{TT}_{xy}\Delta x\Delta y
+ h^{TT}_{yy}\Delta y^2
\end{aligned}
$$

### 31.6.1 Plus polarization ($A_\times=0$)

For a purely “upright” or “plus” wave ($A_\times=0$)

$$
h^{TT}_{xx}=A_+\cos\omega t,
\qquad
h^{TT}_{yy}=-A_+\cos\omega t,
\qquad
h^{TT}_{xy}=0
$$

Then

$$
\begin{aligned}
(\Delta s)^2
&= R^2
 + A_+\cos\omega t\,
   \bigl(\Delta x^2 - \Delta y^2\bigr)\\[4pt]
&= R^2
 + A_+\cos\omega t\,
   R^2\bigl(\cos^2\theta - \sin^2\theta\bigr)\\[4pt]
&= R^2
\Bigl[1 + A_+\cos\omega t\cos 2\theta\Bigr]
\end{aligned}
$$

For small amplitudes $|A_+|\ll1$, we can expand the square root:

$$
\begin{aligned}
\Delta s
&= R\sqrt{1 + A_+\cos\omega t\cos 2\theta}\\[4pt]
&\approx
R\Bigl[1
+ \underbrace{\tfrac12 A_+\cos\omega t\cos 2\theta}_{\text{first-order in }A_+}\Bigr]
\end{aligned}
\tag{31.14a}
$$

So the ring is periodically stretched along one axis and squeezed along the orthogonal
axis, as shown in the textbook’s “upright (plus) polarization” diagrams.

### 31.6.2 Cross polarization ($A_+=0$)

For a purely “diagonal” or “cross” wave ($A_+=0$)

$$
h^{TT}_{xx}=h^{TT}_{yy}=0,
\qquad
h^{TT}_{xy}=h^{TT}_{yx}=A_\times\cos\omega t
$$

Then

$$
\begin{aligned}
(\Delta s)^2
&= R^2
 + 2A_\times\cos\omega t\,\Delta x\Delta y\\[4pt]
&= R^2
 + 2A_\times\cos\omega t\,
   R^2\cos\theta\sin\theta\\[4pt]
&= R^2\Bigl[1 + A_\times\cos\omega t\sin 2\theta\Bigr]
\end{aligned}
$$

Again expanding to first order,

$$
\Delta s
\approx
R\Bigl[1
+ \tfrac12 A_\times\cos\omega t\sin 2\theta\Bigr]
\tag{31.14b}
$$

The ring is now distorted along lines at $45^\circ$ to the $x$ and $y$ axes (the
“diagonal (cross) polarization” in the figure).

> [!remark|31.3] Polarization as a quadrupolar strain
> Both polarizations correspond to a **quadrupolar** stretching and squeezing of
> space in directions transverse to the wave’s motion.  
> The plus mode acts along the coordinate axes; the cross mode acts along
> directions rotated by $45^\circ$.

---

## 31.7. Typical Astrophysical Amplitudes

Astrophysical sources typically produce very small dimensionless amplitudes
$A_+$ and $A_\times$ at the Earth, often in the range

$$
A_+,A_\times \sim 10^{-22} \text{ to } 10^{-18}
$$

For example, two free particles separated by $R\sim10^6\ \text{m}$ (about
$1000\ \text{km}$) would be driven to oscillate with physical amplitudes of order

$$
\Delta s \sim A_+ R \sim 10^{-14}\ \text{m}
$$

for $A_+\sim10^{-20}$ — about the size of a large atomic nucleus.  
Even though such a wave can carry substantial energy flux, the effect on matter is
extremely tiny, which is why gravitational waves are so hard to detect.

Even a dramatic event like the sun being swallowed by a solar-mass black hole
might produce waves with $A_+,A_\times\sim10^{-8}$ at Earth, still far too small
for you to feel directly.

---

## 31.8. Gravitational-Wave Detectors (Interferometers)

Despite the minute strains, it is possible to detect gravitational waves by measuring
changes in the separation of widely separated test masses with **laser interferometry**.

> [!definition|31.4] Basic interferometric detector idea
> - Use widely separated “floating masses” (mirrors), isolated from environmental
>   noise.  
> - Send laser beams back and forth along long perpendicular arms (forming an
>   L–shaped interferometer).  
> - A passing gravitational wave slightly changes the relative arm lengths,
>   shifting the interference pattern of the recombined light.

The LIGO (Laser Interferometer Gravitational-wave Observatory) facilities in
Washington and Louisiana use $4\ \text{km}$-long arms. The mirrors are suspended
and the entire interferometer is in high vacuum to minimize disturbances. LIGO is
designed to be sensitive to strains as small as $\sim10^{-22}$ over frequencies from
tens to hundreds of Hz.

Future space-based detectors (such as LISA / NGO) plan to use spacecraft
separated by millions of kilometers as proof masses, aiming at lower-frequency
gravitational waves.

---

## 31.9. Conceptual Summary

- In Lorentz gauge, the weak-field Einstein equation reduces to a simple wave
  equation for $H^{\mu\nu}$.
- Plane-wave solutions exist with wave four-vector $k_\sigma$ satisfying
  $k^\sigma k_\sigma=0$, so gravitational waves move at $v=1$.
- Residual gauge freedom allows us to choose the **transverse–traceless gauge**
  where $H^{\mu\nu}$ is purely spatial, transverse to the propagation direction,
  and traceless.
- For a wave moving in the $+z$ direction, only two independent components
  remain, corresponding to the **plus** ($A_+$) and **cross** ($A_\times$)
  polarizations.
- These polarizations describe quadrupolar oscillations of spatial distances in
  the transverse plane. A ring of particles is periodically distorted into
  ellipses whose orientation depends on the polarization.
- Astrophysical strains at Earth are tiny, but precision laser interferometers
  (like LIGO and future space missions) can in principle measure them, opening
  a new observational window on the universe.
