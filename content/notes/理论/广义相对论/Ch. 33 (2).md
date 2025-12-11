# Chapter 33: Gravitational Waves from Astrophysical Sources

## 33.0 Introduction

In this chapter we compute the gravitational waves emitted by a dynamical source and relate:

- the **metric perturbation** $H^{\mu\nu}$ far from the source  
- to the **motion of matter** inside the source (encoded in $T^{\mu\nu}$)  
- and finally to the **energy flux and luminosity** carried by the waves.

---

## 33.1 Crude Estimates of Maximum Wave Strength

Near the event horizon of a black hole, the Schwarzschild metric has

$$
g_{tt}=-(1-2GM/r)\approx -(1-1)
$$

so the deviation from flat spacetime is of order unity. A gravitational wave of this strength represents the maximum perturbation one would naturally expect near merging black holes.

Using the dimensionless strain amplitude

$$
h=\big[A_+^2+A_\times^2\big]^{1/2}
$$

a merger of two black holes of a few solar masses yields a final mass with

- $2GM$ of order $10\ \text{km}=10^4\ \text{m}$  
- $h\approx 1$ near $r\approx 2GM$  

Since wave amplitudes fall off as $1/r$,

$$
h\approx 10^{-20}
$$

at a radius $r\approx 10^{24}\ \text{m}\approx 10^8\ \text{ly}$, typical of the scale enclosing many galaxies.

Because most events are weaker than this and relatively rare, a detector like LIGO must reach sensitivities of order $h\approx 10^{-21}$ or better. LIGO currently operates near $h\approx 10^{-22}$.

---

## 33.2 The Small–Weak–Slow Source Approximation

Simple binary star systems are **known and steady** sources of gravitational waves. To compute their radiation analytically, we use a controlled approximation.

> [!definition|33.1] small–weak–slow source approximation  
> We assume that the source of gravitational waves:
> 1. is **small** compared to both a wavelength of the wave and the distance to the observer  
> 2. is **weak**, so that $|h_{\mu\nu}|\ll 1$ even near the source  
> 3. is **slow**, so internal velocities in the source satisfy $v\ll 1$

Under these conditions, the weak-field Einstein equation in Lorentz gauge is

$$
\partial^\alpha\partial_\alpha H^{\mu\nu}
=
\left[-\frac{\partial^2}{\partial t^2}+\nabla^2\right]H^{\mu\nu}
=-16\pi G\,T^{\mu\nu}
\tag{33.1}
$$

We compare this to the time-dependent equation for the electric potential $\phi$:

$$
\left[-\left(\frac{\partial}{\partial t}\right)^2+\nabla^2\right]\phi
=-4\pi k\rho_c
$$

where $\rho_c$ is the charge density.

In electrostatics one finds $\phi(t,\vec R)$ by dividing the source into small cells of volume $dV$ with charge $q_i\equiv\rho_c(\vec r_i)dV$, treating each as a point charge, and summing $kq_i/u_i$ with $u_i\equiv|\vec R-\vec r_i|$.

In the **dynamic** case we must evaluate each cell’s contribution at the **retarded time** $t-u_i$ to account for light-travel delay. By analogy, the solution of $(33.1)$ is

$$
H^{\mu\nu}(t,\vec R)
=
4G\int_{\text{src}}
\frac{T^{\mu\nu}(t-u,\vec r)}{u}\,dV
\quad\text{where }u\equiv|\vec R-\vec r|
\tag{33.2}
$$

---

## 33.3 Far-Zone Field from a Small Source

If the source is small compared to its distance from the observer, then $u\approx R$ for all source points and $t-u\approx t-R$. Equation $(33.2)$ becomes

$$
\begin{aligned}
H^{\mu\nu}(t,\vec R)
&=4G\int_{\text{src}}\frac{T^{\mu\nu}(t-u,\vec r)}{u}\,dV \\[4pt]
&\approx 4G\int_{\text{src}}
\frac{T^{\mu\nu}(t-R,\vec r)}{R}\,dV
\quad
\underbrace{}_{\substack{\text{small source: }u\approx R\\
\text{retarded time: }t-u\approx t-R}} \\[4pt]
&=\frac{4G}{R}
\int_{\text{src}}T^{\mu\nu}(t-R,\vec r)\,dV
\end{aligned}
\tag{33.3}
$$

From now on, all integrals over the source are understood to be evaluated at the retarded time $t-R$.

If the source’s center of mass is at rest in our coordinates, one can show that $H^{t\mu}=4GM/R$ is constant and $H^{ti}=H^{it}=0$. The only “waving’’ components are the purely spatial pieces $H^{jk}$.

---

## 33.4 A Useful Identity and the Moment of Inertia Tensor

Using energy–momentum conservation and the divergence theorem, Schutz shows that

$$
\int_{\text{src}}T^{jk}\,dV
=
\frac12\frac{d^2}{dt^2}
\int_{\text{src}}T^{tt}x^j x^k\,dV
=
\frac12\frac{d^2}{dt^2}
\int_{\text{src}}\rho\,x^j x^k\,dV
\tag{33.4}
$$

> [!definition|33.2] moment of inertia 3-tensor  
> The **moment of inertia tensor** of the source is
> $$
> I^{jk}\equiv\int_{\text{src}}\rho\,x^j x^k\,dV
> $$
> It is symmetric: $I^{jk}=I^{kj}$

Substituting the identity $(33.4)$ into $(33.3)$ yields

$$
\begin{aligned}
H^{jk}(t,\vec R)
&=\frac{4G}{R}\int_{\text{src}}T^{jk}(t-R,\vec r)\,dV \\[4pt]
&=\frac{4G}{R}\cdot\frac12\frac{d^2}{dt^2}
\int_{\text{src}}\rho\,x^j x^k\,dV
\quad
\text{use identity }(33.4) \\[4pt]
&=\frac{2G}{R}\,\ddot I^{jk}(t-R)
\end{aligned}
\tag{33.5}
$$

where a dot denotes a time derivative.

---

## 33.5 The Reduced Quadrupole Moment Tensor

It is often more convenient to work with a **trace-free** version of $I^{jk}$.

> [!definition|33.3] reduced quadrupole moment tensor  
> The **reduced quadrupole moment** of the source is
> $$
> \mathcal{I}^{jk}\equiv
> \int_{\text{src}}\rho\big(x^j x^k-\tfrac13\eta^{jk}r^2\big)\,dV
> \tag{33.6}
> $$
> where $r^2\equiv\eta_{lm}x^l x^m$ and $\eta^{jk}$ is the spatial part of the Minkowski metric

Its trace vanishes:

$$
\eta_{jk}\big(x^j x^k-\tfrac13\eta^{jk}r^2\big)
=
\underbrace{\eta_{jk}x^j x^k}_{r^2}
-\tfrac13\underbrace{\eta_{jk}\eta^{jk}}_{3}r^2
=0
$$

For a compact, static but asymmetric source with center of mass at the origin, the Newtonian potential at large $R$ expands as

$$
\Phi
=
-\frac{GM}{R}
+\frac{3\mathcal{I}^{jk}}{2R^3}\frac{X^j}{R}\frac{X^k}{R}
+\text{higher-order terms}
\tag{33.7}
$$

where $X^j$ are the components of the radius vector $\vec R$ from source to observer. Thus $\mathcal{I}^{jk}$ measures the leading contribution of the source’s asphericity.

For a system of point-like objects with masses $m_i$ and positions $x_i^j$, the density is nonzero only near each object. Then

$$
\mathcal{I}^{jk}
\approx
\sum_{\text{objects }i}
\left(x_i^j x_i^k-\tfrac13\eta^{jk}r_i^2\right)
\int_{\text{src}_i}\rho\,dV
=
\sum_{\text{objects }i}
m_i\left(x_i^j x_i^k-\tfrac13\eta^{jk}r_i^2\right)
\tag{33.8}
$$

---

## 33.6 The Transverse–Traceless Part

Consider a single Fourier component of $H^{\mu\nu}$ for a plane wave moving in the $+z$ direction. After an appropriate gauge transformation, its transverse–traceless (TT) amplitude $A^{\mu\nu}_{TT}$ satisfies

$$
A^{xx}_{TT}=-A^{yy}_{TT}=\tfrac12(A^{xx}-A^{yy}),\qquad
A^{xy}_{TT}=A^{yx}_{TT}=A^{xy},\qquad
\text{all other }A^{\mu\nu}_{TT}=0
\tag{33.9}
$$

Reassembling the Fourier sum and using $(33.5)$, the TT components of $H^{jk}$ for waves moving in the $+z$ direction are

$$
\begin{aligned}
H^{xx}_{TT}
&=\tfrac12(H^{xx}-H^{yy})
=\frac{2G}{R}\,\tfrac12(\ddot I^{xx}-\ddot I^{yy})
\equiv\frac{2G}{R}\,\ddot{\mathcal{I}}^{xx}_{TT}

\\[4pt]
H^{yy}_{TT}
&=\tfrac12(H^{yy}-H^{xx})
=\frac{2G}{R}\,\tfrac12(\ddot I^{yy}-\ddot I^{xx})
\equiv\frac{2G}{R}\,\ddot{\mathcal{I}}^{yy}_{TT}

\\[4pt]
H^{xy}_{TT}
&=H^{xy}
=\frac{2G}{R}\,\ddot I^{xy}
\equiv\frac{2G}{R}\,\ddot{\mathcal{I}}^{xy}_{TT}

\end{aligned}
\tag{33.10}
$$

Here we used that the trace part cancels when forming $\mathcal{I}^{jk}$, so $I^{xx}-I^{yy}=\mathcal{I}^{xx}-\mathcal{I}^{yy}$ and $\mathcal{I}^{jk}=I^{jk}$ for $j\neq k$.

To handle waves propagating in an arbitrary direction specified by a unit vector $\vec n$, we project onto the plane transverse to $\vec n$ and subtract the trace.

> [!definition|33.4] transverse–traceless projector  
> Define
> $$
> P^j{}_m\equiv\delta^j{}_m-n^j n_m
> $$
> Then the TT part of the reduced quadrupole moment is
> $$
> \ddot{\mathcal{I}}^{jk}_{TT}
> \equiv
> \left(P^j{}_m P^k{}_n-\tfrac12 P^{jk}P_{mn}\right)\ddot{\mathcal{I}}^{mn}
> \tag{33.12}
> $$

The TT metric perturbation at radius $R$ is

$$
h^{jk}_{TT}
=
H^{jk}_{TT}
=
\frac{2G}{R}\,\ddot{\mathcal{I}}^{jk}_{TT}
\tag{33.11}
$$

---

## 33.7 Flux of Gravitational Wave Energy

From chapter 32, the effective energy density of a gravitational plane wave is

> [!theorem|33.5] energy density of a plane gravitational wave  
> $$
> T^{tt}_{GW}
> =
> \frac{1}{32\pi G}
> \big\langle\dot h^{jk}_{TT}\,\dot h^{TT}_{jk}\big\rangle
> \tag{33.13}
> $$

Substituting $(33.11)$ into $(33.13)$,

$$
\begin{aligned}
T^{tt}_{GW}
&=
\frac{1}{32\pi G}
\bigg\langle
\left(\frac{2G}{R}\dddot{\mathcal{I}}^{jk}_{TT}\right)
\left(\frac{2G}{R}\dddot{\mathcal{I}}^{TT}_{jk}\right)
\bigg\rangle \\[4pt]
&=
\frac{G}{8\pi R^2}
\big\langle
\dddot{\mathcal{I}}^{jk}_{TT}\dddot{\mathcal{I}}^{TT}_{jk}
\big\rangle
\end{aligned}
$$

For plane waves this is the **energy flux** (energy per unit area per unit time) in the direction of propagation, so

$$
\text{Flux of GW energy}
=
\frac{G}{8\pi R^2}
\big\langle
\dddot{\mathcal{I}}^{jk}_{TT}\dddot{\mathcal{I}}^{TT}_{jk}
\big\rangle
\tag{33.14}
$$

Using the TT-projection formula $(33.12)$, the flux can be rewritten entirely in terms of $\dddot{\mathcal{I}}^{jk}$ and the direction $\vec n$:

$$
\text{Flux}
=
\frac{G}{16\pi R^2}
\Big\langle
2\dddot{\mathcal{I}}_{jk}\dddot{\mathcal{I}}^{jk}
-4n^j n^k\,2\dddot{\mathcal{I}}_{jm}\dddot{\mathcal{I}}^{m}{}_k
+n^i n^j n^k n^m\,\dddot{\mathcal{I}}_{ij}\dddot{\mathcal{I}}_{km}
\Big\rangle
\tag{33.15}
$$

This expresses the flux directly in terms of the reduced quadrupole moment of the source.

---

## 33.8 Integrating the Flux: Total Luminosity

To find the **total power** radiated, we integrate the flux over a sphere of radius $R$ surrounding the source. The area element and unit radial vector are

$$
dA=R^2\sin\theta\,d\theta\,d\phi
$$

$$
\vec n=
[\sin\theta\cos\phi,\ \sin\theta\sin\phi,\ \cos\theta]
$$

The rate of decrease of the source’s energy $E$ is

$$
\begin{aligned}
-\frac{dE}{dt}
&=
\int_{\text{sphere}}\text{Flux}\cdot dA \\[4pt]
&=
\frac{GR^2}{16\pi R^2}
\int_0^\pi\sin\theta\,d\theta
\int_0^{2\pi}
\big\langle
\dddot{\mathcal{I}}^{jk}_{TT}\dddot{\mathcal{I}}^{TT}_{jk}
\big\rangle d\phi \\[4pt]
&=
\frac{G}{16\pi}
\int_0^\pi\sin\theta\,d\theta
\int_0^{2\pi}
\Big\langle
2\dddot{\mathcal{I}}_{jk}\dddot{\mathcal{I}}^{jk}
-4n^j n^k\,\dddot{\mathcal{I}}_{ji}\dddot{\mathcal{I}}^{i}{}_k
+n^i n^j n^k n^m\,\dddot{\mathcal{I}}_{ij}\dddot{\mathcal{I}}_{km}
\Big\rangle d\phi
\end{aligned}
\tag{33.16}
$$

Because $\dddot{\mathcal{I}}^{jk}$ depends only on the source, not on $\vec n$, it can be taken outside the angular integrals:

$$
\begin{aligned}
-\frac{dE}{dt}
&=
\frac{2G}{16\pi}
\big\langle\dddot{\mathcal{I}}_{jk}\dddot{\mathcal{I}}^{jk}\big\rangle
\int_0^\pi\int_0^{2\pi}\sin\theta\,d\theta\,d\phi \\[4pt]
&\quad
-\frac{4G}{16\pi}
\big\langle\dddot{\mathcal{I}}_{ji}\dddot{\mathcal{I}}^{ik}\big\rangle
\int_0^\pi\int_0^{2\pi}n^j n^k\sin\theta\,d\theta\,d\phi \\[4pt]
&\quad
+\frac{G}{16\pi}
\big\langle\dddot{\mathcal{I}}_{ij}\dddot{\mathcal{I}}_{km}\big\rangle
\int_0^\pi\int_0^{2\pi}
n^i n^j n^k n^m\sin\theta\,d\theta\,d\phi
\end{aligned}
\tag{33.17}
$$

The angular integrals are

$$
\int_0^\pi\int_0^{2\pi}\sin\theta\,d\theta\,d\phi=4\pi
\tag{33.18}
$$

$$
\int_0^\pi\int_0^{2\pi}n^j n^k\sin\theta\,d\theta\,d\phi
=\frac{4\pi}{3}\eta^{jk}
\tag{33.19}
$$

$$
\int_0^\pi\int_0^{2\pi}
n^i n^j n^k n^m\sin\theta\,d\theta\,d\phi
=\frac{4\pi}{15}
\big(\eta^{ij}\eta^{km}+\eta^{ik}\eta^{jm}+\eta^{im}\eta^{jk}\big)
\tag{33.20}
$$

Substituting $(33.18)$–$(33.20)$ into $(33.17)$ and simplifying,

$$
\begin{aligned}
-\frac{dE}{dt}
&=
\frac{G}{4}
\Big\langle
2\dddot{\mathcal{I}}_{jk}\dddot{\mathcal{I}}^{jk}
-\tfrac{4}{3}\eta^{jk}\dddot{\mathcal{I}}_{ji}\dddot{\mathcal{I}}^{i}{}_k
+\tfrac{1}{15}
(\eta^{ij}\eta^{km}+\eta^{ik}\eta^{jm}+\eta^{im}\eta^{jk})
\dddot{\mathcal{I}}_{ij}\dddot{\mathcal{I}}_{km}
\Big\rangle \\[6pt]
&=
\frac{G}{4\cdot15}
\Big\langle
30\dddot{\mathcal{I}}_{jk}\dddot{\mathcal{I}}^{jk}
-20\dddot{\mathcal{I}}_{ji}\dddot{\mathcal{I}}^{ij}
+\dddot{\mathcal{I}}^i{}_i\dddot{\mathcal{I}}^k{}_k
+\dddot{\mathcal{I}}^i{}_j\dddot{\mathcal{I}}^j{}_i
\Big\rangle \\[6pt]
&=
\frac{G}{4\cdot15}
\Big\langle
30\dddot{\mathcal{I}}_{jk}\dddot{\mathcal{I}}^{jk}
-20\dddot{\mathcal{I}}_{jk}\dddot{\mathcal{I}}^{jk}
+0
+\dddot{\mathcal{I}}_{jk}\dddot{\mathcal{I}}^{jk}
+\dddot{\mathcal{I}}_{jk}\dddot{\mathcal{I}}^{jk}
\Big\rangle \\[6pt]
&=
\underbrace{\frac{12G}{60}}_{=\;G/5}
\big\langle\dddot{\mathcal{I}}_{jk}\dddot{\mathcal{I}}^{jk}\big\rangle
\end{aligned}
\tag{33.21}
$$

Here we used the symmetry and tracelessness of $\mathcal{I}^{jk}$ and relabeled dummy indices.

> [!theorem|33.6] quadrupole luminosity formula  
> The **gravitational-wave luminosity** $L_{GW}$ (total power emitted in gravitational waves) is
> $$
> L_{GW}
> =-\frac{dE}{dt}
> =\frac{G}{5}
> \big\langle\dddot{\mathcal{I}}_{jk}\dddot{\mathcal{I}}^{jk}\big\rangle
> \tag{33.22}
> $$

This is the key result: the power carried away by gravitational waves is determined by the **third time derivative of the reduced quadrupole moment** of the source.
