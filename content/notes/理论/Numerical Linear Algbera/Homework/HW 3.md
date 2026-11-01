# Numerical Methods I, Homework 3

Schäfer, Fall 2026

Deadline: Oct. 19 Monday, 4:55 pm

Submitted solutions are unchanged. Each added study block expands the derivation and cites its lecture prerequisites.

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



<!-- End submitted solution; added study explanation follows. -->

> **Derivation details — added study explanation.**
>
> The block-LU construction is in [Lecture 9 §9.9](<../9. Cholesky Factorization and Schur Complements.md#the-block-inverse-identity>), following [block elimination in §9.8](<../9. Cholesky Factorization and Schur Complements.md#block-cholesky-and-schur-complements>). Set $S=D-CA^{-1}B$. The four blocks of the product are
>
> $$
> \begin{aligned}
> (EM)_{11}&=I_mA+0C=A,\\
> (EM)_{12}&=I_mB+0D=B,\\
> (EM)_{21}&=(-CA^{-1})A+I_nC=-C+C=0,\\
> (EM)_{22}&=(-CA^{-1})B+I_nD=S.
> \end{aligned}
> $$
>
> To invert $E$, check both products:
>
> $$
> \begin{aligned}
> E&=\begin{pmatrix}I&0\\-CA^{-1}&I\end{pmatrix},
> &F&=\begin{pmatrix}I&0\\CA^{-1}&I\end{pmatrix},\\
> EF&=\begin{pmatrix}I&0\\-CA^{-1}+CA^{-1}&I\end{pmatrix}=I,
> &FE&=I,\\
> M&=E^{-1}(EM)
> =\begin{pmatrix}I&0\\CA^{-1}&I\end{pmatrix}
>  \begin{pmatrix}A&B\\0&S\end{pmatrix}.
> \end{aligned}
> $$
>
> Only $A$ must be invertible; $M$ and $S$ may be singular here.


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



<!-- End submitted solution; added study explanation follows. -->

> **Derivation details — added study explanation.**
>
> The determinant calculation for triangular LU factors appears in [Lecture 3 §3.7](<../3. LU Factorization and Zero Pivots.md#zero-pivots>); the block factors are from [Lecture 9 §9.9](<../9. Cholesky Factorization and Schur Complements.md#the-block-inverse-identity>). Write the factors in 1(a) as $\mathcal L,\mathcal U$. Then
>
> $$
> \begin{aligned}
> \det M&=\det(\mathcal L\mathcal U)
>        =\det\mathcal L\,\det\mathcal U,\\
> \det\mathcal L&=\prod_{i=1}^{m+n}\mathcal L_{ii}=1,\\
> \det\mathcal U&=\det\begin{pmatrix}A&B\\0&S\end{pmatrix}
>                 =\det A\,\det S,\\
> \det M&=1\cdot\det A\,\det S.
> \end{aligned}
> $$
>
> For the block determinant step, a nonzero term in the determinant's permutation expansion must assign the last $n$ rows to the last $n$ columns: entries in their first $m$ columns are zero. The first $m$ rows then use the first $m$ columns. The two permutation sums are exactly $\det A$ and $\det S$; the block $B$ contributes no term. This also covers singular $S$.


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



<!-- End submitted solution; added study explanation follows. -->

> **Derivation details — added study explanation.**
>
> Use [Lecture 9 §9.8's block multiplication](<../9. Cholesky Factorization and Schur Complements.md#block-cholesky-and-schur-complements>) with general LU factors. From $A=L_{11}U_{11}$ and $\det A\ne0$,
>
> $$
> \begin{aligned}
> 0\ne\det A&=\det L_{11}\det U_{11},\\
> A^{-1}&=U_{11}^{-1}L_{11}^{-1},\\
> A(U_{11}^{-1}L_{11}^{-1})
> &=L_{11}(U_{11}U_{11}^{-1})L_{11}^{-1}=I.
> \end{aligned}
> $$
>
> Substitute the four block equations, retaining the order of multiplication:
>
> $$
> \begin{aligned}
> CA^{-1}B
> &=L_{21}U_{11}U_{11}^{-1}L_{11}^{-1}L_{11}U_{12}\\
> &=L_{21}(U_{11}U_{11}^{-1})(L_{11}^{-1}L_{11})U_{12}\\
> &=L_{21}U_{12},\\
> M/A&=D-CA^{-1}B\\
> &=(L_{21}U_{12}+L_{22}U_{22})-L_{21}U_{12}\\
> &=L_{22}U_{22}.
> \end{aligned}
> $$
>
> No inverse of $L_{22}$ or $U_{22}$ is used.


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



<!-- End submitted solution; added study explanation follows. -->

> **Derivation details — added study explanation.**
>
> This quotient identity is a homework derivation from the [Schur-complement definition in Lecture 9 §9.8](<../9. Cholesky Factorization and Schur Complements.md#block-cholesky-and-schur-complements>), not an additional cited lecture theorem. Use $S_{ij}$ and $K$ defined above. Part 1(b) gives
>
> $$
> \begin{aligned}
> \det K&=\det N_{11}\det S_{11},\\
> \det K\ne0,\quad\det N_{11}\ne0
> &\Longrightarrow\det S_{11}\ne0.
> \end{aligned}
> $$
>
> Expand the block system for $K^{-1}(N_{13},N_{23})^T$:
>
> $$
> \begin{aligned}
> N_{11}X+N_{12}Y&=N_{13},\\
> N_{21}X+N_{22}Y&=N_{23},\\
> X&=N_{11}^{-1}N_{13}-N_{11}^{-1}N_{12}Y,\\
> N_{21}N_{11}^{-1}N_{13}
> -N_{21}N_{11}^{-1}N_{12}Y+N_{22}Y&=N_{23},\\
> (N_{22}-N_{21}N_{11}^{-1}N_{12})Y
> &=N_{23}-N_{21}N_{11}^{-1}N_{13},\\
> S_{11}Y&=S_{12},\qquad Y=S_{11}^{-1}S_{12}.
> \end{aligned}
> $$
>
> Now eliminate $X$ before grouping the remaining terms:
>
> $$
> \begin{aligned}
> N/K&=N_{33}-(N_{31},N_{32})K^{-1}
>                  \begin{pmatrix}N_{13}\\N_{23}\end{pmatrix}\\
> &=N_{33}-N_{31}X-N_{32}Y\\
> &=N_{33}-N_{31}N_{11}^{-1}N_{13}
>   +N_{31}N_{11}^{-1}N_{12}Y-N_{32}Y\\
> &=(N_{33}-N_{31}N_{11}^{-1}N_{13})
>  -(N_{32}-N_{31}N_{11}^{-1}N_{12})Y\\
> &=S_{22}-S_{21}S_{11}^{-1}S_{12}
>  =(N/N_{11})/S_{11}.
> \end{aligned}
> $$


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



<!-- End submitted solution; added study explanation follows. -->

> **Derivation details — added study explanation.**
>
> This is the [block-inverse lemma, Lecture 9 §9.9](<../9. Cholesky Factorization and Schur Complements.md#the-block-inverse-identity>). Here both $M$ and $A$ must be invertible. By 1(b), $\det S=\det M/\det A\ne0$. For $\mathcal U=\begin{pmatrix}A&B\\0&S\end{pmatrix}$, solve $\mathcal U\mathcal U^{-1}=I$ block by block:
>
> $$
> \begin{aligned}
> \mathcal U^{-1}&=\begin{pmatrix}X&Y\\Z&W\end{pmatrix},\\
> SZ=0&\Longrightarrow Z=0,\\
> SW=I&\Longrightarrow W=S^{-1},\\
> AX+BZ=I&\Longrightarrow X=A^{-1},\\
> AY+BW=0&\Longrightarrow Y=-A^{-1}BS^{-1}.
> \end{aligned}
> $$
>
> Multiplication by $\mathcal L^{-1}$ now gives the whole inverse:
>
> $$
> \begin{aligned}
> M^{-1}
> &=\begin{pmatrix}A^{-1}&-A^{-1}BS^{-1}\\0&S^{-1}\end{pmatrix}
>   \begin{pmatrix}I&0\\-CA^{-1}&I\end{pmatrix}\\
> &=\begin{pmatrix}
> A^{-1}+A^{-1}BS^{-1}CA^{-1}&-A^{-1}BS^{-1}\\
> -S^{-1}CA^{-1}&S^{-1}
> \end{pmatrix},\\
> \delta&=S^{-1}\Longrightarrow\delta^{-1}=S=M/A.
> \end{aligned}
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



<!-- End submitted solution; added study explanation follows. -->

> **Derivation details — added study explanation.**
>
> The Hermitian eigendecomposition is used in [Lecture 8 §8.7.2](<../8. Least Squares and Normal Equations.md#a-hermitian-positive-semidefinite-matrix-is-a-gram-matrix>); the orthonormal-eigenbasis statement is explicit in [Lecture 10 §10.2.1](<../10. Eigenvalues and Iterative Methods.md#hermitian-matrices>). Write $M=V\operatorname{diag}(\mu_i)V^*$, with $V^*V=I$ and $0<\mu_{\min}\le\mu_i\le\mu_{\max}$. For $c=V^*z$,
>
> $$
> \begin{aligned}
> M^{-1}&=V\operatorname{diag}(\mu_i^{-1})V^*,\\
> z^*M^{-1}z&=\sum_i\frac{|c_i|^2}{\mu_i},
> &\|c\|_2^2&=\|z\|_2^2,\\
> \frac{\|z\|_2^2}{\mu_{\max}}
> &\le\sum_i\frac{|c_i|^2}{\mu_i}
> \le\frac{\|z\|_2^2}{\mu_{\min}}.
> \end{aligned}
> $$
>
> This also proves $M^{-1}$ positive definite. Setting $z=(0,y)^T$ proves $y^*\delta y>0$ for $y\ne0$. Apply the same eigendecomposition argument to $\delta=W\operatorname{diag}(d_i)W^*$, where $d_i>0$. By [the block-inverse identity](<../9. Cholesky Factorization and Schur Complements.md#the-block-inverse-identity>),
>
> $$
> \begin{aligned}
> S&=\delta^{-1}=W\operatorname{diag}(d_i^{-1})W^*=S^*,\\
> y^*Sy&=\sum_i d_i^{-1}|w_i^*y|^2>0\quad(y\ne0).
> \end{aligned}
> $$
>
> Thus $S$ is Hermitian positive definite. If $Sy=\lambda y$, then
>
> $$
> \begin{aligned}
> \lambda&=\frac{y^*Sy}{\|y\|_2^2}>0,\\
> \delta Sy&=y\Longrightarrow\lambda\delta y=y
> \Longrightarrow\delta y=\lambda^{-1}y,\\
> \frac{\|y\|_2^2}{\mu_{\max}}
> &\le y^*\delta y=\lambda^{-1}\|y\|_2^2
> \le\frac{\|y\|_2^2}{\mu_{\min}},\\
> \frac1{\mu_{\max}}&\le\frac1\lambda\le\frac1{\mu_{\min}},\\
> \mu_{\min}&\le\lambda\le\mu_{\max}.
> \end{aligned}
> $$
>
> Division uses $\|y\|_2^2>0$; taking reciprocals reverses each inequality because all three scalars are positive.


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



<!-- End submitted solution; added study explanation follows. -->

> **Derivation details — added study explanation.**
>
> [Lecture 9 §9.5](<../9. Cholesky Factorization and Schur Complements.md#why-the-pivots-stay-positive>) proves positive pivots by congruence; [§9.5.1](<../9. Cholesky Factorization and Schur Complements.md#quantitative-pivot-bound>) distinguishes the elimination pivot from its square root. Every leading principal block $H$ is positive definite, since
>
> $$
> \begin{aligned}
> x^*Hx&=\begin{pmatrix}x\\0\end{pmatrix}^*
>  M\begin{pmatrix}x\\0\end{pmatrix}>0\quad(x\ne0).
> \end{aligned}
> $$
>
> Thus its inverse exists. The quotient property in 1(d) identifies successive trailing matrices with $S^{(k-1)}=M/M_{1:k-1,1:k-1}$. Apply 2(b), then expand the Rayleigh bound using the eigenbasis cited there:
>
> $$
> \begin{aligned}
> p_k&=e_1^*S^{(k-1)}e_1
> =\sum_j\lambda_j(S^{(k-1)})|v_j^*e_1|^2\\
> &\ge\lambda_{\min}(S^{(k-1)})\sum_j|v_j^*e_1|^2\\
> &=\lambda_{\min}(S^{(k-1)})\|e_1\|_2^2
> \ge\lambda_{\min}(M).
> \end{aligned}
> $$
>
> The same calculation uses $S^{(0)}=M$ for $k=1$. For $\|z\|_2=1$ and $M=V\operatorname{diag}(\mu_i)V^*$,
>
> $$
> \begin{aligned}
> \|M^{-1}z\|_2^2
> &=\sum_i\mu_i^{-2}|v_i^*z|^2
> \le\mu_{\min}^{-2}\sum_i|v_i^*z|^2
> =\mu_{\min}^{-2},\\
> \|M^{-1}v_{\min}\|_2&=\mu_{\min}^{-1},\\
> \|M^{-1}\|_2&=\mu_{\min}^{-1},\\
> p_k&\ge\|M^{-1}\|_2^{-1},\qquad
> L_{kk}=\sqrt{p_k}\ge\|M^{-1}\|_2^{-1/2}.
> \end{aligned}
> $$
>
> The bound $\|M^{-1}\|_2^{-1}$ applies to the pivot **before** the Cholesky square root. It is not generally a bound for $L_{kk}$ itself: $M=4I$ gives $p_k=4$ but $L_{kk}=2$.


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



<!-- End submitted solution; added study explanation follows. -->

> **Derivation details — added study explanation.**
>
> Use [positive definiteness, Lecture 8 §8.6.2](<../8. Least Squares and Normal Equations.md#positive-semidefinite-and-positive-definite-matrices>), and the [Schur complement, Lecture 9 §9.8](<../9. Cholesky Factorization and Schur Complements.md#block-cholesky-and-schur-complements>). This minimization identity is derived here. The principal block $A$ is positive definite by the zero-padding argument in 2(c). Put $h=A^{-1}By$. Since $A=A^*$,
>
> $$
> \begin{aligned}
> (A^{-1})^*&=(A^*)^{-1}=A^{-1},\\
> Ah&=By,\qquad h^*A=y^*B^*,\\
> h^*Ah&=y^*B^*A^{-1}By,\\
> (x+h)^*A(x+h)
> &=x^*Ax+x^*Ah+h^*Ax+h^*Ah\\
> &=x^*Ax+x^*By+y^*B^*x+y^*B^*A^{-1}By,\\
> \begin{pmatrix}x\\y\end{pmatrix}^*M\begin{pmatrix}x\\y\end{pmatrix}
> &=(x+h)^*A(x+h)+y^*(D-B^*A^{-1}B)y\\
> &=(x+h)^*A(x+h)+y^*Sy.
> \end{aligned}
> $$
>
> For fixed $y$, only the first term depends on $x$:
>
> $$
> \begin{aligned}
> (x+h)^*A(x+h)&\ge0,\\
> (x+h)^*A(x+h)=0&\iff x+h=0\iff x=-A^{-1}By,\\
> \min_x\begin{pmatrix}x\\y\end{pmatrix}^*M\begin{pmatrix}x\\y\end{pmatrix}
> &=0+y^*Sy.
> \end{aligned}
> $$
>
> The minimizer is unique because $A$ is positive definite.


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



<!-- End submitted solution; added study explanation follows. -->

> **Derivation details — added study explanation.**
>
> This is a homework min/sup construction, not a theorem stated in the lectures. Its ingredients are the [Schur-complement definition, Lecture 9 §9.8](<../9. Cholesky Factorization and Schur Complements.md#block-cholesky-and-schur-complements>) and [the separation of real and imaginary parts, Lecture 8 §8.3](<../8. Least Squares and Normal Equations.md#optimality-the-residual-must-be-orthogonal>). Fix $y$ and assume only $A$ invertible. Write $r=Ax+By$ and $c=y^*(Cx+Dy)$. Over $\mathbb R$,
>
> $$
> \begin{aligned}
> F(x,z)&=z^Tr+c,\\
> r\ne0,\quad z=tr
> &\Longrightarrow F(x,tr)=t\|r\|_2^2+c\longrightarrow+\infty,\\
> r=0&\Longrightarrow F(x,z)=c\quad\text{for every }z,\\
> r=0&\iff Ax=-By\iff x=x_*=-A^{-1}By,\\
> c(x_*)&=y^*(C(-A^{-1}By)+Dy)
> =y^*(D-CA^{-1}B)y,\\
> \min_x\sup_zF(x,z)&=c(x_*)=y^*(M/A)y.
> \end{aligned}
> $$
>
> For $\mathbb C$, a complex scalar has no order suitable for a minimum. Treat its two real components separately. For $t\in\mathbb R$,
>
> $$
> \begin{aligned}
> z=tr&\Longrightarrow
> \operatorname{Re}F(x,z)=t\|r\|_2^2+\operatorname{Re}c,\\
> z=-itr&\Longrightarrow z^*=it r^*,\\
> &\hphantom{\Longrightarrow}
> \operatorname{Im}F(x,z)=t\|r\|_2^2+\operatorname{Im}c.
> \end{aligned}
> $$
>
> When $r\ne0$, both suprema are $+\infty$; when $r=0$, each equals the corresponding component of $c(x_*)$. This proves both displayed complex identities above. The inner operation is a **supremum**: away from the constraint no finite maximum exists. At $x_*$ every $z$ is a maximizer. No interchange of minimum and supremum is used.


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



<!-- End submitted solution; added study explanation follows. -->

> **Derivation details — added study explanation.**
>
> Use the [LU product, Lecture 3 §3.3](<../3. LU Factorization and Zero Pivots.md#lu-factorization>); the outer-product organization is also used in [§3.6](<../3. LU Factorization and Zero Pivots.md#computing-lu-in-place>). For the standard basis, $(e_ke_k^*)_{ij}=1$ only when $i=j=k$, so $\sum_ke_ke_k^*=I$. Hence
>
> $$
> \begin{aligned}
> A&=LIU=L\left(\sum_{k=1}^me_ke_k^*\right)U\\
> &=\sum_{k=1}^m(Le_k)(e_k^*U)
> =\sum_{k=1}^m\ell_ku_k^*,\\
> \ell_k&=Le_k=L_{:,k},\qquad
> u_k=U^*e_k,\qquad u_k^*=e_k^*U=U_{k,:},\\
> (\ell_ku_k^*)_{ij}&=L_{ik}U_{kj},\\
> \left(\sum_k\ell_ku_k^*\right)_{ij}
> &=\sum_kL_{ik}U_{kj}=(LU)_{ij}=A_{ij}.
> \end{aligned}
> $$
>
> Here $L,U$ are invertible because their square product is invertible. Thus $\ell_k,u_k\ne0$. Every output of $\ell_ku_k^*$ is a multiple of $\ell_k$, and
>
> $$
> (\ell_ku_k^*)u_k=\ell_k\|u_k\|_2^2\ne0.
> $$
>
> Its range is therefore exactly $\operatorname{span}(\ell_k)$, which has dimension one.


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



<!-- End submitted solution; added study explanation follows. -->

> **Derivation details — added study explanation.**
>
> The closure and inverse facts are [Lecture 3 §3.4, Theorem 2](<../3. LU Factorization and Zero Pivots.md#algebra-of-lower-triangular-matrices>), with the [inverse proof in §3.5.3](<../3. LU Factorization and Zero Pivots.md#inversion-of-a-lower-triangular-matrix>). The upper-triangular versions follow by taking adjoints. The uniqueness argument is derived here:
>
> $$
> \begin{aligned}
> LU&=\widetilde L\widetilde U,\\
> L^{-1}(LU)\widetilde U^{-1}
> &=L^{-1}(\widetilde L\widetilde U)\widetilde U^{-1},\\
> U\widetilde U^{-1}&=L^{-1}\widetilde L=:H.
> \end{aligned}
> $$
>
> $H$ is lower triangular by its right expression and upper triangular by its left expression. Therefore $H_{ij}=0$ whenever $i\ne j$. Its diagonal is
>
> $$
> \begin{aligned}
> (L^{-1})_{ii}L_{ii}&=(L^{-1}L)_{ii}=1,\\
> L_{ii}=\widetilde L_{ii}=1
> &\Longrightarrow H_{ii}=(L^{-1})_{ii}\widetilde L_{ii}=1,\\
> H&=I,\\
> L^{-1}\widetilde L=I&\Longrightarrow\widetilde L=L,\\
> U\widetilde U^{-1}=I&\Longrightarrow U=\widetilde U.
> \end{aligned}
> $$
>
> The unit-diagonal normalization is essential: otherwise a nonsingular diagonal matrix can be moved between the two factors.


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



<!-- End submitted solution; added study explanation follows. -->

> **Derivation details — added study explanation.**
>
> The positive-diagonal Cholesky convention is [Lecture 9 §9.3](<../9. Cholesky Factorization and Schur Complements.md#cholesky-factorization>). The phase convention is analogous to [Lecture 7 §7.6](<../7. Orthogonal Transformations and QR.md#uniqueness-of-qr>); the following Cholesky uniqueness proof uses homework 3(b).
>
> If $A$ is nonsingular and $A=LL^*$, then $L$ is nonsingular, so each diagonal $L_{kk}\ne0$. Define $D=\operatorname{diag}(L_{kk})$. Both factors in
>
> $$
> \begin{aligned}
> A&=(LD^{-1})(DL^*),\\
> (LD^{-1})_{kk}&=L_{kk}/L_{kk}=1,\\
> (DL^*)_{kk}&=L_{kk}\overline{L_{kk}}=|L_{kk}|^2
> \end{aligned}
> $$
>
> have the required triangular form. Applying 3(b) to a second factor $\widetilde L$ yields
>
> $$
> \begin{aligned}
> LD^{-1}&=\widetilde L\widetilde D^{-1},
> &|L_{kk}|^2&=|\widetilde L_{kk}|^2,\\
> \widetilde L&=LD^{-1}\widetilde D=LW,
> &W&=\operatorname{diag}(\omega_k),\\
> \omega_k&=\widetilde L_{kk}/L_{kk},
> &|\omega_k|&=1,\\
> (LW)(LW)^*&=LWW^*L^*=LIL^*=A.
> \end{aligned}
> $$
>
> Over $\mathbb R$, $|\omega_k|=1$ means $\omega_k=\pm1$. Over $\mathbb C$, it means $\omega_k=e^{i\theta_k}$. Positive real diagonals force $\omega_k=1$ for every $k$.
>
> For the submitted singular counterexample, multiplication gives
>
> $$
> \begin{aligned}
> \begin{pmatrix}0&0\\0&1\end{pmatrix}
> \begin{pmatrix}0&0\\0&1\end{pmatrix}^*
> &=\begin{pmatrix}0&0\\0&1\end{pmatrix},\\
> \begin{pmatrix}0&0\\1&0\end{pmatrix}
> \begin{pmatrix}0&0\\1&0\end{pmatrix}^*
> &=\begin{pmatrix}0&0\\0&1\end{pmatrix}.
> \end{aligned}
> $$
>
> Multiplying a zero column by a phase keeps it zero, so no diagonal phase matrix relates these two factors. Nonsingularity is necessary for the sign/phase-only uniqueness claim.


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



<!-- End submitted solution; added study explanation follows. -->

> **Derivation details — added study explanation.**
>
> Use [Lecture 8 §8.7.3's full-rank Gram characterization](<../8. Least Squares and Normal Equations.md#positive-definiteness-and-full-column-rank>), [reduced QR in Lecture 7 §7.4.1](<../7. Orthogonal Transformations and QR.md#reduced-qr>), and the [positive-diagonal convention in §7.6.2](<../7. Orthogonal Transformations and QR.md#positive-diagonal-entries-remove-the-ambiguity>). Their connection is stated in [Lecture 9 §9.10](<../9. Cholesky Factorization and Schur Complements.md#cholesky-and-qr>).
>
> $$
> \begin{aligned}
> x\ne0&\Longrightarrow Bx\ne0
> \Longrightarrow x^*B^*Bx=\|Bx\|_2^2>0,\\
> B&=QR,\qquad Q^*Q=I_n,\\
> B^*B&=R^*Q^*QR=R^*I_nR=R^*R,\\
> L&:=R^*\quad\Longrightarrow\quad LL^*=R^*R=B^*B.
> \end{aligned}
> $$
>
> $R^*$ is lower triangular and $(R^*)_{kk}=\overline{R_{kk}}=R_{kk}>0$, so 3(c) identifies it as the unique normalized Cholesky factor. Conversely, start from $B^*B=LL^*$ and set $R=L^*$:
>
> $$
> \begin{aligned}
> Q&=BR^{-1},\\
> QR&=BR^{-1}R=B,\\
> Q^*Q&=(R^{-1})^*B^*BR^{-1}\\
> &=(R^*)^{-1}(R^*R)R^{-1}\\
> &=((R^*)^{-1}R^*)(RR^{-1})=I_n.
> \end{aligned}
> $$
>
> Thus $Q,R$ satisfy reduced QR with the same diagonal normalization.


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


<!-- End submitted solution; added study explanation follows. -->

> **Derivation details — added study explanation.**
>
> The prerequisites are [Gram-matrix block products, Lecture 8 §8.7](<../8. Least Squares and Normal Equations.md#gram-matrices>), [orthogonal projection, Lecture 5 §5.5](<../5. Least Squares and Gram-Schmidt.md#least-squares-with-orthonormal-columns>), [Gram–Schmidt, §5.7](<../5. Least Squares and Gram-Schmidt.md#classical-gramschmidt>), and [block Cholesky, Lecture 9 §9.8](<../9. Cholesky Factorization and Schur Complements.md#block-cholesky-and-schur-complements>). This combines them to derive the requested identity.
>
> A subset of the independent columns of $B$ is independent, so $G=B_1^*B_1$ is positive definite by [Lecture 8 §8.7.3](<../8. Least Squares and Normal Equations.md#positive-definiteness-and-full-column-rank>). For $P=B_1G^{-1}B_1^*$,
>
> $$
> \begin{aligned}
> P^*&=B_1(G^{-1})^*B_1^*=B_1G^{-1}B_1^*=P,\\
> P^2&=B_1G^{-1}(B_1^*B_1)G^{-1}B_1^*=P,\\
> B_1^*(I-P)&=B_1^*-(B_1^*B_1)G^{-1}B_1^*=0,\\
> (I-P)^*(I-P)&=(I-P)^2=I-2P+P^2=I-P.
> \end{aligned}
> $$
>
> Thus $(I-P)B_2$ consists of columns orthogonal to $B_1$, and
>
> $$
> \begin{aligned}
> \widehat B_2^*\widehat B_2
> &=B_2^*(I-P)^*(I-P)B_2\\
> &=B_2^*B_2-B_2^*B_1G^{-1}B_1^*B_2\\
> &=A_{22}-A_{21}A_{11}^{-1}A_{12}=A/A_{11}.
> \end{aligned}
> $$
>
> For the partitioned reduced QR, $B_1=Q_1R_{11}$ and $Q_1^*Q_1=I$. Hence
>
> $$
> \begin{aligned}
> G&=R_{11}^*R_{11},\qquad
> G^{-1}=R_{11}^{-1}(R_{11}^*)^{-1},\\
> P&=Q_1R_{11}R_{11}^{-1}(R_{11}^*)^{-1}R_{11}^*Q_1^*
> =Q_1Q_1^*,\\
> (I-P)B_2
> &=(I-Q_1Q_1^*)(Q_1R_{12}+Q_2R_{22})\\
> &=(Q_1-Q_1(Q_1^*Q_1))R_{12}
>  +(Q_2-Q_1(Q_1^*Q_2))R_{22}\\
> &=0+Q_2R_{22},\\
> A/A_{11}&=R_{22}^*Q_2^*Q_2R_{22}=R_{22}^*R_{22}.
> \end{aligned}
> $$
>
> By [Lecture 9 §9.8](<../9. Cholesky Factorization and Schur Complements.md#block-cholesky-and-schur-complements>), this same Schur complement is $L_{22}L_{22}^*$. Both $L_{22}$ and $R_{22}^*$ have positive real diagonal, so 3(c) gives $L_{22}=R_{22}^*$. Schur-complement elimination and orthogonal projection therefore produce the same trailing Gram matrix.
