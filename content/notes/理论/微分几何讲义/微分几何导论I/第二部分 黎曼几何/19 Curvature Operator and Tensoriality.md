---
date: 2025-11-05
---
## 1. Curvature

> [!definition|2.1] Riemannian curvature endomorphism
> The Riemannian curvature endomorphism is a map $TM\times TM\times TM\to TM$ given by
> $$
> R(X,Y)Z=\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ-\nabla_{[X,Y]}Z
> $$

### 1.1 Example: Euclidean $\mathbb{R}^n$

In Euclidean space, the Christoffel symbols satisfy $\Gamma^k_{ij}\equiv 0$. For $Z=v^j\partial_j$ we have
$$
\nabla_YZ=(Yv^j)\partial_j
$$
Hence
$$
\begin{aligned}
R(X,Y)Z
&=\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ-\nabla_{[X,Y]}Z\\
&=X(Yv^j)\partial_j-Y(Xv^j)\partial_j-([X,Y]v^j)\partial_j\\
&=0
\end{aligned}
$$

> [!proposition|2.2] Prop
> $R$ is a $(3)$-tensor which is invariant under local isometries

### 1.2 Tensoriality check (example computation)

To show tensoriality, we need $C^\infty(M)$-linearity in each slot, e.g. for $f\in C^\infty(M)$,
$$
R(fX,Y)Z=f\,R(X,Y)Z
$$
Use
$$
[fX,Y]=f[X,Y]-(Yf)X
$$
Then
$$
\begin{aligned}
R(fX,Y)Z
&=\nabla_{fX}\nabla_YZ-\nabla_Y\nabla_{fX}Z-\nabla_{[fX,Y]}Z\\
&=\underbrace{f\,\nabla_X\nabla_YZ}_{\nabla_{fX}=f\nabla_X}
-\nabla_Y\bigl(\underbrace{f\,\nabla_XZ}_{\nabla_{fX}Z=f\nabla_XZ}\bigr)
-\nabla_{\,f[X,Y]-(Yf)X}Z\\
&=f\,\nabla_X\nabla_YZ-\underbrace{(Yf)\,\nabla_XZ}_{\nabla_Y(fW)=(Yf)W+f\nabla_YW}-f\,\nabla_Y\nabla_XZ
-f\,\nabla_{[X,Y]}Z+\underbrace{(Yf)\,\nabla_XZ}_{\text{cancels}}\\
&=f\bigl(\nabla_X\nabla_YZ-\nabla_Y\nabla_XZ-\nabla_{[X,Y]}Z\bigr)\\
&=f\,R(X,Y)Z
\end{aligned}
$$
The other $C^\infty(M)$-linearity properties are similar.

### 1.3 Invariance under local isometries
