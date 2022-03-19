/**
* Сохранить cookies (BAS-функция)
* Возвращает сохраненные куки браузера
*/
function BAS_save_cookies() {
save_cookies()!
_function_return("{\"cookies\":" + _result() + "}")
}
function get_cookies(cookies) {
VALUE = cookies
COOKIES = ""
if(VALUE.length > 0) {
COOKIES = JSON.parse(VALUE)["cookies"]
if (typeof(COOKIES) == "undefined") {
COOKIES = ""
} else {
COOKIES = JSON.stringify(COOKIES)
}
}
cookies = COOKIES
return cookies
}
/**
* Загрузить cookies (BAS-функция)
* Установить куки для браузера.
* @param {string} cookies Cookies
*/
function BAS_load_cookies() {
const cookies = _function_argument('cookies')
cookies = get_cookies(cookies)
restore_cookies(cookies)!
}
/**
* Загрузить cookies из http клиента (BAS-функция)
* Загрузить cookies из http клиента в браузер.
*/
function BAS_load_cookies_from_http_client() {
_switch_http_client_main()
const cookies = get_cookies(http_client_save_cookies())
restore_cookies(cookies)!
}
/**
* Получить статус запроса (BAS-функция)
* Получить статус запроса для указанного Url.
* @param match Маска
* @param callback функция
* @returns статус запроса
*/
function BAS_cache_get_status() {
const match = _function_argument('match') || ''
const callback = _function_argument('callback')
cache_get_status(match, callback)!
_function_return(_result())
}
/**
* Был ли запрос (BAS-функция)
* Проверить был ли загружен указанный Url.
* В переменную помещать значение _result()
* @param match Маска
* @param callback функция
*/
function BAS_is_load() {
const match = _function_argument('match')
const callback = _function_argument('callback')
is_load(match, callback)!
_function_return(_result())
}
/**
* Получить последний элемент кэша (BAS-функция)
* Получить последний элемент кэша для заданного Url и сохранить его в переменную.
* @param {string} match Маска
* @param {boolean} isBase64 Кодировать в base64
* @param {number} timeout Максимальное время выполнения задания, по умолчанию без передачи аргумента
*/
function BAS_get_cache() {
const match = _function_argument('match')
const timeout = _function_argument('timeout')
if (timeout) {
waiter_timeout_next(timeout)
}
wait_load(match)!
if (isBase64) {
cache_get_base64(match)!
}
else {
cache_get_string(match)!
}
_function_return(_result())
}
/**
* Получить все элементы кэша для заданного Url и сохранить их в список.
* Это действие не будет работать само по себе. Чтобы получить элементы кэша, вам нужно сначала использовать действие "Разрешить кэш", оно задаст страницы, которые будут кэшироваться. Затем нужно загрузить страницу или выполнить действия в браузере, которые будут вызывать загрузку страницы, например ввод текста или клики мышью. Только после выполнения "Разрешить кэш" и загрузки страницы вы можете использовать это действие для получения кеша.
* Старайтесь не использовать маску "*" для действия "Разрешить кэш", вместо этого укажите маску как можно более подробно, чтобы сохранять меньше элементов кэша. Добавление страницы в кеш является ресурсоемкой задачей, ограничивая количество элементов, вы можете оптимизировать скрипт.
* Результатом этого действия является список, используйте модуль "Список" для его обработки.
* Если вы хотите получить только последний элемент кэша, используйте действие "Получить последний элемент кэша".
* Каждый элемент кэша - это объект со следующими свойствами:
* "status" - целое число, содержит статус HTTP запроса.
* "request_headers" - список с заголовками запроса, отправленных браузером.
* "response_headers" - список с заголовками ответа, полученных от сервера.
* "body" - данные ответа в формате base64. Используйте действие "Base64" для их декодирования.
* "url" - url запроса.
* "post_data" - пост данные запроса в формате base64.
* "is_error" - значение true/false, указывает на наличие ошибки во время запроса.
* "error" - код ошибки в виде строки.
* "is_finished" - значение true/false, указывает был ли запрос завершен.
* @param {string} match Маска. Url, кэш для которого вы хотите получить. url может содержать символ *, который будет заменен любой последовательностью символов.
* Примеры:
* * - Получить весь кэш
* *url/part* - Получить кэш для url, который содержит url/part
* http://site.com/script.js - Получить кэш для заданного url
*/
function BAS_cache_get_all(match) {
const match = _function_argument('match')
BAS_cache_get_all(match)!
_function_return(JSON.parse(_result()))
}
