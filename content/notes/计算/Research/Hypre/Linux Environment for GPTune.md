Access the ubunta environment

```
multipass list
multipass shell ubuntu-22     #my VM name
```

now inside VM
```
sudo apt update
sudo apt install -y build-essential gfortran cmake \
  openmpi-bin libopenmpi-dev libopenblas-dev liblapack-dev libscalapack-mpi-dev \
  python3-venv python3-pip python-is-python3 git
```



```
# kill anything stuck
pkill -f "/hypre/src/test/ij" || true
pkill -f "python .*hypre.py .* -optimization opentuner" || true
pkill -f orted || true

cd ~/GPTune/examples
# keep the existing DB so OpenTuner can reuse what it has
export PYTHONPATH=$PYTHONPATH:~/GPTune/GPTune:~/GPTune/examples/hypre-driver
export OMPI_MCA_rmaps_base_oversubscribe=1
export OMPI_MCA_pmix_server_max_wait=1800
export OMPI_MCA_pmix_base_exchange_timeout=1800
export OMPI_MCA_btl="self,tcp"

# rerun without mpirun (append to the same log), with a wall timeout
timeout 2h python ./hypre.py \
  -nodes 1 -cores 6 -nprocmin_pernode 1 \
  -ntask 10 -nrun 20 \
  -nxmax 100 -nymax 100 -nzmax 100 \
  -machine mymachine -optimization opentuner \
  | tee -a a.out_hypre_opentuner_nt10_nr20
  ```

```
# from ~/GPTune/examples; replace FILE with your current log (e.g., a.out_hypre_GPTune_c6)
FILE=a.out_hypre_GPTune_c6
python3 - <<'PY'
import re, pathlib
p=pathlib.Path("FILE")
s=p.read_text(errors="ignore") if p.exists() else ""
ts=[float(x) for x in re.findall(r"\[----- runtime = ([0-9]*\.?[0-9]+)", s)]
done=len(ts); total=200
avg=(sum(ts)/done) if done else 0
eta=(total-done)*avg
print(f"done={done}/{total}, avg={avg:.2f}s, ETA≈{eta/60:.1f} min")
PY
```