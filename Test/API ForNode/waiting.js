const get_waiting_functions = (f) => {
	/**
* Ждать Загрузки Файла
* Ждать окончания текущей загрузки.
* Для выставления максимального времени выполнения использовать waiter_timeout_next, в миллисекундах
*/
const wait_load_files = async (params) => await f("wait_load_files", params)

return {	wait_load_files,
}
}

module.exports = get_waiting_functions