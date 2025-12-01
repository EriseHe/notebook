---
title: "Ch. 30 Gauge Freedom in the Weak-Field Einstein Equation"
---

## 30.1 Introduction and Weak-Field Limit

Gravitational waves arise as **tiny, time-dependent perturbations** of otherwise flat spacetime. Far from any realistic astrophysical source the field is weak, so we can use the **weak-field approximation** (chapter 22) to linearize the Einstein equation.

In this limit we use “nearly cartesian’’ coordinates where the metric is written as a flat background plus a small perturbation
$$
g_{\mu\nu} = \eta_{\mu\nu} + h_{\mu\nu},
\qquad
h_{\mu\nu} = h_{\nu\mu},
\qquad
|h_{\mu\nu}| \ll 1
\tag{30.1}
$$

> [!definition|30.1] Metric perturbation  
> The small symmetric tensor $h_{\mu\nu}$ is called the **metric perturbation**.

To first order in $h_{\mu\nu}$ the inverse metric is
$$
g^{\mu\nu} = \eta^{\mu\nu} - h^{\mu\nu},
\qquad
h^{\mu\nu} \equiv \eta^{\mu\alpha}\eta^{\nu\beta} h_{\alpha\beta}
\tag{30.2}
$$
Using this inverse metric, the Riemann tensor in the weak-field limit is
$$
R_{\alpha\beta\mu\nu}
= \tfrac12
\big[
 \partial_\beta\partial_\mu h_{\alpha\nu}
+ \partial_\alpha\partial_\nu h_{\beta\mu}
- \partial_\alpha\partial_\mu h_{\beta\nu}
- \partial_\beta\partial_\nu h_{\alpha\mu}
\big]
\tag{30.3}
$$
Because we are dropping all terms that are second order or higher in $h_{\mu\nu}$, we can raise and lower indices using the flat metric $\eta_{\mu\nu}$ everywhere.  
Operationally, **to this order** we treat $h_{\mu\nu}$ as if it were a tensor field in flat spacetime.

## 30.2 Trace-Reversed Metric Perturbation and the Linearized Einstein Equation

For gravitational waves it is convenient to work with the Einstein equation in its original form
$$
G^{\gamma\sigma} \equiv R^{\gamma\sigma}
- \tfrac12 \eta^{\gamma\sigma} R
= 8\pi G T^{\gamma\sigma}
\tag{30.4}
$$
where $R^{\gamma\sigma}$ is the Ricci tensor with indices raised, and $R \equiv g^{\alpha\beta} R_{\alpha\beta\mu\nu}$ is the curvature scalar. Using the weak-field expression for the Riemann tensor (equation 30.3) plus the definitions of $R^{\gamma\sigma}$ and $R$, one finds that, to first order in $h_{\mu\nu}$,
$$
\begin{aligned}
\tfrac12 \Big(
&\partial^\gamma \partial_\mu h^{\mu\sigma}
+ \partial^\sigma \partial_\mu h^{\mu\gamma}
- \partial^\gamma \partial^\sigma h
- \partial_\mu \partial^\mu h^{\gamma\sigma}
\Big)
\\[4pt]
&-\eta^{\gamma\sigma}\partial_\mu\partial_\nu h^{\mu\nu}
+ \eta^{\gamma\sigma}\partial_\mu\partial^\mu h
= 8\pi G T^{\gamma\sigma},
\qquad
h \equiv \eta^{\mu\nu} h_{\mu\nu}
\end{aligned}
\tag{30.5}
$$

This expression is still somewhat complicated. We can simplify it by removing the trace part of $h_{\mu\nu}$.

> [!definition|30.2] Trace-reversed metric perturbation  
> The **trace-reversed perturbation** is
> $$
> H_{\mu\nu} \equiv h_{\mu\nu} - \tfrac12 \eta_{\mu\nu} h
> \tag{30.6}
> $$
> Its trace is
> $$
> H \equiv \eta^{\mu\nu} H_{\mu\nu} = -h,
> \qquad\Rightarrow\qquad
> h_{\mu\nu} = H_{\mu\nu} - \tfrac12 \eta_{\mu\nu} H
> \tag{30.7}
> $$

The name “trace-reversed’’ comes from the fact that the sign of the trace has been flipped.

## 30.3 Weak-Field Einstein Equation in Terms of $H_{\mu\nu}$

Substituting the relation $h_{\mu\nu} = H_{\mu\nu} - \tfrac12 \eta_{\mu\nu}H$ and $h=-H$ into equation (30.5) and simplifying, we obtain the weak-field Einstein equation in terms of $H_{\mu\nu}$:
$$
\Box^2 H^{\gamma\sigma}
- \partial^\gamma\partial_\mu H^{\mu\sigma}
- \partial^\sigma\partial_\mu H^{\mu\gamma}
+ \eta^{\gamma\sigma}\partial_\mu\partial_\nu H^{\mu\nu}
= -16\pi G T^{\gamma\sigma}
\tag{30.8}
$$
where the d’Alembertian operator is
$$
\Box^2 \equiv \eta^{\rho\beta} \partial_\rho\partial_\beta
\equiv \partial^\beta\partial_\beta
= -\frac{\partial^2}{\partial t^2} + \nabla^2
$$
(the “box’’ notation is conventional).

Equation (30.8) is linear in $H_{\mu\nu}$ but still contains the extra derivative terms.
To tame these, we exploit our freedom to choose coordinates.

## 30.4 Gauge Transformation Basics

Consider a **small coordinate transformation** from one “nearly cartesian’’ coordinate system $x^\alpha$ to another $x'^\alpha$:
$$
x'^\alpha \equiv x^\alpha + \xi^\alpha,
\qquad
\xi^\alpha = \xi^\alpha(t,x,y,z),
\qquad
|\xi^\alpha| \ll 1
\tag{30.9}
$$

> [!definition|30.3] Gauge transformation  
> A transformation of the form $x'^\alpha = x^\alpha + \xi^\alpha$ with small $\xi^\alpha$ is called a **gauge transformation**.  
> Any specific choice of “nearly cartesian’’ coordinates—hence of $h_{\mu\nu}$ or $H_{\mu\nu}$—is called a **gauge**.

For the partial derivatives we have
$$
\begin{aligned}
\frac{\partial x'^\alpha}{\partial x^\beta}
&= \frac{\partial}{\partial x^\beta}(x^\alpha + \xi^\alpha)
= \delta^\alpha_\beta + \partial_\beta \xi^\alpha
\\[6pt]
\frac{\partial x^\beta}{\partial x'^\alpha}
&= \delta^\beta_\alpha
- \partial_\alpha \xi^\beta
\underbrace{
+\,(\text{terms of order }|\xi^\alpha|^2)
}_{\text{dropped in weak field}}
\approx
\delta^\beta_\alpha - \partial_\alpha \xi^\beta

\end{aligned}
$$

Applying the usual tensor transformation law to the metric, keeping only first-order terms in $\xi^\alpha$, gives the transformation of the metric perturbations:
$$
\begin{aligned}
h'_{\mu\nu} &= h_{\mu\nu} - \partial_\mu\xi_\nu - \partial_\nu\xi_\mu
\\[4pt]
H'_{\mu\nu} &= H_{\mu\nu}
- \partial_\mu\xi_\nu - \partial_\nu\xi_\mu
+ \eta_{\mu\nu}\partial_\alpha\xi^\alpha
\end{aligned}
$$

A key fact is that, to this order, such a transformation **does not change the Riemann tensor**:
$$
\begin{aligned}
R'_{\alpha\beta\mu\nu}
&= \tfrac12\big[
\partial_\beta\partial_\mu h'_{\alpha\nu}
+ \partial_\alpha\partial_\nu h'_{\beta\mu}
- \partial_\alpha\partial_\mu h'_{\beta\nu}
- \partial_\beta\partial_\nu h'_{\alpha\mu}
\big]
\\[4pt]
&\approx
\tfrac12\big[
\partial_\beta\partial_\mu h_{\alpha\nu}
+ \partial_\alpha\partial_\nu h_{\beta\mu}
- \partial_\alpha\partial_\mu h_{\beta\nu}
- \partial_\beta\partial_\nu h_{\alpha\mu}
\big]
= R_{\alpha\beta\mu\nu}
\end{aligned}
\tag{30.12}
$$

Therefore the Einstein equation in the weak-field limit is invariant under these gauge transformations:

- If $h_{\mu\nu}$ (or $H_{\mu\nu}$) solves the weak-field Einstein equation, then so does $h'_{\mu\nu}$ (or $H'_{\mu\nu}$).
- We thus have an entire **family of gauge-related solutions** that all describe the same physical spacetime curvature.

## 30.5 Electromagnetic Analogy and Gauge Freedom

This indeterminacy in the weak-field Einstein equation mirrors a familiar phenomenon in electromagnetism: **gauge freedom in the potentials**.

In electrostatics, the electric potential $\phi$ is defined only up to an arbitrary function of time $g(t)$, since
$$
\vec E \equiv -\vec\nabla\phi
= -\vec\nabla[\phi + g(t)]
= -\vec\nabla\phi + 0
= \vec E
\tag{30.13}
$$
The measurable field $\vec E$ is unchanged.

Similarly, for the magnetic field and vector potential $\vec A$,
$$
\vec B \equiv \vec\nabla\times\vec A'
= \vec\nabla\times[\vec A + \vec\nabla f]
= \vec\nabla\times\vec A + 0
= \vec B
\tag{30.14}
$$
for any scalar function $f$, using $\vec\nabla\times(\vec\nabla f)=0$.

> [!remark|30.1] Gauge freedom  
> In electromagnetism, the freedom to add gradients or time-dependent scalars to the potentials without changing $\vec E$ or $\vec B$ is called **gauge freedom**.  
> In the weak-field Einstein equation we have an analogous gauge freedom in the choice of coordinates, encoded by the transformation $x'^\alpha = x^\alpha + \xi^\alpha$.

Just as a clever choice of electromagnetic gauge simplifies Maxwell’s equations, a clever choice of gravitational gauge simplifies the weak-field Einstein equation.

## 30.6 The Lorentz Gauge

We can always choose a gauge (i.e., choose functions $\xi^\alpha$) such that a given trace-reversed solution $H_{\mu\nu}$ is converted to a new solution $H'_{\mu\nu}$ satisfying the **Lorentz gauge condition**
$$
\partial_\mu H^{\mu\nu} = 0
\tag{30.15}
$$

Rather than solving the full equation (30.8) and imposing this condition afterwards, we can **build the gauge condition in from the start** by **restricting our search to solutions that satisfy** $\partial_\mu H^{\mu\nu} = 0$.

In equation (30.8), the last three terms all contain $\partial_\mu H^{\mu\nu}$. Imposing the Lorentz gauge makes them vanish:

$$
\begin{aligned}
\Box^2 H^{\mu\nu}
&\underbrace{- \partial^\mu\partial_\alpha H^{\alpha\nu}}_{\partial_\alpha H^{\alpha\nu}=0}
\underbrace{- \partial^\nu\partial_\alpha H^{\alpha\mu}}_{\partial_\alpha H^{\alpha\mu}=0}
\underbrace{+ \eta^{\mu\nu}\partial_\alpha\partial_\beta H^{\alpha\beta}}_{\partial_\beta H^{\alpha\beta}=0}
= -16\pi G T^{\mu\nu}
\end{aligned}
$$

So the Einstein equation in Lorentz gauge reduces to the much simpler pair
$$
\Box^2 H^{\mu\nu} = -16\pi G T^{\mu\nu}
\tag{30.16a}
$$
$$
\partial_\mu H^{\mu\nu} = 0
\tag{30.16b}
$$

These are especially attractive because:

- They are **linear** in the trace-reversed perturbation.
- The individual components $H^{\mu\nu}$ are **decoupled** in the field equation (30.16a) once the gauge condition (30.16b) is imposed.

This pair of equations will serve as the starting point for studying gravitational waves.

## 30.7 Additional Gauge Freedom in Lorentz Gauge

The Lorentz gauge condition does **not** exhaust our gauge freedom.  
As discussed in the text, if $H^{\mu\nu}$ satisfies both equations (30.16a) and (30.16b), we can still perform further gauge transformations with functions $\xi^\alpha$ that satisfy
$$
\Box^2 \xi^\alpha \equiv \partial^\mu \partial_\mu \xi^\alpha = 0
\tag{30.17}
$$

Under such a transformation, the new $H'^{\mu\nu}$ continues to satisfy
$$
\partial_\mu H'^{\mu\nu} = 0,
\qquad
\Box^2 H'^{\mu\nu} = -16\pi G T^{\mu\nu}
$$

This **residual gauge freedom** within Lorentz gauge will be extremely useful in the next chapter, where we further constrain gravitational wave solutions to their simplest possible form.
