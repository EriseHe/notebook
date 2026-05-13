# Theory

## Static pressure balance

Figure 1 defines the geometry used in the analysis. The tube has length $L$ and cross-sectional area $A$. The height of the water column inside the tube is $x(t)$, and the equilibrium value after the tube is fixed is denoted by $y$. The lower end of the tube is open and lies a vertical distance $d$ below the free surface of the reservoir. The trapped air has pressure $P$ and volume $V(x)=A(L-x)$.

At equilibrium, the water at the bottom opening is shared by the tube and the reservoir, so the pressure $P_{b}$ there must be the same on both sides. The pressure relation from figure 1 is:
$$
\begin{aligned}
& P_b=P_a+\rho g d \\
& P_b=P_{\mathrm{eq}}+\rho g y
\end{aligned}
$$
where $P_a$ is atmospheric pressure and $\rho$ is the density of water. Therefore, we have
$$
P_{\mathrm{eq}}=P_a+\rho g(d-y)
\tag{1}
$$
which shows why the trapped air matters. The pressure above the internal water column is not generally equal to atmospheric pressure.

%**Figure 1.** should be here, no need to change anything. keep it as it is.%
## Equation of motion

After the tube has been reclamped, $d$ is fixed and the water column can oscillate about $y$. The pressure at the bottom opening from the reservoir is $P_a+\rho g d$, so the trapped air pushes upward on the water column with 
$$F_{\mathrm{up}}=A\left(P_a+\rho g d\right)$$
and similarly pushes downward on the top of the water column with force
$$
F_{\mathrm{down}}=A P(x)
$$
Since the water column also has weight, $F_{\text {weight }}=m g=\rho A xg$, the net force is
$$
\begin{aligned}
F_{\text {net }} & =F_{\text {up }}-F_{\text {air }}-F_{\text {weight }} \\
& =A\left(P_a+\rho g d\right)-A P(x)-\rho A x g \\
& =A\left[P_a+\rho g d-P(x)-\rho g x\right] .
\end{aligned}
$$
Since $m \ddot{x}=F_{\mathrm{net}}$, then we have a simplified equation of motion, where viscous damping and the momentum flux associated with water are neglected.
$$
\rho A x \ddot{x}
=
A\left[P_a+\rho gd-P(x)-\rho gx\right]
\tag{2}
$$
For the isothermal model, the trapped air obeys
$$
\begin{align}
P(x)V(x) & =P_{\mathrm{eq}}V_{\mathrm{eq}}\\
P(x) & =P_{\mathrm{eq}}\frac{L-y}{L-x}
\end{align}
\tag{3}
$$
Next, we linearize around equilibrium

$$
P(x)=P_{\mathrm{eq}}\frac{L-y}{L-x}
\tag{3}
$$

The area $A$ cancels because both the trapped-air volume and the water-column mass are proportional to $A$.

To obtain the natural frequency, write

$$
x(t)=y+\eta(t)
$$

where $|\eta|\ll y$. Linearizing Equation (2) about $y$ and using Equation (3) gives

$$
\rho y \ddot{\eta}
=
-\left[\rho g+\frac{P_{\mathrm{eq}}}{L-y}\right]\eta
$$

Therefore,

$$
\ddot{\eta}+\omega_{\mathrm{th}}^2\eta=0
$$

with

$$
\boxed{
\omega_{\mathrm{th}}^2
=
\frac{g}{y}
+
\frac{P_{\mathrm{eq}}}{\rho y(L-y)}
}
\tag{4}
$$

and, using Equation (1),

$$
\boxed{
\omega_{\mathrm{th}}^2
=
\frac{g}{y}
+
\frac{P_a+\rho g(d-y)}{\rho y(L-y)}
}
\tag{5}
$$

All lengths in Equation (5) must be expressed in SI units. The first term is the hydrostatic contribution, and the second term is the trapped-air spring contribution. The isothermal model predicts a strong dependence on the filling fraction $y/L$, especially because the air volume $A(L-y)$ changes as the tube becomes more full.

The data showed a systematic residual from the isothermal model, so we also considered the more general polytropic relation

$$
P(x)V(x)^\kappa=P_{\mathrm{eq}}V_{\mathrm{eq}}^\kappa
$$

In that case,

$$
P(x)=P_{\mathrm{eq}}\left(\frac{L-y}{L-x}\right)^\kappa
$$

and the same linearization gives

$$
\boxed{
\omega_{\kappa}^2
=
\frac{g}{y}
+
\frac{\kappa\left[P_a+\rho g(d-y)\right]}{\rho y(L-y)}
}
\tag{6}
$$

Equation (5) is the special case $\kappa=1$. For air, the adiabatic limiting value is approximately $\kappa=1.4$. In this report, $\kappa$ is treated as a fitted parameter inferred from the dataset, not as an independently known property of the apparatus.

## Experimental fit form

The videos were analyzed by tracking the meniscus position after the tube had been reclamped. The manual recommends setting the origin at the final equilibrium meniscus position and fitting the displacement to a damped cosine.[^manual] The numerical fit used the closely related form

$$
z(t)=c+a e^{-bt}\cos(\omega_{\mathrm{exp}}t+\phi)
\tag{7}
$$

The constant offset $c$ absorbs small residual errors in the Tracker coordinate origin and does not affect the fitted angular frequency. The fitted angular frequency $\omega_{\mathrm{exp}}$ is the parameter to be compared with Equation (5) and Equation (6).

[^manual]: Lab manual.






















To include damping, I model the small oscillation about equilibrium as a linearly damped harmonic oscillator. After linearization, the displacement $\eta(t)=x(t)-y$ is assumed to satisfy

$$
\ddot{\eta}+2\lambda\dot{\eta}+\omega_\kappa^2\eta=0,
\tag{19}
$$

where $\lambda$ is the exponential decay rate and $\omega_\kappa$ is the undamped natural angular frequency predicted by the polytropic model. This damping term is introduced phenomenologically at the linearized level; it is not derived from the full fluid dynamics.

To solve Eq. (19), write

$$
\eta(t)=e^{-\lambda t}u(t).
$$

Then

$$
\dot{\eta}
=
e^{-\lambda t}\left(\dot{u}-\lambda u\right),
$$

and

$$
\ddot{\eta}
=
e^{-\lambda t}\left(\ddot{u}-2\lambda\dot{u}+\lambda^2 u\right).
$$

Substituting these into Eq. (19) gives

$$
e^{-\lambda t}\left(\ddot{u}-2\lambda\dot{u}+\lambda^2 u\right)
+
2\lambda e^{-\lambda t}\left(\dot{u}-\lambda u\right)
+
\omega_\kappa^2 e^{-\lambda t}u
=
0.
$$

Factoring out $e^{-\lambda t}$ and simplifying,

$$
\ddot{u}-2\lambda\dot{u}+\lambda^2 u
+2\lambda\dot{u}-2\lambda^2 u
+\omega_\kappa^2 u
=
0,
$$

so

$$
\ddot{u}+(\omega_\kappa^2-\lambda^2)u=0.
\tag{20}
$$

This is the equation of a simple harmonic oscillator. Therefore, for underdamped motion, $\lambda<\omega_\kappa$, the solution is

$$
u(t)=a\cos(\omega_{\mathrm{data}}t+\phi),
$$

where

$$
\omega_{\mathrm{data}}^2=\omega_\kappa^2-\lambda^2.
\tag{21}
$$

Substituting back into $\eta(t)=e^{-\lambda t}u(t)$ gives

$$
\eta(t)=a e^{-\lambda t}\cos(\omega_{\mathrm{data}}t+\phi).
$$

Since the Tracker origin may contain a small residual offset, the fitted coordinate is written as

$$
z(t)=z_0+a e^{-\lambda t}\cos(\omega_{\mathrm{data}}t+\phi),
\tag{22}
$$

where $z_0$ is a small constant offset.

Equation (21) can be written equivalently as

$$
\omega_\kappa=\sqrt{\omega_{\mathrm{data}}^2+\lambda^2}.
\tag{23}
$$

Combining this result with the undamped polytropic prediction,

$$
\omega_\kappa^2
=
\frac{g}{y}
+
\frac{\kappa\left[P_a+\rho g(d-y)\right]}{\rho y(L-y)},
$$

gives the damped polytropic prediction for the measured angular frequency,

$$
\omega_{\mathrm{data},\kappa}
=
\sqrt{
\frac{g}{y}
+
\frac{\kappa\left[P_a+\rho g(d-y)\right]}{\rho y(L-y)}
-\lambda^2
}.
\tag{24}
$$

The corresponding damped isothermal prediction is the special case $\kappa=1$:

$$
\omega_{\mathrm{data,iso}}
=
\sqrt{
\frac{g}{y}
+
\frac{P_a+\rho g(d-y)}{\rho y(L-y)}
-\lambda^2
}.
\tag{25}
$$

In the data analysis, $\lambda$ was obtained from the same damped-cosine fit used to determine $\omega_{\mathrm{data}}$. The damping correction in Eq. (23) was then checked using the fitted values of $\lambda$. Since this correction was much smaller than the systematic difference between the isothermal prediction and the measured frequencies, the main comparison uses $\omega_{\mathrm{data}}$ directly against the undamped theory as a first approximation.