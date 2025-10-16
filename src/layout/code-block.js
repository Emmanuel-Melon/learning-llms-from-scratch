module.exports = function codeBlock(code, language = "") {
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
};
