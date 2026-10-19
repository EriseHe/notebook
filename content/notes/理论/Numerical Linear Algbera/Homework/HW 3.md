# Numerical Methods I, Homework 3

Schäfer, Fall 2026

Deadline: Oct. 19 Monday, 4:55 pm

- Submit your answers as a PDF file (report the results that you obtain using programming by using plots, tables, and a description of your implementation like you would when writing a paper.) Also submit your code in a zip file.
- Programming questions are posted in Julia. You are allowed to use basic library functions like sorting, plotting, matrix-vector products etc, but nothing that renders the problem itself trivial. Please use your common sense and ask the instructors if you are unsure.
  You should never add additional packages to the environment.
- Homework is due at the beginning of class. Deadlines are sharp.
- We recommend the use of LaTeX for typing up your solutions. No credit will be given to unreadable handwriting.

## 1 Schur Complements I [25 pts]

Consider the matrix

$$
\mathbf{M}
\coloneqq
\begin{pmatrix}
\mathbf{A} & \mathbf{B}\\
\mathbf{C} & \mathbf{D}
\end{pmatrix},
\tag{1}
$$

where $\mathbf{A} \in \mathbb{K}^{m \times m}$ and $\mathbf{D} \in \mathbb{K}^{n \times n}$ are square matrices and $\mathbf{A}$ is invertible.
The matrix $\mathbf{M}/\mathbf{A} \coloneqq \mathbf{D} - \mathbf{C} \mathbf{A}^{-1} \mathbf{B}$ is called the Schur complement of $\mathbf{A}$ in $\mathbf{M}$.

### (a) [5 pts]

Relate the Schur complement $\mathbf{M} / \mathbf{A}$ to the block LU factorization of $\mathbf{M}$.


#### Solution to 1(a)



### (b) [5 pts]

Show that the determinant of $\mathbf{M}$ is given by $\det\left(\mathbf{A}\right) \det\left(\mathbf{M} / \mathbf{A}\right)$.


#### Solution to 1(b)



### (c) [7.5 pts]

Let $\mathbf{M} = \mathbf{L} \mathbf{U}$ be the LU factorization of $\mathbf{M}$.
Split its factors into block matrices

$$
\mathbf{L} =
\begin{pmatrix}
\mathbf{L}_{1, 1} & \mathbf{0} \\
\mathbf{L}_{2, 1} & \mathbf{L}_{2, 2}
\end{pmatrix},
\quad
\mathbf{U} =
\begin{pmatrix}
\mathbf{U}_{1, 1} & \mathbf{U}_{1, 2} \\
\mathbf{0} & \mathbf{U}_{2, 2}
\end{pmatrix}
\tag{2}
$$

according to the same blocking as $\mathbf{M}$.
Show that $\mathbf{M} / \mathbf{A} = \mathbf{L}_{2, 2} \mathbf{U}_{2, 2}$.

#### Solution to 1(c)

Multiplying the blocks of $\mathbf{L}\mathbf{U}$ and comparing with $\mathbf{M}$ gives
$$
\begin{aligned}
\mathbf{A}&=\mathbf{L}_{1,1}\mathbf{U}_{1,1}\\
\mathbf{B}&=\mathbf{L}_{1,1}\mathbf{U}_{1,2}\\
\mathbf{C}&=\mathbf{L}_{2,1}\mathbf{U}_{1,1}\\
\mathbf{D}&=\mathbf{L}_{2,1}\mathbf{U}_{1,2}
           +\mathbf{L}_{2,2}\mathbf{U}_{2,2}
\end{aligned}
$$

Since we know that $\mathbf{A}$ is invertible, its square factors $\mathbf{L}_{1,1}$ and $\mathbf{U}_{1,1}$ are also invertible. Therefore
$$
\begin{aligned}
\mathbf{C}\mathbf{A}^{-1}\mathbf{B}
&=(\mathbf{L}_{2,1}\mathbf{U}_{1,1})
  (\mathbf{U}_{1,1}^{-1}\mathbf{L}_{1,1}^{-1})
  (\mathbf{L}_{1,1}\mathbf{U}_{1,2})\\
&=\mathbf{L}_{2,1}\mathbf{U}_{1,2}
\end{aligned}
$$

Subtracting this from $\mathbf{D}$ give us that
$$
\begin{aligned}
\mathbf{M}/\mathbf{A}
&=\mathbf{D}-\mathbf{C}\mathbf{A}^{-1}\mathbf{B}\\
&=\mathbf{L}_{2,1}\mathbf{U}_{1,2}
 +\mathbf{L}_{2,2}\mathbf{U}_{2,2}
 -\mathbf{L}_{2,1}\mathbf{U}_{1,2}\\
&=\boxed{\mathbf{L}_{2,2}\mathbf{U}_{2,2}}
\end{aligned}
$$


### (d) [7.5 pts]

Now consider the $3 \times 3$ block matrix

$$
\mathbf{N} =
\begin{pmatrix}
\mathbf{N}_{1, 1} & \mathbf{N}_{1, 2} & \mathbf{N}_{1, 3} \\
\mathbf{N}_{2, 1} & \mathbf{N}_{2, 2} & \mathbf{N}_{2, 3} \\
\mathbf{N}_{3, 1} & \mathbf{N}_{3, 2} & \mathbf{N}_{3, 3}
\end{pmatrix}.
\tag{3}
$$

Prove the *Quotient Property* of Schur complements

$$
\left(\mathbf{N} / \mathbf{N}_{1, 1}\right) / \left(\mathbf{N} / \mathbf{N}_{1, 1}\right)_{1, 1}
=
\mathbf{N} \Big /
\begin{pmatrix}
\mathbf{N}_{1, 1} & \mathbf{N}_{1, 2} \\
\mathbf{N}_{2, 1} & \mathbf{N}_{2, 2}
\end{pmatrix}.
\tag{4}
$$

Here, $\left(\mathbf{N} / \mathbf{N}_{1, 1}\right)_{1, 1}$ is the top left block of $\mathbf{N} / \mathbf{N}_{1, 1}$, and the blocks $\mathbf{N}_{1,1}$ and $\begin{pmatrix} \mathbf{N}_{1, 1} & \mathbf{N}_{1, 2} \\ \mathbf{N}_{2, 1} & \mathbf{N}_{2, 2} \end{pmatrix}$ are assumed to be invertible.


<!-- BEGIN SOLUTION 1(d) -->

#### Solution to 1(d)

Write

$$
\mathbf{S}\coloneqq\mathbf{N}/\mathbf{N}_{1,1}
=\begin{pmatrix}
\mathbf{S}_{1,1}&\mathbf{S}_{1,2}\\
\mathbf{S}_{2,1}&\mathbf{S}_{2,2}
\end{pmatrix}
$$

where the four blocks are

$$
\begin{aligned}
\mathbf{S}_{1,1}
&=\mathbf{N}_{2,2}-\mathbf{N}_{2,1}\mathbf{N}_{1,1}^{-1}\mathbf{N}_{1,2}\\
\mathbf{S}_{1,2}
&=\mathbf{N}_{2,3}-\mathbf{N}_{2,1}\mathbf{N}_{1,1}^{-1}\mathbf{N}_{1,3}\\
\mathbf{S}_{2,1}
&=\mathbf{N}_{3,2}-\mathbf{N}_{3,1}\mathbf{N}_{1,1}^{-1}\mathbf{N}_{1,2}\\
\mathbf{S}_{2,2}
&=\mathbf{N}_{3,3}-\mathbf{N}_{3,1}\mathbf{N}_{1,1}^{-1}\mathbf{N}_{1,3}
\end{aligned}
$$

Let $\mathbf{K}$ denote the leading two-by-two block matrix on the right-hand side of (4). By part (b),

$$
\det(\mathbf{K})
=\det(\mathbf{N}_{1,1})\det(\mathbf{S}_{1,1})
$$

The two assumed inverses therefore imply that $\mathbf{S}_{1,1}$ is invertible.

To evaluate the Schur complement with respect to $\mathbf{K}$, solve

$$
\mathbf{K}
\begin{pmatrix}\mathbf{X}\\\mathbf{Y}\end{pmatrix}
=\begin{pmatrix}\mathbf{N}_{1,3}\\\mathbf{N}_{2,3}\end{pmatrix}
$$

Elimination in this block system gives

$$
\begin{aligned}
\mathbf{X}
&=\mathbf{N}_{1,1}^{-1}
  (\mathbf{N}_{1,3}-\mathbf{N}_{1,2}\mathbf{Y})\\
\mathbf{S}_{1,1}\mathbf{Y}&=\mathbf{S}_{1,2}\\
\mathbf{Y}&=\mathbf{S}_{1,1}^{-1}\mathbf{S}_{1,2}
\end{aligned}
$$

Substitute these expressions into $\mathbf{N}/\mathbf{K}$:

$$
\begin{aligned}
\mathbf{N}/\mathbf{K}
&=\mathbf{N}_{3,3}
 -\mathbf{N}_{3,1}\mathbf{X}-\mathbf{N}_{3,2}\mathbf{Y}\\
&=\mathbf{N}_{3,3}
 -\mathbf{N}_{3,1}\mathbf{N}_{1,1}^{-1}\mathbf{N}_{1,3}\\
&\quad-\bigl(\mathbf{N}_{3,2}
 -\mathbf{N}_{3,1}\mathbf{N}_{1,1}^{-1}\mathbf{N}_{1,2}\bigr)
 \mathbf{S}_{1,1}^{-1}\mathbf{S}_{1,2}\\
&=\mathbf{S}_{2,2}
 -\mathbf{S}_{2,1}\mathbf{S}_{1,1}^{-1}\mathbf{S}_{1,2}\\
&=\mathbf{S}/\mathbf{S}_{1,1}
\end{aligned}
$$

Since $\mathbf{S}=\mathbf{N}/\mathbf{N}_{1,1}$, this is precisely the quotient property (4): successive elimination and elimination of the combined block give the same Schur complement.

<!-- END SOLUTION 1(d) -->

## 2 Schur Complements II [25 pts + 10 bonus]

Let $\mathbf{M}$ be as in the previous problem.

### (a) [5 pts]

Divide the inverse of $\mathbf{M}$ into blocks (of the same size as those of $\mathbf{M}$) as

$$
\mathbf{M}^{-1} =
\begin{pmatrix}
\boldsymbol{\alpha} & \boldsymbol{\beta} \\
\boldsymbol{\gamma} & \boldsymbol{\delta}
\end{pmatrix}.
\tag{5}
$$

Show that the Schur complement $\mathbf{M} / \mathbf{A}$ is the inverse of $\boldsymbol{\delta}$.


<!-- BEGIN SOLUTION 2(a) -->

#### Solution to 2(a)

Write $\mathbf{S}=\mathbf{M}/\mathbf{A}$. Since $\mathbf{M}$ and $\mathbf{A}$ are invertible, Question 1(b) implies that $\mathbf{S}$ is invertible. Invert the block LU factors from Question 1(a) in reverse order:

$$
\mathbf{M}^{-1}
=
\begin{pmatrix}
\mathbf{A}^{-1}&-\mathbf{A}^{-1}\mathbf{B}\mathbf{S}^{-1}\\
\mathbf{0}&\mathbf{S}^{-1}
\end{pmatrix}
\begin{pmatrix}
\mathbf{I}_m&\mathbf{0}\\
-\mathbf{C}\mathbf{A}^{-1}&\mathbf{I}_n
\end{pmatrix}
$$

The lower-right block of this product is $\mathbf{S}^{-1}$. Comparing with (5),

$$
\boldsymbol{\delta}=\mathbf{S}^{-1}
\quad\Longrightarrow\quad
\boxed{\mathbf{M}/\mathbf{A}=\boldsymbol{\delta}^{-1}}
$$

<!-- END SOLUTION 2(a) -->

### (b) [5 pts]

For $\mathbf{M}$ symmetric positive definite (symmetric meaning Hermitian in the complex case), show that if $\lambda$ is an eigenvalue of $\mathbf{M} / \mathbf{A}$, then $\lambda_{\min}\left(\mathbf{M} \right) \leq \lambda \leq \lambda_{\max}\left(\mathbf{M}\right)$.


<!-- BEGIN SOLUTION 2(b) -->

#### Solution to 2(b)

Because $\mathbf{M}$ is Hermitian positive definite, so is $\mathbf{M}^{-1}$. Its lower-right principal block $\boldsymbol{\delta}$ is positive definite, since for $\boldsymbol{y}\ne\boldsymbol{0}$,

$$
\boldsymbol{y}^*\boldsymbol{\delta}\boldsymbol{y}
=
\begin{pmatrix}\boldsymbol{0}\\\boldsymbol{y}\end{pmatrix}^*
\mathbf{M}^{-1}
\begin{pmatrix}\boldsymbol{0}\\\boldsymbol{y}\end{pmatrix}>0
$$

Thus $\mathbf{S}=\mathbf{M}/\mathbf{A}=\boldsymbol{\delta}^{-1}$ is also Hermitian positive definite.

The eigendecomposition used in Lecture 8 gives, for every vector $\boldsymbol{z}$,

$$
\frac{\|\boldsymbol{z}\|_2^2}{\lambda_{\max}(\mathbf{M})}
\le \boldsymbol{z}^*\mathbf{M}^{-1}\boldsymbol{z}
\le \frac{\|\boldsymbol{z}\|_2^2}{\lambda_{\min}(\mathbf{M})}
$$

Indeed, in an orthonormal eigenbasis, the quadratic form is a sum of squared coordinate magnitudes weighted by the eigenvalues $1/\lambda_j(\mathbf{M})$.

Now take an eigenvector $\boldsymbol{y}\ne\boldsymbol{0}$ with $\mathbf{S}\boldsymbol{y}=\lambda\boldsymbol{y}$. Then $\boldsymbol{\delta}\boldsymbol{y}=\lambda^{-1}\boldsymbol{y}$. Applying the preceding bound to $\boldsymbol{z}=(\boldsymbol{0},\boldsymbol{y})^T$ yields

$$
\frac{\|\boldsymbol{y}\|_2^2}{\lambda_{\max}(\mathbf{M})}
\le \frac{\|\boldsymbol{y}\|_2^2}{\lambda}
\le \frac{\|\boldsymbol{y}\|_2^2}{\lambda_{\min}(\mathbf{M})}
$$

Divide by $\|\boldsymbol{y}\|_2^2$ and take reciprocals, reversing the inequalities:

$$
\boxed{\lambda_{\min}(\mathbf{M})
\le\lambda\le\lambda_{\max}(\mathbf{M})}
$$

<!-- END SOLUTION 2(b) -->

### (c) [7.5 pts]

Show that the size of the pivots occurring in the Cholesky or LU factorization of a s.p.d. matrix $\mathbf{M}$ is lower bounded by $\left\|\mathbf{M}^{-1}\right\|^{-1}$, where $\|\cdot\|$ denotes the spectral norm.


<!-- BEGIN SOLUTION 2(c) -->

#### Solution to 2(c)

As in Lecture 9, a pivot is the diagonal entry of the active matrix **before** taking a square root. After eliminating the first $k-1$ variables, the active matrix is

$$
\mathbf{S}^{(k-1)}
=\mathbf{M}/\mathbf{M}_{1:k-1,\,1:k-1}
\qquad (k\ge2)
$$

The next pivot is $p_k=(\mathbf{S}^{(k-1)})_{1,1}$. The leading principal block is positive definite, so this Schur complement exists. By part (b) and the quadratic-form bound,

$$
\begin{aligned}
p_k
&=\boldsymbol{e}_1^*\mathbf{S}^{(k-1)}\boldsymbol{e}_1\\
&\ge\lambda_{\min}(\mathbf{S}^{(k-1)})\\
&\ge\lambda_{\min}(\mathbf{M})
\end{aligned}
$$

For the first pivot, the same bound follows directly from $p_1=\boldsymbol{e}_1^*\mathbf{M}\boldsymbol{e}_1$. Since $\mathbf{M}$ is positive definite,

$$
\|\mathbf{M}^{-1}\|_2
=\frac{1}{\lambda_{\min}(\mathbf{M})}
$$

Therefore every elimination pivot satisfies

$$
\boxed{p_k\ge\|\mathbf{M}^{-1}\|_2^{-1}}
$$

In unit-lower-triangular LU, $p_k=U_{k,k}$. In Cholesky, $p_k=L_{k,k}^2$, so the factor's positive diagonal entries satisfy $L_{k,k}\ge\|\mathbf{M}^{-1}\|_2^{-1/2}$.

<!-- END SOLUTION 2(c) -->

### (d) [7.5 pts]

For $\mathbf{M}$ s.p.d, show that

$$
\boldsymbol{y}^* \left(\mathbf{M} / \mathbf{A}\right) \boldsymbol{y} = \min \limits_{\boldsymbol{x} \in \mathbb{K}^{m}}
\begin{pmatrix}
\boldsymbol{x}\\
\boldsymbol{y}
\end{pmatrix}^*
\mathbf{M}
\begin{pmatrix}
\boldsymbol{x}\\
\boldsymbol{y}
\end{pmatrix}.
\tag{6}
$$


<!-- BEGIN SOLUTION 2(d) -->

#### Solution to 2(d)

Hermitian symmetry gives $\mathbf{C}=\mathbf{B}^*$ and $(\mathbf{A}^{-1})^*=\mathbf{A}^{-1}$. Expand and complete the square:

$$
\begin{aligned}
\begin{pmatrix}\boldsymbol{x}\\\boldsymbol{y}\end{pmatrix}^*
\mathbf{M}
\begin{pmatrix}\boldsymbol{x}\\\boldsymbol{y}\end{pmatrix}
&=\boldsymbol{x}^*\mathbf{A}\boldsymbol{x}
 +\boldsymbol{x}^*\mathbf{B}\boldsymbol{y}
 +\boldsymbol{y}^*\mathbf{B}^*\boldsymbol{x}
 +\boldsymbol{y}^*\mathbf{D}\boldsymbol{y}\\
&=(\boldsymbol{x}+\mathbf{A}^{-1}\mathbf{B}\boldsymbol{y})^*
 \mathbf{A}
 (\boldsymbol{x}+\mathbf{A}^{-1}\mathbf{B}\boldsymbol{y})\\
&\quad+\boldsymbol{y}^*
 (\mathbf{D}-\mathbf{B}^*\mathbf{A}^{-1}\mathbf{B})
 \boldsymbol{y}
\end{aligned}
$$

Since $\mathbf{A}$ is positive definite, the first term is nonnegative and vanishes exactly at

$$
\boldsymbol{x}=-\mathbf{A}^{-1}\mathbf{B}\boldsymbol{y}
$$

The second term is $\boldsymbol{y}^*(\mathbf{M}/\mathbf{A})\boldsymbol{y}$. Consequently,

$$
\boxed{
\min_{\boldsymbol{x}\in\mathbb{K}^m}
\begin{pmatrix}\boldsymbol{x}\\\boldsymbol{y}\end{pmatrix}^*
\mathbf{M}
\begin{pmatrix}\boldsymbol{x}\\\boldsymbol{y}\end{pmatrix}
=\boldsymbol{y}^*(\mathbf{M}/\mathbf{A})\boldsymbol{y}
}
$$

<!-- END SOLUTION 2(d) -->

### (e) [10 bonus pts]

By replacing the $\min$ with a $\min \max$ over suitable variables, derive a version of the results of (d) that is valid for general $\mathbf{M}$.


<!-- BEGIN SOLUTION 2(e) -->

#### Solution to 2(e)

Introduce an independent vector $\boldsymbol{z}\in\mathbb{K}^m$ in the left argument and define

$$
\begin{aligned}
F(\boldsymbol{x},\boldsymbol{z})
&=\begin{pmatrix}\boldsymbol{z}\\\boldsymbol{y}\end{pmatrix}^*
\mathbf{M}
\begin{pmatrix}\boldsymbol{x}\\\boldsymbol{y}\end{pmatrix}\\
&=\boldsymbol{z}^*(\mathbf{A}\boldsymbol{x}+\mathbf{B}\boldsymbol{y})
 +\boldsymbol{y}^*(\mathbf{C}\boldsymbol{x}+\mathbf{D}\boldsymbol{y})
\end{aligned}
$$

First let $\mathbb{K}=\mathbb{R}$. For fixed $\boldsymbol{x}$, write $\boldsymbol{r}=\mathbf{A}\boldsymbol{x}+\mathbf{B}\boldsymbol{y}$. If $\boldsymbol{r}\ne\boldsymbol{0}$, choosing $\boldsymbol{z}=t\boldsymbol{r}$ and letting $t\to+\infty$ makes $F$ tend to $+\infty$. If $\boldsymbol{r}=\boldsymbol{0}$, the expression is independent of $\boldsymbol{z}$. Thus

$$
\sup_{\boldsymbol{z}}F(\boldsymbol{x},\boldsymbol{z})
=\begin{cases}
\boldsymbol{y}^*(\mathbf{C}\boldsymbol{x}+\mathbf{D}\boldsymbol{y})
&\mathbf{A}\boldsymbol{x}+\mathbf{B}\boldsymbol{y}=\boldsymbol{0}\\
+\infty&\text{otherwise}
\end{cases}
$$

Since $\mathbf{A}$ is invertible, the only finite case is $\boldsymbol{x}=-\mathbf{A}^{-1}\mathbf{B}\boldsymbol{y}$. Substitution gives the general real-matrix version:

$$
\boxed{
\boldsymbol{y}^*(\mathbf{M}/\mathbf{A})\boldsymbol{y}
=\min_{\boldsymbol{x}\in\mathbb{R}^m}
 \sup_{\boldsymbol{z}\in\mathbb{R}^m}
 F(\boldsymbol{x},\boldsymbol{z})
}
$$

The supremum allows the value $+\infty$ away from the constraint; at the minimizing $\boldsymbol{x}$, every $\boldsymbol{z}$ attains the inner maximum. Neither symmetry nor positive definiteness is required.

For a general **complex** matrix, the scalar on the left may be complex, so apply minimization and maximization to its real and imaginary parts:

$$
\begin{aligned}
\operatorname{Re}\!\left(\boldsymbol{y}^*(\mathbf{M}/\mathbf{A})\boldsymbol{y}\right)
&=\min_{\boldsymbol{x}\in\mathbb{C}^m}
  \sup_{\boldsymbol{z}\in\mathbb{C}^m}
  \operatorname{Re}F(\boldsymbol{x},\boldsymbol{z})\\
\operatorname{Im}\!\left(\boldsymbol{y}^*(\mathbf{M}/\mathbf{A})\boldsymbol{y}\right)
&=\min_{\boldsymbol{x}\in\mathbb{C}^m}
  \sup_{\boldsymbol{z}\in\mathbb{C}^m}
  \operatorname{Im}F(\boldsymbol{x},\boldsymbol{z})
\end{aligned}
$$

The same proof uses $\boldsymbol{z}=t\boldsymbol{r}$ for the real part and $\boldsymbol{z}=-it\boldsymbol{r}$ for the imaginary part. For Hermitian $\mathbf{M}$, the Schur-complement quadratic form is real, so the first identity alone gives its value.

<!-- END SOLUTION 2(e) -->

## 3 Cholesky and QR [25 pts]

### (a) [5 pts]

Assume that the invertible matrix $\mathbf{A} \in \mathbb{K}^{m \times m}$ satisfies $\mathbf{A} = \mathbf{L} \mathbf{U}$.
Derive a way to write $\mathbf{A}$ as the sum of rank-one matrices in outer product form.


<!-- BEGIN SOLUTION 3(a) -->

#### Solution to 3(a)

Insert $\mathbf{I}=\sum_{k=1}^m\boldsymbol{e}_k\boldsymbol{e}_k^*$ between the factors:

$$
\begin{aligned}
\mathbf{A}
&=\mathbf{L}\mathbf{U}\\
&=\sum_{k=1}^m
  (\mathbf{L}\boldsymbol{e}_k)(\boldsymbol{e}_k^*\mathbf{U})\\
&=\boxed{\sum_{k=1}^m\mathbf{L}_{:,k}\mathbf{U}_{k,:}}
\end{aligned}
$$

Each summand is the outer product of column $k$ of $\mathbf{L}$ and row $k$ of $\mathbf{U}$. Equivalently, set $\boldsymbol{\ell}_k=\mathbf{L}\boldsymbol{e}_k$ and $\boldsymbol{u}_k=\mathbf{U}^*\boldsymbol{e}_k$ to obtain $\mathbf{A}=\sum_k\boldsymbol{\ell}_k\boldsymbol{u}_k^*$. Both factors are invertible, so these vectors are nonzero and every summand has rank one.

<!-- END SOLUTION 3(a) -->

### (b) [5 pts]

Show that the LU factorization of an invertible matrix $\mathbf{A} \in \mathbb{K}^{m \times m}$, with $\mathbf{L}$ unit lower triangular, is unique (when it exists).


<!-- BEGIN SOLUTION 3(b) -->

#### Solution to 3(b)

Suppose there are two such factorizations:

$$
\mathbf{A}=\mathbf{L}\mathbf{U}
=\widetilde{\mathbf{L}}\widetilde{\mathbf{U}}
$$

All factors are invertible because $\mathbf{A}$ is invertible. Rearranging gives

$$
\mathbf{L}^{-1}\widetilde{\mathbf{L}}
=\mathbf{U}\widetilde{\mathbf{U}}^{-1}
$$

The left-hand side is unit lower triangular; the right-hand side is upper triangular. Their common value is therefore diagonal, and its diagonal entries are all $1$. Hence

$$
\mathbf{L}^{-1}\widetilde{\mathbf{L}}=\mathbf{I}
\quad\Longrightarrow\quad
\boxed{\widetilde{\mathbf{L}}=\mathbf{L}
\qquad\widetilde{\mathbf{U}}=\mathbf{U}}
$$

<!-- END SOLUTION 3(b) -->

### (c) [5 pts]

Assume that we factor $\mathbf{A} \in \mathbb{K}^{m \times m}$ as $\mathbf{A} = \mathbf{L} \mathbf{L}^{*}$ for lower triangular $\mathbf{L}$.
Up to which choices is this factorization unique?
Prove your results (as always) and make sure to treat the case $\mathbb{K} = \mathbb{C}$.


<!-- BEGIN SOLUTION 3(c) -->

#### Solution to 3(c)

**Nonsingular case.** If $\mathbf{A}$ is invertible, then every $L_{k,k}\ne0$. Define

$$
\mathbf{D}=\operatorname{diag}(L_{1,1},\ldots,L_{m,m})
$$

Normalize the lower factor to obtain a unit-lower-triangular LU factorization:

$$
\mathbf{A}
=\underbrace{(\mathbf{L}\mathbf{D}^{-1})}_{\text{unit lower triangular}}
 \underbrace{(\mathbf{D}\mathbf{L}^*)}_{\text{upper triangular}}
$$

By part (b), these two normalized factors are unique. Moreover,

$$
(\mathbf{D}\mathbf{L}^*)_{k,k}=|L_{k,k}|^2
$$

so the magnitudes of the diagonal entries of $\mathbf{L}$ are fixed.

For another factor $\widetilde{\mathbf{L}}$, let $\widetilde{\mathbf{D}}$ contain its diagonal entries. Uniqueness of the normalized lower factor gives

$$
\begin{aligned}
\mathbf{L}\mathbf{D}^{-1}
&=\widetilde{\mathbf{L}}\widetilde{\mathbf{D}}^{-1}\\
\widetilde{\mathbf{L}}
&=\mathbf{L}\mathbf{D}^{-1}\widetilde{\mathbf{D}}\\
&=\mathbf{L}\operatorname{diag}(\omega_1,\ldots,\omega_m)
\end{aligned}
$$

Here $\omega_k=\widetilde L_{k,k}/L_{k,k}$ and $|\omega_k|=1$. Conversely, multiplying columns by such scalars preserves the factorization, since

$$
\begin{aligned}
\mathbf{W}&=\operatorname{diag}(\omega_1,\ldots,\omega_m)\\
(\mathbf{L}\mathbf{W})(\mathbf{L}\mathbf{W})^*
&=\mathbf{L}\mathbf{W}\mathbf{W}^*\mathbf{L}^*
=\mathbf{L}\mathbf{L}^*
\end{aligned}
$$

Thus the factor is unique up to **independent column signs** over $\mathbb{R}$ and **independent column phases** $\omega_k=e^{i\theta_k}$ over $\mathbb{C}$. Requiring every $L_{k,k}$ to be positive real removes this freedom and gives the unique Cholesky factor.

**If $\mathbf{A}$ is singular**, uniqueness up to column phases need not hold. For example,

$$
\mathbf{A}=\begin{pmatrix}0&0\\0&1\end{pmatrix}
\qquad
\mathbf{L}=\begin{pmatrix}0&0\\0&1\end{pmatrix}
\qquad
\widetilde{\mathbf{L}}=\begin{pmatrix}0&0\\1&0\end{pmatrix}
$$

Both lower-triangular factors satisfy $\mathbf{L}\mathbf{L}^*=\widetilde{\mathbf{L}}\widetilde{\mathbf{L}}^*=\mathbf{A}$, but column phases cannot move a nonzero entry from one column to another. The sign/phase uniqueness conclusion therefore requires nonsingularity.

<!-- END SOLUTION 3(c) -->

### (d) [5 pts]

Using these results, prove and explain the relationship between the Cholesky factor of $\mathbf{B}^* \mathbf{B}$ and the QR factorization of $\mathbf{B}$, for $\mathbf{B} \in \mathbb{K}^{m \times n}$ with $m \geq n$ and full column rank.


<!-- BEGIN SOLUTION 3(d) -->

#### Solution to 3(d)

Since $\mathbf{B}$ has full column rank, $\mathbf{B}^*\mathbf{B}$ is positive definite:

$$
\boldsymbol{x}^*\mathbf{B}^*\mathbf{B}\boldsymbol{x}
=\|\mathbf{B}\boldsymbol{x}\|_2^2>0
\qquad(\boldsymbol{x}\ne\boldsymbol{0})
$$

Take the reduced QR factorization $\mathbf{B}=\mathbf{Q}\mathbf{R}$ with $\mathbf{Q}^*\mathbf{Q}=\mathbf{I}_n$ and positive real diagonal entries in $\mathbf{R}$. Then

$$
\begin{aligned}
\mathbf{B}^*\mathbf{B}
&=(\mathbf{Q}\mathbf{R})^*(\mathbf{Q}\mathbf{R})\\
&=\mathbf{R}^*\mathbf{Q}^*\mathbf{Q}\mathbf{R}\\
&=\mathbf{R}^*\mathbf{R}
\end{aligned}
$$

The matrix $\mathbf{R}^*$ is lower triangular with positive real diagonal. By part (c), it is the unique lower Cholesky factor:

$$
\boxed{\mathbf{L}=\mathbf{R}^*}
$$

Conversely, given $\mathbf{B}^*\mathbf{B}=\mathbf{L}\mathbf{L}^*$, set $\mathbf{R}=\mathbf{L}^*$ and $\mathbf{Q}=\mathbf{B}\mathbf{R}^{-1}$. Then $\mathbf{B}=\mathbf{Q}\mathbf{R}$ and

$$
\begin{aligned}
\mathbf{Q}^*\mathbf{Q}
&=(\mathbf{R}^{-1})^*\mathbf{B}^*\mathbf{B}\mathbf{R}^{-1}\\
&=(\mathbf{R}^*)^{-1}\mathbf{R}^*\mathbf{R}\mathbf{R}^{-1}\\
&=\mathbf{I}_n
\end{aligned}
$$

Thus the upper Cholesky factor of the Gram matrix is exactly the triangular factor in reduced QR, with the same positive-diagonal convention.

<!-- END SOLUTION 3(d) -->

### (e) [5 pts]

For $\mathbf{A} = \mathbf{B}^* \mathbf{B}$ and $\mathbf{B}$ as in (d), write

$$
\mathbf{A} =
\begin{pmatrix}
\mathbf{A}_{1,1}& \mathbf{A}_{1,2} \\
\mathbf{A}_{2,1}& \mathbf{A}_{2,2}
\end{pmatrix},
\quad
\mathbf{B} =
\begin{pmatrix}
\mathbf{B}_{1} &  \mathbf{B}_{2}
\end{pmatrix}.
\tag{7}
$$

Relate the Schur complement $\mathbf{A}_{2,2} - \mathbf{A}_{2,1} \left(\mathbf{A}_{1, 1}\right)^{-1} \mathbf{A}_{1,2}$ to the Gram-matrix of the columns of $\mathbf{B}_2$, projected onto the orthogonal complement of the column space of $\mathbf{B}_1$.
Use this result to refine your comment in (d) on the relationship of Cholesky and QR factorization.


<!-- BEGIN SOLUTION 3(e) -->

#### Solution to 3(e)

The blocks of the Gram matrix are

$$
\begin{aligned}
\mathbf{A}_{1,1}&=\mathbf{B}_1^*\mathbf{B}_1
&\mathbf{A}_{1,2}&=\mathbf{B}_1^*\mathbf{B}_2\\
\mathbf{A}_{2,1}&=\mathbf{B}_2^*\mathbf{B}_1
&\mathbf{A}_{2,2}&=\mathbf{B}_2^*\mathbf{B}_2
\end{aligned}
$$

Because $\mathbf{B}_1$ has full column rank, the orthogonal projector onto its column space is

$$
\mathbf{P}_1
=\mathbf{B}_1(\mathbf{B}_1^*\mathbf{B}_1)^{-1}\mathbf{B}_1^*
\qquad
\mathbf{P}_1^*=\mathbf{P}_1
\qquad
\mathbf{P}_1^2=\mathbf{P}_1
$$

Let $\widehat{\mathbf{B}}_2=(\mathbf{I}-\mathbf{P}_1)\mathbf{B}_2$ be the projected columns. Since $\mathbf{I}-\mathbf{P}_1$ is also Hermitian and idempotent,

$$
\begin{aligned}
\widehat{\mathbf{B}}_2^*\widehat{\mathbf{B}}_2
&=\mathbf{B}_2^*(\mathbf{I}-\mathbf{P}_1)^*(\mathbf{I}-\mathbf{P}_1)\mathbf{B}_2\\
&=\mathbf{B}_2^*(\mathbf{I}-\mathbf{P}_1)\mathbf{B}_2\\
&=\mathbf{B}_2^*\mathbf{B}_2
 -\mathbf{B}_2^*\mathbf{B}_1
  (\mathbf{B}_1^*\mathbf{B}_1)^{-1}\mathbf{B}_1^*\mathbf{B}_2\\
&=\boxed{\mathbf{A}_{2,2}
 -\mathbf{A}_{2,1}\mathbf{A}_{1,1}^{-1}\mathbf{A}_{1,2}}
\end{aligned}
$$

Thus the Schur complement is the Gram matrix of the columns of $\mathbf{B}_2$ after removing their projections onto $\operatorname{range}(\mathbf{B}_1)$.

To connect this with part (d), partition the reduced QR factorization in the same way:

$$
\begin{pmatrix}\mathbf{B}_1&\mathbf{B}_2\end{pmatrix}
=
\begin{pmatrix}\mathbf{Q}_1&\mathbf{Q}_2\end{pmatrix}
\begin{pmatrix}
\mathbf{R}_{1,1}&\mathbf{R}_{1,2}\\
\mathbf{0}&\mathbf{R}_{2,2}
\end{pmatrix}
$$

The block equations give

$$
\begin{aligned}
\mathbf{B}_1&=\mathbf{Q}_1\mathbf{R}_{1,1}\\
\mathbf{B}_2&=\mathbf{Q}_1\mathbf{R}_{1,2}
             +\mathbf{Q}_2\mathbf{R}_{2,2}
\end{aligned}
$$

Here $\mathbf{P}_1=\mathbf{Q}_1\mathbf{Q}_1^*$ and $\mathbf{Q}_1^*\mathbf{Q}_2=\mathbf{0}$. Hence

$$
\widehat{\mathbf{B}}_2
=(\mathbf{I}-\mathbf{Q}_1\mathbf{Q}_1^*)\mathbf{B}_2
=\mathbf{Q}_2\mathbf{R}_{2,2}
$$

Taking its Gram matrix yields

$$
\boxed{
\mathbf{A}/\mathbf{A}_{1,1}
=\widehat{\mathbf{B}}_2^*\widehat{\mathbf{B}}_2
=\mathbf{R}_{2,2}^*\mathbf{R}_{2,2}
}
$$

Therefore $\mathbf{L}_{2,2}=\mathbf{R}_{2,2}^*$ under the positive-diagonal convention. Cholesky's trailing Schur-complement update corresponds exactly to Gram–Schmidt's projection step: the updated matrix stores the inner products of the remaining orthogonalized columns.

<!-- END SOLUTION 3(e) -->

## 4 QRs [25 pts]

### (a) [5 pts]

Go to section (a) of the file `HW3_your_code.jl` and implement a function that uses the classical Gram-Schmidt algorithm for computing a reduced QR factorization.

### (b) [5 pts]

Go to section (b) of the file `HW3_your_code.jl` and implement a function that uses the modified Gram-Schmidt algorithm for computing a reduced QR factorization.

### (c) [5 pts]

Go to section (c) of the file `HW3_your_code.jl` and implement a function that computes the QR factorization using Householder reflections.
Your algorithm should operate in place, overwriting the input matrix and not allocating additional memory.

### (d) [5 pts]

Go to section (d) of the file `HW3_your_code.jl` and implement functions that use the QR factorization matrix computed in (c) to multiply a vector with $\mathbf{Q} \mathbf{R}$ (multiplication) or with $\mathbf{R}^{-1}\mathbf{Q}^*$ (solving the overdetermined least squares problem).
Your functions should take a preallocated output vector as input in which to store the result.
No additional allocation should be performed; the least squares solver may overwrite its right-hand side.

### (e) [5 pts]

Using what you learned in class, design an experiment that compares the numerical stability of the different methods.
For instance, compute the accuracy of the different approaches over matrices of increasing size or condition number and provide a plot of your results.
Use what you learned in class to make sure that you include examples highlighting the lack of stability of classical Gram-Schmidt.
