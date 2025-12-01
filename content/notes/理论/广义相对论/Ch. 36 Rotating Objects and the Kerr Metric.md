---
title: "Ch. 36 Rotating Objects and the Kerr Metric"
---

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




Alright, let’s do a clean, textbook-style solution to Problem 3, with all the algebra actually shown and notation matching the Schwarzschild chapter.

We use the Schwarzschild metric (your eq. (23.19)):

$$
ds^2
= -\left(1-\frac{2GM}{r}\right)dt^2

* \left(1-\frac{2GM}{r}\right)^{-1}dr^2
* r^2\left(d\theta^2+\sin^2\theta,d\phi^2\right)
  $$

We set $c=1$ as in the notes.

---

## Problem 3(a): Radial ingoing photon, $t$ as a function of $r$

For a *radial* photon:

* $d\theta = 0$
* $d\phi = 0$
* $ds^2 = 0$ (null geodesic)

So the line element reduces to

$$
0
= -\left(1-\frac{2GM}{r}\right)dt^2

* \left(1-\frac{2GM}{r}\right)^{-1}dr^2
  $$

Solve for $dt/dr$:

$$
\begin{aligned}
\left(1-\frac{2GM}{r}\right)dt^2
&= \left(1-\frac{2GM}{r}\right)^{-1}dr^2 [4pt]
dt^2
&= \left(1-\frac{2GM}{r}\right)^{-2}dr^2 [4pt]
\frac{dt}{dr}
&= \pm\left(1-\frac{2GM}{r}\right)^{-1}
\end{aligned}
$$

* For an **outgoing** photon, $r$ increases with $t$ so $dt/dr > 0$ (plus sign).
* For an **ingoing** photon, $r$ decreases as $t$ increases, so $dt/dr < 0$ (minus sign).

Thus for the ingoing photon we take

$$
\frac{dt}{dr}
= -\left(1-\frac{2GM}{r}\right)^{-1}
$$

Now integrate. First rewrite the integrand:

$$
\begin{aligned}
\frac{dt}{dr}
&= -\frac{1}{1-\frac{2GM}{r}}
= -\frac{r}{r-2GM} [4pt]
&= -\left(1 + \frac{2GM}{r-2GM}\right)
\end{aligned}
$$

Then

$$
\begin{aligned}
t(r)
&= -\int\left(1 + \frac{2GM}{r-2GM}\right)dr + C [4pt]
&= -\left[
r + 2GM\ln|r-2GM|
\right] + C
\end{aligned}
$$

So along an ingoing radial null geodesic we can write

$$
\boxed{
t + r + 2GM\ln|r-2GM| = \text{constant}
}
$$

For the exterior region $r>2GM$ we can drop the absolute value.

---

## Problem 3(b): Straight 45° line in $(\bar t, r)$ coordinates

Define the new time coordinate as in the problem:

$$
\boxed{
\bar t \equiv t + 2GM\ln(r-2GM)
}
$$

This is a *coordinate transformation*; $r,\theta,\phi$ are left unchanged.

Now evaluate $\bar t$ along the ingoing photon worldline we just found. From part (a),

$$
t(r) = -r - 2GM\ln(r-2GM) + C
$$

So

$$
\begin{aligned}
\bar t
&= t + 2GM\ln(r-2GM) [4pt]
&= \big[-r - 2GM\ln(r-2GM)+C\big]
+ 2GM\ln(r-2GM) [4pt]
&= -r + C
\end{aligned}
$$

Thus the ingoing photon satisfies

$$
\boxed{
\bar t + r = C
}
$$

In the $(\bar t,r)$-plane, this is a straight line with slope

$$
\frac{d\bar t}{dr}=-1
$$

If we draw $r$ horizontally and $\bar t$ vertically, lines with $|d\bar t/dr|=1$ are at 45° to the axes. So this shows exactly what the problem asked:

> In the $(\bar t,r)$ coordinates, a radially ingoing photon follows a straight line at 45° relative to the $r$-axis.

You can also check directly that these are null in the new metric (see below), but the coordinate-transformation argument is enough.

---

## Problem 3(c): Schwarzschild metric in ingoing Eddington–Finkelstein coordinates

We now rewrite the Schwarzschild metric in terms of $(\bar t,r,\theta,\phi)$.

From the definition

$$
\bar t = t + 2GM\ln(r-2GM)
$$

we get

$$
d\bar t = dt + \frac{2GM}{r-2GM}dr
\quad\Rightarrow\quad
dt = d\bar t - \frac{2GM}{r-2GM}dr
$$

Substitute into

$$
ds^2
= -\left(1-\frac{2GM}{r}\right)dt^2

* \left(1-\frac{2GM}{r}\right)^{-1}dr^2
* r^2\left(d\theta^2+\sin^2\theta,d\phi^2\right)
  $$

Let

$$
F \equiv 1-\frac{2GM}{r}
$$

Then

$$
\begin{aligned}
dt
&= d\bar t - \frac{2GM}{r-2GM}dr [4pt]
dt^2
&= d\bar t^{,2}

* 2\frac{2GM}{r-2GM}d\bar t,dr

- \left(\frac{2GM}{r-2GM}\right)^2dr^2
  \end{aligned}
  $$

Plug in:

$$
\begin{aligned}
ds^2
&= -F\left[d\bar t^{,2}

* 2\frac{2GM}{r-2GM}d\bar t,dr

- \left(\frac{2GM}{r-2GM}\right)^2dr^2\right] [4pt]
  &\quad + F^{-1}dr^2
- r^2\left(d\theta^2+\sin^2\theta,d\phi^2\right) [6pt]
  &= -F,d\bar t^{,2}
- 2F\frac{2GM}{r-2GM}d\bar t,dr
  -F\left(\frac{2GM}{r-2GM}\right)^2dr^2
  +F^{-1}dr^2
  +r^2d\Omega^2
  \end{aligned}
  $$

(where $d\Omega^2 \equiv d\theta^2+\sin^2\theta,d\phi^2$).

Now simplify the coefficients using $F=(r-2GM)/r$.

---

### Cross term coefficient

The $d\bar t,dr$ term has coefficient

$$
2F\frac{2GM}{r-2GM}
= \frac{4GMF}{r-2GM}
= \frac{4GM}{r}
$$

since $F/(r-2GM) = (r-2GM)/r \cdot 1/(r-2GM) = 1/r$.

So the cross term is

$$
\frac{4GM}{r},d\bar t,dr
$$

---

### $dr^2$ coefficient

The $dr^2$ coefficient comes from

$$
-F\left(\frac{2GM}{r-2GM}\right)^2

* F^{-1}
  $$

Compute each:

$$
\begin{aligned}
-F\left(\frac{2GM}{r-2GM}\right)^2
&= -\frac{r-2GM}{r}\cdot\frac{4G^2M^2}{(r-2GM)^2} [4pt]
&= -\frac{4G^2M^2}{r(r-2GM)}
\end{aligned}
$$

and

$$
F^{-1} = \frac{1}{1-\frac{2GM}{r}} = \frac{r}{r-2GM}
$$

Add them:

$$
\begin{aligned}
F^{-1}

* F\left(\frac{2GM}{r-2GM}\right)^2
  &= \frac{r}{r-2GM}

  * \frac{4G^2M^2}{r(r-2GM)} [4pt]
    &= \frac{1}{r-2GM}\left(r - \frac{4G^2M^2}{r}\right) [4pt]
    &= \frac{1}{r-2GM}\cdot\frac{r^2 - 4G^2M^2}{r} [4pt]
    &= \frac{1}{r-2GM}\cdot\frac{(r-2GM)(r+2GM)}{r} [4pt]
    &= \frac{r+2GM}{r}
    = 1 + \frac{2GM}{r}
    \end{aligned}
    $$

So the $dr^2$ coefficient is $(1 + 2GM/r)$.

---

### Final form of the metric

Collecting everything:

$$
\boxed{
\begin{aligned}
ds^2
&= -\left(1-\frac{2GM}{r}\right)d\bar t^{,2}

* \frac{4GM}{r}d\bar t,dr
* \left(1+\frac{2GM}{r}\right)dr^2 \
  &\quad + r^2\left(d\theta^2+\sin^2\theta,d\phi^2\right)
  \end{aligned}
  }
  $$

This is the Schwarzschild metric in the ingoing Eddington–Finkelstein–type coordinates $(\bar t,r,\theta,\phi)$ defined by your problem.

---

### Regularity at $r=2GM$

Check the metric coefficients at $r=2GM$:

* Coefficient of $d\bar t^{,2}$:

  $$
  -\left(1-\frac{2GM}{r}\right) \to 0
  $$

* Coefficient of $d\bar t,dr$:

  $$
  \frac{4GM}{r} \to \frac{4GM}{2GM} = 2
  $$

* Coefficient of $dr^2$:

  $$
  1+\frac{2GM}{r} \to 1+1 = 2
  $$

* Angular part:

  $$
  r^2 d\Omega^2 \to (2GM)^2 d\Omega^2
  $$

All coefficients are **finite** and smooth at $r=2GM$. There is no divergence like the $g_{rr}\sim (1-2GM/r)^{-1}$ we had in the original Schwarzschild coordinates. So the metric is well-behaved at the horizon in these coordinates.

---

### Null geodesics and light cones in $(\bar t,r)$

Still in $(\bar t,r,\theta,\phi)$, consider radial motion ($d\theta=d\phi=0$). The line element is

$$
ds^2
= -\left(1-\frac{2GM}{r}\right)d\bar t^{,2}

* \frac{4GM}{r}d\bar t,dr
* \left(1+\frac{2GM}{r}\right)dr^2
  $$

#### Ingoing null geodesics

Take the ingoing family we already found:

$$
\bar t + r = \text{constant}
\quad\Rightarrow\quad
d\bar t = -dr
$$

Plug that into $ds^2$:

$$
\begin{aligned}
ds^2_{\text{radial}}
&= -\left(1-\frac{2GM}{r}\right)(-dr)^2

* \frac{4GM}{r}(-dr),dr
* \left(1+\frac{2GM}{r}\right)dr^2 [4pt]
  &= -\left(1-\frac{2GM}{r}\right)dr^2
  -\frac{4GM}{r}dr^2
  +\left(1+\frac{2GM}{r}\right)dr^2 [4pt]
  &= \Big[-1 + \frac{2GM}{r} - \frac{4GM}{r} + 1 + \frac{2GM}{r}\Big]dr^2 [4pt]
  &= 0
  \end{aligned}
  $$

So indeed these straight 45° lines $\bar t + r = \text{const}$ are **null** in the new metric.

#### Outgoing null geodesics and light cones

For general radial null directions, set $ds^2=0$ and $d\theta=d\phi=0$:

$$
-\left(1-\frac{2GM}{r}\right)d\bar t^{,2}

* \frac{4GM}{r}d\bar t,dr
* \left(1+\frac{2GM}{r}\right)dr^2 = 0
  $$

Divide by $d\bar t^{,2}$ and define $u \equiv dr/d\bar t$:

$$
-\left(1-\frac{2GM}{r}\right)

* \frac{4GM}{r}u
* \left(1+\frac{2GM}{r}\right)u^2 = 0
  $$

This is a quadratic equation for $u$:

$$
\left(1+\frac{2GM}{r}\right)u^2

* \frac{4GM}{r}u

- \left(1-\frac{2GM}{r}\right)
  = 0
  $$

Its two roots correspond to:

* The ingoing branch $u=-1$ we already know.
* The outgoing branch, with a different slope $u = dr/d\bar t$ that changes with $r$.

If you examine these roots:

* For $r>2GM$, one root has $u<0$ (ingoing), the other has $u>0$ (outgoing): light cones open around the timelike direction and you can still escape outward.
* At $r=2GM$, the outgoing branch has $u=0$ (the outgoing null ray becomes tangent to the horizon: $r=\text{constant}$), while the ingoing branch stays $u=-1$ and crosses inward.
* For $r<2GM$, *both* null directions have $u<0$: even light cannot increase its $r$-coordinate; all future-directed null and timelike trajectories move to smaller $r$.

So in a spacetime diagram with $\bar t$ vertical and $r$ horizontal:

* **Ingoing null lines** are straight 45° lines slanting down (to smaller $r$) with slope $d\bar t/dr=-1$.
* **Outgoing null lines**:

  * outside the horizon tilt outward,
  * become horizontal at $r=2GM$,
  * and tilt inward (toward smaller $r$) inside the horizon.

The associated light cones tilt more and more “inward” as you approach and cross $r=2GM$, and inside the horizon all future-directed light cones point toward decreasing $r$, signaling inevitable collapse toward $r=0$.

That’s exactly why these ingoing Eddington–Finkelstein coordinates are so nice: the metric is regular at the horizon, the ingoing photons are straight 45° lines, and the light-cone structure makes the one-way nature of the horizon visually obvious.



Nice finale: “will cosmic rays eat the Earth via tiny black holes?” Let’s kill that anxiety with math.

I’ll keep the notation consistent with the book: $M$ for black–hole mass, $G,\hbar,c$ as usual.

---

## Step 1 – Convert the cosmic ray energy to a black hole mass

We’re told a cosmic-ray proton has energy
$$
E \sim 3\times 10^{20},\mathrm{eV}
$$

Convert to joules (using $1,\mathrm{eV} \approx 1.6\times10^{-19},\mathrm{J}$):
$$
\begin{aligned}
E
&\approx 3\times10^{20},\mathrm{eV}\times 1.6\times10^{-19},\frac{\mathrm{J}}{\mathrm{eV}} [4pt]
&\approx 4.8\times10^{1},\mathrm{J} \
&\sim 50,\mathrm{J}
\end{aligned}
$$

If *all* this energy is converted into a tiny black hole, its mass is
$$
M = \frac{E}{c^2}
$$
with $c\approx 3\times10^8\ \mathrm{m/s}$, so $c^2\approx 9\times10^{16}\ \mathrm{m^2/s^2}$.

Thus
$$
\begin{aligned}
M
&\approx \frac{50\ \mathrm{J}}{9\times10^{16}\ \mathrm{J/kg}} [4pt]
&\approx 5.6\times10^{-16}\ \mathrm{kg}
\end{aligned}
$$

We can round to
$$
\boxed{M \sim 5\times10^{-16}\ \mathrm{kg}}
$$

This is *absurdly* tiny: much smaller than a grain of dust, smaller than a proton by a factor of $\sim10^{12}$ in mass.

---

## Step 2 – Hawking evaporation time for a black hole of mass $M$

Here I have to be explicit about one thing:
The excerpt of chapter 39 you pasted is about Kerr, Penrose processes, etc., and does **not** include the Hawking–evaporation formula. To proceed, I’ll use the standard Hawking lifetime expression

$$
\boxed{
t_{\text{evap}} = \frac{5120,\pi,G^2 M^3}{\hbar c^4}
}
$$

which is the usual GR/Hawking result (and is what essentially every GR text uses, possibly with the same or very similar numerical prefactor). If your book gives an approximate version like
$$
t_{\text{evap}} \approx K,M^3
$$
with some rounded $K$, you’ll get the same *order of magnitude* answer.

Let’s estimate $t_{\text{evap}}$ for $M\sim 5\times10^{-16}\ \mathrm{kg}$.

Use rough values:

* $G \approx 6.7\times10^{-11}\ \mathrm{m^3,kg^{-1},s^{-2}}$
* $\hbar \approx 1.05\times10^{-34}\ \mathrm{J,s}$
* $c \approx 3\times10^8\ \mathrm{m/s}$

First note that the lifetime scales as
$$
t_{\text{evap}} \propto M^3
$$

The prefactor can be summarized as
$$
t_{\text{evap}} \approx K,M^3,
\qquad
K \equiv \frac{5120,\pi,G^2}{\hbar c^4}
$$

If you plug the constants in, you find numerically
$$
K \sim 8\times10^{-17}\ \mathrm{s/kg^3}
$$

So for our mass
$$
M\sim 5\times10^{-16}\ \mathrm{kg}
$$

we get
$$
\begin{aligned}
t_{\text{evap}}
&\sim K,M^3 [4pt]
&\sim 8\times10^{-17}\ \mathrm{s/kg^3}
\times (5\times10^{-16}\ \mathrm{kg})^3 [4pt]
&= 8\times10^{-17}\ \mathrm{s}
\times 125\times10^{-48} [4pt]
&\sim 10^{-16}\times10^{-46}\ \mathrm{s} [4pt]
&\sim 10^{-62}\ \mathrm{s}
\end{aligned}
$$

More carefully, one finds
$$
\boxed{
t_{\text{evap}} \sim 10^{-62}\ \mathrm{s}
}
$$

That’s not just short; it’s *nonsense-level* short compared to any physical timescale we normally talk about.

For comparison, the Planck time is $\sim 10^{-43}\ \mathrm{s}$, so this is roughly $10^{-19}$ times shorter than even that. The whole semiclassical Hawking formula is being extrapolated into a regime where quantum gravity would dominate, but the key point is: **the lifetime is insanely tiny**, effectively instantaneous on any macroscopic or even microscopic scale.

---

## Step 3 – What does this mean physically?

We can also look at the Schwarzschild radius:
$$
r_s = \frac{2GM}{c^2}
$$

For $M\sim 5\times10^{-16}\ \mathrm{kg}$,

$$
\begin{aligned}
r_s
&\approx \frac{2\times6.7\times10^{-11}\ \mathrm{m^3/kg,s^2}
\times5\times10^{-16}\ \mathrm{kg}}
{9\times10^{16}\ \mathrm{m^2/s^2}} [4pt]
&\sim \frac{6.7\times10^{-26}}{9\times10^{16}}\ \mathrm{m} [4pt]
&\sim 7\times10^{-43}\ \mathrm{m}
\end{aligned}
$$

This is *smaller than the Planck length* ($\sim10^{-35}\ \mathrm{m}$). That’s exactly the regime where the problem statement notes “obviously quantum gravitational effects will become important… but that theory is not yet known.’’

Even if quantum gravity ultimately modifies the details, one thing is crystal clear:

* Such an object would be **extremely** hot (Hawking temperature $\propto 1/M$ is enormous)
* It radiates its mass–energy away about as fast as you can possibly imagine
* The total energy it can release is **only** the original cosmic ray energy (about $50\ \mathrm{J}$), which our atmosphere already deals with in the form of high-energy cascades anyway

---

## Step 4 – Should we worry about “mini black holes destroying us all”?

No.

Putting it together:

* A cosmic-ray proton with $E\sim 3\times10^{20}\ \mathrm{eV}$ has about $50\ \mathrm{J}$ of energy.
* If that entire energy turned into a black hole, its mass would be $\sim 5\times10^{-16}\ \mathrm{kg}$.
* Using the standard Hawking evaporation formula, its lifetime is roughly
  $$
  t_{\text{evap}} \sim 10^{-62}\ \mathrm{s}
  $$
  which is *far shorter* than any meaningful timescale (and even shorter than the Planck time).
* It would radiate away essentially instantly, long before it could interact gravitationally with anything in a “classical” sense.

We are *already* constantly bombarded by such high-energy cosmic rays from all directions in the universe, for billions of years. If processes like “cosmic-ray-made mini black holes” had any realistic chance to accumulate or do damage, we would have noticed a long time ago.

So, in the language of the problem:

* **How long would it live?** About $10^{-62}\ \mathrm{s}$ by the standard Hawking estimate — effectively zero.
* **Should we worry about a rain of such mini black holes destroying us?** Absolutely not. They would evaporate essentially instantly, and their total energy is only what the original cosmic ray already carried, which the atmosphere and Earth have no trouble handling.
