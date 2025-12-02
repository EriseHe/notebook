## 32.1 Introduction

In chapter 31 we saw that a passing gravitational wave distorts a ring of freely
floating particles and makes them oscillate relative to each other.  
In the rest frame of the ring’s center, the particles gain kinetic energy, so the
gravitational wave must carry energy from its source to the particles.

**Goal of this chapter:**  
Work out how to calculate how much energy a gravitational wave of a given
amplitude carries.

---

## 32.2 Gravitational Energy in General Relativity

### 32.2.1 Why it is subtle

In the Einstein equation
$$
G^{\mu\nu}=8\pi G T^{\mu\nu}
$$
the stress–energy tensor $T^{\mu\nu}$ describes the density of matter and
non-gravitational energy, **excluding** gravitational field energy.

Everything involving gravitational field energy is encoded in the Einstein
tensor $G^{\mu\nu}$ itself: the gravitational field acts as a source for
itself via the nonlinear structure of $G^{\mu\nu}$.

We have previously discussed that the equation
$$
\nabla_\mu T^{\mu\nu}=0
$$
represents conservation of (non-gravitational) energy and momentum.  
However, the actual derivation of conservation used **local** Cartesian
coordinates, where
$$
\partial_\mu T^{\mu\nu}=0
$$
and only in flat spacetime can we integrate this (using Gauss’s law) to obtain
global conserved quantities.

In a **general curved spacetime**, we can always choose a locally inertial
frame at a point so that there, sufficiently near the origin,
$$
\partial_\mu T^{\mu\nu}=0
$$
but this statement refers only to non-gravitational energy–momentum. It says
nothing about how gravitational energy fits in.

If gravitational energy is to exchange “energy” with matter, it must do so in
a nonlocal way that probes the curvature over an extended region of spacetime.
This is essentially what we saw with the ring of particles: the effect of the
wave shows up only when we compare different nearby worldlines.

### 32.2.2 No local tensor for gravitational energy density

Suppose we tried to define a true tensor $t^{\mu\nu}$ representing the local
density of gravitational field energy. At any spacetime point we can choose a
locally Cartesian coordinate system in which the Christoffel symbols vanish at
that point and $g_{\mu\nu}=\eta_{\mu\nu}$ there.

In such a system, the equivalence principle tells us that locally gravity has
been “transformed away.” If $t^{\mu\nu}$ were a true tensor representing
gravitational energy density, the natural requirement would be that it vanish
at the origin of this local inertial frame, hence be zero there. But if a
tensor is zero in one frame at a point, it is zero in all frames at that
point, so $t^{\mu\nu}$ would have to vanish everywhere.  

So we **cannot** define a genuine tensor giving the local gravitational energy
density in arbitrary curved spacetime.

### 2.3 Pseudotensors and effective descriptions

One response is to say that in a curved spacetime “energy is simply not
conserved” in the naive global sense and that gravitational energy is not
localizable.

Another response is to build an **effective stress–energy pseudotensor**
$T^{\mu\nu}_{\text{eff}}$ that includes both matter and some “gravitational
part” and satisfies a conservation equation of the form
$$
\partial_\mu T^{\mu\nu}_{\text{eff}} = 0
$$
in some chosen coordinate system. This can then be integrated to give
coordinate–dependent conserved quantities over finite spatial regions.

> [!remark|32.1] Slippery notion of energy in GR  
> Global energy conservation in full general relativity is subtle and
> coordinate–dependent. Any attempt to assign an energy density to the
> gravitational field must be handled with great care.

---

## 32.3. In Almost Flat Spacetime, We Can Pretend

In the **weak–field limit**, spacetime is almost flat and energy and momentum
are almost conserved. In this regime there is a generally accepted trick that
lets us define an **effective energy** carried by gravitational waves.

We work with the metric perturbation $h_{\mu\nu}$ in **Lorentz gauge** and
its trace–reversed partner
$$
H_{\mu\nu} = h_{\mu\nu} - \tfrac12 \eta_{\mu\nu} h
$$

### 32.3.1 First–order field equation

To first order in $h_{\mu\nu}$, the Einstein equation becomes
$$
-2G^{(1)}_{\mu\nu}
= \partial_\alpha\partial^\alpha H_{\mu\nu}
= -16\pi G T_{\mu\nu}
\tag{32.1}
$$
where $G^{(1)}_{\mu\nu}$ is the Einstein tensor evaluated to first order in
$h_{\mu\nu}$. This equation describes how the *matter* stress–energy
$T_{\mu\nu}$ generates the linear gravitational field.

Notice that it says nothing about the gravitational field’s own energy feeding
back on itself; that self–interaction lives in higher orders of
$G_{\mu\nu}$, which we neglected in the linearized theory.

### 32.3.2 Second–order expansion and self–feedback

To capture at least the leading self–interaction terms, we expand the field
equations to **second order** in the metric perturbation:
$$
-2G^{(1)}_{\mu\nu}-2G^{(2)}_{\mu\nu}
= \partial_\alpha\partial^\alpha H_{\mu\nu}-2G^{(2)}_{\mu\nu}
= -16\pi G T_{\mu\nu}
\tag{32.2}
$$

Rearranging and interpreting the second–order piece $G^{(2)}_{\mu\nu}$ as an
effective source, we obtain
$$
\begin{aligned}
\partial_\alpha\partial^\alpha H_{\mu\nu}
&= -16\pi G T_{\mu\nu} + 2G^{(2)}_{\mu\nu} \\[4pt]
&= -16\pi G\bigl(T_{\mu\nu} + T^{GW}_{\mu\nu}\bigr)
\end{aligned}
\tag{32.3}
$$
where we **define**
$$
T^{GW}_{\mu\nu} \equiv -\frac{G^{(2)}_{\mu\nu}}{8\pi G}
\tag{32.4}
$$

> [!definition|32.2] Effective gravitational–wave stress–energy (local, un-averaged)  
> In the weak–field approximation on a flat background, the second–order
> part of the Einstein tensor, $G^{(2)}_{\mu\nu}$, can be re–interpreted as an
> effective stress–energy tensor for the gravitational field via
> $T^{GW}_{\mu\nu} \equiv -G^{(2)}_{\mu\nu}/(8\pi G)$.

In this picture, $T^{GW}_{\mu\nu}$ acts alongside the non-gravitational
$T_{\mu\nu}$ as a source for the field $H_{\mu\nu}$, and so behaves like a
stress–energy tensor for the gravitational waves.

### 32.3.3 Conservation law in Lorentz gauge

We are working in Lorentz gauge, so $\partial_\mu H^{\mu\nu}=0$. Taking
$\partial_\mu$ of both sides of (32.3) and raising indices appropriately, we
find
$$
\partial_\mu\bigl(T^{\mu\nu} + T^{\mu\nu}_{GW}\bigr)=0
\tag{32.5}
$$

This expresses conservation of the sum of matter energy–momentum and
gravitational–wave energy–momentum, in the approximate flat–background
picture.

However, $T^{GW}_{\mu\nu}$ defined in (32.4) still depends on the local phase
of the wave and is not a good tensor–like quantity at a single point. To make
it meaningful, we **average over several wavelengths** of the wave, denoted
by angle brackets $\langle\cdots\rangle$.

Thus we refine the definition to
$$
T^{GW}_{\mu\nu} \equiv -\frac{\langle G^{(2)}_{\mu\nu}\rangle}{8\pi G}
\quad\text{(average taken over several wavelengths)}
\tag{32.6}
$$

This is our final expression for the **effective** stress–energy carried by a
gravitational wave in the weak–field limit.

---

## 32.4. Evaluating the Stress–Energy for a Gravitational Wave

We now apply this to a specific wave. Consider a **plus–polarized**
gravitational wave moving in the $+z$ direction, of the kind studied in
chapter 31.

We define a shorthand function $h_+(t,z)$ for the TT metric components:
$$
h_+(t,z) = A_+\cos(\omega t - \omega z)
= h^{TT}_{xx} = -h^{TT}_{yy}
\tag{32.7a}
$$

Time and space derivatives are written as
$$
\dot h_+ \equiv \partial_t h_+ = -\partial_z h_+ = -A_+\omega\sin(\omega t-\omega z)
\tag{32.7b}
$$
$$
\ddot h_+ \equiv \partial_t\partial_t h_+ = \partial_z\partial_z h_+
= -\partial_z\partial_t h_+
= -\omega^2 A_+\cos(\omega t-\omega z)
= -\omega^2 h_+
\tag{32.7c}
$$

### 32.4.1 Metric form for the plus–polarized wave

For this perturbation the metric is diagonal, so we can use a “Diagonal Metric
Worksheet” to compute the Ricci tensor. The metric functions are labeled
$A,B,C,D$ and their derivatives $B_i,C_i,B_{ij},C_{ij}$:

$$
A=-1,\quad B=1+h_+,\quad C=1-h_+,\quad D=1
\tag{32.8a}
$$
$$
B_1=C_4=\dot h_+,\quad B_4=C_1=-\dot h_+,\quad
B_{11}=-B_{14}=-C_{11}=B_{44}=C_{14}=-C_{44}=\ddot h_+
\tag{32.8b}
$$

Using the worksheet, one finds that to second order in $h_+$ the diagonal
Ricci components are
$$
R_{tt}=R_{zz}=h_+\ddot h_+ + \tfrac12\dot h_+\dot h_+,\qquad
R_{xx}=R_{yy}=0
\tag{32.9}
$$

### 32.4.2 Averaging over several wavelengths

We now average over several wavelengths of the gravitational wave.

Define
$$
\theta = \omega t - \omega z
$$
so that
$$
h_+ = A_+\cos\theta,\quad
\dot h_+ = -A_+\omega\sin\theta,\quad
\ddot h_+ = -\omega^2 h_+ = -\omega^2 A_+\cos\theta
$$

Consider
$$
\begin{aligned}
\big\langle \dot h_+\ddot h_+ + h_+\ddot h_+ \big\rangle
&= \big\langle [-\omega A_+\sin\theta]^2
      + A_+\cos\theta[-\omega^2 A_+\cos\theta] \big\rangle \\[4pt]
&= A_+^2\omega^2\big\langle \sin^2\theta - \cos^2\theta \big\rangle \\[2pt]
&= -A_+^2\omega^2 \langle \cos 2\theta \rangle \\[2pt]
&= 0
\end{aligned}
\tag{32.10}
$$

Because the average of $\cos 2\theta$ over a full cycle is zero, the whole
expression vanishes.

Using this, we rewrite the averaged combination that appears in $R_{tt}$ and
$R_{zz}$:
$$
\begin{aligned}
\big\langle h_+\ddot h_+ + \tfrac12\dot h_+\dot h_+ \big\rangle
&=
\underbrace{\big\langle h_+\ddot h_+ + \dot h_+\dot h_+ \big\rangle}_{=\,0\ \text{by (32.10)}}
-\tfrac12\langle \dot h_+\dot h_+ \rangle \\[4pt]
&= -\tfrac12\langle \dot h_+\dot h_+ \rangle
\end{aligned}
\tag{32.11}
$$

Therefore, the **nonzero** averaged second-order diagonal Ricci components are
$$
\big\langle R^{(2)}_{tt} \big\rangle
= \big\langle R^{(2)}_{zz} \big\rangle
= -\tfrac12\langle \dot h_+\dot h_+ \rangle
\tag{32.12}
$$

You can also show (see box 32.2 in the text) that the averaged second-order
part of the curvature scalar vanishes:
$$
\big\langle R^{(2)} \big\rangle = 0
\tag{32.13}
$$

---

## 32.5. Effective Energy Density of the Wave

Using the averaged effective stress–energy definition (32.6) and the fact that
for this perturbation $G^{(2)}_{tt}=R^{(2)}_{tt}$ (because the averaged
second-order scalar curvature is zero), we obtain
$$
\begin{aligned}
T^{GW}_{tt}
&= -\frac{\langle G^{(2)}_{tt}\rangle}{8\pi G}
= -\frac{\langle R^{(2)}_{tt}\rangle}{8\pi G} \\[4pt]
&= +\frac{\langle \dot h_+\dot h_+ \rangle}{16\pi G}
\end{aligned}
\tag{32.14}
$$

This is the **effective energy density** of a plus–polarized gravitational
wave, averaged over many wavelengths.

> [!definition|32.3] Effective GW energy density (plus polarization)  
> For an upright (“plus”) polarized plane wave traveling in the $+z$ direction,
> the effective energy density in the weak–field limit is  
> $$T^{GW}_{tt} = \frac{1}{16\pi G}\langle \dot h_+\dot h_+ \rangle$$

---

## 32.6. Arbitrary Polarizations and General Formula

The calculation for a purely “cross” (diagonally polarized) wave is more
complicated because the metric is not diagonal in the same simple form; one
must compute Christoffel symbols and curvature components by hand. However,
physically we can obtain a diagonally polarized wave from an upright one by a
$45^\circ$ rotation around the $z$ axis, so the energy density must be the
same functional form when both polarizations are included.

Let us denote the TT transverse components by
$$
h_x \equiv h^{TT}_{xy} = h^{TT}_{yx}
$$
For an **arbitrary** linearly polarized wave, the total effective energy
density becomes
$$
T^{GW}_{tt}
= \frac{1}{16\pi G}\big\langle \dot h_+\dot h_+ + \dot h_x\dot h_x \big\rangle
\tag{32.15}
$$

More compactly, we can write this as a sum over purely spatial indices
$j,k=x,y,z$:
$$
T^{GW}_{tt}
= \frac{1}{32\pi G}\big\langle \dot h^{TT}_{jk}\dot h^{jk}_{TT} \big\rangle
\tag{32.16}
$$

> [!definition|32.4] General effective GW energy density  
> In the weak–field limit, for a plane gravitational wave (in any propagation
> direction) the effective energy density is  
> $$T^{GW}_{tt} = \frac{1}{32\pi G}\big\langle \dot h^{TT}_{jk}\dot h^{jk}_{TT} \big\rangle$$  
> where $h^{TT}_{jk}$ are the spatial components of the metric perturbation in
> transverse–traceless gauge and the average is taken over several
> wavelengths.

---

## 32.7. Gravitational Wave Energy Flux

Finally, the **gravitational wave flux**—energy transported per unit time per
unit area by the wave in the direction of its motion—turns out to be equal to
this same quantity (because waves propagate at speed $1$ in our units):

$$
\text{flux}
= \frac{1}{32\pi G}\big\langle \dot h^{TT}_{jk}\dot h^{jk}_{TT} \big\rangle
= T^{GW}_{tt}
\tag{32.17}
$$

So, once we know the TT metric components for a wave and can compute their
time derivatives, we can directly evaluate both the **energy density** and
**energy flux** carried by the gravitational wave using the same averaged
quadratic combination of $\dot h^{TT}_{jk}$.
