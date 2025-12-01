---
title: "Ch. 19 Riemman Tensor"
---

Curvature isn’t “how bent the coordinates look”; it’s how **nearby free-falling worldlines accelerate relative to each other**.  
The Riemann tensor is the device that turns a reference geodesic’s four-velocity and a separation vector into that relative acceleration.  
When Riemann vanishes everywhere you can globally call the place “flat.”  
When it doesn’t, spacetime has intrinsic curvature you can’t transform away.

# 1 Geodesic deviation (definition-by-action)
$$
\boxed{
\left(\frac{d^2 \boldsymbol{n}}{d \tau^2}\right)^\alpha
= -R_{\beta \mu \nu}^\alpha u^\beta n^\mu u^\nu
}
\tag{19.1}
$$
* $u^\alpha(\tau)$: four-velocity along the reference geodesic (proper time $\tau$).
* $n^\mu(\tau)$: infinitesimal separation to a neighboring geodesic.
* If $R^{\alpha}{}_{\beta\mu\nu}=0$, initially parallel geodesics remain parallel → flat.

# 2 Coordinate expression (in any chart)
$$
\boxed{
R_{\beta \mu \nu}^\alpha
\equiv
\partial_\mu \Gamma_{\beta \nu}^\alpha
-\partial_\nu \Gamma_{\beta \mu}^\alpha
+\Gamma_{\mu \gamma}^\alpha \Gamma_{\beta \nu}^\gamma
-\Gamma_{\nu \sigma}^\alpha \Gamma_{\beta \mu}^\sigma
}
\tag{19.2}
$$
Sign conventions vary (some authors flip the overall sign, or use the alternative Ricci contraction — keep track).

# 3 Local Inertial Frame (LIF) at an event

At the origin of a LIF: $\Gamma^\alpha{}_{\beta\gamma}=0$ but their **derivatives** need not vanish.  
Lowering the first index:

$$
\begin{aligned}
R_{\alpha\beta\mu\nu}
&\equiv g_{\alpha\gamma}R^{\gamma}{}_{\beta\mu\nu} \\
&= \tfrac{1}{2}\!
\left(
\partial_\beta\partial_\mu g_{\alpha\nu}
+ \partial_\alpha\partial_\nu g_{\beta\mu}
- \partial_\alpha\partial_\mu g_{\beta\nu}
- \partial_\beta\partial_\nu g_{\alpha\mu}
\right)
\qquad \text{(at the LIF origin).}
\end{aligned}\tag{19.3}
$$

Intuition: curvature is exactly the “unremovable” part of the **second** derivatives of the metric once you’ve already killed the first derivatives by going to a LIF.

# 4 Index symmetries (true at the LIF origin and hence tensorially everywhere)

$$
\boxed{

\begin{aligned}
R_{\alpha\beta\mu\nu} &= -R_{\beta\alpha\mu\nu} \\
R_{\alpha\beta\mu\nu} &= -R_{\alpha\beta\nu\mu} \\
R_{\alpha\beta\mu\nu} &= R_{\mu\nu\alpha\beta} \\
R_{\alpha[\beta\mu\nu]} &= 0
\quad \Longleftrightarrow \quad
R_{\alpha\beta\mu\nu}
+R_{\alpha\mu\nu\beta}
+R_{\alpha\nu\beta\mu}=0
\end{aligned}}
\tag{19.4 a–d}
$$

Consequences:  
* In $n=4$, only **20** independent components remain (out of 256).  
* In $n=2$, there’s only **one** independent component.

# 5 Bianchi identity (differential)

$$
\boxed{
\nabla_\sigma R^{\alpha}{}_{\beta\mu\nu}
+ \nabla_\mu R^{\alpha}{}_{\beta\nu\sigma}
+ \nabla_\nu R^{\alpha}{}_{\beta\sigma\mu} = 0
}
\tag{19.5}
$$
This fuels the conservation law in Einstein’s equation after suitable contractions  
(the contracted Bianchi identity gives $\nabla_\mu G^{\mu\nu}=0$).


# 6 Useful contractions

Ricci tensor (contract 1st and 3rd indices; some authors use 1st and 4th with opposite sign):
$$
\boxed{
R_{\beta\nu} \equiv R^{\alpha}{}_{\beta\alpha\nu}
\equiv g^{\alpha\mu} R_{\alpha\beta\mu\nu},
\qquad
R_{\beta\nu}=R_{\nu\beta}
}
\tag{19.6–19.7}
$$

Scalar curvature (trace of the Ricci)

$$
\boxed{
R \equiv g^{\beta\nu} R_{\beta\nu}
= g^{\beta\nu}g^{\alpha\mu}R_{\alpha\beta\mu\nu}
}
\tag{19.8}
$$
* $R$ is a true scalar: coordinate-independent.  
* $R_{\mu\nu}$ and $R$ can both vanish in some curved spacetimes; only the **full** Riemann distinguishes flatness conclusively.

# 7 Worked example: 2-sphere of radius $r$

Coordinates $(\theta,\phi)$, metric
$$
\boxed{
ds^2 = r^2\,d\theta^2 + r^2\sin^2\theta\, d\phi^2
}
\tag{19.9}
$$
Christoffel symbols (others $=0$):
$$
\boxed{
\Gamma^{\theta}{}_{\phi\phi} = -\sin\theta\cos\theta, \qquad
\Gamma^{\phi}{}_{\theta\phi}=\Gamma^{\phi}{}_{\phi\theta}=\cot\theta
}
\tag{19.10}
$$
Compute $R_{\theta\phi\theta\phi}$, $R_{\mu\nu}$, and $R$.
$$
\begin{aligned}
\textbf{Step 1: }&
\quad
R^{\theta}{}_{\phi\theta\phi}
= \partial_\theta \Gamma^{\theta}{}_{\phi\phi}
- \partial_\phi \Gamma^{\theta}{}_{\phi\theta}
- \Gamma^{\theta}{}_{\sigma\theta}\Gamma^{\sigma}{}_{\phi\phi}
+ \Gamma^{\theta}{}_{\sigma\phi}\Gamma^{\sigma}{}_{\phi\theta} \\
&= \underbrace{\partial_\theta (-\sin\theta\cos\theta)}_{=-(\cos^2\theta-\sin^2\theta)}
- 0 + 0
- \underbrace{\Gamma^{\theta}{}_{\phi\phi}\Gamma^{\phi}{}_{\phi\theta}}_{=(-\sin\theta\cos\theta)(\cot\theta)=-\cos^2\theta} \\
&= -(\cos^2\theta-\sin^2\theta)+\cos^2\theta = \sin^2\theta .
\\[6pt]
\textbf{Step 2: }&
\quad
\text{Lower the first index: }
R_{\theta\phi\theta\phi}
= g_{\theta\theta} R^{\theta}{}_{\phi\theta\phi}
= r^2 \sin^2\theta
\end{aligned}
\tag{19.11}
$$

By 2D identities, the other components follow from symmetries.

Ricci and scalar:

$$
\begin{aligned}
R_{\theta\theta}
&= g^{\phi\phi}R_{\phi\theta\phi\theta}
= \frac{1}{r^2\sin^2\theta}(r^2\sin^2\theta)
= 1, \\[2pt]
R_{\phi\phi}
&= g^{\theta\theta}R_{\theta\phi\theta\phi}
= \frac{1}{r^2}(r^2\sin^2\theta)
= \sin^2\theta, \\[2pt]
R_{\theta\phi}&=0,
\end{aligned}
\tag{19.12}
$$

$$
\boxed{
R = g^{\theta\theta}R_{\theta\theta}
+ g^{\phi\phi}R_{\phi\phi}
= \frac{1}{r^2}+\frac{1}{r^2}
= \frac{2}{r^2}}
\tag{19.13}
$$
Geometric meaning:  
The Gaussian curvature $K$ of the sphere is $1/r^2$, and in 2D $R=2K$.


# 8 Intuition compacted

* **What Riemann does:** it compares parallel transport around an infinitesimal loop; the mismatch is proportional to the loop’s area and given by $R$.  
* **Why LIF helps:** you kill $\Gamma$ at a point to expose that curvature lives in the second derivatives that *refuse* to vanish together (eq. 19.3).  
* **Why the symmetries matter:** they’re conservation-law-like bookkeeping rules that crush 256 components down to 20 in 4D; in 2D curvature has only one local degree of freedom.  
* **Why Bianchi matters:** after contracting, it guarantees a divergenceless geometric tensor (the Einstein tensor), matching local stress-energy conservation.

---

If you want to push this further, the next natural step is to contract Bianchi to derive  
$\nabla_\mu G^{\mu\nu}=0$ and then motivate the Einstein equation  
$G_{\mu\nu}=8\pi G\,T_{\mu\nu}$ from these geometric ingredients.
