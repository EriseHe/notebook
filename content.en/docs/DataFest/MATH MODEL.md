## High Score Location and Low Competition

$$\text{Score} = 100 - (w_{1} * \text{Rent} + w_{2} * \text{Wages} + w_{3} * \text{Taxes} + w_{4} * \text{Competitiveness})$$


### 1. High Score Location
We rate score of the location by
1. rent: 

$$\text{unit: per square meter}$$

2. wages: 
$$\text{Weighted Salary}=?$$

3. taxes

### 2. Measurement Competitiveness

We proposed a measurement of competitiveness
We can formalize your revised idea as follows:

1. Let  
   $$P = \{p_1, p_2, \dots, p_n\} \subset \mathbb{R}^2$$  
   be the set of existing company locations, and let $r > 0$ be a given radius.

2. For each $p_i \in P$, define the closed disk (or neighborhood) of radius $r$ as  
   $$U(p_i, r) = \{ q \in \mathbb{R}^2 : \|q - p_i\| \le r \}.$$

3. Suppose that for any company $p \in P$, its disk $U(p, r)$ (which might naturally include all other companies) has a certain count of companies. Now, when we add a new company at a candidate location $p_0$, if $p_0$ were placed too centrally (i.e. inside every $U(p_i, r)$), then the count in its own neighborhood $U(p_0, r)$ would increase relative to the original configuration.

4. To keep the number unchanged (i.e. “$n$” remains the same), $p_0$ must be positioned so that its neighborhood “loses” exactly one of the companies that would otherwise be included. In other words, there must be exactly one index $i$ for which $p_0$ falls outside $U(p_i, r)$ while it lies inside all the others.

5. For each $p_i$, define the candidate region
   $$V_i = \Biggl( \bigcap_{j \neq i} U(p_j, r) \Biggr) \setminus U(p_i, r).$$
   This is the set of points that are in the disks of all companies except $p_i$ (so they “lose” that company), and thus if a new company were placed there, its neighborhood would have the same number as the original configuration.

6. Then the overall valid region for a new point $p_0$ is the union of these regions:
   $$V = \bigcup_{i=1}^{n} V_i.$$
   Any point $p_0 \in V$ will have the property that when you form its neighborhood $U(p_0, r)$, it includes exactly the same number of companies as before—because one of the previously included disks (and its company) is “lost” for that candidate location.


7. Define the Loss Function

You'll compare the predicted position (based on optimization) vs. the actual historical position:

$$
\mathcal{L}(\lambda)=\sum_{k=1}^N\left\|x_{\text {opt }}^{(k)}(\lambda)-x_{\text {actual }}^{(k)}\right\|^2
$$

- $x_{\text {opt }}^{(k)}(\lambda)$ is the model-predicted optimal location (from your objective function).
- $x_{\mathrm{actual}}^{(k)}$ is the actual location from data.
- You sum the squared distance error across all examples.
3. Search for Optimal $\lambda$

Use:
- Grid search (simple and robust)
- Bayesian optimization (smart sampling)
- Gradient-based methods if differentiable

Goal:

$$
\lambda^*=\arg \min _\lambda \mathcal{L}(\lambda)
$$

--
here we present a standard spatial optimization treatment of predicted new optimal location of the company based on historical data. We established a location score that balanced between proximity and weighted dispersion to ensure, on on hand they are easily accessible for high proximity to suppliers and partners, but also at the same time keep a reasonable distances from other similar company to avoid competitiveness.

The essential question we want to answer here is: where exactly do you want your company to locate?

**Clustering** & **Epsilon**
To be able to find out, we need to cluster them. The customized method is first draw an epsilon-neiborhood at each company's data, then determine epsilon in which that the clusterinig present a visible patterns along the spatial distribution. 

Then based on this clustering, we use machine learning to find out the optimal penalty weight λ that best predicts historical choices for different industory. 

**Why**?

Why is this important, because industry standard varies drastically. For some industry, you want to be at the center, but for some other industries, like healthcare it is more valuable keep distance from other competitor, rather than accessibility. 

How did we train it? we compared the predicted location with the actual location, and the minimize total error over all records, basically a loss function, using a comprehensive grid search for the precise weight of lambda. This is historically learned parameter to reflect how each industry values company distance. 

Eventually, we compute the predicted optimal location of the new company using the centroid of each clustering. Here is an example for technology, media related industry.

