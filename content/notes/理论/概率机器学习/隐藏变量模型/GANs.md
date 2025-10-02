---
title: GANs
tags:
  - GAN
---

# 1 Lecture 6 · 从 VAE 到 GAN：生成模型的数学脉络（教学版讲义）

> 目标：从「有似然的潜变量模型」到「无似然的对抗学习」，系统梳理 VAE → GAN 的数学动机与推导

## 1.1 大图景与动机

**我们要解决什么问题？**  
给定真实数据分布 $p_{\text{data}}(x)$，学习一个生成模型 $G$ 使其隐变量 $z\sim p(z)$ 下生成 $x=G(z)$ 的分布 $p_G(x)$ 尽可能接近 $p_{\text{data}}(x)$。

- **VAE 路线（有log-likelihood）**：显式假设 $p_\theta(x\mid z)$，用变分下界（ELBO）来近似最大化对数似然 $\log p_\theta(x)$。优点是有概率语义、训练稳定；常见问题是重建模糊（均值化效应）。  

- **GAN 路线（无log-likelihood）**：不写 $p(x\mid z)$ 的显式密度，直接通过「判别器 vs 生成器」的对抗来最小化两分布的差异。优点是生成锐利；挑战是训练不稳、模式崩塌。

从VAE 与 ELBO我们有这些问题：

  - $z$ has smaller dimension.
  - Distribution of $z$ does not guarantee matching the distribution of $x$.
  - Average training points (blurring effect).


于是我们转向 GAN 的minmax问题，推导optimal discrimiator与和 JS 散度的关系，然后讨论 WGAN（Wasserstein-1 距离）、条件 GAN、以及训练层面的问题与缓解策略。


## 1.2 VAE 回顾：从似然最大化到 ELBO

### 1.2.1 潜变量模型与证据下界
我们要最大化 $\log p_\theta(x)$，但边缘化 $z$ 通常不可解：
$$\begin{aligned}
\log p_\theta(x)
&= \log \int p_\theta(x, z)\,dz
= \log \int p_\theta(x\mid z)\,p(z)\,dz.
\end{aligned}$$
VAE 以变分分布 $q_\phi(z\mid x)$ 近似后验 $p_\theta(z\mid x)$。由 Jensen 不等式得 **ELBO**：
$$\begin{aligned}
\log p_\theta(x)
&= \log \int q_\phi(z\mid x)\,\frac{p_\theta(x,z)}{q_\phi(z\mid x)}\,dz \\
&\ge \int q_\phi(z\mid x)\,\log \frac{p_\theta(x,z)}{q_\phi(z\mid x)}\,dz \;=\; \mathcal{L}(\theta,\phi; x).
\end{aligned}$$

展开得
$$\begin{aligned}
\mathcal{L}(\theta,\phi;x)
&= \mathbb{E}_{q_\phi(z\mid x)}\big[\log p_\theta(x\mid z)\big] - \mathrm{KL}\!\big(q_\phi(z\mid x)\,\|\,p(z)\big).
\end{aligned}$$

### 1.2.2 直觉
- 第一项是**重建项**：$z$ 下重建 $x$ 的对数似然期望，逼真度。  
- 第二项是**正则项**：让 $q_\phi(z\mid x)$ 接近先验 $p(z)$，保证隐空间结构与可采样性。

### 1.2.3 重参数化技巧
若 $q_\phi(z\mid x)=\mathcal{N}(\mu_\phi(x),\operatorname{diag}\sigma^2_\phi(x))$，令 $\varepsilon\sim\mathcal{N}(0,I)$，

$$\begin{aligned}
z \;=\; \mu_\phi(x) + \sigma_\phi(x)\odot \varepsilon,
\end{aligned}$$
即可把对 $z$ 的随机性外移到 $\varepsilon$，使梯度可反传。

**优点/局限**：VAE 有稳定似然学习与编码器-解码器结构，但常出现**过度平滑/模糊**重建。接下来转入 GAN 的「无似然」思想。

## 1.3 GAN 的极小极大：从判别式学习度量分布差异

### 1.3.1 原始 GAN 目标
判别器 $D(x)\in(0,1)$ 估计「来自真实数据的概率」，生成器 $G(z)$ 试图以假乱真：

$$\begin{aligned}
\min_G \max_D \; V(D,G)
&= \mathbb{E}_{x\sim p_{\text{data}}}\big[\log D(x)\big]
\;+\; \mathbb{E}_{z\sim p(z)}\big[\log (1-D(G(z)))\big].
\end{aligned}
$$
### 1.3.2 固定 $G$ 时的最优判别器 $D^*$
对每个 $x$ 局部最大化，被积函数为
$\;p_{\text{data}}(x)\log D(x) + p_G(x)\log(1-D(x))$。  
令导数为 0：

$$\begin{aligned}
\frac{p_{\text{data}}(x)}{D(x)} - \frac{p_G(x)}{1-D(x)} = 0
\;\;\Rightarrow\;\;
D^*(x) = \frac{p_{\text{data}}(x)}{p_{\text{data}}(x)+p_G(x)}.
\end{aligned}$$

### 1.3.3 代回得与 JS 散度的关系
将 $D^*$ 代回价值函数，得到
$$\begin{aligned}
V(D^*,G)
&= \mathbb{E}_{x\sim p_{\text{data}}}\!\left[\log \frac{p_{\text{data}}(x)}{p_{\text{data}}(x)+p_G(x)}\right]
 + \mathbb{E}_{x\sim p_G}\!\left[\log \frac{p_G(x)}{p_{\text{data}}(x)+p_G(x)}\right] \\
&= -\log 4 + 2\,\mathrm{JS}\!\big(p_{\text{data}} \,\|\, p_G\big).
\end{aligned}$$
因此，在optimal discriminator下，GAN 等价于最小化 $\mathrm{JS}(p_{\text{data}}\|p_G)$。

> **直觉**：判别器为我们**隐式**地诱导了一个分布差异度量（JS），无需显式密度函数。

### 1.3.4 非饱和生成器损失
原式中 $\max_D$ 的对数项使得当 $D(G(z))\approx 0$ 时梯度饱和。实践中常改用
$$\begin{aligned}
\min_G \; \tilde{J}(G) = - \mathbb{E}_{z\sim p(z)}\big[\log D(G(z))\big],
\end{aligned}$$
以获得更强梯度信号（同一固定点，不同梯度路径）。

## 1.4 WGAN：引入 Wasserstein-1 距离

JS 在「两个distribution不重叠的」时梯度不稳定。WGAN 用**地球搬运距离**（$W_1$）替代：
$$\boxed{\begin{aligned}
W(p_{\text{data}},p_\theta)
= \inf_{\gamma\in\Pi(p_{\text{data}},p_\theta)} \;\mathbb{E}_{(x,y)\sim\gamma}\big[\|x-y\|\big]
\end{aligned}}$$
其对偶（Kantorovich–Rubinstein）形式：
$$\begin{aligned}
W(p_{\text{data}},p_G)
= \sup_{\|f\|_{L}\le 1}\;\Big(\mathbb{E}_{x\sim p_{\text{data}}}[f(x)] - \mathbb{E}_{x\sim p_\theta}[f(x)]\Big).
\end{aligned}$$
WGAN 用一个 **1-Lipschitz** 的打分函数 $f_w$（discriminator $\to$ critic）近似该上确界：
$$\begin{aligned}
\max_{w:\|f_w\|_L\le 1}\; \mathbb{E}_{x\sim p_{\text{data}}}[f_w(x)] - \mathbb{E}_{z\sim p(z)}[f_w(G(z))].
\end{aligned}$$
生成器最小化该差值。实践中以**权重裁剪**或**梯度惩罚（WGAN-GP）**来约束 1-Lipschitz：
$$\begin{aligned}
\min_G \max_w\;\; &\mathbb{E}_{x\sim p_{\text{data}}}[f_w(x)] - \mathbb{E}_{z}[f_w(G(z))] \\
&\quad - \lambda \,\mathbb{E}_{\hat x\sim\mathbb{P}_{\hat x}}\big(\|\nabla_{\hat x} f_w(\hat x)\|_2 - 1\big)^2.
\end{aligned}$$

> **直觉**：$W_1$ 在分布几乎不重叠时仍给出**有意义且连续的梯度**，缓解训练不稳与模式崩塌。


# Generative Adversarial Network (GAN)

---

## Motivation


→ This motivates **GAN**.

---

## Forward Analysis

- **Generator**: $G_\theta(z)$  
  Input: latent vector $z \sim \mathcal{N}(0,I)$ (random noise).  
  Output: generated image.

- **Discriminator**: $D_\phi(x)$  
  Input: real or generated image.  
  Output: scalar in $[0,1]$, probability of being real.

Diagrammatically:

$$z \sim \mathcal{N}(0,I) \;\; \longrightarrow \;\; G_\theta(z) \;\; \longrightarrow \;\; D_\phi(x) \in [0,1].$$

---

## Training Objective

1. **Discriminator goal**: maximize
   $$\mathbb{E}_{x \sim P_{\text{data}}} \log D(x),$$
   i.e. maximize $D(x)$ to correctly classify real images.

2. **Generator goal**: minimize
   $$\mathbb{E}_{z \sim P_z} \log\big(1 - D(G(z))\big),$$
   i.e. fool $D$ into recognizing fake images as real.

   Equivalent alternative:
   $$\max_{G} \;\; \mathbb{E}_{z \sim P_z} \log D(G(z)).$$

---

## Overall Minimax Game

$$\min_G \max_D \Bigg[ \mathbb{E}_{x \sim P_{\text{data}}} \log D(x) \;+\; \mathbb{E}_{z \sim P_z} \log(1 - D(G(z))) \Bigg].$$

Define the loss as:
$$L = - \text{goal}.$$

---

# Optimal Discriminator

When fixing the generator, the optimal discriminator is:

$$D^*(x) = \frac{P_{\text{data}}(x)}{P_{\text{data}}(x) + P_G(x)}.$$

---

## Plug Back into GAN Objective

$$\begin{aligned}
&\mathbb{E}_{x \sim P_{\text{data}}} \log \frac{P_{\text{data}}(x)}{P_{\text{data}}(x) + P_G(x)} 
+ \mathbb{E}_{z \sim P_z} \log \frac{P_G(x)}{P_{\text{data}}(x) + P_G(x)} \\[6pt]
&= \mathbb{E}_{x \sim P_{\text{data}}} \log \frac{P_{\text{data}}(x)}{2m(x)} 
+ \mathbb{E}_{z \sim P_z} \log \frac{P_G(x)}{2m(x)} \\[6pt]
&= -\log 4 \;+\; KL\big(P_{\text{data}} \,\|\, m\big) + KL\big(P_G \,\|\, m\big),
\end{aligned}$$

where
$$m = \tfrac{1}{2}\big(P_{\text{data}} + P_G\big).$$

---

## Jensen–Shannon Divergence (JSD)

- Symmetric divergence:
$$JSD(P \,\|\, Q) = \tfrac{1}{2} KL(P \,\|\, m) + \tfrac{1}{2} KL(Q \,\|\, m).$$

Thus the GAN loss is:
$$L(G) = 2 \cdot JSD\!\left(P_{\text{data}} \,\|\, P_G\right) - \log 4.$$

---

# Issues with GAN

- $P_{\text{data}}$ and $P_G$ often lie on **different manifolds**.  
- JSD $\approx \log 2$ → gradient vanishes for the generator.  
- Leads to **mode collapse** (many $z$ map to the same $G(z)$).

---

# Improvement: Better Metric (Wasserstein Distance)

### Wasserstein-1 Distance (WGAN)

Defined as the minimal cost to transport mass from one distribution to another:

$$W(P, Q) = \inf_{\gamma \in \Pi(P,Q)} \mathbb{E}_{(x,y) \sim \gamma} \|x - y\|.$$

- Symmetry: $W(P,Q) = W(Q,P).$  
- Referred to as Earth Mover’s Distance (EMD).  
- In WGAN, enforce **1-Lipschitz constraint** on $D$.

---






## 1.5 Enforcing the 1-Lipschitz Constraint in WGANs

### 1.5.1 Weight Clipping (Original WGAN)

- **Idea:** Directly clip critic weights to a fixed range after every update: $$
  w \; \leftarrow \; \text{clip}(w, -c, c)
  $$
- Ensures the function doesn’t become too steep.  
- **Problems:** Can lead to capacity underuse and poor critic performance.
### 1.5.2 Gradient Penalty (WGAN-GP)

- **Idea:** Penalize the critic if its gradient norm deviates from 1.
- Add a regularization term to the loss:
$$
\lambda \, \mathbb{E}_{\widehat{x} \sim p_{\widehat{x}}}
\Big[ \big( \|\nabla_{\widehat{x}} f(\widehat{x})\|_2 - 1 \big)^2 \Big]
$$
where:
- $\widehat{x}$ is sampled along straight lines between real and generated data
- $\lambda$ is a penalty coefficient
- Encourages $\|\nabla f(\widehat{x})\|_2 \approx 1$, enforcing Lipschitz continuity.

### 1.5.3 comparison 

| Method            | Pros | Cons |
|-------------------|------|------|
| Weight Clipping   | Simple to implement | Can hurt capacity; unstable |
| Gradient Penalty  | More stable; widely used | Slightly more computation |

### 1.5.4 procedure
1. interpolation of $\widehat{x}$ between real and fake $x$
2. compute gradient norm: $g=\nabla_{\hat{x}} f(\hat{x})$, then $\left(\|g\|_2-1\right)^2$
3. auto-differentiation w.r.t. $\widehat{x}$
  

大多数现代 WGAN 实现都采用 WGAN-GP.


## 1.6 Conditional GAN（cGAN）：在标签/条件下生成

引入条件 $y$（如类别/文本），把判别与生成都条件化：
$$\begin{aligned}
\min_G \max_D \;\; &\mathbb{E}_{(x,y)\sim p_{\text{data}}}\big[\log D(x,y)\big] \\
&\;+\; \mathbb{E}_{z\sim p(z),\, y\sim p(y)}\big[\log (1 - D(G(z,y),y))\big].
\end{aligned}$$
或在 WGAN 中加入条件，critic 学习条件下分布偏差。

## 1.7 从 VAE 到 GAN：数学与理念的桥梁

### 1.7.1 「likelihood」 vs. 「non-likelihood」
- **VAE**：最大化 $\log p_\theta(x)$，用 ELBO 下界，学习到**后验近似** $q_\phi(z\mid x)$。  
- **GAN**：不写likelihood，直接**最小化分布差异**（JS、Wasserstein 等），通过discriminator/critic 提供信号。

### 1.7.2 两者的互补视角
- **训练信号**：VAE 的重建损失在像素域，GAN 的信号在判别器特征域（往往更贴近感知质量）。  
- **多样性 vs. 锐利度**：VAE 更多样但模糊；GAN 更锐利但易模式崩塌。  
- **后验推断**：VAE 自带编码器；GAN 需借助额外网络（如 BiGAN/ALI）学习逆映射。

## 1.8 训练细节与典型问题

### 1.8.1 模式崩塌（mode collapse）
- **症状**：生成样本缺乏多样性，集中到少数模式。  
- **缓解**：WGAN/WGAN-GP；使用多判别器或小批次判别（minibatch discrimination）；加入噪声或正则。

### 1.8.2 判别器过强/过弱
- **过强**：生成器几乎无梯度；**做法**：限制判别器训练步数或容量，加入 label smoothing。  
- **过弱**：无法提供有信息的梯度；**做法**：提高判别器更新步、使用谱归一化等。

### 1.8.3 损失选择与指标
- 原始 GAN 损失 vs 非饱和损失；Wasserstein 损失更稳定。  
- 评估：FID、IS、Precision/Recall for GANs 等。



## 1.9 参考要点（口袋卡）

- **VAE**：$\mathcal{L} = \mathbb{E}[\log p_\theta(x\mid z)] - \mathrm{KL}(q_\phi\|p)$。重建项 + 正则项。  
- **GAN**：$\min_G\max_D \mathbb{E}\log D + \mathbb{E}\log(1-D)$；$D^*(x)=\frac{p_{\text{data}}}{p_{\text{data}}+p_G}$；$\!\!\Rightarrow$ 最小化 JS。  
- **WGAN**：对偶最大化 1-Lipschitz 函数期望差；梯度惩罚更稳。  
- **cGAN**：在 $y$ 上条件化判别与生成。

> 一句话：VAE 用**似然下界**学「可采样的后验」，GAN 用**对抗判别**学「可感知的分布差异」。二者互补，可融合（如 VAE-GAN、ALI/BiGAN）。