---
title: "NMI Midterm Study Plan"
---

The midterm is **Monday, November 2, 2026**, during the regular class time and in the regular room. It is a **75-minute, closed-book and closed-notes written exam**. The [official midterm announcement](https://brightspace.nyu.edu/d2l/le/news/609409/2144652/view?ou=609409) includes **homework 1–3 and lecture material through Lecture 15**, and says homework questions may be repeated verbatim. HW4 is outside this homework scope; Lectures 12–15 remain in scope.

Use the written homework for independent paper practice, reproduce the main proofs, and trace lecture algorithms by hand. The homework-to-lecture mapping below is inferred from the syllabus topic labels and the actual assignment content. It is **not a slide-by-slide theorem audit** and does not predict the exam's point distribution.

## Lecture chronology

The [Brightspace syllabus](https://brightspace.nyu.edu/d2l/le/lessons/609409/units/13637646) labels its timeline **tentative**. These are its listed lecture dates and topics. Homework deadlines are at the beginning of class, **4:55 pm**; a lecture on the deadline date was therefore not available before that deadline.

| Lecture | Date, 2026 | Syllabus topic | Notebook |
| --- | --- | --- | --- |
| L1 | Sep 2 | Numerical representation, floating point, conditioning, cache | [Vectors and matrices](<1. Vectors and Matrices.md>) |
| L2 | Sep 9 | Cache, tiling, blocking; linear systems | [Storing matrices and vectors](<2. Storing Matrices & Vectors.md>) |
| L3 | Sep 14 | Linear systems and stability | [LU factorization and zero pivots](<3. LU Factorization and Zero Pivots.md>) |
| L4 | Sep 16 | Pivoted LU | [LU factorization with pivoting](<4. LU Factorization with Pivoting.md>) |
| L5 | Sep 21 | Least squares, Gram–Schmidt, QR | [Least squares and Gram–Schmidt](<5. Least Squares and Gram-Schmidt.md>) |
| L6 | Sep 23 | Product-view error bounds; Householder QR | [Error bounds and Householder QR](<6. Error Bounds and Householder QR.md>) |
| L7 | Sep 28 | Modified Gram–Schmidt | [Orthogonal transformations and QR](<7. Orthogonal Transformations and QR.md>) |
| L8 | Sep 30 | Overdetermined least squares; normal equations | [Least squares and normal equations](<8. Least Squares and Normal Equations.md>) |
| L9 | Oct 5 | Cholesky | [Cholesky factorization and Schur complements](<9. Cholesky Factorization and Schur Complements.md>) |
| L10 | Oct 7 | Eigen-like decompositions; a single eigenvalue | [Eigenvalues and iterative methods](<10. Eigenvalues and Iterative Methods.md>) |
| — | Oct 12 | Break | — |
| L11 | Oct 14 | Schur factorization | [Schur factorization](<11. Schur Factorization.md>) |
| L12 | Oct 19 | Orthogonal iteration | [Orthogonal iteration](<12. Orthogonal Iteration.md>) |
| L13 | Oct 21 | Unshifted QR | [QR without shifts](<13. QR without Shifts.md>) |
| L14 | Oct 26 | Hessenberg QR | Brightspace lecture material |
| L15 | Oct 28 | Shifted QR | Brightspace lecture material |

The notebook titles sometimes group related material differently from the syllabus topic labels. The date table records the syllabus chronology; the links identify the available notes.

## Homework availability and topic overlap

Scheduled release dates below are syllabus dates, **not verified upload dates**. HW1's actual upload on September 4 is established by the [September 8 announcement](https://brightspace.nyu.edu/d2l/le/news/609409/2093110/view?ou=609409). Actual upload dates for HW2 and HW3 have not been verified.

| Assignment | Scheduled release | Due at 4:55 pm | Lectures taught before deadline | Main topic overlap |
| --- | --- | --- | --- | --- |
| HW1 | Sep 2; actual upload Sep 4 | Sep 21, before L5 | L1–4 | L1–2 conditioning/cache; L2–4 linear systems and LU; explicitly assigned SVD/eigendecomposition self-study |
| HW2 | Sep 21 | Oct 5, before L9 | L1–8 | L3–4 LU/stability; L6 error analysis; L5–6 QR prerequisites |
| [HW3](<Homework/HW 3.md>) | Oct 5 | Oct 19, before L12 | L1–11 | L2–4 block LU; L5–8 QR/least squares; L9 Cholesky |

### HW1: early material and assigned self-study

- **Q1:** SPD Schur complement.
- **Q2:** An inverse entry from LU and the associated complexity.
- **Q3:** Explicitly assigned **self-study** of rectangular SVD/eigendecomposition, operator norms, and conditioning. This is not evidence that SVD was already taught in lecture.
- **Q4:** Inverse norms and Rayleigh eigenvalue bounds.
- **Q5:** Blocked/cache-oblivious matrix multiplication, a coding problem.

Only L1–4 had been taught before HW1 was due. L5–8 QR and L9 Cholesky provide later related connections; they are not HW1's original lecture range. Review Q1–4 as written theory problems.

### HW2: LU error analysis and QR updates

- **Q1:** QR-based rank-one and rank-r updates, using the QR prerequisites in L5–6.
- **Q2:** The $\gamma_m$ LU backward-error bound and growth, connecting L3–4 with L6's error analysis.
- **Q3:** Column diagonal dominance and elimination without row swaps.
- **Q4:** LU implementation and stability experiments.

L7–8 were available before the deadline, but availability does not make them the assignment's main focus. Review Q1–3 as written theory problems.

### HW3: block elimination, Cholesky, and QR

The [homework page](<Homework/HW 3.md>) reproduces the theory statements and my written solutions from my final submitted homework, problem by problem. Question 4's implementations and numerical experiments are omitted.

- **Q1(a–d):** Block LU, the Schur determinant identity, trailing blocks of LU, and the quotient property.
- **Q2(a–e):** The inverse-block identity; SPD Schur eigenvalue and pivot bounds; variational and bonus minimax statements.
- **Q3(a–e):** Outer products from LU; LU and Cholesky uniqueness; the Cholesky–QR relationship; Gram matrices and orthogonal projection.
- **Q4:** Classical/modified Gram–Schmidt, Householder, and least-squares implementations, followed by numerical experiments.

The main theory overlap is L2–4, L5–8, and L9. L10–11 were taught before the deadline, but **Schur complements and Schur factorization are different topics**. L11's availability does not make it the source of HW3's Schur-complement questions.

## Supplemental review: Lectures 12–15

These lectures occurred after the HW3 deadline and are explicitly included in the midterm's lecture scope. Prepare them separately from the homework mapping.

| Lecture | Paper practice |
| --- | --- |
| **L12: orthogonal iteration** | Trace an iteration on a small matrix. Explain the subspace being iterated and its relation to accumulated orthogonal factors. State the assumptions used in the class convergence argument. |
| **L13: unshifted QR** | Trace a QR iteration and derive $A_{k+1}=Q_k^*A_kQ_k$. Explain preservation of eigenvalues and the connection with orthogonal iteration. |
| **L14: Hessenberg QR** | Reproduce the Hessenberg reduction and QR steps taught in class. Explain why the structure reduces the iteration cost. |
| **L15: shifted QR** | Derive the shifted-QR similarity identity. Trace the shifts, deflation steps, and convergence examples actually covered in the lecture. |

Use L10's single-eigenvalue iterations and L11's Schur factorization as prerequisites. Consult Brightspace for the L14–15 material. Do not replace these lectures with the earlier plan's assumed October 28 SVD lecture: the verified syllabus label for L15 is **shifted QR**. HW1's assigned SVD self-study remains part of homework review.

## Practice order and readiness checks

1. **Reconstruct HW1–3 theory independently.** Attempt each statement on paper before opening the solution, then redo missed steps. Keep the assumptions visible: rank, invertibility, symmetry, positive definiteness, and real versus complex scalars.
2. **Review LU and error analysis.** Compute $PA=LU$, including row swaps and triangular solves; explain packed storage and operation counts. Distinguish conditioning from stability and reconstruct the assigned backward-error and growth arguments.
3. **Review QR and least squares.** Derive residual orthogonality, the normal equations, and the QR solution. Compare CGS and MGS. Construct Householder reflectors, choose the stable sign, and apply implicit $Q$ and $Q^*$ in the correct orders.
4. **Review Cholesky and Schur complements.** Reproduce HW3's block identities and uniqueness arguments, including the complex case. Explain the Gram/projection relationship and distinguish an elimination pivot from its Cholesky square root.
5. **Review eigenvalue methods and L12–15.** Trace the lecture iterations, state their assumptions, and reconstruct the similarity and subspace arguments. Include Hessenberg and shifted QR even though HW4 is excluded.
6. **Review HW1's SVD/eigendecomposition self-study.** Reconstruct the assigned norm, conditioning, and Rayleigh-bound arguments without treating this self-study as an earlier lecture.
7. **Complete a 75-minute closed-note written practice.** Balance calculations, algorithm traces, stability explanations, and proofs across homework 1–3 and L1–15. Check against the original materials, then redo the mistakes without looking.

A topic is ready when I can solve a fresh question and reconstruct its central argument without help. Give repeated practice to missed homework steps and the L12–15 material that the homework does not cover.
