function BAS_element_get_attribute() { const args = _arguments(); const selector = args.selector; const attributeName = args.attributeName; const noWait = args.noWait || false; const stopThread = args.stopThread || true; const timeout = args.timeout;; _SELECTOR = selector; if (timeout) { waiter_timeout_next(timeout); }; wait_element(_SELECTOR)!; if !(!noWait && stopThread) { get_element_selector(_SELECTOR, false).attr(attributeName)!; } else { get_element_selector(_SELECTOR, false).nowait().attr(attributeName)!; }; VAR_SAVED_ATTRIBUTE = _result(); _function_return(VAR_SAVED_ATTRIBUTE);};