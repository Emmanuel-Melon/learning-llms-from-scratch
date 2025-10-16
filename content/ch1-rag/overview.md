---
layout: base.njk
title: Retrieval Augmented Generation (RAG)
nextSection: /content/ch1-rag/overview
prevSection: /content/ch0-fundamentals/overview
chapterNumber: 1
tableOfContents:
  - id: overview
    title: Overview
    level: h2
  - id: what-is-rag
    title: What is RAG?
    level: h2
  - id: rag-architectuere
    title: RAG Architectuere
    level: h2
  - id: rag-from-scratch
    title: RAG from Scratch
    level: h2
---

{% ahamoment "We start at Chapter 1 with RAG (Retrieval Augmented Generation), which is where most practical LLM applications begin. However, if you're completely new to AI and want to build your foundational knowledge first, we have Foundatios Chapter specifically designed for absolute beginners." %}

# Overview

My journey into building AI applications began with something that changed how I thought about AI/ML. I often thought of this domain as a black box but working with Retrieval Augmented Generation (RAG) changed my perspectiv and made everything click.

You see, traditional search (think early Google) relies on keywords. If you searched for “apple nutrition,” the system would look for records containing the word apple, even if those records were about iPhones. Search engines match words, not **meaning**.

Then came large language models (LLMs), systems that can generate human-like text, but only based on what they already “know.” The problem? They don’t actually know anything. They’re just statistical pattern matchers. Ask them about your private dataset, your company’s policies, or the latest scientific paper, and they’ll **hallucinate** an answer that sounds confident but isn’t real.

That’s where RAG steps in, to help LLMs make more informed responses.

## What is RAG?

Retrieval Augmented Generation (RAG) is a technique that helps large language models (LLMs) think with external memory.

It bridges those two worlds, search and generation, letting an AI model retrieve real data from an external source (like your files, a database, or the web) and then generate a grounded, context-aware response.

In this chapter, we’ll unpack how RAG works, why it matters, and how you can build your own, without cloud credits, without API keys, and without getting lost in the buzzwords.

Instead of relying purely on what the model “knows” from its training data, RAG lets it retrieve relevant information from an outside source (like a database, a collection of files, or even the web) and then generate a response based on that context.

## RAG Architectuere

{% figure "./assets/rag.png", "Alt text for the image", "The RAG Architecture: A three-step process where (1) a user's query is transformed into a vector representation, (2) the system retrieves the most relevant document chunks based on semantic similarity, and (3) an LLM synthesizes a response using both the original query and retrieved context to provide accurate, grounded answers." %}

You can think of RAG as a technique to construct context specific to each query, instead of using the same context for all queries. This helps with managing user data, as it allows you to include data specific to a user only in queries related to this user.

> Note: “Before we build with AI, we have to understand how it works and how it remembers.”

### How RAG Works

Here’s the rhythm of it:

1. The user sends a query.
2. The retriever searches the knowledge base for the most relevant chunks.
3. The generator uses both the query and the retrieved context to craft a coherent, informed response.

That’s the loop: Query → Retrieve → Generate → Respond.

### Retrieval

Retrieval is the process of fetching relevant documents from a knowledge base based on the user's query.

A retriever has two main functions: **indexing** and **querying**. Indexing involves processing data so that it can be quickly retrieved later. Sending a query to retrieve data relevant to it is called querying. How to index data depends on how you want to retrieve it later on.

**A retriever does two things:**

{% stylizedList "

  <li>Indexing: preparing and storing documents for fast search.</li>
  <li>Querying: fetching the most relevant documents for a user’s input.</li>
  "
%}

At its core, retrieval works by ranking documents based on their relevance to a given query. Retrieval algorithms differ based on how relevance scores are computed. I’ll start with two common retrieval mechanisms: term-based retrieval and embedding-based retrieval.

Relevance is everything here. Different algorithms score relevance differently, the two most common being:

{% stylizedList "

  <li>Term-based retrieval (exact word matching)</li>
  <li>Embedding-based retrieval (semantic similarity)</li>
  "
%}

#### Knowledge Base

A knowledge base is a collection of documents that the AI model can retrieve from to answer questions.

### Generation

Generation is the process of creating new content based on the retrieved documents.
Once the retriever fetches the most relevant documents, the generator (the LLM) takes over.

It weaves a response that blends:

- The retrieved information
- The model’s own learned reasoning patterns.

This partnership, retrieval + generation, forms the essence of RAG architecture.

**The retriever brings knowledge, and the generator brings language.**

## RAG from Scratch:

Now that we’ve mapped the landscape, let’s go hands-on.
I decided to learn RAG backwards, not from architecture diagrams, not from tech stacks or fancy APIs, but from a single question and five objects in an array.

RAG seemed complex until I broke it down into steps. I built a simple version that:

1. Retrieved relevant documents (like a librarian finding the right books)
2. Added that context to my question (like giving someone background before asking for help)
3. Generated answers using both the context and the model's knowledge

Suddenly, I wasn't just using RAG, I understood why it worked and when it would fail.

### What We'll Build

What We'll Build
By the end of this chapter, you'll have built a complete legal Q&A system that works like this:

#### 1. Ask Questions in Plain Language

Users can describe their legal situations naturally:

"My landlord changed the locks without notice"
"My employee quit without giving notice"
"My neighbor is building on my property"
"I was unfairly dismissed from work"

#### 2. Get Clear, Verifiable Answers

Your RAG system will:

Reference exact laws with sections and subsections
Provide dual explanations: plain language + direct legal quotes
Show provenance: official version numbers and effective dates
Link to sources: full legal documents for verification

#### 3. Build Trust Through Transparency

Each answer includes:

Plain-language explanation anyone can understand
Exact legal text that applies to their situation
Related laws and precedents for context
Real-world interpretation of how courts have applied the law

### The Question and the Laws

Let's explore how RAG might work for a legal application. The government has passed a new act that is yet to be published in the gazette. This means AI models have no idea, and asking questions regarding this topic will probably result in hallucinations because AI models do not understand meaning; they simply perform **statistical pattern matching**.

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

### Typical Tutorial

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

{% ahamoment "Yayyy, it worked! I was soon able to create a collection and later on add documents." %}

{% stylizedList "

  <li>What just happened here?</li>
  <li>What's a collection?</li>
  <li>What's a document?</li>
  <li>How does ChromaDB store and retrieve documents?</li>
  <li>And what does this have to do with RAG to begin with?</li>
  "
%}

I was also uncomfortable with the fact that I needed to setup infra, API keys, and possibly pay for services just to get started with RAG.

---

# Getting Started

**No Vector Databases, No API Keys, Just Understanding**

I decided to learn RAG backwards. Not from architecture diagrams, not from "here's your tech stack," but from a single question and five objects in an array.

No Pinecone. No LangChain. No credit card required.

Just a browser, some JavaScript, and a genuine curiosity about how this stuff actually works.

### Local AI: Machine Learning in Your Browser

Modern browsers aren’t what they used to be. With technologies like WebAssembly and WebGPU, your browser can now do things that once demanded expensive GPUs or cloud infrastructure. You can literally run advanced machine learning models, right here, right now, in your browser tab.

We'll only require one dependency for running ML models, it's called [Transformers.js](https://huggingface.co/docs/transformers.js/index).

> Note: Transformers is available as both Node.js and Python packages. There are also a few community packages for other languages.

#### Meet Transformers.js

[Transformers.js](https://huggingface.co/docs/transformers.js/index) is an open-source JavaScript library from Hugging Face that brings state-of-the-art AI directly to your browser.

It lets you experiment with language models, embeddings, and RAG pipelines in real time, without relying on cloud APIs. Perfect for developers who want to learn AI by building it.

> Note: This guide is generally language agnostic but I'll be using TypeScript/JavaScript because I run most of my examples in the browser. Feel free to install the transformers package for your language of choice.

Want to learn more?
If this sparks your curiosity, check out our [Local AI Guide](/Local-AI) for a hands-on introduction to running and experimenting with AI models right inside your browser.

### The Setup: One npm Install

I know I said no dependencies but this will be the only dependency we'll ever need and it could run entirely on your browser. We'll eventually have to perform some ML operations and generate embeddings, but that's a topic for another day. This dependency will help us with all the ML stuff.

The installation process is very straightforward:

```bash
npm install @huggingface/transformers
```

That's it. No API keys. No credit card. No cloud services.

```typescript
import { pipeline } from "@huggingface/transformers";

// Allocate a pipeline for sentiment-analysis
const pipe = await pipeline("sentiment-analysis");

const out = await pipe("I love transformers!");
// [{'label': 'POSITIVE', 'score': 0.999817686}]
```

This runs entirely in your browser. The model downloads once, then it's yours. No rate limits. No usage quotas.

{% contentfooter
  { title: "Introduction", url: "/content/ch0-fundamentals/overview" },
  { title: "Embeddings", url: "/content/ch1-rag/embeddings" }
%}
