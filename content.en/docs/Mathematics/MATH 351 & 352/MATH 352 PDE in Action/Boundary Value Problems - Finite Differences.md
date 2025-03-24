---
title: 边值问题的有限差分
weight: "9"
---


## 1. Approximation of Boundary Value Problem

### 1.1 Problem Set-up: String with Fixed Endpoints

One can write:
$$
\begin{align}
-\frac{d^2u}{dx^2} &= f(x), \quad x \in (0,1) \\
u(0) &= \alpha, \quad \frac{du}{dx}(0) = \beta
\end{align}
$$

From Math 212: Denote $w = \frac{du}{dx}$. Then, $\frac{dw}{dx} = f(x)$

So, $\frac{d}{dt} = \begin{bmatrix} 0 & 0 \\ 1 & 0 \end{bmatrix} \begin{bmatrix} w \\ u \end{bmatrix}$

#### Definition (BVP)
A boundary-value problem (BVP):
$$
\begin{align}
-\mu\frac{d^2u}{dx^2} &= f(x), \quad x\in (0,1), \quad \mu > 0 \\
u(0) &= \alpha, \quad u(1) = \beta
\end{align}
$$

### 1.2 Example: Poisson Equation
$$
\begin{align}
-\left(\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2}\right) &= f(x,y) \\
u|_{\text{boundary of }\Omega} &= 0
\end{align}
$$

One can further write:
$$
\left(\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2}\right) = \Delta u, \quad \text{where}
$$

$\Delta = \nabla^2 u = \sum_{i=1}^{n} \frac{\partial^2}{\partial x_i^2}$, $\Delta =$ Laplace operator, divergence of gradient.

### 1.3 Back to the String Example: How can we get a BVP?

$$J(u) = \frac{1}{2}\int_0^1 \mu\left(\frac{du}{dx}\right)^2 dx - \int_0^1 f \cdot u \, dx \quad \text{(Energy of string)}$$

Functional: function of a function.

Boundary condition: $u(0) = u(1) = 0$.

In nature, things tend to minimize energy: $\min J(u)$.

Take gradient:
$$\lim_{\varepsilon \to 0} \frac{J(u + \varepsilon v) - J(u)}{\varepsilon} = 0, \quad \varepsilon \in \mathbb{R}$$
$v$: arbitrary function s.t. $v(0) = v(1) = 0$.

Numerator:
$$
\begin{align}
&\frac{1}{2}\int_0^1 \mu\left(\frac{du}{dx} + \varepsilon\frac{dv}{dx}\right)^2 dx - \int_0^1 f(u+\varepsilon v) \, dx - \frac{1}{2}\int_0^1 \mu\left(\frac{du}{dx}\right)^2 dx - \int_0^1 f \cdot u \, dx \\
&= \frac{1}{2}\int_0^1 \mu\left(\frac{du}{dx}\right)^2 dx + \frac{1}{2} \cdot 2\varepsilon \int_0^1 \mu \frac{du}{dx} \cdot \frac{dv}{dx} \, dx + \frac{1}{2}\varepsilon^2 \int_0^1 \mu\left(\frac{dv}{dx}\right)^2 dx \\
&\quad - \int_0^1 f \cdot u \, dx - \varepsilon\int_0^1 f \cdot v \, dx - \frac{1}{2}\int_0^1 \mu\left(\frac{du}{dx}\right)^2 dx - \int_0^1 f \cdot u \, dx \\
&= \varepsilon \int_0^1 \mu \frac{du}{dx} \cdot \frac{dv}{dx} \, dx + \frac{1}{2}\varepsilon^2 \int_0^1 \mu\left(\frac{dv}{dx}\right)^2 dx - \varepsilon\int_0^1 f \cdot v \, dx
\end{align}
$$

Then,
$$\frac{J(u+\varepsilon v) - J(u)}{\varepsilon} = \int_0^1 \mu \frac{du}{dx} \cdot \frac{dv}{dx} \, dx + \frac{1}{2} \varepsilon \int_0^1 \mu\left(\frac{dv}{dx}\right)^2 dx - \int_0^1 f \cdot v \, dx$$

The limit:
$$\lim_{\varepsilon \to 0} \frac{J(u+\varepsilon v) - J(u)}{\varepsilon} = \int_0^1 \mu \frac{du}{dx} \cdot \frac{dv}{dx} \, dx - \int_0^1 f \cdot v \, dx = 0$$

An equilibrium solution.

#### Variational/Weak:
$$\int_0^1 \mu \frac{du}{dx} \cdot \frac{dv}{dx} \, dx - \int_0^1 f \cdot v \, dx = 0$$

We get the solution from a perturbed system.

Now integration by parts:
$$
\begin{align}
\int_0^1 \mu \frac{du}{dx} \cdot \frac{dv}{dx} \, dx &= \mu\left[\frac{du}{dx}v\right]_0^1 - \mu\int_0^1 \frac{d^2u}{dx^2} v \, dx \\
&= -\mu\int_0^1 \frac{d^2u}{dx^2} v \, dx
\end{align}
$$

Since $v(0) = v(1) = 0$

$$\frac{d}{dx}\left(\frac{du}{dx}\right) = \frac{d^2u}{dx^2}$$

$$\int \frac{dv}{dx} \, dx = v$$

So, the variational becomes:
$$-\mu\int_0^1 \frac{d^2u}{dx^2} v \, dx - \int_0^1 f \cdot v \, dx = 0$$

$$-\int_0^1 \left(\mu\frac{d^2u}{dx^2} + f\right) \cdot v \, dx = 0$$

We want it to be true $\forall v$. So, it must be:
$$\mu\frac{d^2u}{dx^2} + f = 0$$

$$
\begin{align}
-\mu\frac{d^2u}{dx^2} &= f \\
u(0) &= u(1) = 0
\end{align}
$$
(BVP).

Assumption: $u$ is twice differentiable.

### 1.4 Two Ways to Formulate a BVP:

1. Find $u$ s.t. $\forall v$ with $v(0) = v(1) = 0$, 
   $$\int_0^1 \mu \frac{du}{dx} \cdot \frac{dv}{dx} \, dx = \int_0^1 f \cdot v \, dx$$
   
   $\Rightarrow$ $u$ only needs to be once differentiable
   
   $\Rightarrow$ Finite Element

2. Find $u$ s.t.
   $$
   \begin{align}
   -\mu\frac{\partial^2 u}{\partial x^2} &= f, \quad x \in (0,1) \\
   u(0) &= u(1) = 0
   \end{align}
   $$
   
   $\Rightarrow$ requires $u$ to be twice differentiable
   
   $\Rightarrow$ Finite Difference

## 2. Finite Difference

### 2.1 The BVP:
$$
\begin{align}
-\mu\frac{d^2u}{dx^2} &= f, \quad x \in (0,1) \\
u(0) &= u(1) = 0
\end{align}
$$

$$0 = x_0 < x_1 < x_2 < x_3 < \cdots < x_N = 1$$

$$-\mu\frac{d^2u}{dx^2}(x_i) = f(x_i)$$

Use Taylor's formula:
$$
\begin{align}
u(x_{i+1}) &= u(x_i) + \frac{du}{dx}(x_i)\Delta x + \frac{1}{2}\frac{d^2u}{dx^2}(x_i)\Delta x^2 + \cdots \\
u(x_{i-1}) &= u(x_i) - \frac{du}{dx}(x_i)\Delta x + \frac{1}{2}\frac{d^2u}{dx^2}(x_i)\Delta x^2 + \cdots
\end{align}
$$

Then,
$$
\begin{align}
u(x_{i+1}) + u(x_{i-1}) &= 2u(x_i) + \frac{d^2u}{dx^2}(x_i)\Delta x^2 + \frac{1}{12}\frac{d^4u}{dx^4}(x_i)\Delta x^4 + \mathcal{O}(||\Delta x||^6) \\
\frac{d^2u}{dx^2}(x_i)\Delta x^2 &= u(x_{i+1}) + u(x_{i-1}) - 2u(x_i) - \frac{1}{12}\frac{d^4u}{dx^4}(x_i)\Delta x^4 + \mathcal{O}(||\Delta x||^6)
\end{align}
$$

$$\frac{d^2u}{dx^2}(x_i) = \frac{u(x_{i+1}) + u(x_{i-1}) - 2u(x_i)}{\Delta x^2} - \frac{1}{12}\frac{d^4u}{dx^4}(x_i)\Delta x^2 + \mathcal{O}(||\Delta x||^2)$$

So, second order derivative approximation:
$$\frac{d^2u}{dx^2}(x_i) \approx \frac{u(x_{i+1}) + u(x_{i-1}) - 2u(x_i)}{\Delta x^2}$$

Denote $u_i = u(x_i)$ and $f_i = f(x_i)$. Then,
$$-\mu\frac{d^2u}{dx^2}(x_i) = -\mu\frac{u_{i+1} + u_{i-1} - 2u_i}{\Delta x^2} = f_i$$

Then, we form a linear system $Au = f$, where $A$ is given by:

$$A = \frac{\mu}{\Delta x^2}
\begin{bmatrix}
2 & -1 & 0 & & \\
-1 & \ddots & \ddots & & \\
0 & \ddots & \ddots & \ddots & \\
 & & \ddots & \ddots & -1 \\
 & & & -1 & 2
\end{bmatrix}
$$

### 2.2 What is the Accuracy of FD?

1. $Au = f$ is solvable b/c $A$ is positive definite $(x^TAx > 0 \quad \forall x \neq 0)$
2. Since $A$ is symmetric, all eigenvalues of $A$ are real. Further, since $A$ is positive definite, all eigenvalues are positive. So, $A$ is non-singular.
3. $\frac{\lambda_{min}}{\lambda_{max}} \propto \Delta x$
4. $Au = f$. But $Au_{ex} \neq f$.
   $$Au_{ex} = \left[\frac{d^2u}{dx^2}(x_i)\right] + T_i$$
   where $T_i = C(x_i)\Delta x^2$. From previously noted,
   $$C(x_i) = C\frac{d^4u}{dx^4}(x_i)$$

So, one can write: $Au_{ex} = f + T$.

Define $e = u_{ex} - u$. Then, $Ae = T$.

$$e = A^{-1}T$$

$$||e|| = ||A^{-1}T|| \leq ||A^{-1}|| \cdot ||T||$$

So, to have convergence we need:
$$||A^{-1}|| < \infty \quad \text{and} \quad ||T|| \to 0 \quad \text{as} \quad \Delta x \to 0$$

As shown before, $\frac{\lambda_{min}}{\lambda_{max}} \propto \Delta x$, we know $||A^{-1}||$ is bound regardless of $\Delta x$.

Since $||T|| \sim \Delta x^2$, $||T|| \to 0$ as $\Delta x \to 0$. Then, the method is consistent.

Further, we have $||e|| \to 0$ as $\Delta x \to 0$.

So, this method is convergent.

## 3. Advection-Diffusion Equation

### 3.1
$$
\begin{align}
-\mu\frac{\partial^2 u}{\partial x^2} + \beta\frac{\partial u}{\partial x} &= f \\
\text{diffusion} \quad & \text{advection}
\end{align}
$$

$$u(0) = u_L, \quad u(1) = u_R$$

Discretization:

By Taylor's Expansion:
$$u(x_{j+1}) = u(x_j) + \frac{\partial u}{\partial x}(x_j)\Delta x + \frac{1}{2}\frac{\partial^2 u}{\partial x^2}(x_j)\Delta x^2 - \frac{1}{6}\frac{\partial^3 u}{\partial x^3}(x_j)\Delta x^3 + \frac{1}{12}\frac{\partial^4 u}{\partial x^4}(x_j)\Delta x^4 + \mathcal{O}(||x||^5)$$

$$\frac{\partial u}{\partial x}(x_j)\Delta x = u(x_{j+1}) - u(x_j) + \frac{1}{2}\frac{\partial^2 u}{\partial x^2}(x_j)\Delta x^2$$

$$\frac{\partial u}{\partial x}(x_j) = \frac{u_{j+1} - u_j}{\Delta x} + \frac{1}{2}\frac{\partial^2 u}{\partial x^2}(x_j)\Delta x$$

Can we do better?

$$u(x_{j-1}) = u(x_j) - \frac{\partial u}{\partial x}(x_j)\Delta x + \frac{1}{2}\frac{\partial^2 u}{\partial x^2}(x_j)\Delta x^2 - \frac{1}{6}\frac{\partial^3 u}{\partial x^3}(x_j)\Delta x^3 + \frac{1}{12}\frac{\partial^4 u}{\partial x^4}(x_j)\Delta x^4 + \mathcal{O}(||x||^5)$$

(1) - (2):
$$u(x_{j+1}) - u(x_{j-1}) = 2\frac{\partial u}{\partial x}(x_j)\Delta x + \frac{1}{3}\frac{\partial^3 u}{\partial x^3}(x_j)\Delta x^3 + \mathcal{O}(||\Delta x||^5)$$

Then,
$$\frac{\partial u}{\partial x}(x_j) = \frac{u(x_{j+1}) - u(x_{j-1})}{2\Delta x} - \frac{1}{6}\frac{\partial^3 u}{\partial x^3}(x_j)\Delta x^2 + \mathcal{O}\left(\frac{||\Delta x||^4}{2}\right)$$

Final numerical solution:
$$-\mu\frac{u_{i+1} - 2u_i + u_{i-1}}{\Delta x^2} + \beta\frac{u_{i+1} - u_{i-1}}{2\Delta x} = f_j$$

$$\sim \mathcal{O}(\Delta x^2)$$

### 3.2 A Specific Example
$$
\begin{align}
-\mu\frac{\partial^2 u}{\partial x^2} + \beta\frac{\partial u}{\partial x} &= 0 \\
u(0) &= 0 \\
u(a) &= 1
\end{align}
$$

$$u_{ex} = \frac{e^{\frac{\beta}{\mu}x} - 1}{e^{\frac{\beta}{\mu}} - 1}$$

$$\frac{|\beta|}{\mu} >> 1 : \text{convection dominated problem}$$

Numerical experiment shows that when $|\beta|$ is large, the numerical solution will not be consistent anymore. What's wrong?

#### Mathematical Explanation:
$$-\mu\frac{u_{i+1} - 2u_i + u_{i-1}}{\Delta x^2} + \beta\frac{u_{i+1} - u_{i-1}}{2\Delta x} = 0$$

$$\left(-\frac{\mu}{\Delta x^2} + \frac{\beta}{2\Delta x}\right)u_{i+1} + \left(\frac{2\mu}{\Delta x^2}\right)u_i - \left(\frac{\mu}{\Delta x^2} + \frac{\beta}{2\Delta x}\right)u_{i-1} = 0$$

Difference equation: guess solution: $u_j = C\rho^j$.

Then,
$$\left(-\frac{\mu}{\Delta x^2} + \frac{\beta}{2\Delta x}\right)C\rho^{j+1} + \left(\frac{2\mu}{\Delta x^2}\right)C\rho^j - \left(\frac{\mu}{\Delta x^2} + \frac{\beta}{2\Delta x}\right)C\rho^{j-1} = 0$$

$$\left(-\frac{\mu}{\Delta x^2} + \frac{\beta}{\Delta x}\right)\rho^2 + \left(\frac{2\mu}{\Delta x^2}\right)\rho - \left(\frac{\mu}{\Delta x^2} + \frac{\beta}{2\Delta x}\right) = 0$$

We can find $\rho_1$ and $\rho_2$ from this equation. Then,
$$u_j = C_1\rho_1 + C_2\rho_2 \quad \text{linear combination}$$

Note $\rho_1, \rho_2$ are solutions.

$$\rho_1\rho_2 = \frac{-\left(\frac{\mu}{\Delta x^2} + \frac{\beta}{2\Delta x}\right)}{\left(-\frac{\mu}{\Delta x^2} + \frac{\beta}{2\Delta x}\right)} = \frac{1 + \frac{\beta\Delta x}{2\mu}}{1 - \frac{\beta\Delta x}{2\mu}}$$

Péclet, Pe:

If $\frac{|\beta|\Delta x}{2\mu} > 1$, $\rho_1\rho_2 < 0$, and then we have oscillating solutions.

### 3.3 Another Method: Upwind Method

Information flow

Our previous computation relies on symmetry. However, there is a clear physical information flow. So, this problem is asymmetric in reality. We don't want as fancy as $\sim \mathcal{O}(\Delta x^2)$ solutions, but we can use a $\sim \mathcal{O}(\Delta x)$ method.

$$\beta\frac{\partial u}{\partial x} \approx \beta\frac{u_i - u_{i-1}}{\Delta x} \quad (\beta > 0) \quad \text{(upwind)}$$

Now, let's show (upwind) is stable.

$$\beta\frac{u_i - u_{i-1}}{\Delta x} = \beta\frac{u_{i+1} - u_{i-1}}{2\Delta x} - \beta\frac{u_{i+1}}{2\Delta x} - \beta\frac{2u_i}{2\Delta x} + \beta\frac{u_{i-1}}{2\Delta x}$$

$$= \beta\frac{u_{i+1} - u_{i-1}}{2\Delta x} - \frac{\beta\Delta x}{2} \cdot \frac{u_{i+1} - 2u_i + u_{i-1}}{\Delta x^2}$$

Central mean $\quad$ Approx. of 2nd derivative

So, we can consider the equation:
$$-\left(\mu + \frac{|\beta|\Delta x}{2}\right)\frac{\partial^2 u}{\partial x^2} + \beta\frac{\partial u}{\partial x} = 0$$

Apply a central approximation:
$$-\mu\frac{u_{i+1} - 2u_i + u_{i-1}}{\Delta x^2} + \beta\frac{u_{i+1} - u_{i-1}}{2\Delta x} = 0$$

Upwind solution of the original problem.

Central (Perturbed) = Upwind (Original).

Recall Péclet: $Pe = \frac{|\beta|\Delta x}{2\mu}$. Then, $\mu^* = \mu(1 + Pe)$.

Péclet of this perturbed system:
$$Pe^* = \frac{|\beta|\Delta x}{2\mu^*} = \frac{|\beta|\Delta x}{2\mu(1+Pe)} = \frac{Pe}{1+Pe} < 1 \quad \forall |\beta| \text{ and } \Delta x$$

So, this upwind method is always stable.

Consistency: when $\Delta x \to 0$, $\mu^* \to \mu$.

For the perturbed system, we have a 2nd order approach, but with the original problem, it is only a 1st order method.

### 3.4 Design a Better Method
$$\mu^{smart} = \mu(1 + \Phi(Pe))$$

s.t.
1. $\Phi(Pe) \to 0 \quad \text{as} \quad \Delta x \to 0$
2. $Pe^{smart} = \frac{|\beta|\Delta x}{2\mu^{smart}} < 1$

Our upwind method takes $\Phi(Pe) = Pe \sim \mathcal{O}(\Delta x)$. But can we take some $\Phi(Pe) \sim \mathcal{O}(\Delta x^2)$?

$\Rightarrow$ Scharfetter-Gummel Method: $\Phi(Pe) = Pe - 1 + \frac{2Pe}{e^{2Pe} - 1}$

$\Phi(Pe) \uparrow$

$\Phi(Pe) = Pe$

$\Phi(Pe) \sim \mathcal{O}(\Delta x)$

The worst case order of Scharfetter-Gummel is $\sim \mathcal{O}(\Delta x^2)$.

Scharfetter-Gummel is also a special $\Phi(Pe)$ that produces exact solutions.

## 4. 2D Problem
$$
\begin{align}
-\mu\Delta u + \vec{\beta} \cdot \nabla u &= f \\
u(\partial\Omega) &= \text{data}
\end{align}
$$

Write it out:
$$
\begin{align}
-\mu\left(\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2}\right) + \beta_x\frac{\partial u}{\partial x} + \beta_y\frac{\partial u}{\partial y} &= f(x,y) \\
u(\partial\Omega) &= d
\end{align}
$$

### 4.1 Only Consider Diffusion. Turn off Wind:

To form a system: $(i,j) \to k$.

$Au = b$.

$A$ is symmetric, SPD.

### 4.2 Turn on the Wind. Upwind
With upwind, the pts are not good.

## 5. Parabolic Problems
$$
\begin{align}
\frac{\partial u}{\partial t} - \mu\frac{\partial^2 u}{\partial x^2} &= f, \quad x \in (0,1) \quad 0 < t < T\\
u(0,t) &= u_L(t), \quad u(1,t) = u_R(t) \\
u(x, t=0) &= u_0(x)
\end{align}
$$

Discretization along $x$: semi-discretization: $u_j(t) \approx u(x_j, t)$.
$$\frac{du_j}{dt} - \mu\frac{u_{j+1}(t) - 2u_j(t) + u_{j-1}(t)}{\Delta x^2} = f_j(t) = f(x_j, t)$$

So, we form system $Au = f$.

$$A = \frac{\mu}{\Delta x^2}\text{Triad}(-1, 2, 1), \quad u(t) = \begin{bmatrix} u_1(t) \\ \vdots \\ u_n(t) \end{bmatrix}, \quad f(t) = \begin{bmatrix} f_1(t) \\ \vdots \\ f_n(t) \end{bmatrix}$$

Then, we have a system of ODE:
$$\frac{du}{dt} - Au = f$$

We can now do time discretization and use ODE methods.

1. EE/FE:
   $$u^n = u(t^n), \quad \left.\frac{du}{dt}\right|_{t^n} \approx \frac{u^{n+1} - u^n}{\Delta t} = f^n + Au^n$$
   
   $$u^{n+1} = u^n + \Delta t Au^n + \Delta t f^n = (I + \Delta t A)u^n + \Delta t f^n = (I + \Delta t A)^n u_0 + \Delta t f^n$$

2. IE/BE:
   $$\left.\frac{du}{dt}\right|_{t^n} = \frac{u^n - u^{n-1}}{\Delta t} = f^n + Au^n$$
   
   $$u^n - u^{n-1} = \Delta t f^n + \Delta t Au^n$$
   
   $$u^n - \Delta t Au^n = \Delta t f^n + u^{n-1}$$
   
   $$(I - \Delta t A)u^n = u^{n-1} + \Delta t f^n \quad \leftarrow \text{A linear system to solve}$$

$I - \Delta t A$ is SPD and $A$ is time-independent. So, we may favor direct method (as we can store $A = LU$ and reuse it) over iterative methods.

To discuss stability, set $f = 0$:

1. EE is conditionally stable:
   Let $\lambda_i$ be eigenvalues of $A$.
   
   $$\Delta t < \frac{2}{|\lambda_i|} \quad \text{for stability}$$
   
   Further, $A = \frac{\mu}{\Delta x^2}\text{triad}(1, -2, 1)$, $\rho(A) \sim \frac{c}{\Delta x^2}$. So,
   
   $$\Delta t < \frac{2}{|\lambda_i|} \leq \frac{2}{\rho(A)} = \frac{2}{c}\Delta x^2$$
   
   So, if we decrease $\Delta x$ by 2, to have stability
   
   $$\Delta t_{new} < \frac{2}{c}\left(\frac{\Delta x}{2}\right)^2 = \frac{\Delta t_{old}}{4} \quad \Rightarrow \text{we need finer intervals for time}$$

2. IE is unconditionally stable.

3. Def. ($\theta$ Methods).
   $$\frac{u^{n+1} - u^n}{\Delta t} = \theta Au^{n+1} + (1-\theta)Au^n + \theta f^{n+1} + (1-\theta)f^n, \quad \theta \in [0,1]$$
   
   EE: $\theta = 0 \quad \mathcal{O}(\Delta t) \quad$ explicit $\quad$ conditional stability
   
   IE: $\theta = 1 \quad \mathcal{O}(\Delta t) \quad$ implicit $\quad$ unconditional stability
   
   CN: $\theta = \frac{1}{2} \quad \mathcal{O}(\Delta t^2) \quad$ implicit $\quad$ unconditional stability

Suppose $f = 0$. Then,
$$\frac{u^{n+1} - u^n}{\Delta t} = \theta Au^{n+1} + (1-\theta)Au^n$$

$$u^{n+1} - u^n = \Delta t \theta Au^{n+1} + \Delta t(1-\theta)Au^n$$

$$(I - \Delta t \theta A)u^{n+1} = (I + \Delta t(1-\theta)A)u^n$$

We essentially solve a linear system in each iteration.

### 5.1 Thm (Stability and Order of $\theta$ Methods)
- $\theta$ methods are unconditionally stable for $\theta \geq \frac{1}{2}$. Otherwise, it is conditionally stable for $\theta < \frac{1}{2}$ and the stability condition for parabolic problem is $\Delta t < c\Delta x^2$.
- Meanwhile, the method is order 1 for $\theta \neq \frac{1}{2}$ and order 2 for $\theta = \frac{1}{2}$.
- Although the $\theta$ method is 2nd order in space, the order of error is dominant and determined by the order in time.
- CN is the most vulnerable to lack of regularity and sensitive to non-smoothness.

## 6. Hyperbolic Problems

### 6.1
$
\begin{align}
\frac{\partial u}{\partial t} + \alpha\frac{\partial u}{\partial x} &= 0, \quad \alpha > 0, \text{ constant} \\
u(x,0) &= u_0(x)
\end{align}
$

Exact solution: $u(x,t) = u_0(x - \alpha t)$

### 6.2 Example: Modeling Density of Pollutant
$u$: pollutant, $x$: displacement of boat, $t$: time.

$\frac{du}{dx} = 0 \quad \text{(i.e., pollutant and boat moves at the same velocity)}$

$\frac{dx}{dt} = a \quad \text{(i.e., boat moves at velocity of $a$)}$

$x(t) = x_0 + at \Rightarrow$ characteristic curves

$u(x,t) = u_0(x-at)$. Solution to $\begin{cases} \frac{dx}{dt} = a \\ x(0) = x_0 \end{cases}$

Consider $u(x(t),t)$: $\frac{du}{dt} = \frac{\partial u}{\partial t} + \frac{\partial u}{\partial x} \cdot \frac{dx}{dt} = \frac{\partial u}{\partial t} + a \cdot \frac{\partial u}{\partial x} = 0$.

### 6.3 Similar Problems:
1. Conservation law
   $\frac{\partial u}{\partial t} + \frac{\partial q(u)}{\partial x} = 0$
   
   $q(u) = v(u) \cdot u$ with $v = v_{max}\left(1 - \frac{u}{u_{max}}\right)$
   
   $\Rightarrow \frac{\partial u}{\partial t} + v_{max}\left(1 - \frac{u}{u_{max}}\right)\frac{\partial u}{\partial x} = 0$. Models the density of traffic.
   
   $= \alpha$, but $\alpha$ is not constant here.

2. Heat equation
   $\frac{\partial^2 u}{\partial t^2} - v^2\frac{\partial^2 u}{\partial x^2} = f$
   
   Define $w_1 = \frac{\partial u}{\partial x}$ and $w_2 = \frac{\partial u}{\partial t}$.
   
   $
   \begin{align}
   \frac{\partial w_1}{\partial t} - v^2\frac{\partial w_2}{\partial x} &= f \\
   \frac{\partial w_2}{\partial t} - \frac{\partial w_1}{\partial x} &= 0 \quad \frac{\partial^2 u}{\partial x \partial t} = \frac{\partial^2 u}{\partial t \partial x}
   \end{align}
   $
   
   Define $w = \begin{bmatrix} w_1 \\ w_2 \end{bmatrix}$, $A = \begin{bmatrix} 0 & -v^2 \\ -1 & 0 \end{bmatrix}$
   
   Then, the original equation becomes a system:
   $\frac{\partial w}{\partial t} + A\frac{\partial w}{\partial x} = 0$
   
   The eigenvalues of $A$: $\lambda_{1,2} = \pm iv$. $\Rightarrow$ Diagonalizable.

Find the numerical solution.

$\frac{\partial u}{\partial t}\bigg|_{t^{n+1}, x_j} = \frac{u_j^{n+1} - u_j^n}{\Delta t}$

$\alpha\frac{\partial u}{\partial x}\bigg|_{t^{n+1}, x_j} = \frac{\alpha}{2} \cdot \frac{u_{j+1}^{n+1} - u_{j-1}^{n+1}}{\Delta t}$

- With BE-C:
  $\frac{u_j^{n+1} - u_j^n}{\Delta t} + \frac{\alpha}{2} \cdot \frac{u_{j+1}^{n+1} - u_{j-1}^{n+1}}{\Delta t} = 0$
  
  $
  \Rightarrow
  \begin{bmatrix}
  \frac{1}{\Delta t} & \frac{\alpha}{2\Delta t} & 0 & 0 & \cdots \\
  -\frac{\alpha}{2\Delta t} & \frac{1}{\Delta t} & \frac{\alpha}{2\Delta t} & 0 & \cdots \\
  & & \ddots & &
  \end{bmatrix}
  $

- With FE-C: unconditionally unstable. NEVER USE IT!
  $\frac{u_j^{n+1} - u_j^n}{\Delta t} + \frac{\alpha}{2} \cdot \frac{u_{j+1}^n - u_{j-1}^n}{\Delta t} = 0$
  
  $\Rightarrow u_j^{n+1} = u_j^n + \frac{\alpha\Delta t}{2\Delta t}(u_{j+1}^n - u_{j-1}^n)$

- With FE-Upwind:
  $\frac{u_j^{n+1} - u_j^n}{\Delta t} + \alpha\frac{u_j^n - u_{j-1}^n}{\Delta x} = 0 \quad \alpha > 0$
  
  $\frac{u_j^{n+1} - u_j^n}{\Delta t} + \alpha\frac{u_{j+1}^n - u_j^n}{\Delta x} = 0 \quad \alpha < 0$
  
  $\frac{u_j^{n+1} - u_j^n}{\Delta t} + \frac{\alpha}{2}\frac{u_{j+1}^n - u_{j-1}^n}{\Delta x} - \frac{|\alpha|\Delta t}{2}\frac{u_{j+1}^n - 2u_j^n + u_{j-1}^n}{\Delta x^2} = 0$
  
  Diffusion

- Lax Wendroff: FE-upwind with modified coefficient
  $\frac{u_j^{n+1} - u_j^n}{\Delta t} + \frac{\alpha}{2}\frac{u_{j+1}^n - u_{j-1}^n}{\Delta x} - \frac{\alpha^2\Delta t}{2}\frac{u_{j+1}^n - 2u_j^n + u_{j-1}^n}{\Delta x^2} = 0$
  
  $u(x_j, t^{n+1}) = u(x_j, t^n) + \frac{\partial u}{\partial t}\bigg|_{t^n, x_j}(t^{n+1} - t^n) + \frac{1}{2}\frac{\partial^2 u}{\partial t^2}\bigg|_{t^n, x_j}(t^{n+1} - t^n)^2 + \mathcal{O}(||t^{n+1} - t^n||^3)$

$\frac{\partial u}{\partial t} = -\alpha\frac{\partial u}{\partial x}, \quad \frac{\partial^2 u}{\partial x \partial t} = -\alpha\frac{\partial^2 u}{\partial x^2}, \quad \frac{\partial^2 u}{\partial t^2} = \alpha^2\frac{\partial^2 u}{\partial x^2}$

Substitute:
$u_j^{n+1} = u_j^n - \alpha\left(\frac{u_{j+1}^n - u_{j-1}^n}{2\Delta x}\right)\Delta t + \frac{\alpha^2}{2}\left(\frac{u_{j+1}^n - 2u_j^n + u_{j-1}^n}{\Delta x^2}\right)\Delta t^2$

Stability: $\left|\frac{\alpha\Delta t}{\Delta x}\right| \leq 1$