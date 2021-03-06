/**
* Установить месторасположение браузера по ип (BAS-функция)
* Установить часовой пояс и месторасположение браузера в те же значения, что и часовой пояс и месторасположение ip.
* Сайт может получать информацию о системном часовом поясе и местоположении с использованием внутреннего апи (пример 1 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset, пример 2 https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API). Это действие позволяет заменять значения часового пояса и местоположения, возвращаемые браузером.
* Full list of timezones can be found здесь https://en.wikipedia.org/wiki/List_of_UTC_time_offsets.
* Чтобы получать информацию об ip используется либо локальная база данных либо внешний сервис, смотрите раздел "Информация об IP" чтобы узнать больше.
* Рекомендуется использовать действие 'Прокси' вместо этого, потому что оно автоматически установит часовой пояс в браузере соответствии с текущим прокси.
*
* @param {string} ip Ip адрес
Эта строка должна содержать ip адрес. Ipv6 адреса должны быть заключены в квадратные скобки. Часовой пояс и месторасположение будут получены из выбранного ip, и настройки браузера будут обновлены соответственно этим значениям.
Примеры :
140.97.75.15 - Пример ipv4
140.97.75.15:8080 - Неправильно, ip адрес не может содержать порт.
[2a03:2880:f11c:8083:face:b00c:0:25de] - Пример ipv6
@param {boolean} change_timezone Изменить часовой пояс
Изменить часовой пояс браузера в соответствии с заданным ip. Например, если ip находится в Англии, то часовой пояс браузера будет изменен на UTC+00:00. Вы можете задать произвольное значение с помощью модуля 'Часовой пояс'.
Примеры :
true - Изменить часовой пояс.
false - Не изменять часовой пояс.
@param {boolean} change_location Изменить месторасположение
Измененить месторасположение(координаты) браузера в соответствии с заданным ip. Оно будет установлено в точку, близкую к долготе/широте ip. Вы можете задать произвольное значение с помощью модуля 'Часовой пояс'.
Примеры :
true - Запрос браузера на доступ к вашему месторасположению будет принят. Расположение браузера будет установлено в соответствии с ip.
false - Не менять месторасположение. Запрос браузера на доступ к вашему месторасположению будет отклонен.
@param {boolean} change_ip_web_rtc Изменить ip WebRTC
Заменить ip, возвращаемый WebRTC на заданный ip. Если вы хотите задать произвольное значение, используйте действие 'Настройки браузера'.
Примеры :
true - Включить WebRTC, заменить ip, возвращаемый WebRTC на заданный ip.
false - Не менять состояние WebRTC.
@param {boolean} change_browser_language Изменить язык браузера
Изменить язык браузера в зависимости от страны ip. Этот параметр изменит заголовок Accept-Language, а также свойства javascript navigator.language и navigator.languages. По умолчанию значение языка будет состоять из языка и кода страны, разделенными дефисом, например 'de-DE' для Германии. Это значение корректное, но большинство браузеров использует более сложные варианты. Если вы хотите, чтобы BAS выглядел как настоящий браузер, используйте сервис FingerprintSwitcher, он установит язык более в более естественное значение, например, для iPhone из Германии оно будет равно 'de, en;q=0.8, *;q=0.01'. Вы также можете установить это значение явно, используя действие 'Установить заголовок'
Примеры :
true - Изменить язык браузера в зависимости от страны ip.
false - Не изменять зык браузера, значение по умолчанию - 'en-US,en;q=0.9'.
@param {'database' | 'ip-api.com' | 'custom function'} ip_method Метод получения информации о IP
Метод, который будет использоваться для получения информации об IP.
Примеры :
database - Использовать внутреннюю базу данных, данный подход работает быстро и всегда доступен. Хотя база данных постоянно обновляется, этот метод может быть не самым точным по сравнению с другими.
ip-api.com - Использовать сервис ip-api.com. Бесплатная версия имеет ограничение - 45 запросов с одного IP. Pro версия не ограничена количеством запросов, но стоит 15$ в месяц.
custom function - Использовать отдельную BAS функцию для получения информации.
@param {string} ip_api_key Ключ ip-api.com. Может быть пустым.
Ключ от сервиса ip-api.com pro версии. Ключ доступен после покупки. Этот параметр используется только в том случае, если для параметра "Метод получения информации о IP" задано значение "ip-api.com".
Примеры :
Пустая строка - Использовать бесплатную версию
Ключ - Использовать pro версию
@param {Function} info_func Отдельная функция для получения информации об IP
Отдельная функция BAS, которая получает строку IP (входной параметр называется "Ip") и возвращает JSON с информацией об IP. Этот параметр используется только в том случае, если для параметра "Метод получения информации о IP" задано значение "custom function".
Примеры :
{
valid: true,
city: "Frankfurt am Main",
country: "DE",
dstoffset: -120,
offset: -60,
timezone: "Europe/Berlin",
longitude: 8.6843,
latitude: 50.1188
} - Пример JSON, который должна возвращать функция.
*/
function BAS_timezone_set_geo_location() {
const args = _arguments()
const ip = args.ip
const change_timezone = args.change_timezone
const change_location = args.change_location
const change_ip_web_rtc = args.change_ip_web_rtc
const change_browser_language = args.change_browser_language
const ip_method = args.ip_method || 'database'
const ip_api_key = args.ip_api_key || ''
const info_func = args.info_func
_call(_get_ip_info, [ip, ip_method, ip_api_key, info_func])!
IP_INFO = _result()
if(!IP_INFO["valid"])
fail("Failed to get ip info for " + ip);
_if(change_location, function(){
geolocation(IP_INFO["latitude"],IP_INFO["longitude"])!
})!
_if(change_timezone, function(){
_settings({"Timezone":(-IP_INFO["offset"]).toString(),"TimezoneName":IP_INFO["timezone"]})!
})!
_if(change_ip_web_rtc, function(){
_settings({"Webrtc":"replace","WebrtcIps": ip})!
})!
_if(change_browser_language, function(){
var country = IP_INFO["country"].toUpperCase()
var language = native("timezones", "country_to_language", country)
header("Accept-Language", language + "-" + country)!
_settings({"Fingerprints.Locale":IP_INFO["country"].toLowerCase()})!
})!
sleep(1000)!
}
/**
* Установить часовой пояс (BAS-функция)
* Установить часовой пояс браузера. Часовой пояс также можно изменить с помощью действия "Прокси".
* Сайт может получать информацию о системном часовом поясе, используя класс 'Date' https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset. Это действие позволяет заменить возвращаемые значения.
* Полный список смещений можно найти здесь https://en.wikipedia.org/wiki/List_of_UTC_time_offsets, список названий можно найти здесь https://en.wikipedia.org/wiki/List_of_tz_database_time_zones.
* Оставьте любое поле пустым, если вы не хотите менять его значение.
* Рекомендуется использовать действие 'Прокси' вместо этого, потому что оно автоматически установит часовой пояс в браузере соответствии с текущим прокси.
*
* @param {number} utc_offset Смещение относительно UTC. Может быть пустым
Смещение относительно UTC - это разница в минутах от универсального глобального времени(UTC) для определенного места и даты. Обратите внимание, что это значит, что смещение будет положительным для часового пояса, находящегося западнее часового пояса UTC и отрицательным — восточнее. Например, если ваш часовой пояс равен UTC+10:00 (австралийское восточное поясное время), то ему будет соответствовать значение -600, так как в 10 часах содержится 600 минут.
Примеры :
Пустая строка - Не устанавливать смещение относительно UTC
-60 - UTC+01:00 - Испания, Франция, Германия
-120 - UTC+02:00 - Финляндия, Румыния, Украина, Греция
@param {string} timezone_name Название часового пояса. Может быть пустым
Название часового пояса.
Примеры :
Пустая строка - Не задавать название часового пояса
Europe/Berlin
*/
function BAS_set_timezone() {
const args = _arguments()
const utc_offset = args.utc_offset || ''
const timezone_name = args.timezone_name || ''
var UpdatedSettings = {}
if(utc_offset.toString().length > 0)
{
UpdatedSettings["Timezone"] = (-parseInt(utc_offset)).toString()
}
if(timezone_name.toString().length > 0)
{
UpdatedSettings["TimezoneName"] = timezone_name
}
_settings(UpdatedSettings)!
sleep(1000)!
}
/**
* Установить координаты (BAS-функция)
* Установить месторасположение браузера. Месторасположение также можно изменить с помощью действия "Прокси".
* Сайт может получить информацию о вашем месторасположении используя данное апи https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API. Это действие позволяет заменяить месторасположение возвращаемое браузером.
* Использование этого действия не обязательно, чтобы скрыть ваше местоположение, потому что координаты могут быть получены только после того, как пользователь примет запрос от сайта в специальном всплывающем окне. По умолчанию, если вы не используете это действие, всплывающее окно отклоняется BAS
* Оставьте любое поле пустым, если вы не хотите менять его значение.
* Используйте параметр "Объект геолокации" для изменения возвращаемого объекта GeolocationCoordinates https://developer.mozilla.org/en-US/docs/Web/API/GeolocationCoordinates
* Рекомендуется использовать действие 'Прокси' вместо этого, потому что оно автоматически установит месторасположение браузера в соответствии с текущим прокси.
*
* @param {number} latitude Широта. Может быть пустым
Точные координаты вашего месторасположения. Это значение будет возвращено браузером в качестве ответа на запрос местоположения от сайта.
Примеры :
Пустая строка - Не устанавливать широту
10.433
* @param {number} longitude Долгота. Может быть пустым
Точные координаты вашего месторасположения. Это значение будет возвращено браузером в качестве ответа на запрос местоположения от сайта.
Примеры :
Пустая строка - Не устанавливать долготу
10.433
@param {Object} geolocation_object Объект геолокации
Это поле содержит свойства возвращаемого объекта геолокации. Изменяя этот объект, вы можете настроить, например, свойство accuracy или другие. Этот объект не должен включать latitude и longitude, они задаются через отдельные настройки.
*/
function BAS_timezone_set_coordinates() {
const args = _arguments()
const latitude = args.latitude || ''
const longitude = args.longitude || ''
const geolocation_object = args.geolocation_object || {
accuracy: 4413,
altitude: null,
altitudeAccuracy: null,
heading: null,
speed: null
}
_if(latitude.toString().length > 0 && longitude.toString().length > 0, function(){
geolocation(parseFloat(latitude),parseFloat(longitude))!
})!
geolocation_object({
accuracy: geolocation_object.accuracy || 4413,
altitude: geolocation_object.altitude || null,
altitudeAccuracy: geolocation_object.altitudeAccuracy || null,
heading: geolocation_object.heading || null,
speed: geolocation_object.speed || null
})!
sleep(1000)!
}
/**
* Сведения об ип (BAS-функция)
* Получить информацию для заданном ip, включает смещение относительно UTC, часовой пояс и другое.
* Чтобы получать информацию об ip используется либо локальная база данных либо внешний сервис, смотрите раздел "Информация об IP" чтобы узнать больше.
*
* @param {string} ip Ip адрес
Эта строка должна содержать ip адрес. Ipv6 адреса должны быть заключены в квадратные скобки.
Примеры :
140.97.75.15 - Пример ipv4
140.97.75.15:8080 - Неправильно, ip адрес не может содержать порт.
[2a03:2880:f11c:8083:face:b00c:0:25de] - Пример ipv6
@param {'database' | 'ip-api.com' | 'custom function'} Метод получения информации о IP
Метод, который будет использоваться для получения информации об IP.
Примеры :
database - Использовать внутреннюю базу данных, данный подход работает быстро и всегда доступен. Хотя база данных постоянно обновляется, этот метод может быть не самым точным по сравнению с другими.
ip-api.com - Использовать сервис ip-api.com. Бесплатная версия имеет ограничение - 45 запросов с одного IP. Pro версия не ограничена количеством запросов, но стоит 15$ в месяц.
custom function - Использовать отдельную BAS функцию для получения информации.
@param {string} ip_api_key Ключ ip-api.com. Может быть пустым.
Ключ от сервиса ip-api.com pro версии. Ключ доступен после покупки. Этот параметр используется только в том случае, если для параметра "Метод получения информации о IP" задано значение "ip-api.com".
Примеры :
Пустая строка - Использовать бесплатную версию
Ключ - Использовать pro версию
@param {Function} info_func Отдельная функция для получения информации об IP
Отдельная функция BAS, которая получает строку IP (входной параметр называется "Ip") и возвращает JSON с информацией об IP. Этот параметр используется только в том случае, если для параметра "Метод получения информации о IP" задано значение "custom function".
Примеры :
{
valid: true,
city: "Frankfurt am Main",
country: "DE",
dstoffset: -120,
offset: -60,
timezone: "Europe/Berlin",
longitude: 8.6843,
latitude: 50.1188
} - Пример JSON, который должна возвращать функция.
*
* @returns Object {
*valid: boolean - Ip распознан корректно
Эта переменная возвращает значение, которое идентифицирует, был ли ip распознан корректно. Только если значение этой переменной равно true, могут быть использованы другие возвращаемые значения.
Примеры :
true - Информация об ip получена корректно
false - Не удалось получить сведения об ip
country: string - Страна
Aббревиатура страны
Примеры :
US - США
RU - Российская Федерация
city: string - Город
Город
Примеры :
Boston
Moscow
latitude: number - Latitude
Координаты ip.
Примеры :
10.433
longitude: number - Longitude
Координаты ip.
Примеры :
10.433
timezone: string - Часовой пояс
Название часового пояса.
Примеры :
Europe/Lisbon
Asia/Dubai
offset: number - Смещение
Смещение относительно UTC - это разница в минутах между универсальным глобального времени(UTC) и локальным временем данного ip. Обратите внимание, что это значит, что смещение будет положительным для часового пояса, находящегося западнее часового пояса UTC и отрицательным — восточнее. Например, если ваш часовой пояс равен UTC+10:00 (австралийское восточное поясное время), то ему будет соответствовать значение -600, так как в 10 часах содержится 600 минут.
Примеры :
-60 - UTC+01:00 - Испания, Франция, Германия
-120 - UTC+02:00 - Финляндия, Румыния, Украина, Греция
dst_offset: number - Смещение летнего времени
Смещение для летнего времени.
* }
*/
function BAS_timezone_get_ip_info() {
const args = _arguments()
const ip = args.ip
const ip_method = args.ip_method || 'database'
const ip_api_key = args.ip_api_key || ''
const info_func = args.info_func
_call(_get_ip_info, [ip, ip_method, ip_api_key, info_func])!
var json = _result()
VAR_IPINFO_VALID = json["valid"]
VAR_IPINFO_COUNTRY = json["country"]
VAR_IPINFO_CITY = json["city"]
VAR_IPINFO_LATITUDE = json["latitude"]
VAR_IPINFO_LONGITUDE = json["longitude"]
VAR_IPINFO_TIMEZONE = json["timezone"]
VAR_IPINFO_OFFSET = json["offset"]
VAR_IPINFO_DST_OFFSET = json["dstoffset"]
const result = {
valid: VAR_IPINFO_VALID,
country: VAR_IPINFO_COUNTRY,
city: VAR_IPINFO_CITY,
latitude: VAR_IPINFO_LATITUDE,
longitude: VAR_IPINFO_LONGITUDE,
timezone: VAR_IPINFO_TIMEZONE,
offset: VAR_IPINFO_OFFSET,
dst_offset: VAR_IPINFO_DST_OFFSET
}
_function_return(result)
return result
}
