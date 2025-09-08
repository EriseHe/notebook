---
date: 2025-09-03
lecture: "2"
---
An AR (autoregressive) generative model represents the **joint probability of a sequence** by chaining conditionals left-to-right (the chain rule
$$P\left(w_{1: T}\right)=\prod_{t=1}^T P\left(w_t \mid w_{<t}\right)$$

## 1. Probability Distributions (recap)

- Discrete: $X ∈ \{1,…,K\}, \; P(X=i)=p_i, \; \sum_i p_i=1.$
- Continuous: $\int p(x) dx = 1, \; p(x) ≥ 0.$
- Multivariate: $p(\mathbf{x}) = p(x_1,…,x_d).$

# Autoregressive Models 

> **Scope.** This note mirrors the theoretical portions of *Lecture 2: Autoregressive Models* and keeps the **same notation** as the slides/notebook. We use:
>
> * Generic data: $x \in \mathcal{X}$, model $p_\theta(x)$.
> * Sequences for language: $Y=(w_1,\dots,w_T)$ with tokens $w_t \in \mathcal{V}$.
> * Context prefix: $w_{<t} := (w_1,\dots,w_{t-1})$.
> * When needed, a neural representation $h_t=f_\theta(\cdot)$ and a softmax decoder.

---

## 1. Generative Modeling: Two Distinct Tasks

A **generative model** is a probability distribution $p_\theta$ meant to approximate the true (unknown) data distribution $p_{\text{data}}$.

* **(1) Density Estimation.**
  **Input:** a concrete point $x$.
  **Output:** the model’s likelihood (or density/mass) $p_\theta(x)$.
  **Use cases:** evaluation, model selection, anomaly detection, compression.

* **(2) Sampling / Generation.**
  **Input:** nothing (optionally, a prompt or random seed).
  **Output:** a new sample $x' \sim p_\theta$ that *looks like* data.
  **Use cases:** simulation, text/image/audio generation.

> **Key distinction.** These are **different computational problems**. Density estimation needs a normalized $p_\theta(\cdot)$ you can evaluate; sampling needs a way to *draw* from $p_\theta$.

**Explicit** density models (e.g., autoregressive models) support **both** tasks. **Implicit** models (e.g., GANs) emphasize **sampling** but typically do not provide tractable $p_\theta(x)$.

## 2. Probability Recap (Notation & Constraints)

* **Discrete:** $X\in\{1,\dots,K\}$, $P(X=i)=p_i$, $\sum_i p_i=1$.
* **Continuous:** $p(x)\ge 0$, $\int p(x)\,dx=1$.
* **Multivariate:** $p(\mathbf{x})=p(x_1,\dots,x_d)$.

High-dimensional joint distributions (e.g., images with $10^5$–$10^6$ pixels) are combinatorially huge, motivating structured factorizations.

### 2.1 Conditional Probability

The definition of **conditional probability** for events is
$$
\boxed{P(A \mid B)=\frac{P(A \cap B)}{P(B)}}
$$
and equivalently, the "product rule":
$$P(A \cap B)=P(A \mid B) P(B)=P(B \mid A) P(A)$$
### 2.2 Joint distribution

**Joint distribution** can be written as the product of conditionals, that is:
$$
\begin{aligned}
p(x_1, x_2, \dots, x_n)
&= p(x_1)\, p(x_2, \dots, x_n \mid x_1) \\[6pt]
&= p(x_1)\, p(x_2 \mid x_1)\, p(x_3, \dots, x_n \mid x_1, x_2) \\[6pt]
&= p(x_1)\, p(x_2 \mid x_1)\, p(x_3 \mid x_1, x_2)\, p(x_4, \dots, x_n \mid x_1, x_2, x_3) \\[6pt]
&\;\;\vdots \\[6pt]
&= \prod_{i=1}^n p(x_i \mid x_1, \dots, x_{i-1}).
\end{aligned}
$$
## 3. Autoregressive (AR) Factorization via the Chain Rule

For a token sequence $Y=(w_1,\dots,w_T)$, the **chain rule** gives
$$
P(Y) \;=\; P(w_1,\dots,w_T)
\;=\; \prod_{t=1}^{T} P\!\big(w_t \mid w_{<t}\big)
$$
where $w_{{<t}}:=(w_{1,\dots}w_{t-1})$. In other words, for any $T \geq 2$,
$$
\boxed{\begin{aligned}
p\!\left(w_{1:T}\right) 
&= p\!\left(w_T \mid w_{<T}\right)\, p\!\left(w_{<T}\right) \\
&= p\!\left(w_T \mid w_{<T}\right)\, p\!\left(w_{T-1} \mid w_{<T-1}\right)\, p\!\left(w_{<T-1}\right) \\
&\;\;\vdots \\
&= \prod_{t=1}^T p\!\left(w_t \mid w_{<t}\right)
\end{aligned}}
$$
An **autoregressive (AR) model** chooses a *direction/order* (here: left-to-right) and **parametrizes each conditional**:
$$
p_\theta\!\big(w_t \mid w_{<t}\big) \;=\; \operatorname{Softmax}\!\big(Wh_{t-1}+b\big),
\quad h_{t-1} \;=\; f_\theta(e_1,\dots,e_{t-1}),
$$
where $e_t$ are token embeddings. Because each factor is a **proper distribution**, the product is **normalized**—giving an **exact** likelihood.

> **Order matters.** AR models require a fixed order; for text we use left→right, but any total order (e.g., pixels in a raster scan) is valid.
## 4. Training = Density Estimation (Maximum Likelihood)

### 4.1 Entropy

The entropy of a probability distribution can be interpreted as a **measure of uncertainty**, or lack of predictability, associated with a random variable drawn from a given distribution. We can also use entropy to define the information content of a data source.

Definition (*theoretical*) for population **entropy (discrete)** of a discrete distribution $p$ is:
$$
\boxed{\begin{aligned}
H(p) &\triangleq-\sum_x p(x) \log p(x)\\&=-\mathbb{E}_X\left[\log  p(X)\right]
\end{aligned}}
$$
### 4.2 Cross-Entropy

Definition (*theoretical*) for population **cross-entropy** between data $p$ and model $q$ is:​
$$\boxed{H(p, q) \triangleq-\sum_x p(x) \log q(x)}$$
And the *empirical estimator* (what we compute on data $\left\{w_1, \ldots, w_N\right\}$ ) for AR model becomes
$$
\boxed{H(\hat{p},q)=-\frac{1}{N} \sum_{t=1}^N \log q\left(w_t \mid w_{<t}\right)}
$$
- $N$: number of tokens in the test sequence  
- $w_t$: the $t$-th token  
- $w_{<t}$: all tokens before position $t$  
- $q(w_t \mid w_{<t})$: the probability assigned by the model

Given a dataset $\mathcal D=\{Y^{(n)}\}_{n=1}^N$, **maximum likelihood estimation (MLE)** maximizes
$$
\mathcal{L}(\theta)
= \sum_{n=1}^N \log q\big(Y^{(n)}\big)
= \sum_{n=1}^N \sum_{t=1}^{T^{(n)}} \log q\big(w^{(n)}_t \mid w^{(n)}_{<t}\big).
$$
Equivalently, we **minimize next-token cross-entropy**:
$$
\underbrace{-\frac{1}{N}\sum_{n,t} \log q\big(w^{(n)}_t \mid w^{(n)}_{<t}\big)}_{\text{empirical NLL}}
\quad\Longleftrightarrow\quad
\text{CrossEntropy}(p, q).
$$
### 4.3 Kullback–Leibler divergence
For a true next-token data distribution $p$ and model prediction $q$, the definition for **KL divergence** is:
$$
\boxed{D_{\mathrm{KL}}\left(p \| q\right)=\sum_x p(x) \log \frac{p(x)}{q(x)} \geq 0}
$$
- $H(p)$ : *entropy* of the true distribution (constant w.r.t. the model)
- $D_{\mathrm{KL}}(p \| q)$ : *penalty* for how far $q$ is from $p$

and $D_{KL} =0 \Longleftrightarrow p=q \text { (almost everywhere) }$. The **identity** linking all three is:
$$
\boxed{H(p,q) \;=\; H(p) + D_{\mathrm{KL}}(p\!\parallel q)}
$$
Since $H(p)$ is independent of $q$, minimizing cross-entropy (and perplexity) is equivalent to minimizing $D_{\mathrm{KL}}(p\parallel q)$.
### 4.4 Perplexity
**Perplexity (PP)** of a model is the *exponential* of the cross-entropy:
$$
\boxed{\text{PP}(q) = \exp\!\Big(H(p,q)\Big)
= \exp\!\left(-\frac{1}{N}\sum_{t=1}^N \log q(w_t \mid w_{<t})\right)}
$$
- Perplexity can be understood as the **effective average branching factor** of the model.  
- A **lower perplexity** means the model is less “perplexed” → better predictions.  
- A **higher perplexity** means the model is more “confused” → worse predictions.  

Examples:
- Perfect model → $\text{PP} = 1$  
- Uniform distribution over $V$ tokens → $\text{PP} = V$
## 5. Inference = Sampling / Generation (Left-to-Right)

To **generate** text:

1. Start from a beginning-of-sequence token $\langle\mathrm{bos}\rangle$ (or a prompt).
2. For $t=1,2,\dots$: draw $w_t \sim p_\theta(\cdot \mid w_{<t})$.
3. Stop at $\langle\mathrm{eos}\rangle$ or a length limit.

### 5.1 Decoding Strategies

* **Greedy (argmax):** $w_t=\arg\max_v p_\theta(v\mid w_{<t})$. Deterministic; can be bland.
* **Random sampling:** sample from $p_\theta(\cdot\mid\cdot)$ directly.
* **Temperature:** rescale logits/probabilities by $1/T$ before sampling; $T<1$ sharper, $T>1$ more diverse.
* **Top-$k$:** restrict to the $k$ most probable tokens, renormalize, then sample.
* **Nucleus (top-$p$):** choose the smallest set $S$ such that $\sum_{v\in S} p_\theta(v\mid\cdot)\ge p$; sample within $S$.
* **Beam search:** approximate $\arg\max_Y p_\theta(Y)$ by expanding the $B$ best partial hypotheses.

---

## 6. Why AR Models are Attractive

* **Exact likelihood.** Each conditional is normalized → tractable training and evaluation (perplexity, NLL).
* **Simple sampling.** Left-to-right draws match the factorization.
* **Flexible function class.** Conditionals $p_\theta(w_t\mid w_{<t})$ can be parameterized by RNNs, LSTMs/GRUs, Transformers, etc.

**Trade-off:** Sampling is **sequential**—inherently less parallel than feed-forward decoders (but see practical accelerations such as speculative decoding; beyond this lecture’s scope).

---
### 6.1 AR vs. Other Generative Families

* **AR (explicit):** exact likelihood; slow sampling.
* **Normalizing flows (explicit):** exact likelihood; fast sampling; invertibility constraints.
* **VAEs (explicit latent):** tractable **lower bounds** on likelihood; amortized inference.
* **GANs (implicit):** high-fidelity samples; no tractable likelihood (density estimation not available).
## 9. Minimal Derivations (Collected)

### 9.1 Chain Rule for Sequences

$$
\begin{aligned}
P(w_1,\dots,w_T)
&= P(w_1)\,P(w_2\mid w_1)\cdots P(w_T\mid w_{<T}) \\
&= \prod_{t=1}^T P(w_t\mid w_{<t}).
\end{aligned}
$$

### 9.2 MLE = Cross-Entropy Minimization

Let $\hat p$ be the empirical distribution from $\mathcal D$. Then

$$
\arg\max_\theta \;\mathbb{E}_{Y\sim \hat p}\big[\log p_\theta(Y)\big]
= \arg\min_\theta \; D_{\mathrm{KL}}(\hat p\parallel p_\theta)
= \arg\min_\theta \; \mathbb{E}_{\hat p}\big[-\log p_\theta(Y)\big].
$$

### 9.3 Perplexity and Bits-per-Token

$$
\mathrm{PP} \;=\; \exp\!\Big(\tfrac{\mathrm{NLL}}{T}\Big),
\qquad
\mathrm{BPT} \;=\; \tfrac{\mathrm{NLL}}{T\ln 2}
\quad\Rightarrow\quad
\mathrm{PP} \;=\; 2^{\mathrm{BPT}}.
$$
