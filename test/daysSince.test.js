const assert = require('assert');
const test = require('node:test');
const daysSince = require('../daysSince');

test('returns 0 for today\'s date', () => {
  const today = new Date().toISOString();
  assert.strictEqual(daysSince(today), 0);
});

test('returns correct days for past dates', () => {
  const now = new Date();
  const past = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString();
  const expected = 5; // exactly 5 days ago
  assert.strictEqual(daysSince(past), expected);
});
