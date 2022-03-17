function proxy_set_hash(proxy, proxy_type, login, password) {; const hash = proxy_parse(proxy); if (proxy_type !== "auto") {; hash.IsHttp = proxy_type === "http"; }; if (login.length > 0 && password.length > 0) {; hash.name = login; hash.password = password; }; return hash;};;;function BAS_imap_client_set_proxy(proxy, proxy_type, login, password) {; const args = _arguments(); const proxy = args.proxy || ""; const proxy_type = args.proxy_type || "http"; const login = args.login || ""; const password = args.password || ""; ; const hash = proxy_set_hash(proxy, proxy_type, login, password);; imap_client_set_proxy(hash.server, hash.Port, hash.IsHttp, hash.name, hash.password);};;;function BAS_imap_client_messages_length() {; const timeout = _function_argument("timeout"); general_timeout_next(timeout); imap_client_pull_messages_length()!; _function_return(imap_client_messages_length());};;function BAS_parse_message() {; const timeout = _function_argument("timeout"); const id = _function_argument("id");; if (timeout) general_timeout_next(timeout); imap_client_pull_message(id)!; VAR_MAIL_BODY = imap_client_message(); const csv_parse_result = VAR_MAIL_BODY.match(LINK_REGEXP) || []; VAR_LINK1 = csv_parse_result[0]; if(typeof(VAR_LINK1) == "undefined" || !VAR_LINK1); {; VAR_LINK1 = ""; }; VAR_LINK2 = csv_parse_result[1]; if(typeof(VAR_LINK2) == "undefined" || !VAR_LINK2); {; VAR_LINK2 = ""; }; VAR_LINK3 = csv_parse_result[2]; if(typeof(VAR_LINK3) == "undefined" || !VAR_LINK3); {; VAR_LINK3 = ""; };};;;function BAS_imap_client_search(timeout, sender, subject, body, to, callback) {; const args = _arguments(); const timeout = args.timeout; const sender = args.sender || ""; const subject = args.subject || ""; const body = args.body || ""; const to = args.to || ""; ; if (timeout) general_timeout_next(timeout); if (!args.callback) imap_client_search(sender, subject, body, to)!; else imap_client_search(sender, subject, body, to, args.callback)!; VAR_MAIL_BODY = imap_client_search_result(); if (VAR_MAIL_BODY.length > 0) VAR_MAIL_BODY = VAR_MAIL_BODY[VAR_MAIL_BODY.length - 1]; else; VAR_MAIL_BODY = ""; VAR_MAIL_ID = VAR_MAIL_BODY;; _call_function(BAS_parse_message, {; timeout: timeout,; id: VAR_MAIL_BODY; })!;; _function_return({; mail_body: imap_client_message(),; mail_id: VAR_MAIL_ID,; link1: VAR_LINK1,; link2: VAR_LINK2,; link3: VAR_LINK3; });};;;function BAS_imap_client_search_all(sender, subject, body, to, callback) {; const args = _arguments(); const sender = args.sender || ""; const subject = args.subject || ""; const body = args.body || ""; const to = args.to || ""; const callback = args.callback; if (args.timeout) general_timeout_next(args.timeout); if (!callback) imap_client_search(sender, subject, body, to)!; else imap_client_search(sender, subject, body, to, callback)!; _function_return(imap_client_search_result());};;;function BAS_imap_client_get_message() {; const timeout = _function_argument("timeout"); const id = _function_argument("id"); _call_function(BAS_parse_message, {; timeout: timeout,; id: id; })!; _function_return({; mail_body: VAR_MAIL_BODY; link1: VAR_LINK1,; link2: VAR_LINK2,; link3: VAR_LINK3; });};;;function BAS_imap_client_delete_message(timeout, id) {; const timeout = _function_argument("timeout"); const id = _function_argument("id");; if (timeout) general_timeout_next(timeout); imap_custom_query("%base%folder","STORE " + id + " +Flags \\Deleted","")!; imap_custom_query("%base%folder","EXPUNGE","")!;};