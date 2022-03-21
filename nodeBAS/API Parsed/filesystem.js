/**
* Читать Файл
* Прочитать содержимое файла в переменную.
* @param {string} filepath Путь к файлу
* @param {int} from Первый байт
* @param {int} to Последний байт. Используйте 0, чтобы прочитать весь файл.
* @param {boolean} isBase64 Сохранить в формате base64
* @returns number
*/
function BAS_read_file(filepath, from, to, isBase64) {
const filepath = _function_argument('filepath') || filepath
const from = _function_argument('from') || from
const to = _function_argument('to') || to
const isBase64 = _function_argument('isBase64') || isBase64
const result = native('filesystem', 'readfile', JSON.stringify({
value: filepath,
base64: isBase64,
from: from,
to: to
}))
_function_return(result)
return result
}
/**
* Запись В Файл
* Записать текст или бинарные данные в файл.
* Лучше использовать действие Результат для вывода результатов
* @param {string} filepath Путь к файлу
* @param {string} data Данные
* @param {boolean} isLn Добавить символ окончания строки
* @param {boolean} isAppend Дописывать файл
* @param {boolean} isBase64 Данные представлены в формате base64
*/
function BAS_write_file(filepath, data, isLn, isAppend, isBase64) {
const filepath = _function_argument('filepath') || filepath
const data = _function_argument('data') || data
const isLn = _function_argument('isLn') || isLn
const isAppend = _function_argument('isAppend') || isAppend
const isBase64 = _function_argument('isBase64') || isBase64
native('filesystem', 'writefile', JSON.stringify({
path: filepath,
value: data.toString() + '\r' + (isLn ? '\n' : ''),
base64: isBase64,
append: isAppend
}))
}
/**
* Информация О Файле/Папке
* Получить подробную информацию о файле или папке: размер, базовая папка, проверить существование и т. д.
* @param {string} filename Имя Файла
* @returns Object {
*exists: boolean - Существование Файла
*size: number - Размер Файла
*baseDirectory: string - Папка Файла
*isDirectory: boolean - Является Ли Папкой
*lastModified: string - Последнее Изменение
* }
*/
function BAS_file_info(filename) {
const filename = _function_argument('filename') || filename
const json = JSON.parse(native('filesystem', 'fileinfo', filename))
const result = {
exists: json.exists,
size: json.size,
baseDirectory: json.directory,
isDirectory: json.is_directory,
lastModified: new Date(json.last_modified * 1000)
}
_function_return(result)
return result
}
/**
* Создать Папку
* Создать новую папку по указанному пути
* @param {string} dirname Имя Папки
*/
function BAS_create_dir(dirname) {
const dirname = _function_argument('dirname') || dirname
native('filesystem', 'createdir', firname)
}
/**
* Удалить Файл/Папку
* Удалить файл или папку.
* @param {string} path Имя Файла Или Папки
*/
function BAS_remove_file(path) {
const path = _function_argument('path') || path
native('filesystem', 'removefile', path)
}
/**
* Переместить Файл/Папку
* Переместить файл или папку в новое место.
* @param {string} path Имя Файла Или Папки
* @param {string} dest Новое Расположение Файла Или Папки
*/
function BAS_move_file(path, dest) {
const path = _function_argument('path') || path
const dest = _function_argument('dest') || dest
native('filesystem', 'movefile', {
path: path,
dest: dest
})
}
/**
* Копировать Файл/Папку
* Скопировать файл или папку в новое место.
* @param {string} path Имя Файла Или Папки
* @param {string} dest Место Назначения Копирования
*/
function BAS_copy_file(path, dest) {
const path = _function_argument('path') || path
const dest = _function_argument('dest') || dest
native('filesystem', 'copyfile', {
path: path,
dest: dest
})
}
/**
* Поиск Файлов
* Найти в указанной папке все файлы, удовлетворяющие определенным условиям.
* @param {string} folder Папка Для Поиска
* @param {string} mask Маска Имени Файла
* @param {string} contains Файл Должен Содержать
* @param {boolean} include_folders Искать Папки
* @param {boolean} include_files Искать Файлы
* @param {boolean} recursive Поиск В Подпапках
* @returns string
*/
function BAS_search_files(folder, mask, contains, include_folders, include_files, recursive) {
const folder = _function_argument('folder') || folder
const mask = _function_argument('mask') || mask
const contains = _function_argument('contains') || contains
const include_folders = _function_argument('include_folders') || include_folders
const include_files = _function_argument('include_files') || include_files
const recursive = _function_argument('recursive') || recursive
const args = _arguments()
native_async('filesystem', 'search', JSON.stringify({
folder: args.folder,
mask: args.mask,
contains: args.contains,
include_folders: args.include_folders,
include_files: args.include_files,
recursive: args.recursive
}))!
const result = JSON.parse(_result()).d
_function_return(result)
return result
}
/**
* Читать Файл В Список
* Прочитать содержимое указанного файла в список. Каждый элемент списка будет содержать одну строку исходного файла.
* @param {string} filepath Путь к файлу
* @returns Array
*/
function BAS_read_file_to_array(filepath) {
const filepath = _function_argument('filepath') || filepath
const d = BAS_read_file(filepath, 0, 0, false)
const result = d.length === 0 ? [] : d.split(/\r?\n/)
_function_return(result)
return result
}
/**
* Записать Список В Файл
* Записать содержимое указанного списка в файл. Каждый элемент списка будет записан в виде строки в файле.
* @param {string} filepath Путь к файлу
* @param {Array} arr Список Для Записи В Файл
* @param {boolean} isLn Добавить символ окончания строки
* @param {boolean} isAppend Дописывать файл
*/
function BAS_write_file_array(filepath, arr, isLn, isBase64, isAppend) {
const filepath = _function_argument('filepath') || filepath
const arr = _function_argument('arr') || arr
const isLn = _function_argument('isLn') || isLn
const isBase64 = _function_argument('isBase64') || isBase64
const isAppend = _function_argument('isAppend') || isAppend
native('filesystem', 'writefile', JSON.stringify({
path: filepath,
value: arr.join('\r\n') + (isLn ? '\r\n' : ''),
base64: false,
append: isAppend
}))
}
