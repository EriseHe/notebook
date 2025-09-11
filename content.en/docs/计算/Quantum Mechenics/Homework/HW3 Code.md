import numpy as np
import scipy.sparse as sp
import scipy.sparse.linalg as spla
import matplotlib.pyplot as plt

def computation():
    #parameters
    N, V0_tilde, L = 600, 10.0, 1.0
    M, dx = N - 2, L / (N - 1)
    x_vals = np.linspace(-0.5 * L + dx, 0.5 * L - dx, M)  # Interior points

    # KE matrix T (tridiagonal)
    factor = (N**2) / (np.pi**2)
    T = sp.diags([np.full(M - 1, -factor), np.full(M, 2 * factor), np.full(M - 1, -factor)], [-1, 0, 1])

    # PE matrix V (diagonal)
    V = sp.diags(np.where(np.abs(x_vals) < (L / 6), V0_tilde, 0))

    #Hamiltonian H = T + V
    H = T + V

    #solve for lowest two eigenvalues/eigenvectors
    eigvals, eigvecs = spla.eigsh(H, k=2, which='SM')
    eigvals, eigvecs = zip(*sorted(zip(eigvals, eigvecs.T)))  # Sort eigenvalues & vectors

    print(f"Ground state energy = {eigvals[0]}")
    print(f"1st excited energy = {eigvals[1]}")

    #include boundary points
    x_full = np.linspace(-0.5 * L, 0.5 * L, N)
    psi_full = [np.concatenate(([0], psi, [0])) for psi in eigvecs]

    # Plot wavefunctions
    plt.figure(figsize=(8,6))
    plt.plot(x_full, psi_full[0], color='red',label="Ground State")
    plt.plot(x_full, psi_full[1], color='blue', label="1st Excited State")
    plt.axvspan(-L/6, L/6, color='gray', alpha=0.1, label='Barrier region')
    plt.title("Wavefunctions for lowest two states")
    plt.xlabel("x (dimensionless)")
    plt.ylabel("ψ(x)")
    plt.legend()
    plt.grid()
    plt.show()

if __name__ == "__main__":
    computation()
