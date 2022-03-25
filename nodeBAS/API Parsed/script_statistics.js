/**
* Номер потока
* Получить номер текущего работающего потока.
* @returns номер потока
*/
function BAS_thread_number() {
const result = thread_number()
_function_return(result)
return result
}
/**
* Успешных выполнений
* Получить количество успешных выполнений текущего скрипта.
*/
function BAS_success_number() {
const result = success_number()
_function_return(result)
return result
}
/**
* Неудачных выполнений
* Получить количество неудачных выполнений текущего скрипта.
*/
function BAS_fail_number() {
const result = fail_number()
_function_return(result)
return result
}
