function BAS_click() { const args = _arguments(); const x = args.x; const y = args.y; const wait_full_load = args.wait_full_load || false; const timeout = args.timeout; ; mouse(x, y)!; if (wait_full_load) { if (timeout) { waiter_timeout_next(timeout); }; wait_async_load()!; };};