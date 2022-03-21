/**
*
*/
function proxy_set_hash(proxy, proxy_type, login, password) {
const proxy = _function_argument('proxy') || proxy
const proxy_type = _function_argument('proxy_type') || proxy_type
const login = _function_argument('login') || login
const password = _function_argument('password') || password
const hash = proxy_parse(proxy)
if (proxy_type !== 'auto') {
hash.IsHttp = proxy_type === 'http'
}
if (login.length > 0 && password.length > 0) {
hash.name = login
hash.password = password
}
return hash
}
/**
* Почта Прокси
* По умолчанию клиент imap работает без прокси, но он может быть задан с помощью этого действия.
* Используйте ресурсы, если вы хотите взять прокси из файла, url или базы данных.
* Вы можете изменить прокси один раз, и он будет применяться к каждому действию, которое работает с получением писем.
* Пустой параметр сбросит прокси до значения по умолчанию(прямое соединение).
* @param {string} proxy Прокси. Строка, с информацией о прокси. Она может содержать ip, порт и тип прокси в разных форматах. Эта строка может также содержать логин и пароль, если их нету, данные для аутентификации могут быть заданы с параметрами "Логин прокси" и "Прокси пароль".
* Примеры:
* 210.10.10.10:1085
* username:password@210.10.10.10:1085
* socks%://210.10.10.10:1085
* socks:210.10.10.10:1085:username:password
* http:username:password:210.10.10.10:1085
* \{\{proxy\}\} - Получить из ресурса
* Пустая строка - Без прокси
* @param {string} proxy_type 'http' | 'https' | 'socks' | 'socks5' | 'auto'
* Тип прокси. Поддерживаются прокси типа socks5 и http.
* Примеры:
* socks
* socks5 - То же, что и socks
* http
* https - То же, что и http
* @param {string} login Прокси Логин. Может быть пустым. Логин от прокси, переопределяет логин в строке прокси. Полезно, если у вас много прокси с одинаковыми логинами и паролями.
* @param {string} password Прокси Пароль. Может быть пустым. Пароль от прокси, переопределяет пароль в строке прокси. Полезно, если у вас много прокси с одинаковыми логинами и паролями.
*/
function BAS_imap_client_set_proxy(proxy, proxy_type, login, password) {
const args = _arguments()
const proxy = args.proxy || (proxy || '')
const proxy_type = args.proxy_type || (proxy_type || 'http')
const login = args.login || (login || '')
const password = args.password || (password || '')
const hash = proxy_set_hash(proxy, proxy_type, login, password)
imap_client_set_proxy(hash.server, hash.Port, hash.IsHttp, hash.name, hash.password)
}
/**
* Количество писем
* Получить количество сообщений в почтовом ящике.
* Для правильной работы необходимо сначала выполнить действие 'Настроить'.
* @param {number} timeout Максимальное время выполнения задания
* @returns Целочисленное значение с количеством писем
*/
function BAS_imap_client_messages_length() {
const timeout = _function_argument('timeout')
general_timeout_next(timeout)
imap_client_pull_messages_length()!
_function_return(imap_client_messages_length())
}
/**
*
*/
function BAS_parse_message() {
const timeout = _function_argument('timeout')
const id = _function_argument('id')
if (timeout) {
general_timeout_next(timeout)
}
imap_client_pull_message(id)!
VAR_MAIL_BODY = imap_client_message()
const csv_parse_result = VAR_MAIL_BODY.match(LINK_REGEXP) || []
VAR_LINK1 = csv_parse_result[0]
if(typeof(VAR_LINK1) == 'undefined' || !VAR_LINK1) {
VAR_LINK1 = ""
}
VAR_LINK2 = csv_parse_result[1]
if(typeof(VAR_LINK2) == 'undefined' || !VAR_LINK2) {
VAR_LINK2 = ""
}
VAR_LINK3 = csv_parse_result[2]
if(typeof(VAR_LINK3) == 'undefined' || !VAR_LINK3) {
VAR_LINK3 = ""
}
}
/**
* Найти Письмо (BAS-функция)
* Искать первое письмо, соответствующее всем критериям, сохранить тест письма и заголовки в указанных переменных.
* Если вы вызовете это действие без критериев, то будет найдено первое сообщение.
* Это действие автоматически извлекает ссылки из письма и сохраняет их в переменных.
* Если вы хотите получить несколько писем, используйте действие 'Найти все письма'.
* Чтобы извлекать заголовки такие как 'SUBJECT' или 'FROM', примените регулярное выражение к переменной VAR_MAIL_BODY. Например, чтобы извлечь заголовок 'FROM', используйте регулярное выражение From\:\s+(.*)
* Для правильной работы необходимо сначала выполнить действие 'Настроить'.
* @param {number} timeout Максимальное время выполнения задания
* @param {string} sender Отправитель Письма. Поиск по полю 'from' (отправитель письма). Поместите здесь часть почтового ящика отправителя. Оставьте пустым, чтобы не фильтровать по отправителю.
* Примеры:
* Пустая строка - Не фильтровать по отправителю.
* @twitter.com - Поиск письма от твиттер
* info@twitter.com - Поиск почты, отправленной с info@twitter.com
* @param {string} subject Тема Письма. Поиск по теме письма. Это условие можно комбинировать с другими.
* Примеры:
* Пустая строка - Не фильтровать по теме письма
* Часть темы письма - Поиск письма с темой, содержащей определенную строку
* @param {string} body Текст Письма. Поиск электронной почты по тексту сообщения. Это условие можно комбинировать с другими.
* Примеры:
* Пустая строка - Не фильтровать по тексту письма
* Часть текста письма - Поиск сообщения с текстом, содержащим определенную строку
* @param {string} to Получатель. Поиск по полю 'to' (почтовый получатель). Поместите здесь часть адреса получателя письма. Оставьте пустым, чтобы не фильтровать по получателю. Этот параметр полезен, если вы собираете почту из нескольких почтовых ящиков.
* Примеры:
* Пустая строка - Не фильтровать по получателю.
* test@yourdomain.com - Поиск сообщения, отправленного на почтовый ящик test@yourdomain.com
* @param {Function} callback Функция
* @returns Объект с параметрами:
*
* mail_body - Текст письма. Эта переменная будет содержать заголовки сообщения и текст письма после успешного выполнения действия. Вы можете извлекать заголовки или части текста с помощью регулярных выражений.
* Примеры:
* From: sender@gmail.com
* To: receiver@gmail.com
* Subject: Mail subject
*
* mail_id - Идентификатор найденного сообщения. Найденный идентификатор письма, может юыть использован для удаления сообщения действием 'Удалить сообщение'.
* Примеры:
* 7571 - Найдено сообщение с идентификатором 7571
*
* link1, link2, link3 - Переменные со ссылками. Ссылки будут автоматически извлечены из текста письма и помещены в переменные VAR_LINK1, VAR_LINK2 и VAR_LINK3. Вы можете назвать переменные по-другому или добавить новые, чтобы извлечь больше ссылок.
*/
function BAS_imap_client_search(timeout, sender, subject, body, to, callback) {
const args = _arguments()
const timeout = args.timeout || timeout
const sender = args.sender || (sender || '')
const subject = args.subject || (subject || '')
const body = args.body || (body || '')
const to = args.to || (to || '')
const callback = args.callback || callback
if (timeout) {
general_timeout_next(timeout)
}
if (!args.callback) {
imap_client_search(sender, subject, body, to)!
}
else {
imap_client_search(sender, subject, body, to, callback)!
}
VAR_MAIL_BODY = imap_client_search_result()
if (VAR_MAIL_BODY.length > 0) {
VAR_MAIL_BODY = VAR_MAIL_BODY[VAR_MAIL_BODY.length - 1]
}
else {
VAR_MAIL_BODY = ""
}
VAR_MAIL_ID = VAR_MAIL_BODY
_call_function(BAS_parse_message, {
timeout: timeout,
id: VAR_MAIL_BODY
})!
_function_return({
mail_body: imap_client_message(),
mail_id: VAR_MAIL_ID,
link1: VAR_LINK1,
link2: VAR_LINK2,
link3: VAR_LINK3
})
}
/**
* Найти все письма (BAS-функция)
* Найти все письма, соответствующие критериям, сохранить идентификаторы в переменную с типом список.
* Если будет задано несколько критериев, это действие вернет только письма, соответствующие сразу всем критериям.
* Если вы запустите это действие без критериев, будут извлечены все письма в почтовом ящике.
* Если вы хотите получить только одно сообщение, используйте действие 'Найти письмо'.
* Это действие возвращает переменную с типом список, используйте модуль 'Список' чтобы обработать эту переменную или действие 'Foreach' для создания цикла по списку screen https://wiki.bablosoft.com/lib/exe/fetch.php?cache=&media=fetchmails.png.
* Для правильной работы необходимо сначала выполнить действие 'Настроить'.
* @param {number} timeout Максимальное время выполнения задания
* @param {string} sender Отправитель Письма. Поиск по полю 'from' (отправитель письма). Поместите здесь часть почтового ящика отправителя. Оставьте пустым, чтобы не фильтровать по отправителю.
* Примеры:
* Пустая строка - Не фильтровать по отправителю.
* @twitter.com - Поиск письма от твиттер
* info@twitter.com - Поиск почты, отправленной с info@twitter.com
* @param {string} subject Тема Письма. Поиск по теме письма. Это условие можно комбинировать с другими.
* Примеры:
* Пустая строка - Не фильтровать по теме письма
* Часть темы письма - Поиск письма с темой, содержащей определенную строку
* @param {string} body Текст Письма. Поиск электронной почты по тексту сообщения. Это условие можно комбинировать с другими.
* Примеры:
* Пустая строка - Не фильтровать по тексту письма
* Часть текста письма - Поиск сообщения с текстом, содержащим определенную строку
* @param {string} to Получатель. Поиск по полю 'to' (почтовый получатель). Поместите здесь часть адреса получателя письма. Оставьте пустым, чтобы не фильтровать по получателю. Этот параметр полезен, если вы собираете почту из нескольких почтовых ящиков.
* Примеры:
* Пустая строка - Не фильтровать по получателю.
* test@yourdomain.com - Поиск сообщения, отправленного на почтовый ящик test@yourdomain.com
* @param {Function} callback Функция
* @returns Список с идентификаторами найденных писем. Эта переменная будет содержать список с идентификаторами писем. Идентификаторы не содержат ни текста сообщения, ни заголовков, но могут использоваться для их получения с помощью действия 'Получить сообщение'. Идентификаторы также могут использоваться для удаления писем действием 'Удалить сообщение'. Используйте действие 'Foreach', чтобы запустить цикл по списку идентификаторов.
* Примеры:
* [] - Сообщения не найдены.
* ["1", "2", "3"] - Найдено 3 сообщения.
*/
function BAS_imap_client_search_all(sender, subject, body, to, callback) {
const args = _arguments()
const sender = args.sender || (sender || '')
const subject = args.subject || (subject || '')
const body = args.body || (body || '')
const to = args.to || (to || '')
const callback = args.callback || callback
if (args.timeout) {
general_timeout_next(args.timeout)
}
if (!callback) {
imap_client_search(sender, subject, body, to)!
}
else {
imap_client_search(sender, subject, body, to, callback)!
}
const result = imap_client_search_result()
_function_return(result)
return result
}
/**
* Получить сообщение (BAS-функция)
* Получить письмо по идентификатору почты и извлечь ссылки.
* Идентификатор почты, может быть получен из действия 'Найти письмо' или из действия 'Найти все письма'.
* Это действие автоматически извлекает ссылки из письма и сохраняет их в переменных.
* Чтобы извлекать заголовки такие как 'SUBJECT' или 'FROM', примените регулярное выражение к переменной VAR_MAIL_BODY. Например, чтобы извлечь заголовок 'FROM', используйте регулярное выражение From\:\s+(.*)
* Для правильной работы необходимо сначала выполнить действие 'Настроить'.
*
* @param {number} timeout Максимальное время выполнения задания
*
* @param {string} id Идентификатор сообщения. Идентификатор почты, может быть получен из действия 'Найти письмо' или из действия 'Найти все письма'.
* Примеры:
* 7571 - Извлечь сообщение с идентификатором 7571
*
* @returns Объект с параметрами:
* mail_body - Текст письма. Эта переменная будет содержать заголовки сообщения и текст письма после успешного выполнения действия. Вы можете извлекать заголовки или части текста с помощью регулярных выражений.
* Примеры:
* From: sender@gmail.com
* To: receiver@gmail.com
* Subject: Mail subject
*
*
* link1, link2, link3 - Переменные со ссылками. Ссылки будут автоматически извлечены из текста письма и помещены в переменные VAR_LINK1, VAR_LINK2 и VAR_LINK3. Вы можете назвать переменные по-другому или добавить новые, чтобы извлечь больше ссылок.
*/
function BAS_imap_client_get_message() {
const timeout = _function_argument('timeout')
const id = _function_argument('id')
_call_function(BAS_parse_message, {
timeout: timeout,
id: id
})!
_function_return({
mail_body: VAR_MAIL_BODY,
link1: VAR_LINK1,
link2: VAR_LINK2,
link3: VAR_LINK3
})
}
/**
* Удалить сообщение (BAS-функция)
* Удалить адрес электронной почты с заданным идентификатором.
* Идентификатор почты, может быть получен из действия 'Найти письмо' или из действия 'Найти все письма'.
* Для правильной работы необходимо сначала выполнить действие 'Настроить'.
* @param {number} timeout Максимальное время выполнения задания
* @param {string} id Идентификатор сообщения. Идентификатор почты, может быть получен из действия 'Найти письмо' или из действия 'Найти все письма'.
* Примеры:
* 7571 - Извлечь сообщение с идентификатором 7571
*/
function BAS_imap_client_delete_message(timeout, id) {
const timeout = _function_argument('timeout') || timeout
const id = _function_argument('id') || id
if (timeout) {
general_timeout_next(timeout)
}
imap_custom_query("%base%folder","STORE " + id + " +Flags \\Deleted","")!
imap_custom_query("%base%folder","EXPUNGE","")!
}
