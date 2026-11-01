# Numerical Methods I, Homework 1

Schäfer, Fall 2026

Deadline: Sep. 21 Monday, 4:55 pm

## 1 Less positive [12.5 pts]

Consider a symmetric positive definite matrix $\boldsymbol{A}$ separated into subblocks according to
$$
\boldsymbol{A} = \begin{pmatrix}
    \boldsymbol{A}_{1, 1} & \boldsymbol{A}_{1, 2} \\
    \boldsymbol{A}_{2, 1} & \boldsymbol{A}_{2, 2}
  \end{pmatrix}
$$
Show that the matrix $\boldsymbol{A}_{2,2} - \boldsymbol{A}_{2,1} \boldsymbol{A}_{1,1}^{-1} \boldsymbol{A}_{1,2}$ is symmetric and positive definite.

> *Proof.* For every $\boldsymbol{x}\ne\boldsymbol{0}$,
> $$
> \boldsymbol{x}^T\boldsymbol{A}_{1,1}\boldsymbol{x}
> =
> \begin{pmatrix}\boldsymbol{x}\\\boldsymbol{0}\end{pmatrix}^{\!T}
> \boldsymbol{A}
> \begin{pmatrix}\boldsymbol{x}\\\boldsymbol{0}\end{pmatrix}>0
> $$
> Thus $\boldsymbol{A}_{1,1}$ is symmetric positive definite and invertible. Let
> $\boldsymbol{S}=\boldsymbol{A}_{2,2}-\boldsymbol{A}_{2,1}\boldsymbol{A}_{1,1}^{-1}\boldsymbol{A}_{1,2}$.
> Since $\boldsymbol{A}_{2,1}=\boldsymbol{A}_{1,2}^T$, then
> $$
> \begin{aligned}
> \boldsymbol{S}^T
> &=\boldsymbol{A}_{2,2}^T
>   -\boldsymbol{A}_{1,2}^T(\boldsymbol{A}_{1,1}^{-1})^T\boldsymbol{A}_{2,1}^T\\
> &=\boldsymbol{A}_{2,2}
>   -\boldsymbol{A}_{2,1}\boldsymbol{A}_{1,1}^{-1}\boldsymbol{A}_{1,2}
> =\boldsymbol{S}
> \end{aligned}
> $$
> For $\boldsymbol{y}\ne\boldsymbol{0}$, set
> $$
> \begin{aligned}
> \boldsymbol{z}
> &=\begin{pmatrix}
> -\boldsymbol{A}_{1,1}^{-1}\boldsymbol{A}_{1,2}\boldsymbol{y}\\
> \boldsymbol{y}
> \end{pmatrix}\ne\boldsymbol{0},
> &
> \boldsymbol{A}\boldsymbol{z}
> &=\begin{pmatrix}\boldsymbol{0}\\\boldsymbol{S}\boldsymbol{y}\end{pmatrix}
> \end{aligned}
> $$
> then we know $0<\boldsymbol{z}^T\boldsymbol{A}\boldsymbol{z}=\boldsymbol{y}^T\boldsymbol{S}\boldsymbol{y}$. Hence $\boldsymbol{S}$ is symmetric positive definite.

## 2 Just one [12.5 pts]

Consider a matrix $\boldsymbol{A} \in \mathbb{R}^{m \times m}$, with (unpivoted) LU-factorization given by $\boldsymbol{A} = \boldsymbol{L} \boldsymbol{U}$.
Propose an algorithm for computing the $(i, j)$-th entry of $\boldsymbol{A}^{-1}$ using only $\mathcal{O}\left(\left(m + 1 - j\right)^2 + \left(m + 1 - i\right)^2\right)$ floating point operations.

> *Proof.* Using the given factors, we want to solve
> $\boldsymbol{L}\boldsymbol{y}=\boldsymbol{e}_j$ and $\boldsymbol{U}\boldsymbol{x}=\boldsymbol{y}$, so then
> $$
> \boldsymbol{x}=\boldsymbol{U}^{-1}\boldsymbol{L}^{-1}\boldsymbol{e}_j
> =\boldsymbol{A}^{-1}\boldsymbol{e}_j,
> \qquad x_i=(\boldsymbol{A}^{-1})_{ij}
> $$
> We know that $L_{kk}=1$, so forward substitution starts at $j$; and backward
> substitution stops at $i$:
> $$
> \begin{aligned}
> y_k&=0, &&k<j\\
> y_j&=1,\\
> y_k&=-\sum_{s=j}^{k-1}L_{ks}y_s,
> &&k=j+1,\ldots,m\\
> x_k&=\frac{y_k-\displaystyle\sum_{s=k+1}^{m}U_{ks}x_s}{U_{kk}},
> &&k=m,m-1,\ldots,i
> \end{aligned}
> $$
> Return $x_i$. Then the operation count is bounded by
> $$
> \begin{aligned}
> N_{\mathrm{flop}}
> &\le
> \underbrace{2\sum_{k=j+1}^{m}(k-j)}_{\text{forward}}
> +\underbrace{\sum_{k=i}^{m}\bigl(2(m-k)+1\bigr)}_{\text{backward}}\\
> &=(m-j)(m-j+1)+(m-i+1)^2\\
> &=\mathcal{O}\bigl((m+1-j)^2+(m+1-i)^2\bigr)
> \end{aligned}
> $$
>
> $\square$

## 3 SVD [25 pts]

Use the recommended literature from the class syllabus to catch up on the SVD applied to non-square matrices, as well as the eigendecomposition of square matrices.
The vector-two norm of a vector $\boldsymbol{x} \in \mathbb{R}^n$ is defined as
$$
\|\boldsymbol{x}\|_2 = \sqrt{\sum_{i=1}^{n} x_i^2}.
$$
The associated matrix-two norm of a matrix $\boldsymbol{A} \in \mathbb{R}^{m \times n}$ is defined as
$$
\|\boldsymbol{A}\|_2 = \sup \limits_{\boldsymbol{x} \in \mathbb{R}^n \setminus \{\boldsymbol{0}\}} \frac{\|\boldsymbol{A}\boldsymbol{x}\|_2}{\|\boldsymbol{x}\|_2}.
$$

We denote as $\sigma_{\mathrm{min}}$ and $\sigma_{\mathrm{max}}$ the smallest and largest singular value of a matrix and by $\lambda_{i}$ its $i$-th eigenvalue.
We consider general matrices $\boldsymbol{A} \in \mathbb{R}^{m \times n}$ and $\boldsymbol{B} \in \mathbb{R}^{n \times l}$.
Show that the following results hold,

### (a) [4 pts]

$$
\sigma_{\mathrm{max}}(\boldsymbol{A}) \|\boldsymbol{x}\|_2 \geq \|\boldsymbol{A} \boldsymbol{x}\|_2, \forall \boldsymbol{x} \in \mathbb{R}^n.
$$
  Conclude that $\sigma_{\mathrm{max}}(\boldsymbol{A}) = \|\boldsymbol{A}\|_2$.

> *Proof.* We write
> $$
> \boldsymbol{A}=\boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{V}^T,
> \qquad
> \sigma_1\ge\cdots\ge\sigma_r\ge0,
> \qquad r=\min(m,n),
> $$
> with $\boldsymbol{U},\boldsymbol{V}$ orthogonal. Let $\boldsymbol{v}_k$ be the $k$-th column
> of $\boldsymbol{V}$ and set $\boldsymbol{y}=\boldsymbol{V}^T\boldsymbol{x}$, so
> $\|\boldsymbol{y}\|_2=\|\boldsymbol{x}\|_2$.
> $$
> \begin{aligned}
> \|\boldsymbol{A}\boldsymbol{x}\|_2^2
> &=\|\boldsymbol{\Sigma}\boldsymbol{y}\|_2^2
> =\sum_{k=1}^{r}\sigma_k^2y_k^2\\
> &\le\sigma_1^2\sum_{k=1}^{n}y_k^2
> =\sigma_{\max}(\boldsymbol{A})^2\|\boldsymbol{x}\|_2^2
> \end{aligned}
> $$
> Taking square roots gives the inequality. Equality is attained at
> $\boldsymbol{x}=\boldsymbol{v}_1$, hence
> $$
> \sigma_{\max}(\boldsymbol{A})
> =\frac{\|\boldsymbol{A}\boldsymbol{v}_1\|_2}{\|\boldsymbol{v}_1\|_2}
> \le\|\boldsymbol{A}\|_2
> \le\sigma_{\max}(\boldsymbol{A})
> $$
>
> $\square$

### (b) [4 pts]

$$
m \geq n \Rightarrow \|\boldsymbol{A}\boldsymbol{x}\|_2 \geq \sigma_{\mathrm{min}}\left(\boldsymbol{A}\right) \|\boldsymbol{x}\|_2, \forall \boldsymbol{x} \in \mathbb{R}^n
$$

> *Proof.* For $m\ge n$, $r=n$, and
> $$
> \begin{aligned}
> \|\boldsymbol{A}\boldsymbol{x}\|_2^2
> &=\sum_{k=1}^{n}\sigma_k^2y_k^2
> \ge\sigma_n^2\sum_{k=1}^{n}y_k^2
> =\sigma_{\min}(\boldsymbol{A})^2\|\boldsymbol{x}\|_2^2\\
> \|\boldsymbol{A}\boldsymbol{x}\|_2
> &\ge\sigma_{\min}(\boldsymbol{A})\|\boldsymbol{x}\|_2
> \end{aligned}
> $$
> Equality is attained for $\boldsymbol{x}=\boldsymbol{v}_n$, since
> $$
> \|\boldsymbol{A}\boldsymbol{v}_n\|_2=\|\sigma_n\boldsymbol{u}_n\|_2=\sigma_n=\sigma_{\min}(\boldsymbol{A})
> $$
>
> $\square$

### (c) [4 pts]

$$
m = n \Rightarrow \sigma_{\mathrm{min}}\left(\boldsymbol{A}\right) \leq \left|\lambda_{i}\left(\boldsymbol{A}\right)\right| \leq \sigma_{\mathrm{max}}\left(\boldsymbol{A}\right), \forall i
$$

> *Proof.* The same bounds hold for complex vectors, using $|y_k|^2$ in the sums.
> For an eigenvector $\boldsymbol{z}\in\mathbb{C}^m\setminus\{\boldsymbol{0}\}$, we know that
> $$
> \begin{aligned}
> \sigma_{\min}(\boldsymbol{A})\|\boldsymbol{z}\|_2
> &\le\|\boldsymbol{A}\boldsymbol{z}\|_2
> =|\lambda_i(\boldsymbol{A})|\|\boldsymbol{z}\|_2
> \le\sigma_{\max}(\boldsymbol{A})\|\boldsymbol{z}\|_2\\
> \sigma_{\min}(\boldsymbol{A})
> &\le|\lambda_i(\boldsymbol{A})|
> \le\sigma_{\max}(\boldsymbol{A})
> \end{aligned}
> $$
>
> $\square$

### (d) [4 pts]

$$
\sigma_{\mathrm{max}}\left(\boldsymbol{A}\right) = 1 / \sigma_{\mathrm{min}}\left(\boldsymbol{A}^{-1}\right)\text{, if $\boldsymbol{A}^{-1}$ exists}
$$

> *Proof.* Let
> $$
> \boldsymbol{A}=\boldsymbol{U}\boldsymbol{\Sigma}\boldsymbol{V}^T,\qquad\sigma_1\ge\cdots\ge\sigma_m>0
> $$
> Since $\boldsymbol{A}$ is invertible,
> $$
> \boldsymbol{A}^{-1}=\boldsymbol{V}\boldsymbol{\Sigma}^{-1}\boldsymbol{U}^T.
> $$
> Thus the singular values of $\boldsymbol{A}^{-1}$ are
> $$
> \frac{1}{\sigma_1},\ldots,\frac{1}{\sigma_m}
> $$
> Therefore
> $$
> \begin{aligned}
> \sigma_{\min}(\boldsymbol{A}^{-1})
> &=\min_{1\le k\le m}\frac{1}{\sigma_k(\boldsymbol{A})}\\
> &=\frac{1}{\sigma_{\max}(\boldsymbol{A})}
> \end{aligned}
> $$
> as desired.
>
> $\square$

### (e) [4 pts]

  Find the most general conditions on $m$, $n$, and $l$, under which $\sigma_{\mathrm{min}}\left(\boldsymbol{A}\boldsymbol{B}\right) \geq \sigma_{\mathrm{min}}\left(\boldsymbol{A}\right) \sigma_{\mathrm{min}}\left(\boldsymbol{B}\right)$.

> *Proof.* We know that the necessary and sufficient dimensional condition for the inequality
> to hold for all $\boldsymbol{A},\boldsymbol{B}$ is
> $$
> \min(m,l)\le n\le\max(m,l)
> $$
> SO transposing replaces $\boldsymbol{A}\boldsymbol{B}$ by $\boldsymbol{B}^T\boldsymbol{A}^T$ without
> changing singular values, so it suffices to consider $m\ge l$.
> If $m\ge n\ge l$, part (b) would give
> $$
> \begin{aligned}
> \|\boldsymbol{A}\boldsymbol{B}\boldsymbol{x}\|_2
> &\ge\sigma_{\min}(\boldsymbol{A})\|\boldsymbol{B}\boldsymbol{x}\|_2\\
> &\ge\sigma_{\min}(\boldsymbol{A})\sigma_{\min}(\boldsymbol{B})\|\boldsymbol{x}\|_2,\\
> \sigma_{\min}(\boldsymbol{A}\boldsymbol{B})
> &=\inf_{\boldsymbol{x}\ne\boldsymbol{0}}
> \frac{\|\boldsymbol{A}\boldsymbol{B}\boldsymbol{x}\|_2}{\|\boldsymbol{x}\|_2}
> \ge\sigma_{\min}(\boldsymbol{A})\sigma_{\min}(\boldsymbol{B})
> \end{aligned}
> $$
> To show this to be true, we retain $m\ge l$. If $n<l$, choose
> $$
> \boldsymbol{A}=\begin{pmatrix}\mathbf{I}_n\\\boldsymbol{0}\end{pmatrix},
> \qquad
> \boldsymbol{B}=\begin{pmatrix}\mathbf{I}_n&\boldsymbol{0}\end{pmatrix}
> $$
> Then $\operatorname{rank}(\boldsymbol{A}\boldsymbol{B})=n<l$.
> If $n>m$, choose, with $\boldsymbol{e}_k\in\mathbb{R}^n$,
> $$
> \boldsymbol{A}=\begin{pmatrix}\mathbf{I}_m&\boldsymbol{0}\end{pmatrix},
> \qquad
> \boldsymbol{B}=\begin{pmatrix}
> \boldsymbol{e}_1&\cdots&\boldsymbol{e}_{l-1}&\boldsymbol{e}_{m+1}
> \end{pmatrix}
> $$
> Then $\operatorname{rank}(\boldsymbol{A}\boldsymbol{B})=l-1$.
> Both choices satisfy
> $$
> \sigma_{\min}(\boldsymbol{A})=\sigma_{\min}(\boldsymbol{B})=1,
> \qquad
> \sigma_{\min}(\boldsymbol{A}\boldsymbol{B})=0,
> $$
> so the inequality fails outside of the stated range as demonstrated
>
> $\square$

### (f) [5 pts]

In class, we have defined the condition number of a scalar function $f$ at a point $x$ as
$$
\kappa_f(x) = \lim_{\varepsilon \to 0} \sup_{0 < |\delta x| \leq \varepsilon} \frac{|f(x + \delta x)
- f(x)|}{|f(x)|} \big/ \frac{|\delta x|}{|x|}.
$$
Similarly, we can define the two-norm condition number of a vector-valued function $\boldsymbol{f}:\mathbb{R}^n \to \mathbb{R}^m$ at a point $\boldsymbol{x} \in \mathbb{R}^n$ as
$$
\kappa_{\boldsymbol{f}}(\boldsymbol{x}) = \lim_{\varepsilon \to 0} \sup_{0 < \|\delta \boldsymbol{x}\|_2 \leq \varepsilon} \frac{\|\boldsymbol{f}(\boldsymbol{x} + \delta \boldsymbol{x}) - \boldsymbol{f}(\boldsymbol{x})\|_2}{\|\boldsymbol{f}(\boldsymbol{x})\|_2}
  \big/ \frac{\|\delta \boldsymbol{x}\|_2}{\|\boldsymbol{x}\|_2}
.
$$
Show that the condition number of the function $\boldsymbol{f}(\boldsymbol{x}) = \boldsymbol{A}\boldsymbol{x}$ is given by
$$
\kappa_{\boldsymbol{f}}(\boldsymbol{x}) = \frac{\|\boldsymbol{A}\|_2 \|\boldsymbol{x}\|_2}{\|\boldsymbol{A}\boldsymbol{x}\|_2}.
$$
For $m \geq n$ and $\boldsymbol{A}$ having full column rank, conclude that the worst-case condition number of the function $\boldsymbol{f}(\boldsymbol{x}) = \boldsymbol{A}\boldsymbol{x}$ is given by
$$
\kappa_{\boldsymbol{f}} = \sup_{\boldsymbol{x} \in \mathbb{R}^n \setminus \{\boldsymbol{0}\}} \kappa_{\boldsymbol{f}}(\boldsymbol{x}) = \frac{\sigma_{\mathrm{max}}\left(\boldsymbol{A}\right)}{\sigma_{\mathrm{min}}\left(\boldsymbol{A}\right)}  \eqcolon \kappa(\boldsymbol{A}).
$$
For invertible square $\boldsymbol{A}$, find an expression of $\kappa(\boldsymbol{A})$ only in terms of operator norms.

> *Proof.* For $\boldsymbol{x}\ne\boldsymbol{0}$ with $\boldsymbol{A}\boldsymbol{x}\ne\boldsymbol{0}$, linearity
> and homogeneity give us
> $$
> \begin{aligned}
> \kappa_{\boldsymbol{f}}(\boldsymbol{x})
> &=\frac{\|\boldsymbol{x}\|_2}{\|\boldsymbol{A}\boldsymbol{x}\|_2}
> \lim_{\varepsilon\to0}
> \sup_{0<\|\delta\boldsymbol{x}\|_2\le\varepsilon}
> \frac{\|\boldsymbol{A}\delta\boldsymbol{x}\|_2}{\|\delta\boldsymbol{x}\|_2}\\
> &=\frac{\|\boldsymbol{A}\|_2\|\boldsymbol{x}\|_2}{\|\boldsymbol{A}\boldsymbol{x}\|_2}
> \end{aligned}
> $$
> If $m\ge n$ and $\boldsymbol{A}$ has full column rank, then
> $$
> \begin{aligned}
> \kappa_{\boldsymbol{f}}(\boldsymbol{x})
> &\le\frac{\sigma_{\max}(\boldsymbol{A})}{\sigma_{\min}(\boldsymbol{A})}\\
> \kappa_{\boldsymbol{f}}(\boldsymbol{v}_n)
> &=\frac{\sigma_{\max}(\boldsymbol{A})}{\sigma_{\min}(\boldsymbol{A})}\\
> \kappa_{\boldsymbol{f}}
> &=\sup_{\boldsymbol{x}\ne\boldsymbol{0}}\kappa_{\boldsymbol{f}}(\boldsymbol{x})
> =\frac{\sigma_{\max}(\boldsymbol{A})}{\sigma_{\min}(\boldsymbol{A})}
> =\kappa(\boldsymbol{A})
> \end{aligned}
> $$
> For invertible square $\boldsymbol{A}$,
> $$
> \kappa(\boldsymbol{A})
> =\sigma_{\max}(\boldsymbol{A})\sigma_{\max}(\boldsymbol{A}^{-1})
> =\|\boldsymbol{A}\|_2\|\boldsymbol{A}^{-1}\|_2
> $$
>
> $\square$

## 4 Inverses [25 pts]

We consider $\boldsymbol{A} \in \mathbb{R}^{m \times m}$ and assume that $\boldsymbol{A}^{-1}$ exists.
You may use without proof that if $\boldsymbol{A}$ is symmetric, its largest and smallest eigenvalues are characterized as
$$
\lambda_{\mathrm{max}}\left(\boldsymbol{A}\right) = \sup \limits_{\boldsymbol{x} \in \mathbb{R}^m \setminus \{\boldsymbol{0}\}} \frac{\boldsymbol{x}^T \boldsymbol{A}\boldsymbol{x}}{\|\boldsymbol{x}\|_2^2}
$$
and
$$
\lambda_{\mathrm{min}}\left(\boldsymbol{A}\right) = \inf \limits_{\boldsymbol{x} \in \mathbb{R}^m \setminus \{\boldsymbol{0}\}} \frac{\boldsymbol{x}^T \boldsymbol{A}\boldsymbol{x}}{\|\boldsymbol{x}\|_2^2}
$$

### (a) [5 pts]

Show that
$$
\left\|\boldsymbol{A}^{-1}\right\|_2^{-1} = \inf \limits_{\boldsymbol{x} \in \mathbb{R}^m \setminus \{\boldsymbol{0}\}} \frac{\|\boldsymbol{A}\boldsymbol{x}\|_2}{\|\boldsymbol{x}\|_2}
\tag{1}
$$

> *Proof.* Since $\boldsymbol{y}=\boldsymbol{A}\boldsymbol{x}$ bijects the nonzero vectors,
> $$
> \begin{aligned}
> \|\boldsymbol{A}^{-1}\|_2^{-1}
> &=\left(\sup_{\boldsymbol{y}\ne\boldsymbol{0}}
> \frac{\|\boldsymbol{A}^{-1}\boldsymbol{y}\|_2}{\|\boldsymbol{y}\|_2}\right)^{-1}\\
> &=\left(\sup_{\boldsymbol{x}\ne\boldsymbol{0}}
> \frac{\|\boldsymbol{x}\|_2}{\|\boldsymbol{A}\boldsymbol{x}\|_2}\right)^{-1}
> =\inf_{\boldsymbol{x}\ne\boldsymbol{0}}
> \frac{\|\boldsymbol{A}\boldsymbol{x}\|_2}{\|\boldsymbol{x}\|_2}
> \end{aligned}
> $$
>
> $\square$

### (b) [5 pts]

Show that
$$
\left\|\boldsymbol{A}^{-1}\right\|_2^{-1} \geq \inf \limits_{\boldsymbol{x} \in \mathbb{R}^m \setminus \{\boldsymbol{0}\}} \frac{|\boldsymbol{x}^T \boldsymbol{A}\boldsymbol{x}|}{\|\boldsymbol{x}\|_2^2}
\tag{2}
$$

> *Proof.* By Cauchy–Schwarz and part (a),
> $$
> \begin{aligned}
> \frac{|\boldsymbol{x}^T\boldsymbol{A}\boldsymbol{x}|}{\|\boldsymbol{x}\|_2^2}
> &\le\frac{\|\boldsymbol{x}\|_2\|\boldsymbol{A}\boldsymbol{x}\|_2}{\|\boldsymbol{x}\|_2^2}
> =\frac{\|\boldsymbol{A}\boldsymbol{x}\|_2}{\|\boldsymbol{x}\|_2}\\
> \inf_{\boldsymbol{x}\ne\boldsymbol{0}}
> \frac{|\boldsymbol{x}^T\boldsymbol{A}\boldsymbol{x}|}{\|\boldsymbol{x}\|_2^2}
> &\le\inf_{\boldsymbol{x}\ne\boldsymbol{0}}
> \frac{\|\boldsymbol{A}\boldsymbol{x}\|_2}{\|\boldsymbol{x}\|_2}
> =\|\boldsymbol{A}^{-1}\|_2^{-1}
> \end{aligned}
> $$
>
> $\square$

### (c) [5 pts]

Show that for symmetric matrices $\boldsymbol{M}, \boldsymbol{N} \in \mathbb{R}^{m \times m}$,
$$
\lambda_{\mathrm{min}}(\boldsymbol{M} + \boldsymbol{N}) \geq \lambda_{\mathrm{min}}\left(\boldsymbol{M}\right) + \lambda_{\mathrm{min}}\left(\boldsymbol{N}\right)
\tag{3}
$$

> *Proof.* By the given Rayleigh-quotient characterization,
> $$
> \begin{aligned}
> \lambda_{\min}(\boldsymbol{M}+\boldsymbol{N})
> &=\inf_{\boldsymbol{x}\ne\boldsymbol{0}}
> \left(\frac{\boldsymbol{x}^T\boldsymbol{M}\boldsymbol{x}}{\|\boldsymbol{x}\|_2^2}
> +\frac{\boldsymbol{x}^T\boldsymbol{N}\boldsymbol{x}}{\|\boldsymbol{x}\|_2^2}\right)\\
> &\ge\inf_{\boldsymbol{x}\ne\boldsymbol{0}}
> \frac{\boldsymbol{x}^T\boldsymbol{M}\boldsymbol{x}}{\|\boldsymbol{x}\|_2^2}
> +\inf_{\boldsymbol{x}\ne\boldsymbol{0}}
> \frac{\boldsymbol{x}^T\boldsymbol{N}\boldsymbol{x}}{\|\boldsymbol{x}\|_2^2}\\
> &=\lambda_{\min}(\boldsymbol{M})+\lambda_{\min}(\boldsymbol{N})
> \end{aligned}
> $$
>
> $\square$

### (d) [5 pts]

In the same setting as (c), show that
$$
\lambda_{\mathrm{max}}(\boldsymbol{M} + \boldsymbol{N}) \leq \lambda_{\mathrm{max}}\left(\boldsymbol{M}\right) + \lambda_{\mathrm{max}}\left(\boldsymbol{N}\right)
\tag{4}
$$

> *Proof.* Similarly,
> $$
> \begin{aligned}
> \lambda_{\max}(\boldsymbol{M}+\boldsymbol{N})
> &=\sup_{\boldsymbol{x}\ne\boldsymbol{0}}
> \left(\frac{\boldsymbol{x}^T\boldsymbol{M}\boldsymbol{x}}{\|\boldsymbol{x}\|_2^2}
> +\frac{\boldsymbol{x}^T\boldsymbol{N}\boldsymbol{x}}{\|\boldsymbol{x}\|_2^2}\right)\\
> &\le\sup_{\boldsymbol{x}\ne\boldsymbol{0}}
> \frac{\boldsymbol{x}^T\boldsymbol{M}\boldsymbol{x}}{\|\boldsymbol{x}\|_2^2}
> +\sup_{\boldsymbol{x}\ne\boldsymbol{0}}
> \frac{\boldsymbol{x}^T\boldsymbol{N}\boldsymbol{x}}{\|\boldsymbol{x}\|_2^2}\\
> &=\lambda_{\max}(\boldsymbol{M})+\lambda_{\max}(\boldsymbol{N})
> \end{aligned}
> $$
>
> $\square$

### (e) [5 pts]

For $\boldsymbol{A}$ symmetric positive definite, show that
$$
\|\boldsymbol{A}^{-1}\|_{2}^{-1} = \inf \limits_{\boldsymbol{x} \in \mathbb{R}^m \setminus \{\boldsymbol{0}\}} \frac{\boldsymbol{x}^T \boldsymbol{A} \boldsymbol{x}}{\|\boldsymbol{x}\|^2_2}
$$

> *Proof.* Let $\boldsymbol{A}\boldsymbol{q}=\lambda_{\min}(\boldsymbol{A})\boldsymbol{q}$,
> $\boldsymbol{q}\ne\boldsymbol{0}$. Since $\boldsymbol{A}$ is positive definite,
> $\lambda_{\min}(\boldsymbol{A})>0$. Parts (b) and (a), respectively, give
> $$
> \begin{aligned}
> \|\boldsymbol{A}^{-1}\|_2^{-1}
> &\ge\inf_{\boldsymbol{x}\ne\boldsymbol{0}}
> \frac{\boldsymbol{x}^T\boldsymbol{A}\boldsymbol{x}}{\|\boldsymbol{x}\|_2^2}
> =\lambda_{\min}(\boldsymbol{A}),\\
> \|\boldsymbol{A}^{-1}\|_2^{-1}
> &\le\frac{\|\boldsymbol{A}\boldsymbol{q}\|_2}{\|\boldsymbol{q}\|_2}
> =\lambda_{\min}(\boldsymbol{A}).
> \end{aligned}
> $$
> Therefore
> $$
> \|\boldsymbol{A}^{-1}\|_2^{-1}
> =\lambda_{\min}(\boldsymbol{A})
> =\inf_{\boldsymbol{x}\ne\boldsymbol{0}}
> \frac{\boldsymbol{x}^T\boldsymbol{A}\boldsymbol{x}}{\|\boldsymbol{x}\|_2^2}
> $$
>
> $\square$
