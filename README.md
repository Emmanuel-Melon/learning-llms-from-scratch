# L earning LLMs From Scratch

Let's explore how RAG might work for a legal application. The government has passed a new act that is yet to be published in the gazette. This means AI models have no idea, and asking questions regarding this topic will probably result in hallucinations because AI models do not understand meaning; they simply perform **statistical pattern matching**.

I had a basic understanding of RAG. For instance, I knew I had to provide material to the AI model to retrieve **knowledge** from, and then use that knowledge to answer questions. I visited the [Uganda Legal Information Institute (ULII)](https://ulii.org/en/), which is a free legal information service provided by the Law Reporting Unit of the Uganda Judiciary and a member of the global Free Access to Law community.

Through ULII, I've gathered the following key legal documents to serve as the knowledge base for my demo:

- The Constitution of the Republic of Uganda (1995, as amended)
- The Landlord and Tenant Act (2022)

## Retrieve, Extract, Transform, and Generate (RAG)

RAG is just an architectural pattern for building AI applications and services; RAG allows us to retrieve, extract, transform, and generate (RAG) content.

