---
date: 2026-04-08
---
## Integration by parts on $SM$

Let $\nu$ be the inward-pointing unit normal vector field on $\partial M$. Then
$$
\begin{aligned}
(Xu,w)_{SM} &= -(u,Xw)_{SM}-(\langle v,\nu\rangle u,w)_{\partial SM} \\
(X_{\perp}u,w)_{SM} &= -(u,X_{\perp}w)_{SM}-(\langle v_{\perp},\nu\rangle u,w)_{\partial SM} \\
(Vu,w)_{SM} &= -(u,Vw)_{SM}
\end{aligned}
$$

We use isothermal coordinates. Then
$$
\begin{aligned}
(Xu,w)_{SM}
&= \int_M \int_0^{2\pi}
\Big(
\underbrace{
e^{\lambda}\left(
\cos\theta\, \frac{\partial u}{\partial x^1}
+\sin\theta\, \frac{\partial u}{\partial x^2}
\right)\bar w
}_{A}
\\
&\qquad\qquad\qquad\qquad
+
\underbrace{
e^{\lambda}
\left(
-\frac{\partial \lambda}{\partial x^1}\sin\theta
+\frac{\partial \lambda}{\partial x^2}\cos\theta
\right)
\frac{\partial u}{\partial \theta}\,\bar w
}_{B}
\Big)\, dx\, d\theta
\end{aligned}
$$

Then we calculate, by integration by parts,
$$
\begin{aligned}
\int_M\int_0^{2\pi} A\, dx\, d\theta
&=
-\int_M\int_0^{2\pi}
\Big[
\partial_{x^1}(e^{\lambda}\bar w\cos\theta)
+\partial_{x^2}(e^{\lambda}\bar w\sin\theta)
\Big]u\, dx\, d\theta
\\
&\qquad
-(\langle v,\nu\rangle u,w)_{\partial SM}
\end{aligned}
$$
and
$$
\begin{aligned}
\int_M\int_0^{2\pi} B\, dx\, d\theta
&=
-\int_M\int_0^{2\pi}
\partial_{\theta}
\left[
e^{\lambda}
\left(
-\frac{\partial \lambda}{\partial x^1}\sin\theta
+\frac{\partial \lambda}{\partial x^2}\cos\theta
\right)\bar w
\right]u\, dx\, d\theta
\end{aligned}
$$

So this gives the integration by parts identity for $X$.

## The geodesic ray transform

Next,
$$
If(x,v)=\int_0^{\tau(x,v)} f(\gamma_{x,v}(t))\, dt
$$
where $\tau(x,v)$ is the exit time of the geodesic $\gamma_{x,v}$. We want to show the injectivity of $I$, that is: if $If=0$, then $f=0$. Before, we have that if $If=0$, then there is $u\in C^{\infty}(SM)$ such that
$$
Xu=-f
\qquad \text{and} \qquad
u|_{\partial SM}=0
$$
In particular, $VXu=0$, and we want to study the equation
$$
P=VX
$$


> [!lemma]
> The following are equivalent:
>
> 1. The geodesic ray transform $I:C^{\infty}(M)\to C^{\infty}(\partial_{+}SM)$ is injective
> 2. Any solution $u$ of $Xu=-f$ in $SM$ with $u|_{\partial SM}=0$ and $f\in C^{\infty}(M)$ is identically zero
> 3. Any smooth solution $u$ of $Pu=0$ in $SM$ with $u|_{\partial SM}=0$ is identically zero

Proof.

$(a)\Rightarrow (b):$ By solving $Xu=-f$ along $\gamma_{x,v}$, we get
$$
u(x,v)=u^f(x,v)=\int_0^{\tau(x,v)} f(\gamma_{x,v}(t))\, dt
$$
Since $u=0$ on $\partial SM$, we get $If(x,v)=0$ for $(x,v)\in \partial_{+}SM$. Because $I$ is injective, $f\equiv 0$. Hence $Xu=0$, and with zero boundary values this gives $u\equiv 0$.

$(b)\Rightarrow (c):$ Let $u$ be a solution of $V(Xu)=0$. Then $Xu$ is independent of the fiber variable, so
$$
Xu=-f
\qquad \text{for some } f\in C^{\infty}(M)
$$
We apply (b) to get $u\equiv 0$.

$(c)\Rightarrow (a):$ Assume $f\in C^{\infty}(M)$ such that $If=0$. Then we know that there is $u\in C^{\infty}(SM)$ such that
$$
Xu=-f,
\qquad
u|_{\partial SM}=0
$$
Then
$$
VXu=-Vf=0
$$
so $Pu=0$. By (c), $u\equiv 0$, hence $f\equiv 0$.

$\blacksquare$

# Energy estimate for $P$

We aim to get an estimate of $\|Pu\|_{L^2}$. We know $P=VX$. We consider the formal adjoint
$$
P^*=XV
$$
We set
$$
A=\frac{P+P^*}{2},
\qquad
B=\frac{P-P^*}{2i}
$$
Then
$$
P=A+iB,
\qquad
P^*=A-iB
$$
and we have
$$
\begin{aligned}
\|Pu\|_{L^2}^2
&= (Pu,Pu)_{SM}
= (Au+iBu,\,Au+iBu)_{SM} \\
&= \|Au\|_{L^2}^2+\|Bu\|_{L^2}^2-i(Au,Bu)_{SM}+i(Bu,Au)_{SM}
\end{aligned}
$$

Notice that we need to do integration by parts. We have
$$
A=\frac{VX+XV}{2},
\qquad
B=\frac{VX-XV}{2i}
=\frac{[V,X]}{2i}
=-\frac{1}{2i}X_{\perp}
$$
Assume $u|_{\partial SM}=0$. Then we can apply the integration by parts formula to get
$$
\begin{aligned}
-i(Au,Bu)_{SM}+i(Bu,Au)_{SM}
&= -i(u,ABu)_{SM}+i(u,BAu)_{SM} \\
&= i(u,[B,A]u)_{SM} \\
&= i([A,B]u,u)_{SM}
\end{aligned}
$$

We have the following facts:
$$
\begin{aligned}
(1)\qquad & i[A,B]=\frac{1}{2}[P^*,P] \\
(2)\qquad & \|Au\|^2+\|Bu\|^2
= \frac{1}{2}\big(\|Pu\|^2+\|P^*u\|^2\big)
\end{aligned}
$$
Hence
$$
\|Pu\|^2-\|P^*u\|^2
=
([P^*,P]u,u)_{SM}
$$

We can compute that
$$
[P^*,P]
=
[XV,VX]
=
-X^2+VKV
$$
where $K$ is the Gaussian curvature. Then we get the Pestov identity. If $u\in C^{\infty}(SM)$ with $u|_{\partial SM}=0$, then
$$
\underbrace{\|VXu\|^2}_{\|Pu\|^2}
=
\underbrace{\|XVu\|^2}_{\ge 0}
+
\|Xu\|^2
+
\underbrace{(-(KVu,Vu))}_{\ge 0 \text{ if } K\le 0}
$$
that is,
$$
\|VXu\|^2
=
\|XVu\|^2+\|Xu\|^2-(KVu,Vu)
$$

To get the curvature term, note that
$$
(VKVu,u)_{SM}
=
-(KVu,Vu)_{SM}
$$
since $K=K(x)$ is independent of the fiber variable and $V^*=-V$.