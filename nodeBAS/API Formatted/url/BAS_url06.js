function BAS_url_punycode(str, encode) { return encode ? _punycode.urlToASCII(str) : _punycode.urlToUnicode(str);};