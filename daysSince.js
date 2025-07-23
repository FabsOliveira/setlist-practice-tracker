function daysSince(dateStr) {
  const last = new Date(dateStr);
  const now = new Date();
  return Math.floor((now - last) / (1000 * 60 * 60 * 24));
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = daysSince;
}

if (typeof window !== 'undefined') {
  window.daysSince = daysSince;
}
