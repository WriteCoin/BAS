;function BAS_json_value(json, json_path_query) {; try {; return JPath.value(json, json_path_query); } catch (e) {; fail(e); };};;;function BAS_json_values(json, json_path_query) {; try {; return JPath.values(json, json_path_query); } catch (e) {; fail(e); };};;;function BAS_json_key(json, json_path_query) {; try {; return JPath.key(json, json_path_query); } catch (e) {; fail(e); };};;;function BAS_json_keys(json, json_path_query) {; try {; return JPath.keys(json, json_path_query); } catch (e) {; fail(e); };};;;function BAS_json_count(json, json_path_query) {; try {; return JPath.count(json, json_path_query); } catch (e) {; fail(e); };};;;function BAS_json_change(json, json_path_query, value) {; try {; return JPath.change(json, json_path_query, value); } catch (e) {; fail(e); };};;;function BAS_json_remove(json, json_path_query) {; try {; return JPath.remove(json, json_path_query); } catch (e) {; fail(e); };};;;function BAS_json_check_format(json_str) {; try {; return JPath.checkFormat(json_str); } catch (e) {; fail(e); };};;;function BAS_json_change_format(json_str, new_format) {; try {; return JPath.changeFormat(json_str, new_format); } catch (e) {; fail(e); };};