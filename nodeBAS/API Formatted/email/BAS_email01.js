function function proxy_set_hash(proxy, proxy_type, login, password) { const hash = proxy_parse(proxy); if (proxy_type !== "auto") { hash.IsHttp = proxy_type === "http"; }; if (login.length > 0 && password.length > 0) { hash.name = login; hash.password = password; }; return hash;};