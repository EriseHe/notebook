# Lecture Notes - Week 10 (03/18/2025)

## Chapter 9 Overview

### Sections Covered:
- **9.1**: Reading  
- **9.2**: Introduction  
  - 9.2.1  
  - 9.2.2  
  - 9.2.4  
  - 9.2.5 *(Only the statement needed)*  
  - 9.2.6  

### Exercises:
- Exercise **9.3**  
- Exercise **9.5** *(recommended for coding practice)*  

---

## Section 9.3: Wave Equation

### PDE:
$$
\frac{\partial u}{\partial t} + a\frac{\partial u}{\partial x} = 0
$$

### Domain & Initial Conditions:
- $x \in \mathbb{R}, \quad t > 0$  
- Initial condition:  
$$
u(x, 0) = u_0(x)
$$

### Characteristics Method:
- Characteristic curves defined by:  
$$
\frac{dx}{dt} = a,\quad x(0) = x_0 \implies x = at + x_0
$$

- Along characteristics:  
$$
\frac{du}{dt} = \frac{\partial u}{\partial t} + a \frac{\partial u}{\partial x} = 0
$$

Thus, $u$ remains constant along these lines.

### Solution form:
$$
u(x, t) = u_0(x - at)
$$

---

## PDE Discretization & Matrix Formulation

Given PDEs:

$$
x - \mu'' = f
$$

$$
-\mu u'' + \beta u = f
$$

### Discretized Form (Finite Differences):
$$
-\mu \frac{u_{i+1} - 2u_i + u_{i-1}}{\Delta x^2} + \frac{\kappa}{T} u_i = f_i
$$

### Matrix Formulation:
$$
\left[ A + \frac{\kappa}{T} I \right] u = f
$$

---

**Notes:**  
- Focus on Exercise **9.5** for coding practice.  
- Master both analytical (characteristics) and numerical (matrix formulation) methods.  