# RLTune-BoomerAMG: experiment and repository handoff for Windows

Prepared on 22 October 2026, America/New_York. Repository and result checks were performed during this handoff, around 21:00–21:15 EDT (23 October UTC).

This document is a standalone continuation record for the researcher and a new assistant on the Windows computer. It describes the project, decisions, implementation variants, verified results, source provenance, outstanding issues, and transfer requirements. It is deliberately detailed because a fresh clone and a short conversation summary would omit important local changes.

**This is a handoff, not a request to start another experiment automatically.** No algorithm, manuscript, branch, or experiment was changed while preparing it. No commit or push was made.

## 1. Read this first

The most important facts are:

1. The latest experiments are complete. At the time of inspection, no experiment workers were running. The last completed experiment was the three-seed Advection 60 rerun using the published original-algorithm version.
2. The latest development experiment uses **19 normalized setup descriptors plus three predictions from the joint method’s own setup bandit**, giving **35 state entries for the joint method**. Fixed-setup LSTDQ has 32 state entries because it has no setup bandit. This experiment also uses the absolute logarithmic cycle-time feature described below.
3. Those compact-context changes are **local, uncommitted development files**. Cloning GitHub does not retrieve them. The recent default-fallback feedback changes also include uncommitted and untracked files.
4. GitHub main and local main are currently different. The live GitHub main tip is a newer cleanup commit. Do not assume a fresh clone reproduces any measured run.
5. The completed “original paper” rerun was **not a byte-for-byte replay of the original batch’s source bundle**. A subsequent provenance audit corrected that earlier claim. It used a later cleanup commit whose inspected algorithm paths match the original logic. A different preserved commit matches all 151 files in the actual original batch snapshot.
6. The original archived paper online experiment has **5,000 inputs**, not an original 5,001–6,000 frozen phase. Never invent an original frozen baseline.
7. The current intended official Module 1 protocol is a continuous stream: inputs 1–5,000 learn; inputs 5,001–6,000 are frozen evaluation with overhead still measured. Several recent diagnostic experiments intentionally ran only the first 5,000.
8. RL currently learns from **native cycle execution time**. Its controller overhead is measured in total evaluation time, but is not added to its learning cost. An earlier experiment adding overhead to RL’s cost was rejected and reverted.
9. There is a real portability issue: the current runner’s source-snapshot preparation still creates a Mac-specific runtime-library link. Linux/WSL support needs that checked and corrected before launching a full experiment. Native Windows requires additional wrapper/build adaptation.
10. The cause of the original-versus-rerun performance gap remains **unestablished**. Timing feedback can change subsequent learning trajectories; memory interference is plausible but has not been demonstrated by measurements.

The latest compact experiment’s mean Advection 60 joint savings, across seeds 1–3 and inputs 1–5,000, are **30.68% native** and **27.19% including measured learner overhead**. The completed published-original-algorithm rerun gives **31.17% native** and **27.45% inclusive**. The original archived paper data for the same three seed labels gives **34.19% native** and **30.20% inclusive**.

These are descriptive comparisons, not a statistical equivalence claim. More detailed tables and qualifications appear later.

## 2. Research objective and basic design

The project tunes HYPRE BoomerAMG online for a stream of PDE linear systems. It has two learning levels:

- A setup learner chooses the BoomerAMG hierarchy/setup configuration using a contextual linear bandit.
- A solve learner controls relaxation weights cycle by cycle using recursive LSTDQ with an action-dependent linear feature representation.

The joint method combines both. Its setup configuration affects the hierarchy and therefore the solve dynamics. The solve policy affects execution cost and success, which affect setup feedback.

The four branches compared in Module 1 are:

| Display name | Internal method ID | Setup | Solve |
|---|---|---|---|
| Default | default_setup_default_solve | Fixed reference configuration | Default relaxation |
| LSTDQ | default_setup_lstdq | Fixed reference configuration | Learned relaxation |
| LinUCB | bandit_default | Learned setup configuration | Default relaxation |
| LinUCB–LSTDQ / joint | bandit_lstdq | Learned setup configuration | Learned relaxation |

The branches maintain independent learners and measurements. Matching the reference configuration is not the same as sharing one physically constructed hierarchy across branches.

Within a seed, methods execute serially in balanced permutation blocks. Across a batch, the three seed workers run concurrently, with numerical libraries constrained to one thread. This is not twelve simultaneous branch workers.

The input stream and candidate schedules are paired where the protocol specifies. That pairing must be checked from saved artifacts, not inferred from using the same seed label.

## 3. User preferences and rules for continuing

These preferences were established repeatedly:

- Develop and test changes in development first. Main should contain a selected, validated subset, with clean official runners and the intended algorithm.
- Do not merge all diagnostic work into main.
- Recent fallback and compact-context work was authorized locally without committing or pushing. Do not infer permission to publish it from this handoff request.
- Keep public names clean and suitable for publication. Avoid experimental version suffixes and development terminology in the normal interface.
- Keep diagnostics, equivalence checks, and exploratory scripts in development, not in timed official execution.
- Do not put detailed reward-fix history or implementation debugging notes in the public README.
- If a future commit is authorized, the user prefers the commit message “update.”
- The user requested removal of journal branding from the public repository and historical branch/commit names. Historical local paths in this handoff are retained only to locate evidence; do not rename or rewrite them during reproduction.
- Preserve existing local edits. Do not reset, clean, or overwrite a working tree to obtain a different version.
- Preserve completed results. Interrupted or contaminated experiments should not be relabeled as official completed runs.
- Use the existing Module 1 runner and source-snapshot mechanism.
- For quick diagnostics, three concurrent seeds and all four branches have usually been requested.
- For a 5,000-input diagnostic run, report around 1,000 and at completion rather than posting updates every few hundred inputs.
- Show native and overhead-inclusive savings separately.
- Do not treat the newest experiment as accepted final paper data merely because it has finished.
- Paper edits should be minimal and explicitly scoped. Do not synchronize unrelated manuscript files while changing a table or formula.
- Do not modify the manuscript or Overleaf as part of moving experiments to Windows.

## 4. Repository locations and exact Git state

### 4.1 Mac locations

| Purpose | Location |
|---|---|
| Main code checkout | /Users/erisehe/Documents/GitHub/RLTune-BoomerAMG |
| Active development checkout | /Users/erisehe/Documents/GitHub/RLTune-BoomerAMG-diagnostics |
| Another existing worktree; leave alone | /Users/erisehe/Documents/GitHub/RLTune-BoomerAMG-development |
| Local manuscript repository | /Users/erisehe/Documents/GitHub/SISC-Overleaf |
| Mac experiment Python | /Users/erisehe/Library/Science/miniforge3/envs/rl/bin/python |
| GitHub repository | https://github.com/EriseHe/RLTune-BoomerAMG |

The other worktree is on codex/reward-objective-pilot. It is not the active compact-context experiment checkout.

### 4.2 Verified revisions

| Reference | Commit |
|---|---|
| Local main HEAD | fd7f04ccb69101d4aa2020d27e04566f3bf0c977 |
| Local codex/development HEAD | af36530d41a413e8af785bbb07fff29e5c438c12 |
| Live GitHub codex/development | af36530d41a413e8af785bbb07fff29e5c438c12 |
| Live GitHub main | 3234d75352d5bc619fd4b238d03b560156c79a9c |
| Local manuscript main HEAD | 689b14b7d76414a99b931040b22a8806b18477a4 |
| Published-original-algorithm rerun base | 24a6b21cfe7607d64510b4a93d15006eb90d5681 |
| Commit matching actual original batch’s 151 saved source files | 6736efd8c1dfd55082f5cb30833093678048b758 |

Local development contains local main’s committed fd7f04 revision in its ancestry. This does not mean every working-tree modification has been committed, or that development contains the newer remote cleanup.

The newer GitHub main commit is titled “Remove legacy experiment code,” dated 22 October 2026, 17:45:51 -07:00. It is one commit ahead of local main and changes 28 files, with 29 insertions and 1,566 deletions. It includes substantial runner/helper cleanup. It was not merged or tested during this handoff.

Local origin/main was still pointing at fd7f04 when inspected. Therefore a local status comparison against that tracking reference alone would give an incomplete answer about synchronization. The live remote was checked separately.

**Do not casually pull the new cleanup commit into these dirty working trees.** First preserve the current patches, untracked files, and run snapshots. Then review the cleanup separately.

The local manuscript working tree was clean, but Overleaf was not fetched or compared during this handoff. “Local manuscript clean” does not mean “currently synchronized with Overleaf.”

### 4.3 What a clone will not contain

A fresh GitHub clone will not automatically contain:

- Uncommitted edits in either Mac checkout.
- Untracked development wrappers and tests.
- Untracked production fallback modules.
- Most large local results under ignored results directories.
- Source bundles saved inside ignored run directories.
- Mac-specific native build products and the Python environment.
- The old preserved worktree containing the actual original batch.

Copying a linked Git worktree directory is also insufficient for a standalone Windows repository: its .git file points to a Git database elsewhere on the Mac.

A safe transfer uses a fresh repository at the intended pinned revision plus the saved tracked-file patch, all relevant untracked files, and selected results/source bundles. A self-contained source archive is another option. This document does not itself transfer those files.

## 5. Repository organization and official modules

The important directories are:

| Directory | Role |
|---|---|
| setup/ | Setup action features, candidate generation, LinUCB learning and retry selection |
| solve/ | State encoding, recursive LSTDQ, solve episodes, controller timing |
| problems/ | PDE streams and problem context |
| hypre/source/ | Project’s vendored HYPRE source |
| hypre/interfaces/ | Custom native interface and build rules |
| hypre/bindings/ | Python binding and native-library loading |
| experiments/paper_final/ | Official runners and shared experiment protocol |
| configs/module1/ | Module 1 suites |
| configs/module3/ | Module 3 suites |
| development/ | Diagnostic variants, comparisons, and tests |
| data/ | Archived official measurements and provenance |
| results/ | New local runs and their snapshots, logs, and outputs |

The relevant documentation files are README.md, experiments/README.md, and development/README.md. Do not assume an experiments/experiments.md file exists.

The historical paper_final directory name remains in the code. Its presence does not make every run under it current accepted final paper data.

### 5.1 Module 1: online learning and frozen continuation

The intended current full protocol is:

1. Inputs 1–5,000: both learners are active in the joint method, starting from input 1.
2. Inputs 5,001–6,000: continue with the learned models in a frozen evaluation phase.
3. Disable setup and solve updates in the frozen phase; disable RL exploration.
4. Continue within the same live run rather than silently restarting training or reconstructing an unrelated state.
5. Use held-out inputs as specified by the prepared protocol.
6. Continue measuring selection/controller overhead in frozen evaluation.
7. Audit that learner state does not change during the frozen phase.

The former separate frozen Module 4 was merged into Module 1. The public experiment organization is now Modules 1, 2, and 3.

There was confusion earlier because some frozen evaluation was prepared separately. The user clarified that the intended experiment is a continuous 1–6,000 protocol. Do not repeat that mistake.

Also distinguish this recent “Module 4” discussion from old historical directory numbering: old paper module04 meant the online experiment that is now Module 1.

### 5.2 Module 2: matched-policy comparison

Module 2 evaluates relaxation policies on matched setups using explicitly selected trained models from Module 1.

The comparison includes:

- Fixed weight 1.
- Best global fixed weight.
- Best per-input fixed weight.
- Periodic policy.
- Frozen LSTDQ.

The described protocol uses 100 paired inputs, 41 fixed relaxation weights, and three evaluation repetitions. It measures overhead and does not learn.

Module 2’s configuration is initialized from selected training-run paths, so there is no analogous static configs/module2 suite directory. This explains the apparent asymmetry with configs/module1 and configs/module3.

Do not automatically attach Module 2 to the latest diagnostic directory. The user wanted it ready to run once appropriate Module 1 data is selected.

The latest compact joint context has additional bandit predictions. Loading that checkpoint into Module 2 requires compatible context construction and metadata. This combination has not been established as validated. Do not bypass dimension or encoder checks merely to make loading succeed.

### 5.3 Module 3: recovery and retry experiment

Module 3 has its own fresh learners and does not require completion of Module 1. The protocol uses variable-flow 60³ problems, six streams of 5,000 inputs, and four branches.

The recent exploratory comparison considered three retry variants, but only the first was completed. See the chronology below.

## 6. Common configuration and candidate construction

For the current Advection 60 tests:

- Problem family: scalar_anisotropic_diffusion_advection.
- Grid: 60³, or 216,000 grid points.
- Coefficient ranges use the configured 1–1,000 scales; advection context retains sign.
- Residual tolerance: 10^-6.
- Maximum cycles per attempt: 50.
- Relaxation action grid: 1 to 3 in increments of 0.05, giving 41 actions.
- Action RBF centers: 1 to 3 in increments of 0.25, giving 9 centers.
- RBF width: 0.2.
- LSTDQ ridge parameter: 1.
- LSTDQ uncertainty coefficient: 2.
- Eligibility trace parameter: 0.8.
- Residual/noise timing floor: 0.001 seconds in the controller configuration.
- Action scoring retains the existing nonnegative lower-bound floor.
- Exploration starts at 0.3 and decays toward 0.03 over the configured 20,000 scale.

These are configuration details, not a suggestion to change them.

The setup learner uses 1,024 structured candidates. A legacy strategy string still says structured512; that string is not the actual candidate count.

Candidate quotas are:

| Component | Count |
|---|---:|
| Anchors | 128 |
| Global samples | 384 |
| Local samples | 384 |
| Sobol samples | 128 |

The elite cache has capacity 64, and local sampling uses eight centers. Candidate arrays/schedules are saved so paired experiments can be checked. They are not just whatever candidates happen to be generated by a future run with the same displayed seed number.

The reference/default setup includes:

~~~text
strong_threshold = 0.25
max_row_sum = 0.9
trunc_factor = 0
P_max_elmts = 4
agg_num_levels = 0
coarsen_type = 10
interp_type = 6
agg_interp_type = 4
agg_tr = 0
agg_Pmx = 0
~~~

There are eight tuned setup parameters: five numerical and three categorical.

| Kind | Parameters |
|---|---|
| Continuous | strong_threshold, max_row_sum, trunc_factor |
| Discretized/integer numerical | P_max_elmts, agg_num_levels |
| Categorical | coarsen_type, interp_type, agg_interp_type |

Active categorical sets are:

~~~text
coarsen_type:    [0, 2, 3, 6, 8, 10], reference 10
interp_type:    [0, 2, 3, 4, 6, 8, 17, 18], reference 6
agg_interp_type:[4, 6, 7], reference 4
~~~

The active interp_type set does not include 14. Aggressive interpolation parameters are conditionally active according to the setup configuration; preserve the conditional masks.

Reference-category one-hot encoding gives 5 + 7 + 2 = 14 categorical entries. Together with five numerical entries, this produces 19 basic setup descriptors.

An all-zero categorical block means the reference category; it does not mean missing information. An interpolation type of 17 is represented by its indicator in the appropriate ordered non-reference category block, not by the ordinal number 17.

## 7. State features: distinguish the versions carefully

The central source of confusion has been treating several different encodings as “the current context.” The following table separates them.

| Version | Setup portion | Other entries | State dimension | With 9 action basis terms |
|---|---|---:|---:|---:|
| Original archived paper | 8 scalar setup descriptors, plus cycle bins/interactions elsewhere | 13 + 7 bins + 7 gap-bin interactions | 35 | 315 |
| Current local production base | 19 basic descriptors using existing bandit-style numerical scales | 13 | 32 | 288 |
| Development normalized basic context | 19 descriptors; numerical entries fixed-range [-1,1] | 13 | 32 | 288 |
| Development shared expansion | 104 setup terms | 13 | 117 | 1053 |
| Latest compact joint context | 19 normalized descriptors + 3 own-bandit predictions | 13 | 35 | 315 |
| Latest compact fixed-setup LSTDQ | 19 normalized descriptors, no bandit predictions | 13 | 32 | 288 |

The original paper and latest compact joint context both have dimension 35, but the features are different. Equal dimensions do not make checkpoints interchangeable.

### 7.1 The 13 base solve/problem entries

Conceptually the current base state is

\[
[1,\;k/K_{\max},\;g_k,\;g_k^2,\;d_k,\;q_k,\;\bar w_k,\;\text{six PDE features}].
\]

The six PDE features are three log-scaled diffusion coefficients and three signed log-scaled advection coefficients. The implementation uses fixed configured scales, approximately:

\[
x_c=\frac{\log(c+\epsilon)}{\log(c_{\rm scale}+\epsilon)},\qquad
x_a=\operatorname{sign}(a)\frac{\log(1+|a|)}{\log(1+|a_{\rm scale}|)}.
\]

The configured coefficient scale is 1,000 for the current cases. The exact numerical safeguards and ordering are in problems/amg.py. There is already an intercept, so do not add another mean/intercept feature accidentally.

### 7.2 Current tolerance-based residual features

For a given attempt, let r_0 be its initial residual quantity, r_k the current one, and let epsilon_tol denote the stopping tolerance in the same convention as the encoder.

Define

\[
G=\log(r_0/\varepsilon_{\rm tol}).
\]

For a valid continuing state,

\[
g_k=\frac{\log(r_k)-\log(\varepsilon_{\rm tol})}{G},
\qquad
d_k=\frac{\log(r_k)-\log(r_{k-1})}{G}.
\]

Thus d_k = g_k - g_(k-1). Residual contraction gives a negative d_k in the current sign convention.

The intended interpretation is the signed fraction of the required logarithmic reduction represented by the preceding residual change. If prose says “reduction achieved” with a positive-progress convention, it must clarify the sign rather than silently negate the implemented feature.

These features have no extra clipping in the updated encoder. Positive/finite-value checks are numerical validity checks, not a return to the old feature caps.

The cycle counter is k/K_max. Its normal range follows from the attempt’s cycle budget. An additional clamp is unnecessary for valid states.

### 7.3 Relaxation weight

The weight feature is centered and scaled by the action interval:

\[
\bar w_k=
\frac{w_{k-1}-(w_{\min}+w_{\max})/2}
{(w_{\max}-w_{\min})/2}.
\]

With actions in [1,3], this reduces to

\[
\bar w_k=w_{k-1}-2.
\]

The interval [-1,1] follows from valid actions, without an extra clip. Zero corresponds to the midpoint weight 2.

Centering is an encoding/conditioning choice, not proof that [-1,1] is universally optimal. Changing feature scales changes ridge regularization and uncertainty geometry unless other quantities are adjusted. No blanket rescaling of every state component was accepted.

### 7.4 Production cycle-time feature versus latest development feature

The current local production encoder uses the preceding native cycle time divided by the first native cycle time of that attempt:

\[
q_0=0,\qquad q_k=c_{k-1}^{\rm sol}/c_0^{\rm sol}.
\]

That first-cycle reference is fixed within an attempt. It is not a running mean or running variance. There is no extra clipping.

The latest compact experiment instead uses the user’s explicit formula:

\[
\boxed{q_0=0,\qquad q_k=\log\left(1+\frac{c_{k-1}^{\rm sol}}{0.001\ {\rm seconds}}\right).}
\]

It uses the natural logarithm, preserves absolute timing relative to a fixed 1 ms unit, and has no clipping.

Do not divide this logarithmic feature by the first cycle, preceding cycle, nonzero count, matrix size, or another measured reference. The user explicitly rejected a work-normalized interpretation.

The 1 ms reference is a fixed dimensional scale. Calling the feature “algorithmic” should not conceal that this scale was chosen. It is not an adaptive normalizer.

Neither context normalization changes the definition of the native cycle cost used by RL.

### 7.5 Numerical setup descriptors

The production 19-entry representation shares the basic encoding conventions with the setup bandit. Its numerical entries use existing centers and scales; this does not guarantee that their values lie in [-1,1]. Removing clipping did not remove normalization.

For example, a parameter centered at 0.9 with scale 0.1 can have a standardized value near -9 if its allowed value is near zero.

The later development experiment explicitly maps each numerical parameter’s fixed allowed range to [-1,1]:

\[
z_i=2\frac{x_i-l_i}{u_i-l_i}-1.
\]

The bounds include the allowed configured values and Default. Constant-range entries become zero. Conditional activation masks remain in effect.

This scaling applies to the three continuous and two discretized numerical parameters. Categorical one-hot entries remain unchanged.

The development wrapper changes RL’s setup descriptors, not the setup bandit’s underlying feature scaling or model.

### 7.6 The 104-term setup expansion

The shared setup expansion comprises:

- 5 numerical linear terms.
- 5 numerical squares.
- 10 numerical pair interactions.
- 14 categorical indicators.
- 70 numerical-by-categorical interactions.

Total: 104 setup entries.

The first test used the bandit’s existing numerical scaling. Those numerical values and their squares could be large. The later normalized variant maps numerical values to [-1,1] before forming the expansion. Each resulting numerical/interacting term is then bounded by construction without clipping.

Both versions create 117 state entries and 1,053 action-state coefficients. This substantially increases recursive LSTDQ matrix costs. It was investigated because sharing the setup bandit’s representation seemed attractive, but the measured overhead was too large relative to the savings.

### 7.7 Latest compact context: three predictions

The latest development alternative keeps the 19 basic range-normalized setup descriptors and adds three quantities for the joint branch only.

For the candidate setup’s bandit feature vector phi and the joint bandit’s current matrices/vectors:

\[
\widehat C=\phi^\top A^{-1}b,
\qquad
\widehat F=\phi^\top A^{-1}b_{\rm fail},
\qquad
u=\sqrt{\max(0,\phi^\top A^{-1}\phi)}.
\]

They mean:

1. Predicted assigned setup-feedback cost, in seconds.
2. Predicted linear failure score.
3. Structural uncertainty.

The failure score is not a calibrated probability and is not clipped to [0,1]. The cost prediction is not the raw measured cost of the future attempt. Do not describe either as having access to future outcomes.

The predictions are captured once before the first controlled cycle of each attempt, before that attempt’s feedback. They remain fixed throughout the attempt. A new attempt captures new predictions from the then-current model.

The joint branch uses its own setup bandit. Fixed-setup LSTDQ has no setup bandit and does not borrow predictions from the joint branch.

Prediction capture does not mutate the bandit or consume candidate randomness. Its cost is included in measured initial solve-feature construction overhead.

The implementation reuses a projected feature vector when calculating the three predictions. Metadata records the encoder dimensions, prediction fields, and exact timing formula so mismatched checkpoints can be rejected.

Relevant files:

~~~text
development/compact_context.py
development/run_compact_context.py
development/setup_normalization.py
development/tests/test_compact_context.py
~~~

### 7.8 Original-paper features

The original paper implementation used:

- 13 base solve/problem entries.
- 7 cycle-bin indicators with boundaries [1,2,3,5,8,12].
- 7 residual-gap-by-bin interactions.
- 8 scalar setup descriptors.
- 35 state entries and 315 action-state coefficients.

Its older residual gap was capped to [0,1.5]. The preceding residual log ratio was divided by 5 and clipped to [-1,1].

Its cycle-time feature was

\[
q_k=\frac{\operatorname{clip}(c_{k-1}^{\rm sol}/0.002,\;0,\;5)}{5}
=\operatorname{clip}(c_{k-1}^{\rm sol}/0.01,\;0,\;1).
\]

Setup descriptors were clipped to [-2,2].

The old scalar category representation was already transformed; it was not simply raw category 17 clipped to 2. Therefore the earlier blanket explanation that all large categorical IDs became indistinguishable should not be repeated without inspecting the exact original mapping. The scalar representation still differs materially from reference one-hot encoding.

All those old bins/caps/scalar setup descriptors were restored in the completed published-original-algorithm rerun. Later bin removal, one-hot changes, and uncapping were not accidentally retained there.

## 8. Learning objective, timing, and cost accounting

There are three distinct concepts:

1. Native execution time.
2. Total evaluation time including measured learner overhead.
3. Assigned attempt-level feedback used to train the setup model.

They must not be interchanged just because old prose used similar C notation.

### 8.1 RL objective

RL currently uses native cycle time as its learning cost. If written as a reward-maximization convention, the sign must correspond to minimizing that time; inspect the implementation before changing sign notation.

Controller selection and model-update overhead are measured for evaluation. They are not currently added to the RL native-cycle cost.

The setup bandit sees costs that include relevant controller overhead, so setup selection can indirectly prefer configurations whose solve/controller execution is cheaper overall.

This difference between objectives is intentional in the current restored version. The earlier overhead-added RL objective was tried, discussed, and rejected. Do not revive it while moving the code.

### 8.2 Evaluation accounting

Per-problem native time includes measured setup/solve execution across learned attempts and fallback. Inclusive time adds the measured setup learner and solve controller overhead according to the runner’s accounting.

Problem assembly and reporting/file I/O are outside the documented solver-performance measurement. Native allocation work that occurs inside a timed native scope is included there; this does not mean every Python construction, native construction, or cleanup operation outside that scope is included.

For a method m and a given seed/window:

\[
R_{\rm native}=100\left(1-\frac{T^{\rm native}_m}{T^{\rm native}_{\rm Default}}\right),
\qquad
R_{\rm inclusive}=100\left(1-\frac{T^{\rm total}_m}{T^{\rm total}_{\rm Default}}\right).
\]

Positive means faster than Default; negative means slower.

Report arithmetic means of seed-wise percentages when using the saved aggregate convention. A ratio of pooled times is a different statistic.

### 8.3 Setup assigned feedback

In the current local implementation, an assigned learned-attempt cost can be described as

\[
B_{t,j}=
\text{attempt end-to-end runtime}
+\text{setup selection time for that attempt}
+\text{carried setup-update time from problem }t-1.
\]

The current code adds the carried previous-problem setup-update charge to **each learned attempt** in that problem. It is not allocated only to the initial learned attempt.

A successful learned attempt gets its own assigned cost as the runtime target. A failed learned attempt gets its own assigned cost plus the immediately following attempt’s assigned/successor cost.

This is an adjacent-attempt recovery target, not an accounting partition. Failed-attempt targets overlap with successor costs. Carried update charges belong to an earlier problem, while actual current update work is separately measured in current evaluation overhead.

Consequently, one must not assert

\[
C_t^{\rm total}=\sum_j B_{t,j}.
\]

Using C_(t,j)^total as a label for B_(t,j) can mislead the reader into assuming this identity. The notation and its allocation rule need explicit definitions.

The failure target and delayed runtime target are different model observations. Runtime feedback can be deferred until a successor is known. The implementation preserves the appropriate provisional runtime prediction while advancing precision/failure information, then resolves the runtime target without counting the same observation twice.

## 9. Retry policy and default fallback

### 9.1 Attempt budgets

- LinUCB and joint: J_max = 4, allowing up to three learned attempts and one Default fallback.
- Fixed-setup LSTDQ: one controlled attempt and one Default fallback, J_max = 2.
- Default: J_max = 1.
- Stop at the first successful attempt.

Failures of hierarchy construction and solve convergence are both relevant failure feedback. Previously failed exact actions are excluded from later learned retries for that input.

### 9.2 Current normal failure model

The normal retry model shares runtime action features and the precision matrix, while maintaining separate failure coefficients.

Initial setup selection is optimistic for runtime cost, using a lower-confidence cost score. Retrying first ranks the separate predicted failure score conservatively, using the configured failure coefficient 2, then uses the runtime lower-confidence score for the secondary ordering.

In schematic form:

\[
\text{initial runtime score}=\widehat C-\alpha_n u,
\qquad
\text{retry failure score}=\widehat F+2u.
\]

This is a linear failure surrogate with an uncertainty adjustment. It is not a logistic probability model, and calling every component “LinLCB” without explaining the cost/failure sign convention causes confusion.

Two exploratory alternatives were discussed:

- Replace the failure coefficient 2 by alpha_n.
- Remove the separate failure predictor and use conservative runtime scoring on retries, approximately predicted cost plus alpha_n times uncertainty.

Neither alternative has replaced the normal failure model.

### 9.3 Shared fallback implementation

The new local production organization centralizes Default fallback in:

~~~text
experiments/paper_final/recovery/default_fallback.py
experiments/paper_final/recovery/setup_feedback.py
~~~

Fallback uses the reference setup and fixed Default relaxation. It does not run RL. The same fallback definition is shared across fixed-setup LSTDQ and the joint/recovery paths.

The user considered RL-controlled fallback but the accepted local feedback change did not turn Default fallback into an RL attempt.

### 9.4 Feedback from fallback

The user wanted the setup learner to benefit when a forced Default fallback demonstrates that Default works in the current context.

The current local change therefore does the following for LinUCB-involved methods:

- Successful Default fallback produces an observation for the Default configuration.
- Its own measured fallback cost is used for the corresponding runtime observation.
- Its failure target is zero.
- The precision and failure/runtime state are updated through the shared observation machinery.
- It does not consume an additional candidate draw.
- It does not relabel the preceding failed learned configuration as successful.

If Default fallback fails, no extra Default observation is added under the user’s chosen rule. There is no subsequent attempt for the ordinary adjacent-attempt target. The failure and its time are still recorded, and the fallback cost still contributes to the preceding failed learned attempt’s recovery target.

Frozen evaluation does not learn from fallback.

The older paper implementation did not add that successful Default observation. This is one real algorithmic difference between the latest development experiments and the original paper.

## 10. Optimization decisions already made

Several overhead discussions happened during this work:

- Shared one-hot setup descriptors replaced the old scalar setup representation.
- Cycle bins and their residual-gap interactions were removed from the updated algorithm.
- Unnecessary feature clipping was removed.
- Tolerance-based residual scaling replaced the arbitrary division by 5.
- Cycle-time context moved from a fixed cap to a first-cycle ratio in production, then to the absolute logarithmic feature in the latest compact development test.
- RL’s overhead-added learning cost was reverted to native cycle cost.
- Earlier accepted controller optimizations were retained.
- The user stopped a later unfinished scoring-cache experiment and did not want that unfinished change to replace the accepted implementation.

Do not interpret “remove the later cache experiment” as “remove every cache.” Current code still contains accepted factorized scoring, rank-one BLAS operations, preallocated work, and a derived inverse-moment cache. Removing these blindly would change performance and undo accepted work.

Scoring-equivalence checks belong in development tests, not in timed production execution.

No demonstrated lower bound on Python overhead has been established. The 104-term expansion was expensive, but this does not prove Python has reached its theoretical or practical best possible performance.

For scale, one dense float64 matrix is approximately 0.757 MiB at 315×315 and 8.460 MiB at 1053×1053, a factor of about 11.17. The controller maintains multiple arrays, and these figures are not total process RSS.

## 11. Experiment chronology and what is actually complete

The project has a long history. This section keeps accepted decisions distinct from abandoned or incomplete explorations.

### 11.1 Earlier official-data and updated-algorithm campaigns

Earlier work compared diffusion and advection cases at several grid sizes, including six-seed batches. It investigated shared setup features, bin removal, residual/cycle normalization, timing overhead, frozen continuation, and RL reward accounting.

There were runs the user asked to discard because of computer use, interruption, or power-off. Do not recover such a directory and silently label it official.

An updated broad Module 1 campaign was run, but it was not accepted as a final replacement for the original paper results. Later the user requested a completely fresh official run starting with Advection 60, then Advection 40, then Advection 80. That effort led into further context diagnostics rather than a completed final all-suite campaign.

Some older exploratory artifacts were archived under:

~~~text
results/archive/20261022_022850/
~~~

Its manifest is the starting point for locating retained historical outputs. Some outputs were intentionally deleted at the user’s request; this handoff does not promise that every abandoned experiment still exists.

The cycle-bin comparison was not a complete three-seed paired study: five of six runs completed, while the last no-bin seed was interrupted. Bin removal was nevertheless accepted. Do not cite that exploration as a fully completed six-run comparison.

### 11.2 Module 3 retry exploration

Three consecutive batches were requested:

1. Current fixed failure coefficient.
2. Failure uncertainty coefficient alpha_n.
3. Conservative runtime-only retry without the separate failure model.

The retained sequence is:

~~~text
results/archive/20261022_022850/development/module3_retry_comparison_20261021_131002/
~~~

Only failure_fixed completed. The other two were prepared but recorded zero native solves; the sequence was closed when the user ended exploration and returned to Module 1.

There is no completed three-way Module 3 result in this record. The normal failure model remains in use.

### 11.3 Recent Advection 60 context sequence

The recent sequence was:

1. Normalize the 19 basic numerical setup descriptors to [-1,1], keeping categorical one-hot entries.
2. Try the 104-term shared setup expansion, initially with the bandit’s existing numerical scaling.
3. Normalize numerical terms before the 104-term expansion.
4. Replace the expansion with 19 basic normalized descriptors plus three setup-bandit predictions, and use the fixed logarithmic cycle-time feature.
5. Rerun the published original-algorithm version for comparison.
6. Audit whether that rerun really used the exact original saved source.

All recent full context runs used seeds 1–3, four branches, Advection 60. The 19-entry normalization run completed the continuous 6,000-input protocol. The later expansion, compact, and original-algorithm comparison runs measured 5,000 learning inputs without a frozen Part 2.

### 11.4 Current experiment status

No new run is currently active or authorized by this document. The prior follow-up that waited for the normalized expansion to finish and launched the compact test was removed after successful launch, preventing duplicate tests.

Saved latest-run pointer files may be stale. They are discovery aids, not completion evidence. Check the run’s status, seed outputs, summary, and audits together. A stale PID is not evidence that a run is active.

## 12. Verified result sources and headline comparison

All recent development paths below are relative to:

~~~text
/Users/erisehe/Documents/GitHub/RLTune-BoomerAMG-diagnostics/
~~~

| Label in this document | Summary path | Learning inputs compared |
|---|---|---:|
| Original archived paper | data/module1/summary.json, filter advection_60 and seeds 1–3 | 1–5,000 |
| Published original-algorithm rerun | results/original_paper_advection_60_20261022_161245/run/summary.json | 1–5,000 |
| Basic 19, range normalized | results/setup_normalization_advection_60_20261022_020717/advection_60_batch1/summary.json | learning window only, 1–5,000 |
| Shared 104, bandit scaling | results/shared_setup_features_advection_60_5000_20261022_044622/summary.json | 1–5,000 |
| Shared 104, range normalized | results/shared_setup_features_normalized_advection_60_5000_20261022_123906/summary.json | 1–5,000 |
| Compact 19+3, logarithmic time | results/compact_context_advection_60_5000_20261022_142246/summary.json | 1–5,000 |

The original raw archived Advection 60 data can also be found in the main checkout under:

~~~text
data/official/module1/batches/batch_01/advection_60/seed_N/
~~~

The generated tables in the appendix are read directly from these summaries. They include per-seed results and absolute times.

The compact version reduces the 104-term version’s overhead substantially, while giving up some native savings. The normalized 104 version looks relatively good natively but loses much of that benefit in total time.

The compact version is close descriptively to the fresh published-original-algorithm rerun: its joint mean is about 0.49 percentage points lower natively and 0.26 percentage points lower inclusively. It remains about 3.01 percentage points below the archived original paper’s inclusive mean.

All compared recent full runs report zero final failures. That does not mean there were no failed first attempts, retries, or fallbacks. Those are separate columns.

### 12.1 Window warning

For a 5,000-input run, last_1000 means learning inputs 4,001–5,000.

For the completed 6,000-input basic-19 normalization run, last_1000 means frozen inputs 5,001–6,000.

Do not compare these two windows as if both were the last thousand learning inputs. For the basic-19 run use learning for the 5,000-input comparison and frozen for its held-out phase. Derive 4,001–5,000 from raw rows if that exact learning window is required.

### 12.2 Runtime to finish the recent three-seed batches

On the Mac, with three concurrent single-thread workers:

- Compact 5,000-input batch: approximately 90 minutes.
- Normalized 104-term 5,000-input batch: approximately 90 minutes.
- Raw 104-term 5,000-input batch: approximately 91 minutes.
- Published-original-algorithm 5,000-input rerun: approximately 89 minutes.
- Basic-19 continuous 6,000-input batch: approximately 107 minutes.

These are whole experiment wall times, including four branches and runner work. They are not the per-method measured solver totals in the performance tables. They are not a validated Windows runtime prediction.

## 13. Validation of the compact experiment

The compact run retained a validation log at:

~~~text
results/compact_context_advection_60_5000_20261022_142246/validation.log
~~~

It recorded 25 tests passing before launch. Compact-specific checks covered:

- The exact absolute log1p time formula, no clipping, and independence from the first-cycle reference.
- Preservation of the other base state features.
- Own-bandit predictions captured without mutation.
- Predictions fixed within an attempt and refreshed for a new attempt.
- Rejection of missing or mismatched prediction/model state.
- Checkpoint metadata and rejection of timing-encoding mismatch.
- A small native four-branch smoke test.
- Independence of learners, native-cycle reward, and overhead recording.

The validation also included setup-normalization and fallback/feedback tests. These checks were development validation, not extra work performed inside the official timed loop.

The normalized 104 experiment had its own pre-launch validation. Passing those tests does not certify a later GitHub cleanup or a new Windows/Linux build. Repeat the relevant checks after porting.

## 14. Original-paper provenance: correction that must be retained

This is the most important reproducibility correction in the handoff.

The completed comparison run used:

~~~text
24a6b21cfe7607d64510b4a93d15006eb90d5681
~~~

That is a later published cleanup commit. Earlier validation matched a 107-file manifest from that later publication state. It was initially described too strongly as the exact source used for the original paper measurements.

The actual original Advection 60 batch was prepared on 9 October 2026 and saved 151 source files. Its metadata recorded HEAD:

~~~text
b1291f88099e3abb336156ed5e74fd10430703fd
~~~

However, the run was prepared with working-tree changes, so checking out that recorded HEAD alone does not reconstruct its actual source.

The preserved original batch is at:

~~~text
/Users/erisehe/.codex/worktrees/sisc-submission/RLTune-BoomerAMG/results/paper_final/04_online/20261009_full_zero_prefix_6seeds_candidates1024/batches/batch_01/advection_60
~~~

Its saved source files were checked against their manifest. All 151 verified.

The commit that matches all 151 saved source files is:

~~~text
6736efd8c1dfd55082f5cb30833093678048b758
~~~

That is the stronger source base for a strict original-source rerun.

The full correction is recorded at:

~~~text
results/original_paper_advection_60_20261022_161245/original_batch_provenance_recheck.json
~~~

The earlier validation.json should be retained as history, but its “exact original” interpretation is superseded by this audit.

### 14.1 What the comparison did verify

The subsequent audit found:

- 53 core source files compared; 52 byte-identical.
- The remaining core file, setup_reselection.py, differed only in a docstring, with matching executable syntax.
- Moved recovery helper function bodies matched.
- Inspected branch/recovery logic matched after accounting for import renames and docstrings.
- Per-seed computational configurations matched, excluding naming/descriptive/output-path fields.
- Initial encoder metadata matched for both RL branches.
- Recorded environment fields matched after excluding PID.
- The original algorithm’s bins, clipping, scalar setup representation, native-cycle objective, and independent hierarchy construction were present in the rerun.

No algorithmic mismatch was identified in those inspected paths. This supports calling it a published-original-algorithm rerun. It does not make its entire source bundle byte-identical to the original batch.

No new experiment from the exact 151-file-matching source has been launched after this correction.

### 14.2 Historical module numbering

In the old source and data layout:

- module04 / run_04_factorial refers to the online experiment now called Module 1.
- module05 corresponds to the matched-policy experiment now called Module 2.
- module06 corresponds to recovery/variable-flow work now called Module 3.

This old module04 is not the recently removed standalone frozen Module 4.

### 14.3 Native binaries

The original Mac native hashes recorded for reproduction include:

~~~text
HYPRE dylib:
c4ade67c2d6b2d4a3e69554808de3910cd13c42dae93d9312fa4493f89c04e21

Custom runtime wrapper:
15daee59e89d17a77131e4a092bff431846b0dcbf5a2003b7e21f5447fd65ff3
~~~

A Windows or Linux build cannot reuse those Mac binaries. Rebuild the vendored native source and record new compiler/platform/library hashes. Describe it as a new platform reproduction, not binary-identical execution.

### 14.4 Pairing and candidate schedules

The original run used candidate schedules with 15,000 rows, corresponding to 5,000 inputs and three learned-attempt slots. Recent prepared continuous protocols can have 18,000 rows even when the diagnostic stops after 5,000 inputs.

Recent context variants were paired with each other where applicable. Original-versus-new candidate arrays were not perfectly identical over all 5,000 inputs; a difference was found late in the schedule around input 4,950.

Therefore the archived-original versus latest-context comparison is not a perfectly isolated one-factor ablation. Preserve and compare actual arrays before making a causal claim.

Input records for the compared original/rerun problems matched. Also distinguish a canonical content digest from a raw file-byte hash; unlike hash definitions need not produce identical strings for equivalent data.

## 15. Why same-seed reruns can diverge

The experiment is an online learning system driven by measured time.

Measured cycle time influences RL’s learning target and some context versions. Setup execution time and learner/controller overhead influence setup feedback. A small early timing difference can change a model update or selected action, changing later hierarchies and trajectories even with the same RNG seeds.

The provenance investigation found:

- Default’s total native times were very close between archived data and the rerun for the three seeds: approximately +0.069%, -0.226%, and +0.006%.
- Joint controller/learner overhead decreased on average, rather than increasing, in the rerun.
- For seed 2, joint native time increased from about 909.13 s to 1,079.71 s while cycles fell from 113,521 to 105,319.
- The first different joint RL action sequence appeared at input 1 for seed 1 and input 2 for seeds 2 and 3.
- Recorded selected configurations diverged early and differed on most later inputs.

A lower cycle count does not guarantee lower time: cycles on different hierarchies can perform different amounts of work.

These observations support sensitivity to online timing feedback as a mechanism. They do not prove that memory allocation, OS scheduling, cache interference, or a particular removed clip caused the discrepancy.

There was no continuous RSS, page-fault, memory-pressure, or cache-miss history sufficient to identify memory interference as the cause. Checking current free memory cannot reconstruct past contention.

A proposed next diagnostic was a fixed-policy replay under one worker versus three workers, with memory and timing measurements. That diagnostic has not been executed.

Before attributing the performance gap to clipping or hardware, a strict saved-source reproduction and controlled replay would be more informative than another uncontrolled full learning run.

## 16. Hardware and operating-system discussion

### 16.1 Mac used for these runs

The local system reported:

- Mac mini, model identifier Mac17,16.
- Apple M5 Pro.
- 15 CPU cores: 5 super cores and 10 performance cores.
- 24 GB memory.
- 16 GPU cores, Metal 4 support.

The word “super” comes from the reported hardware configuration. It does not mean each core has isolated memory or a dedicated memory bandwidth budget.

The Mac runner requests its existing QoS and uses one numerical thread per process. It cannot guarantee that a particular seed always executes on one named super core.

### 16.2 What processor affinity can and cannot do

Native Windows supports processor affinity. A process can be restricted to selected logical processor IDs.

For a controlled three-seed experiment, identify separate physical cores, avoid placing workers on SMT siblings of the same core, and use comparable core types on a hybrid CPU.

Affinity does not:

- Reserve the entire core exclusively against the operating system.
- Remove interrupts.
- Give each process private RAM bandwidth.
- Eliminate shared last-level cache contention.
- Guarantee identical clock frequency or thermal conditions.

Each process already has its own virtual address space. A memory limit or reserved allocation is not the same as separate physical memory channels or isolated cache.

Linux on supported PC hardware offers stronger tools for CPU sets and isolation, and NUMA placement when the machine actually has multiple NUMA nodes. Those facilities still do not magically eliminate shared hardware resources.

### 16.3 Windows versus WSL2 versus native Linux

The Windows machine’s actual CPU, RAM, GPU, and form factor have not been recorded. Inspect those before choosing worker count or affinity masks.

A quiet dedicated Windows PC might give more controlled measurements than an actively used Mac. There is no evidence yet that it will be faster or reproduce the old savings.

WSL2 is often convenient for the existing Linux-oriented build, but its Linux CPUs are virtual processors scheduled by Windows. Linux affinity within WSL2 is not a guarantee of one exclusive physical host core per seed.

The .wslconfig processors and memory settings constrain VM resources; they do not establish physical core isolation.

Native Linux on the Windows PC may make topology/affinity control more direct. This is different from suggesting native Ubuntu on the M5 Mac. M5 Linux support must be checked separately and is not assumed ready for this experiment.

### 16.4 GPU

The tested native build is CPU-based. No GPU port has been implemented or tested.

HYPRE supports GPU backends such as CUDA, HIP, and SYCL on appropriate hardware. The existing Apple GPU is not used through Metal by this project.

A GPU version would require changes to the native build, supported solver options, bindings/memory handling, and timing synchronization. It would be a new platform/implementation experiment, not a switch that reproduces the current CPU paper measurement.

## 17. Windows portability work that remains

A fresh clone cannot be assumed runnable on native Windows today.

### 17.1 Native library naming and build

The Python binding currently selects a .dylib on Darwin and .so otherwise. Native Windows .dll loading needs explicit support.

The custom Makefile handles Darwin versus a Linux-like build, using MPI compiler wrappers, shared-library flags, and runtime search paths. Native Windows needs an appropriate compiler/MPI/build adaptation.

WSL2/Ubuntu can use the Linux path, but still needs a fresh HYPRE and wrapper build.

### 17.2 Source-snapshot library link

The current local experiments/paper_final/run_online.py prepares a snapshot runtime-library link with a hardcoded .dylib name around its snapshot-copy code.

Linux builds produce .so. Make this platform-aware in development before a Linux/WSL launch, and test that a worker launched from the saved source snapshot loads the intended library.

This is a confirmed issue, not a claim that the entire Windows port has already been completed.

### 17.3 Absolute paths and symlinks

Prepared Mac runs can contain absolute links to data or native installation directories. A copied run directory may therefore look complete but fail on Windows.

For a new Windows experiment, prepare a new output using the transferred source and inputs, and record a new manifest. Preserve historical artifacts unchanged.

Check generated configuration paths, snapshot imports, shared-library paths, subprocess launch behavior, and ready barriers.

### 17.4 Sleep prevention

The runner’s existing caffeinate mechanism applies to macOS. It does not establish Windows or Linux sleep prevention.

Configure the Windows machine to remain awake and on stable power for the run. If using a laptop, power mode and thermal conditions matter. Do not assume the Mac helper has protected a Windows run.

### 17.5 Numerical environment

The project specifies Python >= 3.10 and currently pins:

~~~text
numpy==2.2.6
scipy==1.15.3
mpi4py==4.1.2
matplotlib==3.10.9
mpmath==1.3.0
~~~

Optional report-related packages include reportlab 4.4.5 and pypdf 6.1.1.

Use an isolated environment. Record Python, compiler, MPI, BLAS, package versions, CPU model, OS, and native-library hashes.

Set thread limits before starting Python:

~~~text
OPENBLAS_NUM_THREADS=1
OMP_NUM_THREADS=1
VECLIB_MAXIMUM_THREADS=1
MKL_NUM_THREADS=1
NUMEXPR_NUM_THREADS=1
~~~

The VECLIB setting is relevant to the Mac stack but harmless as documentation of the original environment. Verify the actual Windows/Linux BLAS thread count rather than assuming environment variables were honored.

## 18. Suggested transfer contents

Transfer enough evidence to choose between the current development experiment and strict original-source reproduction.

### 18.1 Essential source material

- This document.
- A fresh clone or Git bundle containing the relevant commits.
- A tracked-file patch from local development.
- All relevant untracked development and fallback modules listed in the appendix.
- The latest compact run’s saved source and source manifest.
- The exact original batch’s source manifest and 151-file saved source.
- The pinned original computational configs, input records, and candidate schedules.
- Native source and build instructions; do not rely on Mac binaries.

### 18.2 Essential result material

At minimum preserve each of the six result sources in Section 12, including:

- Summary JSON/CSV.
- Protocol and source manifest.
- Seed configurations and environment records.
- Status and validation/audit files.
- Per-input timing/trajectory data.
- Checkpoints if policy evaluation or detailed replay is planned.
- Original provenance correction JSON.
- Native hashes and build records.

Summaries alone are sufficient to read headline tables but not to diagnose trajectory divergence or reproduce training.

Large source snapshots/checkpoints/results may be ignored by Git. Explicitly check the transfer inventory.

### 18.3 Recommended transfer method

Before moving:

1. Record git status and the exact HEAD.
2. Export the tracked working-tree diff with binary support where needed.
3. Copy untracked files explicitly; a diff does not include them.
4. Copy selected ignored results/source bundles separately.
5. Verify file hashes after transfer.
6. On Windows, apply the patch to its matching base revision, not blindly to the newer main cleanup.
7. Keep the original-source reproduction separate from the current development checkout.

No patch/archive is created by this Markdown document itself. If only this file is moved, the new assistant must know that the latest code and results are still missing.

## 19. Commands and execution procedure

These commands describe the verified Mac/development interface. They are not a claim that native Windows support is already implemented. Resolve the portability points first.

Use a fresh output directory for each experiment. Do not resume a partially measured contaminated run or overwrite a completed one.

### 19.1 Build on a supported Linux-like environment

After installing the required compiler, CMake, Make, and MPI stack:

~~~bash
python -m pip install -e .
make -C hypre JOBS=4
~~~

Build the project’s vendored HYPRE/custom interface. Do not silently substitute an unrelated system HYPRE package.

### 19.2 Relevant development validation

~~~bash
python -m unittest \
  development.tests.test_compact_context \
  development.tests.test_setup_normalization \
  development.tests.test_default_fallback \
  development.tests.test_fallback_feedback -v
~~~

Run a small native smoke experiment from the prepared source snapshot as well. A Python import test alone will not catch a wrong library link or worker launch failure.

### 19.3 Latest compact-context experiment

From the transferred development checkout:

~~~bash
python -m development.run_compact_context prepare \
  --suite configs/module1/suites/advection_60_batch1.json \
  --cases 5000 \
  --output results/NEW_COMPACT_RUN
~~~

Then execute from the prepared source snapshot, using an absolute output path:

~~~bash
cd /absolute/path/to/results/NEW_COMPACT_RUN/source
PYTHONPATH=. python -m development.run_compact_context run \
  --output /absolute/path/to/results/NEW_COMPACT_RUN
~~~

This is the existing three-seed, four-branch wrapper. It prepares the compact context and runs 5,000 learning inputs without frozen Part 2.

NEW_COMPACT_RUN is a placeholder; choose a new descriptive name. Adapt environment-variable syntax for native PowerShell, and check the snapshot’s native library before launching.

### 19.4 Normalized 104-term experiment

~~~bash
python -m development.run_shared_setup_features prepare \
  --suite configs/module1/suites/advection_60_batch1.json \
  --cases 5000 \
  --normalization range \
  --output results/NEW_SHARED_RANGE_RUN
~~~

Run development.run_shared_setup_features from that prepared source snapshot. The bandit normalization option selects the earlier unbounded-by-range expansion; it is a different experiment.

### 19.5 Official current Module 1

~~~bash
python -m experiments.paper_final.run_online prepare \
  --suite configs/module1/suites/advection_60_batch1.json \
  --output results/NEW_MODULE1_RUN
~~~

Execute experiments.paper_final.run_online run from the prepared snapshot with the absolute output path.

The current full official suite is intended to include the continuous learning/frozen protocol. Inspect protocol.json before starting: do not infer 5,000 versus 6,000 from a directory name.

This official entry point does not automatically enable the development compact-context wrapper.

### 19.6 Strict original-source reproduction

Use a separate checkout/source bundle matching commit 6736efd8c1dfd55082f5cb30833093678048b758 and verify it against all 151 original manifest entries.

The old runner entry point is experiments.paper_final.run_04_factorial. Do not apply the modern run_online command to the old tree without inspecting its CLI.

Original seed configs are retained in the old reproduction layout, including:

~~~text
experiments/paper_final/reproduction/module04/batches/batch_01/advection_60/seed_N/experiment_config.json
~~~

Reconstruct a three-seed suite from the preserved configuration and schedules. Keep the original bins, scalar descriptors, clipping, native reward, retry logic, and fallback behavior. Do not inject latest fallback or compact features into this reproduction.

Rebuild native code for the new platform and label it accurately. A source-exact reproduction on Windows/Linux is still a different native binary and timing environment.

### 19.7 Module 2 later

The current workflow begins with initialization using explicit training runs:

~~~text
python -m experiments.paper_final.run_policy init
  --config <new config path>
  --random-seed 20261019
  --training-run 1=<selected seed 1 training directory>
  ...
  --training-run 6=<selected seed 6 training directory>
~~~

Then validate, prepare, and run with the CLI supported by that revision.

This is illustrative, not a ready command with valid paths. Do not select the latest compact models unless their extra context can be recreated consistently for evaluation.

## 20. What should happen next on the Windows computer

The next assistant should first establish the machine and source state, not immediately launch a long run.

A sensible order is:

1. Identify CPU topology, RAM, OS/WSL choice, available storage, and power/sleep settings.
2. Confirm whether the local development patch and untracked files were transferred.
3. Confirm whether the exact original source bundle and paired inputs/candidates were transferred.
4. Review the newer remote main cleanup separately; do not mix it into a measured baseline silently.
5. Fix only required portability issues in development.
6. Build the native backend and validate the snapshot launch.
7. Run the targeted tests and a small four-branch smoke check.
8. Decide with the researcher whether the next full run is strict original-source reproduction, the latest compact context, or a controlled timing replay.
9. Record full provenance before the chosen run.
10. Measure a new Default baseline on the Windows machine alongside the other methods.

The most direct unresolved question is whether the exact original saved source reproduces its behavior more closely under controlled conditions. Another useful diagnostic is a fixed-policy single-worker versus concurrent-worker replay. Neither was completed on the Mac after the provenance correction.

Do not change normalization, reward, retry scoring, and concurrency simultaneously and then attribute the result to only one of them.

## 21. Manuscript and Overleaf context

The manuscript has been edited extensively, but it is a separate repository and should remain separate from this Windows transfer.

Earlier requested changes included:

- Remove bold emphasis from the evolving setup/solve learner paragraph; leave “well” unmarked.
- Use directional rows for Setup → Solve and Solve → Setup in the coupling table, with consistent capitalization.
- Tighten the large gap before the coupling table’s final column.
- Remove the extra state/loss-notation sentence from that caption.
- Verify consistency of the failure symbol with earlier definitions.
- Make the notation table’s Meaning-column font slightly smaller while preserving that change during synchronization.
- State that both LinUCB and LSTDQ learn from the first input throughout the prescribed stream.
- Avoid hardcoding the 5,000-input experiment length in the general method definition.
- Replace vague experiment references with the relevant subsections/table.
- Simplify the joint-results claim and remove a redundant superadditive-savings sentence.
- Rename the setup-reconfiguration paragraph “Joint execution protocol.”
- Remove repeated retry/accounting explanations already covered in earlier sections.
- Clarify that both LinUCB and joint use the learned-attempt budget.
- Remove an unnecessary temporary-residual-growth sentence.
- Update feature-normalization formulas minimally after the intended code changes, removing obsolete clipping language.
- Keep paper changes narrow; the user objected when unrelated files appeared in an Overleaf push intended only to change table font.

These are historical instructions, not a guarantee that every latest development experiment has been described in the paper. The compact context and logarithmic timing experiment have not been accepted as the final paper algorithm.

Before any future manuscript update, fetch and compare the actual Overleaf source, identify conflicts, and preserve the professor’s edits. A prior local PDF or a clean Git status is not enough to infer synchronization.

Do not update paper numerical claims using a three-seed diagnostic table without an explicit decision about final experimental data.

## 22. External technical references used in the platform discussion

These primary documentation sources explain the platform capabilities discussed. They do not prove the cause of the observed timing variation.

- Windows process affinity: https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-setprocessaffinitymask
- Windows CPU sets: https://learn.microsoft.com/en-us/windows/win32/procthread/cpu-sets
- WSL configuration and VM limits: https://learn.microsoft.com/en-us/windows/wsl/wsl-config
- Ubuntu CPU-set isolation: https://documentation.ubuntu.com/real-time/en/latest/how-to/isolate-workload-cpusets/
- Linux cgroup v2: https://docs.kernel.org/admin-guide/cgroup-v2.html
- HYPRE GPU build options: https://hypre.readthedocs.io/en/latest/ch-misc.html#gpu-build-options
- Apple Silicon performance guidance: https://developer.apple.com/documentation/apple-silicon/tuning-your-code-s-performance-for-apple-silicon/
- Apple affinity API discussion: https://developer.apple.com/library/archive/releasenotes/Performance/RN-AffinityAPI/index.html
- Asahi M5 support status: https://asahilinux.org/docs/platform/feature-support/m5/
- Benchmark measurement guidance: https://pyperf.readthedocs.io/en/latest/run_benchmark.html

## 23. Interpretation guardrails for the next assistant

Keep these distinctions visible in future answers:

- **Measured result** versus **hypothesized cause**.
- **Original archived measurements** versus **published-original-algorithm rerun** versus **exact original-source reproduction not yet run**.
- **Native savings** versus **inclusive savings**.
- **Last 1,000 learning inputs** versus **1,000 frozen inputs**.
- **Same seed label** versus **identical realized timing-driven learning trajectory**.
- **Same setup configuration** versus **shared physical hierarchy construction**.
- **Same state dimension** versus **same feature semantics**.
- **Fixed range normalization** versus **clipping** versus **running normalization**.
- **Linear failure score** versus **calibrated failure probability**.
- **Assigned bandit feedback** versus **per-problem evaluation cost**.
- **Local main** versus **live GitHub main** versus **uncommitted development**.
- **Processor affinity** versus **memory/cache isolation**.
- **Completed diagnostic** versus **accepted final paper run**.

If a required file was not transferred, say so and recover it from the Mac/source archive. Do not fill missing provenance with assumptions.

## Appendix A. Verified numerical comparison

The tables below were generated directly from the saved summary JSON files during this handoff. Each percentage uses that run’s own Default branch for the same seed and window. All means are arithmetic means across seeds 1–3. Percentages are rounded to two decimals; seconds to three decimals.

### A.1 Mean savings over learning inputs 1–5,000

| Experiment | LSTDQ native / inclusive | LinUCB native / inclusive | Joint native / inclusive |
|---|---:|---:|---:|
| Original archived paper | 8.55% / 7.29% | 15.69% / 14.28% | 34.19% / 30.20% |
| Published original-algorithm rerun | 8.73% / 7.49% | 17.94% / 16.55% | 31.17% / 27.45% |
| Basic 19, range normalized | 8.70% / 7.82% | 17.03% / 15.61% | 29.04% / 25.64% |
| Shared 104, bandit scaling | 8.84% / 3.93% | 16.85% / 15.44% | 32.62% / 21.04% |
| Shared 104, range normalized | 8.57% / 3.38% | 18.86% / 17.47% | 33.07% / 21.63% |
| Compact 19+3, logarithmic time | 8.10% / 7.20% | 16.69% / 15.30% | 30.68% / 27.19% |

### A.2 Each seed and each learning method

Entries are native savings / inclusive savings. Default is the zero-reduction reference.

#### Original archived paper

| Seed | LSTDQ | LinUCB | Joint |
|---|---:|---:|---:|
| 1 | 8.39% / 7.13% | 16.40% / 14.99% | 29.85% / 25.72% |
| 2 | 8.65% / 7.39% | 12.74% / 11.36% | 37.00% / 32.95% |
| 3 | 8.60% / 7.35% | 17.94% / 16.49% | 35.73% / 31.93% |

#### Published original-algorithm rerun

| Seed | LSTDQ | LinUCB | Joint |
|---|---:|---:|---:|
| 1 | 8.67% / 7.42% | 15.69% / 14.28% | 33.82% / 30.02% |
| 2 | 8.82% / 7.59% | 18.60% / 17.24% | 25.01% / 21.19% |
| 3 | 8.71% / 7.46% | 19.53% / 18.13% | 34.68% / 31.13% |

#### Basic 19, range normalized

| Seed | LSTDQ | LinUCB | Joint |
|---|---:|---:|---:|
| 1 | 8.78% / 7.90% | 16.34% / 14.92% | 21.32% / 17.56% |
| 2 | 8.67% / 7.79% | 15.36% / 13.95% | 34.78% / 31.47% |
| 3 | 8.65% / 7.77% | 19.39% / 17.95% | 31.02% / 27.87% |

#### Shared 104, bandit scaling

| Seed | LSTDQ | LinUCB | Joint |
|---|---:|---:|---:|
| 1 | 8.76% / 3.87% | 19.56% / 18.16% | 33.55% / 21.92% |
| 2 | 9.00% / 4.08% | 14.58% / 13.17% | 31.50% / 20.03% |
| 3 | 8.76% / 3.84% | 16.42% / 14.99% | 32.81% / 21.18% |

#### Shared 104, range normalized

| Seed | LSTDQ | LinUCB | Joint |
|---|---:|---:|---:|
| 1 | 8.79% / 3.65% | 19.40% / 18.01% | 30.55% / 18.54% |
| 2 | 8.36% / 3.13% | 17.58% / 16.22% | 33.66% / 23.02% |
| 3 | 8.57% / 3.36% | 19.61% / 18.19% | 35.00% / 23.33% |

#### Compact 19+3, logarithmic time

| Seed | LSTDQ | LinUCB | Joint |
|---|---:|---:|---:|
| 1 | 8.10% / 7.19% | 13.94% / 12.55% | 25.86% / 22.24% |
| 2 | 8.55% / 7.66% | 16.33% / 14.92% | 35.17% / 31.75% |
| 3 | 7.66% / 6.74% | 19.80% / 18.43% | 31.01% / 27.57% |

### A.3 Joint early and late learning windows

The basic-19 run’s last_1000 is frozen evaluation and is deliberately not shown as late learning.

| Experiment | Inputs 1–1,000 native / inclusive | Inputs 4,001–5,000 native / inclusive |
|---|---:|---:|
| Original archived paper | 6.38% / 1.31% | 42.93% / 39.28% |
| Published original-algorithm rerun | 2.31% / -2.62% | 39.90% / 36.56% |
| Basic 19, range normalized | 0.64% / -3.65% | Not extracted here; last_1000 is frozen |
| Shared 104, bandit scaling | 3.24% / -13.50% | 41.27% / 31.36% |
| Shared 104, range normalized | 3.05% / -13.70% | 42.08% / 32.31% |
| Compact 19+3, logarithmic time | 3.10% / -1.50% | 39.30% / 36.20% |

The basic-19 run’s joint frozen inputs 5,001–6,000 give 36.71% / 34.83% (native / inclusive). This is not an original-paper frozen baseline.

### A.4 Absolute times for the archived paper, rerun, and compact test

Each row covers 5,000 learning inputs. Measured overhead below is total_sec minus native_sec; it is not total wall-clock duration of the worker.

#### Original archived paper

| Seed | Method | Native seconds | Inclusive seconds | Difference / overhead seconds | Cycles | Final failures |
|---|---|---:|---:|---:|---:|---:|
| 1 | Default | 1445.208 | 1445.208 | 0.000 | 62,700 | 0 |
| 1 | LSTDQ | 1323.948 | 1342.160 | 18.211 | 43,953 | 0 |
| 1 | LinUCB | 1208.156 | 1228.521 | 20.365 | 109,346 | 0 |
| 1 | Joint | 1013.874 | 1073.448 | 59.574 | 118,670 | 0 |
| 2 | Default | 1443.091 | 1443.091 | 0.000 | 62,767 | 0 |
| 2 | LSTDQ | 1318.228 | 1336.480 | 18.252 | 43,206 | 0 |
| 2 | LinUCB | 1259.250 | 1279.223 | 19.973 | 130,623 | 0 |
| 2 | Joint | 909.130 | 967.633 | 58.502 | 113,521 | 0 |
| 3 | Default | 1450.693 | 1450.693 | 0.000 | 62,711 | 0 |
| 3 | LSTDQ | 1325.906 | 1344.103 | 18.198 | 43,394 | 0 |
| 3 | LinUCB | 1190.496 | 1211.531 | 21.035 | 118,612 | 0 |
| 3 | Joint | 932.418 | 987.517 | 55.099 | 102,893 | 0 |

#### Published original-algorithm rerun

| Seed | Method | Native seconds | Inclusive seconds | Difference / overhead seconds | Cycles | Final failures |
|---|---|---:|---:|---:|---:|---:|
| 1 | Default | 1446.208 | 1446.208 | 0.000 | 62,700 | 0 |
| 1 | LSTDQ | 1320.882 | 1338.962 | 18.079 | 43,520 | 0 |
| 1 | LinUCB | 1219.235 | 1239.735 | 20.500 | 119,230 | 0 |
| 1 | Joint | 957.071 | 1011.999 | 54.928 | 100,909 | 0 |
| 2 | Default | 1439.834 | 1439.834 | 0.000 | 62,767 | 0 |
| 2 | LSTDQ | 1312.793 | 1330.571 | 17.777 | 43,167 | 0 |
| 2 | LinUCB | 1172.029 | 1191.663 | 19.634 | 100,264 | 0 |
| 2 | Joint | 1079.708 | 1134.730 | 55.022 | 105,319 | 0 |
| 3 | Default | 1450.779 | 1450.779 | 0.000 | 62,711 | 0 |
| 3 | LSTDQ | 1324.455 | 1342.484 | 18.029 | 43,508 | 0 |
| 3 | LinUCB | 1167.422 | 1187.744 | 20.322 | 98,441 | 0 |
| 3 | Joint | 947.590 | 999.157 | 51.567 | 87,167 | 0 |

#### Compact 19+3, logarithmic time

| Seed | Method | Native seconds | Inclusive seconds | Difference / overhead seconds | Cycles | Final failures |
|---|---|---:|---:|---:|---:|---:|
| 1 | Default | 1439.483 | 1439.483 | 0.000 | 62,700 | 0 |
| 1 | LSTDQ | 1322.912 | 1336.036 | 13.123 | 45,019 | 0 |
| 1 | LinUCB | 1238.783 | 1258.870 | 20.087 | 121,537 | 0 |
| 1 | Joint | 1067.259 | 1119.373 | 52.114 | 107,725 | 0 |
| 2 | Default | 1442.102 | 1442.102 | 0.000 | 62,767 | 0 |
| 2 | LSTDQ | 1318.778 | 1331.690 | 12.912 | 44,013 | 0 |
| 2 | LinUCB | 1206.642 | 1226.910 | 20.269 | 123,676 | 0 |
| 2 | Joint | 934.905 | 984.169 | 49.264 | 96,969 | 0 |
| 3 | Default | 1448.592 | 1448.592 | 0.000 | 62,711 | 0 |
| 3 | LSTDQ | 1337.571 | 1350.908 | 13.337 | 45,722 | 0 |
| 3 | LinUCB | 1161.800 | 1181.625 | 19.825 | 91,941 | 0 |
| 3 | Joint | 999.451 | 1049.283 | 49.831 | 97,171 | 0 |

### A.5 Joint overhead and recovery counts

These counts separate failed first attempts and fallbacks from final failure.

| Experiment | Seed | Joint overhead seconds | First-attempt failures | Fallbacks | Final failures |
|---|---:|---:|---:|---:|---:|
| Original archived paper | 1 | 59.574 | 297 | 0 | 0 |
| Original archived paper | 2 | 58.502 | 147 | 0 | 0 |
| Original archived paper | 3 | 55.099 | 143 | 0 | 0 |
| Original archived paper: mean overhead | — | 57.725 | — | — | — |
| Published original-algorithm rerun | 1 | 54.928 | 187 | 0 | 0 |
| Published original-algorithm rerun | 2 | 55.022 | 332 | 0 | 0 |
| Published original-algorithm rerun | 3 | 51.567 | 191 | 0 | 0 |
| Published original-algorithm rerun: mean overhead | — | 53.839 | — | — | — |
| Basic 19, range normalized | 1 | 54.356 | 354 | 2 | 0 |
| Basic 19, range normalized | 2 | 47.686 | 177 | 0 | 0 |
| Basic 19, range normalized | 3 | 45.337 | 234 | 0 | 0 |
| Basic 19, range normalized: mean overhead | — | 49.126 | — | — | — |
| Shared 104, bandit scaling | 1 | 168.365 | 243 | 0 | 0 |
| Shared 104, bandit scaling | 2 | 164.744 | 239 | 0 | 0 |
| Shared 104, bandit scaling | 3 | 167.526 | 193 | 0 | 0 |
| Shared 104, bandit scaling: mean overhead | — | 166.878 | — | — | — |
| Shared 104, range normalized | 1 | 173.347 | 297 | 0 | 0 |
| Shared 104, range normalized | 2 | 153.635 | 215 | 0 | 0 |
| Shared 104, range normalized | 3 | 169.515 | 177 | 0 | 0 |
| Shared 104, range normalized: mean overhead | — | 165.499 | — | — | — |
| Compact 19+3, logarithmic time | 1 | 52.114 | 233 | 2 | 0 |
| Compact 19+3, logarithmic time | 2 | 49.264 | 176 | 0 | 0 |
| Compact 19+3, logarithmic time | 3 | 49.831 | 183 | 0 | 0 |
| Compact 19+3, logarithmic time: mean overhead | — | 50.403 | — | — | — |

## Appendix B. Working-tree changes to transfer

This is the verified state during handoff creation. M means modified tracked file; D means deleted tracked file; ?? means untracked. A Git patch does not contain the ?? files. Results under ignored directories are not listed by ordinary git status.

The main production changes listed below were compared with development: corresponding files were byte-identical, and the removed production retry_comparison.py was absent in both. Thus those local production edits are mirrored in development. This does not mean they are pushed, nor does it include the newer remote-main cleanup.

### B.1 Local main

~~~text
 M experiments/paper_final/online/case_loop.py
 M experiments/paper_final/online/factorial.py
 M experiments/paper_final/online/native_case.py
 M experiments/paper_final/online/setup_branches.py
 M experiments/paper_final/recovery/audit.py
 M experiments/paper_final/recovery/execution.py
 M experiments/paper_final/recovery/joint_validation.py
 M experiments/paper_final/recovery/model_audit.py
 M experiments/paper_final/recovery/observations.py
 D experiments/paper_final/recovery/retry_comparison.py
 M experiments/paper_final/run_online.py
 M setup/learners/linucb/learner.py
 M setup/learners/linucb/setup_reselection.py
?? experiments/paper_final/recovery/default_fallback.py
?? experiments/paper_final/recovery/setup_feedback.py
~~~

### B.2 Local codex/development

~~~text
 M development/README.md
 M development/tests/test_continuous_module1.py
 M development/tests/test_frozen_feedback.py
 M experiments/paper_final/online/case_loop.py
 M experiments/paper_final/online/factorial.py
 M experiments/paper_final/online/native_case.py
 M experiments/paper_final/online/setup_branches.py
 M experiments/paper_final/recovery/audit.py
 M experiments/paper_final/recovery/execution.py
 M experiments/paper_final/recovery/joint_validation.py
 M experiments/paper_final/recovery/model_audit.py
 M experiments/paper_final/recovery/observations.py
 D experiments/paper_final/recovery/retry_comparison.py
 M experiments/paper_final/run_online.py
 M setup/learners/linucb/learner.py
 M setup/learners/linucb/setup_reselection.py
?? development/compact_context.py
?? development/diagnose_advection.py
?? development/diagnose_shared_setup_features.py
?? development/replay_setup_feature_diagnosis.py
?? development/retry_comparison.py
?? development/run_compact_context.py
?? development/run_retry_comparison.py
?? development/run_setup_normalization.py
?? development/run_shared_setup_features.py
?? development/setup_normalization.py
?? development/shared_setup_features.py
?? development/tests/test_compact_context.py
?? development/tests/test_default_fallback.py
?? development/tests/test_fallback_feedback.py
?? development/tests/test_module3_retry_comparison.py
?? development/tests/test_retry_comparison.py
?? development/tests/test_setup_normalization.py
?? development/tests/test_shared_setup_features.py
?? experiments/paper_final/recovery/default_fallback.py
?? experiments/paper_final/recovery/setup_feedback.py
~~~

The compact wrapper and diagnostic tests are part of the current local development state. The old production recovery/retry_comparison.py deletion is intentional: alternatives were moved under development while the normal production retry model remains available through the shared feedback implementation. Preserve this organization when transferring.

## Appendix C. Exact run completion records

These records are copied from status.json files, rather than inferred from old progress messages.

### results/compact_context_advection_60_5000_20261022_142246

~~~json
{
  "batch_status": {
    "at": "2026-10-22T19:53:17.490975+00:00",
    "passed": true,
    "status": "complete"
  },
  "seed_status": {
    "1": {
      "cases": 5000,
      "elapsed_sec": 5354.245994250006,
      "processed": 5000,
      "status": "complete"
    },
    "2": {
      "cases": 5000,
      "elapsed_sec": 5190.059820082999,
      "processed": 5000,
      "status": "complete"
    },
    "3": {
      "cases": 5000,
      "elapsed_sec": 5238.507127375,
      "processed": 5000,
      "status": "complete"
    }
  }
}
~~~

### results/shared_setup_features_normalized_advection_60_5000_20261022_123906

~~~json
{
  "batch_status": {
    "at": "2026-10-22T18:09:39.826312+00:00",
    "passed": true,
    "status": "complete"
  },
  "seed_status": {
    "1": {
      "cases": 5000,
      "elapsed_sec": 5406.999215333002,
      "processed": 5000,
      "status": "complete"
    },
    "2": {
      "cases": 5000,
      "elapsed_sec": 5380.363788667004,
      "processed": 5000,
      "status": "complete"
    },
    "3": {
      "cases": 5000,
      "elapsed_sec": 5372.343399291996,
      "processed": 5000,
      "status": "complete"
    }
  }
}
~~~

### results/shared_setup_features_advection_60_5000_20261022_044622

~~~json
{
  "batch_status": {
    "at": "2026-10-22T10:17:02.214720+00:00",
    "passed": true,
    "status": "complete"
  },
  "seed_status": {
    "1": {
      "cases": 5000,
      "elapsed_sec": 5360.117549084,
      "processed": 5000,
      "status": "complete"
    },
    "2": {
      "cases": 5000,
      "elapsed_sec": 5413.011286625002,
      "processed": 5000,
      "status": "complete"
    },
    "3": {
      "cases": 5000,
      "elapsed_sec": 5390.049468667003,
      "processed": 5000,
      "status": "complete"
    }
  }
}
~~~

### results/setup_normalization_advection_60_20261022_020717/advection_60_batch1

~~~json
{
  "batch_status": {
    "at": "2026-10-22T07:54:14.877722+00:00",
    "passed": true,
    "status": "complete"
  },
  "seed_status": {
    "1": {
      "cases": 6000,
      "elapsed_sec": 6386.813912207999,
      "processed": 6000,
      "status": "complete"
    },
    "2": {
      "cases": 6000,
      "elapsed_sec": 6194.918528208,
      "processed": 6000,
      "status": "complete"
    },
    "3": {
      "cases": 6000,
      "elapsed_sec": 6182.315146541001,
      "processed": 6000,
      "status": "complete"
    }
  }
}
~~~

### results/original_paper_advection_60_20261022_161245/run

~~~json
{
  "batch_status": {
    "at": "2026-10-22T21:43:06.274265+00:00",
    "passed": true,
    "status": "complete"
  },
  "seed_status": {
    "1": {
      "cases": 5000,
      "elapsed_sec": 5238.038173083005,
      "processed": 5000,
      "status": "complete"
    },
    "2": {
      "cases": 5000,
      "elapsed_sec": 5299.043923124998,
      "processed": 5000,
      "status": "complete"
    },
    "3": {
      "cases": 5000,
      "elapsed_sec": 5179.6915583750015,
      "processed": 5000,
      "status": "complete"
    }
  }
}
~~~

## Appendix D. Transfer acceptance checklist

- [ ] The chosen source revision is explicit; the new GitHub main cleanup has not been silently substituted.
- [ ] Current development tracked edits and untracked files are present if testing the compact variant.
- [ ] Exact original 151-file source and its manifest are present if reproducing the original.
- [ ] Input and candidate arrays are present and their pairing is verified.
- [ ] Historical summaries and provenance correction are accessible.
- [ ] Native libraries have been rebuilt for the new platform and their paths/hashes recorded.
- [ ] Source-snapshot library naming and symlinks work on the target OS.
- [ ] Thread counts are verified; topology/affinity, if used, is documented.
- [ ] The computer will remain awake and power/thermal conditions are controlled.
- [ ] Targeted validation and a small four-branch native smoke run pass.
- [ ] The experiment protocol explicitly states 5,000 learning-only or continuous 5,000 + 1,000 frozen.
- [ ] RL native-cycle objective, retry variant, fallback feedback, and exact context version are recorded.
- [ ] No unsupported checkpoint is forced into a differently defined encoder.
- [ ] A fresh output directory and complete source manifest are created.
- [ ] Reporting uses a local Default baseline and separates native/inclusive savings.

## Appendix E. Short continuation brief

> Continue from the preserved source and evidence, not from assumptions about the newest GitHub branch. The latest compact Advection 60 test and the published-original-algorithm rerun both finished for seeds 1–3. Their joint inclusive savings are 27.19% and 27.45%, compared with 30.20% in the original archived three-seed data. The compact change is local development work: 19 range-normalized setup descriptors plus three own-bandit predictions for joint, 35 state entries; fixed-setup LSTDQ remains 32. Its time context is natural log(1 + previous native cycle seconds / 0.001), with no clipping; RL cost remains native cycle time. Normal failure-model retries and successful Default-fallback setup feedback remain in that development test. The original rerun used cleanup commit 24a6b21, not the exact original 151-file bundle; commit 6736efd matches that original bundle. No exact-source rerun has followed the correction. Preserve local changes, port/build carefully, and do not push or edit the paper without a new request.
