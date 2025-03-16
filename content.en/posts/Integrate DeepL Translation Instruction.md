### 1. Install R and Babeldown

#### 1.1 Install R
[https://cran.r-project.org/](https://cran.r-project.org/).
#### 1.2 Install Babeldown

**[In side of R console]**

This command install 'remotes' from CRAN  if not already installed:

```javascript
if (!requireNamespace("remotes", quietly = TRUE)) {
	install.packages("remotes")
}
```

Then uses the ‘remotes’ package to install the ‘babeldown’ package from its GitHub repo:

```
remotes::install_github("ropensci/babeldown")
```

### 2. 