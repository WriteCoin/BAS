function BAS_mouse_move() { const args = _arguments(); const x = args.x; const y = args.y; const mouseSettings = args.mouse; const mouseSettingsObj = mouseSettings ? { speed: mouseSettings.speed || 100, gravity: mouseSettings.gravity || 6, deviation: mouseSettings.deviation || 2.5; } : {}; move(x, y, mouseSettingsObj)!;};