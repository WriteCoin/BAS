function BAS_user_input() { const args = _arguments(); const text = args.text; solve_base64("manual","BAS_USER_ASK" + "Текст")!; VAR_USER_INPUT = _result(); _function_return(VAR_USER_INPUT);};