---
layout: base.njk
title: Learning LLMs From Scratch
---

# Inside RAG

RAG is just an architectural pattern for building AI applications and services; RAG allows us to **retrieve** and **generate** content.

## Retrieval

A knowledge base is a collection of documents that the AI model can retrieve from to answer questions.

Retrieval is the process of fetching relevant documents from a knowledge base based on the user's query.

## Generation

Generation is the process of creating new content based on the retrieved documents.

## Why This Guide is Different

Most RAG tutorials overwhelm you with tools before you understand the concepts. They start with:

- "Sign up for Pinecone/Weaviate/ChromaDB"
- "Get your OpenAI API key"
- "Configure your vector database"
- "Install these 5+ dependencies"

But what if you just want to **understand** how RAG actually works? What if you don't have API keys, cloud credits, or a powerful machine?

How does it work?
You'll need a vector database to store the documents and their embeddings.

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
