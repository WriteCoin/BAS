function BAS_get_xml() { const args = _arguments(); const selector = args.selector || ""; const noWait = args.noWait || false; const stopThread = args.stopThread || true; const timeout = args.timeout;; _SELECTOR = selector; if (timeout) { waiter_timeout_next(timeout); }; wait_element(_SELECTOR)!; if !(!noWait && stopThread) { get_element_selector(_SELECTOR, false).xml()!; } else { get_element_selector(_SELECTOR, false).nowait().xml()!; }; _function_return(_result());};