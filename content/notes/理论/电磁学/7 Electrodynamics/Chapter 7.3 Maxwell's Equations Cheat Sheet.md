# Chapter 7.3 — Maxwell's Equations
## Exam-Focused Notes
## 7.3.1 Electrodynamics before Maxwell
## 7.3.2 How Maxwell Fixed Ampère's Law
## 7.3.3 Maxwell's Equations
## 7.3.4 Magnetic Charge
## 7.3.5 Maxwell's Equations in Matter
## 7.3.6 Boundary Conditions

## Big picture

This section is the conceptual climax of the course.

Before Maxwell, you had:

- Gauss's law
- $\nabla\cdot \mathbf B=0$
- Faraday's law
- Ampère's law in magnetostatics

The problem was that old Ampère's law failed for **nonsteady current**.

Maxwell fixed that by adding the **displacement current** term, and then everything became consistent:

- charge conservation works
- capacitor problems work
- electromagnetic waves become possible

So for exams, the main goals are:

1. know the **four Maxwell equations**
2. know **why** the displacement-current term is needed
3. know when to use the **vacuum form** vs the **matter form**
4. know the **boundary conditions**
5. know how to read physical information from divergence/curl equations

---

## 7.3.1 Electrodynamics before Maxwell

## What you had before the correction

The old set was essentially:

$$
\nabla\cdot \mathbf E = \frac{\rho}{\epsilon_0}
$$

$$
\nabla\cdot \mathbf B = 0
$$

$$
\nabla\times \mathbf E = -\frac{\partial \mathbf B}{\partial t}
$$

$$
\nabla\times \mathbf B = \mu_0 \mathbf J
\qquad \text{(old Ampère law)}
$$

This last equation works in **magnetostatics**, where currents are steady.

---

## Exact exam trigger: when old Ampère's law is safe

Use
$$
\nabla\times \mathbf B = \mu_0 \mathbf J
$$
only when the situation is genuinely **steady current / magnetostatics**, meaning:

- currents are time-independent
- charge is not piling up anywhere
- capacitor charging is **not** happening
- $\partial \rho/\partial t = 0$
- equivalently, $\nabla\cdot \mathbf J = 0$

If any current is changing with time, or charge is accumulating, the old form is no longer reliable.

---

## The capacitor paradox

This is the key warning example.

If a capacitor is charging, current flows in the wire, but no conduction current crosses the gap between the plates.

Now take an Ampèrian loop around the wire.

If you use one spanning surface, the wire pierces it, so you get enclosed current $I$.

If you use a different bulging surface through the capacitor gap, no wire pierces it, so you get enclosed current $0$.

So old Ampère's law gives two different answers for the same loop.

That is impossible.

### What condition should you look for on an exam?

If the problem has:

- a **charging capacitor**
- **time-varying current**
- a loop where different surfaces give different enclosed conduction current
- charge buildup on plates or surfaces

then the old Ampère law is wrong, and you must use **Ampère-Maxwell law**.

---

## 7.3.2 How Maxwell Fixed Ampère's Law

## The key inconsistency

Take divergence of old Ampère law:
$$
\nabla\cdot(\nabla\times \mathbf B)=\mu_0 \nabla\cdot \mathbf J
$$

But
$$
\nabla\cdot(\nabla\times \mathbf B)=0
$$

So old Ampère law implies
$$
\nabla\cdot \mathbf J=0
$$

But in electrodynamics, continuity says
$$
\nabla\cdot \mathbf J = -\frac{\partial \rho}{\partial t}
$$

So if $\rho$ changes in time, then $\nabla\cdot \mathbf J\neq 0$, and old Ampère law fails.

---

## Maxwell's fix

Using Gauss's law,
$$
\rho=\epsilon_0 \nabla\cdot \mathbf E
$$

so
$$
\nabla\cdot \mathbf J
=
-\frac{\partial \rho}{\partial t}
=
-\epsilon_0 \frac{\partial}{\partial t}(\nabla\cdot \mathbf E)
=
-\nabla\cdot\left(\epsilon_0 \frac{\partial \mathbf E}{\partial t}\right)
$$

So if we replace $\mathbf J$ by
$$
\mathbf J + \epsilon_0 \frac{\partial \mathbf E}{\partial t}
$$
then the divergence problem disappears.

This gives the corrected law:
$$
\boxed{
\nabla\times \mathbf B
=
\mu_0 \mathbf J + \mu_0\epsilon_0 \frac{\partial \mathbf E}{\partial t}
}
$$

---

## Displacement current

Maxwell called
$$
\boxed{
\mathbf J_d \equiv \epsilon_0 \frac{\partial \mathbf E}{\partial t}
}
$$
the **displacement current density**

So the corrected Ampère law can be written as
$$
\nabla\times \mathbf B = \mu_0(\mathbf J+\mathbf J_d)
$$

---

## What displacement current means

It is **not** ordinary charge flow through matter.

It is not conduction current.

It is the extra term required so that a **changing electric field** can act as a source of magnetic field.

---

## Exact exam trigger: when to use displacement current explicitly

Use
$$
\mathbf J_d=\epsilon_0 \frac{\partial \mathbf E}{\partial t}
$$
when the problem gives:

- a **capacitor gap**
- time-varying electric field between plates
- asks for “displacement current density” or “total displacement current”
- compares conduction current with displacement current
- asks you to repair the Ampère-law paradox

---

## Concrete pattern to look for

If the problem gives:
- capacitor plate area $A$
- electric field $E(t)$ between plates

then
$$
\mathbf J_d = \epsilon_0 \frac{\partial \mathbf E}{\partial t}
$$

and the total displacement current is
$$
I_d = \int \mathbf J_d\cdot d\mathbf a
$$

If $\mathbf J_d$ is uniform over the plate area,
$$
I_d = \epsilon_0 A \frac{dE}{dt}
$$

This is the exact quantity that replaces the missing conduction current in the capacitor gap.

---

## Physical sentence to memorize

> A changing magnetic field induces an electric field, and a changing electric field induces a magnetic field

That is the symmetry Maxwell restored.

---

## 7.3.3 Maxwell's Equations

## The four equations in vacuum

$$
\boxed{
\nabla\cdot \mathbf E = \frac{\rho}{\epsilon_0}
}
\qquad \text{(Gauss's law)}
$$

$$
\boxed{
\nabla\cdot \mathbf B = 0
}
$$

$$
\boxed{
\nabla\times \mathbf E = -\frac{\partial \mathbf B}{\partial t}
}
\qquad \text{(Faraday's law)}
$$

$$
\boxed{
\nabla\times \mathbf B = \mu_0 \mathbf J + \mu_0\epsilon_0 \frac{\partial \mathbf E}{\partial t}
}
\qquad \text{(Ampère-Maxwell law)}
$$

Together with the Lorentz force law,
$$
\boxed{
\mathbf F = q(\mathbf E+\mathbf v\times \mathbf B)
}
$$
they summarize classical electrodynamics.

---

## Griffiths' source-first form

Griffiths also likes writing them as
$$
\boxed{
\nabla\cdot \mathbf E = \frac{\rho}{\epsilon_0},
\qquad
\nabla\cdot \mathbf B = 0,
\qquad
\nabla\times \mathbf E + \frac{\partial \mathbf B}{\partial t}=0,
\qquad
\nabla\times \mathbf B - \mu_0\epsilon_0 \frac{\partial \mathbf E}{\partial t} = \mu_0 \mathbf J
}
$$

This emphasizes:

- fields on the left
- sources on the right

---

## Continuity equation

A major fact:
$$
\boxed{
\nabla\cdot \mathbf J = -\frac{\partial \rho}{\partial t}
}
$$

This is not separate new physics here; it follows from Maxwell's equations.

---

## Exact exam trigger: when to start from the full Maxwell equations

Use the full set when the problem mentions:

- time-dependent electric and magnetic fields
- capacitor charging
- induced fields
- wave propagation
- matter response with $\mathbf D,\mathbf H$
- boundary jumps across surfaces

If the problem is purely electrostatics or magnetostatics, you usually only need the reduced subset.

---

## How to read each equation physically

### 1. Gauss's law
$$
\nabla\cdot \mathbf E = \frac{\rho}{\epsilon_0}
$$
Look for this when:
- charges are given
- symmetry suggests Gaussian surfaces
- you need normal-field jumps
- you need relation between field divergence and source density

Meaning:
- electric charge is source/sink of $\mathbf E$

---

### 2.
$$
\nabla\cdot \mathbf B = 0
$$
Look for this when:
- asked about magnetic flux
- continuity of $B_\perp$
- impossibility of magnetic monopoles
- field-line interpretation

Meaning:
- magnetic field lines do not begin or end

---

### 3. Faraday's law
$$
\nabla\times \mathbf E = -\frac{\partial \mathbf B}{\partial t}
$$
Look for this when:
- changing magnetic field induces electric field
- induced electric field loops
- tangential $\mathbf E$ relation at boundaries
- Chapter 7.2 style induction problems

Meaning:
- time-changing $\mathbf B$ creates circulating $\mathbf E$

---

### 4. Ampère-Maxwell law
$$
\nabla\times \mathbf B = \mu_0 \mathbf J + \mu_0\epsilon_0\frac{\partial \mathbf E}{\partial t}
$$
Look for this when:
- current and changing electric field both may source $\mathbf B$
- charging capacitor
- displacement current
- tangential $H$ or $B$ at boundaries

Meaning:
- magnetic field can come from either conduction current or changing electric field

---

## Integral forms

These are often more useful on exams than the differential forms.

### Vacuum integral forms
$$
\boxed{
\oint_S \mathbf E\cdot d\mathbf a = \frac{Q_{\text{enc}}}{\epsilon_0}
}
$$

$$
\boxed{
\oint_S \mathbf B\cdot d\mathbf a = 0
}
$$

$$
\boxed{
\oint_P \mathbf E\cdot d\mathbf l = -\frac{d}{dt}\int_S \mathbf B\cdot d\mathbf a
}
$$

$$
\boxed{
\oint_P \mathbf B\cdot d\mathbf l
=
\mu_0 I_{\text{enc}}
+
\mu_0\epsilon_0 \frac{d}{dt}\int_S \mathbf E\cdot d\mathbf a
}
$$

---

## Exact exam trigger: differential form vs integral form

### Use differential form when:
- local source density $\rho,\mathbf J$ is given
- asked to verify Maxwell equations
- asked for divergence/curl directly
- checking whether a proposed field is valid

### Use integral form when:
- there is symmetry
- boundary conditions are involved
- total enclosed charge/current is easier than pointwise calculation
- loop/surface wording appears explicitly

---

## 7.3.4 Magnetic Charge

## The symmetric hypothetical form

If magnetic charge existed, Maxwell's equations would look more symmetric:
$$
\nabla\cdot \mathbf E = \frac{\rho_e}{\epsilon_0}
$$

$$
\nabla\cdot \mathbf B = \mu_0 \rho_m
$$

$$
\nabla\times \mathbf E = -\mu_0 \mathbf J_m - \frac{\partial \mathbf B}{\partial t}
$$

$$
\nabla\times \mathbf B = \mu_0 \mathbf J_e + \mu_0\epsilon_0 \frac{\partial \mathbf E}{\partial t}
$$

But physically, as far as the textbook is concerned,
$$
\rho_m = 0,
\qquad
\mathbf J_m = 0
$$

So in actual classical electrodynamics, magnetic monopoles are absent.

---

## Exact exam trigger

Usually this subsection is conceptual, not computational.

If the exam asks:
- Why is $\nabla\cdot \mathbf B=0$ special?
- Why are $\mathbf E$ and $\mathbf B$ not fully symmetric?
- What would Maxwell's equations look like with magnetic charge?

then this is the section.

The one thing to remember:
> electric charges exist as isolated sources; magnetic charges do not, in standard theory

---

## 7.3.5 Maxwell's Equations in Matter

## Why rewrite them?

Inside matter, you have polarization and magnetization, so total charge/current split into free and bound parts.

The key decompositions are:

$$
\boxed{
\rho = \rho_f + \rho_b = \rho_f - \nabla\cdot \mathbf P
}
$$

$$
\boxed{
\mathbf J = \mathbf J_f + \mathbf J_b + \mathbf J_p
= \mathbf J_f + \nabla\times \mathbf M + \frac{\partial \mathbf P}{\partial t}
}
$$

where:

- $\rho_f,\mathbf J_f$ = free charge/current
- $\rho_b$ = bound charge
- $\mathbf J_b$ = magnetization current
- $\mathbf J_p$ = polarization current

---

## Definitions of $\mathbf D$ and $\mathbf H$

$$
\boxed{
\mathbf D \equiv \epsilon_0 \mathbf E + \mathbf P
}
$$

$$
\boxed{
\mathbf H \equiv \frac{1}{\mu_0}\mathbf B - \mathbf M
}
$$

---

## Maxwell equations in matter

$$
\boxed{
\nabla\cdot \mathbf D = \rho_f
}
$$

$$
\boxed{
\nabla\cdot \mathbf B = 0
}
$$

$$
\boxed{
\nabla\times \mathbf E = -\frac{\partial \mathbf B}{\partial t}
}
$$

$$
\boxed{
\nabla\times \mathbf H = \mathbf J_f + \frac{\partial \mathbf D}{\partial t}
}
$$

---

## Exact exam trigger: when to use the matter form

Use $\mathbf D,\mathbf H$ when the problem gives:

- dielectric or magnetic medium
- free charge density $\rho_f$
- free current density $\mathbf J_f$
- polarization $\mathbf P$
- magnetization $\mathbf M$
- susceptibility/permittivity/permeability
- boundary between media

If the problem explicitly distinguishes **free** vs **bound** charges/currents, you should almost certainly use $\mathbf D$ and $\mathbf H$.

---

## When not to use the matter form

If the problem is just vacuum, air, or ordinary source charges/currents without material response, the vacuum form is usually cleaner.

Also, Griffiths emphasizes that the $\mathbf D,\mathbf H$ version is not “more general.” It is just a useful regrouping.

---

## Linear media relations

For linear media,
$$
\mathbf P = \epsilon_0 \chi_e \mathbf E
$$

$$
\mathbf M = \chi_m \mathbf H
$$

so
$$
\boxed{
\mathbf D = \epsilon \mathbf E
}
$$

$$
\boxed{
\mathbf H = \frac{1}{\mu}\mathbf B
}
$$

with
$$
\epsilon = \epsilon_0(1+\chi_e),
\qquad
\mu = \mu_0(1+\chi_m)
$$

---

## Displacement current in matter

In matter form, the displacement current density is
$$
\boxed{
\mathbf J_d \equiv \frac{\partial \mathbf D}{\partial t}
}
$$

This is the version you use in materials.

---

## Exact exam trigger: how to know whether to use
$$
\epsilon_0 \frac{\partial \mathbf E}{\partial t}
\quad \text{or} \quad
\frac{\partial \mathbf D}{\partial t}
$$

### Use
$$
\epsilon_0 \frac{\partial \mathbf E}{\partial t}
$$
in vacuum form

### Use
$$
\frac{\partial \mathbf D}{\partial t}
$$
in matter form, especially when medium properties are given

If the problem gives $\epsilon,\mu,\chi_e,\chi_m$, it is signaling the matter form.

---

## 7.3.6 Boundary Conditions

This is one of the highest-yield exam parts of the chapter.

## The four boundary conditions

Across an interface:

### Normal component of $\mathbf D$
$$
\boxed{
D_{\perp,\text{above}} - D_{\perp,\text{below}} = \sigma_f
}
$$

### Normal component of $\mathbf B$
$$
\boxed{
B_{\perp,\text{above}} - B_{\perp,\text{below}} = 0
}
$$

### Tangential component of $\mathbf E$
$$
\boxed{
\mathbf E_{\parallel,\text{above}} - \mathbf E_{\parallel,\text{below}} = 0
}
$$

### Tangential component of $\mathbf H$
$$
\boxed{
\mathbf H_{\parallel,\text{above}} - \mathbf H_{\parallel,\text{below}} = \mathbf K_f \times \hat{\mathbf n}
}
$$

where:

- $\sigma_f$ = free surface charge density
- $\mathbf K_f$ = free surface current density
- $\hat{\mathbf n}$ = unit normal from “below” to “above”

---

## Exact exam trigger: when to use each one

### Use
$$
D_{\perp,\text{above}} - D_{\perp,\text{below}} = \sigma_f
$$
when:
- problem gives free surface charge density
- asks for normal electric-field jump across interface
- dielectric boundary problem

If medium is linear and isotropic, translate with $\mathbf D=\epsilon \mathbf E$.

---

### Use
$$
B_{\perp,\text{above}} - B_{\perp,\text{below}} = 0
$$
when:
- asked whether normal $B$ changes at boundary
- magnetic interface questions
- checking consistency of a proposed field

This one is always continuous because $\nabla\cdot \mathbf B=0$.

---

### Use
$$
\mathbf E_{\parallel,\text{above}} = \mathbf E_{\parallel,\text{below}}
$$
when:
- you need tangential electric field at boundary
- dielectric interface
- electromagnetic wave boundary matching
- conductor surface limit

This one is continuous in the infinitesimal-loop limit.

---

### Use
$$
\mathbf H_{\parallel,\text{above}} - \mathbf H_{\parallel,\text{below}} = \mathbf K_f\times \hat{\mathbf n}
$$
when:
- a surface current density is present
- current sheet
- magnetic-field jump at conducting sheet
- wave/interface problems with sheet current

If there is no free surface current,
$$
\mathbf H_{\parallel,\text{above}} = \mathbf H_{\parallel,\text{below}}
$$

---

## Very important special cases

### No free surface charge
If $\sigma_f=0$, then
$$
D_{\perp,\text{above}} = D_{\perp,\text{below}}
$$

### No free surface current
If $\mathbf K_f=0$, then
$$
\mathbf H_{\parallel,\text{above}} = \mathbf H_{\parallel,\text{below}}
$$

These are the versions used most often.

---

## Converting to $\mathbf E$ and $\mathbf B$ in linear media

If the media are linear,
$$
\mathbf D = \epsilon \mathbf E,
\qquad
\mathbf H = \frac{1}{\mu}\mathbf B
$$

So the boundary conditions become:

### Normal electric condition
$$
\boxed{
\epsilon_1 E_{1\perp} - \epsilon_2 E_{2\perp} = \sigma_f
}
$$

If $\sigma_f=0$:
$$
\boxed{
\epsilon_1 E_{1\perp} = \epsilon_2 E_{2\perp}
}
$$

### Tangential magnetic condition
$$
\boxed{
\frac{\mathbf B_{1\parallel}}{\mu_1} - \frac{\mathbf B_{2\parallel}}{\mu_2}
=
\mathbf K_f \times \hat{\mathbf n}
}
$$

If $\mathbf K_f=0$:
$$
\boxed{
\frac{\mathbf B_{1\parallel}}{\mu_1}
=
\frac{\mathbf B_{2\parallel}}{\mu_2}
}
$$

---

## Exact exam trigger: pillbox vs loop

When deriving or choosing boundary conditions:

### Use a thin pillbox when the quantity is a divergence law
That means:
- Gauss for $\mathbf D$
- Gauss for $\mathbf B$

So pillbox gives normal-component jumps.

### Use a thin loop when the quantity is a curl law
That means:
- Faraday for $\mathbf E$
- Ampère-Maxwell for $\mathbf H$

So loop gives tangential-component jumps.

This is a very common conceptual exam question.

---

## High-yield strategy summary

## If problem asks “which field component is continuous?”

Remember:

- divergence equations control **normal** components
- curl equations control **tangential** components

So:
- $\nabla\cdot \mathbf D$ gives jump in $D_\perp$
- $\nabla\cdot \mathbf B$ gives continuity of $B_\perp$
- $\nabla\times \mathbf E$ gives continuity of $E_\parallel$
- $\nabla\times \mathbf H$ gives jump in $H_\parallel$

---

## If problem involves a charging capacitor

Think immediately:

1. old Ampère law fails
2. use displacement current
3. in vacuum:
   $$
   \mathbf J_d=\epsilon_0\frac{\partial \mathbf E}{\partial t}
   $$
4. total Ampère-Maxwell source is conduction plus displacement current

---

## If problem gives medium data like $\epsilon,\mu,\chi_e,\chi_m$

Think immediately:

- use $\mathbf D,\mathbf H$
- maybe convert with
  $$
  \mathbf D=\epsilon \mathbf E,\qquad \mathbf H=\frac{1}{\mu}\mathbf B
  $$

---

## If problem asks whether some proposed fields satisfy Maxwell

Checklist:

### Check Gauss-electric:
$$
\nabla\cdot \mathbf E \stackrel{?}{=} \frac{\rho}{\epsilon_0}
$$

### Check Gauss-magnetic:
$$
\nabla\cdot \mathbf B \stackrel{?}{=} 0
$$

### Check Faraday:
$$
\nabla\times \mathbf E \stackrel{?}{=} -\frac{\partial \mathbf B}{\partial t}
$$

### Check Ampère-Maxwell:
$$
\nabla\times \mathbf B \stackrel{?}{=} \mu_0 \mathbf J + \mu_0\epsilon_0 \frac{\partial \mathbf E}{\partial t}
$$

And if needed:
$$
\nabla\cdot \mathbf J \stackrel{?}{=} -\frac{\partial \rho}{\partial t}
$$

---

## One-page memory sheet

$$
\nabla\cdot \mathbf E = \frac{\rho}{\epsilon_0}
$$

$$
\nabla\cdot \mathbf B = 0
$$

$$
\nabla\times \mathbf E = -\frac{\partial \mathbf B}{\partial t}
$$

$$
\nabla\times \mathbf B = \mu_0 \mathbf J + \mu_0\epsilon_0 \frac{\partial \mathbf E}{\partial t}
$$

$$
\mathbf J_d = \epsilon_0 \frac{\partial \mathbf E}{\partial t}
$$

$$
\mathbf F = q(\mathbf E+\mathbf v\times \mathbf B)
$$

$$
\nabla\cdot \mathbf J = -\frac{\partial \rho}{\partial t}
$$

$$
\rho = \rho_f - \nabla\cdot \mathbf P
$$

$$
\mathbf J = \mathbf J_f + \nabla\times \mathbf M + \frac{\partial \mathbf P}{\partial t}
$$

$$
\mathbf D = \epsilon_0 \mathbf E + \mathbf P
$$

$$
\mathbf H = \frac{1}{\mu_0}\mathbf B - \mathbf M
$$

$$
\nabla\cdot \mathbf D = \rho_f
$$

$$
\nabla\times \mathbf H = \mathbf J_f + \frac{\partial \mathbf D}{\partial t}
$$

$$
\mathbf D = \epsilon \mathbf E
\qquad
\mathbf H = \frac{1}{\mu}\mathbf B
$$

$$
D_{\perp,\text{above}} - D_{\perp,\text{below}} = \sigma_f
$$

$$
B_{\perp,\text{above}} - B_{\perp,\text{below}} = 0
$$

$$
\mathbf E_{\parallel,\text{above}} - \mathbf E_{\parallel,\text{below}} = 0
$$

$$
\mathbf H_{\parallel,\text{above}} - \mathbf H_{\parallel,\text{below}} = \mathbf K_f \times \hat{\mathbf n}
$$