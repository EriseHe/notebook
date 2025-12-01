---
title: "Ch. 20 Stress-Energy and the Source of Gravity"
---
## 20.1 Newtonian Gauss Laws and Local Field Equations

In electrostatics, Gauss’s law relates the electric field $\vec E$ to the charge density $\rho$ that creates it:
$$
\vec\nabla\cdot\vec E = 4\pi k\rho
\tag{20.1}
$$

Applied to the external field of a motionless spherical charge distribution of total charge $Q$, this yields Coulomb’s law
$$
\vec E = \frac{kQ}{r^2}\,\hat r
$$
where $\hat r$ is the outward radial unit vector.

The **analogous Newtonian law for gravity** relates the gravitational field vector $\vec g = -\vec\nabla\Phi$ (with $\Phi$ the gravitational potential) to the **mass density** $\rho$:
$$
\begin{aligned}
-\vec\nabla\cdot\vec g
&= -\vec\nabla\cdot(-\vec\nabla\Phi) \\
&= \nabla^2\Phi \\
&= 4\pi G\rho
\end{aligned}
\tag{20.2}
$$

When applied to the external field of a motionless spherical mass distribution of total mass $M$, this reproduces the familiar result
$$
\vec g = \left(-\frac{GM}{r^2}\right)\hat r
$$
(the sign difference with Coulomb’s law simply reflects that gravity is attractive for positive masses).

Even though in practice we often use $\vec g = (-GM/r^2)\hat r$, equation (20.2) is conceptually **better**: it is a *local field equation*. It links derivatives of the field **at a point** to the presence of sources **at that same point**, and it does not build in instantaneous action at a distance. This makes it compatible with relativity and makes it easier to generalize to arbitrary coordinates.

Our strategy for general relativity will mirror what we already did for electromagnetism in chapter 7:

- The left-hand side of (20.2) will generalize to something involving the Riemann tensor (next chapter).
- In **this** chapter, we find the correct relativistic generalization of the *mass density* $\rho$ that appears on the right-hand side.

## 20.2 The Source of Gravity Is Relativistic Energy

The first conceptual question: in the Newtonian equation (20.2), does $\rho$ represent **mass density** or **relativistic energy density**?

In the Newtonian limit these coincide numerically, but relativity allows energy to move between rest mass, kinetic energy, radiation, etc. If gravity coupled only to *mass*, one could imagine converting mass to other forms of energy and thereby changing gravitational effects without changing the true energy content. A simple argument (box 20.1) shows that we could then create energy “from nothing’’ using an object whose gravity is controlled only by its mass. This paradox vanishes if the **source of gravity is energy**, not just rest mass.

So the relativistic source term should be an **energy-type quantity**, not merely mass density.

## 20.3 The Stress-Energy of “Dust’’

We now ask: is the relevant energy density $\rho$ a relativistic scalar, or is it a component of some tensor?

In chapter 7, we argued that charge density is the time component of the **current-density four-vector** $J^\mu$. Here we will argue analogously that energy density $\rho$ is the $tt$ component of a second-rank tensor $T^{\mu\nu}$ called the **stress-energy tensor**.

> [!definition|20.1] Dust  
> *Dust* is a technical term for a fluid whose constituent particles in a neighborhood are essentially all at rest with respect to one another (no random thermal motion). Each small region has a well-defined bulk four-velocity $u^\mu$.

At every event for dust, we can find a locally inertial frame (LIF) where the particles in a small volume are all at rest.

Consider $N$ identical particles, each of mass $m$, at rest inside a tiny box of volume $V_0$ in such an LIF $S'$ (figure 20.1a). The number density in $S'$ is
$$
n_0 = \frac{N}{V_0}
$$
and, since each particle’s energy is $m$, the **rest-frame energy density** is
$$
\rho_0 = n_0 m
$$

Now look at the same box in another LIF $S$ in which the box (and its particles) move with velocity $\vec v$ (figure 20.1b). The box still contains $N$ particles, but its length in the direction of motion is Lorentz-contracted, so its volume is
$$
V = \frac{V_0}{\sqrt{1-v^2}}
$$
Thus the number density in $S$ is
$$
n = \frac{N}{V} = \frac{N}{V_0\sqrt{1-v^2}} = \frac{n_0}{\sqrt{1-v^2}}
$$

The fluid’s four-velocity $u^\alpha$ in $S$ is
$$
u^\alpha =
\begin{bmatrix}
1/\sqrt{1-v^2}\\[4pt]
v_x/\sqrt{1-v^2}\\[4pt]
v_y/\sqrt{1-v^2}\\[4pt]
v_z/\sqrt{1-v^2}
\end{bmatrix}
\equiv
\begin{bmatrix}
u^t\\ u^x\\ u^y\\ u^z
\end{bmatrix}
\tag{20.3}
$$
Since we are in a LIF, the metric is just the flat-space metric $\eta_{\mu\nu}$.

Using $u^t = 1/\sqrt{1-v^2}$, we can write the number density as
$$
n \equiv \frac{N}{V} = \frac{N}{V_0\sqrt{1-v^2}} = n_0 u^t
\tag{20.4}
$$

Each particle’s energy in $S$ is $p^t \equiv m u^t$, so the total energy density in $S$ is
$$
\begin{aligned}
\rho
&\equiv n p^t \\
&= (n_0 u^t)(m u^t) \\
&= (n_0 m) u^t u^t \\
&= \rho_0 u^t u^t
\end{aligned}
\tag{20.5}
$$

The rest-frame energy density $\rho_0$ of the dust in its own LIF is a **frame-independent scalar**, because all observers can identify that LIF and agree on what it measures. Equation (20.5) shows $\rho$ as a scalar times the product of two time components of four-vectors.

We interpret this as the $t\!-\!t$ component of a second-rank tensor:

> [!definition|20.2] Stress-energy tensor of dust  
> For dust,
> $$
> T^{\mu\nu} \equiv \rho_0 u^\mu u^\nu
> \tag{20.6}
> $$
> This tensor is symmetric: $T^{\mu\nu} = T^{\nu\mu}$.

So for dust, $\rho = T^{tt}$ in any frame.

## 20.4 Physical Meaning of Stress-Energy Components

By construction, $T^{tt}$ is the **energy density** in any frame. What about the other components?

Consider
$$
\begin{aligned}
T^{xt}
&= \rho_0 u^x u^t \\
&= (n_0 m) u^x u^t \\
&= (n_0 u^t)(m u^x) \\[2pt]
&= n p^x
\end{aligned}
\tag{20.7}
$$
Since $p^x$ is each particle’s relativistic $x$-momentum, $T^{xt}$ is the **$x$-momentum density**. Similarly, $T^{yt}$ and $T^{zt}$ are $y$- and $z$-momentum densities. Because $T^{\mu\nu}$ is symmetric, $T^{tx}$, $T^{ty}$, and $T^{tz}$ have the same meanings.

We can also reinterpret $T^{xt}$ in terms of **energy flux**. Using $u^x = u^t v_x$:
$$
\begin{aligned}
T^{xt}
&= \rho_0 u^t u^x \\
&= \rho_0 u^t (u^t v_x) \\
&= n p^t v_x \\
&= \frac{n A v_x dt\,p^t}{A dt}
\end{aligned}
\tag{20.8}
$$
Here $A v_x dt$ is the volume that flows through an area $A$ (perpendicular to $x$) during time $dt$. Thus the numerator $n A v_x dt\,p^t$ is the **total energy** crossing that area in time $dt$, and $T^{xt}$ is:

- **energy per unit area per unit time** flowing in the $+x$ direction,

i.e. the **$x$-flux of energy**.

Analogously:

- $T^{yt}$ and $T^{zt}$ are the $y$- and $z$-fluxes of energy.
- More generally, $T^{it}$ is the $i$-flux of energy, and by symmetry $T^{ti}$ is the same.

> [!remark|20.1] Summary of meanings  
> Roughly,
> - $T^{tt}$: energy density  
> - $T^{it}$: $i$-momentum density and $i$-flux of energy  
> - $T^{ij}$: $i$-flux of $j$-momentum (stresses, including pressure and shear)

A plate placed in the path of the dust and absorbing particles interprets $T^{ix}$ as **force per unit area** in the $i$-direction on the plate. This is why $T^{\mu\nu}$ is a “stress-energy’’ tensor: it simultaneously encodes energy density and the stresses (forces per unit area) carried by the fluid.

## 20.5 Conservation Law for Dust

Just as $\partial_\mu J^\mu = 0$ expresses charge conservation in special relativity, the tensor equation
$$
\nabla_\mu T^{\mu\nu} = 0
\tag{20.9}
$$
expresses conservation of energy and momentum for a fluid in arbitrary coordinates.

We can see this explicitly for dust in a LIF (so that $\nabla_\mu$ reduces to $\partial_\mu$ and $g_{\mu\nu} = \eta_{\mu\nu}$).

Consider an infinitesimal rectangular box of dimensions $dx, dy, dz$ centered on an event (figure 20.3). The dust with four-velocity $u^\mu$ flows through it.

During time $dt$ the particles move distance $v_x dt$ in $x$-direction, so the total energy flowing into the left face is
$$
\rho_0 u^t u^x\,dt\,dy\,dz
= T^{xt}\,dt\,dy\,dz
\tag{20.10}
$$
Energy flowing out of the right face is $(T^{xt})_{\text{right}} dt\,dy\,dz$. The net energy gain due to the $x$-flow is
$$
[(T^{xt})_{\text{left}} - (T^{xt})_{\text{right}}]\,dt\,dy\,dz
= \left(-\frac{\partial T^{xt}}{\partial x}dx\right) dt\,dy\,dz
= -\frac{\partial T^{xt}}{\partial x} dt\,dx\,dy\,dz
\tag{20.11}
$$

Doing the same for $y$ and $z$-flows, the total energy change inside the box due to fluxes during $dt$ is
$$
dE_{\text{net}}
=
\left[
-\frac{\partial T^{xt}}{\partial x}
-\frac{\partial T^{yt}}{\partial y}
-\frac{\partial T^{zt}}{\partial z}
\right] dt\,dx\,dy\,dz
\tag{20.12}
$$

But energy inside the box is $T^{tt}$ times its volume, so the change in internal energy is
$$
dE_{\text{tot}}
= \frac{\partial T^{tt}}{\partial t} dt\,dx\,dy\,dz
\tag{20.13}
$$

Conservation of energy demands $dE_{\text{tot}} = dE_{\text{net}}$, hence
$$
0
=
\left[
\frac{\partial T^{tt}}{\partial t}
+ \frac{\partial T^{xt}}{\partial x}
+ \frac{\partial T^{yt}}{\partial y}
+ \frac{\partial T^{zt}}{\partial z}
\right] dt\,dx\,dy\,dz
\quad\Rightarrow\quad
\partial_\mu T^{\mu t} = 0
\tag{20.14}
$$

So $\partial_\mu T^{\mu t} = 0$ expresses conservation of **energy** for the fluid. Repeating the same argument for $\nu = x,y,z$ yields conservation of **momentum** in each spatial direction:
$$
\partial_\mu T^{\mu\nu} = 0 \quad (\nu = x,y,z)
$$

Because we can always construct such a LIF at each event in curved spacetime, the covariant equation
$$
\nabla_\mu T^{\mu\nu} = 0
$$
must hold in all coordinate systems as the statement of total conservation of energy-momentum for the fluid.

## 20.6 Stress-Energy of a Perfect Fluid

Realistic fluids typically have significant random thermal motions even in a frame where the fluid as a whole is at rest. We call a fluid **perfect** when:

- random motions are significant but
- particles remain essentially non-interacting (no viscosity, no heat conduction, etc.).

An ideal gas is a classic example of a perfect fluid.

Let $\rho_0$ and $p_0$ be the energy density and pressure of a perfect fluid as measured in a LIF at rest with respect to the fluid. In that frame, the components of the stress-energy tensor are
$$
T^{\mu\nu} =
\begin{bmatrix}
\rho_0 & 0 & 0 & 0\\
0 & p_0 & 0 & 0\\
0 & 0 & p_0 & 0\\
0 & 0 & 0 & p_0
\end{bmatrix}
\quad
\text{(for a perfect fluid at rest in a LIF)}
\tag{20.15}
$$

In GR units, time is measured in meters, energy density (kg·m$^2$/m$^2$)/m$^3$ and pressure (kg·m/m$^2$)/m both have units of kg/m$^3$, so the diagonal entries are dimensionally consistent.

We now want the **general tensor expression** for a perfect fluid in arbitrary coordinates and arbitrary motion. It must:

1. Reduce to (20.15) in the rest LIF.
2. Be built from tensorial quantities that describe the fluid: $\rho_0$, $p_0$, $u^\mu$, and $g^{\mu\nu}$.

The unique simple choice that works is

> [!definition|20.3] Stress-energy of a perfect fluid  
> For a perfect fluid in arbitrary coordinates,
> $$
> T^{\mu\nu} \equiv (\rho_0 + p_0) u^\mu u^\nu + p_0 g^{\mu\nu}
> \tag{20.16}
> $$
> In the fluid’s rest LIF this reduces to (20.15). The tensor is symmetric: $T^{\mu\nu} = T^{\nu\mu}$.

Because figure 20.2 shows that this form correctly reproduces the dust stress-energy when $p_0 = 0$, and because $\nabla_\mu T^{\mu\nu} = 0$ holds for each dust-like subset of the fluid, it must also hold for the whole perfect fluid.

## 20.7 Fluid Equations from the Conservation Law

Applying the conservation law to the perfect-fluid stress-energy (20.16) yields the fluid’s equations of motion in an arbitrary LIF:
$$
\partial_\mu(\rho_0 u^\mu) + p_0 \partial_\mu u^\mu = 0
\quad\text{(equation of continuity)}
\tag{20.17}
$$
$$
(\rho_0 + p_0)(\partial_\mu u^\mu) u^\nu
= -(\eta^{\mu\nu} + u^\mu u^\nu)\partial_\mu p_0
\quad\text{(equation of motion)}
\tag{20.18}
$$

To connect with Newtonian fluid dynamics, consider a LIF in which the fluid moves slowly so that $v^2 \ll 1$ and
$$
u^\mu \approx [1, v_x, v_y, v_z]
$$
If random thermal motions are non-relativistic, then $p \ll \rho$ and we can ignore the distinction between $(\rho_0,p_0)$ in the rest frame and $(\rho,p)$ in the LIF.

In this non-relativistic limit, equation (20.17) becomes
$$
\partial_\mu(\rho u^\mu) = 0
\quad\Rightarrow\quad
0 = \frac{\partial\rho}{\partial t} + \vec\nabla\cdot(\rho\vec v)
\tag{20.19}
$$
which is the familiar **continuity equation** expressing mass (or energy) conservation.

The spatial components of (20.18) reduce to
$$
\rho\left(\frac{\partial\vec v}{\partial t}
+ \vec v\cdot\vec\nabla\,\vec v\right)
= -\vec\nabla p
\tag{20.20}
$$
which is Euler’s equation—the Newtonian equation of motion for a perfect fluid.

Those who know classical fluid dynamics will recognize (20.19) and (20.20) as the standard equations describing how fluid elements move in response to internal pressure gradients. The key conceptual point is:

> [!remark|20.2] Role of $\nabla_\mu T^{\mu\nu}=0$  
> The single tensor equation $\nabla_\mu T^{\mu\nu} = 0$ compactly encodes **all** of the local conservation and force laws determining the motion of a relativistic fluid.

In later chapters, this stress-energy tensor $T^{\mu\nu}$ will serve as the **source term** on the right-hand side of the Einstein equation, providing the bridge from matter and energy to spacetime curvature.


Using the normalization $u^\mu u_\mu=-1$ one can show $u_\mu\nabla_\nu u^\mu=0$, which implies $u^\mu\nabla_\nu u^\nu = -u_\nu\nabla_\mu u^\nu u^\mu$ and cancels against part of the first term when projected along $u_\mu$.

Now take the $\mu=r$ component. For our static configuration:

$u^r=0$, $u^\nu$ has only $t$ component

$p=p(r)$ so $\partial_\nu p = \frac{dp}{dr},\delta^r_\nu$

$g^{rr} = 1/B$

Thus the $r$-component becomes


Let’s keep using the book’s notation $p,\rho,m(r)$ and $A,B$.

---

## 1. Newtonian limit of the Oppenheimer–Volkoff equation

Start from equation (23.49)

$$
\frac{dp}{dr}
= -\frac{\rho + p}{r^2}
\left[\frac{4\pi G p r^3 + Gm(r)}{1 - 2Gm(r)/r}\right]
\tag{23.49}
$$

In the Newtonian limit (chapter 21) we assume

1. **Weak field**
   $2Gm(r)/r \ll 1$

2. **Non-relativistic matter**
   $p \ll \rho$ (pressure much smaller than energy density)

3. **Newtonian mass**
   The gravitational mass $m(r)$ coincides with the Newtonian enclosed mass $M(r)$, and the pressure is just $P=p$.

Apply these approximations step by step:

$$
\begin{aligned}
\frac{dp}{dr}
&= -\frac{\rho + p}{r^2}
\left[\frac{4\pi G p r^3 + Gm(r)}{1 - 2Gm(r)/r}\right] [4pt]
&\approx -\frac{\rho}{r^2}
\left[\frac{\underbrace{4\pi G p r^3}*{\text{small if }p\ll\rho} + Gm(r)}{\underbrace{1 - 2Gm(r)/r}*{\approx 1}}\right] [6pt]
&\approx -\frac{\rho}{r^2},Gm(r)
\end{aligned}
$$

Identifying $P \equiv p$ and $M(r) \equiv m(r)$ in this limit, we get

$$
\boxed{
\frac{dP}{dr} = -\frac{G M(r)\rho}{r^2}
}
$$

which is exactly the usual Newtonian hydrostatic equilibrium equation.

---

## 2. Behavior when $r < 2GM$ and gravitational collapse

Now look qualitatively at equation (23.49) when the radius of the star becomes smaller than its Schwarzschild radius $R = 2GM$.

For “normal” matter we have

* $\rho > 0$
* $p > 0$
* $m(r) > 0$

so the **numerator** in the square brackets is always positive

$$
4\pi G p r^3 + Gm(r) > 0
$$

The **denominator** is

$$
1 - \frac{2Gm(r)}{r}
$$

* For a stable neutron star with radius $R > 2GM$, we have $2Gm(r)/r < 1$ everywhere, so the denominator is positive.
  Then the bracket is positive, and the overall minus sign gives

  $$
  \frac{dp}{dr} < 0
  $$

  so pressure decreases outward. This is the usual hydrostatic situation: higher pressure at smaller $r$ supports the star against gravity.

* As the star contracts toward its Schwarzschild radius, the outer layers approach $r \simeq 2GM$ with $m(r)\simeq M$.
  At $r = 2GM$ the denominator in (23.49) tends to zero

  $$
  1-\frac{2GM}{r} \to 0^+
  $$

  but the numerator stays positive. Therefore

  $$
  \left|\frac{dp}{dr}\right| \to \infty
  $$

  An **infinite** pressure gradient would be required to keep a static configuration. No realistic equation of state can provide this, so a static neutron-star solution ceases to exist once the star shrinks close to $R = 2GM$.

* Once the radius passes inside its Schwarzschild radius, $r < 2GM$, the denominator is **negative**

  $$
  1-\frac{2Gm(r)}{r} < 0
  $$

  while the numerator is still positive. Thus the square bracket becomes negative, and the overall minus sign makes

  $$
  \frac{dp}{dr} > 0
  $$

  i.e. the pressure **increases** outward rather than inward.

This behavior is qualitatively disastrous for hydrostatic support:

* When $r>2GM$
  pressure is largest at the center and falls outward ($dp/dr<0$), pushing **against** gravity.
* When $r<2GM$
  (23.49) demands $dp/dr>0$, so pressure is smaller at the center and larger at some larger radius, meaning the pressure gradient actually goes in the **same direction** as gravity instead of opposing it. There is no way to arrange a static, self-supporting fluid configuration.

So as soon as the star’s radius crosses its Schwarzschild radius, the Oppenheimer–Volkoff equation itself tells us that **no static solution is possible**: any configuration must keep collapsing. In full general relativity, this continued collapse leads (classically) to a pointlike singular mass at $r=0$, with the exterior geometry remaining the Schwarzschild solution of mass $M$.

Thus, the behavior of equation (23.49) for $r<2GM$ is entirely consistent with the picture that a sufficiently massive neutron star cannot find a new hydrostatic equilibrium and instead collapses to a point mass (a black-hole singularity), modulo whatever quantum-gravity effects might eventually modify the innermost physics.

