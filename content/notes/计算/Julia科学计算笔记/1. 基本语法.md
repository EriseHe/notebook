---
title: "1. 基本语法"
lecture:
---

# Summary of Key Julia Codes and Algorithms by Chapter

This document summarizes the main ideas, codes, and algorithms from the provided PDF. Each section begins with the high-level purpose of the chapter and ends with code snippets and algorithmic highlights. Citations point back to the relevant parts of the PDF for further reading.

# 0. Hello, $\pi$ ! Julia as a second programming language

Context: The opening chapter introduces Julia as a modern, dynamic language and demonstrates how to set up the REPL, manage packages, and write a small program to compute $\pi$. The emphasis is on exploring the language environment and using Julia to perform simple tasks.

1. Installing and working with Julia - The notes recommend using juliaup for installation. Within the REPL, pressing ? enters help mode and ] enters package mode, allowing you to add or update packages. The author suggests creating a ~/.julia/config/startup.jl file to automatically load useful packages like Revise, BenchmarkTools and OhMyREPL. The startup file checks whether the session is interactive before importing these packages.
```
# ~/.julia/config/startup.jl
if isinteractive()
    try
        using Revise # auto-reload modules on change
        using BenchmarkTools # easy performance measurement
        using OhMyREPL # colorized and enhanced REPL
    catch
        @warn "Failed to load interactive tools!"
    end
end
```

1. Hello $\boldsymbol{\pi}$ script - A simple Julia program prints a formatted value of $\boldsymbol{\pi}$. This script illustrates how to write and run Julia code from a file and how to import a module (Printf ) from the standard library.
```
# helloPi.jl
# Prints an approximation of \pi to six decimal places
using Printf
@printf "\pi \approx %.6f\n" \pi
```

Save the file as helloPi.jl and run it with julia helloPi.jl. You can also load code into a session using $\square$ include("helloPi.jl") If using Revise, $\square$ includet("helloPi.jl") automatically reloads the file on changes.

1. Starting with the REPL - The REPL supports modes for help ( ? ), package management ( ] ), shell commands $\_\_\_\_$ ), and Julia execution. Take advantage of tab completion and help mode to explore functions, and use the package manager to install tools as needed.

# 2. Variables, primitive types, and functions

Purpose: This chapter introduces Julia's type system, variables, operators, and functions. You learn how Julia's dynamic typing works, how to annotate types, how functions are defined, and how to write loops or vectorized code.

1. Variables and type annotations - Julia variables are dynamically typed: their type is inferred from the value on the right. Type annotations can convert or constrain a value. For instance, the annotation $\square$ : :Float64 converts the result on the right-hand side to a 64-bit float:
```
a::Float64 = 1 + 3 # a becomes 4.0 of type Float64
b = 2 + 1im # complex numbers are supported
c = "Hello" * "!" # * concatenates strings, not +
d = 2 * acos(0) # numerical approximation of }
```

Note: Julia uses * for string concatenation and exponentiation only accepts integer exponents on integers; non-integer exponents yield floating-point results.

1. Defining functions - Functions can be defined in one line or multiple lines. For example, to compute $f(x)=2 \cos ^{-1}(x)$ you can write:
```
f(x) = 2 * acos(x)
# or equivalently
function f(x)
    return 2 * acos(x)
end
```

1. Approximating $\boldsymbol{\pi}$ via Machin's formula - Machin's identity allows $\boldsymbol{\pi}$ to be written in terms of arctangent values. The notes provide a function to approximate arctan by truncating its Taylor series and then use it to compute $\pi$ :
```
# approximate_atan(x, n) returns the nth-order approximation of arctan(x)
function approximate_atan(x, n)
    sum = 0.0
    for k in 0:(n - 1)
        term = (-1)^k * x^(2k + 1) / (2k + 1)
```

```
        sum += term
    end
    return sum
end
function estimate_pi(n)
    # Machin's formula: \pi/4 = 4*arctan(1/5) - arctan(1/239)
    atan1 = approximate_atan(1/5, n)
    atan2 = approximate_atan(1/239, n)
    pi_est = 4 * (4 * atan1 - atan2)
    return pi_est
end
```

Larger $n$ increases accuracy but increases computation time. Using loops like this demonstrates Julia's pass-by-sharing semantics: arrays and mutable objects passed to functions can be modified inside, but numbers and immutable objects cannot.

1. Higher-order functions and broadcasting - Functions in Julia are first-class. You can store them in arrays and apply them to values using loops or broadcasting:
```
square(x) = x^2
cube(x) = x^3
funcs = [square, cube, x -> x^4]
values = [1, 2, 3]
# Apply each function to each value
for f in funcs
    println([f(v) for v in values])
end
```

Broadcasting with the dot syntax applies functions elementwise to collections. For example, sin. (values) computes the sine of each element, and [f.(values) for $f$ in funcs] computes arrays of results.

# 3. Composite types and data structures

Context: Julia's power comes from its rich set of built-in data structures (arrays, dictionaries, sets) and from defining your own types. This chapter explains how to organize data and write efficient numerical algorithms.

1. Tuples and arrays - Tuples are immutable ordered collections (e.g., (1, 1.0, "wow" )), and indexing is 1-based. Arrays (vectors and matrices) are mutable and typed; homogeneous arrays are faster. The functions sort (returns a sorted copy) and sort! (mutates in place) exemplify Julia's convention of appending ! to functions that mutate their arguments.
2. Broadcasting and vectorization - The dot (.) syntax performs elementwise operations: a . +1 adds 1 to every element of vector a , and g. (a) applies the scalar function g to each element. Broadcasting avoids explicit loops and is often faster and more readable.
3. Iteration and comprehensions - Julia uses ranges ( $1: 5$ ) and the range function to iterate. Comprehensions build new collections succinctly; for example, collect(1:0.25:1.5) builds an array of equally spaced numbers, and $\left[x^{\wedge} 2\right.$ for $x$ in $\left.1: 5\right]$ squares integers 1 through 5 . When iterating over arrays or dictionaries, use eachindex(array) for performance or keys(dict)/ values(dict) for associative collections.
4. Defining new types - Use struct for immutable composite types and mutable struct for mutable ones. Fields should be typed for performance, and parametric types allow flexibility. For instance, a particle with a position and mass can be defined as:
```
struct Particle
    mass::Float64
    charge::Float64
    funny_name::String
end
mutable struct ParticlePosition{T}
    x::T; y::T; z::T
end
```

1. Example: polygon geometry - A custom type PolygonVertex holds the coordinates of a vertex. A specialized constructor builds a vertex from a polar angle, and methods overload subtraction to measure distances. The perimeter of an n-gon can then be computed using different styles:
```
struct PolygonVertex
    x::Float64
    y::Float64
end
# Construct from an angle 0 on the unit circle
PolygonVertex(0) = PolygonVertex(cos(莗), sin(麦)
# Define subtraction between vertices
Base.:-(v1::PolygonVertex, v2::PolygonVertex) =
    PolygonVertex(v1.x - v2.x, v1.y - v2.y)
# Euclidean norm for a vertex
norm(v::PolygonVertex) = sqrt(v.x^2 + v.y^2)
# Compute perimeter by looping over edges
function calculate_perimeter(vertices::Vector{PolygonVertex})
```

```
    L = length(vertices)
    perimeter = 0.0
    for i in 1:L
        v1 = vertices[i]
        v2 = vertices[mod1(i+1, L)] # circular indexing
        perimeter += norm(v1 - v2)
    end
    return perimeter
end
# More expressive versions using circshift and mapreduce are given in the notes.
```

1. Archimedes' method (doubling polygons) - To approximate $\pi$, Archimedes' method iteratively doubles the number of polygon sides and updates the side length using the half-angle formula. Using BigInt and BigFloat allows arbitrary precision:
```
function archimedes_pi(iterations)
    # start with a hexagon inscribed in a unit circle
    n = BigInt(6)
    side = BigFloat(sqrt(3)) # side length for hexagon
    for _ in 1:iterations
        # update side length for 2n-gon
        side = sqrt(2 - sqrt(4 - side^2))
        n *= 2
    end
    return n * side / 2 # perimeter/2 approximates }
end
```

1. Documenting functions - Julia supports docstrings written between triple quotes above a definition. Use sections such as \# Arguments, \# Returns, and \# Examples to clarify usage. For instance:
```
"""
perimeter_by_mapreduce(vertices)
Computes the perimeter of a polygon using `mapreduce`.
# Arguments
* `vertices::Vector{PolygonVertex}`: list of vertices in order.
# Returns
* `Float64`: the perimeter of the polygon.
# Examples
```julia
```

```
vertices = [PolygonVertex(0), PolygonVertex(\pi/2), PolygonVertex(\pi)]
perimeter_by_mapreduce(vertices) # expected \approx 3.14159
```

""" function perimeter_by_mapreduce(vertices) \# implementation here end ""

# 4. Data, plots, and visualization

Purpose: This chapter discusses reading and writing data, generating random samples, and visualizing results. It culminates in a Monte Carlo estimation of $\pi$ and introduces Julia's plotting ecosystem.

1. Random point generation - Functions to generate points uniformly in a square of side $L$ and to collect a list of such points are defined as:
```
# Generate one point in a square of side L
generate_point(L) = (rand() * L, rand() * L)
# Generate n random points
function scatter_points(n, box_side)
    return [generate_point(box_side) for _ in 1:n]
end
```

1. File I/O - Write data using open (filename, "w") do io ... end and println or write to output. Read files with open(filename, " $r$ ") do io ... end , eachline(io) for line iteration, or read(io, String) for the full contents. For matrices, the DelimitedFiles module provides writedlm and readdlm:
```
using DelimitedFiles
data = [1 2 3; 4 5 6]
writedlm("data.csv", data, ',')
mat = readdlm("data.csv", ',')
```

1. Plotting with Makie - Julia's plotting libraries separate the front-end API from the back-end renderer. After installing CairoMakie or GLMakie, you can create 2D scatter plots and annotate them. The notes show how to visualize Monte Carlo samples inside and outside the unit circle:
```
using CairoMakie
# predicate: is a point inside the unit circle?
in_unit_circle(p) = (p[1]^2 + p[2]^2) <= 1
# generate points
pts = scatter_points(5000, 1.0)
in_pts = [Point2f(p...) for p in pts if in_unit_circle(p)]
out_pts = [Point2f(p...) for p in pts if !in_unit_circle(p)]
```

```
fig = Figure()
ax = Axis(fig[1, 1], xlabel = "x", ylabel = "y", aspect = 1)
scatter!(ax, in_pts, color = :darkorange, markersize = 2)
scatter!(ax, out_pts, color = :slateblue, markersize = 2)
# draw the unit circle
0 = range(0, 2\pi, length=200)
circle = [Point2f(cos(t), sin(t)) for t in 0]
poly!(ax, circle, color = (:white, 0), strokewidth = 1, strokecolor = :black)
fig
```

1. Monte Carlo estimation of $\boldsymbol{\pi}$ - The proportion of points inside the unit circle (scaled by 4) approximates $\pi$. Two functions implement this approach:
```
# return the proportion of points inside the unit circle
function unit_circle_proportion(points)
    count = 0
    for p in points
        if p[1]^2 + p[2]^2 <= 1
            count += 1
        end
    end
    return count / length(points)
end
# run n trials with m points each and return the mean estimate of \pi
using Statistics
function estimate_pi(m, n)
    estimates = Float64[]
    for _ in 1:n
        pts = scatter_points(m, 1.0)
        prop = unit_circle_proportion(pts)
        push!(estimates, 4 * prop)
    end
    return mean(estimates), var(estimates)
end
```

For improved performance, preallocate arrays and use an in-place generate_point! function to avoid memory allocations.

1. Benchmarking - Use the @btime and @benchmark macros from BenchmarkTools to measure run time and memory allocations. Wrap the code in a function before benchmarking to avoid global scope slowdowns. For example:
```
using BenchmarkTools
@btime estimate_pi(1_000, 20)
```


# 5. Projects, parametric types, and multiple dispatch

Purpose: The final chapter shows how to structure a larger project in Julia, manage dependencies, test your code, define parametric and abstract types, and leverage multiple dispatch. It culminates with a playful algorithm for computing $\pi$ by counting collisions.

1. Creating packages and modules - Use Julia's package manager to generate a new project:
```
using Pkg
Pkg.generate("EventDrivenMolecularDynamics")
```

This creates a folder containing a Project.toml file (listing dependencies) and a src directory with a EventDrivenMolecularDynamics.jl module. Activate the environment by starting Julia in that directory or with ] activate . . Editing the module inside src/ defines functions and types for your simulation. Use Revise to automatically reload changes.

1. Testing - Place tests in the test directory, typically in a file called runtests.jl. Group tests with @testset and write expectations using @test. For approximate comparisons use the $\approx$ operator with an optional tolerance:
```
using Test
@testset "Area calculation" begin
    @test abs(compute_area(2.0) - 3.14159) < 1e-5
    @test isapprox(compute_area(2.0), 3.1415926; atol = 1e-7)
end
```

1. Parametric and abstract types - Parametric types allow data structures to be generic over element types and dimensions. For example:
```
mutable struct ParticlePosition{T}
    x::T; y::T; z::T
end
struct Particle{D,T}
    position::NTuple{D, T}
    velocity::NTuple{D, T}
    mass::T
    radius::T
end
abstract type AbstractObstacle{D,T} end
```

```
struct Hyperplane{D,T} <: AbstractObstacle{D,T}
    normal::NTuple{D, T}
    offset::T
end
struct SphericalObstacle{D,T} <: AbstractObstacle{D,T}
    center::NTuple{D, T}
    radius::T
end
```

Abstract types let you define method hierarchies and make code extensible without specifying all implementation details.

1. Multiple dispatch - Julia dispatches on all argument types, making it straightforward to define functions that behave differently for different combinations of types. For instance, define collisions between particles and obstacles:
```
# Two particles collide and both change state
function collision(p1::Particle{D,T}, p2::Particle{D,T}) where {D,T}
    # compute new positions and velocities (omitted)
    return new_p1, new_p2
end
"""particles colliding with obstacles reflect velocity"""
function collision(p::Particle{D,T}, o::AbstractObstacle{D,T}) where {D,T}
    new_vel = -p.velocity
    new_particle = Particle{D,T}(p.position, new_vel, p.mass, p.radius)
    return new_particle, o
end
# handle reversed argument order by delegating
collision(o::AbstractObstacle{D,T}, p::Particle{D,T}) where {D,T} =
    let new_particle, new_obstacle = collision(p, o)
        (new_obstacle, new_particle)
    end
```

The where $\{\mathrm{D}, \mathrm{T}\}$ clause exposes the type parameters for specialization. Defining functions outside the original type definitions makes the system composable, enabling extension without modifying base types.

1. Counting collisions to compute $\boldsymbol{\pi}$ - A creative algorithm shows that the number of elastic collisions in a mass-ratio billiards problem encodes digits of $\pi$. You set up two particles and an immovable wall, then count collisions until the fast particle escapes. A parametric System\{D, T\} type holds the state, and a function pi_from_pool returns the total number of collisions:
```
mutable struct System{D,T}
    particles::Vector{Particle{D,T}}
    obstacles::Vector{AbstractObstacle{D,T}}
```

```
    total_collisions::Int64
    current_time::Float64
end
function pi_from_pool(mass_ratio::Float64)
    s = pool_pi_initialization(mass_ratio) # initialize positions & velocities
    time_to_next_collision = 0.0
    while time_to_next_collision != Inf
        time_to_next_collision = evolve_step!(s)
    end
    return s.total_collisions
end
```

Running this function with different mass ratios reveals successive digits of $\pi$ in the total collision count:

| mass ratio | collisions | approximation of $\pi$ |
| :--- | :--- | :--- |
| 1 | 3 | 3 |
| 100 | 31 | 3.1 |
| $10^{4}$ | 314 | 3.14 |
| $10^{6}$ | 3141 | 3.141 |
| $10^{8}$ | 31415 | 3.1415 |
| $10^{16}$ | 314159265 | 3.14159265 |

This result is both a fun demonstration of multiple dispatch and an example of how physical modeling and programming can produce surprising results.

1. Additional resources - The notes recommend consulting the official Julia documentation, the Julia Discourse, and books such as Think Julia and Practical Julia for deeper study.

These chapter summaries highlight the important codes and algorithms introduced in the notes. Use them as a reference while exploring Julia further and as a foundation for building more sophisticated numerical and scientific programs.

