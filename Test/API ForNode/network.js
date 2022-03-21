const get_network_functions = (f) => {
	/**
* Сохранить cookies (BAS-функция)
* Возвращает сохраненные куки браузера
*/
const BAS_save_cookies = async (params) => await f("BAS_save_cookies", params)

	/**
*/
const get_cookies = async (cookies) => await f("get_cookies", { cookies })

	/**
* Загрузить cookies (BAS-функция)
* Установить куки для браузера.
* @param {string} cookies Cookies
*/
const BAS_load_cookies = async (params) => await f("BAS_load_cookies", params)

	/**
* Загрузить cookies из http клиента (BAS-функция)
* Загрузить cookies из http клиента в браузер.
*/
const BAS_load_cookies_from_http_client = async (params) => await f("BAS_load_cookies_from_http_client", params)

	/**
* Получить статус запроса (BAS-функция)
* Получить статус запроса для указанного Url.
* @param match Маска
* @param callback функция
* @returns статус запроса
*/
const BAS_cache_get_status = async (params) => await f("BAS_cache_get_status", params)

	/**
* Был ли запрос (BAS-функция)
* Проверить был ли загружен указанный Url.
* В переменную помещать значение _result()
* @param match Маска
* @param callback функция
*/
const BAS_is_load = async (params) => await f("BAS_is_load", params)

	/**
* Получить последний элемент кэша (BAS-функция)
* Получить последний элемент кэша для заданного Url и сохранить его в переменную.
* @param {string} match Маска
* @param {boolean} isBase64 Кодировать в base64
* @param {number} timeout Максимальное время выполнения задания, по умолчанию без передачи аргумента
*/
const BAS_get_cache = async (params) => await f("BAS_get_cache", params)

	/**
* Получить все элементы кэша для заданного Url и сохранить их в список.
* Это действие не будет работать само по себе. Чтобы получить элементы кэша, вам нужно сначала использовать действие "Разрешить кэш", оно задаст страницы, которые будут кэшироваться. Затем нужно загрузить страницу или выполнить действия в браузере, которые будут вызывать загрузку страницы, например ввод текста или клики мышью. Только после выполнения "Разрешить кэш" и загрузки страницы вы можете использовать это действие для получения кеша.
* Старайтесь не использовать маску "*" для действия "Разрешить кэш", вместо этого укажите маску как можно более подробно, чтобы сохранять меньше элементов кэша. Добавление страницы в кеш является ресурсоемкой задачей, ограничивая количество элементов, вы можете оптимизировать скрипт.
* Результатом этого действия является список, используйте модуль "Список" для его обработки.
* Если вы хотите получить только последний элемент кэша, используйте действие "Получить последний элемент кэша".
* Каждый элемент кэша - это объект со следующими свойствами:
* "status" - целое число, содержит статус HTTP запроса.
* "request_headers" - список с заголовками запроса, отправленных браузером.
* "response_headers" - список с заголовками ответа, полученных от сервера.
* "body" - данные ответа в формате base64. Используйте действие "Base64" для их декодирования.
* "url" - url запроса.
* "post_data" - пост данные запроса в формате base64.
* "is_error" - значение true/false, указывает на наличие ошибки во время запроса.
* "error" - код ошибки в виде строки.
* "is_finished" - значение true/false, указывает был ли запрос завершен.
* @param {string} match Маска. Url, кэш для которого вы хотите получить. url может содержать символ *, который будет заменен любой последовательностью символов.
* Примеры:
* * - Получить весь кэш
* *url/part* - Получить кэш для url, который содержит url/part
* http://site.com/script.js - Получить кэш для заданного url
*/
const BAS_cache_get_all = async (match) => await f("BAS_cache_get_all", { match })

return {	BAS_save_cookies,
	get_cookies,
	BAS_load_cookies,
	BAS_load_cookies_from_http_client,
	BAS_cache_get_status,
	BAS_is_load,
	BAS_get_cache,
	BAS_cache_get_all,
}
}

module.exports = get_network_functions