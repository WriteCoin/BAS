function BAS_while() { const cond_func = _function_argument("cond_func") || true; const callback = _function_argument("callback") || function(i) {}; const message_func = _function_argument("message_func"); _do(function(){ VAR_CYCLE_INDEX = _iterator() - 1; BREAK_CONDITION = cond_func(); if(!BREAK_CONDITION)_break(); const message = message_func && message_func(); const log_message = (message === null || message === undefined) ? "Текущее повторение цикла : " + VAR_CYCLE_INDEX : message; log(log_message); callback(VAR_CYCLE_INDEX)!; })!;};