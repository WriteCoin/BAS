function BAS_set_timezone() { const args = _arguments(); const utc_offset = args.utc_offset || ""; const timezone_name = args.timezone_name || ""; var UpdatedSettings = {}; if(utc_offset.toString().length > 0); { UpdatedSettings["Timezone"] = (-parseInt(utc_offset)).toString(); }; if(timezone_name.toString().length > 0); { UpdatedSettings["TimezoneName"] = timezone_name; }; _settings(UpdatedSettings)!; sleep(1000)!;};