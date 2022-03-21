const get_telegram_functions = (f) => {
	/**
* Отправить Сообщение (BAS-функция)
* Отправить сообщение в заданный Telegram чат.
* Как создать бота и получить chat id https://habrahabr.ru/post/306222/
* @param {string} bot_token Token бота
* @param {string} chat_id Id чата
* @param {string} message_text Текст сообщения
* @param {boolean} addMessageThread Добавить в начало сообщения номер потока
* @param {boolean} addMessageTime Добавить в начало сообщения время [hh:mm:ss]
*/
const BAS_telegram_send_message = async (params) => await f("BAS_telegram_send_message", params)

return {	BAS_telegram_send_message,
}
}

module.exports = get_telegram_functions