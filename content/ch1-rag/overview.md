---
layout: base.njk
title: Learning LLMs From Scratch
---

{% ahamoment "We start at <strong>Chapter 1</strong> with RAG (Retrieval Augmented Generation), which is where most practical LLM applications begin. However, if you're completely new to AI and want to build your foundational knowledge first, we have a Fundamentals chapterspecifically designed for absolute beginners." %}

# Inside RAG

RAG is a technique that enhances a model’s generation by retrieving the relevant information from external memory sources. An external memory source can be an internal database, a user’s previous chat sessions, or the internet.

You can think of RAG as a technique to construct context specific to each query, instead of using the same context for all queries. This helps with managing user data, as it allows you to include data specific to a user only in queries related to this user.

RAG isn't some AI magic, it's just an architectural pattern for building AI applications and services; RAG allows us to **retrieve** and **generate** content.

## Retrieval

A knowledge base is a collection of documents that the AI model can retrieve from to answer questions.

Retrieval is the process of fetching relevant documents from a knowledge base based on the user's query.

A retriever has two main functions: indexing and querying. Indexing involves processing data so that it can be quickly retrieved later. Sending a query to retrieve data relevant to it is called querying. How to index data depends on how you want to retrieve it later on.

At its core, retrieval works by ranking documents based on their relevance to a given query. Retrieval algorithms differ based on how relevance scores are computed. I’ll start with two common retrieval mechanisms: term-based retrieval and embedding-based retrieval.

## Generation

Generation is the process of creating new content based on the retrieved documents.

RAG Architecture
A RAG system has two components: a retriever that retrieves information from external memory sources and a generator that generates a response based on the retrieved information. 

## Getting Started

I started like most people, following a ChromaDB tutorial,
I had to get an API key from ChromaDB and set it up in my environment variables.

```bash
CHROMA_API_KEY=YOUR_API_KEY
CHROMA_TENANT=YOUR_TENANT   # usually a UUID
CHROMA_DATABASE=YOUR_DATASET_NAME
```

```typescript
import { CloudClient, Collection } from "chromadb";
import dotenv from "dotenv";

dotenv.config();

const client = new CloudClient();

const chromaCollectionPromise = client.getOrCreateCollection({
  name: process.env.CHROMA_DATABASE,
});

export default chromaCollectionPromise;
```

Yayyy, it worked! I was soon able to create a collection and later on add documents.

A few questions lingered in mind, though. What just happened here? What's a collection? What's a document? How does ChromaDB store and retrieve documents? And what does this have to do with RAG to begin with?

I was also uncomfortable with the fact that I needed to setup infra, API keys, and possibly pay for services just to get started with RAG.

### RAG from Scratch:

**No Vector Databases, No API Keys, Just Understanding**

I decided to learn RAG backwards. Not from architecture diagrams, not from "here's your tech stack," but from a single question and five objects in an array.

No Pinecone. No LangChain. No credit card required.

Just a browser, some JavaScript, and a genuine curiosity about how this stuff actually works.

## The Setup: One npm Install

Most RAG tutorials start with: "Sign up for Pinecone, get your OpenAI API key, configure your vector database..."

I started with:

```bash
npm install @huggingface/transformers
```

I know I said no dependencies but this will be the only dependency we'll ever need and it could run entirely on your browser. We'll eventually have to perform some ML operations and generate embeddings, but that's a topic for another day. This dependency will help us with all the ML stuff.

That's it. No API keys. No credit card. No cloud services.

```typescript
import { pipeline } from "@huggingface/transformers";

export const generateEmbedding = async (text: string) => {
  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2",
  );

  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
};
```

This runs entirely in your browser. The model downloads once, then it's yours. No rate limits. No usage quotas.

## The Question and the Law

Let's explore how RAG might work for a legal application. The government has passed a new act that is yet to be published in the gazette. This means AI models have no idea, and asking questions regarding this topic will probably result in hallucinations because AI models do not understand meaning; they simply perform **statistical pattern matching**.

In order to get started with RAG, one must first have a **knowledge base**.

I visited the [Uganda Legal Information Institute (ULII)](https://ulii.org/en/), which is a free legal information service provided by the Law Reporting Unit of the Uganda Judiciary and a member of the global Free Access to Law community.

Through ULII, I've gathered the following key legal documents to serve as the knowledge base for my demo:

- The Constitution of the Republic of Uganda (1995, as amended)
- The Landlord and Tenant Act (2022)

**The problem: find which law answers the question. That's RAG in its purest form.**


```typescript
const question = "What is the legal drinking age in Uganda?";

type Law = {
  id: number;
  title: string;
  content: string;
  embedding?: Array[string | number];
  metadata?: Record<string, string>;
};

```

{% codeblock "
export const laws = [
  {
    id: 1,
    title: 'Drinking Age Law',
    content:
      'The legal drinking age in Uganda is 18 years old. Anyone below this age is prohibited from purchasing or consuming alcoholic beverages in public places.',
    metadata: {
      source: 'https://www.laws.com/uganda/drinking-age-law',
      category: 'example',
    },
  },
  {
    id: 2,
    title: 'Driving Age Law',
    content:
      'The minimum age to obtain a driving license in Uganda is 18 years for motorcycles and private vehicles, and 21 years for commercial vehicles and trucks.',
    metadata: {
      source: 'https://www.laws.com/uganda/driving-age-law',
      category: 'example',
    },
  },
  {
    id: 3,
    title: 'Voting Age Law',
    content:
      'Citizens of Uganda who are 18 years or older have the right to vote in national and local elections. Voter registration is mandatory.',
    metadata: {
      source: 'https://www.laws.com/uganda/voting-age-law',
      category: 'example',
    },
  },
  {
    id: 4,
    title: 'Employment Law',
    content:
      'The minimum working age in Uganda is 14 years for light work and 18 years for hazardous work. Child labor below 14 is strictly prohibited under the Employment Act.',
    metadata: {
      source: 'https://www.laws.com/uganda/employment-law',
      category: 'example',
    },
  },
  {
    id: 5,
    title: 'Marriage Age Law',
    content:
      'The legal minimum age for marriage in Uganda is 18 years for both males and females. Marriage below this age requires parental consent and court approval.',
    metadata: {
      source: 'https://www.laws.com/uganda/marriage-age-law',
      category: 'example',
    },
  },
];", "javascript" %}


## But Wait... What Even Is an Embedding?

Before I ran this code, I needed to understand: what am I actually creating?

**An embedding is a direction in semantic space.**

That's it. When you turn "What is the legal drinking age in Uganda?" into an embedding, you're converting it into a vector—a point in 384-dimensional space. But more importantly, it's a **direction**.

The magic isn't in the numbers themselves. It's in how those directions relate to each other.

## How Does the Model Turn Text into an Embedding?

Before we dive into similarity, I needed to understand: what's actually happening inside `generateEmbedding()`?

```typescript
const embedding = await generateEmbedding("The legal drinking age...");
// Text goes in → [0.023, -0.145, 0.089, ..., 0.234] comes out
// But HOW?
```

### The High-Level Process

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

### Connecting Back to Our Code

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

### The Beautiful Insight

**The model isn't magic** - it's a sophisticated pattern matcher that learned linguistic structure from billions of examples.

It learned that:

- "drinking" and "alcohol" appear in similar contexts → similar vectors
- The word "bank" near "money" means something different than "bank" near "river" → context-dependent vectors
- A sentence's meaning can be captured by averaging its contextualized word meanings → pooling works

This is why the same word in different contexts gets different embeddings, and why the model understands nuanced meaning.

### Why This Matters

Instead of thinking:

> "The model returns embeddings" _(magic)_

We now understand:

> "The model tokenizes text, gives each token a learned vector, updates those vectors based on context using attention mechanisms, averages them into one vector, and normalizes it to unit length for clean comparison."

No magic. Just math and learned patterns.

## Understanding Similarity Through Geometry

Now that we know how embeddings are created, let's talk about how we compare them:

When two embeddings point in similar directions (small angle), the texts are semantically similar. When they're perpendicular (90°), they're unrelated. When they point opposite directions, they're... opposite in meaning.

**Cosine similarity measures the angle between vectors.**

- Cosine similarity = 1: vectors point exactly the same direction (identical meaning)
- Cosine similarity ≈ 0.8: vectors point nearly the same direction (very similar)
- Cosine similarity ≈ 0: vectors are perpendicular (unrelated topics)
- Cosine similarity = -1: vectors point opposite directions

This is what "semantic search" means. You're literally finding which documents point in the same direction as your query.

---
layout: base.njk
title: Learning LLMs From Scratch
---





















## What Does "Meaning" Even Mean Here?

When I generate an embedding for "drinking age," the model isn't philosophically understanding what "drinking" means. It learned from millions of texts that:

- "drinking," "alcohol," and "beverages" appear together often
- "legal age" and "18 years" appear in similar contexts
- Certain sentence structures indicate laws or regulations

**Meaning in embeddings = statistical patterns of language use, compressed into a direction.**

When we say two texts are "semantically similar," we're saying: based on how language is typically used, these texts discuss related concepts and would appear in similar contexts.

It's pattern recognition at massive scale, not philosophical understanding. But it works.

## Running the Code

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

## The One-Line Secret

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

## The Results

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

## The Storage Journey

Once I had embeddings working, I needed to store them. My first instinct: keep everything in memory.

```typescript
const lawEmbeddings: LawEmbedding[] = [];

// Generate once
const embeddings = await generateLawEmbeddings();
lawEmbeddings.push(...embeddings);

// Use forever (or until the process restarts)
```

This worked! But then I thought: "What happens when I restart my application?"

### Storage Evolution

**Stage 1: In-Memory Array**

```typescript
const lawEmbeddings = [];
// Fast, simple, but gone when process restarts
```

**Stage 2: JSON File**

```typescript
// Save embeddings
fs.writeFileSync("embeddings.json", JSON.stringify(lawEmbeddings));

// Load embeddings
const lawEmbeddings = JSON.parse(fs.readFileSync("embeddings.json"));
```

Now my embeddings persist! But I noticed something: for 5 laws with 384-dimensional embeddings, my JSON file was already 30KB. What if I had 10,000 laws?

**Stage 3: The Precomputation Realization**

Here's what I figured out:

**Precomputation Phase** (do this once):

1. Take each law's text → embedding model → 384D vector
2. Normalize all vectors to unit length
3. Store vectors with their metadata

**Query Phase** (do this every search):

1. User asks question → embedding model → 384D vector
2. Compare against stored embeddings
3. Return top matches

The expensive part (generating embeddings) happens once. Searching is just math on pre-computed vectors.

### Storage Decision Framework

I developed a mental model:

**Small dataset (< 10K items):**

- In-memory arrays work great
- Load from JSON on startup
- Total embedding data: < 50MB
- Search time: milliseconds

**Medium dataset (10K - 100K items):**

- JSON gets unwieldy
- Consider SQLite with blob storage
- Or simple file-based caching
- Search time: seconds

**Large dataset (100K+ items):**

- Need proper vector database
- Specialized indexes (HNSW, IVF)
- Distributed storage
- Search time: milliseconds (with indexing)

### Why Vector Databases Do More

When I finally looked at how vector databases work, it all made sense:

**ChromaDB, Pinecone, Weaviate aren't just storage.** They're:

1. **Optimized storage formats** - compressed vectors, efficient serialization
2. **Specialized indexes** - HNSW, IVF for fast similarity search
3. **Query optimization** - caching, pre-filtering, batch processing
4. **Metadata filtering** - search within subsets (e.g., "only laws from 2020")
5. **Distributed scaling** - split data across machines

But the core concept? Still just "store normalized vectors, compare with cosine similarity."

I could build demo products with JSON files and in-memory arrays. When I needed scale, I'd know exactly what problem I was solving by adding a vector database.

## The Complete Picture

Here's my entire RAG implementation. No vector database. No API keys. Everything in memory:

```typescript
import { pipeline } from "@huggingface/transformers";
import { laws } from "./dataset";

// Generate embeddings
const generateEmbedding = async (text: string) => {
  const extractor = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2",
  );
  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });
  return Array.from(output.data);
};

// Measure similarity
const measureSimilarity = (
  queryEmbedding: number[],
  lawEmbeddings: LawEmbedding[],
) => {
  const results = lawEmbeddings.map((law) => {
    const dotProduct = law.embedding.reduce(
      (sum, val, index) => sum + val * queryEmbedding[index],
      0,
    );
    return {
      ...law,
      similarityCosine: dotProduct,
    };
  });
  return results.sort((a, b) => b.similarityCosine - a.similarityCosine);
};

// Run it
const question = "What is the legal drinking age in Uganda?";
const queryEmbedding = await generateEmbedding(question);
const lawEmbeddings = await Promise.all(
  laws.map(async (law) => ({
    ...law,
    embedding: await generateEmbedding(law.content),
  })),
);
const results = measureSimilarity(queryEmbedding, lawEmbeddings);
```

That's RAG. The "R" part, anyway. Retrieval through semantic similarity.

## What This Teaches You

Understanding RAG this way means you can now:

- **Debug similarity scores**: Why is my relevant document scoring low? Maybe it needs better chunking, or a different embedding model
- **Choose the right tools**: Do I need Pinecone for 100 documents? Probably not. For 10 million? Probably yes
- **Understand parameters**: When you see `normalize: true`, you know it's ensuring you compare direction, not magnitude
- **Scale intelligently**: You know what problems you're solving as you add complexity

Most importantly: you're not scared of the tech stack anymore. When you see "vector database" or "semantic search," you think: "Oh, it's doing what I did, just faster."

## The Augmentation Part

Once you've retrieved the relevant law (highest similarity score), you augment your LLM prompt:

```typescript
const relevantLaw = results[0]; // Highest scoring law

const prompt = `
Based on this law:
${relevantLaw.content}

Answer this question: ${question}
`;

// Send to your LLM
```

The LLM doesn't need to know Ugandan law. You gave it the answer key.

## The Generation Part

And the "G" in RAG? That's just the LLM generating a response with the context you provided. You've already done the hard work—finding the right information.

---

## Why This Matters

Most people avoid learning RAG because:

- They don't have a credit card for API access
- They can't afford API costs while learning
- They think they need to learn AWS/GCP first
- The setup seems overwhelming

But you can learn the actual concepts with just:

- A browser
- One npm install
- Five items in an array

Once you understand vectors, similarity, and retrieval through building it yourself, all the production tools make sense. They're just optimized, scaled versions of what you already built.

ChromaDB? It's your cosine similarity function, but indexed for speed.

Pinecone? Same thing, with more features.

OpenAI embeddings API? The same transformer model, but hosted.

You'll look at these services and think: "Aha, it's doing exactly what I did, just at scale."

That's the power of learning from first principles with working code. No barriers to entry. Just understanding.

---

## Filtering Results: Don't Return Garbage

So far, we've been returning all 5 laws sorted by similarity. But there's a problem:

```typescript
// What if someone asks: "What's the weather like today?"
Similar laws: [
  {
    id: 3,
    title: 'Voting Age Law',
    similarityCosine: 0.23  // "Best" match, but irrelevant!
  },
  {
    id: 1,
    title: 'Drinking Age Law',
    similarityCosine: 0.21
  },
  // ... all scores are low
]
```

Just because something has the **highest** similarity doesn't mean it's **actually relevant**. A 0.23 similarity score means these texts are barely related.

### The Threshold Solution

```typescript
const SIMILARITY_THRESHOLD = 0.5; // Only return if similarity > 0.5

const relevantLaws = results.filter(
  (law) => law.similarityCosine > SIMILARITY_THRESHOLD,
);

if (relevantLaws.length === 0) {
  return "I couldn't find any relevant laws for your question.";
}

// Only use laws that are actually relevant
const topLaw = relevantLaws[0];
```

Now we're saying: "Only retrieve results if they're actually similar, not just the least-bad option."

### How Do You Pick the Threshold?

Through experimentation! I tested different queries:

- **0.8+**: Very strict - only near-exact semantic matches
- **0.5-0.7**: Good balance - clearly related content
- **< 0.5**: Too loose - starts returning unrelated documents

For my 5 laws, **0.5 worked well**. But this depends on your domain, embedding model, and document diversity.

This is a crucial step that many tutorials skip. Without filtering, you'll retrieve irrelevant content and your LLM will try to answer based on garbage context.

## Completing the RAG Pipeline: Adding Generation

Now for the moment we've been building toward - connecting retrieval to an actual LLM.

### Step 1: Add Text Generation

```typescript
import { pipeline } from "@huggingface/transformers";

export const generateText = async (prompt: string) => {
  const generator = await pipeline(
    "text2text-generation",
    "Xenova/LaMini-Flan-T5-783M",
  );

  const result = await generator(prompt, {
    max_new_tokens: 100,
  });

  return result[0].generated_text;
};
```

Once again: no API keys, no credit card. The LLM runs locally via transformers.js.

### Step 2: The Full RAG Pipeline

```typescript
const question = "What is the legal drinking age in Uganda?";

// RETRIEVE: Find relevant law
const queryEmbedding = await generateEmbedding(question);
const results = measureSimilarity(queryEmbedding, lawEmbeddings);
const relevantLaws = results.filter((law) => law.similarityCosine > 0.5);

if (relevantLaws.length === 0) {
  console.log("No relevant laws found for this question.");
  return;
}

const topLaw = relevantLaws[0];

// AUGMENT: Build prompt with retrieved context
const prompt = `You are a legal assistant. Analyze the following law and question carefully.

Law: ${topLaw.content}

Question: ${question}

Thought Process:
1. Identify the key elements in the law
2. Understand what the question is asking
3. Determine how the law applies to the question
4. Formulate a clear, accurate answer based on the law

Answer:`;

// GENERATE: LLM creates answer based on context
const answer = await generateText(prompt);
console.log(answer);
```

### What Makes This RAG

**Without RAG (just LLM):**

```typescript
const prompt = "What is the legal drinking age in Uganda?";
const answer = await generateText(prompt);
// LLM might hallucinate, give outdated info, or simply not know
```

**With RAG:**

1. **Retrieve**: Find the law with 0.837 similarity (highly relevant)
2. **Augment**: Insert that law into the prompt as context
3. **Generate**: LLM answers based on YOUR data, not its training

The LLM doesn't need to "know" Ugandan law from its training data. You gave it the answer key through retrieval.

### Why This Matters

This is how production RAG systems work:

- ChatGPT with file uploads? RAG.
- Claude with document analysis? RAG.
- Customer support bots with company knowledge? RAG.

The complexity comes from scale (millions of documents, optimized retrieval), but the core concept is exactly what we built:

1. Turn documents into embeddings
2. Find similar documents for a query
3. Give those documents to an LLM as context
4. Let the LLM generate an answer

You just built a complete RAG system with no infrastructure, no API keys, and no vector database. Everything runs locally in your browser or Node.js environment.

## Understanding Prompts: The Instruction Manual for LLMs

You might have noticed our prompt had a specific structure. That wasn't random - it's **prompt engineering**.

A prompt is an instruction given to a model to perform a task. The task can be as simple as "What is 2+2?" or as complex as "Analyze this legal document and identify potential compliance issues."

### Anatomy of a Good Prompt

A prompt generally consists of three parts:

**1. Task Description**

- What you want the model to do
- The role you want it to play
- The output format you expect

```typescript
// In our prompt:
"You are a legal assistant. Analyze the following law and question carefully.";
```

**2. Context/Examples**

- The information the model needs to complete the task
- Examples of what good output looks like (optional but helpful)

```typescript
// In our prompt:
"Law: ${topLaw.content}
Question: ${question}"
```

**3. The Specific Task**

- The concrete thing you want done right now
- Clear instruction about what to output

```typescript
// In our prompt:
"Thought Process:
1. Identify the key elements in the law
2. Understand what the question is asking
3. Determine how the law applies to the question
4. Formulate a clear, accurate answer based on the law

Answer:"
```

### Why Structure Matters

Compare these two prompts:

**Vague prompt:**

```typescript
const prompt = `${topLaw.content}\n\n${question}`;
```

**Structured prompt:**

```typescript
const prompt = `You are a legal assistant. Analyze the following law and question carefully.

Law: ${topLaw.content}

Question: ${question}

Answer:`;
```

The structured version:

- Sets clear expectations (you're a legal assistant)
- Organizes information clearly (law vs question)
- Guides the output format (just give an answer)

This is prompt engineering in action - designing instructions that get consistent, high-quality results from LLMs.

---

## What We Built

Let's recap the entire journey:

**1. Understanding Embeddings**

- Text → 384-dimensional vectors
- Vectors = directions in semantic space
- Similar meanings = similar directions

**2. Understanding Similarity**

- Cosine similarity measures angles between vectors
- High score (0.8+) = semantically similar
- Low score (< 0.5) = unrelated

**3. Understanding Search**

- Linear scan: compare query against all documents
- O(n) complexity - fine for small datasets
- Vector DBs optimize this for scale

**4. Understanding Storage**

- In-memory arrays for small datasets
- JSON files for persistence
- Vector databases for millions of documents

**5. Understanding RAG**

- Retrieve: find relevant documents via similarity
- Augment: insert context into prompt
- Generate: LLM answers based on your data

**6. Understanding Prompts**

- Structure guides the model's behavior
- Clear instructions = better outputs
- Context + task = effective prompts

All without:

- Vector databases
- API keys
- Credit cards
- Complex infrastructure

Just concepts, code, and understanding.

---

**Next in this series**: We'll explore fine-tuning, evals, and working with LLM APIs - all with the same first-principles approach. No buzzwords, just building to understand.
