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

/**
 * Проверить заданное условие, если оно истинно, выполнить определенную последовательность действий, если оно ложно выполнить другую последовательность действий, наконец продолжить выполнение скрипта.
 * cond_func - функция, возвращающая условие для проверки
 * callback - функция при cond_func() равном true
 * callback_else - функция "иначе" при cond_func(), равном false
 */
 function BAS_if() {
  const cond_func = _function_argument('cond_func') || true
  const callback = _function_argument('callback') || function() {}
  const callback_else = _function_argument('callback_else') || function() {}
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

/**
 * Цикл For
 * Выполнить определенный список действий заданное число раз.
 * a и b - нижняя и верхняя границы цикла
 * callback - функция действий
 * message_func - функция, возвращающая сообщение, вместо стандартного
 */
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

/**
 * Выполнить заданный набор действий для каждого элемента массива.
 * arrayList - входной массив, список
 * callback - функция действий
 * message_data_func - функция, возвращающая сообщение итерируемого значения массива, вместо стандартного
 * message_index_func - функция, возвращающая индекс итерации массива, вместо стандартного
 */
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

/**
 * Немедленно прервать текущий цикл. Это действие работает только если оно помещено внутрь цикла(действия for, foreach, while).
 * После выполнения этого действия цикл прерывается немедленно, текущий цикл не будет выполнен не единожды, а точка выполнения перемещается за следующие после цикла действие.
 * Обычной практикой является помещение действия break внутрь действия if, таким образом цикл будет остановлен только при некоем условии
 * @param {string} str Строка function для циклов
 */
function BAS_break(str) {
  str = str || 'function'
  _break('function')
}

/**
 * Немедленно остановить текущее выполнение цикла и начать следующее. Это действие работает только если оно помещено внутрь цикла(действия for, foreach, while).
 * После вызова этого действия текущее выполнение цикла прерывается немедленно, а точка выполнения перемещается в начало цикла
 * @param {string} str Строка function для циклов
 */
function BAS_continue(str) {
  str = str || 'function'
  _next(str)
}

/**
 * Установить метку
 */
function BAS_set_goto_label() {
  const label = _function_argument('label')
  _set_goto_label(label)!
}

/**
 * Перейти к метке
 * label - метка
 * offset - смещение
 * reverse - массив
 * callback - функция
 */
function BAS_goto() {
  const label = _function_argument('label')
  const offset = _function_argument('offset') || -1
  const reverse = _function_argument('reverse') || []
  const callback = _function_argument('callback') || function() {}
  _long_goto(label, offset, reverse, callback)!
}

/**
 * Создать новую переменную или изменить существующую заданным значением.
 Обычные переменные видимо только внутри текущего потока, используйте глобальные переменные если вы хотите сделай так, чтобы они были видимы во всех потоках.
 Имя переменной должно быть написано большими латинскими буквами и отражать ее назначение. Называть переменные [[A1]] или [[A2]] не рекомендуется.
 Созданную здесь переменную можно использовать позже если поместить ее имя в двойных квадратных скобках внутри любого поля: [[NEW_VARIABLE]]. Вам не нужно вводить это значение самостоятельно, просто нажмите на любое поле, затем на "Из переменной" и наконец выберите переменную из списка.
 Параметр "Значение переменной" может содержать другие переменные, например [[LOGIN]]@gmail.сom или ресурсы. Так что это действие также может соединять строки([[PART1]][[PART2]]), обновлять их, и т. д.
 По умолчанию параметр "Значение переменной" является строкой, но вы можете изменить его тип на int, так что переменная будет числом.
 При установке типа в expression, в переменную будет записан результат выполнения джаваскрипт кода. Это очень мощный механизм. Например, чтобы получить текущее время, введите Date.now() в поле "Значение переменной" (screen)
 Вы можете применять JavaScript функции к переменным BAS, например, код [[LINE]].split(":")[0] разделит строку на части и возьмёт первый элемент.
 Если вы хотите записать многострочную строку в переменную, используйте действие "Шаблон"
 * @param {string} name имя глобальной переменной
 * @param {number | string | boolean} value значение
 */
function BAS_set_global(name, value) {
  value = JSON.stringify(value)
  PSet("basglobal", name, value)
}

/**
 * Получить значение глобальной переменной
 * @param {string} name имя глобальной переменной
 * @returns значение переменной
 */
function BAS_get_global(name) {
  return JSON.parse(P("basglobal", name) || "0")
}

/**
 * Увеличить глобальную переменную
 * @param {string} name имя глобальной переменной
 * @param {number | string | boolean} val На сколько увеличить переменную
 * Увеличить глобальную переменную на заданное значение.
 Другими словами, это действие выполняет [[GLOBAL:VARIABLE]] = [[GLOBAL:VARIABLE]] + num
 Это действие предполагает, что глобальная переменная будет иметь чисельний тип, если это не так, то тип переменной будет преобразован автоматически.
 Параметр "На сколько увеличить переменную" может быть меньше нуля, в таком случае переменная будет уменьшена на это значение.
 Параметр "На сколько увеличить переменную" также может быть равным нулю, это только преобразует тип переменной в чисельний.
 */
function BAS_inc_global(name, val) {
  BAS_set_global(name, BAS_get_global(name) + val)
}

/**
 * Распарсить CSV строку на элементы.
 Это действие распарсит строку по указанным разделителям и сохранит распарсенные данные по указанным переменным.
 Например, если указана строка "email@gmail.com:mypass1" и переменные USERNAME,PASSWORD, то действие сохранит "email@gmail.com" в переменную [[USERNAME]] и "mypass1" в переменную [[PASSWORD]].
 По умолчанию действие возвращает строки, но это можно изменить, включив параметр "Преобразовывать типы", находящийся в дополнительных настройках, тогда страки автоматически будут конвертироватся в числа, true или false, обекты, null и undefined.
 Например, если указана строка "test:123:true", то в первую переменную будет сохранена строка "test", во вторую переменную число 123 и в третью переменную логическое значение true.
 Если количество переменных больше, чем количество элементов в строке, то в лишние переменные будет записана пустая строка.
 Используйте действие "Парсить строку" из модуля Список если хотите получить результат в виде списка.
 * @param {string} str Строка
 * @param {string} seps Список разделителей
 * @param {Array} varList Список переменных
 * @param {boolean} convert Преобразовывать типы
 * @returns Объект с результатами
 */
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

/**
 * Случайное Число
 * Сгенерировать случайное целое число в заданном диапазоне.
 * @param {number} a Минимальное Значение
 * @param {number} b Максимальное Значение
 * @returns Случайное число в указанном диапазоне
 */
function BAS_random(a, b) {
  return Math.floor(Math.random() * b - a + 1) + a
}