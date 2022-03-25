/**
* Получить параметр функции
* @param arg параметр
*/
function BAS_function_argument(arg) {
const arg = _function_argument('arg') || arg
const result = _function_argument(arg)
_function_return(result)
return result
}
/**
* Вернуть значение функции
* @param value значение функции
*/
function BAS_function_return(value) {
const value = _function_argument('value') || value
_function_return(value)
}
/**
* Получить возвращаемое значение функции, после ее вызова
*/
function BAS_result_function() {
_function_return(_result_function())
}
/**
* Вызвать функцию BAS (async)
* @param func функция
* @param params объект с параметрами
*/
function BAS_call_function(func, params) {
const func = _function_argument('func') || func
const params = _function_argument('params') || params
_call_function(func, params)!
}
/**
* Получить результат действий
*/
function BAS_result() {
_function_return(_result())
}
/**
* Завершить поток с успешным результатом.
* Каждый поток в БАС может завершиться либо успешно либо с ошибкой.
* В случае если все действия выполнены правильно, БАС устанавливает статус завершения успешным для этого потока.
* Важно понимать что это действие останавливает только текущий поток, а не весь скрипт.
* Вы можете установить статус завершения успешным и остановить поток с помощью этого действия
* @param message Сообщение об успехе
*/
function BAS_success(message) {
const message = _function_argument('message') || message
success(message)
}
/**
* Завершить поток с неуспешным результатом.
* Каждый поток в БАС может завершиться либо успешно либо с ошибкой.
* В случае если одно из действий выполняется неправильно, поток будет остановлен с ошибочным статусом.
* Вы также можете прервать поток и установить сообщение об ошибке с помощью этого действия
* Важно понимать что это действие останавливает только текущий поток, а не весь скрипт.
* @param text Сообщение об ошибке
* @param dont_create_more Не перезапускать поток
*/
function BAS_fail_user(text, dont_create_more) {
const text = _function_argument('text') || text
const dont_create_more = _function_argument('dont_create_more') || dont_create_more
fail_user(text, dont_create_more)
}
/**
* Это действие завершает весь скрипт, а не только отдельный поток, Используйте его в случае возникновения критической ошибки и если скрипт не может быть продолжен ни при каких обстоятельствах. Например, если ключ API к какому-то сервису не подходит.
* БАС тоже используют это действие в случае отсутствия ресурса, таким образом, если пользователь не задал файл с прокси, скрипт закончится мгновенно.
* Есть два режима работы этого действия. Первый режим - этомгновенное завершение, Это означает что скрипт завершится в ту же самую секунду, в которую вызвано это действие, каждый поток также остановиться мгновенно даже если он выполнял какое-то важное задание. Второй режим -это плавное завершение потоков, в этом случае БАС будет ждать пока все потоки закончат свою работу, и только потом завершить скрипт. Второй режим полезен в том случае если вы не хотите потерять важных данных, например, номера телефонов или почтовые адреса.
* @param text Сообшение об ошибке
* @param instant Завершить скрипт мгновенно
*/
function BAS_die(text, instant) {
const text = _function_argument('text') || text
const instant = _function_argument('instant') || instant
die(text, instant)
}
/**
* Вызов функции в несколько потоков (async)
* Выполнить функцию заданное число раз с заданным количеством потоков. Это можно представить как запуск другого скрипта внутри текущего потока.
После того, как BAS начнет выполнять это действие, он запустит указанное количество потоков с заданной функцией. Поток, который вызвал это действие, останавливается до тех пор, пока не будет достигнут заданное количество успешных выполнений или заданное количество неудачных выполнений, а другие потоки продолжают выполнение.
Недавно начатые потоки не знают о переменных или состоянии браузера в потоке, который их запускали, поэтому обмен данными между стартовым потоком и недавно созданными может осуществляться только с помощью глобальных переменных или ресурсов.
Пример #1. У вас есть скрипт, который парсит список ссылок и должен получить их содержимое. Конечно, вы можете создать цикл, и перебрать все ссылки одна за другой. Но в этом случае ссылки будут обрабатываться последовательно. С помощью данного действия вы можете обработать их параллельно. Создайте ресурс, поместите туда все ссылки и вызовите функцию обработки в нескольких потоках (видео)
Пример #2. Вам нужно вызвать некоторую функцию до начала скрипта, а другую - после завершения скрипта. В этом случае вы можете установить "Номер потока", "Количество успехов" и "Количество неудач" в 1 в главном скрипте. Создать 3 функции: MainScript, OnStart и OnEnd и вызвать OnStart и OnEnd с количеством потом равным 1, а функцию MainScript вызывать с параметрами такими же, как и основной скрипт (screen)
Это действие никогда не завершается с ошибкой, даже если достигнуто максимальное количество неудач, поэтому вам не нужно оборачивать его в блок игнорирования ошибок.
Вызовите действие "прервать скрипт" внутри заданной функции чтобы остановить скрипт вручную.
* @param func функция для запуска потоков
* @param threads Количество потоков
* @param success_number Успешных выполнений
* @param fail_number Неудачных выполнений
* @param callback Функция
*/
function BAS_call_section(func, threads, success_number, fail_number, callback) {
const func = _function_argument('func') || func
const threads = _function_argument('threads') || threads
const success_number = _function_argument('success_number') || success_number
const fail_number = _function_argument('fail_number') || fail_number
const callback = _function_argument('callback') || callback
if (!callback) {
_call_section(func, threads, success_number, fail_number)!
} else {
_call_section(func, threads, success_number, fail_number, callback)!
}
}
/**
* Вывести сообщение в лог. Это сообщение будет показано пользователю и должно сообщать ему о событиях, происходящих во время выполнении скрипта.
Сообщение также будет записано в файл.
BAS также добавит некоторую информацию к сообщению: дату, номер потока, идентификатор действия. Вот почему это действие не очень хорошо подходит, если вы хотите, выводить необработанные данные, например, список аккаунтов. В таком случае используйте действие "Результат".
Если вы хотите изменить цвет сообщения, используйте действие "Выполнить код" вместе с вызовом api log_html(html, text).
Если вы хотите выводить данные только в файл, используйте эту (статью)
* @param text Данные для вывода
*/
function BAS_log(text) {
const text = _function_argument('text') || (text || '')
log(text)
}
/**
* Очистить лог
* Очистить окно лога и файл лога
*/
function BAS_clear_log() {
clear_log()
}
/**
* Вывести данные на вкладку результатов.
Это действие лучше всего подходит для вывода необработанных данных, таких как учетные записи, url профилей и т. д.
Если вы хотите вывести сообщение с датой и номером потока, лучше использовать действие "Лог".
Перед запуском скрипта вы можете создать до девяти вкладок под разные данные и указать имена для них, например, одну для аккаунтов, одну для сообщений, для аватаров и т. д.
Параметр "Номер результата" задает номер вкладки, нумерация начинается с 1.
Если вы хотите выводить данные только в файл, используйте эту (статью)
* @param text Данные
* @param number Номер результата
*/
function BAS_result(text, number) {
const text = _function_argument('text') || text
const number = _function_argument('number') || number
result(text, number)
}
/**
* Читать Буфер Обмена
* Прочитать данные указанного типа из буфера обмена.
* Буфер обмена является глобальным для всей системы и должен быть заблокирован перед использованием в многопоточном режиме.
* @param isBase64 Сохранить в формате base64
* @param mimeType 'text/plain' | 'text/html'
* Mime Тип
*/
function BAS_get_clipboard(isBase64, mimeType) {
const isBase64 = _function_argument('isBase64') || isBase64
const mimeType = _function_argument('mimeType') || (mimeType || 'text/plain')
const result = _get_clipboard(isBase64, mimeType)
_function_return(result)
return result
}
/**
* Запись В Буфер Обмена
* Записать данные указанного типа в буфер обмена.
* Буфер обмена является глобальным для всей системы и должен быть заблокирован перед использованием в многопоточном режиме.
* @param isBase64 Данные представлены в формате base64
* @param mimeType 'text/plain' | 'text/html'
* Mime Тип
* @param data Данные
*/
function BAS_set_clipboard(isBase64, mimeType, data) {
const isBase64 = _function_argument('isBase64') || isBase64
const mimeType = _function_argument('mimeType') || mimeType
const data = _function_argument('data') || data
set_clipboard(isBase64, mimeType, data)
}
/**
* Выполнить javascript код в контексте веб интерфейса.
* Если веб интерфейс не включен, это действие не делает ничего.
* Веб интерфейс можно включить через кабинет премиум аккаунта.
* Если вы хотите запустить код в контексте BAS, используйте действие "Выполнить код".
* BAS также предоставляет выполнять код с помощью node.js. для этого нужно использовать модуль "Встроенные языки".
* Здесь вы можете поместить любой javascript код, включая код, который использует внешние библиотеки.
* Есть возможность использовать переменные и ресурсы.
*
* Пример #1. Показать оповещение.
* alert("Message")
*
* Пример #2. Вывод переменной БАС в консоль браузера.
* console.log(VAR_TEST_VARIABLE)
*
* BAS использует uikit https://getuikit.com/docs/introduction для рендеринга контролов, и вы также можете использовать эту библиотеку.
*
* Пример #3. Показать уведомление через uikit.
* UIkit.notification('My message');
*
* Библиотека Jquery тоже поддерживается.
*
* Пример #4. изменить значение текстового поля.
* $("#control-id").val("Input value");
*
* @param Script
*/
function BAS_web_interface_eval(Script) {
const Script = _function_argument('Script') || Script
_web_interface_eval(Script)
}
/**
* Игнорировать ошибки (BAS-функция)
* Игнорировать ошибки при выполнении одного или нескольких действий и продолжить выполнение скрипта дальше.
* Вы можете использовать переменную VAR_WAS_ERROR чтобы проверить, были ли ошибки во время последнего блока "Игнорировать Ошибки".
* В переменной VAR_LAST_ERROR содержится текст ошибки
* Фактически, эмуляция блока try/catch
* callback - функция выполнения действий в блоке try
* error_callback - функция выполнения действий в блоке catch
* error_message_func - функция, возвращающая сообщение об ошибке, вместо стандартного
* message_ignore_func - функция, возвращающая сообщение об игнорировани ошибок, в начале выполнения блока try, вместо стандартного
*/
function ignore_errors(callback, error_callback, error_message_func, message_ignore_func) {
const callback = _function_argument('callback') || (callback || function() {})
const error_callback = _function_argument('error_callback') || (error_callback || function(err) {})
const error_message_func = _function_argument('error_message_func') || error_message_func
const message_ignore_func = _function_argument('message_ignore_func') || message_ignore_func
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
* If (BAS-функция)
* Проверить заданное условие, если оно истинно, выполнить определенную последовательность действий, если оно ложно выполнить другую последовательность действий, наконец продолжить выполнение скрипта.
* cond_func - функция, возвращающая условие для проверки
* callback - функция при cond_func() равном true
* callback_else - функция "иначе" при cond_func(), равном false
*/
function BAS_if(cond_func, callback, callback_else) {
const cond_func = _function_argument('cond_func') || (cond_func || true)
const callback = _function_argument('callback') || (callback || function() {})
const callback_else = _function_argument('callback_else') || (callback_else || function() {})
_cycle_params().if_else = cond_func()
_if(_cycle_params().if_else, callback)!
_if(!_cycle_params().if_else, callback_else)!
delete _cycle_params().if_else
}
/**
* While (BAS-функция)
* Выполнять заданный список действий пока какое-то условие является истинным.
* Эмуляция while.
* cond_func - функция условия подстановки в while
* callback - функция выполнения действий в блоке while
* message_func - функция, возвращающая строку сообщения в начале итерации цикла
*/
function BAS_while(cond_func, callback, messsage_func) {
const cond_func = _function_argument('cond_func') || (cond_func || true)
const callback = _function_argument('callback') || (callback || function(i) {})
const message_func = _function_argument('message_func') || message_func
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
* Цикл For (BAS-функция)
* Выполнить определенный список действий заданное число раз.
* a и b - нижняя и верхняя границы цикла
* callback - функция действий
* message_func - функция, возвращающая сообщение, вместо стандартного
*/
function BAS_for(a, b, callback, message_func) {
const a = _function_argument('a') || a
const b = _function_argument('b') || b
const callback = _function_argument('callback') || (callback || function(i) {})
const message_func = _function_argument('message_func') || message_func
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
function BAS_foreach(arrayList, callback, message_data_func, message_index_func) {
const arrayList = _function_argument('arrayList') || arrayList
const callback = _function_argument('callback') || callback
const message_data_func = _function_argument('message_data_func') || message_data_func
const message_index_func = _function_argument('message_index_func') || message_index_func
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
str = _function_argument('str') || (str || 'function')
_break(str)
}
/**
* Немедленно остановить текущее выполнение цикла и начать следующее. Это действие работает только если оно помещено внутрь цикла(действия for, foreach, while).
* После вызова этого действия текущее выполнение цикла прерывается немедленно, а точка выполнения перемещается в начало цикла
* @param {string} str Строка function для циклов
*/
function BAS_continue(str) {
str = _function_argument('str') || (str || 'function')
_next(str)
}
/**
* Создать новую переменную или изменить существующую заданным значением.
Обычные переменные видимо только внутри текущего потока, используйте глобальные переменные если вы хотите сделай так, чтобы они были видимы во всех потоках.
Имя переменной должно быть написано большими латинскими буквами и отражать ее назначение. Называть переменные VAR_A1 или VAR_A2 не рекомендуется.
Созданную здесь переменную можно использовать позже если поместить ее имя в двойных квадратных скобках внутри любого поля: VAR_NEW_VARIABLE. Вам не нужно вводить это значение самостоятельно, просто нажмите на любое поле, затем на "Из переменной" и наконец выберите переменную из списка.
Параметр "Значение переменной" может содержать другие переменные, например VAR_LOGIN@gmail.сom или ресурсы. Так что это действие также может соединять строки(VAR_PART1VAR_PART2), обновлять их, и т. д.
По умолчанию параметр "Значение переменной" является строкой, но вы можете изменить его тип на int, так что переменная будет числом.
При установке типа в expression, в переменную будет записан результат выполнения джаваскрипт кода. Это очень мощный механизм. Например, чтобы получить текущее время, введите Date.now() в поле "Значение переменной" (screen)
Вы можете применять JavaScript функции к переменным BAS, например, код VAR_LINE.split(":")[0] разделит строку на части и возьмёт первый элемент.
Если вы хотите записать многострочную строку в переменную, используйте действие "Шаблон"
* @param {string} name имя глобальной переменной
* @param {number | string | boolean} value значение
*/
function BAS_set_global(name, value) {
name = _function_argument('name') || name
value = _function_argument('value') || value
value = JSON.stringify(value)
PSet("basglobal", name, value)
}
/**
* Получить значение глобальной переменной
* @param {string} name имя глобальной переменной
* @returns значение переменной
*/
function BAS_get_global(name) {
name = _function_argument('name') || name
const result = JSON.parse(P("basglobal", name) || "0")
_function_return(result)
return result
}
/**
* Увеличить глобальную переменную
* @param {string} name имя глобальной переменной
* @param {number | string | boolean} val На сколько увеличить переменную
* Увеличить глобальную переменную на заданное значение.
Другими словами, это действие выполняет JSON.parse(P("basglobal", "VARIABLE") || '""') = JSON.parse(P("basglobal", "VARIABLE") || '""') + num
Это действие предполагает, что глобальная переменная будет иметь чисельний тип, если это не так, то тип переменной будет преобразован автоматически.
Параметр "На сколько увеличить переменную" может быть меньше нуля, в таком случае переменная будет уменьшена на это значение.
Параметр "На сколько увеличить переменную" также может быть равным нулю, это только преобразует тип переменной в чисельний.
*/
function BAS_inc_global(name, val) {
name = _function_argument('name') || name
val = _function_argument('val') || val
BAS_set_global(name, BAS_get_global(name) + val)
}
/**
* Распарсить CSV строку на элементы.
Это действие распарсит строку по указанным разделителям и сохранит распарсенные данные по указанным переменным.
Например, если указана строка "email@gmail.com:mypass1" и переменные USERNAME,PASSWORD, то действие сохранит "email@gmail.com" в переменную VAR_USERNAME и "mypass1" в переменную VAR_PASSWORD.
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
str = _function_argument('str') || str
seps = _function_argument('seps') || (seps || ":;,")
varList = _function_argument('varList') || varList
convert = _function_argument('convert') || (convert || false)
const csv_res = _csv_parse(str, seps, convert)
const result = {}
for (CYCLE_INDEX = 0; CYCLE_INDEX < varList.length; CYCLE_INDEX++) {
const i = CYCLE_INDEX
result[varList[i]] = _avoid_nilb(csv_res[i], "")
}
_function_return(result)
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
const a = _function_argument('a') || a
const b = _function_argument('b') || b
const result = Math.floor(Math.random() * b - a + 1) + a
_function_return(result)
return result
}
