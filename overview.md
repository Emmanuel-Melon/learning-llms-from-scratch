---
layout: base.njk
title: Learning LLMs From Scratch
permalink: /
---

# Understanding AI, One Concept at a Time

AI is everywhere now. It writes, listens, recommends, translates, and reasons, but for most of us, it still feels like magic hidden behind an API key.This project is my attempt to lift that veil.

I’m not an expert; I’m a curious builder. I wanted to understand how all this works, how something built from math and code can seem to understand us. Along the way, I discovered that AI isn’t a black box at all. It’s a set of systems, each doing something simple, that, when connected, start to look like thought.

This journey transformed AI from a black box into a set of understandable, composable tools. And the best part? You don't need expensive hardware or advanced degrees to start, just curiosity and a willingness to build.

## The Goal of This Series

This series is about applied AI: using existing models and concepts to build real-world systems.

From **Retrieval-Augmented Generation (RAG)** to **recommendation systems**, from **neural networks** to **data embeddings**, we’ll peel back the layers of how AI _actually_ works, and build working examples along the way.

If you’ve ever wanted to understand what happens behind the APIs, you’re in the right place.

> **Disclaimer**: This isn't a traditional course or polished content from an expert. It's a collection of my personal learning journey through AI and ML—raw notes, projects that helped concepts click, and resources that actually made sense to me.

## Core Concepts

We'll mostly focus on these because they're widely used in most AI powered applications.

### Large Language Models

LLMs (Large Language Models) are the engines behind the new era of intelligent software.
They can understand, generate, and interpret human language with remarkable depth.

LLMs may be used to enhance research and information retrieval in specialized areas such as medicine or law, and this series was inspired by my own journey of learning how to build LLM-powered legal application.

---

### Vector Dabases & Embeddings

Before a model can “understand” language, it must translate words into **vectors**, mathematical fingerprints that capture meaning through proximity.

Embeddings are the bridge between human thought and machine computation.  
Once you grasp them, AI stops feeling like sorcery and starts feeling like physics.

### Table of Content

Each section is self-contained with its own setup instructions. Start with any that interests you:

0. [The Fundementals](/content/ch0-fundamentals/overview) - Start here if you learn what a vector database is
1. [Inside RAG: Learning from First Principles](/content/ch1-rag/overview) - Start here to understand retrieval and generation
2. [Inside Text Classification: Learning from First Principles](/content/ch2-text-classification/overview) - Learn how to build a spam filter from scratch

## Zero to AI: The Simple Way

Most guides jump straight into tool use, paid APIs, fancy frameworks, or complex setups, without ever explaining the why behind it all.

**When I started learning AI, I kept hitting the same roadblocks:**

- Needing expensive cloud credits
- Complex setup processes
- Worrying about API rate limits and costs
- Feeling locked into specific platforms

**Then there were the technical roadblocks:**

{% stylizedList "

  <li>Threw around terms like 'embeddings capture semantic meaning' without explaining how</li>
  <li>Skipped from 'here's the concept' straight to 'use this API'</li>
  <li>Made everything seem like magic, not math</li>
  "
%}

Then I discovered something powerful: **You don't need any of that to start learning and building with AI.**

That's why I decided to start building everything from scratch and running it locally in my browser. As I implemented each concept myself, the jargon transformed into clear, intuitive understanding.

**Here's the pattern I discovered:**

{% stylizedList "

  <li>Break it down - Every complex AI concept can be decomposed into fundamental building blocks</li>
  <li>Build it yourself - Implementing even a simple version reveals the core mechanics</li>
  <li>See the patterns - The same principles appear again and again across different applications</li>
  "
%}

### How I Learned to See Through the Jargon

When I first heard "vector embeddings," it was just another buzzword. But when I created my own word vectors by training a simple neural network to predict word contexts, I realized: **it's all about spatial relationships**. Words that appear in similar contexts end up close together in this high-dimensional space. That "384-dimensional vector" became as intuitive as placing cities on a map, of course "king" and "queen" should be neighbors!

Semantic search stopped being a black box when I implemented my own similarity function. The first time I searched for "feline pets" and got results about cats, without the word "cat" appearing anywhere in the query, I understood: **it's about meaning, not keywords**. The angles between vectors in this space capture semantic relationships that simple text matching can't see.

### Local AI/ML

Modern browsers have become powerful enough to run sophisticated AI models directly in your browser. This changes everything about how we can learn and build with AI. For a comprehensive guide on getting started with local AI, check out our [Local AI Guide](Local-AI.md).

Key benefits include:

- **Privacy First**: Your data never leaves your device
- **No Setup Required**: Start coding immediately with just a web browser
- **Production-Ready**: The same models used in cloud services, running locally
- **Free and Open**: No API keys, no rate limits, no hidden costs

This approach has made AI more accessible and understandable than ever before. You can experiment, learn, and build without any of the traditional barriers to entry.

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

### What worked for me

- **From Jargon to Intuition**: Terms like "embeddings" and "attention" went from buzzwords to intuitive concepts once I saw them in action through my own code.

- **The Power of First Principles**: By starting from scratch, I learned not just how to use AI tools, but why they work, and when they won't.

- **Math as a Superpower**: The mathematical concepts that seemed abstract (vectors, matrices, probability) became powerful tools for solving real problems.

What surprised me most was how understanding these fundamentals made it incredibly easy to pick up any ML tool or framework later. The concepts transfer much better than any specific tool's syntax ever could.

### The Lightbulb Moments

I had a few "aha moments" as I was building some of these applications and this is what encouraged me to write about my journey.

- **Weights as Importance**: When I trained my first model and saw how adjusting weights changed its predictions, I realized: these numbers aren't magic, they're just importance scores, like how you might weigh different factors when making a decision.

- **Classification as Geometry**: Visualizing how a model draws boundaries in high-dimensional space made it click. It's not that different from drawing a line to separate apples from oranges, just with more dimensions and fancier math.

- **Training as Optimization**: Watching the loss decrease during training was like watching a pilot adjust course, each small correction based on feedback, gradually getting closer to the target.

- **Deep Learning's Power**: The real revelation came when I saw how simple building blocks (neurons) could learn increasingly complex patterns. It's like how letters form words, words form sentences, and sentences tell stories.

This hands-on approach transformed AI from a collection of buzzwords into a set of tools I understand deeply enough to use creatively. That's what I want to share with you—not just what these concepts are, but how to develop an intuitive feel for them through practice.

Most tutorials show you **what** to build. I'll show you how I came to understand **why** these techniques work, so you can apply them in ways I haven't even imagined.

Do not worry about any of the terms above, I will try to peel back the layers of modern AI via practical examples, starting with the fundamentals and building up to complex architectures.

In these notes, I'll share the key insights and "aha" moments that made everything click for me, so you can develop that same intuitive understanding.

## What to Expect

I'll walk through practical examples that build from the ground up, focusing on understanding rather than just implementation. We'll use Transformers.js to bring these concepts to life directly in your browser.

### What You'll Find Here

- **My personal notes** from studying AI/ML concepts
- **Practical examples** that helped me understand the theory
- **Hands-on projects** I built to reinforce my learning
- **Open collaboration** - feel free to suggest improvements or add content!

### Table of Content

Each section is self-contained with its own setup instructions. Start with any that interests you:

0. [The Fundementals](/content/ch0-fundamentals/overview) - Start here if you learn what a vector database is
1. [Inside RAG: Learning from First Principles](/content/ch1-rag/overview) - Start here to understand retrieval and generation
2. [Inside Text Classification: Learning from First Principles](/content/ch2-text-classification/overview) - Learn how to build a spam filter from scratch

{% ahamoment "We start at <strong>Chapter 1</strong>, but if you have zero background in AI and want to get started with the basics, check out the <strong>Fundamentals chapter (Chapter 0)</strong>. While Chapter 1 covers core concepts like embeddings and RAG, the Fundamentals chapter is designed for absolute beginners with more examples and foundational content to help you build your understanding from the ground up.
" %}
