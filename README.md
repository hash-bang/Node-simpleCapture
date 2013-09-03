SimpleCapture
=============
Simplified RegExp style string captures.

This module provides a single function aimed at making extremely simple capture operations for strings.

It can be thought of as an extremely dumbed down and easy to understand RegExp group capture operation.


The function:

	simpleCapture(template, string);

where template is generally a string containing square bracketed named arguments (e.g. `"My name is [name]"`) and the string is the input (e.g. `"My name is Matt"`). It will return a hash of all captured tokens (in the previous case: `{name: "Matt"}`) or null if the input string did not match the template.

Examples
========
A simple example taking two named captures and returning a hash

	var $template = '[name] is [age] years old';
	var $string = 'Matt is 29 years old'
	var $result = simpleCapture($template, $string);

	console.log($result); // Output: {name: 'Matt', age: '29'}


Another simple example, this time using simple URL templating:

	var $template = '/[controller]/[function]/[arg]';
	var $string = '/foo/bar/baz';
	var $result = simpleCapture($template, $string);

	console.log($result); // Output: {controller: 'foo', function: 'bar', arg: 'baz'}


You can also specify defaults that should always be returned even if the rest of the string doesnt match:

	var $template = '/[controller]/[function]/[arg!hello world]';
	var $string = 'FAIL FAIL FAIL';
	var $result = simpleCapture($template, $string);

	console.log($result); // Output: {arg: 'hello world'}
