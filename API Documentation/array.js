/**
 * Последний элемент
 * @param {Array} arr Массив
 * @returns последний элемент массива
 */
function lastListElement(arr) {
  if (arr.length > 0) return arr[arr.length - 1]
  else return null
}

/**
 * Случайный элемент
 * @param {Array} arr массив
 * @returns случайный элемент из указанного массива
 */
function randomListElement(arr) {
  const r = Math.floor(Math.random() * arr.length)
  return arr[r]
}

/**
 * Установить элемент
 * @param {Array} arr Ммассив
 * @param {number} index Индекс
 * @param {any} value Значение
 * @returns Элемент массива по указанному индексу.
 */
function setListElement(arr, index, value) {
  arr[index < 0 ? arr.length + index : index] = value
  return arr
}

/**
 * Удалить По Значению
 * @param {Array} arr Массив
 * @param {any} value Значение
 * @returns Массив со удаленными элементами, имеющими заданное значение
 */
function deleteListValue(arr, value) {
  return arr.filter(function (e) {
    return e !== value
  })
}

/**
 * Содержит
 * Проверить содержит ли массив определенное значение.
 * @param {Array} arr Массив
 * @param {any} value Значение
 * @returns boolean
 */
function listContains(arr, value) {
  return arr.indexOf(value) >= 0
}

/**
 * Подсписок
 * @param {Array} arr Массив
 * @param {number} index Начальный Индекс
 * @param {number} len Длина
 * @returns Вложенный массив, состоящий из определенного количества элементов оригинального массива
 */
function subList(arr, index, len) {
  return arr.slice().splice(index, len)
}

/**
 * Удалить Дубликаты
 * Удалить повторяющиеся элементы из указанного массива.
 * @param {Array} arr Массив
 * @returns Array
 */
function listRemoveDuplicates(arr) {
  const seen = {}
  return arr.filter(function (item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true)
  })
}

/**
 * Копировать Список
 * Получить полную копию массива.
 * @param {Array} arr Массив
 * @returns Array
 */
function listCopy(arr) {
  return arr.slice()
}

/**
 * Перемешать Список
 * Перемешать все элементы массив в случайном порядке.
 * @param {Array} arr Массив
 * @returns Array
 */
function listShuffle(arr) {
  var j, x, i
  for (i = arr.length; i; i--) {
    j = Math.floor(Math.random() * i)
    x = arr[i - 1]
    arr[i - 1] = arr[j]
    arr[j] = x
  }
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
  return source.concat(target.slice())
}

/**
 * Сравнить Списки
 * Сравнить два указанных массива поэлементно. Действие возвращает true, если оба массива содержат одинаковые значения, даже если они расположены в разном порядке.
 * @param {Array} arr Массив
 * @param {Array} arrCompare Массив Для Сравнения
 * @returns boolean
 */
function listCompare(arr, arrCompare) {
  return (JSON.stringify(arr.slice().sort()) === JSON.stringify(arrCompare.slice().sort()))
}
