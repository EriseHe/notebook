# Numerical Methods I, Homework 3

Schäfer, Fall 2026

Deadline: Oct. 19 Monday, 4:55 pm

## 1 Schur Complements I [25 pts]
Consider the matrix
$$
\boldsymbol{M}
  \coloneqq
  \begin{pmatrix}
    \boldsymbol{A} & \boldsymbol{B}\\
    \boldsymbol{C} & \boldsymbol{D}
  \end{pmatrix},
\tag{1}
$$
where $\boldsymbol{A} \in \mathbb{K}^{m \times m}$ and $\boldsymbol{D} \in \mathbb{K}^{n \times n}$ are square matrices and $\boldsymbol{A}$ is invertible.
The matrix $\boldsymbol{M}/\boldsymbol{A} \coloneqq \boldsymbol{D} - \boldsymbol{C} \boldsymbol{A}^{-1} \boldsymbol{B}$ is called the Schur complement of $\boldsymbol{A}$ in $\boldsymbol{M}$.

### (a) [5 pts]
  Relate the Schur complement $\boldsymbol{M} / \boldsymbol{A}$ to the block LU factorization of $\boldsymbol{M}$.

#### Solution to 1(a)

> We eliminate the lower-left block using the block row operation:
> $$
> \begin{pmatrix}
> \boldsymbol{I}_m&\boldsymbol{0}\\
> -\boldsymbol{C}\boldsymbol{A}^{-1}&\boldsymbol{I}_n
> \end{pmatrix}
> \begin{pmatrix}
> \boldsymbol{A}&\boldsymbol{B}\\
> \boldsymbol{C}&\boldsymbol{D}
> \end{pmatrix}
> =
> \begin{pmatrix}
> \boldsymbol{A}&\boldsymbol{B}\\
> \boldsymbol{0}&\boldsymbol{D}-\boldsymbol{C}\boldsymbol{A}^{-1}\boldsymbol{B}
> \end{pmatrix}
> $$
> then, invert the elimination matrix gives the block LU factorization
> $$
> \boldsymbol{M}=
> \begin{pmatrix}
> \boldsymbol{I}_m&\boldsymbol{0}\\
> \boldsymbol{C}\boldsymbol{A}^{-1}&\boldsymbol{I}_n
> \end{pmatrix}
> \begin{pmatrix}
> \boldsymbol{A}&\boldsymbol{B}\\
> \boldsymbol{0}&\boldsymbol{M}/\boldsymbol{A}
> \end{pmatrix}
> $$
>
> thus, the $\boldsymbol{M}/\boldsymbol{A}$ is the trailing block of the block upper-triangular factor after eliminating $\boldsymbol{C}$.


### (b) [5 pts]
  Show that the determinant of $\boldsymbol{M}$ is given by $\det\left(\boldsymbol{A}\right) \det\left(\boldsymbol{M} / \boldsymbol{A}\right)$.

#### Solution to 1(b)

> We take determinants in the factorization from part (a), and since we know that the unit block lower-triangular factor has determinant $1$, and the determinant of a block triangular matrix is the product of the determinants of its diagonal blocks, then
>
> $$
> \begin{aligned}
> \det(\boldsymbol{M})
> &=\det(\boldsymbol{I}_m)\det(\boldsymbol{I}_n)
>   \det(\boldsymbol{A})\det(\boldsymbol{M}/\boldsymbol{A})\\
> &=\det(\boldsymbol{A})\det(\boldsymbol{M}/\boldsymbol{A})
> \end{aligned}
> $$


### (c) [7.5 pts]
  Let $\boldsymbol{M} = \boldsymbol{L} \boldsymbol{U}$ be the LU factorization of $\boldsymbol{M}$.
  Split its factors into block matrices
  $$
\boldsymbol{L} =
    \begin{pmatrix}
      \boldsymbol{L}_{1, 1} & \boldsymbol{0} \\
      \boldsymbol{L}_{2, 1} & \boldsymbol{L}_{2, 2}
    \end{pmatrix},
    \quad
    \boldsymbol{U} =
    \begin{pmatrix}
      \boldsymbol{U}_{1, 1} & \boldsymbol{U}_{1, 2} \\
      \boldsymbol{0} & \boldsymbol{U}_{2, 2}
    \end{pmatrix}
\tag{2}
$$
  according to the same blocking as $\boldsymbol{M}$.
  Show that $\boldsymbol{M} / \boldsymbol{A} = \boldsymbol{L}_{2, 2} \boldsymbol{U}_{2, 2}$.

#### Solution to 1(c)

> Multiplying the blocks of $\boldsymbol{L}\boldsymbol{U}$ and compare with $\boldsymbol{M}$ provides
> $$
> \begin{aligned}
> \boldsymbol{A}&=\boldsymbol{L}_{1,1}\boldsymbol{U}_{1,1}\\
> \boldsymbol{B}&=\boldsymbol{L}_{1,1}\boldsymbol{U}_{1,2}\\
> \boldsymbol{C}&=\boldsymbol{L}_{2,1}\boldsymbol{U}_{1,1}\\
> \boldsymbol{D}&=\boldsymbol{L}_{2,1}\boldsymbol{U}_{1,2}
>            +\boldsymbol{L}_{2,2}\boldsymbol{U}_{2,2}
> \end{aligned}
> $$
>
> Since we know that $\boldsymbol{A}$ is invertible, its square factors $\boldsymbol{L}_{1,1}$ and $\boldsymbol{U}_{1,1}$ are also invertible. Therefore
> $$
> \begin{aligned}
> \boldsymbol{C}\boldsymbol{A}^{-1}\boldsymbol{B}
> &=(\boldsymbol{L}_{2,1}\boldsymbol{U}_{1,1})
>   (\boldsymbol{U}_{1,1}^{-1}\boldsymbol{L}_{1,1}^{-1})
>   (\boldsymbol{L}_{1,1}\boldsymbol{U}_{1,2})\\
> &=\boldsymbol{L}_{2,1}\boldsymbol{U}_{1,2}
> \end{aligned}
> $$
>
> finally, substracting this from $\boldsymbol{D}$ give us that
> $$
> \begin{aligned}
> \boldsymbol{M}/\boldsymbol{A}
> &=\boldsymbol{D}-\boldsymbol{C}\boldsymbol{A}^{-1}\boldsymbol{B}\\
> &=\boldsymbol{L}_{2,1}\boldsymbol{U}_{1,2}
>  +\boldsymbol{L}_{2,2}\boldsymbol{U}_{2,2}
>  -\boldsymbol{L}_{2,1}\boldsymbol{U}_{1,2}\\
> &=\boldsymbol{L}_{2,2}\boldsymbol{U}_{2,2}
> \end{aligned}
> $$


### (d) [7.5 pts]
Now consider the $3 \times 3$ block matrix
$$
\boldsymbol{N} =
  \begin{pmatrix}
    \boldsymbol{N}_{1, 1} & \boldsymbol{N}_{1, 2} & \boldsymbol{N}_{1, 3} \\
    \boldsymbol{N}_{2, 1} & \boldsymbol{N}_{2, 2} & \boldsymbol{N}_{2, 3} \\
    \boldsymbol{N}_{3, 1} & \boldsymbol{N}_{3, 2} & \boldsymbol{N}_{3, 3}
  \end{pmatrix}.
\tag{3}
$$
Prove the *Quotient Property* of Schur complements
$$
\left(\boldsymbol{N} / \boldsymbol{N}_{1, 1}\right) / \left(\boldsymbol{N} / \boldsymbol{N}_{1, 1}\right)_{1, 1}
  =
  \boldsymbol{N} \Big /
  \begin{pmatrix}
    \boldsymbol{N}_{1, 1} & \boldsymbol{N}_{1, 2} \\
    \boldsymbol{N}_{2, 1} & \boldsymbol{N}_{2, 2}
  \end{pmatrix}.
\tag{4}
$$
Here, $\left(\boldsymbol{N} / \boldsymbol{N}_{1, 1}\right)_{1, 1}$ is the top left block of $\boldsymbol{N} / \boldsymbol{N}_{1, 1}$, and the blocks $\boldsymbol{N}_{1,1}$ and $\begin{pmatrix} \boldsymbol{N}_{1, 1} & \boldsymbol{N}_{1, 2} \\ \boldsymbol{N}_{2, 1} & \boldsymbol{N}_{2, 2} \end{pmatrix}$ are assumed to be invertible.

#### Solution to 1(d)

> We write
>
> $$
> \boldsymbol{S}\coloneqq\boldsymbol{N}/\boldsymbol{N}_{1,1}
> =\begin{pmatrix}
> \boldsymbol{S}_{1,1}&\boldsymbol{S}_{1,2}\\
> \boldsymbol{S}_{2,1}&\boldsymbol{S}_{2,2}
> \end{pmatrix}
> $$
>
> where the four blocks are
>
> $$
> \begin{aligned}
> \boldsymbol{S}_{1,1}
> &=\boldsymbol{N}_{2,2}-\boldsymbol{N}_{2,1}\boldsymbol{N}_{1,1}^{-1}\boldsymbol{N}_{1,2}\\
> \boldsymbol{S}_{1,2}
> &=\boldsymbol{N}_{2,3}-\boldsymbol{N}_{2,1}\boldsymbol{N}_{1,1}^{-1}\boldsymbol{N}_{1,3}\\
> \boldsymbol{S}_{2,1}
> &=\boldsymbol{N}_{3,2}-\boldsymbol{N}_{3,1}\boldsymbol{N}_{1,1}^{-1}\boldsymbol{N}_{1,2}\\
> \boldsymbol{S}_{2,2}
> &=\boldsymbol{N}_{3,3}-\boldsymbol{N}_{3,1}\boldsymbol{N}_{1,1}^{-1}\boldsymbol{N}_{1,3}
> \end{aligned}
> $$
>
> Let $\boldsymbol{K}$ denote the leading 2 by 2 block matrix on the righthand side of (4). By part (b), we have
>
> $$
> \det(\boldsymbol{K})
> =\det(\boldsymbol{N}_{1,1})\det(\boldsymbol{S}_{1,1})
> $$
>
> and we know thus $\boldsymbol{S}_{1,1}$ is also invertible. To evaluate the Schur complement, solve
>
> $$
> \boldsymbol{K}
> \begin{pmatrix}\boldsymbol{X}\\\boldsymbol{Y}\end{pmatrix}
> =\begin{pmatrix}\boldsymbol{N}_{1,3}\\\boldsymbol{N}_{2,3}\end{pmatrix}
> $$
>
> Elimination in this block system gives
>
> $$
> \begin{aligned}
> \boldsymbol{X}
> &=\boldsymbol{N}_{1,1}^{-1}
>   (\boldsymbol{N}_{1,3}-\boldsymbol{N}_{1,2}\boldsymbol{Y})\\
> \boldsymbol{S}_{1,1}\boldsymbol{Y}&=\boldsymbol{S}_{1,2}\\
> \boldsymbol{Y}&=\boldsymbol{S}_{1,1}^{-1}\boldsymbol{S}_{1,2}
> \end{aligned}
> $$
>
> Substitute these expressions into $\boldsymbol{N}/\boldsymbol{K}$:
>
> $$
> \begin{aligned}
> \boldsymbol{N}/\boldsymbol{K}
> &=\boldsymbol{N}_{3,3}
>  -\boldsymbol{N}_{3,1}\boldsymbol{X}-\boldsymbol{N}_{3,2}\boldsymbol{Y}\\
> &=\boldsymbol{N}_{3,3}
>  -\boldsymbol{N}_{3,1}\boldsymbol{N}_{1,1}^{-1}\boldsymbol{N}_{1,3}\\
> &\quad-\bigl(\boldsymbol{N}_{3,2}
>  -\boldsymbol{N}_{3,1}\boldsymbol{N}_{1,1}^{-1}\boldsymbol{N}_{1,2}\bigr)
>  \boldsymbol{S}_{1,1}^{-1}\boldsymbol{S}_{1,2}\\
> &=\boldsymbol{S}_{2,2}
>  -\boldsymbol{S}_{2,1}\boldsymbol{S}_{1,1}^{-1}\boldsymbol{S}_{1,2}\\
> &=\boldsymbol{S}/\boldsymbol{S}_{1,1}
> \end{aligned}
> $$
>
> Since $\boldsymbol{S}=\boldsymbol{N}/\boldsymbol{N}_{1,1}$, this is then precisely the quotient property (4).


## 2 Schur Complements II [25 pts + 10 bonus]
Let $\boldsymbol{M}$ be as in the previous problem.

### (a) [5 pts]
Divide the inverse of $\boldsymbol{M}$ into blocks (of the same size as those of $\boldsymbol{M}$) as
$$
\boldsymbol{M}^{-1} =
  \begin{pmatrix}
    \boldsymbol{\alpha} & \boldsymbol{\beta} \\
    \boldsymbol{\gamma} & \boldsymbol{\delta}
  \end{pmatrix}.
\tag{5}
$$
Show that the Schur complement $\boldsymbol{M} / \boldsymbol{A}$ is the inverse of $\boldsymbol{\delta}$.

#### Solution to 2(a)

> We write $\boldsymbol{S}=\boldsymbol{M}/\boldsymbol{A}$. Since $\boldsymbol{M}$ and $\boldsymbol{A}$ are invertible, question 1(b) implies that $\boldsymbol{S}$ is alsi invertible. Then, we invert the block LU factors from question 1(a) in reverse order to have
>
> $$
> \boldsymbol{M}^{-1}
> =
> \begin{pmatrix}
> \boldsymbol{A}^{-1}&-\boldsymbol{A}^{-1}\boldsymbol{B}\boldsymbol{S}^{-1}\\
> \boldsymbol{0}&\boldsymbol{S}^{-1}
> \end{pmatrix}
> \begin{pmatrix}
> \boldsymbol{I}_m&\boldsymbol{0}\\
> -\boldsymbol{C}\boldsymbol{A}^{-1}&\boldsymbol{I}_n
> \end{pmatrix}
> $$
>
> here, the lower-right block of this product is $\boldsymbol{S}^{-1}$. Comparing with (5), we then know
>
> $$
> \boldsymbol{\delta}=\boldsymbol{S}^{-1}
> \quad\Longrightarrow\quad
> \boldsymbol{M}/\boldsymbol{A}=\boldsymbol{\delta}^{-1}
> $$


### (b) [5 pts]
For $\boldsymbol{M}$ symmetric positive definite (symmetric meaning Hermitian in the complex case), show that if $\lambda$ is an eigenvalue of $\boldsymbol{M} / \boldsymbol{A}$, then $\lambda_{\min}\left(\boldsymbol{M} \right) \leq \lambda \leq \lambda_{\max}\left(\boldsymbol{M}\right)$.

#### Solution to 2(b)

> Because $\boldsymbol{M}$ is Hermitian positive definite, so is $\boldsymbol{M}^{-1}$, and its $\boldsymbol{\delta}$ is positive definite, since for $\boldsymbol{y}\ne\boldsymbol{0}$,
>
> $$
> \boldsymbol{y}^*\boldsymbol{\delta}\boldsymbol{y}
> =
> \begin{pmatrix}\boldsymbol{0}\\\boldsymbol{y}\end{pmatrix}^*
> \boldsymbol{M}^{-1}
> \begin{pmatrix}\boldsymbol{0}\\\boldsymbol{y}\end{pmatrix}>0
> $$
>
> thus $\boldsymbol{S}=\boldsymbol{M}/\boldsymbol{A}=\boldsymbol{\delta}^{-1}$ is also Hermitian p.d.. We use the eigendecomposition in Lecture 8 to have, for every vector $\boldsymbol{z}$, Since $Sy=\lambda y$ with $y\neq 0$, we have $\delta y=\lambda^{-1}y$. Taking $z=(0,y)^T$, we obtain
> $$
> \begin{aligned}
> \frac{\|z\|_2^2}{\lambda_{\max}(M)}
> &\le z^*M^{-1}z
> \le \frac{\|z\|_2^2}{\lambda_{\min}(M)}\\
> \frac{\|y\|_2^2}{\lambda_{\max}(M)}
> &\le
> \begin{pmatrix}0\\y\end{pmatrix}^*
> M^{-1}
> \begin{pmatrix}0\\y\end{pmatrix}
> = y^*\delta y
> = \lambda^{-1} y^* y
> = \frac{\|y\|_2^2}{\lambda}
> \le \frac{\|y\|_2^2}{\lambda_{\min}(M)}\\
> \frac{1}{\lambda_{\max}(M)} &\le \frac{1}{\lambda} \le \frac{1}{\lambda_{\min}(M)}\\
> \lambda_{\min}(M)
> &\le \lambda \le \lambda_{\max}(M)
> \end{aligned}
> $$


### (c) [7.5 pts]
Show that the size of the pivots occurring in the Cholesky or LU factorization of a s.p.d. matrix $\boldsymbol{M}$ is lower bounded by $\left\|\boldsymbol{M}^{-1}\right\|^{-1}$, where $\|\cdot\|$ denotes the spectral norm.

#### Solution to 2(c)

> After eliminating the first $k-1$ variables, the active matrix is
>
> $$
> \boldsymbol{S}^{(k-1)}
> =\boldsymbol{M}/\boldsymbol{M}_{1:k-1,\,1:k-1}
> \qquad (k\ge2)
> $$
>
> and the next pivot is $p_k=(\boldsymbol{S}^{(k-1)})_{1,1}$. The leading principal block is p.d., so this Schur complement exists. By part (b),
>
> $$
> \begin{aligned}
> p_k
> &=\boldsymbol{e}_1^*\boldsymbol{S}^{(k-1)}\boldsymbol{e}_1\\
> &\ge\lambda_{\min}(\boldsymbol{S}^{(k-1)})\\
> &\ge\lambda_{\min}(\boldsymbol{M})
> \end{aligned}
> $$
>
> then for the first pivot, the same bound follows directly from $p_1=\boldsymbol{e}_1^*\boldsymbol{M}\boldsymbol{e}_1$. Since $\boldsymbol{M}$ is p.d.,
>
> $$
> \|\boldsymbol{M}^{-1}\|_2
> =\frac{1}{\lambda_{\min}(\boldsymbol{M})}
> $$
>
> thus every elimination pivot satisfies
>
> $$
> p_k\ge\|\boldsymbol{M}^{-1}\|_2^{-1}
> $$
>
> In unit lower-triangular LU, $p_k=U_{k,k}$. In Cholesky, $p_k=L_{k,k}^2$, so the factor's positive diagonal entries satisfy $L_{k,k}\ge\|\boldsymbol{M}^{-1}\|_2^{-1/2}$.


### (d) [7.5 pts]
For $\boldsymbol{M}$ s.p.d, show that
$$
\boldsymbol{y}^* \left(\boldsymbol{M} / \boldsymbol{A}\right) \boldsymbol{y} = \min \limits_{\boldsymbol{x} \in \mathbb{K}^{m}}
  \begin{pmatrix}
    \boldsymbol{x}\\
    \boldsymbol{y}
  \end{pmatrix}^*
  \boldsymbol{M}
  \begin{pmatrix}
    \boldsymbol{x}\\
    \boldsymbol{y}
  \end{pmatrix}.
\tag{6}
$$

#### Solution to 2(d)

> Hermitian symmetry gives $\boldsymbol{C}=\boldsymbol{B}^*$ and $(\boldsymbol{A}^{-1})^*=\boldsymbol{A}^{-1}$. Expand and complete the square:
>
> $$
> \begin{aligned}
> \begin{pmatrix}\boldsymbol{x}\\\boldsymbol{y}\end{pmatrix}^*
> \boldsymbol{M}
> \begin{pmatrix}\boldsymbol{x}\\\boldsymbol{y}\end{pmatrix}
> &=\boldsymbol{x}^*\boldsymbol{A}\boldsymbol{x}
>  +\boldsymbol{x}^*\boldsymbol{B}\boldsymbol{y}
>  +\boldsymbol{y}^*\boldsymbol{B}^*\boldsymbol{x}
>  +\boldsymbol{y}^*\boldsymbol{D}\boldsymbol{y}\\
> &=(\boldsymbol{x}+\boldsymbol{A}^{-1}\boldsymbol{B}\boldsymbol{y})^*
>  \boldsymbol{A}
>  (\boldsymbol{x}+\boldsymbol{A}^{-1}\boldsymbol{B}\boldsymbol{y})\\
> &\quad+\boldsymbol{y}^*
>  (\boldsymbol{D}-\boldsymbol{B}^*\boldsymbol{A}^{-1}\boldsymbol{B})
>  \boldsymbol{y}
> \end{aligned}
> $$
>
> Since $\boldsymbol{A}$ is positive definite, the first term is nonnegative and vanishes exactly at
>
> $$
> \boldsymbol{x}=-\boldsymbol{A}^{-1}\boldsymbol{B}\boldsymbol{y}
> $$
>
> The second term is $\boldsymbol{y}^*(\boldsymbol{M}/\boldsymbol{A})\boldsymbol{y}$. Consequently,
>
> $$
> \min_{\boldsymbol{x}\in\mathbb{K}^m}
> \begin{pmatrix}\boldsymbol{x}\\\boldsymbol{y}\end{pmatrix}^*
> \boldsymbol{M}
> \begin{pmatrix}\boldsymbol{x}\\\boldsymbol{y}\end{pmatrix}
> =\boldsymbol{y}^*(\boldsymbol{M}/\boldsymbol{A})\boldsymbol{y}
> $$


### (e) [10 bonus pts]
By replacing the $\min$ with a $\min \max$ over suitable variables, derive a version of the results of (d) that is valid for general $\boldsymbol{M}$.

#### Solution to 2(e)

> Introduce an independent vector $\boldsymbol{z}\in\mathbb{K}^m$ in the left argument and define
>
> $$
> \begin{aligned}
> F(\boldsymbol{x},\boldsymbol{z})
> &=\begin{pmatrix}\boldsymbol{z}\\\boldsymbol{y}\end{pmatrix}^*
> \boldsymbol{M}
> \begin{pmatrix}\boldsymbol{x}\\\boldsymbol{y}\end{pmatrix}\\
> &=\boldsymbol{z}^*(\boldsymbol{A}\boldsymbol{x}+\boldsymbol{B}\boldsymbol{y})
>  +\boldsymbol{y}^*(\boldsymbol{C}\boldsymbol{x}+\boldsymbol{D}\boldsymbol{y})
> \end{aligned}
> $$
>
> First let $\mathbb{K}=\mathbb{R}$. For fixed $\boldsymbol{x}$, write $\boldsymbol{r}=\boldsymbol{A}\boldsymbol{x}+\boldsymbol{B}\boldsymbol{y}$. If $\boldsymbol{r}\ne\boldsymbol{0}$, choosing $\boldsymbol{z}=t\boldsymbol{r}$ and letting $t\to+\infty$ makes $F$ tend to $+\infty$. If $\boldsymbol{r}=\boldsymbol{0}$, the expression is independent of $\boldsymbol{z}$. Thus
>
> $$
> \sup_{\boldsymbol{z}}F(\boldsymbol{x},\boldsymbol{z})
> =\begin{cases}
> \boldsymbol{y}^*(\boldsymbol{C}\boldsymbol{x}+\boldsymbol{D}\boldsymbol{y})
> &\boldsymbol{A}\boldsymbol{x}+\boldsymbol{B}\boldsymbol{y}=\boldsymbol{0}\\
> +\infty&\text{otherwise}
> \end{cases}
> $$
>
> Since $\boldsymbol{A}$ is invertible, the only finite case is $\boldsymbol{x}=-\boldsymbol{A}^{-1}\boldsymbol{B}\boldsymbol{y}$. Substitution gives the general real-matrix version:
>
> $$
> \boldsymbol{y}^*(\boldsymbol{M}/\boldsymbol{A})\boldsymbol{y}
> =\min_{\boldsymbol{x}\in\mathbb{R}^m}
>  \sup_{\boldsymbol{z}\in\mathbb{R}^m}
>  F(\boldsymbol{x},\boldsymbol{z})
> $$
>
> The supremum allows the value $+\infty$ away from the constraint; at the minimizing $\boldsymbol{x}$, every $\boldsymbol{z}$ attains the inner maximum. No symmetry or p.d. is required. For a general *complex* matrix, the scalar on the left may be complex, so apply minimization and maximization to its real and imaginary parts:
>
> $$
> \begin{aligned}
> \operatorname{Re}\!\left(\boldsymbol{y}^*(\boldsymbol{M}/\boldsymbol{A})\boldsymbol{y}\right)
> &=\min_{\boldsymbol{x}\in\mathbb{C}^m}
>   \sup_{\boldsymbol{z}\in\mathbb{C}^m}
>   \operatorname{Re}F(\boldsymbol{x},\boldsymbol{z})\\
> \operatorname{Im}\!\left(\boldsymbol{y}^*(\boldsymbol{M}/\boldsymbol{A})\boldsymbol{y}\right)
> &=\min_{\boldsymbol{x}\in\mathbb{C}^m}
>   \sup_{\boldsymbol{z}\in\mathbb{C}^m}
>   \operatorname{Im}F(\boldsymbol{x},\boldsymbol{z})
> \end{aligned}
> $$
>
> The same proof uses $\boldsymbol{z}=t\boldsymbol{r}$ for the real part and $\boldsymbol{z}=-it\boldsymbol{r}$ for the imaginary part. For Hermitian $\boldsymbol{M}$, the Schur-complement quadratic form is real, so the first identity alone gives its value.


## 3 Cholesky and QR [25 pts]

### (a) [5 pts]
Assume that the invertible matrix $\boldsymbol{A} \in \mathbb{K}^{m \times m}$ satisfies $\boldsymbol{A} = \boldsymbol{L} \boldsymbol{U}$.
Derive a way to write $\boldsymbol{A}$ as the sum of rank-one matrices in outer product form.

#### Solution to 3(a)

> Insert $\boldsymbol{I}=\sum_{k=1}^m\boldsymbol{e}_k\boldsymbol{e}_k^*$ between the factors:
>
> $$
> \begin{aligned}
> \boldsymbol{A}
> &=\boldsymbol{L}\boldsymbol{U}\\
> &=\sum_{k=1}^m
>   (\boldsymbol{L}\boldsymbol{e}_k)(\boldsymbol{e}_k^*\boldsymbol{U})\\
> &=\sum_{k=1}^m\boldsymbol{L}_{:,k}\boldsymbol{U}_{k,:}
> \end{aligned}
> $$
>
> Each summand is the outer product of column $k$ of $\boldsymbol{L}$ and row $k$ of $\boldsymbol{U}$. Equivalently, set $\boldsymbol{\ell}_k=\boldsymbol{L}\boldsymbol{e}_k$ and $\boldsymbol{u}_k=\boldsymbol{U}^*\boldsymbol{e}_k$ to obtain $\boldsymbol{A}=\sum_k\boldsymbol{\ell}_k\boldsymbol{u}_k^*$. Both factors are invertible, so these vectors are nonzero and every summand has rank one.


### (b) [5 pts]
Show that the LU factorization of an invertible matrix $\boldsymbol{A} \in \mathbb{K}^{m \times m}$, with $\boldsymbol{L}$ unit lower triangular, is unique (when it exists).

#### Solution to 3(b)

> Suppose there are two such factorizations:
>
> $$
> \boldsymbol{A}=\boldsymbol{L}\boldsymbol{U}
> =\widetilde{\boldsymbol{L}}\widetilde{\boldsymbol{U}}
> $$
>
> All factors are invertible because $\boldsymbol{A}$ is invertible. Rearranging gives
>
> $$
> \boldsymbol{L}^{-1}\widetilde{\boldsymbol{L}}
> =\boldsymbol{U}\widetilde{\boldsymbol{U}}^{-1}
> $$
>
> The left-hand side is unit lower triangular; the right-hand side is upper triangular. Their common value is therefore diagonal, and its diagonal entries are all $1$. Hence
>
> $$
> \boldsymbol{L}^{-1}\widetilde{\boldsymbol{L}}=\boldsymbol{I}
> \quad\Longrightarrow\quad
> \widetilde{\boldsymbol{L}}=\boldsymbol{L}
> \qquad\widetilde{\boldsymbol{U}}=\boldsymbol{U}
> $$


### (c) [5 pts]
Assume that we factor $\boldsymbol{A} \in \mathbb{K}^{m \times m}$ as $\boldsymbol{A} = \boldsymbol{L} \boldsymbol{L}^{*}$ for lower triangular $\boldsymbol{L}$.
Up to which choices is this factorization unique?
Prove your results (as always) and make sure to treat the case $\mathbb{K} = \mathbb{C}$.

#### Solution to 3(c)

> *Nonsingular case.* If $\boldsymbol{A}$ is invertible, then every $L_{k,k}\ne0$. Define
>
> $$
> \boldsymbol{D}=\operatorname{diag}(L_{1,1},\ldots,L_{m,m})
> $$
>
> Normalize the lower factor to obtain a unit-lower-triangular LU factorization:
>
> $$
> \boldsymbol{A}
> =\underbrace{(\boldsymbol{L}\boldsymbol{D}^{-1})}_{\text{unit lower triangular}}
>  \quad\underbrace{(\boldsymbol{D}\boldsymbol{L}^*)}_{\text{upper triangular}}
> $$
>
> By part (b), these two normalized factors are unique. Moreover,
>
> $$
> (\boldsymbol{D}\boldsymbol{L}^*)_{k,k}=|L_{k,k}|^2
> $$
>
> so the magnitudes of the diagonal entries of $\boldsymbol{L}$ are fixed.
>
> For another factor $\widetilde{\boldsymbol{L}}$, let $\widetilde{\boldsymbol{D}}$ contain its diagonal entries. Uniqueness of the normalized lower factor gives
>
> $$
> \begin{aligned}
> \boldsymbol{L}\boldsymbol{D}^{-1}
> &=\widetilde{\boldsymbol{L}}\widetilde{\boldsymbol{D}}^{-1}\\
> \widetilde{\boldsymbol{L}}
> &=\boldsymbol{L}\boldsymbol{D}^{-1}\widetilde{\boldsymbol{D}}\\
> &=\boldsymbol{L}\operatorname{diag}(\omega_1,\ldots,\omega_m)
> \end{aligned}
> $$
>
> Here $\omega_k=\widetilde L_{k,k}/L_{k,k}$ and $|\omega_k|=1$. Conversely, multiplying columns by such scalars preserves the factorization, since
>
> $$
> \begin{aligned}
> \boldsymbol{W}&=\operatorname{diag}(\omega_1,\ldots,\omega_m)\\
> (\boldsymbol{L}\boldsymbol{W})(\boldsymbol{L}\boldsymbol{W})^*
> &=\boldsymbol{L}\boldsymbol{W}\boldsymbol{W}^*\boldsymbol{L}^*
> =\boldsymbol{L}\boldsymbol{L}^*
> \end{aligned}
> $$
>
> Thus the factor is unique up to *independent column signs* over $\mathbb{R}$ and *independent column phases* $\omega_k=e^{i\theta_k}$ over $\mathbb{C}$. Requiring every $L_{k,k}$ to be positive real removes this freedom and gives the unique Cholesky factor.
>
> *If $\boldsymbol{A}$ is singular*, uniqueness up to column phases need not hold. For example,
>
> $$
> \boldsymbol{A}=\begin{pmatrix}0&0\\0&1\end{pmatrix}
> \qquad
> \boldsymbol{L}=\begin{pmatrix}0&0\\0&1\end{pmatrix}
> \qquad
> \widetilde{\boldsymbol{L}}=\begin{pmatrix}0&0\\1&0\end{pmatrix}
> $$
>
> Both lower-triangular factors satisfy $\boldsymbol{L}\boldsymbol{L}^*=\widetilde{\boldsymbol{L}}\widetilde{\boldsymbol{L}}^*=\boldsymbol{A}$, but column phases cannot move a nonzero entry from one column to another. The sign/phase uniqueness conclusion therefore requires nonsingularity.


### (d) [5 pts]
Using these results, prove and explain the relationship between the Cholesky factor of $\boldsymbol{B}^* \boldsymbol{B}$ and the QR factorization of $\boldsymbol{B}$, for $\boldsymbol{B} \in \mathbb{K}^{m \times n}$ with $m \geq n$ and full column rank.

#### Solution to 3(d)

> Since $\boldsymbol{B}$ has full column rank, $\boldsymbol{B}^*\boldsymbol{B}$ is positive definite:
>
> $$
> \boldsymbol{x}^*\boldsymbol{B}^*\boldsymbol{B}\boldsymbol{x}
> =\|\boldsymbol{B}\boldsymbol{x}\|_2^2>0
> \qquad(\boldsymbol{x}\ne\boldsymbol{0})
> $$
>
> Take the reduced QR factorization $\boldsymbol{B}=\boldsymbol{Q}\boldsymbol{R}$ with $\boldsymbol{Q}^*\boldsymbol{Q}=\boldsymbol{I}_n$ and positive real diagonal entries in $\boldsymbol{R}$. Then
>
> $$
> \begin{aligned}
> \boldsymbol{B}^*\boldsymbol{B}
> &=(\boldsymbol{Q}\boldsymbol{R})^*(\boldsymbol{Q}\boldsymbol{R})\\
> &=\boldsymbol{R}^*\boldsymbol{Q}^*\boldsymbol{Q}\boldsymbol{R}\\
> &=\boldsymbol{R}^*\boldsymbol{R}
> \end{aligned}
> $$
>
> The matrix $\boldsymbol{R}^*$ is lower triangular with positive real diagonal. By part (c), it is the unique lower Cholesky factor:
>
> $$
> \boldsymbol{L}=\boldsymbol{R}^*
> $$
>
> Conversely, given $\boldsymbol{B}^*\boldsymbol{B}=\boldsymbol{L}\boldsymbol{L}^*$, set $\boldsymbol{R}=\boldsymbol{L}^*$ and $\boldsymbol{Q}=\boldsymbol{B}\boldsymbol{R}^{-1}$. Then $\boldsymbol{B}=\boldsymbol{Q}\boldsymbol{R}$ and
>
> $$
> \begin{aligned}
> \boldsymbol{Q}^*\boldsymbol{Q}
> &=(\boldsymbol{R}^{-1})^*\boldsymbol{B}^*\boldsymbol{B}\boldsymbol{R}^{-1}\\
> &=(\boldsymbol{R}^*)^{-1}\boldsymbol{R}^*\boldsymbol{R}\boldsymbol{R}^{-1}\\
> &=\boldsymbol{I}_n
> \end{aligned}
> $$
>
> Thus the upper Cholesky factor of the Gram matrix is exactly the triangular factor in reduced QR, with the same positive-diagonal convention.


### (e) [5 pts]
For $\boldsymbol{A} = \boldsymbol{B}^* \boldsymbol{B}$ and $\boldsymbol{B}$ as in (d), write
$$
\boldsymbol{A} =
\begin{pmatrix}
 \boldsymbol{A}_{1,1}& \boldsymbol{A}_{1,2} \\
 \boldsymbol{A}_{2,1}& \boldsymbol{A}_{2,2}
\end{pmatrix},
\quad
\boldsymbol{B} =
\begin{pmatrix}
 \boldsymbol{B}_{1} &  \boldsymbol{B}_{2}
\end{pmatrix}.
\tag{7}
$$
Relate the Schur complement $\boldsymbol{A}_{2,2} - \boldsymbol{A}_{2,1} \left(\boldsymbol{A}_{1, 1}\right)^{-1} \boldsymbol{A}_{1,2}$ to the Gram-matrix of the columns of $\boldsymbol{B}_2$, projected onto the orthogonal complement of the column space of $\boldsymbol{B}_1$.
Use this result to refine your comment in (d) on the relationship of Cholesky and QR factorization.

#### Solution to 3(e)

> The blocks of the Gram matrix are
>
> $$
> \begin{aligned}
> \boldsymbol{A}_{1,1}&=\boldsymbol{B}_1^*\boldsymbol{B}_1
> &\boldsymbol{A}_{1,2}&=\boldsymbol{B}_1^*\boldsymbol{B}_2\\
> \boldsymbol{A}_{2,1}&=\boldsymbol{B}_2^*\boldsymbol{B}_1
> &\boldsymbol{A}_{2,2}&=\boldsymbol{B}_2^*\boldsymbol{B}_2
> \end{aligned}
> $$
>
> Because $\boldsymbol{B}_1$ has full column rank, the orthogonal projector onto its column space is
>
> $$
> \boldsymbol{P}_1
> =\boldsymbol{B}_1(\boldsymbol{B}_1^*\boldsymbol{B}_1)^{-1}\boldsymbol{B}_1^*
> \qquad
> \boldsymbol{P}_1^*=\boldsymbol{P}_1
> \qquad
> \boldsymbol{P}_1^2=\boldsymbol{P}_1
> $$
>
> Let $\widehat{\boldsymbol{B}}_2=(\boldsymbol{I}-\boldsymbol{P}_1)\boldsymbol{B}_2$ be the projected columns. Since $\boldsymbol{I}-\boldsymbol{P}_1$ is also Hermitian and idempotent,
>
> $$
> \begin{aligned}
> \widehat{\boldsymbol{B}}_2^*\widehat{\boldsymbol{B}}_2
> &=\boldsymbol{B}_2^*(\boldsymbol{I}-\boldsymbol{P}_1)^*(\boldsymbol{I}-\boldsymbol{P}_1)\boldsymbol{B}_2\\
> &=\boldsymbol{B}_2^*(\boldsymbol{I}-\boldsymbol{P}_1)\boldsymbol{B}_2\\
> &=\boldsymbol{B}_2^*\boldsymbol{B}_2
>  -\boldsymbol{B}_2^*\boldsymbol{B}_1
>   (\boldsymbol{B}_1^*\boldsymbol{B}_1)^{-1}\boldsymbol{B}_1^*\boldsymbol{B}_2\\
> &=\boldsymbol{A}_{2,2}
>  -\boldsymbol{A}_{2,1}\boldsymbol{A}_{1,1}^{-1}\boldsymbol{A}_{1,2}
> \end{aligned}
> $$
>
> Thus the Schur complement is the Gram matrix of the columns of $\boldsymbol{B}_2$ after removing their projections onto $\operatorname{range}(\boldsymbol{B}_1)$. To connect this with part (d), partition the reduced QR factorization in the same way:
>
> $$
> \begin{pmatrix}\boldsymbol{B}_1&\boldsymbol{B}_2\end{pmatrix}
> =
> \begin{pmatrix}\boldsymbol{Q}_1&\boldsymbol{Q}_2\end{pmatrix}
> \begin{pmatrix}
> \boldsymbol{R}_{1,1}&\boldsymbol{R}_{1,2}\\
> \boldsymbol{0}&\boldsymbol{R}_{2,2}
> \end{pmatrix}
> $$
>
> The block equations give
>
> $$
> \begin{aligned}
> \boldsymbol{B}_1&=\boldsymbol{Q}_1\boldsymbol{R}_{1,1}\\
> \boldsymbol{B}_2&=\boldsymbol{Q}_1\boldsymbol{R}_{1,2}
>              +\boldsymbol{Q}_2\boldsymbol{R}_{2,2}
> \end{aligned}
> $$
>
> Here $\boldsymbol{P}_1=\boldsymbol{Q}_1\boldsymbol{Q}_1^*$ and $\boldsymbol{Q}_1^*\boldsymbol{Q}_2=\boldsymbol{0}$. Hence
>
> $$
> \widehat{\boldsymbol{B}}_2
> =(\boldsymbol{I}-\boldsymbol{Q}_1\boldsymbol{Q}_1^*)\boldsymbol{B}_2
> =\boldsymbol{Q}_2\boldsymbol{R}_{2,2}
> $$
>
> Taking its Gram matrix yields
>
> $$
> \boldsymbol{A}/\boldsymbol{A}_{1,1}
> =\widehat{\boldsymbol{B}}_2^*\widehat{\boldsymbol{B}}_2
> =\boldsymbol{R}_{2,2}^*\boldsymbol{R}_{2,2}
> $$
>
> Therefore $\boldsymbol{L}_{2,2}=\boldsymbol{R}_{2,2}^*$ under the positive-diagonal convention. Cholesky's trailing Schur-complement update corresponds exactly to Gram-Schmidt's projection step: the updated matrix stores the inner products of the remaining orthogonalized columns.
