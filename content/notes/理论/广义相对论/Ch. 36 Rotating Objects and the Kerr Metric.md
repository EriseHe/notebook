## 1. Overview

We first study the **weak-field** spacetime around a **slowly rotating, spherically symmetric object**.  
This exposes the characteristic off-diagonal features of the metric created by rotation.  

Then we use these weak-field insights to motivate an **exact** vacuum solution of the Einstein equation for a rotating compact object: the **Kerr metric**, relevant for rotating stars and black holes.

---

## 2. Weak-Field Solution for a Rotating Sphere

### 2.1 Stationary rotating sphere and metric perturbations

Consider a slowly rotating, spherically symmetric object whose stress-energy tensor is **time-independent**.  
Such an object is called **stationary**.  

In this case:

- The metric perturbations $h^{\mu\nu}$ are time-independent  
- Retardation effects from light-travel time can be neglected  

From equations 35.6 of the previous chapter, the non-negligible components of the perturbation are

$$
h^{tt}(\vec R)
= h^{xx}(\vec R)
= h^{yy}(\vec R)
= h^{zz}(\vec R)
= 2G\int_{\text{src}}
\frac{\rho_0(r)}{|\vec R-\vec r|}\,dV
\tag{36.1a}
$$
$$
h^{ti}(\vec R)
= h^{it}(\vec R)
= 4G\int_{\text{src}}
\frac{\rho_0(r)\,v^i(\vec r)}{|\vec R-\vec r|}\,dV,
\qquad\text{other }h^{\mu\nu}\approx 0
\tag{36.1b}
$$

Here

- $\vec R$ is the field point where the metric is evaluated  
- $\vec r$ is the source point inside the object  
- $\rho_0$ is the (time-independent) mass density  
- $\vec v$ is the fluid velocity inside the object  

### 2.2 The scalar part $h^{tt}$

The integral (36.1a) is the same as for a **non-rotating** spherical object and is analogous (aside from constants) to the electrostatic potential of a spherical charge distribution.  
Therefore, without further calculation, we know

$$
h^{tt}(\vec R)
= h^{xx}(\vec R)
= h^{yy}(\vec R)
= h^{zz}(\vec R)
= \frac{2GM}{R}
\tag{36.2}
$$

where $M$ is the total mass of the object and $R\equiv|\vec R|$.

### 2.3 Rigid rotation and angular momentum

The integral in (36.1b) is more involved.  
Assume the object rotates **rigidly** with angular velocity vector $\vec\Omega$, so that

$$
\vec v(\vec r) = \vec\Omega\times\vec r
$$

Choose coordinates such that

- the center of mass is at the origin, and  
- $\vec\Omega$ points along the $+z$ axis  

Then the components of the velocity are

$$
v^x = -\Omega y,
\qquad
v^y = \Omega x,
\qquad
v^z = 0
\tag{36.3}
$$

The total spin angular momentum $\vec S$ of the object is

$$
\begin{aligned}
\vec S
&= I\vec\Omega
= \vec\Omega\int_{\text{src}}\rho_0 r_\perp^2\,dV \\[4pt]
&= \vec\Omega\int_{\text{src}}\rho_0(x^2 + y^2)\,dV
\end{aligned}
\tag{36.4}
$$

where $I$ is the moment of inertia and $r_\perp$ is the distance from the rotation axis.

### 2.4 Multipole expansion of the potential kernel

To evaluate the integrals in (36.1b), expand the factor $|\vec R-\vec r|^{-1}$ in powers of $r/R$:

$$
\frac{1}{|\vec R-\vec r|}
=
\frac{1}{R}
+
\frac{\vec R\cdot\vec r}{R^3}
+
\frac{3(\vec R\cdot\vec r)^2 - R^2r^2}{R^5}
+\cdots
\tag{36.5}
$$

At least the first two terms can be justified using the binomial approximation.

Using (36.3) for $v^x$ and inserting the expansion (36.5) into (36.1b), the integral for $h^{tx}$ becomes

$$
\begin{aligned}
h^{tx}(\vec R)
&= 4G\int_{\text{src}}
\frac{\rho_0 v^x}{|\vec R-\vec r|}\,dV \\[4pt]
&= -\frac{4G\Omega}{R}\int_{\text{src}}\rho_0(r)y\,dV
-\frac{4G\Omega}{R^3}\int_{\text{src}}\rho_0(r)[\vec R\cdot\vec r]\,y\,dV
+\cdots
\end{aligned}
\tag{36.6}
$$

- The **first integral** is zero because for every volume element at $(x,y,z)$ there is another at $(x,-y,z)$ with the same density; their contributions cancel in pairs. Equivalently, the first integral is proportional to the $y$-coordinate of the center of mass, which is at the origin.  

- The **second integral** (after some algebra referred to in box 36.2) evaluates to
  $-2GSY/R^3$ where $\vec R = [X,Y,Z]$.

All higher-order terms in the expansion integrate to zero (see box 36.3).  
Repeating the same analysis for $h^{ty}$ gives the analogous result.  
Thus

$$
h^{tx}(\vec R) = h^{xt}(\vec R) = -\frac{2GS}{R^3}Y,
\qquad
h^{ty}(\vec R) = h^{yt}(\vec R) = \frac{2GS}{R^3}X
\tag{36.7}
$$

### 2.5 Metric in Cartesian coordinates

Recall that $g_{\mu\nu} = \eta_{\mu\nu} + h_{\mu\nu}$ and that

$$
h_{tx}
= \eta_{t\alpha}\eta_{x\beta}h^{\alpha\beta}
= \eta_{tt}\eta_{xx}h^{tx}
= -h^{tx}
$$

(similarly $h_{ty} = -h^{ty}$).  
Using (36.2) and (36.7), the spacetime metric outside a slowly rotating object is

$$
\begin{aligned}
ds^2
&= -\left(1 - \frac{2GM}{R}\right)dt^2
+ \left(1 + \frac{2GM}{R}\right)(dX^2 + dY^2 + dZ^2) \\[4pt]
&\quad
- \frac{4GS}{R^3}(X\,dY - Y\,dX)\,dt
\end{aligned}
\tag{36.8}
$$

The last term, linear in the rotation $S$, is the **gravitomagnetic** effect of the spinning mass.

### 2.6 Metric in spherical coordinates

Introduce spherical-like coordinates $(R,\theta,\phi)$:

$$
X = R\sin\theta\cos\phi,
\qquad
Y = R\sin\theta\sin\phi,
\qquad
Z = R\cos\theta
\tag{36.9}
$$

Then (using the coordinate relations discussed in box 36.4) the metric becomes

$$
\begin{aligned}
ds^2
&= -\left(1 - \frac{2GM}{R}\right)dt^2
+ \left(1 + \frac{2GM}{R}\right)
\left(dR^2 + R^2 d\theta^2 + R^2\sin^2\theta\,d\phi^2\right) \\[4pt]
&\quad
- \frac{4GMa}{R}\sin^2\theta\,d\phi\,dt
\end{aligned}
\tag{36.10}
$$

where

$$
a \equiv \frac{S}{M}
$$

is the object’s **angular momentum per unit mass**.

> [!definition|36.1] Weak-field rotating-sphere metric  
> Equation (36.10) is the weak-field metric around a slowly rotating spherical object, accurate to first order in $2GM/R$, plus an off-diagonal $d\phi\,dt$ term determined by the spin $S$.

This metric is suitable for slowly rotating planets and ordinary stars, but we need an **exact** vacuum solution for strongly gravitating rotating bodies such as black holes or neutron stars.

---

## 3. Towards the Kerr Solution

### 3.1 Desired properties of the exact solution

We seek a vacuum spacetime outside a **stationary compact object** that is completely surrounded by empty space and has:

1. Asymptotic flatness: the metric reduces to the flat-space spherical form as $r\to\infty$.  
2. Time independence.  
3. Axial symmetry: there is a preferred axis, and the metric is independent of the azimuthal angle $\phi$ when the symmetry axis is chosen appropriately.

### 3.2 Stationary axisymmetric ansatz

We therefore look for metrics of the form

$$
ds^2
=
g_{tt}dt^2
+
g_{rr}dr^2
+
g_{\theta\theta}d\theta^2
+
g_{\phi\phi}d\phi^2
+
2g_{t\phi}dt\,d\phi
\tag{36.11}
$$

where $g_{tt},g_{rr},g_{\theta\theta},g_{\phi\phi},g_{t\phi}$ depend only on $r$ and $\theta$.

This differs from the Schwarzschild trial metric in two ways:

1. We do **not** assume $g_{\theta\theta} = r^2$ and $g_{\phi\phi} = r^2\sin^2\theta$, because constant-$t$ slices need not be spherically symmetric.  
2. We allow an off-diagonal term $g_{t\phi}$, i.e. $dt\,d\phi$, consistent with what we already saw in the weak-field metric (36.10).

The $dt\,d\phi$ term has a physical interpretation: in an axisymmetric rotating spacetime, whether $d\phi$ between events is “with” or “against” the rotation can depend on the sign of $dt$. If we reverse time in a movie of the rotation, the sense of $d\phi$ reverses as well, making a $dt\,d\phi$ term natural. Other off-diagonal terms (like $dr\,dt$) would not have such a clear meaning, so we focus on the form (36.11).  

If necessary, additional terms could be added later.

---

## 4. The Kerr Metric

### 4.1 Statement of the solution

Solving the Einstein equation with the ansatz (36.11) is technically difficult: the metric is not diagonal, and one must work directly with the Ricci tensor and the full nonlinear equations.  

However, one can show (after considerable effort) that there exists a solution satisfying the desired criteria:

$$
\begin{aligned}
ds^2
&= -
\left(1 - \frac{2GMr}{r^2 + a^2\cos^2\theta}\right)dt^2
+
\left(\frac{r^2 + a^2\cos^2\theta}{r^2 - 2GMr + a^2}\right)dr^2
+
(r^2 + a^2\cos^2\theta)d\theta^2 \\[4pt]
&\quad
+
\left(
r^2 + a^2
+
\frac{2GMra^2\sin^2\theta}{r^2 + a^2\cos^2\theta}
\right)\sin^2\theta\,d\phi^2
-
\left(
\frac{4GMra\sin^2\theta}{r^2 + a^2\cos^2\theta}
\right)dt\,d\phi
\end{aligned}
\tag{36.12}
$$

> [!definition|36.2] Kerr metric  
> Equation (36.12) is the **Kerr geometry** in **Boyer–Lindquist coordinates**.  
> For simplicity, we call this the **Kerr metric**, and the coordinates $(t,r,\theta,\phi)$ the **Kerr coordinate system**.

The parameters $GM$ and $a$ are integration constants with dimensions of length. They can be measured observationally from the motion of particles in the spacetime.

### 4.2 Properties and limits

Some key points:

1. If $a=0$, the solution reduces to the **Schwarzschild** solution.  
2. We therefore interpret $M$ as the object’s mass, just as in the Schwarzschild case.  
3. The parameter $a$ must encode information about the object’s rotation; indeed, in the weak-field limit we already had $a = S/M$.  
4. In the regime $r\gg a$, keeping only first order in $2GMr$, the Kerr metric reduces to the weak-field rotating-sphere metric (36.10) (details in box 36.5). Hence we interpret
   $$
   a = \frac{S}{M}
   $$
   as the angular momentum per unit mass of the source.

---

## 5. The Importance of the Kerr Solution

The Kerr solution is central to astrophysics for several reasons. Why Kerr matters?

1. **Exact rotating vacuum solution**  
   > The Kerr metric is an exact solution of the **empty-space** Einstein equation and therefore describes the spacetime outside any arbitrarily massive, compact rotating object (including black holes), provided the exterior is vacuum.

2. **Uniqueness for axially symmetric objects**  
   > Just as the Schwarzschild geometry gives the unique spacetime outside any **spherically symmetric** non-charged object (for a given coordinate system), the Kerr geometry gives the unique spacetime outside any **axially symmetric**, time-independent compact object whose spacetime is asymptotically flat (again, assuming no electric charge).

3. **Only possible exterior for uncharged rotating black holes**  
   > For gravitational collapse of an **uncharged** mass distribution, any non-spherical complexities in the gravitational field are radiated away as gravitational waves, leaving behind a Kerr geometry. If the angular momentum of the collapsing matter is exactly zero, the limiting geometry is Schwarzschild, which is simply the Kerr solution with $a=0$.

5. **Astrophysical expectation: $a\approx GM$**  
   > Realistic objects that might collapse to black holes almost certainly have non-zero angular momentum. Arguments (for example Bardeen, *Nature* **226**, 1970) indicate that many black holes formed by plausible processes will have $a\approx GM$.

6. **Upper bound $a<GM$ for black-hole formation**  
   > It is strongly believed that a black hole will not form if $a\ge GM$: too much angular momentum causes the collapsing object to spin off mass. Thus astrophysical black holes formed by collapse will almost certainly satisfy $a\approx GM$ but not exceed $GM$.

7. **Galactic centers and quasars**  
   > Observations suggest that massive black holes reside at the centers of essentially all galaxies, and that accretion disks around these black holes power quasars. Understanding such systems requires understanding Kerr geometry.

Therefore, there are strong astrophysical motivations to study the Kerr solution in depth: it is not just a beautiful exact metric, but the **realistic** spacetime around rotating black holes throughout the universe.
