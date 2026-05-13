Idea:
$$
M \rightarrow SM \rightarrow \partial SM \rightarrow \partial_{+}SM \rightarrow \tau(x,v) \rightarrow \text{Santaló formula} \rightarrow \operatorname{Vol}(M)
$$
Definitions:
$$
\begin{aligned}
SM_g
&=\{(x,v):x\in M,\ v\in T_xM,\ |v|_g=1\} \\
\partial SM_g
&=\{(x,v)\in SM_g:x\in\partial M\} \\
\partial_{+}SM_g
&=\{(x,v)\in\partial SM_g:\langle v,\nu(x)\rangle_g\ge0\}
\qquad \text{inward}
\end{aligned}
$$
where the lecture uses $\nu=$ inward unit normal. Define boundary-angle weight
$$
\mu_g(x,v):=\langle v,\nu(x)\rangle_g,
\qquad
d\mu_g:=\mu_g\,d\Sigma^{2n-2}_g.
$$
Simple = *strictly convex boundary* + *non-trapping* + *no conjugate points*. Hence for $(x,v)\in\partial_+SM_g$, the geodesic $\gamma_{x,v}$ exits at
$$
y=\gamma_{x,v}(\tau_g(x,v))\in\partial M.
$$
Since $\gamma_{x,v}$ has unit speed, we have $\tau_g(x,v)$. Since $g$ is simple, this geodesic is minimizing, so $\tau_g(x,v)=d_g(x,y).$  
$$
\begin{aligned}
d_{g_1}&=d_{g_2}\text{ on }\partial M\times\partial M\\
& \Longrightarrow\exists \psi:M\to M,\ \psi|_{\partial M}=\mathrm{Id},\ 
\tilde g_2=\psi^*g_2,\ 
g_1|_{\partial M}=\tilde g_2|_{\partial M}\\
&\Longrightarrow \partial_+SM_{g_1}=\partial_+SM_{g_2}=:\partial_+SM
 \quad\text{same }|v|_g,\ \nu,\ \langle v,\nu\rangle_g
\end{aligned}
$$
based on Prop. 11.2.1 after boundary-fixing gauge. Same boundary metric also gives $d\mu_1=d\mu_2=:d\mu$. Simple metrics + same boundary distance determine lens data:
$$
d_{g_1}=d_{g_2}
\Longrightarrow
\tau_{g_1}|_{\partial_+SM}=\tau_{g_2}|_{\partial_+SM}.
$$
Write $\tau_i:=\tau_{g_i}.$ Proposition 3.6.6, and Santaló formula gives:
$$
\underbrace{\int_{SM_g} f\,d\Sigma^{2n-1}_g}_{\text{over all unit tangent vectors}}
=
\underbrace{
\int_{\partial_+SM_g}
\int_0^{\tau_g(x,v)}
f(\gamma_{x,v}(t))\,dt\,d\mu_g}_{\text{along geodesics from inward boundary data to exit}}
$$
For $f=1$,
$$
\begin{aligned}
\operatorname{Vol}(SM_g,g)
&=\int_{SM_g}1\,d\Sigma^{2n-1}_g \\
&=\int_{\partial_+SM_g}\int_0^{\tau_g(x,v)}1\,dt\,d\mu_g \\
&=\int_{\partial_+SM_g}\tau_g(x,v)\,d\mu_g.
\end{aligned}
$$
$$
\begin{aligned}
\operatorname{Vol}(SM_g,g_{1})&=
\int_{\partial_+SM_{g_1}}\tau_1(x,v)\,d\mu_1(x,v)\\
&=
\int_{\partial_+SM_{g_2}}\tau_2(x,v)\,d\mu_2(x,v)
= \operatorname{Vol}(SM_{g_2},g_2)
\end{aligned}
$$
$$
\Longrightarrow \quad SM_g=\bigcup_{x\in M}S_xM,
\qquad
S_xM=\{v\in T_xM:|v|_g=1\}.
$$
Let $\sigma_{n-1}:=\operatorname{Vol}(S^{n-1})$ due to $S_x M \cong S^{n-1}$. Then
$$
\begin{aligned}
\operatorname{Vol}(S M, g) & =\int_M \int_{S_x M} 1 d S_x d V_g(x) \\
& =\int_M \underbrace{\operatorname{Vol}\left(S_x M\right)}_{\sigma_{n-1}} d V_g(x) \\
& =\sigma_{n-1} \operatorname{Vol}(M, g)
\end{aligned}
$$






$$
\begin{aligned}
D(\alpha\wedge\beta)
&=\underbrace{ \bigl(i_Xd\alpha+d(i_X\alpha)\bigr) }_{ D\alpha }\wedge\beta\\
&\quad+\alpha\wedge\underbrace{ \bigl(i_Xd\beta+d(i_X\beta)\bigr) }_{ D\beta }\\
&\quad+\cancel{ \Bigl((-1)^{r+1}+(-1)^r\Bigr) }d\alpha\wedge i_X\beta\\
&\quad+\cancel{ \Bigl((-1)^r+(-1)^{r-1}\Bigr) }i_X\alpha\wedge d\beta\\
&= D \alpha \wedge \beta+\alpha \wedge D \beta
\end{aligned}
$$