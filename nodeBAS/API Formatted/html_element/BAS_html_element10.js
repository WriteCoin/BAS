function BAS_add_tab() { const args = _arguments(); const referrer = args.referrer || "";; if (args.timeout) { general_timeout_next(args.timeout); }; _popupcreate2(args.is_silent, args.url, referrer, args.is_instant, args.callback)!;};