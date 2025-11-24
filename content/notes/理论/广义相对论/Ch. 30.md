# Chapter 30 — Linearized Gravity, Gauge Transformations, and the Lorentz Gauge

## 1. Introduction
This chapter begins the study of **gravitational waves**.  
In general relativity, changes in the gravitational field propagate at the speed of light, so any realistic astrophysical source emits waves that—far from the source—appear only as *tiny perturbations* of flat spacetime.  
Such situations are treated with the **weak-field limit**, where the Einstein equation can be written in **linear form**.

---

## 2. Weak-Field Limit Review

When the gravitational field is weak, the metric can be written as

$$
g_{\mu\nu} = \eta_{\mu\nu} + h_{\mu\nu},
\qquad h_{\mu\nu}=h_{\nu\mu},\qquad |h_{\mu\nu}|\ll 1
\tag{30.1}
$$

The perturbation $h_{\mu\nu}$ is small, so to first order,

$$
g^{\mu\nu} = \eta^{\mu\nu} - h^{\mu\nu},
\qquad 
h^{\mu\nu} \equiv \eta^{\mu\alpha}\eta^{\nu\beta}h_{\alpha\beta}
\tag{30.2}
$$

Using equation (22.7), the Riemann tensor to first order is

$$
R_{\alpha\beta\mu\nu}
=
\frac12[
\partial_\beta\partial_\mu h_{\alpha\nu}
+ \partial_\alpha\partial_\nu h_{\beta\mu}
- \partial_\alpha\partial_\mu h_{\beta\nu}
- \partial_\beta\partial_\nu h_{\alpha\mu}]
\tag{30.3}
$$

A crucial simplification: **to first order**, raising/lowering indices with $g_{\mu\nu}$ is equivalent to raising/lowering with $\eta_{\mu\nu}$.  
This means all tensor manipulations behave as in flat spacetime.

---

## 3. The Trace-Reversed Perturbation

Einstein’s equation in its original form is

$$
G^{\gamma\sigma} \equiv R^{\gamma\sigma} - \frac12 \eta^{\gamma\sigma}R = 8\pi G\,T^{\gamma\sigma}
\tag{30.4}
$$

Substitute the linearized forms of $R^{\gamma\sigma}$ and $R$ (from eq. 30.3 and box 30.1).  
To first order, the Einstein equation becomes

$$
\begin{aligned}
\frac12 (&
\partial^\gamma\partial_\mu h^{\mu\sigma}
+ \partial^\sigma\partial_\mu h^{\mu\gamma}
- \partial^\gamma\partial^\sigma h
- \partial_\mu\partial^\mu h^{\gamma\sigma}
\\[4pt]
&- \eta^{\gamma\sigma}\partial_\beta\partial_\mu h^{\mu\beta}
+ \eta^{\gamma\sigma}\partial_\mu\partial^\mu h )
= 8\pi G\,T^{\gamma\sigma}
\end{aligned}
\tag{30.5}
$$

To simplify this, define the **trace-reversed perturbation**

$$
H_{\mu\nu}
\equiv
h_{\mu\nu}
-\frac12\eta_{\mu\nu}h,
\qquad 
h = \eta^{\mu\nu}h_{\mu\nu}
\tag{30.6}
$$

Invert the relation:

$$
h_{\mu\nu} = H_{\mu\nu} - \frac12 \eta_{\mu\nu}H
\tag{30.7}
$$

(Since $H=\eta^{\mu\nu}H_{\mu\nu}=-h$, the name “trace-reversed” follows.)

---

## 4. Linearized Einstein Equation in Terms of $H_{\mu\nu}$

Substituting (30.7) into (30.5):

$$
\square^2 H^{\gamma\sigma}
- \partial^\gamma\partial_\mu H^{\mu\sigma}
- \partial^\sigma\partial_\mu H^{\mu\gamma}
+ \eta^{\gamma\sigma}\partial_\rho\partial_\mu H^{\mu\rho}
= -16\pi G\,T^{\gamma\sigma}
\tag{30.8}
$$

where

$$
\square^2 \equiv
\eta^{\alpha\beta}\partial_\alpha\partial_\beta
=
-(\partial_t)^2 + \nabla^2
$$

The equation is simpler, but still not easy to solve.  
We have not yet used our key freedom: **gauge transformations**.

---

## 5. Gauge Transformations in Linearized Gravity

Consider a small coordinate change:

$$
x'^{\alpha} = x^{\alpha} + \xi^{\alpha}(t,x,y,z),
\qquad |\xi^{\alpha}| \ll 1
\tag{30.9}
$$

Compute the Jacobian to first order:

$$
\frac{\partial x'^{\alpha}}{\partial x^\beta}
=
\delta^\alpha_\beta + \partial_\beta\xi^\alpha
\tag{30.10a}
$$

and similarly

$$
\frac{\partial x^\beta}{\partial x'^\alpha}
=
\delta^\beta_\alpha
- \partial_\alpha \xi^\beta
\tag{30.10b}
$$

Applying the tensor transformation rule to the metric gives the transformation law for the metric perturbation:

$$
h'_{\mu\nu}
=
h_{\mu\nu}
- \partial_\mu\xi_\nu
- \partial_\nu\xi_\mu
\tag{30.11a}
$$

For the trace-reversed perturbation:

$$
H'_{\mu\nu}
=
H_{\mu\nu}
- \partial_\mu\xi_\nu
- \partial_\nu\xi_\mu
+ \eta_{\mu\nu}\partial_\alpha\xi^\alpha
\tag{30.11b}
$$

> [!remark|30.1] Gauge invariance of linearized curvature  
> Using eq. (30.3), one checks that  
> $$R'_{\alpha\beta\mu\nu}=R_{\alpha\beta\mu\nu}$$  
> to first order.  
> Therefore, **gauge transformations do not change the curvature** in the weak-field limit.

This means if $h_{\mu\nu}$ solves the equation, then $h'_{\mu\nu}$ is also a solution.  
Thus the linearized Einstein equation admits an **infinite family** of solutions related by gauge transformations.

---

## 6. Electromagnetic Analogy

The redundancy mirrors the familiar **gauge freedom** in electromagnetism:

- Adding a scalar function $g(t)$ to a static scalar potential:  
  $$\vec{E} = -\vec{\nabla}\phi = -\vec{\nabla}(\phi+g(t)).$$

- Adding a gradient $\vec{\nabla}f$ to the vector potential:  
  $$
  \vec{B}
  = \vec{\nabla}\times\vec{A}
  = \vec{\nabla}\times(\vec{A}+\vec{\nabla}f)
  $$

Since $\vec{\nabla}\times(\vec{\nabla}f)=0$, the physical field does not change.

Likewise, the choice of coordinates for $h_{\mu\nu}$ or $H_{\mu\nu}$ is a **gauge choice**.

---

## 7. The Lorentz Gauge

We can use gauge freedom to greatly simplify the equation.  
We require the **Lorentz gauge condition**:

$$
\partial_\mu H^{\mu\nu} = 0
\tag{30.15}
$$

If a solution $H_{\mu\nu}$ does *not* satisfy this, one can always perform a gauge transformation to one that does.

Imposing $\partial_\mu H^{\mu\nu}=0$ eliminates all but one term in equation (30.8), giving:

$$
\square^2 H^{\mu\nu}
=
-16\pi G\,T^{\mu\nu}
\tag{30.16a}
$$

with the gauge condition repeated:

$$
\partial_\mu H^{\mu\nu} = 0
\tag{30.16b}
$$

These equations are extremely useful:

- They are **linear** in $H_{\mu\nu}$.  
- The components **decouple**, making the system far easier to solve.  
- They form the starting point for analyzing **gravitational waves**.

---

## 8. Additional Gauge Freedom

Even after imposing the Lorentz gauge, gauge freedom remains.

Suppose we make another transformation:

$$
x^\alpha \rightarrow x^\alpha + \xi^\alpha,
\qquad
\square^2\xi^\alpha = 0
\tag{30.17}
$$

Then the transformed perturbation still satisfies:

- $\partial_\mu H^{\mu\nu}=0$  
- $\square^2 H^{\mu\nu} = -16\pi G T^{\mu\nu}$

Thus Lorentz gauge does **not** fully fix the gauge.  
This remaining freedom is essential when reducing gravitational-wave solutions to their simplest form (next chapter).

---
