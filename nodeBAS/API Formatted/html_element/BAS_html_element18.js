function BAS_element_focus() { const args = _arguments(); const selector = args.selector; const noWait = args.noWait || false; const stopThread = args.stopThread || true; const timeout = args.timeout;; _SELECTOR = selector; if (timeout) { waiter_timeout_next(timeout); }; wait_element(_SELECTOR)!; if !(!noWait && stopThread) { get_element_selector(_SELECTOR, false).focus()!; } else { get_element_selector(_SELECTOR, false).nowait().focus()!; };};