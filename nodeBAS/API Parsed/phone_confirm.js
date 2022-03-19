/**
* Получить номер телефона (BAS-функция)
* Получить номер телефона от сервиса приема SMS.
* Это действие вернет строку, содержащую полученный номер телефона.
* Пример: "79001112323"
* Полученный номер нужно использовать в действии "Получить код активации" чтобы получить код из SMS, или в действии "Изменение статуса активации" чтобы изменить статус номера.
* Вы можете указать свое значение для оператора, сайта и страны в соответствующие параметры находящиеся в дополнительных настройках. Учтите, что эти значения должны быть указаны в том виде в котором их воспринимает сервис, они будут отправлены так как вы их указали.
* Если нужного сервиса нет в списке доступных, но он работает через API аналогичный выбранному сервису, то вы можете указать его url сервера в соответствующий параметр находящийся в дополнительных настройках.
* Если во время выполнения действия произойдет ошибка, поток остановится с сообщением об ошибке. Если вы хотите продолжить работу, используйте действие "Игнорировать ошибки".
* @param {string} service Сервис
Сервис приема SMS, от которого нужно получить номер телефона.
Примеры :
sms-activate.ru - https://sms-activate.ru
smshub.org - https://smshub.org
sms-reg.com - https://sms-reg.com
@param {string} apiKey API ключ
API ключ сервиса приема SMS. Ключ для сервиса выбранного в параметре "Сервис". В зависимости от сервиса, вы можете получить его в личном кабинете или настройках сервиса.
Примеры :
8b1a9953c4611296a827abf8c47804d7
79916U5718g2266a7bff7fad356c6cb280b3ea
f4d559ba78aa6c4701c1995ae9977c03
@param {string} site Сайт (VK, WhatsApp, Viber, Telegram и мн. др.)
@param {string} country Страна
Необязательный параметр. Страна номера.
Примеры :
RU - Российская Федерация
UA - Украина
US - США
Пустая строка - Зависит от используемого сервиса, может быть последняя используемая страна или какая-то определенная страна, подробнее вы можете узнать в описании API сервиса.
@param {string} operator Оператор
Необязательный параметр. Сотовый оператор номера, в том виде в котором его воспринимает сервис приема SMS.
Примеры :
megafon - МегаФон
kyivstar - Киевстар
tele2 - Tele2
Пустая строка - Использовать любого оператора.
@param {string} customSite Пользовательский сайт
Необязательный параметр. Пользовательское значение сайта, в том виде в котором его воспринимает сервис приема SMS. Если этот параметр указан, то он будет использован вместо параметра "Сайт" и отправлен на сервис без предварительной обработки.
Примеры :
wa - WhatsApp
tg - Telegram
go - Google
Пустая строка - Использовать значение из параметра "Сайт".
@param {string} customCountry Пользовательская страна
Необязательный параметр. Пользовательское значение страны, в том виде в котором его воспринимает сервис приема SMS. Если этот параметр указан, то он будет использован вместо параметра "Страна" и отправлен на сервис без предварительной обработки.
Примеры :
0 - Российская Федерация
1 - Украина
187 - США
Пустая строка - Использовать значение из параметра "Страна".
@param {string} serverUrl Url сервера
Необязательный параметр. Url сервера сервиса приема SMS. Используйте данный параметр для указания url сервера, если нужного сервиса нет в списке доступных, но он работает через API аналогичный выбранному сервису.
Примеры :
https://sms.org
http://receive-sms.com
http://127.0.0.1:8888
Пустая строка - Использовать url по умолчанию, например, https://sms-activate.ru для sms-activate.ru.
@param {number} timeout Максимальное время выполнения задания
@returns номер телефона
Примеры :
79001112323
17039688838
380048698566
*/
function BAS_phone_get_number() {
const args = _arguments()
_call_function(_SMS.getNumber, {
service: args.service,
apiKey: args.apiKey,
site: args.site,
country: args.country,
operator: args.operator,
customSite: args.customSite,
customCounty: args.customCountry,
serverUrl: args.serverUrl,
timeout: args.timeout
})!
_function_return(_result_function())
}
/**
* Получить код активации (BAS-функция)
* Получить код активации с указанного номера.
* Перед выполнением этого действия сначала нужно получить номер действием "Получить номер телефона" и без изменений использовать его в параметре "Номер".
* Это действие вернет строку, содержащую код из SMS сообщения или полное сообщение, если сервису не удалось получить из него код.
* Например, если сервису удалось получить код из SMS, то действие вернет "75588", а если сервису не удалось получить код из SMS, то действие вернет "Код активации: 75588".
* Чтобы получить ещё один код на тот же номер, установите статус 3 действием "Изменение статуса активации" и повторно вызовете это действие. Устанавливать статус 3 нужно перед каждым новым получением кода на тот же номер.
* <Внимание!>В зависимости от сервиса получение повторного SMS кода может быть платным, недоступным или ограниченным по количеству, информацию об этом нужно узнавать в описании сервиса или его API.<Внимание!>
* Если во время выполнения действия произойдет ошибка или код не будет получен в течение таймаута, указанного в дополнительных настройках, поток остановится с сообщением об ошибке. Если вы хотите продолжить работу, используйте действие "Игнорировать ошибки".
* @param {string} number Номер
Номер полученный из действия "Получить номер телефона", для которого нужно получить SMS код.
Примеры :
79001112323
17039688838
380048698566
@param {number} interval Интервал (секунд)
Интервал проверки готовности кода в секундах.
Примеры :
2 - Проверять каждые 2 секунды
5 - Проверять каждые 5 секунд
10 - Проверять каждые 10 секунд
@param {number} timeout Таймаут (минут)
Максимальное время ожидания SMS кода в минутах. Если указанное время выйдет и SMS не будет получено, то действие завершится ошибкой.
Примеры :
10 - Ждать 10 минут
15 - Ждать 15 минут
20 - Ждать 20 минут
@returns SMS-код
Примеры :
75588
98292
558925
Код активации: 75588 - Сервису не удалось получить код из SMS, возвращено полное сообщение
*/
function BAS_phnoe_get_activation_code() {
const args = _arguments()
_call_function(_SMS.waitCode, {
number: args.number,
interval: args.interval,
timeout: args.timeout
})!
_function_return(_result_function())
}
/**
* Изменение статуса активации (BAS-функция)
* Изменение статуса активации для указанного номера.
* Перед выполнением этого действия сначала нужно получить номер действием "Получить номер телефона" и без изменений использовать его в параметре "Номер".
* Это действие изменяет статус активации для указанного номера на сервисе приема SMS.
* Возможные статусы:
* -1 - отменить активацию, если номер вам не подошел или был получен случайно.
* 1 - сообщить о готовности номера, если SMS уже отправлено, действие "Получить код активации" устанавливает этот статус автоматически поэтому устанавливать этот статус не обязательно.
* 3 - запросить еще один код, если нужно получить ещё один SMS код на тот же номер. Этот статус нужно устанавливать перед каждым повторным использованием действия "Получить код активации".
* <Внимание!>В зависимости от сервиса получение повторного SMS кода может быть платным, недоступным или ограниченным по количеству, информацию об этом нужно узнавать в описании сервиса или его API.<Внимание!>
* 6 - завершить активацию, если получен верный SMS код и вы хотите завершить работу с указанным номером.
* 8 - сообщить о том, что номер использован и отменить активацию, если указанный номер занят или заблокирован на нужном сайте.
* По умолчанию информация о номере удаляется при удачной установке статусов -1, 6 и 8, но это можно отключить в дополнительных настройках.
* Если сервис не поддерживает указанный статус, то действие ничего не сделает.
* Если не удастся изменить статус или во время выполнения действия произойдет ошибка, поток остановится с сообщением об ошибке. Если вы хотите продолжить работу, используйте действие "Игнорировать ошибки".
* @param {string} number Номер
Номер полученный из действия "Получить номер телефона", для которого нужно изменить статус активации.
Примеры :
79001112323
17039688838
380048698566
@param {number} status Статус
Статус который нужно установить для указанного номера.
Примеры :
-1 - Отменить активацию.
1 - Сообщить о готовности номера.
3 - Запросить еще один код.
6 - Завершить активацию.
8 - Сообщить о том, что номер использован и отменить активацию.
@param {boolean} deleteInfo Удалять информацию о номере при статусе -1, 6 или 8.
@param {number} timeout Максимальное время выполнения задания (мс)
*/
function BAS_phone_change_activation_status() {
const args = _arguments()
_call_function(_SMS.setStatus, {
number: args.number,
status: args.status,
deleteInfo: args.deleteInfo,
timeout: args.timeout
})!
}
/**
* Получить баланс (BAS-функция)
* Получить баланс сервиса приема SMS.
* Это действие вернет число, равное балансу указанного сервиса приема SMS. Если не удалось получить баланс, то действие вернет null.
* Если нужного сервиса нет в списке доступных, но он работает через API аналогичный выбранному сервису, то вы можете указать его url сервера в соответствующий параметр находящийся в дополнительных настройках.
* Если во время выполнения действия произойдет ошибка, поток остановится с сообщением об ошибке. Если вы хотите продолжить работу, используйте действие "Игнорировать ошибки".
* @param {string} service Сервис
Сервис приема SMS, для которого нужно получить баланс.
Примеры :
sms-activate.ru - https://sms-activate.ru
smshub.org - https://smshub.org
sms-reg.com - https://sms-reg.com
@param {string} apiKey API ключ
API ключ сервиса приема SMS. Ключ для сервиса выбранного в параметре "Сервис". В зависимости от сервиса, вы можете получить его в личном кабинете или настройках сервиса.
Примеры :
8b1a9953c4611296a827abf8c47804d7
79916U5718g2266a7bff7fad356c6cb280b3ea
f4d559ba78aa6c4701c1995ae9977c03
@param {string} serverUrl Url сервера
Необязательный параметр. Url сервера сервиса приема SMS. Используйте данный параметр для указания url сервера, если нужного сервиса нет в списке доступных, но он работает через API аналогичный выбранному сервису.
Примеры :
https://sms.org
http://receive-sms.com
http://127.0.0.1:8888
Пустая строка - Использовать url по умолчанию, например, https://sms-activate.ru для sms-activate.ru.
@param {number} timeout Максимальное время выполнения задания (мс)
@return баланс
Примеры :
1.32
120
1596
null - Не удалось получить баланс
*/
function BAS_phone_get_balance() {
const args = _arguments()
_call_function(_SMS.getBalance, {
service: args.service,
apiKey: args.apiKey,
serverUrl: args.serverUrl,
timeout: args.timeout
})!
_function_return(_result_function())
}
/**
* Получить количество доступных номеров (BAS-функция)
* Получить количество доступных номеров на сервисе приема SMS.
* Это действие вернет число, равное количеству доступных номеров, соответствующих указанным параметрам, на сервисе приема SMS.
* Вы можете указать свое значение для оператора, сайта и страны в соответствующие параметры находящиеся в дополнительных настройках. Учтите, что эти значения должны быть указаны в том виде в котором их воспринимает сервис, они будут отправлены так как вы их указали.
* Если нужного сервиса нет в списке доступных, но он работает через API аналогичный выбранному сервису, то вы можете указать его url сервера в соответствующий параметр находящийся в дополнительных настройках.
* Если во время выполнения действия произойдет ошибка, поток остановится с сообщением об ошибке. Если вы хотите продолжить работу, используйте действие "Игнорировать ошибки".
* @param {string} service Сервис
Сервис приема SMS, для которого нужно получить количество доступных номеров.
Примеры :
sms-activate.ru - https://sms-activate.ru
smshub.org - https://smshub.org
5sim.net - https://5sim.net
@param {string} apiKey API ключ
API ключ сервиса приема SMS. Ключ для сервиса выбранного в параметре "Сервис". В зависимости от сервиса, вы можете получить его в личном кабинете или настройках сервиса.
Примеры :
8b1a9953c4611296a827abf8c47804d7
79916U5718g2266a7bff7fad356c6cb280b3ea
f4d559ba78aa6c4701c1995ae9977c03
@param {string} site Сайт (VK, WhatsApp, Viber, Telegram и мн. др.)
@param {string} country Страна
Необязательный параметр. Страна номера.
Примеры :
RU - Российская Федерация
UA - Украина
US - США
Пустая строка - Зависит от используемого сервиса, может быть последняя используемая страна или какая-то определенная страна, подробнее вы можете узнать в описании API сервиса.
@param {string} customSite Пользовательский сайт
Необязательный параметр. Пользовательское значение сайта, в том виде в котором его воспринимает сервис приема SMS. Если этот параметр указан, то он будет использован вместо параметра "Сайт" и отправлен на сервис без предварительной обработки.
Примеры :
wa - WhatsApp
tg - Telegram
go - Google
Пустая строка - Использовать значение из параметра "Сайт".
@param {string} customCountry Пользовательская страна
Необязательный параметр. Пользовательское значение страны, в том виде в котором его воспринимает сервис приема SMS. Если этот параметр указан, то он будет использован вместо параметра "Страна" и отправлен на сервис без предварительной обработки.
Примеры :
0 - Российская Федерация
1 - Украина
187 - США
Пустая строка - Использовать значение из параметра "Страна".
@param {string} serverUrl Url сервера
Необязательный параметр. Url сервера сервиса приема SMS. Используйте данный параметр для указания url сервера, если нужного сервиса нет в списке доступных, но он работает через API аналогичный выбранному сервису.
Примеры :
https://sms.org
http://receive-sms.com
http://127.0.0.1:8888
Пустая строка - Использовать url по умолчанию, например, https://sms-activate.ru для sms-activate.ru.
@param {number} timeout Максимальное время выполнения задания (мс)
@returns количество доступных номеров
Примеры :
137
549
1596
0 - Указанный сервисе на данный момент не имеет номеров с указанными параметрами
*/
function BAS_phone_get_numbers_count() {
const args = _arguments()
_call_function(_SMS.getNumbersCount, {
service: args.service,
apiKey: args.apiKey,
site: args.site,
country: args.country,
customSite: args.customSite,
customCountry: args.customCountry,
serverUrl: args.serverUrl,
timeout: args.timeout
})!
_function_return(_result_function())
}
/**
* Получить список сайтов (BAS-функция)
* Получить список сайтов сервиса приема SMS.
* Это действие вернет список, состоящий из объектов, содержащих идентификаторы и имена сайтов поддерживаемых указанным сервисом приема SMS. Идентификатор сайта содержится в id свойстве объекта, а име в свойстве name.
* Пример: [{"id":"aol","name":"Aol.com"},{"id":"gmail","name":"Google"}]
* Полученный список можно обработать с помощью действий из модуля "JSON".
* Чтобы получить имя первого сайта, используйте JPath запрос $.[0].name в действии "Получить значение" из модуля "JSON".
* Чтобы получить список имен всех сайтов, используйте JPath запрос $.[*].name в действии "Получить все значения" из модуля "JSON".
* Чтобы получить идентификатор первого сайта, используйте JPath запрос $.[0].id в действии "Получить значение" из модуля "JSON".
* Чтобы получить идентификатор сайта с именем из переменной VAR_NAME, используйте JPath запрос $.[?(@.name=="VAR_NAME")].id в действии "Получить значение" из модуля "JSON".
* Полученный идентификатор сайта можно использовать в параметре "Пользовательский сайт" действия "Получить количество доступных номеров" и "Получить номер телефона".
* Если нужного сервиса нет в списке доступных, но он работает через API аналогичный выбранному сервису, то вы можете указать его url сервера в соответствующий параметр находящийся в дополнительных настройках.
* Если во время выполнения действия произойдет ошибка, поток остановится с сообщением об ошибке. Если вы хотите продолжить работу, используйте действие "Игнорировать ошибки".
* @param {string} service Сервис
Сервис приема SMS, для которого нужно получить список сайтов.
Примеры :
sms-reg.com - https://sms-reg.com
sms-acktiwator.ru - https://sms-acktiwator.ru
sms-man.ru - https://sms-man.ru
@param {string} apiKey API ключ
API ключ сервиса приема SMS. Ключ для сервиса выбранного в параметре "Сервис". В зависимости от сервиса, вы можете получить его в личном кабинете или настройках сервиса.
Примеры :
8b1a9953c4611296a827abf8c47804d7
79916U5718g2266a7bff7fad356c6cb280b3ea
f4d559ba78aa6c4701c1995ae9977c03
@param {string} serverUrl Url сервера
Необязательный параметр. Url сервера сервиса приема SMS. Используйте данный параметр для указания url сервера, если нужного сервиса нет в списке доступных, но он работает через API аналогичный выбранному сервису.
Примеры :
https://sms.org
http://receive-sms.com
http://127.0.0.1:8888
Пустая строка - Использовать url по умолчанию, например, https://sms-activate.ru для sms-activate.ru.
@param {number} timeout Максимальное время выполнения задания (мс)
@returns список сайтов
Примеры :
[{"id":"aol","name":"Aol.com"},{"id":"gmail","name":"Google"}]
*/
function BAS_phone_get_sites() {
const args = _arguments()
_call_function(_SMS.getSites, {
service: args.service,
apiKey: args.apiKey,
serverUrl: args.serverUrl,
timeout: args.timeout
})!
_function_return(_result_function())
}
/**
* Получить список стран (BAS-функция)
* Получить список стран сервиса приема SMS.
* Это действие вернет список, состоящий из объектов, содержащих идентификаторы и названия стран поддерживаемых указанным сервисом приема SMS. Идентификатор страны содержится в id свойстве объекта, название страны на Русском в свойстве name, а название страны на Английском в свойстве name_en.
* Пример: [{"id":"0","name":"Россия","name_en":"Russia"},{"id":"1","name":"Украина","name_en":"Ukraine"}]
* Некоторые сервисы могут не иметь названия страны на Английском или в свойстве name иметь название на Английском и вообще не иметь названия на Русском.
* Полученный список можно обработать с помощью действий из модуля "JSON".
* Чтобы получить Русское название первой страны, используйте JPath запрос $.[0].name в действии "Получить значение" из модуля "JSON".
* Чтобы получить Английское название первой страны, используйте JPath запрос $.[0].name_en в действии "Получить значение" из модуля "JSON".
* Чтобы получить список Русских названий всех стран, используйте JPath запрос $.[*].name в действии "Получить все значения" из модуля "JSON".
* Чтобы получить список Английское названий всех стран, используйте JPath запрос $.[*].name_en в действии "Получить все значения" из модуля "JSON".
* Чтобы получить идентификатор первой страны, используйте JPath запрос $.[0].id в действии "Получить значение" из модуля "JSON".
* Чтобы получить идентификатор страны с Русским названием из переменной VAR_NAME, используйте JPath запрос $.[?(@.name=="VAR_NAME")].id в действии "Получить значение" из модуля "JSON".
* Чтобы получить идентификатор страны с Английским названием из переменной VAR_NAME, используйте JPath запрос $.[?(@.name_en=="VAR_NAME")].id в действии "Получить значение" из модуля "JSON".
* Полученный идентификатор страны можно использовать в параметре "Пользовательская страна" действия "Получить количество доступных номеров" и "Получить номер телефона".
* Если нужного сервиса нет в списке доступных, но он работает через API аналогичный выбранному сервису, то вы можете указать его url сервера в соответствующий параметр находящийся в дополнительных настройках.
* Если во время выполнения действия произойдет ошибка, поток остановится с сообщением об ошибке. Если вы хотите продолжить работу, используйте действие "Игнорировать ошибки".
* @param {string} service Сервис
Сервис приема SMS, для которого нужно получить список стран.
Примеры :
sms-activate.ru - https://sms-activate.ru
sms-acktiwator.ru - https://sms-acktiwator.ru
sms-man.ru - https://sms-man.ru
@param {string} apiKey API ключ
API ключ сервиса приема SMS. Ключ для сервиса выбранного в параметре "Сервис". В зависимости от сервиса, вы можете получить его в личном кабинете или настройках сервиса.
Примеры :
8b1a9953c4611296a827abf8c47804d7
79916U5718g2266a7bff7fad356c6cb280b3ea
f4d559ba78aa6c4701c1995ae9977c03
@param {string} serverUrl Url сервера
Необязательный параметр. Url сервера сервиса приема SMS. Используйте данный параметр для указания url сервера, если нужного сервиса нет в списке доступных, но он работает через API аналогичный выбранному сервису.
Примеры :
https://sms.org
http://receive-sms.com
http://127.0.0.1:8888
Пустая строка - Использовать url по умолчанию, например, https://sms-activate.ru для sms-activate.ru.
@param {number} timeout Максимальное время выполнения задания (мс)
@returns список стран
Примеры :
[{"id":"0","name":"Россия","name_en":"Russia"},{"id":"1","name":"Украина","name_en":"Ukraine"}]
*/
function BAS_phone_get_countries() {
const args = _arguments()
_call_function(_SMS.getCountries, {
service: args.service,
apiKey: args.apiKey,
serverUrl: args.serverUrl,
timeout: args.timeout
})!
_function_return(_result_function())
}
/**
* Отладка
* Включить или отключить отладку модуля подтверждения телефона.
* Если отладка включена, все запросы и их результаты будут выводится в лог.
* @param {boolean} enable Включить отладку
Включить отладку модуля подтверждения телефона.
Примеры :
true - Включить отладку
false - Отключить отладку
*/
function BAS_phone_set_debug(enable) {
_SMS.setDebug(enable)
}
