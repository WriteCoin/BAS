const get_image_functions = (f) => {
	/**
* Начать работу с изображением
* Загрузить изображение из бинарных данных (формат base64). Получить идентификатор изображения, который поможет работать с изображением.
* @param {string} data_base64 Данные изображения в формате base64
* @returns id изображения
*/
const BAS_load_image = async (data_base64) => await f("BAS_load_image", { data_base64 })

	/**
* Закончить работу с изображением
* Закрыть изображение с указанным идентификатором и освободить использованную память.
* @param {string} image_id Id изображения
*/
const BAS_delete_image = async (image_id) => await f("BAS_delete_image", { image_id })

	/**
* Создать пустое изображение
* Создать пустое изображение используя указанные параметры.
* @param {number} width Ширина
* @param {number} height Высота
* @param {number} red Цвет красный. От 0 до 255
* @param {number} green Цвет зеленый. От 0 до 255
* @param {number} blue Цвет синий. От 0 до 255
* @param {number} alpha Цвет прозрачный. От 0 до 255
* @returns Id изображения
*/
const BAS_create_image = async (width, height, red, green, blue, alpha) => await f("BAS_create_image", { width, height, red, green, blue, alpha })

	/**
* Изменить формат изображения
* Изменить формат изображения: png, jpeg.
* @param {string} image_id Id изображения
* @param {string} format 'png' | 'jpeg'. Формат изображения
*/
const BAS_convert_image = async (image_id, format) => await f("BAS_convert_image", { image_id, format })

	/**
* Получить данные изображения
* Получить данные изображения с заданным идентификатором в формате base64. Действие может быть использовано для сохранения в файл.
* @param {string} image_id Id изображения
* @returns Данные изображения
*/
const BAS_get_image_data = async (image_id) => await f("BAS_get_image_data", { image_id })

	/**
* Получить цвет пикселя
* Получить цвет пикселя по его координатам на изображении.
* @param {string} image_id Id изображения
* @param {number} x X
* @param {number} y Y
* @returns Object {
*R: Цвет красный
*G: Цвет зеленый
*B: Цвет синий
*A: Цвет прозрачный
* }
*/
const BAS_image_get_pixel = async (image_id, x, y) => await f("BAS_image_get_pixel", { image_id, x, y })

	/**
* Установить цвет пикселя
* Установить цвет пикселя по его координатам на изображении.
* @param {string} image_id Id изображения
* @param {number} x X
* @param {number} y Y
* @param {number} red Цвет красный. От 0 до 255
* @param {number} green Цвет зеленый. От 0 до 255
* @param {number} blue Цвет синий. От 0 до 255
* @param {number} alpha Цвет прозрачный. От 0 до 255
*/
const BAS_image_set_pixel = async (image_id, x, y, red, green, blue, alpha) => await f("BAS_image_set_pixel", { image_id, x, y, red, green, blue, alpha })

	/**
* Получить размер
* Получить ширину и высоту изображения.
* @param {string} image_id Id изображения
* @returns Object {
*width: number - Ширина
*height: number - Высота
* }
*/
const BAS_image_get_size = async (image_id) => await f("BAS_image_get_size", { image_id })

	/**
* Изменить размер.
* Изменить ширину и высоту изображения.
* @param {string} image_id Id изображения
* @param {number} width Ширина
* @param {number} height Высота
*/
const BAS_image_resize = async (image_id, width, height) => await f("BAS_image_resize", { image_id, width, height })

	/**
* Вставить одно изображение в другое.
* Вставить одно изображение в другое используя заданные координаты.
* @param {string} target_image_id Id целевого изображения
* @param {string} source_image_id Id изображения источника
* @param {number} x X
* @param {number} y Y
*/
const BAS_image_insert = async (target_image_id, source_image_id, x, y) => await f("BAS_image_insert", { target_image_id, source_image_id, x, y })

	/**
* Поиск одного изображения в другом
* Найти одно изображение в другом и получить координаты найденного места.
* @param {string} target_image_id Id целевого изображения
* @param {string} source_image_id Id изображения источника
* @returns Object {
*found_subimage_x: number - Найденная координата x в целевом изображении
* found_subimage_y: number - Найденная координата y в целевом изображении
* threshold: number - Насколько хорошо подходит изображение. 100 - точно подходит, 0 - не подходит совсем.
* }
*/
const BAS_image_find = async (target_image_id, source_image_id) => await f("BAS_image_find", { target_image_id, source_image_id })

	/**
* Заполнить прямоугольник цветом
* Заполнить прямоугольник на изображении определенным цветом.
* @param {string} image_id Id изображения
* @param {number} x X
* @param {number} y Y
* @param {number} width Ширина
* @param {number} height Высота
* @param {number} red Цвет красный. От 0 до 255
* @param {number} green Цвет зеленый. От 0 до 255
* @param {number} blue Цвет синий. От 0 до 255
* @param {number} alpha Цвет прозрачный. От 0 до 255
*/
const BAS_image_fill = async (
image_id, 
x, 
y, 
width, 
height, 
red, 
green, 
blue, 
alpha
) => await f("BAS_image_fill", { 
image_id, 
x, 
y, 
width, 
height, 
red, 
green, 
blue, 
alpha
 })

	/**
* Получить часть изображения
* Обрезать изображение используя конкретные координаты и размер.
* @param {string} image_id Id изображения
* @param {number} x X
* @param {number} y Y
* @param {number} width Ширина
* @param {number} height Высота
* @returns Id изображения
*/
const BAS_image_sub = async (image_id, x, y, width, height) => await f("BAS_image_sub", { image_id, x, y, width, height })

	/**
* Добавить текст
* Добавить текст в изображение используя заданные параметры.
* @param {string} image_id Id изображения
* @param {string} text Текст
* @param {Object} params {
*x: number - X
*y: number - Y
*width: number - Ширина
*height: number - Высота
*font: string - Семейство шрифтов
*fontRed: number - Цвет шрифта красный. От 0 до 255
*fontGreen: number - Цвет шрифта зеленый. От 0 до 255
*fontBlue: number - Цвет шрифта синий. От 0 до 255
*fontAlpha: number - Цвет шрифта прозрачный. От 0 до 255
*verticalAlign: 'top' | 'bottom' | 'center' - Вертикальное выравнивание
*gorizontalAlign: 'left' | 'right' | 'center' - Горизонтальное выравнивание
* }
*/
const BAS_image_text = async (image_id, text, params) => await f("BAS_image_text", { image_id, text, params })

return {	BAS_load_image,
	BAS_delete_image,
	BAS_create_image,
	BAS_convert_image,
	BAS_get_image_data,
	BAS_image_get_pixel,
	BAS_image_set_pixel,
	BAS_image_get_size,
	BAS_image_resize,
	BAS_image_insert,
	BAS_image_find,
	BAS_image_fill,
	BAS_image_sub,
	BAS_image_text,
}
}

module.exports = get_image_functions