---
layout: base.njk
title: Learning LLMs From Scratch
---

# Learning AI/ML from Scratch: Outline

This series is dedicated to demystifying the core concepts of modern AI. Instead of jumping straight to complex APIs and cloud services, we build key mechanisms, like retrieval, evaluation, and fine-tuning—from the ground up using only a web browser and JavaScript.

## 1. Learning AI/ML from Scratch: RAG

From Black Box to Intuition

- The Problem: Why search isn't just about keywords anymore
- Breaking Down RAG:
  - Retrieval: Finding needles in haystacks
  - Augmentation: Giving LLMs the right context
  - Generation: Creating coherent, relevant responses
- Building Blocks:
  - Embeddings: The magic of semantic search
  - Vector databases: Beyond simple keyword matching
  - Context windows: Working with limited attention
- Hands-on:
  - Building a simple RAG system from scratch
- When RAG works (and when it doesn't)
- Common pitfalls and how to avoid them

## 2. Learning AI/ML from Scratch: Prompting

The Art of Getting What You Want

- Beyond Basic Prompts:
  - The anatomy of an effective prompt
  - Few-shot vs. zero-shot learning
  - Chain-of-thought prompting
- Prompt Engineering in Practice: - Testing 50+ prompt variations (what actually works)
  The role of system vs. user messages
  Temperature and other knobs to tweak
  Advanced Patterns:
  ReAct: Combining reasoning and action
  Self-consistency and self-critique
  When to break complex tasks into steps

## 3. Learning AI/ML from Scratch: Evals

Beyond "It Looks Right"

- What to Measure:
  - Accuracy, relevance, and coherence
  - Hallucination detection
  - Bias and safety considerations
- Building an Eval System:
  - Creating test cases that matter
  - Automated vs. human evaluation
  - Setting up continuous evaluation
- Real-world Challenges:
  - Edge cases and failure modes
  - Drift detection
  - Cost vs. quality tradeoffs

## 4. Learning AI/ML from Scratch: Fine-tuning

Teaching Old Models New Tricks

- When to Fine-tune:
  - Beyond prompting: when you need more control
  - Domain adaptation
  - Style and tone alignment
- The Fine-tuning Process:
  - Data preparation and cleaning
  - Choosing the right base model
  - Training loops and hyperparameters
- Advanced Techniques:
  - LoRA and parameter-efficient fine-tuning
  - RLHF: Aligning with human preferences
  - Evaluating fine-tuned models

## 5. Learning AI/ML from Scratch: Production

From Prototype to Production

- Infrastructure:
  - Model serving options
  - Caching and optimization
  - Scaling considerations
- Monitoring and Maintenance:
  - Tracking model performance
  - Handling rate limits and quotas
  - Versioning and rollback strategies
- Cost Management:
  - Understanding the cost drivers
  - Optimizing for cost vs. performance
  - Budgeting and forecasting
- Cross-cutting Themes
  - The Developer Experience:
    - Local development vs. cloud deployment
    - Debugging LLM applications
    - Developer tooling and workflows
  - Ethics and Responsibility:
    - Bias and fairness
    - Privacy considerations
    - Content moderation
