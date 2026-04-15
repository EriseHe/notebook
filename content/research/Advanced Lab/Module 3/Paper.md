
# Transient Heat Conduction Measured by Laser Beam Bending

**Erise He**  
Department of Physics, Emory University

<!-- Partner Name -->
<!-- Department of Physics, Emory University -->

**Date:** [Date]

## Abstract

We investigated transient heat conduction in a transparent rectangular sample by monitoring the time-dependent displacement of a laser beam after the bottom surface of the sample was placed in contact with ice water. Under the one-dimensional approximation, the temperature field $T(z,t)$ satisfies the heat equation with a fixed-temperature boundary at the bottom and an approximately insulated boundary at the top. We derived the full series solution for $T(z,t)$, the associated thermal gradient $\partial T/\partial z$, and the beam-displacement relation $h(t)=\left(\frac{\mathrm{d}n}{\mathrm{d}T}\right)\frac{\partial T}{\partial z}(z,t)\,R\,L,$

which connects the optical measurement to the underlying thermal diffusion problem. The experiment was performed for [six runs / three runs / other] using [material] with geometric parameters $H=[\dots]$, $L=[\dots]$, and $R=[\dots]$, and with beam heights $z=[\dots]$. The measured displacement curves $h(t)$ will be fit to the theoretical model using $D$ and $\mathrm{d}n/\mathrm{d}T$ as fitting parameters. The best-fit values obtained from the final dataset are

$$
D=[\text{best-fit diffusivity}], \qquad
\frac{\mathrm{d}n}{\mathrm{d}T}=[\text{best-fit thermo-optic coefficient}],
$$

to be compared with published values for [material]. The report below presents the full theory, the experimental geometry, the planned uncertainty analysis, and placeholder sections for the final results and discussion.

## Introduction

Heat diffusion is one of the canonical transport processes in physics. In the present experiment, the object of interest is not merely the temperature itself, but the motion of a thermal front through a transparent medium after its bottom surface is suddenly cooled by ice water. Because the refractive index depends on temperature, the evolving thermal gradient also produces a refractive-index gradient. A horizontal laser beam passing through the sample is therefore deflected, and the time-dependent spot displacement on a distant wall provides an indirect measurement of the thermal gradient inside the material.

This experiment is conceptually rich for two reasons. First, the thermal problem is governed by a partial differential equation with mixed boundary conditions, so the theory requires a careful separation-of-variables derivation rather than a simple algebraic model. Second, the optical readout does not directly measure $T$, but rather $\partial T/\partial z$, so the physical interpretation of the signal requires attention to how a propagating cold front alters the local gradient in time. In particular, one expects the beam displacement at a fixed height $z$ to increase as the front approaches that height and then decrease after the front has passed, a behavior emphasized in the laboratory manual.

The aim of the experiment is therefore twofold: to solve the transient heat-conduction problem for the sample geometry and boundary conditions, and to test that solution by fitting the measured beam displacement $h(t)$ to the theoretical prediction. The thermal diffusivity $D$ determines the time scale and shape of the displacement curve, while the thermo-optic coefficient $\mathrm{d}n/\mathrm{d}T$ sets its overall scale. Once the experimental data are inserted, the fitted values may be compared with accepted values for the chosen material.

## Theory

### One-dimensional heat equation

We consider a transparent slab of height $H$, with the vertical coordinate $z$ measured upward from the bottom surface. Following the manual, we assume that the bottom surface is suddenly brought into contact with ice water, that heat transfer from the surrounding air is negligible compared with heat transfer to the water, and that the temperature is therefore effectively a function only of $z$ and $t$. Under these assumptions,

$$
T=T(z,t),
$$

and the temperature field satisfies the one-dimensional heat equation

$$
\frac{\partial T}{\partial t}
=
D\frac{\partial^2 T}{\partial z^2},
\qquad
0<z<H,\quad t>0,
$$

where $D$ is the thermal diffusivity.

The boundary and initial conditions are those stated in the manual:

$$
\begin{aligned}
T(0,t)&=0, \\
\frac{\partial T}{\partial z}(H,t)&=0, \\
T(z,0)&=T_a.
\end{aligned}
$$

The first condition represents the bottom surface in contact with ice water, the second models the top surface as approximately insulated, and the third states that the sample is initially at ambient temperature $T_a$.

### Separation of variables

We seek separated solutions of the form

$$
T(z,t)=Z(z)\tau(t).
$$

Substituting this into the heat equation gives

$$
Z(z)\frac{\mathrm{d}\tau}{\mathrm{d}t}
=
D\,\tau(t)\frac{\mathrm{d}^2 Z}{\mathrm{d}z^2}.
$$

Dividing by $D Z \tau$ yields

$$
\frac{1}{D\tau}\frac{\mathrm{d}\tau}{\mathrm{d}t}
=
\frac{1}{Z}\frac{\mathrm{d}^2 Z}{\mathrm{d}z^2}.
$$

Since the left-hand side depends only on $t$ and the right-hand side depends only on $z$, each side must equal the same constant. We choose the separation constant to be $-\lambda^2$, so that

$$
\begin{aligned}
\frac{1}{D\tau}\frac{\mathrm{d}\tau}{\mathrm{d}t} &= -\lambda^2, \\
\frac{1}{Z}\frac{\mathrm{d}^2 Z}{\mathrm{d}z^2} &= -\lambda^2.
\end{aligned}
$$

This produces the ordinary differential equations

$$
\begin{aligned}
\frac{\mathrm{d}\tau}{\mathrm{d}t} + D\lambda^2 \tau &= 0, \\
\frac{\mathrm{d}^2 Z}{\mathrm{d}z^2} + \lambda^2 Z &= 0.
\end{aligned}
$$

The first has solution

$$
\tau(t)=C_t e^{-D\lambda^2 t},
$$

and the second has solution

$$
Z(z)=A\sin(\lambda z)+B\cos(\lambda z).
$$

Now impose the boundary conditions. From $T(0,t)=0$,

$$
T(0,t)=Z(0)\tau(t)=0
\qquad \Longrightarrow \qquad
Z(0)=0.
$$

Using the form of $Z(z)$,

$$
Z(0)=A\sin 0 + B\cos 0 = B,
$$

so

$$
B=0.
$$

Hence

$$
Z(z)=A\sin(\lambda z).
$$

Next apply $\partial T/\partial z(H,t)=0$:

$$
\frac{\partial T}{\partial z}(H,t)=Z'(H)\tau(t)=0
\qquad \Longrightarrow \qquad
Z'(H)=0.
$$

Differentiating gives

$$
Z'(z)=A\lambda \cos(\lambda z),
$$

so

$$
A\lambda \cos(\lambda H)=0.
$$

For a nontrivial solution, $A\neq 0$ and $\lambda \neq 0$, which implies

$$
\cos(\lambda H)=0.
$$

Therefore,

$$
\lambda_n H = \left(n+\frac12\right)\pi,
\qquad n=0,1,2,\dots,
$$

or

$$
\lambda_n = \frac{\left(n+\frac12\right)\pi}{H}.
$$

Each allowed mode is therefore

$$
T_n(z,t)=A_n \sin\!\left[\frac{\left(n+\frac12\right)\pi z}{H}\right]
\exp\!\left[-D\left(\frac{\left(n+\frac12\right)\pi}{H}\right)^2 t\right].
$$

By superposition, the general solution is

$$
T(z,t)=\sum_{n=0}^{\infty}
A_n
\sin\!\left[\frac{\left(n+\frac12\right)\pi z}{H}\right]
\exp\!\left[-D\left(\frac{\left(n+\frac12\right)\pi}{H}\right)^2 t\right].
$$

### Determination of the coefficients

At $t=0$, the series solution must reproduce the initial condition $T(z,0)=T_a$, so

$$
T_a
=
\sum_{n=0}^{\infty}
A_n
\sin\!\left[\frac{\left(n+\frac12\right)\pi z}{H}\right].
$$

Multiply both sides by

$$
\sin\!\left[\frac{\left(m+\frac12\right)\pi z}{H}\right]
$$

and integrate from $0$ to $H$:

$$
\int_0^H
T_a
\sin\!\left[\frac{\left(m+\frac12\right)\pi z}{H}\right]
\mathrm{d}z
=
\sum_{n=0}^{\infty}
A_n
\int_0^H
\sin\!\left[\frac{\left(n+\frac12\right)\pi z}{H}\right]
\sin\!\left[\frac{\left(m+\frac12\right)\pi z}{H}\right]
\mathrm{d}z.
$$

Using orthogonality,

$$
\int_0^H
\sin\!\left(\lambda_n z\right)\sin\!\left(\lambda_m z\right)\mathrm{d}z
=
\frac{H}{2}\delta_{nm},
$$

so only the $n=m$ term survives:

$$
T_a
\int_0^H
\sin\!\left[\frac{\left(m+\frac12\right)\pi z}{H}\right]\mathrm{d}z
=
A_m\frac{H}{2}.
$$

The remaining integral is

$$
\begin{aligned}
\int_0^H
\sin\!\left[\frac{\left(m+\frac12\right)\pi z}{H}\right]\mathrm{d}z
&=
\left[
-\frac{H}{\left(m+\frac12\right)\pi}
\cos\!\left(\frac{\left(m+\frac12\right)\pi z}{H}\right)
\right]_0^H \\
&=
-\frac{H}{\left(m+\frac12\right)\pi}
\left[
\cos\!\left(\left(m+\frac12\right)\pi\right)-\cos 0
\right] \\
&=
\frac{H}{\left(m+\frac12\right)\pi},
\end{aligned}
$$

because $\cos[(m+\tfrac12)\pi]=0$. Hence

$$
A_m
=
\frac{2T_a}{\left(m+\frac12\right)\pi}.
$$

Renaming $m\to n$, the full temperature field is

$$
T(z,t)
=
\sum_{n=0}^{\infty}
\frac{2T_a}{\left(n+\frac12\right)\pi}
\sin\!\left[\frac{\left(n+\frac12\right)\pi z}{H}\right]
\exp\!\left[-D\left(\frac{\left(n+\frac12\right)\pi}{H}\right)^2 t\right].
$$

This is the series solution quoted in the manual, written here with the coefficients explicitly derived.

### Thermal gradient

Since the optical signal is governed by the refractive-index gradient, we need $\partial T/\partial z$ rather than $T$ itself. Differentiating the full temperature field term by term gives

$$
\begin{aligned}
\frac{\partial T}{\partial z}
&=
\sum_{n=0}^{\infty}
\frac{2T_a}{\left(n+\frac12\right)\pi}
\cdot
\frac{\left(n+\frac12\right)\pi}{H}
\cos\!\left[\frac{\left(n+\frac12\right)\pi z}{H}\right]
\exp\!\left[-D\left(\frac{\left(n+\frac12\right)\pi}{H}\right)^2 t\right] \\
&=
\frac{2T_a}{H}
\sum_{n=0}^{\infty}
\cos\!\left[\frac{\left(n+\frac12\right)\pi z}{H}\right]
\exp\!\left[-D\left(\frac{\left(n+\frac12\right)\pi}{H}\right)^2 t\right].
\end{aligned}
$$

This is the quantity to be compared with the measured beam displacement at fixed $z$.

### From thermal gradient to refractive gradient

Over the temperature range of the experiment, we approximate the refractive index as a linear function of temperature:

$$
n(T)\approx n_{\mathrm{ref}}+\left(\frac{\mathrm{d}n}{\mathrm{d}T}\right)(T-T_{\mathrm{ref}}).
$$

Differentiating with respect to $z$ gives

$$
\frac{\partial n}{\partial z}
=
\left(\frac{\mathrm{d}n}{\mathrm{d}T}\right)\frac{\partial T}{\partial z}.
$$

### Beam bending in a graded-index slab

To relate $\partial n/\partial z$ to the measured wall displacement, we adopt the paraxial approximation of geometric optics for a medium whose refractive index varies only with $z$. For a nearly horizontal ray written as $z=z(x)$, the ray equation reduces to

$$
\frac{\mathrm{d}^2 z}{\mathrm{d} x^2}
=
\frac{1}{n_{\mathrm{ref}}}\frac{\partial n}{\partial z},
$$

provided the deflection angles are small and the gradient is weak.

If $\partial n/\partial z$ is approximately constant across the optical path length $L$ at a given instant, then this integrates twice:

$$
\begin{aligned}
\frac{\mathrm{d} z}{\mathrm{d} x}
&=
\frac{1}{n_{\mathrm{ref}}}\frac{\partial n}{\partial z}\,x + C_1, \\
z(x)
&=
\frac{1}{2n_{\mathrm{ref}}}\frac{\partial n}{\partial z}\,x^2 + C_1 x + C_2.
\end{aligned}
$$

The beam enters the sample horizontally, so

$$
\left.\frac{\mathrm{d} z}{\mathrm{d} x}\right|_{x=0}=0
\qquad \Longrightarrow \qquad
C_1=0.
$$

Choosing $z(0)=0$ at the entrance plane for convenience also gives $C_2=0$. Therefore

$$
z(x)
=
\frac{1}{2n_{\mathrm{ref}}}\frac{\partial n}{\partial z}\,x^2,
$$

so the ray follows a parabola inside the sample.

The slope at the exit face $x=L$ is

$$
\left.\frac{\mathrm{d} z}{\mathrm{d} x}\right|_{x=L}
=
\frac{L}{n_{\mathrm{ref}}}\frac{\partial n}{\partial z}.
$$

For small angles, this slope is the internal angle $\theta_{\mathrm{in}}$ relative to the horizontal:

$$
\theta_{\mathrm{in}}
\approx
\left.\frac{\mathrm{d} z}{\mathrm{d} x}\right|_{x=L}.
$$

At the exit face, Snell's law and the small-angle approximation imply

$$
n_{\mathrm{ref}}\,\theta_{\mathrm{in}}
\approx
\theta_{\mathrm{out}},
$$

so this gives

$$
\theta_{\mathrm{out}}
\approx
L\frac{\partial n}{\partial z}.
$$

If the wall is a distance $R$ from the sample and the deflection remains small, then

$$
h \approx R\,\theta_{\mathrm{out}}
\approx
R\,L\frac{\partial n}{\partial z}.
$$

Using the relation between refractive and thermal gradient,

$$
h(t)
=
\left(\frac{\mathrm{d} n}{\mathrm{d} T}\right)
\frac{\partial T}{\partial z}(z,t)\,R\,L.
$$

The thermal-gradient formula and this optical relation form the final theoretical model to be fit to the experimental data.

Substituting the thermal gradient into the beam-displacement relation gives the explicit fit function

$$
h(t)
=
\left(\frac{\mathrm{d} n}{\mathrm{d} T}\right)\frac{2T_aRL}{H}
\sum_{n=0}^{\infty}
\cos\!\left[\frac{\left(n+\frac12\right)\pi z}{H}\right]
\exp\!\left[-D\left(\frac{\left(n+\frac12\right)\pi}{H}\right)^2 t\right].
$$

The parameter $D$ changes the time scale and shape of the curve, while $\mathrm{d}n/\mathrm{d}T$ changes only its overall scale, in agreement with the discussion in the manual.

## Experimental Methods

### Apparatus

The apparatus consisted of a [material] sample, a visible laser, an ice-water reservoir contacting the bottom surface of the sample, a distant wall or screen, and measuring tools for the geometric quantities $H$, $L$, $R$, and $z$. The sample height $H$ is the vertical extent of the material, $L$ is the length of the optical path inside the sample, $R$ is the distance from the sample to the wall, and $z$ is the height of the beam above the bottom surface.

> **Figure placeholder:** Insert photograph or schematic of the apparatus here.

**Figure:** Apparatus used to measure transient heat conduction by laser beam bending. The laser enters the sample horizontally at height $z$, the bottom surface is cooled by ice water, and the beam displacement $h$ is recorded on a wall a distance $R$ away.

### Measurement procedure

We aligned the laser so that it passed horizontally through the sample at a chosen height $z$. Before the sample contacted the ice-water bath, we marked the initial beam position on the wall to define the baseline $h=0$. We then established the time origin $t=0$ as the instant when the bottom surface of the sample first contacted the ice-water mixture.

At each fixed geometry $(H,L,R)$, we recorded the beam displacement $h(t)$ at one or more heights $z$. According to the manual, the most informative quantity to vary is $z$, and at least two or three distinct $z$ values should be collected for each $(H,R,L)$ combination. The final report will replace the placeholders below with the actual chosen runs:

$$
\begin{aligned}
(H_1,z_1)&=[\dots], &
(H_1,z_2)&=[\dots], &
(H_1,z_3)&=[\dots], \\
(H_2,z_1')&=[\dots], &
(H_2,z_2')&=[\dots], &
(H_2,z_3')&=[\dots].
\end{aligned}
$$

If the final design uses only one geometry, the second line should be removed and replaced by the actual run list.

The beam displacement was recorded by [manual marking every 30 s / video tracking / other]. The manual explicitly allows either a digital video record of the moving beam or a direct manual marking of the wall position at regular time intervals.

### Recorded quantities

For each run, we recorded the following quantities:

1. the geometric parameters $H$, $L$, and $R$;
2. the beam height $z$;
3. the ambient temperature $T_a$, if available;
4. the time series $h(t)$;
5. the material identity and qualitative notes on alignment, baseline stability, and thermal contact.

The raw-data tables and the apparatus images will be inserted after the experimental dataset is finalized.

## Planned Data Analysis

### Fitting strategy

Once the time series $h(t)$ has been extracted from the experiment, each run will be fit to the explicit fit function above with $D$ and $\mathrm{d}n/\mathrm{d}T$ as free parameters. The geometric quantities $H$, $L$, $R$, and $z$, together with the ambient temperature $T_a$, will be fixed by direct measurement. The fitting window will be chosen after inspecting the raw data for baseline drift, saturation, or visibly unmodeled behavior.

For the numerical evaluation of the fit function, the infinite sum will be truncated at a sufficiently large mode number $N$ such that the fitted curve no longer changes appreciably when $N$ is increased. The manual notes that high-order terms matter mostly at small $t$, while the low-order terms dominate at later times.

### Uncertainty propagation

The course guidance emphasizes that reported results should include uncertainties and that final significant digits should be consistent with those uncertainties. Since the experiment does not measure $D$ directly, the most immediate propagated quantity is the beam displacement itself and any intermediate quantities derived from the measured geometry.

If the beam displacement is extracted from a wall coordinate $y(t)$ relative to a baseline $y_0$, then

$$
h(t)=y(t)-y_0.
$$

Assuming independent uncertainties in $y$ and $y_0$, the propagated uncertainty in $h$ is

$$
(\delta h)^2 = (\delta y)^2 + (\delta y_0)^2.
$$

If any intermediate quantity is formed from a difference or quotient of measured values, uncertainties will be combined in quadrature according to standard first-order propagation. For a general function $f(x_1,x_2,\dots)$,

$$
(\delta f)^2
=
\sum_i
\left(
\frac{\partial f}{\partial x_i}\delta x_i
\right)^2,
$$

provided correlations are negligible.

The final fit-parameter uncertainties for $D$ and $\mathrm{d}n/\mathrm{d}T$ will be taken from the nonlinear regression output and discussed together with relevant systematic effects, including:

1. uncertainty in the beam height $z$;
2. uncertainty in the effective bottom thermal contact;
3. nonuniformity of the sample or departure from the one-dimensional approximation;
4. drift of the beam baseline on the wall;
5. possible convection if a liquid sample is used.

## Results

This section will be completed after the final dataset is obtained. The following items should be inserted:

1. a table of measured geometric quantities $H$, $L$, $R$, and $z$;
2. one figure showing representative beam-displacement curves $h(t)$;
3. one figure showing the theoretical fit of the model to the measured data;
4. a table summarizing best-fit values of $D$ and $\mathrm{d}n/\mathrm{d}T$ for each run.

### Placeholder table for the geometric parameters and experimental runs

| Run | $H$ (cm) | $L$ (cm) | $R$ (m) | $z$ (cm) |
|---|---:|---:|---:|---:|
| [1] | [\dots] | [\dots] | [\dots] | [\dots] |
| [2] | [\dots] | [\dots] | [\dots] | [\dots] |
| [3] | [\dots] | [\dots] | [\dots] | [\dots] |
| [4] | [\dots] | [\dots] | [\dots] | [\dots] |
| [5] | [\dots] | [\dots] | [\dots] | [\dots] |
| [6] | [\dots] | [\dots] | [\dots] | [\dots] |

> **Figure placeholder:** Insert raw beam-displacement curves $h(t)$ here.

**Figure:** Placeholder for the measured beam displacement as a function of time for one or more runs.

> **Figure placeholder:** Insert theoretical fit(s) here.

**Figure:** Placeholder for fits of the theoretical model to the measured beam-displacement data.

## Discussion

The central physical question is why the beam first bends away from its initial position and later returns toward it. The beam-displacement relation shows that the optical signal is proportional to the local thermal gradient rather than to the temperature itself. At a fixed height $z$, the local gradient increases as the cold front approaches that height from below, reaches a maximum when the temperature variation is steepest near that position, and then decreases after the region both above and below the beam have cooled more substantially. The manual explicitly emphasizes that this qualitative explanation should accompany the quantitative fit.

After the data are inserted, this section should address the following points:

1. whether the measured curves display the expected rise-and-fall behavior;
2. whether low-$z$ runs peak earlier than high-$z$ runs;
3. whether the fitted diffusivity $D$ is consistent across runs and with published values;
4. whether the fitted $\mathrm{d}n/\mathrm{d}T$ is physically reasonable for the chosen material;
5. which uncertainty sources dominate the final parameter estimates.

If any runs depart systematically from the model, possible explanations include imperfect bottom thermal contact, departures from one-dimensional conduction, sample inhomogeneity, optical misalignment, or, for liquid samples, convection.

## Conclusion

We developed the full theoretical framework needed to interpret the transient heat-conduction experiment by laser beam bending. Starting from the one-dimensional heat equation with mixed boundary conditions, we derived the series solution for $T(z,t)$, the corresponding thermal gradient $\partial T/\partial z$, and the paraxial optical relation linking that gradient to the measured beam displacement on the wall. The completed report will use the experimental data to fit the theoretical model and determine $D$ and $\mathrm{d}n/\mathrm{d}T$ for [material]. At present, the structure of the report, the full theory derivation, and the uncertainty framework are in place; the numerical results, figures, and quantitative discussion will be inserted once the final dataset is processed.

## References

1. J. Brody, *Transient Heat Conduction*, Department of Physics, Emory University laboratory manual (2026).
2. H. S. Carslaw and J. C. Jaeger, *Conduction of Heat in Solids*, 2nd ed. (Clarendon Press, Oxford, 1959).
3. M. Born and E. Wolf, *Principles of Optics*, 7th ed. (Cambridge University Press, Cambridge, 1999).
4. J. R. Taylor, *An Introduction to Error Analysis*, 2nd ed. (University Science Books, Sausalito, CA, 1997).
5. D. Deardorff, *Introduction to Measurements and Error Analysis*, Department of Physics and Astronomy, University of North Carolina at Chapel Hill (2000).