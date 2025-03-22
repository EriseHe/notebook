### PDE and Schemes

$$\frac{\partial u}{\partial t} + a\frac{\partial u}{\partial x} = 0$$
#### In red:
$$\frac{\partial u}{\partial t} = -a\frac{\partial u}{\partial x} \\
\frac{\partial^2 u}{\partial t^2} = a^2 \frac{\partial^2 u}{\partial x^2}$$
#### Diagram:
- Horizontal axis: spatial dimension (x), initial position $x_0$
- Vertical axis: variable $u$
- Curves indicating wave propagation:
  - $a > 0$, propagation towards positive $x$-direction.
  - $a < 0$, propagation towards negative $x$-direction.
#### Equations and Schemes:
- **Characteristic equation:**
$$\frac{dx}{dt} = a,\quad x(0)=x_0$$

- **Backward Euler (BE-C):**
$$\frac{u_j^{n+1}-u_j^n}{\Delta t} + a\frac{u_j^{n+1}-u_{j-1}^{n+1}}{\Delta x} = 0$$

- **Upwind (UPW):**
$$\frac{u_j^{n+1}-u_j^n}{\Delta t} + a\frac{u_j^n-u_{j-1}^n}{\Delta x}=0,\quad a\geq0$$

- **Lax–Wendroff (LW):**
$$\frac{u_j^{n+1}-u_j^n}{\Delta t} + a\frac{u_{j+1}^n-u_{j-1}^n}{2\Delta x} - \frac{a^2\Delta t}{2}\frac{u_{j+1}^n-2u_j^n+u_{j-1}^n}{\Delta x^2}=0$$
