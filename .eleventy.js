const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
require('dotenv').config();

module.exports = function (eleventyConfig) {
  // Copy CSS to the output directory
  eleventyConfig.addPassthroughCopy({
    "src/css": "css",
    "content/ch1-rag/assets": "ch1-rag/assets",
  });

  // Watch for CSS changes
  eleventyConfig.addWatchTarget("src/css/");

  // Aha Moment shortcode
  eleventyConfig.addNunjucksShortcode(
    "ahamoment",
    function (content, label = "AHA! Moment") {
      // The output HTML mimics the CardWithLabel component structure
      return `
<div class="aha-card-container">
  <div class="aha-card-label-wrapper">
    ${label}
  </div>
  <div class="aha-card-content">
    ${content}
  </div>
</div>
      `;
    }
  );

  // Code Block shortcode with copy functionality
  eleventyConfig.addNunjucksShortcode(
    "codeblock",
    function (code, language = "") {
      const escapedCode = code.replace(/[\\`$]/g, "\\$&");
      return `
<div class="code-block-container">
  <div class="code-block-header">
    <span class="code-block-language">${language || "code"}</span>
    <button 
      class="code-block-copy" 
      onclick="navigator.clipboard.writeText('${escapedCode}');
        const btn = this;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);"
    >
      Copy
    </button>
  </div>
  <pre><code class="language-${language}">${code}</code></pre>
</div>
      `;
    }
  );

  // Resource Links shortcode - matches aha moment style with hand-drawn elements
  eleventyConfig.addNunjucksShortcode(
    "resourcelinks",
    function (links = []) {
      if (!Array.isArray(links) || links.length === 0) return '';

      const columns = links.map(link => {
        const title = link.title || 'Link';
        const url = link.url || '#';

        return `
          <td class="resource-link-column">
            <a href="${url}" target="_blank" rel="noopener noreferrer" class="resource-link">
              ${title}
            </a>
          </td>
        `;
      }).join('');

      return `
<div class="resource-links-container">
  <div class="resource-links-label">
    Resources
  </div>
  <div class="resource-links-content">
    <table class="resource-links-table">
      <tr>
        ${columns}
      </tr>
    </table>
  </div>
</div>
      `;
    }
  );

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // Options for image processing
    widths: [300, 600, null], // Output widths, 'null' for original width
    formats: ["webp", "jpeg", "png"], // Output formats
    outputDir: "./_site/img/", // Where processed images are saved
    urlPath: "/img/", // URL path for generated images
    sizes: ["100%"],
  });




  // Inside module.exports:
  eleventyConfig.addGlobalData('env', {
    POSTHOG_API_KEY: process.env.POSTHOG_API_KEY || '',
    NODE_ENV: process.env.NODE_ENV || 'development'
  });
  return {
    dir: {
      input: ".",
      includes: "/src/_includes",
      output: "_site",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
