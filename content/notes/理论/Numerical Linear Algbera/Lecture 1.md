---
date: 2026-09-02
---
# 1 Vectors and Matrices

Let $\mathbb{K}$ denote either $\mathbb{R}$ or $\mathbb{C}$.

## 1.1 Vectors

**Definition.** A vector

$$
v \in \mathbb{K}^m
$$

is an $m$-tuple of elements in $\mathbb{K}$. It can represent a **position** or **direction** in an $m$-dimensional coordinate system. For example,
$$
\begin{pmatrix}
x_1\\
x_2
\end{pmatrix}
\in \mathbb{R}^2.
$$

## 1.2 Matrices

**Definition.** A matrix
$$
A \in \mathbb{K}^{m\times n}
$$
is an $m\times n$ table of elements in $\mathbb{K}$.

It can be viewed as representing $n$ positions/vectors in $m$-dimensional space. In particular,
$$
\mathbb{K}^{m\times 1} \cong \mathbb{K}^m.
$$
For example, a matrix can be viewed in terms of its columns:

$$
A =
\begin{pmatrix}
A_{11} & A_{12}\\
A_{21} & A_{22}\\
A_{31} & A_{32}
\end{pmatrix}
=
\begin{pmatrix}
a_1 & a_2
\end{pmatrix},
$$

where $a_1,a_2\in\mathbb{K}^3$ are the columns of $A$.

## 1.3 Scalar Multiplication and Matrix Addition

For $\delta\in\mathbb{K}, A,B\in\mathbb{K}^{m\times n},$ define scalar multiplication componentwise by
$$
(\delta A)_{ij}:=\delta A_{ij},
$$
and matrix addition componentwise by
$$
(A+B)_{ij}:=A_{ij}+B_{ij}.
$$

## 1.4 Matrix-Vector Multiplication

For $A\in\mathbb{K}^{m\times n}, v\in\mathbb{K}^n,$ define $Av\in\mathbb{K}^m$ by
$$
(A v)_i:=\sum_{\beta=1}^n A_{i \beta} v_\beta
$$
thus a matrix $A$ can be viewed as a map $A:\mathbb{K}^n\to\mathbb{K}^m$, sending $x\mapsto Ax.$
## 1.5 Matrix-Matrix Multiplication

For $A\in\mathbb{K}^{m\times n},B\in\mathbb{K}^{n\times \ell},$ define $AB\in\mathbb{K}^{m\times \ell}$ by
$$
(A B)_{i j}:=\sum_{\beta=1}^n A_{i \beta} B_{\beta j}
$$

# 2 Representation on Computer

Need to store
$$
v \in \mathbb{K}^m,
\qquad
A \in \mathbb{K}^{m\times n}
$$
in memory.

> How to represent objects in $\mathbb{R}$?

The computer's "native" field is $\mathbb{B}:=\{0,1\}.$

## 2.1 First Step: Positive Integers

Use $d\in\mathbb{B}^b$ to store integers from $0 \quad \text{to} \quad 2^b-1.$ Define
$$
\operatorname{UInt}(d)
:=
\sum_{i=1}^{b} d_i 2^{i-1}.
$$

## 2.2 Second Step: Signed Integers

Use an offset to store signed integers from $$
-2^{b-1}
\quad \text{to} \quad
2^{b-1}-1.
$$
Define
$$
\operatorname{Int}(d)
:=
\sum_{i=1}^{b-1} d_i 2^{i-1}
-
d_b 2^{b-1}.
$$

## 2.3 Third Step: Fixed Point Representation

For $d\in\mathbb{B}^b$, define
$$
\operatorname{Fixed}(d)
:=
\operatorname{Int}(d)\,2^{-\lfloor b/2\rfloor}.
$$

> **Clarification.** This places the binary point $\lfloor b/2\rfloor$ positions from the right. Consecutive representable values have the same spacing, $2^{-\lfloor b/2\rfloor}$.

**Problem.** For $s>1$, representing magnitudes from $s^{-1}$ to $s$ requires a number of bits proportional to $\log_2 s$.

## 2.4 Floating Point Representation

**Idea.** Store the significant digits and the exponent separately. Use
$$
(p,e)\in\mathbb{B}^{b_p}\times\mathbb{B}^{b_e}
$$
to represent
$$
\operatorname{Float}(p,e)
:=
(-1)^{p_1}
\left(1+\sum_{i=2}^{b_p}p_i2^{-(i-1)}\right)
2^{\operatorname{Int}(e)}.
$$

Here, $p_1$ is the sign bit, $p_2,\ldots,p_{b_p}$ encode the fractional part of the binary significand, and $e$ encodes the exponent.

**Example.** The idea is analogous to decimal scientific notation:
$$
\pm 1.124\times 10^{-4}.
$$

> **Clarification.** The leading binary digit $1$ is implicit, so it does not need to be stored. This is a simplified representation of normalized, nonzero numbers; zero and other special cases need separate encodings.

A complex number $z\in\mathbb{C}$ is represented by two real numbers: its real and imaginary parts,
$$
z=x+iy,\qquad x,y\in\mathbb{R}.
$$

**Reference mentioned in lecture:** Mike Overton's book.

# 3 Floating Point Arithmetic

Floating point representation needs on the order of
$$
\log_2(\log_2 s)
$$
bits for the exponent to cover magnitudes between $s^{-1}$ and $s$.

> **Clarification.** The exponent itself has size about $\log_2 s$, so storing it takes about $\log_2(\log_2 s)$ bits. The significand uses an additional $b_p$ bits to control precision.

## 3.1 Unequal Spacing

**The catch:** Floating point numbers are **not equispaced**.

Let
$$
\varepsilon:=2^{-(b_p-1)}.
$$
This is the gap between $1$ and the next larger representable number. The number-line diagram shows:

| Value | Next larger representable number | Gap |
| --- | --- | --- |
| $1$ | $1+\varepsilon$ | $\varepsilon$ |
| $2$ | $2+2\varepsilon$ | $2\varepsilon$ |
| $4$ | $4+4\varepsilon$ | $4\varepsilon$ |

> **Clarification.** Each time the exponent increases by $1$, the spacing doubles. Floating point numbers have roughly uniform relative precision, not uniform absolute spacing.

## 3.2 Rounding and Non-Associativity

Assume that we round to the nearest representable number after each operation, **breaking ties upward**. What is
$$
1+\varepsilon+1+2\,?
$$
The result can be $4$ or $4+4\varepsilon$, depending on how the additions are grouped.

**Conclusion.** Floating point addition is **not associative**.

**Clarification of the example.** Write $a\oplus b:=\operatorname{fl}(a+b)$, where $\operatorname{fl}$ denotes rounding. Then
$$
\begin{aligned}
((1\oplus\varepsilon)\oplus 1)\oplus 2
&=(2+2\varepsilon)\oplus 2
=4+4\varepsilon,\\
(1\oplus\varepsilon)\oplus(1\oplus 2)
&=(1+\varepsilon)\oplus 3
=4.
\end{aligned}
$$
In the first grouping, $2+\varepsilon$ and then $4+2\varepsilon$ are halfway between adjacent representable values, so both round upward. In the second grouping, $4+\varepsilon$ is closer to $4$ than to $4+4\varepsilon$.

## 3.3 Cancellation and Relative Accuracy

**The problem:** Cancellation kills relative accuracy.

The lecture's example is
$$
(10^6+1)(1+\varepsilon)-10^6
=1+(10^6+1)\varepsilon
\approx 1+10^6\varepsilon.
$$

> **Clarification.** The board omits the smaller $+\varepsilon$ term; the exact expansion is shown above. Here, $1+\varepsilon$ models a small relative error in the large quantity $10^6+1$. The intended difference is $1$, so the relative error after subtraction is about $10^6\varepsilon$. Subtracting nearly equal large quantities can magnify the effect of errors already present in them.
