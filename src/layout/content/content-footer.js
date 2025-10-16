module.exports = function contentfooter(prev = null, next = null) {
  const prevLink = prev
    ? `
      <a href="${prev.url}" class="content-nav-link content-nav-prev">
        <span class="content-nav-label">Previous</span>
        <span class="content-nav-title">${prev.title}</span>
      </a>
    `
    : "<div></div>";

  const nextLink = next
    ? `
      <a href="${next.url}" class="content-nav-link content-nav-next">
        <span class="content-nav-label">Next</span>
        <span class="content-nav-title">${next.title}</span>
      </a>
    `
    : "<div></div>";

  return `
<nav class="content-footer-nav">
  ${prevLink}
  ${nextLink}
</nav>

<style>
  .content-footer-nav {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 2rem;
    margin: 3rem 0 2rem;
    padding-top: 2rem;
    border-top: 2px dashed #d1d5db;
  }

  .content-nav-link {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
    text-decoration: none;
    color: #1e293b;
    position: relative;
    border-radius: 0.25rem;
    transition: all 0.2s ease;
    min-width: 200px;
    flex: 0 1 auto;
  }

  /* Hand-drawn background - matches navbar style */
  .content-nav-link::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
    border: 1px solid #3b82f6;
    border-radius: 0.25rem;
    transform: translate(-50%, -50%) rotate(-2deg);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .content-nav-link:hover::before {
    opacity: 1;
  }

  .content-nav-link:hover {
    color: #2563eb;
    transform: translateY(-1px);
  }

  /* Align prev to left, next to right */
  .content-nav-prev {
    align-items: flex-start;
    text-align: left;
    margin-right: auto;
  }

  .content-nav-next {
    align-items: flex-end;
    text-align: right;
    margin-left: auto;
  }

  .content-nav-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    position: relative;
    z-index: 1;
  }

  .content-nav-title {
    font-size: 1rem;
    font-weight: 700;
    font-family: var(--font-heading);
    line-height: 1.3;
    position: relative;
    z-index: 1;
  }

  /* Arrow indicators using lucide-style icons */
  .content-nav-prev .content-nav-label::before {
    content: "←";
    margin-right: 0.5rem;
    font-size: 1rem;
  }

  .content-nav-next .content-nav-label::after {
    content: "→";
    margin-left: 0.5rem;
    font-size: 1rem;
  }

  /* Mobile responsive */
  @media (max-width: 768px) {
    .content-footer-nav {
      flex-direction: column;
      gap: 1rem;
    }

    .content-nav-link {
      min-width: 100%;
    }

    .content-nav-prev,
    .content-nav-next {
      align-items: flex-start;
      text-align: left;
      margin: 0;
    }
  }
</style>
    `;
};
