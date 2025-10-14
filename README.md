---
layout: base.njk
title: Learning LLMs From Scratch
---

# Understanding AI, One Concept at a Time

Welcome to my open notebook on learning AI and machine learning!

This journey transformed AI from a black box into a set of understandable, composable tools. And the best part? You don't need expensive hardware or advanced degrees to start—just curiosity and a willingness to build.

**The Problem I Had**:

When I started learning AI, I kept hitting tutorials that either:

- Threw around terms like "embeddings capture semantic meaning" without explaining how
- Skipped from "here's the concept" straight to "use this API"
- Made everything seem like magic, not math

So I started building everything from scratch, and that's when the magic happened. As I implemented each concept myself, the jargon transformed into clear, intuitive understanding.

**Here's the pattern I discovered:**

1. **Break it down** - Every complex AI concept can be decomposed into fundamental building blocks
2. **Build it yourself** - Implementing even a simple version reveals the core mechanics
3. **See the patterns** - The same principles appear again and again across different applications

### How I Learned to See Through the Jargon

When I first heard "vector embeddings," it was just another buzzword. But when I created my own word vectors by training a simple neural network to predict word contexts, I realized: **it's all about spatial relationships**. Words that appear in similar contexts end up close together in this high-dimensional space. That "384-dimensional vector" became as intuitive as placing cities on a map—of course "king" and "queen" should be neighbors!

Semantic search stopped being a black box when I implemented my own similarity function. The first time I searched for "feline pets" and got results about cats—without the word "cat" appearing anywhere in the query—I understood: **it's about meaning, not keywords**. The angles between vectors in this space capture semantic relationships that simple text matching can't see.

RAG seemed complex until I broke it down into steps. I built a simple version that:

1. Retrieved relevant documents (like a librarian finding the right books)
2. Added that context to my question (like giving someone background before asking for help)
3. Generated answers using both the context and the model's knowledge

Suddenly, I wasn't just using RAG—I understood why it worked and when it would fail.

### The Lightbulb Moments

- **Weights as Importance**: When I trained my first model and saw how adjusting weights changed its predictions, I realized: these numbers aren't magic—they're just importance scores, like how you might weigh different factors when making a decision.

- **Classification as Geometry**: Visualizing how a model draws boundaries in high-dimensional space made it click. It's not that different from drawing a line to separate apples from oranges—just with more dimensions and fancier math.

- **Training as Optimization**: Watching the loss decrease during training was like watching a pilot adjust course—each small correction based on feedback, gradually getting closer to the target.

- **Deep Learning's Power**: The real revelation came when I saw how simple building blocks (neurons) could learn increasingly complex patterns. It's like how letters form words, words form sentences, and sentences tell stories.

This hands-on approach transformed AI from a collection of buzzwords into a set of tools I understand deeply enough to use creatively. That's what I want to share with you—not just what these concepts are, but how to develop an intuitive feel for them through practice.

Most tutorials show you **what** to build. I'll show you how I came to understand **why** these techniques work, so you can apply them in ways I haven't even imagined.

I will try to peel back the layers of modern AI via practical examples, starting with the fundamentals and building up to complex architectures.

> **Disclaimer**: This isn't a traditional course or polished content from an expert. It's a collection of my personal learning journey through AI and ML—raw notes, projects that helped concepts click, and resources that actually made sense to me.

In these notes, I'll share the key insights and "aha" moments that made everything click for me, so you can develop that same intuitive understanding.

## Zero to AI: The Simple Way

When I started learning AI, I kept hitting the same roadblocks:

- Needing expensive cloud credits
- Complex setup processes
- Worrying about API rate limits and costs
- Feeling locked into specific platforms

Then I discovered something powerful: **You don't need any of that to start learning and building with AI.**

### What worked for me

- **From Jargon to Intuition**: Terms like "embeddings" and "attention" went from buzzwords to intuitive concepts once I saw them in action through my own code.

- **The Power of First Principles**: By starting from scratch, I learned not just how to use AI tools, but why they work—and when they won't.

- **Math as a Superpower**: The mathematical concepts that seemed abstract (vectors, matrices, probability) became powerful tools for solving real problems.

What surprised me most was how understanding these fundamentals made it incredibly easy to pick up any ML tool or framework later. The concepts transfer much better than any specific tool's syntax ever could.

### Local AI/ML

Modern browsers have become powerful enough to run sophisticated AI models directly in your browser. This changes everything about how we can learn and build with AI. For a comprehensive guide on getting started with local AI, check out our [Local AI Guide](Local-AI.md).

Key benefits include:

- **Privacy First**: Your data never leaves your device
- **No Setup Required**: Start coding immediately with just a web browser
- **Production-Ready**: The same models used in cloud services, running locally
- **Free and Open**: No API keys, no rate limits, no hidden costs

This approach has made AI more accessible and understandable than ever before. You can experiment, learn, and build without any of the traditional barriers to entry.

## What to Expect

I'll walk through practical examples that build from the ground up, focusing on understanding rather than just implementation. We'll use Transformers.js to bring these concepts to life directly in your browser—no PhD required!

## What You'll Find Here

- **My personal notes** from studying AI/ML concepts
- **Practical examples** that helped me understand the theory
- **Hands-on projects** I built to reinforce my learning
- **Open collaboration** - feel free to suggest improvements or add content!

## The Learning Path So Far

This is an evolving collection of concepts I'm exploring. More topics will be added as I continue my learning journey!

### 1. Semantic Search & RAG Systems

**From Zero to Semantic Search**

- Understand embeddings as directions in semantic space
- Build a legal Q&A system that actually understands meaning
- Learn why vector databases exist and when you need them

### 2. Text Classification from Scratch

**Beyond Simple Categories**

- Build a content moderation system that learns patterns
- Understand how models distinguish categories from examples
- Explore the line between statistical patterns and "understanding"

🔜 **Coming soon**: More deep dives into attention mechanisms, fine-tuning, and production deployment patterns!

## How I'm Learning

This is a living document of my learning process. I'm sharing what's working for me, but I'm still learning too! Here's my approach:

- 🔍 **Learning in Public** - Sharing my notes and projects as I go
- 🛠 **Hands-on First** - I learn best by building, so that's what I focus on
- 📚 **From Basics Up** - Starting simple and gradually increasing complexity
- 🤝 **Open to Feedback** - Found a mistake? Have a better explanation? Please contribute!

This is an open-source project, and I welcome contributions, corrections, and suggestions. If you're on a similar learning journey, I hope you find these resources helpful!

## Table of Content

Each section is self-contained with its own setup instructions. Start with any that interests you:

1. [Inside RAG: Learning from First Principles](/ch1/overview) - Start here to understand retrieval and generation
2. [Inside Text Classification: Learning from First Principles](/ch2/overview) - Learn how to build a spam filter from scratch

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- [Node.js](https://nodejs.org/) v18 or later (for local development)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) package manager

### Installation

1. **Clone this repository**

   ```bash
   git clone https://github.com/your-username/learning-llms-from-scratch.git
   cd learning-llms-from-scratch
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or if using Yarn
   # yarn install
   ```

3. **Install Transformers.js**

   ```bash
   npm install @huggingface/transformers
   # or with Yarn
   # yarn add @huggingface/transformers
   ```

4. **Verify Installation**
   Create a test file `test.js` with the following code:

   ```javascript
   import { pipeline } from "@huggingface/transformers";

   (async () => {
     try {
       const pipe = await pipeline("text-classification");
       const result = await pipe("Transformers.js is amazing!");
       console.log("✅ Setup successful!", result);
     } catch (error) {
       console.error("❌ Setup failed:", error);
     }
   })();
   ```

   Then run:

   ```bash
   node test.js
   ```

   You should see sentiment analysis results in your console.

### Transformers.js: AI in the Browser

[Transformers.js](https://huggingface.co/docs/transformers.js/index) is an open-source JavaScript library from Hugging Face that brings state-of-the-art machine learning directly to your web browser. It's part of the same ecosystem that powers many production AI systems, but with a crucial difference: **everything runs on your device**.

#### Quick Start Example

```javascript
import { pipeline } from "@huggingface/transformers";

// Allocate a pipeline for sentiment-analysis
const analyze = async () => {
  const pipe = await pipeline("sentiment-analysis");
  const result = await pipe("I love transformers!");
  console.log(result);
  // [{'label': 'POSITIVE', 'score': 0.999817686}]
};

analyze();
```

#### Resources

- [Official Documentation](https://huggingface.co/docs/transformers.js/index)
- [GitHub Repository](https://github.com/huggingface/transformers.js)
- [Hugging Face Models](https://huggingface.co/models)

> ℹ️ Transformers.js offers SDKs for various languages. While Python and JavaScript are officially supported, we'll be focusing on JavaScript for its accessibility and browser compatibility.

### How We'll Use It

We'll use Transformers.js to explore AI concepts through practical examples. The best part? You can run everything with just a web browser—no special setup required.

- **Developer Friendly**
  - Functional parity with Python's Transformers library
  - Same pre-trained models as the Python ecosystem
  - Familiar API for those who know PyTorch or TensorFlow.js
  - TypeScript support included

```javascript
// Real-time sentiment analysis in the browser
const analyzeText = async (text) => {
  const classifier = await pipeline(
    "sentiment-analysis",
    "Xenova/distilbert-base-uncased-finetuned-sst-2-english",
  );
  return await classifier(text);
};
```

> 💡 The goal is to understand concepts so we'll focus on core ML principles. The knowledge you gain here will make it easier to pick up other tools and frameworks when you need to work at scale!
