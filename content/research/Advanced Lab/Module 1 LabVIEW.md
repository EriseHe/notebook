# 1 Experiment

## 1.1 Objectives

## 1.2 Apparatus 

We use NI USB-6009 DAQ to ....
## 1.3 Experiment

We need to record

- Resistor value $R$
- Diode orientation
- DAQ wiring map
- Planned sweep range
  
  
  
  ok now lets modify the [test 1.py](SetupPhase/learning-setup/scripts/test 1.py) . We test on 2D stencil_27_laplace with T = 5000, and then three different linUCB cases with a default fixed parameter baseline, plotting on the same plot (include test 1 in the title as well).

1) LinUCB on three continous parameter: th, mxrs, tr
2) LinUCB on only th, other parameters are all default
3) LinUCB on only maxrs

i want a evenly discretization. For single parameter tuning, we have 19 grids as usual, for three 



