function BAS_phone_get_sites() { const args = _arguments(); _call_function(_SMS.getSites, { service: args.service, apiKey: args.apiKey, serverUrl: args.serverUrl, timeout: args.timeout; })!; _function_return(_result_function());};