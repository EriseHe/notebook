# 1 Chapter 33: Generating Gravitational Waves

## 1.1 Estimates and Approximations

### 1.1.1 Crude Estimates
To estimate the maximum strength of a gravitational wave, we consider perturbations where components of the metric have an absolute value of order 1 near the source (e.g., the event horizon of a black hole).

> [!remark|33.1] Magnitude of Perturbation
> Near the event horizon, the metric component is:
> $$g_{H} = -(1-2GM/r) \approx -(1-1)$$
> Implying a perturbation of order 1.

For a merger of two black holes (mass $\sim$ solar masses, $2GM \approx 10^4$ m), if the amplitude $h \approx 1$ at the source radius ($r_{src} \approx 10^4$ m), the amplitude at a distance $r_{obs}$ scales as $1/r$. For an observer at $r_{obs} \approx 10^{24}$ m ($\approx 10^8$ ly):

$$
h \approx 1 \cdot \frac{r_{src}}{r_{obs}} \approx \frac{10^4 \text{ m}}{10^{24} \text{ m}} = 10^{-20}
$$

Current detectors (like LIGO) require sensitivity around $h \approx 10^{-21}$ to $10^{-22}$.

### 1.1.2 The Small-Weak-Slow Source Approximation
To calculate radiation accurately for sources other than black hole mergers (e.g., binary stars), we utilize specific approximations.

> [!definition|33.1] Small-Weak-Slow Approximation
> We assume the source satisfies three conditions:
> 1.  **Small:** The source size is small compared to the wavelength $\lambda$ and distance to observer $R$.
> 2.  **Weak:** The metric perturbation is small, $|h_{\mu\nu}| \ll 1$, everywhere.
> 3.  **Slow:** The parts of the source move at non-relativistic speeds, $v \ll 1$.

## 1.2 The Einstein Equation and Solution

### 1.2.1 The Wave Equation
In the Lorentz gauge, the weak-field Einstein equation links the trace-reversed metric perturbation $H^{\mu\nu}$ to the stress-energy tensor $T^{\mu\nu}$.

> [!theorem|33.1] Weak-Field Wave Equation
> $$\partial^{\alpha}\partial_{\alpha}H^{\mu\nu} = \left[-\frac{\partial^{2}}{{\partial t}^{2}}+\nabla^{2}\right]H^{\mu\nu} = -16\pi GT^{\mu\nu}$$

This is analogous to the equation for electric potential in electrodynamics: $[-(\partial/\partial t)^{2}+\nabla^{2}]\phi = -4\pi k\rho_{c}$.

### 1.2.2 The Retarded Solution
Just as the solution for the electric potential involves integrating over the charge distribution at the retarded time, the solution for the gravitational perturbation is:

$$H^{\mu\nu}(t,\vec{R}) = 4G \int_{src} \frac{T^{\mu\nu}(t-u,\vec{r})}{u} dV$$

where $u \equiv |\vec{R}-\vec{r}|$ is the distance from the source cell to the observer.

### 1.2.3 Far-Field Simplification
Under the "Small" approximation:
1.  **Distance:** $R \approx u$ (source is small compared to distance).
2.  **Time:** $t-u \approx t-R$ (source is small compared to wavelength).

The solution simplifies to integration at the common "retarded time" $t_{ret} = t-R$:

$$\boxed{ H^{\mu\nu}(t,\vec{R}) = \frac{4G}{R} \left[ \int_{src} T^{\mu\nu} dV \right]_{\text{at } t-R} }$$

## 1.3 The Quadrupole Moment

### 1.3.1 Mass and Momentum Conservation
For a source with center of mass at rest:
1.  $H^{tt} = 4GM/R = \text{const}$.
2.  $H^{ti} = 0$.
Thus, the "waving" components are restricted to the spatial components $H^{jk}$.

### 1.3.2 The Inertia Tensor Identity
Using the divergence theorem and conservation of energy-momentum, we can relate the integral of the stress-energy tensor to the dynamics of the mass distribution.

> [!lemma|33.1] Stress-Energy Identity
> $$\int_{src} T^{jk} dV = \frac{1}{2} \frac{d^{2}}{dt^{2}} \int_{src} \rho \, x^{j}x^{k} dV$$

Substituting this into the wave solution yields:

$$H^{jk}(t, \vec{R}) = \frac{2G}{R} \ddot{I}^{jk}(t-R)$$

where we define the **Moment of Inertia Tensor**:
$$I^{jk} \equiv \int_{src} \rho x^{j}x^{k} dV$$
*(Note: $\ddot{I}^{jk} \equiv d^2 I^{jk} / dt^2$)*.

### 1.3.3 The Reduced Quadrupole Moment
It is physically significant to use the traceless part of the moment tensor.

> [!definition|33.2] Reduced Quadrupole Moment Tensor ($\mathbb{I}^{jk}$)
> $$\mathbb{I}^{jk} = \int_{src} \rho \left(x^{j}x^{k} - \frac{1}{3}\eta^{jk}r^{2}\right) dV$$

This tensor is traceless ($\eta_{jk}\mathbb{I}^{jk} = 0$). For point-like objects (masses $m_i$ at positions $x_i$), this integral becomes a sum:

$$\mathbb{I}^{jk} \approx \sum_{objects~i} m_{i} \left(x_{i}^{j}x_{i}^{k} - \frac{1}{3}\eta^{jk}r_{i}^{2}\right)$$

## 1.4 Transverse-Traceless (TT) Gauge

Gravitational waves are physically defined by their Transverse-Traceless (TT) components.

### 1.4.1 Waves in the $+z$ Direction
For a wave propagating in the $+z$ direction, the TT components relate to the reduced quadrupole moment as follows:

$$
\begin{aligned}
H_{TT}^{xx} = -H_{TT}^{yy} &= \frac{1}{2}(H^{xx} - H^{yy}) \\
&= \frac{G}{R} (\ddot{I}^{xx} - \ddot{I}^{yy}) \\
&= \boxed{\frac{G}{R} (\ddot{\mathbb{I}}^{xx} - \ddot{\mathbb{I}}^{yy})}
\end{aligned}
$$

$$\boxed{ H_{TT}^{xy} = H^{xy} = \frac{2G}{R} \ddot{\mathbb{I}}^{xy} }$$

### 1.4.2 Waves in Arbitrary Direction $\vec{n}$
For a wave moving in direction $\vec{n}$, we project the tensor onto the plane perpendicular to $\vec{n}$ and remove the trace.

> [!theorem|33.2] General TT Projection
> $$H_{TT}^{jk} = \frac{2G}{R} \ddot{\mathbb{I}}_{TT}^{jk}$$
>
> Where the projected quadrupole tensor is:
> $$\ddot{\mathbb{I}}_{TT}^{jk} \equiv \left( P_{m}^{j} P_{n}^{k} - \frac{1}{2} P^{jk} P_{mn} \right) \ddot{\mathbb{I}}^{mn}$$
> with the projection operator $P_{m}^{j} \equiv \delta_{m}^{j} - n^{j}n_{m}$.

## 1.5 Energy Flux and Luminosity

### 1.5.1 Energy Flux
The energy flux (power per unit area) of a gravitational wave is proportional to the square of the time derivative of the metric perturbation. Since $H \sim \ddot{\mathbb{I}}$, the flux depends on the third time derivative (jerk), denoted by $\dddot{\mathbb{I}}$.

$$\text{Flux} = \frac{G}{8\pi R^{2}} \langle \dddot{\mathbb{I}}_{TT}^{jk} \dddot{\mathbb{I}}_{jk}^{TT} \rangle$$

Expressing this directly in terms of the source tensor $\mathbb{I}$ and direction vector $\vec{n}$:

$$\text{Flux} = \frac{G}{16\pi R^{2}} \left\langle 2\dddot{\mathbb{I}}_{jk}\dddot{\mathbb{I}}^{jk} - 4n^{j}n^{k}\dddot{\mathbb{I}}_{jm}\dddot{\mathbb{I}}^{m}_{k} + n^{i}n^{j}n^{k}n^{m}\dddot{\mathbb{I}}_{ij}\dddot{\mathbb{I}}_{km} \right\rangle$$

### 1.5.2 Total Power Radiated (Luminosity)
To find the total luminosity $L_{GW} = -dE/dt$, we integrate the flux over a sphere surrounding the source.

$$-\frac{dE}{dt} = \int_{sphere} \text{Flux} \cdot dA = \int_{0}^{\pi} \int_{0}^{2\pi} \text{Flux} \, (R^2 \sin\theta \, d\theta \, d\phi)$$

We utilize the following angular integrals for the direction vector $\vec{n}$:

> [!proposition|33.1] Angular Integrals
> 1. $\int n^{j}n^{k} d\Omega = \frac{4\pi}{3}\eta^{jk}$
> 2. $\int n^{i}n^{j}n^{k}n^{m} d\Omega = \frac{4\pi}{15}(\eta^{ij}\eta^{km} + \eta^{ik}\eta^{jm} + \eta^{im}\eta^{jk})$

Substituting the flux equation and these integrals, we derive the final luminosity:

$$
\begin{aligned}
-\frac{dE}{dt} 
&= \frac{G}{16\pi} \oint \left\langle 2\dddot{\mathbb{I}}_{jk}\dddot{\mathbb{I}}^{jk} - 4n^{j}n^{k}\dddot{\mathbb{I}}_{jm}\dddot{\mathbb{I}}^{m}_{k} + n^{i}n^{j}n^{k}n^{m}\dddot{\mathbb{I}}_{ij}\dddot{\mathbb{I}}_{km} \right\rangle d\Omega \\[6pt]
&= \frac{G}{16\pi} \Bigg[ 
   \underbrace{2\langle \dddot{\mathbb{I}}_{jk}\dddot{\mathbb{I}}^{jk} \rangle (4\pi)}_{\text{isotropic term}} 
   - \underbrace{4 \langle \dddot{\mathbb{I}}_{jm}\dddot{\mathbb{I}}^{m}_{k} \rangle \left(\frac{4\pi}{3}\eta^{jk}\right)}_{\text{2-index contraction}} 
   + \underbrace{\langle \dddot{\mathbb{I}}_{ij}\dddot{\mathbb{I}}_{km} \rangle \frac{4\pi}{15}(\eta^{ij}\eta^{km} + \eta^{ik}\eta^{jm} + \eta^{im}\eta^{jk})}_{\text{4-index contraction}} 
   \Bigg] \\[6pt]
&= \frac{G}{4} \left\langle 
   2\dddot{\mathbb{I}}_{jk}\dddot{\mathbb{I}}^{jk} 
   - \frac{4}{3} \dddot{\mathbb{I}}_{jm}\dddot{\mathbb{I}}^{m}_{k} \eta^{jk}
   + \frac{1}{15} \left( \dddot{\mathbb{I}}_{ij}\dddot{\mathbb{I}}_{km}\eta^{ij}\eta^{km} + \dddot{\mathbb{I}}_{ij}\dddot{\mathbb{I}}_{km}\eta^{ik}\eta^{jm} + \dddot{\mathbb{I}}_{ij}\dddot{\mathbb{I}}_{km}\eta^{im}\eta^{jk} \right)
   \right\rangle \\[6pt]
&\overset{\text{traceless } \eta^{jk}\mathbb{I}_{jk}=0}{=} 
\frac{G}{4} \left\langle 
   2\dddot{\mathbb{I}}_{jk}\dddot{\mathbb{I}}^{jk} 
   - 0 
   + \frac{1}{15} \left( 0 + \dddot{\mathbb{I}}_{ij}\dddot{\mathbb{I}}^{ij} + \dddot{\mathbb{I}}_{ij}\dddot{\mathbb{I}}^{ji} \right)
   \right\rangle \\[6pt]
&= \frac{G}{4} \left\langle 2\dddot{\mathbb{I}}_{jk}\dddot{\mathbb{I}}^{jk} + \frac{2}{15}\dddot{\mathbb{I}}_{jk}\dddot{\mathbb{I}}^{jk} \right\rangle \quad (\text{since } \mathbb{I}^{ij} = \mathbb{I}^{ji}) \\[6pt]
&= \frac{G}{4} \left\langle \frac{30}{15}\dddot{\mathbb{I}}_{jk}\dddot{\mathbb{I}}^{jk} + \frac{2}{15}\dddot{\mathbb{I}}_{jk}\dddot{\mathbb{I}}^{jk} \right\rangle \quad \text{(wait, recalculating coefficients from text Eq 33.21)} \\[6pt]
\end{aligned}
$$

*Correction based on text Eq 33.21 explicitly:*
$$
\begin{aligned}
-\frac{dE}{dt} 
&= \frac{G}{4 \cdot 15} \langle 30\dddot{\mathbb{I}}_{jk}\dddot{\mathbb{I}}^{jk} - 20 \dddot{\mathbb{I}}_{ji}\dddot{\mathbb{I}}^{ij} + (\dddot{\mathbb{I}}_{ii}\dddot{\mathbb{I}}_{kk} + \dddot{\mathbb{I}}_{ik}\dddot{\mathbb{I}}^{ki} + \dddot{\mathbb{I}}_{ik}\dddot{\mathbb{I}}^{ik}) \rangle \\[6pt]
&= \frac{G}{60} \langle \underbrace{30\dddot{\mathbb{I}}_{jk}\dddot{\mathbb{I}}^{jk} - 20\dddot{\mathbb{I}}_{jk}\dddot{\mathbb{I}}^{jk}}_{\text{10 terms}} + \underbrace{0}_{\text{traceless}} + \underbrace{\dddot{\mathbb{I}}_{jk}\dddot{\mathbb{I}}^{jk} + \dddot{\mathbb{I}}_{jk}\dddot{\mathbb{I}}^{jk}}_{\text{2 terms}} \rangle \\[6pt]
&= \frac{12G}{60} \langle \dddot{\mathbb{I}}_{jk}\dddot{\mathbb{I}}^{jk} \rangle
\end{aligned}
$$

> [!theorem|33.3] The Quadrupole Luminosity Formula
> The total gravitational wave luminosity is:
> $$\boxed{ L_{GW} = -\frac{dE}{dt} = \frac{G}{5} \langle \dddot{\mathbb{I}}_{jk}\dddot{\mathbb{I}}^{jk} \rangle }$$