---
layout: base.njk
title: Understanding Similarity
chapterNumber: 1.2
---

# Overview

When I generate an embedding for "drinking age," the model isn't philosophically understanding what "drinking" means. It learned from millions of texts that:

- "drinking," "alcohol," and "beverages" appear together often
- "legal age" and "18 years" appear in similar contexts
- Certain sentence structures indicate laws or regulations

**Meaning in embeddings = statistical patterns of language use, compressed into a direction.**

When we say two texts are "semantically similar," we're saying: based on how language is typically used, these texts discuss related concepts and would appear in similar contexts.

It's pattern recognition at massive scale, not philosophical understanding. But it works.

### Understanding Similarity Through Geometry

Now that we know how embeddings are created, let's talk about how we compare them:

When two embeddings point in similar directions (small angle), the texts are semantically similar. When they're perpendicular (90°), they're unrelated. When they point opposite directions, they're... opposite in meaning.

**Cosine similarity measures the angle between vectors.**

{% stylizedList "

  <li>Cosine similarity = 1: vectors point exactly the same direction (identical meaning)</li>
  <li>Cosine similarity ≈ 0.8: vectors point nearly the same direction (very similar)</li>
  <li>Cosine similarity ≈ 0: vectors are perpendicular (unrelated topics)</li>
  <li>Cosine similarity = -1: vectors point opposite directions</li>
  "
%}

{% ahamoment "This is what 'semantic search' means. You're literally finding which documents point in the same direction as your query." %}

### Running the Code

I generated embeddings for my question and all five laws:

```typescript
// Generate query embedding
const queryEmbedding = await generateEmbedding(question);
console.log("Query embedding length:", queryEmbedding.length); // 384

// Generate law embeddings
const lawEmbeddings = await Promise.all(
  laws.map(async (law) => ({
    id: law.id,
    title: law.title,
    content: law.content,
    embedding: await generateEmbedding(law.content),
  })),
);
```

Each embedding is 384 numbers. Each number is a coordinate in semantic space. Together, they form a direction.

### The One-Line Secret

The math is simple:

```typescript
A = [1, 2, 3];
B = [2, 3, 4];
```

```typescript
// Dot product
A·B = 1*2 + 2*3 + 3*4 = 20

// Magnitudes
||A|| = sqrt(1^2 + 2^2 + 3^2) = sqrt(14)
||B|| = sqrt(2^2 + 3^2 + 4^2) = sqrt(29)


```

```typescript
// Cosine similarity
= 20 / (sqrt(14) * sqrt(29)) ≈ 0.9746

```

So A and B are very similar, they’re almost pointing in the same direction.

Here's the actual similarity calculation:

```typescript
const dotProduct = law.embedding.reduce(
  (sum, val, index) => sum + val * queryEmbedding[index],
  0,
);
```

That's it. That's "semantic search."

Because our vectors are normalized (`normalize: true`), the dot product **IS** the cosine similarity. We don't even need to calculate magnitudes—they're already length 1.

We're just multiplying corresponding numbers and adding them up. The result tells us how aligned the directions are.

### Core Concepts

What is “magnitude,” really?

If you imagine a vector as an arrow in space — magnitude is how long that arrow is.
It tells you how much of something you’ve got, not which direction it points in.

In the context of cosine similarity:

The magnitude serves as a normalizer.
It removes the effect of size so that the comparison only cares about direction.

If two vectors both point northeast, but one’s longer — that’s like one person shouting louder, not saying something different.
Cosine similarity divides out that loudness, so only the message matters.

Why it matters:

Without the magnitude in the denominator, the dot product alone would reward bigger numbers, not alignment.
That means:

A big vector could look “similar” to many others just because of its size.

The cosine denominator keeps it honest — every vector gets scaled down to unit length (a direction on a circle or hypersphere).

### The Results

```
Similar laws: [
  {
    id: 1,
    title: 'Drinking Age Law',
    similarityCosine: 0.837144804451979
  },
  {
    id: 2,
    title: 'Driving Age Law',
    similarityCosine: 0.5945096192145449
  },
  {
    id: 4,
    title: 'Employment Law',
    similarityCosine: 0.5584609858892277
  },
  {
    id: 5,
    title: 'Marriage Age Law',
    similarityCosine: 0.5531829128350986
  },
  {
    id: 3,
    title: 'Voting Age Law',
    similarityCosine: 0.5264158777233247
  }
]
```

Look at those numbers:

- **0.837** for Drinking Age Law—vectors pointing almost the same direction
- **0.594** for Driving Age—somewhat related (both about age requirements)
- **0.526** for Voting Age—less related but still similar context

The system **knows** which law is relevant. Not through keyword matching, but through semantic direction.

## What Other Tutorials Don't Show You

I looked up typical RAG tutorials. Here's what they say:

- "Use vector databases for semantic search"
- "Embeddings capture semantic meaning"
- "Dense retrieval relies on vector similarity in high-dimensional space"

Here's what they don't show:

1. **The actual numbers**: What does 0.837 vs 0.526 look like?
2. **The actual calculation**: It's one line of code
3. **What "semantic" means**: It's geometry, not magic
4. **That you don't need infrastructure**: Five laws in memory work fine

They throw around phrases like "high-dimensional vector space" and "dense vector embeddings" but never show you it's just:

```
[0.23, 0.45, 0.12, ...] compared to [0.25, 0.43, 0.15, ...]
```

And the comparison is literally addition and multiplication.

## Why This Approach Works

I didn't start from:

- "Here's your stack: LangChain, Pinecone, Vercel, HuggingFace Inference API..."

I started from:

- "What is a vector?"
- "What is similarity?"
- "What is normalization?"
- "Why do we pool embeddings?"

Once I understood these concepts through actual code and real output, everything else made sense.

When I later looked at ChromaDB's documentation:

```python
collection.add(
    documents=["doc1", "doc2"],
    ids=["id1", "id2"]
)

results = collection.query(
    query_texts=["What is..."],
    n_results=2
)
```

I didn't see magic. I saw:

1. Generate embeddings for documents
2. Store them (probably in an optimized index)
3. Generate embedding for query
4. Calculate cosine similarity with all documents
5. Return top N by similarity score

It's doing exactly what I did, just optimized for millions of vectors instead of five.

## The Cosine

The geometry version:

In a right triangle:

You got an angle θ (theta).

You got three sides:

Adjacent (the one next to θ)

Opposite (the one across from θ)

Hypotenuse (the long side)

The cosine of that angle is:

```typescript
const cosine = adjacent / hypotenuse;
```

It’s a ratio — it tells you how “flat” the angle is.

🧭 What that means visually

If θ = 0° → cosine = 1 (perfectly flat — full alignment)

If θ = 90° → cosine = 0 (completely perpendicular — no alignment)

If θ = 180° → cosine = –1 (opposite directions)

So, cosine transforms angle → alignment score between –1 and 1.

💡 Why cosine similarity uses cosine

When you have two vectors, say A and B, they form an angle θ between them.
Mathematically, the cosine of that angle can be computed as:

That’s literally what cosine similarity is!
We just take the dot product, normalize it by the magnitudes, and boom — we get the cosine of the angle.
So cosine similarity is the cosine of the angle between two vectors.

The Diagram:
🌀 Left — “Similar”

A and B are close in direction → small angle → cos(θ) ≈ 1.
That’s your “these two are basically saying the same thing” scenario.
They might have different lengths (magnitudes), but they vibe in the same direction.

⚖️ Middle — “Unrelated”

A and B are perpendicular → 90° → cos(θ) = 0.
No overlap. One’s talking north–south, the other east–west.
It’s not that they’re opposed — they just don’t speak the same language at all.
No shared rhythm in their signals.

⚔️ Right — “Opposite”

A and B face opposite ways → 180° → cos(θ) = –1.
Perfect opposition. Same axis, reversed polarity.
Like someone shouting “yes” while the other yells “no” in the exact same tone.

## The Search Problem I Didn't Know I Had

After generating all my embeddings, I had a new question: "How do I actually search?"

The answer seemed obvious:

```typescript
const similarLaws = lawEmbeddings
  .map((law) => {
    const similarity = calculateCosineSimilarity(queryEmbedding, law.embedding);
    return { ...law, similarity };
  })
  .sort((a, b) => b.similarity - a.similarity);
```

Simple, right? Loop through every law, calculate similarity, sort by score, done.

This innocent block of code taught me more about vector databases than any tutorial.

### What I Was Actually Doing: Linear Scan

Let's break down what happens:

**The `.map()` part:**

- Law 1: calculate cosine similarity ✓
- Law 2: calculate cosine similarity ✓
- Law 3: calculate cosine similarity ✓
- Law 4: calculate cosine similarity ✓
- Law 5: calculate cosine similarity ✓

**The `.sort()` part:**

- Take all 5 results, sort by similarity score

I'm comparing my query against EVERY law, every single time someone searches.

This is called **linear scan** or **brute-force search**. And it's O(n) - if you have n laws, you do n similarity calculations.

### Understanding the Actual Computation

Remember, each embedding is a 384-dimensional vector. When we calculate cosine similarity, we're doing:

```typescript
const dotProduct = law.embedding.reduce(
  (sum, val, index) => sum + val * queryEmbedding[index],
  0,
);
```

For ONE law, that's **384 multiplication operations** plus **384 addition operations**.

**For my 5 laws:**

- 5 laws × 384 dimensions = **1,920 operations**
- In JavaScript, on a modern browser? Lightning fast. Milliseconds.

**But if I had 10,000 laws:**

- 10,000 laws × 384 dimensions = **3,840,000 operations**
- Still acceptable for a single query in a modern JS engine
- But now multiply by 100 concurrent users...

**With 1 million laws:**

- 1,000,000 laws × 384 dimensions = **384,000,000 operations**
- Now we have a problem

### What Do These 384 Dimensions Actually Mean?

This was my next question. Why 384? Why not 10 or 10,000?

**Each dimension represents a feature or aspect of meaning.** The model (`Xenova/all-MiniLM-L6-v2`) was trained to convert text into this 384-dimensional space such that:

- Semantically similar texts end up close together
- Each dimension captures _something_ about the text - maybe syntax, sentiment, topic, grammatical structure

But here's the wild part: **we don't know what each dimension means**. The neural network learned these features during training. Dimension 47 might encode something about legal terminology. Dimension 203 might capture formality. Dimension 381 might relate to temporal references. We can't tell—it's learned, not programmed.

**Why 384 specifically?**

It's a design choice. A trade-off:

**Fewer dimensions (e.g., 128):**

- Faster computation
- Less memory
- But you lose nuance - like describing a complex idea with just a few words

**More dimensions (e.g., 768, 1024, 1536):**

- Richer representation
- Captures more semantic nuance
- But more expensive to compute and store

**384 is the sweet spot for this model** - enough dimensions to capture rich meaning, small enough to be computationally practical.

Think of it like resolution: 384 dimensions is like 1080p video. You could go higher (4K = 1536 dimensions), but for many use cases, 1080p is perfectly good and much faster to process.

**Why do we need so many dimensions at all?**

Imagine describing the sentence "The legal drinking age in Uganda is 18 years old" with just 3 numbers. You'd lose almost everything about its meaning.

With 384 numbers, the model can encode:

- It's about legal regulations
- It's about age restrictions
- It's about Uganda specifically
- It's formal/official language
- It's a statement of fact, not opinion
- The specific domain (alcohol/drinking)

All of this (and more) is captured in the interplay of those 384 dimensions. That's why semantically similar texts end up pointing in similar directions—they share many of these encoded features.

### Tying It Back to Our Code

Let's connect this to what we actually built:

```typescript
// Generate embeddings
const queryEmbedding = await generateEmbedding(question);
// "What is the legal drinking age in Uganda?"
// → [0.023, -0.145, 0.089, ..., 0.234] (384 numbers)

const lawEmbedding = await generateEmbedding(law.content);
// "The legal drinking age in Uganda is 18 years old..."
// → [0.019, -0.142, 0.091, ..., 0.229] (384 numbers)

// Compare them
const similarity = calculateCosineSimilarity(queryEmbedding, lawEmbedding);
// → 0.837 (very similar!)
```

**What just happened?**

1. Both texts got converted into 384-dimensional vectors
2. Each vector is a direction in semantic space
3. Cosine similarity measured the angle between those directions
4. Small angle (0.837 similarity) = semantically similar

**Why is this better than keyword matching?**

With keyword matching, I'd look for exact word overlaps:

- Query: "drinking age"
- Law: "alcoholic beverages"
- Match? **Nope.** No shared words.

But in embedding space:

- "drinking age" → [0.12, -0.45, 0.78, ...]
- "alcoholic beverages" → [0.11, -0.43, 0.76, ...]
- These vectors point in nearly the same direction!

The model learned that "drinking" and "alcoholic beverages" are semantically related, even though they share no words. That relationship is encoded across those 384 dimensions.

**Another example from my results:**

My query: "What is the legal **drinking age** in Uganda?"

- Drinking Age Law: similarity **0.837** ✓
- Driving Age Law: similarity **0.594**
- Voting Age Law: similarity **0.526**

All three laws mention "age" and "Uganda." Keyword matching would struggle to rank them. But embeddings captured that "drinking" is much more related to "alcoholic beverages" than to "driving license" or "voter registration."

**The 384 dimensions encoded the difference** - not through explicit rules, but through learned patterns from millions of examples of how language is used.

### When Reality Hits

- **5 laws?** Takes milliseconds. Perfect.
- **100 laws?** Still pretty fast.
- **10,000 laws?** Starting to slow down...
- **1 million laws?** Your browser freezes.
- **100 million laws?** Forget about it.

Suddenly, I understood why vector databases exist.

### The Trade-off I Discovered

Linear scan gives you EXACT results. You check every single vector, so you never miss the best match.

But do you always need exact results?

If the top result has similarity 0.837 and there's another at 0.836, does it matter which one you get? Probably not.

Vector databases use algorithms that trade a tiny bit of accuracy for massive speed gains:

**HNSW (Hierarchical Navigable Small World)**

- Builds a graph of similar vectors
- Instead of checking all vectors, you "hop" through the graph
- Finds approximate nearest neighbors in O(log n) time

**IVF (Inverted File Index)**

- Clusters similar vectors together
- Only searches within relevant clusters
- Skips entire regions of irrelevant data

These aren't "better" than linear scan - they're **optimizations for scale**.

### When to Use What

This is what I learned through experimentation:

**< 10,000 items?**

- Linear scan works fine
- In-memory arrays are perfect
- No need for complex infrastructure

**10,000 - 100,000 items?**

- Linear scan gets slow
- Consider simple optimizations (caching, pre-filtering)
- Maybe a lightweight vector DB

**100,000+ items?**

- You need proper indexing
- ChromaDB, Pinecone, Weaviate become essential
- The complexity is now worth it

Most tutorials skip straight to "use a vector database." But now I understood WHY. Not because it's required, but because linear scan doesn't scale.

{% contentfooter
  { title: "Embeddings", url: "/content/ch1-rag/embeddings" },
  { title: "The Storage Problem", url: "/content/ch1-rag/storage" }
%}
