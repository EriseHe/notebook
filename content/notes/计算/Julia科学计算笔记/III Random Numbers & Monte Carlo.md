# Module 3

> **Big picture.** Randomness is a *computational resource*. By letting algorithms make random choices we can: (i) generate synthetic data, (ii) solve otherwise intractable integrals in high dimensions (Monte Carlo), and (iii) sample equilibrium distributions in statistical physics (Metropolis–Hastings / MCMC). This module moves from **pseudorandom number generators** → **Monte Carlo integration** → **importance sampling** → **Markov chains** → **Metropolis(-Hastings)** → **Ising & Lennard–Jones case studies**.

---

## 11. Pseudorandomness & Monte Carlo Integration

### 11.1 Pseudorandom Number Generators (PRNGs)
**Goal.** Produce a reproducible stream of numbers that *statistically* look like draws from $\mathrm{Unif}[0,1)$ (and related distributions).

#### 11.1.1 Linear Congruential Generator (LCG)
Recurrence:
$$
X_{n+1} = (a X_n + c)\bmod m.\tag{11.1}
$$
- $X_n$ is the internal state; $a,c,m$ are parameters.
- Poor choices of $a,c,m$ cause visible correlations (e.g., even/odd patterns modulo small integers).

**Reference implementation (for pedagogy, not research):**
```julia
mutable struct LCG
    state::UInt32
    a::UInt32
    c::UInt32
end

function LCG()
    seed = time_ns() & 0xFFFF_FFFF
    # Example parameters (modulus is 2^32 implicitly via overflow)
    return LCG(UInt32(seed), 0x01010101, 0xB3E6_3C93)
end

function rand_uint!(rng::LCG)
    rng.state = rng.a * rng.state + rng.c
    return Int(rng.state)           # in [0, 2^32)
end

function rand_real!(rng::LCG)
    rng.state = rng.a * rng.state + rng.c
    return Float64(rng.state) / Float64(typemax(UInt32))  # in [0,1)
end
```
> **Practice.** Never "roll your own" RNG in production. Use vetted libraries (e.g., `Xoshiro256++` in Julia) unless you *study* RNGs.

#### 11.1.2 Reproducibility & seeding
Determinism is a feature: record the seed, language/runtime version.
```julia
using Random
Random.seed!(123321)          # guarantees identical streams on this version
x = rand(5)                   # same numbers every run with the same seed
```

#### 11.1.3 Sampling non‑uniform distributions
**Inverse transform sampling.** If CDF $P(x)$ is invertible and $y\sim \mathrm{Unif}[0,1]$, then $x=P^{-1}(y)$ has the desired PDF $p(x)=P'(x)$.

*Example (exponential):* $p(x;\lambda)=\lambda e^{-\lambda x},\ x\ge 0$. CDF $P(x)=1-e^{-\lambda x}\Rightarrow x=-\tfrac{1}{\lambda}\ln(1-y)$.
```julia
function rand_exp(λ)
    y = rand()
    return -log(1 - y)/λ
end
```
*Gaussian (no simple inverse CDF):* use **Box–Muller** (variable transform) or **rejection sampling**.
```julia
function randn_pair()
    u1, u2 = rand(), rand()
    r = sqrt(-2 * log(u1))
    θ = 2π * u2
    return r*cos(θ), r*sin(θ)
end
```

---

### 11.2 Monte Carlo (MC) Integration
**Motivation.** Deterministic quadrature deteriorates with dimension (curse of dimensionality). MC maintains **dimension‑independent** convergence rate.

#### 11.2.1 Throwing darts (1D)
$$
\int_a^b f(x)\,dx \approx (b-a)\,\frac{1}{N}\sum_{i=1}^N f(x_i),\qquad x_i\sim \mathrm{Unif}[a,b].\tag{11.5}
$$
```julia
function mc_integrate(f, a, b, N)
    s = 0.0
    for _ in 1:N
        x = a + (b-a)*rand()
        s += f(x)
    end
    return (b-a) * s/N
end
```
**Error scaling.** For IID samples, $\mathrm{RMSE}\propto N^{-1/2}$ (independent of dimension). In contrast, a grid with $n$ points/axis in $d$D uses $N=n^d$ points and typical error $\sim n^{-2}$ ⇒ $N^{-2/d}$. For $d\gtrsim 4$, MC often wins.

#### 11.2.2 Importance sampling
Goal: reduce variance by biasing samples toward regions where $|f|$ is large.
$$
I = \int f(x)\,dx = \int \frac{f(x)}{p(x)}\,p(x)\,dx \approx \frac{1}{N}\sum_{i=1}^N \frac{f(x_i)}{p(x_i)},\quad x_i\sim p.\tag{11.8}
$$
Optimal (unattainable) $p$: $p_{\text{ideal}}(x) \propto |f(x)|$. In practice choose a simple $p$ roughly matching the shape of $f$.
```julia
function mc_importance(f, p, draw_p, N)
    s = 0.0
    for _ in 1:N
        x = draw_p()
        s += f(x)/p(x)
    end
    return s/N
end
```
**Bridge to physics.** For a system with microstate $\mu$ and energy $E(\mu)$, the Boltzmann distribution
$$
\pi(\mu) = \frac{1}{Z} e^{-\beta E(\mu)},\qquad \beta=(k_B T)^{-1},\ Z=\sum_{\mu}e^{-\beta E(\mu)}
$$
plays the role of an **importance** distribution—but we can’t sample it directly nor compute $Z$ for large systems. Enter **MCMC**.

---

## 12. Markov Chains & Metropolis–Hastings (MCMC)

### 12.1 Stationarity, balance, reversibility
A Markov chain with transition matrix $T$ evolves distributions $\mathbf{p}^{(t+1)} = T\,\mathbf{p}^{(t)}$. A **stationary** distribution $\boldsymbol{\pi}$ satisfies $\boldsymbol{\pi}=T\boldsymbol{\pi}$.

- **Global balance:** $\sum_i T_{ij}\,\pi_i = \pi_j$.  
- **Detailed balance (reversibility):** $T_{ij}\,\pi_i = T_{ji}\,\pi_j$.  
Detailed balance ⇒ global balance; many physical systems are microscopically reversible, motivating this constraint.

### 12.2 Metropolis–Hastings construction
Split transitions into **proposal** $g(\mu\to\mu')$ and **acceptance** $A(\mu\to\mu')$:
$$
T(\mu\to\mu') = g(\mu\to\mu')\,A(\mu\to\mu').
$$
Impose detailed balance with target $\pi$:
$$
\frac{A(\mu\to\mu')}{A(\mu'\to\mu)} = \frac{\pi(\mu')\,g(\mu'\to\mu)}{\pi(\mu)\,g(\mu\to\mu')}\, .\tag{12.1}
$$
A sufficient choice (Hastings):
$$
A(\mu\to\mu') = \min\left\{1,\ \frac{\pi(\mu')\,g(\mu'\to\mu)}{\pi(\mu)\,g(\mu\to\mu')}\right\}.
$$
For **symmetric** proposals $g(\mu\to\mu')=g(\mu'\to\mu)$, this reduces to the **Metropolis rule**
$$
A(\mu\to\mu') = \min\{1,\ \pi(\mu')/\pi(\mu)\}.\tag{12.2}
$$
With Boltzmann $\pi$, the ratio is $\exp(-\beta\Delta E)$, and the (unknown) partition function cancels.

**Algorithm (physics form).**
1. Start at state $\mu$ with energy $E(\mu)$.  
2. Propose $\mu'\sim g(\mu\to\cdot)$.  
3. Compute $\Delta E=E(\mu')-E(\mu)$.  
4. If $\Delta E\le0$ accept; else accept with prob. $\exp(-\beta\Delta E)$.  
5. After **burn‑in**, measure observables; use block‑averaging or thinning to reduce autocorrelation.

**Tuning.** Adjust proposal step size for $\approx$ 20–60% acceptance; near criticality autocorrelation times grow.

---

## Case Study I — 2D Ising Model (NVT, no field)
Hamiltonian on an $L\times L$ square lattice with periodic BC:
$$
H(\mathbf{s}) = -J\sum_{\langle i,j\rangle} s_i s_j,\qquad s_i\in\{\pm 1\}.
$$

**Minimal Julia implementation.**
```julia
struct Ising2D
    L::Int
    J::Float64
    β::Float64
    s::Matrix{Int8}   # spins ±1
end

function ising_init(L, J, β; ordered=false)
    s = ordered ? fill(Int8(1), L, L) : Int8.(sign.(rand(L, L) .- 0.5))
    return Ising2D(L, J, β, s)
end

# Periodic indexing helper
mod1p(i, L) = i < 1 ? i + L : (i > L ? i - L : i)

# Energy change for flipping one spin (i,j)
function ΔE_site(m::Ising2D, i, j)
    s = m.s; L = m.L; J = m.J
    nn = s[mod1p(i-1,L), j] + s[mod1p(i+1,L), j] + s[i, mod1p(j-1,L)] + s[i, mod1p(j+1,L)]
    return 2.0 * J * s[i,j] * nn
end

# One Monte Carlo sweep (L^2 Metropolis updates)
function sweep!(m::Ising2D)
    L = m.L; β = m.β
    for _ in 1:(L*L)
        i = rand(1:L); j = rand(1:L)
        dE = ΔE_site(m, i, j)
        if dE <= 0 || rand() < exp(-β*dE)
            m.s[i,j] = -m.s[i,j]
        end
    end
    return m
end

magnetization(m::Ising2D) = mean(m.s)
```
**Observables.** Magnetization $m=\langle s\rangle$, energy per spin, specific heat $C$, susceptibility $\chi$. Handle burn‑in & correlations.

---

## Case Study II — Lennard–Jones (LJ) Fluid (NVT)
Pair potential (using reduced units):
$$
U(r) = 4\varepsilon\Big[ (\sigma/r)^{12} - (\sigma/r)^6 \Big].
$$
**Single‑particle displacement MC** with periodic boundary and minimum‑image convention.

```julia
struct LJBox
    L::Float64      # box length
    β::Float64
    σ::Float64
    ε::Float64
    r::Matrix{Float64}   # positions N×3
end

# minimum‑image squared distance between i and j
function r2_minimg(box::LJBox, i, j)
    Δ = box.r[i, :] .- box.r[j, :]
    for k in 1:3
        if Δ[k] >  box.L/2; Δ[k] -= box.L; end
        if Δ[k] < -box.L/2; Δ[k] += box.L; end
    end
    return sum(Δ.^2)
end

@inline lj_pair(box::LJBox, r2) = begin
    sr2 = (box.σ^2) / r2
    sr6 = sr2^3
    4*box.ε*(sr6^2 - sr6)
end

function ΔE_particle(box::LJBox, i, newpos)
    old = view(box.r, i, :)
    ΔE = 0.0
    # difference of interactions involving particle i
    for j in 1:size(box.r, 1)
        j == i && continue
        # old energy
        Δo = old .- box.r[j, :]
        for k in 1:3
            if Δo[k] >  box.L/2; Δo[k] -= box.L; end
            if Δo[k] < -box.L/2; Δo[k] += box.L; end
        end
        r2o = sum(Δo.^2)
        # new energy
        Δn = newpos .- box.r[j, :]
        for k in 1:3
            if Δn[k] >  box.L/2; Δn[k] -= box.L; end
            if Δn[k] < -box.L/2; Δn[k] += box.L; end
        end
        r2n = sum(Δn.^2)
        ΔE += lj_pair(box, r2n) - lj_pair(box, r2o)
    end
    return ΔE
end

# One MC displacement attempt for a random particle
function mc_move!(box::LJBox; Δ=0.1)
    N = size(box.r, 1)
    i = rand(1:N)
    trial = box.r[i, :] .+ (rand(3) .- 0.5) .* (2Δ)  # uniform cube of side 2Δ
    dE = ΔE_particle(box, i, trial)
    if dE <= 0 || rand() < exp(-box.β * dE)
        box.r[i, :] .= trial
        return true
    end
    return false
end
```
**Compare with MD.** MC efficiently samples equilibrium structure (e.g., radial distribution function $g(r)$); MD also gives dynamics. In practice, use neighbor lists/cell lists and cutoffs to reduce the $O(N^2)$ cost.

---

## Checklist & Key Takeaways
- *PRNGs:* deterministic, reproducible; use vetted RNGs; record seeds.  
- *Transforms:* inverse CDF; Box–Muller; rejection sampling.  
- *MC integration:* unbiased estimator; RMSE $\sim N^{-1/2}$; beats grids in high $d$.  
- *Importance sampling:* choose $p$ to reduce variance; bridge to Boltzmann.  
- *MCMC:* detailed balance ⇒ correct stationary law; Metropolis–Hastings acceptance.  
- *Ising/LJ:* concrete Metropolis implementations; measure, equilibrate, tune proposals.

---

### Practice Prompts (for mastery)
1. **RNG sanity checks.** Plot histograms and perform serial correlation tests for your RNG; explore modulo‑small‑integer artifacts in an LCG.
2. **MC vs trapezoid.** Compare error vs $N$ for $\int_0^1 e^{-x^2}\,dx$ in 1D, 4D (via product measure) using both methods.
3. **Importance sampling demo.** Integrate a narrow Gaussian with a mismatched vs matched proposal; report variance.
4. **Ising scaling.** Measure magnetization vs $\beta$ on increasing $L$; comment on critical slowing down.
5. **LJ fluid.** Compute $g(r)$ from MC and compare to MD at same $T,\rho$; discuss differences.

