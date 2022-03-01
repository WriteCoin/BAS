/**
 * Игнорировать ошибки при выполнении одного или нескольких действий и продолжить выполнение скрипта дальше.
 * Вы можете использовать переменную [[WAS_ERROR]] чтобы проверить, были ли ошибки во время последнего блока "Игнорировать Ошибки".
 * В переменной [[LAST_ERROR]] содержится текст ошибки
 * Фактически, эмуляция блока try/catch
 * callback - функция выполнения действий в блоке try
 * error_callback - функция выполнения действий в блоке catch
 * error_message_func - функция, возвращающая сообщение об ошибке, вместо стандартного
 * message_ignore_func - функция, возвращающая сообщение об игнорировани ошибок, в начале выполнения блока try, вместо стандартного 
 */
function ignore_errors() {
  const callback = _function_argument('callback')
  const error_callback = _function_argument('error_callback')
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
    error_callback()!
  })!
}

/**
 * Ждать Загрузки Файла
 * Ждать окончания текущей загрузки.
 * Для выставления максимального времени выполнения использовать waiter_timeout_next, в миллисекундах
 */
function wait_load_files() {
  wait_load('download://*')!
  cache_get_string('download://*')!
  const filepath = JSON.parse(native("filesystem", "fileinfo", _result()))["directory"] + "/" + _result()
  _function_return(filepath)
}

/**
 * Код страницы
 * Получение кода страницы и сохранение его в переменной. Это действие сохраняет текущий код со всеми изменениями, а не тот, который сервер вернул изначально.
 * Вы можете парсить его с помощью регулярных выражений или xpath.
 * element - элемент html-страницы, с которого получать скрипт
 */
function get_html_script() {
  const element = _function_argument('element')
  page().script(element)!
  _function_return(_result())
}

/**
 * Получить разрешение и положение курсора
 * Получить текущий размер браузера, положение курсора и прокрутки.
 * Чтобы изменить размеры браузера, используйте действие "Разрешение".
 * Чтобы изменить текущее положение прокрутки, используйте действие "Прокрутка".
 * Чтобы изменить текущее положение курсора, используйте действие "Двигать Мышь".
 * Возвращает объект с полями:
 * cursorX - Положение курсора X
 * cursorY - Положение курсора Y
 * scrollX - Положение прокрутки X
 * scrollY - Положение прокрутки Y
 * width - Ширина браузера
 * height - Высота браузера
 */
function get_browser_screen_settings() {
  _get_browser_screen_settings()!
  const result = JSON.parse(_result())
  _function_return({
    scrollX: result['ScrollX'],
    scrollY: result['ScrollY'],
    cursorX: result['CursorX'],
    cursorY: result['CursorY'],
    width: result['Width'],
    height: result['Height']
  })
  _result_function()
}

/**
 * Проверить заданное условие, если оно истинно, выполнить определенную последовательность действий, если оно ложно выполнить другую последовательность действий, наконец продолжить выполнение скрипта.
 * cond_func - функция, возвращающая условие для проверки
 * callback - функция при cond_func() равном true
 * callback_else - функция "иначе" при cond_func(), равном false
 */
function BAS_if() {
  const cond_func = _function_argument('cond_func')
  const callback = _function_argument('callback')
  const callback_else = _function_argument('callback_else')
  _cycle_params().if_else = cond_func()
  _if(_cycle_params().if_else, callback)!
  _if(!_cycle_params().if_else, callback_else)!
  delete _cycle_params().if_else
}

/**
 * Выполнять заданный список действий пока какое-то условие является истинным.
 * Эмуляция while.
 * cond_func - функция условия подстановки в while
 * callback - функция выполнения действий в блоке while
 * message_func - функция, возвращающая строку сообщения в начале итерации цикла
 */
function BAS_while() {
  const cond_func = _function_argument('cond_func')
  const callback = _function_argument('callback')
  const message_func = _function_argument('message_func')
  _do(function(){
    VAR_CYCLE_INDEX = _iterator() - 1
    BREAK_CONDITION = cond_func();
    if(!BREAK_CONDITION)_break();
    const message = message_func && message_func()
    const log_message = (message === null || message === undefined) ? "Текущее повторение цикла : " + VAR_CYCLE_INDEX : message
    log(log_message)
    callback()!
  })!
}

/**
 * Цикл For
 * Выполнить определенный список действий заданное число раз.
 * 
 */
function BAS_for() {
  const a = _function_argument('a')
  const b = _function_argument('b')
  const callback = _function_argument('callback')
  const message_func = _function_argument('message_func')
  _do(function(){
    VAR_CYCLE_INDEX = _iterator() - 1 + a
    if(VAR_CYCLE_INDEX > b) _break();
    const message = message_func && message_func()
    const log_message = (message === null || message === undefined) ? "Текущее повторение цикла : " + VAR_CYCLE_INDEX : message
    log(log_message)
    callback()!
  })!
}

