function BAS_parse_message() { const timeout = _function_argument("timeout"); const id = _function_argument("id");; if (timeout) general_timeout_next(timeout); imap_client_pull_message(id)!; VAR_MAIL_BODY = imap_client_message(); const csv_parse_result = VAR_MAIL_BODY.match(LINK_REGEXP) || []; VAR_LINK1 = csv_parse_result[0]; if(typeof(VAR_LINK1) == "undefined" || !VAR_LINK1); { VAR_LINK1 = ""; }; VAR_LINK2 = csv_parse_result[1]; if(typeof(VAR_LINK2) == "undefined" || !VAR_LINK2); { VAR_LINK2 = ""; }; VAR_LINK3 = csv_parse_result[2]; if(typeof(VAR_LINK3) == "undefined" || !VAR_LINK3); { VAR_LINK3 = ""; };};