# Numerical Methods I, Homework 2

Schäfer, Fall 2026

Deadline: Oct. 05 Monday, 4:55 pm

Submitted solutions are preserved below. Each is followed by a separate added study explanation with intermediate steps and lecture links.

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
> \boldsymbol{x}&=-\boldsymbol{z}(\boldsymbol{v}^T\boldsymbol{x})\\
> \boldsymbol{v}^T\boldsymbol{x}&=-\alpha(\boldsymbol{v}^T\boldsymbol{x})\\
> (1+\alpha)\boldsymbol{v}^T\boldsymbol{x}&=0
> \end{aligned}
> $$
> Thus $\boldsymbol{v}^T\boldsymbol{x}=0$, hence $\boldsymbol{x}=\boldsymbol{0}$. Therefore the
> square matrix $\boldsymbol{B}$ is invertible.
>
> $\square$

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> Lecture basis: a square matrix is invertible exactly when its nullspace is zero ([Lecture 2, §2.5](<../2. Storing Matrices & Vectors.md#linear-systems>)). The rank-update argument is derived here.
>
> Write $s=\boldsymbol{v}^T\boldsymbol{x}$ and $\alpha=\boldsymbol{v}^T\boldsymbol{A}^{-1}\boldsymbol{u}$. Then
> $$
> \begin{aligned}
> \boldsymbol{B}\boldsymbol{x}=\boldsymbol{0}
> &\Longleftrightarrow \boldsymbol{A}\boldsymbol{x}+\boldsymbol{u}s=\boldsymbol{0}\\
> &\Longleftrightarrow \boldsymbol{x}=-\boldsymbol{A}^{-1}\boldsymbol{u}s,\\
> s&=\boldsymbol{v}^T\boldsymbol{x}
> =-\boldsymbol{v}^T\boldsymbol{A}^{-1}\boldsymbol{u}s=-\alpha s,\\
> (1+\alpha)s&=0,\\
> 1+\alpha\ne0&\Longrightarrow s=0
> \Longrightarrow \boldsymbol{x}=\boldsymbol{0}.
> \end{aligned}
> $$
> Thus $\operatorname{null}(\boldsymbol{B})=\{\boldsymbol{0}\}$; $\boldsymbol{B}$ is square, so the cited equivalence applies. The condition is also necessary: if $\alpha=-1$, then $\boldsymbol{z}=\boldsymbol{A}^{-1}\boldsymbol{u}\ne\boldsymbol{0}$ and
> $$
> \boldsymbol{B}\boldsymbol{z}
> =\boldsymbol{u}+\boldsymbol{u}(\boldsymbol{v}^T\boldsymbol{z})
> =\boldsymbol{u}(1+\alpha)=\boldsymbol{0}.
> $$

### (b) [7.5 pts]

Design an algorithm that provably solves the system of equations $\boldsymbol{B} \boldsymbol{x} = \boldsymbol{b}$ in $O(m^2)$ operations.

> *Solution.* Under the condition in (a), use the given factorization
> $\boldsymbol{A}=\boldsymbol{Q}\boldsymbol{R}$. Apply $\boldsymbol{Q}^T$ and use backward
> substitution to compute $\boldsymbol{y}$ and $\boldsymbol{z}$, then set
> $$
> \begin{aligned}
> \boldsymbol{R}\boldsymbol{y}&=\boldsymbol{Q}^T\boldsymbol{b},
> &\boldsymbol{R}\boldsymbol{z}&=\boldsymbol{Q}^T\boldsymbol{u}\\
> c&=\frac{\boldsymbol{v}^T\boldsymbol{y}}{1+\boldsymbol{v}^T\boldsymbol{z}},
> &\boldsymbol{x}&=\boldsymbol{y}-c\boldsymbol{z}
> \end{aligned}
> $$
> Since $\boldsymbol{A}\boldsymbol{y}=\boldsymbol{b}$ and $\boldsymbol{A}\boldsymbol{z}=\boldsymbol{u}$,
> $$
> \begin{aligned}
> \boldsymbol{B}\boldsymbol{x}
> &=\boldsymbol{b}-c\boldsymbol{u}
>   +\boldsymbol{u}\bigl(\boldsymbol{v}^T\boldsymbol{y}-c\boldsymbol{v}^T\boldsymbol{z}\bigr)\\
> &=\boldsymbol{b}+\boldsymbol{u}\underbrace{
>   \bigl(\boldsymbol{v}^T\boldsymbol{y}-c(1+\boldsymbol{v}^T\boldsymbol{z})\bigr)}_{0}
> =\boldsymbol{b}
> \end{aligned}
> $$
> Since each application of $\boldsymbol{Q}^T$ and each triangular solve costs
> $O(m^2)$, and the dot products and final update cost $O(m)$, the total is
> $O(m^2)$.
>
> $\square$

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> Lecture basis: solve $\boldsymbol{A}\boldsymbol{w}=\boldsymbol{d}$ through $\boldsymbol{R}\boldsymbol{w}=\boldsymbol{Q}^T\boldsymbol{d}$ ([Lecture 5, §5.6.2](<../5. Least Squares and Gram-Schmidt.md#solving-least-squares-with-qr>)), using [back substitution, Lecture 2, §2.6.2](<../2. Storing Matrices & Vectors.md#upper-triangular-systems>). The rank-one formula follows below; no new factorization is needed.
>
> Let $\boldsymbol{y}=\boldsymbol{A}^{-1}\boldsymbol{b}$, $\boldsymbol{z}=\boldsymbol{A}^{-1}\boldsymbol{u}$ and $c=\boldsymbol{v}^T\boldsymbol{x}$. Multiplying the updated system by $\boldsymbol{A}^{-1}$ gives
> $$
> \begin{aligned}
> (\boldsymbol{A}+\boldsymbol{u}\boldsymbol{v}^T)\boldsymbol{x}&=\boldsymbol{b},\\
> \boldsymbol{x}+\boldsymbol{z}(\boldsymbol{v}^T\boldsymbol{x})&=\boldsymbol{y},\\
> \boldsymbol{x}&=\boldsymbol{y}-c\boldsymbol{z},\\
> c&=\boldsymbol{v}^T(\boldsymbol{y}-c\boldsymbol{z})
> =\boldsymbol{v}^T\boldsymbol{y}-c\boldsymbol{v}^T\boldsymbol{z},\\
> c(1+\boldsymbol{v}^T\boldsymbol{z})&=\boldsymbol{v}^T\boldsymbol{y},\\
> c&=\frac{\boldsymbol{v}^T\boldsymbol{y}}{1+\boldsymbol{v}^T\boldsymbol{z}}.
> \end{aligned}
> $$
> Part (a) ensures that the denominator is nonzero. The full substitution check is
> $$
> \begin{aligned}
> \boldsymbol{B}(\boldsymbol{y}-c\boldsymbol{z})
> &=\boldsymbol{A}\boldsymbol{y}-c\boldsymbol{A}\boldsymbol{z}
>  +\boldsymbol{u}\boldsymbol{v}^T\boldsymbol{y}
>  -c\boldsymbol{u}\boldsymbol{v}^T\boldsymbol{z}\\
> &=\boldsymbol{b}+\boldsymbol{u}
>  [\boldsymbol{v}^T\boldsymbol{y}-c(1+\boldsymbol{v}^T\boldsymbol{z})]
> =\boldsymbol{b}.
> \end{aligned}
> $$
> For either right-hand side, back substitution computes
> $$
>  w_i=\frac{(\boldsymbol{Q}^T\boldsymbol{d})_i-\sum_{j=i+1}^{m}R_{ij}w_j}{R_{ii}},
>  \qquad i=m,m-1,\ldots,1.
> $$
> A dense $\boldsymbol{Q}^T\boldsymbol{d}$ costs $m(2m-1)$ operations; substitution costs $\sum_{i=1}^m[2(m-i)+1]=m^2$. Two such solves plus two dot products and a vector update therefore cost $O(m^2)$; this uses the operation-count convention of [Lecture 2, §2.3](<../2. Storing Matrices & Vectors.md#algorithms-and-computational-cost>).

### (c) r-upping [7.5 pts]

Extend the algorithm from the previous exercise to the case of $\boldsymbol{B} = \boldsymbol{A} + \boldsymbol{U}\boldsymbol{V}^{T}$, for $\boldsymbol{U},\boldsymbol{V} \in \mathbb{R}^{m \times r}$ and $r \ll m$.
Calculate the asymptotic complexity of the resulting algorithm.

> *Solution.* Compute $\boldsymbol{y}$ and the columns of $\boldsymbol{Z}$ using the existing QR factors:
> $$
> \begin{aligned}
> \boldsymbol{R}\boldsymbol{y}&=\boldsymbol{Q}^T\boldsymbol{b},
> &\boldsymbol{R}\boldsymbol{Z}&=\boldsymbol{Q}^T\boldsymbol{U}\\
> \boldsymbol{S}&=\mathbf{I}_r+\boldsymbol{V}^T\boldsymbol{Z},
> &\boldsymbol{S}\boldsymbol{t}&=\boldsymbol{V}^T\boldsymbol{y}\\
> \boldsymbol{x}&=\boldsymbol{y}-\boldsymbol{Z}\boldsymbol{t}
> \end{aligned}
> $$
> Assume $\boldsymbol{S}$ is nonsingular, the rank-$r$ analogue of the condition
> in (a). Since $\boldsymbol{A}\boldsymbol{y}=\boldsymbol{b}$ and $\boldsymbol{A}\boldsymbol{Z}=\boldsymbol{U}$,
> $$
> \begin{aligned}
> \boldsymbol{B}\boldsymbol{x}
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
> for $1\le r\ll m$.
>
> $\square$

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> Lecture basis: reuse the QR solve from [Lecture 5, §5.6.2](<../5. Least Squares and Gram-Schmidt.md#solving-least-squares-with-qr>) for each column. The reduced-system identity and its invertibility condition are derived here using [Lecture 2, §2.5](<../2. Storing Matrices & Vectors.md#linear-systems>).
>
> Set $\boldsymbol{y}=\boldsymbol{A}^{-1}\boldsymbol{b}$, $\boldsymbol{Z}=\boldsymbol{A}^{-1}\boldsymbol{U}\in\mathbb{R}^{m\times r}$ and $\boldsymbol{t}=\boldsymbol{V}^T\boldsymbol{x}\in\mathbb{R}^r$. Then
> $$
> \begin{aligned}
> \boldsymbol{B}\boldsymbol{x}=\boldsymbol{b}
> &\Longleftrightarrow \boldsymbol{x}+\boldsymbol{Z}\boldsymbol{V}^T\boldsymbol{x}=\boldsymbol{y},\\
> \boldsymbol{x}&=\boldsymbol{y}-\boldsymbol{Z}\boldsymbol{t},\\
> \boldsymbol{t}&=\boldsymbol{V}^T\boldsymbol{y}
>  -\boldsymbol{V}^T\boldsymbol{Z}\boldsymbol{t},\\
> \underbrace{(\mathbf{I}_r+\boldsymbol{V}^T\boldsymbol{Z})}_{\boldsymbol{S}}
> \boldsymbol{t}&=\boldsymbol{V}^T\boldsymbol{y}.
> \end{aligned}
> $$
> **Required condition:** $\boldsymbol{B}$ is invertible if and only if $\boldsymbol{S}$ is invertible. If $\boldsymbol{S}$ is invertible and $\boldsymbol{B}\boldsymbol{x}=0$, the same equations with $\boldsymbol{b}=0$ give $\boldsymbol{S}\boldsymbol{t}=0$, hence $\boldsymbol{t}=0$ and $\boldsymbol{x}=0$. Conversely, if $\boldsymbol{S}\boldsymbol{t}=0$ for nonzero $\boldsymbol{t}$, then
> $$
> \begin{aligned}
> \boldsymbol{Z}\boldsymbol{t}=0
> &\Longrightarrow \boldsymbol{S}\boldsymbol{t}
> =\boldsymbol{t}+\boldsymbol{V}^T\boldsymbol{Z}\boldsymbol{t}
> =\boldsymbol{t}\ne0,\\
> \therefore\quad \boldsymbol{Z}\boldsymbol{t}&\ne0,\\
> \boldsymbol{B}\boldsymbol{Z}\boldsymbol{t}
> &=\boldsymbol{U}\boldsymbol{t}
>  +\boldsymbol{U}\boldsymbol{V}^T\boldsymbol{Z}\boldsymbol{t}
> =\boldsymbol{U}\boldsymbol{S}\boldsymbol{t}=0.
> \end{aligned}
> $$
> Thus a singular $\boldsymbol{S}$ makes $\boldsymbol{B}$ singular. When invertible, substitution gives
> $$
> \begin{aligned}
> \boldsymbol{x}
> &=\boldsymbol{y}-\boldsymbol{Z}\boldsymbol{S}^{-1}\boldsymbol{V}^T\boldsymbol{y},\\
> \boldsymbol{B}^{-1}
> &=\boldsymbol{A}^{-1}
>  -\boldsymbol{A}^{-1}\boldsymbol{U}
>  (\mathbf{I}_r+\boldsymbol{V}^T\boldsymbol{A}^{-1}\boldsymbol{U})^{-1}
>  \boldsymbol{V}^T\boldsymbol{A}^{-1}.
> \end{aligned}
> $$
> The inverse formula describes the result; implementations solve the $r\times r$ system instead. Using [Lecture 2, §2.3](<../2. Storing Matrices & Vectors.md#algorithms-and-computational-cost>), the counts are
> $$
> \begin{aligned}
> \boldsymbol{y},\boldsymbol{Z}:&\quad (r+1)O(m^2),\\
> \boldsymbol{V}^T\boldsymbol{Z}:&\quad r^2 O(m)=O(mr^2),\\
> \boldsymbol{S}\boldsymbol{t}=\boldsymbol{V}^T\boldsymbol{y}:&\quad O(r^3)+O(mr),\\
> \boldsymbol{y}-\boldsymbol{Z}\boldsymbol{t}:&\quad O(mr),\\
> 1\le r\le m&\Longrightarrow mr^2\le m^2r,\quad r^3\le m^2r,\\
> \text{total}&=O(m^2r).
> \end{aligned}
> $$

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
> $|\eta|\le\varepsilon$, for the operations in question.
> For $p\varepsilon<1$, $|\eta_t|\le\varepsilon$, and $q_t\in\{-1,1\}$,
> each factor $(1+\eta_t)^{q_t}$ lies between $1-\varepsilon$ and
> $(1-\varepsilon)^{-1}$. Hence Bernoulli's inequality gives
> $$
> \begin{aligned}
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
> s_m
> &=x_1y_1(1+\alpha_1)\prod_{k=2}^{m}(1+\beta_k)
>  +\sum_{i=2}^{m}x_i y_i(1+\alpha_i)\prod_{k=i}^{m}(1+\beta_k)\\
> &=\sum_{i=1}^{m}x_i y_i(1+\delta_i)
> \end{aligned}
> $$
> Each coefficient contains at most $m$ rounding factors, so the product
> bound gives $|\delta_i|\le\gamma_m$.
>
> $\square$

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> Lecture basis: [Lecture 4, §4.2.2](<../4. LU Factorization with Pivoting.md#floating-point-summation>) states the first-order dot-product estimate. The exact $\gamma_m$ estimate below is this homework's strengthening. Here $\varepsilon$ is **unit roundoff**, as the problem specifies; [Lecture 1, §1.4.1](<../1. Vectors and Matrices.md#spacing-and-relative-accuracy>) instead defines a spacing parameter. For binary round-to-nearest, unit roundoff is half the spacing above $1$.
>
> First prove the product bound rather than assuming Bernoulli's inequality. For $0\le\varepsilon<1$,
> $$
> \begin{aligned}
> (1-\varepsilon)^0&=1,\\
> (1-\varepsilon)^p\ge1-p\varepsilon
> &\Longrightarrow (1-\varepsilon)^{p+1}
> \ge(1-p\varepsilon)(1-\varepsilon)\\
> &=1-(p+1)\varepsilon+p\varepsilon^2
> \ge1-(p+1)\varepsilon.
> \end{aligned}
> $$
> For $|\eta|\le\varepsilon$ and $q\in\{-1,1\}$, both a rounding factor and its reciprocal satisfy
> $$
> \begin{aligned}
> 1-\varepsilon\le1+\eta\le1+\varepsilon
> &\le\frac1{1-\varepsilon},\\
> 1-\varepsilon\le\frac1{1+\varepsilon}
> &\le\frac1{1+\eta}\le\frac1{1-\varepsilon}.
> \end{aligned}
> $$
> Let $P=\prod_{t=1}^p(1+\eta_t)^{q_t}$, with $p\varepsilon<1$. Multiplication and the proved inequality give
> $$
> \begin{aligned}
> 1-p\varepsilon
> &\le(1-\varepsilon)^p\le P
> \le(1-\varepsilon)^{-p}\le\frac1{1-p\varepsilon},\\
> -p\varepsilon\le P-1&\le\frac{p\varepsilon}{1-p\varepsilon},\\
> |P-1|&\le\gamma_p=\frac{p\varepsilon}{1-p\varepsilon}.
> \end{aligned}
> $$
> Now expand the first accumulation steps:
> $$
> \begin{aligned}
> p_i&=x_i y_i(1+\alpha_i),\\
> s_1&=p_1,\\
> s_2&=p_1(1+\beta_2)+p_2(1+\beta_2),\\
> s_3&=p_1(1+\beta_2)(1+\beta_3)
>  +p_2(1+\beta_2)(1+\beta_3)+p_3(1+\beta_3),\\
> 1+\delta_1&=(1+\alpha_1)\prod_{k=2}^{m}(1+\beta_k),\\
> 1+\delta_i&=(1+\alpha_i)\prod_{k=i}^{m}(1+\beta_k),\qquad i\ge2.
> \end{aligned}
> $$
> The first coefficient has $1+(m-1)=m$ factors; coefficient $i\ge2$ has $1+(m-i+1)\le m$. Also
> $$
> 0\le p\le m\quad\Longrightarrow\quad
> \gamma_m-\gamma_p
> =\frac{(m-p)\varepsilon}{(1-m\varepsilon)(1-p\varepsilon)}\ge0.
> $$
> Therefore every $|\delta_i|\le\gamma_m$. For $m=1$, the addition product is empty and equals $1$, so only the multiplication rounding factor remains.

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

> *Proof.* Set $\gamma_0=0$ and $\boldsymbol{E}=\tilde{\boldsymbol{L}}\tilde{\boldsymbol{U}}-\boldsymbol{A}$.
> Fix $j,k$ and abbreviate
> $t_i=\tilde{L}_{ji}\tilde{U}_{ik}$. For $j\le k$, part (a) and the subtraction give
> $$
> \begin{aligned}
> \tilde{U}_{jk}
>  &=\left(A_{jk}-\sum_{i=1}^{j-1}t_i(1+\delta_i)\right)(1+\alpha)\\
> A_{jk}
> &=\sum_{i=1}^{j-1}t_i(1+\delta_i)+t_j(1+\theta)\\
> E_{jk}&=-\sum_{i=1}^{j-1}t_i\delta_i-t_j\theta
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
> A_{jk}
> &=\sum_{i=1}^{k-1}t_i(1+\delta_i)+t_k(1+\theta)\\
> E_{jk}&=-\sum_{i=1}^{k-1}t_i\delta_i-t_k\theta
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
> &\le\gamma_m\sum_{i=1}^{\min(j,k)}
>  |\tilde{L}_{ji}|\,|\tilde{U}_{ik}|\\
> &=\gamma_m\bigl(|\tilde{\boldsymbol{L}}|\,|\tilde{\boldsymbol{U}}|\bigr)_{jk}
> \end{aligned}
> $$
>
> $\square$

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> Lecture basis: [Lecture 4, §4.2.1](<../4. LU Factorization with Pivoting.md#entrywise-relations>) isolates triangular-factor entries; [§4.2.3](<../4. LU Factorization with Pivoting.md#error-in-an-entry-of-u>) and [§4.2.4](<../4. LU Factorization with Pivoting.md#error-in-an-entry-of-l>) collect subtraction/division errors. Use the exact product bound proved in 2(a), replacing the lecture's first-order estimate. The homework uses $E=\tilde L\tilde U-A$, opposite to the lecture's error sign; absolute bounds are unchanged. Assume $m\varepsilon<1$, nonzero pivots, no overflow or underflow, and the stated order of operations.
>
> For fixed $j,k$, write $t_i=\tilde L_{ji}\tilde U_{ik}$ and $h=\min(j,k)$. Triangularity gives
> $$
> E_{jk}=\sum_{i=1}^{h}t_i-A_{jk}.
> $$
> If $j\le k$, then $t_j=\tilde U_{jk}$ because $\tilde L_{jj}=1$. Rearranging every step gives
> $$
> \begin{aligned}
>  t_j&=\left(A_{jk}-\sum_{i<j}t_i(1+\delta_i)\right)(1+\alpha),\\
>  \frac{t_j}{1+\alpha}
>  &=A_{jk}-\sum_{i<j}t_i(1+\delta_i),\\
>  \theta&=(1+\alpha)^{-1}-1,\qquad |\theta|\le\gamma_1,\\
>  A_{jk}&=\sum_{i<j}t_i+\sum_{i<j}t_i\delta_i+t_j+t_j\theta,\\
>  E_{jk}&=\left(\sum_{i<j}t_i+t_j\right)-A_{jk}
>  =-\sum_{i<j}t_i\delta_i-t_j\theta.
> \end{aligned}
> $$
> If $j>k$, multiply the computed division by $\tilde U_{kk}$, so its left side becomes $t_k$:
> $$
> \begin{aligned}
>  t_k&=\left(A_{jk}-\sum_{i<k}t_i(1+\delta_i)\right)(1+\alpha)(1+\beta),\\
>  \theta&=[(1+\alpha)(1+\beta)]^{-1}-1,\\
>  A_{jk}&=\sum_{i<k}t_i(1+\delta_i)+t_k(1+\theta),\\
>  E_{jk}&=-\sum_{i<k}t_i\delta_i-t_k\theta.
> \end{aligned}
> $$
> Here $j>k$ forces $m\ge2$, so $|\theta|\le\gamma_2\le\gamma_m$. In the other case $|\theta|\le\gamma_1\le\gamma_m$; the dot-product coefficients satisfy $|\delta_i|\le\gamma_{h-1}\le\gamma_m$. Thus
> $$
> \begin{aligned}
> |E_{jk}|
> &\le\sum_{i<h}|t_i||\delta_i|+|t_h||\theta|\\
> &\le\gamma_m\left(\sum_{i<h}|t_i|+|t_h|\right)\\
> &=\gamma_m\sum_{i=1}^{h}|\tilde L_{ji}||\tilde U_{ik}|\\
> &=\gamma_m\sum_{i=1}^{m}|\tilde L_{ji}||\tilde U_{ik}|\\
> &=\gamma_m(|\tilde{\boldsymbol L}||\tilde{\boldsymbol U}|)_{jk}.
> \end{aligned}
> $$
> The added terms vanish: $\tilde L_{ji}=0$ when $i>j$, and $\tilde U_{ik}=0$ when $i>k$. Empty sums are zero; for $m=1$, only the $j\le k$ case occurs.

### (c) [5 pts]

Deduce that under row-pivoted $LU$ factorization and taking $\| \cdot \|_{\infty}$ to signify the vector-infinity norm, we have
$$
\left\|\boldsymbol{E}\right\|_{\infty} \leq m \gamma_{m} \left\|\tilde{\boldsymbol{U}}\right\|_{\infty}
\tag{6}
$$
This prompts us to investigate the growth factor $\rho \coloneqq \frac{\left\| \boldsymbol{U} \right\|_{\infty}}{\left\|\boldsymbol{A}\right\|_{\infty}}$ of row-pivoted LU factorization.
After justification, you may use that row-pivoted LU factorization reduces to unpivoted LU factorization on a permuted matrix $\boldsymbol{P}\boldsymbol{A}$, where $\boldsymbol{P}$ is a permutation matrix.

> *Proof.* Use the entrywise norm $\|\boldsymbol{M}\|_\infty=\max_{i,j}|M_{ij}|$.
>
> A later row swap $\boldsymbol{T}_\ell$ can be moved past an
> earlier elementary elimination matrix $\boldsymbol{F}_k$ by
> $$
> \boldsymbol{T}_\ell\boldsymbol{F}_k
> =(\boldsymbol{T}_\ell\boldsymbol{F}_k\boldsymbol{T}_\ell)\boldsymbol{T}_\ell
> \qquad(\ell>k)
> $$
> The conjugation only reorders the multipliers below the $k$th diagonal
> entry. Repeating this operation gives an unpivoted factorization of
> $\boldsymbol{P}\boldsymbol{A}$, where $\boldsymbol{P}=\boldsymbol{T}_m\cdots\boldsymbol{T}_1$.
> Thus (b) applies with
> $\tilde{\boldsymbol{L}}\tilde{\boldsymbol{U}}=\boldsymbol{P}\boldsymbol{A}+\boldsymbol{E}$.
>
> Row pivoting selects a largest-magnitude entry in the active column,
> so every multiplier has magnitude at most $1$, including after rounding
> since $\pm1$ are representable. Thus $|\tilde{L}_{ik}|\le1$, and (b) gives
> $$
> \begin{aligned}
> \|\boldsymbol{E}\|_\infty
> &\le\gamma_m\max_{i,j}\sum_{k=1}^{m}
>  |\tilde{L}_{ik}|\,|\tilde{U}_{kj}|\\
> &\le m\gamma_m\|\tilde{\boldsymbol{U}}\|_\infty
> \end{aligned}
> $$
>
> $\square$

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> Lecture basis: the pivot rule and $|L_{ik}|\le1$ are in [Lecture 4, §4.4](<../4. LU Factorization with Pivoting.md#how-to-pivot-row-pivoting>); moving row swaps past elimination is proved in [§4.5](<../4. LU Factorization with Pivoting.md#commuting-permutations>). The resulting factorization applies the bound in 2(b) to $\boldsymbol{P}\boldsymbol{A}$.
>
> Let $\boldsymbol{F}_k=\mathbf I-\boldsymbol{\ell}_k\boldsymbol{e}_k^T$ be step-$k$ elimination. A later swap $\boldsymbol{T}_\ell$ acts only on indices $\ell,\ldots,m$, so $\ell>k$ implies $\boldsymbol{T}_\ell\boldsymbol{e}_k=\boldsymbol{e}_k$ and $\boldsymbol{T}_\ell^2=\mathbf I$. Hence
> $$
> \begin{aligned}
> \boldsymbol{T}_\ell\boldsymbol{F}_k
> &=\boldsymbol{T}_\ell\boldsymbol{F}_k
>  (\boldsymbol{T}_\ell\boldsymbol{T}_\ell)\\
> &=(\boldsymbol{T}_\ell\boldsymbol{F}_k\boldsymbol{T}_\ell)\boldsymbol{T}_\ell,\\
> \boldsymbol{T}_\ell\boldsymbol{F}_k\boldsymbol{T}_\ell
> &=\mathbf I-(\boldsymbol{T}_\ell\boldsymbol{\ell}_k)\boldsymbol{e}_k^T.
> \end{aligned}
> $$
> This only reorders earlier multipliers below row $k$. Repeating moves all swaps to the right, giving $\boldsymbol{P}\boldsymbol{A}=\boldsymbol{L}\boldsymbol{U}$ in exact arithmetic, and $\tilde{\boldsymbol L}\tilde{\boldsymbol U}=\boldsymbol{P}\boldsymbol{A}+\boldsymbol{E}$ with the computed-factor error of 2(b).
>
> **Norm convention:** here $\|\boldsymbol{M}\|_\infty=\max_{i,j}|M_{ij}|$, treating its entries as a vector. It is not the induced maximum-row-sum norm. At each pivot, the exact multiplier has magnitude at most $1$. For correctly rounded arithmetic, rounding also stays in $[-1,1]$, whose endpoints are representable. The relative-error model alone would only guarantee $1+\varepsilon$.
>
> Using $|\tilde L_{ik}|\le1$, including its unit diagonal,
> $$
> \begin{aligned}
> |E_{ij}|
> &\le\gamma_m\sum_{k=1}^{m}|\tilde L_{ik}||\tilde U_{kj}|\\
> &\le\gamma_m\sum_{k=1}^{m}1\cdot\|\tilde{\boldsymbol U}\|_\infty\\
> &=m\gamma_m\|\tilde{\boldsymbol U}\|_\infty,\\
> \|\boldsymbol{E}\|_\infty
> &=\max_{i,j}|E_{ij}|
> \le m\gamma_m\|\tilde{\boldsymbol U}\|_\infty.
> \end{aligned}
> $$

### (d) [5 pts]

Verify that the rows $\boldsymbol{u}_{i}^{T}, \boldsymbol{a}_{i}^{T}$ of $\boldsymbol{U}, \boldsymbol{A}$ satisfy
$$
\boldsymbol{u}_{i}^{T} = \boldsymbol{a}_i^T - \sum \limits_{j = 1}^{i - 1} \boldsymbol{L}_{ij} \boldsymbol{u}_{j}^T
\tag{7}
$$

> *Proof.* For $\boldsymbol{A}=\boldsymbol{L}\boldsymbol{U}$, $L_{ii}=1$ and $L_{ij}=0$ for $j>i$ give
> $$
> \begin{aligned}
> \boldsymbol{a}_i^T
> &=\sum_{j=1}^{m}L_{ij}\boldsymbol{u}_j^T
> =\boldsymbol{u}_i^T+\sum_{j=1}^{i-1}L_{ij}\boldsymbol{u}_j^T\\
> \boldsymbol{u}_i^T
> &=\boldsymbol{a}_i^T-\sum_{j=1}^{i-1}L_{ij}\boldsymbol{u}_j^T
> \end{aligned}
> $$
> Under row pivoting, replace $\boldsymbol{a}_i^T$ by $\boldsymbol{a}_{\pi(i)}^T$,
> the $i$th row of $\boldsymbol{P}\boldsymbol{A}$.
>
> $\square$

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> Lecture basis: the triangular entry identities are in [Lecture 4, §4.2.1](<../4. LU Factorization with Pivoting.md#entrywise-relations>), and the permuted system is justified in [§4.5](<../4. LU Factorization with Pivoting.md#commuting-permutations>).
>
> For every column $k$, expand row $i$ of $\boldsymbol{A}=\boldsymbol{L}\boldsymbol{U}$:
> $$
> \begin{aligned}
> A_{ik}
> &=\sum_{j=1}^{m}L_{ij}U_{jk}\\
> &=\sum_{j=1}^{i-1}L_{ij}U_{jk}+L_{ii}U_{ik}
>  +\underbrace{\sum_{j=i+1}^{m}L_{ij}U_{jk}}_{0}\\
> &=\sum_{j=1}^{i-1}L_{ij}U_{jk}+U_{ik},\\
> U_{ik}&=A_{ik}-\sum_{j=1}^{i-1}L_{ij}U_{jk}.
> \end{aligned}
> $$
> Collecting this identity for $k=1,\ldots,m$ gives the stated row-vector formula. If $(\boldsymbol{P}\boldsymbol{A})_{i,:}=\boldsymbol{a}_{\pi(i)}^T$, replace $\boldsymbol{a}_i^T$ by $\boldsymbol{a}_{\pi(i)}^T$.
>
> This is an **exact-factorization** identity. Under the homework's computed-factor convention $\tilde{\boldsymbol L}\tilde{\boldsymbol U}=\boldsymbol{P}\boldsymbol{A}+\boldsymbol{E}$, its precise counterpart is
> $$
> \tilde{\boldsymbol{u}}_i^T
> =\boldsymbol{a}_{\pi(i)}^T+\boldsymbol{e}_i^T\boldsymbol{E}
>  -\sum_{j<i}\tilde L_{ij}\tilde{\boldsymbol{u}}_j^T.
> $$

### (e) [5 pts]

Use part (d) to show that under row pivoting, $\left\|\boldsymbol{U}\right\|_{\infty} \leq 2^{m - 1} \left\| \boldsymbol{A}\right\|_{\infty}$.
Give an example of a family of matrices $\boldsymbol{A}^{(m)} \in \mathbb{R}^{m \times m}$ that saturates this bound (up to constant factors).

> *Proof.* Set $a=\|\boldsymbol{A}\|_\infty$.
> By (d), row pivoting, and induction,
> $$
> \begin{aligned}
> \|\boldsymbol{u}_1\|_\infty&\le a\\
> \|\boldsymbol{u}_i\|_\infty
> &\le\|\boldsymbol{a}_{\pi(i)}\|_\infty
>   +\sum_{j=1}^{i-1}|L_{ij}|\,\|\boldsymbol{u}_j\|_\infty\\
> &\le a+\sum_{j=1}^{i-1}2^{j-1}a
> =2^{i-1}a\\
> \|\boldsymbol{U}\|_\infty
> &=\max_i\|\boldsymbol{u}_i\|_\infty
> \le2^{m-1}\|\boldsymbol{A}\|_\infty
> \end{aligned}
> $$
> For a family attaining the bound, take
> $$
> A^{(m)}_{ij}=
> \begin{cases}
> 1,&i=j\text{ or }j=m\\
> -1,&i>j,\ j<m\\
> 0,&\text{otherwise}
> \end{cases}
> $$
> Retain the current pivot on ties. No swaps occur; $L_{ij}=-1$ for
> $i>j$, and the first $m-1$ columns of $\boldsymbol{U}$ equal those of $\mathbf{I}$.
> The last column satisfies
> $$
> \begin{aligned}
> U_{1m}&=1\\
> U_{im}&=1+\sum_{j=1}^{i-1}U_{jm}
> =1+\sum_{j=1}^{i-1}2^{j-1}=2^{i-1}\\
> \|\boldsymbol{A}^{(m)}\|_\infty&=1,
> \qquad\|\boldsymbol{U}\|_\infty=2^{m-1},
> \qquad\rho=2^{m-1}
> \end{aligned}
> $$
> Thus the bound is attained exactly.
>
> $\square$

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> Lecture basis: bounded elimination multipliers come from [Lecture 4, §4.4](<../4. LU Factorization with Pivoting.md#how-to-pivot-row-pivoting>); the extremal matrix is the family in [Lecture 5, §5.1.1](<../5. Least Squares and Gram-Schmidt.md#a-matrix-with-exponential-growth>). Use exact factors and the entrywise norm from 2(c).
>
> Put $a=\max_{i,j}|A_{ij}|$. Part 2(d) and the componentwise triangle inequality give
> $$
> \begin{aligned}
> \|\boldsymbol{u}_i\|_\infty
> &=\max_k\left|A_{\pi(i),k}-\sum_{j<i}L_{ij}U_{jk}\right|\\
> &\le\max_k|A_{\pi(i),k}|
>  +\sum_{j<i}|L_{ij}|\max_k|U_{jk}|\\
> &\le a+\sum_{j<i}\|\boldsymbol{u}_j\|_\infty.
> \end{aligned}
> $$
> The base case is $\|\boldsymbol{u}_1\|_\infty\le a$. If $\|\boldsymbol{u}_j\|_\infty\le2^{j-1}a$ for $j<i$, then
> $$
> \begin{aligned}
> \sum_{j=1}^{i-1}2^{j-1}&=1+2+\cdots+2^{i-2}=2^{i-1}-1,\\
> \|\boldsymbol{u}_i\|_\infty
> &\le a+a(2^{i-1}-1)=2^{i-1}a,\\
> \|\boldsymbol{U}\|_\infty
> &=\max_i\|\boldsymbol{u}_i\|_\infty\le2^{m-1}a.
> \end{aligned}
> $$
> For the submitted example, the first $m-1$ columns have diagonal $1$, entries $-1$ below, and zero above. Their updates leave later such columns unchanged because the pivot row has zeros there. Thus every pivot candidate is $1$ or $-1$; retaining ties causes no swaps and gives $L_{ij}=-1$ below the diagonal.
>
> The last-column recurrence is
> $$
> \begin{aligned}
> U_{1m}&=1,\\
> U_{im}&=A_{im}-\sum_{j<i}L_{ij}U_{jm}
> =1+\sum_{j<i}U_{jm},\\
> U_{jm}=2^{j-1}\ (j<i)
> &\Longrightarrow U_{im}=1+(2^{i-1}-1)=2^{i-1}.
> \end{aligned}
> $$
> One can check the factors directly. For $k<m$, $U_{jk}=\delta_{jk}$, so $(LU)_{ik}=L_{ik}=A_{ik}$. For $k=m$,
> $$
> (LU)_{im}=2^{i-1}-\sum_{j<i}2^{j-1}=1=A_{im}.
> $$
> Therefore $\|A\|_\infty=1$, $\|U\|_\infty=2^{m-1}$ and $\rho=2^{m-1}$. As the cited lecture clarifies, large growth is not itself a realized rounding error; these powers of two can be represented exactly until overflow.

## 3 Diagonal Dominance [25 pts]

Suppose that $\boldsymbol{A} \in \mathbb{K}^{m \times m}$ is strictly column diagonally dominant, meaning that for all $1 \leq k \leq m$,
$$
\left|\boldsymbol{A}_{kk}\right| > \sum \limits_{j \neq k} \left|\boldsymbol{A}_{jk}\right|
\tag{8}
$$
Show that if LU factorization with row pivoting is applied to $\boldsymbol{A}$, no row interchange takes place.

> *Proof.* Let $\boldsymbol{C}$ be a strictly column diagonally
> dominant active matrix. In its first column,
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
> |S_{jj}|-\sum_{\substack{i\ge2\\i\ne j}}|S_{ij}|
> &\ge|C_{jj}|-\sum_{\substack{i\ge2\\i\ne j}}|C_{ij}|
>   -\frac{|C_{1j}|}{|C_{11}|}\sum_{i\ge2}|C_{i1}|\\
> &=\underbrace{|C_{jj}|-\sum_{i\ne j}|C_{ij}|}_{>0}
>  +|C_{1j}|\underbrace{
>  \left(1-\frac{\sum_{i\ge2}|C_{i1}|}{|C_{11}|}\right)}_{>0}
> >0
> \end{aligned}
> $$
> Thus the Schur complement is again strictly column diagonally dominant.
> Starting with $\boldsymbol{C}=\boldsymbol{A}$ and repeating proves that every diagonal
> pivot is chosen without a row interchange.
>
> $\square$

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> Lecture basis: the trailing update is [Lecture 2, §2.7.2](<../2. Storing Matrices & Vectors.md#one-elimination-step>), and the largest-column-entry pivot rule is [Lecture 4, §4.4](<../4. LU Factorization with Pivoting.md#how-to-pivot-row-pivoting>). Preservation of strict column dominance is proved here.
>
> For the current active matrix $\boldsymbol{C}\in\mathbb{K}^{n\times n}$,
> $$
> |C_{11}|>\sum_{i=2}^n|C_{i1}|\ge|C_{j1}|\quad(j>1).
> $$
> Thus $C_{11}\ne0$ and row pivoting selects it uniquely. Eliminating gives $S_{ij}=C_{ij}-C_{i1}C_{1j}/C_{11}$ for $i,j\ge2$. For a fixed remaining column $j$, apply the reverse and ordinary triangle inequalities separately:
> $$
> \begin{aligned}
> |S_{jj}|
> &\ge |C_{jj}|-\frac{|C_{j1}||C_{1j}|}{|C_{11}|},\\
> \sum_{\substack{i\ge2\\i\ne j}}|S_{ij}|
> &\le\sum_{\substack{i\ge2\\i\ne j}}|C_{ij}|
>  +\frac{|C_{1j}|}{|C_{11}|}
>    \sum_{\substack{i\ge2\\i\ne j}}|C_{i1}|,\\
> |S_{jj}|-\sum_{\substack{i\ge2\\i\ne j}}|S_{ij}|
> &\ge |C_{jj}|-\sum_{\substack{i\ge2\\i\ne j}}|C_{ij}|
>  -\frac{|C_{1j}|}{|C_{11}|}
>    \left(|C_{j1}|+\sum_{\substack{i\ge2\\i\ne j}}|C_{i1}|\right)\\
> &=|C_{jj}|-\left(\sum_{i\ne j}|C_{ij}|-|C_{1j}|\right)
>  -\frac{|C_{1j}|}{|C_{11}|}\sum_{i\ge2}|C_{i1}|\\
> &=\underbrace{|C_{jj}|-\sum_{i\ne j}|C_{ij}|}_{>0}
>  +|C_{1j}|\underbrace{\left(1-\frac{\sum_{i\ge2}|C_{i1}|}{|C_{11}|}\right)}_{>0}
> >0.
> \end{aligned}
> $$
> The second term is nonnegative even if $C_{1j}=0$; the first is strictly positive. Hence $\boldsymbol{S}$ remains strictly column diagonally dominant. Apply the same argument to each smaller active matrix; the final $1\times1$ matrix has a nonzero diagonal because its empty off-diagonal sum is zero. Thus no row interchange occurs in exact arithmetic. A floating-point implementation can lose a very small dominance margin through rounding; that is outside this exact-arithmetic theorem.
