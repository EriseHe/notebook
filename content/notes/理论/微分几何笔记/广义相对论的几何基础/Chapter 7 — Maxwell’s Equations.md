
> **Goal of this chapter.** Starting only from **Gauss’s law** and the **definition of $\mathbf E$** in the static, non‑relativistic limit, we use tensor language to derive the **field tensor $F_{\mu\nu}$**, the **Lorentz force law**, the **covariant Maxwell equations**, and **charge conservation**, all consistent with special relativity. We keep Moore’s notation and insert the missing derivation steps inline (no separate section).

---

## 7.1 Starting point: electrostatics in 3‑vector form
**Gauss’s law (differential form).**
$$\boxed{\ \nabla\!\cdot\!\mathbf E \;=\; \frac{\partial E_x}{\partial x}+\frac{\partial E_y}{\partial y}+\frac{\partial E_z}{\partial z}\;=\;4\pi k\,\rho\ }\tag{7.1}$$
**Definition of $\mathbf E$** via Newton’s second law for a test charge $q$:
$$\boxed{\ \frac{d\mathbf p}{dt}=\mathbf F_e=q\,\mathbf E\ }\tag{7.2}$$
*Why these matter.* (7.1) connects sources to field; (7.2) defines the field operationally. We now seek **tensor versions** valid in all IRFs.

---

## 7.2 Charge is invariant → define the four‑current $J^\mu$
Consider a small box at rest in $S'$ with volume $V'$ and charge $q$. In $S$, moving with speed $\beta$ along $+x$: length contracts, $V=V'/\gamma$, so the observed **charge density** increases:
$$\rho=\gamma\,\rho'\,.\tag{7.3a}$$
Meanwhile a **current density** appears along $+x$:
$$J_x=\gamma\beta\,\rho'\,,\qquad J_y=J_z=0.\tag{7.3b}$$
Collect these as the **four‑current**
$$J^\mu=(\rho,\,\rho v_x,\,\rho v_y,\,\rho v_z)\,,$$
whose components obey the Lorentz transformation. In particular, with $J'^\mu=(\rho',0,0,0)$ in $S'$, the inverse LT gives
$$\rho=\gamma\,(\rho'+\beta J'_x)=\gamma\rho'\,,\quad J_x=\gamma\,(\beta\rho'+J'_x)=\gamma\beta\rho'\,,\quad J_y=J'_y,\ J_z=J'_z\,.\tag{7.4a–c}$$
*Why this matters.* The source in Gauss’s law is the $**time component**$ of a four‑vector. Its covariant partner must be a **four‑vector equation**.

---

## 7.3 Covariant Gauss’s law → introduce the field tensor $F_{\mu\nu}$
A simple way to map a **tensor** to a **four‑vector** is to contract one index with a derivative $\partial_\nu$. Thus the natural covariant generalization of Gauss’s law is
$$\boxed{\ \partial_\nu F^{\mu\nu}=4\pi k\,J^\mu\ }\tag{7.5}$$
for some rank‑2 tensor $F^{\mu\nu}$. The $\mu=t$ component reduces to (7.1) in the IRF/Cartesian case; the $\mu=i$ components become the three equations of the Ampère–Maxwell relation (see §7.5).

*Conclusion.* The electric field must sit inside a **second‑rank antisymmetric tensor** $F_{\mu\nu}$ (antisymmetry shown below). In components (GR units):
$$F_{\mu\nu}=\begin{pmatrix}
0& E_x& E_y& E_z\\
- E_x& 0& B_z& -B_y\\
- E_y& -B_z& 0& B_x\\
- E_z& B_y& -B_x& 0
\end{pmatrix},\qquad F_{\mu\nu}=-F_{\nu\mu}.\tag{7.12}$$

---

## 7.4 Covariant Lorentz force → antisymmetry of $F_{\mu\nu}$
The natural relativistic upgrade of (7.2) is a **four‑vector** equation:
$$\boxed{\ \frac{dp^\mu}{d\tau}=q\,F^{\mu}{}_{\nu}\,u^\nu\ }\tag{7.7}$$
with $p^\mu=mu^\mu$ and $u^\mu=dx^\mu/d\tau$. (Equivalently, $dp_\mu/d\tau=q\,F_{\mu\nu}u^\nu$.)

**Mass invariance fixes $F$ to be antisymmetric.** Since $m^2=-p\cdot p$ is invariant,
$$0=\frac{d}{d\tau}(p\cdot p)=2\,p_\mu\,\frac{dp^\mu}{d\tau}=2q\,m\,u_\mu u_\nu\,F^{\mu\nu}\,.
\tag{7.8}$$
Because $u_\mu u_\nu$ is **symmetric** in its indices, this vanishes for **all** motions iff $F^{\mu\nu}=-F^{\nu\mu}$. Indeed,
$$
\begin{aligned}
 u_\mu u_\nu F^{\mu\nu}&= -u_\mu u_\nu F^{\nu\mu}
 = -u_\nu u_\mu F^{\mu\nu}= -\,u_\mu u_\nu F^{\mu\nu}\;\Rightarrow\;u_\mu u_\nu F^{\mu\nu}=0
\end{aligned} \tag{7.9}
$$
Hence the **diagonal entries** of $F$ vanish and the general form (7.12) follows.

**Recover the usual forces.**
- *Particle at rest.* With $u^\mu=(1,0,0,0)$ and $u_\mu=(-1,0,0,0)$ in Cartesian IRF,
$$\frac{dp^x}{d\tau}=q\,F^{x}{}_{t}u^t=q\,F^{x}{}_{t} \overset{F^{x}{}_{t}=E_x}{=} qE_x,\ \text{etc.}\tag{7.11}$$
- *Non‑relativistic motion.* With $u^t\approx1$, $u^i\approx v_i$ and using (7.12),
$$\frac{d\mathbf p}{dt}=q\,(\mathbf E+\mathbf v\times\mathbf B)\,,\tag{7.13}$$
matching the classical Lorentz force.

---

## 7.5 Consequences of $\partial_\nu F^{\mu\nu}=4\pi k\,J^\mu$
- **Ampère–Maxwell (three spatial components).** For $\mu=i$, the equation reduces in vector form to
$$\nabla\times\mathbf B\; -\; \partial_t\mathbf E\;=\;4\pi k\,\mathbf J\,.\tag{7.14}$$
- **Charge conservation.** Take $\partial_\mu$ of both sides and commute derivatives: the LHS is identically zero because $F$ is antisymmetric,
$$\partial_\mu\partial_\nu F^{\mu\nu}\equiv0\quad\Rightarrow\quad \boxed{\ \partial_\mu J^\mu=0\ }\,.
\tag{7.15}$$
*Why these matter.* (7.14) provides the time‑dependent generalization of Ampère’s law; (7.15) is **local charge conservation**.

---

## 7.6 Potentials and the homogeneous Maxwell equations
To generalize $\mathbf E=-\nabla\phi$ beyond the static case, introduce the **four‑potential** $A_\mu$ and **define**
$$\boxed{\ F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu\ }\tag{7.17}$$
which is automatically antisymmetric.

**Components and the static limit.** The $(\mu,\nu)=(x,t)$ component reads
$$F_{xt}=\partial_x A_t-\partial_t A_x=-E_x\,,\tag{7.18}$$
so that in the **static** limit ($\partial_tA_i=0$) one recovers $E_x=-\partial_x\phi$ upon identifying $A_t\equiv\phi$ up to the sign conventions fixed by index position. Analogous formulas hold for $E_y,E_z$.

**Magnetic field from $\mathbf A$.** From (7.17) and (7.12), the spatial components give
$$\boxed{\ \mathbf B=\nabla\times\mathbf A\ }\,.\tag{7.19}$$
**Homogeneous Maxwell equations.** The definition (7.17) implies the cyclic identity
$$\boxed{\ \partial_\sigma F_{\mu\nu}+\partial_\mu F_{\nu\sigma}+\partial_\nu F_{\sigma\mu}=0\ }\tag{7.20}$$
which is equivalent (in 3‑vector form) to **Faraday’s law** and **Gauss’s law for magnetism**:
$$\nabla\times\mathbf E+\partial_t\mathbf B=0,\qquad \nabla\!\cdot\!\mathbf B=0.$$

---

## Concept thread
1) Start from (7.1)–(7.2). 2) Show charge is a scalar; package $(\rho,\,\mathbf J)$ as $J^\mu$ via (7.3)–(7.4). 3) Demand a four‑vector equation → (7.5) and introduce $F_{\mu\nu}$. 4) Require mass invariance → $F$ antisymmetric (7.8–7.9) → matrix (7.12). 5) Recover forces (7.11, 7.13). 6) Read off Ampère–Maxwell (7.14) and charge conservation (7.15). 7) Introduce potentials (7.17), recover $\mathbf E$ in static limit (7.18), $\mathbf B=\nabla\times\mathbf A$ (7.19), and the homogeneous equations (7.20).

> **Where this leads.** The same “make it a tensor equation” strategy will guide us for gravity. Next chapters introduce the Schwarzschild metric and event horizons; later, the **covariant derivative** will replace partials so these forms continue to work in arbitrary (curved) spacetimes.

