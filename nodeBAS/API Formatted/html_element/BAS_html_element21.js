function BAS_get_element_style() { const args = _arguments(); const selector = args.selector; const style = args.style; const noWait = args.noWait || false; const stopThread = args.stopThread || true; const timeout = args.timeout;; _SELECTOR = selector; if (timeout) { waiter_timeout_next(timeout); }; wait_element(_SELECTOR)!; const script = "window.getComputedStyle(self)[" + JSON.stringify("color") + "]"; if !(!noWait && stopThread) { get_element_selector(_SELECTOR, false).script(script)!; } else { get_element_selector(_SELECTOR, false).nowait().script(script)!; }; VAR_SAVED_STYLE = _result(); _function_return(VAR_SAVED_STYLE);};