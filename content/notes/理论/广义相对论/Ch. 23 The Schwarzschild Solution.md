
## 23.1 Introduction and Strategy

We now apply the Einstein equation to an important exact case: the spacetime outside a spherically symmetric mass.  
The goal is to derive the **Schwarzschild metric**.

General strategy for solving the Einstein equation:

1. **Choose coordinates** that exploit the symmetries of the source.
2. **Write a trial metric** with as few undetermined functions as possible.
3. **Insert the trial metric** into the Einstein equation to obtain coupled differential equations for those functions.
4. **Solve the differential equations** and fix any integration constants using physical conditions (e.g. Newtonian limit).

---

## 23.2 Consequences of Spherical Symmetry

Consider the spacetime outside a spherically symmetric source (possibly expanding or contracting).  
“Spherical symmetry’’ means we can foliate spacetime by 2-spheres whose intrinsic geometry is the same as that of the ordinary unit 2-sphere.

Let $(\theta,\phi)$ be standard angular coordinates on each sphere, and let $r$ be a radial coordinate defined so that $2\pi r$ is the circumference of a great circle.  
Then the metric on each 2-sphere is
$$
ds^2 = r^2(d\theta^2 + \sin^2\theta\, d\phi^2)
\tag{23.1}
$$

We require that the polar axis directions be aligned for all spheres so that the polar basis vectors remain perpendicular.  
With this choice, the purely spatial part of the spacetime metric becomes
$$
ds^2 = g_{rr}\,dr^2 + r^2(d\theta^2 + \sin^2\theta\, d\phi^2)
\tag{23.2}
$$

If the full spacetime metric had a mixed term $g_{t\phi}\,dt\,d\phi$, the geometry would distinguish between $d\phi>0$ and $d\phi<0$, breaking spherical symmetry.  
By symmetry we can therefore choose coordinates such that $g_{t\phi}=0$.  
A similar argument eliminates $g_{t\theta}$.  
Thus the general metric consistent with spherical symmetry can be written as
$$
ds^2 = g_{tt}\,dt^2 + 2g_{tr}\,dr\,dt + g_{rr}\,dr^2 + r^2(d\theta^2 + \sin^2\theta\, d\phi^2)
\tag{23.3}
$$

---

## 23.3 Choosing a Time Coordinate

The time coordinate $t$ is still arbitrary. We can use our coordinate freedom to simplify the metric further.

Consider a coordinate transformation of the form
$$
t' = t + f(r,t)
\tag{23.4}
$$
for some function $f(r,t)$.  
One can show that with a suitable choice of $f(r,t)$, the off-diagonal component $g'_{tr}$ in the new coordinates can be made zero.  

Since the physics is unchanged by this coordinate choice, we are free to **set $g_{tr}=0$ from the start**, making the metric diagonal.

---

## 23.4 The General Spherically Symmetric Metric

Using $t$ and $r$ as above and setting $g_{tr}=0$, a general spherically symmetric metric takes the form
$$
ds^2 = -A(r,t)\,dt^2 + B(r,t)\,dr^2 + r^2(d\theta^2 + \sin^2\theta\, d\phi^2)
\tag{23.5}
$$
where $A(r,t)$ and $B(r,t)$ are positive functions to be determined by the Einstein equation.

This will be our **trial metric**.

---

## 23.5 Ricci Tensor for the Diagonal Spherical Metric

We now assume empty space outside the source and a negligible cosmological constant, so that the Einstein equation reduces to
$$
R^{\mu\nu} = 0
\qquad\Longrightarrow\qquad
R_{\mu\nu}=0
$$
(since lowering indices multiplies by the non-singular metric).

Using the “Diagonal Metric Worksheet’’ (or direct computation), the non-zero components of the Ricci tensor for the metric (23.5) are

$$
\begin{aligned}
R_{tt}
&=\frac{1}{2B}\Bigg[
+\frac{\partial^2 A}{\partial r^2}
-\underbrace{\frac{1}{2A}\Big(\frac{\partial A}{\partial r}\Big)^2}_{\text{radial }A\text{ self-term}}
-\underbrace{\frac{1}{2B}\frac{\partial A}{\partial r}\frac{\partial B}{\partial r}}_{\text{radial }A\text{–}B\text{ coupling}}
+\frac{2}{r}\frac{\partial A}{\partial r}
-\frac{\partial^2 B}{\partial t^2}
+\frac{1}{2B}\Big(\frac{\partial B}{\partial t}\Big)^2
+\frac{1}{2A}\frac{\partial A}{\partial t}\frac{\partial B}{\partial t}
\Bigg]
\tag{23.6a}
\\[6pt]
R_{rr}
&=\frac{1}{2A}\Bigg[
-\frac{\partial^2 A}{\partial r^2}
+\frac{1}{2A}\Big(\frac{\partial A}{\partial r}\Big)^2
+\frac{1}{2B}\frac{\partial A}{\partial r}\frac{\partial B}{\partial r}
+\frac{2A}{Br}\frac{\partial B}{\partial r}
+\frac{\partial^2 B}{\partial t^2}
-\frac{1}{2B}\Big(\frac{\partial B}{\partial t}\Big)^2
-\frac{1}{2A}\frac{\partial A}{\partial t}\frac{\partial B}{\partial t}
\Bigg]
\tag{23.6b}
\\[6pt]
R_{\theta\theta}
&=-\frac{r}{2AB}\frac{\partial A}{\partial r}
+\frac{r}{2B^2}\frac{\partial B}{\partial r}
+1-\frac{1}{B}
\tag{23.6c}
\\[6pt]
R_{\phi\phi}
&=\sin^2\theta\,R_{\theta\theta}
\tag{23.6d}
\\[6pt]
R_{tr}
&=+\frac{1}{Br}\frac{\partial B}{\partial t}
\tag{23.6e}
\end{aligned}
$$

All other components of $R_{\mu\nu}$ vanish identically.

Note that $R_{tt}$ and $R_{rr}$ contain almost the same bracketed expression, but with many signs reversed and one term different.  
Combining them, we find
$$
\frac{B}{A}R_{tt} + R_{rr}
= \frac{1}{r}\Bigg(
\frac{1}{A}\frac{\partial A}{\partial r}
+\frac{1}{B}\frac{\partial B}{\partial r}
\Bigg)
\tag{23.7}
$$

---

## 23.6 The Empty-Space Spherical Solution

### 23.6.1 Eliminating Time Dependence of $B$

The vacuum Einstein equation requires $R_{\mu\nu}=0$.  
From $R_{tr}=0$ we obtain
$$
R_{tr} = +\frac{1}{Br}\frac{\partial B}{\partial t} = 0
\quad\Longrightarrow\quad
\frac{\partial B}{\partial t} = 0
\tag{23.8}
$$
so $B$ depends only on $r$.

### 23.6.2 Relating $A$ and $B$

In empty space, $R_{tt}=0$ and $R_{rr}=0$. Using equation (23.7) we get
$$
0 = \frac{B}{A}R_{tt} + R_{rr}
= \frac{1}{r}\Bigg(
\frac{1}{A}\frac{\partial A}{\partial r}
+\frac{1}{B}\frac{d B}{d r}
\Bigg)
$$
hence
$$
\frac{1}{A}\frac{\partial A}{\partial r}
= -\frac{1}{B}\frac{dB}{dr}
\tag{23.9}
$$

Now substitute $R_{\theta\theta}=0$ and use $B=B(r)$.  
Equation (23.6c) becomes a differential equation for $B(r)$ alone, whose solution is
$$
\frac{1}{B} = 1 + \frac{C}{r}
\tag{23.10}
$$
where $C$ is a constant of integration.

### 23.6.3 Solving for $A$

Equation (23.9) now constrains $A(r,t)$.  
Because the right-hand side of (23.9) is independent of $t$, any $t$-dependence of $A$ must factor out as a multiplicative function of $t$ only.  
So we can write
$$
A(r,t) = f(t)\,a(r)
$$
for some functions $f(t)$ and $a(r)$.

Using this form in (23.9) gives
$$
\begin{aligned}
-\frac{1}{B}\frac{dB}{dr}
&=\frac{1}{A}\frac{\partial A}{\partial r}
=\frac{1}{f(t)a(r)}\,f(t)\frac{da}{dr}
=\frac{1}{a}\frac{da}{dr}
\end{aligned}
\tag{23.11}
$$

This is a differential equation for $a(r)$ with known $B(r)$.  
Integrating, using $1/B=1+C/r$, yields
$$
a = \frac{K}{B} = K\Big(1 + \frac{C}{r}\Big)
\tag{23.12}
$$
where $K$ is another constant of integration.

Therefore
$$
A(r,t) = f(t)\,a(r)
=Kf(t)\Big(1+\frac{C}{r}\Big)
$$
and the metric (23.5) becomes
$$
ds^2
= -Kf(t)\Big(1+\frac{C}{r}\Big)dt^2
+ \frac{dr^2}{1+C/r}
+ r^2(d\theta^2 + \sin^2\theta\,d\phi^2)
\tag{23.13}
$$

---

## 23.7 Time Reparameterization and Birkhoff’s Theorem

The constants $K$ and the function $f(t)$ have not yet been fixed, but note that $Kf(t)$ must be positive so that the $dt^2$ term has the correct sign.

We can absorb $Kf(t)$ into a redefinition of the time coordinate. Define
$$
dt_{\text{new}} = dt_{\text{old}}\sqrt{Kf(t)}
\tag{23.14}
$$
In terms of the new $t$, the metric becomes
$$
ds^2
= -\Big(1+\frac{C}{r}\Big)dt^2
+ \frac{dr^2}{1+C/r}
+ r^2(d\theta^2 + \sin^2\theta\,d\phi^2)
\tag{23.15}
$$

This form is **time-independent**, even if the source itself (e.g. the star) changes with time, as long as the exterior spacetime remains spherically symmetric.  

> [!remark|23.1] Birkhoff’s theorem  
> The statement that the vacuum spacetime outside any spherically symmetric source must be static and described by a metric of the form (23.15) is known as **Birkhoff’s theorem**.

The time coordinate defined by (23.14) corresponds to time measured by an observer at infinity.

---

## 23.8 Fixing $C$ from the Newtonian Limit — Schwarzschild Solution

To obtain the **Schwarzschild solution**, we must determine the constant $C$ by matching to the Newtonian limit.

Consider an object that is initially at rest in this spacetime (outside the source).  
Its spatial components of four-momentum $u^\alpha$ are zero.  
The normalization condition $-1 = u\cdot u$ implies for the time component
$$
u^t = (-g_{tt})^{-1/2} = A^{-1/2}
$$
with $A = 1 + C/r$ in metric (23.15).

The geodesic equation is
$$
0 = \frac{d^2 x^\alpha}{d\tau^2} + \Gamma^\alpha_{\mu\nu}u^\mu u^\nu
$$
For a particle initially at rest, only $u^t$ is non-zero, so
$$
\begin{aligned}
0
&= \frac{d^2 x^\alpha}{d\tau^2} + \Gamma^\alpha_{tt}(u^t)^2
\\[4pt]
\Rightarrow\quad
\frac{d^2 x^\alpha}{d\tau^2}
&= -\Gamma^\alpha_{tt}(u^t)^2
= +\frac{\Gamma^\alpha_{tt}}{g_{tt}}
= -\frac{1}{A}\Gamma^\alpha_{tt}
\end{aligned}
\tag{23.16}
$$

Using the Christoffel symbols for the metric (23.15), one finds that the only relevant non-zero symbol here is
$$
\Gamma^r_{tt} = +\frac{1}{2B}\frac{\partial A}{\partial r}
\tag{23.17}
$$
with $A = 1 + C/r$ and $B = 1/(1+C/r)$.

Thus the radial component of the geodesic equation becomes
$$
\begin{aligned}
\frac{d^2 r}{d\tau^2}
&= -\frac{1}{A}\Gamma^r_{tt}
= -\frac{1}{2AB}\frac{\partial A}{\partial r}
\\[4pt]
&= -\frac{1}{2}\frac{\partial A}{\partial r}
\quad\underbrace{=\, -\frac{1}{2}\frac{\partial}{\partial r}\Big(1+\frac{C}{r}\Big)}_{\displaystyle \partial_r A = -\frac{C}{r^2}}
\\[4pt]
&= +\frac{C}{2r^2}
\end{aligned}
\tag{23.18}
$$

In the Newtonian limit $r\to\infty$, $r$ becomes the standard radial coordinate and $d\tau$ becomes $dt$.  
The Newtonian radial acceleration of a freely falling particle is
$$
\frac{d^2 r}{dt^2} = -\frac{GM}{r^2}
$$
Comparing with (23.18), we must have
$$
\frac{C}{2r^2} = -\frac{GM}{r^2}
\quad\Longrightarrow\quad
C \equiv -2GM
$$

Substituting this into metric (23.15) yields the **Schwarzschild solution**
$$
ds^2
= -\Big(1-\frac{2GM}{r}\Big)dt^2
+ \Big(1-\frac{2GM}{r}\Big)^{-1}dr^2
+ r^2(d\theta^2 + \sin^2\theta\,d\phi^2)
\tag{23.19}
$$

---

## 23.9 Meaning of the Constant $M$

The constant $M$ is the **mass of the gravitational source** as inferred from the motion of test particles at large $r$ in the Newtonian limit; it is often called the source’s **Newtonian mass**.

For ordinary stars or planets this will closely match the integral of rest mass density over volume, but:

- In strongly relativistic fluids the pressure $p$ contributes to the gravitational field.
- When spacetime is highly curved in the interior, $M$ does **not** simply equal the total rest mass.

However, Birkhoff’s theorem implies that this Newtonian mass $M$ remains constant (as seen by a distant observer) as long as the star remains spherically symmetric, even if it collapses or explodes.  
This can be viewed as a kind of conservation law for the Newtonian mass $M$.

---

## 23.10 Beyond Schwarzschild

The Schwarzschild solution is the basic “laboratory’’ for more complicated spacetimes.  
By modifying the assumptions (adding charge, cosmological constant, different symmetries, interior solutions, etc.), one can derive:

- Reissner–Nordström metric (spherical source with electric charge $Q$)
- Solutions with a vacuum energy term
- Plane-symmetric or cylindrical solutions (e.g. idealized cosmic strings)

These extensions follow the same general strategy used in this chapter: exploit symmetry, choose a trial metric, and solve the Einstein equation for the unknown functions.

