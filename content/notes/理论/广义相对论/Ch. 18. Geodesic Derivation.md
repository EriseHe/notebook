---
title: "Ch. 18. Geodesic Derivation"
---
# 18. Geodesic Deviation

## 18.1 Physical Picture of Tidal Effects

Euclid’s axiom for flat space says that **parallel lines never meet**. In spacetime, we learned earlier that the **tidal effects of gravity** cause worldlines that are initially parallel to accelerate relative to each other, so their geodesics do **not** remain parallel.

This failure of initially parallel geodesics to remain parallel is therefore a fundamental indicator that the spacetime around a gravitating object is **curved**.

Our ultimate goal in this chapter is to construct a tensor, the **Riemann tensor**, that quantifies this relative acceleration of initially parallel geodesics:

- In flat space(time), initially parallel geodesics remain parallel, so the Riemann tensor will be **zero everywhere**.
- In curved space(time), they do not remain parallel, so the Riemann tensor is **nonzero**.

Thus the Riemann tensor provides a foolproof way to distinguish flat from curved space(time).

To build this tensor, we first review **geodesic deviation** in Newtonian gravity and then repeat the analysis in general relativity.

---

## 18.2 Newtonian Tidal Effects

### 18.2.1 Qualitative Description

Imagine a frame floating in deep space and four test balls initially at rest in that frame.  
If no forces act, the balls remain at rest relative to the frame and their worldlines are straight, parallel lines in a spacetime diagram.

Now imagine instead a frame that is **freely falling near the earth**:

- The center of the frame accelerates downward toward the earth’s center.
- Balls closer to the earth experience a **slightly larger** gravitational acceleration.
- Balls farther from the earth experience a **slightly smaller** acceleration.
- Balls on the sides experience gravitational acceleration that has a slight **inward horizontal component** toward the earth’s center.

From the point of view of an observer freely falling with this frame, the frame’s center is “at rest,” but the balls acquire small accelerations **relative to the frame**:

- Balls above and below accelerate away from the center.
- Balls on the sides accelerate toward the center.

If we plot the balls’ worldlines in a spacetime diagram, they start out parallel but gradually curve toward or away from each other. This relative motion is the **tidal effect** of the earth’s gravitational field.

The same physics explains the tides (figure 18.2): the earth and its oceans are freely falling in the moon’s gravitational field, so different parts of the oceans experience slightly different accelerations, producing the familiar bulges.

---

### 18.2.2 Gravitational Field and Potential

In Newtonian mechanics, we can describe gravity either by a **gravitational field vector**
$\vec g$ or by a **gravitational potential** $\Phi$:

- $\vec F_g$ is the gravitational force on a test mass $m$.
- Gravitational field: $\vec g \equiv \vec F_g/m$.
- Gravitational potential: $\Phi \equiv V_g/m$, where $V_g$ is the gravitational potential energy.

For a spherical object of mass $M$, at a distance $r$ in empty space,

$$
\vec g = \left(-\frac{GM}{r^2}\right)\hat r
$$

(where $\hat r$ is the radial unit vector) and

$$
\Phi = -\frac{GM}{r}
$$

Just as in electrostatics, field and potential are related by

$$
\vec g = -\vec\nabla \Phi
$$

To make the analogy with GR closer, we express things in terms of $\Phi$.  
According to Newton’s second law, the acceleration of a freely falling particle is

$$
\vec a
= \frac{\vec F_g}{m}
\equiv \vec g
= -\vec\nabla \Phi
$$

In index notation (using Latin indices $i,j$ only for **spatial** components, and letting $\eta^{ij}$ denote the spatial components of the flat-space metric),

$$
\frac{d^2 x^i}{dt^2}
= -\eta^{ij} \frac{\partial \Phi}{\partial x^j}
\equiv -\eta^{ij} [\partial_j \Phi]_{\vec x}
\tag{18.1}
$$

The notation $[\partial_j\Phi]_{\vec x}$ reminds us that this derivative is evaluated at the particle’s position $\vec x$.

---

### 18.2.3 Two Freely Falling Particles and the Separation Vector

Now consider:

- A **reference particle** falling according to equation (18.1).
- A second particle initially a small displacement $\vec n(t)$ away, with position
  $x^i(t) + n^i(t)$.

The vector $\vec n(t)$ is the **separation vector** between the particles at time $t$.

The **relative acceleration** we are interested in (the Newtonian tidal effect) is

$$
\frac{d^2 n^i}{dt^2}
$$

How do we compute this?

By Newton’s second law, the acceleration of the second particle is

$$
\frac{d^2 (x^i + n^i)}{dt^2}
= -\eta^{ij} [\partial_j \Phi]_{\vec x + \vec n}
\tag{18.2}
$$

The derivative is evaluated at the **second** particle’s position $\vec x + \vec n$.

We now expand $[\partial_j\Phi]_{\vec x + \vec n}$ in a Taylor series around the reference particle’s position $\vec x$:

$$
[\partial_j\Phi]_{\vec x + \vec n}
= [\partial_j\Phi]_{\vec x}
+ n^k \left( \frac{\partial}{\partial x^k}[\partial_j\Phi] \right)_{\vec x}
+ \dots
\tag{18.3}
$$

If $\vec n$ is small compared to the scale over which the potential changes, we can neglect the higher-order terms.

Substituting equation (18.3) into (18.2) and subtracting equation (18.1) from both sides, we obtain

$$
\begin{aligned}
\frac{d^2(x^i + n^i)}{dt^2}
-\frac{d^2 x^i}{dt^2}
&\approx
-\eta^{ij}\Big(
[\partial_j\Phi]_{\vec x}
+ n^k[\partial_k\partial_j\Phi]_{\vec x}
\Big)
+ \eta^{ij}[\partial_j\Phi]_{\vec x} \\[4pt]
&=
\underbrace{
-\eta^{ij}[\partial_j\Phi]_{\vec x}
+ \eta^{ij}[\partial_j\Phi]_{\vec x}
}_{\text{cancels by (18.1)}}
-\eta^{ij}[\partial_k\partial_j\Phi]_{\vec x} n^k
\end{aligned}
$$

Since the left-hand side is just $d^2 n^i/dt^2$, we have the **Newtonian tidal deviation equation**

$$
\frac{d^2 n^i}{dt^2}
\approx
-\eta^{ij}[\partial_k\partial_j\Phi]_{\vec x} n^k
= -\eta^{ij} \frac{\partial^2 \Phi}{\partial x^k \partial x^j} n^k
\tag{18.4}
$$

> [!definition|18.1] Newtonian tidal deviation equation  
> For two nearby freely falling particles in Newtonian gravity with separation vector $n^i$, the relative acceleration is  
> $$
> \frac{d^2 n^i}{dt^2}
> = -\eta^{ij} \frac{\partial^2 \Phi}{\partial x^k \partial x^j} n^k
> $$

All derivatives here are evaluated at the reference particle’s position.

---

### 18.2.4 Example: Near a Spherical Mass

Near a spherical object we can choose the $z$ coordinate to be **radially outward**.  
Then equation (18.4) implies (see box 18.1 in the text)

$$
\frac{d^2 n^x}{dt^2} = -\frac{GM}{r^3} n^x,
\qquad
\frac{d^2 n^y}{dt^2} = -\frac{GM}{r^3} n^y,
\qquad
\frac{d^2 n^z}{dt^2} = +\frac{2GM}{r^3} n^z
\tag{18.5}
$$

Particles separated vertically (in the radial direction) accelerate **away** from the reference particle, whereas particles horizontally displaced from it accelerate **toward** it. This matches the picture in figure 18.1c and the familiar behavior of tides.

---

## 18.3 Einsteinian Analysis of Geodesic Deviation

### 18.3.1 Curvature as the Source of Relative Acceleration

In general relativity, freely falling particles follow **geodesics**. There is no gravitational “force” in the Newtonian sense. If freely falling particles accelerate relative to each other, it is because their geodesics **curve relative to each other**.

This relative curvature is a manifestation of the underlying **spacetime curvature**, and it is independent of the coordinate system.

Our goal is to derive a **tensor equation** for the relative acceleration of nearby geodesics, valid in arbitrary coordinates.

---

### 18.3.2 Setup: Two Neighboring Geodesics

Consider two free particles following neighboring geodesics (figure 18.3):

- Reference particle with worldline $x^\alpha(\tau)$.
- Second particle with worldline
  $$
  \bar x^\alpha(\tau) \equiv x^\alpha(\tau) + n^\alpha(\tau)
  $$
  where $\tau$ is the proper time measured by the reference particle.

The four-vector $n^\alpha(\tau)$ is the **infinitesimal separation four-vector** connecting the two particles at each $\tau$.

If the paths are infinitesimally close together and parallel at $\tau=0$, then $\tau$ also closely matches the proper time of the second particle. (The difference between their proper times is of higher order in the separation.)

The condition that these geodesics remain parallel is that the separation four-vector has **zero absolute second derivative**:

$$
\left(\frac{d^2 n}{d\tau^2}\right)^\alpha = 0
$$

Our aim is to compute an expression for $\left(d^2 n/d\tau^2\right)^\alpha$ in terms of spacetime curvature.

---

### 18.3.3 Geodesic Equations for Each Particle

Each particle obeys the geodesic equation.

For the reference particle:

$$
0 = \frac{d^2 x^\alpha}{d\tau^2}
  + \Gamma^\alpha_{\mu\nu} \frac{dx^\mu}{d\tau}\frac{dx^\nu}{d\tau}
$$

For the second particle:

$$
0 = \frac{d^2 \bar x^\alpha}{d\tau^2}
  + \bar\Gamma^\alpha_{\mu\nu}
    \frac{d\bar x^\mu}{d\tau}\frac{d\bar x^\nu}{d\tau}
\tag{18.6}
$$

Here:

- $\Gamma^\alpha_{\mu\nu}$ is evaluated at $x^\alpha(\tau)$,
- $\bar\Gamma^\alpha_{\mu\nu}$ is the same function evaluated at $\bar x^\alpha(\tau)$.

As in the Newtonian analysis, the Christoffel symbols at the second particle’s position can be approximated by a **Taylor expansion** around the first particle’s position:

$$
\bar\Gamma^\alpha_{\mu\nu}\big|_{\bar x(\tau)}
\simeq
\Gamma^\alpha_{\mu\nu}\big|_{x(\tau)}
+ n^\rho \big[\partial_\rho \Gamma^\alpha_{\mu\nu}\big]_{x(\tau)}
\tag{18.7}
$$

Now substitute $\,\bar x^\alpha = x^\alpha + n^\alpha\,$ and equation (18.7) into the second geodesic equation in (18.6), and subtract the first geodesic equation. Dropping all terms that are second order or higher in $n^\alpha$ and its derivatives, you obtain

$$
0
= \frac{d^2 n^\alpha}{d\tau^2}
+ \Big[
   \Gamma^\alpha_{\mu\nu}
 + n^\rho (\partial_\rho\Gamma^\alpha_{\mu\nu})
  \Big]
  \frac{dx^\mu}{d\tau}\frac{dx^\nu}{d\tau}
+ \Gamma^\alpha_{\mu\nu}
  \left(
    \frac{dx^\mu}{d\tau}\frac{dn^\nu}{d\tau}
  + \frac{dn^\mu}{d\tau}\frac{dx^\nu}{d\tau}
  \right)
\tag{18.8}
$$

Introduce the reference particle’s four-velocity

$$
u^\mu \equiv \frac{dx^\mu}{d\tau}
$$

Then equation (18.8) can be written as

$$
0
= \frac{d^2 n^\alpha}{d\tau^2}
+ 2\Gamma^\alpha_{\mu\nu} u^\mu \frac{dn^\nu}{d\tau}
+ n^\rho (\partial_\rho\Gamma^\alpha_{\mu\nu}) u^\mu u^\nu
\tag{18.9}
$$

---

### 18.3.4 Absolute Derivatives of the Separation Vector

The separation vector $n^\alpha$ is itself a four-vector, so its **absolute first derivative** along the reference geodesic is

$$
\left(\frac{dn}{d\tau}\right)^\alpha
= \frac{dn^\alpha}{d\tau}
+ \Gamma^\alpha_{\mu\nu} u^\mu n^\nu
\tag{18.10}
$$

Since this is also a four-vector, its absolute derivative gives the **absolute second derivative** of $n^\alpha$:

$$
\begin{aligned}
\left(\frac{d^2 n}{d\tau^2}\right)^\alpha
&\equiv
\left(\frac{d}{d\tau}\left[\frac{dn}{d\tau}\right]\right)^\alpha \\[4pt]
&=
\frac{d}{d\tau}
\left(
\frac{dn^\alpha}{d\tau}
+ \Gamma^\alpha_{\mu\nu} u^\mu n^\nu
\right)
+ \Gamma^\alpha_{\sigma\rho} u^\sigma
\left(
\frac{dn^\rho}{d\tau}
+ \Gamma^\rho_{\beta\gamma} u^\beta n^\gamma
\right)
\end{aligned}
\tag{18.11}
$$

The Christoffel symbols depend on $\tau$ only through $x^\alpha(\tau)$, so

$$
\frac{d\Gamma^\alpha_{\mu\nu}}{d\tau}
= \frac{dx^\sigma}{d\tau}\,\partial_\sigma\Gamma^\alpha_{\mu\nu}
= u^\sigma\,\partial_\sigma\Gamma^\alpha_{\mu\nu}
\tag{18.12}
$$

Substituting equation (18.12) into (18.11) and collecting terms, we can express the absolute second derivative in the form

$$
\begin{aligned}
\left(\frac{d^2 n}{d\tau^2}\right)^\alpha
&=
\frac{d^2 n^\alpha}{d\tau^2}
+ (\partial_\sigma\Gamma^\alpha_{\mu\nu})u^\sigma u^\mu n^\nu
+ \Gamma^\alpha_{\mu\nu} \frac{du^\mu}{d\tau} n^\nu \\[4pt]
&\quad
+ 2\Gamma^\alpha_{\mu\nu} u^\mu \frac{dn^\nu}{d\tau}
+ \Gamma^\alpha_{\sigma\nu}\Gamma^\sigma_{\beta\mu} u^\beta u^\mu n^\nu
\end{aligned}
\tag{18.13}
$$

Now use equation (18.9) to eliminate $d^2 n^\alpha/d\tau^2$, and use the geodesic equation for the reference particle to eliminate $du^\mu/d\tau$:

$$
\frac{du^\mu}{d\tau}
= -\Gamma^\mu_{\rho\lambda}u^\rho u^\lambda
$$

After these substitutions, the terms proportional to $\frac{dn^\nu}{d\tau}$ cancel, and with some index relabeling one can factor out $u^\sigma u^\mu n^\nu$ from all remaining terms to obtain

$$
\left(\frac{d^2 n}{d\tau^2}\right)^\alpha
=
\big(
 \partial_\sigma\Gamma^\alpha_{\mu\nu}
- \partial_\mu\Gamma^\alpha_{\sigma\nu}
+ \Gamma^\alpha_{\sigma\lambda}\Gamma^\lambda_{\mu\nu}
- \Gamma^\alpha_{\mu\lambda}\Gamma^\lambda_{\sigma\nu}
\big)
u^\sigma u^\mu n^\nu
\tag{18.14}
$$

Everything except the parenthesis is already a tensor, so the quantity in parentheses must also be a tensor.

---

### 18.3.5 The Riemann Tensor and the Equation of Geodesic Deviation

We now **define** the Riemann tensor to be the **negative** of the quantity in parentheses in equation (18.14):

> [!definition|18.2] Riemann tensor (first definition)  
> $$
> R^\alpha_{\ \mu\nu\sigma}
> \equiv
> \partial_\nu\Gamma^\alpha_{\mu\sigma}
> - \partial_\sigma\Gamma^\alpha_{\mu\nu}
> + \Gamma^\alpha_{\nu\lambda}\Gamma^\lambda_{\mu\sigma}
> - \Gamma^\alpha_{\sigma\lambda}\Gamma^\lambda_{\mu\nu}
> $$
> 

With this definition, equation (18.14) becomes simply

$$
\left(\frac{d^2 n}{d\tau^2}\right)^\alpha
= - R^\alpha_{\ \mu\nu\sigma} u^\mu u^\nu n^\sigma
\tag{18.16}
$$

> [!theorem|18.3] Equation of geodesic deviation  
> For two neighboring geodesics with separation four-vector $n^\sigma$ and reference four-velocity $u^\mu$, the absolute relative acceleration is  
> $$
> \left(\frac{d^2 n}{d\tau^2}\right)^\alpha
> = - R^\alpha_{\ \mu\nu\sigma} u^\mu u^\nu n^\sigma
> $$
> The Riemann tensor encodes the curvature of spacetime: if $R^\alpha_{\ \mu\nu\sigma} = 0$ everywhere, initially parallel timelike geodesics remain parallel and spacetime is flat.

Thus:

- If the Riemann tensor vanishes, all initially parallel geodesics remain parallel $\Rightarrow$ spacetime is flat.
- If it does not vanish, nearby geodesics accelerate relative to each other $\Rightarrow$ spacetime is curved.

The Riemann tensor, which involves **second derivatives of the metric**, plays the same role in equation (18.16) that the combination
$\eta^{ij}\partial_k\partial_j\Phi$ plays in the Newtonian tidal deviation equation (18.4).

---

### 18.3.6 A Mnemonic for the Riemann Tensor

It is often helpful to rewrite the definition of the Riemann tensor with indices ordered more systematically:

$$
R^\alpha_{\ \beta\mu\nu}
\equiv
\partial_\mu\Gamma^\alpha_{\beta\nu}
- \partial_\nu\Gamma^\alpha_{\beta\mu}
+ \Gamma^\alpha_{\gamma\mu}\Gamma^\gamma_{\beta\nu}
- \Gamma^\alpha_{\gamma\nu}\Gamma^\gamma_{\beta\mu}
\tag{18.17}
$$

> [!remark|18.4] Mnemonic for $R^\alpha_{\ \beta\mu\nu}$  
> - In the **positive** terms, the lower free indices appear in the order $\mu,\beta,\nu$ (3rd, 2nd, 4th indices of $R^\alpha_{\ \beta\mu\nu}$).  
> - In the **negative** terms, the same pattern appears but with $\mu$ and $\nu$ (3rd and 4th indices) swapped.  
> - In the product terms, the summed (internal) index is the one that appears twice “inside,” i.e., the nearest pair of indices on the two Christoffel symbols.  

A mnemonic: “**3 to 4 is positive; 4 to 3 is not. Twins bond inside.**”  
Here “3 to 4” refers to the ordering of the 3rd and 4th indices ($\mu,\nu$) in the positive versus negative terms, and “twins bond inside’’ refers to the repeated (summed) index in the product terms.

---

These results complete the derivation of the **equation of geodesic deviation** and introduce the **Riemann tensor**, which quantitatively encodes spacetime curvature and determines how freely falling geodesics deviate from one another.
