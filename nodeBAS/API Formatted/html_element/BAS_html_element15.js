function BAS_element_solve_captcha() { const args = _arguments(); const selector = args.selector || ""; const method = args.method || "manual"; const key = args.key; const serverUrl = args.serverUrl; const noWait = args.noWait || false; const stopThread = args.stopThread || true; const timeout = args.timeout; solver_properties_clear(method); BAS_SolveRecaptcha_Serverurl = serverUrl; if(BAS_SolveRecaptcha_Serverurl.length > 0 && BAS_SolveRecaptcha_Serverurl.substr(BAS_SolveRecaptcha_Serverurl.length - 1) != "/"); BAS_SolveRecaptcha_Serverurl += "/"; if(method === "rucaptcha"); { if(BAS_SolveRecaptcha_Serverurl); solver_property("rucaptcha","serverurl",BAS_SolveRecaptcha_Serverurl); rucaptcha(key); }; if(method === "antigate"); { if(BAS_SolveRecaptcha_Serverurl); solver_property("antigate","serverurl",BAS_SolveRecaptcha_Serverurl); antigate(key); }; if(method == "dbc"); { if(BAS_SolveRecaptcha_Serverurl); solver_property("dbc","serverurl",BAS_SolveRecaptcha_Serverurl); dbc(key); }; if(method == "2captcha"); { if(BAS_SolveRecaptcha_Serverurl); solver_property("2captcha","serverurl",BAS_SolveRecaptcha_Serverurl); twocaptcha(key); }; if(method == "capmonster" || method == "capmonsterimage" || method == "capmonsteraudio"); { solver_property("capmonster","serverurl",BAS_SolveRecaptcha_Serverurl); capmonster(key); }; if(method == "xevil"); { solver_property("xevil","serverurl",((BAS_SolveRecaptcha_Serverurl).length == 0) ? "http://rucaptcha.com/" : (BAS_SolveRecaptcha_Serverurl)); xevil(key); };; _SELECTOR = selector; if (timeout) { waiter_timeout_next(timeout); }; wait_element(_SELECTOR)!; get_element_selector(_SELECTOR, false).nowait().exist()!; _if(_result() == "1", function(){ const cond = !(!noWait && stopThread); _if_else("antigate" == "xevil" || "antigate" == "capmonster" || "antigate" == "capmonsterimage" || "antigate" == "capmonsteraudio" || "antigate" == "captchasniper", function(){ get_element_selector(_SELECTOR, false).nowait().attr("src")!; VAR_CAPTCHA_RESULT = _result(); _if(VAR_CAPTCHA_RESULT.length == 0, function(){ if (cond) { get_element_selector(_SELECTOR, false).css("img").attr("src")!; } else { get_element_selector(_SELECTOR, false).nowait().css("img").attr("src")!; }; VAR_CAPTCHA_RESULT = _result(); })!; if(VAR_CAPTCHA_RESULT.length == 0) { fail(tr("Image tag not found. Is this element captcha?")); }; wait_load(VAR_CAPTCHA_RESULT)!; cache_get_base64(VAR_CAPTCHA_RESULT)!; if(_result().length == 0) { fail(tr("Url ") + VAR_CAPTCHA_RESULT + tr(" is not present in cache. Please enable cache before page load with Cache Mask Allow action")); }; _if_else("antigate" == "captchasniper", function(){ _switch_http_client_internal(); http_client_post(BAS_SolveRecaptcha_Serverurl, ["file","base64://" + _result()], {"content-type":("multipart"), "encoding":("UTF-8"), "method":("POST")})!; {var split = http_client_content().split("|");VAR_CAPTCHA_RESULT = split[split.length-1]}; _switch_http_client_main(); }, function(){ if (timeout) { solver_timeout_next(timeout); }; solve_base64(("antigate" == "xevil") ? "xevil" : "capmonster", _result())!; VAR_CAPTCHA_RESULT = _result(); _function_return(VAR_CAPTCHA_RESULT); })!; },function(){ if (cond) { get_element_selector(_SELECTOR, false).render_base64()!; } else { get_element_selector(_SELECTOR, false).nowait().render_base64()!; }; if (timeout) { solver_timeout_next(timeout); }; solve_base64("antigate", _result())!; VAR_CAPTCHA_RESULT = _result(); _function_return(VAR_CAPTCHA_RESULT); })!; })!;};