---
bookHidden: true
---

### T-n Levels of Separation Axiom

> [!axiom]
> **$T_{0}$ — Kolmogorov Space**  
> $\forall x \neq y \in X,\, \exists$ open $U$ s.t. $x \in U,\, y \notin U$ or $y \in U,\, x \notin U$.

> [!axiom]
> **$T_{1}$ — Fréchet Space**  
> $\forall x \neq y \in X,\, \exists$ open $U, V$ s.t. $x \in U,\, y \notin U$ and $y \in V,\, x \notin V$.  
> (Equivalently, all singletons are closed.)

> [!axiom]
> **$T_{2}$ — Hausdorff Space**  
> $\forall x \neq y \in X,\, \exists$ disjoint open $U, V$ with $x \in U,\, y \in V$.

> [!axiom]
> **$T_{2.5}$ — Urysohn Space**  
> $\forall x \neq y \in X,\, \exists$ disjoint closed neighborhoods $N_x, N_y$ with $x \in N_x,\, y \in N_y$.

> [!axiom]
> **$T_{3}$ — Regular $T_0$ Space（正规 $T_0$ 空间）**  
> $\forall x \in X,\, A$ closed, $x \notin A,\, \exists$ disjoint open $U, V$ with $x \in U,\, A \subset V$.

> [!axiom]
> **$T_{3.5}$ — Tychonoff Space（Tychonoff 空间 / 完全正规 $T_0$ 空间）**  
> $\forall x \in X,\, A$ closed, $x \notin A,\, \exists f:X \to [0,1]$ continuous with $f(x)=0,\, f(A)=\{1\}$.

> [!axiom]
> **$T_{4}$ — Normal $T_1$ Space（正规 $T_1$ 空间）**  
> $\forall$ disjoint closed $A, B,\, \exists$ disjoint open $U, V$ with $A \subset U,\, B \subset V$.

> [!axiom]
> **$T_{5}$ — Completely Normal $T_1$ Space（完全正规 $T_1$ 空间）**  
> $\forall$ disjoint closed $A, B,\, \exists f:X \to [0,1]$ continuous with $f(A)=\{0\},\, f(B)=\{1\}$.

逻辑链（纵向箭头代表“蕴含”关系）：

T₅  Completely normal Hausdorff (完全正规豪斯多夫)
 │   闭集–闭集可用连续函数分离
 ▼
T₄  Normal Hausdorff (正规豪斯多夫)
 │   闭集–闭集可用不交开集分离
 ▼
T₃.₅  Completely regular Hausdorff (完全正规豪斯多夫 / Tychonoff)
 │     点–闭集可用连续函数分离
 ▼
T₃  Regular Hausdorff (正规豪斯多夫)
 │   点–闭集可用不交开集分离
 ▼
T₂.₅  Urysohn (乌里松)
 │     点–点可用不交闭邻域分离
 ▼
T₂  Hausdorff (豪斯多夫)
 │   点–点可用不交开集分离
 ▼
T₁  Fréchet (Fréchet)
 │   单点集是闭集
 ▼
T₀  Kolmogorov (Kolmogorov)
     任意两点至少有一个开集包含其中之一而不包含另一



