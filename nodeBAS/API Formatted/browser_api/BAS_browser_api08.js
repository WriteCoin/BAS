function BAS_solve_coordinates_captcha() { const args = _arguments(); _call_function(BASCaptchaSolver.solveCoordinatesCaptcha, { textInstructions: args.textInstructions || "", taskWaitTimeout: args.taskWaitTimeout || 0, taskWaitDelay: args.taskWaitDelay || 0, serviceName: args.serviceName || "rucaptcha", serviceUrl: args.serviceUrl || "", serviceKey: args.serviceKey || "", imageData: args.imageData || "", })!;};