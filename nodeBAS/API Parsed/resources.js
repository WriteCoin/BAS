/**
* Создать Ресурс
* Создать новый ресурс.
* Каждый ресурс содержит контейнер с данными, например, строки из файла. В отличие от списков, система ресурсов помогает распределять данные по потокам, а также обрабатывает различные ситуации, которые возникают при одновременном использовании данных в многопоточном режиме.
* Обычно ресурсы создаются из пользовательского интерфейса (кнопкой '+ Создать новый ресурс'), но также могут быть созданы с помощью этого действия.
* Настоятельно рекомендуется не использовать это действие в коде, который работает в нескольких потоках, потому что каждый поток создаст свой новый ресурс, и это, вероятно, не то, что вам нужно. Вместо этого используйте данное действие в функции OnApplicationStart. Эта функция выполняется только один раз для всего скрипта до любой другой функции и, следовательно, является лучшим местом для создания ресурса ( screen https://wiki.bablosoft.com/lib/exe/fetch.php?cache=&media=onapplicationstartcreateresource.png).
* После создания ресурса вы, вероятно, захотите заполнить его данными, сделайте это с помощью действия 'Добавить элемент'.
* После создания и наполнения ресурса данными он может использоваться как любой другой ресурс в любом поле и в любом потоке ( screen https://wiki.bablosoft.com/lib/exe/fetch.php?cache=&media=onapplicationstartuseresource.png).
* Типичным примером использования этого действия является создание ресурса (в OnApplicationStart), который берет данные из какого-то нестандартного места (например, из редкой системы управления базой данных) или в нестандартном формате или и то, и другое.
* 'Ждать появления' - очень важный параметр, он определяет поведение в случае, когда список данных ресурса пуст. Если эта настройка влючена, тогда действие, которое получает ресурс, будет ждать до тех пор, пока данные не появятся, если настройка не выбрана, то действие завершится мгновенно с ошибкой.
* Когда выбрана настройка 'Жадный алгоритм', система ресурсов будет пытаться снова и снова получать одну и ту же строку до тех пор, пока эта строка не исчерпает количество успехов или неудач, и только после того следующая строка станет доступна.
*
* @param {string} name Имя ресурса
Имя ресурса, потом оно может быть использовано для его идентификации. Может быть любой строкой.
* @param {number} successes Количество успехов
Максимальное количество успешных применений текущего ресурса. Использование ресурса считается успешным, если поток, который использовал его, был выполнен успешно. Например, если ресурс содержит прокси и скрипт регистрирует аккаунты, то этот параметр указывает, сколько учетных записей может быть зарегистрировано для одного прокси.
* @param {number} fails Количество неудач
Максимальное количество неудачных использований текущего ресурса. Использование ресурса считается неудачным, если поток, который использовал его, заканчивается неудачей. Например, если ресурс содержит прокси и скрипт создает учетные записи, то этот параметр указывает, сколько неудачнх регистраций возможно для одного прокси.
* @param {number} simultaneous Одновременных использований
Максимальное количество одновременных использований. Например, если ресурс содержит прокси, то этот параметр указывает, сколько раз прокси может использоваться одновременно.
* @param {number} interval Интервалы между использованиями
Интервал между использованием в миллисекундах.
Примеры :
0 - После того, как ресурс будет использован, его можно будет сразу же снова получить повторно.
5000 - Интервал между каждым использованием ресурса должен быть не менее 5 секунд. Интервал применяется не ко всему списку данных, а к каждому его элементу. Например, если ресурс содержит прокси, то эта настройка задает интервал между использованиями каждого прокси в 5 секунд.
* @param {boolean} greedy Жадный алгоритм
* @param {boolean} dont_give_up Ждать появления
*/
function BAS_create_resource(
name,
successes,
fails,
simultaneous,
interval,
greedy,
dont_give_up
) {
RCreate(name, successes, fails, simultaneous, interval, greedy, dont_give_up)
}
/**
* Удалить Текущий Элемент
* Удалить ресурс. Если тип ресурса - 'Из файла', текущая строка будет удалена из файла, если тип ресурса 'База', текущая запись будет удалена из базы данных и т. д.
* Текущая строка - это строка, которая была получена последней в текущем потоке. Например, если у вас есть ресурс 'Прокси', и этот прокси забанен на целевом сайте, вы можете использовать это действие с именем ресурса 'Прокси'. Это приведет к удалению прокси из файла и он никогда больше не будет использоваться на протяжении всей работы скрипта.
* По умолчанию удаление строк из файла происходит не сразу, это сделано для оптимизации использования жесткого диска. Но если вы установите настройку 'Удалить из файла/базы мгновенно', то файл будет очищен и перезаписан мгновенно после завершения этого действия.
* Обычно вам не нужно вызывать это действие для удаление ресурсов, использованные ресурсы могут быть очищены автоматически, если при создании ресурса выбран параметр 'Чтение и удаление строк после использования'. ( screen https://wiki.bablosoft.com/lib/exe/fetch.php?cache=&media=deleteresourceafteruse.png). Ресурс будет автоматически очищен в случае достижения заданного числа успешных или неудачных использований ресурса. Например, если при создании ресурса вы указали 'Используйте каждую строку один раз', то ресурс будет удален автоматически после первого использования ( screen https://wiki.bablosoft.com/lib/exe/fetch.php?cache=&media=singleusageres.png).
*
* @param {string} name Имя ресурса
Имя ресурса, для которого последний использованный элемент будет удален.
* @param {boolean} instantly Удалить из файла/базы мгновенно
*/
function BAS_delete_resource(name, instantly) {
if (name in _R && _R[name]) {
_R[name].die()
_R[name] = null
}
if (instantly) RSync(name)
}
/**
* Добавить Элемент
* Добавить новый элемент в ресурс. Например, добавить новую строку в файл или новую запись в базу данных.
* Каждый ресурс содержит контейнер с данными, например, строки из файла. В отличие от списков, система ресурсов помогает распределять данные по потокам, а также обрабатывает различные ситуации, которые возникают при одновременном использовании данных в многопоточном режиме.
* Обычно ресурсы создаются из пользовательского интерфейса (кнопкой '+ Создать новый ресурс'), но также могут быть созданы действием 'Создать ресурс'.
* С помощью этого действия вы можете добавлять данные в любой тип ресурсов. Это действие не влияет на некоторые типы ресурсов, такие как 'Строка' или 'Число'. Обычно действие используется для добавления строк в файл.
* По умолчанию добавление строк в файл происходит не сразу, это сделано для оптимизации использования жесткого диска. Но если вы установите настройку 'Добавить в файл/базу мгновенно', файл будет обновлен мгновенно.
* Если выбрана настройка 'Только добавить в файл/базу', то список данных внутри ресурса не будет обновляться, будет изменен только источник ресурса, например файл или база данных.
* Если ресурс создан в режиме 'только запись', то это действие может добавлять в него данные. В этом случае он будет записывать строку из параметра 'Данные' в файл, выбранный пользователем на этапе выбора ресурсов при запуске скрипта ( добавлять данные в файл https://wiki.bablosoft.com/lib/exe/fetch.php?cache=&media=adddatatofile.png, режим 'только запись' https://wiki.bablosoft.com/lib/exe/fetch.php?cache=&media=writeonlymode.png, выбор ресурсов https://wiki.bablosoft.com/lib/exe/fetch.php?cache=&media=resourceselection.png).
*
* @param {string} name Имя ресурса
Имя ресурса, в который будет добавлен новый элемент.
* @param {string} data Данные
Значение нового элемента, может быть любой строкой.
* @param {boolean} onlyAdd Только добавить в файл/базу
* @param {boolean} instantly Добавить в файл/базу мгновенно
*/
function BAS_resource_add(name, data, onlyAdd, instantly) {
RInsert(name, data, onlyAdd)
if (instantly) RSync(name)
}
/**
* Расположение Ресурса
* Получить расположение ресурса. Расположение ресурса - путь к файлу для ресурса с типом 'Из файла', url для ресурса с типом 'Из ссылки' и путь к папке для типа ресурса 'Файлы из папки'.
* Используйте это действие для получения пути к файлу/папке, выбранной пользователем.
* С этим файлом или папкой можно будет взаимодействовать позже с помощью модуля 'Файловая система'.
* Типичным примером использования этого действия будет удаление файла при запуске скрипта. Для этого вызовите это действие в функции OnApplicationStart и отправьте результат в действие действие 'Удалить Файл/Папку' ( screen https://wiki.bablosoft.com/lib/exe/fetch.php?cache=&media=deletefilefromresource.png).
*
* @param {string} name Имя ресурса
Имя ресурса, для которого будет получено расположение.
* @returns Строка, в которой будет находиться расположение ресурса. Расположение ресурса - путь к файлу для ресурса с типом 'Из файла', url для ресурса с типом 'Из ссылки' и путь к папке для типа ресурса 'Файлы из папки'.
*/
function BAS_get_resource_location(name) {
return RInfo(name, "Location")
}
/**
* Ресурс В Список
* Скопировать данные из ресурса в список.
* Результат имеет тип список, поэтому с ним можно работать с помощью модуля 'Список' или с помощью javascript.
* Очень важно понимать, что изменение возвращаемого списка не влияет на сам ресурс.
* Типичным примером использования будет копирование ресурса в список и создания цикла по каждому элементу списка ( screen https://wiki.bablosoft.com/lib/exe/fetch.php?cache=&media=iterateresource.png).
*
* @param {string} name Имя ресурса
Имя ресурса, который будет скопирован в список
* @returns Список Для Сохранения Данных
Эта переменная будет содержать список со всеми данными из ресурса.
Примеры :
["line1","line2","line3"]
*/
function BAS_resource_as_list(name) {
return RPick(name)
}
/**
* Список В Ресурс
* Заменить данные ресурса данными из списка.
* Все предыдущие данные будут потеряны, и состояние всех данных (количество успехов и неудач ресурса) также будет потеряно.
* Использование этого действия с пустым списком очистит ресурс.
* Каждый ресурс содержит контейнер с данными, например, строки из файла. В отличие от списков, система ресурсов помогает распределять данные по потокам, а также обрабатывает различные ситуации, которые возникают при одновременном использовании данных в многопоточном режиме.
* Обычно ресурсы создаются из пользовательского интерфейса (кнопкой '+ Создать новый ресурс'), но также могут быть созданы действием 'Создать ресурс'.
* Это действие никак не влияет на некоторые типы ресурсов, такие как 'Строка' или 'Число'.
*
* @param {string} name Имя ресурса
Имя ресурса, данные которого будут заменены данными из списка.
* @param {Array} list Этот список будет преобразован в ресурс
Примеры :
[] - Взять данные из пустого списка, то есть очистить ресурс.
["line1","line2","line3"] - Задать новые данные для ресурса.
*/
function BAS_list_to_resource(name, list) {
RClear(name)
RSync(name)
for (var i = 0; i < list.length; i++) {
RInsert(name, list[i], false)
}
RSync(name)
}
/**
* Перезагрузить Ресурс
* Перезагрузить строки из файла или записи из базы данных.
* Данные ресурса будут полностью заменены на новые. Все состояния всех данных (количество успехов и неудач ресурса) также будет сброшено. Если некоторые строки были удалены, эта информация также будет потеряна.
* Это действие сильно нагружает процессор и жесткий диск, поэтому не рекомендуется использовать его в многопоточном режиме.
*
* @param {string} name Имя ресурса
Имя ресурса, который будет перезагружен
*/
function BAS_reload_resource(name) {
Reload(name)
}
/**
* Количество Элементов В Ресурсе
* Получить количество элементов в ресурсе.
* @param {string} name Имя ресурса
Имя ресурса в котором будет подсчитаны элементы
* @returns количество элементов в выбранном ресурсе
*/
function BAS_resource_length(name) {
return ScriptWorker.GetTotalLength(name)
}
