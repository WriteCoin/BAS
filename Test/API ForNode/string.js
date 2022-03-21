const get_string_functions = (f) => {
	/**
* Base64 кодировать/декодировать
* Кодирует или декодирует строку в base64.
* Кодировка base64 представляет двоичные данные в виде ascii строки. BAS хранит двоичные данные как строки в формате base64. Это могут быть файлы, изображения, видео и т. д.
* В большинстве случаев вам не нужно декодировать base64 строки, некоторые действия принимают входные данные прямо в формате base64, это такие действия как: "Запись В Файл", "Начать работу с изображением". Более того, если вы попытаетесь декодировать бинарные данные, закодированные как base64, результат может быть поврежден, поэтому лучше использовать строку в формате base64 без декодирования.
* Это действие может работать в двух режимах: кодирование и декодирование. Режимы могут переключаться параметром "Шифровать или расшифровывать". В зависимости от режима, входным параметром будет либо строка с кодировкой base64, которая должна быть декодирована, либо обычная строка, которая должна быть закодирована.
*
* @param {string} str Данные
В зависимости от режима, входным параметром будет либо строка с кодировкой base64, которая должна быть декодирована, либо обычная строка, которая должна быть закодирована.
Примеры :
any text - Любая строка. Работает в режиме encode
YW55IHN0cmluZw== - Строка в формате base64. Работает в режиме decode
VAR_FILE_CONTENT - Переменная, которая содержит результат чтения файла. Работает в режиме decode
* @param {boolean} encode Шифровать или расшифровывать
* @returns строка в формате base64 в случае использования режима encode и результат декодирования при использовании режима decode.
*/
const BAS_base64 = async (str, encode) => await f("BAS_base64", { str, encode })

	/**
* Шаблон (BAS-функция)
* Создать новую переменную или изменить существующую на многострочный текст. Может заменять спинтакс, ресурсы, переменные на их значения. Действие может использоваться для загрузки шаблона из файла или его динамической генерации. Оно лучше всего подходит, если нужно генерировать текст для постинга.
* Это действие получает текст из многострочного текстового поля "Шаблон" и сохраняет его в переменную, определенной в параметре "Переменная, в которую сохранять результат". И это все, что делает это действие, если только текст не содержит специальных значений. Вот их список:
* Переменные VAR_VARIABLE будут заменены на их значения.
* Ресурсы \{\{resource\}\} также будут заменены на их значения.
* Спинтакс {value1|value2} будет заменен на одно из значений value1 или value2.
* <AnyLetter> - будет заменено на любую букву.
* <AnyDigit> - будет заменено на любую цифру.
* <ELowVow> - тоже самое, что {a|e|i|o|u}
* <EUpVow> - тоже самое, что {a|e|i|o|u}
* <ELowCons> - тоже самое, что {b|c|d|f|g|h|j|k|l|m|n|p|q|r|s|t|v|w|x|y|z}
* <EUpCons> - тоже самое, что {B|C|D|F|G|H|J|K|L|M|N|P|Q|R|S|T|V|W|X|Y|Z}
* <EUp> - тоже самое, что {<EUpVow>|<EUpCons>}
* <ELow> - тоже самое, что {<ELowVow>|<ELowCons>}
* <EFemName> - английские женские имена начинающиеся с заглавной буквы.
* <EFemNameLow> - английские женские имена.
* <EMaleName> - английские мужские имена начинающиеся с заглавной буквы.
* <EMaleNameLow> - английские мужские имена.
* <ESurname> - английские фамилии имена начинающиеся с заглавной буквы.
* <ESurnameLow> - английские фамилии.
* Если выбрана установка "Дополнительная обработка", то это действие будет работать с динамическим шаблоном, т. е. шаблон будет взят из переменной. Рассмотрим следующий пример: у вас есть файл с содержанием "{Hello|Hi}, <EMaleName> {!|}" и вам нужно его обработать с помощью BAS. Сначала нужно загрузить файл в переменную VAR_FILE_CONTENT. Если вы поместите VAR_FILE_CONTENT в действие "шаблон" и не устанавливаете флаг "Дополнительная обработка", то результат будет таким же, как и исходное содержимое файла. Но если вы установите этот флаг, BAS сначала заменит переменную VAR_FILE_CONTENT на содержание файла, а затем проведет замену переменых, спинтакса и ресурсов уже в содержании файла. Наконец, результат будет похож на "Hi, John!".
*
* @param {string} template Шаблон
Значение переменной
Примеры :
any string - Любая строка
VAR_LOGIN:VAR_PASSWORD - Соеденить 2 строки
{Hi|Hello}, John! - Спинтакс
<EMaleName> - Будет заменено мужским именем
{a{1|2|3}|} - a1, a2, a3 или пустая строка
@returns string
*/
const BAS_template = async (params) => await f("BAS_template", params)

	/**
* Объединить строки
* Объединить несколько строк в одну.
* Это действие вернет строку, составленную из всех указанных строк.
* Например, если указаны параметры "Строка 1" и "Строка 2" значения которых сответственно равны "Просто пример" и " строки", то действие вернет "Просто пример строки".
* Строки из отдельных полей и списка складываются в общий список строк которые будут объединены.
* Например, если в поле "Строка 1" указана строка и в поле "Список строк" указан список из 4 строк, то объединено будет 5 строк.
* Если какие-то из параметров ("Строка 1", "Строка 2", "Строка 3", "Список строк") не указаны, будут использованы все параметры кроме них.
* Например, если "Список строк" не указан, то список будет сформирован из параметров "Строка 1" и "Строка 2" и "Строка 3". Если параметры "Строка 1", "Строка 2", "Строка 3" пусты, то будет использован "Список строк". Если указаны все параметры, то все они будут использованы.
* Порядок объединения полей следующий: "Строка 1", "Строка 2", "Строка 3", "Список строк".
* Список можно создать с помощью действий из модуля "Список".
* По умолчанию строки соединяются без разделителя, но это можно изменить, указав параметр "Разделитель", находящийся в дополнительных настройках.
*
* @param {string} str1 Строка 1. Может быть пустым
Строка, которую нужно объединить с другими строками.
Примеры :
Просто пример текста
Test text
string
Пустая строка - Будут использованы параметры "Строка 2", "Строка 3", "Список строк"
* @param {string} str2 Строка 2. Может быть пустым
Строка, которую нужно объединить с другими строками.
Примеры :
Просто пример текста
Test text
string
Пустая строка - Будут использованы параметры "Строка 1", "Строка 3", "Список строк"
* @param {string} str3 Строка 3. Может быть пустым
Строка, которую нужно объединить с другими строками.
Примеры :
Просто пример текста
Test text
string
Пустая строка - Будут использованы параметры "Строка 1", "Строка 2", "Список строк"
* @param {Array<string>} listStr Список строк. Может быть пустым
Список строк которые нужно объединить. В качестве списка можно использовать строку, состоящую из строк, разделенных запятыми.
Примеры :
Just sample text,Test text,string
Just sample text, Test text, string
["Just sample text", "Test text", "string"]
Пустая строка - Будут использованы параметры "Строка 1", "Строка 2", "Строка 3"
* @param {string} sep Разделитель
Необязательный параметр. Разделитель, вставляемый между объединенными строками.
Примеры :
"," - Просто пример текста,Test text,string
" " - Просто пример текста Test text string
", " - Просто пример текста, Test text, string
Пустая строка - Объединить строки без разделителя
* @returns итоговая строка.
Примеры :
String1String2String3
Text test string
TestTest
*/
const BAS_join_strings = async (str1, str2, str3, listStr, sep) => await f("BAS_join_strings", { str1, str2, str3, listStr, sep })

	/**
* Парсить CSV строку
* Распарсить CSV строку на элементы.
* Это действие распарсит строку по указанным разделителям и сохранит распарсенные данные по указанным переменным.
* Например, если указана строка "email@gmail.com:mypass1" и переменные USERNAME,PASSWORD, то действие сохранит "email@gmail.com" в переменную VAR_USERNAME и "mypass1" в переменную VAR_PASSWORD.
* По умолчанию действие возвращает строки, но это можно изменить, включив параметр "Преобразовывать типы", находящийся в дополнительных настройках, тогда страки автоматически будут конвертироватся в числа, true или false, обекты, null и undefined.
* Например, если указана строка "test:123:true", то в первую переменную будет сохранена строка "test", во вторую переменную число 123 и в третью переменную логическое значение true.
* Если количество переменных больше, чем количество элементов в строке, то в лишние переменные будет записана пустая строка.
* Используйте действие "Парсить строку" из модуля Список если хотите получить результат в виде списка.
*
* @param {string} str Строка
CSV строка, которую нужно распарсить на элементы.
Примеры :
login:password
id,name,login
Просто пример текста;Test text;string
* @param {string} seps Список разделителей
Список разделителей, по которым можно разбить строку. В качестве списка можно использовать строку, состоящую только из разделителей.
Примеры :
:;,
[":", ";", ","]
Пустая строка - [":", ";", ","]
* @param {boolean} convert Преобразовывать типы
* @returns Список переменных, разделенных запятыми
*/
const BAS_csv_parse = async (str, seps, convert) => await f("BAS_csv_parse", { str, seps, convert })

	/**
* Создать CSV строку
* Создать CSV строку из нескольких элементов.
* Это действие вернет CSV строку, составленную из всех указанных элементов, разделенных указанным символом.
* Например, если указаны параметры "Элемент 1" и "Элемент 2" значения которых сответственно равны "тест" и "текст", а разделитель ":", то действие вернет "тест:текст".
* Элементы из отдельных полей и списка складываются в общий список элементов которые будут объединены.
* Например, если в поле "Элемент 1" указан элемент и в поле "Список элементов" указан список из 4 элементов, то объединено будет 5 элементов.
* Если какие-то из параметров ("Элемент 1", "Элемент 2", "Элемент 3", "Список элементов") не указаны, будут использованы все параметры кроме них.
* Например, если "Список элементов" не указан, то список будет сформирован из параметров "Элемент 1" и "Элемент 2" и "Элемент 3". Если параметры "Элемент 1", "Элемент 2", "Элемент 3" пусты, то будет использован "Список элементов". Если указаны все параметры, то все они будут использованы.
* Значения всех элементов перед объединением преобразуются в строку.
* Если элемент содержит разделитель, то он будет заключен в кавычки.
* Порядок объединения полей следующий: "Элемент 1", "Элемент 2", "Элемент 3", "Список элементов".
* Список можно создать с помощью действий из модуля "Список".
*
* @param {string} elem1 Элемент 1. Может быть пустым
Элемент, который нужно добавить в CSV строку.
Примеры :
Просто пример текста
5
true
Пустая строка - Будут использованы параметры "Элемент 2", "Элемент 3", "Список элементов"
* @param {string} elem2 Элемент 2. Может быть пустым
Элемент, который нужно добавить в CSV строку.
Примеры :
Просто пример текста
5
true
Пустая строка - Будут использованы параметры "Элемент 1", "Элемент 3", "Список элементов"
* @param {string} elem3 Элемент 3. Может быть пустым
Элемент, который нужно добавить в CSV строку.
Примеры :
Просто пример текста
5
true
Пустая строка - Будут использованы параметры "Элемент 1", "Элемент 2", "Список элементов"
* @param {Array<string>} listElem Список элементов. Может быть пустым
Список элементов, которые нужно добавить в CSV строку. В качестве списка можно использовать строку, состоящую из строк, разделенных запятыми.
Примеры :
Просто пример текста,Test text,string
Просто пример текста, Test text, string
["Просто пример текста", "Test text", "string"]
Пустая строка - Будут использованы параметры "Элемент 1", "Элемент 2", "Элемент 3"
* @param {string} seps Разделитель
Разделитель, вставляемый между элементами CSV строки.
Примеры :
"," - Просто пример текста,Test text,string
" " - Просто пример текста Test text string
", " - Просто пример текста, Test text, string
Пустая строка - ":"
* @returns CSV строка.
Примеры :
login:password
id,name,login
Просто пример текста;Test text;string
*/
const BAS_csv_generate = async (elem1, elem2, elem3, listElem, seps) => await f("BAS_csv_generate", { elem1, elem2, elem3, listElem, seps })

	/**
* Подровнять
* Подровнять строку по краям.
* Это действие вернет строку, с начала и конца которой будут обрезаны ненужные символы, такие как пробелы, переносы строк, табуляция.
* Например, если указана строка "Тестовый текст", то действие вернет "Тестовый текст", а если указана строка "Просто пример строки", то действие вернет "Просто пример строки".
* Символы, которые будут обрезаны, определяются параметрами "Обрезать пробелы", "Обрезать переносы строк", "Обрезать табуляцию", но также можно указать свои символы в параметр "Обрезать символы", находящийся в дополнительных настройках.
* По умолчанию действие обрезает строку с обеих сторон, но это можно изменить с помощью переключателей, находящихся в дополнительных настройках.
*
* @param {string} str Строка
Строка, которую нужно подровнять.
Примеры :
"Просто пример текста"
"Test text"
"string"
* @param {string} chars Обрезать символы
Символы, обрезаемые с краев строки.
Примеры :
_-|,
_-
%&
* @param {boolean} trimSpaces Обрезать пробелы
* @param {boolean} trimLineBrakes Обрезать переносы строк
* @param {boolean} trimTabs Обрезать табуляцию
* @param {boolean} left Обрезать слева
* @param {boolean} right Обрезать справа
* @returns итоговая строка.
Примеры :
Просто пример текста
Test text
string
*/
const BAS_trim = async (str, chars, trimSpaces, trimLineBrakes, trimTabs, left, right) => await f("BAS_trim", { str, chars, trimSpaces, trimLineBrakes, trimTabs, left, right })

	/**
* Очистить
* Очистить строку от ненужных символов.
* Это действие вернет строку, из которой будут удалены все ненужные символы, такие как множественные пробелы, переносы строк, табуляция.
* Например, если указана строка "Тестовыйтекст", то действие вернет "Тестовый текст", а если указана строка "Простопримерстроки", то действие вернет "Просто пример строки".
* Кроме удаления табуляции, активируемой соответствующим параметром, можно указать свои символы, которые будут удалены, в параметр "Удалять символы", находящийся в дополнительных настройках.
* Символы, которые будут заменены пробелом, определяются параметрами "Заменять многочисленные пробелы на одиночные", "Заменить переносы строк пробелами", но также можно указать свои символы в параметр "Заменять символы на пробел", находящийся в дополнительных настройках.
*
* @param {string} str Строка
Строка, которую нужно очистить.
Примеры :
"Простопримертекста"
"Testtext"
"string"
* @param {string} charsRemoved Удалять символы
Символы, которые нужно удалять.
Примеры :
_-|
_-
%&
* @param {boolean} removeTabs Удалять табуляцию
* @param {string} replaceCharsWithSpace Заменять символы на пробел
Символы, которые нужно заменить на пробел.
Примеры :
_-|
_-
%&
* @param {boolean} replaceLineBreaksWithSpace Заменить переносы строк пробелом
* @param {boolean} replaceMultipleSpacesWithOnes Заменять многочисленные пробелы на одиночные
* @returns итоговая строка.
Примеры :
Просто пример текста
Test text
string
*/
const BAS_clean = async (str, charsRemoved, removeTabs, replaceCharsWithSpace, replaceLineBreaksWithSpace, replaceMultipleSpacesWithOnes) => await f("BAS_clean", { str, charsRemoved, removeTabs, replaceCharsWithSpace, replaceLineBreaksWithSpace, replaceMultipleSpacesWithOnes })

	/**
* Специальные HTML символы кодировать/декодировать
* Кодирует или декодирует строку содержащую специальные HTML символы.
* Это действие может работать в двух режимах: кодирование и декодирование. Режимы могут переключаться параметром "Шифровать или расшифровывать". В зависимости от режима, входным параметром будет либо закодированая строка, которая должна быть декодирована, либо обычная строка содержащая специальные HTML символы, которая должна быть закодирована.
* Например, если указана строка "<div>Blah blah blah</div>" и активирован режим encode, то действие вернет "&lt;div&gt;Blah blah blah&lt;/div&gt;". А если указана строка "&lt;h1&gt;Text title&lt;/h1&gt;" и активирован режим decode, то действие вернет "<h1>Text title</h1>".
*
* @param {string} str Строка
В зависимости от режима, входным параметром будет либо закодированая строка, которая должна быть декодирована, либо обычная строка содержащая специальные HTML символы, которые должны быть закодированы.
Примеры :
<div>Blah blah blah</div> - Любая строка. Работает в режиме encode
&lt;div&gt;Blah blah blah&lt;/div&gt; - Закодированная строка. Работает в режиме decode
* @param {boolean} escape Шифровать или расшифровывать
* @returns закодированная строка в случае использования режима encode и результат декодирования при использовании режима decode.
*/
const BAS_html = async (str, escape) => await f("BAS_html", { str, escape })

return {	BAS_base64,
	BAS_template,
	BAS_join_strings,
	BAS_csv_parse,
	BAS_csv_generate,
	BAS_trim,
	BAS_clean,
	BAS_html,
}
}

module.exports = get_string_functions