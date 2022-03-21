/**
* SMTP Прокси
* По умолчанию SMTP клиент работает без прокси, это действие устанавливает прокси для SMTP клиента.
* @param {string} server Прокси
* @param {string} port Тип прокси
* @param {string} name Прокси Логин. Может быть пустым.
* @param {string} password Пароль Прокси. Может быть пустым.
*/
function BAS_smtp_client_set_proxy(server, port, name, password) {
const server = _function_argument('server') || server
const port = _function_argument('port') || port
const name = _function_argument('name') || name
const password = _function_argument('password') || password
const hash = proxy_parse(server)
if (port !== "auto") {
hash.IsHttp = port === "http"
}
const login = name
const password = password
if (login.length > 0 && password.length > 0) {
hash.name = login
hash.password = password
}
smtp_client_set_proxy(
hash.server,
hash.Port,
hash.IsHttp,
hash.name,
hash.password
)
}
/**
* Отправить письмо (BAS-функция)
* Отправить сообщение электронной почты, используя SMTP-клиент. Он должен быть предварительно настроен с помощью действия "SMTP Настройки".
* @param {string} mail_from От кого
* @param {string} mail_to Кому
* @param {string} mail_cc Копия. Может быть пустым.
* @param {string} mail_subject Тема письма. Может быть пустым.
* @param {string} mail_body Текст письма. Может быть пустым.
* @param {boolean} is_html Отправить как HTML
* @param {string} attachments Прикрепляемые файлы. Может быть пустым.
*/
function BAS_send_email() {
const args = _arguments()
const mailcc = args.mail_cc || ""
const mailsubject = args.mail_subject || ""
const mailbody = args.mail_body || ""
const attachments = args.attachments || ""
native_async(
"curlwrapper",
"easyperform",
JSON.stringify(
smtp_client_send_mail(
args.mail_from,
args.mail_to,
mailcc,
mailsubject,
mailbody,
args.is_html,
attachments
)
)
)!
{
const json = JSON.parse(_result())
if(typeof(_SMTP_DEBUG) != "undefined" && _SMTP_DEBUG)
log(json["trace"]);
if(json["code"] != "CURLE_OK")
{
fail(json["code"] + ": " + json["error"])
}
}
}
/**
* Включить отладку
* Включить режим отладки для отправки электронной почты.
* @param {boolean} enable Включить отладку
*/
function BAS_smtp_debug_enable(enable) {
const enable = _function_argument('enable') || enable
_SMTP_DEBUG = enable
}
