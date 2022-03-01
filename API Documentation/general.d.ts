/**
 * Получить параметр функции
 * @param arg параметр
 */
declare function _function_argument(arg: string): any

/**
 * Вернуть значение функции
 * @param value значение функции
 */
declare function _function_return(value: any): void

/**
 * Получить возвращаемое значение функции, после ее вызова
 */
declare function _result_function(): any

/**
 * Вызвать функцию (async)
 * @param func функция
 * @param params объект с параметрами
 */
declare function _call_function(func: Function, params: Object): void

/**
 * Получить результат действий
 */
declare function _result(): void