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
> Thus $\boldsymbol{A}_{1,1}$ is symmetric positive definite and invertible. This uses the quadratic-form definition in [Lecture 8, §8.6.2](../8.%20Least%20Squares%20and%20Normal%20Equations.md#positive-semidefinite-and-positive-definite-matrices) and the nullspace criterion in [Lecture 2, §2.5](../2.%20Storing%20Matrices%20%26%20Vectors.md#linear-systems):
> $$
> \begin{aligned}
> A_{11}u=0&\Longrightarrow u^TA_{11}u=0\\
> &\Longrightarrow u=0.
> \end{aligned}
> $$
> Let
> $\boldsymbol{S}=\boldsymbol{A}_{2,2}-\boldsymbol{A}_{2,1}\boldsymbol{A}_{1,1}^{-1}\boldsymbol{A}_{1,2}$.
> This is the Schur complement from [Lecture 9, §9.8](../9.%20Cholesky%20Factorization%20and%20Schur%20Complements.md#block-cholesky-and-schur-complements). Since $\boldsymbol{A}_{2,1}=\boldsymbol{A}_{1,2}^T$, then
> $$
> \begin{aligned}
> (A_{11}^{-1})^T&=(A_{11}^T)^{-1}=A_{11}^{-1},\\
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
> &=\begin{pmatrix}
> -A_{11}A_{11}^{-1}A_{12}y+A_{12}y\\
> -A_{21}A_{11}^{-1}A_{12}y+A_{22}y
> \end{pmatrix}\\
> &&&=\begin{pmatrix}\boldsymbol{0}\\\boldsymbol{S}\boldsymbol{y}\end{pmatrix}
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
> Use the unit-lower LU convention from [Lecture 3, §3.5](../3.%20LU%20Factorization%20and%20Zero%20Pivots.md#elementary-lower-triangular-matrices), with $A$ invertible. We know that $L_{kk}=1$, so forward substitution starts at $j$; and backward
> substitution stops at $i$: see [Lecture 2, §§2.6.1](../2.%20Storing%20Matrices%20%26%20Vectors.md#lower-triangular-systems) and [2.6.2](../2.%20Storing%20Matrices%20%26%20Vectors.md#upper-triangular-systems).
> $$
> \begin{aligned}
> \sum_{s=1}^{k-1}L_{ks}y_s+y_k&=(e_j)_k,\\
> y_k&=0, &&k<j\\
> y_j&=1,\\
> y_k&=-\sum_{s=1}^{k-1}L_{ks}y_s
> =-\sum_{s=j}^{k-1}L_{ks}y_s,
> &&k=j+1,\ldots,m\\
> U_{kk}x_k+\sum_{s=k+1}^mU_{ks}x_s&=y_k,\\
> x_k&=\frac{y_k-\displaystyle\sum_{s=k+1}^{m}U_{ks}x_s}{U_{kk}},
> &&k=m,m-1,\ldots,i
> \end{aligned}
> $$
> Return $x_i$. Then the operation count is bounded by (counting multiplication and addition separately, as in [Lecture 2, §2.3](../2.%20Storing%20Matrices%20%26%20Vectors.md#algorithms-and-computational-cost))
> $$
> \begin{aligned}
> N_{\mathrm{flop}}
> &\le
> \underbrace{2\sum_{k=j+1}^{m}(k-j)}_{\text{forward}}
> +\underbrace{\sum_{k=i}^{m}\bigl(2(m-k)+1\bigr)}_{\text{backward}}\\
> &=2\sum_{t=1}^{m-j}t+2\sum_{t=0}^{m-i}t+(m-i+1)\\
> &=(m-j)(m-j+1)+(m-i)(m-i+1)+(m-i+1)\\
> &=(m-j)(m-j+1)+(m-i+1)^2\\
> &=\mathcal{O}\bigl((m+1-j)^2+(m+1-i)^2\bigr)
> \end{aligned}
> $$
>
> For nonunit $L$, forward substitution also divides by $L_{kk}$; the asymptotic bound is unchanged.
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
> with $\boldsymbol{U},\boldsymbol{V}$ orthogonal. The SVD can be obtained from the Gram matrix ([Lecture 8, §8.7.1](../8.%20Least%20Squares%20and%20Normal%20Equations.md#a-gram-matrix-is-hermitian-positive-semidefinite)) and the spectral theorem ([Lecture 10, §10.2.1](../10.%20Eigenvalues%20and%20Iterative%20Methods.md#hermitian-matrices)):
> $$
> \begin{aligned}
> A^TA&=V\operatorname{diag}(\mu_1,\ldots,\mu_n)V^T,\qquad \mu_1\ge\cdots\ge\mu_n\ge0,\\
> \mu_k&=v_k^TA^TAv_k=\|Av_k\|_2^2\ge0,\\
> \sigma_k&=\sqrt{\mu_k},\qquad u_k=Av_k/\sigma_k\quad(\sigma_k>0),\\
> u_i^Tu_j&=\frac{v_i^TA^TAv_j}{\sigma_i\sigma_j}
> =\frac{\mu_jv_i^Tv_j}{\sigma_i\sigma_j}=\delta_{ij},\\
> \sigma_k=0&\Longrightarrow\|Av_k\|_2^2=\mu_k=0
> \Longrightarrow Av_k=0.
> \end{aligned}
> $$
> Complete the nonzero-image $u_k$ to an orthonormal basis ([Lecture 7, §7.5.3](../7.%20Orthogonal%20Transformations%20and%20QR.md#completing-to-full-qr)). Then $AV=U\Sigma$, so $A=U\Sigma V^T$; when $m<n$, omit the $n-m$ additional zero eigenvalues from the list of $r$ singular values. Let $\boldsymbol{v}_k$ be the $k$-th column
> of $\boldsymbol{V}$ and set $\boldsymbol{y}=\boldsymbol{V}^T\boldsymbol{x}$, so
> $\|\boldsymbol{y}\|_2=\|\boldsymbol{x}\|_2$.
> $$
> \begin{aligned}
> \|y\|_2^2&=x^TVV^Tx=x^Tx=\|x\|_2^2,\\
> \|\boldsymbol{A}\boldsymbol{x}\|_2^2
> &=(U\Sigma y)^T(U\Sigma y)\\
> &=y^T\Sigma^TU^TU\Sigma y
> =y^T\Sigma^T\Sigma y\\
> &=\|\boldsymbol{\Sigma}\boldsymbol{y}\|_2^2
> =\sum_{k=1}^{r}\sigma_k^2y_k^2\\
> &\le\sigma_1^2\sum_{k=1}^{r}y_k^2
> \le\sigma_1^2\sum_{k=1}^{n}y_k^2
> =\sigma_{\max}(\boldsymbol{A})^2\|\boldsymbol{x}\|_2^2
> \end{aligned}
> $$
> Taking square roots gives the inequality. At the unit vector $v_1$, $Av_1=\sigma_1u_1$ and $\|Av_1\|_2=\sigma_1$ (also when $\sigma_1=0$). Equality is attained at
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

> *Proof.* For $m\ge n$, $r=n$, and (using [3(a)](#a-4-pts) and the spectral theorem in [Lecture 10, §10.2.1](../10.%20Eigenvalues%20and%20Iterative%20Methods.md#hermitian-matrices))
> $$
> \begin{aligned}
> \|\boldsymbol{A}\boldsymbol{x}\|_2^2
> &=\sum_{k=1}^{n}\sigma_k^2y_k^2
> =\sum_{k=1}^n\bigl(\sigma_n^2+(\sigma_k^2-\sigma_n^2)\bigr)y_k^2\\
> &\ge\sigma_n^2\sum_{k=1}^{n}y_k^2
> =\sigma_{\min}(\boldsymbol{A})^2\|\boldsymbol{x}\|_2^2\\
> \|\boldsymbol{A}\boldsymbol{x}\|_2
> &\ge\sigma_{\min}(\boldsymbol{A})\|\boldsymbol{x}\|_2
> \end{aligned}
> $$
> Equality is attained for $\boldsymbol{x}=\boldsymbol{v}_n$, since
> $$
> \|\boldsymbol{A}\boldsymbol{v}_n\|_2=\|\sigma_n\boldsymbol{u}_n\|_2=\sigma_n\|u_n\|_2=\sigma_n=\sigma_{\min}(\boldsymbol{A})
> $$
>
> Consequently $\inf_{x\ne0}\|Ax\|_2/\|x\|_2=\sigma_{\min}(A)$, with equality at $v_n$. Full column rank is not required; if rank is deficient, both sides of this minimum are zero.
>
> $\square$

### (c) [4 pts]

$$
m = n \Rightarrow \sigma_{\mathrm{min}}\left(\boldsymbol{A}\right) \leq \left|\lambda_{i}\left(\boldsymbol{A}\right)\right| \leq \sigma_{\mathrm{max}}\left(\boldsymbol{A}\right), \forall i
$$

> *Proof.* The same bounds hold for complex vectors, using $|y_k|^2$ in the sums. Use the eigenpair definition and spectral theorem from [Lecture 10, §§10.2–10.2.1](../10.%20Eigenvalues%20and%20Iterative%20Methods.md#hermitian-matrices).
> For an eigenvector $\boldsymbol{z}\in\mathbb{C}^m\setminus\{\boldsymbol{0}\}$, we know that
> $$
> \begin{aligned}
> y=V^*z&\Longrightarrow\sum_k|y_k|^2=z^*VV^*z=\|z\|_2^2,\\
> \|Az\|_2^2&=\sum_k\sigma_k^2|y_k|^2,\\
> \sigma_{\min}(A)^2\|z\|_2^2&\le\|Az\|_2^2\le\sigma_{\max}(A)^2\|z\|_2^2,\\
> \sigma_{\min}(\boldsymbol{A})\|\boldsymbol{z}\|_2
> &\le\|\boldsymbol{A}\boldsymbol{z}\|_2
> =\|\lambda_i(A)z\|_2=|\lambda_i(\boldsymbol{A})|\|\boldsymbol{z}\|_2
> \le\sigma_{\max}(\boldsymbol{A})\|\boldsymbol{z}\|_2\\
> \sigma_{\min}(\boldsymbol{A})
> &\le|\lambda_i(\boldsymbol{A})|
> \le\sigma_{\max}(\boldsymbol{A})
> \end{aligned}
> $$
>
> The last line divides by $\|z\|_2>0$; it does not assume that $A$ is diagonalizable.
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
> Since $\boldsymbol{A}$ is invertible, $A^TA$ is positive definite ([Lecture 8, §8.7.3](../8.%20Least%20Squares%20and%20Normal%20Equations.md#positive-definiteness-and-full-column-rank)), so every $\sigma_k>0$. Using [3(a)](#a-4-pts),
> $$
> \begin{aligned}
> A^{-1}&=(U\Sigma V^T)^{-1}
> =(V^T)^{-1}\Sigma^{-1}U^{-1}\\
> &=\boldsymbol{V}\boldsymbol{\Sigma}^{-1}\boldsymbol{U}^T,\\
> (A^{-1})^TA^{-1}
> &=U\Sigma^{-1}V^TV\Sigma^{-1}U^T\\
> &=U\operatorname{diag}(\sigma_1^{-2},\ldots,\sigma_m^{-2})U^T.
> \end{aligned}
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
> &=\frac1{\sigma_1(A)}
> \quad\text{since }\sigma_1\ge\cdots\ge\sigma_m>0\\
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
> The singular-value identities follow from [3(a)](#a-4-pts); the lower norm bound is [3(b)](#b-4-pts), both based on [Lecture 10, §10.2.1](../10.%20Eigenvalues%20and%20Iterative%20Methods.md#hermitian-matrices). In particular,
> $$
> A^T=(U\Sigma V^T)^T=V\Sigma^TU^T.
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
> \boldsymbol{A}=\begin{pmatrix}\mathbf{I}_n\\0_{(m-n)\times n}\end{pmatrix},
> \qquad
> \boldsymbol{B}=\begin{pmatrix}\mathbf{I}_n&0_{n\times(l-n)}\end{pmatrix}
> $$
> Then $\operatorname{rank}(\boldsymbol{A}\boldsymbol{B})=n<l$.
> $$
> \begin{aligned}
> A^TA&=I_n,\qquad BB^T=I_n,\\
> AB&=\begin{pmatrix}I_n&0\\0&0\end{pmatrix}_{m\times l},\\
> (AB)^TAB&=\operatorname{diag}(\underbrace{1,\ldots,1}_{n},\underbrace{0,\ldots,0}_{l-n}).
> \end{aligned}
> $$
> If $n>m$, choose, with $\boldsymbol{e}_k\in\mathbb{R}^n$,
> $$
> \boldsymbol{A}=\begin{pmatrix}\mathbf{I}_m&\boldsymbol{0}\end{pmatrix},
> \qquad
> \boldsymbol{B}=\begin{pmatrix}
> \boldsymbol{e}_1&\cdots&\boldsymbol{e}_{l-1}&\boldsymbol{e}_{m+1}
> \end{pmatrix}
> $$
> Then $\operatorname{rank}(\boldsymbol{A}\boldsymbol{B})=l-1$.
> $$
> \begin{aligned}
> AA^T&=I_m,\qquad B^TB=I_l,\\
> AB&=\begin{pmatrix}e_1^{(m)}&\cdots&e_{l-1}^{(m)}&0\end{pmatrix},\\
> (AB)^TAB&=\operatorname{diag}(\underbrace{1,\ldots,1}_{l-1},0).
> \end{aligned}
> $$
> Here $e_k^{(m)}$ is an $m$-dimensional coordinate vector; for $l=1$, the first $l-1$ columns are absent.
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
> and homogeneity give us (using the relative-perturbation definition in [Lecture 1, §1.5](../1.%20Vectors%20and%20Matrices.md#conditioning))
> $$
> \begin{aligned}
> \kappa_{\boldsymbol{f}}(\boldsymbol{x})
> &=\frac{\|\boldsymbol{x}\|_2}{\|\boldsymbol{A}\boldsymbol{x}\|_2}
> \lim_{\varepsilon\to0}
> \sup_{0<\|\delta\boldsymbol{x}\|_2\le\varepsilon}
> \frac{\|\boldsymbol{A}\delta\boldsymbol{x}\|_2}{\|\delta\boldsymbol{x}\|_2}\\
> &=\frac{\|x\|_2}{\|Ax\|_2}\lim_{\varepsilon\to0}\|A\|_2\\
> &=\frac{\|\boldsymbol{A}\|_2\|\boldsymbol{x}\|_2}{\|\boldsymbol{A}\boldsymbol{x}\|_2}
> \end{aligned}
> $$
> Indeed, $f(x+\delta x)-f(x)=A\delta x$. For every $\varepsilon>0$, scale any nonzero direction $v$ to $\delta x=\varepsilon v/(2\|v\|_2)$:
> $$
> \begin{aligned}
> 0<\|\delta x\|_2&=\varepsilon/2\le\varepsilon,\\
> \frac{\|A\delta x\|_2}{\|\delta x\|_2}&=\frac{\|Av\|_2}{\|v\|_2},\\
> \sup_{0<\|\delta x\|_2\le\varepsilon}\frac{\|A\delta x\|_2}{\|\delta x\|_2}
> &=\sup_{v\ne0}\frac{\|Av\|_2}{\|v\|_2}=\|A\|_2.
> \end{aligned}
> $$
> If $m\ge n$ and $\boldsymbol{A}$ has full column rank, then
> $$
> \begin{aligned}
> \kappa_{\boldsymbol{f}}(\boldsymbol{x})
> &=\frac{\sigma_{\max}(A)\|x\|_2}{\|Ax\|_2}
> \le\frac{\sigma_{\max}(A)\|x\|_2}{\sigma_{\min}(A)\|x\|_2}\\
> &\le\frac{\sigma_{\max}(\boldsymbol{A})}{\sigma_{\min}(\boldsymbol{A})}\\
> \kappa_{\boldsymbol{f}}(\boldsymbol{v}_n)
> &=\frac{\sigma_{\max}(A)\|v_n\|_2}{\|Av_n\|_2}
> =\frac{\sigma_{\max}(A)}{\sigma_n}\quad\text{by 3(b)}\\
> &=\frac{\sigma_{\max}(\boldsymbol{A})}{\sigma_{\min}(\boldsymbol{A})}\\
> \kappa_{\boldsymbol{f}}
> &=\sup_{\boldsymbol{x}\ne\boldsymbol{0}}\kappa_{\boldsymbol{f}}(\boldsymbol{x})
> =\frac{\sigma_{\max}(\boldsymbol{A})}{\sigma_{\min}(\boldsymbol{A})}
> =\kappa(\boldsymbol{A})
> \end{aligned}
> $$
> Use [3(a)](#a-4-pts) and [3(b)](#b-4-pts) for these norm bounds. For invertible square $\boldsymbol{A}$,
> $$
> \kappa(\boldsymbol{A})
> =\frac{\sigma_{\max}(A)}{\sigma_{\min}(A)}
> =\sigma_{\max}(\boldsymbol{A})\sigma_{\max}(\boldsymbol{A}^{-1})
> =\|\boldsymbol{A}\|_2\|\boldsymbol{A}^{-1}\|_2
> $$
>
> The last equality uses [3(d)](#d-4-pts) and agrees with the definition in [Lecture 6, §6.3.1](../6.%20Error%20Bounds%20and%20Householder%20QR.md#turning-a-local-error-into-a-backward-error).
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

> *Proof.* Since $\boldsymbol{y}=\boldsymbol{A}\boldsymbol{x}$ bijects the nonzero vectors, by invertibility ([Lecture 2, §2.5](../2.%20Storing%20Matrices%20%26%20Vectors.md#linear-systems)),
> $$
> \begin{aligned}
> \|\boldsymbol{A}^{-1}\|_2^{-1}
> &=\left(\sup_{\boldsymbol{y}\ne\boldsymbol{0}}
> \frac{\|\boldsymbol{A}^{-1}\boldsymbol{y}\|_2}{\|\boldsymbol{y}\|_2}\right)^{-1}\\
> &=\left(\sup_{x\ne0}\frac{\|A^{-1}Ax\|_2}{\|Ax\|_2}\right)^{-1}\\
> &=\left(\sup_{\boldsymbol{x}\ne\boldsymbol{0}}
> \frac{\|\boldsymbol{x}\|_2}{\|\boldsymbol{A}\boldsymbol{x}\|_2}\right)^{-1}
> =\inf_{\boldsymbol{x}\ne\boldsymbol{0}}
> \frac{\|\boldsymbol{A}\boldsymbol{x}\|_2}{\|\boldsymbol{x}\|_2}
> \end{aligned}
> $$
>
> For the reciprocal step, [3(b)](#b-4-pts) gives $a=\inf_{x\ne0}\|Ax\|_2/\|x\|_2=\sigma_{\min}(A)>0$. Writing this ratio as $r(x)$, for every $\eta>0$ some $x$ has $a\le r(x)<a+\eta$, so
> $$
> \frac1{a+\eta}<\sup_{x\ne0}\frac1{r(x)}\le\frac1a
> \quad\xrightarrow{\eta\downarrow0}\quad
> \sup_{x\ne0}\frac1{r(x)}=\frac1a.
> $$
>
> $\square$

### (b) [5 pts]

Show that
$$
\left\|\boldsymbol{A}^{-1}\right\|_2^{-1} \geq \inf \limits_{\boldsymbol{x} \in \mathbb{R}^m \setminus \{\boldsymbol{0}\}} \frac{|\boldsymbol{x}^T \boldsymbol{A}\boldsymbol{x}|}{\|\boldsymbol{x}\|_2^2}
\tag{2}
$$

> *Proof.* By Cauchy–Schwarz and part (a), using [Lecture 9, §9.6](../9.%20Cholesky%20Factorization%20and%20Schur%20Complements.md#roundoff-and-element-growth) and [4(a)](#a-5-pts),
> $$
> \begin{aligned}
> t&=\frac{x^TAx}{\|x\|_2^2},\\
> 0\le\|Ax-tx\|_2^2
> &=\|Ax\|_2^2-2t\,x^TAx+t^2\|x\|_2^2\\
> &=\|Ax\|_2^2-\frac{(x^TAx)^2}{\|x\|_2^2},\\
> |x^TAx|&\le\|x\|_2\|Ax\|_2,\\
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
> The pointwise inequality holds for every $x\ne0$, so taking the infimum on both sides preserves it.
>
> $\square$

### (c) [5 pts]

Show that for symmetric matrices $\boldsymbol{M}, \boldsymbol{N} \in \mathbb{R}^{m \times m}$,
$$
\lambda_{\mathrm{min}}(\boldsymbol{M} + \boldsymbol{N}) \geq \lambda_{\mathrm{min}}\left(\boldsymbol{M}\right) + \lambda_{\mathrm{min}}\left(\boldsymbol{N}\right)
\tag{3}
$$

> *Proof.* By the given Rayleigh-quotient characterization, which follows from the spectral theorem in [Lecture 10, §10.2.1](../10.%20Eigenvalues%20and%20Iterative%20Methods.md#hermitian-matrices): for symmetric $H=Q\Lambda Q^T$, put $z=Q^Tx$ and write
> $$
> \begin{aligned}
> \frac{x^THx}{x^Tx}
> &=\frac{z^T\Lambda z}{z^Tz}
> =\sum_k\lambda_k\frac{z_k^2}{\sum_jz_j^2},\\
> \sum_k\frac{z_k^2}{\sum_jz_j^2}&=1,\qquad \frac{z_k^2}{\sum_jz_j^2}\ge0,\\
> \frac{x^THx}{x^Tx}&\ge\lambda_{\min}(H).
> \end{aligned}
> $$
> A minimum-eigenvalue eigenvector attains equality. Applying this to $M$, $N$, and $M+N$,
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
> Indeed, each Rayleigh quotient is at least its own minimum; summing these pointwise lower bounds and then minimizing gives the displayed inequality. The minimizing vectors for $M$ and $N$ need not coincide.
>
> $\square$

### (d) [5 pts]

In the same setting as (c), show that
$$
\lambda_{\mathrm{max}}(\boldsymbol{M} + \boldsymbol{N}) \leq \lambda_{\mathrm{max}}\left(\boldsymbol{M}\right) + \lambda_{\mathrm{max}}\left(\boldsymbol{N}\right)
\tag{4}
$$

> *Proof.* Similarly, use the weights from [4(c)](#c-5-pts), based on [Lecture 10, §10.2.1](../10.%20Eigenvalues%20and%20Iterative%20Methods.md#hermitian-matrices):
> $$
> \begin{aligned}
> \frac{x^THx}{x^Tx}
> &=\sum_k\lambda_kw_k\le\lambda_{\max}(H)\sum_kw_k=\lambda_{\max}(H),\\
> w_k&=\frac{z_k^2}{\sum_jz_j^2}\ge0,\qquad\sum_kw_k=1.
> \end{aligned}
> $$
> A maximum-eigenvalue eigenvector attains equality. Hence
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
> Each quotient is bounded above by its own maximum; taking the supremum after adding preserves that upper bound.
>
> $\square$

### (e) [5 pts]

For $\boldsymbol{A}$ symmetric positive definite, show that
$$
\|\boldsymbol{A}^{-1}\|_{2}^{-1} = \inf \limits_{\boldsymbol{x} \in \mathbb{R}^m \setminus \{\boldsymbol{0}\}} \frac{\boldsymbol{x}^T \boldsymbol{A} \boldsymbol{x}}{\|\boldsymbol{x}\|^2_2}
$$

> *Proof.* Let $\boldsymbol{A}\boldsymbol{q}=\lambda_{\min}(\boldsymbol{A})\boldsymbol{q}$,
> $\boldsymbol{q}\ne\boldsymbol{0}$. Since $\boldsymbol{A}$ is positive definite,
> $\lambda_{\min}(\boldsymbol{A})>0$. This follows from the positivity definition ([Lecture 8, §8.6.2](../8.%20Least%20Squares%20and%20Normal%20Equations.md#positive-semidefinite-and-positive-definite-matrices)):
> $$
> 0<q^TAq=\lambda_{\min}(A)\|q\|_2^2
> \quad\Longrightarrow\quad\lambda_{\min}(A)>0.
> $$
> The Rayleigh characterization follows from [4(c)](#c-5-pts) and the spectral theorem ([Lecture 10, §10.2.1](../10.%20Eigenvalues%20and%20Iterative%20Methods.md#hermitian-matrices)). Parts (b) and (a), respectively, give
> $$
> \begin{aligned}
> \|\boldsymbol{A}^{-1}\|_2^{-1}
> &\ge\inf_{\boldsymbol{x}\ne\boldsymbol{0}}
> \frac{\boldsymbol{x}^T\boldsymbol{A}\boldsymbol{x}}{\|\boldsymbol{x}\|_2^2}
> =\lambda_{\min}(\boldsymbol{A}),\\
> \|\boldsymbol{A}^{-1}\|_2^{-1}
> &\le\frac{\|\boldsymbol{A}\boldsymbol{q}\|_2}{\|\boldsymbol{q}\|_2}
> =\frac{\|\lambda_{\min}(A)q\|_2}{\|q\|_2}\\
> &=\frac{|\lambda_{\min}(A)|\|q\|_2}{\|q\|_2}
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
