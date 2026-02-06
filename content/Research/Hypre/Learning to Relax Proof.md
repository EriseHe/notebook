
# 1. Near-asymptotic analysis of SOR

## 1.1 Setup

## 2.2 Build a learnable surrogate bound: Assumption + Lemma


**Assumption 2.1 (near-asymptotic)**: 

There exists a constant $\tau \in (0,1)$ s.t.  $\forall \,\omega \in \Omega$, the matrix $\mathbf{C}_\omega=\mathbf{I}_n - \mathbf{A}(\mathbf{D}/\omega + \mathbf{L})^{-1}$
satisfies:
$$
\left\|\mathbf{C}_\omega^{\,k}\right\|_2
\le
\Bigl(
\rho(\mathbf{C}_\omega)
+
\tau\bigl(1-\rho(\mathbf{C}_\omega)\bigr)
\Bigr)^{k}
$$
for iteration $k=\min\Bigl\{\, i \;\big|\;\|\mathbf{C}_\omega^{\,i+1}\mathbf{b}\|_2<\varepsilon \|\mathbf{b}\|_2\Bigr\}.$

**Remarks.** Convergence happens when the iteration is already behaving like its asymptotic rate (spectral radius), up to a parameter $\tau$.

Lemma 2.1 
Define 
$$U(\omega)=1+\frac{-\log}{-\log(\rho(C_{\omega})+\tau(1-\rho(C_{\omega})))}

$$

# Main Lemma and Theorem

- **Lemma 2.1** — Builds a **computable upper-bound surrogate** (U(\omega)) for SOR iteration count and proves **shape/regularity** (bounded + monotone toward the optimal (\omega^*)), enabling learning guarantees.
    
- **Theorem 2.1** — Shows a **Tsallis-INF (bandit) regret bound** for choosing (\omega_t) across a sequence, competing with the **best fixed** (\omega) in terms of the paper’s **near-asymptotic cost surrogate** (iteration-count upper bound).
    
- **Theorem 2.2** — Extends the above to a **diagonally-shifted family** (A(c)=A+cI): via context binning + bandits, achieves regret vs an **instance-optimal mapping** (\omega^*(c)) (up to discretization/Lipschitz terms).
    
- **Theorem 2.3** — Gives an analogous **bandit regret bound** when the solver is **preconditioned CG** (instead of SOR), with problem difficulty controlled by spectral quantities of the preconditioned matrices.
    
- **Theorem 3.1** — Provides a **stochastic / expected-cost** regret guarantee for **SSOR**, competing with the **best fixed** (\omega), under assumptions that let them prove the expected iteration count is well-behaved (Lipschitz-type).
    
- **Theorem 3.2** — For diagonal shifts, proves a **contextual-bandit regret bound** for their Chebyshev-regression contextual method (ChebCB), competing with **any policy** (f(c)) (not just (\omega^*(c))).
    
## Appendix A (offline / sample-complexity style guarantees)

- **Corollary A.1** — Under a **truncated-Gaussian target-vector** assumption, gives a **sample complexity bound** for learning a near-optimal (\omega) by ERM over a grid (in terms of $(\alpha,\varepsilon,\delta)$, polylog factors in $(n)$).
    
- **Corollary A.2** — Similar **ERM sample complexity** guarantee under a more general bounded-support target-vector distribution (still $(|b|)$-bounded).
    

---

## Appendix B (bandit sub-results used by the main theorems)

- **Theorem B.1** — A standard Tsallis-INF-style regret bound for a **fixed horizon step size** on discrete actions.
    
- **Theorem B.2** — An “anytime” Tsallis-INF-style regret bound with **time-varying step size** (works without knowing (T) in advance).
    
- **Theorem B.3** — Converts **(semi-)Lipschitz structure** of the loss over a continuous action interval into regret bounds via discretization + Tsallis-INF.
    
- **Theorem B.4** — The contextual analogue: with **Lipschitz policy class** and discretized contexts, gives regret vs a **Lipschitz policy** (f(c)).
    

---

## Appendix C (Chebyshev approximation + contextual-bandit machinery)

- **Theorem C.1** — A **Chebyshev approximation** guarantee for bounded Lipschitz functions: how well degree-(d) Chebyshev truncations approximate (f).
    
- **Corollary C.1** — Same approximation guarantee but rescaled from ([-1,1]) to a general interval ([a,b]).
    
- **Theorem C.2** — A general contextual-bandit guarantee (SquareCB-style reduction result): turns **online regression error** into **bandit regret**.
    
- **Theorem C.3** — A follow-the-leader / online regression guarantee (used to control the regression component’s regret).
    
- **Theorem C.4** — Their assembled ChebCB regret theorem under **Lipschitz expected-loss** assumptions in both **action** and **context**.

## Appendix D (numerical linear algebra iteration bounds)

- **Theorem D.1** — A classical bound on the SOR iteration operator (in an (A)-norm), giving a quantitative convergence factor depending on matrix splitting quantities.
    
- **Corollary D.1** — Converts Theorem D.1 into an explicit **iteration-count upper bound** (K_\omega) to reach tolerance (\varepsilon) for SOR.
    
- **Corollary D.2** — The analogous explicit **iteration-count upper bound** for SSOR.
    
## Appendix E (properties of the “optimal parameter as a function of context”)

- **Lemma E.1** — Shows (\omega^*(c)) for the shifted family (A(c)=A+cI) is **Lipschitz in (c)** (under spectral conditions), so “instance-optimal” behavior is learnable.
    
- **Theorem E.1** — A contextual-bandit-style guarantee for SOR on shifts: with appropriate discretization and normalization, bounds expected cost relative to a **policy** over (c) (and includes the approximation/discretization terms).
    
- **Lemma E.2** — Builds an upper bound (U_{\mathrm{CG}}(\omega)) for preconditioned CG iteration count and proves its **boundedness + unimodality/monotonicity away from (\omega^*)** + a Lipschitz-type control.

## Appendix F (Lipschitzness of expected SSOR cost)

- **Lemma F.1** — Shows (|\breve C_\omega^k b|_2) (SSOR defect after (k) steps) is **Lipschitz in (\omega)** with an explicit constant.
    
- **Lemma F.2** — Shows the analogous **Lipschitzness in the shift parameter (c)** for the shifted family (A(c)).
    
- **Lemma F.3** — An anti-concentration style bound: controls (\Pr(|Xb|_2) lies in a small interval()), used to handle the **random stopping-time** nature of iteration counts.
    
- **Lemma F.4** — Uses Lemma F.3 + Lipschitz defect bounds to prove the **expected SSOR iteration count is Lipschitz** in a scalar parameter (x) controlling the iteration matrix.
    
- **Corollary F.1** — Concludes **(\mathbb E_b[\mathrm{SSOR}(A,b,\omega)]) is Lipschitz in (\omega)** on ([1,\omega_{\max}]) (key for expected-regret bounds).
    
- **Corollary F.2** — Concludes **(\mathbb E_b[\mathrm{SSOR}(A(c),b,\omega)]) is Lipschitz in (c)** (key for contextual learning over shifts).
    

# Proof Relevant to BoomerAMG

> **Lemma 2.1**, **Theorem B.3**, **Theorem B.4**, **Theorem 2.1**, and **Theorem 2.3** (plus **F.3–F.4** if you want the “smooth in expectation” trick).

