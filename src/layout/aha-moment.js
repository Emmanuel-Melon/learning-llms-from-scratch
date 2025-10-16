module.exports = function ahaMoment(content, label = "AHA! Moment") {
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
};
