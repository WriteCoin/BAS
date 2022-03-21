/**
* Последний элемент
* @param {Array} arr Массив
* @returns последний элемент массива
*/
function lastListElement(arr) {
const arr = _function_argument('arr') || arr
const result = (arr.length > 0) ? arr[arr.length - 1] : null
_function_return(result)
return result
}
/**
* Случайный элемент
* @param {Array} arr массив
* @returns случайный элемент из указанного массива
*/
function randomListElement(arr) {
const arr = _function_argument('arr') || arr
const r = Math.floor(Math.random() * arr.length)
const result = arr[r]
_function_return(result)
return result
}
/**
* Установить элемент
* @param {Array} arr Ммассив
* @param {number} index Индекс
* @param {any} value Значение
* @returns Элемент массива по указанному индексу.
*/
function setListElement(arr, index, value) {
const arr = _function_argument('arr') || arr
const index = _function_argument('index') || index
const value = _function_argument('value') || value
arr[index < 0 ? arr.length + index : index] = value
_function_return(arr)
return arr
}
/**
* Удалить По Значению
* @param {Array} arr Массив
* @param {any} value Значение
* @returns Массив со удаленными элементами, имеющими заданное значение
*/
function deleteListValue(arr, value) {
const arr = _function_argument('arr') || arr
const value = _function_argument('value') || value
const result = arr.filter(function (e) {
return e !== value
})
_function_return(result)
return result
}
/**
* Содержит
* Проверить содержит ли массив определенное значение.
* @param {Array} arr Массив
* @param {any} value Значение
* @returns boolean
*/
function listContains(arr, value) {
const arr = _function_argument('arr') || arr
const value = _function_argument('value') || value
const result = arr.indexOf(value) >= 0
_function_return(result)
return result
}
/**
* Подсписок
* @param {Array} arr Массив
* @param {number} index Начальный Индекс
* @param {number} len Длина
* @returns Вложенный массив, состоящий из определенного количества элементов оригинального массива
*/
function subList(arr, index, len) {
const arr = _function_argument('arr') || arr
const index = _function_argument('index') || index
const len = _function_argument('len') || len
const result = arr.slice().splice(index, len)
_function_return(result)
return result
}
/**
* Удалить Дубликаты
* Удалить повторяющиеся элементы из указанного массива.
* @param {Array} arr Массив
* @returns Array
*/
function listRemoveDuplicates(arr) {
const arr = _function_argument('arr') || arr
const seen = {}
const result = arr.filter(function (item) {
return seen.hasOwnProperty(item) ? false : (seen[item] = true)
})
_function_return(result)
return result
}
/**
* Копировать Список
* Получить полную копию массива.
* @param {Array} arr Массив
* @returns Array
*/
function listCopy(arr) {
const arr = _function_argument('arr') || arr
const result = arr.slice()
_function_return(result)
return result
}
/**
* Перемешать Список
* Перемешать все элементы массив в случайном порядке.
* @param {Array} arr Массив
* @returns Array
*/
function listShuffle(arr) {
const arr = _function_argument('arr') || arr
var j, x, i
for (i = arr.length; i; i--) {
j = Math.floor(Math.random() * i)
x = arr[i - 1]
arr[i - 1] = arr[j]
arr[j] = x
}
_function_return(arr)
return arr
}
/**
* Объединить Списки
* Добавить все элементы из одного массива в другой.
* @param {Array} source Массив
* @param {Array} target Массив Для Объединения
* @returns Array
*/
function listMerge(source, target) {
const source = _function_argument('source') || source
const target = _function_argument('target') || target
const result = source.concat(target.slice())
_function_return(result)
return result
}
/**
* Сравнить Списки
* Сравнить два указанных массива поэлементно. Действие возвращает true, если оба массива содержат одинаковые значения, даже если они расположены в разном порядке.
* @param {Array} arr Массив
* @param {Array} arrCompare Массив Для Сравнения
* @returns boolean
*/
function listCompare(arr, arrCompare) {
const arr = _function_argument('arr') || arr
const arrCompare = _function_argument('arrCompare')
const result = (JSON.stringify(arr.slice().sort()) === JSON.stringify(arrCompare.slice().sort()))
_function_return(result)
return result
}
