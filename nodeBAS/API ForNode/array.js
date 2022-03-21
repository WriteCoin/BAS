const get_array_functions = (f) => {
	/**
* Последний элемент
* @param {Array} arr Массив
* @returns последний элемент массива
*/
const lastListElement = async (arr) => await f("lastListElement", { arr })

	/**
* Случайный элемент
* @param {Array} arr массив
* @returns случайный элемент из указанного массива
*/
const randomListElement = async (arr) => await f("randomListElement", { arr })

	/**
* Установить элемент
* @param {Array} arr Ммассив
* @param {number} index Индекс
* @param {any} value Значение
* @returns Элемент массива по указанному индексу.
*/
const setListElement = async (arr, index, value) => await f("setListElement", { arr, index, value })

	/**
* Удалить По Значению
* @param {Array} arr Массив
* @param {any} value Значение
* @returns Массив со удаленными элементами, имеющими заданное значение
*/
const deleteListValue = async (arr, value) => await f("deleteListValue", { arr, value })

	/**
* Содержит
* Проверить содержит ли массив определенное значение.
* @param {Array} arr Массив
* @param {any} value Значение
* @returns boolean
*/
const listContains = async (arr, value) => await f("listContains", { arr, value })

	/**
* Подсписок
* @param {Array} arr Массив
* @param {number} index Начальный Индекс
* @param {number} len Длина
* @returns Вложенный массив, состоящий из определенного количества элементов оригинального массива
*/
const subList = async (arr, index, len) => await f("subList", { arr, index, len })

	/**
* Удалить Дубликаты
* Удалить повторяющиеся элементы из указанного массива.
* @param {Array} arr Массив
* @returns Array
*/
const listRemoveDuplicates = async (arr) => await f("listRemoveDuplicates", { arr })

	/**
* Копировать Список
* Получить полную копию массива.
* @param {Array} arr Массив
* @returns Array
*/
const listCopy = async (arr) => await f("listCopy", { arr })

	/**
* Перемешать Список
* Перемешать все элементы массив в случайном порядке.
* @param {Array} arr Массив
* @returns Array
*/
const listShuffle = async (arr) => await f("listShuffle", { arr })

	/**
* Объединить Списки
* Добавить все элементы из одного массива в другой.
* @param {Array} source Массив
* @param {Array} target Массив Для Объединения
* @returns Array
*/
const listMerge = async (source, target) => await f("listMerge", { source, target })

	/**
* Сравнить Списки
* Сравнить два указанных массива поэлементно. Действие возвращает true, если оба массива содержат одинаковые значения, даже если они расположены в разном порядке.
* @param {Array} arr Массив
* @param {Array} arrCompare Массив Для Сравнения
* @returns boolean
*/
const listCompare = async (arr, arrCompare) => await f("listCompare", { arr, arrCompare })

return {	lastListElement,
	randomListElement,
	setListElement,
	deleteListValue,
	listContains,
	subList,
	listRemoveDuplicates,
	listCopy,
	listShuffle,
	listMerge,
	listCompare,
}
}

module.exports = get_array_functions