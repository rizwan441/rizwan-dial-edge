const test = require('node:test');
const assert = require('node:assert');
const app = require('./app');

test('App should be defined', () => {
  assert.ok(app);
});