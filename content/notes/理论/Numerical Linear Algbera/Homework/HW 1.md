# Numerical Methods I, Homework 1

Schäfer, Fall 2026

Deadline: Sep. 21 Monday, 4:55 pm

The submitted solutions are preserved below. Each is followed by a separate block of added derivation details and lecture references.

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

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> Use the positive-definite quadratic-form definition in [Lecture 8, §8.6.2](../8.%20Least%20Squares%20and%20Normal%20Equations.md#positive-semidefinite-and-positive-definite-matrices). The block $S$ is the Schur complement defined in [Lecture 9, §9.8](../9.%20Cholesky%20Factorization%20and%20Schur%20Complements.md#block-cholesky-and-schur-complements).
>
> First, $A_{11}$ is symmetric. For $u\ne0$, $(u,0)^T\ne0$ and
> $$
> \begin{aligned}
> u^TA_{11}u
> &=\begin{pmatrix}u\\0\end{pmatrix}^TA\begin{pmatrix}u\\0\end{pmatrix}>0,\\
> A_{11}u=0&\Longrightarrow u^TA_{11}u=0\Longrightarrow u=0.
> \end{aligned}
> $$
> Thus $A_{11}$ is invertible by the nullspace criterion in [Lecture 2, §2.5](../2.%20Storing%20Matrices%20%26%20Vectors.md#linear-systems). Transposing $A_{11}A_{11}^{-1}=I$ gives $(A_{11}^{-1})^T=(A_{11}^T)^{-1}=A_{11}^{-1}$. Hence
> $$
> \begin{aligned}
> S^T
> &=A_{22}^T-A_{12}^T(A_{11}^{-1})^TA_{21}^T\\
> &=A_{22}-A_{21}A_{11}^{-1}A_{12}=S.
> \end{aligned}
> $$
> For $y\ne0$, set $w=-A_{11}^{-1}A_{12}y$ and $z=(w,y)^T\ne0$. Block multiplication gives
> $$
> \begin{aligned}
> Az&=\begin{pmatrix}A_{11}w+A_{12}y\\A_{21}w+A_{22}y\end{pmatrix}
> =\begin{pmatrix}-A_{12}y+A_{12}y\\-A_{21}A_{11}^{-1}A_{12}y+A_{22}y\end{pmatrix}
> =\begin{pmatrix}0\\Sy\end{pmatrix},\\
> 0<z^TAz&=\begin{pmatrix}w^T&y^T\end{pmatrix}\begin{pmatrix}0\\Sy\end{pmatrix}=y^TSy.
> \end{aligned}
> $$
> This proves both required properties.

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

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> Use [forward substitution, Lecture 2 §2.6.1](../2.%20Storing%20Matrices%20%26%20Vectors.md#lower-triangular-systems), [back substitution, §2.6.2](../2.%20Storing%20Matrices%20%26%20Vectors.md#upper-triangular-systems) and the unit-lower elimination factors in [Lecture 3, §3.5](../3.%20LU%20Factorization%20and%20Zero%20Pivots.md#elementary-lower-triangular-matrices). We need $A$ invertible; the submitted formulas use $L_{kk}=1$.
>
> The $j$th column of $A^{-1}$ solves $Ax=e_j$. Since $A=LU$,
> $$
> \begin{aligned}
> Ax=e_j&\Longleftrightarrow LUx=e_j,\\
> y=L^{-1}e_j,\quad x=U^{-1}y
> &\Longrightarrow x=A^{-1}e_j,\qquad x_i=(A^{-1})_{ij}.
> \end{aligned}
> $$
> For $k<j$, the lower-triangular equations successively give $y_k=0$. Row $j$ gives $y_j=1$. Later rows give
> $$
> \begin{aligned}
> \sum_{s=1}^{k-1}L_{ks}y_s+y_k&=0,\\
> y_k&=-\sum_{s=j}^{k-1}L_{ks}y_s\qquad(k>j),\\
> \sum_{s=k+1}^mU_{ks}x_s+U_{kk}x_k&=y_k,\\
> x_k&=\frac{y_k-\sum_{s=k+1}^mU_{ks}x_s}{U_{kk}}\qquad(k=m,\ldots,i).
> \end{aligned}
> $$
> Rows below $i$ determine $x_i$; rows above $i$ need not be solved. Counting multiply/add operations separately, as in [Lecture 2, §2.3](../2.%20Storing%20Matrices%20%26%20Vectors.md#algorithms-and-computational-cost),
> $$
> \begin{aligned}
> N_{\mathrm{forward}}&\le2\sum_{t=1}^{m-j}t=(m-j)(m-j+1),\\
> N_{\mathrm{backward}}&\le\sum_{t=0}^{m-i}(2t+1)=(m-i+1)^2,\\
> N_{\mathrm{total}}&\le(m-j)(m-j+1)+(m-i+1)^2\\
> &=O\bigl((m+1-j)^2+(m+1-i)^2\bigr).
> \end{aligned}
> $$
> For a nonunit $L$, divide each forward-substitution row by $L_{kk}$; the same asymptotic bound holds.

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

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> The rectangular SVD is assigned background in this problem, rather than a theorem proved in the available lecture notes. Its needed norm identity follows from the Gram matrix in [Lecture 8, §8.7.1](../8.%20Least%20Squares%20and%20Normal%20Equations.md#a-gram-matrix-is-hermitian-positive-semidefinite) and the Hermitian spectral theorem in [Lecture 10, §10.2.1](../10.%20Eigenvalues%20and%20Iterative%20Methods.md#hermitian-matrices).
>
> Write $A^TA=V\operatorname{diag}(\mu_1,\ldots,\mu_n)V^T$, with $\mu_1\ge\cdots\ge\mu_n\ge0$. Put $y=V^Tx$. Orthogonality gives
> $$
> \begin{aligned}
> \|y\|_2^2&=x^TVV^Tx=x^Tx=\|x\|_2^2,\\
> \|Ax\|_2^2&=x^TA^TAx\\
> &=y^T\operatorname{diag}(\mu_1,\ldots,\mu_n)y\\
> &=\sum_{k=1}^n\mu_ky_k^2
> \le\mu_1\sum_{k=1}^ny_k^2
> =\mu_1\|x\|_2^2.
> \end{aligned}
> $$
> To recover the SVD, set $\sigma_k=\sqrt{\mu_k}$ and $u_k=Av_k/\sigma_k$ whenever $\sigma_k>0$. Then
> $$
> \begin{aligned}
> u_i^Tu_j&=\frac{v_i^TA^TAv_j}{\sigma_i\sigma_j}
> =\frac{\mu_jv_i^Tv_j}{\sigma_i\sigma_j}
> =\delta_{ij},\\
> \sigma_k=0&\Longrightarrow\|Av_k\|_2^2=\mu_k=0
> \Longrightarrow Av_k=0.
> \end{aligned}
> $$
> Complete the nonzero-image $u_k$ to an orthonormal basis, as in [Lecture 7, §7.5.3](../7.%20Orthogonal%20Transformations%20and%20QR.md#completing-to-full-qr). With these columns forming $U$ and the rectangular diagonal matrix $\Sigma$,
> $$
> \begin{aligned}
> Av_k&=\sigma_ku_k\quad(\sigma_k>0),\qquad Av_k=0\quad(\sigma_k=0),\\
> AV&=U\Sigma,\\
> A&=U\Sigma V^T.
> \end{aligned}
> $$
> Thus the singular values are the square roots of the Gram eigenvalues, with the additional structural zeros omitted when $m<n$; $\sigma_{\max}(A)=\sqrt{\mu_1}$. Taking nonnegative square roots in the norm bound and dividing by $\|x\|_2$ for $x\ne0$ gives $\|A\|_2\le\sigma_{\max}(A)$. For the unit eigenvector $v_1$,
> $$
> \begin{aligned}
> \|Av_1\|_2^2&=v_1^TA^TAv_1=\mu_1v_1^Tv_1=\mu_1,\\
> \|A\|_2&\ge\frac{\|Av_1\|_2}{\|v_1\|_2}=\sqrt{\mu_1}=\sigma_{\max}(A).
> \end{aligned}
> $$
> Both inequalities also hold when $A=0$.

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

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> Use the Gram-matrix spectral expansion derived in [3(a)](#a-4-pts), based on [Lecture 10, §10.2.1](../10.%20Eigenvalues%20and%20Iterative%20Methods.md#hermitian-matrices). When $m\ge n$, all $n$ singular values occur in $A^TA$, so $\mu_n=\sigma_{\min}(A)^2$.
> $$
> \begin{aligned}
> \|Ax\|_2^2-\sigma_{\min}(A)^2\|x\|_2^2
> &=\sum_{k=1}^n\bigl(\mu_k-\mu_n\bigr)y_k^2\ge0,\\
> \|Ax\|_2&\ge\sigma_{\min}(A)\|x\|_2.
> \end{aligned}
> $$
> For $x=v_n$, $y=e_n$, so every term in the difference vanishes:
> $$
> \begin{aligned}
> \|Av_n\|_2^2&=v_n^TA^TAv_n=\mu_n,\\
> \|Av_n\|_2&=\sqrt{\mu_n}=\sigma_{\min}(A),\\
> \inf_{x\ne0}\frac{\|Ax\|_2}{\|x\|_2}&=\sigma_{\min}(A).
> \end{aligned}
> $$
> Full column rank is unnecessary for the inequality; rank deficiency makes the lower bound zero. The condition $m\ge n$ matters: a wide full-row-rank matrix has a nonzero null vector even when its listed smallest singular value is positive.

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

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> Eigenvalues and complex eigenvectors are defined in [Lecture 10, §10.2](../10.%20Eigenvalues%20and%20Iterative%20Methods.md#eigenvalues-and-eigenvectors). No diagonalizability of $A$ is needed. The Gram-matrix spectral theorem from [§10.2.1](../10.%20Eigenvalues%20and%20Iterative%20Methods.md#hermitian-matrices) extends the previous bounds to complex vectors:
> $$
> \begin{aligned}
> y=V^*z&\Longrightarrow\|y\|_2^2=\sum_k|y_k|^2=\|z\|_2^2,\\
> \|Az\|_2^2&=\sum_k\sigma_k^2|y_k|^2,\\
> \sigma_{\min}(A)^2\|z\|_2^2
> &\le\|Az\|_2^2\le\sigma_{\max}(A)^2\|z\|_2^2.
> \end{aligned}
> $$
> For any eigenpair $Az=\lambda_i z$ with $z\ne0$,
> $$
> \begin{aligned}
> \|Az\|_2^2&=\sum_k|\lambda_i z_k|^2
> =|\lambda_i|^2\|z\|_2^2,\\
> \sigma_{\min}(A)^2&\le|\lambda_i|^2\le\sigma_{\max}(A)^2,\\
> \sigma_{\min}(A)&\le|\lambda_i|\le\sigma_{\max}(A).
> \end{aligned}
> $$
> Division is valid because $\|z\|_2^2>0$.

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

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> Use the assigned SVD notation from [3(a)](#a-4-pts). Invertibility makes $A^TA$ positive definite: $x\ne0$ implies $Ax\ne0$, so $x^TA^TAx=\|Ax\|_2^2>0$ ([Lecture 8, §8.7.3](../8.%20Least%20Squares%20and%20Normal%20Equations.md#positive-definiteness-and-full-column-rank)). Thus each $\sigma_k>0$.
> $$
> \begin{aligned}
> A&=U\Sigma V^T,\qquad U^{-1}=U^T,\quad V^{-1}=V^T,\\
> A^{-1}&=(U\Sigma V^T)^{-1}
> =(V^T)^{-1}\Sigma^{-1}U^{-1}
> =V\Sigma^{-1}U^T,\\
> (A^{-1})^TA^{-1}
> &=U\Sigma^{-1}V^TV\Sigma^{-1}U^T
> =U\operatorname{diag}(\sigma_1^{-2},\ldots,\sigma_m^{-2})U^T.
> \end{aligned}
> $$
> Hence the singular values of $A^{-1}$ are $1/\sigma_k$, in reversed size order:
> $$
> \begin{aligned}
> \sigma_1\ge\cdots\ge\sigma_m>0
> &\Longrightarrow \frac1{\sigma_1}\le\cdots\le\frac1{\sigma_m},\\
> \sigma_{\min}(A^{-1})&=\frac1{\sigma_1}=\frac1{\sigma_{\max}(A)},\\
> \sigma_{\max}(A)&=\frac1{\sigma_{\min}(A^{-1})}.
> \end{aligned}
> $$

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

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> The norm bounds are derived in [3(b)](#b-4-pts) from the Hermitian spectral theorem ([Lecture 10, §10.2.1](../10.%20Eigenvalues%20and%20Iterative%20Methods.md#hermitian-matrices)). The dimensional criterion itself is proved here, rather than attributed to a lecture.
>
> Transposing the assigned SVD gives $A^T=V\Sigma^TU^T$, so transposition preserves its listed singular values. Since $(AB)^T=B^TA^T$, it suffices to treat $m\ge l$. If $m\ge n\ge l$, both $A$ and $B$ are tall, and for every $x\ne0$,
> $$
> \begin{aligned}
> \|ABx\|_2
> &\ge\sigma_{\min}(A)\|Bx\|_2\\
> &\ge\sigma_{\min}(A)\sigma_{\min}(B)\|x\|_2,\\
> \sigma_{\min}(AB)
> &=\inf_{x\ne0}\frac{\|ABx\|_2}{\|x\|_2}
> \ge\sigma_{\min}(A)\sigma_{\min}(B).
> \end{aligned}
> $$
> For the opposite ordering $m\le l$, transposition gives the same argument with $l\ge n\ge m$.
>
> For necessity, keep $m\ge l$. If $n<l$, choose
> $$
> \begin{aligned}
> A&=\begin{pmatrix}I_n\\0_{(m-n)\times n}\end{pmatrix},
> &B&=\begin{pmatrix}I_n&0_{n\times(l-n)}\end{pmatrix},\\
> A^TA&=I_n,&BB^T&=I_n,\\
> AB&=\begin{pmatrix}I_n&0\\0&0\end{pmatrix}_{m\times l}.
> \end{aligned}
> $$
> Thus $\sigma_{\min}(A)=\sigma_{\min}(B)=1$, but $AB$ has $l-n$ zero singular values. If $n>m$, choose
> $$
> \begin{aligned}
> A&=\begin{pmatrix}I_m&0\end{pmatrix},
> &B&=\begin{pmatrix}e_1&\cdots&e_{l-1}&e_{m+1}\end{pmatrix},\\
> AA^T&=I_m,&B^TB&=I_l,\\
> AB&=\begin{pmatrix}e_1^{(m)}&\cdots&e_{l-1}^{(m)}&0\end{pmatrix}.
> \end{aligned}
> $$
> Here $e_k\in\mathbb R^n$; the last display uses $m$-dimensional vectors. Again the individual smallest singular values are $1$, but the product's is $0$. When $l=1$, the first $l-1$ columns are absent. These two failures exclude exactly the dimensions outside $\min(m,l)\le n\le\max(m,l)$.

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

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> The relative-perturbation definition comes from [Lecture 1, §1.5](../1.%20Vectors%20and%20Matrices.md#conditioning). The vector version is specified in this problem. It requires $x\ne0$ and $Ax\ne0$; otherwise the relative error denominator vanishes.
> $$
> \begin{aligned}
> f(x+\delta x)-f(x)&=A(x+\delta x)-Ax=A\delta x,\\
> \frac{\|f(x+\delta x)-f(x)\|_2/\|f(x)\|_2}
>      {\|\delta x\|_2/\|x\|_2}
> &=\frac{\|x\|_2}{\|Ax\|_2}
> \frac{\|A\delta x\|_2}{\|\delta x\|_2}.
> \end{aligned}
> $$
> For every $\varepsilon>0$, every nonzero direction $v$ can be scaled to $\delta x=\varepsilon v/(2\|v\|_2)$. Therefore
> $$
> \begin{aligned}
> 0<\|\delta x\|_2&=\varepsilon/2\le\varepsilon,\\
> \frac{\|A\delta x\|_2}{\|\delta x\|_2}
> &=\frac{\|Av\|_2}{\|v\|_2},\\
> \sup_{0<\|\delta x\|_2\le\varepsilon}
> \frac{\|A\delta x\|_2}{\|\delta x\|_2}
> &=\sup_{v\ne0}\frac{\|Av\|_2}{\|v\|_2}=\|A\|_2,\\
> \kappa_f(x)&=\frac{\|A\|_2\|x\|_2}{\|Ax\|_2}.
> \end{aligned}
> $$
> The supremum is independent of $\varepsilon$, so taking the limit changes nothing. For full column rank, [3(a)–3(b)](#a-4-pts) give
> $$
> \begin{aligned}
> \kappa_f(x)&\le\frac{\sigma_{\max}(A)}{\sigma_{\min}(A)},\\
> \kappa_f(v_n)&=\frac{\sigma_{\max}(A)\|v_n\|_2}{\|Av_n\|_2}
> =\frac{\sigma_{\max}(A)}{\sigma_{\min}(A)},\\
> \sup_{x\ne0}\kappa_f(x)&=\frac{\sigma_{\max}(A)}{\sigma_{\min}(A)}.
> \end{aligned}
> $$
> For square invertible $A$, [3(d)](#d-4-pts) yields $\sigma_{\max}(A^{-1})=1/\sigma_{\min}(A)$, hence $\kappa(A)=\|A\|_2\|A^{-1}\|_2$. This is also the definition used in [Lecture 6, §6.3.1](../6.%20Error%20Bounds%20and%20Householder%20QR.md#turning-a-local-error-into-a-backward-error).

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

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> Invertibility gives a bijection $y=Ax$ between nonzero vectors; the equivalent characterization of nonsingularity appears in [Lecture 2, §2.5](../2.%20Storing%20Matrices%20%26%20Vectors.md#linear-systems). Set $a=\inf_{x\ne0}\|Ax\|_2/\|x\|_2$. By [3(b)](#b-4-pts), $a=\sigma_{\min}(A)>0$.
> $$
> \begin{aligned}
> \|A^{-1}\|_2
> &=\sup_{y\ne0}\frac{\|A^{-1}y\|_2}{\|y\|_2}\\
> &=\sup_{x\ne0}\frac{\|A^{-1}Ax\|_2}{\|Ax\|_2}\\
> &=\sup_{x\ne0}\frac{\|x\|_2}{\|Ax\|_2}
> =\sup_{x\ne0}\frac1{\|Ax\|_2/\|x\|_2}.
> \end{aligned}
> $$
> Every denominator is at least $a$, so this supremum is at most $1/a$. Conversely, for every $\eta>0$, the definition of infimum gives some $x\ne0$ with ratio below $a+\eta$; its reciprocal exceeds $1/(a+\eta)$. Letting $\eta\downarrow0$ gives
> $$
> \begin{aligned}
> \|A^{-1}\|_2&=1/a,\\
> \|A^{-1}\|_2^{-1}&=a=\inf_{x\ne0}\frac{\|Ax\|_2}{\|x\|_2}.
> \end{aligned}
> $$
> The positivity of $a$ is essential when taking reciprocals.

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

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> Cauchy–Schwarz is used explicitly in [Lecture 9, §9.6](../9.%20Cholesky%20Factorization%20and%20Schur%20Complements.md#roundoff-and-element-growth). For completeness, with $v\ne0$ and $t=(u^Tv)/(v^Tv)$,
> $$
> \begin{aligned}
> 0\le\|u-tv\|_2^2
> &=u^Tu-2t\,u^Tv+t^2v^Tv\\
> &=\|u\|_2^2-\frac{(u^Tv)^2}{\|v\|_2^2},\\
> |u^Tv|&\le\|u\|_2\|v\|_2.
> \end{aligned}
> $$
> For $v=0$, the last inequality is immediate. Apply it to $u=x$, $v=Ax$:
> $$
> \begin{aligned}
> |x^TAx|&\le\|x\|_2\|Ax\|_2,\\
> \frac{|x^TAx|}{\|x\|_2^2}
> &\le\frac{\|Ax\|_2}{\|x\|_2}\qquad(x\ne0).
> \end{aligned}
> $$
> To justify taking infima, let $c$ be the infimum of the left-hand ratio. For every $x\ne0$, $c$ is at most that ratio and hence at most the right-hand ratio. Thus $c$ is a lower bound for all right-hand ratios:
> $$
> \begin{aligned}
> \inf_{x\ne0}\frac{|x^TAx|}{\|x\|_2^2}
> &\le\inf_{x\ne0}\frac{\|Ax\|_2}{\|x\|_2}
> =\|A^{-1}\|_2^{-1},
> \end{aligned}
> $$
> where the final equality is [4(a)](#a-5-pts).

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

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> The minimum Rayleigh-quotient characterization is supplied in [Problem 4](#inverses-25-pts). It follows from the Hermitian spectral theorem in [Lecture 10, §10.2.1](../10.%20Eigenvalues%20and%20Iterative%20Methods.md#hermitian-matrices): for symmetric $H=Q\Lambda Q^T$ and $z=Q^Tx$,
> $$
> \begin{aligned}
> \frac{x^THx}{x^Tx}
> &=\frac{z^T\Lambda z}{z^Tz}
> =\sum_k\lambda_k\frac{z_k^2}{\sum_jz_j^2},\\
> \frac{z_k^2}{\sum_jz_j^2}&\ge0,
> \qquad\sum_k\frac{z_k^2}{\sum_jz_j^2}=1,\\
> \frac{x^THx}{x^Tx}&\ge\lambda_{\min}(H).
> \end{aligned}
> $$
> Equality holds at an eigenvector for $\lambda_{\min}(H)$. Apply this bound separately to $M$ and $N$:
> $$
> \begin{aligned}
> \frac{x^T(M+N)x}{\|x\|_2^2}
> &=\frac{x^TMx}{\|x\|_2^2}+\frac{x^TNx}{\|x\|_2^2}\\
> &\ge\lambda_{\min}(M)+\lambda_{\min}(N)\qquad(x\ne0),\\
> \lambda_{\min}(M+N)
> &=\inf_{x\ne0}\frac{x^T(M+N)x}{\|x\|_2^2}\\
> &\ge\lambda_{\min}(M)+\lambda_{\min}(N).
> \end{aligned}
> $$
> The separate minimizing eigenvectors need not coincide; that is why this is an inequality.

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

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> Use the spectral expansion from [4(c)](#c-5-pts), derived from [Lecture 10, §10.2.1](../10.%20Eigenvalues%20and%20Iterative%20Methods.md#hermitian-matrices). Its nonnegative weights also give
> $$
> \begin{aligned}
> \frac{x^THx}{x^Tx}
> &=\sum_k\lambda_kw_k\le\lambda_{\max}(H)\sum_kw_k
> =\lambda_{\max}(H),\\
> w_k&=\frac{z_k^2}{\sum_jz_j^2}\ge0,\qquad\sum_kw_k=1.
> \end{aligned}
> $$
> An eigenvector for $\lambda_{\max}(H)$ attains equality, proving the maximum characterization supplied in the problem. Consequently,
> $$
> \begin{aligned}
> \frac{x^T(M+N)x}{\|x\|_2^2}
> &=\frac{x^TMx}{\|x\|_2^2}+\frac{x^TNx}{\|x\|_2^2}\\
> &\le\lambda_{\max}(M)+\lambda_{\max}(N)\qquad(x\ne0),\\
> \lambda_{\max}(M+N)
> &=\sup_{x\ne0}\frac{x^T(M+N)x}{\|x\|_2^2}\\
> &\le\lambda_{\max}(M)+\lambda_{\max}(N).
> \end{aligned}
> $$
> No common eigenbasis for $M$ and $N$ is assumed.

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

<!-- Added study explanation; original submission above is unchanged. -->

> **Derivation details — added study explanation.**
>
> Positive definiteness is defined in [Lecture 8, §8.6.2](../8.%20Least%20Squares%20and%20Normal%20Equations.md#positive-semidefinite-and-positive-definite-matrices). Its positive eigenvalues follow by applying that definition to each eigenvector, as in [§8.7.2](../8.%20Least%20Squares%20and%20Normal%20Equations.md#a-hermitian-positive-semidefinite-matrix-is-a-gram-matrix):
> $$
> \begin{aligned}
> Aq_k&=\lambda_kq_k,\quad q_k\ne0,\\
> 0<q_k^TAq_k&=\lambda_k\|q_k\|_2^2
> \Longrightarrow\lambda_k>0.
> \end{aligned}
> $$
> Combine [4(a)](#a-5-pts) and [4(c)](#c-5-pts) with the orthonormal spectral theorem from [Lecture 10, §10.2.1](../10.%20Eigenvalues%20and%20Iterative%20Methods.md#hermitian-matrices), write $A=Q\Lambda Q^T$ with $0<\lambda_{\min}\le\lambda_k$. For $y=Q^Tx$,
> $$
> \begin{aligned}
> \|Ax\|_2^2
> &=\|Q\Lambda y\|_2^2
> =y^T\Lambda^2y
> =\sum_k\lambda_k^2y_k^2\\
> &\ge\lambda_{\min}^2\sum_ky_k^2
> =\lambda_{\min}^2\|x\|_2^2,\\
> \inf_{x\ne0}\frac{\|Ax\|_2}{\|x\|_2}
> &=\lambda_{\min}\qquad\text{(attained at a minimum-eigenvalue eigenvector)},\\
> \inf_{x\ne0}\frac{x^TAx}{\|x\|_2^2}
> &=\lambda_{\min}\qquad\text{by the expansion in 4(c)},\\
> \|A^{-1}\|_2^{-1}
> &=\lambda_{\min}
> =\inf_{x\ne0}\frac{x^TAx}{\|x\|_2^2}\qquad\text{by 4(a)}.
> \end{aligned}
> $$
> Symmetry alone would not suffice: positivity ensures the smallest eigenvalue equals the smallest singular value.
