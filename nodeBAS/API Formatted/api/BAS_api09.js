function BAS_goto() { const label = _function_argument("label"); const offset = _function_argument("offset") || -1; const reverse = _function_argument("reverse") || []; const callback = _function_argument("callback") || function() {}; _long_goto(label, offset, reverse, callback)!;};