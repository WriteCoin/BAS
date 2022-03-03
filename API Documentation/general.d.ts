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
 * Вызвать функцию BAS (async)
 * @param func функция
 * @param params объект с параметрами
 */
declare function _call_function(func: Function, params: Object): void

/**
 * Получить результат действий
 */
declare function _result(): void

/**
 * Завершить поток с успешным результатом. 
 * Каждый поток в БАС может завершиться либо успешно либо с ошибкой.
 * В случае если все действия выполнены правильно, БАС устанавливает статус завершения успешным для этого потока.
 * Важно понимать что это действие останавливает только текущий поток, а не весь скрипт.
 * Вы можете установить статус завершения успешным и остановить поток с помощью этого действия
 * @param message Сообщение об успехе
 */
declare function success(message: string): void

/**
 * Завершить поток с неуспешным результатом.
 * Каждый поток в БАС может завершиться либо успешно либо с ошибкой.
 * В случае если одно из действий выполняется неправильно, поток будет остановлен с ошибочным статусом.
 * Вы также можете прервать поток и установить сообщение об ошибке с помощью этого действия
 * Важно понимать что это действие останавливает только текущий поток, а не весь скрипт.
 * @param text Сообщение об ошибке
 * @param dont_create_more Не перезапускать поток
 */
declare function fail_user(text: string, dont_create_more: boolean): void

/**
 * Это действие завершает весь скрипт, а не только отдельный поток, Используйте его в случае возникновения критической ошибки и если скрипт не может быть продолжен ни при каких обстоятельствах. Например, если ключ API к какому-то сервису не подходит.
 * БАС тоже используют это действие в случае отсутствия ресурса, таким образом, если пользователь не задал файл с прокси, скрипт закончится мгновенно.
 * Есть два режима работы этого действия. Первый режим - это  мгновенное завершение, Это означает что скрипт завершится в ту же самую секунду, в которую вызвано это действие, каждый поток также остановиться мгновенно даже если он выполнял какое-то важное задание. Второй режим -  это плавное завершение потоков, в этом случае БАС будет ждать пока все потоки закончат свою работу, и только потом завершить скрипт. Второй режим полезен в том случае если вы не хотите потерять важных данных, например, номера телефонов или почтовые адреса.
 * @param text Сообшение об ошибке
 * @param instant Завершить скрипт мгновенно
 */
declare function die(text: string, instant: boolean): void

/**
 * (async)
 * Установить метку так, чтобы точка выполнения могла быть перенесена к этой метки позже.
 *  Метки нужны чтобы перенести точку выполнения из одного места в другое.
 Чтобы использовать метки сначала вы должны выполнить "установить метку"(данное действие) в том месте, в которое вы хотите переместить точку выполнения впоследствии, затем вам нужно использовать действие перейти к метке (screen)
 С помощью меток вы можете перемещать точку выполнения в циклы, условия, функции. Если вы перемещаете метку внутрь цикла, тогда переменная [[CYCLE_INDEX]] может иметь неправильное значение, и после выполнения тела цикла он завершит свою работу, а выполнение продолжится на действии установленном после цикла.
 Одним из примеров использования меток может служить установка метки в начале работы потока и возвращения к ней при некотором условии.
 Не рекомендовано использовать метки очень часто, если вы переборщите с ними, скрипт может стать нечитаемым и его сложно будет изменять. Лучше вместо этого использовать функции, если только вы не можете обойтись без меток.
 * @param label Метка
 */
declare function _set_goto_label(label: string): void

/**
 * (async)
 * Переместить точку выполнения к метке ранее заданной с помощью действия 'Установить метку'.
 Метки нужны чтобы перенести точку выполнения из одного места в другое.
 Чтобы использовать метки сначала вы должны выполнить "установить метку" в том месте, в которое вы хотите переместить точку выполнения впоследствии, затем вам нужно использовать "перейти к метке"(данное действие) (screen)
 С помощью меток вы можете перемещать точку выполнения в циклы, условия, функции. Если вы перемещаете метку внутрь цикла, тогда переменная [[CYCLE_INDEX]] может иметь неправильное значение, и после выполнения тела цикла он завершит свою работу, а выполнение продолжится на действии установленном после цикла.
 Одним из примеров использования меток может служить установка метки в начале работы потока и возвращения к ней при некотором условии.
 Не рекомендовано использовать метки очень часто, если вы переборщите с ними, скрипт может стать нечитаемым и его сложно будет изменять. Лучше вместо этого использовать функции, если только вы не можете обойтись без меток.
 * @param label Метка
 * @param offset смещение
 * @param reverse массив
 * @param callback функция
 */
declare function _long_goto(label: string, offset: number, reverse: Array, callback: Function): void

/**
 * Вызов функции в несколько потоков (async)
 * Выполнить функцию заданное число раз с заданным количеством потоков. Это можно представить как запуск другого скрипта внутри текущего потока.
 После того, как BAS начнет выполнять это действие, он запустит указанное количество потоков с заданной функцией. Поток, который вызвал это действие, останавливается до тех пор, пока не будет достигнут заданное количество успешных выполнений или заданное количество неудачных выполнений, а другие потоки продолжают выполнение.
 Недавно начатые потоки не знают о переменных или состоянии браузера в потоке, который их запускали, поэтому обмен данными между стартовым потоком и недавно созданными может осуществляться только с помощью глобальных переменных или ресурсов.
 Пример #1. У вас есть скрипт, который парсит список ссылок и должен получить их содержимое. Конечно, вы можете создать цикл, и перебрать все ссылки одна за другой. Но в этом случае ссылки будут обрабатываться последовательно. С помощью данного действия вы можете обработать их параллельно. Создайте ресурс, поместите туда все ссылки и вызовите функцию обработки в нескольких потоках (видео)
 Пример #2. Вам нужно вызвать некоторую функцию до начала скрипта, а другую - после завершения скрипта. В этом случае вы можете установить "Номер потока", "Количество успехов" и "Количество неудач" в 1 в главном скрипте. Создать 3 функции: MainScript, OnStart и OnEnd и вызвать OnStart и OnEnd с количеством потом равным 1, а функцию MainScript вызывать с параметрами такими же, как и основной скрипт (screen)
 Это действие никогда не завершается с ошибкой, даже если достигнуто максимальное количество неудач, поэтому вам не нужно оборачивать его в блок игнорирования ошибок.
 Вызовите действие "прервать скрипт" внутри заданной функции чтобы остановить скрипт вручную.
 * @param func функция для запуска потоков
 * @param threads Количество потоков
 * @param success_number Успешных выполнений
 * @param fail_number Неудачных выполнений
 * @param callback Функция
 */
declare function _call_section(func: Function, threads: number, success_number: number, fail_number: number, callback: Function): void

/**
 * Вывести сообщение в лог. Это сообщение будет показано пользователю и должно сообщать ему о событиях, происходящих во время выполнении скрипта.
 Сообщение также будет записано в файл.
 BAS также добавит некоторую информацию к сообщению: дату, номер потока, идентификатор действия. Вот почему это действие не очень хорошо подходит, если вы хотите, выводить необработанные данные, например, список аккаунтов. В таком случае используйте действие "Результат".
 Если вы хотите изменить цвет сообщения, используйте действие "Выполнить код" вместе с вызовом api log_html(html, text).
 Если вы хотите выводить данные только в файл, используйте эту (статью)
 * @param text Данные для вывода
 */
declare function log(text: string): void

/**
 * Очистить лог
 * Очистить окно лога и файл лога
 */
declare function clear_log(): void

/**
 * Вывести данные на вкладку результатов.
 Это действие лучше всего подходит для вывода необработанных данных, таких как учетные записи, url профилей и т. д.
 Если вы хотите вывести сообщение с датой и номером потока, лучше использовать действие "Лог".
 Перед запуском скрипта вы можете создать до девяти вкладок под разные данные и указать имена для них, например, одну для аккаунтов, одну для сообщений, для аватаров и т. д.
 Параметр "Номер результата" задает номер вкладки, нумерация начинается с 1.
 Если вы хотите выводить данные только в файл, используйте эту (статью)
 * @param text Данные
 * @param number Номер результата
 */
declare function result(text: string, number: number): void
