Goal: construct an algorithms for computing decision policies, where more iteration $\to$ monotonically improve the decision policy.
# 1. Markov Reward Processes (MRPs)

> [!definition]
> A Markov Decision Process (MDP) is a 5 -tuple
>$$
(\mathcal{S}, \mathcal{A}, P, R, \gamma)
>$$
>where
> - $S$ is the state space
> - $\mathcal{A}$ is the action space
> - $P\left(s^{\prime} \mid s, a\right)$ is the transition kernel (the probability of moving from ${} (s, \text{action }a \text{ taken})  \to s' {}$)
> - $R(s, a)$  is the reward function
> - $\gamma \in[0,1]$ is the discount factor

## 1.1 Return
The **return**, denoted as $G_{t}$,  is the (*discounted*) sum of rewards received from time $t$ to horizon $H$.
### 1.1.1 Discount Factor
The primary purpose of discount factor $\gamma\in[0,1]$ is to weights future rewards:
- ensures *convergence* for infinite sum
- controls *immediate* rewards ($\gamma=0$) vs. *delayed* rewards ($\gamma \to 1$)
### 1.1.1 Horizon 
For $H$ steps included, we compute return $G_{t}$:
**Finite-horizon** (episode length $H$) 
$$\begin{aligned}
G_t &= r_t + \gamma r_{t+1} + \gamma^2 r_{t+2} + \cdots + \gamma^{H-1} r_{t+H-1} \\
    &= \sum_{k=0}^{H-1} \gamma^k r_{t+k}.
\end{aligned}
$$
> Horizon → determines which rewards you sum → defines the return
**Infinite-horizon**
$$
\begin{aligned}
G_t &= \sum_{k=0}^{\infty} \gamma^k r_{t+k}
\end{aligned}
$$
## 1.2 State Value function $V(s)$
>[!definition|1.2] State Value Function
>The **state-value function** under policy ${} \pi(a|s) {}$ is the *expected return* starting from state $s$ :
>$$
V^\pi(s)=\mathbb{E}_\pi\left[G_t \mid s_t=s\right]=\mathbb{E}_\pi\left[\sum_{k=0}^{\infty} \gamma^k r_{t+k} \mid s_t=s\right]
> $$


If using a finite horizon $H$, we replace the infinite sum by $G_{t}=\sum_{k=0}^{H-1} \gamma^k r_{t+k}$, that is:
$$
\begin{aligned}
V(s)&=\mathbb{E}\left[\sum_{k=0}^{H-1} \gamma^k r_{t+k} \mid s_t=s\right] \\
&=\mathbb{E}\left[r_t+\gamma r_{t+1}+\gamma^2 r_{t+2}+\cdots+\gamma^{H-1} r_{t+H-1} \mid s_t=s\right] \\
\end{aligned}
$$

### 1.2.1 Value of an Infinite Horizon Markov Reward Process
$$
\begin{aligned}
V(s) & =\mathbb{E}\left[\sum_{k=0}^{\infty} \gamma^k r_{t+k} \mid s_t=s\right] \\
& =\mathbb{E}\left[r_t \mid s_t=s\right]+\gamma \mathbb{E}\left[\sum_{k=0}^{\infty} \gamma^k r_{t+1+k} \mid s_t=s\right] \\
& =R(s)+\gamma \mathbb{E}\left[V\left(s_{t+1}\right) \mid s_t=s\right] \\
& =R(s)+\gamma \sum_{s^{\prime}} P\left(s^{\prime} \mid s\right) V\left(s^{\prime}\right) .
\end{aligned}
$$
where $R(s)=\mathbb{E}[r_{t}|s_{t}=s]$. Therefore, in this formulation, we have:
$$V(s)=\underbrace{R(s)}_{\text {Immediate reward }}+\underbrace{\gamma \sum_{s^{\prime} \in S} P\left(s^{\prime} \mid s\right) V\left(s^{\prime}\right)}_{\text {Discounted sum of future rewards }}$$

### 1.2.2 Value of an finite Horizon V(s) using matrix equation
$$
\begin{aligned}
V & =R+\gamma P V \\
V-\gamma P V & =R \\
(I-\gamma P) V & =R \\
V & =(I-\gamma P)^{-1} R
\end{aligned}
$$
Computing inverse requires $O(N^3)$ + *invertible*, so we use iterative algorithm (**fixed point method**) for computing value of a MRP:

- Initialize $V_0(s)=0$ for all $s$
- For $k=1$ until convergence
- For all $s$ in $S$

$$
\begin{aligned}
V_k(s)&=R+\gamma PV_{k-1}\\
&=R(s)+\gamma \sum_{s^{\prime} \in S} P\left(s^{\prime} \mid s\right) V_{k-1}\left(s^{\prime}\right)
\end{aligned}
$$
Computational complexity: $O\left(|S|^2\right)$ for each iteration $(|S|=N)$




#### Stochastic

#### Deterministic case: $s \to a$


## 2. Markov Decision Processes (MDPs)
## 3. MDP Control & Evaluation 

optimal policy: not necessarily
optimal value function: unique
### Compute the optimal policy
$\pi^*(s)=\arg \max _\pi V^\pi(s)$
### Policy search

