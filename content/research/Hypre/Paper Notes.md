Challenge: Khodak et al. (ICLR 2024) 的工作很棒，但依赖 SOR 的显式性质 (unimodality/explicit spectral dependence)。然而，工业界真正强大的求解器（如 BoomerAMG）是黑盒的，没有这种漂亮的性质。

Insight: 虽然 BoomerAMG 是黑盒，但它在物理参数上依然具有平滑性 (Smoothness) 或 可学习性 (Learnability)。

Method: 我们不使用离散的 Tsallis-INF（因为维数灾难），也不使用简单的 ChebCB（因为没有解析解）。我们提出使用 Kernelized Contextual Bandits (或 Neural Bandits)。

Theory: 我们利用 RKHS 理论（或 Eluder Dimension），证明了即使没有显式的谱半径公式，只要 Solver 的行为是平滑的，我们依然能保证找到最优参数，且 Regret 是亚线性的。





我觉得我们用bandits学习amg的setup还是很有意义 因为如果setup做得好捕捉到了矩阵的物理特性 solve就会非常快 


我们其实是在找“given matrix的特征“和”AMG如何最有效的建立hierarchy“之间的某些关系  就比方如果矩阵是anisotropic，那我就可以把 StrongThreshold 设大一点因为这样收敛快 这个角度上说在AMG的setup上用CB很有意义 用TsallisINF那类独立的arm随机搜索会很浪费 

我看edmond他们理论上知道SOR的$\omega^*$ 和c之间存在一个V形的光滑函数关系 所以他们直接用Chebyshev CB来逼近这种关系 而amg的parameter非常复杂没对于这种未知黑盒关系 我想知道有没有可能假设matrix的某些特征和work units之间存在像这样的某种关系

$$\mathbb{E}\!\left[\mathrm{WU}_t(s)\mid c_t\right]\approx \theta^\top \phi(c_t,s)$$
如果可以假设的话 我们就可以用LinUCB bandits不会有纬度爆炸也

linUCB正好可以解决维度炸的问题 是半连续 它学的是背后的连续曲线 