---
title: 7.2 隐函数定理
weight: 2
---

# Implicit Function Theorem (IFT)

## 1. Recall IFT

**Theorem 7.1.1:** Let $ y = f(x): A \subset \mathbb{R}^n \to \mathbb{R}^n $ be of class $C^1$. Suppose $ x_0 \in A $ with:
$$
J_f(x_0) = \det(Df(x_0)) \ne 0
$$
Then there exist neighborhoods $U$ of $x_0$ in $A$ and $W$ of $y_0 = f(x_0)$ such that:

1. $ f(U) = W $ and $ f: U \to W $ has an inverse $ f^{-1}: W \to U $.
2. $ f^{-1} \in C^1 $ (If $ f \in C^r $, then $ f^{-1} \in C^r $).
3. $ Df^{-1}(y) = [Df(x)]^{-1} $ for $ x \in U $ and $ y = f(x) $.

## 2. Proof of Theorem 7.1.1

### Step 1: Reduction
We may assume $ Df(x_0) = I $ and $ x_0 = 0 $, $ y_0 = f(x_0) $.

### Step 2: Existence of inverse
Consider the function $ g(x) = x - f(x) $.

- Using continuity of $ Dg(x) $ at $ 0 $ and Mean Value Theorem, one can show there exists $\delta > 0$ such that for $ x \in B(0, \delta) $:
$$
\|g(x)\| \le \frac{\delta}{2}
$$
- Define $ g: B(0, \delta) \to B(0, \frac{\delta}{2}) $.
- Let $ W = B(0, \frac{\delta}{2}) $, and define:
$$
U = \{ x \in B(0, \delta): f(x) \in W \}
$$

### Step 3: Existence of $ f^{-1}: W \to U $

Fix $ y \in W $. Apply the Contraction Mapping Principle (CMP) to:
$$
g_y(x) = y + x - f(x) = y + g(x)
$$
Then $ g_y(x): B(0, \delta) \to B(0, \delta) $. Thus, there exists a unique $ x \in B(0, \delta) $ such that:
$$
g_y(x) = x \quad \Longrightarrow \quad f(x) = y
$$
Therefore, $\exists! x \in U$ such that $ f(x) = y $.

### Step 4: Continuity of $ f^{-1} $

Fix $ y, y_1, y_2 \in W $, let $ x_i = f^{-1}(y_i), i = 1,2 $. Then:
$$
\| f^{-1}(y_1) - f^{-1}(y_2) \| = \| x_1 - x_2 \|
= \| g_{y_1}(x_1) - g_{y_2}(x_2) \|
$$

Since $ \| Dg(x) \| \le \frac{1}{2} $ for $ x \in B(0, \delta) $, we get:
$$
\| x_1 - x_2 \| \le 2 \| y_1 - y_2 \|
$$

Thus, $ f^{-1} $ is Lipschitz continuous.

