Here is the comprehensive teaching summary for Chapter 3, formatted according to your requirements.


# Chapter 3: Special Techniques

In Chapter 2, we determined the electric field and potential by integrating directly over charge distributions (Coulomb's Law). However, in many practical situations, we do not know the charge distribution $\rho$ in advance; instead, we know the potential $V$ on conducting boundaries.

This chapter develops methods to solve for the potential $V$ in regions free of charge, subject to boundary conditions. Once $V$ is found, $\mathbf{E}$ is easily obtained via $\mathbf{E} = -\nabla V$.

## 3.1 Laplace's Equation

### 3.1.1 Introduction and Poisson's Equation
The primary equation for electrostatics is Poisson's equation, derived from Gauss's Law ($\nabla \cdot \mathbf{E} = \rho/\epsilon_0$) and the definition of potential ($\mathbf{E} = -\nabla V$):

> [!definition|3.1] (Poisson's Equation)
> $$ \nabla^2 V = -\frac{\rho}{\epsilon_0} $$

In regions where there is no charge ($\rho = 0$), this simplifies to **Laplace's Equation**. This is the fundamental equation we solve throughout this chapter:

> [!definition|3.2] (Laplace's Equation)
> $$ \nabla^2 V = 0 $$

### 3.1.2 Properties of Solutions (Harmonic Functions)
Solutions to Laplace's equation have two distinct physical properties that provide intuition for how potential behaves in empty space.

**1. The Averaging Property**
The value of the potential at a point $\mathbf{r}$ is the average of the potential values on any spherical surface centered at $\mathbf{r}$ (provided the sphere contains no charge).
$$ V(\mathbf{r}) = \frac{1}{4\pi R^2} \oint_{\text{sphere}} V \, da $$
This implies that Laplace's equation instructs the potential to be as smooth as possible.

**2. No Local Extrema**
As a consequence of the averaging property, $V$ cannot have local maxima or minima within a charge-free region. Extreme values must occur at the boundaries. This makes physical sense: a local maximum would require a positive charge at that point to "push" the potential up, which violates the condition $\rho=0$.

### 3.1.5 Uniqueness Theorems
Before learning techniques to find solutions, we must ensure that a solution found is the *only* solution. If we can simply guess a function that satisfies Laplace's equation and the boundary conditions, these theorems guarantee it is the correct answer.

> [!theorem|3.1] (First Uniqueness Theorem)
> The solution to Laplace's equation in some volume $\mathcal{V}$ is uniquely determined if $V$ is specified on the boundary surface $\mathcal{S}$ of $\mathcal{V}$.

> [!theorem|3.2] (Second Uniqueness Theorem)
> In a volume $\mathcal{V}$ surrounded by conductors and containing a specified charge density $\rho$, the electric field is uniquely determined if the **total charge** on each conductor is specified.

---

## 3.2 The Method of Images

This technique exploits the Uniqueness Theorem. If we have a difficult geometry involving a grounded conductor, we can replace the conductor with fictitious "image" charges placed outside the region of interest. If these images forces the boundary surface to the correct potential (usually $V=0$), the solution inside the region is valid.

### 3.2.1 The Classic Example: Point Charge and Infinite Plane
Consider a point charge $+q$ at a distance $d$ above an infinite grounded conducting plane ($z=0, V=0$). We want $V(x,y,z)$ for $z > 0$.

We place an **image charge** $-q$ at $z=-d$. The potential is the sum of potentials from the real charge and the image charge:

$$
V(x,y,z) = \frac{1}{4\pi\epsilon_0} \left[ \frac{q}{\sqrt{x^2 + y^2 + (z-d)^2}} - \frac{q}{\sqrt{x^2 + y^2 + (z+d)^2}} \right]
$$

This satisfies $\nabla^2 V = 0$ for $z>0$ (since the singularity is at $z=-d$, outside our region) and clearly $V=0$ when $z=0$.

**Induced Surface Charge:**
The actual physical phenomenon is that $+q$ attracts negative charge to the surface of the conductor. The surface charge density $\sigma$ is found using the discontinuity of the field at the boundary:
$$
\sigma = -\epsilon_0 \frac{\partial V}{\partial n} \bigg|_{z=0} = -\epsilon_0 \frac{\partial V}{\partial z} \bigg|_{z=0}
$$
Performing the derivative yields:
$$
\sigma(x,y) = \frac{-qd}{2\pi (x^2 + y^2 + d^2)^{3/2}}
$$

### 3.2.2 Point Charge and Conducting Sphere
For a point charge $q$ at distance $a$ from the center of a grounded conducting sphere of radius $R$, we place an image charge $q'$ inside the sphere at distance $b$. By geometry, to make $V=0$ on the surface $r=R$, we require:

$$
\begin{aligned}
q' &= -\frac{R}{a} q \\[6pt]
b &= \frac{R^2}{a}
\end{aligned}
$$

The potential is then the sum of the potentials of $q$ and $q'$ [Problem 3.8].

---

## 3.3 Separation of Variables

When symmetry does not permit the method of images, we solve Laplace's equation analytically by assuming the solution is a product of functions, each depending on only one coordinate.

### 3.3.1 Cartesian Coordinates
We assume $V(x,y,z) = X(x)Y(y)Z(z)$. Substituting this into $\nabla^2 V = 0$ and dividing by $V$ yields:
$$
\frac{1}{X}\frac{d^2X}{dx^2} + \frac{1}{Y}\frac{d^2Y}{dy^2} + \frac{1}{Z}\frac{d^2Z}{dz^2} = 0
$$
Since each term depends on independent variables, each must be a constant. For example, $\frac{1}{X}\frac{d^2X}{dx^2} = C_1$. The sum of these constants must be zero.

Typically, two constants are chosen to be positive ($k^2, l^2$) and one negative ($-(k^2+l^2)$) to allow for sinusoidal solutions in two dimensions (bounded) and exponential solutions in the third (unbounded/decaying).

**Example Solution (2D Channel):**
For a pipe infinite in $z$, bounded by $y=0, y=a$ (grounded), and $x=0$ (potential $V_0(y)$), extending to $x \to \infty$:
1.  **Separation:** $X(x) = Ae^{-kx}$, $Y(y) = C\sin(ky) + D\cos(ky)$.
2.  **Boundary Conditions:** $V=0$ at $y=0$ implies $D=0$. $V=0$ at $y=a$ implies $\sin(ka)=0$, so $k = n\pi/a$.
3.  **Superposition:** The general solution is a sum over all valid $n$:
    $$ V(x,y) = \sum_{n=1}^{\infty} C_n e^{-n\pi x/a} \sin(n\pi y/a) $$
4.  **Fourier Series:** The coefficients $C_n$ are found by exploiting the orthogonality of sine functions to match the boundary condition at $x=0$.

### 3.3.2 Spherical Coordinates
Assuming azimuthal symmetry (no $\phi$ dependence), $V(r,\theta) = R(r)\Theta(\theta)$. Laplace's equation separates into:
1.  **Radial Equation:** Solutions are powers of $r$.
    $$ R(r) = A r^l + \frac{B}{r^{l+1}} $$
2.  **Angular Equation:** Solutions are Legendre Polynomials $P_l(\cos\theta)$.

> [!proposition|3.1] (General Spherical Solution with Azimuthal Symmetry)
> $$ V(r,\theta) = \sum_{l=0}^{\infty} \left( A_l r^l + \frac{B_l}{r^{l+1}} \right) P_l(\cos\theta) $$

**Coefficients Strategy:**
*   **$B_l$**: Must be zero if the region includes the origin ($r=0$) where $1/r^{l+1}$ blows up.
*   **$A_l$**: Must be zero if the region extends to infinity (unless external field exists), as $r^l$ blows up.
*   **Boundary Conditions:** Use the orthogonality of Legendre polynomials:
    $$ \int_{-1}^{1} P_l(x) P_k(x) \, dx = \int_{0}^{\pi} P_l(\cos\theta) P_k(\cos\theta) \sin\theta \, d\theta = \frac{2}{2l+1} \delta_{lk} $$
    to isolate coefficients $A_l$ or $B_l$.

---

## 3.4 Multipole Expansion

If a charge distribution is localized (not extending to infinity), we often want to know the potential far away ($r \gg$ size of distribution). Instead of an exact integral, we expand $1/\mathcal{r}$ in powers of $1/r$.

### 3.4.1 Approximate Potential at Large Distances
Using the law of cosines on $\mathcal{r} = |\mathbf{r} - \mathbf{r}'|$, the potential can be written as a series of Legendre polynomials:

$$
V(\mathbf{r}) = \frac{1}{4\pi\epsilon_0} \sum_{n=0}^{\infty} \frac{1}{r^{n+1}} \int (r')^n P_n(\cos\alpha) \rho(\mathbf{r}') \, d\tau'
$$
where $\alpha$ is the angle between $\mathbf{r}$ and $\mathbf{r}'$.

This series is the **Multipole Expansion**:
$$
V(\mathbf{r}) = \frac{1}{4\pi\epsilon_0} \left[ \underbrace{\frac{Q}{r}}_{\text{Monopole}} + \underbrace{\frac{\mathbf{p} \cdot \hat{\mathbf{r}}}{r^2}}_{\text{Dipole}} + \underbrace{\frac{1}{r^3} \int \dots}_{\text{Quadrupole}} + \dots \right]
$$

### 3.4.2 The Monopole and Dipole Terms
1.  **Monopole Moment ($Q$):** The total net charge. At very large distances, any point charge distribution looks like a single point charge $Q$.
2.  **Dipole Moment ($\mathbf{p}$):** If the total charge is zero, the dominant term is the dipole.
    $$ \mathbf{p} = \sum_{i} q_i \mathbf{r}'_i \quad \text{or} \quad \mathbf{p} = \int \mathbf{r}' \rho(\mathbf{r}') \, d\tau' $$
    The dipole contribution to the potential is:
    $$ V_{\text{dip}}(\mathbf{r}) = \frac{1}{4\pi\epsilon_0} \frac{\mathbf{p} \cdot \hat{\mathbf{r}}}{r^2} $$

> [!remark|3.1] (Coordinate Independence)
> If the total charge (monopole moment) is non-zero, the dipole moment depends on the choice of origin. If $Q=0$, the dipole moment $\mathbf{p}$ is independent of the origin.

### 3.4.3 Electric Field of a Dipole
Taking the negative gradient of the dipole potential ($V_{\text{dip}}$) in spherical coordinates gives the field of a pure dipole:

> [!proposition|3.2] (Dipole Electric Field)
> $$ \mathbf{E}_{\text{dip}}(r,\theta) = \frac{p}{4\pi\epsilon_0 r^3} (2\cos\theta \, \hat{\mathbf{r}} + \sin\theta \, \hat{\boldsymbol{\theta}}) $$

Or in coordinate-free form:
$$ \mathbf{E}_{\text{dip}}(\mathbf{r}) = \frac{1}{4\pi\epsilon_0 r^3} [3(\mathbf{p} \cdot \hat{\mathbf{r}}) \hat{\mathbf{r}} - \mathbf{p}] $$