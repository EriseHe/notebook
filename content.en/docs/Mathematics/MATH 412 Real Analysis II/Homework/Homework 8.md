8.1: 1, [2, 6]; 8.2: [2], 3, 4, 5, [6]; 8.3: [2], 5, 6;
Chapter 8: [12].

**Problem 8.1.2** Let $f:[0,2] \rightarrow \mathbb{R}$ be defined by $f(x)=0$ for $0 \leq x \leq 1$, and by $f(x)=1$ for $1<x \leq 2$. Compute, using the definition, $\int_0^2 f(x) d x$.

> [!definition]
> We first define a partition $P_{n}$ on $[0,2]$ into $n$ equal subintervals $\Delta x=\frac{2}{n}$, s.t. 
> $$\left[ 0, \frac{2}{n} \right], \left[ \frac{2}{n} , \frac{4}{n} \right],\dots,\left[ \frac{2(n-1)}{n},2 \right]$$
> Then, each subinterval, we have $[x_{i-1},x_{i}]=\left[ \frac{2(i-1)}{n}, \frac{2i}{n} \right]$. Consider Riemman sum $S_n$ for this partition with any choice of sample points $k_{i} \in [x_{i-1},x_i]$:
> $$
S_n \;=\;\sum_{k=1}^{n} f(k_{i})\,\Delta x 
\;=\;\sum_{k=1}^{n} f(k_{i}) \cdot \frac{2}{n}.
>$$
>For $[x_{i-1},\,x_i]\subset [0,1]$, then $f(x)=0$ by definition. Hence $f(k_{i}) = 0$; for $[x_{i-1},\,x_i]\subset (1,2]$, then $f(x)=1$. Hence $f(k_{i}) = 1$. Then, notice one subinterval, say $[x_{j-1},\,x_j]$, must include $x=1$, and $f$ = 0 or 1 depending on $k_{j}\le 1$ or $k_{j}>1$. Hence, we have:
>$$
   \inf \{f(x): x\in [x_{j-1},x_j]\} \;=\; 0,
   \quad
   \sup \{f(x): x\in [x_{j-1},x_j]\} \;=\; 1.
>$$
>Next, we find a lower bound and an upper bound for $S_n$. For lower bound, suppose subinterval $[x_{j-1},x_j]$ contains 1, and we pick $j$ so that $f(k_j)=0$. Let $m$ be the number of intervals inside fully in $(1,2]$. Then for those $m$ intervals, we have
>$$
  \begin{align}
 S_n \;\ge\; L(P) =  &  (1)m\cdot\Delta x +(0)(n-m)\cdot\Delta x
   \; \\
= & \; m \cdot \frac{2}{n}
\end{align}
>$$
>Since $[x_{j},x_{j+1}]$ begins once $x > 1$, notice that $m\approx \frac{n}{2}$ for large $n$. More precisely, we have $m \ge \frac{n}{2}-1$. Hence:
>$$
   m \;\ge\; \frac{n}{2} -1 
   \quad\Longrightarrow\quad
   S_n 
   \;\ge\; \Bigl(\frac{n}{2}-1\Bigr)\,\frac{2}{n} 
   \;=\;
   1 - \frac{2}{n}.
>$$
>Similarly, for upper bound, we pick $k_j$ such that $f(k_{j})=1$. The the number of intervals $m$ entirely in $(1,2]$ each contribute 1, so we in total have $m+1$ subintervals to contribute $\Delta x$. Thus
> $$
\begin{align}
   S_n
   \; & \le\; U(P)= (1)(m+1)\cdot \Delta x \\
\; & =\; (m+1)\,\frac{2}{n}.
\end{align}
> $$
> But $m \le \frac{n}{2}$ for this case. Hence,
> $$
   m+1 \;\le\; \frac{n}{2} + 1
   \quad\Longrightarrow\quad
   S_n
   \;\le\; \Bigl(\frac{n}{2}+1\Bigr)\,\frac{2}{n}
   \;=\;
   1 + \frac{2}{n}.
>$$
>Therefore, for every Riemann sum $S_n$:
> $$
1 - \frac{2}{n}
\;\;\le\;\;
S_n
\;\;\le\;\;
1 + \frac{2}{n}.
> $$
> As $n$ grows, the Squeeze Theorem forces each Riemann sum $S_n$ to converge to 1. More precisely, for any $\varepsilon>0$, choose $N$ large enough s.t. $\forall n \ge N$,
>$$
-\frac{2}{n} > -\varepsilon
\quad\text{and}\quad
 \frac{2}{n} < \varepsilon,
>$$
>which gives $\bigl|S_n - 1\bigr| < \varepsilon$. This shows that $\lim_{n\to\infty} S_n = 1$, so by definition of the Riemann integral, we have
> $$
\int_{0}^{2} f(x)\,dx = 1. 
> $$



**Problem 8.1.6** Let $f:[a, b] \rightarrow \mathbb{R}$ be continuous. Use Riemann's condition and uniform continuity of $f$ to prove that $f$ is integrable.

> [!definition|*]
> To show that $f$ is Riemann integrable from continuity, we must show that $\forall \,\varepsilon>0$, $\exists$ partition $P$ of $[a,b]$ such that 
> $$0\leq U(P_{\varepsilon})-L(P_{\varepsilon})<\varepsilon$$
> First, since $f$ is continuous on a closed, bounded interval $[a,b]$, then we know it is uniformly continuous by Heine–Cantor theorem. We define 
> $$\varepsilon_{0} =\frac{\varepsilon}{b-a}$$
> Then, by definition of uniform continuity, $\forall \varepsilon >0$, there exists $\delta>0$ s.t. $\forall x,y \in [a,b]$, we have
> $$|x-y|<\delta \Longrightarrow |f(x)-f(y)|<\varepsilon_{0} =\frac{\varepsilon}{b-a}$$
> We define a partition $P$ s.t. for each $[x_{i-1},x_{i}]$, the subinterval is less than $\delta$. So $P:= \max(x_{i}-x_{i-1})<\delta$ (this is always possible because $f$ is continuous). Next, we set
> $$M_i=\sup _{x \in\left[x_{i-1}, x_i\right]} f(x) \quad \text{and} \quad m_i=\inf _{x \in\left[x_{i-1}, x_i\right]} f(x)$$
> for each subinterval. Notice that by the unform continuity of $f$, we must have $M_{i}-m_{i}<\varepsilon_{0}$ since the lengths of each interval is awalys strictly less than $\delta$. Therefore, the difference between upper and lower bound is:
> $$
\begin{align}
U(f, P)-L(f, P) & =\sum_{i=1}^n(M_i\Delta x_i)-\sum_{i=1}^n(m_i\Delta x_i)  \\
 & =\sum_{i=1}^n\left(M_i-m_i\right) \Delta x_i \\
 & < (\frac{\varepsilon}{b-a})\sum_{i=1}^n\Delta x_i    \\
 & =(\frac{\varepsilon}{b-a})(b-a)   \\
& =\varepsilon
\end{align}
>$$
>Therefore, since $\varepsilon$ is arbitrarily chosen, by Riemann’s criterion for integrability, this implies that $f$ is Riemann integrable on $[a,b]$.

**Problem 8.2.2** Show that the $x y$ plane in $\mathbb{R}^3$ has 3-dimensional measure 0.

> [!definition]
> We let 
> $$P=\{x,y,z\in \mathbb{R}^{3}\,|\,z =0\}$$
> to be the $xy$ plane in $\mathbb{R}^3$, with $z=0$.  We construct a countable union of rectangular boxes to cover it by defining the box:
> $$S_{n}=[-n,n]\times[-n,n]\times [-\delta_{n},\delta_{n}]$$
> with $\delta_{n}>0$ to be determined. By such construction, every point $(x,y,0)\in P$ lies in some $S_{n}$ since $x\in [-n,n]$ and $y\in [-n,n]$. If $n\geq \max(|x|,|y|)$, we get $(x,y,0)\in S_{n}$, such that
> $$P\subseteq\bigcup^{\infty}_{n=1}S_{n}$$ Then, the volume of $S_{n}$ is given by
> $$V(S_{n})=(2n)(2n)(2\delta_{n})=8n^2\delta_{n}$$
> we want to choose $\delta$ s.t. the sum of the volumes is less than $\epsilon$. Notice that $\sum_{n=1}^{\infty} \frac{\varepsilon}{2^n}=\varepsilon \sum_{n=1}^{\infty} \frac{1}{2^n}=\varepsilon$, so a motivated choice is:
> $$\begin{align}
 8 n^2 \delta_n  & \leq \frac{\varepsilon}{2^n} \\
 \delta_n& \leq\frac{\varepsilon}{2^{n+3} n^2}
\end{align}
>$$
>Therefore, we define $\delta=\cfrac{\varepsilon}{2^{n+3} n^2}$, then
>$$V\left(S_n\right)=8 n^2 \cdot \frac{\varepsilon}{2^{n+3} n^2}=\frac{8 \varepsilon}{2^{n+3}}=\frac{\varepsilon}{2^n}$$
>and the total volume of the covering is
>$$\sum_{n=1}^{\infty} V\left(S_n\right)=\sum_{n=1}^{\infty} \frac{\varepsilon}{2^n}=\varepsilon \sum_{n=1}^{\infty} \frac{1}{2^n}=\varepsilon \cdot 1=\varepsilon$$
>Hence, we have constructed a countable cover $\{S_{n}\}^\infty_{n=1}$ of $P$ whose total volume is precisely $\varepsilon$. Because $\varepsilon>0$ was arbitrary. So by Definition 8.2.2 of the textbook, the xy-plane has 3-dimensional measure zero in $ℝ³$.

**Problem 8.2.6** Must the boundary of a set of measure zero have measure zero?

This statement is false. Here is a counterexample: consider the set $Q \cap [0,1]$. From Example 8.2.5 in the textbook, we know that the set of rational numbers in $[0,1]$ has measure zero. 

However, the boundary of a set $A$, denoted by $\partial A$, consists of all points $x$ such that every neighborhood of $x$ contains at least one point in $A$ and at least one point not in $A$.

$$
\bar{A}=[0,1] \quad \text { and } \overline{([0,1] \backslash A)}=[0,1]
$$

For any point $x \in [0,1]$, every neighborhood of $x$ contains both rational and irrational numbers. This is due to the density of both rational and irrational numbers in $\mathbb{R}$. Therefore:

$$\partial(Q \cap [0,1]) = [0,1]$$

Lebesgue measure of $[0,1]$ is 1, which is positive.

