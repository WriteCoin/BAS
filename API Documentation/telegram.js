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
function BAS_telegram_send_message() {
  const args = _arguments()
  var getTime = function() {
  var checkTime = function (i) {
  return (i < 10) ? "0" + i : i;
  }
  var d = new Date();
  var hh = checkTime(d.getHours());
  var mm = checkTime(d.getMinutes());
  var ss = checkTime(d.getSeconds());
  return '[' + hh + ':' + mm + ':' + ss + ']'
  }
  var mess, _url, json, tmp = "";
  tmp = encodeURIComponent(args.message_text)
  const infoThread = (args.addMessageThread ? " Поток №" + thread_number() + " : " : "")
  const infoTime = (args.addMessageTime ? "<b>" + getTime() + infoThread + "</b>" : (args.addMessageThread ? "<b>" + infoThread + "</b>" : "")) 
  mess = infoTime + tmp
  _url = "https://api.telegram.org/bot"+ args.bot_token + "/sendMessage?chat_id=" + args.chat_id + "&text=" + mess + (args.addMessageThread || args.addMessageTime ? '&parse_mode=HTML' : '')
  _switch_http_client_internal()
  http_client_get2(_url, {method:("GET")})!
  var json = JSON.parse(http_client_content())
  _switch_http_client_main()
  if (!json['ok'])
  fail(json['description'], false)
}