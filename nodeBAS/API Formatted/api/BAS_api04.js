function BAS_for() { const a = _function_argument("a"); const b = _function_argument("b"); const callback = _function_argument("callback") || function(i) {}; const message_func = _function_argument("message_func"); _do(function(){ VAR_CYCLE_INDEX = _iterator() - 1 + a; if(VAR_CYCLE_INDEX > b) _break(); const message = message_func && message_func(); const log_message = (message === null || message === undefined) ? "Текущее повторение цикла : " + VAR_CYCLE_INDEX : message; log(log_message); callback(VAR_CYCLE_INDEX)!; })!;};