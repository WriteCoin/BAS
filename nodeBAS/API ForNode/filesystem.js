const get_filesystem_functions = (f) => {
	/**
* Читать Файл
* Прочитать содержимое файла в переменную.
* @param {string} filepath Путь к файлу
* @param {int} from Первый байт
* @param {int} to Последний байт. Используйте 0, чтобы прочитать весь файл.
* @param {boolean} isBase64 Сохранить в формате base64
* @returns number
*/
const BAS_read_file = async (filepath, from, to, isBase64) => await f("BAS_read_file", { filepath, from, to, isBase64 })

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
const BAS_write_file = async (filepath, data, isLn, isAppend, isBase64) => await f("BAS_write_file", { filepath, data, isLn, isAppend, isBase64 })

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
const BAS_file_info = async (filename) => await f("BAS_file_info", { filename })

	/**
* Создать Папку
* Создать новую папку по указанному пути
* @param {string} dirname Имя Папки
*/
const BAS_create_dir = async (dirname) => await f("BAS_create_dir", { dirname })

	/**
* Удалить Файл/Папку
* Удалить файл или папку.
* @param {string} path Имя Файла Или Папки
*/
const BAS_remove_file = async (path) => await f("BAS_remove_file", { path })

	/**
* Переместить Файл/Папку
* Переместить файл или папку в новое место.
* @param {string} path Имя Файла Или Папки
* @param {string} dest Новое Расположение Файла Или Папки
*/
const BAS_move_file = async (path, dest) => await f("BAS_move_file", { path, dest })

	/**
* Копировать Файл/Папку
* Скопировать файл или папку в новое место.
* @param {string} path Имя Файла Или Папки
* @param {string} dest Место Назначения Копирования
*/
const BAS_copy_file = async (path, dest) => await f("BAS_copy_file", { path, dest })

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
const BAS_search_files = async (folder, mask, contains, include_folders, include_files, recursive) => await f("BAS_search_files", { folder, mask, contains, include_folders, include_files, recursive })

	/**
* Читать Файл В Список
* Прочитать содержимое указанного файла в список. Каждый элемент списка будет содержать одну строку исходного файла.
* @param {string} filepath Путь к файлу
* @returns Array
*/
const BAS_read_file_to_array = async (filepath) => await f("BAS_read_file_to_array", { filepath })

	/**
* Записать Список В Файл
* Записать содержимое указанного списка в файл. Каждый элемент списка будет записан в виде строки в файле.
* @param {string} filepath Путь к файлу
* @param {Array} arr Список Для Записи В Файл
* @param {boolean} isLn Добавить символ окончания строки
* @param {boolean} isAppend Дописывать файл
*/
const BAS_write_file_array = async (filepath, arr, isLn, isBase64, isAppend) => await f("BAS_write_file_array", { filepath, arr, isLn, isBase64, isAppend })

return {	BAS_read_file,
	BAS_write_file,
	BAS_file_info,
	BAS_create_dir,
	BAS_remove_file,
	BAS_move_file,
	BAS_copy_file,
	BAS_search_files,
	BAS_read_file_to_array,
	BAS_write_file_array,
}
}

module.exports = get_filesystem_functions