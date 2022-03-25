const get_waiting_functions = (f) => {
	/**
* Ждать Полной Загрузки (async)
* Ждать пока страица не будет загружена полностью
* Для выставления максимального времени выполнения использовать waiter_timeout_next, в миллисекундах
*/
const BAS_wait_async_load = async (params) => await f("BAS_wait_async_load", params || {})

	/**
* Максимальное время выполнения задания, в миллисекундах (следующего действия)
* Выполнять перед действием ожидания. Используйте действие 'Таймаут' (general_timeout) чтобы установить максимальное время ожидания по умолчанию.
* @param timeout
*/
const BAS_waiter_timeout_next = async (timeout) => await f("BAS_waiter_timeout_next", { timeout })

	/**
* Ждать Загрузки Url (async)
* Ждать пока браузер не загрузит указанный URL.
* Для выставления максимального времени выполнения использовать waiter_timeout_next, в миллисекундах
*/
const BAS_wait_load = async (params) => await f("BAS_wait_load", params || {})

	/**
* Ждать адреса браузера (async)
* Ждать пока адресная строка не будет содержать указанный URL.
* Для выставления максимального времени выполнения использовать waiter_timeout_next, в миллисекундах
*/
const BAS_wait_url = async (params) => await f("BAS_wait_url", params || {})

	/**
* Ждать текст (async)
* Ждать пока на странице не появится определенный текст.
* Для выставления максимального времени выполнения использовать waiter_timeout_next, в миллисекундах
*/
const BAS_wait_content = async (params) => await f("BAS_wait_content", params || {})

	/**
* Ждать css (async)
* Ждать пока определенный CSS-селектор не вернет непустой результат.
* Для выставления максимального времени выполнения использовать waiter_timeout_next, в миллисекундах
*/
const BAS_wait_css = async (params) => await f("BAS_wait_css", params || {})

	/**
* Спать (async)
* Приостанавливает текущий поток на указанное количество миллисекунд.
* @param milliseconds Время сна в миллисекундах
* @param callback функция
*/
const BAS_sleep = async (milliseconds, callback) => await f("BAS_sleep", { milliseconds, callback })

	/**
* Ждать Загрузки Файла
* Ждать окончания текущей загрузки.
* Для выставления максимального времени выполнения использовать waiter_timeout_next, в миллисекундах
*/
const wait_load_files = async (params) => await f("wait_load_files", params || {})

return {	BAS_wait_async_load,
	BAS_waiter_timeout_next,
	BAS_wait_load,
	BAS_wait_url,
	BAS_wait_content,
	BAS_wait_css,
	BAS_sleep,
	wait_load_files,
}
}

module.exports = get_waiting_functions