---
title: "II ODEs与分子动力学"
---

This note summarizes Chapters 8 and 9 of Module II on ordinary differential equations (ODEs) and molecular dynamics. It distills the big-picture ideas, derivations, formulas and example code from the PDF into a structured teaching resource suitable for an applied mathematics or computational physics course.

## 8 Ordinary differential equations (ODEs)

### 8.1 Why solve ODEs?

Many physical systems evolve in time according to a set of first-order ODEs. Given a state vector $\mathbf{y}(t)$ that completely specifies the configuration (e.g. positions and velocities of particles), the evolution is governed by an ODE system of the form $\dot{\mathbf{y}}=f(\mathbf{y}, t)$. Higher-order equations, such as Newton's second law $\ddot{x}= F / m$, can always be recast as first-order systems. The initial value problem asks us to determine $\mathbf{y}(t)$ for $t>0$ given $\mathbf{y}(0)$.

### 8.2 Case study: N-body simulations and planetary dynamics

To make these ideas concrete, the notes develop a gravitational N-body simulation of the solar system. This serves both as a motivating physical problem and as a programming design exercise.

### 8.2.1 The naïve solution: Euler's method

The forward (or explicit) Euler method is derived by taking a first-order Taylor expansion of $\mathbf{y}$ at time $t+\Delta t$. Truncating the expansion yields

$$
\mathbf{y}_{n+1}=\mathbf{y}_{n}+\Delta t f\left(\mathbf{y}_{n}, t_{n}\right),
$$

which has a local truncation error of $O\left(\Delta t^{2}\right)$. A direct implementation of this idea for the solar system stores each body in a list and loops over bodies to compute pairwise forces and then updates positions and velocities. Although concise, this monolithic script mixes data, physics and numerical method in one loop and is hard to extend or test.

``` julia
# Pseudocode of the naïve N-body solver (simplified)
for n in 1:Nsteps
    # compute accelerations
    for i in 1:N
        a[i] = 0
        for j in 1:N
            if i f j
                r = positions[i] - positions[j]
                a[i] += G * masses[j] * r / norm(r)^3
            end
        end
    end
    # Euler update
    positions += velocities * }\Delta
    velocities += a * }\Delta
end
```


## Limitations

- Low accuracy: energy drifts systematically over time.
- No modularity: physics, integrator and data structures are tangled, making it hard to replace the integrator or force law.
- Global state: mutating global arrays leads to brittle code.


### 8.2.2 Top-down design and a reusable API

To build robust simulations one should separate concerns. The notes propose a high-level function run_simulation! that takes a system, a force calculator and an integrator as separate objects, along with a time step and number of steps. An optional callback allows data to be recorded periodically.

``` julia
function run_simulation!(system, force_calc, integrator,
                \Deltat, Nsteps; callback=(sys, step)->nothing,
                callback_interval=1)
    for step in 1:Nsteps
        integrate!(system, force_calc, integrator, ut)
        if step % callback_interval == 0
            callback(system, step)
        end
    end
end
```

The separation of the state (positions, velocities, masses), the force law and the time-stepping algorithm not only clarifies intent but makes the code extensible and testable.

### 8.2.3 Data structures for particles

A stateful system of particles can be represented either as an array of structs (AoS)-each particle stores its own position, velocity and mass-or as a struct of arrays (SoA)-separate arrays for positions, velocities and masses. The AoS pattern is intuitive, whereas the SoA layout often offers better cache locality and vectorization. The notes introduce a Particle type and a System type (AoS) using static vectors for fixed-dimension positions and velocities:

``` julia
struct Particle{D,T}
    position::SVector{D,T}
    velocity::SVector{D,T}
    mass::T
end
struct System{D,T}
    particles::Vector{Particle{D,T}}
end
```

Units matter: one should choose units so that numbers are $O(1)$. The solar-system example uses astronomical units (AU), years and solar masses to avoid round-off issues.

### 8.2.4 Designing integrators via multiple dispatch

Using Julia's multiple dispatch, we create an abstract integrator type and concrete types for each algorithm. For the forward Euler method, an integrator stores a pre-allocated vector of accelerations. The integrator is stateful so that scratch space is reused and no allocations occur inside the inner loop. The code is:

``` julia
abstract type AbstractIntegrator end
struct ForwardEuler{D,T} <: AbstractIntegrator
    accelerations::Vector{SVector{D,T}}
end
function ForwardEuler(system::System{D,T})
    ForwardEuler(zeros(SVector{D,T}, length(system.particles)))
end
function euler_step(p::Particle, a, \Deltat)
    new_pos = p.position + p.velocity * }\Delta
    new_vel = p.velocity + a * }\Delta
    Particle(new_pos, new_vel, p.mass)
end
function integrate!(sys::System{D,T}, fcalc, integrator::ForwardEuler{D,T}, }\Delta\textrm{t}\mathrm{ )
where {D,T}
    compute_acceleration!(integrator.accelerations, sys, fcalc)
    sys.particles .= euler_step.(sys.particles, integrator.accelerations, \Deltat)
end
```

This design isolates the integrator logic: the integrator does not need to know details of gravity, and the force calculator does not need to know about the time-stepping scheme.

### 8.2.5 Force calculators

A similar pattern yields a force-calculator hierarchy. For example, a brute-force calculator stores a user-provided pairwise force function. A helper _apply_force_pair! updates the accelerations of particles $i$ and $j$ using Newton's third law. The main compute_acceleration! function loops over all unique pairs and calls the helper. These abstractions allow alternative force algorithms (e.g. Barnes-Hut tree codes) to be used without changing the integrator.

``` julia
abstract type AbstractForceCalculator end
struct BruteForceCalculator{F} <: AbstractForceCalculator
    pairwise_force::F
end
function _apply_force_pair!(a, i, j, particles, force)
    F12 = force(particles[i], particles[j])
    a[i] += F12 / particles[i].mass
    a[j] -= F12 / particles[j].mass # Newton's third law
end
function compute_acceleration!(a, sys::System{D,T}, calc::BruteForceCalculator)
where {D,T}
    fill!(a, zero(SVector{D,T}))
    n = length(sys.particles)
    for i in 1:(n-1)
        for j in (i+1):n
            _apply_force_pair!(a, i, j, sys.particles, calc.pairwise_force)
        end
    end
end
```


### 8.2.6 Results: testing Euler on the solar system

When the forward Euler method is used to simulate the solar system for a millennium, the total energy drifts monotonically upward. Decreasing the time step slows the drift but does not eliminate it. The energy error accumulates because the method is only first-order accurate and does not respect physical conservation laws. This motivates more sophisticated integrators.

## 9 Integration schemes for ODEs

Chapter 9 explores higher-order and structure-preserving integrators.

### 9.1 Higher-order integrators

### 9.1.1 Runge-Kutta 2 (RK2) family

To obtain second-order accuracy, one can approximate the Taylor expansion to order $\Delta t^{2}$ by sampling the derivative at intermediate points. A generic two-stage method computes

$$
\begin{aligned}
k_{1} & =\Delta t f\left(\mathbf{y}_{n}, t_{n}\right) \\
k_{2} & =\Delta t f\left(\mathbf{y}_{n}+\alpha k_{1}, t_{n}+\beta \Delta t\right) \\
\mathbf{y}_{n+1} & =\mathbf{y}_{n}+a k_{1}+b k_{2}
\end{aligned}
$$

where the coefficients $\alpha, \beta, a, b$ satisfy $a+b=1$ and $b \beta=1 / 2$. Two common choices are:

- Heun's method: $\alpha=1, \beta=1, a=1 / 2, b=1 / 2$. It averages the slope at the beginning and end of the interval.
- Midpoint method: $\alpha=1 / 2, \beta=1 / 2, a=0, b=1$. It estimates the slope at the midpoint.

Both have local truncation errors $O\left(\Delta t^{3}\right)$ and global errors $O\left(\Delta t^{2}\right)$.

### 9.1.2 Butcher tableau notation

A useful way to specify Runge-Kutta methods is the Butcher tableau, which arranges the coefficients $c_{i}, a_{i j}$ and $b_{i}$ in a lower-triangular matrix. The tableau for forward Euler, midpoint and Heun's methods is shown in the notes; matching rows and columns encode the stages and their weights.

### 9.1.3 The classic RK4 method

The four-stage Runge-Kutta (RK4) method is a workhorse for many problems. It uses four derivative evaluations per step:

$$
\begin{aligned}
k_{1} & =\Delta t f\left(\mathbf{y}_{n}, t_{n}\right) \\
k_{2} & =\Delta t f\left(\mathbf{y}_{n}+\frac{1}{2} k_{1}, t_{n}+\frac{1}{2} \Delta t\right) \\
k_{3} & =\Delta t f\left(\mathbf{y}_{n}+\frac{1}{2} k_{2}, t_{n}+\frac{1}{2} \Delta t\right) \\
k_{4} & =\Delta t f\left(\mathbf{y}_{n}+k_{3}, t_{n}+\Delta t\right) \\
\mathbf{y}_{n+1} & =\mathbf{y}_{n}+\frac{1}{6}\left(k_{1}+2 k_{2}+2 k_{3}+k_{4}\right)
\end{aligned}
$$

Its local error is $O\left(\Delta t^{5}\right)$ and global error $O\left(\Delta t^{4}\right)$. The Butcher tableau for RK4 has four rows and yields the coefficients $(1 / 6,1 / 3,1 / 3,1 / 6)$.

## Implementing RK4 in the N-body framework

The modular framework from Chapter 8 makes it easy to add an RK4 integrator. A new RungeKutta4 struct stores scratch vectors k1_accel, k2_accel, k3_accel, k4_accel and a copy of the initial particle states. An integrate! method dispatches on this type and carries out the four updates while reusing the scratch space. In practice, RK4 is more accurate but requires four force evaluations per time step.

### 9.1.4 Limitations of high-order methods

Simulations using RK4 with a time step $\Delta t=10^{-3}$ show dramatically smaller energy drift than forward Euler, but energy still increases slowly over long times. High-order methods improve accuracy but do not inherently respect the time-reversibility and symplectic structure of Hamiltonian systems.

### 9.2 Time-reversible and symplectic integration

### 9.2.1 Failure of time reversal for Euler's method

Hamilton's equations are time-reversible; running the system forward and then backward should return it to the initial state. For a simple harmonic oscillator $\dot{x}=v, \dot{v}=-x$ and forward Euler, applying a forward step and then a backward step leads to $(x, v) \mapsto\left(1+\Delta t^{2}\right)(x, v)$. The system does not return to its starting point, revealing that Euler's method breaks time-reversal symmetry.

### 9.2.2 Symplectic Euler method

A simple fix is the symplectic Euler method. In Hamiltonian mechanics where the Hamiltonian splits into kinetic and potential parts, one form of the method updates the velocity before the position ("kick-drift"), while the adjoint updates the position first ("drift-kick"):

$$
\begin{aligned}
& v_{n+1}=v_{n}+\Delta t F\left(q_{n}\right) / m \\
& q_{n+1}=q_{n}+\Delta t v_{n+1}
\end{aligned}
$$

where $F=-\nabla V$. The reverse ordering with $\Delta t \rightarrow-\Delta t$ is the inverse map, so the method is time-reversible. In code, one can implement this using a SymplecticEuler integrator that stores accelerations and uses a symplectic_euler_step that first updates velocity then position.

### 9.2.3 Velocity Verlet (Størmer-Verlet)

A more accurate symplectic integrator, favoured in molecular dynamics, is the velocity Verlet algorithm. It splits the step into a half-step velocity update, a full position update and a final half-step velocity update:

$$
\begin{aligned}
v\left(t+\frac{\Delta t}{2}\right) & =v(t)+\frac{\Delta t}{2} a(q(t)) \\
q(t+\Delta t) & =q(t)+\Delta t v\left(t+\frac{\Delta t}{2}\right) \\
v(t+\Delta t) & =v\left(t+\frac{\Delta t}{2}\right)+\frac{\Delta t}{2} a(q(t+\Delta t))
\end{aligned}
$$

Because the force computed in the final step can be reused as the initial force in the next step, the method requires only one force evaluation per time step. A VerletIntegrator stores the current accelerations and an integrate! method performs the three-stage update.

### 9.3 Symplectic integrators and energy conservation

### 9.3.1 Operator splitting and the Liouvillian

Hamiltonian evolution can be viewed as applying the exponential of the Liouville operator $\mathcal{L}=\{\cdot, H\}$, where $\{\cdot, \cdot\}$ denotes the Poisson bracket. For Hamiltonians of the form $H=T(p)+V(q)$, one can split $\mathcal{L}=\mathcal{L}_{T}+\mathcal{L}_{V}$ corresponding to drift (updating positions with fixed momenta) and kick (updating momenta with fixed positions) parts. The Baker-Campbell-Hausdorff formula shows that alternating drift and kick steps approximates the true evolution; the velocity Verlet propagator implements the symmetric composition

$$
\Phi_{\text {Verlet }}(\Delta t)=e^{\Delta t \mathcal{L}_{V} / 2} e^{\Delta t \mathcal{L}_{T}} e^{\Delta t \mathcal{L}_{V} / 2}
$$

### 9.3.2 Shadow Hamiltonians and backward error analysis

Symplectic integrators do not exactly conserve the original Hamiltonian, but they exactly conserve a shadow Hamiltonian $\tilde{H}=H+\Delta t^{2} H_{2}+O\left(\Delta t^{4}\right)$. The correction term involves gradients and curvature of the potential. Thus the total energy oscillates around the true energy rather than drifting; numerical experiments with the solar system show that symplectic Euler and velocity Verlet keep the relative energy error bounded over millennia, whereas even RK4 exhibits linear energy drift.

## Summary and teaching reflections

1. Conceptual foundation: ODEs describe how systems evolve in time. Turning higher-order equations into first-order systems simplifies numerical treatment.
2. Euler's method: A first-order scheme with local error $O\left(\Delta t^{2}\right)$. Easy to implement but poor at conserving energy over long times.
3. Modular design: Separate data structures, force calculations and integrators. Use high-level APIs to orchestrate simulations and callbacks for data collection.
4. Higher-order methods: Runge-Kutta schemes improve accuracy. RK2 (Heun, midpoint) and RK4 are derived by matching Taylor series coefficients. RK4 has global error $O\left(\Delta t^{4}\right)$ but still fails to respect Hamiltonian structure over long times.
5. Symplectic integrators: Time-reversible methods like symplectic Euler and velocity Verlet update positions and velocities asymmetrically to respect the underlying symplectic structure. These methods conserve a nearby Hamiltonian and keep long-term energy errors bounded.
6. Implementation tips: Pre-allocate scratch vectors, use static vectors for fixed dimensions, and always choose consistent units.

These notes illustrate both the mathematics of numerical integration and the importance of software design in scientific computing. Students should experiment with different integrators in code, measure energy conservation and performance, and appreciate how algorithmic choices reflect physical principles.

