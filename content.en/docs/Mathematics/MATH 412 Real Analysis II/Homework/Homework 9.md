8.5: 1, [2, 3], 4, [5]; Chapter 8: [21, 22].

**Problem 8.5.2** Establish formula $\mathbf{c}$ of Example 8.5.7 as follows. Prove that $e^{-x} x^{p+2} \rightarrow 0$ as $x \rightarrow \infty$, and then compare the integral with $\int_1^{\infty}\left(1 / x^2\right) d x$.

**Proof.** Let $\epsilon > 0$ be arbitrary. We want to show that $\exists N > 0$ such that for all $x > N$,  
$$\left|e^{-x}x^{p+2} - 0\right| = e^{-x}x^{p+2} < \epsilon.$$
Since $e^{-x}x^{p+2} = \exp\Bigl(-x + (p+2)\ln x\Bigr)$, and $\displaystyle\lim_{x\to\infty}\frac{(p+2)\ln x}{x} = 0,$ there exists a number $N_1>0$ such that for all $x > N_1$ we have  
$$\frac{(p+2)\ln x}{x} < \frac{1}{2}\Longrightarrow (p+2)\ln x < \frac{x}{2}$$
It follows that for all $x > N_1$,  
$$-x + (p+2)\ln x < -\frac{x}{2}.$$
Taking exponentials to get:  
$$e^{-x}x^{p+2} = \exp\Bigl(-x + (p+2)\ln x\Bigr) < \exp\Bigl(-\frac{x}{2}\Bigr) = e^{-x/2}.$$
For $e^{-x/2} < \epsilon,$ we simply need $-\frac{x}{2}  < \ln \epsilon$, which is $x  > -2\ln \epsilon$. We define $N_2 = -2\ln \epsilon$. Let $N = \max\{N_1, N_2\}$. Then, $\forall x > N$ we have both  
$$e^{-x}x^{p+2} < e^{-x/2} \quad \text{and} \quad e^{-x/2} < \epsilon,$$
so that $e^{-x}x^{p+2} < \epsilon$. By the definition of the limit we have:
$$\lim_{x\to\infty} e^{-x}x^{p+2} = 0.$$
Next, we use this to compare the integral $\int_1^\infty e^{-x}x^p\,dx$ with the convergent integral $\int_1^\infty \frac{1}{x^2}\,dx$. Note that for $x \ge 1$ and a fixed $p$, it is always true that
$$x^{p} \le x^{p+2}\Longrightarrow e^{-x}x^p \le e^{-x}x^{p+2}$$
As already demonstrated above, for sufficiently large $x$ , we can have
$$0 \leq e^{-x} x^p \leq e^{-x} x^{p+2}<\frac{1}{x^2}$$
Hence, there exists some $M$ such that for all $x > M$,
$$0 \le e^{-x}x^p \le \frac{1}{x^2}.$$
Given that the tail integral
$$\int_1^{\infty} e^{-x} x^p d x=\int_1^M e^{-x} x^p d x+\int_M^{\infty} e^{-x} x^p d x$$
converges, so $\int_M^{\infty} e^{-x} x^p d x$ converges. By the Comparison Test, the integral
$$\int_{M}^\infty e^{-x}x^p\,dx$$
must also converges. Finally, note that integral over any finite interval $[1,M]$ is finite, so the entire integral 
$$\int_{1}^\infty e^{-x}x^p\,dx$$
converges.

**Problem 8.5.3** Let $f:[a, \infty[\rightarrow \mathbb{R}$ be Riemann integrable on bounded intervals. Show that $\int_a^{\infty} f$ (conditional convergence) exists iff for every $\varepsilon>0$, there is a $T$ such that $t_1, t_2 \geq T$ implies

$$
\left|\int_{t_1}^{t_2} f(x) d x\right|<\varepsilon
$$

Let $f : [a,\infty) \to \mathbb{R}$ be a such function, we say the improper integral 
$$\int_a^\infty f(x)\,dx$$
exists (or converges) if the limit
$$\lim_{t \to \infty} \int_a^t f(x)\,dx$$
exists for some number $L$. We want to show that this is equivalent to this Cauchy condition: For every $\varepsilon > 0$, there exists $T \ge a$ such that for all $t_1, t_2 \ge T,$ we have $\left|\int_{t_1}^{t_2} f(x)\,dx\right| < \varepsilon$. 

**($\implies$)** First, by assumption, the improper integral $\int_a^\infty f(x)\,dx$ converges a $L\in \mathbb{R}$ s.t:
$$\lim_{t \to \infty} \int_a^t f(x)\,dx = L$$
By definition of the limit, this means for any given $\varepsilon>0$, there exists $T$ s.t. for all $t \ge T,$ we can have $$\left|\int_a^t f(x)\,dx - L\right| < \frac{\varepsilon}{2}.$$Let $t_1, t_2 \ge T$. Without loss of generality, assume $t_1 < t_2$, then we can write:
$$
\int_{t_1}^{t_2} f(x) d x=\left(\int_a^{t_2} f(x) d x-L\right)-\left(\int_a^{t_1} f(x) d x-L\right)
$$
Taking absolute values and using the triangle inequality:
$$
\left|\int_{t_1}^{t_2} f(x) d x\right| \leq\left|\int_a^{t_2} f(x) d x-L\right|+\left|\int_a^{t_1} f(x) d x-L\right|
$$
By our choice of $T$, for both $t_1, t_2 \ge T$, $$\left|\int_a^{t_i} f(x)\,dx - L\right| < \frac{\varepsilon}{2}\quad $$Hence,
$$
\left|\int_{t_1}^{t_2} f(x) d x\right| \leq \frac{\varepsilon}{2}+\frac{\varepsilon}{2}=\varepsilon
$$
Thus, for every $\varepsilon>0$, we always have a $T$ such that the integral is less than $\varepsilon$ whenever $t_1,t_2 \ge T$.

**($\Longleftarrow$)** Conversely, suppose that for every $\varepsilon > 0$, there is a $T$ such that for all $t_1,t_2 \ge T,$
$$\left|\int_{t_1}^{t_2} f(x)\,dx\right| < \varepsilon.$$
We want to prove that $\int_a^\infty f(x)\,dx$ actually converges to some limit $L$. We look at the net area from $a$ to $t$:
   $$I(t) := \int_a^t f(x)\,dx.$$
We want to show $\{I(t)\}_{t \ge a}$ is a Cauchy sequence in the limit sense and therefore convergent as $t \to \infty$. Take any $t_1, t_2 \ge T$ (for some $T$ chosen large enough for a given $\varepsilon$), and again w.l.o.g. let $t_1 < t_2$. Then 
$$I(t_2) - I(t_1) = \int_a^{t_2} f(x)\,dx - \int_a^{t_1} f(x)\,dx = \int_{t_1}^{t_2} f(x)\,dx.$$
By hypothesis,
$$\left|I(t_2) - I(t_1)\right| 
   = \left|\int_{t_1}^{t_2} f(x)\,dx\right|
   < \varepsilon,$$
whenever $t_1,t_2 \ge T$. This is exactly the Cauchy criterion for real numbers: $\{I(t)\}$ is a Cauchy net (or, loosely speaking, a Cauchy sequence as $t\to\infty$). In $\mathbb{R}$, every Cauchy sequence converges, so $I(t)$ converges to some limit $L \in \mathbb{R}$.
Since $I(t) = \int_a^t f(x)\,dx$ converges to $L$ as $t \to \infty$, we have precisely
$$\lim_{t\to\infty} \int_a^t f(x)\,dx = L,$$
which means the improper integral $\int_a^\infty f(x)\,dx$ converges (conditionally or absolutely, depending on $f$).

Thus, the given Cauchy‐type condition on $\int_{t_1}^{t_2} f$ is *sufficient* to ensure the improper Riemann integral converges. Since we have demonstrated both direction to be true, we conclude these conditions are equivalent. 


**Problem 8.5.5** For what $\alpha$ is $\int_0^{\infty} \frac{x^\alpha}{1+x^\alpha} d x$ convergent?

**Chatper 8.21** Show that $\int_1^{\infty} x^{-p} \sin x d x$ converges if $p>1$. Show that if $0<p \leq 1$, then the convergence is conditional.

**Chapter 8.22** The gamma function is defined to be the function given by the improper integral $\Gamma(p)=\int_1^{\infty} e^{-x} x^{p-1} d x$. Show that the integral is convergent for $p>0$.