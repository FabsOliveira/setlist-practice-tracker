function daysSince(dateStr) {
  const last = new Date(dateStr);
  const now = new Date();
  return Math.floor((now - last) / (1000 * 60 * 60 * 24));
}
module.exports = daysSince;
