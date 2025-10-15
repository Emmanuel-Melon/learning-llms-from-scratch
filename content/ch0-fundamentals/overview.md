---
layout: base.njk
title:  Core Concepts for the LLM Developer
---

# Overview

Welcome to the essential starting point of our series. Our goal is to demystify modern AI by treating the Large Language Model (LLM) not as a black box, but as an advanced software component that can be analyzed, controlled, and augmented.

The learning approach of this entire series is: If you can build the core mechanism, you can truly control the application. This is the "Zero to AI: The Simple Way" philosophy—bypassing the cloud, API keys, and complexity by building from first principles.

## What We'll Build

We will apply this hands-on philosophy across all four modules:

1. **RAG (Chapter 1)**: Build your own vector search and retrieval system from scratch to expose the math behind semantic lookup.
2. **Prompting (Chapter 2)**: Gain control by mastering the model's input instructions and generation parameters.
3. **Evals (Chapter 3)**: Create custom measurement systems to quantify performance, moving beyond subjective checks.
4. **Fine-Tuning (Chapter 4)**: Learn how to precisely adapt the model's internal parameters for specialized domain needs.

This chapter sets the foundation for all four subsequent modules by reviewing the shared conceptual toolkit, ensuring you are prepared to build everything locally, with just a web browser and JavaScript.

## Table of Contents

1. [The Builder's Toolkit: Embeddings and Vectors](#the-builders-toolkit-embeddings-and-vectors)
2. [The Architect's Toolkit: Prompting and Control](#the-architects-toolkit-prompting-and-control)
3. [The Engineer's Toolkit: Alignment and Adaptation](#the-engineers-toolkit-alignment-and-adaptation)
4. [The Analyst's Toolkit: Evaluation and Metrics](#the-analysts-toolkit-evaluation-and-metrics)

## 1. The Builder's Toolkit: Embeddings and Vectors

The language LLMs truly understand is vectors. Embeddings are the bridge between human language and mathematical space, essential for building features like semantic search, content moderation, and recommendation algorithms.

### A. The Embedding Vector

- **Definition**: A high-dimensional vector (a list of numbers, e.g., 384 numbers long) that encodes the semantic meaning of text.
- **The Conversion**: The Transformer model (the Embedder) maps complex text into this dense, numerical representation.

### B. The Geometry of Meaning

- **Semantic Space**: A conceptual space where words and documents are placed according to their meaning.
- **Similarity**: Measured by Cosine Similarity (the dot product of normalized vectors). If two document vectors have a high cosine similarity (close to 1.0), they are semantically related, regardless of keyword overlap.

> **RAG Link**: This geometric understanding is the entire basis for the Retrieval step in RAG (Chapter 1). We search for the document vector closest to the query vector.

### C. Scaling the Search

- **Vector Search**: The process of finding the nearest neighbor vector.
- **Vector Databases**: Specialized infrastructure (like the in-memory array we'll build) necessary to make this search fast and scalable for millions of documents, moving beyond simple linear search.

## 2. The Architect's Toolkit: Prompting and Control

An LLM's output quality is determined by two main factors: the Instructions we provide (Prompting) and the Knobs we turn (Generation Parameters).

### A. The Anatomy of a Prompt (Chapter 2)

1. **The Role (System Message)**: 
   - Defines the model's persona, guardrails, and constraints
   - Example: `"Act as a legal expert. Only cite the laws provided."`

2. **The Context (Augmentation)**:
   - The external data (retrieved documents from RAG) provided to the model

3. **The Task (User Message)**:
   - The specific action the model must take
   - Example: `"Answer the following question about Ugandan property law..."`

### B. Generation Parameters (The Knobs)

- **Temperature**:
  - `T→0`: Deterministic, safe, factual. Good for code and summaries.
  - `T→1`: Creative, diverse, risky. Good for brainstorming and creative writing.
- **Top-P/Top-K**: Methods for selecting the next token from a narrowed list of most probable options, controlling diversity.

### C. The LLM as a Function (The API Call)

The most direct practical way to interact with an LLM is to view it as a simple, powerful function:

```javascript
function generateText(prompt, params) {
  // Input: A structured request (the prompt + parameters)
  // Process: The model generates the next sequence of tokens
  // Output: A generated text response
  return generatedText;
}