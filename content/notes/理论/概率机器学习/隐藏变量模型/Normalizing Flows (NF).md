---
title: Normalizing Flows (NF)
tags:
  - NF
---
# 1 Change of Variable Theorem

## 1.1 CoV Theorem

We want to push the distribution from $z\to x$ and compute the **density** of a transformed variable. Let $x = f_\theta(z)$, and $z = f_\theta^{-1}(x)$, then the density transforms as:
$$
\begin{aligned}
p_X(x;\theta)
&=
\underbrace{p_Z\big(f_\theta^{-1}(x)\big)}_{\substack{\text{density of the latent }z=f_\theta^{-1}(x)\\\text{(under the prior)}}}
\;\cdot\;
\underbrace{\Bigl|\det\frac{\partial f_\theta^{-1}(x)}{\partial x}\Bigr|}_{\substack{\text{Jacobian det }\text{of the inverse }f_\theta^{-1}}}
\end{aligned}
$$
Together, they define the density of $x$ under the flow

### 1.1.1 **One-dimentaionl special case:** 

For 1D case, the determinant vanishes:
  $$
  p_X(x;\theta) = p_Z(f_\theta^{-1}(x)) \cdot \Big|\frac{d}{dx} f_\theta^{-1}(x)\Big|
  $$
## 1.2 Comparing Base vs. Transformed Distributions

We start with a simple base distribution:
$$z \sim {N}(0,1)$$
and apply a linear invertible transformation $x\to z$, where
$$x = f(z) = 2z + 3$$
By the Change of Variables Theorem:
$$
p_X(x) = p_Z(f^{-1}(x)) \cdot \left|\frac{d}{dx} f^{-1}(x)\right|
$$

We now plot **both distributions** to see how the transformation shifts and stretches the density.

### 1.2.1 Change of Variables: Intuition

Suppose the transformation:  
  $$
  x = \exp(z), \quad z = \ln(x), \quad x > 0
  $$

with base distribution $z \sim {N}(0,1)$. By the change of variables theorem:  
$$
\begin{align} 
p_X(x)  & = p_Z(\ln(x)) \cdot \Big|\frac{d}{dx}\ln(x)\Big| \\
& =  p_Z(\ln(x))\cdot \frac{1}{x}
\end{align}
$$

This produces a **log-normal distribution** for $x$.

# 2 Jacobian Determinant and General Functions

## 2.1 Linear Case
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

- Every region in $\mathbb{R}^2$ is *stretched* in area by a factor $\det(J)=6$.
- Mass is *preserved* during Jacobian transformation

## 2.2 General Nonlinear Function

For a smooth function $f:\mathbb{R}^d \to \mathbb{R}^d$,  around a point $x_0$ we use the first-order Taylor expansion:
$$
f(x) \;\approx\; f(x_0) + J_f(x_0)(x - x_0)
$$
where $J_f(x_0)$ is the **Jacobian matrix** of $f$ at $x_0$.

- $J_f(x_0)$ is the local linear approximation of $f$.  
- $\det J_f(x_0)$ measures how $f$ locally **stretches** $(>1$) or  
  **compresses** ($<1$) volumes near $x_0$.  
- If $\det J_f(x_0) = 0$, the map is not locally invertible.  

## 2.3 Change of Variables

> [!definition]
> If $z \sim p_Z(z)$ and $x = f(z)$, then
> $$
p_X(x) = p_Z(f^{-1}(x)) \cdot \left|\det J_{f^{-1}}(x)\right|.
> $$

- $\det J_f > 1$: spreads probability mass (expansion).  
- $0 < \det J_f < 1$: concentrates probability mass (compression).  
- $\det J_f = 0$: collapses space → (not a valid density).  

# 3 Interpreting the Jacobian Determinant in Probability

The determinant of the Jacobian tells us **how volumes are scaled locally** by the transformation $f$. Since probability mass is preserved under transformation:

> [!theorem|*] probability mass conservation
>$$
\quad p_Z(z)\,dz = p_X(x)\,dx
> $$

the density $p_X(x)$ must adjust according to the Jacobian determinant.
## 3.1 Geometric Meaning

The $\det J_f(x)$ is the **local volume scaling factor**:
- If $\det J_f(x) = 2$: a small region *doubles* in volume.  
- If $\det J_f(x) = 0.5$: a small region *shrinks* to half the volume.  
- If $\det J_f(x) = 0$: the region *collapses* to lower dimension (area/volume = 0)

## 3.2 Effect on Probability Densities

- **Expansion ($\det J_f > 1$)**  
  - Space is stretched.  
  - Density becomes *smaller* (probability mass spread out).  

- **Compression ($0 < \det J_f < 1$)**  
  - Space is squeezed.  
  - Density becomes *larger* (probability mass concentrated).  

- **Collapse ($\det J_f = 0$)**  
  - Space collapses onto a lower dimension.  
  - No valid density can be defined in the same space.

## 3.3 Example
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

# 4 Normalizing Flows

- **Definition:** A Normalizing Flow is a sequence of $K$ invertible transformations:  
  $$
  f = f_K \circ f_{K-1} \circ \cdots \circ f_2 \circ f_1
  $$


![NF](https://lilianweng.github.io/posts/2018-10-13-flow-models/normalizing-flow.png)

- **Change of Variables (composition):**  
  If $x = f_\theta(z)$, then:
  $$
  p_X(x;\theta) = p_Z\!\left(f_\theta^{-1}(x)\right)
  \prod_{i=1}^K \left| \det \frac{\partial f_i^{-1}}{\partial z_i} \right|
  $$

  Equivalently:
  $$
  p_X(x;\theta) = p_Z\!\left(f_\theta^{-1}(x)\right)
  \prod_{i=1}^K \left| \det \frac{\partial f_i}{\partial z_{i-1}} \right|^{-1}
  $$

- **Log-likelihood form (practical for training):**
  $$
  \log p_X(x;\theta)
  = \log p_Z(z_K)
  - \sum_{i=1}^K \log \left| \det \frac{\partial f_i}{\partial z_{i-1}} \right|
  $$
  where $z_K = f_\theta^{-1}(x)$.

---

### 4.1.1 Key Points
- Each transformation $f_i$ must be:
  - **Invertible**
  - Have a **tractable Jacobian determinant**

- The **base distribution** $p_Z$ is usually simple (e.g. standard Gaussian).

- Training maximizes the **exact log-likelihood** of data:
  $$
  \max_\theta \sum_{x \in {D}} \log p_X(x;\theta).
  $$
