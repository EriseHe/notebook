---
title: "NMI Midterm Study Plan"
---

The midterm is Monday, November 2, 2026. This plan runs from October 19 to November 1 and matches 56 hours of NMI review on the calendar. The first three days are lighter to allow for other coursework due October 21. Breaks, homework for other courses, and class meetings are additional.

The syllabus confirms a written exam with closed books and notes, and says homework problems will likely appear. The strongest preparation is therefore to solve the written homework independently, reproduce the main proofs, and trace the lecture algorithms on paper. The priorities below reflect the lecture coverage and homework; they are not predictions of the exam's point distribution.

**Give the most repeated practice to these topics.**

1. **QR and least squares:** projection geometry, the normal equations, classical versus modified Gram-Schmidt, Householder QR, applying the implicit factors, and QR existence and uniqueness. These recur throughout Lectures 5-8 and HW3.
2. **LU, pivoting, and numerical error:** elimination, triangular solves, the identity $PA=LU$, packed storage, small pivots, growth, conditioning, and the componentwise error estimate. These connect Lectures 1-6.
3. **Cholesky and Schur complements:** positive definiteness, positive pivots, block elimination, the block inverse, eigenvalue and pivot bounds, and the Cholesky-QR relationship. These are the core of Lecture 9 and HW3 Questions 1-3.
4. **The spectral material scheduled before the exam:** power and inverse iteration, Rayleigh quotient iteration, Schur factorization, orthogonal iteration, unshifted and shifted QR, SVD, polar decomposition, and low-rank approximation. These also need dedicated study time; their exact exam coverage should be confirmed on Brightspace.

**Give a shorter first review to** detailed binary encoding, hardware timing examples, the different Cholesky loop arrangements, and the HW3 bonus minimax question. Know column-major storage, why blocking helps, basic operation counts, and one correct implementation of each main algorithm. Return to additional details after the core problems are reliable.

Lectures 1-10 are currently in this repository. For later material, the plan uses the topic and class date in the syllabus: Schur factorization on October 14, orthogonal iteration on October 19, unshifted QR on October 21, shifts on October 26, and SVD on October 28. Collect those notes as they become available and use any announced exam cutoff to adjust the last topic blocks. Post-midterm topics such as Arnoldi, Lanczos, Krylov methods, and FFT are outside this plan.

**Use each topic block for learning and practice together.**

- Recall the previous material, then follow the assigned lecture derivation and one worked example.
- Solve matching problems on paper before opening their solutions.
- Reconstruct the central proof or algorithm from memory; correct and redo missed steps.

Calendar blocks are organized by topic and last no more than three hours. Keep coding to short checks after the paper calculation. Revisit missed questions on later days.

**Day by day plan**

| Day and date | Focused hours | Study in this order | Practice and completion target |
| --- | ---: | --- | --- |
| **1 - Mon Oct 19** | 1 | **Triangular systems and elimination.** L1 §1.2; L2 §§2.5-2.8; L3 §§3.2-3.3. | Check dimensions, adjoints, inner products, and orthogonality. Solve a lower- and an upper-triangular system, then identify LU factors in a small elimination example. |
| **2 - Tue Oct 20** | 1.5 | **LU and partial pivoting.** L3 §§3.2-3.8; L4 §§4.3-4.7. | Factor a small matrix requiring a row swap and solve $Ax=b$ using $PA=LU$. Explain why a later swap must move stored multipliers. Revisit uniqueness and operation counts during the later mixed review. |
| **3 - Wed Oct 21** | 1 | **Least-squares geometry and normal equations.** L5 §§5.2-5.10; L8 §§8.2-8.5. Attend the scheduled unshifted QR lecture and retain its examples for Day 8. | Derive residual orthogonality and $A^*Ax=A^*b$, then connect the solution to reduced QR. Continue Gram-Schmidt tomorrow. |
| **4 - Thu Oct 22** | 5 | **Gram-Schmidt, Householder QR, and implicit Q.** L5 §§5.2-5.10; L6 §§6.5-6.7; L7 §§7.1-7.6; L8 §8.4. | Compute a small reduced QR example and compare CGS with MGS using the lecture's nearly dependent columns. Derive the Householder reflector and stable sign choice. Perform one Householder step and trace $Q^*b$, $Qb$, and QR-based least squares using packed reflectors. Explain QR existence and positive-diagonal uniqueness. Add a Givens example once the core steps are secure. |
| **5 - Fri Oct 23** | 5 | **Positive definiteness, Cholesky, and basic Schur complements.** L8 §§8.6-8.7; L9 §§9.2-9.5 and §§9.8-9.10. | Compute a $3\times3$ Cholesky factor. Prove $B^*B$ is positive definite exactly when $B$ has full column rank. Explain why Cholesky pivots stay positive. Derive block LU and its Schur complement. Rework HW3 1(a-c) and 3(c-d), including the complex phase ambiguity. |
| **6 - Sat Oct 24** | 6 | **Error analysis and the harder Schur proofs.** L1 §§1.4-1.6; L4 §4.2; L6 §§6.3-6.4; L9 §§9.5-9.6; HW3. | Distinguish an ill-conditioned problem from an unstable algorithm. Derive the product error bound and explain the role of $\kappa_2(X)$. Reconstruct the first-order LU error estimate and the growth example. Rework HW3 1(d), 2(a-d), and 3(e), reusing Day 5's block identities. Distinguish an elimination pivot from its Cholesky square root. |
| **7 - Sun Oct 25** | 6 | **Eigenvalue iterations and Schur factorization.** L10; Lecture 11 from Brightspace. | Do two steps of power iteration and predict the target and convergence factor. Explain the assumptions on the starting vector and dominant eigenvalue. Trace fixed-shift inverse iteration and Rayleigh quotient iteration. Derive the second-order Rayleigh quotient error and outline the local cubic argument. State the Schur theorem and reproduce the proof given in Lecture 11. |
| **8 - Mon Oct 26** | 4.5 | **Orthogonal iteration and the unshifted QR algorithm.** October 19 and 21 notes. Attend the scheduled shifts lecture and retain its worked examples for Day 9. | Trace one orthogonal iteration and one QR iteration on small matrices. Derive $A_{k+1}=Q_k^*A_kQ_k$ and explain why eigenvalues are preserved. Explain the connection between accumulated orthogonal factors and orthogonal iteration. Review Hessenberg reduction and the operation counts developed in class. |
| **9 - Tue Oct 27** | 4.5 | **Shifted QR, Wilkinson and Francis shifts.** October 26 notes, supported by the earlier QR and Schur material. | Derive the shifted QR similarity identity. Compute a Wilkinson shift from a trailing $2\times2$ block. Trace the class example for the Francis shift and explain why the shift is useful. Explain deflation and what convergence looks like in Schur form. Practice the related written HW4 questions that cover this material. |
| **10 - Wed Oct 28** | 4.5 | **SVD, polar decomposition, and low-rank approximation.** October 28 lecture; L8 §8.6.3 for the earlier polar introduction. | After class, construct an SVD for a small matrix using $A^*A$. Relate singular values to the norm, rank, and conditioning. Form a truncated SVD and state its approximation error using the theorem covered in class. Derive the polar factors from the SVD. End with a short recall of LU, QR, and Schur complements. |
| **11 - Thu Oct 29** | 5 | **Independent homework reconstruction.** HW1-3 and the parts of HW4 within the announced exam scope. | Choose your weakest question from each main family: LU/error, least squares/QR, Cholesky/Schur, eigenvalue/QR iteration, and SVD. Solve them without reading the answers first. Change the matrix or assumptions and solve a variant. Take two specific unresolved questions to the scheduled grader office hour if needed. |
| **12 - Fri Oct 30** | 5 | **Timed paper 1 and repairs.** Use an official practice paper if provided; otherwise choose a balanced set of written questions. | Work for 75 minutes with closed books and notes, or use the announced exam duration once confirmed. Include a calculation, an algorithm trace, a stability explanation, and proofs across the main topic families. Spend the remaining time checking and solving missed questions again. Bring a precise question to the scheduled grader office hour if needed. |
| **13 - Sat Oct 31** | 4 | **Timed paper 2 with new questions.** Prioritize mistakes from Day 12 while keeping broad coverage. | Complete another closed-note paper using different matrices and problem variants. Then reproduce the most important missed proofs and algorithms. Finish by explaining aloud which method you would choose for a general linear system, an SPD system, least squares, and an eigenvalue problem, and why. |
| **14 - Sun Nov 1** | 3 | **Final recall and the remaining weak points.** | Reconstruct your method summary from memory. Redo previously missed steps, one easy calculation, and a few short proofs. Check rank, invertibility, symmetry, and convergence assumptions in every answer. Finish study early enough to be rested for Monday. |

**Use these as the core exam readiness checks.**

- Compute and explain $PA=LU$, including row swaps, triangular solves, packed storage, and cost.
- Derive least-squares optimality, the normal equations, and the QR solution; explain the condition-number drawback of normal equations.
- Distinguish CGS from MGS and reproduce the lecture's loss-of-orthogonality example.
- Construct a Householder reflector, choose its sign, and apply implicit $Q$ and $Q^*$ in the correct orders.
- Prove Gram-matrix positivity and Cholesky existence; explain the positive-diagonal uniqueness convention, including the complex case.
- Derive block LU, the Schur determinant and inverse identities, the SPD bounds, and the Cholesky-QR connection.
- Derive power and inverse iteration convergence factors and explain the Rayleigh quotient's accuracy and local convergence assumptions.
- Explain Schur form, QR similarity, orthogonal iteration, shifts, deflation, and the iteration costs taught in class.
- Use SVD for norm, rank, conditioning, polar decomposition, and the low-rank approximation result covered before the exam.

A topic counts as learned when you can solve a fresh question and reconstruct its central argument without help. Revisit a missed question the next day and again several days later. If you fall behind, shorten the lower-priority detail review before cutting the mixed homework sessions or both timed papers.

**Lecture links**

[L1](<1. Vectors and Matrices.md>) · [L2](<2. Storing Matrices & Vectors.md>) · [L3](<3. LU Factorization and Zero Pivots.md>) · [L4](<4. LU Factorization with Pivoting.md>) · [L5](<5. Least Squares and Gram-Schmidt.md>) · [L6](<6. Error Bounds and Householder QR.md>) · [L7](<7. Orthogonal Transformations and QR.md>) · [L8](<8. Least Squares and Normal Equations.md>) · [L9](<9. Cholesky Factorization and Schur Complements.md>) · [L10](<10. Eigenvalues and Iterative Methods.md>) · [HW3](<Homework/HW 3.md>)
