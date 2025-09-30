---
title: "Create Graph Using LaTex Code"
---



```tikz
\usetikzlibrary{arrows.meta, positioning}

\tikzset{
  ladder/.style = {draw, rounded corners, align=left, minimum width=9.8cm, inner sep=6pt},
  arrow/.style  = {-{Latex[length=3mm]}, thick}
}

\begin{document}
\begin{tikzpicture}[node distance=8mm]
  \small

  % Nodes (top to bottom)
  \node[ladder, fill=gray!10] (T5)  {\bfseries $T_5$ \; Completely normal Hausdorff（完全正规豪斯多夫）\\
    Disjoint closed sets separated by $f:X\to[0,1]$.};
  \node[ladder, below=of T5]  (T4)  {\bfseries $T_4$ \; Normal Hausdorff（正规豪斯多夫）\\
    Disjoint closed sets contained in disjoint open sets.};
  \node[ladder, below=of T4]  (T35) {\bfseries $T_{3.5}$ \; Tychonoff（完全正规豪斯多夫）\\
    For $x\notin A$ (closed) $\exists f:X\to[0,1]$ with $f(x)=0,\ f(A)=\{1\}$.};
  \node[ladder, below=of T35] (T3)  {\bfseries $T_3$ \; Regular Hausdorff（正规豪斯多夫）\\
    For $x\notin A$ (closed) $\exists$ disjoint open $U,V$ with $x\in U,\ A\subset V$.};
  \node[ladder, below=of T3]  (T25) {\bfseries $T_{2.5}$ \; Urysohn（乌里松）\\
    Distinct points have disjoint closed neighborhoods.};
  \node[ladder, below=of T25] (T2)  {\bfseries $T_2$ \; Hausdorff（豪斯多夫）\\
    Distinct points lie in disjoint open sets.};
  \node[ladder, below=of T2]  (T1)  {\bfseries $T_1$ \; Fréchet（Fréchet）\\
    All singletons are closed.};
  \node[ladder, below=of T1]  (T0)  {\bfseries $T_0$ \; Kolmogorov（Kolmogorov）\\
    For $x\neq y$, some open set contains one but not the other.};

  % Arrows
  \draw[arrow] (T5)  -- (T4);
  \draw[arrow] (T4)  -- (T35);
  \draw[arrow] (T35) -- (T3);
  \draw[arrow] (T3)  -- (T25);
  \draw[arrow] (T25) -- (T2);
  \draw[arrow] (T2)  -- (T1);
  \draw[arrow] (T1)  -- (T0);

  % Caption
  \node[below=6mm of T0, align=center] {\footnotesize Implications downward; reverse implications generally fail.};
\end{tikzpicture}
\end{document}
```

```tikz

```

```tikz
\usepackage{pgfplots}
\pgfplotsset{compat=1.16}

\begin{document}

\begin{tikzpicture}
\begin{axis}[colormap/viridis]
\addplot3[
	surf,
	samples=18,
	domain=-3:3
]
{exp(-x^2-y^2)*x};
\end{axis}
\end{tikzpicture}

\end{document}
```

```tikz
\usepackage{tikz-cd}

\begin{document}
\begin{tikzcd}

    T
    \arrow[drr, bend left, "x"]
    \arrow[ddr, bend right, "y"]
    \arrow[dr, dotted, "{(x,y)}" description] & & \\
    K & X \times_Z Y \arrow[r, "p"] \arrow[d, "q"]
    & X \arrow[d, "f"] \\
    & Y \arrow[r, "g"]
    & Z

\end{tikzcd}

\quad \quad

\begin{tikzcd}[row sep=2.5em]

A' \arrow[rr,"f'"] \arrow[dr,swap,"a"] \arrow[dd,swap,"g'"] &&
  B' \arrow[dd,swap,"h'" near start] \arrow[dr,"b"] \\
& A \arrow[rr,crossing over,"f" near start] &&
  B \arrow[dd,"h"] \\
C' \arrow[rr,"k'" near end] \arrow[dr,swap,"c"] && D' \arrow[dr,swap,"d"] \\
& C \arrow[rr,"k"] \arrow[uu,<-,crossing over,"g" near end]&& D

\end{tikzcd}

\end{document}
```

```tikz
\usepackage{chemfig}
\begin{document}

\chemfig{[:-90]HN(-[::-45](-[::-45]R)=[::+45]O)>[::+45]*4(-(=O)-N*5(-(<:(=[::-60]O)-[::+60]OH)-(<[::+0])(<:[::-108])-S>)--)}

\end{document}
```

```tikz
\usepackage{chemfig}
\begin{document}

\definesubmol\fragment1{

    (-[:#1,0.85,,,draw=none]
    -[::126]-[::-54](=_#(2pt,2pt)[::180])
    -[::-70](-[::-56.2,1.07]=^#(2pt,2pt)[::180,1.07])
    -[::110,0.6](-[::-148,0.60](=^[::180,0.35])-[::-18,1.1])
    -[::50,1.1](-[::18,0.60]=_[::180,0.35])
    -[::50,0.6]
    -[::110])
    }

\chemfig{
!\fragment{18}
!\fragment{90}
!\fragment{162}
!\fragment{234}
!\fragment{306}
}

\end{document}
```
