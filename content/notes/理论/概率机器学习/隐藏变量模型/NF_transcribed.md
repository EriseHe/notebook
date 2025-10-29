# Normalizing Flows (NF) and Continuous Normalizing Flows (CNF)

> Clean compilation of handwritten lecture notes. Structure and notation preserved.

---

## 1. Change of Variables in Distributions

Let $x = f_\theta(z)$, with inverse $z = f_\theta^{-1}(x)$.
$$
\begin{aligned}
p_X(x; \theta)
&= p_Z(f_\theta^{-1}(x))
\left|\det \frac{\partial f_\theta^{-1}(x)}{\partial x}\right|.
\end{aligned}
$$
In 1D:
$$
\begin{aligned}
p_X(x; \theta)
&= p_Z(f_\theta^{-1}(x))
\left|\frac{d f_\theta^{-1}(x)}{dx}\right|.
\end{aligned}
$$
For higher dimensions:
$\;\left|\det J_{f_\theta^{-1}}(x)\right|$ represents the absolute determinant of the inverse Jacobian.

---

## 2. Linear Map Interpretation

For a linear map $y = f(x) = Jx$:
$$
J = \frac{\partial f}{\partial x}, \quad \det J \text{ = volume scaling factor.}
$$
Example in $\mathbb{R}^2$:  
If $J = \begin{bmatrix}3 & 1\\ 0 & 2\end{bmatrix}$, then $\det J = 6.$

---

## 3. Nonlinear Case and Local Linearization

For $f: \mathbb{R}^d \to \mathbb{R}^d$,  
near $x_0$,
$$
\begin{aligned}
f(x) \approx f(x_0) + J_f(x_0)(x - x_0),
\end{aligned}
$$
the **first-order Taylor expansion**.

---

## 4. Flow Composition and Notation

We compose multiple invertible mappings:
$$
f_\theta = f_K \circ f_{K-1} \circ \cdots \circ f_1.
$$

For intermediate states:
$$
z_i = f_i(z_{i-1}), \quad z_0 \sim p_0(z_0), \quad z_K = x.
$$

Hence $p_i(z_i)$ represents the density at stage $i$.


## 5. Density Recursion and Change of Variables

If $x = f_\theta(z_0)$, then $z_{i-1} = f_i^{-1}(z_i)$.  
By change of variable:
$$
\begin{aligned}
p_i(z_i)
&= p_{i-1}(z_{i-1}) 
\left|\det \frac{\partial f_i^{-1}(z_i)}{\partial z_i}\right|.
\end{aligned}
$$
Recursively:
$$
\begin{aligned}
p_X(x;\theta)
&= p_Z(f_\theta^{-1}(x))
\left|\det J_{f_\theta^{-1}}(x)\right| \\
&= p_Z(z_0)
\prod_{i=1}^K
\left|\det \frac{\partial z_{i-1}}{\partial z_i}\right|
= p_Z(z_0)
\prod_{i=1}^K
\left|\det \frac{\partial f_i^{-1}(z_i)}{\partial z_i}\right|.
\end{aligned}
$$
Or equivalently:
$$
p_X(x;\theta)
= p_Z(z_0)\prod_{i=1}^{K}
\left|\det \frac{\partial f_i(z_{i-1})}{\partial z_{i-1}}\right|^{-1}.
$$

**Log form:**
$$
\begin{aligned}
\log p_X(x|\theta)
= \log p_Z(z_0) - \sum_{i=1}^{K}\log\left|\det \frac{\partial z_i}{\partial z_{i-1}}\right|,
\end{aligned}
$$
with $z_0 = f_\theta^{-1}(x)$.

---

## 6. Objective Function

$$
\max_\theta \sum_{x\in\text{data}} \log p_X(x|\theta).
$$

---

## 7. Affine Coupling Layers

To ensure invertibility:
Split input $x = (x_1, x_2)$,
$$
\begin{aligned}
y_1 &= x_1,\\
y_2 &= x_2 \odot \exp(s(x_1)) + t(x_1),
\end{aligned}
$$
so $y = f(x) = (y_1, y_2)$.

Inverse:
$$
\begin{aligned}
x_1 &= y_1,\\
x_2 &= (y_2 - t(y_1)) \odot \exp(-s(y_1)).
\end{aligned}
$$
### Jacobian and Determinant

Jacobian:
$$
J =
$$
\begin{bmatrix}
I & 0\\
* & \operatorname{diag}\big(\exp(s(x_1))\big)
\end{bmatrix}
$$,
\quad
\det J = \exp\!\left(\sum_j s_j(x_1)\right).
$$
Hence, computing $\log \det J$ is cheap.

---

## 8. Neural ODE and Continuous Normalizing Flow (CNF)

Limitations of discrete NFs:
- Fixed $K$ layers, limited approximation.

We define the continuous flow:
$$
\frac{dz}{dt} = f_\theta(z(t),t), \quad t\in[0,1].
$$

---

## 9. Deriving the CNF Equation

Define probability density $p(z,t)$ and velocity field $f_\theta(z,t)$.

**Flux through surface:**
$$
(p f_\theta)\cdot \hat{n}.
$$
By divergence theorem:
$$
\oint_{\partial V} (p f_\theta)\cdot \hat{n} \, dS
= \int_V \nabla_z \cdot (p f_\theta)\,dz.
$$
Conservation of probability:
$$
\frac{d}{dt}\int_V p\,dz
= -\int_V \nabla_z\cdot(p f_\theta)\,dz
\Rightarrow
\boxed{\partial_t p + \nabla_z\cdot(p f_\theta)=0.}
$$

---

## 10. Log-Density Dynamics

Along trajectories:
$$
\frac{dz}{dt} = f_\theta(z,t),
$$
$$
\frac{d}{dt}p(z(t),t)
= \partial_t p + f_\theta \cdot \nabla_z p.
$$
Substitute from continuity:
$$
\frac{d}{dt}p(z(t),t)
= -p\,(\nabla_z \cdot f_\theta),
$$
$$
\boxed{\frac{d}{dt}\log p = -\nabla_z \cdot f_\theta = -\operatorname{Tr}\!\left(\frac{\partial f_\theta}{\partial z}\right)}.
$$

Hence,
$$
\log p_{t_1}(z_{t_1}) = \log p_{t_0}(z_{t_0}) - \int_{t_0}^{t_1}\operatorname{Tr}\!\left(\frac{\partial f_\theta}{\partial z}\right)dt.
$$

---

## 11. ODE Solver (Runge–Kutta)

$$
y(t_1) = y(t_0) + \int_{t_0}^{t_1} f(t,y(t))\,dt.
$$
Augmented state:
$$
y_t = [z(t), \log p_t], \quad y_0 = [x_\text{data}, 0].
$$

---

## 12. Hutchinson’s Trick (Trace Estimation)

$$
\operatorname{Tr}(J) = \mathbb{E}_{s\sim \mathcal{N}(0,I)}[s^\top J s]
\approx s^\top J s.
$$
Define scalar $S(z) = \langle f_\theta(z), s \rangle$.
$$
\nabla_z S(z) = J^\top s.
$$

---

## 13. Likelihood Formulation (Backward Integration)

$$
\log p_X(x)
= \log p_Z(z_0) - \int_0^1 \operatorname{div}f_\theta(z_t,t)\,dt.
$$
Alternatively,
$$
\log p_Z(z_1) = \log p_X(x) + \int_1^0 \operatorname{Tr}(J_f)\,dt.
$$

Training uses negative sign convention.

---

## 14. Adjoint Method for Gradients

Adjoint variable:
$$
a_t = \frac{\partial \mathcal{L}}{\partial z_t}.
$$

State evolution:
$$
z_{t+\Delta t} = z_t + \int_t^{t+\Delta t} f_\theta(z_\tau,\tau)\,d\tau.
$$

Adjoint dynamics:
$$
\dot{a}_t = -\left(\frac{\partial f_\theta}{\partial z}\right)^\top a_t.
$$

Parameter sensitivity:
$$
\frac{d}{dt}\left(\frac{\partial z_t}{\partial \theta}\right)
= \frac{\partial f_\theta}{\partial z}\frac{\partial z_t}{\partial \theta}
+ \frac{\partial f_\theta}{\partial \theta}.
$$

Gradient formula:
$$
\boxed{\frac{\partial \mathcal{L}}{\partial \theta}
= -\int_{t_1}^{t_0} a_t^\top \frac{\partial f_\theta}{\partial \theta}(z_t,t)\,dt.}
$$

---

## 15. Summary

- Change of variables → discrete NF likelihood.
- Affine coupling → efficient triangular Jacobian.
- CNF → continuous ODE + log-density ODE.
- Hutchinson’s trick → efficient trace estimation.
- Adjoint method → efficient gradient backprop through ODE solver.
