


function ignore_errors() {
  const callback = _function_argument('callback') || function() {}
  const error_callback = _function_argument('error_callback') || function(err) {}
  const error_message_func = _function_argument('error_message_func')
  const message_ignore_func = _function_argument('message_ignore_func')
  _call(function () {
    _on_fail(function () {
      VAR_LAST_ERROR = _result()
      VAR_ERROR_ID = ScriptWorker.GetCurrentAction()
      VAR_WAS_ERROR = false
      _break(1, true)
    })
    CYCLES.Current().RemoveLabel("function")
    const message_ignore = message_ignore_func && message_ignore_func()
    const message = (message_ignore === null || message_ignore === undefined) ? "Игнорирование ошибок" : message_ignore
    log(message)
    callback()!
  }, null)!
  _if(VAR_WAS_ERROR,function(){
    const error_message = error_message_func && error_message_func()
    const message = (error_message === null || error_message === undefined) ? "Произошла ошибка : " + VAR_LAST_ERROR : error_message
    log(message)
    error_callback(err)!
  })!
}


 function BAS_if() {
  const cond_func = _function_argument('cond_func') || true
  const callback = _function_argument('callback') || function() {}
  const callback_else = _function_argument('callback_else') || function() {}
  _cycle_params().if_else = cond_func()
  _if(_cycle_params().if_else, callback)!
  _if(!_cycle_params().if_else, callback_else)!
  delete _cycle_params().if_else
}


function BAS_while() {
  const cond_func = _function_argument('cond_func') || true
  const callback = _function_argument('callback') || function(i) {}
  const message_func = _function_argument('message_func')
  _do(function(){
    VAR_CYCLE_INDEX = _iterator() - 1
    BREAK_CONDITION = cond_func();
    if(!BREAK_CONDITION)_break();
    const message = message_func && message_func()
    const log_message = (message === null || message === undefined) ? "Текущее повторение цикла : " + VAR_CYCLE_INDEX : message
    log(log_message)
    callback(VAR_CYCLE_INDEX)!
  })!
}


function BAS_for() {
  const a = _function_argument('a')
  const b = _function_argument('b')
  const callback = _function_argument('callback') || function(i) {}
  const message_func = _function_argument('message_func')
  _do(function(){
    VAR_CYCLE_INDEX = _iterator() - 1 + a
    if(VAR_CYCLE_INDEX > b) _break();
    const message = message_func && message_func()
    const log_message = (message === null || message === undefined) ? "Текущее повторение цикла : " + VAR_CYCLE_INDEX : message
    log(log_message)
    callback(VAR_CYCLE_INDEX)!
  })!
}


 function BAS_foreach() {
  const arrayList = _function_argument('arrayList')
  const callback = _function_argument('callback')
  const message_data_func = _function_argument('message_data_func')
  const message_index_func = _function_argument('message_index_func')
  _do_with_params({"foreach_data":(arrayList)},function(){
    VAR_CYCLE_INDEX = _iterator() - 1
    if(VAR_CYCLE_INDEX > _cycle_param("foreach_data").length - 1)_break();
    VAR_FOREACH_DATA = _cycle_param("foreach_data")[VAR_CYCLE_INDEX]
    const message_data = (message_data_func === null || message_data_func === undefined) ? "Текущие данные : " + VAR_FOREACH_DATA : message_data_func
    log(message_data)
    const message_index = (message_index_func === null || message_index_func === undefined) ? "Текущее повторение цикла : " + VAR_CYCLE_INDEX : message_index_func
    log(message_index)
    callback(VAR_CYCLE_INDEX, VAR_FOREACH_DATA)!
  })!
}


function BAS_break(str) {
  str = str || 'function'
  _break(str)
}


function BAS_continue(str) {
  str = str || 'function'
  _next(str)
}


function BAS_set_goto_label() {
  const label = _function_argument('label')
  _set_goto_label(label)!
}


function BAS_goto() {
  const label = _function_argument('label')
  const offset = _function_argument('offset') || -1
  const reverse = _function_argument('reverse') || []
  const callback = _function_argument('callback') || function() {}
  _long_goto(label, offset, reverse, callback)!
}


function BAS_set_global(name, value) {
  value = JSON.stringify(value)
  PSet("basglobal", name, value)
}


function BAS_get_global(name) {
  return JSON.parse(P("basglobal", name) || "0")
}


function BAS_inc_global(name, val) {
  BAS_set_global(name, BAS_get_global(name) + val)
}


 function BAS_cvs_parse(str, seps, varList, convert) {
  seps = seps || ":;,"
  convert = convert || false
  const csv_res = _csv_parse(str, seps, convert)
  const result = {}
  for (CYCLE_INDEX = 0; CYCLE_INDEX < varList.length; CYCLE_INDEX++) {
    const i = CYCLE_INDEX
    result[varList[i]] = _avoid_nilb(csv_res[i], "")
  }
  return result
}


function BAS_random(a, b) {
  return Math.floor(Math.random() * b - a + 1) + a
}