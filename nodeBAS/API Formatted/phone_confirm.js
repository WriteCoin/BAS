;function BAS_phone_get_number() {; const args = _arguments(); _call_function(_SMS.getNumber, {; service: args.service,; apiKey; args.apiKey,; site: args.site,; country: args.country,; operator: args.operator,; customSite: args.customSite,; customCounty: args.customCountry,; serverUrl: args.serverUrl,; timeout: args.timeout; })!; _function_return(_result_function());};;;function BAS_phnoe_get_activation_code() {; const args = _arguments(); _call_function(_SMS.waitCode, {; number: args.number,; interval: args.interval,; timeout: args.timeout; })!; _function_return(_result_function());};;;function BAS_phone_change_activation_status() {; const args = _arguments(); _call_function(_SMS.setStatus, {; number: args.number,; status: args.status,; deleteInfo: args.deleteInfo,; timeout: args.timeout; })!;};;;function BAS_phone_get_balance() {; const args = _arguments(); _call_function(_SMS.getBalance, {; service: args.service,; apiKey: args.apiKey,; serverUrl: args.serverUrl,; timeout: args.timeout; })!; _function_return(_result_function());};;;function BAS_phone_get_numbers_count() {; const args = _arguments(); _call_function(_SMS.getNumbersCount, {; service: args.service,; apiKey: args.apiKey,; site: args.site,; country: args.country,; customSite: args.customSite,; customCountry: args.customCountry,; serverUrl: args.serverUrl,; timeout: args.timeout; })!; _function_return(_result_function());};;;function BAS_phone_get_sites() {; const args = _arguments(); _call_function(_SMS.getSites, {; service: args.service,; apiKey: args.apiKey,; serverUrl: args.serverUrl,; timeout: args.timeout; })!; _function_return(_result_function());};;;function BAS_phone_get_countries() {; const args = _arguments(); _call_function(_SMS.getCountries, {; service: args.service,; apiKey: args.apiKey,; serverUrl: args.serverUrl,; timeout: args.timeout; })!; _function_return(_result_function());};;;function BAS_phone_set_debug(enable) {; _SMS.setDebug(enable);};