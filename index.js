/**
* Captures portions of a string similar to a simplified RegExp
* Examples:
*
*	/[uno]/[does]/[tres] with '/foo/bar/baz' => ['foo', 'bar', 'baz']
*
* @param string template the template string to capture
* @param string string The string to examine
* @return object|null The captured string objects or nothing
*/
module.exports = function (template, string) {
	var reStr = template
		.replace(/([\?\|\*])/, '\\$1'); // Escape weird RegExp characters

	var captures = [];
	var match;
	var re = /\[(.*?)\]/g;
	while (match = re.exec(reStr))
		captures.push(match);

	for (var c = captures.length - 1; c > -1; c--) {
		// Splice the reExp so that we capture each item (non-greedy if its not the last item)
		reStr = reStr.substr(0, captures[c].index) + (c < captures.length-1 ? '(.*?)' : '(.*)') + reStr.substr(captures[c].index + captures[c][0].length);
		captures[c] = captures[c][1]; // Set captures to the simple index offset of the RegExp
	}

	var re = new RegExp(reStr); // Compile newly mangled RegExp
	var found = re.exec(string); // Run on the string target
	if (!found) // No matches all all
		return;

	var out = {};
	for (var i in captures)
		out[captures[i]] = found[parseInt(i)+1];
	return out;
}
