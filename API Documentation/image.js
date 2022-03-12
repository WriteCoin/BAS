/**
 * Начать работу с изображением
 * Загрузить изображение из бинарных данных (формат base64). Получить идентификатор изображения, который поможет работать с изображением.
 * @param {string} data_base64 Данные изображения в формате base64
 * @returns id изображения
 */
function BAS_load_image(data_base64) {
  return native("imageprocessing", "load", data_base64)
}

/**
 * Закончить работу с изображением
 * Закрыть изображение с указанным идентификатором и освободить использованную память.
 * @param {string} image_id Id изображения
 */
function BAS_delete_image(image_id) {
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
  width = width || 800
  height = height || 800
  red = red || 255
  green = green || 255
  blue = blue || 255
  alpha = alpha || 255
  return native(
    "imageprocessing",
    "create",
    width + "," + height + "," + red + "," + green + "," + blue + "," + alpha
  )
}

/**
 * Изменить формат изображения
 * Изменить формат изображения: png, jpeg.
 * @param {string} image_id Id изображения
 * @param {string} format 'png' | 'jpeg'. Формат изображения
 */
function BAS_convert_image(image_id, format) {
  native("imageprocessing", "convert", image_id + "," + format)
}

/**
 * Получить данные изображения
 * Получить данные изображения с заданным идентификатором в формате base64. Действие может быть использовано для сохранения в файл.
 * @param {string} image_id Id изображения
 * @returns Данные изображения
 */
function BAS_get_image_data(image_id) {
  return native("imageprocessing", "getdata", image_id)
}

/**
 * Получить цвет пикселя
 * Получить цвет пикселя по его координатам на изображении.
 * @param {string} image_id Id изображения
 * @param {number} x X
 * @param {number} y Y
 * @returns Object {
 *  R: Цвет красный
 *  G: Цвет зеленый
 *  B: Цвет синий
 *  A: Цвет прозрачный
 * }
 */
function BAS_image_get_pixel(image_id, x, y) {
  const split = native(
    "imageprocessing",
    "getpixel",
    image_id + "," + x + "," + y
  ).split(",")
  return {
    R: parseInt(split[0]),
    G: parseInt(split[1]),
    B: parseInt(split[2]),
    A: parseInt(split[3]),
  }
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
 *  width: number - Ширина
 *  height: number - Высота
 * }
 */
function BAS_image_get_size(image_id) {
  const split = native("imageprocessing", "getsize", image_id).split(",")
  return {
    width: parseInt(split[0]),
    height: parseInt(split[1]),
  }
}

/**
 * Изменить размер.
 * Изменить ширину и высоту изображения.
 * @param {string} image_id Id изображения
 * @param {number} width Ширина
 * @param {number} height Высота
 */
function BAS_image_resize(image_id, width, height) {
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
 *  found_subimage_x: number - Найденная координата x в целевом изображении
 * found_subimage_y: number - Найденная координата y в целевом изображении
 * threshold: number - Насколько хорошо подходит изображение. 100 - точно подходит, 0 - не подходит совсем.
 * }
 */
function BAS_image_find(target_image_id, source_image_id) {
  const split = native(
    "imageprocessing",
    "find",
    target_image_id + "," + source_image_id
  ).split(",")
  return {
    found_subimage_x: split[0],
    found_subimage_y: split[1],
    threshold: split[2],
  }
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
  x = x || 0
  y = y || 0
  width = width || 800
  height = height || 800
  return native(
    "imageprocessing",
    "sub",
    image_id + "," + x + "," + y + "," + width + "," + height
  )
}

/**
 * Добавить текст
 * Добавить текст в изображение используя заданные параметры.
 * @param {string} image_id Id изображения
 * @param {string} text Текст
 * @param {Object} params {
 *  x: number - X
 *  y: number - Y
 *  width: number - Ширина
 *  height: number - Высота
 *  font: string - Семейство шрифтов
 *  fontRed: number - Цвет шрифта красный. От 0 до 255
 *  fontGreen: number - Цвет шрифта зеленый. От 0 до 255
 *  fontBlue: number - Цвет шрифта синий. От 0 до 255
 *  fontAlpha: number - Цвет шрифта прозрачный. От 0 до 255
 *  verticalAlign: 'top' | 'bottom' | 'center' - Вертикальное выравнивание
 *  gorizontalAlign: 'left' | 'right' | 'center' - Горизонтальное выравнивание
 * }
 */
function BAS_image_text(image_id, text, params) {
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
