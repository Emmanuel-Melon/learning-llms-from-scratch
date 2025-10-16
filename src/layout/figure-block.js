module.exports = function figureBlock(src, alt = "", caption = "") {
  // Generate a unique ID for the figure
  const figureId = `figure-${Math.random().toString(36).substr(2, 9)}`;

  return `
<figure id="${figureId}" class="figure">
  <img 
    src="${src}" 
    alt="${alt}" 
    loading="lazy" 
    decoding="async"
    class="figure-image"
  >
  ${caption ? `<figcaption class="figure-caption">${caption}</figcaption>` : ""}
</figure>

<style>
  .figure {
    margin: 2rem auto;
    max-width: 100%;
    text-align: center;
    border: 2px dashed #d1d5db;
  }
  .figure-image {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
  .figure-caption {
    margin-top: 0.5rem;
    border-top: 2px dashed #d1d5db;
    font-size: 0.9em;
    color: #666;
    font-style: italic;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
</style>
    `;
};
