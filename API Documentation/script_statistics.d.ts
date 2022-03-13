/**
 * Номер потока
 * Получить номер текущего работающего потока.
 * @returns номер потока
 */
declare function thread_number(): number

/**
 * Успешных выполнений
 * Получить количество успешных выполнений текущего скрипта.
 */
declare function success_number(): number

/**
 * Неудачных выполнений
 * Получить количество неудачных выполнений текущего скрипта.
 */
declare function fail_number(): number