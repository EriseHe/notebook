# 1.1 Vector Algebra

## 1.1.1 Core Operations on Vectors

### (i) Addition / Subtraction
- Head-to-tail rule defines $A+B$
- Properties
$$
A+B=B+A
$$
$$
(A+B)+C=A+(B+C)
$$
- Subtraction = add the opposite
$$
A-B=A+(-B)
$$

### (ii) Scalar Multiplication
- $aA$ scales magnitude by $|a|$ (reverses direction if $a<0$)
- Distributive
$$
a(A+B)=aA+aB
$$

### (iii) Dot Product (scalar product)

> [!definition|1.1] Dot product
> $$
> A\cdot B\equiv AB\cos\theta
> $$
> ($\theta$ is the angle between $A$ and $B$)

Key facts
$$
A\cdot B=B\cdot A
$$
$$
A\cdot(B+C)=A\cdot B+A\cdot C
$$
Special cases
$$
A\cdot A=A^2
$$
- parallel $\Rightarrow A\cdot B=AB$
- perpendicular $\Rightarrow A\cdot B=0$

> [!example|1.1] Law of cosines (from dot product)
> Let $C=A-B$
> $$
> \begin{aligned}
> C^2
> &=C\cdot C\\
> &=(A-B)\cdot(A-B)\\
> &=A\cdot A-\underbrace{A\cdot B}_{AB\cos\theta}-\underbrace{B\cdot A}_{AB\cos\theta}+B\cdot B\\
> &=A^2+B^2-2AB\cos\theta
> \end{aligned}
> $$

### (iv) Cross Product (vector product)

> [!definition|1.2] Cross product
> $$
> A\times B\equiv AB\sin\theta\,\hat n
> $$
> ($\hat n$ is a unit vector perpendicular to the plane of $A,B$, direction by the right-hand rule)

Key facts
- magnitude $|A\times B|=AB\sin\theta$ (area of parallelogram)
- parallel $\Rightarrow A\times B=0$
- in particular
$$
A\times A=0
$$
Distributive, not commutative
$$
A\times(B+C)=(A\times B)+(A\times C)
$$
$$
(B\times A)=-(A\times B)
$$

---

## 1.1.2 Component Form (Cartesian)

Write vectors using basis vectors $\hat x,\hat y,\hat z$
$$
A=A_x\hat x+A_y\hat y+A_z\hat z
$$
Components can be recovered by dotting with basis vectors
$$
A_x=A\cdot\hat x,\qquad A_y=A\cdot\hat y,\qquad A_z=A\cdot\hat z
$$

### (i) Addition and scaling
$$
\begin{aligned}
A+B&=(A_x+B_x)\hat x+(A_y+B_y)\hat y+(A_z+B_z)\hat z
\end{aligned}
$$
$$
aA=(aA_x)\hat x+(aA_y)\hat y+(aA_z)\hat z
$$

### (ii) Dot product and magnitude
Using
$$
\hat x\cdot\hat x=\hat y\cdot\hat y=\hat z\cdot\hat z=1,\qquad
\hat x\cdot\hat y=\hat x\cdot\hat z=\hat y\cdot\hat z=0
$$
we get
$$
A\cdot B=A_xB_x+A_yB_y+A_zB_z
$$
and
$$
A\cdot A=A_x^2+A_y^2+A_z^2,\qquad
A=\sqrt{A_x^2+A_y^2+A_z^2}
$$

### (iii) Cross product (formula + determinant)
Basis cross products
$$
\hat x\times\hat x=\hat y\times\hat y=\hat z\times\hat z=0
$$
$$
\hat x\times\hat y=-\hat y\times\hat x=\hat z,\qquad
\hat y\times\hat z=-\hat z\times\hat y=\hat x,\qquad
\hat z\times\hat x=-\hat x\times\hat z=\hat y
$$
Therefore
$$
\begin{aligned}
A\times B
&=(A_yB_z-A_zB_y)\hat x+(A_zB_x-A_xB_z)\hat y+(A_xB_y-A_yB_x)\hat z
\end{aligned}
$$
Neat determinant form
$$
A\times B=
\begin{vmatrix}
\hat x&\hat y&\hat z\\
A_x&A_y&A_z\\
B_x&B_y&B_z
\end{vmatrix}
$$

> [!remark|1.3] Right-handed convention
> The basis cross-product signs assume a right-handed coordinate system

---

## 1.1.3 Triple Products (Most-Used Identities)

### (i) Scalar triple product

> [!definition|1.4] Scalar triple product
> $$
> A\cdot(B\times C)
> $$

Cyclic permutations are equal
$$
A\cdot(B\times C)=B\cdot(C\times A)=C\cdot(A\times B)
$$
Swap two vectors flips the sign
$$
A\cdot(C\times B)=B\cdot(A\times C)=C\cdot(B\times A)
$$
Component determinant
$$
A\cdot(B\times C)=
\begin{vmatrix}
A_x&A_y&A_z\\
B_x&B_y&B_z\\
C_x&C_y&C_z
\end{vmatrix}
$$
Interchange dot/cross placement
$$
A\cdot(B\times C)=(A\times B)\cdot C
$$

### (ii) Vector triple product (BAC–CAB)

> [!definition|1.5] Vector triple product
> $$
> A\times(B\times C)
> $$

BAC–CAB rule
$$
A\times(B\times C)=B(A\cdot C)-C(A\cdot B)
$$

---

## 1.1.4 Position, Displacement, Separation (Notation to keep straight)

> [!definition|1.6] Position vector
> $$
> r=x\hat x+y\hat y+z\hat z
> $$

Magnitude and radial unit vector
$$
r=\sqrt{x^2+y^2+z^2}
$$
$$
\hat r=\frac{r}{r}=\frac{x\hat x+y\hat y+z\hat z}{\sqrt{x^2+y^2+z^2}}
$$

Infinitesimal displacement
$$
dl=dx\,\hat x+dy\,\hat y+dz\,\hat z
$$

Separation from source point $r'$ to field point $r$ (script notation)
$$
\mathscr r=r-r'
$$
$$
\mathscr r=|r-r'|
$$
$$
\hat{\mathscr r}=\frac{\mathscr r}{\mathscr r}=\frac{r-r'}{|r-r'|}
$$

---

## 1.1.5 What “Vector” Means (Transformation Criterion)

A vector is characterized by how its components change under **rotation** of the coordinate axes.

Example: rotation by angle $\phi$ about the common $x=\bar x$ axis
$$
\begin{pmatrix}
\bar A_y\\
\bar A_z
\end{pmatrix}
=
\begin{pmatrix}
\cos\phi&\sin\phi\\
-\sin\phi&\cos\phi
\end{pmatrix}
\begin{pmatrix}
A_y\\
A_z
\end{pmatrix}
$$

General 3D rotation (matrix $R$)
$$
\bar A_i=\sum_{j=1}^3 R_{ij}A_j
$$

> [!definition|1.7] Vector (rotation rule)
> A vector is a set of three components that transforms the same way as $(x,y,z)$ under a rotation of the coordinate axes

(Preview) A second-rank tensor has nine components and transforms with two factors of $R$
$$
\bar T_{ij}=\sum_{k=1}^3\sum_{l=1}^3 R_{ik}R_{jl}T_{kl}
$$

# 1.2 Differential Calculus (Vector Derivatives)

## 1.2.0 Quick Orientation (What changes, what stays)

A big theme of this chapter is that “vector calculus” is built to behave nicely under **rotations** of coordinates.  
Under **inversions**, some objects behave “anomalously” (useful to remember later)

> [!remark|1.2.0] Pseudovectors and pseudoscalars under inversion
> The cross product of two vectors is called a **pseudovector** because of its behavior under inversions  
> The scalar triple product of three vectors is called a **pseudoscalar**

---

## 1.2.1 “Ordinary” Derivatives (One Variable)

Let $f(x)$ be a function of one variable.

> [!definition|1.2.1] Differential form of the derivative
> The derivative $df/dx$ tells us how rapidly $f(x)$ varies when we change $x$ by a small amount $dx$
> $$
> df=\left(\frac{df}{dx}\right)dx
> $$

**Geometrical interpretation**  
$df/dx$ is the **slope** of the graph of $f$ versus $x$.

---

## 1.2.2 Gradient (Derivative of a Scalar Field)

Now consider a function of **three variables**, e.g. a temperature field $T(x,y,z)$.

### A. Total differential in 3D

A theorem on partial derivatives states
$$
dT=\left(\frac{\partial T}{\partial x}\right)dx+\left(\frac{\partial T}{\partial y}\right)dy+\left(\frac{\partial T}{\partial z}\right)dz
$$

This is the 3D analog of $df=(df/dx)dx$  
Instead of “one derivative,” we have three partial derivatives along the coordinate directions.

### B. Dot-product form and the definition of the gradient

Recall the infinitesimal displacement vector
$$
dl=dx\,\hat x+dy\,\hat y+dz\,\hat z
$$

Then the differential can be rewritten as
$$
\begin{aligned}
dT
&=\left(\frac{\partial T}{\partial x}\hat x+\frac{\partial T}{\partial y}\hat y+\frac{\partial T}{\partial z}\hat z\right)\cdot(dx\,\hat x+dy\,\hat y+dz\,\hat z)\\
&=(\nabla T)\cdot(dl)
\end{aligned}
$$

> [!definition|1.2.2] Gradient
> $$
> \nabla T\equiv \frac{\partial T}{\partial x}\hat x+\frac{\partial T}{\partial y}\hat y+\frac{\partial T}{\partial z}\hat z
> $$
> $\nabla T$ is called the **gradient** of $T$

### C. Geometrical meaning of $\nabla T$

Using the dot-product rule
$$
dT=\nabla T\cdot dl=|\nabla T|\,|dl|\cos\theta
$$
where $\theta$ is the angle between $\nabla T$ and $dl$.

Fix $|dl|$ and vary direction (vary $\theta$). The maximum change in $T$ occurs when $\theta=0$.  
So:

- $\nabla T$ points in the **direction of maximum increase** of $T$
- $|\nabla T|$ is the **slope** (rate of increase) in that direction

> [!remark|1.2.3] How to find extrema of $T(x,y,z)$
> If $\nabla T=0$ at $(x,y,z)$, then $dT=0$ for small displacements about that point  
> Such a point can be a maximum, minimum, saddle, or “shoulder”  
> To locate extrema, set the gradient equal to zero

### D. A key example

> [!example|1.2.4] Gradient of $r=\sqrt{x^2+y^2+z^2}$
> Find $\nabla r$ where
> $$
> r=\sqrt{x^2+y^2+z^2}
> $$
> Compute
> $$
> \begin{aligned}
> \nabla r
> &=\frac{\partial r}{\partial x}\hat x+\frac{\partial r}{\partial y}\hat y+\frac{\partial r}{\partial z}\hat z\\[4pt]
> &=\frac12\frac{2x}{\sqrt{x^2+y^2+z^2}}\hat x+\frac12\frac{2y}{\sqrt{x^2+y^2+z^2}}\hat y+\frac12\frac{2z}{\sqrt{x^2+y^2+z^2}}\hat z\\[6pt]
> &=\frac{x\hat x+y\hat y+z\hat z}{\sqrt{x^2+y^2+z^2}}\\[6pt]
> &=\frac{r}{r}\\[2pt]
> &=\hat r
> \end{aligned}
> $$
> Interpretation: distance from the origin increases most rapidly in the radial direction, at rate $1$

---

## 1.2.3 The Del Operator $\nabla$

The gradient has the formal appearance of a vector $\nabla$ “multiplying” a scalar $T$
$$
\nabla T=\left(\hat x\frac{\partial}{\partial x}+\hat y\frac{\partial}{\partial y}+\hat z\frac{\partial}{\partial z}\right)T
$$

> [!definition|1.2.5] Del operator
> $$
> \nabla=\hat x\frac{\partial}{\partial x}+\hat y\frac{\partial}{\partial y}+\hat z\frac{\partial}{\partial z}
> $$

> [!remark|1.2.6] $\nabla$ is a vector operator, not a vector
> Del is not a vector in the usual sense  
> It becomes meaningful only when it acts on a function  
> Think “differentiate what follows,” not “multiply” in the ordinary algebraic sense

A useful viewpoint: an ordinary vector $A$ can combine with other objects in three ways
- by a scalar $a$ as $Aa$
- by a vector $B$ via $A\cdot B$
- by a vector $B$ via $A\times B$

Correspondingly, $\nabla$ acts in three major ways (vector derivatives)
- on a scalar $T$ as $\nabla T$ (gradient)
- on a vector function $v$ via $\nabla\cdot v$ (divergence)
- on a vector function $v$ via $\nabla\times v$ (curl)

---

## 1.2.4 Divergence

Let a vector function be written in components as
$$
v=v_x\hat x+v_y\hat y+v_z\hat z
$$

> [!definition|1.2.6] Divergence
> $$
> \begin{aligned}
> \nabla\cdot v
> &=\left(\hat x\frac{\partial}{\partial x}+\hat y\frac{\partial}{\partial y}+\hat z\frac{\partial}{\partial z}\right)\cdot(v_x\hat x+v_y\hat y+v_z\hat z)\\
> &=\frac{\partial v_x}{\partial x}+\frac{\partial v_y}{\partial y}+\frac{\partial v_z}{\partial z}
> \end{aligned}
> $$

Key point: $\nabla\cdot v$ is a **scalar**.

**Geometrical meaning**  
Divergence measures how much the vector field “spreads out” from a point

- positive divergence: a “source” or “faucet”
- negative divergence: a “sink” or “drain”

> [!example|1.2.7] Simple divergences
> Let $v_a=r=x\hat x+y\hat y+z\hat z$, $v_b=\hat z$, and $v_c=z\hat z$
> $$
> \begin{aligned}
> \nabla\cdot v_a
> &=\frac{\partial}{\partial x}(x)+\frac{\partial}{\partial y}(y)+\frac{\partial}{\partial z}(z)\\
> &=1+1+1\\
> &=3
> \end{aligned}
> $$
> $$
> \begin{aligned}
> \nabla\cdot v_b
> &=\frac{\partial}{\partial x}(0)+\frac{\partial}{\partial y}(0)+\frac{\partial}{\partial z}(1)\\
> &=0+0+0\\
> &=0
> \end{aligned}
> $$
> $$
> \begin{aligned}
> \nabla\cdot v_c
> &=\frac{\partial}{\partial x}(0)+\frac{\partial}{\partial y}(0)+\frac{\partial}{\partial z}(z)\\
> &=0+0+1\\
> &=1
> \end{aligned}
> $$

---

## 1.2.5 Curl

> [!definition|1.2.8] Curl (component form)
> $$
> \nabla\times v=
> \begin{vmatrix}
> \hat x&\hat y&\hat z\\
> \partial/\partial x&\partial/\partial y&\partial/\partial z\\
> v_x&v_y&v_z
> \end{vmatrix}
> $$
> Equivalently
> $$
> \nabla\times v
> =\hat x\left(\frac{\partial v_z}{\partial y}-\frac{\partial v_y}{\partial z}\right)
> +\hat y\left(\frac{\partial v_x}{\partial z}-\frac{\partial v_z}{\partial x}\right)
> +\hat z\left(\frac{\partial v_y}{\partial x}-\frac{\partial v_x}{\partial y}\right)
> $$

Key point: $\nabla\times v$ is a **vector**.

**Geometrical meaning**  
Curl measures how much a vector field “swirls” around a point  
A region of large curl behaves like a whirlpool.

> [!example|1.2.9] Simple curls in the $\hat z$ direction
> If $v_a=-y\hat x+x\hat y$ and $v_b=x\hat y$
> $$
> \nabla\times v_a=
> \begin{vmatrix}
> \hat x&\hat y&\hat z\\
> \partial/\partial x&\partial/\partial y&\partial/\partial z\\
> -y&x&0
> \end{vmatrix}
> =2\hat z
> $$
> $$
> \nabla\times v_b=
> \begin{vmatrix}
> \hat x&\hat y&\hat z\\
> \partial/\partial x&\partial/\partial y&\partial/\partial z\\
> 0&x&0
> \end{vmatrix}
> =\hat z
> $$
> These curls point in the $+z$ direction

---

## 1.2.6 Rules for $\nabla$ (Linearity and Product Rules)

### A. Linearity (sum rules and constants)

These mirror ordinary derivatives
$$
\nabla(f+g)=\nabla f+\nabla g
$$
$$
\nabla\cdot(A+B)=(\nabla\cdot A)+(\nabla\cdot B)
$$
$$
\nabla\times(A+B)=(\nabla\times A)+(\nabla\times B)
$$
$$
\nabla(cf)=c\nabla f
$$
$$
\nabla\cdot(cA)=c(\nabla\cdot A)
$$
$$
\nabla\times(cA)=c(\nabla\times A)
$$

### B. Six product rules (core identities)

There are two ways to construct a scalar
- $fg$ (product of two scalar functions)
- $A\cdot B$ (dot product of two vector functions)

and two ways to make a vector
- $fA$ (scalar times vector)
- $A\times B$ (cross product of two vectors)

Accordingly, there are six product rules

> [!theorem|1.2.10] Product rules for $\nabla$
> (i) Two scalars
> $$
> \nabla(fg)=f\nabla g+g\nabla f
> $$
> (ii) Dot product
> $$
> \nabla(A\cdot B)=A\times(\nabla\times B)+B\times(\nabla\times A)+(A\cdot\nabla)B+(B\cdot\nabla)A
> $$
> (iii) Divergence of scalar times vector
> $$
> \nabla\cdot(fA)=f(\nabla\cdot A)+A\cdot(\nabla f)
> $$
> (iv) Divergence of a cross product
> $$
> \nabla\cdot(A\times B)=B\cdot(\nabla\times A)-A\cdot(\nabla\times B)
> $$
> (v) Curl of scalar times vector
> $$
> \nabla\times(fA)=f(\nabla\times A)-A\times(\nabla f)
> $$
> (vi) Curl of a cross product
> $$
> \nabla\times(A\times B)=(B\cdot\nabla)A-(A\cdot\nabla)B+A(\nabla\cdot B)-B(\nabla\cdot A)
> $$

A representative derivation worth remembering is how (iii) “looks like” the ordinary product rule
$$
\begin{aligned}
\nabla\cdot(fA)
&=\frac{\partial}{\partial x}(fA_x)+\frac{\partial}{\partial y}(fA_y)+\frac{\partial}{\partial z}(fA_z)\\
&=\underbrace{\left(\frac{\partial f}{\partial x}A_x+\frac{\partial f}{\partial y}A_y+\frac{\partial f}{\partial z}A_z\right)}_{A\cdot(\nabla f)}
+\underbrace{f\left(\frac{\partial A_x}{\partial x}+\frac{\partial A_y}{\partial y}+\frac{\partial A_z}{\partial z}\right)}_{f(\nabla\cdot A)}
\end{aligned}
$$

### C. Quotient rules (often used, easy to reconstruct)

> [!theorem|1.2.11] Quotient rules
> $$
> \nabla\left(\frac{f}{g}\right)=\frac{g\nabla f-f\nabla g}{g^2}
> $$
> $$
> \nabla\cdot\left(\frac{A}{g}\right)=\frac{g(\nabla\cdot A)-A\cdot(\nabla g)}{g^2}
> $$
> $$
> \nabla\times\left(\frac{A}{g}\right)=\frac{g(\nabla\times A)+A\times(\nabla g)}{g^2}
> $$

---

## 1.2.7 Second Derivatives (Applying $\nabla$ Twice)

Gradient, divergence, and curl are the only first derivatives we can make with $\nabla$  
By applying $\nabla$ twice, we can construct five species of second derivatives

- Divergence of gradient $\nabla\cdot(\nabla T)$
- Curl of gradient $\nabla\times(\nabla T)$
- Gradient of divergence $\nabla(\nabla\cdot v)$
- Divergence of curl $\nabla\cdot(\nabla\times v)$
- Curl of curl $\nabla\times(\nabla\times v)$

### A. Laplacian (divergence of a gradient)

$$
\begin{aligned}
\nabla\cdot(\nabla T)
&=\left(\hat x\frac{\partial}{\partial x}+\hat y\frac{\partial}{\partial y}+\hat z\frac{\partial}{\partial z}\right)\cdot\left(\frac{\partial T}{\partial x}\hat x+\frac{\partial T}{\partial y}\hat y+\frac{\partial T}{\partial z}\hat z\right)\\
&=\frac{\partial^2T}{\partial x^2}+\frac{\partial^2T}{\partial y^2}+\frac{\partial^2T}{\partial z^2}
\end{aligned}
$$

> [!definition|1.2.12] Laplacian of a scalar
> This object is written as $\nabla^2T$ and is called the **Laplacian** of $T$
> $$
> \nabla^2T=\frac{\partial^2T}{\partial x^2}+\frac{\partial^2T}{\partial y^2}+\frac{\partial^2T}{\partial z^2}
> $$

Sometimes we also speak of the Laplacian of a vector $\nabla^2v$ meaning “apply $\nabla^2$ to each component”
$$
\nabla^2v=(\nabla^2v_x)\hat x+(\nabla^2v_y)\hat y+(\nabla^2v_z)\hat z
$$

### B. Two always-zero identities

> [!theorem|1.2.13] Curl of a gradient
> $$
> \nabla\times(\nabla T)=0
> $$

A key reason is the equality of cross derivatives
$$
\frac{\partial}{\partial x}\left(\frac{\partial T}{\partial y}\right)=\frac{\partial}{\partial y}\left(\frac{\partial T}{\partial x}\right)
$$

> [!theorem|1.2.14] Divergence of a curl
> $$
> \nabla\cdot(\nabla\times v)=0
> $$

### C. Curl of curl identity

> [!theorem|1.2.15] Curl of curl
> $$
> \nabla\times(\nabla\times v)=\nabla(\nabla\cdot v)-\nabla^2v
> $$

### D. What’s “new” at second order

- $\nabla^2T$ (Laplacian) is fundamental and appears everywhere
- $\nabla(\nabla\cdot v)$ (gradient of the divergence) occurs less often
- The other combinations either vanish identically or reduce to these via identities
