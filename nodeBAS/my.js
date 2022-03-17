function BAS_if() {
  const cond_func = _function_argument('cond_func') || true
  const callback = _function_argument('callback') || function() {}
  const callback_else = _function_argument('callback_else') || function() {}
  _cycle_params().if_else = cond_func()
  _if(_cycle_params().if_else, callback)
  _if(!_cycle_params().if_else, callback_else)
  delete _cycle_params().if_else
}