We first set $t = T -\tau$, then $\frac{ \partial V }{ \partial t }= -\frac{ \partial V }{ \partial \tau }$. So we substitute into the original equation to get 
$$
\frac{\partial V}{\partial t}-\frac{1}{2} \sigma_{\mathrm{BS}}^2 x^2 \frac{\partial^2 V}{\partial x^2}-r x \frac{\partial V}{\partial x}+r V=0 \tag 2
$$
where use $\sigma_{\mathrm{BS}}$ for the original equation, because the divergence one also uses $\sigma$. We next work to expand the "divergence" form
$$
\begin{aligned}
\frac{\partial V}{\partial t}-\frac{\partial}{\partial x}\left(\mu(x) \frac{\partial V}{\partial x}\right)+\beta(x) \frac{\partial V}{\partial x}+\sigma V & =0 \\
\frac{\partial V}{\partial t}-\left( \frac{\partial \mu(x)}{\partial x} \frac{\partial V}{\partial x} +\mu(x) \frac{ \partial^{2}V }{ \partial x^{2} }  \right)+\beta(x) \frac{\partial V}{\partial x}+\sigma V & =0  \\
\frac{\partial V}{\partial t}-\underbrace{\mu(x)}_{\frac{1}{2} \sigma_{\mathrm{BS}}^2 x^2} \frac{\partial^2 V}{\partial x^2}-\underbrace{\left(\frac{\partial \mu(x)}{\partial x}-\beta(x)\right)}_{r x} \frac{\partial V}{\partial x}+\underbrace{\sigma}_r V=0 \\
\end{aligned}
$$
Then the matching coefficient are
$$
\begin{aligned}
\mu(x) & = \frac{1}{2}\sigma_{\mathrm{BS}}^{2} x^{2}\\
\frac{ \partial \mu(x)}{ \partial x} - \beta(x)  & = rx \\
\sigma & = r
\end{aligned}
$$
so
$$
\begin{aligned}
 \beta(x)  & = \frac{ \partial \mu(x) }{ \partial x } - rx  \\
  & =\sigma_{\mathrm{BS}}^{2} x - rx \\
   &  = (\sigma_{\mathrm{BS}}^{2} - r)x
\end{aligned}
$$Now plug in the numbers $\sigma_{\mathrm{BS}}=0.1, r=0.05$ to have
$$
\begin{aligned}
\mu(x) & =\frac{1}{2}(0.1)^2 x^2 =0.005 x^2 \\
\beta(x) & =\left((0.1)^2-0.05\right) x  =-0.04 x \\[4pt]
\sigma & =0.05
\end{aligned}
$$Therefore, the transformed divergence-form initial-boundary value problem is
$$
\begin{aligned}
\frac{\partial V}{\partial t}
-\frac{\partial}{\partial x}\left(0.005x^2\frac{\partial V}{\partial x}\right)
-0.04x\frac{\partial V}{\partial x}
+0.05V
&=0,
\qquad t\in(0,1],\ x\in(0,100)
\\
V(x,0)&=\max(30-x,0)
\\
V(0,t)&=30e^{-0.05t}
\\
V(100,t)&=0
\end{aligned}
$$








---



Let $I = (0, x_{MAX})$, and $X=H_{0}^{1}(I)$. The test function satisfies $v(0)=v(x_{\mathrm{MAX}})=0$ since $v\in X=H_0^1(I)$. Then, we multiplying the PDE by $v\in X$ and integrating over $(0, x_{\text{MAX}})$, we get
$$
\begin{aligned}
\int_0^{x_{\mathrm{MAX}}} \frac{\partial V}{\partial t}v\,dx
\underbrace{ -\int_0^{x_{\mathrm{MAX}}}
\frac{\partial}{\partial x}\left(\mu(x)\frac{\partial V}{\partial x}\right)v\,dx }_{ A }
+\int_0^{x_{\mathrm{MAX}}}\beta(x)\frac{\partial V}{\partial x}v\,dx
+\int_0^{x_{\mathrm{MAX}}}\sigma Vv\,dx
&=0.
\end{aligned}
$$
For part $A$, the diffusion term, integration by parts gives
$$
\begin{aligned}
-\int_0^{x_{\mathrm{MAX}}}
\frac{\partial}{\partial x}\left(\mu(x)\frac{\partial V}{\partial x}\right)v\,dx
&=\cancel{ 
-\left[
\mu(x)\frac{\partial V}{\partial x}v
\right]_0^{x_{\mathrm{MAX}}} }
+
\int_0^{x_{\mathrm{MAX}}}
\mu(x)\frac{\partial V}{\partial x}\frac{\partial v}{\partial x}\,dx
\\
&=
\int_0^{x_{\mathrm{MAX}}}
\mu(x)\frac{\partial V}{\partial x}\frac{\partial v}{\partial x}\,dx
\end{aligned}
$$
for $v(0)=v(x_{\mathrm{MAX}})=0$. Therefore, the weak formulation is, for all $v \in H_{0}^{1}(I)$,
$$
\underbrace{\int_0^{x_{\mathrm{MAX}}} \frac{\partial V}{\partial t} v\,dx}_{\left(\frac{\partial V}{\partial t}, v\right)}
+
\underbrace{
\int_0^{x_{\mathrm{MAX}}} \mu(x) \frac{\partial V}{\partial x} \frac{\partial v}{\partial x}\,dx
+
\int_0^{x_{\mathrm{MAX}}} \beta(x) \frac{\partial V}{\partial x} v\,dx
+
\int_0^{x_{\mathrm{MAX}}} \sigma V v\,dx
}_{a(V, v)}
=0
$$
where $V(0,t)=Ee^{-rt}$, $V(x_{\mathrm{MAX}},t)=0$, and initial condition $V(x,0)=\max(E-x,0).$ Equivalently, we have
$$
\boxed{
\left(\frac{\partial V}{\partial t},v\right)+a(V,v)=0
\qquad \forall v\in H_0^1(I).
}
$$

---

Next, we divide the interval $[0,x_{\mathrm{MAX}}]$ into a mesh
$$
0=x_0<x_1<\cdots <x_N=x_{\mathrm{MAX}},
\qquad h=\frac{x_{\mathrm{MAX}}}{N}.
$$
Let $X_h\subset H_0^1(I)$ be the piecewise linear finite element space
$$
X_h
=
\left\{
v_h\in C([0,x_{\mathrm{MAX}}]):
v_h|_{[x_i,x_{i+1}]}\in P_1
\right\}.
$$
where $v_h(0)=v_h(x_{\mathrm{MAX}})=0$. Let $\{\varphi_j\}_{j=1}^{N-1}$ be the interior hat basis functions. Since the boundary condition at $x=0$ is nonhomogeneous, we use a lifting function $L_{g,h}$ and for ${} U_h \in X_h$, we write ${} V_h=L_{g, h}+U_h {}$ and $L_{g,h}(0,t)=Ee^{-rt}, L_{g,h}(x_{\mathrm{MAX}},t)=0$. Then we have
$$
U_h(x,t)=\sum_{j=1}^{N-1}U_j(t)\varphi_j(x)\in X_h.
$$
Next, we take $v_h=\varphi_i$, $i=1,\ldots,N-1$ to get
$$
\begin{aligned}
\left(\frac{\partial L_{g,h}}{\partial t}+\frac{\partial U_h}{\partial t},\varphi_i\right)
+a(L_{g,h}+U_h,\varphi_i)
&=0
\\
\left(\frac{\partial U_h}{\partial t},\varphi_i\right)
+a(U_h,\varphi_i)
&=
-\left(\frac{\partial L_{g,h}}{\partial t},\varphi_i\right)
-a(L_{g,h},\varphi_i).
\end{aligned}
$$
Since we know $U_h(x,t)=\sum_{j=1}^{N-1}U_j(t)\varphi_j(x)$, then we also have
$$
\begin{aligned}
\left(\frac{\partial U_h}{\partial t},\varphi_i\right)
+a(U_h,\varphi_i)
&=
\left(\sum_{j=1}^{N-1}\frac{dU_j}{dt}\varphi_j,\varphi_i\right)
+
a\left(\sum_{j=1}^{N-1}U_j(t)\varphi_j,\varphi_i\right)
\\
&=
\sum_{j=1}^{N-1}
\frac{dU_j}{dt}
(\varphi_j,\varphi_i)
+
\sum_{j=1}^{N-1}
U_j(t)
a(\varphi_j,\varphi_i)
\end{aligned}
$$
Therefore, we have
$$
\begin{align}
\sum_{j=1}^{N-1}
\frac{dU_j}{dt}
\underbrace{(\varphi_j,\varphi_i)}_{M_{ij}}
+
\sum_{j=1}^{N-1}
U_j(t)
\underbrace{a(\varphi_j,\varphi_i)}_{K_{ij}}
 & =
\underbrace{ -\left(\frac{\partial L_{g,h}}{\partial t},\varphi_i\right)
-a(L_{g,h},\varphi_i) }_{b_i(t)}\\
\Longrightarrow\qquad
M\frac{d\mathbf U}{dt}+K\mathbf U  & =\mathbf b(t)
\end{align}
$$
where
$$
\begin{aligned}
M_{ij}
&=
(\varphi_j,\varphi_i)
=
\int_0^{x_{\mathrm{MAX}}}\varphi_j\varphi_i\,dx\\
K_{ij}
&=
a(\varphi_j,\varphi_i)
=
\int_0^{x_{\mathrm{MAX}}}\mu(x)\varphi_j'\varphi_i'\,dx
+
\int_0^{x_{\mathrm{MAX}}}\beta(x)\varphi_j'\varphi_i\,dx
+
\int_0^{x_{\mathrm{MAX}}}\sigma\varphi_j\varphi_i\,dx.
\end{aligned}
$$
Finally, we apply the $\vartheta$-method. We let $t_n=n\Delta t,\mathbf U^n\approx \mathbf U(t_n)$, so the above equation turns into
$$
\begin{aligned}
M\frac{\mathbf U^{n+1}-\mathbf U^n}{\Delta t}
+
\vartheta K\mathbf U^{n+1}
+
(1-\vartheta)K\mathbf U^n
&=
\vartheta\mathbf b^{n+1}
+
(1-\vartheta)\mathbf b^n
\\
M\mathbf U^{n+1}-M\mathbf U^n
+
\vartheta\Delta t K\mathbf U^{n+1}
+
(1-\vartheta)\Delta t K\mathbf U^n
&=
\Delta t
\left[
\vartheta\mathbf b^{n+1}
+
(1-\vartheta)\mathbf b^n
\right]
\\
M\mathbf U^{n+1}
+
\vartheta\Delta t K\mathbf U^{n+1}
&=
M\mathbf U^n
-
(1-\vartheta)\Delta t K\mathbf U^n
+
\Delta t
\left[
\vartheta\mathbf b^{n+1}
+
(1-\vartheta)\mathbf b^n
\right]
\\
\left(M+\vartheta\Delta t K\right)\mathbf U^{n+1}
&=
\left(M-(1-\vartheta)\Delta t K\right)\mathbf U^n
+
\Delta t
\left[
\vartheta\mathbf b^{n+1}
+
(1-\vartheta)\mathbf b^n
\right]
\end{aligned}
$$
The initial condition is imposed in the finite element space by taking $V_h^0 \approx V(x,0)=\max(E-x,0)$ and since we have the lifting $V_h=L_{g,h}+U_h$, we choose $U_h^0\in X_h$ such that
$$
L_{g,h}(x,0)+U_h^0(x)\approx \max(E-x,0).
$$
At the interior nodes $x_j$, this gives
$$
\begin{aligned}
L_{g,h}(x_j,0)+U_h^0(x_j)
&=\max(E-x_j,0)
\\
U_j^0
&=\max(E-x_j,0)-L_{g,h}(x_j,0),
\qquad j=1,\ldots,N-1.
\end{aligned}
$$
For the convergence rate, according to the theorem we studied, FEM and $\vartheta$-method approximation satisfies $$\|V-V_h\|_{L^\infty(L^2)}
+
\|V-V_h\|_{L^2(H^1)}
\le
C\left(\Delta t^{p(\vartheta)}+h^r\right).
$$For piecewise linear finite elements, $\deg=1$. Assuming enough spatial regularity so that $s\geq 1$, $r=\min\{1,s\}=1.$ Therefore,
$$
\boxed{
\vartheta=1:\quad O(\Delta t+h)
}
$$
for Backward Euler, and
$$
\boxed{
\vartheta=\frac12:\quad O(\Delta t^2+h)
}
$$
for Crank--Nicolson. Also,
$$
\vartheta<\frac12
\quad\Longrightarrow\quad
\text{conditionally stable},
\qquad
\vartheta\geq\frac12
\quad\Longrightarrow\quad
\text{unconditionally stable}.
$$




$\mathring V_h$ but then switch to $U_h$. Make the notation explicit: