---
title: "Integrate DeepL Translation Instruction"
date: 2025-03-16
weight: 2
author: Erise.He
---


### 1. Install R and Babeldown

#### 1.1 Install R
[https://cran.r-project.org/](https://cran.r-project.org/).

(The following task is using R console)
#### 1.2 Install Babeldown 

More specific instruction, check here: https://docs.ropensci.org/babeldown/

1.2.1 This command install 'remotes' from CRAN  if not already installed:

```javascript
if (!requireNamespace("remotes", quietly = TRUE)) {
	install.packages("remotes")
}
```

1.2.2 Uses the ‘remotes’ package to install the ‘babeldown’ package from its GitHub repo:

```
install.packages('babeldown', repos = c('https://ropensci.r-universe.dev', 'https://cloud.r-project.org'))
```
#### 2.  Set up DeepL API (Inside of R console)

- Go to DeepL's website and get an API key: https://www.deepl.com/en/your-account/keys

#### 3. Connect Babeldown to DeepL API

Babeldown uses the DeepL _free_ API URL **by default** (no need to set up unless *pro* API).

##### 3.1 Download a `keyring` package (for secure API key retrieval)

```
install.packages("keyring")
```

##### 3.2 Keyring requests your API key
```
library(keyring)

keyring::key_set("deepl", prompt = "API key:")
```

Enter your API key and then in any script you use babeldown, you’d retrieve the key like so:

```
Sys.setenv(DEEPL_API_KEY = keyring::key_get("deepl"))
```
#### 4. (optional) Set up working directory

In R, use `getwd()` to check current working directory, and you may use `setwd("your absolute path")` to move your working directory for convenience.

My setup is:
```
setwd("/Users/erisehe/Documents/GitHub/erisehe.github.io")
```

#### 4. Translates

Since my working directory is at (".../erisehe.github.io"), so I runs relative path. The commands, for example, is:

```
babeldown::deepl_translate_hugo(
  post_path = "content.en/docs/Mathematics/MATH 412 Real Analysis II/Lecture/name.md",
  target_lang = "ZH",
  source_lang = "EN",
  force = TRUE
)
```

It translate only one file at a time.

#### How to Translate an Entire Folder

You can use base R functions (or packages like **purrr**) to list the files and apply the translation function.

```
# Define the source folder containing your markdown files
source_dir <- "path/to/your/source_folder"

# Define the target folder where you want to save the translated files
target_dir <- "path/to/your/target_folder"
if (!dir.exists(target_dir)) {
  dir.create(target_dir)
}

# List all markdown files in the source directory
files <- list.files(source_dir, pattern = "\\.md$", full.names = TRUE)

# Loop through each file and translate it
for (f in files) {
  # Translate the file using babeldown's deepl_translate_hugo function
  babeldown::deepl_translate_hugo(
    post_path = f,
    target_lang = "ZH",
    source_lang = "EN",
    force = TRUE
  )
  
  # If the function writes the output file in a default location or with a predictable name,
  # you can move or copy it to your target directory. For example:
  output_file <- file.path(dirname(f), paste0("translated_", basename(f)))
  if (file.exists(output_file)) {
    file.copy(output_file, file.path(target_dir, basename(output_file)))
  }
}

```