function BAS_regexp_replace(text, regexp, replace) { return native("regexp", "replace", JSON.stringify({ text: text, regexp: regexp, replace: replace; }));};