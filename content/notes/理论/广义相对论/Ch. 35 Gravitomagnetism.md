---
title: "Ch. 35 Gravitomagnetism"
---

## 1. Introduction

This chapter studies **gravitomagnetism**: the magnetic–like effects that appear in the weak-field limit of general relativity.  

Key ideas:

- Start from the **weak-field approximation** to Einstein’s equation.
- Show that the field equations closely resemble **Maxwell’s equations**.
- Define **gravitoelectric** and **gravitomagnetic** fields.
- Apply the analogy to gyroscopes, the **Lense–Thirring precession**, and to the **Gravity Probe B** experiment.

---

## 2. Review of the Weak-Field Limit

We assume the spacetime metric is a small perturbation of flat Minkowski spacetime

$$
g_{\mu\nu} = \eta_{\mu\nu} + h_{\mu\nu}, 
\qquad
h_{\mu\nu} = h_{\nu\mu},
\qquad
|h_{\mu\nu}| \ll 1
$$

We impose the coordinate (gauge) condition

$$
0 = \eta^{\rho\mu}\!\left(\partial_\rho h_{\mu\nu} - \tfrac12 \partial_\nu h_{\rho\mu}\right)
\tag{35.1}
$$

This is equivalent to the Lorentz gauge condition from earlier chapters.

Under this gauge, the Einstein equation linearizes to

$$
\partial^\alpha\partial_\alpha h^{\mu\nu}
=
\left(-\frac{\partial^2}{\partial t^2}+\nabla^2\right)h^{\mu\nu}
=
-16\pi G\!\left(T^{\mu\nu}-\tfrac12\eta^{\mu\nu}T\right)
\tag{35.2}
$$

So the metric perturbation $h^{\mu\nu}$ behaves like a field on flat spacetime sourced by
$T^{\mu\nu}-\tfrac12\eta^{\mu\nu}T$.

---

## 3. Solving the Einstein Equation (Retarded Solution)

Equation (35.2) has the same form as the wave equation for the electromagnetic potential.  
By analogy with the retarded potential in electromagnetism, the solution is

$$
h^{\mu\nu}(t,\vec R)
=
4G
\int_{\text{src}}
\frac{
T^{\mu\nu}(t-s,\vec r)
-
\tfrac12\eta^{\mu\nu}T(t-s,\vec r)
}{s}\,dV
\tag{35.3}
$$

where

- $\vec R$ is the field point,
- $\vec r$ is a source point,
- $s \equiv |\vec R - \vec r|$ is the separation,
- the argument $(t-s)$ accounts for the **light-travel time delay**.

---

## 4. Slow-Source Approximation

Now assume the source is a **non-relativistic perfect fluid**:

- Energy density $\rho_0$
- Pressure $p_0$, with $p_0 \ll \rho_0$
- Fluid four-velocity $u^\alpha$ with $u^t \approx 1$ and $u^i \approx v^i \ll 1$

The perfect-fluid stress–energy tensor is

$$
T^{\mu\nu} = (\rho_0 + p_0)u^\mu u^\nu + p_0 g^{\mu\nu}
$$

In the slow-source limit (keeping only lowest order in $u^i$), the components become

$$
\begin{aligned}
T^{tt} &\approx \rho_0 u^t u^t \approx \rho_0 &&\text{(rest energy density)} \\[4pt]
T^{ti} = T^{it} &\approx \rho_0 u^t u^i \approx \rho_0 v^i &&\text{(energy current)} \\[4pt]
T^{ij} &\approx \rho_0 u^i u^j \approx 0 &&\text{(second order in }u^i)
\end{aligned}
\tag{35.4a–c}
$$

The trace is

$$
\begin{aligned}
T 
&\equiv \eta_{\alpha\beta}T^{\alpha\beta} \\[4pt]
&\approx
\underbrace{\eta_{tt}T^{tt}}_{\eta_{tt}=-1}
+ 0 + 0 + 0 \\[4pt]
&= (-1)\rho_0 = -\rho_0
\end{aligned}
$$

Therefore

$$
\begin{aligned}
T^{tt} - \tfrac12\eta^{tt}T
&\approx
\rho_0 - \tfrac12(-1)(-\rho_0)
= \tfrac12\rho_0

\\[4pt]
T^{ti} - \tfrac12\eta^{ti}T
&\approx
\rho_0 u^t u^i + 0
\approx \rho_0 v^i

\\[4pt]
T^{ij} - \tfrac12\eta^{ij}T
&\approx
0
-\tfrac12\eta^{ij}(-\rho_0)
\approx
+\tfrac12\eta^{ij}\rho_0
\end{aligned}
$$

Plugging these into the retarded solution (35.3), we get the dominant metric components

$$
h^{tt}(t,\vec R)
\equiv h^{xx} = h^{yy} = h^{zz}
=
2G
\int_{\text{src}}
\frac{\rho_0(t-s,\vec r)}{s}\,dV
\tag{35.6a}
$$

$$
h^{ti}(t,\vec R) = h^{it}(t,\vec R)
=
4G
\int_{\text{src}}
\frac{J^i(t-s,\vec r)}{s}\,dV
\tag{35.6b}
$$

where the **mass current density** is

$$
\vec J \equiv \rho_0\vec v
$$

All other components of $h^{\mu\nu}$ are negligible in this approximation.

---

## 5. Gravitational Potentials and Fields

### 5.1 Gravitational Scalar and Vector Potentials

We define gravitational potentials in analogy with the electromagnetic scalar and vector potentials:

$$
\Phi_G \equiv -\tfrac12 h^{tt}
= -\int_{\text{src}}\frac{G\rho_0}{s}\,dV
\tag{35.7a}
$$

$$
A_G^i \equiv -\tfrac14 h^{ti}
= -\int_{\text{src}}\frac{GJ^i}{s}\,dV
\tag{35.7b}
$$

> [!definition|35.1] Gravitational scalar and vector potentials
> The **gravitational scalar potential** $\Phi_G$ and **gravitational vector potential** $\vec A_G$ are defined from the weak-field metric components by (35.7a–b).

The coordinate condition (35.1) becomes a relation between the potentials:

$$
\vec\nabla\cdot\vec A_G
= -\frac{\partial\Phi_G}{\partial t}
\tag{35.8}
$$

This is the Lorentz-like gauge condition for the gravitational potentials.

### 5.2 Gravitoelectric and Gravitomagnetic Fields

Define fields in direct analogy with $\vec E$ and $\vec B$:

$$
\vec E_G \equiv -\vec\nabla\Phi_G - \frac{\partial\vec A_G}{\partial t},
\qquad
\vec B_G \equiv \vec\nabla\times\vec A_G
\tag{35.9}
$$

> [!definition|35.2] Gravitoelectric and gravitomagnetic fields
> The **gravitoelectric field** $\vec E_G$ and **gravitomagnetic field** $\vec B_G$ are defined in terms of the gravitational potentials by (35.9).

### 5.3 Gravitational Maxwell Equations

Using the linearized Einstein equation together with the above definitions, one finds that $\vec E_G$ and $\vec B_G$ satisfy Maxwell-like equations:

$$
\vec\nabla\cdot\vec E_G = -4\pi G\rho_0
\tag{35.10a}
$$

$$
\vec\nabla\times\vec B_G - \frac{\partial\vec E_G}{\partial t} = -4\pi G\vec J
\tag{35.10b}
$$

$$
\vec\nabla\cdot\vec B_G = 0
\tag{35.10c}
$$

$$
\vec\nabla\times\vec E_G + \frac{\partial\vec B_G}{\partial t} = 0
\tag{35.10d}
$$

> [!theorem|35.3] Gravitational Maxwell equations
> In the weak-field, slow-source limit, the gravitoelectric and gravitomagnetic fields obey equations (35.10a–d), which are **identical in form** to Maxwell’s equations, except:
> - The Coulomb constant $k$ is replaced by $G$.
> - Mass density $\rho_0$ and mass current $\vec J$ replace charge and charge current.
> - The first two equations carry an extra minus sign, reflecting that gravity is attractive (like charges in electromagnetism repel).

---

## 6. Test-Particle Motion and Gravitational Lorentz Force

Assume the field is **static** so all time derivatives of the field quantities vanish.  
For a particle with non-relativistic velocity $\vec V$, the geodesic equation (from chapter 22) simplifies to

$$
\frac{d^2 x^i}{dt^2}
\approx
\tfrac12\eta^{ij}\partial_j h_{tt}
+
\eta^{ij}(\partial_k h_{tj} - \partial_j h_{tk})V^k
\tag{35.11}
$$

Using the definitions of $\Phi_G$, $\vec A_G$, and the fields $\vec E_G$, $\vec B_G$, we can rewrite this as a **force law**

$$
\vec F_G
\equiv
m\frac{d^2\vec x}{dt^2}
=
m\left(\vec E_G + \vec V\times 4\vec B_G\right)
\tag{35.12}
$$

> [!proposition|35.4] Gravitational Lorentz force
> In the static, weak-field limit, a test mass $m$ moves under a force (35.12) that is analogous to the electromagnetic Lorentz force, with:
> - $m$ replacing the electric charge $q$
> - A factor of $4$ multiplying the $\vec V\times \vec B_G$ term

So gravity behaves **almost** like electromagnetism, but with stronger gravitomagnetic coupling.

---

## 7. Gravitomagnetic Effects on a Gyroscope

In electromagnetism:

- A current loop of area $A$ carrying current $i$ has a magnetic moment $\vec\mu$ of magnitude $\mu = iA$, perpendicular to the loop’s plane.
- In a magnetic field $\vec B$, the loop experiences a torque
  $$
  \vec\tau = \vec\mu\times\vec B
  $$

A spinning object (gyroscope) has an analogous **gravitomagnetic moment**

$$
\vec\mu_G = \tfrac12\vec s
$$

where $\vec s$ is the gyroscope’s total spin angular momentum.

In a gravitomagnetic field $\vec B_G$, the gyroscope feels a torque

$$
\vec\tau
=
\vec\mu_G\times 4\vec B_G
=
\vec s\times 2\vec B_G
\tag{35.13}
$$

This torque causes the spin axis to **precess** about the direction of $\vec B_G$ with angular velocity

$$
\vec\Omega_{LT} = -2\vec B_G
\tag{35.14}
$$

The direction of $\vec\Omega_{LT}$ is chosen so that your right thumb points along $\vec\Omega_{LT}$ when your fingers curl in the direction of the precession.

> [!definition|35.5] Lense–Thirring precession
> The precession of a gyroscope’s spin axis in a gravitomagnetic field, with angular velocity given by (35.14), is called **Lense–Thirring precession**.

---

## 8. Lense–Thirring Precession Near a Spinning Object

From electromagnetic theory, a steadily spinning, spherically symmetric charged object with total magnetic moment $\vec\mu$ creates a dipole magnetic field

$$
\vec B(\vec r)
=
\frac{\mu_0}{4\pi r^3}
\left[3(\vec\mu\cdot\hat r)\hat r - \vec\mu\right]
\tag{35.15}
$$

By analogy, a spinning star or planet with total spin angular momentum $\vec S$ produces a gravitomagnetic field

$$
\vec B_G(\vec r)
=
-\frac{G}{r^3}
\left[3(\vec\mu_G\cdot\hat r)\hat r - \vec\mu_G\right]
=
\frac{G}{2r^3}
\left[3(\vec S\cdot\hat r)\hat r - \vec S\right]
\tag{35.16}
$$

The extra factor of $2$ comes from $\vec\mu_G = \tfrac12\vec S$, and the overall minus sign indicates the reversed sense of the field compared to the electromagnetic case.

---

## 9. Lense–Thirring Precession Around the Earth

Consider a gyroscope in an **equatorial orbit** around the Earth:

- Earth’s spin angular momentum $\vec S$ is perpendicular to the equatorial plane.
- For a point in the equatorial plane, $\vec S\cdot\hat r = 0$.
- On that plane, $\vec B_G = \vec G S / (2r^3)$, parallel to $\vec S$.

If the gyroscope’s spin $\vec s$ lies in the equatorial plane (perpendicular to $\vec S$), the precession is easiest to observe.  
Using (35.14) and (35.16), the precession rate is

$$
\begin{aligned}
\Omega_{LT}
&= 2B_G
= 2\left(\frac{GS}{2r^3}\right)
= \frac{GS}{r^3} \\[4pt]
&=
\frac{GI\omega}{r^3}
\end{aligned}
\tag{35.17}
$$

where

- $I$ is the Earth’s moment of inertia
- $\omega$ is Earth’s spin angular speed ($2\pi/\text{day}$)

### 9.1 Approximating Earth’s Moment of Inertia

For an axially symmetric body,

$$
I = \alpha M R^2
\tag{35.18}
$$

where $M$ is its mass, $R$ its radius, and $0 < \alpha \le 1$ depends on internal mass distribution.

- Uniform sphere: $\alpha = 2/5$
- Earth is denser toward the center, so $\alpha$ is smaller
- Detailed studies give $\alpha \approx 0.33$

Substituting $I = \alpha MR^2$ into (35.17) yields

$$
\Omega_{LT}
=
\frac{G(\alpha MR^2)\omega}{r^3}
=
0.33\,\frac{GM}{R}
\left(\frac{R}{r}\right)^3\omega
\tag{35.19}
$$

For a low-Earth orbit, $r \approx R \approx 6380\ \text{km}$, so

$$
\begin{aligned}
\Omega_{LT}
&\approx
\frac{0.33(4.45\times 10^{-3}\,\eta)}{6{,}380{,}000\,\eta}
\left(\frac{2\pi\ \text{rad}}{\text{day}}\right)
\left(\frac{365.25\ \text{day}}{\text{y}}\right) \\[4pt]
&\approx 5.4\times 10^{-7}\ \text{rad}/\text{y}
\end{aligned}
\tag{35.20}
$$

This corresponds to approximately $0.11$ arcseconds per year — extremely small and difficult to measure.

---

## 10. Geodetic Precession

There is another effect: even if the central body did **not** spin, a gyroscope orbiting in curved spacetime will precess.  

This is **geodetic precession** and is not a gravitomagnetic effect.

For an equatorial orbit with the gyroscope’s spin in the orbital plane, the angle of geodetic precession per orbit is approximately

$$
\Delta\phi_{gd} \approx \frac{3\pi GM}{R}
\quad\text{per orbit}
\tag{35.21}
$$

A near-Earth orbit has period $T \approx 85\ \text{min}$, giving a precession rate

$$
\begin{aligned}
\Omega_{gd}
&\equiv \frac{\Delta\phi_{gd}}{T} \\[4pt]
&\approx
\frac{3\pi(4.45\times 10^{-3}\,\eta)}
{(85\ \text{min})(6{,}380{,}000\,\eta)}
\left(\frac{1\ \text{min}}{60\ \text{s}}\right)
\left(\frac{3.16\times 10^7\ \text{s}}{1\ \text{y}}\right) \\[4pt]
&\approx 4.1\times 10^{-5}\ \text{rad}/\text{y}
\end{aligned}
\tag{35.22}
$$

This is almost **two orders of magnitude larger** than the Lense–Thirring precession for a gyroscope in low-Earth orbit, making geodetic precession easier to measure.

---

## 11. Gravity Probe B

**Gravity Probe B** was a satellite mission launched on 20 April 2004 to measure both:

1. The **geodetic precession** of a gyroscope in Earth orbit  
2. The **Lense–Thirring (frame-dragging) precession**

Mission features:

- Four extremely round quartz-sphere gyroscopes (among the most perfect spheres ever made).
- Each spin axis monitored relative to the direction of a distant guide star.
- Nearly polar orbit at radius $\approx 7000\ \text{km}$ to separate geodetic and gravitomagnetic effects.
- One gyroscope used as a “proof mass” to keep the spacecraft on a geodesic; thrusters fired to keep the craft centered on it.

Early data showed unexpectedly large noise due to stray electrostatic torques from patchy surface charge on the spheres. This increased the uncertainty by factors of $\sim 20$–$30$ over design expectations, but careful modeling and calibration eventually allowed extraction of the desired signals.

Final results (Everitt et al., *Phys. Rev. Lett.* **106**, 221101 (2011)):

- Measured **geodetic precession**:
  $$
  6602 \pm 18\ \text{mas}/\text{y}
  $$
  compared with the GR prediction
  $$
  6606\ \text{mas}/\text{y}
  $$
- Measured **Lense–Thirring precession**:
  $$
  37.2 \pm 7.2\ \text{mas}/\text{y}
  $$
  compared with the GR prediction
  $$
  39.2\ \text{mas}/\text{y}
  $$

The geodetic effect is currently measured to about $0.3\%$ precision — the most precise such measurement.  
The Lense–Thirring effect is measured to about $\pm 19\%$, limited by residual systematics from stray charge.

Gravity Probe B therefore provides **direct experimental confirmation** of both geodetic and gravitomagnetic precession, and a striking test of general relativity in the weak-field, Earth-orbit regime.
