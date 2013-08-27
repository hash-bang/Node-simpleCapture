var simpleCapture = require("./index.js");
var assert = require("assert");

assert.deepEqual(
	simpleCapture('[name] is [age] years old', 'Matt is 29 years old'),
	{name: 'Matt', age: '29'}
);

assert.deepEqual(
	simpleCapture('/[controller]/[function]/[arg]', '/foo/bar/baz'),
	{controller: 'foo', function: 'bar', arg: 'baz'}
);

assert.deepEqual(
	simpleCapture('/[one]/[two]/[three]', '/foo/bar/baz'),
	{one: 'foo', two: 'bar', three: 'baz'}
);

console.log('OK!');
