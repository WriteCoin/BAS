;function BAS_xpath_get_first_xml(text, xpath_query, shutdownAfterError) {; html_parser_xpath_parse(text); if (shutdownAfterError && !html_parser_xpath_exist(xpath_query)); fail("Can"t resolve query " + xpath_query); const result = html_parser_xpath_xml(xpath_query); return result;};;;function BAS_xpath_get_xml_list(text, xpath_query) {; html_parser_xpath_parse(text); return html_parser_xpath_xml_list(xpath_query);};;;function BAS_xpath_get_first_text(text, xpath_query, shutdownAfterError) {; html_parser_xpath_parse(text); if (shutdownAfterError && !html_parser_xpath_exist(xpath_query)); fail("Can"t resolve query " + xpath_query); const result = html_parser_xpath_text(xpath_query); return result;};;;function BAS_xpath_get_text_list(text, xpath_query) {; html_parser_xpath_parse(text); return html_parser_xpath_text_list(xpath_query);};;;function BAS_xpath_get_count(text, xpath_query) {; html_parser_xpath_parse(text); return html_parser_xpath_count(xpath_query);};;;function BAS_xpath_exists(text, xpath_query) {; html_parser_xpath_parse(text); return html_parser_xpath_exist(xpath_query);};