const get_async_functions = (f) => {
	/**
* Прервать асинхронную функцию
* Прервать вызов асинхронной функции.
* Это действие немедленно остановит выполнение асинхронной функции.
* Если параметр "ID потока" содержит список, то каждый поток из этого списка будет остановлен.
* Это действие работает только с асинхронными функциями, созданными с помощью действия "Вызов функции асинхронно".
* @param thread_id ID потока
ID потока, полученный из действия "Вызов функции асинхронно". Если параметр является списком, это действие остановит все асинхронные функций в этом списке.
Примеры :
VAR_THREAD_ID - Остановить одну функцию.
VAR_THREAD_LIST - Остановить все функции из списка.
*/
const BAS_thread_stop = async (thread_id) => await f("BAS_thread_stop", { thread_id })

	/**
* Вызов функции асинхронно (BAS-функция)
* Выполнить функцию асинхронно не дожидаясь её завершения.
* Функция должна быть определена заранее. BAS позволяет определять функции используя "Менеджер функций" (screen https://wiki.bablosoft.com/lib/exe/fetch.php?cache=&media=browserautomationstudio_2020-02-19_12-28-39.png)
* Функции - это контейнеры, в которых содержится список действий. Они помогают группировать несколько действий, которые выполняют одну и ту же задачу. Например, может быть функция, которая логинится на сайте, функция, которая проверяет баланс и т. д. Это делает ваш код понятным и хорошо организованным.
* Другим преимуществом является то, что одна функция может выполняться столько раз, сколько вы хотите и из любого места. Это помогает избежать повторения кода. Если вы хотите изменить функцию, вам нужно сделать это только один раз, а не в любом месте, где она используется.
* Это действие запустит новый поток и выполнит в нем функцию с указанными параметрами.
* Важно понимать, что из-за того, что функция будет запущена в новом потоке, все локальные переменные не будут доступны внутри нее. Функция будет использовать совершенно другой браузер. Это означает, что, например, авторизация на сайте, выполненная в потоке, который вызвал функцию, не будет доступна внутри функции.
* Обмен данными. Вы можете передать данные в функцию, установив входные параметры, результаты из нее можно получить с помощью действия "Получить результат асинхронной функции". Результаты доступны только после завершения работы функции.
* Выполнение этого действия завершится сразу после его вызова, даже если само выполнение функции занимает значительное время. (screen https://wiki.bablosoft.com/lib/exe/fetch.php?media=browserautomationstudio_2020-02-19_17-08-03.png)
* Вы можете дождаться завершения одной или нескольких асинхронных функций, используя действие "Ждать завершение асинхронной функции". (screen https://wiki.bablosoft.com/lib/exe/fetch.php?media=browserautomationstudio_2020-02-19_17-10-57.png)
* Это действие ведет себя по-разному в режиме записи и запуска. В режиме запуска оно создает новый поток и распараллеливает процесс выполнения приложения. В режиме записи оно работает так же, как обычный вызов функции, потому что режим записи всегда однопоточный.
* Это действие сохраняет ID потока в переменную THREAD_ID. Этот идентификатор позволяет взаимодействовать с функцией, с помощью него вы можете: получить результат функции, дождаться завершения ее выполнения или остановить функцию. (screen https://wiki.bablosoft.com/lib/exe/fetch.php?media=browserautomationstudio_2020-02-19_14-57-58.png)
* Используйте действие "Ждать завершение асинхронной функции", а затем "Получить результат асинхронной функции", чтобы получить результат выполнения. (screen https://wiki.bablosoft.com/lib/exe/fetch.php?media=browserautomationstudio_2020-02-19_16-12-55.png)
* Данное действие также добавляет ID потока в переменную THREAD_LIST. Эта переменная имеет тип список и может обрабатываться модулем "Список". Он накапливает все запущенные потоки, поэтому вы можете выполнять с помощью него действия сразу над несколькими потоками, например, немедленно останавливать их.
* Выполнение скрипта не завершится, пока будет работать хотя бы одна асинхронная функция. Вы можете использовать это поведение для автоматической остановки скрипта, когда все задачи выполнены. Расмотрим пример, если основной поток запускает две функции, выполнение одной занимает 1 минуту, а второй - 2 минуты. В этом случае скрипт завершится через 2 минуты, даже если основной поток завершит работу сразу после запуска. (screen https://wiki.bablosoft.com/lib/exe/fetch.php?media=browserautomationstudio_2020-02-19_14-53-55.png)
* Вы можете ограничить максимальное количество одновременно работающих потоков с асинхронными функциями, установив параметр "Максимальное количество асинхронных функций, выполняемых одновременно". Если функция будет запущена свыше этого предела, она будет отложена до того момента, когда завершится какая-то другая функция и число потоков упадет ниже предела. Это очень мощная настройка, она позволяет запускать неограниченное число потоков, при этом BAS будет балансировать нагрузку самостоятельно. (screen https://wiki.bablosoft.com/lib/exe/fetch.php?media=browserautomationstudio_2020-02-19_14-51-19.png)
* По умолчанию функция будет запущена в новом потоке, а после завершения функции поток будет удален. Тем не менее, вы можете поддерживать работу потока и даже запустить в нем новую функцию после завершения старой. Запущенная в старом потоке функция будет иметь тот же контекст - тот же браузер и те же локальные переменные. Рассмотрим следующий пример - есть две функции: SetProxy и DoParsing. Если вы выполняете их в разных потоках, парсинг будет выполняться с реальным ip, а если вы выполняете их в одном и том же потоке последовательно, парсинг будет выполняться через прокси. Чтобы запустить функцию в ранее использованном потоке, установите у параметра "Желаемый ID потока" значение ID этого потока, также необходимо установить у параметра "Остановить поток после завершения функции" значение false.
* Если в потоке будет запущена функция, в то время, пока идет выполнение какой-то другой функции, то новая будет отложена. Она будет запущена сразу после завершения старой. (screen https://wiki.bablosoft.com/lib/exe/fetch.php?media=browserautomationstudio_2020-02-20_20-12-47.png)
*
* @param {string} func Имя функции
*
* @param {number} thread_id Желаемый ID потока
ID потока, в котором будет запускаться функция. По умолчанию функция будет запущена в новом потоке, но вы можете изменить это поведение, задав данное значение.
Примеры :
0 - Запустить функцию в новом потоке. ID созданного потока будет возвращен в параметре 'Результат. ID потока'.
VAR_THREAD_ID - Запустить функцию в созданном ранее потоке. Переменная THREAD_ID должна быть получена в результате ранее вызванного действия 'Вызов функции асинхронно'. Предыдущий вызов действия должен установить для параметра 'Остановить поток после завершения функции' значение false, иначе поток будет остановлен преждевременно.
@param {boolean} stop_thread Остановить поток после завершения функции
Должен ли поток быть остановлен после того, как эта функция завершит выполнение. Значение по умолчанию - true, оно помогает избежать утечки потоков. Если вы хотите использовать этот поток позже, установите значение false.
Примеры :
true - Остановить поток после завершения функции
false - Не останавливать поток. Следующая функция может быть вызвана в этом потоке. Используйте параметр 'Желаемый ID потока', чтобы указать поток для запуска.
@param {string} behaviour_inactive 'wait' | 'start postponded function'
Поведение во время бездействия потока
Этот параметр определяет поведение во время бездействия потока, т.е. когда функция завершится, но поток останется активным. Используя опцию 'start postponded function', вы можете добиться такого поведения, когда все функции будут выполняться в одном и том же пуле потоков. Это поможет сэкономить ресурсы, необходимые для перезапуска потоков и браузеров. Не забудьте установить для параметра 'Остановить поток после завершения функции' значение false, иначе потоки будут закрываться автоматически вместо перехода в состояние бездействия.
Примеры :
wait - Значение по умолчанию. Когда поток находится в состоянии бездействия, он будет ждать вызова новой функции.
start postponded function - В состоянии бездействия поток будет искать отложенные функции, то есть те, которые были поставлены в очередь из-за установки 'Максимальное количество асинхронных функций, выполняемых одновременно'. Если такая функция будет найдена, она будет выполнена в текущем потоке.
@param {number} max_funcs Максимальное количество асинхронных функций, выполняемых одновременно
Максимум одновременно работающих потоков с асинхронными функциями. Лимит устанавливается для всего приложения целиком. Если функция будет запущена свыше этого предела, она будет отложена до того момента, когда завершится какая-то другая функция и число потоков упадет ниже предела. Это очень мощная настройка, она позволяет запускать неограниченное число потоков, при этом BAS будет балансировать нагрузку самостоятельно.
Примеры :
30 - Ограничить количество потоков до 30. Значение по умолчанию.
1 - Выполнять асинхронные функции последовательно.
100 - Ограничить количество потоков до 100.
*
* @returns Object {
* thread_id: number - Результат. ID потока
Вместо результата функции эта переменная содержит идентификатор, который можно использовать для получения результата функции после ее завершения. Он также позволяет взаимодействовать с функцией, с помощью него вы можете: получить результат функции, дождаться завершения функции или остановить функцию.
* thread_list: Array - Список, куда будет добавлен ID потока
Список, куда будет добавлен ID потока. Эта переменная имеет тип список и может обрабатываться модулем "Список". Он накапливает все запущенные потоки, поэтому вы можете выполнять с помощью него действия сразу над несколькими потоками, например, немедленно останавливать их. Если переменная не существует, она будет создана.
* }
*/
const BAS_async = async (params) => await f("BAS_async", params || {})

	/**
* Ждать завершение асинхронной функции (BAS-функция)
* Ждать завершения асинхронной функции.
* Для работы этого действия необходимо, чтобы функция запускалась асинхронно с помощью действия "Вызов функции асинхронно".
* Важно понимать, что действие "Вызов функции асинхронно" немедленно завершает свою работу после запуска, и вы можете получить результат выполнения функции только дождавшись ее завершения с помощью этого действия.
* Это действие может ожидать как отдельную функцию, так и список функций. Чтобы дождаться окончания работы списка функций, установите переменную с типом список в параметр "ID потока", обычно ее имя - THREAD_LIST, в нем накапливаются ID потоков в результате работы действия "Вызов функции асинхронно".
* о умолчанию это действие будет ожидать бесконечное количество времени, но вы можете указать максимальное время ожидания. Если функция не завершится к этому времени, она будет остановлена и возникнет ошибка. Вы можете обработать ошибку с помощью действия "Игнорировать ошибки". Установка максимального времени ожидания - очень удобный способ ограничить время выполнения для любой функции. (screen https://wiki.bablosoft.com/lib/exe/fetch.php?media=browserautomationstudio_2020-02-19_17-03-54.png).
* Пример ожидания нескольких функций может выглядеть вот так https://wiki.bablosoft.com/lib/exe/fetch.php?media=browserautomationstudio_2020-02-19_17-01-15.png.
*
* @param {number} thread_id ID потока
ID потока, полученный из действия "Вызов функции асинхронно". Если параметр является списком, это действие будет ожидать завершения всех асинхронных функций в списке.
Примеры :
VAR_THREAD_ID - Ждать завершения одной функции.
VAR_THREAD_LIST - Ждать завершения всех функций в списке.
@param {number} timeout Максимальное время выполнения задания (мс)
*/
const BAS_thread_wait = async (params) => await f("BAS_thread_wait", params || {})

	/**
* Получить результат асинхронной функции
* Получить результат выполнения асинхронной функции.
* Для работы этого действия необходимо, чтобы функция запускалась асинхронно с помощью действия "Вызов функции асинхронно".
* Важно понимать, что действие "Вызов функции асинхронно" немедленно завершает свою работу после запуска, и чтобы получить результат выполнения функции нужно предварительно дождавшись ее завершения с помощью действия "Ждать завершение асинхронной функции".
* Это действие получает результат выполнения функции, оно также помогает узнать состояние функции, то есть выполняется ли она в данный момент и являлось ли последнее выполнение успешным.
* Нет смысла проверять значение переменной THREAD_RESULT до тех пор, пока переменная THREAD_IS_RUNNING не будет равна false, то есть до тех пор, пока функция все еще работает.
* Вы можете использовать переменную THREAD_IS_RUNNING для ожидания результата функции, но гораздо проще использовать действие "Ждать завершение асинхронной функции". (screen https://wiki.bablosoft.com/lib/exe/fetch.php?media=browserautomationstudio_2020-02-19_16-06-37.png)
* Если во время вызова функции произошла ошибка, используйте переменную THREAD_IS_SUCCESS и THREAD_ERROR, чтобы проверить было ли выполнение успешным и получить сообщение об ошибке.
* Пример получения результата асинхронной функции может выглядеть вот так https://wiki.bablosoft.com/lib/exe/fetch.php?media=browserautomationstudio_2020-02-19_16-12-55.png.
* @param {number} thread_id ID потока
ID потока, полученный из действия "Вызов функции асинхронно".
* @returns Object {
*result: string - Результат
Результат работы асинхронной функции. Чтобы установить это значение из выполняемой функции, вам нужно использовать действие "Return". Если в функции не было вызова действия "Return", возвращается значение null.
*is_running: boolean - Работает ли функция
Логическое значение(true/false) указывает, работает ли функция в данный момент.
*is_success: boolean - Результат выполнения успешный
Логическое значение(true/false) указывает, был ли результат последнего выполнения успешным.
*error: string - Строка с ошибкой
Строка с ошибкой в случае, если последний вызов функции не был успешным.
* }
*/
const BAS_thread_get_status = async (thread_id) => await f("BAS_thread_get_status", { thread_id })

return {	BAS_thread_stop,
	BAS_async,
	BAS_thread_wait,
	BAS_thread_get_status,
}
}

module.exports = get_async_functions