/**
* Строку В Дату
* Преобразовать строку в дату и время используя заданный формат
* @param value Строка с датой и временем
* @param format 'auto' | 'yyyy-MM-dd' | 'hh:mm:ss' | 'yyyy-MM-ddThh:mm:ss'
* Формат даты и времени
*/
function BAS_parse_date(value, format) {
const value = _function_argument('value')
const format = _function_argument('format')
const result = _parse_date(value, format)
_function_return(result)
return result
}
/**
* Дату В Строку
* Преобразовать дату и время в строку используя заданный формат.
* @param value Дата и время либо строка
* @param format 'yyyy-MM-dd' | 'hh:mm:ss' | 'yyyy-MM-ddThh:mm:ss'
* Формат даты и времени
*/
function BAS_format_date(value, format) {
const value = _function_argument('value')
const format = _function_argument('format')
const result = _format_date(value, format)
_function_return(result)
return result
}
/**
* Миллисекунды В Дату
* Преобразовать количество миллисекунд с начала эпохи в дату.
* Количество миллисекунд при таком преобразовании отсчитывается с 1 января 1970 года, 00:00:00 UTC.
* @param {Date | string} value Дата и время либо строка
* @returns Date
*/
function BAS_parse_milliseconds(value) {
const value = _function_argument('value') || value
const result = _parse_date(value, "auto")
_function_return(result)
return result
}
/**
* Дату в Миллисекунды
* Преобразовать дату в количество миллисекунд с начала эпохи.
* Количество миллисекунд при таком преобразовании отсчитывается с 1 января 1970 года, 00:00:00 UTC.
* @param {Date | string} value Дата и время либо строка
* @returns number
*/
function BAS_milliseconds_from_date(value) {
const value = _function_argument('value') || value
const result = _parse_date(value, "auto").getTime()
_function_return(result)
return result
}
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
function BAS_create_date(
year,
month,
day,
hour,
minutes,
seconds,
milliseconds,
timezone
) {
const year = _function_argument('year') || year
const month = _function_argument('month') || month
const day = _function_argument('day') || day
const hour = _function_argument('hour') || hour
const minutes = _function_argument('minutes') || minutes
const seconds = _function_argument('seconds') || seconds
const milliseconds = _function_argument('milliseconds') || milliseconds
const timezone = _function_argument('timezone') || timezone
const date = new Date(
Date.UTC(year, month - 1, day, hour, minutes, seconds, milliseconds)
)
date.getTimezoneOffset = function () {
return parseInt(timezone)
}
_function_return(date)
return date
}
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
function BAS_change_date(
value,
year,
month,
day,
hour,
minutes,
seconds,
milliseconds
) {
const value = _function_argument('value') || value
const year = _function_argument('year') || year
const month = _function_argument('month') || month
const day = _function_argument('day') || day
const hour = _function_argument('hour') || hour
const minutes = _function_argument('minutes') || minutes
const seconds = _function_argument('seconds') || seconds
const milliseconds = _function_argument('milliseconds') || milliseconds
const date = _parse_date(value, "auto")
const offset = date.getTimezoneOffset()
const newDate = new Date(date.getTime())
newDate.getTimezoneOffset = function () {
return offset
}
if (year !== -1) newDate.setFullYear(year)
if (month !== -1) newDate.setMonth(month - 1)
if (day !== -1) newDate.setDate(day)
if (hour !== -1) newDate.setHours(hour)
if (minutes !== -1) newDate.setMinutes(minutes)
if (seconds !== -1) newDate.setSeconds(seconds)
if (milliseconds !== -1) newDate.setMilliseconds(milliseconds)
_function_return(newDate)
return newDate
}
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
function BAS_add_time(value, seconds, minutes, hours, days) {
const value = _function_argument('value') || value
const seconds = _function_argument('seconds') || seconds
const minutes = _function_argument('minutes') || minutes
const hours = _function_argument('hours') || hours
const days = _function_argument('days') || days
const date = _parse_date(value, "auto")
const offset = date.getTimezoneOffset()
const newDate = new Date(
date.getTime() +
seconds * 1000 +
minutes * 1000 * 60 +
hours * 1000 * 60 * 60 +
days * 1000 * 60 * 60 * 24
)
newDate.getTimezoneOffset = function () {
return offset
}
_function_return(newDate)
return newDate
}
/**
* Разница Между Датами
* Получить разницу в секундах между указанными датами.
* @param {string | Date} value1 Уменьшаемая дата и время либо строка
* @param {string | Date} value2 Вычитаемая дата и время либо строка
* @returns number
*/
function BAS_difference_between_dates(value1, value2) {
const value1 = _function_argument('value1') || value1
const value2 = _function_argument('value2') || value2
const result = Math.floor(
(_parse_date(value1, "auto").getTime() -
_parse_date(value2, "auto").getTime()) /
1000
)
_function_return(result)
return result
}
/**
* Дата Сейчас
* Получить текущую дату и время
* @returns Date
*/
function BAS_current_date() {
const date = _parse_date(Date.now(), "auto")
date.getTimezoneOffset = function () {
return parseInt(netive("datetime", "systemtimezone", ""))
}
_function_return(date)
return date
}
/**
* Изменить Часовой Пояс Даты
* Изменить часовой пояс существующей даты.
* @param {Date | string} value Строка с датой и временм
* @param {int} timezone Часовой пояс как смещение от UTC в минутах
* @returns Date
*/
function BAS_date_change_timezone(value, timezone) {
const value = _function_argument('value') || value
const timezone = _function_argument('timezone') || timezone
const date = _parse_date(value, "auto")
const newDate = new Date(date.getTime())
newDate.getTimezoneOffset = function () {
return parseInt(timezone)
}
_function_return(newDate)
return newDate
}
/**
* Получить Часовой Пояс Даты
* Получить часовой пояс существующей даты.
* @param {Date | string} value Строка с датой и временем
* @returns Date
*/
function BAS_date_get_timezone(value) {
const value = _function_argument('value') || value
const result = _parse_date(value, "auto").getTimezoneOffset()
_function_return(result)
return result
}
/**
* День Месяца
* Получить день месяца из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns День месяца. От 1 до 31.
*/
function BAS_get_day_of_month(value) {
const value = _function_argument('value') || value
const result = parseInt(_format_date(value, "d"))
_function_return(result)
return result
}
/**
* День Недели
* Получить день недели из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns День недели. От 1 до 7.
*/
function BAS_get_day_of_week(value) {
const value = _function_argument('value') || value
const result = parseInt(_format_date(value, "N"))
_function_return(result)
return result
}
/**
* День Года
* Получить день года из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns День года. От 1 до 366.
*/
function BAS_get_day_of_year(value) {
const value = _function_argument('value') || value
const result = parseInt(_format_date(value, "Z"))
_function_return(result)
return result
}
/**
* Получить Год Из Даты
* Получить год из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns Год
*/
function BAS_get_year_from_date(value) {
const value = _function_argument('value') || value
const result = parseInt(_format_date(value, 'yyyy'))
_function_return(result)
return result
}
/**
* Получить Месяц Из Даты
* Получить месяц из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns Месяц
*/
function BAS_get_month_from_date(value) {
const value = _function_argument('value') || value
const result = parseInt(_format_date(value, 'M'))
_function_return(result)
return result
}
/**
* Получить Часы Из Даты
* Получить число часов из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns Часы
*/
function BAS_get_hours_from_date(value) {
const value = _function_argument('value') || value
const result = parseInt(_format_date(value, 'h'))
_function_return(result)
return result
}
/**
* Получить Минуты Из Даты
* Получить число минут из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns Минуты
*/
function BAS_get_minutes_from_date(value) {
const value = _function_argument('value') || value
const result = parseInt(_format_date(value, 'm'))
_function_return(result)
return result
}
/**
* Получить Секунды Из Даты
* Получить число секунд из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns Секунды
*/
function BAS_get_seconds_from_date(value) {
const value = _function_argument('value') || value
const result = parseInt(_format_date(value, 's'))
_function_return(result)
return result
}
/**
* Получить Миллисекунды Из Даты
* Получить число миллисекунд из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns Миллисекунды
*/
function BAS_get_milliseconds_from_date(value) {
const value = _function_argument('value') || value
const result = parseInt(_format_date(value, 'z'))
_function_return(result)
return result
}
