function BAS_http_client_post() { const args = _arguments(); _switch_http_client_main(); if (args.timeout) general_timeout_next(args.timeout); const obj = { content-type: "custom/" + args.content_type, encoding: args.encoding, method: args.method, headers: args.headers; }; if (!args.no_redirect) http_client_post(args.url, ["data", args.data], obj)!; else http_client_post_no_redirect(args.url, ["data", args.data], obj)!;};