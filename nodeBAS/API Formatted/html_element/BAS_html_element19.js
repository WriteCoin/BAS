function BAS_element_get_coordinates() { const args = _arguments(); const selector = args.selector; const noWait = args.noWait || false; const stopThread = args.stopThread || true; const timeout = args.timeout; ; _SELECTOR = selector; if (timeout) { waiter_timeout_next(timeout); }; wait_element(_SELECTOR)!; const script = "(function(){var rect = self.getBoundingClientRect();return (rect.left + positionx).toString() + "|" + (rect.top + positiony).toString() + "|" + (rect.right - rect.left).toString() + "|" + (rect.bottom - rect.top).toString()})();"; if !(!nowait && stopThread) { get_element_selector(_SELECTOR, false).script(script)!; } else { get_element_selector(_SELECTOR, false).nowait().script(script)!; }; if(_result().length > 0); { const split = _result().split("|"); VAR_X = parseInt(split[0]); VAR_Y = parseInt(split[1]); VAR_WIDTH = parseInt(split[2]); VAR_HEIGHT = parseInt(split[3]); _function_return({ x: VAR_X, y: VAR_Y, width: VAR_WIDTH, height: VAR_HEIGHT; }); };};