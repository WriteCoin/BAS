const get_api_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/api")
const get_browser_api_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/browser_api")
const get_network_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/network")
const get_waiting_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/waiting")
const get_email_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/email")
const get_http_client_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/http-client")
const get_date_and_time_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/date_and_time")
const get_filesystem_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/filesystem")
const get_fingersprint_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/fingersprint")
const get_async_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/async")
const get_inactivity_emulation_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/inactivity_emulation")
const get_image_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/image")
const get_json_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/json")
const get_array_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/array")
const get_path_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/path")
const get_phone_confirm_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/phone_confirm")
const get_process_manage_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/process_manage")
const get_profile_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/profile")
const get_regular_expressions_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/regular_expressions")
const get_resources_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/resources")
const get_script_statistics_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/script_statistics")
const get_smtp_settings_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/smtp_settings")
const get_string_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/string")
const get_telegram_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/telegram")
const get_timezone_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/timezone")
const get_url_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/url")
const get_user_interaction_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/user_interaction")
const get_xpath_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/xpath")
const get_html_element_functions = require("C:/Users/WriteCoin/Projects/BrowserAutomationStudio/nodeBAS/API ForNode/html_element")
const {
	BAS_function_argument,
	BAS_function_return,
	BAS_result_function,
	BAS_call_function,
	BAS_result,
	BAS_success,
	BAS_fail_user,
	BAS_die,
	BAS_call_section,
	BAS_log,
	BAS_clear_log,
	BAS_get_clipboard,
	BAS_set_clipboard,
	BAS_web_interface_eval,
	ignore_errors,
	BAS_if,
	BAS_while,
	BAS_for,
	BAS_foreach,
	BAS_break,
	BAS_continue,
	BAS_set_global,
	BAS_get_global,
	BAS_inc_global,
	BAS_cvs_parse,
	BAS_random
} = get_api_functions(BAS_FUNCTION)
const {
	BAS_popup_close,
	BAS_load,
	BAS_general_timeout_next,
	BAS_general_timeout,
	BAS_async_load_timeout,
	BAS_solver_timeout,
	BAS_url,
	BAS_navigate_back,
	BAS_type,
	BAS_resize,
	BAS_get_browser_screen_settings,
	BAS_new_browser,
	BAS_open_file_dialog,
	BAS_drag_file,
	BAS_prompt_result,
	BAS_http_auth_result,
	BAS_scroll_to,
	BAS_render,
	BAS_recaptcha_v3,
	BAS_solve_coordinates_captcha,
	BAS_solver_failed,
	BAS_click_extension_button,
	BAS_browser_mode,
	BAS_default_move_params,
	BAS_enable_notifications,
	BAS_open_browser,
	BAS_close_browser,
	get_html_script,
	get_browser_screen_settings,
	BAS_proxy,
	BAS_javascript,
	BAS_onLoadJavascript,
	BAS_solveCaptcha,
	BAS_settings
} = get_browser_api_functions(BAS_FUNCTION)
const {
	BAS_header,
	BAS_original_save_cookies,
	BAS_cache_allow,
	BAS_cache_deny,
	BAS_request_allow,
	BAS_request_deny,
	BAS_cache_data_clear,
	BAS_cache_masks_clear,
	BAS_cache_get_status,
	BAS_is_load,
	BAS_restrict_popups,
	BAS_allow_popups,
	BAS_allow_downloads,
	BAS_save_cookies,
	get_cookies,
	BAS_load_cookies,
	BAS_load_cookies_from_http_client,
	BAS_get_cache,
	BAS_cache_get_all
} = get_network_functions(BAS_FUNCTION)
const {
	BAS_wait_async_load,
	BAS_waiter_timeout_next,
	BAS_wait_load,
	BAS_wait_url,
	BAS_wait_content,
	BAS_wait_css,
	BAS_sleep,
	wait_load_files
} = get_waiting_functions(BAS_FUNCTION)
const {
	BAS_imap_client_set_config,
	proxy_set_hash,
	BAS_imap_client_set_proxy,
	BAS_imap_client_messages_length,
	BAS_parse_message,
	BAS_imap_client_search,
	BAS_imap_client_search_all,
	BAS_imap_client_get_message,
	BAS_imap_client_delete_message
} = get_email_functions(BAS_FUNCTION)
const {
	BAS_http_client_set_proxy,
	BAS_http_client_reset,
	BAS_http_client_get,
	BAS_http_client_post,
	BAS_http_client_download,
	BAS_http_client_url,
	BAS_http_client_encoded_content,
	BAS_http_client_status,
	BAS_http_client_header,
	BAS_http_client_set_header,
	BAS_http_client_clear_header,
	BAS_http_client_save_cookies,
	BAS_http_client_restore_cookies,
	BAS_http_client_restore_cookies_from_browser,
	BAS_http_client_set_fail_on_error,
	BAS_http_client_was_error,
	BAS_http_client_error_string,
	BAS_http_client_xpath_xml,
	BAS_http_client_xpath_xml_list,
	BAS_http_client_xpath_text,
	BAS_http_client_xpath_text_list,
	BAS_http_client_xpath_count,
	BAS_http_client_xpath_exists
} = get_http_client_functions(BAS_FUNCTION)
const {
	BAS_parse_date,
	BAS_format_date,
	BAS_parse_milliseconds,
	BAS_milliseconds_from_date,
	BAS_create_date,
	BAS_change_date,
	BAS_add_time,
	BAS_difference_between_dates,
	BAS_current_date,
	BAS_date_change_timezone,
	BAS_date_get_timezone,
	BAS_get_day_of_month,
	BAS_get_day_of_week,
	BAS_get_day_of_year,
	BAS_get_year_from_date,
	BAS_get_month_from_date,
	BAS_get_hours_from_date,
	BAS_get_minutes_from_date,
	BAS_get_seconds_from_date,
	BAS_get_milliseconds_from_date
} = get_date_and_time_functions(BAS_FUNCTION)
const {
	BAS_read_file,
	BAS_write_file,
	BAS_file_info,
	BAS_create_dir,
	BAS_remove_file,
	BAS_move_file,
	BAS_copy_file,
	BAS_search_files,
	BAS_read_file_to_array,
	BAS_write_file_array
} = get_filesystem_functions(BAS_FUNCTION)
const {
	BAS_get_fingerprint,
	BAS_apply_fingerprint,
	BAS_fingerprint_performance
} = get_fingersprint_functions(BAS_FUNCTION)
const {
	BAS_thread_stop,
	BAS_async,
	BAS_thread_wait,
	BAS_thread_get_status
} = get_async_functions(BAS_FUNCTION)
const {
	BAS_inactivity_emulation
} = get_inactivity_emulation_functions(BAS_FUNCTION)
const {
	BAS_load_image,
	BAS_delete_image,
	BAS_create_image,
	BAS_convert_image,
	BAS_get_image_data,
	BAS_image_get_pixel,
	BAS_image_set_pixel,
	BAS_image_get_size,
	BAS_image_resize,
	BAS_image_insert,
	BAS_image_find,
	BAS_image_fill,
	BAS_image_sub,
	BAS_image_text
} = get_image_functions(BAS_FUNCTION)
const {
	BAS_json_value,
	BAS_json_values,
	BAS_json_key,
	BAS_json_keys,
	BAS_json_count,
	BAS_json_change,
	BAS_json_remove,
	BAS_json_check_format,
	BAS_json_change_format
} = get_json_functions(BAS_FUNCTION)
const {
	lastListElement,
	randomListElement,
	setListElement,
	deleteListValue,
	listContains,
	subList,
	listRemoveDuplicates,
	listCopy,
	listShuffle,
	listMerge,
	listCompare
} = get_array_functions(BAS_FUNCTION)
const {
	BAS_project_path,
	BAS_project_directory,
	BAS_installation_path,
	BAS_filename_from_path,
	BAS_dirname_from_path,
	BAS_extname_from_path,
	BAS_path_is_absolute,
	BAS_path_join,
	BAS_path_normalize,
	BAS_path_parse,
	BAS_get_system_path
} = get_path_functions(BAS_FUNCTION)
const {
	BAS_phone_get_number,
	BAS_phnoe_get_activation_code,
	BAS_phone_change_activation_status,
	BAS_phone_get_balance,
	BAS_phone_get_numbers_count,
	BAS_phone_get_sites,
	BAS_phone_get_countries,
	BAS_phone_set_debug
} = get_phone_confirm_functions(BAS_FUNCTION)
const {
	BAS_process_run
} = get_process_manage_functions(BAS_FUNCTION)
const {
	BAS_create_or_switch_permanent_profile,
	BAS_switch_to_temporary_profile,
	BAS_profile_copy,
	BAS_delete_profile,
	BAS_current_profile_info
} = get_profile_functions(BAS_FUNCTION)
const {
	BAS_regexp_first,
	BAS_regexp_scan,
	BAS_regexp_is_match,
	BAS_regexp_split,
	BAS_regexp_replace
} = get_regular_expressions_functions(BAS_FUNCTION)
const {
	BAS_create_resource,
	BAS_delete_resource,
	BAS_resource_add,
	BAS_get_resource_location,
	BAS_resource_as_list,
	BAS_list_to_resource,
	BAS_reload_resource,
	BAS_resource_length
} = get_resources_functions(BAS_FUNCTION)
const {
	BAS_thread_number,
	BAS_success_number,
	BAS_fail_number
} = get_script_statistics_functions(BAS_FUNCTION)
const {
	BAS_smtp_client_set_config,
	BAS_smtp_client_set_proxy,
	BAS_send_email,
	BAS_smtp_debug_enable
} = get_smtp_settings_functions(BAS_FUNCTION)
const {
	BAS_is_string,
	BAS_is_not_empty_string,
	BAS_to_string,
	BAS_to_number,
	BAS_number_format,
	BAS_count_substrings,
	BAS_get_substring,
	BAS_get_substring_between,
	BAS_splice_string,
	BAS_to_lower_case,
	BAS_to_upper_case,
	BAS_string_contains,
	BAS_string_length,
	BAS_capitalize,
	BAS_count_words,
	BAS_words,
	BAS_sentences,
	BAS_find_substring,
	BAS_starts_with,
	BAS_ends_with,
	BAS_insert_substring,
	BAS_base64_encode,
	BAS_base64_decode,
	BAS_spintax,
	BAS_replace_string,
	BAS_random_string,
	BAS_latinize,
	BAS_declination,
	BAS_extract_emails,
	BAS_extract_urls,
	BAS_extract_phone_numbers,
	BAS_escape_html,
	BAS_unescape_html,
	BAS_base64,
	BAS_template,
	BAS_join_strings,
	BAS_csv_parse,
	BAS_csv_generate,
	BAS_trim,
	BAS_clean,
	BAS_html
} = get_string_functions(BAS_FUNCTION)
const {
	BAS_telegram_send_message
} = get_telegram_functions(BAS_FUNCTION)
const {
	BAS_timezone_set_geo_location,
	BAS_set_timezone,
	BAS_timezone_set_coordinates,
	BAS_timezone_get_ip_info
} = get_timezone_functions(BAS_FUNCTION)
const {
	BAS_url_normalize,
	BAS_url_parse,
	BAS_generate_url,
	BAS_change_url,
	BAS_parse_user_agent,
	BAS_url_punycode,
	BAS_url_component
} = get_url_functions(BAS_FUNCTION)
const {
	BAS_manual_browser_control,
	BAS_user_play_sound,
	BAS_user_input
} = get_user_interaction_functions(BAS_FUNCTION)
const {
	BAS_xpath_get_first_xml,
	BAS_xpath_get_xml_list,
	BAS_xpath_get_first_text,
	BAS_xpath_get_text_list,
	BAS_xpath_get_count,
	BAS_xpath_exists
} = get_xpath_functions(BAS_FUNCTION)
const {
	BAS_popupselect,
	BAS_mouse_move_and_click_element,
	BAS_click_element,
	BAS_mouse_move_over_element,
	BAS_mouse_move_and_click,
	BAS_click,
	BAS_mouse_move,
	BAS_input_text,
	BAS_clear_field,
	BAS_get_xml,
	BAS_add_tab,
	BAS_popupinfo,
	BAS_element_is_exists,
	BAS_element_get_text,
	BAS_element_screenshot,
	BAS_element_solve_captcha,
	BAS_element_solve_captcha_clicks,
	BAS_wait_element,
	BAS_element_focus,
	BAS_element_get_coordinates,
	BAS_elements_count,
	BAS_get_element_style,
	BAS_element_drag_start,
	BAS_element_drag_finish,
	BAS_coords_drag_start,
	BAS_coords_drag_finish,
	BAS_element_get_url,
	BAS_element_get_attribute,
	BAS_element_set_attribute,
	BAS_combobox_set_value,
	BAS_combobox_set_index,
	BAS_combobox_get_random_element
} = get_html_element_functions(BAS_FUNCTION)
