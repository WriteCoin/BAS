function BAS_json_value(json, json_path_query) { try { return JPath.value(json, json_path_query); } catch (e) { fail(e); };};