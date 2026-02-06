
## Main Lemma and Theorem

- **Lemma 2.1** — Builds a **computable upper-bound surrogate** $U(\omega)$ for the SOR iteration count and proves **shape / regularity** properties (boundedness and monotonicity toward the optimal $\omega^*$), enabling learning guarantees.

- **Theorem 2.1** — Establishes a **Tsallis-INF (bandit) regret bound** for choosing $\omega_t$ over time, competing with the **best fixed** $\omega$ in terms of the paper’s **near-asymptotic cost surrogate** (the iteration-count upper bound).

- **Theorem 2.2** — Extends the result to a **diagonally shifted family** $A(c) = A + cI$: via context binning plus bandits, achieves regret relative to an **instance-optimal mapping** $\omega^*(c)$, up to discretization and Lipschitz terms.

- **Theorem 2.3** — Provides an analogous **bandit regret bound** when the solver is **preconditioned CG** (instead of SOR), with problem difficulty controlled by spectral quantities of the preconditioned matrices.

- **Theorem 3.1** — Gives a **stochastic / expected-cost** regret guarantee for **SSOR**, competing with the **best fixed** $\omega$, under assumptions ensuring the expected iteration count is well-behaved (Lipschitz-type).

- **Theorem 3.2** — For diagonal shifts, proves a **contextual-bandit regret bound** for the Chebyshev-regression contextual method (ChebCB), competing with **any policy** $f(c)$ (not only $\omega^\*(c)$).

---

## Appendix A — Offline / sample-complexity guarantees

- **Corollary A.1** — Under a **truncated-Gaussian target-vector** assumption, provides a **sample-complexity bound** for learning a near-optimal $\omega$ via ERM over a grid, in terms of $(\alpha, \varepsilon, \delta)$ with polylogarithmic factors in $n$.

- **Corollary A.2** — Gives a similar **ERM sample-complexity** guarantee under a more general bounded-support target-vector distribution (still $\lVert b \rVert$-bounded).

---

## Appendix B — Bandit sub-results used by the main theorems

- **Theorem B.1** — A standard Tsallis-INF-style regret bound for a **fixed-horizon step size** on discrete actions.

- **Theorem B.2** — An “anytime” Tsallis-INF-style regret bound with **time-varying step size**, which works without knowing $T$ in advance.

- **Theorem B.3** — Converts **(semi-)Lipschitz structure** of the loss over a continuous action interval into regret bounds via discretization plus Tsallis-INF.

- **Theorem B.4** — The contextual analogue: with a **Lipschitz policy class** and discretized contexts, gives regret relative to a **Lipschitz policy** $f(c)$.

---

## Appendix C — Chebyshev approximation and contextual-bandit machinery

- **Theorem C.1** — A **Chebyshev approximation** guarantee for bounded Lipschitz functions, quantifying how well degree-$d$ Chebyshev truncations approximate $f$.

- **Corollary C.1** — The same approximation guarantee rescaled from $[-1,1]$ to a general interval $[a,b]$.

- **Theorem C.2** — A general contextual-bandit guarantee (SquareCB-style reduction), converting **online regression error** into **bandit regret**.

- **Theorem C.3** — A follow-the-leader / online regression guarantee used to control the regression component’s regret.

- **Theorem C.4** — The assembled ChebCB regret theorem under **Lipschitz expected-loss** assumptions in both **action** and **context**.

---

## Appendix D — Numerical linear algebra iteration bounds

- **Theorem D.1** — A classical bound on the SOR iteration operator (in an $A$-norm), giving a quantitative convergence factor depending on matrix-splitting quantities.

- **Corollary D.1** — Converts Theorem D.1 into an explicit **iteration-count upper bound** $K_\omega$ needed to reach tolerance $\varepsilon$ for SOR.

- **Corollary D.2** — The analogous explicit **iteration-count upper bound** for SSOR.

---

## Appendix E — Properties of the optimal parameter as a function of context

- **Lemma E.1** — Shows that $\omega^*(c)$ for the shifted family $A(c) = A + cI$ is **Lipschitz in $c$** under spectral conditions, implying instance-optimal behavior is learnable.

- **Theorem E.1** — A contextual-bandit guarantee for SOR on diagonal shifts: with appropriate discretization and normalization, bounds expected cost relative to a **policy** over $c$, including approximation and discretization terms.

- **Lemma E.2** — Constructs an upper bound $U_{\mathrm{CG}}(\omega)$ for preconditioned CG iteration count and proves **boundedness**, **unimodality / monotonicity away from $\omega^*$**, and a Lipschitz-type control.

---

## Appendix F — Lipschitzness of expected SSOR cost

- **Lemma F.1** — Shows that $\lVert \breve C_\omega^k b \rVert_2$ (the SSOR defect after $k$ steps) is **Lipschitz in $\omega$** with an explicit constant.

- **Lemma F.2** — Shows the analogous **Lipschitzness in the shift parameter $c$** for the shifted family $A(c)$.

- **Lemma F.3** — An anti-concentration bound controlling $\Pr(\lVert Xb \rVert_2 \text{ lies in a small interval})$, used to handle the **random stopping-time** nature of iteration counts.

- **Lemma F.4** — Combines Lemma F.3 with Lipschitz defect bounds to prove the **expected SSOR iteration count is Lipschitz** in a scalar parameter $x$ controlling the iteration matrix.

- **Corollary F.1** — Concludes that $\mathbb{E}_b[\mathrm{SSOR}(A,b,\omega)]$ is **Lipschitz in $\omega$** on $[1,\omega_{\max}]$, which is key for expected-regret bounds.

- **Corollary F.2** — Concludes that $\mathbb{E}_b[\mathrm{SSOR}(A(c),b,\omega)]$ is **Lipschitz in $c$**, enabling contextual learning over shifts.
