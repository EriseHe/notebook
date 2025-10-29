
> **Notation (matches your notes):**  
> - Forward (noising) Markov chain $q$:  
>   $q(x_t\mid x_{t-1})=\mathcal N\!\big(\sqrt{\alpha_t}\,x_{t-1},\,(1-\alpha_t)I\big)$, with $0<\alpha_t<1$.  
>   $\beta_t:=1-\alpha_t$, $\ \bar\alpha_t:=\prod_{s=1}^t\alpha_s$.  
>   Marginal: $q(x_t\mid x_0)=\mathcal N\!\big(\sqrt{\bar\alpha_t}\,x_0,\,(1-\bar\alpha_t)I\big)$.
> - Reverse (denoising) model $p_\theta$: $p_\theta(x_{t-1}\mid x_t)$ Gaussian.  
> - Prior: $p(x_T)=\mathcal N(0,I)$.  
> - Your notation $s_\theta(x_t,t)$ denotes **predicted noise** (i.e., $s_\theta\equiv\varepsilon_\theta$).  

Our goal is a tight, readable derivation of the ELBO, the Gaussian posterior $q(x_{t-1}\!\mid x_t,x_0)$, and the reduction to the standard noise-prediction MSE loss.

---

## 1) ELBO via Jensen

We start by inserting the forward chain as an importance distribution and applying Jensen’s inequality:

$$
\begin{aligned}
\log p_\theta(x_0)
&=\log \int \frac{p_\theta(x_{0:T})}{q(x_{1:T}\mid x_0)}\,q(x_{1:T}\mid x_0)\,dx_{1:T} \\
&\ge \mathbb E_{q(x_{1:T}\mid x_0)}\!\left[ \log p_\theta(x_{0:T})-\log q(x_{1:T}\mid x_0)\right].
\end{aligned}
$$

Factorize the Markov chains (your “Markov chain” line):

$$
\begin{aligned}
p_\theta(x_{0:T})
&=p(x_T)\,\prod_{t=T}^{2} p_\theta(x_{t-1}\mid x_t)\,\cdot p_\theta(x_0\mid x_1),\\
q(x_{1:T}\mid x_0)
&=\prod_{t=1}^{T} q(x_t\mid x_{t-1}).
\end{aligned}
$$
Expanding the logs:

$$
\begin{aligned}
\text{ELBO}
&= \mathbb E_q\Big[
\log p(x_T) + \sum_{t=2}^T \log p_\theta(x_{t-1}\mid x_t) + \log p_\theta(x_0\mid x_1)
- \sum_{t=1}^T \log q(x_t\mid x_{t-1})
\Big].
\end{aligned}
$$
### 1.a) The “$B$” telescoping (your blue block)

**Key identity (Bayes on the forward chain):**
$$
\boxed{ \log q(x_{t-1}\mid x_t,x_0)-\log q(x_t\mid x_{t-1})
= \log q(x_{t-1}\mid x_0) - \log q(x_t\mid x_0). }
$$

**Why:** From $q(x_{t-1}\mid x_t,x_0)\,q(x_t\mid x_0)=q(x_t\mid x_{t-1})\,q(x_{t-1}\mid x_0)$.

Insert and subtract $\sum_{t=2}^T \log q(x_{t-1}\mid x_t,x_0)$ inside ELBO, then apply the identity and **sum from $t=2$ to $T$**:

$$
\begin{aligned}
\sum_{t=2}^T \big(\log q(x_{t-1}\mid x_t,x_0)-\log q(x_t\mid x_{t-1})\big)
&= \sum_{t=2}^T \big(\log q(x_{t-1}\mid x_0) - \log q(x_t\mid x_0)\big) \\
&= \log q(x_1\mid x_0) - \log q(x_T\mid x_0) 
\end{aligned}
$$

Use this to cancel the $-\log q(x_1\mid x_0)$ coming from $-\sum_{t=1}^T \log q(x_t\mid x_{t-1})$. The ELBO becomes

$$
\begin{align}
\text{ELBO}=&
\mathbb E_q\!\left[
\underbrace{\log p(x_T)-\log q(x_T\mid x_0)}_{\displaystyle -\mathrm{KL}(q(x_T\mid x_0)\,\|\,p(x_T))}
\;+\;
\sum_{t=2}^T \log \frac{p_\theta(x_{t-1}\mid x_t)}{q(x_{t-1}\mid x_t,x_0)}
\;+\;
\log p_\theta(x_0\mid x_1)
\right]\\

=&
-\mathbb E_q\,\mathrm{KL}\!\big(q(x_T\mid x_0)\,\|\,p(x_T)\big)
-\sum_{t=2}^T \mathbb E_q\,\mathrm{KL}\!\big(q(x_{t-1}\mid x_t,x_0)\,\|\,p_\theta(x_{t-1}\mid x_t)\big)
-\mathbb E_q\,\mathrm{KL}\!\big(q(x_0\mid x_1)\,\|\,p_\theta(x_0\mid x_1)\big)
\end{align}
$$

Equivalently, as a **sum of KLs** (your red/blue $A,B$ decomposition):

> **Practical notes (matching your margin comments):**  
> - With $p(x_T)=\mathcal N(0,I)$ and large $T$, $q(x_T\mid x_0)\approx \mathcal N(0,I)$, so the **terminal KL** $\to 0$.  
> - The **reconstruction** term at $t=1$ is often dropped or replaced by a simple decoder loss.  
> - Training focuses on $\sum_{t=2}^T$ KLs.

---

## 2) The forward posterior $q(x_{t-1}\mid x_t,x_0)$ (your “part A”)

We combine two Gaussians in $x_{t-1}$:
$$
q(x_{t-1}\mid x_0)=\mathcal N\!\big(\sqrt{\bar\alpha_{t-1}}\,x_0,\ (1-\bar\alpha_{t-1})I\big),
\quad
q(x_t\mid x_{t-1})=\mathcal N\!\big(\sqrt{\alpha_t}\,x_{t-1},\ (1-\alpha_t)I\big).
$$

Up to a constant,
$$
q(x_{t-1}\mid x_t,x_0)\ \propto\ q(x_t\mid x_{t-1})\,q(x_{t-1}\mid x_0).
$$

**Collect quadratic terms in $x_{t-1}$** (your $A,b$ line):

$$
\begin{aligned}
&-\frac{1}{2(1-\bar\alpha_{t-1})}\|x_{t-1}-\sqrt{\bar\alpha_{t-1}}x_0\|^2
-\frac{1}{2(1-\alpha_t)}\|x_t-\sqrt{\alpha_t}x_{t-1}\|^2
\\
&= -\frac12\,x_{t-1}^\top
\underbrace{\Big(\tfrac{1}{1-\bar\alpha_{t-1}}+\tfrac{\alpha_t}{1-\alpha_t}\Big)}_{A}\,x_{t-1}
\ +\
x_{t-1}^\top
\underbrace{\Big(\tfrac{\sqrt{\bar\alpha_{t-1}}}{1-\bar\alpha_{t-1}}x_0
+\tfrac{\sqrt{\alpha_t}}{1-\alpha_t}x_t\Big)}_{b}
\ +\ \text{const}.
\end{aligned}
$$

Thus the posterior is Gaussian with precision $A I$ and mean $A^{-1}b$:

$$
\boxed{
q(x_{t-1}\mid x_t,x_0)=\mathcal N\!\big(\tilde\mu_t(x_t,x_0),\ \tilde\sigma_t^2 I\big),\qquad
\tilde\sigma_t^2=A^{-1}=\frac{(1-\alpha_t)(1-\bar\alpha_{t-1})}{1-\bar\alpha_t}=\frac{1-\bar\alpha_{t-1}}{1-\bar\alpha_t}\,\beta_t.
}
$$

For the mean, simplify $A^{-1}b$ to the standard closed form:

$$
\boxed{
\tilde\mu_t(x_t,x_0)
= \frac{\sqrt{\alpha_t}\,(1-\bar\alpha_{t-1})}{1-\bar\alpha_t}\,x_t
\;+\;
\frac{\sqrt{\bar\alpha_{t-1}}\,\beta_t}{1-\bar\alpha_t}\,x_0.
}
$$

---

### 2.a) Equivalent “$\varepsilon$” form (your boxed conversion)

Introduce the **reparameterization** (forward marginal):
$$
x_t=\sqrt{\bar\alpha_t}\,x_0 + \sqrt{1-\bar\alpha_t}\,\varepsilon,\qquad \varepsilon\sim\mathcal N(0,I).
$$

Algebra gives an equivalent expression you used on the right board:

$$
\boxed{
\tilde\mu_t(x_t,x_0)
= \frac{1}{\sqrt{\alpha_t}}\left(x_t-\frac{\beta_t}{\sqrt{1-\bar\alpha_t}}\,\varepsilon\right).
}
$$

(Verify by substituting $x_t$ and collecting terms in $x_0$ and $\varepsilon$.)

---

## 3) Turning each KL into a noise-MSE (your red box “Because same variance”)

Assume the reverse conditional uses the **same variance** as the true posterior:

$$
p_\theta(x_{t-1}\mid x_t)=\mathcal N\!\big(\mu_\theta(x_t,t),\ \tilde\sigma_t^2 I\big),
$$

and parameterize its **mean** via predicted noise (your $s_\theta$):

$$
\boxed{
\mu_\theta(x_t,t)=\frac{1}{\sqrt{\alpha_t}}
\left(x_t-\frac{\beta_t}{\sqrt{1-\bar\alpha_t}}\,s_\theta(x_t,t)\right),
\qquad s_\theta \approx \varepsilon.
}
$$

For Gaussians with equal covariance $\Sigma=\tilde\sigma_t^2 I$,

$$
\mathrm{KL}\big(\mathcal N(m_1,\Sigma)\,\|\,\mathcal N(m_2,\Sigma)\big)
=\frac{1}{2}\,(m_1-m_2)^\top \Sigma^{-1}(m_1-m_2).
$$

Here $m_1=\tilde\mu_t(x_t,x_0)$, $m_2=\mu_\theta(x_t,t)$. Using the $\varepsilon$-form above,

$$
\begin{aligned}
\tilde\mu_t - \mu_\theta
&= \frac{1}{\sqrt{\alpha_t}}
\left(
x_t-\frac{\beta_t}{\sqrt{1-\bar\alpha_t}}\varepsilon
-\;x_t + \frac{\beta_t}{\sqrt{1-\bar\alpha_t}}s_\theta
\right)
\\
&=\frac{\beta_t}{\sqrt{\alpha_t(1-\bar\alpha_t)}}\left(s_\theta-\varepsilon\right).
\end{aligned}

$$

Therefore each KL term becomes a **weighted MSE on the noise**:

$$
\boxed{
\mathrm{KL}\!\left(q(x_{t-1}\mid x_t,x_0)\,\|\,p_\theta(x_{t-1}\mid x_t)\right)
=\underbrace{\frac{1}{2\tilde\sigma_t^2}\cdot\frac{\beta_t^2}{\alpha_t(1-\bar\alpha_t)}}_{\displaystyle \lambda_t}
\,\big\|s_\theta(x_t,t)-\varepsilon\big\|^2.
}
$$

With $\tilde\sigma_t^2=\dfrac{\beta_t(1-\bar\alpha_{t-1})}{1-\bar\alpha_t}$, this simplifies to

$$
\boxed{
\lambda_t
=\frac{\beta_t}{2\,\alpha_t\,(1-\bar\alpha_{t-1})}.
}
$$

> Many implementations use the **“simple loss”** by dropping $\lambda_t$ and minimizing an unweighted MSE (or a different schedule weighting); that matches your note “in practice only evaluate this”.

---

## 4) Final training objective (your gray box)

Sampling $x_0\sim\text{data}$, $t\sim\mathrm{Uniform}\{1,\dots,T\}$, $\varepsilon\sim\mathcal N(0,I)$, form
$x_t=\sqrt{\bar\alpha_t}x_0+\sqrt{1-\bar\alpha_t}\,\varepsilon$. Then

$$
\boxed{
\mathcal L_{\text{simple}}(\theta)
=\mathbb E\big[\;\|\,\varepsilon - s_\theta(x_t,t)\,\|^2\;\big]
\quad\text{(common practical loss)}
}
$$

and the exact ELBO-consistent, equal-variance objective is

$$
\boxed{
\mathcal L_{\text{ELBO}}(\theta)
=\sum_{t=2}^T \mathbb E\big[\,\lambda_t\,\|\,\varepsilon - s_\theta(x_t,t)\,\|^2\big]
\;+\; \underbrace{\text{(terminal KL)}_{\approx 0}}_{\mathrm{KL}(q(x_T\mid x_0)\,\|\,p(x_T))}
\;+\; \underbrace{\text{(reconstruction at }t=1\text{)}}_{\mathrm{KL}(q(x_0\mid x_1)\,\|\,p_\theta(x_0\mid x_1))}.
}
$$

---

## 5) One-line score-matching connection (your last page)

Because $x_t=\sqrt{\bar\alpha_t}x_0+\sqrt{1-\bar\alpha_t}\,\varepsilon$, predicting $\varepsilon$ is equivalent (up to known scalings) to predicting the **score** $\nabla_{x_t}\log q_t(x_t)$. This links DDPM training to denoising score matching and to continuous-time score-based SDE formulations.

---

### (Everything above matches your A/B blocks, the telescoping identity, the $A^{-1}b,A^{-1}$ posterior derivation, the $\varepsilon$ substitution, and the final KL→MSE reduction with the explicit weight $\lambda_t$.)