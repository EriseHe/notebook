---
title: "Ch. 16"
---
# Chapter 18: Geodesic Deviation and the Riemann Tensor

## 1. Introduction: Tidal Effects

One of Euclid's basic axioms about *flat space* is that parallel lines (geodesics) never meet. However, in the context of gravity, objects following initially parallel geodesics accelerate relative to each other due to **tidal effects**. Since this contradicts Euclid's axiom, it serves as a fundamental indicator that the spacetime surrounding a gravitating object is *curved*.

Our goal is to construct the **Riemann tensor** to quantify this relative acceleration. This tensor will be zero everywhere in flat spacetime and nonzero in curved spacetime, providing a rigorous test for curvature.

---

## 2. A Newtonian Analysis of Tidal Effects

In Newtonian mechanics, we describe a gravitational field by a potential $\Phi$. The acceleration of a freely falling particle is given by $\vec{a} = -\vec{\nabla}\Phi$. In index notation, using the spatial components of the flat-space metric $\eta^{ij}$ to raise indices:

$$
\frac{d^2x^i}{dt^2} = -\eta^{ij} \frac{\partial \Phi}{\partial x^j} = -\eta^{ij} [\partial_j \Phi]_{\vec{x}}
$$

Consider a reference particle at $x^i(t)$ and a second particle at $x^i(t) + n^i(t)$, where $\vec{n}(t)$ is the **separation vector**. We wish to calculate the relative acceleration $\frac{d^2 n^i}{dt^2}$.

$$
\begin{aligned}
\frac{d^2(x^i + n^i)}{dt^2} &= -\eta^{ij} [\partial_j \Phi]_{\vec{x}+\vec{n}} \\[6pt]
&\approx -\eta^{ij} \left( [\partial_j \Phi]_{\vec{x}} + n^k \left[ \frac{\partial}{\partial x^k} (\partial_j \Phi) \right]_{\vec{x}} \right)
\end{aligned}
$$

Subtracting the equation of motion for the reference particle ($\frac{d^2 x^i}{dt^2} = -\eta^{ij} [\partial_j \Phi]_{\vec{x}}$) from this expression:

$$
\begin{aligned}
\frac{d^2 x^i}{dt^2} + \frac{d^2 n^i}{dt^2} - \frac{d^2 x^i}{dt^2} &\approx -\eta^{ij} [\partial_j \Phi]_{\vec{x}} - \eta^{ij} n^k [\partial_k \partial_j \Phi]_{\vec{x}} + \eta^{ij} [\partial_j \Phi]_{\vec{x}} \\[6pt]
\Rightarrow \quad \frac{d^2 n^i}{dt^2} &\approx -\eta^{ij} [\partial_k \partial_j \Phi] n^k \equiv -\eta^{ij} \frac{\partial^2 \Phi}{\partial x^k \partial x^j} n^k
\end{aligned}
$$

> [!definition|18.1] Newtonian Tidal Deviation Equation
> The relative acceleration of two neighboring falling particles in Newtonian gravity is given by:
> $$\frac{d^2 n^i}{dt^2} \approx - \eta^{ij} \left( \frac{\partial^2 \Phi}{\partial x^k \partial x^j} \right) n^k$$

---

## 3. Einsteinian Analysis: The Geodesic Equation

In General Relativity, we consider two particles following neighboring geodesics $x^\alpha(\tau)$ (reference) and $\bar{x}^\alpha(\tau) = x^\alpha(\tau) + n^\alpha(\tau)$, where $\tau$ is the proper time and $\boldsymbol{n}$ is the infinitesimal **separation four-vector**.

Both particles obey the geodesic equation:
$$
0 = \frac{d^2 x^\alpha}{d\tau^2} + \Gamma^\alpha_{\mu\nu} \frac{dx^\mu}{d\tau} \frac{dx^\nu}{d\tau}, \quad
0 = \frac{d^2 \bar{x}^\alpha}{d\tau^2} + \bar{\Gamma}^\alpha_{\mu\nu} \frac{d\bar{x}^\mu}{d\tau} \frac{d\bar{x}^\nu}{d\tau}
$$

We evaluate the Christoffel symbol at the second particle's position using a Taylor expansion:
$$
\bar{\Gamma}^\alpha_{\mu\nu}(\text{at } \bar{x}) \approx \Gamma^\alpha_{\mu\nu}(\text{at } x) + n^\sigma [\partial_\sigma \Gamma^\alpha_{\mu\nu}](\text{at } x)
$$

Substituting this and $\bar{x}^\alpha = x^\alpha + n^\alpha$ into the second geodesic equation, and retaining only first-order terms in $n$:

$$
\begin{aligned}
0 &= \frac{d^2(x^\alpha + n^\alpha)}{d\tau^2} + \left[ \Gamma^\alpha_{\mu\nu} + n^\sigma (\partial_\sigma \Gamma^\alpha_{\mu\nu}) \right] \frac{d(x^\mu + n^\mu)}{d\tau} \frac{d(x^\nu + n^\nu)}{d\tau} \\[6pt]
&\approx \underbrace{\frac{d^2 x^\alpha}{d\tau^2} + \Gamma^\alpha_{\mu\nu} u^\mu u^\nu}_{\text{Geodesic Eq for } x^\alpha \text{ (=0)}} + \frac{d^2 n^\alpha}{d\tau^2} + 2\Gamma^\alpha_{\mu\nu} u^\mu \frac{dn^\nu}{d\tau} + n^\sigma (\partial_\sigma \Gamma^\alpha_{\mu\nu}) u^\mu u^\nu
\end{aligned}
$$

This yields a preliminary relation for the coordinate acceleration of the separation vector:

$$
0 = \frac{d^2 n^\alpha}{d\tau^2} + 2\Gamma^\alpha_{\mu\nu} u^\mu \frac{dn^\nu}{d\tau} + n^\sigma (\partial_\sigma \Gamma^\alpha_{\mu\nu}) u^\mu u^\nu
$$

---

## 4. The Equation of Geodesic Deviation

The simple derivative $d^2n^\alpha/d\tau^2$ is not a tensor. To find a covariant description of relative acceleration, we must calculate the **absolute second tau-derivative** of $\boldsymbol{n}$, denoted $(\frac{D^2\boldsymbol{n}}{d\tau^2})^\alpha$.

### 4.1 First Absolute Derivative
Recalling the definition of the absolute derivative $\frac{Dn^\alpha}{d\tau} = \frac{dn^\alpha}{d\tau} + \Gamma^\alpha_{\mu\nu} u^\mu n^\nu$:

$$
\left(\frac{Dn}{d\tau}\right)^\alpha = \frac{dn^\alpha}{d\tau} + \Gamma^\alpha_{\mu\nu} u^\mu n^\nu
$$

### 4.2 Second Absolute Derivative
We differentiate again. Note that $\frac{D}{d\tau}$ of a vector $V^\alpha$ is $\frac{dV^\alpha}{d\tau} + \Gamma^\alpha_{\sigma\nu} u^\sigma V^\nu$. Here our "vector" is the first derivative result.

$$
\begin{aligned}
\left( \frac{D^2 \boldsymbol{n}}{d\tau^2} \right)^\alpha 
&= \frac{d}{d\tau} \left[ \left(\frac{Dn}{d\tau}\right)^\alpha \right] + \Gamma^\alpha_{\sigma\nu} u^\sigma \left(\frac{Dn}{d\tau}\right)^\nu \\[6pt]
&= \frac{d}{d\tau} \left( \frac{dn^\alpha}{d\tau} + \Gamma^\alpha_{\mu\nu} u^\mu n^\nu \right) + \Gamma^\alpha_{\sigma\nu} u^\sigma \left( \frac{dn^\nu}{d\tau} + \Gamma^\nu_{\beta\gamma} u^\beta n^\gamma \right) \\[6pt]
&= \frac{d^2 n^\alpha}{d\tau^2} + \underbrace{\frac{d\Gamma^\alpha_{\mu\nu}}{d\tau}}_{\mathclap{u^\sigma \partial_\sigma \Gamma^\alpha_{\mu\nu}}} u^\mu n^\nu + \Gamma^\alpha_{\mu\nu} \frac{du^\mu}{d\tau} n^\nu + \Gamma^\alpha_{\mu\nu} u^\mu \frac{dn^\nu}{d\tau} + \underbrace{\Gamma^\alpha_{\sigma\nu} u^\sigma \frac{dn^\nu}{d\tau}}_{\mathclap{\text{rename } \sigma \to \mu \Rightarrow \Gamma^\alpha_{\mu\nu} u^\mu \frac{dn^\nu}{d\tau}}} + \Gamma^\alpha_{\sigma\nu} \Gamma^\nu_{\beta\gamma} u^\sigma u^\beta n^\gamma \\[6pt]
&= \frac{d^2 n^\alpha}{d\tau^2} + (\partial_\sigma \Gamma^\alpha_{\mu\nu}) u^\sigma u^\mu n^\nu + \Gamma^\alpha_{\mu\nu} \frac{du^\mu}{d\tau} n^\nu + 2\Gamma^\alpha_{\mu\nu} u^\mu \frac{dn^\nu}{d\tau} + \Gamma^\alpha_{\sigma\gamma} \Gamma^\gamma_{\beta\mu} u^\sigma u^\beta n^\mu
\end{aligned}
$$

We now use the result from Section 3 ($d^2n^\alpha/d\tau^2 = -2\Gamma u dn - n (\partial \Gamma) u u$) to eliminate the second derivative term, and the geodesic equation ($du^\mu/d\tau = -\Gamma^\mu_{\delta\lambda} u^\delta u^\lambda$) to eliminate the velocity derivative.

$$
\begin{aligned}
\left( \frac{D^2 \boldsymbol{n}}{d\tau^2} \right)^\alpha 
&= \underbrace{\left[ -2\Gamma^\alpha_{\mu\nu} u^\mu \frac{dn^\nu}{d\tau} - n^\sigma (\partial_\sigma \Gamma^\alpha_{\mu\nu}) u^\mu u^\nu \right]}_{\text{substitution for } d^2n/d\tau^2}
+ (\partial_\sigma \Gamma^\alpha_{\mu\nu}) u^\sigma u^\mu n^\nu \\[6pt]
&\quad + \Gamma^\alpha_{\mu\nu} \underbrace{\left( -\Gamma^\mu_{\delta\lambda} u^\delta u^\lambda \right)}_{\text{geodesic eq}} n^\nu 
+ 2\Gamma^\alpha_{\mu\nu} u^\mu \frac{dn^\nu}{d\tau} 
+ \Gamma^\alpha_{\sigma\gamma} \Gamma^\gamma_{\beta\mu} u^\sigma u^\beta n^\mu \\[6pt]
&\overset{\mathclap{\text{cancel terms}}}{=}\;
-\underbrace{(\partial_\sigma \Gamma^\alpha_{\mu\nu}) u^\mu u^\nu n^\sigma}_{\text{rename indices}} 
+ (\partial_\sigma \Gamma^\alpha_{\mu\nu}) u^\sigma u^\mu n^\nu 
- \underbrace{\Gamma^\alpha_{\mu\nu} \Gamma^\mu_{\delta\lambda} u^\delta u^\lambda n^\nu}_{\text{rename indices}} 
+ \underbrace{\Gamma^\alpha_{\sigma\gamma} \Gamma^\gamma_{\beta\mu} u^\sigma u^\beta n^\mu}_{\text{rename indices}} \\[6pt]
&= \left( \partial_\sigma \Gamma^\alpha_{\mu\nu} - \partial_\nu \Gamma^\alpha_{\mu\sigma} + \Gamma^\alpha_{\sigma\gamma} \Gamma^\gamma_{\mu\nu} - \Gamma^\alpha_{\nu\gamma} \Gamma^\gamma_{\mu\sigma} \right) u^\sigma u^\mu n^\nu
\end{aligned}
$$

The quantity in the parentheses is a tensor. We define the **Riemann Tensor** to be the *negative* of that quantity.

> [!definition|18.2] The Riemann Tensor
> $$R^\alpha_{\mu\nu\sigma} \equiv \partial_\nu \Gamma^\alpha_{\mu\sigma} - \partial_\sigma \Gamma^\alpha_{\mu\nu} + \Gamma^\alpha_{\nu\gamma} \Gamma^\gamma_{\mu\sigma} - \Gamma^\alpha_{\sigma\gamma} \Gamma^\gamma_{\mu\nu}$$

This leads to the final covariant equation for geodesic deviation:

> [!theorem|18.3] Equation of Geodesic Deviation
> $$\left( \frac{D^2 \boldsymbol{n}}{d\tau^2} \right)^\alpha = -R^\alpha_{\mu\nu\sigma} u^\sigma u^\mu n^\nu$$
> If the Riemann tensor is zero everywhere, initially parallel geodesics *remain* parallel and spacetime is flat. If not, spacetime is curved.

## 5. A Mnemonic for the Riemann Tensor

It is often useful to rewrite the definition using coordinate labels that progress in a more orderly way (e.g., $\beta, \mu, \nu$):

$$
R^\alpha_{\beta\mu\nu} \equiv \partial_\mu \Gamma^\alpha_{\beta\nu} - \partial_\nu \Gamma^\alpha_{\beta\mu} + \Gamma^\alpha_{\mu\gamma} \Gamma^\gamma_{\beta\nu} - \Gamma^\alpha_{\nu\sigma} \Gamma^\sigma_{\beta\mu}
$$

**Mnemonic:** *"3 to 4 is positive, but 4 to 3 is not. Twins bond inside."*

* **"3 to 4 is positive":** In the positive terms, the lower free indices go in the order 3rd, 2nd, 4th Riemann indices ($\mu, \beta, \nu$).
* **"4 to 3 is not":** In the negative terms, the order is 4th, 2nd, 3rd ($\nu, \beta, \mu$).
* **"Twins bond inside":** In the product terms, the bound index (dummy index) on each Christoffel symbol is the one closest to the other (the innermost indices).