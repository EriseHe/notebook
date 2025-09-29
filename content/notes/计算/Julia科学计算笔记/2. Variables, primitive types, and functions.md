---
lecture:
---

# Lecture Review: **Julia & Git**

*Big picture:* These notes consolidate core Julia language patterns (types, functions, dispatch, performance) and the Git mental model (objects → trees → commits → refs) with small, runnable examples. Use them as a quick study sheet before coding.

***

## 0) Key Takeaways

* **Julia:** Performance flows from **type stability** and **multiple dispatch**. Prefer clear function definitions, broadcasting (`.`), and small, composable methods.
* **Git:** Think “**snapshot graph**.” Commits point to trees (your files), and refs (branches/tags) point to commits. Stage → commit → push is the daily cadence.
## 1) Julia Basics

### 1.1 Primitive & Common Types

* Abstract: `Real`, `Integer`, `Signed`, `Unsigned`
* Concrete: `Int64`, `Float64`, `Bool`, `Complex{T}`, `Rational{T}`, `Char`, `String`, `Symbol`

```julia
# Explore the type lattice (in REPL):
subtypes(Real)
subtypes(Integer)
subtypes(Signed)

# Type inspection:
typeof(3), typeof(3.0), typeof(1//2), typeof(1 + 2im), typeof(:name)
```

### 1.2 Containers & Basic Literals

```julia
# Arrays, Tuples, Dicts
A = [1, 2, 3]                       # Vector{Int}
M = [1 2; 3 4]                      # Matrix{Int} (2×2)
t = (1, "a", 3.0)                   # Tuple
d = Dict("a" => 1, "b" => 2)        # Dict{String,Int}

# Ranges & comprehensions
r = 0:0.25:1                        # 0.0,0.25,0.5,0.75,1.0
squares = [i^2 for i in 1:5]        # [1,4,9,16,25]
```

***

## 2) Functions & Syntax (Three Ways)

### 2.1 One-liner

```julia
f(x) = 3x + 1
f(10)  # 31
```

### 2.2 Expanded (long form)

```julia
function g(x, y)
    z = x + y
    return 3z
end
g(2, 4)  # 18
```

### 2.3 Anonymous (lambda)

```julia
h = (x, y) -> 3 * (x + y)
h(2, 4)  # 18
```

### 2.4 Last-expression returns (implicit return)

```julia
function no_return_example(x)
    x^2 + 1   # returned implicitly
end
no_return_example(3)  # 10
```

### 2.5 Passing Functions

```julia
function apply_twice(f, x)
    return f(f(x))
end
apply_twice(x -> x + 1, 3)  # 5
```

## 3) Multiple Dispatch & Method Overloading

**Idea:** Different method bodies for different argument types.

```julia
area(r::Real) = π * r^2                 # circle by radius
area(w::Real, h::Real) = w * h          # rectangle

area(2)       # uses first method
area(3.0, 4)  # uses second method
```

Type-specific behavior:

```julia
f(x::Int, y::Int) = x + y
f(x::AbstractFloat, y::AbstractFloat) = x + y + 0.1

f(1, 2)       # 3
f(1.0, 2.0)   # 3.1
```

***

## 4) Types, Structs, Mutability

### 4.1 Immutable vs Mutable

```julia
struct Point
    x::Float64
    y::Float64
end

mutable struct MPoint
    x::Float64
    y::Float64
end

p = Point(1.0, 2.0)
# p.x = 3.0   # ERROR: immutable

mp = MPoint(1.0, 2.0)
mp.x = 3.0    # OK
```

### 4.2 Type Annotations & Stability

```julia
# Annotate arguments for clarity/perf (when helpful)
function scale!(v::Vector{Float64}, α::Float64)
    for i in eachindex(v)
        v[i] *= α
    end
    return v
end

v = [1.0, 2.0, 3.0]
scale!(v, 0.5)  # [0.5,1.0,1.5]
```

***

## 5) Idiomatic Julia

### 5.1 Broadcasting (elementwise with `.`)

```julia
x = range(0, stop=2π, length=5)
y = sin.(x)               # elementwise sin
z = sin.(x .+ 0.1) .^ 2   # dotted ops fuse efficiently
```

### 5.2 Keyword Arguments

```julia
function midpoint(a; b=0.0)
    return (a + b)/2
end
midpoint(3.0; b=5.0)  # 4.0
```

### 5.3 Varargs (splatting)

```julia
sum_all(xs...) = sum(xs)
sum_all(1, 2, 3, 4)   # 10
```

### 5.4 Docstrings & Help

```julia
"""
    myfunc(x)

Return x squared.
"""
myfunc(x) = x^2

# In REPL: ?myfunc
```

***

## 6) Performance Tips (Quick Wins)

* Prefer **type-stable** returns.
* Avoid mutating **global** vars; wrap code in functions.
* Prefer **in-place** operations for large arrays.
* Use `@views` for slicing without allocations; `@inbounds` in hot loops (careful).

```julia
function add!(y::Vector{Float64}, A::Matrix{Float64}, x::Vector{Float64})
    @views y .+= A * x   # no copies for slices; allocation from A*x remains
    return y
end
```

***

## 7) Git: Model & Daily Flow

### 7.1 Big Picture

Git stores **content-addressed objects**:

* **blob** = file content
* **tree** = directory (names → blobs/trees)
* **commit** = snapshot + metadata (points to a tree and parent commit(s))
* **tag** = named pointer (often to a commit)

Refs (e.g., `main`) are pointers to commits; `HEAD` points to the current ref.

### 7.2 Daily Workflow

```bash
git clone <url>          # or: git init
git status               # see changes
git add <paths>          # stage
git commit -m "message"  # snapshot
git push origin main     # publish
git pull                 # update from remote
```

***

## 8) Git Internals (Peek Under the Hood)

### 8.1 Inspect Objects

```bash
git log --oneline --graph --decorate -n 10
git ls-tree -r HEAD                # list files in current commit tree
git cat-file -p HEAD               # show commit (tree, parent, metadata)
git cat-file -p <tree-hash>        # show tree entries
git cat-file -p <blob-hash>        # show file contents snapshot
```

### 8.2 Refs & HEAD

```bash
git symbolic-ref --short HEAD      # current branch name
git show-ref --heads               # local branch refs
git show-ref --tags                # tag refs
```

***

## 9) Essential Commands (Cheat Sheet)

```bash
# Branching
git branch feature/x
git switch feature/x               # or: git checkout feature/x
git switch -c feature/x            # create & switch

# Merging / Rebasing
git merge feature/x
git rebase main                    # replay commits on top of main (avoid on shared history)

# Amending
git commit --amend                 # edit last commit

# Stashing
git stash
git stash pop

# Show a file from a commit
git show <commit>:path/to/file
```

***

## 10) Feature Branch Workflow (PR-friendly)

```bash
git switch -c feature/speed-up
# edit; run tests
git add -A
git commit -m "Optimize inner loop with @inbounds"
git push -u origin feature/speed-up
# open PR on GitHub/GitLab
```

***

## 11) Recovery & Inspection

```bash
git reflog                         # timeline of HEAD moves (lifesaver)
git reset --hard HEAD~1            # drop last commit (DANGER: discards changes)
git restore --staged <file>        # unstage a file
git checkout <commit> -- <file>    # restore file version from old commit
```

***

## 12) Tags & Releases

```bash
git tag -a v0.1.0 -m "First release"
git push origin --tags
```

***

## 13) `.gitignore` (Starter)

```
# Julia
*.jl~
*.ji
*.jld2
Manifest.toml
Project.toml

# General
.DS_Store
*.log
.env
.vscode/
```

***

## 14) Julia × Git for Reproducible Projects

```bash
# Save environment with your code
julia --project -e 'using Pkg; Pkg.instantiate(); Pkg.status()'
git add Project.toml Manifest.toml
git commit -m "Pin Julia environment"
```

***

### Quick Self-Check

* Can you explain why **multiple dispatch** helps write both generic and fast code?
* Can you draw the Git graph: **refs → commits → trees → blobs**?
* Can you stage/commit/push and recover a mistaken commit with `reflog`?

*That’s it—paste into Obsidian and you’re set for a crisp review before coding.*