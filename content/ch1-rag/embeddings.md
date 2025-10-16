---
layout: base.njk
title: Embeddings
chapterNumber: 1.1
---

# Overview

Before I ran this code, I needed to understand: what am I actually creating?

**An embedding is a direction in semantic space.**

That's it. When you turn "What is the legal drinking age in Uganda?" into an embedding, you're converting it into a vector—a point in 384-dimensional space. But more importantly, it's a **direction**.

The magic isn't in the numbers themselves. It's in how those directions relate to each other.

## The Journey from Text to Vector

Here's what happens when you call `generateEmbedding()`:

Before we dive into similarity, I needed to understand: what's actually happening inside `generateEmbedding()`?

```typescript
const embedding = await generateEmbedding("The legal drinking age...");
// Text goes in → [0.023, -0.145, 0.089, ..., 0.234] comes out
// But HOW?
```

## The High-Level Process

Here's what happens when you generate an embedding:

1. **Tokenization**: Convert text into tokens (sub-words or words)
2. **Token to ID**: Map each token to an integer from the model's vocabulary
3. **Initial Embeddings**: Convert each token ID into a dense vector
4. **Transformer Layers**: Process tokens through attention mechanisms to add context
5. **Pooling**: Combine all token vectors into one sentence vector
6. **Normalization**: Scale to unit length

Let's break this down, because each step reveals something important.

### Step 1: Tokenization - Breaking Text into Pieces

```typescript
// Input text
"The legal drinking age in Uganda is 18 years old."[
  // After tokenization (simplified)
  ("the",
  "legal",
  "drinking",
  "age",
  "in",
  "uganda",
  "is",
  "18",
  "years",
  "old")
];
```

The model doesn't work with raw text - it works with tokens. These might be whole words, or sub-word pieces for rare/complex words.

### Step 2: From Words to Initial Vectors

Each token gets mapped to a pre-learned vector:

```typescript
// Simplified - real vectors have 384 dimensions
"drinking" → [0.23, -0.45, 0.12, ..., 0.67]  // 384 numbers
"age"      → [0.67, 0.89, -0.33, ..., 0.12]  // 384 numbers
"legal"    → [0.91, -0.12, 0.45, ..., 0.88]  // 384 numbers
```

**Where did these vectors come from?**

The model was pre-trained on billions of words. It learned that words appearing in similar contexts should have similar vectors. This is called **distributional semantics**: "You shall know a word by the company it keeps."

Words that appear near each other in sentences ("drinking" and "alcohol", "legal" and "law") end up with similar vectors.

### Step 3: Contextualization Through Transformer Layers

Here's where it gets interesting. The model doesn't just look at words in isolation:

```typescript
// Without context, "bank" is ambiguous:
"bank" → [0.5, 0.2, ..., 0.8]

// With context, the vector gets updated:
"money in the bank"    → [0.8, 0.9, ..., 0.1]  // Financial meaning
"sitting by the bank"  → [0.1, 0.3, ..., 0.9]  // Geographical meaning
```

**How does this work?**

The transformer processes the entire sentence at once. Through **self-attention**, each word can "look at" other words:

- "bank" looks at "money" → shifts toward financial meaning
- "bank" looks at "river" → shifts toward geographical meaning

The word vectors get updated based on their surrounding context. This is why embeddings capture meaning, not just vocabulary.

### Step 4: Pooling - From Word Vectors to Sentence Vector

After contextualization, we have 10 word vectors (one per token). But we need ONE vector for the whole sentence:

```typescript
// Before pooling: 10 words × 384 dimensions each
const wordVectors = [
  [0.1, 0.2, 0.3, ...],  // "the"
  [0.3, 0.4, 0.5, ...],  // "legal"
  [0.2, 0.6, 0.1, ...],  // "drinking"
  // ... 7 more word vectors
];

// After mean pooling: 1 × 384 dimensions
const sentenceVector = [
  (0.1 + 0.3 + 0.2 + ...) / 10,  // Average dimension 1
  (0.2 + 0.4 + 0.6 + ...) / 10,  // Average dimension 2
  (0.3 + 0.5 + 0.1 + ...) / 10,  // Average dimension 3
  // ... 381 more averaged dimensions
];
```

**Mean pooling** averages all the word vectors. It captures the "overall meaning" of the sentence by combining the contextualized meaning of each word.

### Step 5: Normalization

Finally, the vector gets scaled to unit length:

```typescript
// Before normalization
[0.5, 0.3, 0.8, ...]  // Length = √(0.5² + 0.3² + 0.8² + ...) = some number

// After normalization
[0.25, 0.15, 0.4, ...] // Length = 1.0
```

This ensures we're comparing **direction** only, not magnitude. Two sentences can have the same semantic direction regardless of how many words they contain.

#### Connecting Back to Our Code

Now when we see this:

```typescript
const output = await extractor(text, {
  pooling: "mean", // Average all contextualized word vectors
  normalize: true, // Scale to unit length
});
```

We understand exactly what's happening:

1. **Input**: "What is the legal drinking age in Uganda?"
2. **Tokenization**: Split into tokens
3. **Initial vectors**: Each token gets a pre-learned 384D vector
4. **Contextualization**: Transformer layers update vectors based on context
5. **Pooling**: `pooling: "mean"` → average all word vectors into one
6. **Normalization**: `normalize: true` → scale to length 1

The output is a single 384-dimensional vector that encodes the semantic meaning of the entire sentence.

#### The Beautiful Insight

{% ahamoment "RAG isn't some AI magic, it's just an architectural pattern for building AI applications and services; RAG allows us to **retrieve** and **generate** content." %}

**The model isn't magic** - it's a sophisticated pattern matcher that learned linguistic structure from billions of examples.

It learned that:

- "drinking" and "alcohol" appear in similar contexts → similar vectors
- The word "bank" near "money" means something different than "bank" near "river" → context-dependent vectors
- A sentence's meaning can be captured by averaging its contextualized word meanings → pooling works

This is why the same word in different contexts gets different embeddings, and why the model understands nuanced meaning.

#### Why This Matters

Instead of thinking:

> "The model returns embeddings" _(magic)_

We now understand:

> "The model tokenizes text, gives each token a learned vector, updates those vectors based on context using attention mechanisms, averages them into one vector, and normalizes it to unit length for clean comparison."

No magic. Just math and learned patterns.

---

{% contentfooter
  { title: "Introduction", url: "/content/ch1-rag/overview" },
  { title: "Understanding Similarity", url: "/content/ch1-rag/similarity" }
%}
