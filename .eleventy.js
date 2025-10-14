module.exports = function (eleventyConfig) {
  // Copy CSS to the output directory
  eleventyConfig.addPassthroughCopy({
    "src/css": "css",
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
    },
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
        <button class="code-block-copy" onclick="navigator.clipboard.writeText('${escapedCode}');
            const btn = this;
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = 'Copy'; }, 2000);">
            Copy
        </button>
    </div>
    <pre><code class="language-${language}">${code}</code></pre>
</div>
    `;
    },
  );

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
