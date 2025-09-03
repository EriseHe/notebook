---
bookHidden: true
---
### 梯度下降 (Gradient Descent)

梯度下降是一种优化方法。假设你有一个损失函数 $L(w)$ ，你想要最小化它。每次迭代更新的方式是：
$$w^{(t+1)}=w^{(t)}-\eta \cdot \nabla L\left(w^{(t)}\right)$$
-  $\eta$ = 学习率（learning rate）
- $\nabla L(w)$  is the gradient of the loss w.r.t. parameters