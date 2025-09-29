---
title: Attention Is All You Need
source: https://arxiv.org/abs/1706.03762
author:
  - "[[Ashish Vaswani]]"
  - "[[Noam Shazeer]]"
  - "[[Niki Parmar]]"
  - "[[Jakob Uszkoreit]]"
  - "[[Llion Jones]]"
  - "[[Aidan N. Gomez]]"
  - "[[Lukasz Kaiser]]"
  - "[[Illia Polosukhin]]"
published: ""
created: 2025-08-04
description: "Abstract page for arXiv paper 1706.03762: Attention Is All You Need"
tags:
  - clippings
  - attention
  - Transformer
  - CNN
---

\[Submitted on 12 Jun 2017 ([v1](https://arxiv.org/abs/1706.03762v1)), last revised 2 Aug 2023 (this version, v7)\]

## Title:Attention Is All You Need

[View PDF](https://arxiv.org/pdf/1706.03762) [HTML (experimental)](https://arxiv.org/html/1706.03762v7)

> Abstract: The dominant sequence transduction models are based on complex recurrent or convolutional neural networks in an encoder-decoder configuration. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train. Our model achieves 28.4 BLEU on the WMT 2014 English-to-German translation task, improving over the existing best results, including ensembles by over 2 BLEU. On the WMT 2014 English-to-French translation task, our model establishes a new single-model state-of-the-art BLEU score of 41.8 after training for 3.5 days on eight GPUs, a small fraction of the training costs of the best models from the literature. We show that the Transformer generalizes well to other tasks by applying it successfully to English constituency parsing both with large and limited training data.

## 1. Motivation

Before 2017, sequence-to-sequence models relied on **RNNs with attention on top**, which has two limits:
1. Sequential computation $\rightarrow$ hard to parallelize.
2. Long-range dependencies  $\rightarrow$  information degraded over many steps.

The **Transformer** solved both by:
- Using *self-attention*  $\rightarrow$   connect every position in the input to every other, weighting them according to learned relevance.
- Removing *recurrence* (or convolution)   $\rightarrow$   whole sequence can be processed in parallel.

## 2. Architecture core
### 2.1 Encoder-decoder structure

>Sutskever et al. (2014) introduced the RNN-based seq2seq encoder–decoder for machine translation.
>
>Bahdanau et al. (2015) added attention on top of RNN encoder–decoder models.

#### 2.1.1 Encoder
stacks of self-attention + feed-forward layers to produce contextual representations.
#### 2.1.2 Decoder
similar, but with an extra attention over encoder outputs and causal masking to prevent future-token access.

#### 2.1.3 Scaled dot-product attention
- Input: query (Q), key (K), value (V) matrices.
- Attention $(\mathrm{Q}, \mathrm{K}, \mathrm{V})=\operatorname{softmax}\left(\left(\mathrm{QK}^{\mathrm{T}}\right) / \sqrt{\mathrm{d}_{\mathrm{k}}}\right) \mathrm{V}$
- QKT: similarity between query and all keys.
- $\sqrt{ } \mathrm{d}_{\mathrm{k}}$ : scaling to stabilize gradients.
- Softmax: turns similarities into a probability distribution.
- Multiply by V to blend values according to attention weights.

#### 2.1.4 Multi-head attention
- Split Q, K, V into h subspaces.
- Apply attention in each, then concatenate results.
- Allows capturing different types of relationships in parallel.
#### 2.1.5 Positional encoding
- Since there's no recurrence, add position information to token embeddings (sinusoidal or learned).

#### 2.1.6 Feed-forward and residual connections
- Position-wise feed-forward layers after attention.
- Residual + layer norm stabilize deep training.


