---
layout: base.njk
title: Getting Started
---

# The Knowledge Base

In order to get started with RAG, one must first have a knowledge base.

I visited the Uganda Legal Information Institute (ULII), which is a free legal information service provided by the Law Reporting Unit of the Uganda Judiciary and a member of the global Free Access to Law community.

Through ULII, I've gathered the following key legal documents to serve as the knowledge base for my demo:

The Constitution of the Republic of Uganda (1995, as amended)
The Landlord and Tenant Act (2022)

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

{% contentfooter
  { title: "Understanding Similarity", url: "/content/ch1-rag/similarity" },
  { title: "The Generation Step", url: "/content/ch1-rag/generation" }
%}
