Below is a compact, step-by-step walkthrough of the weak-field limit and Newtonian reduction using the book’s notation exactly: (g_{\mu\nu}=\eta_{\mu\nu}+h_{\mu\nu}) with (|h_{\mu\nu}|\ll1), indices raised/lowered with (\eta_{\mu\nu}) ((-,+,+,+) signature), and the Einstein equation written with lowered indices
$$
R_{\mu\nu}=8\pi G!\left(T_{\mu\nu}-\tfrac12 g_{\mu\nu}T\right).
$$
# 1) Linearization setup
$$
g_{\mu\nu}=\eta_{\mu\nu}+h_{\mu\nu},\qquad
g^{\mu\nu}=\eta^{\mu\nu}-h^{\mu\nu}+O(h^2),\qquad
h\equiv \eta^{\alpha\beta}h_{\alpha\beta}.
$$
Christoffel symbols to first order:
$$
\Gamma^{\alpha}{}*{\mu\nu}
=\tfrac12 \eta^{\alpha\beta}!\left(\partial*\mu h_{\nu\beta}
+\partial_\nu h_{\mu\beta}-\partial_\beta h_{\mu\nu}\right).
$$
Ricci tensor to first order (book’s form):
$$
\begin{aligned}
R_{\mu\nu}
&=\partial_\rho \Gamma^\rho{}*{\mu\nu}-\partial*\nu \Gamma^\rho{}*{\mu\rho}\
&=\tfrac12\Big[\partial*\rho\partial_\mu h^\rho{}*{\nu}
+\partial*\rho\partial_\nu h^\rho{}*{\mu}
-\partial*\mu\partial_\nu h
-\partial_\rho\partial^\rho h_{\mu\nu}\Big].
\tag{22.8a}
\end{aligned}
$$
Define the (trace-reversed) gauge combination
$$
\bar h_{\mu\nu}\equiv h_{\mu\nu}-\tfrac12 \eta_{\mu\nu}h,
\qquad
H_\nu\equiv \partial^\mu \bar h_{\mu\nu}
=\partial^\mu h_{\mu\nu}-\tfrac12 \partial_\nu h.
\tag{22.8b}
$$
Impose the **harmonic (Lorenz) gauge** required by (\nabla_\mu G^{\mu\nu}=0):
$$
H_\nu=0\quad\Longleftrightarrow\quad
\partial^\mu \bar h_{\mu\nu}=0.
$$
Under (H_\nu=0),
$$
R_{\mu\nu}=-\tfrac12,\partial_\rho\partial^\rho \bar h_{\mu\nu}
=-\tfrac12,\Box,\bar h_{\mu\nu}.
$$
Insert into Einstein’s equation (lowered indices, linear order, replace (g_{\mu\nu}\to\eta_{\mu\nu}) on the RHS):
$$
\boxed{;\Box,\bar h_{\mu\nu}=-16\pi G!\left(T_{\mu\nu}-\tfrac12 \eta_{\mu\nu}T\right);}
\tag{22.9}
$$
# 2) Stationary, weak-field limit and Poisson equations

Assume time-independent sources (the “stationary-source limit”), so (\partial_0(\cdot)=0) and (\Box\to \nabla^2). For nonrelativistic matter,
$$
T_{00}\approx \rho,\quad T_{0i}\approx \rho,v_i,\quad T_{ij}\ll T_{00},\quad
T=\eta^{\alpha\beta}T_{\alpha\beta}\approx -\rho.
$$
00-component:
$$
\begin{aligned}
\nabla^2 \bar h_{00}&=-16\pi G!\left(T_{00}-\tfrac12 \eta_{00}T\right)
=-16\pi G!\left(\rho-\tfrac12(-1)(-\rho)\right)\
&=-8\pi G,\rho.
\end{aligned}
$$
Define the **gravitoelectric potential** by the book’s convention
$$
h_{00}=-2\Phi_g \quad\Longrightarrow\quad
\bar h_{00}=h_{00}-\tfrac12\eta_{00}h
;;\stackrel{\text{stationary, weak}}{\longrightarrow};; h_{00}
$$
so that
$$
\boxed{;\nabla^2\Phi_g=4\pi G,\rho.;}
\tag{22.11}
$$
Mixed component (gravitomagnetic potential):
$$
\nabla^2 \bar h_{0i}=-16\pi G,T_{0i};;\Rightarrow;;
\nabla^2 h_{0i}=-16\pi G,T_{0i}.
$$
Writing (T_{0i}) as the mass-current density gives the vector potential that sources the “gravitomagnetic” field discussed in the text.

# 3) Geodesic motion to first order (test particle)

With (u^\mu\approx (1,\mathbf v)) and keeping leading terms,
$$
\frac{d^2 x^i}{dt^2}
=-\Gamma^{i}{}*{00}-2,\Gamma^{i}{}*{0j}v^j+O(h,v^2)
;=;-\tfrac12,\partial_i h_{00}+\partial_0 h_{0i}-\big(\partial_i h_{0j}-\partial_j h_{0i}\big)v^j.
\tag{22.14}
$$
For **stationary** fields ((\partial_0 h_{0i}=0)) and slow motion, the dominant piece is
$$
\boxed{;\displaystyle \frac{d^2 x^i}{dt^2}=-\tfrac12,\partial_i h_{00}
=-\partial_i \Phi_g,;}
$$
which is precisely Newton’s law in a potential (\Phi_g).

# 4) Spherical, static source and the external metric

For a spherically symmetric, static source with total mass (M), outside the matter region ( \nabla^2\Phi_g=0) with (\Phi_g\to 0) at infinity gives
$$
\Phi_g(\mathbf r)=-\frac{GM}{r}.
$$
Using the weak-field relations
$$
g_{00}=-(1+2\Phi_g),\qquad g_{ij}=(1-2\Phi_g),\delta_{ij},
$$
one obtains the book’s exterior line element to first order in (GM/r):
$$
\boxed{;ds^2=-(1-\tfrac{2GM}{r}),dt^2+\big(1+\tfrac{2GM}{r}\big)(dx^2+dy^2+dz^2),;}
\tag{22.16}
$$
and the corresponding nonrelativistic radial acceleration
$$
\dot{\mathbf v}=-\nabla \Phi_g=-\frac{GM}{r^2},\hat{\mathbf r}.
\tag{22.17}
$$
# 5) Stress–energy examples (book conventions)

* **Dust (“particles”)**: $T^{\mu\nu}=\rho_0 u^\mu u^\nu$ with (u^\mu u_\mu=-1) and (\rho_0) the rest-frame density; geodesic motion follows from (\nabla_\mu T^{\mu\nu}=0) and the weak-field analysis.
* **Perfect fluid** (first order): the book writes the decomposed pieces leading to a **gravitoelectric energy density** and a **gravitomagnetic current** that source (\Phi_g) and (h_{0i}) via the Poisson-type equations above.

---

## What to look for conceptually

* The four gauge relations (H_\nu=0) remove the four extra coordinate degrees of freedom, leaving the 6 physical components of (h_{\mu\nu}) subject to the 10 Einstein equations (consistent with the constraint structure highlighted in the text).
* The Newtonian limit emerges from (h_{00}=-2\Phi_g) together with the geodesic equation.
* For time-dependent sources, the same linearized equations yield wave solutions for (\bar h_{\mu\nu}) and the gravito-electromagnetic analogy used later in the chapter.

If you want to push this further, the next natural step is solving (\Box,\bar h_{\mu\nu}=-16\pi G!\left(T_{\mu\nu}-\tfrac12 \eta_{\mu\nu}T\right)) with retarded Green’s functions to get radiative fields and then specializing to the transverse–traceless gauge for gravitational waves.
