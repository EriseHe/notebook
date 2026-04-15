### Problem 7.39

Suppose
  $$
  \mathbf{E}(r,t)=\frac{1}{4\pi\epsilon_0}\frac{q}{r^2}\,\theta(vt-r)\,\hat{\mathbf{r}},
  \qquad
  \mathbf{B}(r,t)=0.
  $$
  (The theta function is defined in Prob.1.46b.) Show that these fields satisfy all of Maxwell's equations, and determine $\rho$ and $\mathbf{J}$. Describe the physical situation that gives rise to these fields.
  
---

We use Maxwell's equations in the form given in Eq.~(7.52). The field is
$$
\mathbf E(\mathbf r,t)=\frac{1}{4\pi\epsilon_0}\frac{q}{r^2}\theta(vt-r)\hat{\mathbf r}
\qquad
\mathbf B(\mathbf r,t)=0
$$
We first determine $\rho$ from Gauss's law. We write
$$
\begin{aligned}
\mathbf E&=\frac{q}{4\pi\epsilon_0}\theta(vt-r)\frac{\hat{\mathbf r}}{r^2}\\
\Longrightarrow\nabla \cdot \mathbf E
&=
\frac{q}{4\pi\epsilon_0}
\nabla \cdot \left[\theta(vt-r)\frac{\hat{\mathbf r}}{r^2}\right] \\
&=
\frac{q}{4\pi\epsilon_0}
\left[
\theta(vt-r)\underbrace{ \nabla\cdot\left(\frac{\hat{\mathbf r}}{r^2}\right) }_{ 4\pi\delta^3(\mathbf r) }
+
\frac{\hat{\mathbf r}}{r^2}\cdot \underbrace{ \nabla\theta(vt-r) }_{ A}
\right]\\
&= \frac{q}{4\pi\epsilon_{0}}[\theta(vt -r)4\pi\delta^{3}(\mathbf{r})-\frac{\hat{\mathbf r}}{r^{2}}\cdot A]
\end{aligned}
$$
For $A$, if $u=vt-r$, then
$$
\frac{d\theta(u)}{du}=\delta(u)
$$
hence
$$
\begin{aligned}
\nabla\theta(vt-r)
&=
\delta(vt-r)\nabla(vt-r) \\
&=
-\delta(vt-r)\hat{\mathbf r}
\end{aligned}
$$
Therefore
$$
\begin{aligned}
\nabla \cdot \mathbf E
&=
\frac{q}{4\pi\epsilon_0}
\left[
4\pi\theta(vt-r)\delta^3(\mathbf r)
-
\frac{1}{r^2}\delta(vt-r)
\right]
\end{aligned}
$$
So Gauss's law gives us this
$$
\begin{aligned}
\rho(\mathbf r,t)
&=
\epsilon_0 \nabla \cdot \mathbf E \\
&=
q\,\theta(vt-r)\delta^3(\mathbf r)
-
\frac{q}{4\pi r^2}\delta(vt-r)\\

&=
q\,\theta(t)\delta^3(\mathbf r)
-
\frac{q}{4\pi r^2}\delta(vt-r)
\end{aligned}
$$
Since $\delta^3(\mathbf r)$ has support only at $r=0$ s.t. the factor $\theta(vt-r)$ becomes $\theta(vt)=\theta(t)$. 

Next, since $\mathbf B=0$, then $\nabla\cdot \mathbf B=0$. For Faraday's law, we can use spherical-coordinate curl formula. Here
$$
E_r=\frac{1}{4\pi\epsilon_0}\frac{q}{r^2}\theta(vt-r)
\qquad
E_\theta=0
\qquad
E_\phi=0
$$
and there is no angular dependence. Hence, 
$$
\nabla\times \mathbf E=0 \quad \Longrightarrow \quad \nabla\times \mathbf E+\frac{\partial \mathbf B}{\partial t}=0
$$
Next, from Eq.~(7.52),
$$
\begin{align} \\
\underbrace{ \nabla\times \mathbf B }_{0}-\cancel{ \mu_0 }\epsilon_0\frac{\partial \mathbf E}{\partial t} & =\cancel{ \mu_0}\mathbf J\\
-\epsilon_0\frac{\partial \mathbf E}{\partial t}  & = \mathbf J  \\
\end{align}
$$
Now, since
$$
\begin{align}
\frac{\partial \mathbf E}{\partial t}
&=
\frac{q}{4\pi\epsilon_0 r^2}
\underbrace{ \frac{\partial}{\partial t}\theta(vt-r) }_{ v\delta(vt-r) }\hat{\mathbf r} \\
&=
\frac{qv}{4\pi\epsilon_0 r^2}\delta(vt-r)\hat{\mathbf r}
\end{align}
$$
Plug it back to the formula, we have
$$
\begin{align}
\mathbf J(\mathbf r,t)
 & = -\epsilon_{0}\left( \frac{qv}{4\pi\epsilon_{0}r^{2}} \delta(vt-r)\mathbf{\hat{r}}\right)  \\
 & =-\frac{qv}{4\pi r^2}\delta(vt-r)\hat{\mathbf r}
\end{align}
$$

To describe the physical situation, check that the second term in $\rho$ is a spherical shell at radius $r=vt$. Its total charge would be
$$
\begin{aligned}
Q
&=
\int
\left(
-\frac{q}{4\pi r^2}\delta(vt-r)
\right)
\,d\tau \\
&=
-\frac{q}{4\pi}
\int \delta(vt-r)\,r^2\sin\theta\,dr\,d\theta\,d\phi \,\frac{1}{r^2} \\
&=
-\frac{q}{4\pi}
\int \delta(vt-r)\sin\theta\,dr\,d\theta\,d\phi \\
&=
-\frac{q}{4\pi}(1)(4\pi) \\
&=
-q
\end{aligned}
$$
which means the fields describe a point charge $+q$ at the origin together with a thin spherical shell of charge $-q$ moving outward at speed $v$. Specifically, we have
$$
\begin{align}
\mathbf E & =\frac{1}{4\pi\epsilon_0}\frac{q}{r^2}\hat{\mathbf r}
\qquad &  & (r>vt)\\
\mathbf E & =0
\qquad &  & (r<vt)
\end{align}
$$
and by spherical symmetry
$$
\mathbf B=0
$$

### Problem 7.49

If a magnetic dipole levitating above an infinite superconducting plane (Prob.7.48) is free to rotate, what orientation will it adopt, and how high above the surface will it float?

---

\item[P7.49] Decompose the dipole moment into components perpendicular and parallel to the plane:
$$
\mathbf m=\mathbf m_{\parallel}+\mathbf m_{\perp}
\qquad
\mathbf m_{\perp}=(\mathbf m\cdot \hat{\mathbf z})\hat{\mathbf z}
\qquad
\mathbf m_{\parallel}\cdot \hat{\mathbf z}=0
$$

By Problem 7.48 and linearity, the image dipole is
$$
\mathbf m'=\mathbf m_{\parallel}-\mathbf m_{\perp}
$$

At the location of the real dipole, the separation from the image is
$$
\mathbf r=2h\,\hat{\mathbf z}
\qquad
r=2h
\qquad
\hat{\mathbf r}=\hat{\mathbf z}
$$

Using Eq.~(5.89),
$$
\mathbf B_{\text{im}}
=
\frac{\mu_0}{4\pi r^3}\Bigl[3(\mathbf m'\cdot \hat{\mathbf r})\hat{\mathbf r}-\mathbf m'\Bigr]
$$
so
$$
\begin{aligned}
\mathbf B_{\text{im}}
&=
\frac{\mu_0}{4\pi (2h)^3}
\Bigl[3(\mathbf m'\cdot \hat{\mathbf z})\hat{\mathbf z}-\mathbf m'\Bigr] \\
&=
\frac{\mu_0}{32\pi h^3}
\Bigl[-3\mathbf m_{\perp}-\mathbf m_{\parallel}+\mathbf m_{\perp}\Bigr] \\
&=
-\frac{\mu_0}{32\pi h^3}\Bigl(\mathbf m_{\parallel}+2\mathbf m_{\perp}\Bigr)
\end{aligned}
$$

Now use Eq.~(6.1):
$$
\mathbf N=\mathbf m\times \mathbf B_{\text{im}}
$$
Hence
$$
\begin{aligned}
\mathbf N
&=
\left(\mathbf m_{\parallel}+\mathbf m_{\perp}\right)
\times
\left[
-\frac{\mu_0}{32\pi h^3}\left(\mathbf m_{\parallel}+2\mathbf m_{\perp}\right)
\right] \\
&=
-\frac{\mu_0}{32\pi h^3}
\left[
2\mathbf m_{\parallel}\times \mathbf m_{\perp}
+
\mathbf m_{\perp}\times \mathbf m_{\parallel}
\right] \\
&=
-\frac{\mu_0}{32\pi h^3}\,\mathbf m_{\parallel}\times \mathbf m_{\perp}
\end{aligned}
$$

Let $\theta$ be the angle between $\mathbf m$ and $\hat{\mathbf z}$, so that
$$
|\mathbf m_{\parallel}|=m\sin\theta
\qquad
|\mathbf m_{\perp}|=m\cos\theta
$$
Then
$$
|\mathbf N|
=
\frac{\mu_0 m^2}{32\pi h^3}\sin\theta\cos\theta
$$

For $0<\theta<\pi/2$, the torque increases $\theta$, so the dipole is driven away from the normal direction and toward the plane. Thus the perpendicular orientation is unstable, and the stable equilibrium is
$$
\boxed{\theta=\frac{\pi}{2}}
$$
that is, the dipole settles parallel to the superconducting plane

Now set $\mathbf m_{\perp}=0$, so the image dipole is identical:
$$
\mathbf m'=\mathbf m
$$
Choose the common direction as $\hat{\mathbf s}$, parallel to the plane. At a point on the symmetry axis above the plane,
$$
\hat{\mathbf r}=\hat{\mathbf z}
\qquad
\mathbf m\cdot \hat{\mathbf z}=0
$$
so Eq.~(5.89) gives
$$
\mathbf B_{\text{im}}(z)
=
-\frac{\mu_0 m}{4\pi (z+h)^3}\,\hat{\mathbf s}
$$

Using Eq.~(6.3),
$$
\mathbf F=\nabla(\mathbf m\cdot \mathbf B)
$$
and therefore
$$
\begin{aligned}
F_z
&=
\frac{\partial}{\partial z}\bigl(\mathbf m\cdot \mathbf B_{\text{im}}(z)\bigr)\Big|_{z=h} \\
&=
\frac{\partial}{\partial z}
\left(
-\frac{\mu_0 m^2}{4\pi (z+h)^3}
\right)\Bigg|_{z=h} \\
&=
\frac{3\mu_0 m^2}{4\pi (2h)^4} \\
&=
\frac{3\mu_0 m^2}{64\pi h^4}
\end{aligned}
$$

At equilibrium this balances the weight:
$$
\frac{3\mu_0 m^2}{64\pi h^4}=Mg
$$
so
$$
\boxed{
h=
\left(
\frac{3\mu_0 m^2}{64\pi Mg}
\right)^{1/4}
}
$$



