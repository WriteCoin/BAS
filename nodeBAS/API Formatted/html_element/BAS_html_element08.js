function BAS_clear_field() { const args = _arguments(); _call_function(BAS_input_text, { selector: args.selector, text: "<CONTROL>a<BACK>", interval: 30, mouse: args.mouse, noWait: args.noWait, stopThread: args.stopThread, wait_full_load: args.wait_full_load, timeout: args.timeout; })!;};