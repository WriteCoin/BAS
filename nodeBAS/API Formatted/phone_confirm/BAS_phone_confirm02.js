function BAS_phnoe_get_activation_code() { const args = _arguments(); _call_function(_SMS.waitCode, { number: args.number, interval: args.interval, timeout: args.timeout; })!; _function_return(_result_function());};