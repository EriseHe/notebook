## 1. Introduction

Black holes were originally thought to be purely classical objects. However, Hawking showed that they possess quantum-mechanical aspects, such as entropy and temperature.
## 2. Particles with Negative Energy at Infinity

Particles in Schwarzschild spacetime can have a negative energy per unit mass at infinity, $e$, if they are inside the event horizon.

$$
e \equiv \left(1 - \frac{2GM}{r}\right) \frac{dt}{d\tau} \tag{16.1}
$$

Inside the event horizon ($r < 2GM$), the term $(1 - 2GM/r)$ is negative, allowing $e$ to be negative.

---

## 3. Why a Black Hole Radiates

Quantum fluctuations produce particle-antiparticle pairs. Near the horizon, a negative-energy particle can fall in, allowing the positive-energy partner to escape. We estimate the energy of radiated particles by observing the fluctuation in a freely falling frame.

If the fluctuation occurs at $r = 2GM + \epsilon$, the proper time to reach the horizon is $\Delta \tau \approx 2\sqrt{2GM\epsilon}$. The characteristic energy $E$ in the falling frame is:

$$
\frac{\hbar}{E} \sim \Delta \tau \quad \Rightarrow \quad E \sim \frac{\hbar}{\Delta \tau} = \frac{\hbar}{2\sqrt{2GM\epsilon}} \tag{16.2}
$$

Using local orthonormal coordinates, the energy measured at infinity $E_\infty$ is related to $E$ by:

$$
E = \frac{me}{\sqrt{1 - 2GM/r}} = \frac{E_\infty}{\sqrt{1 - 2GM/r}} \tag{16.3}
$$

Solving for $E_\infty$ and substituting Eq 16.2:

$$
E_\infty = \sqrt{1 - \frac{2GM}{r}} E \sim \sqrt{1 - \frac{2GM}{2GM + \epsilon}} \frac{\hbar}{2\sqrt{2GM\epsilon}} \tag{16.4}
$$

Using the binomial approximation for $\epsilon \ll 2GM$:

$$
\sqrt{1 - \frac{2GM}{2GM + \epsilon}} = \sqrt{1 - \frac{1}{1 + \epsilon/2GM}} \approx \sqrt{1 - \left(1 - \frac{\epsilon}{2GM}\right)} = \sqrt{\frac{\epsilon}{2GM}} \tag{16.5}
$$

Substituting this back into 16.4:

$$
E_\infty \sim \frac{\hbar}{4GM} \tag{16.6}
$$

---

## 4. Results of Hawking's Calculation

Hawking's precise calculation shows the black hole radiates like a blackbody with temperature $T$.

> [!theorem|16.1] Hawking Temperature
> $$k_B T = \frac{\hbar}{8\pi GM} \quad \Rightarrow \quad T = \frac{\hbar}{8\pi k_B GM} \quad (\text{in GR units}) \tag{16.7}$$

In SI units, for a black hole of mass $M$:

$$
T = \frac{\hbar}{8\pi k_B G M_\odot} \left( \frac{M_\odot}{M} \right) = \frac{6.17 \times 10^{-8}\,\text{K}}{M/M_\odot} \tag{16.8}
$$

---

## 5. The Lifetime of a Black Hole

The rate at which a blackbody radiates energy is $dE/dt = A \sigma T^4$. This leads to a finite lifetime for the black hole.

$$
\tau_{\text{life}} = (2.095 \times 10^{67}\,\text{y}) \left( \frac{M}{M_\odot} \right)^3 \tag{16.9}
$$

---

## 6. Black Hole Entropy

From statistical mechanics, temperature and entropy are related by:

$$
\frac{1}{T} = \frac{\partial S}{\partial U} \tag{16.10}
$$

Integrating the expression for $1/T$ with respect to mass $M$ (where $U=M$):

$$
S = \frac{4\pi k_B G M^2}{\hbar} = \frac{k_B 4\pi (2GM)^2}{4G\hbar} = \frac{k_B}{4G\hbar} A \tag{16.11}
$$

This confirms that the entropy is proportional to the area of the event horizon.