## 17.1 Overview

In earlier chapters we explored the Schwarzschild geometry and saw how tensor equations express physics in a coordinate–independent way.  

A remaining mathematical problem is:

> How do we take the **gradient of a tensor field** so that the result is again a tensor in *every* coordinate system?

For scalars this is easy: the ordinary partial derivatives already transform as a covector. For vectors and higher–rank tensors, the naive gradient fails. This chapter introduces the **absolute gradient** (or covariant derivative), which corrects the ordinary gradient by accounting for changes in the **basis vectors**.

---

## 17.2 Review: Gradient of a Scalar

Consider a scalar field $\Phi(x^\sigma)$ (meaning $\Phi$ can depend on all four coordinates). In chapter 6 we found that the gradient is a covector in every coordinate system.

Under a change of coordinates $x^\mu \mapsto x'^\mu$, the chain rule gives

$$
\begin{aligned}
(\partial'_\mu \Phi)
&\equiv \frac{\partial \Phi}{\partial x'^\mu}
= \frac{\partial x^\nu}{\partial x'^\mu}\,\frac{\partial \Phi}{\partial x^\nu}
= \frac{\partial x^\nu}{\partial x'^\mu}\,(\partial_\nu \Phi)
\end{aligned}
$$

This transformation law coincides with that of a covector, so $\partial_\mu \Phi$ is a tensor.

---

## 17.3 Why the Naive Gradient of a Vector Is Not a Tensor

For a more complicated tensor, the naive gradient is **not** a tensor. Repeating the example from equation (6.14) for a vector field $A^\mu$:

$$
\begin{aligned}
(\partial'_\nu A'^{\mu})
&\equiv \frac{\partial A'^{\mu}}{\partial x'^{\nu}}
= \frac{\partial}{\partial x'^{\nu}}\!\left(\frac{\partial x'^{\mu}}{\partial x^{\alpha}}A^{\alpha}\right) \\[4pt]
&= \frac{\partial x^{\beta}}{\partial x'^{\nu}}\,
   \frac{\partial}{\partial x^{\beta}}\!\left(\frac{\partial x'^{\mu}}{\partial x^{\alpha}}A^{\alpha}\right) \\[4pt]
&= \frac{\partial x^{\beta}}{\partial x'^{\nu}}\,
   \frac{\partial^2 x'^{\mu}}{\partial x^{\beta}\partial x^{\alpha}} A^{\alpha}
 + \frac{\partial x^{\beta}}{\partial x'^{\nu}}\,
   \frac{\partial x'^{\mu}}{\partial x^{\alpha}}\,
   \frac{\partial A^{\alpha}}{\partial x^{\beta}}
\end{aligned}
$$

The **second term** alone would transform like a rank–2 tensor (one upper, one lower index). The **first term**, involving second derivatives of the coordinate transformation, is nonzero whenever the transformation is nonlinear. Its presence means $\partial_\nu A^\mu$ does **not** transform as a tensor.

So we must modify the gradient to remove spurious contributions coming from *changes in the basis vectors*.

---

## 17.4 Exposing the Problem With a Constant Vector Field

Consider a constant vector field $A(x^\sigma)$ in a flat two–dimensional space. Physically, the true gradient of such a vector field should be zero: the vector does not change as we move from place to place.

- In Cartesian coordinates the components $A^\mu$ are constant, so $\partial_\alpha A^\mu = 0$ as expected.
- In a general curvilinear coordinate system, the components $A^\mu$ of the *same* constant vector field need **not** be constant, because the basis vectors used to evaluate the components change from point to point.

Thus $\partial_\alpha A^\mu$ mixes genuine changes in the vector with mere changes in the basis. To find the **true change** of the vector, we must correct $\partial_\alpha A^\mu$ for the variation in the basis vectors.

---

## 17.5 Christoffel Symbols

To describe how the basis vectors change, define coefficients $\Gamma^\nu_{\mu\alpha}$ at a point (or event) $P$ by

> [!definition|17.1] Christoffel symbols
> The **Christoffel symbols** at a point $P$ are the coefficients $\Gamma^\nu_{\mu\alpha}$ defined by  
> $$
> \frac{\partial e_\alpha}{\partial x^\mu}
> \equiv \Gamma^\nu_{\mu\alpha} e_\nu
> $$

The derivative $\partial e_\alpha/\partial x^\mu$ measures how the basis vector $e_\alpha$ changes as we move from $P$ an infinitesimal displacement $dx^\mu$ along a curve where the other coordinates are held fixed.

Because the change in $e_\alpha$ is itself a vector, it can be written as a linear combination of the basis vectors $e_\nu$, giving four coefficients $\Gamma^\nu_{\mu\alpha}$ for each choice of $\mu,\alpha$. In four–dimensional spacetime there are $4\times 4\times 4 = 64$ Christoffel symbols for a general coordinate system.

---

## 17.6 True Change of a Vector and the Absolute Gradient

Consider now a vector field $A(x^\sigma)$. When we move by an infinitesimal displacement $ds$ with components $dx^\alpha$, the **true** change in $A$ is

$$
\begin{aligned}
dA &= d(A^\mu e_\mu) \\[4pt]
&= \left( \frac{\partial A^\mu}{\partial x^\sigma} dx^\sigma \right) e_\mu
   + A^\mu \frac{\partial e_\mu}{\partial x^\alpha} dx^\alpha
\end{aligned}
$$

Using the definition of the Christoffel symbols (equation 17.3) and renaming indices, we substitute

$$
\frac{\partial e_\mu}{\partial x^\alpha}
= \Gamma^\nu_{\alpha\mu} e_\nu
$$

so that

$$
\begin{aligned}
dA
&= \left[
     \frac{\partial A^\mu}{\partial x^\alpha}
     + \underbrace{\Gamma^\mu_{\alpha\nu} A^\nu}_{\text{correction for basis change}}
   \right] e_\mu dx^\alpha \\[4pt]
&\equiv (\nabla_\alpha A^\mu) e_\mu dx^\alpha
\end{aligned}
$$

This motivates the following definition.

> [!definition|17.2] Absolute gradient of a vector field
> For a vector field $A^\mu(x^\sigma)$, the **absolute gradient** (or covariant derivative) is  
> $$
> \nabla_\alpha A^\mu
> \equiv \frac{\partial A^\mu}{\partial x^\alpha}
>      + \Gamma^\mu_{\alpha\nu} A^\nu
> $$

The term involving $\Gamma^\mu_{\alpha\nu}$ precisely corrects the partial derivative for variations in the basis vectors. Because $dA = (\nabla_\alpha A^\mu) e_\mu dx^\alpha$ must transform as a vector, $\nabla_\alpha A^\mu$ transforms as a tensor of rank 2 (one upper, one lower index). Neither $\partial_\alpha A^\mu$ alone nor $\Gamma^\mu_{\alpha\nu}$ alone is a tensor, but their combination is.

---

## 17.7 Absolute Gradient of General Tensors

### Covector

For a covector $B_\mu$, one can show that its absolute gradient must be

$$
\nabla_\alpha B_\mu
= \frac{\partial B_\mu}{\partial x^\alpha}
  - \Gamma^\nu_{\alpha\mu} B_\nu
$$

The sign of the Christoffel term is negative because lowering an index is like multiplying by the metric and introduces the inverse transformation.

### General tensor

> [!definition|17.3] Absolute gradient of a general tensor
> For a tensor $T^{\mu\nu}{}_{\sigma}$, the absolute gradient is  
> $$
> \nabla_\alpha T^{\mu\nu}{}_{\sigma}
> = \frac{\partial T^{\mu\nu}{}_{\sigma}}{\partial x^\alpha}
> + \Gamma^\mu_{\alpha\beta} T^{\beta\nu}{}_{\sigma}
> + \Gamma^\nu_{\alpha\delta} T^{\mu\delta}{}_{\sigma}
> - \Gamma^\gamma_{\alpha\sigma} T^{\mu\nu}{}_{\gamma}
> $$
> where each **upper index** contributes a **positive** Christoffel term and each **lower index** contributes a **negative** Christoffel term, summed over the repeated index.

**General rule**

- For every **upper** index, add a term $\Gamma^\text{(upper)}_{\ \text{(lower)}}$ times the tensor.
- For every **lower** index, subtract a term with a Christoffel symbol contracting that lower index.

This prescription guarantees that the absolute gradient of a tensor is again a tensor.

---

## 17.8 Symmetry and Computation of Christoffel Symbols

### Symmetry

> [!remark|17.4] Symmetry of the Christoffel symbols  
> Though not obvious from their definition, the Christoffel symbols are symmetric in their lower two indices:  
> $$
> \Gamma^\alpha_{\mu\nu} = \Gamma^\alpha_{\nu\mu}
> $$

Thus, while there are $64$ symbols, only $40$ are independent in four dimensions, because there are only 10 distinct pairs $(\mu,\nu)$ with $\mu\le\nu$.

### Expression in terms of the metric

By taking appropriate dot products of equation (17.3) with basis vectors and using the symmetry property, one can show that the Christoffel symbols are determined entirely by the metric:

$$
\Gamma^\alpha_{\mu\nu}
= \tfrac{1}{2} g^{\alpha\sigma}
\left[
\partial_\mu g_{\nu\sigma}
+ \partial_\nu g_{\sigma\mu}
- \partial_\sigma g_{\mu\nu}
\right]
$$

The factor $g^{\alpha\sigma}$ (the inverse metric) raises the index, and the three terms in brackets are cyclic permutations of the last one.

---

## 17.9 Geodesics as “Locally Straight’’ Curves

Previously, we defined a geodesic as the curve of extremal distance between two points. We can now give an equivalent **local** characterization: a geodesic is a curve whose four–velocity $u = ds/d\tau$ does not change as we move infinitesimally along the path.

So for a geodesic,

$$
\begin{aligned}
0
&= \frac{du}{d\tau}
= \frac{d}{d\tau}(u^\mu e_\mu) \\[4pt]
&= \frac{du^\mu}{d\tau} e_\mu
 + u^\mu \frac{de_\mu}{d\tau}
\end{aligned}
$$

Using $u^\mu = dx^\mu/d\tau$ and the chain rule for $de_\mu/d\tau$,

$$
\frac{de_\mu}{d\tau}
= \frac{\partial e_\mu}{\partial x^\nu}\,\frac{dx^\nu}{d\tau}
= \Gamma^\alpha_{\nu\mu} e_\alpha \frac{dx^\nu}{d\tau}
$$

Substitute into the previous expression:

$$
\begin{aligned}
0
&= \frac{d^2 x^\mu}{d\tau^2} e_\mu
 + \frac{dx^\mu}{d\tau} \frac{dx^\nu}{d\tau}
   \frac{\partial e_\mu}{\partial x^\nu} \\[4pt]
&= \frac{d^2 x^\mu}{d\tau^2} e_\mu
 + \underbrace{\frac{dx^\mu}{d\tau} \frac{dx^\nu}{d\tau}
   \Gamma^\alpha_{\nu\mu} e_\alpha}_{\text{basis change along the curve}} \\[4pt]
&= \left[
     \frac{d^2 x^\mu}{d\tau^2}
     + \Gamma^\mu_{\alpha\beta}
       \frac{dx^\alpha}{d\tau} \frac{dx^\beta}{d\tau}
   \right] e_\mu
\end{aligned}
$$

Since the basis vectors $e_\mu$ are linearly independent, the coefficient of each $e_\mu$ must vanish:

$$
0 =
\frac{d^2 x^\mu}{d\tau^2}
+ \Gamma^\mu_{\alpha\beta}
  \frac{dx^\alpha}{d\tau}
  \frac{dx^\beta}{d\tau}
$$

This is the familiar **geodesic equation** in terms of the Christoffel symbols.

---

## 17.10 Locally Inertial Reference Frames (LIFs)

We have been speaking of changes like $dA$ and $du$ as if they were well defined in a curved spacetime. Intuitively, a four–vector is an arrow with magnitude and direction defined independently of coordinates, so we can talk about differences like

$$
du = u(\tau + d\tau) - u(\tau)
$$

However, in a curved spacetime it is **not** legitimate to subtract components of vectors at different points, because the basis vectors at those points are different. Doing so introduces spurious changes that are merely artifacts of the coordinate system.

Equation (17.5) tells us that the true change in a vector field as we move through a displacement $ds$ is

$$
dA = dx^\alpha (\nabla_\alpha A^\mu) e_\mu
$$

To interpret this physically, we introduce:

> [!definition|17.4] Locally inertial reference frame (LIF)  
> At any event we can choose a **locally orthogonal frame (LOF)** whose metric is the flat–space metric $\eta_{\mu\nu}$ over a small region of spacetime. When the Christoffel symbols vanish at the event, the frame is called a **locally inertial reference frame (LIF)**.

In a LIF:

- The metric $g_{\mu\nu}$ reduces to $\eta_{\mu\nu}$ at the event.
- All first derivatives of the metric vanish at the event:
  $$
  \partial_\sigma g_{\mu\nu}(P) = 0
  $$

In such coordinates, the Christoffel symbols also vanish (by equation 17.10), and the geodesic equation reduces locally to

$$
\frac{d^2 x^\mu}{d\tau^2} = 0
$$

the equation of a straight line, as expected in a locally inertial frame.

Because the Christoffel symbols vanish at $P$ in a LIF, the absolute gradient there reduces to the ordinary gradient (equations 17.6–17.8). Thus a vector field is “truly’’ constant at $P$ if its ordinary gradient vanishes there in a LIF, and true differences between vectors at nearby events can be evaluated as simple coordinate differences in that LIF.

---

## 17.11 Absolute Gradient of the Metric

The LIF idea is especially useful for gradients involving the metric.

Consider the absolute gradient of the metric tensor $\nabla_\alpha g_{\mu\nu}$ in an arbitrary coordinate system. In a LIF centered at any event, the absolute gradient reduces to the ordinary gradient, and because the metric equals $\eta_{\mu\nu}$ with constant components there, we have

$$
\nabla_\alpha g_{\mu\nu}
= \partial_\alpha g_{\mu\nu}
= 0
$$

> [!proposition|17.5] Metric compatibility  
> The equation $\nabla_\alpha g_{\mu\nu} = 0$ is a tensor equation. Since it holds in one coordinate system (any LIF), it must hold in **every** coordinate system. Thus the metric is covariantly constant with respect to the same connection that defines the Christoffel symbols.

This property allows us to treat $g_{\mu\nu}$ as if it were constant in any equation written with the **absolute gradient**, even though its coordinate components vary in curved spacetime.

---

## 17.12 Physics Equations in Curved Spacetime

Finally, we can use the equivalence principle and LIFs to extend flat–spacetime field equations to curved spacetime.

In an inertial frame of flat spacetime, Maxwell’s equations at any event are

$$
\begin{aligned}
\partial_\nu F^{\mu\nu} &= 4\pi k J^\mu \\[2pt]
\partial^\mu F^{\alpha\beta}
+ \partial^\beta F^{\mu\alpha}
+ \partial^\alpha F^{\beta\mu} &= 0
\end{aligned}
$$

By the equivalence principle, these must also hold in a LIF centered on an event in a curved spacetime. But in that LIF we can replace ordinary derivatives by covariant derivatives without changing the form of the equations, giving the **tensor** equations

$$
\begin{aligned}
\nabla_\nu F^{\mu\nu} &= 4\pi k J^\mu \\[2pt]
\nabla^\mu F^{\alpha\beta}
+ \nabla^\beta F^{\mu\alpha}
+ \nabla^\alpha F^{\beta\mu} &= 0
\end{aligned}
$$

where

$$
\nabla^\mu \equiv g^{\mu\nu} \nabla_\nu
$$

Since these relations are tensor equations, they hold in **every** coordinate system. In this way, the absolute gradient provides the systematic rule for writing physics equations valid in curved spacetime.
