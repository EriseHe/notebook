# 1) Big picture

Yes—you can compute the viewing vector ((i,j,k)) automatically. The standard, robust way (and the one TNG’s value-added catalogs use) is:

* Build a **shape/inertia tensor** from the galaxy’s material inside (\sim 2,R_{1/2,\star}).
* Take its **minor-axis eigenvector** as the **disk normal** (\hat n).
* Use (\hat n) as **face-on**; any vector perpendicular to (\hat n) is **edge-on** (usually pick the in-plane **major-axis** eigenvector for a deterministic edge-on).

A common cross-check is the **spin vector** (\hat L) from (\sum m,\mathbf r\times\mathbf v): for clean disks, (\hat n) and (\hat L) agree within (\lesssim 10–15^\circ). When they disagree strongly, the system isn’t a thin disk (barred/warped/merging).

Below is a drop-in function that returns the three camera choices you want and quality flags, and a two-line change to your notebook so you never tweak ((i,j,k)) by hand again.

---

# 2) What to compute (formal)

Let ({\mathbf r_k,\mathbf v_k,m_k}) be star-forming gas (or stars) **relative** to the subhalo center, in **physical kpc** and **km/s**.

* **Shape tensor**
  [
  \mathbf S=\sum_k w_k,\mathbf r_k,\mathbf r_k^\top,\qquad
  w_k=\begin{cases}
  m_k & \text{(standard)}\
  m_k/r_k^2 & \text{(reduced; emphasizes inner disk)}
  \end{cases}
  ]
  Let eigenvalues be (\lambda_1\ge\lambda_2\ge\lambda_3) with eigenvectors
  ((\hat e_{\rm major},\hat e_{\rm inter},\hat e_{\rm minor})).
  Set (\hat n=\hat e_{\rm minor}) (disk normal).

* **Spin**
  [
  \mathbf L=\sum_k m_k,\mathbf r_k\times\mathbf v_k,\qquad
  \hat L=\mathbf L/\lVert\mathbf L\rVert .
  ]

**Face-on:** LOS (= \hat n).
**Edge-on (major):** LOS (= \hat e_{\rm major}).
**Edge-on (intermediate):** LOS (= \hat e_{\rm inter}).

Quality metrics: (c/a=\sqrt{\lambda_3/\lambda_1}) (thin disk if small),
(\theta=\arccos(|\hat n\cdot \hat L|)) (alignment).

---

# 3) Paste this helper into your codebase (works with your units/flow)

```python
import numpy as np
import illustris_python as il

def _unit(v):
    n = np.linalg.norm(v)
    return v/n if n > 0 else v

def _periodic_relative(coords_ckpch, cm_ckpch, box_ckpch):
    # shift into [-box/2, box/2) around subhalo center (both in ckpc/h)
    dr = coords_ckpch - cm_ckpch
    dr -= np.rint(dr/box_ckpch) * box_ckpch
    return dr

def _to_phys_kpc(dr_ckpch, a, h):
    return dr_ckpch * a / h

def _rel_vel_kms(vels_snapshot, vcm_kms, a):
    # snapshot vels are in km/s * sqrt(a); bring to km/s and center
    return vels_snapshot*np.sqrt(a) - vcm_kms

def _shape_axes(xyz_kpc, m=None, reduced=True, eps=1e-8):
    r2 = np.sum(xyz_kpc*xyz_kpc, axis=1) + eps
    w = (m if m is not None else np.ones(xyz_kpc.shape[0]))
    if reduced:
        w = w / r2
    S = np.einsum('i,ij,ik->jk', w, xyz_kpc, xyz_kpc)
    evals, evecs = np.linalg.eigh(S)             # ascending
    idx = np.argsort(evals)                       # 0=min -> minor
    e_minor = _unit(evecs[:, idx[0]])
    e_inter = _unit(evecs[:, idx[1]])
    e_major = _unit(evecs[:, idx[2]])
    lam = evals[idx]
    return e_major, e_inter, e_minor, lam

def _spin_axis(xyz_kpc, vxyz_kms, m=None):
    m = m if m is not None else np.ones(xyz_kpc.shape[0])
    L = np.sum(np.cross(xyz_kpc, vxyz_kms) * m[:, None], axis=0)
    return _unit(L)

def compute_tng_orientation(basePath, snap, subhalo_id,
                            tracer='gas_sf',        # 'gas_sf' or 'stars'
                            aperture_factor=2.0,    # use ~2*Rhalf*
                            reduced=True,           # reduced-tensor weighting
                            min_count=100):
    """
    Returns:
      ex_faceon, ex_edgeon_major, ex_edgeon_inter, info
    where ex_* are unit LOS vectors (i,j,k) for your mk_particle_files(ex=...).
    'info' includes diagnostics: counts, c/a, b/a, spin-shape angle, etc.
    """
    # Header for a, box size
    hdr = il.groupcat.loadHeader(basePath, snap)
    a = hdr['Time']
    box = hdr['BoxSize']            # ckpc/h

    sub = il.groupcat.loadSingle(basePath, snap, subhaloID=subhalo_id)
    cm  = sub['SubhaloPos']         # ckpc/h
    vcm = sub['SubhaloVel']         # km/s
    rhalf_star_ckpch = sub['SubhaloHalfmassRadType'][4]  # stars
    from astropy.cosmology import Planck15 as cosmo
    h = cosmo.H0.value * 1e-2
    r_ap_kpc = (rhalf_star_ckpch * a / h) * aperture_factor

    if tracer == 'gas_sf':
        g = il.snapshot.loadSubhalo(basePath, snap, subhalo_id, 0,
                                    fields=['Coordinates','Velocities','Masses','StarFormationRate'])
        sel = (g['StarFormationRate'] > 0)
        coords = g['Coordinates'][sel]
        vels   = g['Velocities'][sel]
        mass   = g['Masses'][sel] * 1e10 / h
    elif tracer == 'stars':
        s = il.snapshot.loadSubhalo(basePath, snap, subhalo_id, 4,
                                    fields=['Coordinates','Velocities','Masses','GFM_StellarFormationTime'])
        sel = (s['GFM_StellarFormationTime'] >= 0)
        coords = s['Coordinates'][sel]
        vels   = s['Velocities'][sel]
        mass   = s['Masses'][sel] * 1e10 / h
    else:
        raise ValueError("tracer must be 'gas_sf' or 'stars'.")

    # relative, periodic, physical
    dr_ckpch = _periodic_relative(coords, cm, box)
    xyz_kpc  = _to_phys_kpc(dr_ckpch, a, h)
    r = np.linalg.norm(xyz_kpc, axis=1)
    keep = (r <= r_ap_kpc)
    xyz_kpc  = xyz_kpc[keep]
    mass     = mass[keep]
    vxyz_kms = _rel_vel_kms(vels[keep], vcm, a)

    if xyz_kpc.shape[0] < min_count and tracer == 'gas_sf':
        # fallback to stars if too few SF cells
        return compute_tng_orientation(basePath, snap, subhalo_id,
                                       tracer='stars', aperture_factor=aperture_factor,
                                       reduced=reduced, min_count=min_count)

    # shape + spin
    e_major, e_inter, e_minor, lam = _shape_axes(xyz_kpc, mass, reduced=reduced)
    n_shape = e_minor
    L_hat   = _spin_axis(xyz_kpc, vxyz_kms, mass)

    # quality metrics
    c_over_a = np.sqrt(max(lam[0],1e-30) / max(lam[2],1e-30))   # sqrt(l3/l1)
    b_over_a = np.sqrt(max(lam[1],1e-30) / max(lam[2],1e-30))   # sqrt(l2/l1)
    cosang   = np.clip(abs(np.dot(n_shape, L_hat)), 0.0, 1.0)
    theta_deg = np.degrees(np.arccos(cosang))

    info = dict(
        tracer=tracer,
        n_used=int(xyz_kpc.shape[0]),
        r_ap_kpc=float(r_ap_kpc),
        c_over_a=float(c_over_a),
        b_over_a=float(b_over_a),
        spin_shape_angle_deg=float(theta_deg)
    )

    # LOS vectors for your pipeline
    ex_faceon        = n_shape
    ex_edgeon_major  = e_major
    ex_edgeon_inter  = e_inter
    return ex_faceon, ex_edgeon_major, ex_edgeon_inter, info
```

**Why this is safe:** it uses **subhalo** particles (not the whole FoF), does the **periodic** centering correctly from the header’s `BoxSize`, converts to **physical kpc** and **km/s**, and matches the **TNG convention** (minor axis within (2R_{1/2,\star})).

---

# 4) How to plug it into your existing notebook

```python
snap    = 98
subhalo = 503745
basePath = '../sims.TNG/TNG50-1/output'
FOV = 61
fib_n = 7
cpu_count = 16

# (A) Get viewing vectors once
ex_face, ex_edge_major, ex_edge_inter, info = compute_tng_orientation(
    basePath, snap, subhalo,
    tracer='gas_sf',        # auto-falls back to 'stars' if too few SF cells
    aperture_factor=2.0,
    reduced=True
)
print("Orientation diagnostics:", info)

# (B) Make particle files without hand-tuning (choose one)
# Face-on
sifu.mk_particle_files(subhalo, snap, basePath, ex=ex_face, FOV=FOV, overwrite=True, view=0)
# Edge-on (major-axis LOS)
sifu.mk_particle_files(subhalo, snap, basePath, ex=ex_edge_major, FOV=FOV, overwrite=True, view=1)
# Edge-on (intermediate-axis LOS)
sifu.mk_particle_files(subhalo, snap, basePath, ex=ex_edge_inter, FOV=FOV, overwrite=True, view=2)

# ...then your mk_mock_RSS(...) and regrid(...)
```

If you also want a **fixed roll** (major axis horizontal), keep using `ex` for the LOS and later, when you form maps, rotate the *image plane* so that the 2D inertia major axis aligns with +X; but for most science, picking LOS as above is enough.

---

# 5) “How do we know it’s *really* face-on/edge-on?”

Use objective checks. After you compute the axes once, report:

* **Diskiness:** (c/a=\sqrt{\lambda_3/\lambda_1}).

  * Thin disk: (c/a \lesssim 0.25\text{–}0.35).
  * If (c/a) is large, “face-on/edge-on” is not well-defined (triaxial/spheroid).

* **Spin–shape agreement:** (\theta=\arccos|\hat n!\cdot!\hat L|).

  * Good disks: (\theta \lesssim 10\text{–}15^\circ).
  * If (\theta \gtrsim 30^\circ), flag as **ambiguous** (barred/warped/merger).

* **Kinematic sanity (optional):**
  Generate quick cubes in face-on vs edge-on. The LOS velocity amplitude should be **minimal** face-on and **maximal** edge-on. A ratio (V_{\rm max,edge}/V_{\rm max,face}\gg 1) is a strong check.

In practice, logging `(n_used, c/a, b/a, spin_shape_angle_deg)` per galaxy gives you a quantitative “certainty” without any eyeballing.

---

# 6) Small gotchas to avoid

* Work on the **subhalo** (not the whole FoF) to avoid contaminating satellites.
* Use a **finite aperture** (e.g., (2,R_{1/2,\star})); whole-halo shapes are noisy.
* Prefer **SF gas** for disks; **stars** as fallback for quenched/poorly sampled systems.
* Keep a **reduced** tensor (weights (m/r^2)) if you want the inner disk to control the axis.

---

If you want, I can add a tiny wrapper that **builds all three cubes** (face-on + two edge-on) and writes the metrics into the FITS header so your downstream analysis “knows” which orientation it’s looking at.
