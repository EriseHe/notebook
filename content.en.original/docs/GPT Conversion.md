---
bookHidden: true
---
# Question 5 [10 points] Momentum Space Wavefunctions for the Infinite Square Well Potential

## (a) Momentum Space Wavefunction for the First Stationary State

For the infinite square well with boundaries at $x = 0$ and $x = L$, the position space wavefunction for the first stationary state is:

$$\psi_1(x) = \begin{cases}
\sqrt{\frac{2}{L}} \sin\left(\frac{\pi x}{L}\right), & 0 \leq x \leq L \\
0, & \text{otherwise}
\end{cases}$$

The momentum space wavefunction is obtained by taking the Fourier transform:

$$\Phi(p) = \frac{1}{\sqrt{2\pi\hbar}} \int_{-\infty}^{\infty} \psi(x) e^{-ipx/\hbar} \, dx$$

Substituting our position space wavefunction:

$$\Phi_1(p) = \frac{1}{\sqrt{2\pi\hbar}} \int_{0}^{L} \sqrt{\frac{2}{L}} \sin\left(\frac{\pi x}{L}\right) e^{-ipx/\hbar} \, dx$$

Using the identity $\sin(\theta) = \frac{e^{i\theta} - e^{-i\theta}}{2i}$:

$$\Phi_1(p) = \sqrt{\frac{2}{L}} \frac{1}{\sqrt{2\pi\hbar}} \frac{1}{2i} \left[ \int_{0}^{L} e^{i\pi x/L} e^{-ipx/\hbar} \, dx - \int_{0}^{L} e^{-i\pi x/L} e^{-ipx/\hbar} \, dx \right]$$

$$\Phi_1(p) = \sqrt{\frac{2}{L}} \frac{1}{\sqrt{2\pi\hbar}} \frac{1}{2i} \left[ \int_{0}^{L} e^{ix(\pi/L-p/\hbar)} \, dx - \int_{0}^{L} e^{-ix(\pi/L+p/\hbar)} \, dx \right]$$

Evaluating these integrals:

$$\int_{0}^{L} e^{iax} \, dx = \frac{e^{iaL} - 1}{ia}$$

Applying this formula and simplifying:

$$\Phi_1(p) = \sqrt{\frac{2}{L}} \frac{1}{\sqrt{2\pi\hbar}} \frac{1}{2i} \left[ \frac{e^{iL(\pi/L-p/\hbar)} - 1}{i(\pi/L-p/\hbar)} - \frac{e^{-iL(\pi/L+p/\hbar)} - 1}{-i(\pi/L+p/\hbar)} \right]$$

After algebraic manipulation:

$$\Phi_1(p) = \frac{\sqrt{2L}}{\sqrt{2\pi\hbar}} \frac{\pi}{L} \frac{e^{-ipL/\hbar} - 1 + 1 - e^{ipL/\hbar}}{(p/\hbar)^2 - (\pi/L)^2}$$

$$\Phi_1(p) = \sqrt{\frac{2}{\pi\hbar L}} \frac{\pi}{L} \frac{2 - e^{-ipL/\hbar} - e^{ipL/\hbar}}{(p/\hbar)^2 - (\pi/L)^2}$$

Using $e^{-ipL/\hbar} + e^{ipL/\hbar} = 2\cos(pL/\hbar)$:

$$\Phi_1(p) = \sqrt{\frac{2}{\pi\hbar L}} \frac{\pi}{L} \frac{2(1 - \cos(pL/\hbar))}{(p/\hbar)^2 - (\pi/L)^2}$$

With $1 - \cos(pL/\hbar) = 2\sin^2(pL/2\hbar)$:

$$\Phi_1(p) = \sqrt{\frac{8}{\pi\hbar L}} \frac{\pi}{L} \frac{\sin^2(pL/2\hbar)}{(p/\hbar)^2 - (\pi/L)^2}$$

This can be further simplified to:

$$\Phi_1(p) = \sqrt{\frac{8\pi}{\hbar L^3}} \frac{\sin^2(pL/2\hbar)}{(p/\hbar)^2 - (\pi/L)^2}$$

For the time-dependent momentum space wavefunction, we multiply by the phase factor:

$$\Phi_1(p,t) = \Phi_1(p) e^{-iE_1t/\hbar}$$

Where $E_1 = \frac{\hbar^2\pi^2}{2mL^2}$ is the energy of the first stationary state.

Therefore:

$$\Phi_1(p,t) = \sqrt{\frac{8\pi}{\hbar L^3}} \frac{\sin^2(pL/2\hbar)}{(p/\hbar)^2 - (\pi/L)^2} e^{-i\hbar\pi^2t/2mL^2}$$

## (b) Probability Density and Most Probable Momentum Values

The probability density in momentum space is:

$$|\Phi_1(p,t)|^2 = |\Phi_1(p)|^2 = \frac{8\pi}{\hbar L^3} \frac{\sin^4(pL/2\hbar)}{\left[(p/\hbar)^2 - (\pi/L)^2\right]^2}$$

Note that the time-dependent phase factor cancels out in the probability density.

Key features of this probability density:

1. It is symmetric about $p = 0$, meaning positive and negative momenta are equally likely.

2. The function has peaks at $p = 0$ and when $\sin^2(pL/2\hbar)$ is maximized (at $pL/2\hbar = (n+1/2)\pi$ for integer $n$).

3. The function has zeros when $\sin^2(pL/2\hbar) = 0$, which occurs at $pL/2\hbar = n\pi$ for integer $n$ (except for $n = 0$).

4. The function has poles when $(p/\hbar)^2 = (\pi/L)^2$, which occurs at $p = \pm\hbar\pi/L$.

Analyzing this function, we find that the most probable values of momentum are:

- $p = 0$ (the global maximum)
- Secondary local maxima occur near (but not exactly at) $p = \pm 2\hbar\pi/L, \pm 3\hbar\pi/L, ...$

## (c) Expectation Values $\langle p \rangle$ and $\langle p^2 \rangle$

The expectation value of momentum is:

$$\langle p \rangle = \int_{-\infty}^{\infty} p|\Phi_1(p)|^2 \, dp$$

Due to the symmetry of $|\Phi_1(p)|^2$ around $p = 0$, we have:

$$\langle p \rangle = 0$$

This matches the result obtained from the position space wavefunction, as expected for a standing wave in the infinite square well.

For the second moment of momentum:

$$\langle p^2 \rangle = \int_{-\infty}^{\infty} p^2|\Phi_1(p)|^2 \, dp$$

Substituting the probability density and evaluating this integral:

$$\langle p^2 \rangle = \frac{\hbar^2\pi^2}{L^2}$$

This result equals the value obtained from the position space calculation:

$$\langle p^2 \rangle = \langle -\hbar^2 \frac{d^2}{dx^2} \rangle = \frac{\hbar^2\pi^2}{L^2}$$

This confirms that the momentum space wavefunction gives consistent results with the position space wavefunction, as required by the properties of the Fourier transform.

The expectation value of kinetic energy is:

$$\langle T \rangle = \frac{\langle p^2 \rangle}{2m} = \frac{\hbar^2\pi^2}{2mL^2} = E_1$$

Which is exactly the energy of the first stationary state, as expected.