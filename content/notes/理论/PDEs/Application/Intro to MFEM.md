

## Finite Element "Hello World!"

## Poisson Equation

## The Poisson Equation and the Finite Element Discretization

The Poisson equation is a partial differential equation (PDE) used in modeling, e.g.: steady-state heat conduction, electrostatics, gravitational fields.

Problem: Find $u$ such that

$$
-\Delta u=f \quad \text { in } \Omega, \quad u=0 \quad \text { on } \partial \Omega
$$

Weak Form: Find $u \in V_{h}$ such that

$$
\int_{\Omega} \nabla u \cdot \nabla v \, d\Omega=\int_{\Omega} f v \, d\Omega \quad \forall v \in V_{h}
$$

Algebraic Form: after discretization, solve the linear system

$$
A x=b
$$

## Basic FE Steps (2-5 in MFEM)

1. Discretize the computational domain (meshing) ⇒ external meshing software
2. Derive the weak form for your PDE problem
3. Assemble global system
4. Apply boundary conditions
5. Solve the linear system
6. Postprocessing and visualization ⇒ ParaView, GLVis, VisIt

Implemented in `tutorial_emory_01.cpp` in the example folder, and original tutorial at `https://mfem.org/tutorial/fem/`.

## Convergence Analysis

## Convergence Analysis

- Verify numerical accuracy by computing errors against the exact solution:

$$
\left\|u-u_{h}\right\|_{L^{2}}, \quad\left\|u-u_{h}\right\|_{H^{1}}
$$

- Evaluate convergence rates as the mesh is refined:

$$
r \approx \frac{\log \left(e_{h_{2}} / e_{h_{1}}\right)}{\log \left(h_{2} / h_{1}\right)}
$$

- Expected behavior for polynomial order $p$:

$$
\left\|u-u_{h}\right\|_{L^{2}}=O\left(h^{p+1}\right), \quad\left\|u-u_{h}\right\|_{H^{1}}=O\left(h^{p}\right)
$$

Implemented in `tutorial_emory_01_convergence.cpp` in the example folder, and original tutorial at `mfem-convergence-xsdk`.

## Partial Assembly

- High-order FEM ⇒ large, dense matrices
- PA avoids global matrix assembly
- Applies element operators on-the-fly
- Faster, memory-efficient, GPU-friendly

$$
A=P^{T} G^{T} B^{T} D B G P
$$

Global true dofs  
![](https://cdn.mathpix.com/cropped/d684899b-ce8b-4274-ac75-d8bb80b66e0b-19.jpg?height=242&width=246&top_left_y=483&top_left_x=209)

T-vector

Local subdomain dofs  
![](https://cdn.mathpix.com/cropped/d684899b-ce8b-4274-ac75-d8bb80b66e0b-19.jpg?height=239&width=338&top_left_y=484&top_left_x=446)

L-vector

Element dofs  
![](https://cdn.mathpix.com/cropped/d684899b-ce8b-4274-ac75-d8bb80b66e0b-19.jpg?height=247&width=236&top_left_y=478&top_left_x=777)

E-vector

Quadrature point values  
![](https://cdn.mathpix.com/cropped/d684899b-ce8b-4274-ac75-d8bb80b66e0b-19.jpg?height=242&width=340&top_left_y=483&top_left_x=1015)

Q-vector

Implemented in `tutorial_emory_01_pa.cpp` in the example folder.

## Heat Transfer

## Transient Heat Diffusion

Physics: transient diffusion (parabolic PDE).

$$
\rho c \frac{\partial u}{\partial t}=\nabla \cdot(\kappa \nabla u)+f
$$

where $u$ is temperature, $\kappa$ is thermal conductivity, $\rho c_{p}$ is volumetric heat capacity, and $f$ is a heat source.

## Boundary Conditions (BCs)

- Dirichlet: fixed temperature $u=u_{D}$ on $\Gamma_{D}$
- Neumann: prescribed heat flux $\kappa \nabla u \cdot \mathbf{n}=g$ on $\Gamma_{N}$  
  ![](https://cdn.mathpix.com/cropped/d684899b-ce8b-4274-ac75-d8bb80b66e0b-21.jpg?height=572&width=651&top_left_y=135&top_left_x=879)
- Robin: convective cooling $\kappa \nabla u \cdot \mathbf{n}=h\left(u_{\infty}-u\right)$ on $\Gamma_{R}$

## Time Integration in MFEM

Spatial discretization (Galerkin FEM) turns the PDE into a semi-discrete ODE system:

$$
M \frac{d u}{d t}=F(u, t), \quad F(u, t)=-K u+f(t)
$$

where $M$ is the mass matrix, $K$ is the stiffness matrix.

## Explicit Schemes

- Evaluate $F$, invert $M$
- Implemented via `TimeDependentOperator::Mult`
- Simple but CFL-limited step size

## Implicit Schemes

- Each stage solves $M k=F(u+\gamma k, t)$
- Implemented via `TimeDependentOperator::ImplicitSolve`
- Unconditionally stable for linear problems

MFEM provides a broad `ODESolver` menu: explicit/implicit Runge-Kutta, Adams-Bashforth/Moulton, SDIRK, IMEX, symplectic, ...

## The `TimeDependentOperator` Interface

Users subclass `TimeDependentOperator` and implement:

1. `Mult(u, k)`: compute

$$
k \leftarrow M^{-1} F(u, t)
$$

(explicit)

2. `ImplicitSolve(\gamma, u, k)`: solve $(M+\gamma K) k=F(u, t)$ for $k$

(implicit)

```cpp
class HeatOperator
    : public TimeDependentOperator {
public:
    // Explicit: k = M^{-1} F(u)
    void Mult(const Vector &u,
            Vector &k) const override;
    // Implicit: solve (M + gamma*K) k = F
    void ImplicitSolve(
        const real_t gamma,
        const Vector &u,
        Vector &k) override;
};
```

The time integrator calls only these two methods—it is agnostic of the underlying physics.

| ODESolver | Requires |
| :--- | :--- |
| RK4, AB2, ... | Mult only |
| BE, CN, SDIRK, ... | ImplicitSolve |

## ex16: Geometry and Problem Setup

- Domain: unit square / cube mesh (structured quad/hex, refinable)
- Initial condition: $u_{0}(x)=\exp \left(-40\left\|x-x_{0}\right\|^{2}\right)$ - Gaussian hot spot
- BCs: Homogeneous Neumann on all boundaries ( $u=0$ )
- Integrator: selectable at runtime (`-s` flag); default is SDIRK-3
- Solver: $H^{1}$ CG elements, PCG + BoomerAMG preconditioner for the implicit step

`tutorial_emory_02.cpp` demonstrates the full workflow.

## Linear Elasticity

## Femur Geometry

- Geometry Source: STL geometry, segmented from medical imaging data
- Meshing: generated using Coreform Cubit advanced hex/tet meshing software
- Boundaries manually marked in Coreform Cubit

Implemented in `tutorial_emory_03.cpp` in the example folder.  
![](https://cdn.mathpix.com/cropped/d684899b-ce8b-4274-ac75-d8bb80b66e0b-26.jpg?height=703&width=724&top_left_y=135&top_left_x=808)

## Linear Elasticity on a Femur

Physics: static elasticity (small strain, linear material).

$$
\nabla \cdot \sigma=0
$$

where

$$
\sigma(\mathbf{u})=\lambda \operatorname{div}(\mathbf{u}) I+\mu\left(\nabla \mathbf{u}+\nabla \mathbf{u}^{T}\right)
$$

is the stress tensor corresponding to displacement field $\mathbf{u}$, and $\lambda$ and $\mu$ are the material Lamé constants.

## Boundary Conditions (BCs)

- Fixed Base: zero displacement at the bottom surface
- Applied Load: force distributed on femoral head $\sigma(\mathbf{u}) \cdot \mathbf{n}=\mathbf{f}$
- Unloaded: femoral side $\sigma(\mathbf{u}) \cdot \mathbf{n}=\mathbf{0}$  
  ![](https://cdn.mathpix.com/cropped/d684899b-ce8b-4274-ac75-d8bb80b66e0b-27.jpg?height=701&width=210&top_left_y=139&top_left_x=1273)
