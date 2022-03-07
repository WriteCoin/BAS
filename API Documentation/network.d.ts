/**
 * Установить заголовок (async)
 * Установить заголовок запроса для последующих запросов браузера.
 * @param name Имя заголовка
 * @param value Значение заголовка
 * @param callback Функция
 */
declare function header(name: string, value: string, callback: Function): void

/**
 * Сохранить cookies (async)
 * Сохранить все куки браузера в переменную.
 * Сохранять в переменную со значением: "{\"cookies\":" + _result() + "}"
 */
declare function save_cookies(): void

/**
 * Разрешить кэш (async)
 * Добавлять содержимое страницы в кэш, если Url соответствует указанной маске. Работает только на страницах, которые будут загружены после вызова этого действия.
 * @param match Маска
 * @param callback Функция
 */
declare function cache_allow(match: string, callback: Function): void

/**
 * Запретить кэш (async)
 * Не добавлять содержимое страницы в кэш, если Url соответствует указанной маске. Работает только на страницах, которые будут загружены после вызова этого действия.
 * @param match Маска
 * @param callback функция
 */
declare function cache_deny(match: string, callback: Function): void

/**
 * Разрешать запрос (async)
 * Разрешить загрузку Url, если Url соответствует указанной маске. По умолчанию каждый Url загружается.
 * @param match Маска
 * @param callback функция
 */
declare function request_allow(match: string, callback: Function): void

/**
 * Запретить запрос (async)
 * Запретить загрузку Url, если Url соответствует указанной маске. По умолчанию каждый Url загружается.
 * @param match Маска
 * @param callback функция
 */
declare function request_deny(match: string, callback: Function): void

/**
 * Очистить кэшированные данные (async)
 * Удалить информацию о всех загруженных Url из кэша.
 */
declare function cache_data_clear(callback: Function): void

/**
 * Очистить маски (async)
 * Очистить все ранее добавленные маски кэша.
 */
declare function cache_masks_clear(callback: Function): void

/**
 * Получить статус запроса (async)
 * Получить статус запроса для указанного Url.
 * В переменную помещать значение _result()
 * @param match Маска
 * @param callback функция
 */
declare function cache_get_status(match: string, callback: Function): void

/**
 * Был ли запрос (async)
 * Проверить был ли загружен указанный Url.
 * В переменную помещать значение _result()
 * @param match Маска
 * @param callback функция
 */
declare function is_load(match: string, callback: Function): void

/**
 * Запретить всплывающие окна (async)
 * Запретить все всплывающие окна. Запретить конкретные окна можно с помощью действия Запретить запрос.
 */
declare function _restrict_popups(callback: Function): void

/**
 * Разрешить всплывающие окна (async)
 * Разрешить все всплывающие окна. Отменяет действие Запретить всплывающие окна.
 * @param callback функция
 */
declare function _allow_popups(callback: Function): void

/**
 * Разрешить загрузку файлов (async)
 * Разрешить все загрузки файлов. Отменяет действие Запретить загрузку файлов.
 * @param callback функция
 */
declare function _allow_downloads(callback: Function): void

