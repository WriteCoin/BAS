/**
 * Получить имя файла из пути
 * Получить последнюю часть указанного пути.
 * Это действие вернет последнюю часть пути, которой может быть название файла с расширением или название папки, завершающие разделители каталогов игнорируются.
 * Например, если указан путь "С:/foo/bar/baz/asdf/quux.html/", то действие вернет "quux.html".
 * Расширение файла можно удалить из итогового результата, указав удаляемое раширение в сответствующий параметр находящийся в дополнительных настройках.
 * Например, если указан путь "/test/archive/engine.js" и удаляемое расширение ".js", то действие вернет "engine".
 * Параметр "Удаляемое расширение файла" чувствителен к регистру.
 * Например, если указан путь "C:/foo.HTML" и удаляемое расширение ".html", то действие вернет "foo.HTML", а не "foo".
 * Можно удалить любое расширение, если в качестве удаляемого расширения указать "*".
 * Например, если указан путь "D:/sqlite/your.db" и удаляемое расширение "*", то действие вернет "your".
 * Получить директорию пути можно с помощью действия "Получить папку из пути".
 * Получить расширение файла можно с помощью действия "Получить расширение файла".
 * Распарсить путь на элементы можно с помощью действия "Парсить путь".
 * Если в параметр "Путь" или "Удаляемое расширение файла" будет указана не строка, поток остановится с сообщением об ошибке. Если вы хотите продолжить работу, используйте действие "Игнорировать ошибки".
 * @param {string} path Путь
  Путь, из которого нужно получить последнюю часть.
  Примеры :
  /foo/bar/baz/asdf/quux.html
  D:/test/archive/engine.js
  C:/foo.php
 * @param {string} ext Удаляемое расширение файла
  Необязательный параметр. Расширение файла, которое нужно удалять из итогового результата. Этот параметр чувствителен к регистру, если указан путь "C:/foo.HTML" и расширение ".html", то итоговым результатом будет "foo.HTML", а не "foo".
  Примеры :
  .html
  .js
  .php
  * - Удалять любое расширение файла
  Пустая строка - Не удалять расширение файла
 * @returns после успешного выполнения действия, последняя часть пути.
  Примеры :
  quux.html - Путь: /foo/bar/baz/asdf/quux.html
  engine.js - Путь: D:/test/archive/engine.js
  foo.php - Путь: C:/foo.php
  quux - Путь: /foo/bar/baz/asdf/quux.html, Удаляемое расширение файла: .html
  engine - Путь: D:/test/archive/engine.js, Удаляемое расширение файла: .js
  foo - Путь: C:/foo.php, Удаляемое расширение файла: .php
 */
function BAS_filename_from_path(path, ext) {
  return _path.basename(path, ext)
}

/**
 * Получить папку из пути
 * Получить директорию указанного пути.
 * Это действие вернет директорию указанного пути, завершающие разделители каталогов игнорируются.
 * Например, если указан путь "С:/foo/bar/baz/asdf/quux.html/", то действие вернет "C:/foo/bar/baz/asdf".
 * Распарсить путь на элементы можно с помощью действия "Парсить путь".
 * Если в параметр "Путь" будет указана не строка, поток остановится с сообщением об ошибке. Если вы хотите продолжить работу, используйте действие "Игнорировать ошибки".
 * @param {string} path Путь
  Путь, из которого нужно получить директорию.
  Примеры :
  /foo/bar/baz/asdf/quux
  D:/modules/res/panels/panel3.jpg
  C:/Users/Admin/Desktop/projects/project.xml
 * @returns после успешного выполнения действия, директория.
  Примеры :
  /foo/bar/baz/asdf - Путь: /foo/bar/baz/asdf/quux
  D:/modules/res/panels - Путь: D:/modules/res/panels/panel3.jpg
  C:/Users/Admin/Desktop/projects - Путь: C:/Users/Admin/Desktop/projects/project.xml
 */
function BAS_dirname_from_path(path) {
  return _path.dirname(path)
}

/**
 * Получить расширение файла
 * Получить расширение файла указанного пути.
 * Это действие вернет расширение последней части пути, с пооследней точки до конца строки, завершающие разделители каталогов игнорируются.
 * Например, если указан путь "С:/foo/bar/baz/asdf/quux.html/", то действие вернет ".html".
 * Если в последней части пути нет точки или перед последней точкой нет символов, то действие вернет пустую строку.
 * Например, если указан путь "С:/foo/bar/baz/asdf/quux/" или "С:/foo/bar/baz/asdf/.index", то действие вернет "".
 * Распарсить путь на элементы можно с помощью действия "Парсить путь".
 * Если в параметр "Путь" будет указана не строка, поток остановится с сообщением об ошибке. Если вы хотите продолжить работу, используйте действие "Игнорировать ошибки".
 * @param {string} path Путь
  Путь, из которого нужно получить расширение.
  Примеры :
  /home/user/dir/file.txt
  D:/dev/sql/sqlite/your.db
  C:/Users/Admin/Desktop/site/index.html
 * @returns после успешного выполнения действия, расширение.
  Примеры :
  .txt - Путь: /home/user/dir/file.txt
  .db - Путь: D:/dev/sql/sqlite/your.db
  .html - Путь: C:/Users/Admin/Desktop/site/index.html
  Пустая строка - Путь: /foo/bar/baz/asdf/quux
 */
function BAS_extname_from_path(path) {
  return _path.extname(path)
}

/**
 * Является ли абсолютным путем
 * Проверить, являются ли указанный путь абсолютным.
 * Это действие вернет true или false в зависимости от того, является ли указанный путь абсолютным. Результат может быть использован вместе с действием "If".
 * Например, если указан путь "/foo/bar", то действие вернет true, а если укзан путь "bar/baz" или "qux/", то действие вернет false.
 * Если в параметр "Путь" будет указана не строка, поток остановится с сообщением об ошибке. Если вы хотите продолжить работу, используйте действие "Игнорировать ошибки".
 * @param {string} path Путь
  Путь, который нужно проверить на то является ли он абсолютным.
  Примеры :
  /foo/bar - Абсолютный путь
  C:/foo/.. - Абсолютный путь
  bar/baz - Не абсолютный путь
  qux/ - Не абсолютный путь
 * @returns true или false в зависимости от того, является ли указанный путь абсолютным.
  Примеры :
  true - Путь является абсолютным.
  false - Путь не является абсолютным.
 */
function BAS_path_is_absolute(path) {
  return _path.isAbsolute(path)
}

/**
 * Объединить пути
 * Объединить несколько путей в один.
 * Это действие вернет путь, составленную из всех указанных путей.
 * Например, если указаны параметры "Путь 1" и "Путь 2" значения которых сответственно равны "/foo" и "/bar", то действие вернет "/foo/bar".
 * Пути из отдельных полей и списка складываются в общий список путей которые будут объединены.
 * Например, если в поле "Путь 1" указан путь и в поле "Список путей" указан список из 4 путей, то объединено будет 5 путей.
 * Если какие-то из параметров ("Путь 1", "Путь 2", "Путь 3", "Список путей") не указаны, будут использованы все параметры кроме них.
 * Например, если "Список путей" не указан, то список будет сформирован из параметров "Путь 1" и "Путь 2" и "Путь 3". Если параметры "Путь 1", "Путь 2", "Путь 3" пусты, то будет использован "Список путей". Если указаны все параметры, то все они будут использованы.
 * Порядок объединения полей следующий: "Путь 1", "Путь 2", "Путь 3", "Список путей".
 * Список можно создать с помощью действий из модуля "Список".
 * Если в качестве какого либо из путей указана не строка, поток остановится с сообщением об ошибке. Если вы хотите продолжить работу, используйте действие "Игнорировать ошибки".
 * @param {string} path1 Путь 1. Может быть пустым
  Путь, которую нужно объединить с другими путями.
  Примеры :
  C:/Users/Admin/Desktop
  /foo/bar
  /baz
  Пустая строка - Будут использованы параметры "Путь 2", "Путь 3", "Список путей"
 * @param {string} path2 Путь 2. Может быть пустым
  Путь, которую нужно объединить с другими путями.
  Примеры :
  C:/Users/Admin/Desktop
  /foo/bar
  /baz
  Пустая строка - Будут использованы параметры "Путь 1", "Путь 3", "Список путей"
 * @param {string} path3 Путь 3. Может быть пустым
  Путь, которую нужно объединить с другими путями.
  Примеры :
  C:/Users/Admin/Desktop
  /foo/bar
  /baz
  Пустая строка - Будут использованы параметры "Путь 1", "Путь 2", "Список путей"
 * @param {Array} pathList Список путей. Может быть пустым
 * @returns после успешного выполнения действия, итоговый путь.
  Примеры :
  C:/Users/Admin/Desktop/foo/bar
  D:/test/Archive/manifest.json
  /baz/tost/file.txt
 */
function BAS_path_join(path1, path2, path3, pathList) {
  return _path
    .join([_avoid_nil(path1), _avoid_nil(path2), _avoid_nil(path3)])
    .concat(_to_arr(_avoid_nilb(pathList, [])))
}

/**
 * Нормализовать путь
 * Нормализовать путь.
 * Это действие вернет нормализованный путь, множественные слеши будут заменены на одиночные, обратные слеши "\" будут заменены на обычные "/", сегменты ".." и "." будут решены.
 * Например, если указан путь "C:////temp\\/\/\/foo/bar/..", то действие вернет "C:/temp/foo".
 * Если активирован параметр "Удалите завершающие слэши", то из пути будет удалены завершающие слэши, например, путь "С:\path\" будет нормализирован в "С:/path".
 * Например, если указан путь "C:\path/\", то действие вернет "C:/path".
 * Если вам нужно сравнить пути, то сначала нормализуйте их этим действием.
 * Если в параметр "Путь" будет указана не строка, поток остановится с сообщением об ошибке. Если вы хотите продолжить работу, используйте действие "Игнорировать ошибки".
 * @param {string} path Путь
  Путь, который нужно нормализовать.
  Примеры :
  C:\temp\\foo\bar\..\
  C:////temp\\/\/\/foo/bar
  /foo/bar//baz/asdf/quux/..
 * @param {boolean} removeTrailingSlash Удалите завершающие слэши
  Если активирован, то из пути будет удалены завершающие слэши.
  Примеры :
  Активирован - Путь "C:\path/\" будет нормализован до "C:/path"

  Деактивирован - Путь "C:\path/\" будет нормализован до "C:/path/"

  Активирован - Путь "\" будет нормализован до ""

  Деактивирован - Путь "\" будет нормализован до "/"
 * @returns после успешного выполнения действия, нормализованный путь.
  Примеры :
  C:/temp/foo - Путь: C:\temp\\foo\bar\..\ и "Удалите завершающие слэши" активирован
  C:/temp/foo/bar - Путь: C:////temp\\/\/\/foo/bar
  /foo/bar/baz/asdf - Путь: /foo/bar//baz/asdf/quux/..
 */
function BAS_path_normalize(path, removeTrailingSlash) {
  return _path.normalize(path, removeTrailingSlash)
}

/**
 * Парсить путь
 * Распарсить путь на элементы.
 * Это действие сохранит каждый элемент пути в свою переменную. Подробнее о путях можно узнать в Wiki.
 * Если в параметр "Путь" будет указана не строка, поток остановится с сообщением об ошибке. Если вы хотите продолжить работу, используйте действие "Игнорировать ошибки".
 * @param {string} path Путь
  Путь, который нужно распарсить.
  Примеры :
  /foo/bar/baz/asdf/quux.html
  D:/test/archive/engine.js
  C:/foo.php
  /foo/bar/baz/asdf/quux
 * @returns Object {
 *  root: string - Корень
  Примеры :
  / - Путь: /foo/bar/baz/asdf/quux.html
  D:/ - Путь: D:/test/archive/engine.js
  C:/ - Путь: C:/foo.php
  / - Путь: /foo/bar/baz/asdf/quux
 *  directory: string - Директория
  Примеры :
  /foo/bar/baz/asdf - Путь: /foo/bar/baz/asdf/quux.html
  D:/test/archive - Путь: D:/test/archive/engine.js
  C:/ - Путь: C:/foo.php
  /foo/bar/baz/asdf - Путь: /foo/bar/baz/asdf/quux
 *  base_name: string - Последняя часть
  Примеры :
  quux.html - Путь: /foo/bar/baz/asdf/quux.html
  engine.js - Путь: D:/test/archive/engine.js
  foo.php - Путь: C:/foo.php
  quux - Путь: /foo/bar/baz/asdf/quux
 *  file_extension: string - Расширение файла
  Эта переменная будет содержать расширение файла указанного пути. Если путь не содержит расширения файла, то переменная будет содержать пустую строку.
  Примеры :
  .html - Путь: /foo/bar/baz/asdf/quux.html
  .js - Путь: D:/test/archive/engine.js
  .php - Путь: C:/foo.php
  Пустая строка - Путь: /foo/bar/baz/asdf/quux
 *  file_name: string - Имя файла
  Эта переменная будет содержать имя файла или директории указанного пути, имя файла будет сохранено без расширения.
  Примеры :
  quux - Путь: /foo/bar/baz/asdf/quux.html
  engine - Путь: D:/test/archive/engine.js
  foo - Путь: C:/foo.php
  quux - Путь: /foo/bar/baz/asdf/quux
 *  items_list: Array - Список элементов пути
  Эта переменная будет содержать список всех элементов указанного пути. Полученный список можно обработать с помощью действий из модуля "Список".
  Примеры :
  ["foo","bar","baz","asdf","quux.html"] - Путь: /foo/bar/baz/asdf/quux.html
  ["D:","test","archive","engine.js"] - Путь: D:/test/archive/engine.js
  ["C:","foo.php"] - Путь: C:/foo.php
  ["foo","bar","baz","asdf","quux"] - Путь: /foo/bar/baz/asdf/quux
 * }
 */
function BAS_path_parse(path) {
  const parse_res = _path.parse(path)
  return {
    root: parse_res.root,
    directory: parse_res.dir,
    base_name: parse_res.base,
    file_extension: parse_res.ext,
    file_name: parse_res.name,
    items_list: parse_res.items
  }
}

/**
 * Получить системный путь (BAS-функция)
 * Получить системный путь с указанным именем.
 * Program Files - Путь к директории "Program Files". Пример: "C:/Program Files".
 * Program Files (x86) - Путь к директории "Program Files (x86)" в 64-разрядных системах для приложений архитектуры x86. Пример: "C:/Program Files (x86)".
 * Desktop - Путь к директории "Рабочий стол". Пример: "C:/Users/Admin/Desktop".
 * Downloads - Путь к директории "Загрузки". Пример: "C:/Users/Admin/Downloads".
 * Documents - Путь к директории "Документы". Пример: "C:/Users/Admin/Documents".
 * Pictures - Путь к директории "Изображения". Пример: "C:/Users/Admin/Pictures".
 * Videos - Путь к директории "Видео". Пример: "C:/Users/Admin/Videos".
 * Music - Путь к директории "Музыка". Пример: "C:/Users/Admin/Music".
 * Favorites - Путь к директории "Избранное". Пример: "C:/Users/Admin/Favorites".
 * App Data - Используемое по умолчанию размещение данных приложений. Пример: "C:/Users/Admin/AppData/Roaming".
 * Local App Data - Используемое по умолчанию локальное размещение данных приложений. Пример: "C:/Users/Admin/AppData/Local".
 * User Profile - Путь к профилю текущего пользователя. Пример: "C:/Users/Admin".
 * System Drive - Диск, на котором расположен корневая директория Windows. Пример: "C:".
 * System Root - Путь к корневой директории Windows. Пример: "C:/Windows".
 * Windows Directory - Директория, в которую установлена Windows. Пример: "C:/Windows".
 * Temp - Путь к временной директории. Пример: "C:/Users/Admin/AppData/Local/Temp".
 * User Name - Имя текущего пользователя. Пример: "Admin".
 * Computer Name - Имя компьютера. Пример: "ADMIN".
 * @param {string} name Имя пути
  Имя пути, который вы хотите получить.
  Примеры :
  Program Files
  AppData
  Desktop
 * @returns полученный путь
  Примеры :
  C:/Program Files - Имя пути: Program Files
  C:/Users/Admin/AppData/Roaming - Имя пути: AppData
  C:/Users/Admin/Desktop - Имя пути: Desktop
 */
function BAS_get_system_path() {
  const name = _function_argument('name')
  _call_function(_get_system_path, {
    name: name
  })!
  _function_return(_result_function())
}