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
