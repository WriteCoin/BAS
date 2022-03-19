function BAS_timezone_set_geo_location() { const args = _arguments(); const ip = args.ip; const change_timezone = args.change_timezone; const change_location = args.change_location; const change_ip_web_rtc = args.change_ip_web_rtc; const change_browser_language = args.change_browser_language; const ip_method = args.ip_method || "database"; const ip_api_key = args.ip_api_key || ""; const info_func = args.info_func;; _call(_get_ip_info, [ip, ip_method, ip_api_key, info_func])!; IP_INFO = _result(); if(!IP_INFO["valid"]); fail("Failed to get ip info for " + ip); _if(change_location, function(){ geolocation(IP_INFO["latitude"],IP_INFO["longitude"])!; })!; _if(change_timezone, function(){ _settings({"Timezone":(-IP_INFO["offset"]).toString(),"TimezoneName":IP_INFO["timezone"]})!; })!; _if(change_ip_web_rtc, function(){ _settings({"Webrtc":"replace","WebrtcIps": ip})!; })!; _if(change_browser_language, function(){ var country = IP_INFO["country"].toUpperCase(); var language = native("timezones", "country_to_language", country); header("Accept-Language", language + "-" + country)!; _settings({"Fingerprints.Locale":IP_INFO["country"].toLowerCase()})!; })!; sleep(1000)!;};