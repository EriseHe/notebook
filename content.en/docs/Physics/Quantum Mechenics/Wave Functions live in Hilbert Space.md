---
title:
---


## Hilbert Space

Infinite dimensional **vector space**, denoted as $L^2(a,b)$, of **square-integrable functions** on an interval $[a,b]$.
$$\int_a^b |f(x)|^2 \, dx < \infty$$
Inner product defined as:
$$\langle f | g \rangle = \int_a^b f^*(x)g(x) \, dx$$
Note that:
$$\langle f | g \rangle = \langle g | f \rangle^*$$
$$\langle f | f \rangle = \int_a^b |f(x)|^2 \, dx \geq 0$$
Also:
$$\langle f | f \rangle = 0 \iff f(x) = 0 \quad\text{in the interval}\quad [a,b]$$

---
### Orthonormal Set $\{f_n\}$
$$\langle f_m | f_n \rangle = \int_a^b f_m^*(x)f_n(x)\,dx = \delta_{m,n}$$
**Completeness:** A set of functions $\{f_n\}$ is complete if any $f(x)$ in the Hilbert space can be expanded as:
$$f(x) = \sum_n c_n f_n(x)$$
If $\{f_n\}$ is orthonormal, then:
$$c_n = \langle f_n | f \rangle$$
## Observables and Hermitian Operators

An operator $\hat{Q}$ is Hermitian if:

$$
\hat{Q} = \hat{Q}^{\dagger}
$$

### Properties

- Eigenvalues are **real**.

Expectation value $\langle Q \rangle$:

$$
\langle Q \rangle = \langle \psi | \hat{Q} \psi \rangle = \langle \hat{Q}^{\dagger} \psi | \psi \rangle = \langle \psi | \hat{Q} \psi \rangle^{*}
$$

Thus,

$$
\langle Q \rangle \quad \text{is real}
$$

---

Check inner product:

$$
\langle f| \hat{x} g \rangle = \int_{-\infty}^{\infty} f^*(x) x g(x) \, dx
$$

Complex conjugate clearly shows:

$$
= \int_{-\infty}^{\infty} (x f(x))^* g(x) \, dx = \langle \hat{x}f | g \rangle
$$

Thus,

$$
\hat{x} = \hat{x}^{\dagger} \quad \Rightarrow \quad \text{Hermitian}
$$

---

Evaluate inner product:

$$
\langle f| \hat{p} g \rangle = \int_{-\infty}^{\infty} f^*(x) \left(-i\hbar \frac{d}{dx}\right) g(x) \, dx
$$

Using integration by parts:

$$
= -i\hbar \int_{-\infty}^{\infty} dx \frac{d}{dx}(f^*(x)g(x)) + i\hbar \int_{-\infty}^{\infty} dx \frac{df^*(x)}{dx} g(x)
$$

Boundary term vanishes:

$$
= -i\hbar [f^*(x)g(x)]_{-\infty}^{\infty} + \langle \hat{p} f | g \rangle, \quad \text{with boundary term = 0}
$$

Thus:

$$
\langle f| \hat{p} g \rangle = \langle \hat{p} f | g \rangle \quad \Rightarrow \quad \hat{p} = \hat{p}^{\dagger}, \quad \text{Hermitian!}
$$

---
## Observables and Hermitian Operators

### Hermitian Operator:
An operator $\hat{Q}$ is Hermitian if:

$$\hat{Q} = \hat{Q}^{\dagger}$$

### Spectrum of $\hat{Q}$
- **Spectrum:** The collection of all eigenvalues $q \in \mathbb{R}$.

Eigenvalue equation:

$$\hat{Q}\Psi = q\Psi$$

where:
- $q$ is an **eigenvalue**.
- $\Psi$ represents **eigenvectors**, **eigenstates**, or **eigenfunctions**.

---

### Standard Deviation:
The uncertainty (standard deviation) $\sigma$ of an observable $\hat{Q}$ is given by:

$$\sigma^2 = \langle \Psi | \hat{Q}^2 \Psi \rangle - \langle \Psi | \hat{Q} \Psi \rangle^2$$

If $\Psi$ is an eigenfunction of $\hat{Q}$:

- Eigenvalue equations:

$$\hat{Q}\Psi = q\Psi, \quad \hat{Q}^2 \Psi = q^2 \Psi$$

Then, the standard deviation becomes:

$$\langle \Psi | \hat{Q}^2 \Psi \rangle = q^2 \langle \Psi | \Psi \rangle = q^2$$
$$\langle \Psi | \hat{Q} \Psi \rangle^2 = (q \langle \Psi | \Psi \rangle)^2 = q^2$$

Thus:

$$\sigma^2 = q^2 - q^2 = 0$$

--- 
### Physical Interpretation:
This means that if we prepare a quantum state to be an eigenstate/eigenvector/eigenfunction of $\hat{Q}$, then a measurement of $\hat{Q}$ will return a **definite value**. In this case, the state $|\Psi\rangle$ is called a **determinate state**.
##### Example

For $\hat{H}\Psi = E\Psi$, we have:
- $E$ is an eigenvalue (energy level) belonging to the set $\{ E \}$, which represents **all possible energies** of the system.
- $\Psi$ are the corresponding **eigenstates**/**eigenfunctions** of definite energy (**stationary states**).

---
## Example: Energy Eigenvalue Equation

The Schrödinger equation for a quantum system is given by:

$$\hat{H}\Psi = E\Psi$$

Where:
- $E$ is an eigenvalue (energy level) belonging to the set $\{ E \}$, representing **all possible energies** of the system.
- $\Psi$ represents the corresponding **eigenstates** or **eigenfunctions** of definite energy, also known as **stationary states**.

---

## Particle on a Ring of Radius $R$

Coordinate transformation:
$$x = R \cdot \phi, \quad (\text{with } \phi \text{ periodic, } \phi \sim \phi + 2\pi)$$

### Momentum Operator in Circular Coordinates:

$$\hat{p} = -i\hbar\frac{d}{dx} = -i\hbar\frac{\partial}{R\partial\phi} = \frac{\hbar}{R}\left(-i\frac{\partial}{\partial\phi}\right)$$

Check if $\hat{Q}$ is Hermitian:

$$\langle f|\hat{Q}g \rangle \stackrel{?}{=} \langle \hat{Q}f | g \rangle$$

### Hermiticity Check for Operator $\hat{x}$:

$$\langle f|\hat{x}g \rangle = \int_{-\infty}^{\infty}f^*(x)xg(x)\,dx = \langle \hat{x}f|g \rangle \quad \Rightarrow \quad \hat{x} = \hat{x}^{\dagger}$$

Thus, $\hat{x}$ is Hermitian.

---

### Eigenvalues and Eigenfunctions (Periodic Boundary Conditions):
- Functions on a ring of radius $R$: periodic with $\phi$:
$$f(\phi+2\pi) = f(\phi)$$
$$g(\phi+2\pi) = g(\phi)$$
Eigenvalue equation for the operator $\hat{Q}$:
$$\hat{Q}f(\phi)=q f(\phi)$$
Solve for $f(\phi)$:
$$-i\frac{d f(\phi)}{d\phi} = q f(\phi) \quad\Rightarrow\quad f(\phi) = A e^{i q \phi}$$

---
### Normalization and Quantization of $q$:

From periodic boundary condition:

$$f(\phi + 2\pi) = A e^{i q (\phi+2\pi)} = A e^{i q \phi} e^{i q 2\pi} = f(\phi)$$

Thus,

$$e^{i q 2\pi} = 1 \quad\Rightarrow\quad q = 0, \pm1, \pm2, \pm3, \dots$$

### Normalization condition:

$$\int_0^{2\pi} d\phi |f(\phi)|^2 = \int_0^{2\pi} d\phi |A|^2 = |A|^2 \cdot 2\pi = 1$$

Thus,

$$|A|^2 = \frac{1}{2\pi} \quad\Rightarrow\quad A = \frac{1}{\sqrt{2\pi}}$$

### Final Set of Eigenfunctions and Eigenvalues:

$$f_q(\phi) = \frac{1}{\sqrt{2\pi}} e^{i q \phi}, \quad q = 0, \pm1, \pm2, \dots$$
### Eigenvalues for Momentum $\hat{p}$:

$$\frac{\hbar}{R}q = 0, \pm\frac{\hbar}{R}, \pm\frac{2\hbar}{R}, \pm\frac{3\hbar}{R}, \dots$$

---
Here's the requested content neatly formatted in Markdown with LaTeX notation, using the `{align}` environment for clarity:

---

## Eigenfunctions of a Hermitian Operator

$$\hat{Q}\psi = q\psi$$

**Discrete Spectra:**
$$\hat{Q} f = q f$$

1. Eigenvalues $q \in \mathbb{R}$.
2. For two eigenfunctions $f$ and $g$ corresponding to distinct eigenvalues $q$ and $q'$, we have:
$$\hat{Q}f = qf, \quad \hat{Q}g = q'g,\quad q \neq q'$$

Then:
$$\langle f | \hat{Q} g \rangle = \langle \hat{Q}f|g \rangle$$

But also:
$$q'\langle f|g \rangle = q\langle f|g\rangle \implies (q - q')\langle f|g\rangle = 0$$

Thus, for distinct eigenvalues:
$$\langle f|g\rangle = 0$$

---

## Continuous Spectra

Consider eigenfunctions of the momentum operator on the real line $(-\infty, +\infty)$:

$$-i\hbar \frac{d}{dx}f_p(x) = p\,f_p(x)$$

Eigenfunctions have the form:
$$f_p(x) = A e^{\frac{i p x}{\hbar}}$$

Note that these eigenfunctions are not square-integrable:
$$\int_{-\infty}^{\infty}|f_p(x)|^2\,dx = |A|^2\int_{-\infty}^{\infty}\left|e^{\frac{ipx}{\hbar}}\right|^2dx = \infty$$

Hence, the eigenfunctions corresponding to continuous eigenvalues are not square-integrable functions.
