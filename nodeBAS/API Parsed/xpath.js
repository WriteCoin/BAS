/**
* Xpath получить xml
* Выполнить xpath запрос и найти xml первого элемента, который соответствует запросу.
* Это действие, в отличие от 'Xpath получить текст', ищет xml элемента(html-код).
* Если элемент не будет найден, поток остановится с сообщением об ошибке. Если вы хотите продолжить работу после ошибки, используйте действие 'Игнорировать ошибки' или уберите флажок 'Завершать работу после ошибки'.
* Html для применения xpath запроса получается из настройки 'Текст для применения xpath'.
* Если вы хотите применить xpath запрос к последнему ответу http клиента, вам нужно использовать модуль 'HTTP-Клиент'.
*
* @param {string} text Текст для применения xpath
Текст, к которому будет применяться xpath запрос. В это поле вы можете поместить любой xml или html. Есть возможность использовать поврежденный xml.
* @param {string} xpath_query Xpath Запрос
Запрос Xpath
Примеры :
//title - Получить заголовок страницы.
//a - Получить все ссылки.
//img - Найти изображение.
//img/@src - Найти ссылку на изображение.
//*[@id='ID'] - Найти элемент по id.
//*[contains(@class,'CLASS')] - Найти элемент по классам. Элемент может иметь несколько классов, поэтому необходимо использовать функцию contains.
//*[contains(@class,'CLASS') and @id='ID'] - Найти элемент по классам и id.
//div[@id='ID_PARENT']/div[@id='ID_CHILD'] - Найдите элемент, содержащий родительский элемент.
* @param {boolean} shutdownAfterError Завершать работу после ошибки
* @returns xml первого элемента, который соответствует xpath запросу.
*/
function BAS_xpath_get_first_xml(text, xpath_query, shutdownAfterError) {
const text = _function_argument('text') || text
const xpath_query = _function_argument('xpath_query') || xpath_query
const shutdownAfterError = _function_argument('shutdownAfterError') || shutdownAfterError
html_parser_xpath_parse(text)
if (shutdownAfterError && !html_parser_xpath_exist(xpath_query))
fail("Can't resolve query " + xpath_query)
const result = html_parser_xpath_xml(xpath_query)
_function_return(result)
return result
}
/**
* Xpath получить каждый xml
* Выполнить xpath запрос и найти xml каждого элемента, соответствующего запросу.
* Это действие, в отличие от 'Xpath получить каждый текст', ищет именно xml элементов (html-код).
* Результатом этого действия является список, вы можете обработать его с помощью модуля 'Список'.
* Если ни один элемент не будет найден, то список будет пустым.
* Html для применения xpath запроса получается из настройки 'Текст для применения xpath'.
* Если вы хотите применить xpath запрос к последнему ответу http клиента, вам нужно использовать модуль 'HTTP-Клиент'.
*
* @param {string} text Текст для применения xpath
Текст, к которому будет применяться xpath запрос. В это поле вы можете поместить любой xml или html. Есть возможность использовать поврежденный xml.
* @param {string} xpath_query Xpath Запрос
Запрос Xpath
Примеры :
//title - Получить заголовок страницы.
//a - Получить все ссылки.
//img - Найти изображение.
//img/@src - Найти ссылку на изображение.
//*[@id='ID'] - Найти элемент по id.
//*[contains(@class,'CLASS')] - Найти элемент по классам. Элемент может иметь несколько классов, поэтому необходимо использовать функцию contains.
//*[contains(@class,'CLASS') and @id='ID'] - Найти элемент по классам и id.
//div[@id='ID_PARENT']/div[@id='ID_CHILD'] - Найдите элемент, содержащий родительский элемент.
* @returns список, который состоит из xml каждого найденного элемента.
*/
function BAS_xpath_get_xml_list(text, xpath_query) {
const text = _function_argument('text') || text
const xpath_query = _function_argument('xpath_query') || xpath_query
html_parser_xpath_parse(text)
const result = html_parser_xpath_xml_list(xpath_query)
_function_return(result)
return result
}
/**
* Xpath получить текст
* Выполнить xpath запрос и найти текст первого элемента, который соответствует запросу.
* Результатом этого действия является текст. Например, если элемент имеет xml <div>word</div>, то его текст - 'word'.
* Если вы хотите получить xml элемента, используйте действие 'Xpath получить xml'.
* Если элемент не будет найден, поток остановится с сообщением об ошибке. Если вы хотите продолжить работу после ошибки, используйте действие 'Игнорировать ошибки' или уберите флажок 'Завершать работу после ошибки'.
* Html для применения xpath запроса получается из настройки 'Текст для применения xpath'.
* Если вы хотите применить xpath запрос к последнему ответу http клиента, вам нужно использовать модуль 'HTTP-Клиент'.
*
* @param {string} text Текст для применения xpath
Текст, к которому будет применяться xpath запрос. В это поле вы можете поместить любой xml или html. Есть возможность использовать поврежденный xml.
* @param {string} xpath_query Xpath Запрос
Запрос Xpath
Примеры :
//title - Получить заголовок страницы.
//a - Получить все ссылки.
//img - Найти изображение.
//img/@src - Найти ссылку на изображение.
//*[@id='ID'] - Найти элемент по id.
//*[contains(@class,'CLASS')] - Найти элемент по классам. Элемент может иметь несколько классов, поэтому необходимо использовать функцию contains.
//*[contains(@class,'CLASS') and @id='ID'] - Найти элемент по классам и id.
//div[@id='ID_PARENT']/div[@id='ID_CHILD'] - Найдите элемент, содержащий родительский элемент.
* @param {boolean} shutdownAfterError Завершать работу после ошибки
* @returns текст первого элемента, который соответствует xpath запросу.
*/
function BAS_xpath_get_first_text(text, xpath_query, shutdownAfterError) {
const text = _function_argument('text') || text
const xpath_query = _function_argument('xpath_query') || xpath_query
const shutdownAfterError = _function_argument('shutdownAfterError') || shutdownAfterError
html_parser_xpath_parse(text)
if (shutdownAfterError && !html_parser_xpath_exist(xpath_query))
fail("Can't resolve query " + xpath_query)
const result = html_parser_xpath_text(xpath_query)
_function_return(result)
return result
}
/**
* Xpath получить каждый текст
* Выполнить xpath запрос и найти текст всех элементов, соответствующих запросу.
* Результатом этого действия является список, каждый элемент которого текст. Например, если элемент имеет xml <div>word</div>, то его текст - 'word'.
* Результатом этого действия является список, поэтому вы можете обработать его с помощью модуля 'Список'.
* Если ни один элемент не будет найден, то список будет пустым.
* Html для применения xpath запроса получается из настройки 'Текст для применения xpath'.
* Если вы хотите применить xpath запрос к последнему ответу http клиента, вам нужно использовать модуль 'HTTP-Клиент'.
*
* @param {string} text Текст для применения xpath
Текст, к которому будет применяться xpath запрос. В это поле вы можете поместить любой xml или html. Есть возможность использовать поврежденный xml.
* @param {string} xpath_query Xpath Запрос
Запрос Xpath
Примеры :
//title - Получить заголовок страницы.
//a - Получить все ссылки.
//img - Найти изображение.
//img/@src - Найти ссылку на изображение.
//*[@id='ID'] - Найти элемент по id.
//*[contains(@class,'CLASS')] - Найти элемент по классам. Элемент может иметь несколько классов, поэтому необходимо использовать функцию contains.
//*[contains(@class,'CLASS') and @id='ID'] - Найти элемент по классам и id.
//div[@id='ID_PARENT']/div[@id='ID_CHILD'] - Найдите элемент, содержащий родительский элемент.
* @returns список, который состоит из текста каждого найденного элемента.
*/
function BAS_xpath_get_text_list(text, xpath_query) {
const text = _function_argument('text') || text
const xpath_query = _function_argument('xpath_query') || xpath_query
html_parser_xpath_parse(text)
const result = html_parser_xpath_text_list(xpath_query)
_function_return(result)
return result
}
/**
* Xpath получить количество элементов
* Выполнить xpath запрос и получить число элементов, которое ему соответствует.
* Html для применения xpath запроса получается из настройки 'Текст для применения xpath'.
* Если вы хотите применить xpath запрос к последнему ответу http клиента, вам нужно использовать модуль 'HTTP-Клиент'.
*
* @param {string} text Текст для применения xpath
Текст, к которому будет применяться xpath запрос. В это поле вы можете поместить любой xml или html. Есть возможность использовать поврежденный xml.
* @param {string} xpath_query Xpath Запрос
Запрос Xpath
Примеры :
//title - Получить заголовок страницы.
//a - Получить все ссылки.
//img - Найти изображение.
//img/@src - Найти ссылку на изображение.
//*[@id='ID'] - Найти элемент по id.
//*[contains(@class,'CLASS')] - Найти элемент по классам. Элемент может иметь несколько классов, поэтому необходимо использовать функцию contains.
//*[contains(@class,'CLASS') and @id='ID'] - Найти элемент по классам и id.
//div[@id='ID_PARENT']/div[@id='ID_CHILD'] - Найдите элемент, содержащий родительский элемент.
* @returns количество элементов, соответствующих xpath запросу.
Примеры :
0 - Нет элементов, которые соответствуют запросу.
3 - Есть три элемента, которые соответствуют запросу.
*/
function BAS_xpath_get_count(text, xpath_query) {
const text = _function_argument('text') || text
const xpath_query = _function_argument('xpath_query') || xpath_query
html_parser_xpath_parse(text)
const result = html_parser_xpath_count(xpath_query)
_function_return(result)
return result
}
/**
* Xpath проверить существование
* Проверить, существует ли хотя бы один элемент, соответствующий xpath запросу.
* Html для применения xpath запроса получается из настройки 'Текст для применения xpath'.
* Если вы хотите применить xpath запрос к последнему ответу http клиента, вам нужно использовать модуль 'HTTP-Клиент'.
*
* @param {string} text Текст для применения xpath
Текст, к которому будет применяться xpath запрос. В это поле вы можете поместить любой xml или html. Есть возможность использовать поврежденный xml.
* @param {string} xpath_query Xpath Запрос
Запрос Xpath
Примеры :
//title - Получить заголовок страницы.
//a - Получить все ссылки.
//img - Найти изображение.
//img/@src - Найти ссылку на изображение.
//*[@id='ID'] - Найти элемент по id.
//*[contains(@class,'CLASS')] - Найти элемент по классам. Элемент может иметь несколько классов, поэтому необходимо использовать функцию contains.
//*[contains(@class,'CLASS') and @id='ID'] - Найти элемент по классам и id.
//div[@id='ID_PARENT']/div[@id='ID_CHILD'] - Найдите элемент, содержащий родительский элемент.
* @returns true или false в зависимости от наличия элемента, который соответствует запросу.
Примеры :
true - Существует по крайней мере один элемент, который соответствует запросу.
false - Нет элементов, которые соответствуют запросу.
*/
function BAS_xpath_exists(text, xpath_query) {
const text = _function_argument('text') || text
const xpath_query = _function_argument('xpath_query') || xpath_query
html_parser_xpath_parse(text)
const result = html_parser_xpath_exist(xpath_query)
_function_return(result)
return result
}
