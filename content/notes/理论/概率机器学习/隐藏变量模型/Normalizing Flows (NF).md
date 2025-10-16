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
Together, they define the density of $x$ under the flow.

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
we now plot **both distributions** to see how the transformation shifts and stretches the density.

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

> [!theorem|2.3.1] Change of Variables
> If $z \sim p_Z(z)$ and $x = f(z)$, then
> $$
p_X(x) = p_Z(f^{-1}(x)) \cdot \left|\det J_{f^{-1}}(x)\right|
> $$

- $\det J_f > 1$: spreads probability mass (expansion).  
- $0 < \det J_f < 1$: concentrates probability mass (compression).  
- $\det J_f = 0$: collapses space → (not a valid density).  

# 3 Interpreting the Jacobian Determinant in Probability

The determinant of the Jacobian tells us **how volumes are scaled locally** by the transformation $f$. Since probability mass is preserved under transformation:

> [!theorem|3.1] probability mass conservation
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

$$
\begin{align}
|\det J_f| > 1: \;\quad\text{expansion} →\qquad\; \text{stretch space} & → \text{density thins out}  \\
0 < |\det J_f| < 1: \;\text{compression} →\qquad \text{squeeze space}  & → \text{density thickens} \\ 
|\det J_f| = 0: \;\qquad\text{collapse} → \text{a lower dimension}  & → \text{no density defined}
\end{align}
$$

## 3.3 Example
1. $z \sim {N}(0,1)$.  
2. Transform $x = 2z$:  
   - $\det J_f = 2$.  
   - Distribution is wider and shorter (spread out).  

3. Transform $x = 0.5z$:  
   - $\det J_f = 0.5$.  
   - Distribution is narrower and taller (more concentrated).

# 4 Normalizing Flows

**Definition:** A Normalizing Flow is a sequence of $K$ invertible transformations: 
$$
\begin{align}
f = f_K \circ f_{K-1} \circ \cdots \circ f_2 \circ f_1
\end{align}
$$
and the jacobian reads:
$$
\begin{align}
J_{f}(z) & =J_{f_{k}}(z_{k-1})J_{f_{k-1}}(z_{k-2})\dots J_{1}(z_{0}) \\ \\
 \Longrightarrow\det J_{f}(z)  &  = \Pi\det (J_{f_{i}}(z_{i-1}))\\ 
\end{align}
$$
Some of the properties we have are:
$$
\begin{align}
 \det J_{f}(z)  & = \frac{1}{\det J_{f^{-1}}}
\end{align}
$$


![NF|737x222](https://lilianweng.github.io/posts/2018-10-13-flow-models/normalizing-flow.png)

**Change of Variables (composition):**  
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

### 4.1.1 Lecture notes

$$
\begin{align}
y_{2} & =x_{2} \cdot \exp(s(x_{1}))+t(x_{1}) \\
 x_{2}& =   \frac{y_{2} -t(y_{1})}{ \exp(s(x_{1}))}
\end{align}
$$

$$
J_{f} =
\begin{bmatrix}
I & 0 \\
\times & \operatorname{diag}(\exp(s(x_i)))
\end{bmatrix}
$$
so 
$$
\begin{align}
\det J_{f} & =\det I\det(\operatorname{diag}\exp(s(x_{1}))) \\
 &  = \det(\operatorname{diag} \exp(s(x_{1}))\\ 
 &  = \Pi^{w_{2}}_{i=1} \exp(s(x_{1})|_{i})
\end{align}

$$
### 4.1.2 Key Points
- Each transformation $f_i$ must be:
  - **Invertible**
  - Have a **tractable Jacobian determinant**

- The **base distribution** $p_Z$ is usually simple (e.g. standard Gaussian).
- Training maximizes the **exact log-likelihood** of data:
  $$
  \max_\theta \sum_{x \in {D}} \log p_X(x;\theta).
  $$
# 5 Neural ODEs for Continuous Flows Tutorial

---

## 5.1 Background and Intuition

### 5.1.1 Normalizing Flows (NFs)
- **Goal:** Learn a transformation $f$ that maps a **simple base distribution** (e.g., Gaussian) to a **complicated target distribution**.  
- Idea: If $z_0 \sim p(z_0)$ and we apply an invertible transformation $z_1 = f(z_0)$, then the new density is given by the **change of variables formula**:
  $$
  \log p(z_1) = \log p(z_0) - \log \left| \det \frac{\partial f}{\partial z_0} \right|
  $$

### 5.1.2 Limitations of Discrete Flows
- Each transformation is a *step*. To build complex distributions, we often stack many transformations.  
- Computing the Jacobian determinant can be expensive (except for special architectures like coupling layers).  

### 5.1.3 Continuous Normalizing Flows (CNFs)
- Instead of a finite stack, let’s imagine **infinitely many infinitesimal transformations** — this leads to a **differential equation**:
  $$
  \frac{dz}{dt} = f_\theta(z(t), t).
  $$
- Here, $f_\theta$ is a neural network.  
- Now, the change in log-density evolves smoothly over time.  
- Crucial formula (from instantaneous change of variables):
  $$
  \frac{d}{dt} \log p(z(t)) = - \text{Tr}\!\left(\frac{\partial f_\theta}{\partial z}\right).
  $$

👉 This means:  
- To follow how the density changes, we only need the **trace of the Jacobian** of $f_\theta$, not the full determinant.  
- This can be approximated with **Hutchinson’s trick** in high dimensions.  

---

## 5.2 Intuition with a Picture

Imagine you start with a cloud of Gaussian samples.  
- As time flows ($t=0 \to 1$), the neural ODE **“pushes”** each point smoothly along a vector field.  
- This vector field is learned so that by the end ($t=1$) the cloud matches the target data distribution.  
- The flow is smooth, invertible, and volume-preserving **up to the divergence term** (controlled by the Jacobian trace).

# 6 🌊 Flux, Net Flow, and the Divergence Theorem

Let’s connect the concepts of **flux**, **net flow**, and **probability conservation** using the **divergence theorem** — a key result you’ve already learned in multivariable calculus.

---

## 6.1 🔹 1. Local Flow (Flux)

Consider a probability density $p(z,t)$ and a velocity field $f_\theta(z,t)$.  
The quantity
$$
p(z,t)\,f_\theta(z,t)
$$
is called the **probability flux** (or flow field).  
It tells you *how much probability mass per unit area per unit time* is moving **through** each point and in what direction.

- $p$ → how much probability is there  
- $f_\theta$ → how fast and in what direction it moves  
→ Together, $p f_\theta$ describes the local **flow rate**.

---

## 6.2 🔹 2. Net Flow Across a Region

Now take any fixed region $V$ in space (with boundary surface $\partial V$).

We can ask: *How much total probability is leaving this region per unit time?*

That’s given by the **net outward flux** through the boundary:
$$
\text{Net outflow from } V
= \oint_{\partial V} (p f_\theta) \cdot n \, dS,
$$
where:
- $n$ is the **unit outward normal** to the surface,  
- $(p f_\theta) \cdot n$ is the **outward flow rate per unit area**,  
- integrating over the boundary adds up all those local flows.

This surface integral gives the *total* rate at which probability exits $V$.

---

## 6.3 🔹 3. The Divergence Theorem

The divergence theorem relates a **surface integral of flux** to a **volume integral of divergence**:

$$
\oint_{\partial V} (p f_\theta) \cdot n \, dS
= \int_V \nabla_z \cdot (p f_\theta) \, dz.
$$

In words:

> The total flow **leaving** a region through its boundary equals the sum of all the **local outflows** (divergences) inside the region.

## 6.4 Recall: Divergence 
We denote 
$$
\begin{align}
\nabla _{z}\cdot(p(f_{\theta})) & =\sum \frac{\partial p(f_{\theta})}{\partial z_{i}} \\
 & = \left( \frac{\partial}{\partial z_{1}},  \frac{\partial}{\partial z_{2}},\dots \frac{\partial}{\partial z_{k}} \right) \cdot (p(f_{\theta})_{1}, p(f_{\theta})_{2}, \dots,p(f_{\theta})_{k}) \\[6pt]
 & = \operatorname{tr}(J_{pf_{\theta}}(z)) 
\end{align}
$$


## 6.5 🔹 4. Conservation of Probability

Total probability inside $V$ at time $t$ is:
$$
P_V(t) = \int_V p(z,t)\,dz.
$$

The rate of change of this probability is:
$$
\frac{dP_V}{dt} = \int_V \frac{\partial p}{\partial t}\,dz.
$$

If probability is conserved — meaning no mass is created or destroyed —  
then any decrease in $P_V$ must come from probability *flowing out* across the boundary:

$$
\frac{dP_V}{dt}
= -\oint_{\partial V} (p f_\theta) \cdot n \, dS.
$$

## 6.6 🔹 5. Substituting the Divergence Theorem

Using the divergence theorem on the right-hand side:

$$
\int_V \frac{\partial p}{\partial t}\,dz
= -\int_V \nabla_z \cdot (p f_\theta)\,dz.
$$

Since this holds for **any** region $V$,  
the integrands themselves must be equal at every point:

$$
\boxed{
\frac{\partial p}{\partial t} + \nabla_z \cdot (p f_\theta) = 0.
}
$$

This is the **continuity equation** — expressing *local conservation of probability*.

---

## 6.7 🔹 6. From Density to Log-Density Along a Trajectory

Consider a particle following the deterministic flow:
$$
\frac{dz_t}{dt} = f_\theta(z_t, t).
$$

The total derivative of the density along that trajectory is:
$$
\frac{dp(z_t,t)}{dt}
= \frac{\partial p}{\partial t} + \frac{dz_t}{dt} \cdot \nabla_z p
= \frac{\partial p}{\partial t} + f_\theta \cdot \nabla_z p.
$$

Substitute $\frac{\partial p}{\partial t}$ from the continuity equation:
$$
\frac{dp(z_t,t)}{dt}
= -p(z_t,t)\,(\nabla_z \cdot f_\theta).
$$

Divide both sides by $p(z_t,t)$:
$$
\frac{1}{p}\frac{dp}{dt}
= -\nabla_z \cdot f_\theta.
$$

Recognize that the left-hand side is the derivative of the log-density:
$$
\frac{d}{dt}\log p(z_t)
= -\nabla_z \cdot f_\theta
= -\operatorname{Tr}\!\left(\frac{\partial f_\theta}{\partial z_t}\right).
$$

✅ **Final Result**

$$
\boxed{
\frac{d}{dt}\log p(z_t)
= -\operatorname{Tr}\!\left(\frac{\partial f_\theta}{\partial z_t}\right).
}
$$

This equation tells us that the **log-density** decreases in proportion to how much the local flow **expands** (positive divergence) or **contracts** (negative divergence) the space.

### 6.7.1 💬 Interpretation

- If $\nabla_z \cdot f_\theta > 0$: trajectories diverge → space expands → density decreases.  
- If $\nabla_z \cdot f_\theta < 0$: trajectories converge → space contracts → density increases.  
- The trace of the Jacobian $\operatorname{Tr}(\partial f_\theta / \partial z_t)$ quantifies this local volume change.

This is the continuous-time form of the **change of variables** formula used in **normalizing flows** and **probability flow ODEs** in diffusion models.

## 6.8 Setup
- The latent variable evolves continuously by an ODE:
  $$
  \frac{dz}{dt} = f(z_t, t).
  $$
- Here, $f$ is a **vector field**: it tells us how each point $z_t$ moves in space as time increases.

## 6.9 Jacobian of the Vector Field
- The matrix
  $$
  \frac{\partial f}{\partial z_t}
  $$
  is the **Jacobian** of $f$ with respect to $z_t$.
- Each entry is a partial derivative:
  $$
  \bigg[\frac{\partial f}{\partial z_t}\bigg]_{ij}
  = \frac{\partial f_i}{\partial z_j}.
  $$
- The **trace** of this Jacobian is the **divergence** of $f$:
  $$
  \mathrm{div}\,f(z_t) = \sum_{i=1}^d \frac{\partial f_i}{\partial z_i}.
  $$

## 6.10 Why the Trace Matters
- In **discrete flows**, we use the Jacobian determinant to measure how much a transformation stretches or compresses volume.
- In **continuous flows**, we look at the *instantaneous rate* of change of volume.
- This rate is exactly the **trace of the Jacobian**.

## 6.11 Intuition: Expansion vs Compression
- Think of probability density as an **incompressible fluid** flowing through space.
- The divergence tells us what happens locally:
  - **Positive divergence ($>0$):**
    - The flow pushes space outward.
    - A small region expands.
    - Same mass over larger volume $\;\Rightarrow\;$ density decreases.
  - **Negative divergence ($<0$):**
    - The flow pulls space inward.
    - A small region contracts.
    - Same mass in smaller volume $\;\Rightarrow\;$ density increases.
  - **Zero divergence:**
    - Flow is volume-preserving.
    - Density stays constant.

## 6.12 Example in 1D
Let
$$
\frac{dz}{dt} = f(z) = az.
$$

- Jacobian: $\frac{\partial f}{\partial z} = a$.
- Trace = $a$.
- Then:
  $$
  \frac{d}{dt}\log p(z_t) = -a.
  $$

- If $a > 0$: the system expands exponentially, so density decays.  
- If $a < 0$: the system contracts, so density grows.  
- If $a = 0$: density is unchanged.

## 6.13 Summary
- The formula
  $$
  \frac{d}{dt}\,\log p(z_t) = - \mathrm{Tr}\!\left(\frac{\partial f}{\partial z_t}\right)
  $$
  is the **continuous analogue** of the change-of-variables theorem.
- Discrete flows: multiply Jacobian determinants across layers.  
- Continuous flows: integrate the divergence of $f$ over time.  
- This guarantees that **probability mass is preserved** as the distribution evolves.

# 7 🧠 Continuous Normalizing Flows — What’s Really Implemented

## 7.1 The Core ODE System

CNFs model data as the solution of an ODE:

$$
\frac{dz_t}{dt} = f_\theta(z_t, t),
\qquad
\frac{d\,\log p(z_t)}{dt} = -\operatorname{Tr}\!\left(\frac{\partial f_\theta}{\partial z_t}\right).
$$

Both $z_t$ **and** its log-density evolve together. We integrate these two coupled ODEs using a numerical solver (e.g. `torchdiffeq.odeint`).

## 7.2 Forward vs. Backward Integration

| Purpose | Direction | Known Quantity | What You Compute |
|----------|------------|----------------|------------------|
| **Sampling** | Forward (0→1) | $z_0 \sim N(0,I)$ | $z_1$ in data space |
| **Training / Likelihood** | Backward (1→0) | $z_1 = x_{\text{data}}$ | $z_0$ and $\log p(z_0)$ |

So during training we *start from data* and integrate **backward** to base space,  
while during sampling we start from the base and integrate **forward**.

## 7.3 ⚙️ Understanding the ODE Solver in Continuous Normalizing Flows

Continuous Normalizing Flows (CNFs) rely on a numerical **ODE solver** (e.g., `torchdiffeq.odeint`)  
to integrate both the **state** $z_t$ and the **log-density** $\log p(z_t)$ over time.

### 7.3.1 🔹 Inputs to the ODE Solver

1. **`func(t, y)` — the ODE function**  
   Defines $\frac{dy}{dt}$ for the current time `t` and state `y`.  
   In CNFs, we augment the state as $y = [z_t, \log p(z_t)]$ and evolve both:
   $$
   \frac{dz_t}{dt} = f_\theta(z_t, t),
   \qquad
   \frac{d\log p(z_t)}{dt} = -\text{div}\,f_\theta(z_t, t).
   $$

2. **`y0` — initial condition**  
   The starting point of the ODE.  
   - For **sampling (forward)**: `y0 = [z0, log p(z0)]` with $z_0 \sim N(0,I)$.  
   - For **training (backward)**: `y0 = [x_{\text{data}}, 0]`, we accumulate the log-density change.

3. **`tspan` — time interval**  
   A 1-D tensor specifying the integration direction:  
   - Forward: `[0.0, 1.0]`  
   - Backward: `[1.0, 0.0]`

---

### 7.3.2 🔹 What the ODE Solver Does

The solver numerically integrates:
$$
y(t_1) = y(t_0) + \int_{t_0}^{t_1} f(t, y)\,dt
$$
using adaptive methods (e.g., Runge–Kutta).  
It repeatedly calls `func(t, y)` to estimate derivatives and update the state.

You can think of it as a **black-box integrator** that returns the *trajectory* of $y$ at all requested times.


### 7.3.3 🔹 Output of the ODE Solver in Continuous Normalizing Flows

When you integrate the augmented ODE (for both $z_t$ and $\log p_t$) backward in time,  
you typically call:

    zT = odeint(odefunc_backward, y0, torch.tensor([1.0, 0.0]))

**Here:**

- `y0` is the initial condition at $t = 1.0$, containing both data and initial log-density:  
  $$
  y_0 = [x_{\text{data}}, 0].
  $$
- The solver integrates **backward** from $t = 1.0$ to $t = 0.0$.

**After integration:**

    zT[0]     # state at t = 1.0  (initial)
    zT[-1]    # state at t = 0.0  (final)

Each state in `zT` includes both the **position** and the **log-density accumulator**:
$$
y_t = [z_t, \log p_t].
$$

Thus, the final outputs are obtained by slicing:

    z0, logp_change = zT[-1, :, :D], zT[-1, :, D:]

### 7.3.4 **Interpretations**

- **`z0`** → latent variable in the *base space* (the transformed version of the data).  
- **`logp_change`** → accumulated integral of $-\text{div}\, f_\theta$,  
  representing the **total log-volume change** (the continuous-time Jacobian term).