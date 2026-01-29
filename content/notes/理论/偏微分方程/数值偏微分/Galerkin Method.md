> Q Chap. 4

In mathematics, in the area of numerical analysis, Galerkin methods are a family of methods for converting a continuous operator problem, such as a differential equation, commonly in a weak formulation, to a discrete problem by applying linear constraints determined by finite sets of basis functions. They are named after the Soviet mathematician Boris Galerkin.

$$

\left\{
\begin{aligned}
-\Delta u = f\\
u f
\end{aligned}
\right.
$$

## Force on String

$$
-\frac{ \partial^2 u }{ \partial x^{2 }}=\delta
$$
The force exerted on a string breaks the string into two piecewise solutions. This is where when we need *week formulations* to formulate this problem properly (?)


## Lax-Milgram Lemma

Problem: 
$$
a(u, v)= f(u) 
$$
where $u, v \in X$

1) $a(\cdot, \cdot)$ bilinear form
2) bounded: $\exists M >0, s.t. | a(u,v)| \leq M \|u\|_{x}\|v\|_{x}$
3) $$ a(u,u)\geq \alpha\|\|$$

sufficient 
