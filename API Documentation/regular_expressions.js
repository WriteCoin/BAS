/**
 * Первое вхождение
 * Применить регулярное выражение, получить первый соответствующий ему фрагмент текста, извлечь группы.
 * Регулярное выражение - удобный механизм для обработки строк. Он помогает искать строки, разделять строку на части и т. д. ( руководство, справка https://www.rexegg.com/regex-quickstart.html).
 * Вы можете представить регулярное выражение как какую-либо маску или шаблон, которой заданная строка должна соответствовать. Пример работы регулярного выражения можно описать таким образом: 'Найти в тексте последовательность букв, за которой следует символ @, за которым следует любая последовательность букв, либо точка'. Преобразуя это описание в регулярное выражени получим \w+@[a-zA-Z\.]+ это простое выражение для поиска почты в заданном тексте.
 * Переменная, указанная в параметре 'Найденный текст целиком', будет заполнена текстом найденным с помощью регулярного выражения.
 * Если вы хотите извлечь только часть всего найденного текста, вам следует использовать группы. Группы создаются путем добавления скобок в регулярное выражение. Например, если вы хотите обработать следующую строку Your user name is: test и получить строку test, вы можете использовать следующее регулярное выражение Your user name is: ([^\s]+)
 * Можно извлечь сразу несколько групп. Если строка -John 100- и регулярное выражение (\w+) (\w+), тогда переменная ALL_MATCH будет равна John 100, GROUP1 будет равна John и GROUP2 будет равна 100.
 * Обработка html намного проще и быстрее с помощью модуля 'Xpath'.
 * Это действие ищет только первую строку, которая соответствует регулярному выражению, например, оно может искать первое число в тексте. Если вы хотите найти несколько строк, которые соответствуют регулярному выражению, то есть всем числа в тексте, вам лучше использовать действие 'Извлечь все данные'.
 * Конструктор Регулярных Выражений https://bablosoft.github.io/RegexpConstructor/ может помочь вам создать регулярное выражение.
 * @param {string} text Строка Для Применения Регулярного Выражения
  Это строка, к которой применяется регулярное выражение.

 * @param {string} regexp Регулярное Выражение
  Регулярное выражение. Может содержать группы, все извлеченные группы будут помещены в переменные. Регулярные выражения применяются в многострочном режиме, если вы хотите, извлечь любой символ, включая перенос строки, используйте следующее выражение [\S\s]+. Точка .+ извлекает любой символ, кроме переноса строки.
  Примеры :
  \d+ - Любая последовательность цифр
  \w+ - Любая последовательность букв
  \s+ - Любое количество пробелов, символов табуляции или переносов строк
  .+ - Любое количество любых символов, кроме переноса строки
  [\S\s]+ - Любое количество любых символов, включая перенос строки
  [a-z]+ - Любая последовательность символов в нижнем регистре
  [0-9]+ - Любая последовательность цифр
  [^0-9]+ - Любая последовательность любых символов исключая цифры
  Your user name is: [^\s]+ - Строка 'Your user name is: ', за которой следует любая последовательность символов, которые не являются пробелом.
  Your user name is: ([^\s]+) - Сохранить имя в переменной GROUP1 используя группы
  href="([^"]+)" - Извлечь ссылку из html тега a

 * @returns Object {
 *  group1: string, group2: string, group3: string - Извлеченные группы
  Список имен переменных, разделенных запятой. Каждая переменная будет содержать одну извлеченную группу. Чтобы задать группу в регулярном выражении, используйте скобки. По умолчанию первая группа будет помещена в переменную GROUP1, вторая - в GROUP2 и третья в GROUP3
    all_match: string - Найденный текст целиком
  Весь текст извлеченный с помощью регулярного выражения.
 * }
 */
function BAS_regexp_first(text, regexp) {
  const regexp_result = native(
    "regexp",
    "first",
    JSON.stringify({ text: text, regexp: regexp })
  )
  if (regexp_result.length == 0) regexp_result = []
  else regexp_result = JSON.parse(regexp_result)
  VAR_ALL_MATCH = regexp_result.pop()
  if (typeof VAR_ALL_MATCH == "undefined" || !VAR_ALL_MATCH) VAR_ALL_MATCH = ""
  VAR_GROUP1 = regexp_result[0]
  if (typeof VAR_GROUP1 == "undefined" || !VAR_GROUP1) VAR_GROUP1 = ""
  VAR_GROUP2 = regexp_result[1]
  if (typeof VAR_GROUP2 == "undefined" || !VAR_GROUP2) VAR_GROUP2 = ""
  VAR_GROUP3 = regexp_result[2]
  if (typeof VAR_GROUP3 == "undefined" || !VAR_GROUP3) VAR_GROUP3 = ""
  if (regexp_result.length == 0) {
    VAR_GROUP1 = VAR_ALL_MATCH
  }
  return {
    all_match: VAR_ALL_MATCH,
    group1: VAR_GROUP1,
    group2: VAR_GROUP2,
    group3: VAR_GROUP3,
  }
}

/**
 * Извлечь все данные
 * Выполнить регулярное выражение, сохранить все извлеченные строки в список.
 * Регулярное выражение - удобный механизм для обработки строк. Он помогает искать строки, разделять строку на части и т. д. ( руководство, справка https://www.rexegg.com/regex-quickstart.html).
 * Вы можете представить регулярное выражение как какую-либо маску или шаблон, которой заданная строка должна соответствовать. Пример работы регулярного выражения можно описать таким образом: 'Найти в тексте последовательность букв, за которой следует символ @, за которым следует любая последовательность букв, либо точка'. Преобразуя это описание в регулярное выражени получим \w+@[a-zA-Z\.]+ это простое выражение для поиска почты в заданном тексте.
 * Переменная, указанная в параметре 'Список извлеченных строк', будет заполнена списком, который содержит каждую найденную строку.
 * Например, если строка abc 123 xyz 456 и регулярное выражение \d+ то регулярное выражение будет извлекать все числа, найденные в тексте, и в результате список будет ["123", "456"]
 * Каждый элемент списка, который возвращает это действие, содержит совпадение целиком, если вы хотите получить только часть, поместите его внутрь группы result Например, (?P<result>\d+).
 * Если строка -John 100-, -Jack 200- и регулярное выражение (\w+) (?P<result>\d+), тогда результат будет содержать 2 числа. Если регулярное выражение (?P<result>\w+) (\d+), тогда результат будет содержать 2 имени.
 * Обработка html намного проще и быстрее с помощью модуля 'Xpath'.
 * Это действие выполняет поиск всех результатов, соответствующих регулярному выражению, например, поиск всех чисел в тексте. Если вы хотите найти только первое совпадение, которое соответствует регулярному выражению, например, найти первое число, вы должны использовать действие 'Первое вхождение'.
 * Конструктор Регулярных Выражений https://bablosoft.github.io/RegexpConstructor/ может помочь вам создать регулярное выражение.
 * 
 * @param {string} text Строка Для Применения Регулярного Выражения
Это строка, к которой применяется регулярное выражение.
 * @param {string} regexp Регулярное Выражение
  Регулярное выражение. Регулярные выражения применяются в многострочном режиме, если вы хотите, извлечь любой символ, включая перенос строки, используйте следующее выражение [\S\s]+. Точка .+ извлекает любой символ, кроме переноса строки.
  Примеры :
  \d+ - Любая последовательность цифр
  \w+ - Любая последовательность букв
  \s+ - Любое количество пробелов, символов табуляции или переносов строк
  .+ - Любое количество любых символов, кроме переноса строки
  [\S\s]+ - Любое количество любых символов, включая перенос строки
  [a-z]+ - Любая последовательность символов в нижнем регистре
  [0-9]+ - Любая последовательность цифр
  [^0-9]+ - Любая последовательность любых символов исключая цифры
  Your user name is: [^\s]+ - Строка 'Your user name is: ', за которой следует любая последовательность символов, которые не являются пробелом.
  Your user name is: ([^\s]+) - Сохранить имя в переменной GROUP1 используя группы
  href="([^"]+)" - Извлечь ссылку из html тега a
 * @returns Список извлеченных строк
  Эта переменная будет содержать список со всеми строками подходящими под регулярное выражение. Если группа с именем 'result' присутствует в регулярном выражении, тогда список будет содержать содержимое групп 'result', а не совпадения целиком. Смотрите описание текущего действия чтобы увидеть примеры.
 */
function BAS_regexp_scan(text, regexp) {
  VAR_SCAN_RESULT_LIST = native(
    "regexp",
    "scan",
    JSON.stringify({ text: "str", regexp: "regexp" })
  )
  if (VAR_SCAN_RESULT_LIST.length == 0) VAR_SCAN_RESULT_LIST = []
  else VAR_SCAN_RESULT_LIST = JSON.parse(VAR_SCAN_RESULT_LIST)
  return VAR_SCAN_RESULT_LIST
}

/**
 * Подходит ли строка под регулярное выражение
 * Проверить, соответствует ли строка регулярному выражению, вернуть результат в переменную.
 * Регулярное выражение - удобный механизм для обработки строк. Он помогает искать строки, разделять строку на части и т. д. ( руководство, справка https://www.rexegg.com/regex-quickstart.html).
 * Вы можете представить регулярное выражение как какую-либо маску или шаблон, которой заданная строка должна соответствовать. Пример работы регулярного выражения можно описать таким образом: 'Найти в тексте последовательность букв, за которой следует символ @, за которым следует любая последовательность букв, либо точка'. Преобразуя это описание в регулярное выражени получим \w+@[a-zA-Z\.]+ это простое выражение для поиска почты в заданном тексте.
 * Переменная, указанная в параметре 'Подходит ли строка по рег выражение', будет равна true или false в зависимости от того, соответствует ли строка регулярному выражению.
 * Например, если строка test string и регулярное выражение [a-z] то это действие вернет true, потому что строка содержит буквы в нижнем регистре, но регулярное выражение [A-Z] вернет false, потому что строка не содержит символов в верхнем регистре.
 * Обработка html намного проще и быстрее с помощью модуля 'Xpath'.
 * Конструктор Регулярных Выражений https://bablosoft.github.io/RegexpConstructor/ может помочь вам создать регулярное выражение.
 * 
 * @param {string} text Строка Для Применения Регулярного Выражения
  Это строка, к которой применяется регулярное выражение.

 * @param {string} regexp Регулярное Выражение
  Регулярное выражение. Регулярные выражения применяются в многострочном режиме, если вы хотите, извлечь любой символ, включая перенос строки, используйте следующее выражение [\S\s]+. Точка .+ извлекает любой символ, кроме переноса строки.
  Примеры :
  \d+ - Любая последовательность цифр
  \w+ - Любая последовательность букв
  \s+ - Любое количество пробелов, символов табуляции или переносов строк
  .+ - Любое количество любых символов, кроме переноса строки
  [\S\s]+ - Любое количество любых символов, включая перенос строки
  [a-z]+ - Любая последовательность символов в нижнем регистре
  [0-9]+ - Любая последовательность цифр
  [^0-9]+ - Любая последовательность любых символов исключая цифры
  Your user name is: [^\s]+ - Строка 'Your user name is: ', за которой следует любая последовательность символов, которые не являются пробелом.
  Your user name is: ([^\s]+) - Сохранить имя в переменной GROUP1 используя группы
  href="([^"]+)" - Извлечь ссылку из html тега a

 * @returns boolean
  Подходит ли строка по рег выражение
  Эта переменная будет равна true или false в зависимости от того, соответствует ли строка регулярному выражению.
 */
function BAS_regexp_is_match(text, regexp) {
  return Boolean(
    native(
      "regexp",
      "ismatch",
      JSON.stringify({
        text: text,
        regexp: regexp,
      })
    ) === "true"
  )
}

/**
 * Разделить строку
 * Разделить текст регулярным выражением.
 * Регулярное выражение - удобный механизм для обработки строк. Он помогает искать строки, разделять строку на части и т. д. ( руководство, справка https://www.rexegg.com/regex-quickstart.html).
 * Вы можете представить регулярное выражение как какую-либо маску или шаблон, которой заданная строка должна соответствовать. Пример работы регулярного выражения можно описать таким образом: 'Найти в тексте последовательность букв, за которой следует символ @, за которым следует любая последовательность букв, либо точка'. Преобразуя это описание в регулярное выражени получим \w+@[a-zA-Z\.]+ это простое выражение для поиска почты в заданном тексте.
 * Это действие использует регулярное выражение чтобы разделить строку. Например, если строка word1,word2;word3|word4 и регулярное выражение [,;|] тогда результат будет содержать список со всеми словами ["word1", "word2", "word3", "word4"].
 * Предыдущий пример разбивает строку с помощью одного из следующих символов: , или ; или |
 * Регулярное выражение для разделения строки может быть более сложным и содержать больше символов. Этот механизм более мощный, чем разделение на части простой строкой.
 * Переменная, указанная в параметре 'Части строки после разделения', будет заполнена списком, который содержит все части строки после разделения.
 * Обработка html намного проще и быстрее с помощью модуля 'Xpath'.
 * Конструктор Регулярных Выражений https://bablosoft.github.io/RegexpConstructor/ может помочь вам создать регулярное выражение.
 * 
 * @param {string} text Строка Для Применения Регулярного Выражения
  Это строка, к которой применяется регулярное выражение.

 * @param {string} regexp Регулярное Выражение Разделитель
  Регулярное выражение. Регулярные выражения применяются в многострочном режиме, если вы хотите, извлечь любой символ, включая перенос строки, используйте следующее выражение [\S\s]+. Точка .+ извлекает любой символ, кроме переноса строки.
  Примеры :
  \d+ - Любая последовательность цифр
  \w+ - Любая последовательность букв
  \s+ - Любое количество пробелов, символов табуляции или переносов строк
  .+ - Любое количество любых символов, кроме переноса строки
  [\S\s]+ - Любое количество любых символов, включая перенос строки
  [a-z]+ - Любая последовательность символов в нижнем регистре
  [0-9]+ - Любая последовательность цифр
  [^0-9]+ - Любая последовательность любых символов исключая цифры
  Your user name is: [^\s]+ - Строка 'Your user name is: ', за которой следует любая последовательность символов, которые не являются пробелом.
  Your user name is: ([^\s]+) - Сохранить имя в переменной GROUP1 используя группы
  href="([^"]+)" - Извлечь ссылку из html тега a

 * @returns Части строки после разделения
  Эта переменная будет содержать список со всеми частями строки. Смотрите описание текущего действия чтобы увидеть примеры.
 */
function BAS_regexp_split(text, regexp) {
  VAR_LIST_FROM_STRING = native("regexp", "split", JSON.stringify({text: text,regexp: regexp}))
  if(VAR_LIST_FROM_STRING.length == 0)
  VAR_LIST_FROM_STRING = []
  else
  VAR_LIST_FROM_STRING = JSON.parse(VAR_LIST_FROM_STRING)
  return VAR_LIST_FROM_STRING
}

/**
 * Заменить строку
 * Применить регулярное выражение, заменить все соответствия на целевую строку.
 * Регулярное выражение - удобный механизм для обработки строк. Он помогает искать строки, разделять строку на части и т. д. ( руководство, справка https://www.rexegg.com/regex-quickstart.html).
 * Вы можете представить регулярное выражение как какую-либо маску или шаблон, которой заданная строка должна соответствовать. Пример работы регулярного выражения можно описать таким образом: 'Найти в тексте последовательность букв, за которой следует символ @, за которым следует любая последовательность букв, либо точка'. Преобразуя это описание в регулярное выражени получим \w+@[a-zA-Z\.]+ это простое выражение для поиска почты в заданном тексте.
 * Это действие работает так: регулярное выражение применяется к целевой строке, все соответствия заменяются строкой из параметра 'Заменить на'.
 * Например, если строка Random text login1@yahoo.com login2@outlook.com и регулярное выражение @[^\.]*\.[\s]* (данное регулярное выражение будет соответствовать символу @ вместе с почтовым доменом) , а параметр 'Заменить на' равен @gmail.com, то результат будет Random text login1@gmail.com login2@gmail.com
 * В переменную, указанную в параметре 'Результат', будет записана строка с результатом.
 * Параметр 'Заменить на' также может содержать специальные строки: \1, \2, \3 и т. д. \1 будет заменено значением первой группы, \2 будет заменено второй группой и так далее.
 * Второй пример, если строка word1 test:111 word2 word3 test:222 и регулярное выражение test:(\d+) (обратите внимание что регулярное выражение содержит одну группу) , а параметр 'Заменить на' равен \1, то результат будет word1 111 word2 word3 222 (\1 будет заменено значением первой группы).
 * Обработка html намного проще и быстрее с помощью модуля 'Xpath'.
 * Конструктор Регулярных Выражений https://bablosoft.github.io/RegexpConstructor/ может помочь вам создать регулярное выражение.
 * 
 * @param {string} text Строка Для Применения Регулярного Выражения
  Это строка, к которой применяется регулярное выражение.

 * @param {string} regexp Регулярное Выражение
  Регулярное выражение. Оно может содержать группы. Регулярные выражения применяются в многострочном режиме, если вы хотите, извлечь любой символ, включая перенос строки, используйте следующее выражение [\S\s]+. Точка .+ извлекает любой символ, кроме переноса строки.
  Примеры :
  \d+ - Любая последовательность цифр
  \w+ - Любая последовательность букв
  \s+ - Любое количество пробелов, символов табуляции или переносов строк
  .+ - Любое количество любых символов, кроме переноса строки
  [\S\s]+ - Любое количество любых символов, включая перенос строки
  [a-z]+ - Любая последовательность символов в нижнем регистре
  [0-9]+ - Любая последовательность цифр
  [^0-9]+ - Любая последовательность любых символов исключая цифры
  Your user name is: [^\s]+ - Строка 'Your user name is: ', за которой следует любая последовательность символов, которые не являются пробелом.
  Your user name is: ([^\s]+) - Сохранить имя в переменной GROUP1 используя группы
  href="([^"]+)" - Извлечь ссылку из html тега a

 * @param {string} replace Заменить на
  Этот параметр является строкой. Это работает следующим образом: регулярное выражение применяется к целевой строке, все найденные вхождение заменяются этой строкой. Она также может содержать строки: \1, \2, \3 и т. д. \1 будет заменено значением первой группы, \2 будет заменено второй группой и так далее. Смотрите описание текущего действия чтобы увидеть примеры.

 * @returns строка после замены
 */
function BAS_regexp_replace(text, regexp, replace) {
  return native('regexp', 'replace', JSON.stringify({
    text: text,
    regexp: regexp,
    replace: replace
  }))
}