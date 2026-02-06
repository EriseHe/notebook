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

# Proof Relevant to BoomerAMG

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
> The theorem proves that as the number of instances ($T$) approaches infinity, the **average cost per instance** converges to the performance of the best fixed parameter $\omega$ in the search space. This means your AI agent eventually becomes as efficient as a human expert who already knows the optimal setting.
## Theorem B.3 Preconditioned CG

> potentially the "Proof of Concept" for why BoomerAMG is learnable as **preconditioner**.

## Theorem B.4





