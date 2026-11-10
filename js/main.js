(function () {
  var el = document.getElementById('rg-stats');
  if (!el || !('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var nums = [].slice.call(el.querySelectorAll('[data-count]'));
  function show(t) {
    nums.forEach(function (n) {
      n.textContent = Math.round(+n.getAttribute('data-count') * t).toLocaleString('en-US') + n.getAttribute('data-suffix');
    });
  }
  var first = true;
  var io = new IntersectionObserver(function (entries) {
    var seen = entries[0].isIntersecting;
    if (first) { first = false; if (!seen) show(0); return; }
    if (!seen) return;
    io.disconnect();
    var start = null;
    function step(now) {
      if (start === null) start = now;
      var k = Math.min(1, (now - start) / 1500);
      show(1 - Math.pow(1 - k, 3));
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, { threshold: 0.4 });
  io.observe(el);
})();
