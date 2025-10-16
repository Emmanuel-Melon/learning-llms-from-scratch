---
layout: base.njk
title: The Complete Picture
---

# The Complete Picture

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

{% contentfooter
  { title: "Embeddings", url: "/content/ch1-rag/embeddings" },
  { title: "Next Steps", url: "/content/ch1-rag/next-steps" }
%}
