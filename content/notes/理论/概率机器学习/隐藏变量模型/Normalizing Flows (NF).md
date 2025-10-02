---
title: Normalizing Flows (NF)
tags:
  - NF
---

# 1 Change of Variables Theorem

We want to compute the density of a transformed variable:

- Let  
  $$
  x = f_\theta(z), \quad z = f_\theta^{-1}(x)
  $$

- Then the density transforms as:  
  $$
  p_X(x;\theta) \;=\; p_Z(f_\theta^{-1}(x)) \;\cdot\; \Big|\det \frac{\partial f_\theta^{-1}(x)}{\partial x}\Big|
  $$

- **Interpretation**
  - $p_Z$: density of the encoded latent $z$ under the prior
  - $\det \frac{\partial f_\theta^{-1}(x)}{\partial x}$: Jacobian determinant of the inverse map
  - Together, they define the density of $x$ under the flow

- **1D special case:**  
  $$
  p_X(x;\theta) = p_Z(f_\theta^{-1}(x)) \cdot \Big|\frac{d}{dx} f_\theta^{-1}(x)\Big|
  $$


# 2 Comparing Base vs. Transformed Distributions

We start with a simple base distribution:
- $z \sim {N}(0,1)$

We apply a linear invertible transformation:
- $x = f(z) = 2z + 3$

By the Change of Variables Theorem:
$$
p_X(x) = p_Z(f^{-1}(x)) \cdot \left|\frac{d}{dx} f^{-1}(x)\right|
$$

We now plot **both distributions** to see how the transformation shifts and stretches the density.

# 3 Change of Variables: Intuition

Suppose:

- Transformation:  
  $$
  x = \exp(z), \quad z = \ln(x), \quad x > 0
  $$

- Base distribution:  
  $$
  z \sim {N}(0,1)
  $$

- By the change of variables theorem:  
  $$
  p_X(x) = p_Z(\ln(x)) \cdot \Big|\frac{d}{dx}\ln(x)\Big|
  $$

- Since $\frac{d}{dx}\ln(x) = \frac{1}{x}$, we get:  
  $$
  p_X(x) = \frac{1}{x} \, p_Z(\ln(x))
  $$

This produces a **log-normal distribution** for $x$.

# 4 Jacobian Determinant and General Functions

## 4.1 Linear Case
For a linear map $f(x) = Jx$, the Jacobian is the constant matrix $J$:

$$
J =
\begin{bmatrix}
3 & 1 \\
0 & 2
\end{bmatrix},
\qquad
\det(J) = 6.
$$

- Every region in $\mathbb{R}^2$ is stretched in area by a factor $\det(J)=6$.
- Mass is preserved during Jacobian transformation
## 4.2 General Nonlinear Function
For a smooth function $f:\mathbb{R}^d \to \mathbb{R}^d$,  around a point $x_0$ we use the first-order Taylor expansion:

$$
f(x) \;\approx\; f(x_0) + J_f(x_0)(x - x_0),
$$

where $J_f(x_0)$ is the **Jacobian matrix** of $f$ at $x_0$.

- $J_f(x_0)$ is the local linear approximation of $f$.  
- $\det J_f(x_0)$ measures how $f$ locally **stretches** $(>1$) or  
  **compresses** ($<1$) volumes near $ x_0 $.  
- If $\det J_f(x_0) = 0$, the map is not locally invertible.  

## 4.3 Change of Variables
If $z \sim p_Z(z)$ and $x = f(z)$, then:

$$
p_X(x) = p_Z(f^{-1}(x)) \cdot \left|\det J_{f^{-1}}(x)\right|.
$$

- $\det J_f > 1$: spreads probability mass (expansion).  
- $0 < \det J_f < 1$: concentrates probability mass (compression).  
- $\det J_f = 0$: collapses space → not a valid density.  

# 5 Interpreting the Jacobian Determinant in Probability

The determinant of the Jacobian tells us how **volumes** are scaled locally by the transformation $f$. Since probability mass is preserved under transformation:
$$
p_Z(z)\,dz = p_X(x)\,dx,
$$
the density $p_X(x)$ must adjust according to the Jacobian determinant.

## 5.1 Geometric Meaning
- $\det J_f(x)$ = **local volume scaling factor**.

- If ${} \det J_f(x) = 2 {}$: a small region doubles in volume.  
- If $\det J_f(x) = 0.5$: a small region shrinks to half the volume.  
- If $\det J_f(x) = 0$: the region collapses to lower dimension (area/volume = 0).

---

## 5.2 Effect on Probability Densities

- **Expansion ($\det J_f > 1$)**  
  - Space is stretched.  
  - Density becomes *smaller* (probability mass spread out).  

- **Compression ($0 < \det J_f < 1$)**  
  - Space is squeezed.  
  - Density becomes *larger* (probability mass concentrated).  

- **Collapse ($\det J_f = 0$)**  
  - Space collapses onto a lower dimension.  
  - No valid density can be defined in the same space.

## 5.3 Example
1. $z \sim {N}(0,1)$.  
2. Transform $x = 2z$:  
   - $\det J_f = 2$.  
   - Distribution is wider and shorter (spread out).  

3. Transform $x = 0.5z$:  
   - $\det J_f = 0.5$.  
   - Distribution is narrower and taller (more concentrated).

**Rule of Thumb**  
- $|\det J_f| > 1$: expansion → density thins out.  
- $0 < |\det J_f| < 1$: compression → density thickens.  
- $|\det J_f| = 0$: collapse → not invertible, no density.
