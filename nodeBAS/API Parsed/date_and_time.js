/**
* Миллисекунды В Дату
* Преобразовать количество миллисекунд с начала эпохи в дату.
* Количество миллисекунд при таком преобразовании отсчитывается с 1 января 1970 года, 00:00:00 UTC.
* @param {Date | string} value Дата и время либо строка
* @returns Date
*/
function BAS_parse_milliseconds(value) {
return _parse_date(value, "auto")
}
/**
* Дату в Миллисекунды
* Преобразовать дату в количество миллисекунд с начала эпохи.
* Количество миллисекунд при таком преобразовании отсчитывается с 1 января 1970 года, 00:00:00 UTC.
* @param {Date | string} value Дата и время либо строка
* @returns number
*/
function BAS_milliseconds_from_date(value) {
return _parse_date(value, "auto").getTime()
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
const date = new Date(
Date.UTC(year, month - 1, day, hour, minutes, seconds, milliseconds)
)
date.getTimezoneOffset = function () {
return parseInt(timezone)
}
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
return Math.floor(
(_parse_date(value1, "auto").getTime() -
_parse_date(value2, "auto").getTime()) /
1000
)
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
const date = _parse_date(value, "auto")
const newDate = new Date(date.getTime())
newDate.getTimezoneOffset = function () {
return parseInt(timezone)
}
return newDate
}
/**
* Получить Часовой Пояс Даты
* Получить часовой пояс существующей даты.
* @param {Date | string} value Строка с датой и временем
* @returns Date
*/
function BAS_date_get_timezone(value) {
return _parse_date(value, "auto").getTimezoneOffset()
}
/**
* День Месяца
* Получить день месяца из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns День месяца. От 1 до 31.
*/
function BAS_get_day_of_month(value) {
return parseInt(_format_date(value, "d"))
}
/**
* День Недели
* Получить день недели из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns День недели. От 1 до 7.
*/
function BAS_get_day_of_week(value) {
return parseInt(_format_date(value, "N"))
}
/**
* День гОда
* Получить день года из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns День года. От 1 до 366.
*/
function BAS_get_day_of_year(value) {
return parseInt(_format_date(value, "Z"))
}
/**
* Получить Год Из Даты
* Получить год из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns Год
*/
function BAS_get_year_from_date(value) {
return parseInt(_format_date(value, 'yyyy'))
}
/**
* Получить Месяц Из Даты
* Получить месяц из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns Месяц
*/
function BAS_get_month_from_date(value) {
return parseInt(_format_date(value, 'M'))
}
/**
* Получить Часы Из Даты
* Получить число часов из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns Часы
*/
function BAS_get_hours_from_date(value) {
return parseInt(_format_date(value, 'h'))
}
/**
* Получить Минуты Из Даты
* Получить число минут из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns Минуты
*/
function BAS_get_minutes_from_date(value) {
return parseInt(_format_date(value, 'm'))
}
/**
* Получить Секунды Из Даты
* Получить число секунд из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns Секунды
*/
function BAS_get_seconds_from_date(value) {
return parseInt(_format_date(value, 's'))
}
/**
* Получить Миллисекунды Из Даты
* Получить число миллисекунд из указанной даты.
* @param {Date | string} value Дата и время либо строка
* @returns Миллисекунды
*/
function BAS_get_milliseconds_from_date(value) {
return parseInt(_format_date(value, 'z'))
}
