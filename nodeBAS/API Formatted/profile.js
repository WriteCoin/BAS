;function BAS_create_or_switch_permanent_profile() {; const args = _arguments(); ProfilePath = args.path;; _do(function(){; if(ProfilePath == _get_profile()); _break();; if(_iterator() > 30); fail(tr("Timeout during switching to profile ") + ProfilePath);; native("filesystem", "removefile", ProfilePath + "/lockfile");; if(!JSON.parse(native("filesystem", "fileinfo", ProfilePath + "/lockfile"))["exists"]); _break();; sleep(1000)!; })!; var Params = {};; Params["ProfilePath"] = ProfilePath; Params["LoadFingerprintFromProfileFolder"] = args.always_upload_fingerprint; _settings(Params)!; _if(args.always_upload_fingerprint, function(){; FINGERPRINT_JSON = native("filesystem", "readfile", JSON.stringify({value: args.path + "/fingerprint.json",base64:false,from:0,to:0})); _if(FINGERPRINT_JSON.length > 0, function(){; FINGERPRINT_JSON = JSON.parse(FINGERPRINT_JSON); _call(BrowserAutomationStudio_ApplyFingerprint,[FINGERPRINT_JSON["fingerprint"],FINGERPRINT_JSON["canvas"],FINGERPRINT_JSON["webgl"],FINGERPRINT_JSON["audio"],FINGERPRINT_JSON["battery"],FINGERPRINT_JSON["rectangles"],FINGERPRINT_JSON["perfectcanvas"],FINGERPRINT_JSON["sensor"]])!; sleep(1000)!; })!; FINGERPRINT_JSON = native("filesystem", "readfile", JSON.stringify({value: args.path + "/performance.json",base64:false,from:0,to:0})); _if(FINGERPRINT_JSON.length > 0, function(){; FINGERPRINT_JSON = JSON.parse(FINGERPRINT_JSON); _call(BrowserAutomationStudio_PerformanceFingerprint,FINGERPRINT_JSON)!; })!; })!; _if(args.always_upload_proxy, function(){; var is_error = false;; try; {; _ARG = JSON.parse(native("filesystem", "readfile", JSON.stringify({value: args.path + "/proxy.txt",base64:false,from:0,to:0}))); _ARG["Port"] = parseInt(_ARG["Port"]); }catch(e); {; is_error = true; }; _if(!is_error, function(){; set_proxy(_ARG["server"], _ARG["Port"], _ARG["IsHttp"], _ARG["name"], _ARG["password"])!; sleep(1000)!; set_proxy_extended(true, true, true, true, true)!; sleep(1000)!; })!; })!;};;;function BAS_switch_to_temporary_profile() {; const Params = {};; Params["ProfilePath"] = "<Incognito>"; _settings(Params)!;};;;function BAS_profile_copy(path) {; const ProfilePath = _get_profile(); native("filesystem", "copyfile", JSON.stringify({; path: ProfilePath,; dest: path; }));};;;function BAS_delete_profile() {; const args = _arguments(); ProfilePath = args.path; if(ProfilePath == ""); ProfilePath = _get_profile(); _if(ProfilePath == _get_profile(), function(){; var Params = {};; Params["ProfilePath"] = "<Incognito>"; _settings(Params)!; })!; _do(function(){; if(_iterator() > 30); fail(tr("Timeout during deleting profile ") + ProfilePath);; native("filesystem", "removefile", ProfilePath + "/lockfile");; if(!JSON.parse(native("filesystem", "fileinfo", ProfilePath + "/lockfile"))["exists"]); _break();; sleep(1000)!; })!; native("filesystem", "removefile", ProfilePath);};;;function BAS_current_profile_info() {; const profile_id = _get_profile(); const has_proxy = _get_profile().length > 0 && JSON.parse(native("filesystem", "fileinfo", _get_profile() + "/proxy.txt"))["exists"]; const has_fingerprint = _get_profile().length > 0 && JSON.parse(native("filesystem", "fileinfo", _get_profile() + "/fingerprint.json"))["exists"]; return {; profile_id: profile_id,; has_proxy: has_proxy,; has_fingerprint: has_fingerprint; };};