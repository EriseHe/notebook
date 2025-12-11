---
page-layout: article
listing:
  contents: "*"
  sort: title
title: Julia科学计算笔记
---



$$
\begin{aligned}
\partial_i\partial_m (T^{im} x'^j x'^k)
&= \partial_i\Big[,\partial_m(T^{im}) x'^j x'^k
+ T^{im}\partial_m(x'^j x'^k)\Big] \\
&= \partial_i\Big[(\partial_m T^{im}) x'^j x'^k
+ T^{im}(\delta_m^{\ j}x'^k + x'^j\delta_m^{\ k})\Big] \\
&= \partial_i\Big[(\partial_m T^{im}) x'^j x'^k
+ T^{jm}x'^k + T^{km}x'^j\Big].
\end{aligned}
$$
Now apply the product rule again:
$$
\begin{aligned}
\partial_i\partial_m (T^{im} x'^j x'^k)
&= (\partial_i\partial_m T^{im}) x'^j x'^k

(\partial_m T^{im}),\partial_i(x'^j x'^k)

\partial_i(T^{jm}x'^k)

\partial_i(T^{km}x'^j) \\
&= (\partial_i\partial_m T^{im}) x'^j x'^k \\
&\quad+ (\partial_m T^{im})(\delta_i^{\ j}x'^k + x'^j\delta_i^{\ k})

(\partial_i T^{jm})x'^k + T^{jm}\delta_i^{\ k} \\
&\quad+ (\partial_i T^{km})x'^j + T^{km}\delta_i^{\ j}.
\end{aligned}
$$
Now perform the sums over 
𝑖
i:
$$
\begin{aligned}
\partial_i\partial_m (T^{im} x'^j x'^k)
&= (\partial_i\partial_m T^{im}) x'^j x'^k

(\partial_m T^{jm})x'^k + (\partial_m T^{km})x'^j \
&\quad+ (\partial_i T^{jm})x'^k + T^{jk}

(\partial_i T^{km})x'^j + T^{kj}.
\end{aligned}
$$
Because 

 is symmetric, 
, and we can also rename dummy indices to combine terms:
$$
\begin{aligned}
\partial_i\partial_m (T^{im} x'^j x'^k)
&= (\partial_i\partial_m T^{im}) x'^j x'^k
2,\partial_m(T^{mj}x'^k + T^{mk}x'^j)
-2T^{jk}.
\end{aligned}
$$
Rearrange this to solve for 

\begin{aligned}
(\partial_i\partial_m T^{im}) x'^j x'^k
&= \partial_i\partial_m (T^{im} x'^j x'^k)
-2,\partial_m(T^{mj}x'^k + T^{mk}x'^j)
+2T^{jk},
\end{aligned}

which is exactly the last line of eq. (33.27).

$$
\begin{aligned}
\int_V \partial_0\partial_0 (T^{00}x'^j x'^k),dV
&= \int_V \partial_i\partial_m(T^{im}x'^j x'^k),dV \\
&\quad -2\int_V \partial_m(T^{mj}x'^k + T^{mk}x'^j),dV
+2\int_V T^{jk},dV.
\end{aligned}
$$

I’ll go exercise by exercise and only do what each one asks, keeping the book’s notation.

---

## Exercise 33.2.1

You want to check the last step in eq. (33.27), i.e.

[
(\partial_i \partial_m T^{im}),x'^j x'^k
= \partial_i\partial_m(T^{im}x'^j x'^k)
-2\partial_m(T^{mj}x'^k+T^{mk}x'^j)+2T^{jk}.
]

Start from the left-hand side of this proposed identity and use the product rule in the *reverse* direction.

First expand the double derivative of the product:

\begin{aligned}
\partial_i\partial_m (T^{im} x'^j x'^k)
&= \partial_i\Big[,\partial_m(T^{im}) x'^j x'^k
+ T^{im}\partial_m(x'^j x'^k)\Big]  \
&= \partial_i\Big[(\partial_m T^{im}) x'^j x'^k
+ T^{im}(\delta_m^{\ j}x'^k + x'^j\delta_m^{\ k})\Big] \
&= \partial_i\Big[(\partial_m T^{im}) x'^j x'^k
+ T^{jm}x'^k + T^{km}x'^j\Big].
\end{aligned}

Now apply the product rule again:

\begin{aligned}
\partial_i\partial_m (T^{im} x'^j x'^k)
&= (\partial_i\partial_m T^{im}) x'^j x'^k

* (\partial_m T^{im}),\partial_i(x'^j x'^k)
* \partial_i(T^{jm}x'^k)
* \partial_i(T^{km}x'^j) \
  &= (\partial_i\partial_m T^{im}) x'^j x'^k \
  &\quad+ (\partial_m T^{im})(\delta_i^{\ j}x'^k + x'^j\delta_i^{\ k})
* (\partial_i T^{jm})x'^k + T^{jm}\delta_i^{\ k} \
  &\quad+ (\partial_i T^{km})x'^j + T^{km}\delta_i^{\ j}.
  \end{aligned}

Now perform the sums over (i):

\begin{aligned}
\partial_i\partial_m (T^{im} x'^j x'^k)
&= (\partial_i\partial_m T^{im}) x'^j x'^k

* (\partial_m T^{jm})x'^k + (\partial_m T^{km})x'^j \
  &\quad+ (\partial_i T^{jm})x'^k + T^{jk}
* (\partial_i T^{km})x'^j + T^{kj}.
  \end{aligned}

Because (T^{\mu\nu}) is symmetric, (T^{jk}=T^{kj}), and we can also rename dummy indices to combine terms:

\begin{aligned}
\partial_i\partial_m (T^{im} x'^j x'^k)
&= (\partial_i\partial_m T^{im}) x'^j x'^k

* 2,\partial_m(T^{mj}x'^k + T^{mk}x'^j)
  -2T^{jk}.
  \end{aligned}

Rearrange this to solve for ((\partial_i\partial_m T^{im}) x'^j x'^k):

\begin{aligned}
(\partial_i\partial_m T^{im}) x'^j x'^k
&= \partial_i\partial_m (T^{im} x'^j x'^k)
-2,\partial_m(T^{mj}x'^k + T^{mk}x'^j)
+2T^{jk},
\end{aligned}

which is exactly the last line of eq. (33.27). ✔️

---

## Exercise 33.2.2

You’re asked to verify eq. (33.30):

[
\int_V \partial_0\partial_0 (T^{00}x'^j x'^k),dV
= 2\int_V T^{jk},dV.
\tag{33.30}
]

Start from eq. (33.27):

[
\partial_0\partial_0 (T^{00}x'^j x'^k)
= \partial_i\partial_m(T^{im}x'^j x'^k)
-2\partial_m(T^{mj}x'^k + T^{mk}x'^j)
+2T^{jk}.
]

Integrate both sides over a volume (V) that completely encloses the source:

\begin{aligned}
\int_V \partial_0\partial_0 (T^{00}x'^j x'^k),dV
&= \int_V \partial_i\partial_m(T^{im}x'^j x'^k),dV \
&\quad -2\int_V \partial_m(T^{mj}x'^k + T^{mk}x'^j),dV
+2\int_V T^{jk},dV.
\end{aligned}

Use the divergence theorem in index notation (eqs. (33.28)–(33.29)):

[
\int_V \partial_i F^{ij},dV = \oint_S F^{ij},dA_i.
]

Apply this to the first two volume integrals:

[
\int_V \partial_i\partial_m(T^{im}x'^j x'^k),dV
= \oint_S \partial_m(T^{im}x'^j x'^k),dA_i,
]

[
\int_V \partial_m(T^{mj}x'^k + T^{mk}x'^j),dV
= \oint_S (T^{mj}x'^k + T^{mk}x'^j),dA_m.
]

On the surface (S) of a sufficiently large volume, (T^{\mu\nu}=0) (outside the source), so all these surface integrals vanish. Thus the first two volume integrals are zero, leaving

[
\int_V \partial_0\partial_0 (T^{00}x'^j x'^k),dV
= 2\int_V T^{jk},dV,
]

which is exactly eq. (33.30). ✔️

---

## Exercise 33.3.1

Eq. (33.32) gives

[
B^t = \frac{A^{tt} + \tfrac12 A^\mu{}*\mu}{2\omega},\quad
B^x = \frac{A^{xt}}{\omega},\quad
B^y = \frac{A^{yt}}{\omega},\quad
B^z = \frac{2A^{zt} - A^{tt} - \tfrac12 A^\mu{}*\mu}{2\omega}.
\tag{33.32}
]

The Lorentz gauge condition (33.33a) is

[
A^{t\nu} = A^{z\nu},
\tag{33.33a}
]

and together with symmetry (A^{\mu\nu} = A^{\nu\mu}) it implies (33.33b)

[
A^{xt} = A^{xz},\quad
A^{yt} = A^{yz},\quad
A^{tz} = A^{zz}.
\tag{33.33b}
]

From (A^{t\nu} = A^{z\nu}) and symmetry, we also get (A^{tt} = A^{zt} = A^{tz} = A^{zz}).

The trace is

[
A^\mu{}_\mu = -A^{tt} + A^{xx} + A^{yy} + A^{zz}.
]

### (B^t)

\begin{aligned}
B^t
&= \frac{A^{tt} + \tfrac12 A^\mu{}_\mu}{2\omega} \
&= \frac{A^{tt} + \tfrac12(-A^{tt} + A^{xx} + A^{yy} + A^{zz})}{2\omega} \
&= \frac{\tfrac12A^{tt} + \tfrac12(A^{xx} + A^{yy} + A^{zz})}{2\omega}.
\end{aligned}

Replace (A^{tt}=A^{zz}):

[
B^t
= \frac{A^{zz} + \tfrac12 A^{xx} + \tfrac12 A^{yy}}{2\omega}.
]

### (B^z)

\begin{aligned}
B^z
&= \frac{2A^{zt} - A^{tt} - \tfrac12 A^\mu{}_\mu}{2\omega}.
\end{aligned}

Use (A^{zt}=A^{tt}=A^{zz}):

[
2A^{zt} - A^{tt} = 2A^{zz} - A^{zz} = A^{zz}.
]

Also

\begin{aligned}
-\tfrac12 A^\mu{}_\mu
&= -\tfrac12(-A^{tt} + A^{xx} + A^{yy} + A^{zz}) \
&= \tfrac12 A^{tt} - \tfrac12(A^{xx} + A^{yy} + A^{zz}) \
&\xrightarrow{A^{tt}=A^{zz}}
-\tfrac12 A^{xx} - \tfrac12 A^{yy}.
\end{aligned}

Therefore the numerator is

[
A^{zz} - \tfrac12 A^{xx} - \tfrac12 A^{yy},
]

so

[
B^z = \frac{A^{zz} - \tfrac12 A^{xx} - \tfrac12 A^{yy}}{2\omega}.
]

Thus we recover eq. (33.34):

[
B^t = \frac{A^{zz} + \tfrac12 A^{xx} + \tfrac12 A^{yy}}{2\omega},
\qquad
B^z = \frac{A^{zz} - \tfrac12 A^{xx} - \tfrac12 A^{yy}}{2\omega}.
\tag{33.34}
]

✔️

---

## Exercise 33.3.2

Here you’re asked to check that, using eq. (33.34) in the gauge-transformation formula (33.31),

[
A^{\mu\nu}_{TT} = A^{\mu\nu}

* k^\mu B^\nu - k^\nu B^\mu

- \eta^{\mu\nu} k_\alpha B^\alpha,
  \tag{33.31}
  ]

you obtain

[
A^{xx}*{TT} = -A^{yy}*{TT}
= \tfrac12(A^{xx} - A^{yy}),
\qquad
A^{xy}*{TT} = A^{yx}*{TT} = A^{xy}.
]

For a wave moving in the (+z) direction we have

[
k^\mu = (\omega, 0, 0, \omega),
]

and with signature ((- + + +)),

[
k_\alpha B^\alpha = -\omega B^t + \omega B^z
= \omega(-B^t + B^z).
]

From eq. (33.34),

[
B^t = \frac{A^{zz} + \tfrac12 A^{xx} + \tfrac12 A^{yy}}{2\omega},
\quad
B^z = \frac{A^{zz} - \tfrac12 A^{xx} - \tfrac12 A^{yy}}{2\omega}.
]

Compute

\begin{aligned}
\omega(-B^t + B^z)
&= \omega\left(
-\frac{A^{zz} + \tfrac12 A^{xx} + \tfrac12 A^{yy}}{2\omega}

* \frac{A^{zz} - \tfrac12 A^{xx} - \tfrac12 A^{yy}}{2\omega}
  \right) \
  &= \frac{-A^{xx} - A^{yy}}{2}.
  \end{aligned}

### (A^{xx}_{TT})

Use eq. (33.31) with (\mu=\nu=x). Since (k^x=0) and (\eta^{xx}=+1),

$$
A^{xx}*{TT}
= A^{xx} + k*\alpha B^\alpha
= A^{xx} + \frac{-A^{xx} - A^{yy}}{2}
= \frac{A^{xx} - A^{yy}}{2}.
$$

### (A^{yy}_{TT})

Similarly, with (\mu=\nu=y),

$$
A^{yy}*{TT}
= A^{yy} + k*\alpha B^\alpha
= A^{yy} + \frac{-A^{xx} - A^{yy}}{2}
= -\frac{A^{xx} - A^{yy}}{2}.
$$

Hence

$$
A^{xx}*{TT} = -A^{yy}*{TT}
= \tfrac12 (A^{xx} - A^{yy}).
$$

### (A^{xy}*{TT}) and (A^{yx}*{TT})

Take (\mu=x,\nu=y):

$$
A^{xy}*{TT}
= A^{xy} - k^x B^y - k^y B^x + \eta^{xy} k*\alpha B^\alpha.
$$

Here (k^x = k^y = 0) and (\eta^{xy}=0), so

$$
A^{xy}_{TT} = A^{xy}.
$$

Since (A^{\mu\nu}) is symmetric, (A^{yx}=A^{xy}), and the same argument gives

[
A^{yx}_{TT} = A^{yx} = A^{xy}.
]

This matches the stated results in the text. ✔️

$$\begin{aligned}
B^t
&= \frac{A^{tt} + \tfrac12 A^\mu{}_\mu}{2\omega} \\
&= \frac{A^{tt} + \tfrac12(-A^{tt} + A^{xx} + A^{yy} + A^{zz})}{2\omega} \\

&= \frac{\tfrac12A^{tt} + \tfrac12(A^{xx} + A^{yy} + A^{zz})}{2\omega}.
\end{aligned}$$

$$\begin{aligned}
B^z
&= \frac{2A^{zt} - A^{tt} - \tfrac12 A^\mu{}_\mu}{2\omega}.
\end{aligned}$$

$$\begin{aligned}
-\tfrac12 A^\mu{}_\mu
&= -\tfrac12(-A^{tt} + A^{xx} + A^{yy} + A^{zz}) \\
&= \tfrac12 A^{tt} - \tfrac12(A^{xx} + A^{yy} + A^{zz}) \\
&\xrightarrow{A^{tt}=A^{zz}}
-\tfrac12 A^{xx} - \tfrac12 A^{yy}.
\end{aligned}$$