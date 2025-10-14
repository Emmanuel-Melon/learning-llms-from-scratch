# Understanding AI, One Concept at a Time

I've built simple apps with Gemini's API. But I wanted to understand
what's actually happening. So I'm learning by building everything from
first principles.

This series documents that journey. Starting with RAG.

> 🚀 **Full Guide Available Here**: Dive into the complete interactive guide at [https://inside-llms.netlify.app/overview](https://inside-llms.netlify.app/overview). This is the main entry point—start there for hands-on examples, code snippets, and in-depth explorations!

This journey transforms AI from a black box into a set of understandable, composable tools. And the best part? You don't need expensive hardware or advanced degrees to start—just curiosity and a willingness to build.

## Zero to AI: The Simple Way

When I started learning AI, I kept hitting the same roadblocks:

- Needing expensive cloud credits
- Complex setup processes
- Worrying about API rate limits and costs
- Feeling locked into specific platforms

AI Tutorials:
I came across many tutorials that either:

- Threw around terms like "embeddings capture semantic meaning" without explaining how
- Skipped from "here's the concept" straight to "use this API"
- Made everything seem like magic, not math

Then I discovered something powerful: **You don't need any of that to start learning and building with AI.**

So I started building everything from scratch, and that's when the magic happened. As I implemented each concept myself, the jargon transformed into clear, intuitive understanding.

**Here's the pattern I discovered:**

1. **Break it down** - Every complex AI concept can be decomposed into fundamental building blocks
2. **Build it yourself** - Implementing even a simple version reveals the core mechanics
3. **See the patterns** - The same principles appear again and again across different applications

I will try to peel back the layers of modern AI via practical examples, starting with the fundamentals and building up to complex architectures.

> **Disclaimer**: This isn't a traditional course or polished content from an expert. It's a collection of my personal learning journey through AI and ML—raw notes, projects that helped concepts click, and resources that actually made sense to me.

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

#### Resources

- [Official Documentation](https://huggingface.co/docs/transformers.js/index)
- [GitHub Repository](https://github.com/huggingface/transformers.js)
- [Hugging Face Models](https://huggingface.co/models)

> ℹ️ Transformers.js offers SDKs for various languages. While Python and JavaScript are officially supported, we'll be focusing on JavaScript for its accessibility and browser compatibility.
