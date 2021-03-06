/**
 * Ждать Полной Загрузки (async)
 * Ждать пока страица не будет загружена полностью
 */
declare function wait_async_load(): void

/**
 * Максимальное время выполнения задания, в миллисекундах (следующего действия)
 * Выполнять перед действием ожидания. Используйте действие 'Таймаут' (general_timeout) чтобы установить максимальное время ожидания по умолчанию.
 * @param timeout
 */
declare function waiter_timeout_next(timeout: number): void

/**
 * Ждать пока страница не будет загружена полностью.
 * (async)
 * Для выставления максимального времени выполнения использовать waiter_timeout_next, в миллисекундах
 */
declare function wait_async_load(): void

/**
 * Ждать Загрузки Url (async)
 * Ждать пока браузер не загрузит указанный URL.
 * Для выставления максимального времени выполнения использовать waiter_timeout_next, в миллисекундах
 */
declare function wait_load(): void

/**
 * Ждать адреса браузера (async)
 * Ждать пока адресная строка не будет содержать указанный URL.
 * Для выставления максимального времени выполнения использовать waiter_timeout_next, в миллисекундах
 */
declare function wait_url(): void

/**
 * Ждать текст (async)
 * Ждать пока на странице не появится определенный текст.
 * Для выставления максимального времени выполнения использовать waiter_timeout_next, в миллисекундах
 */
declare function wait_content(): void

/**
 * Ждать css (async)
 * Ждать пока определенный CSS-селектор не вернет непустой результат.
 * Для выставления максимального времени выполнения использовать waiter_timeout_next, в миллисекундах
 */
declare function wait_css(): void

/**
 * Спать (async)
 * Приостанавливает текущий поток на указанное количество миллисекунд.
 * @param milliseconds Время сна в миллисекундах
 * @param callback функция
 */
declare function sleep(milliseconds: number, callback: Function): void