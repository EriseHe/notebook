```
multipass list
multipass shell ubuntu-22     #my VM name
```

# now inside VM
```
sudo apt update
sudo apt install -y build-essential gfortran cmake \
  openmpi-bin libopenmpi-dev libopenblas-dev liblapack-dev libscalapack-mpi-dev \
  python3-venv python3-pip python-is-python3 git
```