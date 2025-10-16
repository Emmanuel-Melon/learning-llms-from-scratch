const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
const socialImages = require("@11tyrocks/eleventy-plugin-social-images");
require("dotenv").config();

// shortcodes
const contentFooter = require("./src/layout/content/content-footer.js");
const ahaMoment = require("./src/layout/aha-moment.js");
const codeBlock = require("./src/layout/code-block.js");
const figureBlock = require("./src/layout/figure-block.js");
const stylizedList = require("./src/layout/stylized-list.js");

module.exports = function (eleventyConfig) {
  // Copy CSS to the output directory
  eleventyConfig.addPassthroughCopy({
    "src/css": "css",
    "content/ch1-rag/assets": "ch1-rag/assets",
  });

  // Watch for CSS changes
  eleventyConfig.addWatchTarget("src/css/");

  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    // Options for image processing
    widths: [300, 600, 800, null], // Explicit widths, no null
    formats: ["webp", "jpeg"], // Output formats
    outputDir: "./_site/img/", // Where processed images are saved
    urlPath: "/img/", // URL path for generated images
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });

  // Image with caption shortcode
  eleventyConfig.addNunjucksShortcode("figure", figureBlock);
  // Aha Moment shortcode
  eleventyConfig.addNunjucksShortcode("ahamoment", ahaMoment);
  // Code Block shortcode with copy functionality
  eleventyConfig.addNunjucksShortcode("codeblock", codeBlock);
  // Stylized List shortcode
  eleventyConfig.addNunjucksShortcode("stylizedList", stylizedList);

  // Content Footer Navigation shortcode
  eleventyConfig.addNunjucksShortcode("contentfooter", contentFooter);

  eleventyConfig.addPlugin(socialImages);

  // Inside module.exports:
  eleventyConfig.addGlobalData("env", {
    POSTHOG_API_KEY: process.env.POSTHOG_API_KEY || "",
    NODE_ENV: process.env.NODE_ENV || "development",
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
