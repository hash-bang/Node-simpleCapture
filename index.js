/**
* Captures portions of a string similar to a simplified RegExp
* Examples:
*
*	/[one]/[two]/[three] with '/foo/bar/baz' => [one: 'foo', two: 'bar', three: 'baz']
*	/[one]/[two]/[three!trois] with 'nope' (i.e. will never work) => [three: 'trois']
*
* @param string template the template string to capture
* @param string string The string to examine
* @return object The captured string objects (empty hash if nothing matched and there were no defaults)
*/
module.exports = function (template, string) {
	var reStr = template
		.replace(/([\?\|\*])/, '\\$1'); // Escape weird RegExp characters

	var captures = [];
	var defaults = {};
	var match;
	var re = /\[(.*?)(!(.*?))?\]/g;
	while (match = re.exec(reStr)) {
		captures.push(match);
		if (match[3])
			defaults[match[1]] = match[3];
	}

	for (var c = captures.length - 1; c > -1; c--) {
		// Splice the reExp so that we capture each item (non-greedy if its not the last item)
		reStr = reStr.substr(0, captures[c].index) + (c < captures.length-1 ? '(.*?)' : '(.*)') + reStr.substr(captures[c].index + captures[c][0].length);
		captures[c] = captures[c][1]; // Set captures to the simple index offset of the RegExp
	}

	var re = new RegExp(reStr); // Compile newly mangled RegExp
	var found = re.exec(string); // Run on the string target
	if (!found) // No matches all all
		return defaults;

	var out = {};
	for (var i in captures)
		out[captures[i]] = found[parseInt(i)+1];
	return out;
}
