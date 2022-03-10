/**
 * Строку В Дату
 * Преобразовать строку в дату и время используя заданный формат
 * @param value Строка с датой и временем
 * @param format 'auto' | 'yyyy-MM-dd' | 'hh:mm:ss' | 'yyyy-MM-ddThh:mm:ss'
 * Формат даты и времени
 */
declare function _parse_date(value: string, format: string): Date

/**
 * Дату В Строку
 * Преобразовать дату и время в строку используя заданный формат.
 * @param value Дата и время либо строка
 * @param format 'yyyy-MM-dd' | 'hh:mm:ss' | 'yyyy-MM-ddThh:mm:ss'
 * Формат даты и времени
 */
declare function _format_date(value: Date | string, format: string): string