const get_date_and_time_functions = (f) => {
	/**
* Строку В Дату
* Преобразовать строку в дату и время используя заданный формат
* @param value Строка с датой и временем
* @param format 'auto' | 'yyyy-MM-dd' | 'hh:mm:ss' | 'yyyy-MM-ddThh:mm:ss'
* Формат даты и времени
*/
const BAS_parse_date = async (value, format) => await f("BAS_parse_date", { value, format })

	/**
* Дату В Строку
* Преобразовать дату и время в строку используя заданный формат.
* @param value Дата и время либо строка
* @param format 'yyyy-MM-dd' | 'hh:mm:ss' | 'yyyy-MM-ddThh:mm:ss'
* Формат даты и времени
*/
const BAS_format_date = async (value, format) => await f("BAS_format_date", { value, format })

	/**
* Миллисекунды В Дату
* Преобразовать количество миллисекунд с начала эпохи в дату.
* Количество миллисекунд при таком преобразовании отсчитывается с 1 января 1970 года, 00:00:00 UTC.
* @param {Date | string} value Дата и время либо строка
* @returns Date
*/
const BAS_parse_milliseconds = async (value) => await f("BAS_parse_milliseconds", { value })

	/**
* Дату в Миллисекунды
* Преобразовать дату в количество миллисекунд с начала эпохи.
* Количество миллисекунд при таком преобразовании отсчитывается с 1 января 1970 года, 00:00:00 UTC.
* @param {Date | string} value Дата и время либо строка
* @returns number
*/
const BAS_milliseconds_from_date = async (value) => await f("BAS_milliseconds_from_date", { value })

	/**
* Создать Дату
* Создать новый объект даты и времени, используя указанные параметры.
* @param {number} year Год
* @param {number} month Месяц. От 1 до 12
* @param {number} day День. От 1 до 31
* @param {number} hour Час. От 0 до 23
* @param {number} minutes Минуты. От 0 до 59
* @param {number} seconds Секунды. От 0 до 59
* @param {number} milliseconds Миллисекунды. От 0 до 999
* @param {number} timezone Часовой пояс как смещение от UTC в минутах
* @returns Date
*/
const BAS_create_date = async (
year, 
month, 
day, 
hour, 
minutes, 
seconds, 
milliseconds, 
timezone
) => await f("BAS_create_date", { 
year, 
month, 
day, 
hour, 
minutes, 
seconds, 
milliseconds, 
timezone
 })

	/**
* Изменить Дату
* Изменить существующий объект даты и времени, используя указанные параметры.
* Это действие может изменять год, месяц или другие части даты. Оставьте параметры равными -1 если вы не хотите их менять.
* @param {string | Date} value Строка с датой и временем
* @param {number} year Год
* @param {number} month Месяц. От 1 до 12
* @param {number} day День. От 1 до 31
* @param {number} hour Час. От 0 до 23
* @param {number} minutes Минуты. От 0 до 59
* @param {number} seconds Секунды. От 0 до 59
* @param {number} milliseconds Миллисекунды. От 0 до 999
* @returns Date
*/
const BAS_change_date = async (
value, 
year, 
month, 
day, 
hour, 
minutes, 
seconds, 
milliseconds
) => await f("BAS_change_date", { 
value, 
year, 
month, 
day, 
hour, 
minutes, 
seconds, 
milliseconds
 })

	/**
* Добавить Секунды к Дате
* Добавить указанное количество секунд к существующей дате.
* @param {string} value Дата и время либо строка
* @param {int} seconds Прибавить секунд. Может быть отрицательным.
* @param {int} minutes Прибавить минут. Может быть отрицательным
* @param {int} hours Прибавить часов. Может быть отрицательным.
* @param {int} days Прибавить дней. Может быть отрицательным
* @returns Date
*/
const BAS_add_time = async (value, seconds, minutes, hours, days) => await f("BAS_add_time", { value, seconds, minutes, hours, days })

	/**
* Разница Между Датами
* Получить разницу в секундах между указанными датами.
* @param {string | Date} value1 Уменьшаемая дата и время либо строка
* @param {string | Date} value2 Вычитаемая дата и время либо строка
* @returns number
*/
const BAS_difference_between_dates = async (value1, value2) => await f("BAS_difference_between_dates", { value1, value2 })

	/**
* Дата Сейчас
* Получить текущую дату и время
* @returns Date
*/
const BAS_current_date = async (params) => await f("BAS_current_date", params || {})

	/**
* Изменить Часовой Пояс Даты
* Изменить часовой пояс существующей даты.
* @param {Date | string} value Строка с датой и временм
* @param {int} timezone Часовой пояс как смещение от UTC в минутах
* @returns Date
*/
const BAS_date_change_timezone = async (value, timezone) => await f("BAS_date_change_timezone", { value, timezone })

	/**
* Получить Часовой Пояс Даты
* Получить часовой пояс существующей даты.
* @param {Date | string} value Строка с датой и временем
* @returns Date
*/
const BAS_date_get_timezone = async (value) => await f("BAS_date_get_timezone", { value })

	/**
* День Месяца
* Получить день месяца из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns День месяца. От 1 до 31.
*/
const BAS_get_day_of_month = async (value) => await f("BAS_get_day_of_month", { value })

	/**
* День Недели
* Получить день недели из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns День недели. От 1 до 7.
*/
const BAS_get_day_of_week = async (value) => await f("BAS_get_day_of_week", { value })

	/**
* День Года
* Получить день года из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns День года. От 1 до 366.
*/
const BAS_get_day_of_year = async (value) => await f("BAS_get_day_of_year", { value })

	/**
* Получить Год Из Даты
* Получить год из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns Год
*/
const BAS_get_year_from_date = async (value) => await f("BAS_get_year_from_date", { value })

	/**
* Получить Месяц Из Даты
* Получить месяц из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns Месяц
*/
const BAS_get_month_from_date = async (value) => await f("BAS_get_month_from_date", { value })

	/**
* Получить Часы Из Даты
* Получить число часов из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns Часы
*/
const BAS_get_hours_from_date = async (value) => await f("BAS_get_hours_from_date", { value })

	/**
* Получить Минуты Из Даты
* Получить число минут из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns Минуты
*/
const BAS_get_minutes_from_date = async (value) => await f("BAS_get_minutes_from_date", { value })

	/**
* Получить Секунды Из Даты
* Получить число секунд из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns Секунды
*/
const BAS_get_seconds_from_date = async (value) => await f("BAS_get_seconds_from_date", { value })

	/**
* Получить Миллисекунды Из Даты
* Получить число миллисекунд из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns Миллисекунды
*/
const BAS_get_milliseconds_from_date = async (value) => await f("BAS_get_milliseconds_from_date", { value })

return {	BAS_parse_date,
	BAS_format_date,
	BAS_parse_milliseconds,
	BAS_milliseconds_from_date,
	BAS_create_date,
	BAS_change_date,
	BAS_add_time,
	BAS_difference_between_dates,
	BAS_current_date,
	BAS_date_change_timezone,
	BAS_date_get_timezone,
	BAS_get_day_of_month,
	BAS_get_day_of_week,
	BAS_get_day_of_year,
	BAS_get_year_from_date,
	BAS_get_month_from_date,
	BAS_get_hours_from_date,
	BAS_get_minutes_from_date,
	BAS_get_seconds_from_date,
	BAS_get_milliseconds_from_date,
}
}

module.exports = get_date_and_time_functions