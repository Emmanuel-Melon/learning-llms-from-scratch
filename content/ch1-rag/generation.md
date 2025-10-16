---
layout: base.njk
title: The G in RAG - Generation
chapterNumber: 1.2
---

# Overview

Now for the moment we've been building toward, connecting retrieval to an actual LLM.

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

---

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

{% contentfooter
  { title: "Embeddings", url: "/content/ch1-rag/embeddings" },
  { title: "The Complete Picture", url: "/content/ch1-rag/full-project" }
%}
