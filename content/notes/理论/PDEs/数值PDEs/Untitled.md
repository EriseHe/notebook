---
title: "Untitled"
date: 2026-03-24
---



$$
\begin{align}
\rho = 0  &  &  SUPG \\
\rho = 1  &  &  GALS \\
\rho = -1  &  &  DW
\end{align}
$$



$$
\|u_{h}-u\| \le C h^{h + \frac{1}{2}} |u|_{H^{s+1}}
$$

$$
\|u_{h}\| \equiv \mu \|\nabla u_{h} \|_{L^{2}}+ (\min(\alpha \beta, \sigma\|u_{h}\|_{L^{2}}^{2} )+ \Sigma_{K}
$$




$$
-\mu \nabla
$$


$$
\begin{align}
J = &  \frac{1}{2} \| -\mu \nabla u + \beta \cdot \nabla u + \sigma u - f \| ^{2}_{L^{2}} \\
\approx  &  \frac{1}{2} \Sigma ( \text{solution that minimize this})
\end{align}
$$

## problem



$$
\begin{align}
- \mu \nabla u + \sigma u  & = f \\
- \mu \frac{u_{i+1}-2u_{i}+u_{i-1}}{h^{2}} + \sigma u_{i}  & = f \\
u \quad \text{matrix here} + \sigma I = f
\end{align}
$$

$$
\begin{align}
\mathbf{P} _{?} = \frac{|\sigma| h^{2}}{6 \mu} <  & 1 \\
h <  &  \sqrt{ 6 }\sqrt{ \frac{u}{|\sigma|} }
\end{align}
$$

Instead of solving exactly, 

$$
(T) \int^{x_{i+1}}_{x_{i}} - \frac{\psi_{i}{#}
$$
