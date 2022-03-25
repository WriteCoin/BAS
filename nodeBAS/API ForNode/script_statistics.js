const get_script_statistics_functions = (f) => {
	/**
* Номер потока
* Получить номер текущего работающего потока.
* @returns номер потока
*/
const BAS_thread_number = async (params) => await f("BAS_thread_number", params || {})

	/**
* Успешных выполнений
* Получить количество успешных выполнений текущего скрипта.
*/
const BAS_success_number = async (params) => await f("BAS_success_number", params || {})

	/**
* Неудачных выполнений
* Получить количество неудачных выполнений текущего скрипта.
*/
const BAS_fail_number = async (params) => await f("BAS_fail_number", params || {})

return {	BAS_thread_number,
	BAS_success_number,
	BAS_fail_number,
}
}

module.exports = get_script_statistics_functions