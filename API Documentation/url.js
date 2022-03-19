/**
 * Нормализовать URL
 * Нормализовать URL.
 * Это действие вернет строку, содержащую URL, нормализованную в соответствии с указанными параметрами. Подробнее о нормализации URL можно узнать в Wiki https://ru.wikipedia.org/wiki/%D0%9D%D0%BE%D1%80%D0%BC%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F_URL.
 * Например, URL "www.site.com/api.php?b=two&a=one&c=three" будет нормализован до "https://site.com/api.php?a=one&b=two&c=three", если в параметр "Протокол по умолчанию" указан "https" и активированы параметры "Вырезать WWW", "Сортировать параметры запроса".
 * Параметр "Нормализовать протокол" отвечает за нормализацию относительного протокола. Подробнее об относительном протоколе можно узнать в Wiki https://en.wikipedia.org/wiki/Wikipedia:Protocol-relative_URL.
 * Получить из строки список ссылок можно с помощью действия "Извлечь все ссылки" из модуля "Строка".
 * Распарсить ссылку на элементы можно с помощью действия "Парсить URL".
 * Создать ссылку из элементов можно с помощью действия "Создать URL".
 * Изменить элементы ссылки можно с помощью действия "Изменить URL".
 * 
 * @param {string} url URL
  Строка, содержащая URL, который нужно нормализовать.
  Примеры :
  https://en.wikipedia.org/wiki/URL/

  //fingerprints.bablosoft.com/#testing/

  rucaptcha.com/in.php?key=1abc234de56fab7c89012d34e56fa7b8
  &method=userrecaptcha&version=enterprise&action=verify
  &min_score=0.3
  &googlekey=6LfZil0UAAAAAAdm1Dpzsw9q0F11-bmervx9g5fE&pageurl=http://mysite.com/page/

 * @param {Object} params {
 *  base_url: string - Базовый URL. Может быть пустым
  Необязательный параметр. URL используемый в случае, если основной URL является относительным.
  Примеры :
  https://en.wikipedia.org
  https://fingerprints.bablosoft.com
  https://rucaptcha.com
  
    default_protocol: 'https' | 'http' | 'wss' | 'ws' | 'ftps' | 'ftp' | 'file' - Протокол по умолчанию
  Протокол, который будет добавлен, если URL его не содержит.
  Примеры :
  http - URL testsite.com/ будет нормализована до http://testsite.com
  https - URL testsite.com будет нормализована до https://testsite.com

    normalize_protocol: boolean - Нормализовать протокол
  Если активирован и URL содержит относительный протокол, то к URL будет добавлен протокол из параметра "Протокол по умолчанию".
  Примеры :
  Активирован - URL //testsite.com/ будет нормализована до http://testsite.com

  Деактивирован - URL //testsite.com/ будет нормализована до //testsite.com

    froce_http: boolean - Принудительно http
  Если активирован, то в URL протокол https будут заменен на http.
  Примеры :
  Активирован - URL https://testsite.com/ будет нормализована до http://testsite.com

  Деактивирован - URL https://testsite.com/ будет нормализована до https://testsite.com

    force_https: boolean - Принудительно https
  Если активирован, то в URL протокол http будут заменен на https.
  Примеры :
  Активирован - URL http://testsite.com/ будет нормализована до https://testsite.com

  Деактивирован - URL http://testsite.com/ будет нормализована до http://testsite.com

    strip_authentication: boolean - Вырезать аутентификацию
  Если активирован, то из URL будут вырезаны данные аутентификации.
  Примеры :
  Активирован - URL user:pass@testsite.com/ будет нормализована до http://testsite.com

  Деактивирован - URL user:pass@testsite.com/ будет нормализована до http://user:pass@testsite.com

    strip_query: boolean - Вырезать запрос
  Если активирован, то из URL будут вырезан запрос.
  Примеры :
  Активирован - URL https://testsite.com/api.php?a=one&b=two&c=three будет нормализована до https://testsite.com/api.php

  Деактивирован - URL testsite.com/api.php?a=one&b=two&c=three будет нормализована до http://testsite.com/api.php?a=one&b=two&c=three

    strip_hash: boolean - Вырезать фрагмент/якорь
  Если активирован, то из URL будут вырезан фрагмент/якорь.
  Примеры :
  Активирован - URL testsite.com/info.html#fragment будет нормализована до http://testsite.com/info.html

  Деактивирован - URL testsite.com/info.html#fragment будет нормализована до http://testsite.com/info.html#fragment

    strip_protocol: boolean - Вырезать протокол
  Если активирован, то из URL будут вырезан протокол.
  Примеры :
  Активирован - URL https://testsite.com/ будет нормализована до testsite.com

  Деактивирован - URL https://testsite.com/ будет нормализована до https://testsite.com

    strip_www: boolean - Вырезать WWW
  Если активирован, то из URL будут вырезан WWW.
  Примеры :
  Активирован - URL https://www.testsite.com/ будет нормализована до https://testsite.com

  Деактивирован - URL https://www.testsite.com/ будет нормализована до https://www.testsite.com

    remove_query_parameters: Array<string> - Удалить параметры запроса. Может быть пустым
  Необязательный параметр. Список, состоящий из строк или регулярных выражений. Параметры запроса, имена которых соответствуют любому из указанных элементов списка, будут удалены. В качестве списка можно использовать строку, состоящую из имен параметров запроса, разделенных запятыми.
  Примеры :
  [/^utm_w+/i]
  ["foo", "ref"]
  ["bar", "test"]
  foo, bar, top
  test,ref,bottom
  Пустая строка - Не удалять параметры запроса

    remove_trailing_slash: boolean - Удалить завершающий слэш
  Если активирован, то из URL будет удален завершающий слэш.
  Примеры :
  Активирован - URL testsite.com/info/ будет нормализована до http://testsite.com/info

  Деактивирован - URL testsite.com/info/ будет нормализована до http://testsite.com/info/

    remove_directory_index: Array<string> - Удалить индекс каталога. Может быть пустым
  Необязательный параметр. Список, состоящий из строк или регулярных выражений. Индексы каталога, которые соответствуют любому из указанных элементов списка, будут удалены. В качестве списка можно использовать строку, состоящую из индексов каталога, разделенных запятыми.
  Примеры :
  [/^index.[a-z]+$/]
  [/^default.[a-z]+$/]
  ["index.php", "default.php"]
  index.html, index.php, default.php
  index.html,index.php,default.php
  Пустая строка - Не удалять индекс каталога

    sort_query_parameters: boolean - Сортировать параметры запроса
  Если активирован, то параметры запроса будут отсортированы по имени в алфавитном порядке.
  Примеры :
  Активирован - URL https://testsite.com/api.php?b=two&a=one&c=three будет нормализована до https://testsite.com/api.php?a=one&b=two&c=three

  Деактивирован - URL testsite.com/api.php?b=two&a=one&c=three будет нормализована до http://testsite.com/api.php?b=two&a=one&c=three
 * }
 * @returns итоговый URL.
  Примеры :
  https://en.wikipedia.org/wiki/URL

  http://fingerprints.bablosoft.com/#testing

  http://rucaptcha.com/in.php?key=1abc234de56fab7c89012d34e56fa7b8
  &method=userrecaptcha&version=enterprise&action=verify
  &min_score=0.3
  &googlekey=6LfZil0UAAAAAAdm1Dpzsw9q0F11-bmervx9g5fE&pageurl=http://mysite.com/page
 */
function BAS_url_normalize(url, params) {
  return _normalize_url(url, params)
}

/**
 * Парсить URL
 * Распарсить строку URL на элементы.
 * Это действие сохранит каждый элемент URL в свою переменную. Подробнее о URL можно узнать в Wiki https://ru.wikipedia.org/wiki/URL.
 * Запрос сохраняется в виде объекта, в котором ключ - это имя параметра, а значение - это значение параметра.
 * Чтобы получить значение параметра запроса, используйте JPath запрос $.key, где key - это имя параметра, в действии "Получить значение" из модуля "JSON".
 * Перед парсингом URL можно нормализовать, активировав соответствующий параметр в дополнительных настройках, или использовать действие "Нормализовать URL" для гибкой нормализации. Подробнее о нормализации URL можно узнать в Wiki https://ru.wikipedia.org/wiki/%D0%9D%D0%BE%D1%80%D0%BC%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F_URL.
 * Получить из строки список ссылок можно с помощью действия "Извлечь все ссылки" из модуля "Строка".
 * Создать ссылку из элементов можно с помощью действия "Создать URL".
 * Изменить элементы ссылки можно с помощью действия "Изменить URL".
 * Если указан недействительный URL, поток остановится с сообщением об ошибке. Если вы хотите продолжить работу, используйте действие "Игнорировать ошибки", или деактивируйте соответствующий параметр в дополнительных настройках.
 * 
 * @param {string} url URL
  Строка, содержащая URL, который нужно распарсить.
  Примеры :
  https://en.wikipedia.org/wiki/URL

  https://fingerprints.bablosoft.com/#testing

  https://rucaptcha.com/in.php?key=1abc234de56fab7c89012d34e56fa7b8
  &method=userrecaptcha&version=enterprise&action=verify
  &min_score=0.3
  &googlekey=6LfZil0UAAAAAAdm1Dpzsw9q0F11-bmervx9g5fE&pageurl=http://mysite.com/page/

 * @param {boolean} normalize Нормализовать URL перед парсингом
 * @param {string} base_url Базовый URL
  Необязательный параметр. URL используемый в случае, если основной URL является относительным.
  Примеры :
  https://en.wikipedia.org
  https://fingerprints.bablosoft.com
  https://rucaptcha.com

 * @param {boolean} rfail Завершить действие ошибкой, если указан недействительный URL
 * @returns Object {
 *  protocol: string - Протокол/Схема
  Эта переменная будет содержать протокол/схему указанного URL. Схема обращения к ресурсу, в большинстве случаев, имеется в виду сетевой протокол.
  Примеры :
  https
  http
  ws
  ftp
  Пустая строка - Указанный URL не содержит протокола/схемы

    username: string - Логин
  Эта переменная будет содержать имя пользователя указанного URL. Имя пользователя, используемое для доступа к ресурсу.
  Примеры :
  user1
  login321
  myname
  Пустая строка - Указанный URL не содержит логина

    password: string - Пароль
  Эта переменная будет содержать пароль указанного пользователя.
  Примеры :
  pass123
  mypassword111
  goodpass
  Пустая строка - Указанный URL не содержит пароля

    host: string - Хост
  Эта переменная будет содержать имя хоста или ip (IPv4 или IPv6) указанного URL.
  Примеры :
  en.wikipedia.org
  fingerprints.bablosoft.com
  rucaptcha.com
  127.0.0.1
  [2a00:1450:4025:401::67]

    port: number - Порт
  Эта переменная будет содержать порт указанного URL.
  Примеры :
  80
  443
  21
  Пустая строка - Указанный URL не содержит порт

    path: string - Путь
  Эта переменная будет содержать путь указанного URL. Путь уточняет информацию о месте нахождения ресурса.
  Примеры :
  /wiki/URL
  /
  /in.php

    query: Object - Запрос
  Эта переменная будет содержать объект, состоящий из параметров запроса и полученных их значений из указанного URL. Запрос - это часть URL-адреса, начинающаяся с символа "?", параметры разделяются знаком "&", а имя параметра и его значение разделяются знаком "=".
  Примеры :
  {"foo":"bar"}

  {"query":"string"}

  {"key":"1abc234de56fab7c89012d34e56fa7b8", "method":"userrecaptcha", "version":"enterprise", "action":"verify", "min_score":0.3, "googlekey":"6LfZil0UAAAAAAdm1Dpzsw9q0F11-bmervx9g5fE", "pageurl":"http://mysite.com/page/"}

  { } - Указанный URL не содержит параметров запроса

    fragment: Фрагмент/Якорь
  Эта переменная будет содержать фрагмент/якорь указанного URL. Фрагмент/Якорь - это часть URL-адреса, начинающаяся с символа "#", он может указывать заголовок внутри документа или id атрибут элемента. По ссылке с фрагментом/якорем браузер откроет страницу и переместит окно к указанному элементу.
  Примеры :
  info
  testing
  solving_recaptcha_enterprise
  Пустая строка - Указанный URL не содержит фрагмент/якорь
 * }
 */
function BAS_url_parse(url, normalize, base_url, rfail) {
  const parse_res = new _url(url, {
    normalize: normalize,
    base_url: base_url,
    rfail: rfail
  })
  VAR_PARSED_URL_PROTOCOL = _avoid_nil(parse_res["protocol"]);
  VAR_PARSED_URL_USERNAME = _avoid_nil(parse_res["username"]);
  VAR_PARSED_URL_PASSWORD = _avoid_nil(parse_res["password"]);
  VAR_PARSED_URL_HOST = _avoid_nil(parse_res["host"]);
  VAR_PARSED_URL_PORT = _avoid_nil(parse_res["port"]);
  VAR_PARSED_URL_PATH = _avoid_nil(parse_res["pathname"]);
  VAR_PARSED_URL_QUERY = _avoid_nil(parse_res["query"]);
  VAR_PARSED_URL_FRAGMENT = _avoid_nil(parse_res["hash"]);
  return {
    protocol: VAR_PARSED_URL_PROTOCOL,
    username: VAR_PARSED_URL_USERNAME,
    password: VAR_PARSED_URL_PASSWORD,
    host: VAR_PARSED_URL_HOST,
    port: VAR_PARSED_URL_PORT,
    path: VAR_PARSED_URL_PATH,
    query: VAR_PARSED_URL_QUERY,
    fragment: VAR_PARSED_URL_FRAGMENT
  }
}

/**
 * Создать URL
 * Создать URL из указанных элементов.
 * Это действие вернет строку, содержащую итоговый URL. Подробнее о URL можно узнать в Wiki https://ru.wikipedia.org/wiki/URL.
 * Укажите значения для элементов которые нужно добавить в URL, оставьте пустыми элементы которые не нужно добавлять.
 * Запрос нужно указывать в виде объекта, в котором ключ - это имя параметра, а значение - это значение параметра, пример: {"foo":"bar"}. Или в виде строки, в которой параметры разделяются знаком "&", а имя параметра и его значение разделяются знаком "=", пример: "foo=bar".
 * Распарсить ссылку на элементы можно с помощью действия "Парсить URL".
 * Изменить элементы ссылки можно с помощью действия "Изменить URL".
 * 
 * @param {Object} params {
 *  protocol: string - Протокол/Схема. Может быть пустым
  Необязательный параметр. Схема обращения к ресурсу, в большинстве случаев, имеется в виду сетевой протокол.
  Примеры :
  https
  http
  ws
  ftp
  Пустая строка - Не добавлять этот элемент в итоговый URL

    username: string - Логин. Может быть пустым
  Необязательный параметр. Имя пользователя, используемое для доступа к ресурсу.
  Примеры :
  user1
  login321
  myname
  Пустая строка - Не добавлять этот элемент в итоговый URL

    password: string - Пароль. Может быть пустым
  Необязательный параметр. Пароль указанного пользователя.
  Примеры :
  pass123
  mypassword111
  goodpass
  Пустая строка - Не добавлять этот элемент в итоговый URL

    host: string - Хост. Может быть пустым
  Необязательный параметр. Имя хоста или ip (IPv4 или IPv6).
  Примеры :
  en.wikipedia.org
  fingerprints.bablosoft.com
  rucaptcha.com
  127.0.0.1
  [2a00:1450:4025:401::67]
  Пустая строка - Не добавлять этот элемент в итоговый URL

    port: string - Порт. Может быть пустым
  Необязательный параметр. Порт ресурса.
  Примеры :
  80
  443
  21
  Пустая строка - Не добавлять этот элемент в итоговый URL

    pathname: string - Путь. Может быть пустым
  Необязательный параметр. Путь, уточняющий информацию о месте нахождения ресурса.
  Примеры :
  /wiki/URL
  /
  /in.php
  Пустая строка - Не добавлять этот элемент в итоговый URL

    query: string - Запрос. Может быть пустым
  Необязательный параметр. Объект или строка запроса. Запрос - это часть URL-адреса, начинающаяся с символа "?", параметры разделяются знаком "&", а имя параметра и его значение разделяются знаком "=".
  Примеры :
  {"foo":"bar"}

  {"query":"string"}

  sitekey=10000000-ffff-ffff-ffff-000000000001&pageurl=http://mysite.com/register

  Пустая строка - Не добавлять этот элемент в итоговый URL

    hash: string - Фрагмент/Якорь. Может быть пустым
  Необязательный параметр. Фрагмент/Якорь - это часть URL-адреса, начинающаяся с символа "#", он может указывать заголовок внутри документа или id атрибут элемента. По ссылке с фрагментом/якорем браузер откроет страницу и переместит окно к указанному элементу.
  Примеры :
  info
  testing
  solving_recaptcha_enterprise
  Пустая строка - Не добавлять этот элемент в итоговый URL
 * }
 * @returns итоговый URL.
  Примеры :
  https://en.wikipedia.org/wiki/URL

  http://fingerprints.bablosoft.com/#testing

  http://rucaptcha.com/in.php?key=1abc234de56fab7c89012d34e56fa7b8
  &method=userrecaptcha&version=enterprise&action=verify
  &min_score=0.3
  &googlekey=6LfZil0UAAAAAAdm1Dpzsw9q0F11-bmervx9g5fE&pageurl=http://mysite.com/page
 */
function BAS_generate_url(params) {
  const obj = {
    protocol: params.protocol || '',
    username: params.username || '',
    password: params.password || '',
    host: params.host || '',
    port: params.port || '',
    pathname: params.pathname || '',
    query: params.query || '',
    hash: params.hash || ''
  }
  return _generate_url(obj)
}

/**
 * Изменить URL
 * Изменить элементы указанной URL.
 * Это действие вернет строку, содержащую изменный URL. Подробнее о URL можно узнать в Wiki https://ru.wikipedia.org/wiki/URL.
 * Укажите новые значения для элементов, которые нужно изменить в URL, укажите "-BAS-CLEAR-" если элемент нужно удалить, оставьте поле пустым если элемент не нужно менять.
 * Запрос нужно указывать в виде объекта, в котором ключ - это имя параметра, а значение - это значение параметра, пример: {"foo":"bar"}. Или в виде строки, в которой параметры разделяются знаком "&", а имя параметра и его значение разделяются знаком "=", пример: "foo=bar".
 * Если активирован параметр "Очистить старую строку запроса", то при указании параметра "Запрос" его значение будет полностью заменять старую строку запроса в указанном URL.
 * Например, если указан URL "https://site.com/?a=b", запрос {"c":"d"} и активирован параметр "Очистить старую строку запроса", то действие вернет "https://site.com/?c=d".
 * Если параметр "Очистить старую строку запроса" деактивирован, то при указании параметра "Запрос" его значение будет объединено со значением старой строки запроса в указанном URL. Если элемент с одинаковым именем присутствует как в старом, так и в новом запросе, то в итоговый URL будет добавлено только значение из нового запроса. Элементы, присутствующие только в старом или только в новом запросе, будут добавлены в итоговый URL без изменений. Элементы нового запроса содержащие "-BAS-CLEAR-", будут удалены из итогового URL.
 * Например, если указан URL "https://site.com/?a=b&c=d&e=f", запрос {"a":"i","c":"-BAS-CLEAR-","g":"h"} и деактивирован параметр "Очистить старую строку запроса", то действие вернет "https://site.com/?a=i&e=f&g=h".
 * Перед изменением URL можно нормализовать, активировав соответствующий параметр в дополнительных настройках, или использовать действие "Нормализовать URL" для гибкой нормализации. Подробнее о нормализации URL можно узнать в Wiki https://ru.wikipedia.org/wiki/%D0%9D%D0%BE%D1%80%D0%BC%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F_URL.
 * Распарсить ссылку на элементы можно с помощью действия "Парсить URL".
 * Создать ссылку из элементов можно с помощью действия "Создать URL".
 * Если указан недействительный URL, поток остановится с сообщением об ошибке. Если вы хотите продолжить работу, используйте действие "Игнорировать ошибки", или деактивируйте соответствующий параметр в дополнительных настройках.
 * 
 * @param {string} url URL
  Строка, содержащая URL, который нужно изменить.
  Примеры :
  https://en.wikipedia.org/wiki/URL

  https://fingerprints.bablosoft.com/#testing

  https://rucaptcha.com/in.php?key=1abc234de56fab7c89012d34e56fa7b8
  &method=userrecaptcha&version=enterprise&action=verify
  &min_score=0.3
  &googlekey=6LfZil0UAAAAAAdm1Dpzsw9q0F11-bmervx9g5fE&pageurl=http://mysite.com/page/
 * @param {Object} params {
 *  protocol: string - Протокол/Схема. Может быть пустым
  Необязательный параметр. Схема обращения к ресурсу, в большинстве случаев, имеется в виду сетевой протокол.
  Примеры :
  https
  http
  ws
  ftp
  Пустая строка - Не добавлять этот элемент в итоговый URL

    username: string - Логин. Может быть пустым
  Необязательный параметр. Имя пользователя, используемое для доступа к ресурсу.
  Примеры :
  user1
  login321
  myname
  Пустая строка - Не добавлять этот элемент в итоговый URL

    password: string - Пароль. Может быть пустым
  Необязательный параметр. Пароль указанного пользователя.
  Примеры :
  pass123
  mypassword111
  goodpass
  Пустая строка - Не добавлять этот элемент в итоговый URL

    host: string - Хост. Может быть пустым
  Необязательный параметр. Имя хоста или ip (IPv4 или IPv6).
  Примеры :
  en.wikipedia.org
  fingerprints.bablosoft.com
  rucaptcha.com
  127.0.0.1
  [2a00:1450:4025:401::67]
  Пустая строка - Не добавлять этот элемент в итоговый URL

    port: string - Порт. Может быть пустым
  Необязательный параметр. Порт ресурса.
  Примеры :
  80
  443
  21
  Пустая строка - Не добавлять этот элемент в итоговый URL

    pathname: string - Путь. Может быть пустым
  Необязательный параметр. Путь, уточняющий информацию о месте нахождения ресурса.
  Примеры :
  /wiki/URL
  /
  /in.php
  Пустая строка - Не добавлять этот элемент в итоговый URL

    query: string - Запрос. Может быть пустым
  Необязательный параметр. Объект или строка запроса. Запрос - это часть URL-адреса, начинающаяся с символа "?", параметры разделяются знаком "&", а имя параметра и его значение разделяются знаком "=".
  Примеры :
  {"foo":"bar"}

  {"query":"string"}

  sitekey=10000000-ffff-ffff-ffff-000000000001&pageurl=http://mysite.com/register

  Пустая строка - Не добавлять этот элемент в итоговый URL

    hash: string - Фрагмент/Якорь. Может быть пустым
  Необязательный параметр. Фрагмент/Якорь - это часть URL-адреса, начинающаяся с символа "#", он может указывать заголовок внутри документа или id атрибут элемента. По ссылке с фрагментом/якорем браузер откроет страницу и переместит окно к указанному элементу.
  Примеры :
  info
  testing
  solving_recaptcha_enterprise
  Пустая строка - Не добавлять этот элемент в итоговый URL
 * }

  @param {Object} settings {
    normalize: boolean - Нормализовать URL перед изменением
    base_url: string - Базовый URL
  Необязательный параметр. URL используемый в случае, если основной URL является относительным.
  Примеры :
  https://en.wikipedia.org
  https://fingerprints.bablosoft.com
  https://rucaptcha.com

    rfail: boolean - Завершить действие ошибкой, если указан недействительный URL

    clear_query: boolean - Очистить старую строку запроса
  Если активирован, то при указании параметра "Запрос" его значение будет полностью заменять старую строку запроса. Если деактивирован, то при указании параметра "Запрос" его значение будет объединено со значением старой строки запроса.
  Примеры :
  Активирован - URL "https://site.com/?a=b&c=d" будет изменена до "https://site.com/?f=g", если указан запрос "f=g" или {"f":"g"}

  Деактивирован - URL "https://site.com/?a=b&c=d" будет изменена до "https://site.com/?a=b&c=d&f=g", если указан запрос "f=g" или {"f":"g"}
  }

 * @returns итоговый URL.
  Примеры :
  https://en.wikipedia.org/wiki/URL

  http://fingerprints.bablosoft.com/#testing

  http://rucaptcha.com/in.php?key=1abc234de56fab7c89012d34e56fa7b8
  &method=userrecaptcha&version=enterprise&action=verify
  &min_score=0.3
  &googlekey=6LfZil0UAAAAAAdm1Dpzsw9q0F11-bmervx9g5fE&pageurl=http://mysite.com/page
 */
function BAS_change_url(url, params) {
  VAR_CHANGED_URL = _change_url("URL", {protocol:("Протокол"), username:("Логин"), password:("Пароль"), host:("Хост"), port:("Порт"), pathname:("Путь"), query:("Запрос"), hash:("Фрагмен")}, {normalize: true, base_url: "Базовый URL", rfail: true, clear_query: true});
  return _change_url(url, params)
}

/**
 * Парсить User-Agent
 * Распарсить строку User-Agent на элементы.
 * Это действие сохранит каждый элемент User-Agent в свою переменную.
 * User-agent - эта строка, содержащая информацию о используемом браузере, операционной системе, девайсе. Подробнее об User-agent можно узнать из Wiki https://ru.wikipedia.org/wiki/User_agent.
 * 
 * @param {string} user_agent 
 * @returns Object {
 *  platform_type: string - Тип платформы
  Эта переменная будет содержать тип платформы.
  Примеры :
  desktop
  mobile
  tablet
  tv
  car
  bot

    browser_name: string - Название браузера
  Эта переменная будет содержать название браузера.
  Примеры :
  Chrome
  Firefox
  Safari

    browser_version: string - Версия браузера
  Эта переменная будет содержать версию браузера.
  Примеры :
  86.0.4240.198
  82.0
  14.0

    browser_major_version: string - Основная версия браузера
  Эта переменная будет содержать основную версию браузера.
  Примеры :
  86
  82
  14

    engine_name: string - Название движка
  Эта переменная будет содержать название движка браузера.
  Примеры :
  Blink
  Gecko
  WebKit

    engine_version: string - Версия движка
  Эта переменная будет содержать версию движка браузера.
  Примеры :
  86.0.4240.198
  82.0
  605.1.15

    os_name: string - Название ОС
  Эта переменная будет содержать название операционной системы.
  Примеры :
  Android
  Windows
  Mac OS

    os_version: string - Версия ОС
  Эта переменная будет содержать версию операционной системы.
  Примеры :
  11
  10
  11.0.1

    device_vendor: string - Производитель устройства
  Эта переменная будет содержать название производителя устройства.
  Примеры :
  Samsung
  Asus
  Apple

    device_model: string - Модель устройства
  Эта переменная будет содержать модель устройства.
  Примеры :
  SM-T865
  ASU2JS
  iPhone

    device_type: string - Тип устройства
  Эта переменная будет содержать тип устройства.
  Примеры :
  tablet
  desktop
  mobile

    cpu_architecture: string - Архитектура процессора
  Эта переменная будет содержать архитектуру процессора.
  Примеры :
  amd64
  ia[32/64]
  arm[64]
 * }
 */
function BAS_parse_user_agent(user_agent) {
  const parse_res = new _ua(user_agent);
  VAR_PARSED_UA_PLATFORM_TYPE = _avoid_nil(parse_res["platform"]["type"]);
  VAR_PARSED_UA_BROWSER_NAME = _avoid_nil(parse_res["browser"]["name"]);
  VAR_PARSED_UA_BROWSER_VERSION = _avoid_nil(parse_res["browser"]["version"]);
  VAR_PARSED_UA_BROWSER_MAJOR_VERSION = _avoid_nil(parse_res["browser"]["major"]);
  VAR_PARSED_UA_ENGINE_NAME = _avoid_nil(parse_res["engine"]["name"]);
  VAR_PARSED_UA_ENGINE_VERSION = _avoid_nil(parse_res["engine"]["version"]);
  VAR_PARSED_UA_OS_NAME = _avoid_nil(parse_res["os"]["name"]);
  VAR_PARSED_UA_OS_VERSION = _avoid_nil(parse_res["os"]["version"]);
  VAR_PARSED_UA_DEVICE_VENDOR = _avoid_nil(parse_res["device"]["vendor"]);
  VAR_PARSED_UA_DEVICE_MODEL = _avoid_nil(parse_res["device"]["model"]);
  VAR_PARSED_UA_DEVICE_TYPE = _avoid_nil(parse_res["device"]["type"]);
  VAR_PARSED_UA_CPU_ARCHITECTURE = _avoid_nil(parse_res["cpu"]["architecture"]);
  return {
    platform_type: VAR_PARSED_UA_PLATFORM_TYPE,
    browser_name: VAR_PARSED_UA_BROWSER_NAME,
    browser_version: VAR_PARSED_UA_BROWSER_VERSION,
    browser_major_version: VAR_PARSED_UA_BROWSER_MAJOR_VERSION,
    engine_name: VAR_PARSED_UA_ENGINE_NAME,
    engine_version: VAR_PARSED_UA_ENGINE_VERSION,
    os_name: VAR_PARSED_UA_OS_NAME,
    os_version: VAR_PARSED_UA_OS_VERSION,
    device_vendor: VAR_PARSED_UA_DEVICE_VENDOR,
    device_model: VAR_PARSED_UA_DEVICE_MODEL,
    device_type: VAR_PARSED_UA_DEVICE_TYPE,
    cpu_architecture: VAR_PARSED_UA_CPU_ARCHITECTURE
  }
}

/**
 * Punycode кодировать/декодировать
 * Кодирует или декодирует строку в punycode.
 * Punycode - это метод преобразования последовательностей Unicode-символов в последовательность ASCII-символов, разрешенных в доменных именах. Подробнее о Punycode можно узнать в Wiki https://ru.wikipedia.org/wiki/Punycode.
 * Это действие может работать в двух режимах: кодирование и декодирование. Режимы могут переключаться параметром "Шифровать или расшифровывать". В зависимости от режима, входным параметром будет либо закодированая punycode строка, которая должна быть декодирована, либо обычная строка, которая должна быть закодирована.
 * Например, если указана строка "кто.рф" и активирован режим encode, то действие вернет "xn--j1ail.xn--p1ai". А если указана строка "https://xn--80aswg.xn--p1ai/index.html" и активирован режим decode, то действие вернет "https://сайт.рф/index.html".
 * Это действие работает как с доменами так и с ссылками.
 * 
 * @param {string} str Строка
  В зависимости от режима, входным параметром будет либо закодированая punycode строка, которая должна быть декодирована, либо обычная строка, которая должна быть закодирована.
  Примеры :
  https://сайт.рф/index.html - Любая строка. Работает в режиме encode
  https://xn--80aswg.xn--p1ai/index.html - Закодированная строка. Работает в режиме decode

 * @param {boolean} encode Шифровать или расшифровывать
 * @returns закодированная строка в случае использования режима encode и результат декодирования при использовании режима decode.
 */
function BAS_url_punycode(str, encode) {
  return encode ? _punycode.urlToASCII(str) : _punycode.urlToUnicode(str)
}

/**
 * Url компонент кодировать/декодировать
 * Кодирует или декодирует строку содержащую Url компонент.
 * Это действие может работать в двух режимах: кодирование и декодирование. Режимы могут переключаться параметром "Шифровать или расшифровывать". В зависимости от режима, входным параметром будет либо закодированая строка, которая должна быть декодирована, либо обычная строка содержащая Url компонент, которая должна быть закодирована.
 * Например, если указана строка "?x=test" и активирован режим encode, то действие вернет "%3Fx%3Dtest". А если указана строка "%D1%82%D0%B5%D1%81%D1%82" и активирован режим decode, то действие вернет "тест".
 * Получить из строки список ссылок можно с помощью действия "Извлечь все ссылки" из модуля "Строка".
 * Распарсить ссылку на элементы можно с помощью действия "Парсить URL".
 * 
 * @param {string} str Строка
  В зависимости от режима, входным параметром будет либо закодированая строка, которая должна быть декодирована, либо обычная строка содержащая Url компонент, которая должна быть закодирована.
  Примеры :
  ?x=test - Любая строка. Работает в режиме encode
  %3Fx%3Dtest - Закодированная строка. Работает в режиме decode

 * @param {boolean} encode Шифровать или расшифровывать
 * @returns закодированная строка в случае использования режима encode и результат декодирования при использовании режима decode.
 */
function BAS_url_component(str, encode) {
  return encode ? _encode_url_component(str) : _decode_url_component(str)
}