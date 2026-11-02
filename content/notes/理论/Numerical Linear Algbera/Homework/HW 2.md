# Numerical Methods I, Homework 2

Schäfer, Fall 2026

Deadline: Oct. 05 Monday, 4:55 pm

## 1 One-upping [20 pts]

Let $\boldsymbol{A} \in \mathbb{R}^{m \times m}$ have full rank. Assume that we have already computed the QR decomposition of $\boldsymbol{A}$.
For $\boldsymbol{u}, \boldsymbol{v} \in \mathbb{R}^m$, we call the matrix $\boldsymbol{B} = \boldsymbol{A} + \boldsymbol{u}\boldsymbol{v}^{T}$ a rank-1 update of $\boldsymbol{A}$.

### (a) [5 pts]

Prove that if $\boldsymbol{v}^{T} \boldsymbol{A}^{-1} \boldsymbol{u} \neq - 1$, then $\boldsymbol{B}$ is invertible.

> *Proof.* Set $\boldsymbol{z}=\boldsymbol{A}^{-1}\boldsymbol{u}$ and
> $\alpha=\boldsymbol{v}^T\boldsymbol{z}\ne-1$. If $\boldsymbol{B}\boldsymbol{x}=\boldsymbol{0}$, then
> $$
> \begin{aligned}
> \boldsymbol{A}\boldsymbol{x}+\boldsymbol{u}(\boldsymbol{v}^T\boldsymbol{x})&=\boldsymbol{0}\\
> \boldsymbol{A}\boldsymbol{x}&=-\boldsymbol{u}(\boldsymbol{v}^T\boldsymbol{x})\\
> \boldsymbol{x}&=-\boldsymbol{A}^{-1}\boldsymbol{u}(\boldsymbol{v}^T\boldsymbol{x})
> =-\boldsymbol{z}(\boldsymbol{v}^T\boldsymbol{x})\\
> \boldsymbol{v}^T\boldsymbol{x}&=-(\boldsymbol{v}^T\boldsymbol{z})(\boldsymbol{v}^T\boldsymbol{x})
> =-\alpha(\boldsymbol{v}^T\boldsymbol{x})\\
> (1+\alpha)\boldsymbol{v}^T\boldsymbol{x}&=0
> \end{aligned}
> $$
> Thus $\boldsymbol{v}^T\boldsymbol{x}=0$, hence $\boldsymbol{x}=\boldsymbol{0}$. Therefore the
> square matrix $\boldsymbol{B}$ is invertible. This uses the nullspace characterization in [Lecture 2, §2.5](<../2. Storing Matrices & Vectors.md#linear-systems>).
>
> $\square$

### (b) [7.5 pts]

Design an algorithm that provably solves the system of equations $\boldsymbol{B} \boldsymbol{x} = \boldsymbol{b}$ in $O(m^2)$ operations.

> *Solution.* Under the condition in (a), use the given factorization
> $\boldsymbol{A}=\boldsymbol{Q}\boldsymbol{R}$. The QR solve is [Lecture 5, §5.6.2](<../5. Least Squares and Gram-Schmidt.md#solving-least-squares-with-qr>), with [back substitution from Lecture 2, §2.6.2](<../2. Storing Matrices & Vectors.md#upper-triangular-systems>). Apply $\boldsymbol{Q}^T$ and use backward
> substitution to compute $\boldsymbol{y}$ and $\boldsymbol{z}$, then set
> $$
> \begin{aligned}
> \boldsymbol{R}\boldsymbol{y}&=\boldsymbol{Q}^T\boldsymbol{b},
> &\boldsymbol{R}\boldsymbol{z}&=\boldsymbol{Q}^T\boldsymbol{u}\\
> c=\boldsymbol{v}^T\boldsymbol{x}
> &=\boldsymbol{v}^T(\boldsymbol{y}-c\boldsymbol{z})
> =\boldsymbol{v}^T\boldsymbol{y}-c\boldsymbol{v}^T\boldsymbol{z}\\
> c(1+\boldsymbol{v}^T\boldsymbol{z})&=\boldsymbol{v}^T\boldsymbol{y}\\
> c&=\frac{\boldsymbol{v}^T\boldsymbol{y}}{1+\boldsymbol{v}^T\boldsymbol{z}},
> &\boldsymbol{x}&=\boldsymbol{y}-c\boldsymbol{z}
> \end{aligned}
> $$
> Here we seek $\boldsymbol{x}=\boldsymbol{y}-c\boldsymbol{z}$ and choose $c=\boldsymbol{v}^T\boldsymbol{x}$; part (a) makes its denominator nonzero. Since $\boldsymbol{Q}$ is square orthogonal,
> $$
> \begin{aligned}
> \boldsymbol{A}\boldsymbol{y}
> &=\boldsymbol{Q}\boldsymbol{R}\boldsymbol{y}
> =\boldsymbol{Q}\boldsymbol{Q}^T\boldsymbol{b}=\boldsymbol{b},\\
> \boldsymbol{A}\boldsymbol{z}
> &=\boldsymbol{Q}\boldsymbol{R}\boldsymbol{z}
> =\boldsymbol{Q}\boldsymbol{Q}^T\boldsymbol{u}=\boldsymbol{u}.
> \end{aligned}
> $$
> Since $\boldsymbol{A}\boldsymbol{y}=\boldsymbol{b}$ and $\boldsymbol{A}\boldsymbol{z}=\boldsymbol{u}$,
> $$
> \begin{aligned}
> \boldsymbol{B}\boldsymbol{x}
> &=(\boldsymbol{A}+\boldsymbol{u}\boldsymbol{v}^T)(\boldsymbol{y}-c\boldsymbol{z})\\
> &=\boldsymbol{A}\boldsymbol{y}-c\boldsymbol{A}\boldsymbol{z}
> +\boldsymbol{u}\boldsymbol{v}^T\boldsymbol{y}
> -c\boldsymbol{u}\boldsymbol{v}^T\boldsymbol{z}\\
> &=\boldsymbol{b}-c\boldsymbol{u}
>   +\boldsymbol{u}\bigl(\boldsymbol{v}^T\boldsymbol{y}-c\boldsymbol{v}^T\boldsymbol{z}\bigr)\\
> &=\boldsymbol{b}+\boldsymbol{u}\underbrace{
>   \bigl(\boldsymbol{v}^T\boldsymbol{y}-c(1+\boldsymbol{v}^T\boldsymbol{z})\bigr)}_{0}
> =\boldsymbol{b}
> \end{aligned}
> $$
> Since each application of $\boldsymbol{Q}^T$ and each triangular solve costs
> $O(m^2)$, and the dot products and final update cost $O(m)$, the total is
> $O(m^2)$. Explicitly, a dense matrix-vector product costs $m(2m-1)$ operations, and one triangular solve costs
> $$
> \sum_{i=1}^m[2(m-i)+1]=2\frac{m(m-1)}2+m=m^2,
> $$
> under the separate multiply/add convention of [Lecture 2, §2.3](<../2. Storing Matrices & Vectors.md#algorithms-and-computational-cost>).
>
> $\square$

### (c) r-upping [7.5 pts]

Extend the algorithm from the previous exercise to the case of $\boldsymbol{B} = \boldsymbol{A} + \boldsymbol{U}\boldsymbol{V}^{T}$, for $\boldsymbol{U},\boldsymbol{V} \in \mathbb{R}^{m \times r}$ and $r \ll m$.
Calculate the asymptotic complexity of the resulting algorithm.

> *Solution.* Compute $\boldsymbol{y}$ and the columns of $\boldsymbol{Z}$ using the existing QR factors ([Lecture 5, §5.6.2](<../5. Least Squares and Gram-Schmidt.md#solving-least-squares-with-qr>)):
> $$
> \begin{aligned}
> \boldsymbol{R}\boldsymbol{y}&=\boldsymbol{Q}^T\boldsymbol{b},
> &\boldsymbol{R}\boldsymbol{Z}&=\boldsymbol{Q}^T\boldsymbol{U}\\
> \boldsymbol{t}=\boldsymbol{V}^T\boldsymbol{x}
> &=\boldsymbol{V}^T(\boldsymbol{y}-\boldsymbol{Z}\boldsymbol{t})
> =\boldsymbol{V}^T\boldsymbol{y}-\boldsymbol{V}^T\boldsymbol{Z}\boldsymbol{t}\\
> \boldsymbol{S}&=\mathbf{I}_r+\boldsymbol{V}^T\boldsymbol{Z},
> &\boldsymbol{S}\boldsymbol{t}&=\boldsymbol{V}^T\boldsymbol{y}\\
> \boldsymbol{x}&=\boldsymbol{y}-\boldsymbol{Z}\boldsymbol{t}
> \end{aligned}
> $$
> Assume $\boldsymbol{S}$ is nonsingular, the rank-$r$ analogue of the condition
> in (a). It is necessary when $\boldsymbol{B}$ is invertible: if $\boldsymbol{S}\boldsymbol{t}=0$, then
> $$
> \begin{aligned}
> \boldsymbol{B}\boldsymbol{Z}\boldsymbol{t}
> &=\boldsymbol{U}(\mathbf I_r+\boldsymbol{V}^T\boldsymbol{Z})\boldsymbol{t}
> =\boldsymbol{U}\boldsymbol{S}\boldsymbol{t}=0,\\
> \boldsymbol{B}\text{ invertible}
> &\Longrightarrow\boldsymbol{Z}\boldsymbol{t}=0\\
> &\Longrightarrow\boldsymbol{t}
> =\boldsymbol{S}\boldsymbol{t}-\boldsymbol{V}^T\boldsymbol{Z}\boldsymbol{t}=0.
> \end{aligned}
> $$
> Thus $\boldsymbol{S}$ has zero nullspace and is invertible by [Lecture 2, §2.5](<../2. Storing Matrices & Vectors.md#linear-systems>). Since $\boldsymbol{A}\boldsymbol{y}=\boldsymbol{b}$ and $\boldsymbol{A}\boldsymbol{Z}=\boldsymbol{U}$,
> $$
> \begin{aligned}
> \boldsymbol{B}\boldsymbol{x}
> &=(\boldsymbol{A}+\boldsymbol{U}\boldsymbol{V}^T)(\boldsymbol{y}-\boldsymbol{Z}\boldsymbol{t})\\
> &=\boldsymbol{A}\boldsymbol{y}-\boldsymbol{A}\boldsymbol{Z}\boldsymbol{t}
> +\boldsymbol{U}\boldsymbol{V}^T\boldsymbol{y}
> -\boldsymbol{U}\boldsymbol{V}^T\boldsymbol{Z}\boldsymbol{t}\\
> &=\boldsymbol{b}-\boldsymbol{U}\boldsymbol{t}
>   +\boldsymbol{U}\boldsymbol{V}^T(\boldsymbol{y}-\boldsymbol{Z}\boldsymbol{t})\\
> &=\boldsymbol{b}+\boldsymbol{U}\underbrace{
>   \bigl(\boldsymbol{V}^T\boldsymbol{y}-\boldsymbol{S}\boldsymbol{t}\bigr)}_{\boldsymbol{0}}
> =\boldsymbol{b}
> \end{aligned}
> $$
> The costs are
> $$
> \begin{aligned}
> &\underbrace{O(m^2(r+1))}_{\text{$r+1$ QR solves}}
> +\underbrace{O(mr^2)}_{\boldsymbol{V}^T\boldsymbol{Z}}
> +\underbrace{O(r^3)}_{\text{solve in }\boldsymbol{S}}
> +\underbrace{O(mr)}_{\text{remaining products}}\\
> &\hspace{2em}=O(m^2r+mr^2+r^3)=O(m^2r)
> \end{aligned}
> $$
> for $1\le r\ll m$. Here $mr^2\le m^2r$ and $r^3\le m^2r$ because $r\le m$. The counts follow [Lecture 2, §2.3](<../2. Storing Matrices & Vectors.md#algorithms-and-computational-cost>): $r+1$ QR solves, $r^2$ length-$m$ dot products, one $r\times r$ solve, and vector products.
>
> $\square$

## 2 You Factor [30 pts]

For $\varepsilon$ the unit roundoff error and $\tilde{\boldsymbol{L}}, \tilde{\boldsymbol{U}}$ the LU factors computed in finite precision, and $|\cdot|$ the element-wise absolute value, we have derived in class that, for all $1 \leq i,j \leq m$,
$$
\tilde{\boldsymbol{L}} \tilde{\boldsymbol{U}} = \boldsymbol{A} + \boldsymbol{E}, \quad \text{with} \quad \left|\boldsymbol{E}\right|_{ij} \leq m \varepsilon \left(\left|\tilde{\boldsymbol{L}} \right| \left|\tilde{\boldsymbol{U}}\right|\right)_{ij}
\tag{1}
$$
But <u>this result is only true up to terms quadratic in $m \varepsilon$.</u>
In this problem, we remove this caveat and draw its conclusions for row-pivoted LU factorization.

### (a) [7.5 pts]

Assuming $m \varepsilon < 1$ and defining the quantity $\gamma_m = \frac{m \varepsilon}{1 - m \varepsilon}$, prove that for $\boldsymbol{x}, \boldsymbol{y} \in \mathbb{R}^m$, we have
$$
\mathrm{float.}\left( \sum \limits_{i = 1}^{m} x_i y_i \right) = \sum \limits_{i = 1}^{m} x_i y_i (1 + \delta_i), \quad \text{with} \quad |\delta_i| \leq \gamma_m
\tag{2}
$$
if the operations on the left side are performed in floating point arithmetic with unit roundoff $\varepsilon$ and no overflow or underflow occurs.

> *Proof.* Writing $\operatorname{fl}$ for $\mathrm{float.}$, we use
> $\operatorname{fl}(a\mathbin{\circ}b)=(a\mathbin{\circ}b)(1+\eta)$,
> $|\eta|\le\varepsilon$, for the operations in question ([Lecture 4, §4.2](<../4. LU Factorization with Pivoting.md#error-analysis-for-lu-factorization>)). Here $\varepsilon$ is unit roundoff; the spacing parameter in [Lecture 1, §1.4.1](<../1. Vectors and Matrices.md#spacing-and-relative-accuracy>) is twice this value for binary round-to-nearest.
> For $p\varepsilon<1$, $|\eta_t|\le\varepsilon$, and $q_t\in\{-1,1\}$,
> each factor $(1+\eta_t)^{q_t}$ lies between $1-\varepsilon$ and
> $(1-\varepsilon)^{-1}$. Hence Bernoulli's inequality gives
> $$
> \begin{aligned}
> (1-\varepsilon)^0&=1,\\
> (1-\varepsilon)^q\ge1-q\varepsilon
> &\Longrightarrow(1-\varepsilon)^{q+1}
> \ge(1-q\varepsilon)(1-\varepsilon)\\
> &=1-(q+1)\varepsilon+q\varepsilon^2
> \ge1-(q+1)\varepsilon,\\
> 1-p\varepsilon
> &\le(1-\varepsilon)^p
> \le\prod_{t=1}^{p}(1+\eta_t)^{q_t}
> \le(1-\varepsilon)^{-p}
> \le\frac{1}{1-p\varepsilon}\\
> \left|\prod_{t=1}^{p}(1+\eta_t)^{q_t}-1\right|
> &\le\frac{p\varepsilon}{1-p\varepsilon}=\gamma_p
> \end{aligned}
> $$
> For ordinary sequential accumulation, let
> $$
> \begin{aligned}
> p_i&=\operatorname{fl}(x_i y_i)=x_i y_i(1+\alpha_i),
> &&|\alpha_i|\le\varepsilon\\
> s_1&=p_1\\
> s_k&=\operatorname{fl}(s_{k-1}+p_k)
> =(s_{k-1}+p_k)(1+\beta_k),
> &&|\beta_k|\le\varepsilon\quad(k\ge2)
> \end{aligned}
> $$
> Expanding the recurrence,
> $$
> \begin{aligned}
> s_2&=(p_1+p_2)(1+\beta_2),\\
> s_3&=p_1(1+\beta_2)(1+\beta_3)
> +p_2(1+\beta_2)(1+\beta_3)+p_3(1+\beta_3),\\
> s_m
> &=x_1y_1(1+\alpha_1)\prod_{k=2}^{m}(1+\beta_k)
>  +\sum_{i=2}^{m}x_i y_i(1+\alpha_i)\prod_{k=i}^{m}(1+\beta_k)\\
> &=\sum_{i=1}^{m}x_i y_i(1+\delta_i)
> \end{aligned}
> $$
> The coefficients are
> $$
> \begin{aligned}
> 1+\delta_1&=(1+\alpha_1)\prod_{k=2}^m(1+\beta_k),\\
> 1+\delta_i&=(1+\alpha_i)\prod_{k=i}^m(1+\beta_k),\qquad i\ge2.
> \end{aligned}
> $$
> Their factor counts are $1+(m-1)=m$ and $1+(m-i+1)\le m$. For $0\le p\le m$,
> $$
> \gamma_m-\gamma_p
> =\frac{(m-p)\varepsilon}{(1-m\varepsilon)(1-p\varepsilon)}\ge0.
> $$
> Each coefficient contains at most $m$ rounding factors, so the product
> bound gives $|\delta_i|\le\gamma_m$. Empty products equal $1$, covering $m=1$. [Lecture 4, §4.2.2](<../4. LU Factorization with Pivoting.md#floating-point-summation>) gives the first-order estimate; this product calculation proves the exact bound.
>
> $\square$

### (b) [7.5 pts]

Assume that the entries of the computed factors are obtained by first evaluating the sum, then subtracting it from the corresponding entry of $\boldsymbol{A}$, and finally dividing by the pivot, i.e.
$$
\tilde{\boldsymbol{U}}_{jk} = \mathrm{float.}\left(\boldsymbol{A}_{jk} - \mathrm{float.}\left(\sum \limits_{i = 1}^{j - 1} \tilde{\boldsymbol{L}}_{ji} \tilde{\boldsymbol{U}}_{ik}\right)\right) \quad \text{for } j \leq k
\tag{3}
$$

$$
\tilde{\boldsymbol{L}}_{jk} = \mathrm{float.}\left(\mathrm{float.}\left(\boldsymbol{A}_{jk} - \mathrm{float.}\left(\sum \limits_{i = 1}^{k - 1} \tilde{\boldsymbol{L}}_{ji} \tilde{\boldsymbol{U}}_{ik}\right)\right) \Big/ \tilde{\boldsymbol{U}}_{kk}\right) \quad \text{for } j > k
\tag{4}
$$
Use the previous result to show that
$$
\left|\boldsymbol{E}\right|_{ij} \leq \gamma_m \left(\left|\tilde{\boldsymbol{L}} \right| \left|\tilde{\boldsymbol{U}}\right|\right)_{ij}
\tag{5}
$$

> *Proof.* Set $\gamma_0=0$ and $\boldsymbol{E}=\tilde{\boldsymbol{L}}\tilde{\boldsymbol{U}}-\boldsymbol{A}$. Use the entry relations in [Lecture 4, §4.2.1](<../4. LU Factorization with Pivoting.md#entrywise-relations>) and rounding rearrangements in [§4.2.3](<../4. LU Factorization with Pivoting.md#error-in-an-entry-of-u>). Assume $m\varepsilon<1$, nonzero pivots, no overflow or underflow, and the stated order of operations.
> Fix $j,k$ and abbreviate
> $t_i=\tilde{L}_{ji}\tilde{U}_{ik}$. For $j\le k$, part (a) and the subtraction give
> $$
> \begin{aligned}
> \tilde{U}_{jk}
>  &=\left(A_{jk}-\sum_{i=1}^{j-1}t_i(1+\delta_i)\right)(1+\alpha)\\
> \frac{t_j}{1+\alpha}
> &=A_{jk}-\sum_{i=1}^{j-1}t_i(1+\delta_i)\\
> A_{jk}
> &=\sum_{i=1}^{j-1}t_i(1+\delta_i)+t_j(1+\theta)\\
> E_{jk}&=\sum_{i=1}^{j}t_i-A_{jk}\\
> &=\sum_{i=1}^{j}t_i
> -\left[\sum_{i=1}^{j-1}t_i+\sum_{i=1}^{j-1}t_i\delta_i+t_j+t_j\theta\right]\\
> &=-\sum_{i=1}^{j-1}t_i\delta_i-t_j\theta
> \end{aligned}
> $$
> Here $|\delta_i|\le\gamma_{j-1}$, $|\alpha|\le\varepsilon$, and
> $t_j=\tilde{U}_{jk}$ because $\tilde{L}_{jj}=1$. We have
> $1+\theta=(1+\alpha)^{-1}$, so $|\theta|\le\gamma_1$ by (a).
> For $j>k$, include the rounding of the final division:
> $$
> \begin{aligned}
> \tilde{L}_{jk}
> &=\frac{A_{jk}-\displaystyle\sum_{i=1}^{k-1}t_i(1+\delta_i)}
>  {\tilde{U}_{kk}}(1+\alpha)(1+\beta)\\
> \frac{t_k}{(1+\alpha)(1+\beta)}
> &=A_{jk}-\sum_{i=1}^{k-1}t_i(1+\delta_i)\\
> A_{jk}
> &=\sum_{i=1}^{k-1}t_i(1+\delta_i)+t_k(1+\theta)\\
> E_{jk}&=\sum_{i=1}^{k}t_i-A_{jk}\\
> &=\sum_{i=1}^{k}t_i
> -\left[\sum_{i=1}^{k-1}t_i+\sum_{i=1}^{k-1}t_i\delta_i+t_k+t_k\theta\right]\\
> &=-\sum_{i=1}^{k-1}t_i\delta_i-t_k\theta
> \end{aligned}
> $$
> where
> $$
> |\delta_i|\le\gamma_{k-1},\qquad
> |\alpha|,|\beta|\le\varepsilon,\qquad
> 1+\theta=\frac{1}{(1+\alpha)(1+\beta)}
> $$
> The reciprocal-product bound from (a) gives
> $|\theta|\le\gamma_2\le\gamma_m$; this case has $m\ge2$.
> In both cases, triangularity and monotonicity of $\gamma_p$ give the exact bound
> $$
> \begin{aligned}
> |E_{jk}|
> &\le\sum_{i=1}^{h-1}|t_i||\delta_i|+|t_h||\theta|,
> \qquad h=\min(j,k)\\
> &\le\gamma_m\left(\sum_{i=1}^{h-1}|t_i|+|t_h|\right)\\
> &\le\gamma_m\sum_{i=1}^{\min(j,k)}
>  |\tilde{L}_{ji}|\,|\tilde{U}_{ik}|\\
> &=\gamma_m\bigl(|\tilde{\boldsymbol{L}}|\,|\tilde{\boldsymbol{U}}|\bigr)_{jk}
> \end{aligned}
> $$
> Terms beyond $h$ vanish by triangularity. Empty sums are zero; $m=1$ uses only the $j\le k$ case. The lecture uses the opposite error sign, with the same absolute bound. The division case is [Lecture 4, §4.2.4](<../4. LU Factorization with Pivoting.md#error-in-an-entry-of-l>).
>
> $\square$

### (c) [5 pts]

Deduce that under row-pivoted $LU$ factorization and taking $\| \cdot \|_{\infty}$ to signify the vector-infinity norm, we have
$$
\left\|\boldsymbol{E}\right\|_{\infty} \leq m \gamma_{m} \left\|\tilde{\boldsymbol{U}}\right\|_{\infty}
\tag{6}
$$
This prompts us to investigate the growth factor $\rho \coloneqq \frac{\left\| \boldsymbol{U} \right\|_{\infty}}{\left\|\boldsymbol{A}\right\|_{\infty}}$ of row-pivoted LU factorization.
After justification, you may use that row-pivoted LU factorization reduces to unpivoted LU factorization on a permuted matrix $\boldsymbol{P}\boldsymbol{A}$, where $\boldsymbol{P}$ is a permutation matrix.

> *Proof.* Use the entrywise norm $\|\boldsymbol{M}\|_\infty=\max_{i,j}|M_{ij}|$. This treats the entries as a vector, not the induced maximum-row-sum norm. Row pivoting and commuting permutations are [Lecture 4, §4.4](<../4. LU Factorization with Pivoting.md#how-to-pivot-row-pivoting>) and [§4.5](<../4. LU Factorization with Pivoting.md#commuting-permutations>).
>
> A later row swap $\boldsymbol{T}_\ell$ can be moved past an
> earlier elementary elimination matrix $\boldsymbol{F}_k$ by
> $$
> \begin{aligned}
> \boldsymbol{T}_\ell\boldsymbol{F}_k
> &=\boldsymbol{T}_\ell\boldsymbol{F}_k
> (\boldsymbol{T}_\ell\boldsymbol{T}_\ell)\\
> &=(\boldsymbol{T}_\ell\boldsymbol{F}_k\boldsymbol{T}_\ell)\boldsymbol{T}_\ell,
> \qquad\boldsymbol{T}_\ell^2=\mathbf I,\quad\ell>k.
> \end{aligned}
> $$
> Writing $\boldsymbol{F}_k=\mathbf I-\boldsymbol{\ell}_k\boldsymbol{e}_k^T$, the later swap fixes $\boldsymbol{e}_k$, so
> $$
> \boldsymbol{T}_\ell\boldsymbol{F}_k\boldsymbol{T}_\ell
> =\mathbf I-(\boldsymbol{T}_\ell\boldsymbol{\ell}_k)\boldsymbol{e}_k^T.
> $$
> The conjugation only reorders the multipliers below the $k$th diagonal
> entry. Repeating this operation gives an unpivoted factorization of
> $\boldsymbol{P}\boldsymbol{A}$, where $\boldsymbol{P}=\boldsymbol{T}_m\cdots\boldsymbol{T}_1$.
> Thus (b) applies with
> $\tilde{\boldsymbol{L}}\tilde{\boldsymbol{U}}=\boldsymbol{P}\boldsymbol{A}+\boldsymbol{E}$.
>
> Row pivoting selects a largest-magnitude entry in the active column,
> so every multiplier has magnitude at most $1$, including after rounding
> since $\pm1$ are representable. This rounded claim assumes correctly rounded arithmetic; the relative-error inequality alone only gives $1+\varepsilon$. Thus $|\tilde{L}_{ik}|\le1$, and (b) gives
> $$
> \begin{aligned}
> \|\boldsymbol{E}\|_\infty
> &\le\gamma_m\max_{i,j}\sum_{k=1}^{m}
>  |\tilde{L}_{ik}|\,|\tilde{U}_{kj}|\\
> &\le\gamma_m\max_{i,j}\sum_{k=1}^m
> 1\cdot\|\tilde{\boldsymbol{U}}\|_\infty\\
> &\le m\gamma_m\|\tilde{\boldsymbol{U}}\|_\infty
> \end{aligned}
> $$
>
> $\square$

### (d) [5 pts]

Verify that the rows $\boldsymbol{u}_{i}^{T}, \boldsymbol{a}_{i}^{T}$ of $\boldsymbol{U}, \boldsymbol{A}$ satisfy
$$
\boldsymbol{u}_{i}^{T} = \boldsymbol{a}_i^T - \sum \limits_{j = 1}^{i - 1} \boldsymbol{L}_{ij} \boldsymbol{u}_{j}^T
\tag{7}
$$

> *Proof.* For $\boldsymbol{A}=\boldsymbol{L}\boldsymbol{U}$, $L_{ii}=1$ and $L_{ij}=0$ for $j>i$ give ([Lecture 4, §4.2.1](<../4. LU Factorization with Pivoting.md#entrywise-relations>))
> $$
> \begin{aligned}
> \boldsymbol{a}_i^T
> &=\sum_{j=1}^{m}L_{ij}\boldsymbol{u}_j^T\\
> &=\sum_{j=1}^{i-1}L_{ij}\boldsymbol{u}_j^T
> +L_{ii}\boldsymbol{u}_i^T
> +\underbrace{\sum_{j=i+1}^{m}L_{ij}\boldsymbol{u}_j^T}_{0}\\
> &=\boldsymbol{u}_i^T+\sum_{j=1}^{i-1}L_{ij}\boldsymbol{u}_j^T\\
> \boldsymbol{u}_i^T
> &=\boldsymbol{a}_i^T-\sum_{j=1}^{i-1}L_{ij}\boldsymbol{u}_j^T
> \end{aligned}
> $$
> Under row pivoting, replace $\boldsymbol{a}_i^T$ by $\boldsymbol{a}_{\pi(i)}^T$,
> the $i$th row of $\boldsymbol{P}\boldsymbol{A}$ ([Lecture 4, §4.5](<../4. LU Factorization with Pivoting.md#commuting-permutations>)). This identity is for exact factors; the computed version also includes the row of $\boldsymbol{E}$ because $\tilde{\boldsymbol L}\tilde{\boldsymbol U}=\boldsymbol{P}\boldsymbol{A}+\boldsymbol{E}$.
>
> $\square$

### (e) [5 pts]

Use part (d) to show that under row pivoting, $\left\|\boldsymbol{U}\right\|_{\infty} \leq 2^{m - 1} \left\| \boldsymbol{A}\right\|_{\infty}$.
Give an example of a family of matrices $\boldsymbol{A}^{(m)} \in \mathbb{R}^{m \times m}$ that saturates this bound (up to constant factors).

> *Proof.* Set $a=\|\boldsymbol{A}\|_\infty$.
> By (d), row pivoting, and induction ([Lecture 4, §4.4](<../4. LU Factorization with Pivoting.md#how-to-pivot-row-pivoting>)),
> $$
> \begin{aligned}
> \|\boldsymbol{u}_1\|_\infty&\le a\\
> \|\boldsymbol{u}_i\|_\infty
> &\le\|\boldsymbol{a}_{\pi(i)}\|_\infty
>   +\sum_{j=1}^{i-1}|L_{ij}|\,\|\boldsymbol{u}_j\|_\infty\\
> &\le a+\sum_{j=1}^{i-1}2^{j-1}a\\
> &=a+a\frac{2^{i-1}-1}{2-1}
> =2^{i-1}a\\
> \|\boldsymbol{U}\|_\infty
> &=\max_i\|\boldsymbol{u}_i\|_\infty
> \le2^{m-1}\|\boldsymbol{A}\|_\infty
> \end{aligned}
> $$
> For a family attaining the bound, take the example from [Lecture 5, §5.1.1](<../5. Least Squares and Gram-Schmidt.md#a-matrix-with-exponential-growth>):
> $$
> A^{(m)}_{ij}=
> \begin{cases}
> 1,&i=j\text{ or }j=m\\
> -1,&i>j,\ j<m\\
> 0,&\text{otherwise}
> \end{cases}
> $$
> Retain the current pivot on ties. The first $m-1$ columns remain unchanged during earlier eliminations because each pivot row is zero in later columns before the last; their active pivot candidates remain $1$ and $-1$. No swaps occur; $L_{ij}=-1$ for
> $i>j$, and the first $m-1$ columns of $\boldsymbol{U}$ equal those of $\mathbf{I}$.
> The last column satisfies
> $$
> \begin{aligned}
> U_{1m}&=1\\
> U_{im}&=A_{im}-\sum_{j=1}^{i-1}L_{ij}U_{jm}
> =1+\sum_{j=1}^{i-1}U_{jm}\\
> &=1+\sum_{j=1}^{i-1}2^{j-1}
> =1+\frac{2^{i-1}-1}{2-1}=2^{i-1}\\
> \|\boldsymbol{A}^{(m)}\|_\infty&=1,
> \qquad\|\boldsymbol{U}\|_\infty=2^{m-1},
> \qquad\rho=2^{m-1}
> \end{aligned}
> $$
> Thus the bound is attained exactly. This is exact-arithmetic growth, not a claim that the example must incur large rounding error; its powers of two are representable until overflow, as noted in the cited lecture.
>
> $\square$

## 3 Diagonal Dominance [25 pts]

Suppose that $\boldsymbol{A} \in \mathbb{K}^{m \times m}$ is strictly column diagonally dominant, meaning that for all $1 \leq k \leq m$,
$$
\left|\boldsymbol{A}_{kk}\right| > \sum \limits_{j \neq k} \left|\boldsymbol{A}_{jk}\right|
\tag{8}
$$
Show that if LU factorization with row pivoting is applied to $\boldsymbol{A}$, no row interchange takes place.

> *Proof.* Let $\boldsymbol{C}$ be a strictly column diagonally
> dominant active matrix. The elimination update is [Lecture 2, §2.7.2](<../2. Storing Matrices & Vectors.md#one-elimination-step>), and the pivot rule is [Lecture 4, §4.4](<../4. LU Factorization with Pivoting.md#how-to-pivot-row-pivoting>). In its first column,
> $$
> |C_{11}|>\sum_{i>1}|C_{i1}|\ge|C_{j1}|\qquad(j>1)
> $$
> Hence the first pivot is nonzero and uniquely largest in magnitude.
> The remaining matrix is the Schur complement
> $$
> S_{ij}=C_{ij}-\frac{C_{i1}C_{1j}}{C_{11}},\qquad i,j\ge2
> $$
> For each remaining column $j$, the triangle inequalities give
> $$
> \begin{aligned}
> |S_{jj}|
> &\ge |C_{jj}|-\frac{|C_{j1}||C_{1j}|}{|C_{11}|},\\
> \sum_{\substack{i\ge2\\i\ne j}}|S_{ij}|
> &\le\sum_{\substack{i\ge2\\i\ne j}}|C_{ij}|
> +\frac{|C_{1j}|}{|C_{11}|}\sum_{\substack{i\ge2\\i\ne j}}|C_{i1}|,\\
> |S_{jj}|-\sum_{\substack{i\ge2\\i\ne j}}|S_{ij}|
> &\ge|C_{jj}|-\sum_{\substack{i\ge2\\i\ne j}}|C_{ij}|
>   -\frac{|C_{1j}|}{|C_{11}|}\sum_{i\ge2}|C_{i1}|\\
> &=|C_{jj}|-\left(\sum_{i\ne j}|C_{ij}|-|C_{1j}|\right)
> -\frac{|C_{1j}|}{|C_{11}|}\sum_{i\ge2}|C_{i1}|\\
> &=\underbrace{|C_{jj}|-\sum_{i\ne j}|C_{ij}|}_{>0}
>  +|C_{1j}|\underbrace{
>  \left(1-\frac{\sum_{i\ge2}|C_{i1}|}{|C_{11}|}\right)}_{>0}
> >0
> \end{aligned}
> $$
> Thus the Schur complement is again strictly column diagonally dominant.
> Starting with $\boldsymbol{C}=\boldsymbol{A}$ and repeating proves that every diagonal
> pivot is chosen without a row interchange. The first term is strictly positive and the second is nonnegative, including when $C_{1j}=0$. This is an exact-arithmetic statement; rounding can erase a sufficiently small dominance margin.
>
> $\square$
