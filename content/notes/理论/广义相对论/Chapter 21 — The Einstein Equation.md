## 1. Overview: From Newtonian Gravity to Einstein’s Equation

In Newtonian gravity, Gauss’s law for the gravitational field $\vec g$ is
$$
\vec\nabla\cdot\vec g = -4\pi G\rho
$$
With $\vec g = -\vec\nabla\Phi$ this is equivalent to the Poisson equation
$$
\nabla^2 \Phi = 4\pi G\rho \tag{21.1}
$$
where $\Phi$ is the gravitational potential and $\rho$ is the **mass density**.

In general relativity, we already know that the relativistic generalization of mass density is the **stress-energy tensor** $T^{\mu\nu}$. So the relativistic analogue of $\nabla^2\Phi = 4\pi G\rho$ is expected to be an equation of the form
$$
G^{\mu\nu} = \kappa T^{\mu\nu} \tag{21.2}
$$
Here:

- $\kappa$ is a scalar constant to be determined (later it will become $8\pi G$),
- $G^{\mu\nu}$ is some second-rank tensor built from the spacetime curvature.

We will call $G^{\mu\nu}$ the **Einstein tensor**.

> [!definition|21.1] Goal of the chapter  
> Construct a second-rank tensor $G^{\mu\nu}$ made from the curvature such that $G^{\mu\nu} = \kappa T^{\mu\nu}$ plays the role of the gravitational field equation and reduces to $\nabla^2\Phi = 4\pi G\rho$ in the Newtonian limit.

---

## 2. Constraints on $G^{\mu\nu}$

Physical and mathematical requirements constrain the possible form of $G^{\mu\nu}$:

1. **Built from curvature**  
   $G^{\mu\nu}$ should be constructed from the Riemann tensor $R^\alpha_{\ \beta\gamma\delta}$ and the metric $g_{\mu\nu}$, since these describe curvature.

2. **Symmetry**  
   Since $T^{\mu\nu}$ is symmetric, $G^{\mu\nu}$ must also be symmetric.

3. **Conservation law**  
   Local conservation of four-momentum gives $\nabla_\nu T^{\mu\nu} = 0$. Taking the divergence of equation $(21.2)$ shows we must have
   $$
   \nabla_\nu G^{\mu\nu} = 0
   $$
   identically.

4. **Newtonian limit**  
   In the weak-field, slow-motion limit, $G^{\mu\nu} = \kappa T^{\mu\nu}$ must reduce to the Poisson equation $\nabla^2\Phi = 4\pi G\rho$.

We now try to construct such a tensor.

---

## 3. First Guess: The Ricci Tensor

The simplest candidate built from the Riemann tensor is the **Ricci tensor**, defined by the contraction
$$
R_{\beta\nu} \equiv R^\alpha_{\ \beta\alpha\nu} \tag{21.3}
$$
This is the Ricci tensor with both indices down.

The version with both indices raised is obtained by contracting with two copies of the inverse metric:
$$
\begin{aligned}
R^{\mu\nu}
&\equiv g^{\mu\beta} g^{\nu\sigma} R_{\beta\sigma} \\[4pt]
&= g^{\mu\beta} g^{\nu\sigma} R^\alpha_{\ \beta\alpha\sigma} \\[4pt]
&= g^{\mu\beta} g^{\nu\sigma} g^{\alpha\gamma} R_{\alpha\beta\gamma\sigma} 
\end{aligned} \tag{21.4}
$$

Because the Riemann tensor has the symmetry $R_{\alpha\beta\gamma\sigma} = R_{\gamma\sigma\alpha\beta}$, the Ricci tensor is symmetric:
$$
\begin{aligned}
R^{\nu\mu}
&= g^{\nu\beta} g^{\mu\sigma} g^{\alpha\gamma} R_{\alpha\beta\gamma\sigma} \\[4pt]
&= g^{\nu\beta} g^{\mu\sigma} g^{\alpha\gamma} R_{\gamma\sigma\alpha\beta}
   \underbrace{=}_{\text{swap pairs using symmetry}}
   g^{\nu\sigma} g^{\mu\beta} g^{\gamma\alpha} R_{\alpha\beta\gamma\sigma} \\[4pt]
&= g^{\mu\beta} g^{\nu\sigma} g^{\alpha\gamma} R_{\alpha\beta\gamma\sigma}
   \equiv R^{\mu\nu}
\end{aligned} \tag{21.5}
$$

So $R^{\mu\nu}$ is symmetric and built purely from curvature — good.  
However, this first guess fails one requirement:
$$
\nabla_\nu R^{\mu\nu} \neq 0
$$
in general, so $R^{\mu\nu}$ cannot be the full $G^{\mu\nu}$.

---

## 4. Second Guess: Add the Curvature Scalar

What else can we construct? Besides $R^{\mu\nu}$, the only reasonable second-rank symmetric tensors that are **linear** in the Riemann tensor and built using the metric are:

- $R^{\mu\nu}$
- $g^{\mu\nu}$
- $g^{\mu\nu} R$

Here $R$ is the **curvature scalar**, the double contraction of the Ricci tensor:
$$
\begin{aligned}
R 
&\equiv g^{\beta\nu} R_{\beta\nu} \\[2pt]
&= g^{\beta\nu} R^\alpha_{\ \beta\alpha\nu} \\[2pt]
&= g^{\beta\nu} g^{\alpha\mu} R_{\alpha\beta\mu\nu}
\end{aligned} \tag{21.6}
$$

Thus the most general linear combination with the right index structure is
$$
R^{\mu\nu} + b\,g^{\mu\nu} R + \Lambda g^{\mu\nu}
$$
where $b$ and $\Lambda$ are constants. We now demand that its divergence vanish:
$$
\nabla_\nu \big(R^{\mu\nu} + b\,g^{\mu\nu} R + \Lambda g^{\mu\nu}\big) = 0 \tag{21.7}
$$

Because the metric has zero covariant derivative, and $\Lambda$ is a constant,
$$
\nabla_\nu(\Lambda g^{\mu\nu}) = 0 \tag{21.8}
$$
automatically. So the condition reduces to
$$
\nabla_\nu \big(R^{\mu\nu} + b\,g^{\mu\nu} R\big) = 0 \tag{21.9}
$$

Using the (contracted) Bianchi identity, one finds this is identically satisfied **if and only if**
$$
b = -\tfrac12
$$
Therefore the combination
$$
R^{\mu\nu} - \tfrac12 g^{\mu\nu} R + \Lambda g^{\mu\nu} = \kappa T^{\mu\nu} \tag{21.10}
$$
has zero covariant divergence and satisfies all of our constraints.

---

## 5. The Einstein Tensor and General Einstein Equation

> [!definition|21.2] Einstein tensor  
> The Einstein tensor is defined by  
> $$
> G^{\mu\nu} \equiv R^{\mu\nu} - \tfrac12 g^{\mu\nu} R \tag{21.11}
> $$

Using this definition, equation $(21.10)$ becomes
$$
G^{\mu\nu} + \Lambda g^{\mu\nu} = \kappa T^{\mu\nu} \tag{21.12}
$$
This is the **Einstein equation** in its most general tensor form, including a possible cosmological constant $\Lambda$.

---

## 6. An Alternative Form of the Einstein Equation

We can derive a useful alternate version by taking the trace of $(21.10)$.

First contract both sides with $g_{\mu\nu}$:
$$
\begin{aligned}
g_{\mu\nu}\big(R^{\mu\nu} - \tfrac12 g^{\mu\nu} R + \Lambda g^{\mu\nu}\big)
&= g_{\mu\nu}\kappa T^{\mu\nu} \\[4pt]
\underbrace{g_{\mu\nu}R^{\mu\nu}}_{=R}
\;-\;
\underbrace{\tfrac12 g_{\mu\nu}g^{\mu\nu}}_{\tfrac12\cdot 4 = 2} R
\;+\;
\underbrace{\Lambda g_{\mu\nu}g^{\mu\nu}}_{4\Lambda}
&= \kappa\,\underbrace{g_{\mu\nu}T^{\mu\nu}}_{T}
\end{aligned}
$$
so
$$
-R + 4\Lambda = \kappa T \tag{21.13}
$$
where $T\equiv g_{\mu\nu}T^{\mu\nu} = T^\mu_{\ \mu}$ is the trace of the stress-energy tensor.

Now multiply both sides of $(21.13)$ by $\tfrac12 g^{\mu\nu}$ and subtract from $(21.10)$:
$$
\begin{aligned}
R^{\mu\nu} - \tfrac12 g^{\mu\nu}R + \Lambda g^{\mu\nu}
&\;-\;\tfrac12 g^{\mu\nu}(-R + 4\Lambda) \\
&= \kappa T^{\mu\nu} - \tfrac12 g^{\mu\nu}\kappa T
\end{aligned}
$$
The $R$ and $\Lambda$ terms combine so that the left side simplifies to just $R^{\mu\nu}$. Thus
$$
R^{\mu\nu} = \kappa\big(T^{\mu\nu} - \tfrac12 g^{\mu\nu}T\big) + \Lambda g^{\mu\nu} \tag{21.14}
$$

> [!remark|21.3] Alternative form  
> Equation $(21.14)$ is often more convenient in practice than $(21.12)$ because it directly expresses $R^{\mu\nu}$ in terms of $T^{\mu\nu}$ and its trace.

---

## 7. Newtonian Limit and Determination of $\kappa$ and $\Lambda$

To fix $\kappa$ we require that the Einstein equation reproduce the Newtonian tidal-deviation equation.

### 7.1 Relativistic vs Newtonian tidal deviation

From chapter 18, the Newtonian equation of tidal deviation is
$$
\frac{d^2 n^i}{dt^2}
= -\eta^{ij}[\partial_k\partial_j\Phi]\,h^k \tag{21.15}
$$
(Equation $(18.4)$ in the book.)

The corresponding relativistic geodesic deviation equation is
$$
\left(\frac{d^2 n}{d\tau^2}\right)^\alpha
= -R^\alpha_{\ \mu\nu\sigma}u^\mu u^\nu n^\sigma \tag{21.16}
$$

In the **Newtonian limit** we impose:

1. The gravitational field is weak (spacetime almost flat).
2. Test objects move slowly: speeds $\ll 1$.
3. The mass-energy density is dominated by $T^{tt}=\rho$, with other components of $T^{\mu\nu}$ negligible.

In this limit we choose nearly cartesian coordinates $(t,x,y,z)$ such that the metric is close to the flat-space metric $\eta_{\mu\nu}$ and $\tau \approx t$ for slow-moving particles.

### 7.2 Spatial components of geodesic deviation

In this limit, the spatial components ($\alpha=i$) of $(21.16)$ become
$$
\frac{d^2 n^i}{dt^2}
= -R^i_{\ \mu\nu\sigma}u^\mu n^\nu u^\sigma
\approx -R^i_{\ t\nu t}n^\nu
= -R^i_{\ t k t}n^k \tag{21.17}
$$
where $i$ and $k$ take only spatial values and in the last step we used that $R^i_{\ t t t}=0$ (a symmetry property of the Riemann tensor).

Comparing $(21.17)$ with the Newtonian tidal equation $(21.15)$, we see that in the Newtonian limit
$$
\eta^{ij}(\partial_j\partial_k\Phi) \approx R^i_{\ t k t}
$$
Contracting $i$ with $k$ gives
$$
\begin{aligned}
\nabla^2\Phi
&\equiv \eta^{jk}(\partial_j\partial_k\Phi)
\approx R^k_{\ t k t}
= R^\alpha_{\ t\alpha t}
\equiv R_{tt}
\end{aligned} \tag{21.18}
$$

### 7.3 Using the Einstein equation

When the metric is approximately flat, raising indices with $g^{\mu\nu}\approx \eta^{\mu\nu}$ gives
$$
R^t_{\ t} \equiv g^{t\mu}R_{\mu t} \approx \eta^{t\mu}R_{\mu t}
= (-1)R_{tt}
$$
so $R^t_{\ t} \approx \nabla^2\Phi$ as well.

Take the $t$–$t$ component of
