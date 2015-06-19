
// @todo refactoring is needed
window.addEventListener('DOMContentLoaded', function() {
  new QueryLoader2(document.querySelector("body"), {
    barColor: "#111",
    backgroundColor: "#fff",
    percentage: false,
    barHeight: 4,
    minimumTime: 200,
    fadeOutTime: 1000,
    onComplete: function() {
        document.querySelector("body").classList.add('loaded');
    }
  });
});
