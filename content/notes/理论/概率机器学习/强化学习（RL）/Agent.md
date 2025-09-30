---
title: "Agent"
lecture: "1"
---

# Agent
RL is the science of learning to make decision

An **agent** can learn
- policy
- value function
- model (model predicts states)

enevironement (state) != agenet (state)


Assume we simplify Environement to single state:
## 1.1 Action
Consider two actions:
1. a
2. b


## 1.2. Exploration v.s. Exploitation
The trade-off:
- **Exploitation**: maximise peprformance based on current knolwedge
- **Exploration**: increase knowledge
- Long term involves short term sacrifices
## 1.3 The Multi-Armed Bandit

Goal: maximise cumulative reward 

A multi-armed bandit is a set of distributions $\{\}$
## 1.4  Value Regret

### 1.4.1 action value
### 1.4.2 optimal value
### 1.4.3 Regret 

minimize **total regret**:
$$L_{t}=\sum^{t}_{n=1}v_{*}-q(A_{n})=\sum \Delta_{A_{n}}$$
maximuise cumulative reward = minimise total regret

# Algorithms

**Action value** for action $a$ is the expected reward:
Sampled rewards
**Indicator** $I(\cdot)$ function
count of the previous action $a$:
$$N_{t}(a)=\sum I(A_n=a)$$
$$
\begin{aligned}
Q_t(A_t)
&=\frac{\sum_{n=1}^{t}\mathcal{I}(A_n=A_t)\,R_n}{\sum_{n=1}^{t}\mathcal{I}(A_n=A_t)}\\
&=\frac{\sum_{n=1}^{t-1}\mathcal{I}(A_n=A_t)\,R_n+R_t}{\sum_{n=1}^{t-1}\mathcal{I}(A_n=A_t)+1}\\
&=\frac{Q_{t-1}(A_t)\sum_{n=1}^{t-1}\mathcal{I}(A_n=A_t)+R_t}{\sum_{n=1}^{t-1}\mathcal{I}(A_n=A_t)+1}\\
&=Q_{t-1}(A_t)+\frac{1}{\sum_{n=1}^{t-1}\mathcal{I}(A_n=A_t)+1}\!\left(R_t-Q_{t-1}(A_t)\right)\\
&=Q_{t-1}(A_t)+\frac{1}{N_{t-1}(A_t)+1}\!\left(R_t-Q_{t-1}(A_t)\right)
=Q_{t-1}(A_t)+\frac{1}{N_t(A_t)}\!\left(R_t-Q_{t-1}(A_t)\right)\\
&=Q_{t-1}(A_t)+\alpha_t\!\left(R_t-Q_{t-1}(A_t)\right),\qquad \alpha_t=\frac{1}{N_t(A_t)}\\[6pt]
\forall a\neq A_t:\quad
Q_t(a)
&=\frac{\sum_{n=1}^{t}\mathcal{I}(A_n=a)\,R_n}{\sum_{n=1}^{t}\mathcal{I}(A_n=a)}
=\frac{\sum_{n=1}^{t-1}\mathcal{I}(A_n=a)\,R_n}{\sum_{n=1}^{t-1}\mathcal{I}(A_n=a)}
=Q_{t-1}(a).
\end{aligned}
$$


## 2.1 Greedy
##  2.2 $\epsilon$-Greedy
## 2.3 UCB
## 2.4 Thomspson samplong
## 2.5 Policy Gradients