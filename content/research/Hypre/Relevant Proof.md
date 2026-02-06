---
title: Relevant Proof
---

# 1. Near-asymptotic analysis of SOR

## 1.1 SOR Iteration Matrix Derivation

> This derivation follows the notation used in **Algorithm 1** and **Section 2.1**.
### 1.1.1 Matrix Splitting

The system matrix $\mathbf{A} \in \mathbb{R}^{n \times n}$ is decomposed into its diagonal, strictly lower, and strictly upper triangular components:
$$\mathbf{A} = \mathbf{D} + \mathbf{L} + \mathbf{L}^T$$
For SOR method with parameter $\omega \in (0, 2)$, we define preconditioner matrix $\mathbf{W}_\omega$ as:
$$\mathbf{W}_\omega = \frac{1}{\omega}\mathbf{D} + \mathbf{L}$$

### 1.1.2. Fixed-Point Iteration

We define the residual $\mathbf{r}_k$ as:
$$\mathbf{r}_k = \mathbf{b} - \mathbf{A}\mathbf{x}_k$$
Then, the SOR update step for the iterate $\mathbf{x}_k$ is given by
$$
\begin{align}
\mathbf{x}_{k+1}& =\mathbf{x}_k + \mathbf{W}_\omega^{-1} \mathbf{r}_k \\
 &=\mathbf{x}_k + \mathbf{W}_\omega^{-1} (\mathbf{b} - \mathbf{A}\mathbf{x}_k) \\
& = \underbrace{(\mathbf{I} - \mathbf{W}_\omega^{-1}\mathbf{A})}_{e_{\omega}}\mathbf{x}_k+ \mathbf{W}_\omega^{-1}\mathbf{b}
\end{align}$$

### 1.1.3. The Defect Reduction Matrix $\mathbf{C}_\omega$

The iteration matrix, $\mathbf{C}_\omega$, by definition governs the evolution of the **error** and the **residual**:

$$\mathbf{r}_{k+1}=\underbrace{\left(\mathbf{I}-\mathbf{A} \mathbf{W}_\omega^{-1}\right)}_{\mathbf{C}_\omega} \mathbf{r}_k$$
That is,
$$\begin{align}
\mathbf{C}_\omega :&= (\mathbf{I} - \mathbf{W}_\omega^{-1}\mathbf{A})\\
&=\mathbf{I} - \mathbf{A}(\mathbf{D}/\omega + \mathbf{L})^{-1}
\end{align}
$$
(note: $\mathbf{W}_\omega^{-1}\mathbf{A}$ and $\mathbf{A}\mathbf{W}_\omega^{-1}$ are similar and share the same eigenvalues). Therefore, the residual at iteration $k$ evolves as:
$$\boxed{\mathbf{r}_k = \mathbf{C}_\omega^k \mathbf{r}_0}$$

### 1.1.4. Spectral Radius and Convergence

The **asymptotic convergence rate** is determined by the spectral radius $\rho(\mathbf{C}_\omega)$:
$$\rho(\mathbf{C}_\omega) = \max \{ |\lambda| : \lambda \in \text{eig}(\mathbf{C}_\omega) \}$$
where $\rho(\mathbf{C}_\omega) < 1$ (convergence condition for SOR). As $k \to \infty$, the error reduction per iteration approaches $\rho(\mathbf{C}_\omega)$:
$$\lim_{k \to \infty} \sqrt[k]{\|\mathbf{C}_\omega^k\|_2} = \rho(\mathbf{C}_\omega)$$

## 1.2 From $\rho$ to Iteration Count $U(\omega)$

> [!assumption|2.1] near-asymptotic
> There exists a constant $\tau \in (0,1)$ s.t $\forall\,\omega \in \Omega$, the matrix $\mathbf{C}_\omega=\mathbf{I}_n -\mathbf{A}(\mathbf{D}/\omega + \mathbf{L})^{-1}$ satisfies
> $$
> \left\|\mathbf{C}_\omega^{\,k}\right\|_2
> \le
> \Bigl(
> \rho(\mathbf{C}_\omega)
> +
> \tau\bigl(1-\rho(\mathbf{C}_\omega)\bigr)
> \Bigr)^{k}
> $$
> for the iteration index $k =\min\Bigl\{\, i \;\big|\;|\mathbf{C}_\omega^{\,i+1}\mathbf{b}\|_2<\varepsilon \|\mathbf{b}\|_2\Bigr\}.$

> [!remark|2.2] interpretation of the near-asymptotic regime
> Convergence is assumed to occur when the iteration already behaves like its asymptotic rate (governed by the spectral radius), up to the slack parameter $\tau$. The parameter $\tau$ quantifies the *degree of non-asymptoticity*: a small $\tau$ indicates rapid entry into the asymptotic regime, while a large $\tau$ indicates that the method remains in a transient phase when the tolerance $\varepsilon$ is reached.

We want to show that the solver always converges, no matter what $\mathbf{r}_0$ looks like. To eliminate the initial residual, note that if we can ensure the matrix norm $\left\|\mathbf{C}_\omega^k\right\|_2 \leq \varepsilon$, then
$$
\left\|\mathbf{r}_k\right\|_2=\left\|\mathbf{C}_\omega^k \mathbf{r}_0\right\|_2 \leq\left\|\mathbf{C}_\omega^k\right\|_2\left\|\mathbf{r}_0\right\|_2 \leq \varepsilon\left\|\mathbf{r}_0\right\|_2
$$
which is sufficient to guarantee that the algorithmic stopping condition. However, calculating the exact norm $\left\|\mathbf{C}_\omega^k\right\|_2$ is difficult, so under **Assumption 2.1**, the paper assumes the actual convergence is bounded by a surrogate rate for a "non-asymptocity" parameter $\tau \in (0, 1)$:
$$
\text{Surrogate Rate} = \rho(\mathbf{C}_\omega) + \tau(1 - \rho(\mathbf{C}_\omega))
$$
Therefore, we have
$$
\begin{align}
\left(\rho\left(\mathbf{C}_\omega\right)+\tau\left(1-\rho\left(\mathbf{C}_\omega\right)\right)\right)^k &\leq \varepsilon\\
k \cdot \log \left(\rho\left(\mathbf{C}_\omega\right)+\tau\left(1-\rho\left(\mathbf{C}_\omega\right)\right) \right)  & \leq \log \epsilon \\
\end{align}
$$
Since $\rho\left(\mathbf{C}_\omega\right)<1$ and $\tau \in(0,1)$, the term inside the log is < 1, so it flips the inequality:
$$
k   \geq \frac{\log \epsilon}{\log \left(\rho\left(\mathbf{C}_\omega\right)+\tau\left(1-\rho\left(\mathbf{C}_\omega\right)\right)\right)}
$$
The total number of iterations required to reach tolerance $\varepsilon$ is then bounded by $U(\omega)$:
$$\boxed{U(\omega) = 1 + \frac{-\log \varepsilon}{-\log(\rho(\mathbf{C}_\omega) + \tau(1 - \rho(\mathbf{C}_\omega)))}}$$

# 2. Relevant Proof

> **Lemma 2.1**, **Theorem B.3**, **Theorem B.4**, **Theorem 2.1**, and **Theorem 2.3** (plus **F.3–F.4** if we want the “smooth in expectation” trick).

## Lemma 2.1


> [!lemma|2.1] iteration bound and regularity of the SOR iteration count
> Define
> $$
> \begin{aligned}
> U(\omega)
> &=
> 1+\frac{-\log\varepsilon}{
> -\log\!\left(
> \rho(\mathbf{C}_\omega)
> +\tau\left(1-\rho(\mathbf{C}_\omega)\right)
> \right)
> }\\
> \alpha
> &=
> \tau+(1-\tau)\max\left\{\beta^2,\omega_{\max}-1\right\}\\
> \omega^*
> &=
> 1+\frac{\beta^2}{\left(1+\sqrt{1-\beta^2}\right)^2}
> \end{aligned}
> $$
> where $\beta=\rho\!\left(\mathbf{I}_n-\mathbf{D}^{-1}\mathbf{A}\right)$. Then the following holds:
> 
> 1. **(Upper bound on iterations)** $U$ bounds the number of iterations and is itself bounded:
> $$
> \operatorname{SOR}(\mathbf{A},\mathbf{b},\omega)
> <
> U(\omega)
> \le
> 1+\frac{-\log\varepsilon}{-\log\alpha}.
> $$
> 2. **(Monotonicity and regularity)** $U$ is decreasing toward $\omega^*$, and is
> $$
> \left(\frac{-(1-\tau)\log\varepsilon}{\alpha\log^2\alpha}\right)\text{ -Lipschitz}
> $$
>  on $\omega\ge\omega^*$ if
> $$
> \tau\ge\frac{1}{e^2}
> \quad\text{or}\quad
> \beta^2\ge\frac{4}{e^2}\left(1-\frac{1}{e^2}\right).
> $$


> [!remark|2.3] interpretation of the spectral difficulty parameter
> The quantity $\alpha$ will in some sense measure the difficulty of learning: if $\alpha$ is close to $1$ for many of the instances under consideration, then learning will be harder. Crucially, all quantities in the result are spectral and do not depend on the dimensionality of the matrix.

### Claim 1. $\operatorname{SOR}(\mathbf{A}, \mathbf{b}, \omega)<U(\omega)$

**Proof.** We want to show that the final iteration $k<U(\omega)$. Suppose, for the sake of **contradiction**, there exists $l$ such that $l>U(\omega)$. Then, this means at step $l-1$, the error still too large:
$$\frac{\left\|\mathbf{C}_\omega^{l-1} \mathbf{b}\right\|_2}{\|\mathbf{b}\|_2}>\varepsilon$$
As we have shown earlier, we know 
$$
\epsilon<\frac{\left\|\mathbf{C}_\omega^{l-1} \mathbf{b}\right\|_2}{\|\mathbf{b}\|_2}\leq\frac{\|\mathbf{C}_\omega^{l-1}\|\cancel{\| \mathbf{b}\|_2}}{\cancel{\|\mathbf{b}\|_2}}=\left\|\mathbf{C}_\omega^{l-1}\right\|_2 \leq \underbrace{\left(\rho\left(\mathbf{C}_\omega\right)+\tau\left(1-\rho\left(\mathbf{C}_\omega\right)\right)\right)^{l-1}}_{\text {Assumption 2.1 }}
$$
By definition of $U(\omega)$, we know,
$$
\begin{align}
l  & > U(\omega)\\
l - 1  & > U(\omega) - 1 = \frac{\log \epsilon}{\log(\rho + \tau(1 - \rho))} = \log_{(\rho + \tau(1 - \rho))} (\epsilon)
\end{align}
$$
Then
$$(\rho + \tau(1 - \rho))^{l-1} < (\rho + \tau(1 - \rho))^{U(\omega)-1} = \epsilon$$
and this results in $\epsilon \leq \dots < \epsilon$, which is a contradiction. 
■


### Claim 2. $U$ is decreasing towards $\omega^*$

**Step 1. ($U(\omega)$ is a monotonic function of $\rho$)**
For $u(\omega) = 1 + \frac{-\log \epsilon}{-\log \alpha}$ where $\alpha = \rho + \tau(1 - \rho)$, notice that as $\rho \downarrow$, we have
1) $\alpha \downarrow$
2) $\log \alpha \downarrow$
3) $\frac{\log \epsilon}{\log \alpha} \to 0$

So $U(\omega)$ is strictly decreasing as $\rho$ decreases. Vice versa.

**Step 2. (V-Shape of spectral radius)**

SOR theory by Hackbusch (2016) shows the V-shape of its spectral radius:
$$\rho(C_{\omega}) = \begin{cases} 
\frac{1}{4} \left( \omega \beta + \sqrt{\omega^2 \beta^2 - 4(\omega - 1)} \right)^2 & \omega < \omega^* \\
\omega - 1 & \omega > \omega^* \end{cases}$$

Over the interval $(0, \omega^*)$, observe that $\rho$ strictly decreases. From part A, since $U$ follows the same direction as $\rho$, therefore $U(\omega)$ is **monotonically decreasing** on $\left(0, \omega^*\right)$.

### Claim 3. Lipschitz Continuity

For interval $(\omega^*,2)$, the right side, we know $\rho(C_{\omega})=\omega -1$, so we have
$$
\begin{align}
\alpha_\omega  & = \rho + \tau(1-\rho)\\ 
 & =\tau + (1 - \tau)(\omega - 1)
\end{align}$$
Then using the chain rule, we compute $\partial_\omega U(\omega) = \frac{dU}{d\alpha} \cdot \frac{d\alpha}{d\omega}$:
$$\begin{aligned} \partial_\omega U(\omega) &= \frac{d}{d\omega} \left[ 1 + \frac{\log \varepsilon}{\log(\alpha_\omega)} \right] \\ &= (\log \varepsilon) \cdot \frac{d}{d\omega} \left[ (\log \alpha_\omega)^{-1} \right] \\ &= (\log \varepsilon) \cdot \underbrace{\left[ -(\log \alpha_\omega)^{-2} \cdot \frac{1}{\alpha_\omega} \right]}_{\text{Outer Derivative } \frac{dU}{d\alpha}} \cdot \underbrace{\frac{d}{d\omega} \left[ \tau + (1 - \tau)(\omega - 1) \right]}_{\text{Inner Derivative } \frac{d\alpha}{d\omega}} \\ &= (\log \varepsilon) \cdot \left[ \frac{-1}{\alpha_\omega \log^2 \alpha_\omega} \right] \cdot \left[ 1 - \tau \right] \\ &= \frac{-(1 - \tau) \log \varepsilon}{\alpha_\omega \log^2 \alpha_\omega} \end{aligned}$$
Therefore, we have obtained
$$\lvert \partial_\omega U(\omega) \rvert = \frac{(\tau - 1) \log \varepsilon}{(\tau + (1-\tau)(\omega - 1)) \log^2(\tau + (1-\tau)(\omega - 1))}$$
We want to show the Lipschitz continuity of $U(\omega)$, that is, to show its derivative is **bounded by a constant**. Here, the numerator is a constant, and denominator is basically in a form of $$f(\alpha) = \alpha \ln^2 \alpha$$To ensure the slope of the cost function $|\partial_\omega U(\omega)|$ does not blow up to infinity, we must ensure $f(\alpha)$ stays away from zero. So,
$$\begin{aligned} f'(\alpha) &= \frac{d}{d\alpha} (\alpha \ln^2 \alpha) \\ &= (1) \cdot \ln^2 \alpha + \alpha \cdot \left( 2 \ln \alpha \cdot \frac{1}{\alpha} \right) \\ &= \ln^2 \alpha + 2 \ln \alpha \\ &= \ln \alpha (\ln \alpha + 2) \end{aligned}$$
Set this to $0$, we get $\alpha = 1, \frac{1}{e^{2}}$, so the paper assumes $\tau \geq 1/e^2$ to avoid any explosion. For our $\alpha_\omega$, it starts at $\tau$ and only grows larger as $\omega$ increases. Then
## Theorem 2.1

> [!theorem|2.1] Regret bound for the automated SOR parameter selection
> Define $\alpha_t = \tau_t + (1-\tau_t)\max\{\beta_t^2, \omega_{\max}-1\}$, where $\beta_t = \rho(\mathbf{I}_n - \mathbf{D}_t^{-1}\mathbf{A}_t)$ and $\tau_t$ is the minimal $\tau$ satisfying Assumption 2.1 and the second part of Lemma 2.1. If we run Algorithm 2 using SOR initialized at
>  - solver: $\mathbf{x} = \mathbf{0}_n$ 
>  - parameter grid: $g_{[i]} = 1 + (\omega_{\max}-1)\frac{i}{d}$ 
>  - normalization: $K \ge \frac{-\log \varepsilon}{-\log \alpha_{\max}}$ for $\alpha_{\max} = \max_t \alpha_t$ 
>  - step-size: $\eta = 1/\sqrt{T}$  
>  then the expected number of iterations is bounded as:
> $$
> \mathbb{E} \sum_{t=1}^T \operatorname{SOR}_t(\omega_t) \le 2K\sqrt{2dT} + \sum_{t=1}^T \frac{-\log \varepsilon}{d \log^2 \alpha_t} + \min_{\omega \in (0, \omega_{\max}]} \sum_{t=1}^T U_t(\omega) 
> $$
> Furthermore, using $d = \sqrt[3]{\frac{T/2}{\log^2 \alpha_{\max}}}$, yields the tighter bound:
> $$
> \mathbb{E} \sum_{t=1}^T \operatorname{SOR}_t(\omega_t) \le 3 \log \frac{1}{\varepsilon} \sqrt[3]{\frac{2\overline{\gamma} T^2}{\log^2 \alpha_{\max}}} + \min_{\omega \in (0,2)} \sum_{t=1}^T U_t(\omega) 
> $$


> [!remark|2.1] 
> As number of instances ($T$) approaches infinity, the **average cost per instance** converges to the performance of the best fixed parameter $\omega$ in the search space. This means the AI agent eventually becomes as efficient as a human expert who already knows the optimal setting.


**Proof.**  

The first inequality in Theorem 2.1 (Equation 4) is a standard result for **Multi-Armed Bandits**. We need to prove that the SOR cost functions ($U_t$) meet the specific requirements of that theorem:

1. **Lipschitz Requirement**: Theorem B.3 requires the functions to be Lipschitz. 
	- For $\omega \in [1, \omega_{\max}]$, *Lemma 2.1* is used to show that $U_t - 1$ is indeed semi-Lipschitz.
	- for $\omega \in (0, 1)$, while non-smooth, Lemma 2.1.2 proves all $U_t$ are **strictly decreasing** toward $\omega=1$, so any parameter chosen in the non-Lipschitz region $(0, 1)$ will either be closer to the optimum or bounded by the value at $\omega=1$.
	Therefore, we can extend the comparator domain to the full range $(0, \omega_{\max}]$. 

2. **Boundedness Requirement**: The cost must be capped. We have already shown that $SOR_t - 1$ is safely bounded by $\frac{-\log \varepsilon}{-\log \alpha_t}$.


# 3. Semi-Lipschitz Bandits
# Appendix B — Semi-Lipschitz Bandits

We consider a sequence of adaptively chosen loss functions $\ell_1,\ldots,\ell_T : [a,b] \mapsto [0,K]$ on an interval $[a,b]\subset \mathbb{R}$ and upper bounds $u_1,\ldots,u_T : [a,b] \mapsto \mathbb{R}$ satisfying $u_t(x) \ge \ell_t(x)\ \forall t \in [T],\ x \in [a,b]$, where $[T]$ denotes the set of integers from $1$ to $T$. Our analysis will focus on the Tsallis-INF algorithm of Abernethy et al. (2015), which we write in its general form in Algorithm 4, although the analysis extends easily to the better-known (but sub-optimal) Exp3 (Auer et al., 2002). For Tsallis-INF, the following two facts follow directly from known results:

---

## Theorem B.1

> [!theorem|B.1] (Corollary of Abernethy et al. (2015, Corollary 3.2))
> If $\eta_t = 1/\sqrt{T}\ \forall t \in [T]$ then Algorithm 4 has regret
> $$
> \mathbb{E}\sum_{t=1}^T \ell_t(g_{[i_t]}) - \min_{i\in[d]} \sum_{t=1}^T \ell_t(g_{[i]}) \le 2K\sqrt{2dT}.
> $$

---

## Theorem B.2

> [!theorem|B.2] (Corollary of Zimmert & Seldin (2021, Theorem 1))
> If $\eta_t = 2/\sqrt{t}\ \forall t \in [T]$ then Algorithm 4 has regret
> $$
> \mathbb{E}\sum_{t=1}^T \ell_t(g_{[i_t]}) - \min_{i\in[d]} \sum_{t=1}^T \ell_t(g_{[i]}) \le 4K\sqrt{dT} + 1.
> $$

---

We now define a generalization of the Lipschitzness condition that trivially generalizes regular $L$-Lipschitz functions, as well as the notion of one-sided Lipschitz functions studied in the stochastic setting by Dütting et al. (2023).

## Definition B.1

> [!definition|B.1]
> Given a constant $L \ge 0$ and a point $z \in [a,b]$, we say a function $f : [a,b] \mapsto \mathbb{R}$ is $(L,z)$-semi-Lipschitz if
> $$
> f(x) - f(y) \le L|x-y|\ \forall x,y\ \text{s.t.}\ |x-z| \le |y-z|.
> $$

---

We now show that Tsallis-INF with bandit access to $\ell_t$ on a discretization of $[a,b]$ attains $O(T^{2/3})$ regret w.r.t. any fixed $x \in [a,b]$ evaluated by any comparator sequence of semi-Lipschitz upper bounds $u_t$. Note that guarantees for the standard comparator can be recovered by just setting $\ell_t = u_t\ \forall t \in [T]$, and that the rate is optimal by Kleinberg (2004, Theorem 4.2).

## Theorem B.3

> [!theorem|B.3]
> If $u_t \ge \ell_t$ is $(L_t,z)$-semi-Lipschitz $\forall t \in [T]$ then Algorithm 4 using action space $g \in [a,b]^d$ s.t. $g_{[i]} = a + \frac{b-a}{d}i\ \forall i \in [d-1]$ and $g_{[d]} = z$ has regret
> $$
> \mathbb{E}\sum_{t=1}^T \ell_t(g_{[i_t]}) - \min_{x\in[a,b]} \sum_{t=1}^T u_t(x) \le 2K\sqrt{2dT} + \frac{b-a}{d}\sum_{t=1}^T L_t.
> $$
> Setting $d = \sqrt[3]{\frac{(b-a)^2\bar{L}^2T}{2K^2}}$ for $\bar{L} = \frac{1}{T}\sum_{t=1}^T L_t$ yields the bound $3\sqrt[3]{2(b-a)\bar{L}K^2T^2}$.

**Proof.** 
Let $\lceil\cdot\rceil_g$ denote rounding to the closest element of $g$ in the direction of $z$. Then for $x \in [a,b]$ we have $|\lceil x\rceil_g - z| \le |x-z|$ and $|\lceil x\rceil_g - x| \le \frac{b-a}{d}$, so applying Theorem B.1 and this fact yields
$$
\begin{aligned}
\mathbb{E}\sum_{t=1}^T \ell_t(g_{[i_t]})
&\le 2K\sqrt{2dT} + \min_{i\in[d]} \sum_{t=1}^T \ell_t(g_{[i]})
\le 2K\sqrt{2dT} + \min_{i\in[d]} \sum_{t=1}^T u_t(g_{[i]}) \\
&= 2K\sqrt{2dT} + \min_{x\in[a,b]} \sum_{t=1}^T u_t(\lceil x\rceil_g) \\
&\le 2K\sqrt{2dT} + \frac{b-a}{d}\sum_{t=1}^T L_t + \min_{x\in[a,b]} \sum_{t=1}^T u_t(x).
\end{aligned}
$$


For contextual bandits, we restrict to $(L_t,b)$-semi-Lipschitz functions and $L_f$-Lipschitz policies, obtaining $O(T^{3/4})$ regret; this rate matches known upper and lower bounds for the case where losses are Lipschitz in both actions and contexts (Lu et al., 2010, Theorem 1), although this does not imply optimality of our result.

## Theorem B.4

> [!theorem|B.4]
> If $u_t \ge \ell_t$ is $(L_t,b)$-semi-Lipschitz and $c_t \in [c,c+C]\ \forall t \in [T]$ then Algorithm 5 using action space $g_{[i]} = a + \frac{b-a}{d}i$ and $h_{[j]} = c + \frac{C}{m}\left(j - \frac{1}{2}\right)$ as the grid of contexts has regret w.r.t. any $L_f$-Lipschitz policy $f : [c,c+C] \mapsto [a,b]$ of
> $$
> \mathbb{E}\sum_{t=1}^T \ell_t(g_{[i_t]}) - \sum_{t=1}^T u_t(\pi(c_t))
> \le m + 4K\sqrt{dmT} + \left(\frac{CL_f}{m} + \frac{b-a}{d}\right)\sum_{t=1}^T L_t.
> $$
> Setting $d = \sqrt[4]{\frac{(b-a)^3\bar{L}^2T}{4CL_fK^2}},\ m = \sqrt[4]{\frac{C^3L_f^3\bar{L}^2T}{4(b-a)K^2}}$ yields regret
> $$
> 4\sqrt[4]{4K^2\bar{L}^2(b-a)CL_fT^3} \;+\; \sqrt[4]{\frac{C^3L_f^3\bar{L}^2T}{4(b-a)K^2}}.
> $$

**Proof.**
Define $[\cdot]_h$ to be the operation of rounding to the closest element of $h$, breaking ties arbitrarily, and set $[T]_j = \{t \in [T] : [c_t]_h = h_{[j]}\}$. Furthermore, define $[x]_g$ to be the smallest element $g_{[i]}$ in $g$ s.t. $x + \frac{CL_f}{2m} \le g_{[i]}$ (or $\max_{i\in[d]} g_{[i]}$ if such an element does not exist).

$$
\begin{aligned}
\mathbb{E}\sum_{t=1}^T \ell_t(g_{[i_t]})
&= \mathbb{E}\sum_{j=1}^m \sum_{t\in[T]_j} \ell_t(g_{[i_t]}) - \min_{i\in[d]} \sum_{t\in[T]_j} \ell_t(g_{[i]}) + \min_{i\in[d]} \sum_{t\in[T]_j} \ell_t(g_{[i]}) \\
&\le m + 4\sum_{j=1}^m K\sqrt{d|[T]_j|} + \min_{i\in[d]} \sum_{t\in[T]_j} \ell_t(g_{[i]}) \\
&\le m + 4K\sqrt{dmT} + \sum_{j=1}^m \min_{i\in[d]} \sum_{t\in[T]_j} u_t(g_{[i]}) \\
&\le m + 4K\sqrt{dmT} + \sum_{t=1}^T u_t([f([c_t]_h)]_g).
\end{aligned}
$$
where the first inequality follows by Theorem B.2, the second applies Jensen’s inequality to the left term and $u_t \ge \ell_t$ on the right, and the last uses optimality of each $i$ for each $j$. Now since $f$ is $L_f$-Lipschitz we have by definition of $[\cdot]_h$ that $|f(c_t) - f([c_t]_h)| \le \frac{CL_f}{2m}$. This in turn implies that $f(c_t) \le [f([c_t]_h)]_g \le f(c_t) + \frac{CL_f}{m} + \frac{b-a}{d}$ by definition of $g$ and $[\cdot]_g$. Since $u_t$ is $(L_t,b)$-semi-Lipschitz, the result follows. 

$\square$