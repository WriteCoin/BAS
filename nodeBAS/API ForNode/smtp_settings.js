const get_smtp_settings_functions = (f) => {
	/**
* SMTP Прокси
* По умолчанию SMTP клиент работает без прокси, это действие устанавливает прокси для SMTP клиента.
* @param {string} server Прокси
* @param {string} port Тип прокси
* @param {string} name Прокси Логин. Может быть пустым.
* @param {string} password Пароль Прокси. Может быть пустым.
*/
const BAS_smtp_client_set_proxy = async (server, port, name, password) => await f("BAS_smtp_client_set_proxy", { server, port, name, password })

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
const BAS_send_email = async (params) => await f("BAS_send_email", params)

	/**
* Включить отладку
* Включить режим отладки для отправки электронной почты.
* @param {boolean} enable Включить отладку
*/
const BAS_smtp_debug_enable = async (enable) => await f("BAS_smtp_debug_enable", { enable })

return {	BAS_smtp_client_set_proxy,
	BAS_send_email,
	BAS_smtp_debug_enable,
}
}

module.exports = get_smtp_settings_functions