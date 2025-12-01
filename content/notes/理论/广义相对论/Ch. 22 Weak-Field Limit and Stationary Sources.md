## 22. 1. Energy Conservation as a Geometric Necessity

In chapter 21 the Einstein tensor was defined as  
$$
G^{\mu\nu} \equiv R^{\mu\nu} - \tfrac12 g^{\mu\nu} R
$$
and the Einstein equation was written as
$$
G^{\mu\nu} = 8\pi G T^{\mu\nu}
$$

The metric $g_{\mu\nu}$ has 10 independent components, so **naively** this system looks like 10 independent second-order differential equations for $g_{\mu\nu}$.

However, the metric cannot be completely determined by these equations because we are free to choose coordinates. A general coordinate transformation
$$
x'^{\mu} = f^{\mu}(x^\nu)
$$
contains four arbitrary functions, so the components $g_{\mu\nu}$ in different coordinate systems that describe the *same* spacetime are related in a way that cannot change the physical content.

This means the 10 equations in $G^{\mu\nu} = 8\pi G T^{\mu\nu}$ can only impose **six** independent constraints on the metric; the remaining four are effectively coordinate conditions.

The way this happens mathematically is through the **Bianchi identity**, which implies
$$
\nabla_{\nu} G^{\mu\nu} \equiv 0
$$
for any metric. Thus, the Einstein tensor is automatically constructed so that it satisfies **four internal differential identities**. As a result, the Einstein equation
$$
G^{\mu\nu} = 8\pi G T^{\mu\nu}
$$
demands
$$
\nabla_{\nu} T^{\mu\nu} = 0
$$
which is the local law of conservation of energy and momentum.

> [!remark|22.1] Energy conservation from coordinate freedom  
> The requirement that physical laws be independent of our arbitrary coordinate choice forces the Einstein tensor to have vanishing divergence. When we equate this tensor to $T^{\mu\nu}$, the conservation law $\nabla_\nu T^{\mu\nu} = 0$ follows as a **necessary consequence** of general covariance, rather than an extra assumption.

---

## 22.2 Connection to the Geodesic Hypothesis

The conservation equation $\nabla_\nu T^{\mu\nu} = 0$ also encodes the motion of matter.

For “dust” (a pressureless fluid whose constituents move together) the stress-energy tensor is
$$
T^{\mu\nu} = \rho_0 u^\mu u^\nu
$$
where $\rho_0$ is the mass-energy density in the fluid’s own rest frame and $u^\mu$ is its four-velocity.

Using the product rule, the conservation law becomes
$$
\begin{aligned}
0 = \nabla_\nu T^{\mu\nu}
&= \nabla_\nu(\rho_0 u^\mu u^\nu) \\[4pt]
&= u^\mu \nabla_\nu(\rho_0 u^\nu)
   + \rho_0 u^\nu \nabla_\nu u^\mu 
\end{aligned}
\tag{22.1}
$$

From the normalization of the four-velocity,
$$
-1 = u\cdot u \equiv u^\mu g_{\mu\alpha}u^\alpha
$$
one can show (using the metric compatibility of $\nabla_\nu$) that
$$
\nabla_\nu(\rho_0 u^\nu) = 0
$$
which expresses conservation of the dust particles themselves. Substituting this into equation (22.1) gives
$$
0 = \rho_0 u^\nu \nabla_\nu u^\mu
$$
or, since $\rho_0 \neq 0$,
$$
u^\nu \nabla_\nu u^\mu = 0
$$

Now expand the covariant derivative:
$$
\begin{aligned}
0
&= u^\nu \left(\frac{\partial u^\mu}{\partial x^\nu}
         + \Gamma^\mu_{\ \beta\nu} u^\beta\right) \\[4pt]
&= \underbrace{u^\nu \frac{\partial u^\mu}{\partial x^\nu}}_{\displaystyle
=\,\dfrac{du^\mu}{d\tau}}
   + \Gamma^\mu_{\ \beta\nu} u^\beta u^\nu \\[4pt]
&= \frac{du^\mu}{d\tau}
   + \Gamma^\mu_{\ \beta\nu} u^\beta u^\nu \\[4pt]
&= \frac{d^2 x^\mu}{d\tau^2}
   + \Gamma^\mu_{\ \beta\nu}
     \frac{dx^\beta}{d\tau}\frac{dx^\nu}{d\tau} 
\end{aligned}
\tag{22.2}
$$
where we used $u^\mu \equiv dx^\mu/d\tau$.

Equation (22.2) is precisely the **geodesic equation**. Thus, for dust,
$$
\nabla_\nu T^{\mu\nu} = 0
\quad\Rightarrow\quad
\text{constituent particles follow geodesics}
$$

---

## 22.3 The Weak-Field Limit

To connect with Newtonian gravity and simplify the Einstein equation, we assume the gravitational field is weak: spacetime is only slightly curved, and in some coordinates $x^\mu = (t,x,y,z)$ we can write the metric as
$$
g_{\mu\nu} = \eta_{\mu\nu} + h_{\mu\nu}
\quad\text{with}\quad
h_{\mu\nu} = h_{\nu\mu},
\quad |h_{\mu\nu}|\ll 1 \tag{22.3}
$$
where $\eta_{\mu\nu}$ is the flat-space metric. These coordinates are **quasi-cartesian**.

In the weak-field limit we systematically drop any term of order $|h_{\mu\nu}|^2$ or higher.

### 3.1 Inverse metric to first order

Using the defining relation for the inverse metric
$$
g_{\alpha\beta}g^{\beta\nu} \equiv \delta_\alpha^{\ \nu}
$$
you can show that to first order in $h_{\mu\nu}$
$$
g^{\mu\nu} = \eta^{\mu\nu} - h^{\mu\nu},
\qquad
h^{\mu\nu} \equiv \eta^{\mu\alpha}\eta^{\nu\beta} h_{\alpha\beta} \tag{22.4}
$$

This means we can raise or lower indices on quantities of order $h_{\mu\nu}$ using the *flat-space* metric $\eta_{\mu\nu}$ or $\eta^{\mu\nu}$. For example,
$$
\begin{aligned}
h^\mu_{\ \nu}
&\equiv g^{\mu\alpha} h_{\alpha\nu}
   = (\eta^{\mu\alpha}-h^{\mu\alpha}) h_{\alpha\nu} \\[4pt]
&= \eta^{\mu\alpha}h_{\alpha\nu}
   - \underbrace{h^{\mu\alpha}h_{\alpha\nu}}_{\mathcal O(h^2)\ \text{drop}} \\[4pt]
&\approx \eta^{\mu\alpha} h_{\alpha\nu} 
\end{aligned}
\tag{22.5}
$$

### 3.2 Einstein equation and curvature tensors

The Einstein equation with both indices lowered is
$$
R_{\beta\nu} = 8\pi G
\left(T_{\beta\nu} - \tfrac12 g_{\beta\nu} T\right),
\qquad
T \equiv g_{\mu\nu}T^{\mu\nu} \tag{22.6}
$$

To first order in $h_{\mu\nu}$, the Riemann tensor is
$$
R_{\alpha\beta\mu\nu}
= \tfrac12\big(
\partial_\beta\partial_\mu h_{\alpha\nu}
+ \partial_\alpha\partial_\nu h_{\beta\mu}
- \partial_\alpha\partial_\mu h_{\beta\nu}
- \partial_\beta\partial_\nu h_{\alpha\mu}\big) \tag{22.7}
$$

Contracting on the first and third indices gives the Ricci tensor:
$$
\begin{aligned}
R_{\beta\nu}
&\equiv g^{\alpha\mu} R_{\alpha\beta\mu\nu} \\[4pt]
&\approx \eta^{\alpha\mu} R_{\alpha\beta\mu\nu}
   \quad\text{(keep only first order in }h_{\mu\nu}\text{)} \\[4pt]
&= \tfrac12\Big(
 -\eta^{\alpha\mu}\partial_\alpha\partial_\mu h_{\beta\nu}
 + \partial_\beta H_\nu
 + \partial_\nu H_\beta
 \Big) 
\end{aligned}
\tag{22.8a}
$$
where
$$
H_\nu \equiv \eta^{\mu\alpha}
\left(\partial_\mu h_{\alpha\nu}
     - \tfrac12 \partial_\nu h_{\alpha\mu}\right) \tag{22.8b}
$$

---

## 22.4 A Constraint on the Coordinates

The Einstein equation contains only six independent constraints on $h_{\mu\nu}$; the remaining four degrees of freedom correspond to our freedom to tweak the coordinates slightly,
$$
x'^{\mu} = f^{\mu}(x^\nu)
$$
without changing the physics.

In the weak-field limit we can always choose these four coordinate functions so that
$$
H_\nu = 0
$$
in our quasi-cartesian coordinates. This is a **coordinate condition** (a weak-field analogue of a gauge choice).

If we impose $H_\nu = 0$, the last two terms in (22.8a) vanish, leaving
$$
R_{\beta\nu} = -\tfrac12 \eta^{\alpha\mu}\partial_\alpha\partial_\mu h_{\beta\nu}
\equiv -\tfrac12 \Box^2 h_{\beta\nu}
$$
where $\Box^2 \equiv \eta^{\alpha\mu}\partial_\alpha\partial_\mu$ is the flat d’Alembertian.

To first order in $h_{\mu\nu}$ the Einstein equation (22.6) becomes
$$
-\tfrac12 \Box^2 h_{\beta\nu}
= 8\pi G\left(T_{\beta\nu} - \tfrac12 \eta_{\beta\nu}T\right) \tag{22.9}
$$

---

## 22.5 The Stationary-Source Limit

Now additionally assume that the matter source is **stationary**: the stress-energy tensor is independent of time. Then the field is also time-independent, so
$$
\eta^{\alpha\mu}\partial_\alpha\partial_\mu
= \partial_x\partial_x + \partial_y\partial_y + \partial_z\partial_z
\equiv \nabla^2
$$
and equation (22.9) reduces to
$$
\nabla^2 h_{\beta\nu}
= -16\pi G
\left(T_{\beta\nu} - \tfrac12 \eta_{\beta\nu}T\right) \tag{22.10}
$$

This has exactly the same form as the Newtonian Poisson equation
$$
\nabla^2 \Phi_N = 4\pi G \rho
$$
for the gravitational potential $\Phi_N$.

### 5.1 Solution by analogy with Newtonian gravity

For a static Newtonian field, we know
$$
\Phi_N(\vec r)
= \int_{\text{src}}
\frac{-G\rho(\vec r_s)\, dV}{|\vec r - \vec r_s|} \tag{22.11}
$$
where the integral is over the source volume and $\rho(\vec r_s)$ is the mass density at $\vec r_s$.

By analogy, the solution to (22.10) is
$$
\begin{aligned}
h_{\beta\nu}(\vec r)
&= 4\int_{\text{src}}
   \frac{G\big(T_{\beta\nu} - \tfrac12 \eta_{\beta\nu}T\big)\, dV}
        {|\vec r - \vec r_s|} \\[4pt]
&= 2\int_{\text{src}}
   \frac{G\big(2T_{\beta\nu} - \eta_{\beta\nu}T\big)\, dV}
        {|\vec r - \vec r_s|} 
\end{aligned}
\tag{22.12}
$$
where $T_{\beta\nu}$ is evaluated at $\vec r_s$ inside the source.

---

## 22.6 Perfect-Fluid Sources and Effective Densities

For a perfect fluid in arbitrary coordinates (using equation 20.16) the stress-energy tensor is
$$
T_{\beta\nu} = (\rho_0 + p_0) u_\beta u_\nu + g_{\beta\nu} p_0
$$
where $\rho_0$ and $p_0$ are the energy density and pressure in the fluid’s rest frame, and $u_\nu$ is the covariant four-velocity of the fluid.

In the weak-field and low-velocity limit (“slow rotation”), and to first order in $h_{\mu\nu}$, one finds
$$
\begin{aligned}
2T_{tt} - \eta_{tt}T
&\approx \rho_0 + 3p_0
\equiv \rho_g
\quad\text{(gravitoelectric energy density)}\\[4pt]
-T_{ti} + \tfrac12 \eta_{ti}T
&\approx (\rho_0 + p_0)u_i
\equiv \Pi_i
\quad\text{(gravitomagnetic current density)} \\[4pt]
2T_{ii} - \eta_{ii}T
&\approx \rho_0 - p_0
\equiv \rho_c
\quad\text{(curvature energy density)} 
\end{aligned}
\tag{22.13}
$$
with $T_{ij} \approx 0$ for $i\neq j$ (spatial indices only).

> [!definition|22.2] Gravitational “charge” densities  
> In the weak-field, stationary limit:
> - $\rho_g$ is the **gravitoelectric energy density** (source of the gravitoelectric potential)  
> - $\Pi_i$ is the **gravitomagnetic current density**  
> - $\rho_c$ is the **curvature energy density**, related to deviations of spatial metric components from flatness

Equations (22.12) and (22.13) together show, for example, that the source of the gravitoelectric potential $\Phi_G$ is an integral over $\rho_g$:
$$
\Phi_G(\vec r)
= \int_{\text{src}}
\frac{-G \rho_g(\vec r_s)\, dV}
     {|\vec r - \vec r_s|}
$$

---

## 7. How Particles Respond: Gravitoelectric and Gravitomagnetic Fields

Consider a test particle moving **non-relativistically** in a weak and stationary field. To first order in both $h_{\mu\nu}$ and the particle’s speed $v^i$, the geodesic equation reduces to
$$
\frac{d^2 x^i}{dt^2}
\approx \tfrac12 \eta^{ik}\partial_k h_{tt}
 + \eta^{ik}(\partial_k h_{tj} - \partial_j h_{tk}) v^j
\equiv \eta^{ik}\big(-\partial_k \Phi_G + F_{kj} v^j\big) \tag{22.14}
$$
where $i,j,k$ run over spatial indices and $v^j = dx^j/dt$.

- The term $-\partial_k \Phi_G \equiv \partial_k(\tfrac12 h_{tt})$ causes an acceleration even for a particle initially at rest (relative to our quasi-cartesian coordinates). This is analogous to the electric field in electrodynamics, so it is called the **gravitoelectric** part of the gravitational field.

- The tensor
  $$
  F_{kj} \equiv \partial_k h_{tj} - \partial_j h_{tk}
  $$
  contributes an acceleration proportional to the particle’s velocity. This is analogous to the effect of a magnetic field, and we refer to it as the **gravitomagnetic** aspect of the field. Equations (22.12) and (22.13) imply that $F_{kj}$ is sourced by the **gravitomagnetic current density** $\Pi_i$.

If the random motion in the fluid source is non-relativistic, the pressure is negligible compared to the energy density, so $\rho_0$ dominates and $\Phi_G$ reduces to the Newtonian potential $\Phi_N$. Vacuum energy, with
$$
T^{\mu\nu}_{\text{vac}} = -(\Lambda/8\pi G)g^{\mu\nu}
$$
behaves like a perfect fluid with $\rho_0 = -p_0 = -\Lambda/8\pi G$; this gives **negative** $\rho_g$ and hence a **repulsive** gravitoelectric field in the weak-field limit.

---

## 8. Spherical Objects and the Schwarzschild Limit

Consider now the external field of a non-rotating, spherically symmetric object, under the assumption that the weak-field approximation holds everywhere inside and outside the object.

If the internal motions are non-relativistic and pressure is negligible, then
$$
\rho_c \approx \rho_g \approx \rho
$$
where $\rho$ is the Newtonian mass density, and the gravitomagnetic current density vanishes:
$$
\Pi_i = 0
$$

From the Newtonian integral (22.11) for a spherically symmetric source centered at the origin, we know
$$
\Phi_N(r) = -\frac{GM}{r},
\qquad
M \equiv \int \rho(r)\, dV,
\quad
r \equiv (x^2 + y^2 + z^2)^{1/2}
$$

In this limit, equation (22.12) yields
$$
h_{tt} = h_{xx} = h_{yy} = h_{zz} = \frac{2GM}{r},
\qquad
\text{all other }h_{\mu\nu}=0 \tag{22.15}
$$

The metric in the empty space outside such an object is therefore
$$
ds^2 = -\left(1 - \frac{2GM}{r}\right)dt^2
      + \left(1 + \frac{2GM}{r}\right)(dx^2 + dy^2 + dz^2) \tag{22.16}
$$
which is the Schwarzschild metric expanded to first order in $GM/r$.

From equation (22.14) with this $h_{tt}$, the particle acceleration outside the star becomes
$$
\frac{d^2 \vec x}{dt^2}
= -\vec\nabla \Phi_G
= -\vec\nabla \Phi_N
= -\vec\nabla\!\left(-\frac{GM}{r}\right)
= -\frac{GM}{r^2} \hat r \tag{22.17}
$$
exactly the usual Newtonian gravitational acceleration.

---

## 9. Concluding Note

In the weak-field, stationary-source limit:

- The Einstein equation reduces to a Poisson-like equation for the metric perturbations $h_{\mu\nu}$.
- Different components of the stress-energy tensor play roles analogous to electric charge density and current density in electromagnetism:
  - $\rho_g$ sources the gravitoelectric potential $\Phi_G$,
  - $\Pi_i$ sources the gravitomagnetic aspects $F_{ij}$,
  - $\rho_c$ is tied to spatial curvature.
- For spherical, non-rotating sources this weak-field metric reduces to the linearized Schwarzschild solution and reproduces Newtonian gravity.

Even though strong fields and relativistic sources blur the clean separation between “gravitoelectric” and “gravitomagnetic” aspects, this chapter’s weak-field, stationary analysis gives a very useful qualitative picture of how the full Einstein equation behaves.