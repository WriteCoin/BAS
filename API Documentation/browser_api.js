/**
 * Код страницы
 * Получение кода страницы и сохранение его в переменной. Это действие сохраняет текущий код со всеми изменениями, а не тот, который сервер вернул изначально.
 * Вы можете парсить его с помощью регулярных выражений или xpath.
 * element - элемент html-страницы, с которого получать скрипт
 */
 function get_html_script() {
  const element = _function_argument('element')
  page().script(element)!
  _function_return(_result())
}

/**
 * Получить разрешение и положение курсора
 * Получить текущий размер браузера, положение курсора и прокрутки.
 * Чтобы изменить размеры браузера, используйте действие "Разрешение".
 * Чтобы изменить текущее положение прокрутки, используйте действие "Прокрутка".
 * Чтобы изменить текущее положение курсора, используйте действие "Двигать Мышь".
 * Возвращает объект с полями:
 * cursorX - Положение курсора X
 * cursorY - Положение курсора Y
 * scrollX - Положение прокрутки X
 * scrollY - Положение прокрутки Y
 * width - Ширина браузера
 * height - Высота браузера
 */
 function get_browser_screen_settings() {
  _get_browser_screen_settings()!
  const result = JSON.parse(_result())
  _function_return({
    scrollX: result['ScrollX'],
    scrollY: result['ScrollY'],
    cursorX: result['CursorX'],
    cursorY: result['CursorY'],
    width: result['Width'],
    height: result['Height']
  })
  _result_function()
}

/**
 * Прокси
 * По умолчанию браузер работает без прокси, это действие устанавливает его.
 * Используйте ресурсы, если вы хотите взять прокси из файла, url или базы данных.
 * Вы можете изменить прокси до или после создания браузера или загрузки страницы.
 * Пустой параметр сбросит прокси до значения по умолчанию(прямое соединение).
 * 'Настройки безопасности' задают различные настройки браузера в соответствии с новым прокси, например: часовой пояс и месторасположение. Эти сделает ваше приложение менее обнаруживаемым. Проверьте информацию для каждого отдельного параметра, чтобы понять, для чего он нужны. Настройки по умолчанию обеспечат оптимальную работу.
 * Параметры:
 * proxy - Прокси. Строка с информацией о прокси. Она может содержать ip, порт и тип прокси в разных форматах. Эта строка может также содержать логин и пароль, если их нету, данные для аутентификации могут быть заданы с параметрами "Логин прокси" и "Прокси пароль". Примеры: 210.10.10.10:1085, username:password@210.10.10.10:1085, socks5://210.10.10.10:1085, socks:210.10.10.10:1085:username:password, http:username:password:210.10.10.10:1085, {{proxy}} - Получить из ресурса, Пустая строка - Без прокси
 * proxy_type - Тип прокси. Поддерживаются прокси типа socks5 и http. Примеры: socks, socks5 - То же, что и socks; http, https - То же, что и http
 * login - Прокси Логи. Может быть пустым. Логин от прокси, переопределяет логин в строке прокси. Полезно, если у вас много прокси с одинаковыми логинами и паролями.
 * password - Пароль Прокси. Может быть пустым. Пароль от прокси, переопределяет пароль в строке прокси. Полезно, если у вас много прокси с одинаковыми логинами и паролями.
 * settings.changeTimeZone - Изменить часовой пояс. Изменить часовой пояс браузера в соответствии с прокси. Например, если прокси находится в Англии, то часовой пояс браузера будет изменен на UTC+00:00. Вы можете задать произвольное значение с помощью модуля "Часовой пояс". Примеры: true - Изменить часовой пояс, false - Не изменять часовой пояс
 * settings.changeLocation - Изменить месторасположение. Изменить месторасположение (координаты) браузера в соответствии с положением прокси. Оно будет установлено в точку, близкую к долготе/широте прокси. Вы можете задать произвольное значение с помощью модуля "Часовой пояс". Примеры: true - Запрос браузера на доступ к вашему месторасположению будет принят. Расположение баузера будет установлено в соответствии с прокси. false - Не менять месторасположение. Запрос браузера на доступ к вашему месторасположению будет отклонен.
 * settings.changeIPWebRTC - Изменить ip WebRTC. Заменить ip, возвращаемый WebRTC на ip прокси. Если вы хотите задать произвольное значение, используйте действие "Настройки браузера". Примеры: true - Включить WebRTC, заменить ip, возвращаемый WebRTC на ip прокси. false - Не менять состояние WebRTC.
 * settings.changeBrowserLanguage - Изменить язык браузера. Изменить язык браузера в зависимости от страны прокси. Этот параметр изменит заголовок Accept-Language, а также свойства javascript navigator.language и navigator.languages. По умолчанию значение языка будет состоять из языка и кода страны, разделенными дефисом, например 'de-DE' для Германии. Это значение корректное, но большинство браузеров использует более сложные варианты. Если вы хотите, чтобы BAS выглядел как настоящий браузер, используйте сервис FingersprintSwitcher, он установит язык в более естественное значение, например, для iPhone из Германии оно будет ровно 'de,en;q=0.8, *;q=0.01'. Вы также можете установить это значение явно, используя действие "Установить заголовок". Примеры: true - Изменить язык браузера в зависимости от страны прокси. false - Не изменять язык браузера, значение по умолчанию - 'en-US,en;q=0.9'.
 * settings.changeExternalIP - Определить внешний ip. Определить ip через внешний сервис. Этот параметр может быть полезен в том случае, если ip, который вы используете для подключения прокси, не соответствует ip видимому сайтом (внешнему ip). BAS будет использовать сервис ip.bablosoft.com для получения значения внешнего ip, а параметры "Изменить часовой пояс", "Изменить месторасположение" и "Изменить ip WebRTC" будут изменены в соответствии с полученным значением ip. Примеры: true - Использовать ip полученный из сервиса. false - Использовать ip полученный из строки прокси.
 * info.methodIP - Метод получения информации о IP. Метод, который будет использоваться для получения информации об IP. Примеры: database - Использовать внутреннюю базу данных, данный подход работает быстро и всегда доступен. Хотя база данных постоянно обновляется, этот метод может быть не самым точным по сравнению с другими. ip-api.com - Использовать сервис ip-api.com. Бесплатная версия имеет ограничение - 45 запросов с одного IP. Pro версия не ограничена количеством запросов, но стоит 15$ в месяц. custom function - Использовать отдельную BAS функцию для получения информации.
 * info.key - Ключ ip-api.com. Может быть пустым. Ключ от сервиса ip-api.com pro версии. Ключ доступен после покупки. Этот параметр используется только в том случае, если для параметра "Метод получения информации о IP" задано значение "ip-api.com" Примеры: Пустая строка - Использовать бесплатную версию, Ключ - Использовать pro версию
 * info.func - Отдельная функция для получения информации об IP. Отдельная функция BAS, которая получает строку IP {входной параметр называется "Ip"} и возвращает JSON с информацией об IP. Этот параметр используется только в том случае, если для параметра "Метод получения информации о IP" задано значение "custom function" Примеры: 
 * {
 *  valid: true,
 *  city: "Frankfurt am Main",
 *  country: "DE",
 *  dstoffset: -120,
 *  offset: -60,
 *  timezone: "Europe/Berlin",
 *  longitude: 8.6843,
 *  latitude: 50.1188,
 * } - Пример JSON, который должна возвращать функция.
 */
function BAS_proxy() {
  const proxy = _function_argument('proxy')
  const proxy_type = _function_argument('proxy_type')
  const login = _function_argument('login')
  const password = _function_argument('password')
  const settings = _function_argument('settings')
  const info = _function_argument('info')
  const hash = proxy_parse(proxy)
  if (proxy_type !== "auto") {
    hash.IsHttp = proxy_type === "http"
  }
  if (login.length > 0 && password.length > 0) {
    hash.name = login
    hash.password = password
  }
  if (_get_profile().length > 0) {
    if (hash.server.length === 0) {
      native("filesystem", "removefile", _get_profile() + "/proxy.txt")
    } else {
      const portNumber = hash.Port
      hash.Port = hash.Port.toString()
      native("filesystem", "writefile", JSON.stringify({path: _get_profile() + "/proxy.txt",value: JSON.stringify(hash),base64:false,append:false}))
      hash["Port"] = portNumber
    }
  }
  set_proxy(hash.server, hash.Port, hash.IsHttp, hash.name, hash.password)!
  sleep(1000)!
  set_proxy_extended(settings.changeTimeZone === "true", settings.changeLocation === "true", settings.changeIPWebRTC === "true", settings.changeBrowserLanguage === "true", settings.changeExternalIP === "true", info.methodIP, info.key, info.func)!
  sleep(1000)!
}

/**
 * Выполнить javscript в браузере
 * Максимальное время выполнения задания - general_timeout_next перед этой функцией
 * Выполнить javascript внутри браузера. Это означает, что доступны document, window и другие javascript объекты браузера.
 * Действие работает точно так же, как если бы вы вводили код в консоль браузера.
 * Вы можете использовать переменные BAS в данном действии как для чтения, так и для записи. Кроме того они могут быть любого типа, в том числе объектами и массивами.
 * Переменные используемые в коде автоматически обновляются после выполнения действия.
 * Ресурсы не доступны для использования в данном действии.
 * Во время выполнения скрипта могут возникать разные ошибки. В случае ошибки BAS прекратит выполнение скрипта.
 * Для того чтобы обработать подобные ситуации используйте действие Игнорировать ошибки.
 * В таком случае вы сможете использовать переменные [[WAS_ERROR]] и [[LAST_ERROR]], чтобы узнать, была ли ошибка, и обработать её.
 * Пример #1. Изменение HTML определенного элемента:
 * document.getElementById("id").innerHTML = [[ELEMENT_HTML]];
 * Пример #2. Получение HTML определенных элементов:
 * [[ELEMENT1_HTML]] = document.getElementById("id1").innerHTML;
 * [[ELEMENT2_HTML]] = document.getElementById("id2").innerHTML;
 * Пример #3. Установка значений для элементов `input` и `textarea`:
 * document.querySelector('textarea').value = [[TEXTAREA_VALUE]].join('\r\n');
 * document.querySelector('input').value = [[INPUT_VALUE]];
 * В данном действии вы можете писать код с использованием async и await. Действие будет ожидать завершения асинхронных операций.
 * При использовании асинхронного кода всегда дожидайтесь завершения функций с помощью await.
 * В противном случае переменные, значение которых задается в коллбэках либо в функциях then/catch/finally у класса Promise, не будут синхронизированы с BAS.
 * Если в таких участках кода вам не нужно обновлять переменные, вы можете не ждать их завершения.
 * Простой пример. Асинхронное ожидание в течение заданного времени (2 секунды):
 * await new Promise((resolve) => { setTimeout(() => resolve(), 2000); });
 * Другой пример. Получение данных со стороннего сайта с помощью функции fetch:
 * async function getPost(id) {
 *   return await fetch(`https://jsonplaceholder.typicode.com/posts/` + id)
 *     .then((res) => res.json());
 * }
 * [[POST]] = await getPost(1);
 */
function BAS_javascript() {
  const script = _function_argument('script')
  page().script2(script,JSON.stringify(_read_variables([])))!
  const _parse_result = JSON.parse(_result())
  _write_variables(JSON.parse(_parse_result.variables))
  if(!_parse_result.is_success)
  fail(_parse_result.error)
}

/**
 * Выполнять при каждой загрузке страницы в браузере
 * Это действие задает скрипт, который должен выполняться на каждой странице и в каждом фрейме сразу после создания страницы. В отличие от действия "Яваскрипт", скрипт, определенный здесь, выполняется в самом начале загрузки страницы, что дает возможность изменять внутренние элементы браузера, такие как window.navigator. Действие должно быть выполнено до загрузки страницы.
 * script - Текст сценария
 * url - Применять к урл. Измените этот параметр, если вы хотите применить действие только к определенным url. * означет любое количество любых символов. Вы можете использовать несколько действий с разными параметрами "Применять к урл". Например, установите один прокси-сервер для *instagram.com* адресов и другой для *google.com* адресов. Или установите один прокси для *instagram.com* адресов и другой для всех остальных с помощью *
 * Примеры: * - Любой url; *google.com* - Любой адрес, который содержит google.com
 * tab - Применять к вкладке с номером. Измените этот параметр, если вы хотите применить действие только к определенным влкадкам. * означает применить к любым вкладкам. Вы можете использовать несколько действий с разными параметрами "Применять к вкладке с номером". Например, установите один прокси-сервер для 0 вкладки и другой для 1 вкладки. Или установите один прокси для 0 вкладки и другой для всех остальных с помощью *
 * Примеры: * - Любая вкладка; 0 - Только первая вкладка
 */
function BAS_onLoadJavascript() {
  const script = _function_argument('script')
  const url = _function_argument('url')
  const tab = _function_argument('tab')
  _set_target({
    url: url,
    tab: tab
  })
  onloadjavascript(script)!
}

/**
 * Скриншот (async)
 * Это действие делает скриншот выбранной части экрана и сохраняет его в изображении в формате png, закодированном как строка base64.
 * Если выбранная область не видна, страница будет прокручена.
 * Координаты X и Y задаются в абсолютном смещении от краев страницы.
 * Если вы хотите сделать скриншот определенного элемента, нажмите на него и выберите действие "Скриншот".
 * Если вы хотите сделать снимок всей страницы, нажмите на любой элемент в браузере и используйте действие "Скриншот" с селектором >CSS> body.
 * @param x X
 * @param y Y
 * @param width Ширина
 * @param height Высота
 * @param callback функция
 */
function BAS_render(x, y, width, height) {
  const x = _function_argument('x')
  const y = _function_argument('y')
  const width = _function_argument('width')
  const height = _function_argument('height')
  render(x, y, width, height)!
  _function_return(_result())
}

/**
 * Решить Капчу
 * Это действие решает капчу в виде картинки(не recaptcha) и работает, только если у вас есть данные изображения, отформатированного как строка в формате base64.
 * Текст капчи сохраняется в переменной и может быть использован позже.
 * Если вы хотите решить капчу из элемента на экране, вы должны нажать на него и используйте действие "Решить Капчу".
 * Если вы хотите решить recaptcha, нажмите на флажок recaptcha внутри браузера и выберите "Решить Recaptcha 2.0".
 * @param {string} dataBase64 Данные изображения в base64
 * @param {string} method Метод решения
 * @param {string} key Ключ Антигейт/Рукапча/2капча/dbc. Может быть пустым
 * @param {string} serverUrl Url сервера. Может быть пустым
 */
function BAS_solveCaptcha(dataBase64, method, key, serverUrl) {
  const dataBase64 = _function_argument('dataBase64')
  const method = _function_argument('method')
  const key = _function_argument('key')
  const serverUrl = _function_argument('serverUrl')
  solver_properties_clear(method)
  BAS_SolveRecaptcha_Serverurl = serverUrl;
  if (BAS_SolveRecaptcha_Serverurl.length > 0 && BAS_SolveRecaptcha_Serverurl.substr(BAS_SolveRecaptcha_Serverurl.length - 1) != "/") BAS_SolveRecaptcha_Serverurl += "/"
  if(method === "rucaptcha") {
    if(BAS_SolveRecaptcha_Serverurl) solver_property("rucaptcha","serverurl",BAS_SolveRecaptcha_Serverurl)
    rucaptcha(key)
  }
  if(method === "antigate") {
    if(BAS_SolveRecaptcha_Serverurl) solver_property("antigate","serverurl",BAS_SolveRecaptcha_Serverurl)
    antigate(key)
  }
  if(method === "dbc") {
    if(BAS_SolveRecaptcha_Serverurl) solver_property("dbc","serverurl",BAS_SolveRecaptcha_Serverurl)
    dbc(key)
  }
  if(method === "2captcha") {
    if(BAS_SolveRecaptcha_Serverurl) solver_property("2captcha","serverurl",BAS_SolveRecaptcha_Serverurl)
    twocaptcha(key)
  }
  if(method === "capmonster" || method === "capmonsterimage" || method === "capmonsteraudio") {
    solver_property("capmonster","serverurl",BAS_SolveRecaptcha_Serverurl)
    capmonster(key)
  }
  _if_else(method == "captchasniper", function(){
    _switch_http_client_internal()
    http_client_post(BAS_SolveRecaptcha_Serverurl, ["file","base64://" + dataBase64], {"content-type":("multipart"), "encoding":("UTF-8"), "method":("POST")})!
    {const split = http_client_content().split("|");VAR_CAPTCHA_RESULT = split[split.length-1]}
    _switch_http_client_main()
  }, function(){
  solve_base64("manual",dataBase64)!
  VAR_CAPTCHA_RESULT = _result()
  })!
  _function_return(VAR_CAPTCHA_RESULT)
}