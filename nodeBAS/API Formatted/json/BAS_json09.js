function BAS_json_change_format(json_str, new_format) { try { return JPath.changeFormat(json_str, new_format); } catch (e) { fail(e); };};