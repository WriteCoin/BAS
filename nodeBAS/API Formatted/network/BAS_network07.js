function BAS_get_cache() { const match = _function_argument("match"); const timeout = _function_argument("timeout"); if (timeout) waiter_timeout_next(timeout); wait_load(match)!; if (isBase64) cache_get_base64(match)!; else cache_get_string(match)!; _function_return(_result());};