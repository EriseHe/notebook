# 1 What is the “Score”?

## 1.1 Definition of Score

> [!definition] Score
> The **score** of a probability distribution is the **gradient of its log-likelihood**:
>$$
s(x) = \nabla_x \log p(x)
>$$ 

>It tells us the **direction in which $p(x)$ increases the fastest** — that is, the direction pointing **toward regions of higher data density**.

## 1.2 Intuition of Score function

The score function $s(x)$ 
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
# 2 Basic Construction

We want a network $s_\theta(x)$ to approximate the **score** of the data density
$$
\nabla_x \log p_{\text{data}}(x).
$$

**What should the loss be?**
$$
\boxed{\;\mathcal L_{\text{SM}}(\theta)
= \mathbb E_{x\sim p_{\text{data}}}\big\|s_\theta(x)-\nabla_x\log p_{\text{data}}(x)\big\|_2^2\;}
$$

This is inconvenient when $p_{\text{data}}$ is supported on a thin manifold (score undefined off-manifold).  Introduce Gaussian corruption:
$$
\tilde x = x+\sigma\varepsilon,\qquad \varepsilon\sim\mathcal N(0,I),
\qquad p_\sigma(\tilde x\mid x)=\mathcal N(x,\sigma^2 I).
$$

Then
$$
\log p_\sigma(\tilde x\mid x)=C - \frac{\|\tilde x-x\|^2}{2\sigma^2},
\qquad
\nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)= -\frac{\tilde x-x}{\sigma^2}
= -\frac{1}{\sigma}\,\varepsilon .
$$

The **noisy** regression form:
$$
\boxed{\;
\mathbb E_{x,\tilde x}\big\|s_\theta(\tilde x)-\nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)\big\|_2^2 + C
= \mathbb E_{x,\varepsilon}\Big\|s_\theta(x+\sigma\varepsilon)+\tfrac{\varepsilon}{\sigma}\Big\|_2^2 + C\;}
$$

# 3 Why Estimate the Score Instead of the Probability Density?

### 3.1.1 Density Functions Are Hard to Model

Probability density can be complex, high-dimensional, and multimodal, so directly parameterizing $p(x)$ is hard in high dimension because the **partition function**
$$
Z=\int e^{-E_\theta(x)}dx
$$
is intractable. Gradients of the log-density cancel $Z$:
$$
\nabla_x \log p_\theta(x) = \nabla_x\big(-E_\theta(x)-\log Z\big)
= -\nabla_x E_\theta(x).
$$
Hence learning the score avoids normalizing constants.

### 3.1.2 The Score Is Simpler and Unconstrained

The **score function**
$$
s(x) = \nabla_x \log p(x)
$$
only depends on **relative changes** in $p(x)$, not on its absolute scale.

- It tells us **where** and **how fast** $p(x)$ increases or decreases.  
- There is **no need** to ensure normalization or positivity.  
- The score can take **any real value**, so it’s much easier for a neural network to approximate.
# 4 How to Estimate the Score?

## 4.1 Problem on the raw data manifold
$$
\min_\theta\; \mathbb E_{x\sim p_{\text{data}}}\big\|s_\theta(x)-\nabla_x\log p_{\text{data}}(x)\big\|^2
$$
is ill-defined since $p_{\text{data}}(x)=0$ off-manifold.

> [!theorem]
> $$
p_{\text {data }}(x)=0 \text { iff outside of manifold }
$$


## 4.2 First step: **Denoise**
Add noise $\tilde x=x+\sigma\varepsilon$. This corresponds to convolving the data density:
$$
p_\sigma(\tilde x)=\int p_{\text{data}}(x)\, \mathcal N(\tilde x\mid x,\sigma^2 I)\,dx,
$$
which has full support. We cannot compute $p_\sigma(\tilde x)$ in closed form, but
$p_\sigma(\tilde x\mid x)$ **is** tractable and will be enough.

## 4.3 Deriving  $\nabla_{\tilde x}\log p_\sigma(\tilde x)$  as a posterior expectation

We smooth the data with Gaussian corruption
$$
p_\sigma(\tilde x)=\int p(x)\,p_\sigma(\tilde x\mid x)\,dx,
\qquad p_\sigma(\tilde x\mid x)=\mathcal N(x,\sigma^2 I).
$$
$$
\begin{aligned}
\boxed{\nabla_{\tilde x}\log p_\sigma(\tilde x)}
&=\frac{ \nabla_{\tilde x} p_\sigma(\tilde x)}{ p_\sigma(\tilde x)}
=\frac{1}{\;p_\sigma(\tilde x)\;}
   \int \underbrace{p(x)}_{\text{indep. of }\tilde x}\;
        \nabla_{\tilde x} p_\sigma(\tilde x\mid x)\,dx \\[6pt]
&=\frac{1}{p_\sigma(\tilde x)}
   \int p(x)\;
        \underbrace{p_\sigma(\tilde x\mid x)\,
        \nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)}_{\substack{\text{``score of the conditional''}\\
        \text{(use } \nabla u = u \nabla \log u\text{)}}}\,dx \\[10pt]
&=\frac{1}{p_\sigma(\tilde x)}
   \int \underbrace{p(x)\,p_\sigma(\tilde x\mid x)}_{\text{joint }p(x,\tilde x)}\;
        \nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)\,dx \\[8pt]
&=\frac{1}{p_\sigma(\tilde x)}
   \int \underbrace{p(x\mid \tilde x)\,p_\sigma(\tilde x)}_{\substack{\text{Bayes: }\\
        p(x,\tilde x)=p(x\mid\tilde x)\,p_\sigma(\tilde x)}}\;
        \nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)\,dx \\[6pt]
&=\int \underbrace{p(x\mid \tilde x)}_{\text{posterior weight}}\;
        \underbrace{\nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)}_{\text{local score}}\,dx \\[4pt]
&=\boxed{\ \mathbb E_{x\sim p(x\mid \tilde x)}
          \big[\,\nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)\,\big]\ }.
\end{aligned}
$$

### 4.3.1 Gaussian check (plugs into the underbrace above)
For $p_\sigma(\tilde x\mid x)=\mathcal N(x,\sigma^2 I)$,
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
which also implies Tweedie’s denoising identity
$\ \mathbb E[x\mid \tilde x]=\tilde x+\sigma^2\nabla_{\tilde x}\log p_\sigma(\tilde x)$.


# 5 Expanding the ideal loss and isolating the constant

Let $g(\tilde x):=\nabla_{\tilde x}\log p_\sigma(\tilde x)$ and $\psi(x,\tilde x):=\nabla_{\tilde x}\log p_\sigma(\tilde x\mid x)$:
$$
\begin{aligned}
\mathcal L_{\text{ideal}}(\theta)
&= \mathbb E_{\tilde x}\big\|s_\theta(\tilde x)-g(\tilde x)\big\|_2^2 \\[2pt]
&= \mathbb E_{x,\tilde x}\big\|s_\theta(\tilde x)-\psi(x,\tilde x)\big\|_2^2
\;+\; \underbrace{\mathbb E_{\tilde x}\|g(\tilde x)\|^2
-\mathbb E_{x,\tilde x}\|\psi(x,\tilde x)\|^2}_{=:~C\;\text{(independent of }\theta\text{)}} .
\end{aligned}
$$

Using the Gaussian form of $\psi$ and $\tilde x=x+\sigma\varepsilon$,
$$
\psi(x,\tilde x)= -\frac{\tilde x-x}{\sigma^2} = -\frac{1}{\sigma}\,\varepsilon .
$$

Recall that $$

\begin{align}
\|a-b\|^2 & =(a+b)^\top(a-b) \\ 
 & =a^Ta-2a^\top b+b^Tb\\
 & =\|a\|^2-2a^\top b+\|b\|^2
\end{align}
$$so 


gives the same constant $C$ as above.

# 6. Final denoising score matching (DSM) objective

$$
\boxed{\;
\mathcal L_{\text{DSM}}(\theta)
= \mathbb E_{x\sim p_{\text{data}},~\varepsilon\sim\mathcal N(0,I)}
\Big\|\,s_\theta(x+\sigma\varepsilon)+\tfrac{\varepsilon}{\sigma}\,\Big\|_2^2
\;}
$$
(The dropped term $C$ does not depend on $\theta$.)

---

# 7. Side note: relation to DDPM

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


