---
title: "FinTextSim: Enhancing Financial Text Analysis with BERTopic"
source: https://arxiv.org/html/2504.15683v1?utm_source=chatgpt.com
author:
  - Simon Jehnen
  - Javier Villalba-Díez
  - Joaquín Ordieres-Meré
published: 
created: 2025-08-04
description: 
tags:
  - clippings
  - BERTopic
  - Clustering
---
arXiv:2504.15683v1 \[cs.CL\] 22 Apr 2025

Simon Jehnen Javier Villalba-Díez Joaquín Ordieres-Meré

###### Abstract

Recent advancements in information availability and computational capabilities have transformed the analysis of annual reports, integrating traditional financial metrics with insights from textual data. To extract valuable insights from this wealth of textual data, automated review processes, such as topic modeling, are crucial. This study examines the effectiveness of BERTopic, a state-of-the-art topic model relying on contextual embeddings, for analyzing Item 7 and Item 7A of 10-K filings from S&P 500 companies (2016–2022). Moreover, we introduce FinTextSim, a finetuned sentence-transformer model optimized for clustering and semantic search in financial contexts. Compared to all-MiniLM-L6-v2, the most widely used sentence-transformer, FinTextSim increases intratopic similarity by 81% and reduces intertopic similarity by 100%, significantly enhancing organizational clarity. We assess BERTopic’s performance using embeddings from both FinTextSim and all-MiniLM-L6-v2. Our findings reveal that BERTopic only forms clear and distinct economic topic clusters when paired with FinTextSim’s embeddings. Without FinTextSim, BERTopic struggles with misclassification and overlapping topics. Thus, FinTextSim is pivotal for advancing financial text analysis. FinTextSim’s enhanced contextual embeddings, tailored for the financial domain, elevate the quality of future research and financial information. This improved quality of financial information will enable stakeholders to gain a competitive advantage, streamlining resource allocation and decision-making processes. Moreover, the improved insights have the potential to leverage business valuation and stock price prediction models.

###### keywords:

Topic Modeling, 10-K, Artificial Intelligence, BERTopic, MD&A, FinTextSim, Sentence Transformers

\[inst1\]organization=Universidad Politécnica de Madrid, DEGIN doctoral program, Department of Industrial Management. ETSII,addressline=c. José Gutiérrez Abascal 2, city=Madrid, postcode=28006, state=Madrid, country=Spain

\[inst2\]organization=Fakultät für Wirtschaft, Hochschule Heilbronn,addressline=Bildungscampus, Max-Planck-Straße 39, city=Heilbronn, postcode=74081, state=State Two, country=Germany

\[inst3\]organization=Escuela Técnica Superior de Ingeniería Industrial, Universidad de la Rioja,addressline=C. Luis de Ulloa, 4, city=Logroño, postcode=26004, state=La Rioja, country=Spain

\[inst4\]organization=Beta Klinik GmbH,addressline=Joseph-Schumpeter-Allee 15, city=Bonn, postcode=53227, country=Germany

## Acknowledgement

The second and third authors want to acknowledge the partial support by the Spanish “Agencia Estatal de Investigación” through the grant PID2022-137748OB-C31 funded by MCIN/AEI/10.13039/501100011033 and ”ERDF A way of making Europe”.

## 1 Introduction

In recent years, the increasing availability of information [^52] and advances in computational capabilities have transformed the way we analyze annual reports, including 10-K filings. 10-K filings are among the most critical annual reports [^45], providing a standardized snapshot of a company’s financial situation through both numerical and textual data [^70]. The information contained carries predictive power for future profitability [^87]. Hence, various stakeholders, such as investors and financial analysts, rely on 10-K reports to make informed decisions [^65]. Traditionally, evaluation focused on retrospective quantitative financial metrics. However, there is a growing recognition of the value embedded in qualitative textual data. For example, [^25] demonstrated that language and tone in financial reports correlate with future company returns. Therefore, integrating retrospective financial metrics with textual analysis offers a fuller picture of a company, improving various decision-making processes [^55].

Item 7 and Item 7A of 10-K filings contain valuable information regarding companies listed in the Standard and Poor’s 500 (S&P 500). Among the 15 items included in 10-K reports, they stand out as particularly crucial. Item 7 is the Management Discussion & Analysis (MD&A) section. In this section, the management presents the company’s perspective on various aspects, including operations, performance, risks, opportunities, and strategies to address future challenges [^25]. Item 7A contains qualitative and quantitative disclosures about market risk. As the submission of a 10-K filing is mandatory for publicly traded companies, there is a wealth of information. We need clearly defined review processes to evaluate and use this information [^32].

Automated review processes offer various advantages over manual approaches. First, manual review of textual data is time-consuming and prone to subjectivity bias [^61]. Moreover, the vast and growing amount of data [^52] can lead to information overload, particularly for stakeholders with limited attention [^68]. Thus, attention must be efficiently allocated [^65]. Topic modeling, a technique from Natural Language Processing (NLP), addresses these challenges by uncovering latent topics within textual datasets. Hence, they help to organize and summarize large text corpora [^15].

Recently developed neural topic models address the limitations of classical topic modeling approaches, which still dominate applied topic modeling. Classical topic modeling approaches have been discussed in the literature since the introduction of Latent Semantic Indexing in 1990 [^28]. Until 2015, Bayesian probabilistic models, most notably Latent Dirichlet Allocation (LDA), were considered state-of-the-art. Relying on the bag-of-words (BoW) assumption, each document is treated as a collection of words, disregarding their sequential order. However, this approach limits the model’s ability to capture the semantic meaning of text. Neural topic modeling approaches address this issue by employing contextual embeddings [^14], allowing them to capture richer semantic and contextual relationships within the data [^16].

Recent advances in contextual embeddings have transformed NLP, driven by key innovations such as the transformer architecture, encoder-only models, and sentence-transformers. The transformer architecture, introduced by [^82], revolutionized NLP by relying entirely on attention mechanisms, allowing models to capture long-range dependencies and rich contextual information. This made transformers the state-of-the-art approach for Natural Language Understanding tasks [^22]. Building on this foundation, Bidirectional Encoder Representations from Transformers (BERT) established a new standard for deep contextualized language modeling [^29]. BERT relies on the encoder from the transformers architecture, allowing it to processes text bidirectionally and capture nuanced semantic relationships. More recently, [^84] introduced improvements to this architecture, increasing efficiency and surpassing BERT in classification and retrieval tasks. Despite their strengths, encoder-only models are less effective for large-scale semantic similarity comparison and clustering [^76]. To address these limitations, sentence-transformers refine encoder-only models using siamese or triplet network architectures, enabling efficient and precise similarity assessments [^76]. Sentence-transformers encode text into dense vector representations—contextual embeddings—that quantify semantic similarity by mapping similar texts closer in a shared vector space. Neural topic models, such as BERTopic, leverage these contextual embeddings to enhance topic modeling by clustering semantically related documents, enabling more accurate topic discovery [^47].

While these advancements have demonstrated significant improvements in general text processing, it remains unclear how these sophisticated methods perform when applied to tasks specifically relevant to the finance and accounting domains [^13]. Additionally, there is little evidence that the customization of financial text leads to benefits in performance [^56]. Traditional algorithms continue to dominate applied topic modeling, hindering the generation of new knowledge [^34]. Although extensive studies on various topic modeling approaches [^5] have been conducted, the domain of Management Accounting and Finance, particularly Item 7 and Item 7A of 10-K reports from S&P 500 companies, remains significantly under-researched. This presents a critical opportunity to integrate Machine Learning (ML)-based methods to fully exploit the value hidden in financial textual data [^75]. Furthermore, it opens avenues for refining domain-specific contextual embeddings by incorporating domain expertise [^73]. Such an approach aims to enhance the quality of contextual embeddings, allowing them to capture terminology and concepts unique to finance with greater precision [^30].

To address this gap, we introduce FinTextSim, a finetuned sentence transformer leveraging the capabilities of contextual embeddings for the financial domain. We benchmark FinTextSim against all-miniLM-L6-v2 (AM), the most widely used general-purpose sentence transformer. To isolate the effect of the selected sentence-transformer, we generate contextual embeddings for our dataset using both FinTextSim and AM. We apply these embeddings to BERTopic, a state-of-the-art neural topic modeling approach, while keeping all other model parameters identical. This comparison allows us to determine whether domain-specific fine-tuning enhances topic modeling and financial text interpretation.

We will explore the following research questions based on Item 7 and Item 7A from S&P500 companies between 2016 and 2022:

1. How can we leverage the capabilities of contextual embeddings for the financial domain?
2. Which embedding model — FinTextSim or AM — produces more qualitative and coherent topics when used as input for BERTopic?
3. Which embedding model — FinTextSim or AM — better supports BERTopic in organizing and summarizing large-scale financial text corpora?

By addressing the research questions, our work makes the following significant contributions:

1. We identify the most effective approach for extracting meaningful topics from Item 7 and Item 7A of S&P500 companies. This comparison provides valuable insights for researchers and practitioners selecting embedding models for NLP tasks.
2. We introduce FinTextSim, a finetuned sentence-transformer, improving the analysis of financial text for various downstream tasks. Hence, FinTextSim will boost future research quality.
3. By enhancing BERTopic for financial text with FinTextSim, we generate higher quality financial information regarding companies, sectors as well as whole markets and economies. Thus, we enable managers, financial analysts, investors, regulators and other stakeholders to gain a competitive advantage which aids in allocating resources more efficiently and making rational operational and strategic decisions. Moreover, the improved insights have the potential to leverage business valuation and stock price prediction models.

The rest of the paper hereinafter is organized as follows. Section 2 reviews the state-of-the-art literature and methodologies. Section 3 describes our study’s materials and methods, including the training procedure of FinTextSim. Section 4 presents and discusses the main findings. Finally, Section 5 provides the conclusion. This structure ensures a clear and logical progression, enabling a thorough understanding of our study’s contributions.

## 2 State of the Art

The following subsections provide an overview of the evolution of contemporary topic modeling techniques and a detailed examination of BERTopic, a state-of-the-art topic modeling approach.

### 2.1 Evolution of Contemporary Topic Modeling Approaches

Recent advancements in topic modeling have seen the integration of contextual embeddings, offering both significant benefits and challenges. Modern methodologies address the limitations of classical models by utilizing advanced text embedding techniques, moving beyond simple BoW representations. This enables them to better capture semantic relationships within text [^14]. While classical models require extensive customization and become increasingly complex with larger datasets, modern approaches offer enhanced flexibility and scalability [^88]. Moreover, neural topic models simplify the inference problem, enabling parallelization [^1]. Among other innovative methods [^85], contextual vector representations are combined with centroid-based clustering techniques [^79]. They assume that the centroid of a cluster represents the topic. Words closest to the centroid are considered as the most representative ones for the topic. However, this assumption is fragile as clusters may not always conform to a spherical distribution around the centroid. As a result, misrepresentation of topics may occur [^47]. A promising approach for topic modeling based on contextual embeddings, addressing centroid-based issues, is BERTopic.

### 2.2 BERTopic

BERTopic structures topic modeling into five sequential steps. First, document embeddings are generated using a pre-trained sentence transformer. A method that offers enduring benefits by leveraging advancements in language models [^47]. Second, the dimensionality of these embeddings is reduced. Subsequently, the reduced embeddings are clustered into semantically similar groups, i.e., topics. The reduction of dimensionality is deliberately placed before clustering to increase computational efficiency as well as clustering accuracy [^6]. In the fourth step, topics are tokenized. Finally, tokens are weighted. To enhance the quality of extracted topic representations, [^47] introduces class-based tfidf (c-tfidf), which weighs the importance of tokens within topics, enabling a more efficient extraction of topic representations.

Despite its significant advantages, BERTopic also faces several drawbacks. It tends to produce a manifold of closely interconnected topics which may vary upon repeated modeling attempts [^35]. This variability contributes to inconsistency in producing meaningful results, further complicated by the complexity of interpreting hyperparameters, hindering troubleshooting and diminishing the reliability of results [^1]. Moreover, BERTopic assumes that each document relates to a single topic, potentially oversimplifying real-world document complexity [^47]. Additionally, sentence-transformer models used for document embedding perform optimally with sentences or paragraphs [^76]. Furthermore, high computation times can result from processing large amounts of data [^47].

Due to its novelty, applications and enhancements of BERTopic are still in their infancy. In a financial context, [^59] utilized BERTopic on Item 1A from 10-K filings. They assessed whether identified topics can enhance the accuracy of ESG rating predictions and quantify each topic’s relative contribution to the final rating prediction. In other contexts, BERTopic has been applied in various studies: [^78] analyzed customer reviews, [^3] explored its application with pre-trained Arabic language models, [^35] evaluated its performance on Twitter data, and [^46] extended BERTopic to predict individual’s responses to a questionnaire based on their social media activity.

### 2.3 Topic Modeling of Item 7 and Item 7A

Our research is driven by several motivations regarding the choice of documents and analysis techniques. Item 7 and Item 7A stand out as particularly crucial sections in 10-K reports [^13]. The MD&A section (Item 7) provides a narrative that contextualizes the presented numbers, covering topics such as performance, liquidity, risks, and operations. In this section, management offers its individual perspective, which is essential for understanding the company’s strategic direction and potential challenges. Additionally, the MD&A section offers the most leeway and flexibility, making it rich with insights and indicative of future performance [^25]. Item 7A focuses on market risks, containing valuable information regarding the company’s prospective performance. Hence, analyzing Item 7 and Item 7A allows us to uncover hidden textual information that has the potential to support the prediction of a company’s future performance. A technique that shows promise in addressing this challenge is topic modeling [^75]. Despite advancements in computational capabilities and the emergence of new topic modeling techniques, there remains a gap in applying topic modeling methods to financial texts, particularly Item 7 and Item 7A. Furthermore, LDA continues to dominate applied topic modeling, although newer approaches like BERTopic offer potential improvements [^34].

In this paper, we aim to demonstrate how FinTextSim, a finetuned sentence transformer, outperforms the most widely used sentence transformer AM on text from Item 7 and Item 7A from 10-K reports of S&P 500 companies. Additionally, we hypothesize that combining BERTopic with FinTextSim will significantly enhance the quality of financial information, providing better insights for stakeholders. We foresee that FinTextSim will also facilitate the application of aspect-based sentiment analysis, eventually improving business valuation and stock price prediction models.

## 3 Materials and Methods

In the following subsections, we outline the materials and methods of our study. This section is divided into several parts: sourcing the dataset, creating an enhanced financial keyword list, training FinTextSim, creating the topic models, and presenting the metrics used to evaluate the performance of the topic models.

### 3.1 Dataset

Our study focuses exclusively on Item 7 and Item 7A of 10-K reports while avoiding survivorship bias and ensuring the highest possible document comparability. Given their greater significance, we deliberately choose 10-K over 10-Q reports [^45]. We source our data from the Notre Dame Software Repository for Accounting and Finance in text-file format, which underwent a ’Stage One Parse’ to remove all HTML tags.<sup>1</sup> <sup>1</sup> 1 The data can be found at: https://sraf.nd.edu/data/stage-one-10-x-parse-data/.

To prevent survivorship bias, we filter 10-K filings of all companies that have been listed in the S&P 500 index between 2015 and 2022. Using a regular expression-based extractor, we isolate the text from the start of Item 7 to the start of Item 8. Through this endeavor, we obtain the raw text of Item 7 and Item 7A. We refer to this combination of Item 7 and Item 7A as ’documents’. In order to maintain comparability, documents containing fewer than 250 words are discarded.<sup>2</sup> <sup>2</sup> 2 Paragraphs typically consist of 100–200 words. Moreover, sentence-transformers, such as AM and FinTextSim are designed to capture the semantic information of sentences and short paragraphs. Input texts longer than 256-word pieces (approximately 170-210 words) are truncated by default. The 250-word threshold ensures that each document includes at least two paragraphs, enhancing relevance, as shorter texts often lack substantive or complete ideas.

Subsequently, we remove further outlier documents, identified by z-score. The z-score is a statistical measure that quantifies the distance of data points to the mean of a dataset, taking the standard deviation into account. We define data points as outliers if they deviate more than two standard deviations from the mean. Subsequently, we focus on documents from the period between 2016 and 2022. Finally, we apply classical text processing techniques to identify relevant documents, ensuring that only meaningful texts are included in the analysis. As part of this process, we normalize documents by removing stopwords, applying lemmatization, and performing tokenization. Subsequently, documents with low cosine similarity to others are filtered out. This procedure ensures that both classical (evaluated in [D](https://arxiv.org/html/2504.15683v1#A4 "Appendix D Results and Discussion - Classical Topic Modeling Approaches ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic")) and contemporary models are applied to the same set of documents for a direct comparison. The text fed into the sentence transformers remains unprocessed by classical techniques. The number of documents retained at each preprocessing step is shown in Table [1](https://arxiv.org/html/2504.15683v1#S3.T1 "Table 1 ‣ 3.1 Dataset ‣ 3 Materials and Methods ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic").

Table 1: Dataset.

| Preprocessing-Step | \# documents |
| --- | --- |
| Documents extracted related to S&P 500 companies | 4,600 |
| Documents with less than 250 words | 1,019 |
| Documents with z-score greater than 2 | 165 |
| Documents outside the timeframe of 2016-2022 | 373 |
| Documents with low cosine similarity | 1,604 |
| Remaining documents in database | 1,439 |

### 3.2 Keyword List

To train FinTextSim we enhance and utilize a keyword list based on the works of [^61] and [^37]. The economic anchorword list for 10-K and 10-Q reports encompasses 11 distinct topics: sales, cost, profit/loss, operations, liquidity, investment, financing, litigation, employment, tax/regulation, and accounting [^61].[^37] augmented it to a topic-word list by identifying semantically similar words, using a Word2Vec model trained on MD&A sections of 10-K reports. We further enhance this list by adding key performance indicator names associated with company performance (e.g., EBITDA or EBIT) and supplementing the operations topic with terms related to logistics, supply chain and marketing. Additionally, we expand the topic-keyword list to 14 topics by introducing three topics that have garnered significant attention in recent years:

- Energy, in response to the 2022 energy crisis [^39],
- Environmental Sustainability, driven by the rising demand for ESG criteria [^26], and
- COVID-19 pandemic [^17].

An excerpt of the topics and the most important keywords is displayed in [E](https://arxiv.org/html/2504.15683v1#A5 "Appendix E Excerpt of Keyword List ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic").

### 3.3 FinTextSim

To accurately cluster semantically similar financial text, we introduce FinTextSim, a sentence-transformer model specifically finetuned to enhance contextual embeddings for the financial domain. Given the financial jargon and its domain-specific nuances, off-the-shelf (OTS), general-purpose sentence transformers fall short. Existing models tailored for the financial domain are primarily optimized for sentiment analysis (e.g. [^9]). Hence, they also prove insufficient. By fine-tuning FinTextSim on financial text, we aim to improve the quality of generated topics, enhancing semantic coherence and ensuring greater separation between topics. We hypothesize that this specialized fine-tuning will bridge the gap between general-purpose models and the specific demands of financial text analysis.

To tailor FinTextSim for financial text, we create a labeled dataset by adopting a dictionary-based approach, relying on the keyword list presented in Section [3.2](https://arxiv.org/html/2504.15683v1#S3.SS2 "3.2 Keyword List ‣ 3 Materials and Methods ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic"). We build upon our dataset and remove noise by replacing contractions as well as URLs and numerical characters. After tokenizing the documents into sentences, we remove noisy ones by discarding those with less than five and more than 50 words. To create a labeled dataset, we construct a keyword-sentence matrix. We iterate over each word in each sentence, checking if a sub-string matches a keyword. We deliberately use a sub-string approach to overcome issues with exact matches. For instance, our keyword list includes the word ’logistic’. Using sub-strings correctly allows words like ’logistics’ and ’logistical’ to be recognized as a keyword match. Additionally, we make minor adjustments to the presented keyword list to prevent the double-counting of keywords. For example, to avoid ’cashflow’ generating two entries for both ’cash’ and ’cashflow’, the refined list only includes ’cash’. After creating the keyword-sentence matrix, sentences containing two or more keywords from only one specific topic domain are labeled accordingly, ensuring topics are distinct. Moreover, we consider unique sentences to prevent overemphasis on particular wordings during training.

To address the initial imbalance in labeled sentence distribution and enhance FinTextSim’s generalization capabilities, we expand the dataset through multiple strategies. First, we incorporate an external dataset containing annual and sustainability reports from S&P 500 companies <sup>3</sup> <sup>3</sup> 3 Dataset available at: https://huggingface.co/datasets/lemousehunter/SnP500-annual-and-sustainability-reports, following the same keyword-based labeling logic. This additional dataset broadens the scope of financial discourse captured by FinTextSim, ensuring a more comprehensive representation of domain-specific language. Second, for the underrepresented topics of ”Litigation” and ”Covid Pandemic” in the original Item 7 dataset, we relax keyword-matching constraints to increase the number of labeled instances. This adjustment ensures that these critical topics receive adequate representation in the training process. Finally, we augment sentences for the least represented topic of ”Litigation” using ChatGPT. Through this endeavor, we provide further balance and improve FinTextSim’s ability to accurately distinguish financial topics.

Following these steps, our dataset comprises 180,435 labeled sentences, split into training and test sets with an 80/20 ratio. To ensure balanced learning across all topics, we perform the test-train-split topic-wise. Following these steps, we obtain 36,094 test- and 144,341 train-sentences.

To train FinTextSim, we employ adaptive circle loss and follow methods outlined by [^76]. As base model, we select ModernBERT, a recent advancement in encoder-only architectures introduced by [^84]. We adapt ModernBERT with a mean pooling and a normalization layer to enhance its performance for sentence similarity tasks [^76]. We train the model using adaptive circle loss, deliberately choosing it over common triplet-based approaches. While triplet loss minimizes the distance between similar samples and maximizes it for dissimilar ones, it applies equal penalty strength to positive and negative pairs. In contrast, circle loss dynamically adjusts penalties based on how far a similarity score deviates from its optimal value, allowing more targeted optimization. It focuses on less optimized pairs while mildly adjusting those already close to convergence. Additionally, its circular decision boundary reduces ambiguity in feature space separability [^80]. Adaptive circle loss further extends this approach by employing curriculum learning, dynamically adjusting margin and scale to improve convergence and stability. We train FinTextSim with a batch size of 200, an initial scale of 5, and an initial margin of 0.25, progressively increasing the scale to 16 and decreasing the margin to 0.1.

To evaluate performance, we encode the test dataset with AM and FinTextSim, comparing intra- and intertopic similarity (see [3.5.2](https://arxiv.org/html/2504.15683v1#S3.SS5.SSS2 "3.5.2 Organizing Power ‣ 3.5 Evaluation Metrics ‣ 3 Materials and Methods ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic")). AM, the most downloaded model for sentence similarity tasks on Hugging Face, serves as a robust baseline for evaluating out-of-the-box sentence-transformer embeddings. By benchmarking FinTextSim against AM, we assess whether specialized contextual embeddings improve financial text analysis. We hypothesize that integrating domain-specific knowledge into contextual embeddings, will enable FinTextSim to generate more accurate and semantically meaningful representations of financial text than general-purpose models like AM. This improvement is crucial for precisely identifying meaningful financial topics and ensuring more reliable document organization. To further examine the structure of the learned embeddings, we visualize them by reducing dimensionality to two dimensions with Uniform Manifold Approximation and Projection (UMAP). Compared to alternatives, such as t-SNE or PCA, UMAP more effectively preserves both local and global structure [^6]. For UMAP, we employ the following essential hyperparameters:

- Minimum distance: 0, to encourage closely grouped data points, facilitating the formation of clusters representing semantically similar documents.
- Distance metric: Cosine similarity, widely used in NLP and similarity tasks.
- n\_neighbors: 100, prioritizing global structures in our data to identify overarching macrotopics as well as hierarchically lower-ranked microtopics [^8].

### 3.4 Model Creation

Since BERTopic relies on sentence transformers optimized for sentence-level input and assumes that each document belongs to a single topic [^47], we focus exclusively on sentence-level processing. To achieve this, we tokenize the documents displayed in Table [1](https://arxiv.org/html/2504.15683v1#S3.T1 "Table 1 ‣ 3.1 Dataset ‣ 3 Materials and Methods ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic") into individual sentences. This approach is necessary as full MD&A sections typically cover multiple topics. Treating entire documents as single-topic texts would yield misleading results. Additionally, sentence-transformer models like AM and FinTextSim are designed for short texts, with a processing limit of 256-word pieces. Longer inputs are truncated, risking the loss of critical information. By working at the sentence level, we ensure compatibility with these models while preserving topic integrity.

Although BERTopic is known to leverage noise to create contextualized embeddings, we fit the models on sentence and refined sentence input. Specifically, we refine the sentences by retaining those containing at least one keyword from our list as well as the pre- and succeeding sentences to maintain context and relevance [^7]. As a result, we obtained 687,959 sentences and 678,218 refined sentences.

We generate contextual embeddings for our dataset using FinTextSim and AM, applying each to BERTopic with identical models and hyperparameter settings to ensure that only the embedding choice influences performance. In terms of dimensionality reduction, we opt for UMAP due to its ability to preserve both global and local structures [^6] and its scalability to large datasets [^8]. We specifically configure UMAP with the same settings as displayed in Section [3.3](https://arxiv.org/html/2504.15683v1#S3.SS3 "3.3 FinTextSim ‣ 3 Materials and Methods ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic"). To strike a balance between clustering efficiency and information retention, we reduce the dimensionality to ten components. For clustering, we choose Hierarchical Densitiy-Based Spatial Clustering of Applications with Noise (HDBSCAN) to address the limitations of centroid-based clustering algorithms in NLP and to effectively discern relevant from irrelevant data. As a soft clustering algorithm, HDBSCAN models noise as outliers, ensuring that documents not fitting into any cluster are not forcibly assigned [^72]. Furthermore, HDBSCAN is proficient in detecting clusters of varying sizes and shapes, simplifies hyperparameter choices, and demonstrates computational scalability [^72]. Our specific choices for HDBSCAN’s hyperparameters include:

- Minimum Cluster Size: 1,250 to prioritize global topics over local ones.
- Minimum Number of Samples: 10, to reduce the number of outliers. The minimum number of samples determines the level of conservativity during clustering. If the number of samples is high, more data points are considered as noise, and the clustering is restricted to more dense areas.

We utilize a CountVectorizer for vectorization and exclude stopwords based on [^66] as well as infrequently occurring words. To extract relevant economic topics, we use c-tfidf weighting, reduce common words, and guide the model by incorporating seed words based on the keyword list with a multiplier of 50.

### 3.5 Evaluation Metrics

To compare the performance of the topic models, we focus on two fundamental tasks [^15]:

1. Topic Quality: Uncover hidden topics in a collection of documents.
2. Organizing Power: Organizing and structuring documents.

The following subsections provide detail in how we objectively measure the model’s capabilities for each task and their applicability for the financial domain.

#### 3.5.1 Topic Quality

We use NPMI coherence, known for its alignment with human judgment, to evaluate the quality of the generated topics. NPMI, a metric used in information theory and NLP, measures the strength of association between words by accounting for their individual frequencies. It is derived from Pointwise Mutual Information, which quantifies the difference between the actual co-occurrence of two terms and their expected co-occurrence if they were statistically independent. NPMI coherence employs a sliding window approach to establish context vectors based on word co-occurrences [^77]. Given the typical sentence lengths in our dataset, we set the window size to 20, optimizing context coverage.<sup>4</sup> <sup>4</sup> 4 For classical topic modeling approaches, which are evaluated in [D](https://arxiv.org/html/2504.15683v1#A4 "Appendix D Results and Discussion - Classical Topic Modeling Approaches ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic"), we maintain the default window size of ten. However, due to the shorter sentence lengths resulting from stopword removal in classical models, we adjust the window size for BERTopic based on the ratio between sentence lengts of BERTopic versus classical models, guaranteeing comparable context coverage.Moreover, to mitigate vocabulary divergence effects, we lemmatize both the input texts and the extracted topic representations. We use the five most representative words per topic as topic representations. While the standard procedure is to use ten representative words, using five to eight words is recommended to maintain clarity and conciseness [^4].

#### 3.5.2 Organizing Power

To assess the organizing power of FinTextSim and our topic models, we employ intra- and intertopic similarity. To ensure clear, distinct and well-separated topic clusters, we aim to maximize intratopic similarity while simultaneously minimizing intertopic similarity.

We calculate intratopic similarity following this approach:

- Topic Embedding Calculation: Compute the mean of all sentence embeddings for each topic to obtain topic embeddings.
- Cosine Similarity Calculation per Topic: Determine the cosine similarity of each sentence embedding within a topic to the corresponding topic embedding.
- Mean Calculation within Topics: The mean of these cosine similarities provides the intratopic similarity, representing the cohesion within a topic.
- Mean Calculation for all Topics: The mean of the intratopic similarities of each topic represents the model’s intratopic similarity.

Intertopic similarity is computed as follows:

- Topic Embedding Calculation: Compute the mean of all sentence embeddings for each topic to obtain topic embeddings.
- Cosine Similarity Matrix Computation: Calculate the cosine similarity between each topic embedding and all other topic embeddings, forming a pairwise similarity matrix.
- Extraction of Upper Triangle Values: Extract the upper triangle of the similarity matrix, excluding the self-similarity values in the diagonal.
- Mean Calculation for all Topics: The mean of these cosine similarities results in the model’s intertopic similarity.

For the evaluation of FinTextSim, we use the topic labels from the test dataset. As we do not have any ground-truth labels for BERTopic, we employ its topic assignments.

#### 3.5.3 Applicability for the Financial Domain

To evaluate the topic models specifically for the financial domain, we incorporate a topic-precision-based weighting into the metrics for topic quality and organizing power, using the previously described keyword list (see Section [3.2](https://arxiv.org/html/2504.15683v1#S3.SS2 "3.2 Keyword List ‣ 3 Materials and Methods ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic")). Specifically, we weigh NPMI Coherence and intratopic similarity by multiplying them with topic-precision, while intertopic similarity is adjusted by dividing it by topic-precision. We calculate topic-precision as follows:

- Determine the dominant topic: A topic is classified as dominant if it contains at least two keywords from a single topic domain and no more than one keyword from another domain.
- Count True Positives (TP): The number of keywords belonging to the dominant topic’s original domain.
- Count False Positives (FP): The number of keywords from other topic domains. Keywords not present in the keyword list are ignored.
- Compute topic-precision:
	<table><tbody><tr><td></td><td><math><semantics><mrow><mrow><mrow><mi>T</mi> <mo>⁢</mo> <mi>o</mi> <mo>⁢</mo> <mi>p</mi> <mo>⁢</mo> <mi>i</mi> <mo>⁢</mo> <mi>c</mi></mrow> <mo>−</mo> <mrow><mi>P</mi> <mo>⁢</mo> <mi>r</mi> <mo>⁢</mo> <mi>e</mi> <mo>⁢</mo> <mi>c</mi> <mo>⁢</mo> <mi>i</mi> <mo>⁢</mo> <mi>s</mi> <mo>⁢</mo> <mi>i</mi> <mo>⁢</mo> <mi>o</mi> <mo>⁢</mo> <mi>n</mi></mrow></mrow> <mo>=</mo> <mfrac><mrow><mi>T</mi> <mo>⁢</mo> <mi>P</mi></mrow> <mrow><mo>(</mo><mrow><mrow><mi>T</mi> <mo>⁢</mo> <mi>P</mi></mrow> <mo>+</mo> <mrow><mi>F</mi> <mo>⁢</mo> <mi>P</mi></mrow></mrow><mo>)</mo></mrow></mfrac></mrow> <annotation-xml><apply><apply><apply><ci>𝑇</ci> <ci>𝑜</ci> <ci>𝑝</ci> <ci>𝑖</ci> <ci>𝑐</ci></apply> <apply><ci>𝑃</ci> <ci>𝑟</ci> <ci>𝑒</ci> <ci>𝑐</ci> <ci>𝑖</ci> <ci>𝑠</ci> <ci>𝑖</ci> <ci>𝑜</ci> <ci>𝑛</ci></apply></apply> <apply><apply><ci>𝑇</ci> <ci>𝑃</ci></apply> <apply><apply><ci>𝑇</ci> <ci>𝑃</ci></apply> <apply><ci>𝐹</ci> <ci>𝑃</ci></apply></apply></apply></apply></annotation-xml> <annotation>Topic-Precision=\frac{TP}{(TP+FP)}</annotation> <annotation>italic_T italic_o italic_p italic_i italic_c - italic_P italic_r italic_e italic_c italic_i italic_s italic_i italic_o italic_n = divide start_ARG italic_T italic_P end_ARG start_ARG ( italic_T italic_P + italic_F italic_P ) end_ARG</annotation></semantics></math></td><td></td><td rowspan="1"><span>(1)</span></td></tr></tbody></table>
- Penalty for missing topics: If a topic from the keyword list is not captured, its topic-precision is set to 0.
- Assess overall performance: The model’s ability to capture financial topics is evaluated by averaging topic-precision across all topics.

This approach ensures that the detection of financial topics is the most crucial aspect of the topic models. If the identified topics lack financial relevance, their structural organization becomes obsolete. Moreover, if no financial topics are detected, the scores are penalized, reflecting the model’s unsuitability for financial text analysis.

## 4 Results and Discussion

We structure the results and discussion section according to our research questions:

- FinTextSim: Leveraging the quality of contextual embeddings for the financial domain
- Topic Quality: Creating qualitative, coherent topic representations
- Organizing Power: Organizing large textual datasets

For FinTextSim, we highlight its result on the test dataset as well as its value in combination with BERTopic for topic modeling tasks. The results are presented and contextualized in the following subsections.

### 4.1 FinTextSim - Leveraging Contextual Embeddings for the Financial Domain

FinTextSim generates improved clusters and notably reduces the number of outliers in comparison to AM. As illustrated in Figure [1](https://arxiv.org/html/2504.15683v1#S4.F1 "Figure 1 ‣ 4.1 FinTextSim - Leveraging Contextual Embeddings for the Financial Domain ‣ 4 Results and Discussion ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic") and Table [2](https://arxiv.org/html/2504.15683v1#S4.T2 "Table 2 ‣ 4.1 FinTextSim - Leveraging Contextual Embeddings for the Financial Domain ‣ 4 Results and Discussion ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic"), FinTextSim leads to a significant increase of intratopic similarity, while simultaneously reducing intertopic similarity compared to AM on the test dataset. Specifically, FinTextSim increases intratopic similarity by 81%, achieving a score of 0.9972, compared to 0.5498 for AM. Moreover, FinTextSim reduces intertopic similarity by 100%, resulting in a score of 0.002, whereas AM has a score of 0.4647. When combining BERTopic with AM, we identified 226,605 outliers. In contrast, FinTextSim generated 184,470 outliers, reducing the number of outliers by 19%.

Table 2: FinTextSim vs. AM: Intra- and Intertopic Similarity on test dataset.

| Model | Intratopic Similarity | Intertopic Similarity | Outliers within BERTopic |
| --- | --- | --- | --- |
| FinTextSim | 0.9972 | 0.0002 | 184,470 |
| AM | 0.5498 | 0.4647 | 226,605 |

![Refer to caption](https://arxiv.org/html/extracted/6377241/FinTextSim_v28_embeddings_testset.png)

(a) UMAP reduced sentence embeddings - FinTextSim.

The results indicate that FinTextSim creates significantly better clusters of semantically similar concepts compared to AM. FinTextSim’s clusters are characterized by high intratopic similarity and low intertopic similarity. In contrast, AM fails to accurately detect topic specifics, resulting in an indistinguishable mash of data points (see Figure [1](https://arxiv.org/html/2504.15683v1#S4.F1 "Figure 1 ‣ 4.1 FinTextSim - Leveraging Contextual Embeddings for the Financial Domain ‣ 4 Results and Discussion ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic")). This demonstrates that OTS sentence transformers are unsuitable for financial text.

![Refer to caption](https://arxiv.org/html/extracted/6377241/hr_doc_2050_bertopic.png)

Figure 2: Topic representations - FinTextSim vs. AM - HR. Original cleaned sentence: ’a majority of employees belong to labor unions’.

Turning to a practical example, BERTopic with FinTextSim is able to accurately capture the underlying topic of a sentence, while the results with AM are misleading. Figure [2](https://arxiv.org/html/2504.15683v1#S4.F2 "Figure 2 ‣ 4.1 FinTextSim - Leveraging Contextual Embeddings for the Financial Domain ‣ 4 Results and Discussion ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic") displays word clouds for topics assigned to the same sentence using BERTopic with FinTextSim and AM. FinTextSim correctly identifies that the sentence focuses on ’HR and Employment’. In contrast, AM fails to detect the topic, leading the analyst to associate it incorrectly with revenue and products.

### 4.2 Topic Quality

As displayed in Section [3.5](https://arxiv.org/html/2504.15683v1#S3.SS5 "3.5 Evaluation Metrics ‣ 3 Materials and Methods ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic"), we use NPMI coherence weighted by topic-precision to objectively measure the topic quality of each topic model. Table  [3](https://arxiv.org/html/2504.15683v1#S4.T3 "Table 3 ‣ 4.2 Topic Quality ‣ 4 Results and Discussion ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic") displays the topic-precision scores for each topic model.

Table 3: Topic-Precision Scores.

<table><thead><tr><th></th><th colspan="2">Type</th></tr><tr><th>Model</th><th>Sentences</th><th>Refined Sentences</th></tr></thead><tbody><tr><th>AM</th><td>0.311</td><td>0.684</td></tr><tr><th>FinTextSim</th><td>1.0</td><td>1.0</td></tr></tbody></table>

Using BERTopic with FinTextSim significantly enhances the identification of economic topics. For sentence-level input, AM achieves a topic-precision of 0.311 while failing to detect ten out of 14 economic topics. Refining sentence input improves AM’s topic-precision to 0.684, reducing the number of missed topics to six. However, even with refinement, AM struggles to identify key financial themes such as Operations, Liquidity and Solvency, and Investment. In contrast, FinTextSim correctly identifies all 14 economic topics, achieving a perfect topic-precision of 1.0.<sup>5</sup> <sup>5</sup> 5 The wordclouds for each model are displayed in Figures  [6](https://arxiv.org/html/2504.15683v1#A1.F6 "Figure 6 ‣ Appendix A Wordclouds BERTopic models ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic") to [9](https://arxiv.org/html/2504.15683v1#A1.F9 "Figure 9 ‣ Appendix A Wordclouds BERTopic models ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic").

Although refining sentence input improves AM’s topic precision, general-purpose embedding models are insufficient for comprehensive financial text analysis. AM models fail to capture the full scope of financial topics, limiting their practical application. In contrast, FinTextSim not only identifies all relevant topics but also minimizes conceptual overlap, ensuring clearer topic distinctions and more effective document organization. These findings underscore the necessity of domain-specific embeddings for financial text processing, as general-purpose models fail to capture the nuances of economic language.

Table 4: Coherence Scores.

<table><thead><tr><th></th><th colspan="2">Type</th></tr><tr><th>Model</th><th>Sentences</th><th>Refined Sentences</th></tr></thead><tbody><tr><th>AM</th><td>0.106 (0.341)</td><td>0.257 (0.376)</td></tr><tr><th>FinTextSim</th><td>0.279 (0.279)</td><td>0.301 (0.301)</td></tr></tbody></table>

Table [4](https://arxiv.org/html/2504.15683v1#S4.T4 "Table 4 ‣ 4.2 Topic Quality ‣ 4 Results and Discussion ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic") presents the coherence scores, with non-topic-precision weighted coherence shown in parentheses. When incorporating topic-precision weighting, we find that BERTopic generates higher-quality financial topics using FinTextSim compared to AM. For sentence-level input, FinTextSim achieves a topic-precision weighted coherence score of 0.279, surpassing AM’s 0.106 by 163%. With refined sentence input, coherence scores improve across both models. For AM, this increase is primarily attributed to its increased topic-precision. However, FinTextSim still outperforms AM by 17%.

Contrary to our expectations, BERTopic achieves higher coherence with AM than with FinTextSim when topic-precision-based weighting is not applied. Although FinTextSim better captures the distinct structure of financial text, as reflected by its high topic-precision, it yields lower coherence scores. However, this result is misleading in the context of financial text analysis. AM generates significantly more outliers and fails to capture key economic topics, leading to a loss of valuable information, potentially compromising studies. We suspect that the higher coherence of BERTopic with AM results from the increased number of outliers, which simplifies the compression and generation of topics. Another factor is the vocabulary of the financial domain. Financial terms are often standalone words that do not necessarily co-occur within a sliding window. Therefore, coherence scores do not always align with human judgment of topic quality.<sup>6</sup> <sup>6</sup> 6 This trend is also observed for classical models (see [D](https://arxiv.org/html/2504.15683v1#A4 "Appendix D Results and Discussion - Classical Topic Modeling Approaches ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic")).Relying solely on standard coherence metrics without domain-specific weighting can be problematic. In financial text analysis, ensuring high topic-precision is crucial as the meaningful organization of domain-specific knowledge must take precedence over raw coherence scores. Since topic evaluation requires domain expertise and subjective interpretation [^47], standard coherence metrics alone are insufficient. Without domain-specific weighting, coherence fails to reflect practical applicability, making topic-precision essential for capturing meaningful financial insights.

![Refer to caption](https://arxiv.org/html/extracted/6377241/cost_doc_2065_bertopic.png)

Figure 3: Topic representations - FinTextSim vs. AM - Cost. Original cleaned sentence: ’business is vulnerable to fluctuations in fuel costs and disruptions in fuel supplies’.

To illustrate this in a practical example, we refer to Figure [3](https://arxiv.org/html/2504.15683v1#S4.F3 "Figure 3 ‣ 4.2 Topic Quality ‣ 4 Results and Discussion ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic"). Once again, FinTextSim correctly identifies the underlying ’Cost’ topic, while AM misclassifies it, associating it with currency and exchange rates. Despite this misclassification, AM receives a higher coherence score of 0.448 compared to FinTextSim’s 0.324.

![Refer to caption](https://arxiv.org/html/extracted/6377241/operations_doc_1171_bertopic.png)

Figure 4: Topic representations - FinTextSim vs. AM - Operations. Original cleaned sentence: ’the company manufactures markets and distributes spices seasoning mixes condiments and other flavorful products to the entire food industry retailers food manufacturers and foodservice businesses’.

For further clarity, Figure [4](https://arxiv.org/html/2504.15683v1#S4.F4 "Figure 4 ‣ 4.2 Topic Quality ‣ 4 Results and Discussion ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic") presents another practical example. FinTextSim correctly identifies the ’Operations’ topic, whereas AM misclassifies it as a non-economic concept. Yet, FinTextSim receives a lower coherence score of 0.205 compared to AM’s 0.262. These discrepancies underscore the limitations of coherence scores in evaluating financial text, as they fail to account for domain relevance and topic-precision.

### 4.3 Organizing Power

To efficiently organize and structure large collections of documents, maximizing intratopic similarity while simultaneously minimizing intertopic similarity is desirable. The results for intratopic similarity of our models are displayed in Table [5](https://arxiv.org/html/2504.15683v1#S4.T5 "Table 5 ‣ 4.3 Organizing Power ‣ 4 Results and Discussion ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic"). Non-topic-precision weighted scores are illustrated in parentheses.

Table 5: Intratopic Similarity.

<table><thead><tr><th></th><th colspan="2">Type</th></tr><tr><th>Model</th><th>Sentences</th><th>Refined Sentences</th></tr></thead><tbody><tr><th>AM</th><td>0.206 (0.661)</td><td>0.441 (0.644)</td></tr><tr><th>FinTextSim</th><td>0.925 (0.925)</td><td>0.929 (0.929)</td></tr></tbody></table>

FinTextSim consistently achieves higher intratopic similarity than AM, regardless of input type or the application of topic-precision weighting. When topic-precision weighting is considered, FinTextSim outperforms AM by a wide margin, achieving an intratopic similarity of 0.925 compared to 0.206 for sentence input, representing a 350% improvement. For refined sentence input, FinTextSim reaches 0.929, outperforming AM’s 0.441 by 111%. Even without topic-precision weighting, FinTextSim maintains a strong advantage, with a 40% increase for sentence input, scoring 0.925 compared to AM’s 0.661. The trend remains consistent for refined sentence input, where FinTextSim achieves 0.929, exceeding AM’s 0.644 by 44%. These results further highlight FinTextSim’s ability to generate more cohesive topic clusters, reinforcing its suitability for financial text analysis.

The intertopic similarities of the models are displayed in Table [6](https://arxiv.org/html/2504.15683v1#S4.T6 "Table 6 ‣ 4.3 Organizing Power ‣ 4 Results and Discussion ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic"). Non-topic-precision weighted scores are illustrated in parentheses. A good separation of the generated topics is represented by low intertopic similarities.

Table 6: Intertopic Similarity.

<table><thead><tr><th></th><th colspan="2">Type</th></tr><tr><th>Model</th><th>Sentences</th><th>Refined Sentences</th></tr></thead><tbody><tr><th>AM</th><td>1.315 (0.409)</td><td>0.631 (0.432)</td></tr><tr><th>FinTextSim</th><td>0.064 (0.064)</td><td>0.066 (0.066)</td></tr></tbody></table>

FinTextSim significantly reduces intertopic similarity compared to AM, indicating enhanced topic separation. When topic-precision weighting is applied, FinTextSim achieves a 95% reduction in intertopic similarity, scoring 0.064 compared to AM’s 1.315. With refined sentence input, intertopic similarity remains 90% lower, with FinTextSim at 0.066 compared to AM’s 0.631. Neglecting topic-precision weighting, FinTextSim continues to outperform AM by a wide margin, reducing intertopic similarity by 84% for sentence input, with scores of 0.064 versus 0.409. For refined sentence input, FinTextSim outperforms AM by 85%, where it achieves 0.066 compared to AM’s 0.432. These results underscore FinTextSim’s effectiveness in minimizing topic overlap, leading to clearer and more distinct financial topic clusters.

![Refer to caption](https://arxiv.org/html/extracted/6377241/accounting_doc_698_bertopic.png)

Figure 5: Topic representations - FinTextSim vs. AM - Accounting. Original cleaned sentence: ’critical accounting policies estimates and judgments our consolidated financial statements are based on gaap which requires us to make estimates and assumptions about future events that affect the amounts reported in our consolidated financial statements’.

Figure [5](https://arxiv.org/html/2504.15683v1#S4.F5 "Figure 5 ‣ 4.3 Organizing Power ‣ 4 Results and Discussion ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic") illustrates this situation. In this practical case, BERTopic with FinTextSim can accurately capture the underlying topic of the sentence, while the results with AM are misleading. FinTextSim correctly recognizes that the sentence pertains to ’Accounting,’ ensuring a precise and domain-relevant topic assignment. In contrast, AM fails to detect the specific topic, causing the analyst to misinterpret the sentence as relating to multiple themes, such as cost, tax, and HR. This inability to distinguish between economic topics results in high intertopic similarity and low intratopic similarity, highlighting the limitations of AM for financial text analysis.

### 4.4 Wrapup of Results and Discussion

We find that BERTopic is highly on financial text when combined with FinTextSim. AM, on the other hand, generates more general topics and fails to capture economic topics, leading to significant gaps in coverage. The quality of topics improves significantly when FinTextSim is used. Only in combination with FinTextSim, BERTopic produce clear, distinct clusters of economic topics. In contrast, AM leads to frequent misclassifications.

Our findings support the hypothesis of [^30], demonstrating that a fine-tuned model grounded in a specialized dataset significantly improves both performance and domain-specific understanding. Furthermore, as [^48] indicates, finetuning a foundational base model enhances performance on complex tasks. Relying solely on OTS models may compromise reliability and introduce systematic errors, highlighting the importance of integrating fine-tuned models like FinTextSim for extracting meaningful and reliable insights. However, the extent to which FinTextSim generalizes beyond 10-K reports remains an open question. A small-scale experiment on Item 1 yielded similar results as described in Section [4.1](https://arxiv.org/html/2504.15683v1#S4.SS1 "4.1 FinTextSim - Leveraging Contextual Embeddings for the Financial Domain ‣ 4 Results and Discussion ‣ FinTextSim: Enhancing Financial Text Analysis with BERTopic"), suggesting that FinTextSim’s effectiveness extends to other sections of 10-K filings. Expanding its training data to include diverse financial sources, such as news articles, conference call transcripts, and analyst reports, could further enhance its generalization capabilities. Additionally, incorporating researcher-labeled data may provide further improvements in FinTextSim’s adaptability and robustness across financial contexts.

Regarding our results, it is important to note that the displayed metrics should never be considered in isolation, especially those regarding organizing power. For instance, even if AM would show high intratopic and low intertopic similarity, it does not necessarily produce ’good’ clusters, as the quality of the generated topics may remain low. In such cases, its ability to enhance organizational clarity would still be limited. Therefore, evaluating topics requires looking beyond the raw metrics to consider their true quality.

Hence, evaluating topic models remains challenging [^88]. Our analysis reveals the limitations of coherence as a measure. For instance, BERTopic with AM achieves higher coherence scores than FinTextSim. Yet, we identified low topic-precision scores, indicating numerous missing economic topics and/or overlapping concepts. This suggests that higher coherence does not necessarily correlate with higher topic quality. Our findings underscore the necessity for new coherence or topic quality measures, particularly for domain-specific texts like finance. In such texts, topic words often stand alone and may not co-occur within a sliding window. Hence, traditional coherence metrics cannot capture the ’true’ quality of the generated topics.

While BERTopic enhances topic modeling compared to the classical approaches, there is still significant room for improvement. The transformer architecture, which BERTopic heavily relies on, may not be fully optimized yet. Thus, more sophisticated and computationally efficient alternatives should be explored [^58]. Further advancements in encoder-only models could enhance sentence transformers by improving their contextual understanding of language [^84]. Moreover, applying domain-specific pre-training methods to optimized BERT variants may deepen the model’s understanding of financial language, leading to more effective downstream task performance [^56]. Additionally, BERTopic’s inconsistency in producing meaningful results, compounded by the complex hyperparameters of the underlying models, compromises reliability [^1]. Hence, future research should focus on developing an objective standard for selecting models and tuning hyperparameters. Specifically, we plan to investigate the impact of hyperparameter tuning for both dimensionality reduction and clustering techniques on contextual embeddings. This approach aims to streamline the process of topic modeling, objectively determining hyperparameters. Eventually, this will improve topic clustering and extraction, thus enhancing the analysis of textual data.

## 5 Conclusion

Increased availability of information and enhanced computational capabilities have transformed the analysis of annual reports, recognizing the value embedded within qualitative textual data. Automated review processes, such as topic modeling, are crucial for analyzing this data. However, in our domain, the use of those ML-based methods, including contextual embeddings, remains underexplored [^75]. We address these issues by introducing FinTextSim, a finetuned sentence transformer enhancing analysis of financial text with BERTopic.

Our study reveals the significant advantages of FinTextSim over OTS sentence-transformer models. FinTextSim excels in generating distinct clusters of topics, substantially outperforming OTS sentence-transformer models on financial text. This highlights the need for domain-specifically finetuned sentence-transformer models. Additionally, FinTextSim allows BERTopic to identify the most qualitative topics for the financial domain. While FinTextSim captures all relevant financial topics, OTS sentence-transformers miss valuable information. Combining BERTopic with FinTextSim notably enhances its capability to create well-separated clusters of economic topics. Hence, the domain-specific fine-tuning of sentence transformers is crucial for achieving optimal topic modeling outcomes.

Through our efforts, we make several significant contributions. First, we enhance contextual embeddings for our domain with FinTextSim, amplifying results and insights from future studies. Moreover, FinTextSim improves the quality of financial information, empowering stakeholders to gain a competitive advantage through more efficient allocation of resources and improved decision-making processes. Furthermore, integrating FinTextSim into business valuation and stock price prediction models promises enhancements in accuracy and effectiveness, providing valuable tools for financial analysts and investors alike.

It is important to note that the evaluation of topic models remains a challenging task. Assessing each model’s performance requires considering all presented metrics simultaneously, as relying on one measure in isolation may be misleading. Moreover, a qualitative analysis of topic representations is necessary.

Although BERTopic outperforms classical approaches, significant room for advancements in the field of topic modeling and their applications in the financial domain remains. Interesting directions for future research include the creation of an improved metric to objectively measure the quality of generated topic representations, particularly for domain-specific text like finance. Additionally, advancing the architecture of sentence transformers or exploring new embedding techniques holds promise for further enhancement of topic modeling. Moreover, there is a need for streamlining processes to determine optimal models and hyperparameters within BERTopic. Through this endeavor, topic instability will be addressed, enhancing the reliability and validity of results. Integrating contemporary topic modeling approaches like BERTopic with FinTextSim could offer substantial benefits to new and ongoing studies, leveraging their results. Finally, harnessing the improved topic extraction and organizational structure generated with BERTopic in combination with FinTextSim holds the potential to significantly enhance business valuation and stock price prediction models, providing valuable insights for financial analysts and investors.

## References

[^1]: Abdelrazek, A., Eid, Y., Gawish, E., Medhat, W., Hassan, A., 2023.Topic modeling algorithms and applications: A survey.Information Systems 112, 102131.

[^2]: Abukari, K., Dutta, S., Li, C., Tang, S., Zhu, P., 2024.Corporate communication and likelihood of data breaches.International Review of Economics & Finance 94, 103433.URL: [https://www.sciencedirect.com/science/article/pii/S1059056024004258](https://www.sciencedirect.com/science/article/pii/S1059056024004258), doi:[https://doi.org/10.1016/j.iref.2024.103433](http://dx.doi.org/https://doi.org/10.1016/j.iref.2024.103433).

[^3]: Abuzayed, A., Al-Khalifa, H., 2021.Bert for arabic topic modeling: An experimental study on bertopic technique.Procedia computer science 189, 191–194.

[^4]: Agrawal, A., Fu, W., Menzies, T., 2018.What is wrong with topic modeling? and how to fix it using search-based software engineering.Information and Software Technology 98, 74–88.

[^5]: Albalawi, R., Yeap, T.H., Benyoucef, M., 2020.Using topic modeling methods for short-text data: A comparative analysis.Frontiers in artificial intelligence 3, 42.

[^6]: Allaoui, M., Kherfi, M.L., Cheriet, A., 2020.Considerably improving clustering algorithms using umap dimensionality reduction technique: a comparative study, in: International conference on image and signal processing, Springer. pp. 317–325.

[^7]: Altaweel, M., Bone, C., Abrams, J., 2019.Documents as data: a content analysis and topic modeling approach for analyzing responses to ecological disturbances.Ecological Informatics 51, 82–95.

[^8]: Angelov, D., 2020.Top2vec: Distributed representations of topics.arXiv preprint arXiv:2008.09470.

[^9]: Araci, D., 2019.Finbert: Financial sentiment analysis with pre-trained language models.arXiv preprint arXiv:1908.10063.

[^10]: Baden, C., Pipal, C., Schoonvelde, M., van der Velden, M.A.G., 2022.Three gaps in computational text analysis methods for social sciences: A research agenda.Communication Methods and Measures 16, 1–18.

[^11]: Bao, Y., Datta, A., 2014.Simultaneously discovering and quantifying risk types from textual risk disclosures.Management Science 60, 1371–1391.

[^12]: Bellstam, G., Bhagat, S., Cookson, J.A., 2021.A text-based analysis of corporate innovation.Management Science 67, 4004–4031.

[^13]: Bhattacharya, I., Mickovic, A., 2024.Accounting fraud detection using contextual language learning.International Journal of Accounting Information Systems 53, 100682.

[^14]: Blair, S.J., Bi, Y., Mulvenna, M.D., 2020.Aggregated topic models for increasing social media topic coherence.Applied Intelligence 50, 138–156.

[^15]: Blei, D.M., Ng, A.Y., Jordan, M.I., 2003.Latent dirichlet allocation.Journal of machine Learning research 3, 993–1022.

[^16]: Booker, A., Chiu, V., Groff, N., Richardson, V.J., 2024.Ais research opportunities utilizing machine learning: From a meta-theory of accounting literature.International Journal of Accounting Information Systems 52, 100661.

[^17]: Borrero-Domínguez, C., Cortijo-Gallego, V., Escobar-Rodríguez, T., 2024.Digital transformation voluntary disclosure: Insights from leading european companies.International Journal of Accounting Information Systems 55, 100711.

[^18]: Brown, N.C., Crowley, R.M., Elliott, W.B., 2020.What are you saying? using topic to detect financial misreporting.Journal of Accounting Research 58, 237–291.

[^19]: Cai, K.N., Hanley, K.W., Huang, A.G., Zhao, X., 2022.Risk disclosure and the pricing of corporate debt issues in private and public markets.Georgetown McDonough School of Business Research Paper.

[^20]: Campbell, J.C., Hindle, A., Stroulia, E., 2015.Latent dirichlet allocation: extracting topics from software engineering data, in: The art and science of analyzing software data. Elsevier, pp. 139–159.

[^21]: Canelli, R., Fontana, G., Realfonzo, R., Passarella, M.V., 2024.Energy crisis, economic growth and public finance in italy.Energy Economics 132, 107430.

[^22]: Caron, M., Müller, O., 2020.Hardening soft information: A transformer-based approach to forecasting stock return volatility, in: 2020 IEEE International Conference on Big Data (Big Data), IEEE. pp. 4383–4391.

[^23]: Chen, Y., Rabbani, R.M., Gupta, A., Zaki, M.J., 2017.Comparative text analytics via topic modeling in banking, in: 2017 IEEE symposium series on computational intelligence (SSCI), IEEE. pp. 1–8.

[^24]: Chen, Y., Zhang, H., Liu, R., Ye, Z., Lin, J., 2019.Experimental explorations on short text topic mining between lda and nmf based schemes.Knowledge-Based Systems 163, 1–13.

[^25]: Cohen, L., Malloy, C., Nguyen, Q., 2020.Lazy prices.The Journal of Finance 75, 1371–1415.

[^26]: Cohen, S., Kadach, I., Ormazabal, G., Reichelstein, S., 2023.Executive compensation tied to esg performance: International evidence.Journal of Accounting Research 61, 805–853.

[^27]: Dechow, P.M., Erhard, R.D., Sloan, R.G., Soliman, M.T., 2021.Implied equity duration: A measure of pandemic shutdown risk.Journal of Accounting Research 59, 243–281.

[^28]: Deerwester, S., Dumais, S.T., Furnas, G.W., Landauer, T.K., Harshman, R., 1990.Indexing by latent semantic analysis.Journal of the American society for information science 41, 391–407.

[^29]: Devlin, J., Chang, M.W., Lee, K., Toutanova, K., 2019.Bert: Pre-training of deep bidirectional transformers for language understanding. arxiv.arXiv preprint arXiv:1810.04805.

[^30]: Dong, M.M., Stratopoulos, T.C., Wang, V.X., 2024.A scoping review of chatgpt research in accounting and finance.International Journal of Accounting Information Systems 55, 100715.

[^31]: Donoho, D., Stodden, V., 2003.When does non-negative matrix factorization give a correct decomposition into parts?Advances in neural information processing systems 16.

[^32]: Dutta, S., Fuksa, M., Macaulay, K., 2019.Determinants of md&a sentiment in canada.International Review of Economics & Finance 60, 130–148.URL: [https://www.sciencedirect.com/science/article/pii/S105905601630332X](https://www.sciencedirect.com/science/article/pii/S105905601630332X), doi:[https://doi.org/10.1016/j.iref.2018.12.017](http://dx.doi.org/https://doi.org/10.1016/j.iref.2018.12.017).

[^33]: Dyer, T., Lang, M., Stice-Lawrence, L., 2017.The evolution of 10-k textual disclosure: Evidence from latent dirichlet allocation.Journal of Accounting and Economics 64, 221–245.

[^34]: Egger, R., Yu, J., 2021.Identifying hidden semantic structures in instagram data: a topic modelling comparison.Tourism Review 77, 1234–1246.

[^35]: Egger, R., Yu, J., 2022.A topic modeling comparison between lda, nmf, top2vec, and bertopic to demystify twitter posts.Frontiers in sociology 7, 886498.

[^36]: Farzadnia, S., Vanani, I.R., Hanafizadeh, P., 2024.An experimental study for identifying customer prominent viewpoints on different flight classes by topic modeling methods.International Journal of Information Management Data Insights 4, 100223.

[^37]: Fengler, M., Phan, M.T., 2023.A Topic Model for 10-K Management Disclosures.Economics Working Paper Series 2307. University of St. Gallen, School of Economics and Political Science.URL: [https://EconPapers.repec.org/RePEc:usg:econwp:2023:07](https://econpapers.repec.org/RePEc:usg:econwp:2023:07).

[^38]: Fernandes, N., Gkolia, A., Pizzo, N., Davenport, J., Nair, A., 2020.Unification of hdp and lda models for optimal topic clustering of subject specific question banks.arXiv preprint arXiv:2011.01035.

[^39]: Ferriani, F., Gazzani, A., 2023.The invasion of ukraine and the energy crisis: Comparative advantages in equity valuations.Finance Research Letters 58, 104604.

[^40]: Fu, Q., Zhuang, Y., Gu, J., Zhu, Y., Guo, X., 2021.Agreeing to disagree: Choosing among eight topic-modeling methods.Big Data Research 23, 100173.

[^41]: Fu, W., Nair, V., Menzies, T., 2016.Why is differential evolution better than grid search for tuning defect predictors?arXiv preprint arXiv:1609.02613.

[^42]: Gao, Y., Liu, S., Yang, L., 2025.Artificial intelligence and innovation capability: A dynamic capabilities perspective.International Review of Economics & Finance 98, 103923.URL: [https://www.sciencedirect.com/science/article/pii/S1059056025000863](https://www.sciencedirect.com/science/article/pii/S1059056025000863), doi:[https://doi.org/10.1016/j.iref.2025.103923](http://dx.doi.org/https://doi.org/10.1016/j.iref.2025.103923).

[^43]: García-Méndez, S., de Arriba-Pérez, F., Barros-Vila, A., González-Castaño, F.J., Costa-Montenegro, E., 2023.Automatic detection of relevant information, predictions and forecasts in financial news through topic modelling with latent dirichlet allocation.Applied Intelligence 53, 19610–19628.

[^44]: Gillis, N., Vavasis, S.A., 2014.Fast and Robust Recursive Algorithms for Separable Nonnegative Matrix Factorization.IEEE Transactions on Pattern Analysis and Machine Intelligence 36, 698–714.doi:[10.1109/TPAMI.2013.226](http://dx.doi.org/10.1109/TPAMI.2013.226), [arXiv:1208.1237](http://arxiv.org/abs/1208.1237).

[^45]: Griffin, P.A., 2003.Got information? investor response to form 10-k and form 10-q edgar filings.Review of Accounting Studies 8, 433–460.

[^46]: Grigore, D.N., Pintilie, I., 2023.Transformer-based topic modeling to measure the severity of eating disorder symptoms., in: CLEF (Working Notes), pp. 684–692.

[^47]: Grootendorst, M., 2022.Bertopic: Neural topic modeling with a class-based tf-idf procedure.arXiv preprint arXiv:2203.05794.

[^48]: Gu, H., Schreyer, M., Moffitt, K., Vasarhelyi, M., 2024a.Artificial intelligence co-piloted auditing.International Journal of Accounting Information Systems 54, 100698.

[^49]: Gu, Y., Dai, J., Vasarhelyi, M.A., 2023.Audit 4.0-based esg assurance: An example of using satellite images on ghg emissions.International Journal of Accounting Information Systems 50, 100625.

[^50]: Gu, Y., Katz, S., Wang, X., Vasarhelyi, M., Dai, J., 2024b.Government esg reporting in smart cities.International Journal of Accounting Information Systems 54, 100701.

[^51]: Guo, M., Zong, X., Guo, L., Lei, Y., 2024.Does haze-related sentiment affect income inequality in china?International Review of Economics & Finance 94, 103371.URL: [https://www.sciencedirect.com/science/article/pii/S1059056024003484](https://www.sciencedirect.com/science/article/pii/S1059056024003484), doi:[https://doi.org/10.1016/j.iref.2024.05.050](http://dx.doi.org/https://doi.org/10.1016/j.iref.2024.05.050).

[^52]: Gupta, A., Dengre, V., Kheruwala, H.A., Shah, M., 2020.Comprehensive review of text-mining applications in finance.Financial Innovation 6, 1–25.

[^53]: Han, D., Guo, W., Chen, H., Wang, B., Guo, Z., 2024.Lest: Large language models and spatio-temporal data analysis for enhanced sino-us exchange rate forecasting.International Review of Economics & Finance 96, 103508.URL: [https://www.sciencedirect.com/science/article/pii/S1059056024005008](https://www.sciencedirect.com/science/article/pii/S1059056024005008), doi:[https://doi.org/10.1016/j.iref.2024.103508](http://dx.doi.org/https://doi.org/10.1016/j.iref.2024.103508).

[^54]: Hong, W., Zheng, X., Qi, J., Wang, W., Zheng, N., Weng, Y., 2018.Financialflow: Visual analytics of financial news based on hierarchical dirichlet process, in: 2018 33rd Youth Academic Annual Conference of Chinese Association of Automation (YAC), IEEE. pp. 375–380.

[^55]: Hsieh, H.T., Hristova, D., 2022.Transformer-based summarization and sentiment analysis of sec 10-k annual reports for company performance prediction, in: Proceedings of the 55th Hawaii International Conference on System Sciences, Hawaii International Conference on System Sciences. pp. 1759–1768.URL: [https://hdl.handle.net/10125/79550](https://hdl.handle.net/10125/79550), doi:[10.24251/hicss.2022.218](http://dx.doi.org/10.24251/hicss.2022.218).

[^56]: Huang, A.H., Wang, H., Yang, Y., 2023.Finbert: A large language model for extracting information from financial text.Contemporary Accounting Research 40, 806–841.

[^57]: Jegadeesh, N., Wu, D.A., 2017.Deciphering Fedspeak: The Information Content of FOMC Meetings.SSRN Electronic Journal doi:[10.2139/ssrn.2939937](http://dx.doi.org/10.2139/ssrn.2939937).

[^58]: Karami, M., Ghodsi, A., 2024.Orchid: Flexible and data-dependent convolution for sequence modeling.arXiv preprint arXiv:2402.18508.

[^59]: Kim, M.G., Kim, K.S., Lee, K.C., 2022.Analyzing the effects of topics underlying companies’ financial disclosures about risk factors on prediction of esg risk ratings: Emphasis on bertopic, in: 2022 IEEE International Conference on Big Data (Big Data), IEEE. pp. 4520–4527.

[^60]: Lee, D.D., Seung, H.S., 1999.Learning the parts of objects by non-negative matrix factorization.Nature 401, 788–791.

[^61]: Li, F., 2010a.The Information Content of Forward-Looking Statements in Corporate Filings—A Naïve Bayesian Machine Learning Approach.Journal of Accounting Research 48, 1049–1102.doi:[10.1111/j.1475-679X.2010.00382.x](http://dx.doi.org/10.1111/j.1475-679X.2010.00382.x).

[^62]: Li, F., 2010b.Textual analysis of corporate disclosures: A survey of the literature.Journal of Accounting Literature 29, 143–165.

[^63]: Li, T., Chen, H., Liu, W., Yu, G., Yu, Y., 2023.Understanding the role of social media sentiment in identifying irrational herding behavior in the stock market.International Review of Economics & Finance 87, 163–179.URL: [https://www.sciencedirect.com/science/article/pii/S1059056023001326](https://www.sciencedirect.com/science/article/pii/S1059056023001326), doi:[https://doi.org/10.1016/j.iref.2023.04.016](http://dx.doi.org/https://doi.org/10.1016/j.iref.2023.04.016).

[^64]: Lin, H., Hwang, Y., 2021.The effects of personal information management capabilities and social-psychological factors on accounting professionals’ knowledge-sharing intentions: Pre and post covid-19.International Journal of Accounting Information Systems 42, 100522.

[^65]: Liu, M., 2022.Assessing human information processing in lending decisions: A machine learning approach.Journal of Accounting Research 60, 607–651.

[^66]: Loughran, T., McDonald, B., 2011.When is a liability not a liability? textual analysis, dictionaries, and 10-ks.The Journal of finance 66, 35–65.

[^67]: Lowry, M., Michaely, R., Volkova, E., 2020.Information revealed through the regulatory process: Interactions between the sec and companies ahead of their ipo.The Review of Financial Studies 33, 5510–5554.

[^68]: Lu, J., 2022.Limited attention: Implications for financial reporting.Journal of Accounting Research 60, 1991–2027.

[^69]: Maier, D., Waldherr, A., Miltner, P., Wiedemann, G., Niekler, A., Keinert, A., Pfetsch, B., Heyer, G., Reber, U., Häussler, T., Schmid-Petri, H., Adam, S., 2018.Applying LDA Topic Modeling in Communication Research: Toward a Valid and Reliable Methodology.Communication Methods and Measures 12, 93–118.doi:[10.1080/19312458.2018.1430754](http://dx.doi.org/10.1080/19312458.2018.1430754).

[^70]: Masson, C., Paroubek, P., 2020.Nlp analytics in finance with dore: a french 257m tokens corpus of corporate annual reports, in: Language Resources and Evaluation Conference (LREC 2020), ELRA. pp. 2261–2267.

[^71]: Mayasari, R.W., Fithriasari, K., Prastyo, D.D., 2021.Text mining to analyse publication topics of covid-19 using hdp and lda methods, in: AECon 2020: Proceedings of The 6th Asia-Pacific Education And Science Conference, AECon 2020, 19-20 December 2020, Purwokerto, Indonesia, European Alliance for Innovation. p. 374.

[^72]: McInnes, L., Healy, J., 2017.Accelerated Hierarchical Density Clustering, in: 2017 IEEE International Conference on Data Mining Workshops (ICDMW), pp. 33–42.doi:[10.1109/ICDMW.2017.12](http://dx.doi.org/10.1109/ICDMW.2017.12), [arXiv:1705.07321](http://arxiv.org/abs/1705.07321).

[^73]: Murphy, B., Feeney, O., Rosati, P., Lynn, T., 2024.Exploring accounting and ai using topic modelling.International Journal of Accounting Information Systems 55, 100709.

[^74]: O’Callaghan, D., Greene, D., Carthy, J., Cunningham, P., 2015.An analysis of the coherence of descriptors in topic modeling.Expert Systems with Applications 42, 5645–5657.doi:[10.1016/j.eswa.2015.02.055](http://dx.doi.org/10.1016/j.eswa.2015.02.055).

[^75]: Ranta, M., Ylinen, M., Järvenpää, M., 2022.Machine Learning in Management Accounting Research: Literature Review and Pathways for the Future.European Accounting Review, 1–30doi:[10.1080/09638180.2022.2137221](http://dx.doi.org/10.1080/09638180.2022.2137221).

[^76]: Reimers, N., Gurevych, I., 2019.Sentence-bert: Sentence embeddings using siamese bert-networks.arXiv preprint arXiv:1908.10084.

[^77]: Röder, M., Both, A., Hinneburg, A., 2015.Exploring the space of topic coherence measures, in: Proceedings of the eighth ACM international conference on Web search and data mining, pp. 399–408.

[^78]: Sánchez-Franco, M.J., Rey-Moreno, M., 2022.Do travelers’ reviews depend on the destination? an analysis in coastal and urban peer-to-peer lodgings.Psychology & marketing 39, 441–459.

[^79]: Sia, S., Dalmia, A., Mielke, S.J., 2020.Tired of Topic Models? Clusters of Pretrained Word Embeddings Make for Fast and Good Topics too!, in: Proceedings of the 2020 Conference on Empirical Methods in Natural Language Processing (EMNLP), Association for Computational Linguistics, Online. pp. 1728–1736.doi:[10.18653/v1/2020.emnlp-main.135](http://dx.doi.org/10.18653/v1/2020.emnlp-main.135).

[^80]: Sun, Y., Cheng, C., Zhang, Y., Zhang, C., Zheng, L., Wang, Z., Wei, Y., 2020.Circle loss: A unified perspective of pair similarity optimization, in: Proceedings of the IEEE/CVF conference on computer vision and pattern recognition, pp. 6398–6407.

[^81]: Teh, Y.W., Jordan, M.I., Beal, M.J., work(s):, D.M.B.R., 2006.Hierarchical Dirichlet Processes.Journal of the American Statistical Association 101, 1566–1581.[arXiv:27639773](http://arxiv.org/abs/27639773).

[^82]: Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A.N., Kaiser, L., Polosukhin, I., 2017.Attention Is All You Need, in: 31st Conference on Neural Information Processing Systems (NIPS 2017), Long Beach, CA, USA. pp. 1–15.[arXiv:1706.03762](http://arxiv.org/abs/1706.03762).

[^83]: Wang, J., Zhang, X.L., 2023.Deep nmf topic modeling.Neurocomputing 515, 157–173.

[^84]: Warner, B., Chaffin, A., Clavié, B., Weller, O., Hallström, O., Taghadouini, S., Gallagher, A., Biswas, R., Ladhak, F., Aarsen, T., et al., 2024.Smarter, better, faster, longer: A modern bidirectional encoder for fast, memory efficient, and long context finetuning and inference.arXiv preprint arXiv:2412.13663.

[^85]: Wu, X., Nguyen, T., Luu, A.T., 2024.A survey on neural topic models: methods, applications, and challenges.Artificial Intelligence Review 57, 18.

[^86]: Yau, C.K., Porter, A., Newman, N., Suominen, A., 2014.Clustering scientific documents with topic modeling.Scientometrics 100, 767–786.

[^87]: You, H., Zhang, X.j., 2009.Financial reporting complexity and investor underreaction to 10-k information.Review of Accounting studies 14, 559–586.

[^88]: Zhao, H., Phung, D., Huynh, V., Jin, Y., Du, L., Buntine, W., 2021.Topic modelling meets deep neural networks: A survey.arXiv preprint arXiv:2103.00498.