const test = require('node:test');
const assert = require('node:assert');
const app = require('./app');
console.log('🔍 Running tests...');
test('App should be defined', () => {
  assert.ok(app);
});