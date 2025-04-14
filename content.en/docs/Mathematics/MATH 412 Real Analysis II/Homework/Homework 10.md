8.6: [1, 3]; Chapter 8: [24, 36, 39]

**Problem 8.6.1** Show that Theorem 8.6.1 can be proved using the methods of Chapter 5 if the $g_n$ are continuous.

Theorem 8.6.1 (Lebesgue's Monotone Convergence Theorem) Let $g_n : [0, 1] \to \mathbb{R}$ be a sequence of nonnegative functions such that each improper integral $\int_0^1 g_n(x) dx$ exists and is finite. Suppose that $0 \leq g_{n+1}(x) \leq g_n(x)$
and that $g_n(x) \to 0$ for each $x \in [0, 1]$. Then $$\lim_{n\to\infty} \int_0^1 g_n(x) dx = 0.$$

> [!definition|*]
> Proof. Let $g_n : [0, 1] \to \mathbb{R}$ be a sequence of nonnegative functions such that each improper integral $\int_0^1 g_n(x) dx$ exists and is finite. Suppose that $0 \leq g_{n+1}(x) \leq g_n(x)$. Since each $g_n$ is continuou within the compact interval $[0,1]$, so it is bounded by a maximum vlaue. We define:
>    $$      M_n := \max_{x\in[0,1]} g_n(x)
>$$
>The monotonicity condition $g_{n+1}(x) \le g_n(x)$ for all $x$ means that $M_{n+1} \le M_n$. Therefore, the sequence $\{M_n\}$ is nonincreasing and bounded below by 0.
> for each fixed , we have  
>    $$\lim_{n\to\infty} g_n(x) = 0$$
>    Suppose, for the sake of contradiction, that $\lim_{n\to\infty} M_n \neq 0$. Then there exists an $\epsilon_0 > 0$ and a subsequence $\{n_k\}$ such that  
>    $$M_{n_k} \ge \epsilon_0 \quad \forall k\
>$$
>    For each $k$, choose $x_{n_k} \in [0,1]$ such that  
>    $$ g_{n_k}(x_{n_k}) = M_{n_k} \ge \epsilon_0$$
>    This contradicts the fact that $g_{n_k}(x_{n_k}) \to 0$ as $n_k \to \infty$.  
>    Hence,  
>    $$\lim_{n\to\infty} M_n = 0$$
>    That is, for every $\epsilon > 0$ there exists $N \in \mathbb{N}$ such that for all $n \ge N$,  
>    $$ M_n < \epsilon$$
>    Since $0 \le g_n(x) \le M_n$ for all $x \in [0,1]$, it follows that for all $x$ and for $n\ge N$,  
>    $$|g_n(x) - 0| \le M_n < \epsilon $$
>    Thus, $g_n \to 0$ uniformly on $[0,1]$.
> By the Uniform Convergence Theorem , if a sequence of integrable functions $\{f_n\}$ converges uniformly to a function $f$ on $[a,b]$, then  
>    $$\lim_{n\to\infty} \int_a^b f_n(x)\,dx = \int_a^b \lim_{n\to\infty} f_n(x)\,dx.
>$$
>    Applying this to $\{g_n\}$, which converges uniformly to the zero function $f(x) = 0$ on $[0,1]$, we hence conclude that  
>    $$\lim_{n\to\infty} \int_0^1 g_n(x)\,dx = \int_0^1 0\,dx = 0$$

**Problem 8.6.3** Evaluate $$\lim_{n\to\infty} \int_0^1 \frac{1 - e^{-nx}}{\sqrt{x}} dx.$$

> [!definition|*]
> Proof. 
> Let $\{g_n\}_{n=1}^\infty$ be a sequence of continuous nonnegative functions on $[0,1]$ such that:  
> 1. For each $n$, the improper Riemann integral $\int_0^1 g_n(x)\,dx$ exists and is finite.  
> 2. For all $x\in[0,1]$ and all $n$,  
>    $$>      0 \le g_{n+1}(x) \le g_n(x);
>$$
> 3. For each fixed $x\in[0,1]$,  
>    $$>      \lim_{n\to\infty} g_n(x) = 0.
>$$
> Then,  
> $$>   \lim_{n\to\infty} \int_0^1 g_n(x)\,dx = 0.
>$$
> 
> **Proof.**
> 
> 4. **Attainment of Maximum and Monotonicity.**  
>    Since each $g_n$ is continuous on the compact interval $[0,1]$, it attains its maximum value. Define  
>    $$>      M_n := \max_{x\in[0,1]} g_n(x).
>$$
>    The monotonicity hypothesis $g_{n+1}(x) \le g_n(x)$ for all $x$ implies that  
>    $$>      M_{n+1} \le M_n.
>$$
>    Therefore, the sequence $\{M_n\}$ is nonincreasing and bounded below by 0.
> 
> Since pointwise convergence implies uniform convergence. For each fixed $x\in[0,1]$, we have  
>  $$      \lim_{n\to\infty} g_n(x) = 0$$
>    Suppose, for the sake of contradiction, that $\lim_{n\to\infty} M_n \neq 0$. Then there exists an $\epsilon_0 > 0$ and a subsequence $\{n_k\}$ such that  
>    $$>      M_{n_k} \ge \epsilon_0 \quad \text{for all } k.
>$$
>    For each $k$, choose $x_{n_k} \in [0,1]$ such that  
>    $$>      g_{n_k}(x_{n_k}) = M_{n_k} \ge \epsilon_0.
>$$
>    This contradicts the fact that $g_{n_k}(x_{n_k}) \to 0$ as $n_k \to \infty$.  
>    Hence,  
>    $$>      \lim_{n\to\infty} M_n = 0.
>$$
>    That is, for every $\epsilon > 0$ there exists $N \in \mathbb{N}$ such that for all $n \ge N$,  
>    $$>      M_n < \epsilon.
>$$
>    Since $0 \le g_n(x) \le M_n$ for all $x \in [0,1]$, it follows that for all $x$ and for $n\ge N$,  
>    $$>      |g_n(x) - 0| \le M_n < \epsilon.
>$$
>    Thus, $g_n \to 0$ uniformly on $[0,1]$. By the Uniform Convergence Theorem for Riemann-integrable functions, if a sequence of integrable functions $\{f_n\}$ converges uniformly to a function $f$ on $[a,b]$, then  
>    $$>      \lim_{n\to\infty} \int_a^b f_n(x)\,dx = \int_a^b \lim_{n\to\infty} f_n(x)\,dx.
>$$
>    Applying this to $\{g_n\}$, which converges uniformly to the zero function $f(x) = 0$ on $[0,1]$, we conclude that  
>    $$>      \lim_{n\to\infty} \int_0^1 g_n(x)\,dx = \int_0^1 0\,dx = 0.
>$$
> 
> This completes the proof of Theorem 8.6.1.

**Chatper 8.24** Give an example to show that the following is not equivalent to the integrability of $f$:

For any $\varepsilon > 0$, there is a $\delta > 0$ such that if $P$ is any partition into rectangles $S_1, \ldots, S_N$ with sides less than $\delta$, there exist $x_1 \in S_1, \ldots, x_N \in S_N$ such that
$$\left|\sum_{i=1}^N f(x_i)v(S_i) - I\right| < \varepsilon.$$


> [!definition|*]
> Proof. Here is an counter example. Consider the function such that $f : [0, 1] \to \mathbb{R}$:
>
> $$f(x) = \begin{cases}
> 1 & \text{if } x \in \mathbb{Q} \cap [0, 1],\\
> 0 & \text{if } x \in \mathbb{R} \setminus \mathbb{Q}.
> \end{cases}$$
>
> We know that this function $f(x)$ is not integrable since the set of discontinuity $D = [0, 1]$ does not have measure zero. However, for any $\epsilon > 0$, we can make the make the Riemann sum arbitrarily close to 0 by choosing the point $x_i \in S_i$ to be irrational in each sub-rectangle $S_i$. In this case, we have $f(x_i) = 0$ such that:
>
> $$\sum_{i=1}^N f(x_i)v(s_i) = 0$$
>
> And we can choose $I = 0$, thus we have:
>
> $$\left|\sum_{i=1}^N f(x_i)v(S_i) - I\right| = |0 - 0| < \varepsilon.$$
>
> Therefore, the function that fulfill such condition does not imply the integrability of the function.

**Problem 8.36** Prove that
$$\lim_{n\to\infty}\frac{(n!)^{1/n}}{n} = e^{-1}$$
by considering Riemann sums for
$$\int_0^1 \log x \, dx$$
based on the partition
$$\frac{1}{n} < \frac{2}{n} < \cdots < 1.$$

> [!definition|*]
> Proof. First, we can write:
>
> $$\frac{(n!)^{1/n}}{n} = \exp(\frac{1}{n}\log(n!) - \log(n)) = \exp(\frac{1}{n}\sum_{k=1}^n \log k - \log n)$$
>
> for each term $\log k$, we can write it to:
>
> $$\log k = \log \frac{k}{n} + \log n$$
>
> Therefore, we have:
>
> $$\log[\exp(\frac{1}{n}\log(n!) - \log(n))] = \frac{1}{n}\log(n!) - \log(n) = \sum_{k=1}^n \log(\frac{k}{n}) \cdot \frac{1}{n}$$
>
> Note that this equal to the Riemann sum of the integral. Then, we take $n \to \infty$:
>
> $$\lim_{n\to\infty}\sum_{k=1}^n \log(\frac{k}{n}) \cdot \frac{1}{n} = \int_0^1 \log x \, dx$$
>
> with partition length to be $\frac{1}{n}$. Then, we need to evaluate the integral:
>
> $$\int_0^1 \log x \, dx = [x \log x]_0^1 - \int_0^1 x \cdot \frac{1}{x}dx$$
>
> Since the term $[x \log x]_0^1 = 0$ and $\int_0^1 1dx = 1$, we have the integral:
>
> $$\int_0^1 \log x \, dx = -1$$
>
> Therefore, we have:
>
> $$\lim_{n\to\infty}\log((\frac{(n!)^{1/n}}{n}) = -1$$
>
> and this yield:
>
> $$\lim_{n\to\infty}(\frac{(n!)^{1/n}}{n}) = e^{-1}$$

**Problem 8.39** Prove that $$\log 2 = \lim_{n\to\infty} \left[\frac{1}{n+1} + \frac{1}{n+2} + \cdots + \frac{1}{2n}\right].$$

> [!definition|*]
> Proof. First, we can write $\frac{1}{n+1} + \frac{1}{n+2} + \cdots + \frac{1}{2n}$ into:
>
> $$\frac{1}{n}[\frac{1}{1 + \frac{1}{n}} + \frac{1}{1 + \frac{2}{n}} + \cdots \frac{1}{1 + \frac{n}{n}}] = \sum_{i=1}^n \frac{1}{1 + \frac{i}{n}} \cdot \frac{1}{n}$$
>
> Then, by the definition of Riemann sum for function $f$ on the interval $[a, b]$:
>
> $$\int_a^b f(x)dx = \lim_{n\to\infty} \sum_{i=1}^n f(x_i)v(s_i)$$
>
> Then, let $v(s_i) = \frac{1}{n}$ and define $f(x) = \frac{1}{1+x}$ and $x_i = \frac{i}{n}$. Then, We have:
>
> $$\lim_{n\to\infty} \frac{1}{n} \sum_{i=1}^n \frac{1}{1 + \frac{i}{n}} = \lim_{n\to\infty} \sum_{i=1}^n f(\frac{i}{n})v(s_i)$$
>
> Then for the integral $\int_0^1 \frac{1}{1+x}dx$, for partition $P_n$ we have:
>
> $$P_n = \left\{0, \frac{1}{n}, \frac{2}{n}, \ldots, \frac{n-1}{n}, 1\right\}$$
>
> be a partition of $[0, 1]$ with sub-interval length $\Delta x = \frac{1}{n}$.
>
> Since $f(x)$ is decreasing on $[0, 1]$, on each sub-interval $[x_{i-1}, x_i]$ we have:
>
> $$M_i = \sup\{f(x) : x \in [x_{i-1}, x_i]\} = f\left(\frac{i-1}{n}\right) = \frac{1}{1 + \frac{i-1}{n}}$$
>
> and
>
> $$m_i = \inf\{f(x) : x \in [x_{i-1}, x_i]\} = f\left(\frac{i}{n}\right) = \frac{1}{1 + \frac{i}{n}}.$$
>
> Thus, the Upper Riemann Sum is given by:
>
> $$U(f, P_n) = \sum_{i=1}^n M_i\Delta x = \frac{1}{n}\sum_{i=1}^n \frac{1}{1 + \frac{i-1}{n}},$$
>
> and the Lower Riemann Sum is:
>
> $$L(f, P_n) = \sum_{i=1}^n m_i\Delta x = \frac{1}{n}\sum_{i=1}^n \frac{1}{1 + \frac{i}{n}}.$$
>
> Since $f$ is decreasing, any Riemann sum will lie between $L(f, P_n)$ and $U(f, P_n)$. Also, since $f$ is continuous on $[0, 1]$, it is Riemann integrable, so that
>
> $$\int_0^1 f(x) \, dx = \int_0^1 f(x) \, dx = \int_0^1 f(x) \, dx.$$
>
> Thus, by refining the partition by taking $n \to \infty$, both the upper and lower sums converge to the value of the integral,
>
> $$\int_0^1 \frac{1}{1 + x}\,dx,$$
>
> Since:
>
> $$\lim_{n\to\infty} L(f, P_n) = \lim_{n\to\infty} \sum_{i=1}^n f(\frac{i}{n})v(s_i) = \int_0^1 \frac{1}{1 + x}\,dx$$
>
> We only need to evaluate the integral, which can be written as:
>
> $$\int_0^1 \frac{1}{1 + x}\,dx = [\log(1 + x)]_0^1 = \log 2.$$
>
> as desired.