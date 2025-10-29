# 1 What is the “Score”?

## 1 Definition of Score

> [!definition] Score
> The **score** of a probability distribution is the **gradient of its log-likelihood**:
>$$
s(x) = \nabla_x \log p(x)
>$$ 

>It tells us the **direction in which $p(x)$ increases the fastest** — that is, the direction pointing **toward regions of higher data density**.

## 2 Intuition of Score function

The score function $s(x)$:

- points **toward more likely samples**.  
- shows how to “move” a noisy sample back to data.  

In diffusion models, the network learns to approximate this function. Knowing $s(x)$ is almost as good as knowing $p(x)$ itself. We can:

- infer the **geometry** and **shape** of the data distribution even without explicitly computing $p(x)$
- and also (implicitly) recover the underlying probability density
$$
\boxed{\nabla_x \log p(x) = s(x)
\quad \Rightarrow \quad
\log p(x) = \int s(x) \, dx + C}
$$


## 3 Sampling from the Implicit Distribution

If we know the true score $s(x)$, we can **generate new samples** from the corresponding distribution by following the **reverse of the diffusion (noising) process** - or equivalently, by running a **Langevin dynamics** update:

> [!definition] Langevin Dynamics
>$$
x_{i+1} = x_i + \epsilon \, \nabla_x \log p(x_i) + \sqrt{2\epsilon}\, z_i,
\quad z_i \sim {N}(0, I)
> $$
> where
> 
> - $\epsilon$: small step size (learning rate)  
> - $z_i$: Gaussian noise (same dimension as $x$)

![Langevin|840x840](https://calvinyluo.com/assets/images/diffusion/score_3d.jpeg) ![2D](https://calvinyluo.com/assets/images/diffusion/score_sample.webp)

# 2 Why Estimate the Score Instead of the Probability Density?

## 1 Density Functions Are Hard to Model

Probability density can be complex, high-dimensional, and multimodal, so directly parameterizing $p(x)$ is hard in high dimension because we always need:

1. positive everywhere 
2. integrate to 1 (for normalization) $$\int p(x) d x=1$$
For example, notice that the **partition function** for energy-based model $E_{\theta}(x)$,
$$
Z=\int e^{-E_\theta(x)}dx
$$
is intractable for high dimensional $x \in R^D$. However, the gradients of the log-density cancel $Z$:
$$
\nabla_x \log p_\theta(x) = \nabla_x\big(-E_\theta(x)-\log Z\big)
= -\nabla_x E_\theta(x).
$$
Hence learning the score avoids normalizing constants.

## 2 The Score Is Simpler and Unconstrained

The **score function**
$$
s(x) = \nabla_x \log p(x)
$$
only depends on **relative changes** in $p(x)$, not on its absolute scale.

- tells us **where** and **how fast** $p(x)$ increases or decreases.  
- **no need** to ensure normalization or positivity.  
- "score" can take **any real value** $\to$ much easier for a neural network to approximate.

![Score](https://yang-song.net/assets/img/score/smld.jpg)
# 3 How to Estimate the Score?

## 1 The Idea of "Score Matching"

We want the learned score network to approximate the true score $\nabla_x \log p(x)$. 
$$s_\theta(x)\approx \underbrace{\nabla_x \log p(x)}_{\text{true score}}$$
Formally, we simply minimize the difference between them
$$
\boxed{\text { minimize the expected 
squared error } \quad\Longrightarrow\quad \min _\theta \mathbb{E}_{x \sim p(x)}\left[\left\|s_\theta(x)-\nabla_x \log p(x)\right\|^2\right]}
$$
However, the term $\nabla_x \log p(x)$ is **NOT computable** directly, so we have to find another surrogate objective (computed using data samples $\left\{x_i\right\}_{i=1}^n$ only). To do this, we introduce the noisy version of this matching, **Denoising Score Matching (DSM)**.

## 2 Using *noisy* score instead of the *true* data score

Given that we want a network $s_\theta(x)$ to approximate the score of the real data distribution, **what should the loss be?**
$$
\;\mathcal L_{\text{SM}}(\theta)
= \mathbb E_{x\sim p_{\text{data}}}\big\|s_\theta(x)-\nabla_x\log p_{\text{data}}(x)\big\|_2^2\
$$
### 2.1 Problem on the data manifold

However, here $\min_\theta\; \mathbb E_{x\sim p_{\text{data}}}\big\|s_\theta(x)-\nabla_x\log p_{\text{data}}(x)\big\|^2$ is ill-defined because $p_{\text{data}}$ is supported on a thin manifold (score is undefined off-manifold). 

> [!theorem]
> $$
p_{\text {data }}(x)=0 \quad\Longleftrightarrow\quad\text { outside of manifold }
$$

Therefore, this means $\log p_{\text {data }}=\text { undefined }$, which is problematic.

## 3.3.2 Solution: **Denoise**

We introduce Gaussian corruption:
$$
\boxed{\tilde x = x+\sigma\varepsilon,\quad\text{where } \varepsilon\sim\mathcal N(0,I)}
$$
and hence we have
$$ \quad\boxed{p_\sigma(\tilde x\mid x)=\mathcal N(x,\sigma^2 I)}$$
This process corresponds to **convolving** the data density:
$$
p_\sigma(\tilde x)=\int p_{\text{data}}(x)\,\underbrace{p_\sigma(\tilde x\mid x)}_{ \mathcal N(\tilde x\mid x,\sigma^2 I)}\,dx
$$
which has **full support** (non-zero almost everywhere). We cannot compute $p_\sigma(\tilde x)$ in closed form(why?), but $p_\sigma(\tilde x\mid x)$ **is** tractable and will be enough. Then
$$
\begin{align}
\log p_\sigma(\tilde x\mid x)= & C - \frac{\|\tilde x-x\|^2}{2\sigma^2}\\
\Longrightarrow \quad\nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)= &  -\frac{\tilde x-x}{\sigma^2}
 \\
 = &  -\frac{\varepsilon }{\sigma}
\end{align}
$$
The **noisy** regression form:
$$
\boxed{\;
\mathbb E_{x,\tilde x}\big\|s_\theta(\tilde x)-\nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)\big\|_2^2 + C
= \mathbb E_{x,\varepsilon}\Big\|s_\theta(x+\sigma\varepsilon)+\tfrac{\varepsilon}{\sigma}\Big\|_2^2 + C\;}
$$

## 4.3 Relation Between Marginal and Conditional Scores

If we smooth the data with Gaussian corruption
$$
p_\sigma(\tilde x)=\int \underbrace{p(x)}_{\text{intractable}}\,\underbrace{p_\sigma(\tilde x\mid x)}_{\mathcal N(x,\sigma^2 I).}\,dx
$$
then, notice $p(x)$ is independent of $\tilde x$, hence
$$
\begin{aligned}
\boxed{\nabla_{\tilde x}\log p_\sigma(\tilde x)}
&=\frac{ \nabla_{\tilde x} p_\sigma(\tilde x)}{ p_\sigma(\tilde x)}
=\frac{1}{\;p_\sigma(\tilde x)\;}
   \int p(x)\;
        \underbrace{\nabla_{\tilde x} p_\sigma(\tilde x\mid x)}_{\text{(use } \nabla u = u \nabla \log u\text{)}}\,dx \\[6pt]
&=\frac{1}{p_\sigma(\tilde x)} \int p(x)\;
        \underparen{p_\sigma(\tilde x\mid x)\,
        \nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)}dx \\[10pt]
&=\frac{1}{p_\sigma(\tilde x)}
   \int \underbrace{p(x)\,p_\sigma(\tilde x\mid x)}_{\text{joint }p(x,\tilde x)}\;
        \nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)\,dx \\[8pt]
&=\cancel{\frac{1}{p_\sigma(\tilde x)}}
   \int \underbrace{p(x, \tilde{x})}_{\substack{\text{Bayes: }\\
        p(x,\tilde x)=p(x\mid\tilde x)\,\cancel{p_\sigma(\tilde x)}}}\;
        \nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)\,dx \\[6pt]
&=\int \underbrace{p(x\mid \tilde x)}_{\text{posterior weight}}\;
        \underbrace{\nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)}_{\text{local score}}\,dx \\[4pt]
&=\boxed{\ \mathbb E_{x\sim p(x\mid \tilde x)}
          \big[\,\nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)\,\big]\ }
\end{aligned}
$$

### 4.3.1 Gaussian check

For $p_\sigma(\tilde x\mid x)=\mathcal N(x,\sigma^2 I)$, we have
$$
\underbrace{\nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)}_{\text{score of the conditional}}
= -\frac{\tilde x-x}{\sigma^2}.
$$
Therefore,
$$
\nabla_{\tilde x}\log p_\sigma(\tilde x)
= \mathbb E_{x\mid \tilde x}\!\left[-\frac{\tilde x-x}{\sigma^2}\right]
= \frac{\mathbb E[x\mid \tilde x]-\tilde x}{\sigma^2},
$$
which also implies Tweedie’s denoising identity (idk what this is)
$$\ \mathbb E[x\mid \tilde x]=\tilde x+\sigma^2\nabla_{\tilde x}\log p_\sigma(\tilde x)$$
# 5 Expanding the ideal loss and isolating the constant


$$
\begin{aligned}
\boxed{L_{\text{ideal}}(\theta)}
&=\mathbb{E}_{\tilde x\sim p_\sigma}\!\left[\left\|\,s_\theta(\tilde x)
    -\nabla_{\tilde x}\log p_\sigma(\tilde x)\,\right\|^2\right] \\[6pt]
&=\mathbb{E}_{\tilde x}\!\left[\left\|\,s_\theta(\tilde x)
   -\underbrace{\mathbb{E}_{x\sim p(x\mid \tilde x)}
     \big[\nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)\big]}_{\text{posterior expectation identity}}\right\|^2\right] \\[6pt]
&\overset{\|a-b\|^2}{=}
\mathbb{E}_{\tilde x}\!\Big[\|s_\theta(\tilde x)\|^2
-2\,s_\theta(\tilde x)^\top \mathbb{E}_{x\mid \tilde x}\![\nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)]
+\big\|\mathbb{E}_{x\mid \tilde x}\![\nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)]\big\|^2\Big] \\[6pt]
&=\underbrace{\mathbb{E}_{\tilde x}\!\left[\|s_\theta(\tilde x)\|^2\right]}_{\text{depends on }\theta}
-2\,\underbrace{\mathbb{E}_{x,\tilde x}\!\left[s_\theta(\tilde x)^\top \nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)\right]}_{\text{swap } \mathbb{E}_{\tilde x}\mathbb{E}_{x\mid\tilde x}}
+\underbrace{\mathbb{E}_{\tilde x}\!\left[\left\|\mathbb{E}_{x\mid \tilde x}\![\nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)]\right\|^2\right]}_{\text{no }\theta} \\[6pt]
&=\mathbb{E}_{x,\tilde x}\!\left[\|s_\theta(\tilde x)\|^2-2\,s_\theta(\tilde x)^\top \nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)\right]
+\color{yellow}{C_0} \\[4pt]
\overset{\substack{\text{complete-}\\\text{the-square}}}{\Rightarrow}\;&=\mathbb{E}_{x,\tilde x}\!\left[\|s_\theta(\tilde x)-\nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)\|^2\right]
+\underbrace{\Big(\color{yellow}{C_0}-\mathbb{E}_{x,\tilde x}\!\left[\|\nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)\|^2\right]\Big)}_{\displaystyle \color{yellow}{=:C}\ \text{no }\theta} \\[6pt]
&\equiv \boxed{L_{\text{DSM}}(\theta)}+\color{yellow}{C}
\end{aligned}
$$
where on line (3) you may recall that 
$$
\begin{align}
\|a-b\|^2 & =(a+b)^\top(a-b) \\ 
 & =a^Ta-2a^\top b+b^Tb\\
 & =\|a\|^2-2a^\top b+\|b\|^2
\end{align}
$$
which gives the same constant $C$ as above. Therefore, eventually we have:
$$\boxed{L_{D S M}(\theta)=\mathbb{E}_{x, \widetilde{x}}\left[\left\|s_\theta(\widetilde{x})-\nabla_{\widetilde{x}} \log p(\widetilde{x} \mid x)\right\|^2\right] }$$

# 6. Final denoising score matching (DSM) objective

For Gaussian noise $p(\widetilde{x}\mid x) = {N}(\widetilde{x}; x, \sigma^2 I)$,
$$
\nabla_{\widetilde{x}}\log p(\widetilde{x}\mid x)
= -\frac{\widetilde{x}-x}{\sigma^2}
$$
which gives the standard **denoising score matching** loss:
$$
\boxed{
{L}_{DSM}(\theta)
=
\mathbb{E}_{x,\epsilon}
\left[
\left\|\, s_\theta(x + \sigma \epsilon)
+ \frac{\epsilon}{\sigma}\, \right\|^2
\right],
\quad \epsilon \sim {N}(0, I)
}
$$

# 4 Side note: relation to DDPM

In DDPM, for each noise level $t$,
$$
x_t=\sqrt{\bar\alpha_t}\,x_0+\sqrt{1-\bar\alpha_t}\,\varepsilon, \qquad
\varepsilon\sim\mathcal N(0,I),
$$
and training often minimizes
$$
\mathbb E\big\|\varepsilon_\theta(x_t,t)-\varepsilon\big\|_2^2,
$$
which is equivalent to DSM at scale $\sigma_t=\sqrt{1-\bar\alpha_t}$ via
$$
s_\theta(x_t,t)\;\approx\;-\frac{1}{\sigma_t}\,\varepsilon_\theta(x_t,t)
\quad(\text{up to known weights}).
$$




