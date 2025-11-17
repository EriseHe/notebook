# Kruskal–Szekeres Coordinates for Schwarzschild Spacetime

## 1. Motivation: curing the fake singularity

We start with the Schwarzschild metric (vacuum, outside a spherical mass $M$):

$$
ds^2
= -\left(1-\frac{2GM}{r}\right) dt^2
+ \left(1-\frac{2GM}{r}\right)^{-1} dr^2
+ r^2(d\theta^2+\sin^2\theta\,d\phi^2).
$$

At the Schwarzschild radius
$$
r = 2GM,
$$
the metric components $g_{tt}$ and $g_{rr}$ blow up or vanish, even though scalar curvature invariants remain finite. This means:

$$
\text{pathology at } r=2GM
\quad\text{is due to coordinates, not geometry.}
$$

Goal: construct new coordinates that

1. describe the same spacetime,
2. are regular at $r=2GM$,
3. make causal structure (light cones, horizons) transparent.

Kruskal–Szekeres (KS) coordinates achieve this.

---

## 2. Defining Kruskal–Szekeres coordinates

We introduce coordinates $(u,v)$ by (the text’s eq. 15.8):

$$
\begin{aligned}
u^2 - v^2 &= \left(\frac{r}{2GM} - 1\right) e^{r/2GM},\\[4pt]
t &= 2GM \ln\left|\frac{u+v}{u-v}\right|.
\end{aligned}
\tag{KS-def}
$$

Here $r=r(u,v)$ is defined implicitly by the first equation. These transformations are designed so that:

- $r=2GM$ becomes $u^2 - v^2 = 0$ — **smooth null lines**;
- radial null rays become straight lines $u=\pm v$;
- the metric becomes regular at the horizon.

We now derive the KS metric step by step.

---

## 3. From $(t,r)$ to $(u,v)$: differential relations

We want $dr$ and $dt$ in terms of $du,dv$, then substitute into the Schwarzschild metric.

### 3.1 Relation from $u^2 - v^2$: eq. (15.17) → (15.18)

Start with (eq. 15.17):

$$
u^2 - v^2 = \left(\frac{r}{2GM} - 1\right) e^{r/2GM}
\tag{15.17}
$$

Take differentials of both sides.

Left-hand side:
$$
d(u^2 - v^2)
= 2u\,du - 2v\,dv
= 2(u\,du - v\,dv)
$$

Right-hand side:
$$
f(r) := \left(\frac{r}{2GM} - 1\right) e^{r/2GM}
$$

Using the product rule,

$$
\begin{aligned}
f'(r)
&= \frac{1}{2GM}e^{r/2GM}\left(\frac{r}{2GM}-1\right)
+ e^{r/2GM}\frac{1}{2GM} \\[4pt]
&= \frac{e^{r/2GM}}{2GM}
\underbrace{\left(\frac{r}{2GM}-1+1\right)}_{=\,\frac{r}{2GM}}
= e^{r/2GM} \frac{r}{4G^2M^2}.
\end{aligned}
$$

So

$$
2(u\,du - v\,dv) = f'(r)\,dr
= \frac{r}{4G^2M^2} e^{r/2GM} dr.
$$

Solve for $dr$:

$$
\begin{aligned}
dr
&= \frac{8(GM)^2}{r} e^{-r/2GM} (u\,du - v\,dv)
\end{aligned}
\tag{15.18}
$$

> **Exercise 15.4.1 (checked).**  
> The computation above verifies equation (15.18).

We’ll reuse the compact notation
$$
\boxed{dr
= \frac{8(GM)^2}{r} e^{-r/2GM} (u\,du - v\,dv)}
$$

---

### 3.2 Relation from $t(u,v)$: handling the absolute values

From (KS-def),

$$
t = 2GM\ln\left|\frac{u+v}{u-v}\right|
= 2GM\ln|u+v| - 2GM\ln|u-v|
\tag{15.19}
$$

Because of absolute values, there are four sign cases (as in the text), but **the differential** $dt$ is the same in all of them. For any choice of signs $\sigma_1,\sigma_2=\pm1$,

$$
t 
= 2GM\ln(\sigma_1(u+v)) - 2GM\ln(\sigma_2(u-v))
$$

and differentiating:

$$
dt
= 2GM\left(\frac{du+dv}{u+v} - \frac{du-dv}{u-v}\right).
\tag{15.20}
$$

The $\sigma_i$ cancel because $d\ln(\sigma x) = dx/x$.

> **Exercise 15.4.2 (idea).**  
> Pick any sign case explicitly (e.g. $u+v>0,\,u-v<0$) and repeat the derivative; you get (15.20). The same happens in all four cases, confirming that (15.20) is globally valid.

We now massage (15.20) into a more symmetric form.

---

### 3.3 Symmetric form of $dt$: equation (15.21)

Start from (15.20):

$$
dt
= 2GM\left(\frac{du+dv}{u+v} - \frac{du-dv}{u-v}\right).
$$

Put over a common denominator $u^2 - v^2$:

$$
\begin{aligned}
dt
&= 2GM\,
\frac{(u-v)(du+dv) - (u+v)(du-dv)}{u^2 - v^2}.
\end{aligned}
$$

Compute the numerator carefully:

$$
\begin{aligned}
(u-v)(du+dv) &= u\,du + u\,dv - v\,du - v\,dv,\\
(u+v)(du-dv) &= u\,du - u\,dv + v\,du - v\,dv.
\end{aligned}
$$

Subtract:

$$
\begin{aligned}
(u-v)(du+dv) - (u+v)(du-dv)
&= 2(u\,dv - v\,du).
\end{aligned}
$$

So

$$
\begin{aligned}
dt
&= 2GM \cdot \frac{2(u\,dv - v\,du)}{u^2 - v^2}
= \frac{4GM}{u^2 - v^2} (u\,dv - v\,du).
\end{aligned}
$$

Now use eq. (15.17),
$$
u^2 - v^2 = \left(\frac{r}{2GM} - 1\right)e^{r/2GM},
$$
to rewrite:

$$
\boxed{
dt
= \frac{4GM\,e^{-r/2GM}}{\frac{r}{2GM} - 1}\,(u\,dv - v\,du).
}
\tag{15.21}
$$

This is the form we’ll plug into the metric.

---

## 4. Constructing the Kruskal–Szekeres metric

We now transform the $t$-$r$ sector of the Schwarzschild metric:

$$
ds^2_{(t,r)}
= -\left(1-\frac{2GM}{r}\right) dt^2
+ \left(1-\frac{2GM}{r}\right)^{-1} dr^2.
$$

For compactness, define

$$
A := 8(GM)^2 e^{-r/2GM}.
$$

Then from (15.18) and (15.21):

$$
\begin{aligned}
dr &= \frac{A}{r} (u\,du - v\,dv),\\[4pt]
dt &= \frac{A}{r-2GM} (u\,dv - v\,du),
\end{aligned}
$$
since
$$\frac{4GM\,e^{-r/2GM}}{\frac{r}{2GM}-1}
= \frac{8(GM)^2 e^{-r/2GM}}{r-2GM} = \frac{A}{r-2GM}$$

### 4.1 Substitute and simplify (Exercise 15.4.3)

Use $1-\frac{2GM}{r} = \frac{r-2GM}{r}$, the **First term**

$$
\begin{aligned}
-\left(1-\frac{2GM}{r}\right) dt^2
&= -\frac{r-2GM}{r}
\left[\frac{A}{r-2GM}\right]^2 (u\,dv - v\,du)^2\\[4pt]
&= -\frac{A^2}{r(r-2GM)} (u\,dv - v\,du)^2.
\end{aligned}
$$
**Second term**
$$
\begin{aligned}
\left(1-\frac{2GM}{r}\right)^{-1} dr^2
&= \frac{r}{r-2GM}
\left[\frac{A}{r}\right]^2 (u\,du - v\,dv)^2\\[4pt]
&= \frac{A^2}{r(r-2GM)} (u\,du - v\,dv)^2
\end{aligned}$$

Add them:
$$
\begin{aligned}
ds^2_{(t,r)}
&= \frac{A^2}{r(r-2GM)}
\left[(u\,du - v\,dv)^2 - (u\,dv - v\,du)^2\right].
\end{aligned}
$$

Now simplify the bracket:

$$
\begin{aligned}
(u\,du - v\,dv)^2 - (u\,dv - v\,du)^2
&= (u^2 - v^2)(du^2 - dv^2)\\
&= -(u^2 - v^2)(dv^2 - du^2).
\end{aligned}
$$

So

$$
ds^2_{(t,r)}
= -\frac{A^2}{r(r-2GM)}
\,(u^2 - v^2)\,(dv^2 - du^2).
$$

Insert 
$$u^2 - v^2 = \left(\frac{r}{2GM} - 1\right)e^{r/2GM}= \frac{r-2GM}{2GM} e^{r/2GM}$$

and $A^2 = 64(GM)^4 e^{-r/GM}$:

$$
\begin{aligned}
ds^2_{(t,r)}
&= -\frac{64(GM)^4 e^{-r/GM}}{r(r-2GM)}
\cdot \frac{r-2GM}{2GM} e^{r/2GM} (dv^2 - du^2)\\[4pt]
&= -\frac{32(GM)^3}{r} e^{-r/2GM} (dv^2 - du^2).
\end{aligned}
\tag{15.22}
$$

> **Exercise 15.4.3 (done).**  
> The algebra above verifies equation (15.22).

Finally, restore the angular part $r^2 d\Omega^2$ (which is unchanged because $\theta,\phi$ are the same):

$$
\boxed{
ds^2
= -\frac{32(GM)^3}{r} e^{-r/2GM}(dv^2 - du^2)
+ r^2\left(d\theta^2+\sin^2\theta\,d\phi^2\right),
}
\tag{15.9}
$$
with $r=r(u,v)$ implicitly via (15.17).

This is the **Kruskal–Szekeres metric**.

---

## 5. Geometric meaning and KS diagram (quick guide)

Using the KS metric:

1. **No coordinate singularity at $r=2GM$.**

   At $r=2GM$, the prefactor
   $\frac{32(GM)^3}{r} e^{-r/2GM}$ is finite and nonzero.
   The horizon is described by straight null lines
$$
u = \pm v \quad\Longleftrightarrow\quad u^2 - v^2 = 0.
$$

2. **Radial null geodesics.**

   For purely radial photons, $d\theta = d\phi=0$ and $ds^2=0$ give

$$
dv^2 - du^2 = 0
   \quad\Rightarrow\quad
   du = \pm dv.
$$

   So light rays are straight lines of slope $\pm 1$ in the $(u,v)$ plane:
   light cones look **Minkowskian**, which is the entire point.

3. **Massive particles.**

   Timelike condition $ds^2<0$ implies

$$
dv^2 > du^2
   \quad\Rightarrow\quad
   |dv/du| > 1.
$$

   Worldlines of massive particles are steeper than the null lines, as in flat spacetime diagrams.

4. **Lines of constant $r$.**

   From (15.17),

$$
u^2 - v^2 = \left(\frac{r}{2GM} - 1\right)e^{r/2GM}
   = \text{const},
$$

   so fixed $r>2GM$ are hyperbolae in the $(u,v)$ plane.  
   The event horizon $r=2GM$ is the pair of lines $u=\pm v$.

5. **Lines of constant $t$.**

   From (15.20), curves of constant $t$ satisfy

$$
\frac{t}{2GM}
   = \ln\left|\frac{u+v}{u-v}\right|
   = \text{const}.
$$

   One can show that these are straight lines $u=\pm a v$ with fixed slope $a$, as in eq. (15.10).

---

## 6. Summary (conceptual)

- Schwarzschild coordinates hide the true global structure behind a fake singularity at $r=2GM$.
- Kruskal–Szekeres coordinates $(u,v)$ are constructed so that:
  - the metric is finite at $r=2GM$,
  - radial null geodesics are straight at $45^\circ$,
  - the full extended geometry (black hole + white hole + two exteriors) can be drawn on a single diagram.
- The derivation hinges on:
$$
\underbrace{u^2 - v^2 = \left(\frac{r}{2GM} -1\right)e^{r/2GM}}_{\text{encodes }r}
  \quad\text{and}\quad
  \underbrace{t = 2GM \ln\left|\frac{u+v}{u-v}\right|}_{\text{encodes }t},
$$
  followed by clean differential transformations (Exercises 15.4.1–15.4.3).

Kruskal–Szekeres coordinates are not about changing physics; they are about **revealing** it by stripping away a bad choice of coordinates and letting the causal structure stand in plain sight.
