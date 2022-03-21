/**
* Начать работу с изображением
* Загрузить изображение из бинарных данных (формат base64). Получить идентификатор изображения, который поможет работать с изображением.
* @param {string} data_base64 Данные изображения в формате base64
* @returns id изображения
*/
function BAS_load_image(data_base64) {
const data_base64 = _function_argument('data_base64') || data_base64
const result = native("imageprocessing", "load", data_base64)
_function_return(result)
return result
}
/**
* Закончить работу с изображением
* Закрыть изображение с указанным идентификатором и освободить использованную память.
* @param {string} image_id Id изображения
*/
function BAS_delete_image(image_id) {
const image_id = _function_argument('image_id') || image_id
native("imageprocessing", "delete", image_id)
}
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
function BAS_create_image(width, height, red, green, blue, alpha) {
const width = _function_argument('width') || width
const height = _function_argument('height') || height
const red = _function_argument('red') || red
const green = _function_argument('green') || green
const blue = _function_argument('blue') || blue
const alpha = _function_argument('alpha') || alpha
width = width || 800
height = height || 800
red = red || 255
green = green || 255
blue = blue || 255
alpha = alpha || 255
const result = native(
"imageprocessing",
"create",
width + "," + height + "," + red + "," + green + "," + blue + "," + alpha
)
_function_return(result)
return result
}
/**
* Изменить формат изображения
* Изменить формат изображения: png, jpeg.
* @param {string} image_id Id изображения
* @param {string} format 'png' | 'jpeg'. Формат изображения
*/
function BAS_convert_image(image_id, format) {
const image_id = _function_argument('image_id') || image_id
const format = _function_argument('format') || format
native("imageprocessing", "convert", image_id + "," + format)
}
/**
* Получить данные изображения
* Получить данные изображения с заданным идентификатором в формате base64. Действие может быть использовано для сохранения в файл.
* @param {string} image_id Id изображения
* @returns Данные изображения
*/
function BAS_get_image_data(image_id) {
const image_id = _function_argument('image_id') || image_id
const result = native("imageprocessing", "getdata", image_id)
_function_return(result)
return result
}
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
function BAS_image_get_pixel(image_id, x, y) {
const image_id = _function_argument('image_id') || image_id
const x = _function_argument('x') || x
const y = _function_argument('y') || y
const split = native(
"imageprocessing",
"getpixel",
image_id + "," + x + "," + y
).split(",")
const result = {
R: parseInt(split[0]),
G: parseInt(split[1]),
B: parseInt(split[2]),
A: parseInt(split[3]),
}
_function_return(result)
return result
}
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
function BAS_image_set_pixel(image_id, x, y, red, green, blue, alpha) {
const image_id = _function_argument('image_id') || image_id
const x = _function_argument('x') || x
const y = _function_argument('y') || y
const red = _function_argument('red') || red
const green = _function_argument('green') || green
const blue = _function_argument('blue') || blue
const alpha = _function_argument('alpha') || alpha
native(
"imageprocessing",
"setpixel",
image_id +
"," +
x +
"," +
y +
"," +
red +
"," +
green +
"," +
blue +
"," +
alpha
)
}
/**
* Получить размер
* Получить ширину и высоту изображения.
* @param {string} image_id Id изображения
* @returns Object {
*width: number - Ширина
*height: number - Высота
* }
*/
function BAS_image_get_size(image_id) {
const image_id = _function_argument('image_id') || image_id
const split = native("imageprocessing", "getsize", image_id).split(",")
const result = {
width: parseInt(split[0]),
height: parseInt(split[1]),
}
_function_return(result)
return result
}
/**
* Изменить размер.
* Изменить ширину и высоту изображения.
* @param {string} image_id Id изображения
* @param {number} width Ширина
* @param {number} height Высота
*/
function BAS_image_resize(image_id, width, height) {
const image_id = _function_argument('image_id') || image_id
const width = _function_argument('width') || width
const height = _function_argument('height') || height
native("imageprocessing", "resize", image_id + "," + width + "," + height)
}
/**
* Вставить одно изображение в другое.
* Вставить одно изображение в другое используя заданные координаты.
* @param {string} target_image_id Id целевого изображения
* @param {string} source_image_id Id изображения источника
* @param {number} x X
* @param {number} y Y
*/
function BAS_image_insert(target_image_id, source_image_id, x, y) {
const target_image_id = _function_argument('target_image_id') || target_image_id
const source_image_id = _function_argument('source_image_id') || source_image_id
const x = _function_argument('x') || x
const y = _function_argument('y') || y
native(
"imageprocessing",
"insert",
target_image_id + "," + source_image_id + "," + x + "," + y
)
}
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
function BAS_image_find(target_image_id, source_image_id) {
const target_image_id = _function_argument('target_image_id') || target_image_id
const source_image_id = _function_argument('source_image_id') || source_image_id
const split = native(
"imageprocessing",
"find",
target_image_id + "," + source_image_id
).split(",")
const result = {
found_subimage_x: split[0],
found_subimage_y: split[1],
threshold: split[2],
}
_function_return(result)
return result
}
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
function BAS_image_fill(
image_id,
x,
y,
width,
height,
red,
green,
blue,
alpha
) {
const image_id = _function_argument('image_id') || image_id
const x = _function_argument('x') || x
const y = _function_argument('y') || y
const width = _function_argument('width') || width
const height = _function_argument('height') || height
const red = _function_argument('red') || red
const green = _function_argument('green') || green
const blue = _function_argument('blue') || blue
const alpha = _function_argument('alpha') || alpha
x = x || 0
y = y || 0
width = width || 100
height = height || 100
red = red || 255
green = green || 255
blue = blue || 255
alpha = alpha || 255
native(
"imageprocessing",
"fill",
image_id +
"," +
x +
"," +
y +
"," +
width +
"," +
height +
"," +
red +
"," +
green +
"," +
blue +
"," +
alpha
)
}
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
function BAS_image_sub(image_id, x, y, width, height) {
const image_id = _function_argument('image_id') || image_id
const x = _function_argument('x') || x
const y = _function_argument('y') || y
const width = _function_argument('width') || width
const height = _function_argument('height') || height
x = x || 0
y = y || 0
width = width || 800
height = height || 800
const result = native(
"imageprocessing",
"sub",
image_id + "," + x + "," + y + "," + width + "," + height
)
return result
}
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
function BAS_image_text(image_id, text, params) {
const image_id = _function_argument('image_id') || image_id
const text = _function_argument('text') || text
const params = _function_argument('params') || params
const x = params.x || 0
const y = params.y || 0
const width = params.width || 800
const height = params.height || 800
const font = params.font || "Arial"
const fontSize = params.fontSize || 15
const fontRed = params.fontRed || 0
const fontGreen = params.fontGreen || 0
const fontBlue = params.fontBlue || 0
const fontAlpha = params.fontAlpha || 255
const verticalAlign = params.verticalAlign || "top"
const gorizontalAlign = params.gorizontalAlign || "center"
native(
"imageprocessing",
"text",
verticalAlign +
"," +
gorizontalAlign +
"," +
image_id +
"," +
x +
"," +
y +
"," +
width +
"," +
height +
"," +
font +
"," +
fontRed +
"," +
fontGreen +
"," +
fontBlue +
"," +
fontAlpha +
"," +
fontSize +
"," +
text
)
}
