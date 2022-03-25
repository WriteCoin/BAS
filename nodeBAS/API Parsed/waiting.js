/**
* Ждать Полной Загрузки (async)
* Ждать пока страица не будет загружена полностью
* Для выставления максимального времени выполнения использовать waiter_timeout_next, в миллисекундах
*/
function BAS_wait_async_load() {
wait_async_load()!
}
/**
* Максимальное время выполнения задания, в миллисекундах (следующего действия)
* Выполнять перед действием ожидания. Используйте действие 'Таймаут' (general_timeout) чтобы установить максимальное время ожидания по умолчанию.
* @param timeout
*/
function BAS_waiter_timeout_next(timeout) {
const timeout = _function_argument('timeout') || timeout
waiter_timeout_next(timeout)
}
/**
* Ждать Загрузки Url (async)
* Ждать пока браузер не загрузит указанный URL.
* Для выставления максимального времени выполнения использовать waiter_timeout_next, в миллисекундах
*/
function BAS_wait_load() {
wait_load()!
}
/**
* Ждать адреса браузера (async)
* Ждать пока адресная строка не будет содержать указанный URL.
* Для выставления максимального времени выполнения использовать waiter_timeout_next, в миллисекундах
*/
function BAS_wait_url() {
wait_url()!
}
/**
* Ждать текст (async)
* Ждать пока на странице не появится определенный текст.
* Для выставления максимального времени выполнения использовать waiter_timeout_next, в миллисекундах
*/
function BAS_wait_content() {
wait_content()!
}
/**
* Ждать css (async)
* Ждать пока определенный CSS-селектор не вернет непустой результат.
* Для выставления максимального времени выполнения использовать waiter_timeout_next, в миллисекундах
*/
function BAS_wait_css() {
wait_css()!
}
/**
* Спать (async)
* Приостанавливает текущий поток на указанное количество миллисекунд.
* @param milliseconds Время сна в миллисекундах
* @param callback функция
*/
function BAS_sleep(milliseconds, callback) {
const milliseconds = _function_argument('milliseconds') || milliseconds
const callback = _function_argument('callback') || (callback || function() {})
sleep(milliseconds, callback)!
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
return filepath
}
