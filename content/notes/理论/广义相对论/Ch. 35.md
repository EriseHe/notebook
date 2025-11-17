
Let’s do Box 35.1 cleanly and stick to Moore’s notation.

We start from the coordinate condition, which in the form used for Box 35.1 is
$$
0 = \eta^{\alpha\mu}\big(\partial_\mu h_{\alpha\nu} - \tfrac12,\partial_\nu h_{\alpha\mu}\big).
$$
Raising the (\alpha) index and contracting gives the standard “harmonic gauge” form
$$
0
= \partial_\mu h^{\mu}{}*{\nu} - \tfrac12,\partial*\nu h,
\tag{35.23}
$$
where
$$
h \equiv \eta^{\alpha\beta} h_{\alpha\beta}
$$
is the trace of the perturbation. 

The exercise tells you to substitute
$$
h_{tt} = h_{xx} = h_{yy} = h_{zz} = 2\Phi_0,
\qquad
h_{ti} = h_{it} = -4A_i,
$$
(all other (h_{\mu\nu}) negligible), and show that (35.23) implies
$$
\nabla\cdot\mathbf{A}_0 = -\frac{\partial\Phi_0}{\partial t}.
\tag{35.8}
$$
Below I’ll do this explicitly, using Moore’s conventions: metric (\eta_{\mu\nu} = \mathrm{diag}(-1,1,1,1)), Greek indices (0,1,2,3) (with (t\equiv 0)), Latin spatial indices (i=1,2,3).

---

## 1. Compute the trace (h)

We have only diagonal components (h_{tt},h_{xx},h_{yy},h_{zz}). So
$$
\begin{aligned}
h
&= \eta^{\alpha\beta} h_{\alpha\beta} \
&= \eta^{tt} h_{tt} + \eta^{xx} h_{xx} + \eta^{yy} h_{yy} + \eta^{zz} h_{zz} \
&= (-1)(2\Phi_0) + (1)(2\Phi_0) + (1)(2\Phi_0) + (1)(2\Phi_0) \
&= -2\Phi_0 + 6\Phi_0 \
&= 4\Phi_0.
\end{aligned}
$$
So
$$
h = 4\Phi_0.
$$
---

## 2. Compute (h^{\mu}{}_{\nu}) needed for (\nu = t)

We want the (\nu = t) component of (35.23):
$$
0 = \partial_\mu h^{\mu}{}_{t} - \tfrac12,\partial_t h.
$$
So we need (h^{t}{}*{t}) and (h^{i}{}*{t}).

By definition,
$$
h^{\mu}{}*{\nu} = \eta^{\mu\alpha} h*{\alpha\nu}.
$$
### 2.1 (h^{t}{}_{t})
$$
\begin{aligned}
h^{t}{}*{t}
&= \eta^{t\alpha} h*{\alpha t} \
&= \eta^{tt} h_{tt} \quad (\text{other } h_{\alpha t} \approx 0 \text{ for } \alpha \neq t) \
&= (-1)(2\Phi_0) \
&= -2\Phi_0.
\end{aligned}
$$
### 2.2 (h^{i}{}_{t})
$$
\begin{aligned}
h^{i}{}*{t}
&= \eta^{i\alpha} h*{\alpha t} \
&= \eta^{ij} h_{jt} \quad (\text{only spatial indices contribute}) \
&= \delta^{ij} h_{jt} \
&= h_{it} \
&= -4A_i.
\end{aligned}
$$
So
$$
h^{t}{}*{t} = -2\Phi_0,
\qquad
h^{i}{}*{t} = -4A_i.
$$
---

## 3. Plug into the gauge condition for (\nu = t)

Take (\nu = t) in (35.23):
$$
0 = \partial_\mu h^{\mu}{}*{t} - \tfrac12,\partial_t h
= \partial_t h^{t}{}*{t} + \partial_i h^{i}{}_{t} - \tfrac12,\partial_t h.
$$
Now evaluate each term.

### 3.1 Time derivative of (h^{t}{}_{t})
$$
\begin{aligned}
\partial_t h^{t}{}_{t}
&= \partial_t(-2\Phi_0)
= -2,\frac{\partial\Phi_0}{\partial t}.
\end{aligned}
$$
### 3.2 Spatial divergence of (h^{i}{}_{t})
$$
\begin{aligned}
\partial_i h^{i}{}_{t}
&= \partial_i(-4A_i)
= -4,\partial_i A_i \
&= -4,(\nabla\cdot\mathbf{A}_0).
\end{aligned}
$$
(Here (\mathbf{A}_0) is the vector with components (A_i).)

### 3.3 Time derivative of the trace
$$
\begin{aligned}
\tfrac12,\partial_t h
&= \tfrac12,\partial_t (4\Phi_0)
= 2,\frac{\partial\Phi_0}{\partial t}.
\end{aligned}
$$
---

## 4. Put it all together

Plugging these into the (\nu = t) component:
$$
\begin{aligned}
0
&= \underbrace{\partial_t h^{t}{}*{t}}*{-2,\partial_t \Phi_0}

* \underbrace{\partial_i h^{i}{}*{t}}*{-4,\nabla\cdot\mathbf{A}_0}

- \underbrace{\tfrac12,\partial_t h}_{2,\partial_t\Phi_0} [4pt]
  &= \big(-2,\partial_t\Phi_0\big)

  * \big(-4,\nabla\cdot\mathbf{A}_0\big)

  - \big(2,\partial_t\Phi_0\big) [4pt]
    &= -4,\partial_t\Phi_0 - 4,\nabla\cdot\mathbf{A}_0.
    \end{aligned}
$$
Divide both sides by (-4):
$$
0 = \partial_t\Phi_0 + \nabla\cdot\mathbf{A}_0.
$$
Rewriting:
$$
\nabla\cdot\mathbf{A}_0 = -\frac{\partial\Phi_0}{\partial t},
$$
which is exactly equation (35.8):
$$
\boxed{\nabla\cdot\mathbf{A}_0 = -\frac{\partial\Phi_0}{\partial t}.}
$$
This is the **gravitational Lorentz gauge condition**, perfectly mirroring the EM condition
(\nabla\cdot\mathbf{A} = -\partial\phi/\partial t), but now for the **gravitoelectric** potential (\Phi_0) and **gravitomagnetic** vector potential (\mathbf{A}_0).
