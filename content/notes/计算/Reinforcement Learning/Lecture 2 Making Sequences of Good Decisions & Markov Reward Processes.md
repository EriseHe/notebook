Goal: construct an algorithms for computing decision policies, where more iteration $\to$ monotonically improve the decision policy.
## 1. Markov Reward Processes (MRPs)

### 1. 1. Return
-  $G_t$ as **return**, which is the (discounted) sum of rewards received from time $t$ onward.
### 1.1.1 Horizon
 - $H$ as **horizon**: how many steps into the future you include in the return (episode length or remaining steps).

> Horizon → determines which rewards you sum → defines the return

**Finite-horizon** (episode length $H$) 
$$\begin{aligned}
G_t &= r_t + \gamma r_{t+1} + \gamma^2 r_{t+2} + \cdots + \gamma^{H-1} r_{t+H-1} \\
    &= \sum_{k=0}^{H-1} \gamma^k r_{t+k}.
\end{aligned}
$$
**Infinite-horizon** (discounted)
$$
\begin{aligned}
G_t &= \sum_{k=0}^{\infty} \gamma^k r_{t+k},
\end{aligned}

$$
### 1.2 State Value function
$$
\begin{align}
V(s)&=\mathbb{E}\left[G_t \mid s_t=s\right] \\
&=\mathbb{E}\left[r_t+\gamma r_{t+1}+\gamma^2 r_{t+2}+\cdots+\gamma^{H-1} r_{t+H-1} \mid s_t=s\right] \\
\end{align}
$$
Value of an Infinite Horizon Markov Reward Process
$$V(s)=\underbrace{R(s)}_{\text {Immediate reward }}+\underbrace{\gamma \sum_{s^{\prime} \in S} P\left(s^{\prime} \mid s\right) V\left(s^{\prime}\right)}_{\text {Discounted sum of future rewards }}$$

Value of an finite Horizon V(s) using matrix equation

$\begin{aligned} V=R+\gamma P V & =R \\ V-\gamma P V & =R \\ (1-\gamma P) V & =R \\ V & =(1-\boldsymbol{\gamma} P)^{-1} R\end{aligned}$
Computing inverse requires $O(N^3)$ + *invertible*, so we use **iterative algorithm (fixed point method)** for computing value of a MRP:

Initialize $V_0(s)=0$ for all $s$
For $k=1$ until convergence
- For all $s$ in $S$

$$
V_k(s)=R(s)+\gamma \sum_{s^{\prime} \in S} P\left(s^{\prime} \mid s\right) \underbrace{V_{k-1}}\left(s^{\prime}\right)
$$
Computational complexity: $O\left(|S|^2\right)$ for each iteration $(|S|=N)$




#### Stochastic

#### Deterministic case: $s \to a$


## 2. MDP control

optimal policy: not necessarily
optimal value function: unique
### Compute the optimal policy
$\pi^*(s)=\arg \max _\pi V^\pi(s)$
### Policy search

