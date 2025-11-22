# Chapter 39 — Penrose Process and Energy Limits in Kerr Spacetime

## 39.1 Overview

Inside the **ergoregion** of a Kerr black hole, particles can have **negative energy-at-infinity**.  
This allows extraction of energy from the hole, first described by Penrose (1969).  
This chapter:

- rewrites the equatorial geodesic equation in a quadratic form in the conserved energy $e$  
- defines effective potentials $V_\pm(r)$ that allow negative-energy trajectories  
- describes the Penrose process and its limits  
- introduces the **irreducible mass** and entropy of a Kerr black hole.

---

## 39.2 “Conservation of Energy” Revisited

In the equatorial plane, a free particle with nonzero rest mass obeys the “conservation-of-energy-like’’ equation (from 37.7)

$$
\frac12(e^2 - 1)
=
\frac12\!\left(\frac{dr}{d\tau}\right)^2
- \frac{GM}{r}
+ \frac{\ell^2 + a^2(1 - e^2)}{2r^2}
- \frac{GM(\ell - ea)^2}{r^3}
\tag{39.1}
$$

- $e$ is the particle’s conserved **energy per unit mass at infinity**  
- $\ell$ is its **angular momentum per unit mass at infinity**  
- $M$ and $a$ are the black hole’s mass and spin per unit mass.

Because $e$ appears on the right-hand side, we cannot draw a single $r$–only potential curve valid for all $e$.

### 39.2.1 Rewriting as a quadratic in $e$

Multiply (39.1) by $2$ and gather powers of $e$. After algebra (see box 39.1) we obtain

$$
\begin{aligned}
0
&=
1 - \frac{2GM}{r}
+ \frac{\ell^2 + a^2}{r^2}
- \frac{2GM\ell^2}{r^3}
+ \left(\frac{dr}{d\tau}\right)^2 \\[4pt]
&\quad
+ \underbrace{\frac{4GMa}{r^3}}_{\displaystyle B} e
- \underbrace{\left(1 + \frac{a^2}{r^2} + \frac{2GMa^2}{r^3}\right)}_{\displaystyle A} e^2
\end{aligned}
\tag{39.2}
$$

This has the schematic form

$$
0 = -A e^2 + B e + C + \left(\frac{dr}{d\tau}\right)^2
\tag{39.3a}
$$

where

$$
\begin{aligned}
A &\equiv 1 + \frac{a^2}{r^2} + \frac{2GMa^2}{r^3}
 \\[4pt]
B &\equiv \frac{4GMa}{r^3}
 \\[4pt]
C &\equiv 1 - \frac{2GM}{r}
+ \frac{\ell^2 + a^2}{r^2}
- \frac{2GM\ell^2}{r^3}
\end{aligned}
$$

We can now solve for $e$ using the quadratic formula.  
Multiplying (39.3a) by $-1$ and applying the formula gives

$$
\begin{aligned}
e
&=
\frac{-B \pm \sqrt{B^2 + 4A\big[C + (dr/d\tau)^2\big]}}{-2A} \\[4pt]
&=
\frac{\tfrac12 B \mp \sqrt{\tfrac14 B^2 + AC + A(dr/d\tau)^2}}{A}
\end{aligned}
\tag{39.4}
$$

Since $A>0$, the **larger** root (with the $+$ choice in front of the square root in the usual quadratic formula) will always be larger than the $r$-dependent quantity

$$
V_+(r) \equiv \frac{\tfrac12 B + \sqrt{\tfrac14 B^2 + AC}}{A}
\tag{39.5a}
$$

Similarly, the **smaller** root is always less than

$$
V_-(r) \equiv \frac{\tfrac12 B - \sqrt{\tfrac14 B^2 + AC}}{A}
\tag{39.5b}
$$

> [!definition|39.1] Effective potentials in Kerr equatorial motion  
> $V_+(r)$ and $V_-(r)$ are “effective potential” functions for the conserved energy $e$ of a geodesic. Physical particles must obey $e \ge V_-(r)$.

The quantity $e - V_-(r)$ is not simply $\tfrac12(dr/d\tau)^2$, but turning points of the radial motion still occur where $e = V_-(r)$.

---

## 39.3 Negative-Energy Trajectories and the Penrose Process

For certain parameters (e.g. extreme Kerr with $a = GM$ and $\ell = -8GM$), $V_-(r)$ becomes negative inside the ergoregion, allowing **negative-energy** geodesics:

- Allowed radii satisfy $e > V_-(r)$  
- If $V_-(r) < 0$, then orbits with $e < 0$ exist (figure 39.1)

Such orbits exist only **inside the ergoregion** between the outer horizon $r=r_+$ and the outer infinite-redshift surface $r=2GM$ (equatorial plane).

### 39.3.1 Penrose process picture

Penrose process (figure 39.2):

1. A particle $P$ enters the ergoregion with positive energy $e_P$.  
2. It decays into two particles $Q$ and $R$.  
3. $Q$ is forced onto a **negative-energy** inward-falling orbit ($e_Q < 0$).  
4. $R$ escapes to infinity with $e_R = e_P - e_Q > e_P$

Thus the black hole **loses** mass-energy (it absorbs $Q$) while $R$ carries away more energy than $P$ had: energy extraction from the hole’s rotational energy.

Because negative-energy orbits require negative angular momentum, such processes also decrease the hole’s spin.

---

## 39.4 Core Limitation on Energy Extraction

At the event horizon $r = r_+$, the square root in $V_+(r)$ vanishes (box 39.2), so

$$
e \ge \frac{B}{2A}
\tag{39.6}
$$

Explicitly,

$$
e \ge \frac{2GMa}{r_+^3 + a^2 r_+ + 2GMa^2}
\tag{39.6'}
$$

where

$$
r_+ = GM + \sqrt{(GM)^2 - a^2}
$$

This is a lower bound on the **energy per unit mass at infinity** of any particle that crosses the horizon.

Let $m$ be the particle’s rest mass. Then

- the change in the black hole’s mass energy is $\Delta M = me$  
- the change in its spin angular momentum is $\Delta S = m\ell$

Using the horizon relation $r_+^2 + a^2 = 2GMr_+$ (see box 39.4), one can manipulate (39.6) to show that any particle absorption process must satisfy

$$
\Delta M \ge \frac{a\,\Delta S}{r_+^2 + a^2}
= \frac{a\,\Delta S}{2GM r_+}
\tag{39.7}
$$

> [!proposition|39.2] Core limitation  
> For any particle absorption (including Penrose processes), the increase in black-hole mass and spin must satisfy (39.7). This is a universal bound, not just for “energy extraction’’ events.

---

## 39.5 No Naked Singularities

A Kerr black hole must have $a < GM$ to cloak its singularity with an event horizon.  
Could repeated Penrose processes push an initially sub-extreme hole to $a > GM$?

Using (39.7), one can show (problem P39.1) that for an already extreme Kerr black hole ($a=GM$), **any** allowed particle absorption must satisfy

$$
\delta\big[(GM)^2\big] \ge \delta(a^2)
\tag{39.8}
$$

So $(GM)^2$ always stays at least as large as $a^2$, and the inequality $a \le GM$ is preserved.  
Penrose processes therefore cannot spin a Kerr black hole up to a naked singularity.

---

## 39.6 Irreducible Mass and Entropy

Define the **irreducible mass** $M_{\text{ir}}$ so that no particle-absorption or Penrose process can reduce it.

From (39.7) one finds (box 39.5) that

$$
\Delta M_{\text{ir}} \ge 0
\tag{39.9a}
$$

where

$$
M_{\text{ir}}
\equiv \frac{\sqrt{2GM r_+}}{2G}
\tag{39.9b}
$$

For Schwarzschild, the horizon radius is $r_+ = 2GM$ so $M_{\text{ir}} = M$: the mass of a Schwarzschild hole is entirely irreducible.

For Kerr,

$$
M^2 = M_{\text{ir}}^2 + \left(\frac{S}{2GM_{\text{ir}}}\right)^2
\tag{39.10}
$$

> [!remark|39.3] Mining spin energy  
> Penrose processes can reduce $M$ at fixed $M_{\text{ir}}$, effectively “mining’’ the black hole’s spin. When $S$ has been reduced to zero, the hole becomes a Schwarzschild hole with $M = M_{\text{ir}}$.

### 39.6.1 Entropy of a Kerr black hole

From chapter 16, entropy is proportional to the horizon area.  
Using (38.9), the horizon area is

$$
A = 8\pi GM r_+
= 4\pi (2GM_{\text{ir}})^2
\tag{39.11}
$$

Because $\Delta M_{\text{ir}} \ge 0$, any classical particle absorption process can only **increase** $A$, hence the black hole’s entropy.

Hawking radiation can reduce $M_{\text{ir}}$ (and hence $A$), but the emitted radiation increases the entropy of the environment more than enough to keep the total entropy from decreasing.

---

## 39.7 Realistic Energy Extraction

While the ideal Penrose process is probably rare in astrophysical settings, more realistic mechanisms can be thought of in similar terms:

- The **Blandford–Znajek mechanism** extracts rotational energy via electromagnetic fields threading an accretion disk and black hole, producing large currents and Poynting flux.  
- This mechanism still respects the same entropy and irreducible-mass inequalities (39.9) and (39.10).

The author also notes that an advanced civilization could, in principle, use Penrose-like processes (with macroscopic “containers’’ instead of particles) to mine a Kerr black hole’s spin energy in a very efficient way, converting black-hole rotation into usable energy while never exposing a naked singularity and always respecting the entropy bounds above.
