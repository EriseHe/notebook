## 0. Review
$$
\hat{H}=-\frac{\hbar^{2}}{2m}\partial^{2}x+V(x)
$$
Stationary States
$$
\Psi(x,t)=\psi(x)e^{-iEt/\hbar}
$$
Eigenvalue equation:
$$\hat{H}\psi(x) = E\psi(x)$$
In newtonian mechanics, note
$$F(x)=-\frac{ \partial V(x) }{ \partial x } $$
## 1. Infinite Finite Well (particle on a box)
$$E = \frac{p^{2}}{2m}$$
> knowing $E$ results in knowing momentum $p^{2}$

Problem Set-up
Between $x=0$, and $x=a$,
$$-\frac{\hbar^{2}}{2m} \frac{d^{2}}{dx}\Psi(x)=E \Psi(x)$$
Subject to "boundary condition": $\Psi(0)=\Psi(a)=0$
$$
\begin{align}
\frac{d^{2}\Psi}{dx} & =-\left( \frac{2m}{\hbar^{2}} \right) E \Psi \\
 & =-k^{2}\Psi
\end{align}
$$
Recall

---
Solution:
1. $\Psi(x)=C_{1}e^{ikx}+C_{2}e^{-ikx}$
2. $\Psi(x)=C_{1}\cos(kx)+ C_{2}\sin(kx)$ (picked this version)

The solution is in the form of 
$$\Psi(x)=A\sin(kx)+ B\cos(kx)$$
Impose the boundary condition:
1. $\Psi(x=0)=B\cos(0)=0$
$$\boxed{B=0}$$
1. $\Psi(x=a)=A\sin(ka)=0$
$$\begin{align}
\sin(ka) & =0 \\
 ka & =+\boldsymbol{\pi},+2\boldsymbol{\pi},+3\boldsymbol{\pi}\dots \\
 k_{n} & =\frac{n\boldsymbol{\pi}}{a} \quad \{n\in \mathbb{N}\} \Rightarrow \boxed{E_{n}=\frac{\hbar^{2}\pi^{2}n^{2}}{2ma^{2}}} 
\end{align}$$
>Note: $n \neq 0$, since the eq. would vanish entirely. $n>0$, for positive $k$.

## 3. Normalization

$$\Psi(x)=A\sin(k_{n}x)=A\sin\left( \frac{n\pi x}{a} \right)$$
We normalize $$
\begin{align}
\int^a_{b}|\Psi_{n}(x)|^{2}\, dx & =1 \\
A^{2}\int^a_{b}\sin ^{2}\left( \frac{n\pi x}{a} \right)\, dx & =1 \\
A^{2}\cdot \frac{a}{2} & =1 \Rightarrow A=\sqrt{ \frac{2}{a} }
\end{align}
$$
Final Solution:
$$\Psi(x)=A\sin(k_{n}x)=\sqrt{ \frac{2}{a} }\sin\left( \frac{n\pi x}{a} \right) \quad \{n\in \mathbb{N}\}$$
(A): Why $E_{1}>0$?
$$\begin{aligned}  \Delta x &\sim a \\  \Delta p \cdot \Delta x &\sim \hbar \\  \Delta p &\sim \frac{\hbar}{a} \quad \Longrightarrow \quad KE\sim \frac{(\Delta p)^2}{2 m} \sim \frac{\hbar^2}{2 m a^2}\end{aligned}$$
(B) States with higher energy have more nodes
(C) States are orthonormal:
$$\int_0^a d x \Psi_n^*(x) \Psi_m(x)=\delta_{n m}$$
(D) Completeness: $f(x)$ defined on the interval $[0,a]$, with $f(x=0) = f(x=a) = 0$.

Fourier Series Representation:
$$
f(x) = \sum_{n=1}^{\infty} c_n \psi_n(x) = \sqrt{\frac{2}{a}} \sum_{n=1}^{\infty} c_n \sin\left(\frac{n\pi x}{a}\right)
$$
$$
\begin{align}
\int_0^a dx \, \Psi_m^*(x) f(x)  & = \sum_{n=1}^{\infty} C_n \int_0^a dx \, \Psi_m^*(x) \Psi_n(x)
\\ & =\sum_{n=1}^{\infty} C_n \delta_{m,n} \\
 & =C_m
\end{align}
$$$$

$$
$$
\boxed{C_m = \int_0^a dx \, \Psi_m^*(x) f(x)}
$$

$$
\delta_{m,n} =
\begin{cases} 
1, & \text{if } m = n \\
0, & \text{if } m \neq n
\end{cases}
$$





