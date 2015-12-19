// Basic literal string creation
"use strict";

var _templateObject = _taggedTemplateLiteral(["In JavaScript this is\n not legal."], ["In JavaScript this is\n not legal."]),
    _templateObject2 = _taggedTemplateLiteral(["http://foo.org/bar?a=", "&b=", "\n    Content-Type: application/json\n    X-Credentials: ", "\n    { \"foo\": ", ",\n      \"bar\": ", "}"], ["http://foo.org/bar?a=", "&b=", "\n    Content-Type: application/json\n    X-Credentials: ", "\n    { \"foo\": ", ",\n      \"bar\": ", "}"]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

"In JavaScript '\n' is a line feed. "

// Multiline strings
(_templateObject);

// String interpolation
var name = "Bob",
    time = "today";
"Hello " + name + ", how are you " + time + "?";

// Construct an HTTP request prefix is used to interpret the replacements and construction
GET(_templateObject2, a, b, credentials, foo, bar)(myOnReadyStateChangeHandler);
