/**
 * SMTP Настройки
 * Настроить доступ к SMTP серверу для отправки электронной почты.
 * @param host Адрес SMTP сервера
 * @param port Порт
 * @param login Имя пользователя. Может быть пустым
 * @param pass Пароль. Может быть пустым
 * @param encrypt Шифрование
 */
declare function smtp_client_set_config(host: string, port: number, login: string, pass: string, encrypt: 'ssl' | 'tls' | 'none'): void

