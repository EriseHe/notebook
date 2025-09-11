---
date: 2025-09-08
lecture: "3"
---
An AR (autoregressive) generative model represents the **joint probability of a sequence** by chaining conditionals left-to-right (the chain rule
$$P\left(w_{1: T}\right)=\prod_{t=1}^T P\left(w_t \mid w_{<t}\right)$$
## 1. Decoding / Inference in Language Models

- local higher probability do not always produce the global solution. We always
- we care about the joint probability

### 1. 1. Argmax (Greedy Decoding)
Choose the most likely token:
$$
w_t = \arg\max_{w} p_\theta(w \mid w_{<t})
$$
- Deterministic, always picks the top token.  
- Can lead to repetitive or dull text.
### Beam search

## 2 Unrolled recurrent neural network
- vanishing gradient for RNN
