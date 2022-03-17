/**
 * Двигать Мышь И Кликнуть На Элемент (BAS-функция)
 * Ссылка на вики: https://wiki.bablosoft.com/doku.php?id=ru:how_to_click_on_buttons_and_links
 * Навести курсор и кликнуть на данный элемент.
 * Конечные координаты всегда случайны, но расположены близко к центру.
 * Отключение эмуляции мыши превратит это действие в выполнение javascript функции click на элементе.
 * Если элемент не виден, страница будет прокручена так, чтобы он стал видимым.
 * Траектория перемещения мыши всегда случайна и напоминает выполненную человеком, вы можете изменить параметры перемещения кнопкой настройки, расположенной рядом с "Отмена".
 * Если вы нажмете на какой-либо элемент, который вызывает загрузку страницы, выберите "ждать полной загрузки страницы". Использование этой опции заставит браузер ждать загрузки страницы после клика.
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * 
 * @param {string} selector Селектор элемента https://wiki.bablosoft.com/doku.php?id=ru:how_to_search_for_element
 * @param {Object} settings =>
 *  @param {boolean} disableMouseEmulation = false Отключить эмуляцию мыши.
 *  @param {boolean} isCtrlClick = false Зажать клавишу ctrl. Открыть ссылку в новой вкладке.
 *  @param {string} typeClick = '<MOUSELEFT>' '<MOUSELEFT>' | '<MOUSERIGHT>' | '<MOUSEDOUBLE>' Тип клика
 *  @param {Object} mouse =>
 *    @param {number} speed = 100 Скорость
      Скорость движения мыши как число с плавающей запятой, если вы меняете этот параметр, не забудьте изменить притяжение и отклонение пропорционально.
      @param {number} gravity = 6 Притяжение
      Значение плавающей запятой, которое устанавливает силу притяжения курсора к линии между начальной и конечной точками. Если вы установите слишком большое значение, курсор будет перемещаться по прямой, если слишком маленькое, курсор будет перемещаться хаотично на экране.
      @param {number} deviation = 2.5 Отклонение
      Значение плавающей точки, которое устанавливает силу отклонения курсора от линии между начальной и конечной точками. Это можно представить как ветер, который отклоняет курсор от этой линии.
    @param {boolean} noWait = false Не ждать появления элемента
    @param {boolean} stopThread = true Остановить поток, если элемент не найден.
    @param {boolean} wait_full_load = false Ждать полной загрузки страницы после этого действия
    @param {number} timeout Максимальное время выполнения задания (мс)
 *  
 */
function BAS_mouse_move_and_click_element() {
  const args = _arguments()
  const selector = args.selector || ""
  const disableMouseEmulation = args.disableMouseEmulation || false
  const isCtrlClick = args.isCtrlClick || false
  const typeClick = args.typeClick || '<MOUSELEFT>'
  const mouseSettings = args.mouse
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true

  const mouseSettingsObj = mouseSettings ? {
    speed: mouseSettings.speed || 100,
    gravity: mouseSettings.gravity || 6,
    deviation: mouseSettings.deviation || 2.5
  } : {}

  const wait_full_load = args.wait_full_load || false
  const timeout = args.timeout

  _SELECTOR = selector
  if (noWait)
    waiter_timeout_next(1000)
  if (!stopThread)
    waiter_nofail_next()
  wait_element_visible(_SELECTOR)!
  if (disableMouseEmulation) {
    get_element_selector(_SELECTOR, false).script("self.click()")!
  } else {
    _call(_random_point, {})!
    _if(_result().length > 0, function(){
    move( mouseSettingsObj )!
    if !(!noWait && stopThread) 
      get_element_selector(_SELECTOR, false).nowait().clarify(X,Y)!
    else
      get_element_selector(_SELECTOR, false).clarify(X,Y)!
    _call(_clarify, mouseSettingsObj )!
    if (typeClick === '<MOUSELEFT>' && !isCtrlClick)
      mouse(X,Y)!
    else {
      const typeStr = (isCtrlClick ? '<CONTROL>' : '') + ((isCtrlClick && typeClick === '<MOUSEDOUBLE>') ? '<CONTROL><MOUSELEFT>' : typeClick)
      _type(typeStr, 100)!
    }
  })!
  }
  if (wait_full_load) {
    if (timeout) waiter_timeout_next(timeout)
    wait_async_load()!
  }
}

/**
 * Кликнуть На Элемент (BAS-функция)
 * Ссылка на вики: https://wiki.bablosoft.com/doku.php?id=ru:how_to_click_on_buttons_and_links
 * Кликнуть на заданный элемент.
 * Конечные координаты всегда случайны, но расположены близко к центру.
 * Отключение эмуляции мыши превратит это действие в выполнение javascript функции click на элементе.
 * Если элемент не виден, страница будет прокручена так, чтобы он стал видимым.
 * Если вы нажмете на какой-либо элемент, который вызывает загрузку страницы, выберите "ждать полной загрузки страницы". Использование этой опции заставит браузер ждать загрузки страницы после клика.
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * @param {string} selector Селектор элемента https://wiki.bablosoft.com/doku.php?id=ru:how_to_search_for_element
 * @param {boolean} disableMouseEmulation = false Отключить эмуляцию мыши.
 * @param {boolean} noWait = false Не ждать появления элемента.
 * @param {boolean} stopThread = true Остановить поток, если элемент не найден.
 * @param {boolean} wait_full_load = false Ждать полной загрузки страницы после этого действия
 * @param {number} timeout Максимальное время выполнения задания (мс)
 */
function BAS_click_element() {
  const args = _arguments()
  const selector = args.selector || ''
  const disableMouseEmulation = args.disableMouseEmulation || false
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  const wait_full_load = args.wait_full_load || false
  const timeout = args.timeout

  _SELECTOR = selector
  if (noWait) {
    waiter_timeout_next(1000)
  }
  if (!stopThread) {
    waiter_nofail_next()
  }
  wait_element_visible(_SELECTOR)!

  if (disableMouseEmulation) {
    get_element_selector(_SELECTOR, false).script("self.click()")!
  } else {
    _call(_random_point, {})!
    _if(_result().length > 0, function(){
    X = parseInt(_result().split(",")[0])
    Y = parseInt(_result().split(",")[1])
    mouse(X,Y)!
    })!
  } 
  if (wait_full_load) {
    if (timeout) {
      waiter_timeout_next(timeout)
    }
    wait_async_load()!
  }
}

/**
 * Двигать Мышь Над Элементом (BAS-функция)
 * Ссылка на вики: https://wiki.bablosoft.com/doku.php?id=ru:how_to_click_on_buttons_and_links
 * Навести курсор на элемент.
 * Конечные координаты всегда случайны, но расположены близко к центру.
 * Если элемент не виден, страница будет прокручена так, чтобы он стал видимым.
 * Траектория перемещения мыши всегда случайна и напоминает выполненную человеком, вы можете изменить параметры перемещения кнопкой настройки, расположенной рядом с "Отмена".
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * @param {string} selector Селектор элемента https://wiki.bablosoft.com/doku.php?id=ru:how_to_search_for_element
 * @param {boolean} noWait Не ждать появления элемента
 * @param {boolean} stopThread Остановить поток, если элемент не найден.
 * @param {Object} mouse =>
 *  @param {number} speed Скорость
    Скорость движения мыши как число с плавающей запятой, если вы меняете этот параметр, не забудьте изменить притяжение и отклонение пропорционально.
    @param {number} gravity Притяжение
    Значение плавающей запятой, которое устанавливает силу притяжения курсора к линии между начальной и конечной точками. Если вы установите слишком большое значение, курсор будет перемещаться по прямой, если слишком маленькое, курсор будет перемещаться хаотично на экране.
    @param {number} deviation Отклонение
    Значение плавающей точки, которое устанавливает силу отклонения курсора от линии между начальной и конечной точками. Это можно представить как ветер, который отклоняет курсор от этой линии.
  @param {number} timeout Максимальное время выполнения задания (мс)
 */
function BAS_mouse_move_over_element() {
  const args = _arguments()
  const selector = args.selector || ""
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  const mouseSettings = args.mouse
  const mouseSettingsObj = mouseSettings ? {
    speed: mouseSettings.speed || 100,
    gravity: mouseSettings.gravity || 6,
    deviation: mouseSettings.deviation || 2.5
  } : {}
  const timeout = args.timeout

  _SELECTOR = selector
  if (noWait || timeout) {
    waiter_timeout_next(noWait ? 1000 : timeout)
  }
  if (!stopThread) {
    waiter_nofail_next()
  }
  wait_element_visible(_SELECTOR)!
  _call(_random_point, {})!
  _if(_result().length > 0, function(){
    move( mouseSettingsObj )!
    if !(!noWait && stopThread) {
      get_element_selector(_SELECTOR, false).nowait().clarify(X,Y)!
    } else {
      get_element_selector(_SELECTOR, false).clarify(X,Y)!
    }  
    _call(_clarify, mouseSettingsObj )!
  })!
}

/**
 * Двигать Мышь И Кликнуть (BAS-функция)
 * Ссылка на вики: https://wiki.bablosoft.com/doku.php?id=ru:how_to_click_on_x_y_coordinates
 * Переместить мышь и кликнуть по заданным координатам.
 * Если вы хотите кликнуть по элементу, выберите его в браузере и нажмите на "Двигать Мышь И Кликнуть На Элемент".
 * Это действие работает с абсолютными координатами.
 * Если координаты не видны, страница будет прокручена так, чтобы они стали видимы.
 * Траектория перемещения мыши всегда случайна и напоминает выполненную человеком, вы можете изменить параметры перемещения кнопкой настройки, расположенной рядом с "Отмена".
 * Если вы нажмете на какой-либо элемент, который вызывает загрузку страницы, выберите "ждать полной загрузки страницы". Использование этой опции заставит браузер ждать загрузки страницы после клика.
 * 
 * @param {number} x Х координата
  Целое число, смещение от левого края страницы

  @param {number} y Y координата
  Целое число, смещение от верхнего края страницы

  @param {boolean} isCtrlClick = false Зажать клавишу ctrl. Открыть ссылку в новой вкладке.

  @param {'<MOUSELEFT>' | '<MOUSERIGHT>' | '<MOUSEDOUBLE>'} Тип клика

  @param {Object} mouse =>
    @param {number} speed = 100 Скорость
    Скорость движения мыши как число с плавающей запятой, если вы меняете этот параметр, не забудьте изменить притяжение и отклонение пропорционально.
    @param {number} gravity = 6 Притяжение
    Значение плавающей запятой, которое устанавливает силу притяжения курсора к линии между начальной и конечной точками. Если вы установите слишком большое значение, курсор будет перемещаться по прямой, если слишком маленькое, курсор будет перемещаться хаотично на экране.
    @param {number} deviation = 2.5 Отклонение
    Значение плавающей точки, которое устанавливает силу отклонения курсора от линии между начальной и конечной точками. Это можно представить как ветер, который отклоняет курсор от этой линии.
  @param {boolean} wait_full_load Ждать полной загрузки страницы после этого действия
  @param {number} timeout Максимальное время выполнения задания (мс)
 */
function BAS_mouse_move_and_click() {
  const args = _arguments()
  const x = args.x
  const y = args.y
  const isCtrlClick = args.isCtrlClick || false
  const typeClick = args.typeClick || '<MOUSELEFT>'
  const mouseSettings = args.mouse
  const wait_full_load = args.wait_full_load || false
  const timeout = args.timeout 

  if (mouseSettings) {
    move(x, y, {
      speed: mouseSettings.speed || 100,
      gravity: mouseSettings.gravity || 6,
      deviation: mouseSettings.deviation || 2.5
    })!
  } else {
    move(x, y)!
  }
  if (!isCtrlClick && typeClick === '<MOUSELEFT>') {
    mouse(x, y)!
  } else {
    const key = isCtrlClick ? '<CONTROL><MOUSELEFT>' : typeClick
    _type(key, 100)!
  }
  if (wait_full_load) {
    if (timeout) {
      waiter_timeout_next(timeout)
    }
    wait_async_load()!
  }
}

/**
 * Кликнуть (BAS-функция)
 * Ссылка на вики: https://wiki.bablosoft.com/doku.php?id=ru:how_to_click_on_x_y_coordinates
 * Кликнуть по заданным координатам.
 * Если вы хотите кликнуть по элементу, выберите его в браузере и нажмите на "Кликнуть На Элемент".
 * Это действие работает с абсолютными координатами.
 * Если координаты не видны, страница будет прокручена так, чтобы они стали видимы.
 * Если вы нажмете на какой-либо элемент, который вызывает загрузку страницы, выберите "ждать полной загрузки страницы". Использование этой опции заставит браузер ждать загрузки страницы после клика.
 * @param {number} x Х координата
  Целое число, смещение от левого края страницы
  @param {number} y У координата
  Целое число, смещение от верхнего края страницы
  @param {boolean} wait_full_load = false Ждать полной загрузки страницы после этого действия
  @param {number} timeout Максимальное время выполнения задания (мс)
 */
function BAS_click() {
  const args = _arguments()
  const x = args.x
  const y = args.y
  const wait_full_load = args.wait_full_load || false
  const timeout = args.timeout
  
  mouse(x, y)!
  if (wait_full_load) {
    if (timeout) {
      waiter_timeout_next(timeout)
    }
    wait_async_load()!
  }
}

/**
 * Двигать Мышь (BAS-функция)
 * Ссылка на вики: https://wiki.bablosoft.com/doku.php?id=ru:how_to_move_mouse
 * Двигать курсор к заданным координатам.
 * Если вы хотите двигать мышь к элементу, выберите его в браузере и нажмите на "Двигать Мышь Над Элементом".
 * Это действие работает с абсолютными координатами.
 * Если координаты не видны, страница будет прокручена так, чтобы они стали видимы.
 * Траектория перемещения мыши всегда случайна и напоминает выполненную человеком, вы можете изменить параметры перемещения кнопкой настройки, расположенной рядом с "Отмена".
 * @param {number} x Х координата
  Целое число, смещение от левого края страницы
  @param {number} y У координата
  Целое число, смещение от верхнего края страницы
  @param {Object} mouse =>
    @param {number} speed = 100 Скорость
    Скорость движения мыши как число с плавающей запятой, если вы меняете этот параметр, не забудьте изменить притяжение и отклонение пропорционально.
    @param {number} gravity = 6 Притяжение
    Значение плавающей запятой, которое устанавливает силу притяжения курсора к линии между начальной и конечной точками. Если вы установите слишком большое значение, курсор будет перемещаться по прямой, если слишком маленькое, курсор будет перемещаться хаотично на экране.
    @param {number} deviation = 2.5 Отклонение
    Значение плавающей точки, которое устанавливает силу отклонения курсора от линии между начальной и конечной точками. Это можно представить как ветер, который отклоняет курсор от этой линии.
 */
function BAS_mouse_move() {
  const args = _arguments()
  const x = args.x
  const y = args.y
  const mouseSettings = args.mouse
  const mouseSettingsObj = mouseSettings ? {
    speed: mouseSettings.speed || 100,
    gravity: mouseSettings.gravity || 6,
    deviation: mouseSettings.deviation || 2.5
  } : {}
  move(x, y, mouseSettingsObj)!
}

/**
 * Ввод текста (BAS-функция)
 * Ссылка на вики: https://wiki.bablosoft.com/doku.php?id=ru:how_to_type_text
 * Ввод текста в заданный элемент.
 * Это действие может вводить любые символы включая специальные клавиши, такие как enter, backspace, insert, delete и т. д.
 * Если вы хотите ввести большой текст, используйте 0 интервал или действие "Запись В Буфер Обмена" и ввод <CONTROL>V
 * Отключение эмуляции мыши и клавиатуры превратит это действие в выполнение javascript кода self.value = "value" на элементе.
 * Если элемент не виден, страница будет прокручена так, чтобы он стал видимым.
 * Перед вводом текста будет передвинут курсор мыши в место близкое к центру элемента.
 * Траектория перемещения мыши всегда случайна и напоминает выполненную человеком, вы можете изменить параметры перемещения кнопкой настройки, расположенной рядом с "Отмена".
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * @param {string} selector = '' Селектор элемента https://wiki.bablosoft.com/doku.php?id=ru:how_to_search_for_element
 * @param {string} text Текст для ввода
  Это может быть любая последовательность символов.
  Примеры :
  hello world! - Ввести hello world!
  <CONTROL>V - Вставить значение из буфера обмена
  <CONTROL>A<DELETE> - Очистить поле
  <ESCAPE> - Нажать escape

  @param {number} interval = 100 Интервал в миллисекундах
  Интервал между каждым нажатием в миллисекундах. BAS использует разные интервалы для каждой кнопки, близкие к этому параметру. Например, если вы установите интервал в 100, это может дать такую последовательность: кнопка №1, ждать 91 миллисекунду, кнопка №2, ждать 117 миллисекунд, кнопка №3 и т. д.
  Примеры :
  100 - Стандартное значение. Похоже на ввод реальным человеком.
  0 - Текст вводится мгновенно.
 
  @param {boolean} disableEmulation = false Отключить эмуляцию мыши и клавиатуры.

  @param {Object} mouse =>
    @param {number} speed = 100 Скорость
    Скорость движения мыши как число с плавающей запятой, если вы меняете этот параметр, не забудьте изменить притяжение и отклонение пропорционально.
    @param {number} gravity = 6 Притяжение
    Значение плавающей запятой, которое устанавливает силу притяжения курсора к линии между начальной и конечной точками. Если вы установите слишком большое значение, курсор будет перемещаться по прямой, если слишком маленькое, курсор будет перемещаться хаотично на экране.
    @param {number} deviation = 2.5 Отклонение
    Значение плавающей точки, которое устанавливает силу отклонения курсора от линии между начальной и конечной точками. Это можно представить как ветер, который отклоняет курсор от этой линии.
  @param {boolean} noWait = false Не ждать появления элемента.
  @param {boolean} stopThread = true Остановить поток, если элемент не найден.
  @param {boolean} wait_full_load = false Ждать полной загрузки страницы после этого действия
  @param {number} timeout Максимальное время выполнения задания (мс).
 */
function BAS_input_text() {
  const args = _arguments()
  const selector = args.selector || ''
  const text = args.text
  const interval = args.interval || 100
  const disableEmulation = args.disableEmulation || false
  const mouseSettings = args.mouse
  const mouseSettingsObj = mouseSettings ? {
    speed: mouseSettings.speed || 100,
    gravity: mouseSettings.gravity || 6,
    deviation: mouseSettings.deviation || 2.5
  } : {}
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  const wait_full_load = args.wait_full_load || false
  const timeout = args.timeout

  _SELECTOR = selector
  if (noWait)
    waiter_timeout_next(1000)
  if (!stopThread)
    waiter_nofail_next()
  wait_element_visible(_SELECTOR)!
  if (disableEmulation) {
    get_element_selector(_SELECTOR, false).script("self.click()")!
  } else {
    _call(_random_point, {})!
    _if(_result().length > 0, function(){
    move( mouseSettingsObj )!
    if !(!noWait && stopThread) {
      get_element_selector(_SELECTOR, false).nowait().clarify(X,Y)!
    } else {
      get_element_selector(_SELECTOR, false).clarify(X,Y)!
    }
    _call(_clarify, mouseSettingsObj )!
    mouse(X, Y)!
    if (timeout) {
      general_timeout_next(timeout)
    }
    _type(text, interval)!
  })!
  }
  if (wait_full_load) {
    if (timeout) waiter_timeout_next(timeout)
    wait_async_load()!
  }
}

/**
 * Очистить Поле (BAS-функция)
 * Ссылка на вики: https://wiki.bablosoft.com/doku.php?id=ru:how_to_click_on_buttons_and_links
 * Очистить поле. Работает только на текстовых полях.
 * Это действие эквивалентно вводу <CONTROL>A<BACK>.
 * Если элемент не виден, страница будет прокручена так, чтобы он стал видимым.
 * Траектория перемещения мыши всегда случайна и напоминает выполненную человеком, вы можете изменить параметры перемещения кнопкой настройки, расположенной рядом с "Отмена".
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * @param {string} selector = '' Селектор элемента.
 * @param {Object} mouse =>
 *  @param {number} speed = 100 Скорость
    Скорость движения мыши как число с плавающей запятой, если вы меняете этот параметр, не забудьте изменить притяжение и отклонение пропорционально.
    @param {number} gravity = 6 Притяжение
    Значение плавающей запятой, которое устанавливает силу притяжения курсора к линии между начальной и конечной точками. Если вы установите слишком большое значение, курсор будет перемещаться по прямой, если слишком маленькое, курсор будет перемещаться хаотично на экране.
    @param {number} deviation = 2.5 Отклонение
    Значение плавающей точки, которое устанавливает силу отклонения курсора от линии между начальной и конечной точками. Это можно представить как ветер, который отклоняет курсор от этой линии.
  @param {boolean} noWait = false Не ждать появления элемента.
  @param {boolean} stopThread = true Остановить поток, если элемент не найден.
  @param {boolean} wait_full_load = false Ждать полной загрузки страницы после этого действия
  @param {number} timeout Максимальное время выполнения задания (мс).
 */
function BAS_clear_field() {
  const args = _arguments()
  _call_function(BAS_input_text, {
    selector: args.selector,
    text: '<CONTROL>a<BACK>',
    interval: 30,
    mouse: args.mouse,
    noWait: args.noWait,
    stopThread: args.stopThread,
    wait_full_load: args.wait_full_load,
    timeout: args.timeout
  })!
}

/**
 * Получить Код Элемента (BAS-функция)
 * Получить html код элемента и сохранить его в перменную.
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * @param {string} selector Селектор элемента
 * @param {boolean} noWait = false Не ждать появления элемента
 * @param {boolean} stopThread Остановить поток, если элемент не найден
 * @param {number} timeout Максимальное время выполнения задания (мс)
 * @return string
  html код выбранного элемента в виде строки
 */
function BAS_get_xml() {
  const args = _arguments()
  const selector = args.selector || ''
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  const timeout = args.timeout

  _SELECTOR = selector
  if (timeout) {
    waiter_timeout_next(timeout)
  }
  wait_element(_SELECTOR)!
  if !(!noWait && stopThread) {
    get_element_selector(_SELECTOR, false).xml()!
  } else {
    get_element_selector(_SELECTOR, false).nowait().xml()!
  }
  _function_return(_result())
}

/**
 * Добавить вкладку (BAS-функция)
 * Добавить новую вкладку с указанным Url.
 * @param {string} url Url
  Url для загрузки. Протокол может быть опущен.
  Примеры :
  google.com - Загрузить google.com
  instagram.com - Загрузить instagram.com
  @param {boolean} is_silent Отложенная загрузка
  В режиме отложенной загрузки вкладка будет добавлена сразу же, а заданный url загружен только после первого переключения на эту вкладку.
  Примеры :
  true - Создать новую вкладку, загрузить указанный url только после того, как она станет активной.
  false - Создать новую вкладку, переключиться на нее и сразу же загрузить указанный url.
  @param {string} referrer = "" Referrer. Может быть пустым.
  Referrer, используемый для загрузки данной страницы.
  Примеры :
  https://google.com - Страница загружается при нажатии на результат поиска Google.
  Пустая строка - Страница загружается путем ввода url в адресной строке.
  @param {boolean} is_instant false Не ждать полной загрузки страницы после этого действия
  @param {nubmer} timeout Максимальное время выполнения задания (мс)
 */
function BAS_add_tab() {
  const args = _arguments()
  const referrer = args.referrer || ''

  if (args.timeout) {
    general_timeout_next(args.timeout)
  }
  _popupcreate2(args.is_silent, args.url, referrer, args.is_instant, args.callback)!
}

/**
 * Получить информацию о вкладках (BAS-функция)
 * Получить список вкладок и индекс текущей вкладки, сохранить информацию в переменных.
 * Переменная [[URL_LIST]] будет содержать список url. Каждый url соответствует одной вкладке. Используйте модуль "Список" для его обработки. Например, с помощью действия "Первый элемент" можно получить url первой вкладки, а с помощью действия "Получить элемент" можно получить url вкладки с заданным индексом.
 * Переменная [[TAB_INDEX]] будет содержать индекс активной вкладки. Индексация начинается с 0, поэтому первая вкладка будет иметь индекс 0, вторая - индекс 1 и т. д.
 * @returns Object => {
 *  @param {Array<string>} url_list Список url
  Список url. Каждый url соответствует одной вкладке.
    @param {number} current_tab_index Индекс текущей вкладки
    Индекс текущей вкладки. Индексация начинается с 0.
    @param {number} total_tabs Количество вкладок
    Общее количество вкладок.
 * }
 */
function BAS_popupinfo() {
  _popupinfo()!
  var json = JSON.parse(_result())
  VAR_TAB_INDEX = json["index"]
  VAR_URL_LIST = json["urls"]
  VAR_TOTAL_TABS = json["urls"].length
  return {
    url_list: VAR_URL_LIST,
    current_tab_index: VAR_TAB_INDEX,
    total_tabs: VAR_TOTAL_TABS
  }
}

/**
 * Проверить Существование (BAS-функция)
 * Ссылка на вики: https://wiki.bablosoft.com/doku.php?id=ru:how_to_check_if_page_element_exists
 * Проверяет существует ли элемент на странице.
 * Это действие завершается мгновенно.
 * Оно записывает результат в переменную, который может быть true или false, используйте if чтобы обработать его.
 * Если галка "Проверять, виден ли элемент на экране" установлена, действие возвращает true только если элемент существует и он видимый.
 * @param {string} selector Селектор элемента
 * @param {boolean} checkVisibility Проверять, виден ли элемент на экране
 * @returns Результат проверки с типом boolean. Может иметь значение true или false. Используйте действие "if" чтобы обработать результат.
  Примеры :
  true - Элемент найден
  false - Элемент не найден
 */
function BAS_element_is_exists() {
  const args = _arguments()
  const selector = args.selector || ''
  const checkVisibility = args.checkVisibility || false

  _SELECTOR = selector
  get_element_selector(_SELECTOR, false).nowait().exist()!
  VAR_IS_EXISTS = _result() == 1
  if (checkVisibility) {
    _if(VAR_IS_EXISTS, function(){
      get_element_selector(_SELECTOR, false).nowait().script("document.readyState!='loading' && Math.round(self.getBoundingClientRect().height) > 0 && Math.round(self.getBoundingClientRect().width) > 0&& window.getComputedStyle(self)['display']!='none'&&window.getComputedStyle(self)['visibility'] != 'hidden'")!
      VAR_IS_EXISTS = _result().indexOf("true")>=0
    })!
  }
  _function_return(VAR_IS_EXISTS)
}

/**
 * Получить Текст (BAS-функция)
 * Получить текст элемента видимого на экране.
 * Например, если вы примените это действие ко всей странице, то получите весь видимый на странице текст.
 * Это действие может быть применено к полю для ввода чтобы получить введенное значения.
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * @param {string} selector Селектор элемента
 * @param {boolean} noWait = false Не ждать появления элемента
 * @param {boolean} stopThread Остановить поток, если элемент не найден
 * @param {number} timeout Максимальное время выполнения задания (мс)
 * @return текст выбранного элемента
 */
function BAS_element_get_text() {
  const args = _arguments()
  const selector = args.selector || ''
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  const timeout = args.timeout

  _SELECTOR = selector
  if (timeout) {
    waiter_timeout_next(timeout)
  }
  wait_element(_SELECTOR)!
  if !(!noWait && stopThread) {
    get_element_selector(_SELECTOR, false).text()!
  } else {
    get_element_selector(_SELECTOR, false).nowait().text()!
  }
  _function_return(_result())
}

/**
 * Скриншот (BAS-функция)
 * Это действие делает скриншот выбранного элемента и сохраняет его в изображении в формате png, закодированном как строка base64.
 * Если элемент не виден, страница будет прокручена так, чтобы он стал видимым.
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * @param {string} selector Селектор элемента
 * @param {boolean} noWait = false Не ждать появления элемента
 * @param {boolean} stopThread Остановить поток, если элемент не найден
 * @param {number} timeout Максимальное время выполнения задания (мс)
 * @return данные изображения в кодировке base64, вы можете использовать ее как captcha или сохранить в файл.
 */
function BAS_element_screenshot() {
  const args = _arguments()
  const selector = args.selector || ''
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  const timeout = args.timeout

  _SELECTOR = selector
  if (timeout) {
    waiter_timeout_next(5000)
  }
  wait_element(_SELECTOR)!
  const cond = !(!noWait && stopThread)
  if (cond) {
    get_element_selector(_SELECTOR, false).exist()!
  } else {
    get_element_selector(_SELECTOR, false).nowait().exist()!
  }
  _if(_result() == "1", function(){
    if (cond) {
      get_element_selector(_SELECTOR, false).render_base64()!
    } else {
      get_element_selector(_SELECTOR, false).nowait().render_base64()!
    }
    VAR_SCREENSHOT_BASE64 = _result()
    _function_return(VAR_SCREENSHOT_BASE64)
  })!
}

/**
 * Решить Капчу (BAS-функция)
 * Это действие решает капчу с изображением(а не recaptcha). Изображение капчи получается в результате рендеринга элемента.
 * Текст капчи сохраняется в переменной и может быть использован позже.
 * Если вы хотите взять изображение из кеша, из файла или из любой строки base64, вы должны использовать действие "Решить Капчу" из модуля "Браузер".
 * Если элемент не виден, страница будет прокручена так, чтобы он стал видимым.
 * Если вы хотите решить recaptcha, нажмите на флажок recaptcha внутри браузера и выберите "Решить Recaptcha 2.0".
 После рендеринга изображение может содержать дополнительную границу или немного изменить цвет некоторых пикселей из-за неточностей рендеринга, и, таким образом, этот метод хорош только в том случае, если капча будет решаться человеком. В случае автоматического машинного решения важно, чтобы изображение было точно таким же, как и сгенерированное на сервере, поэтому, если вы используете capmonster, captchasniper или xevil, это действие будет искать изображение в кеше. Взятие данных из кеша не производится автоматическим при первом запуске вы получите ошибку, которая дает url капчи и имя действия, которое вам нужно использовать - "Разрешить кэш". Важно разделять постоянную часть и переменную часть url. Вы должны заменить меняющуюся часть на *, а постоянную часть оставить как есть. Например, если url капчи /image?id=1234, то маска может быть /image?id=*. Разумеется, вы можете добавить абсолютно все данне в кеш с помощью маски *, но это увеличит потребление памяти и может вызвать другие ошибки. Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * @param {string} selector = '' Селектор элемента
 * @param {string} method Метод решения. Метод решения - это строка, вы можете установить значение напрямую или использовать переменную или ресурс. Примеры: 
 * manual - Капча решается вручную человеком, который использует БАС.
 * antigate - Решить с помощью сервиса http://anti-captcha.com/
 * rucaptcha - Решить с помощью сервиса http://rucaptcha.com/
 * 2captcha - Решить с помощью сервиса http://2captcha.com/
 * capmonster - Решить с помощью capmonster
 * dbc - Решить с помощью сервиса http://deathbycaptcha.com/ 
 * @param {string} key Ключ Антигейт/Рукапча/2капча/dbc. Может быть пустым. Этот ключ необходим только в том случае, если вы спользуете сервисы для решения капчи. Он не нужен в режимах manual, capmonster и captchasniper. В случае deathbycaptcha это поле должно содержать dbc_login:dbc_password.
 * @param {string} serverUrl Url сервера. Может быть пустым. Примеры:
 * http://127.0.0.3:8083/
 * Пустая строка - Использовать url по умолчанию, например, http://rucaptcha.com для rucaptcha.
 * @param {boolean} noWait = false Не ждать появления элемента
 * @param {boolean} stopThread Остановить поток, если элемент не найден
 * @param {number} timeout Максимальное время выполнения задания (мс)
 * @return Строка с результатом решения капчи
 */
function BAS_element_solve_captcha() {
  const args = _arguments()
  const selector = args.selector || ''
  const method = args.method || 'manual'
  const key = args.key
  const serverUrl = args.serverUrl
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  const timeout = args.timeout
  solver_properties_clear(method)
  BAS_SolveRecaptcha_Serverurl = serverUrl
  if(BAS_SolveRecaptcha_Serverurl.length > 0 && BAS_SolveRecaptcha_Serverurl.substr(BAS_SolveRecaptcha_Serverurl.length - 1) != "/")
  BAS_SolveRecaptcha_Serverurl += "/"
  if(method === "rucaptcha")
  {
    if(BAS_SolveRecaptcha_Serverurl)
    solver_property("rucaptcha","serverurl",BAS_SolveRecaptcha_Serverurl)
    rucaptcha(key)
  }
  if(method === "antigate")
  {
    if(BAS_SolveRecaptcha_Serverurl)
    solver_property("antigate","serverurl",BAS_SolveRecaptcha_Serverurl)
    antigate(key)
  }
  if(method == "dbc")
  {
    if(BAS_SolveRecaptcha_Serverurl)
    solver_property("dbc","serverurl",BAS_SolveRecaptcha_Serverurl)
    dbc(key)
  }
  if(method == "2captcha")
  {
    if(BAS_SolveRecaptcha_Serverurl)
    solver_property("2captcha","serverurl",BAS_SolveRecaptcha_Serverurl)
    twocaptcha(key)
  }
  if(method == "capmonster" || method == "capmonsterimage" || method == "capmonsteraudio")
  {
    solver_property("capmonster","serverurl",BAS_SolveRecaptcha_Serverurl)
    capmonster(key)
  }
  if(method == "xevil")
  {
    solver_property("xevil","serverurl",((BAS_SolveRecaptcha_Serverurl).length == 0) ? "http://rucaptcha.com/" : (BAS_SolveRecaptcha_Serverurl))
    xevil(key)
  }

  _SELECTOR = selector
  if (timeout) {
    waiter_timeout_next(timeout)
  }
  wait_element(_SELECTOR)!
  get_element_selector(_SELECTOR, false).nowait().exist()!
  _if(_result() == "1", function(){
    const cond = !(!noWait && stopThread)
    _if_else("antigate" == "xevil" || "antigate" == "capmonster" || "antigate" == "capmonsterimage" || "antigate" == "capmonsteraudio" || "antigate" == "captchasniper", function(){
      get_element_selector(_SELECTOR, false).nowait().attr("src")!
      VAR_CAPTCHA_RESULT = _result()
      _if(VAR_CAPTCHA_RESULT.length == 0, function(){
        if (cond) {
          get_element_selector(_SELECTOR, false).css("img").attr("src")!
        } else {
          get_element_selector(_SELECTOR, false).nowait().css("img").attr("src")!
        }
        VAR_CAPTCHA_RESULT = _result()
      })!
      if(VAR_CAPTCHA_RESULT.length == 0) {
        fail(tr("Image tag not found. Is this element captcha?"))
      }
      wait_load(VAR_CAPTCHA_RESULT)!
      cache_get_base64(VAR_CAPTCHA_RESULT)!
      if(_result().length == 0) {
        fail(tr("Url ") + VAR_CAPTCHA_RESULT + tr(" is not present in cache. Please enable cache before page load with Cache Mask Allow action"))
      }
      _if_else("antigate" == "captchasniper", function(){
        _switch_http_client_internal()
        http_client_post(BAS_SolveRecaptcha_Serverurl, ["file","base64://" + _result()], {"content-type":("multipart"), "encoding":("UTF-8"), "method":("POST")})!
        {var split = http_client_content().split("|");VAR_CAPTCHA_RESULT = split[split.length-1]}
        _switch_http_client_main()
      }, function(){
        if (timeout) {
          solver_timeout_next(timeout)
        }
        solve_base64(("antigate" == "xevil") ? "xevil" : "capmonster", _result())!
        VAR_CAPTCHA_RESULT = _result()
        _function_return(VAR_CAPTCHA_RESULT)
      })!
    },function(){
      if (cond) {
        get_element_selector(_SELECTOR, false).render_base64()!
      } else {
        get_element_selector(_SELECTOR, false).nowait().render_base64()!
      }
      if (timeout) {
        solver_timeout_next(timeout)
      }
      solve_base64("antigate", _result())!
      VAR_CAPTCHA_RESULT = _result()
      _function_return(VAR_CAPTCHA_RESULT)
    })!
  })!
}

/**
 * Решить капчу кликами (BAS-функция)
 * Решить любой тип капчи, который требует кликать по изображениям.
 * Для решения ReCaptcha и HCaptcha рекомендуется использовать действия Решить Recaptcha 2.0 и Решить HCaptcha из контекстного меню браузера, если это возможно. С ними проще работать, и капча может решиться быстрее. Также эти действия позволяют выполнять автоматическую валидацию решения. Используйте это действие, если другие варианты не подходят вам по каким-либо причинам.
 * Это действие позволяет вам решить любую капчу, которая требует, чтобы вы нажимали на изображения в соответствии с определенными инструкциями. Это может быть ReCaptcha, HCaptcha и другие типы. Для решения таких капч необходимо отправить на сервис изображение, содержащее элементы, по которым нужно выполнить клики. Если на капче или рядом с ней присутствует описание, рекомендуется отправлять его вместе с изображением, чтобы избежать неверных решений.
 * Для всех сервисов требуется сервисный ключ, который должен быть получен на сайте сервиса и введён в поле Ключ сервиса.
 * Данное действие, в отличие от действия Решить капчу кликами из модуля Браузер, выполняет клики автоматически, и вам не нужно вручную расчитывать координаты для кликов относительно положения элемента на странице. Рекомендуется использовать именно это действие.
 * Важный момент - данное действие не выполняет автоматического подтверждения решения капчи. Вы должны сделать это сами. Например, если вы решаете ReCaptcha2 используя данный метод, то вам нужно самостоятельно выполнить клик по чекбоксу, а после выполнения кликов по координатам - нажать на кнопку Далее или Готово.
 * Параметр Интервал проверки решения задачи отвечает за частоту отправки запросов на сервис для проверки решения капчи. Чем больше вы выставите значение, тем дольше BAS будет ожидать перед тем, как отправить очередной запрос. Рекомендуется использовать задержку не менее 5 секунд.
 * Параметр Задержка проверки решения задачи отвечает за длительность ожидания перед тем, как BAS начнет проверку капчи. Сначала капча отправляется на сервис, после этого BAS будет ожидать указанное время, по прошествии которого начнется непосредственно проверка состояния задачи. Большинство сервисов рекомендуют подождать не менее 5 секунд.
 * Если нужного сервиса нет в списке доступных, но он работает через API аналогичный выбранному сервису, вы можете указать необходимый URL сервера в поле URL сервиса, находящееся в дополнительных настройках.
 * Если вы используете такие программы, как CapMonster, XEvil или аналоги, вы должны заполнить поле URL сервиса в соответствии с документацией к данному ПО.
 * Подробную документацию по решению подобных капч можно посмотреть здесь https://rucaptcha.com/api-rucaptcha#solving_clickcaptcha.
 * @param {string} textInstructions Описание капчи. Может быть пустым.
  Если у captcha есть какое-либо описание, его можно добавить в это поле.
  Примеры :
  Выберите все изображения, на которых есть самолёт
  Выберите все изображения, на которых есть лодка
  @param {number} taskWaitTimeout Интервал проверки решения задачи
  Интервал проверки решения задачи в миллисекундах. С помощью этого параметра вы можете контролировать длительность паузы между каждой новой проверкой решения капчи.
  Примеры :
  600 - Ждать в течение 600 миллисекунд
  10000 - Ждать в течение 10 секунд
  5000 - Ждать в течение 5 секунд
  @param {number} taskWaitDelay Задержка проверки решения задачи
  Задержка проверки решения задачи в миллисекундах. С помощью этого параметра вы можете контролировать длительность паузы между отправкой капчи на сервис и началом ожидания решения. Чаще всего, сервисы решения капчи указывают необходимое время ожидания, в остальных случаях вы можете указать любое удобное для вас значение.
  Примеры :
  600 - Ждать в течение 600 миллисекунд
  10000 - Ждать в течение 10 секунд
  5000 - Ждать в течение 5 секунд
  @param {boolean} emulateMouse Имитировать движения мыши
  @param {string} serviceName Название сервиса
  Название сервиса для решения капчи
  Примеры :
  rucaptcha - Решить капчу используя сервис https://rucaptcha.com/
  2captcha - Решить капчу используя сервис https://2captcha.com/
  @param {string} serviceUrl URL сервиса
  URL сервиса. Может быть пустым. Вы можете использовать этот параметр, если нужного вам сервиса нет в списке доступных. В таком случае укажите название сервиса, который работает по аналогичному API, и используйте нужный вам адрес.
  Примеры :
  Пустая строка - Использовать стандартный URL сервиса, http://rucaptcha.com для RuCaptcha и так далее
  http://127.0.0.1:8083 - Использовать кастомный URL сервиса с портом 8083
  http://127.0.0.3:8080 - Использовать кастомный URL сервиса с портом 8080
  @param {string} serviceKey Ключ сервиса
  Ключ от сервиса решения капчи. Вы можете получить его в личном кабинете выбранного сервиса решения капчи
  @param {string} selector Селектор элемента
  @param {boolean} noWait = false Не ждать появления элемента
  @param {boolean} stopThread Остановить поток, елси элемент не найден
 */
function BAS_element_solve_captcha_clicks() {
  const args = _arguments()
  const textInstructions = args.textInstructions || ''
  const taskWaitTimeout = args.taskWaitTimeout || 5000
  const taskWaitDelay = args.taskWaitDelay || 5000
  const emulateMouse = args.emulateMouse || true
  const serviceName = args.serviceName || 'rucaptcha'
  const serviceUrl = args.serviceUrl
  const serviceKey = args.serviceKey
  const query = args.selector
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  _call_function(BASCaptchaSolver.solveCoordinatesCaptcha, {
    textInstructions: textInstructions,
    taskWaitTimeout: taskWaitTimeout,
    taskWaitDelay: taskWaitDelay,
    emulateMouse: emulateMouse,
    serviceName: serviceName,
    serviceUrl: serviceUrl,
    serviceKey: serviceKey,
    query: query,
    waiter: function() {
      _SELECTOR = query
      if (noWait) {
        waiter_timeout_next(1000)
      }
      if (!stopThread) {
        waiter_nofail_next()
      }
      wait_element(_SELECTOR)!
    },
    path: function() {
      if !(!noWait && stopThread) {
        return get_element_selector(_SELECTOR, false).nowait()
      } else {
        return get_element_selector(_SELECTOR, false)
      }
    }
  })!
}

/**
 * Ждать Появления Элемента (BAS-функция)
 * Ждать, пока соответствующий элемент появится на странице.
 * Если галка "Проверять, виден ли элемент на экране" установлена, действие завершается только если элемент существует и он видимый.
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * @param {string} selector Селектор элемента
 * @param {boolean} checkVisibility Проверять, виден ли элемент на экране
 * @param {number} timeout Максимальное время выполнения задания (мс)
 */
function BAS_wait_element() {
  const args = _arguments()
  const selector = args.selector
  const checkVisibility = args.checkVisibility || false
  const timeout = args.timeout

  _SELECTOR = selector
  if (timeout) {
    waiter_timeout_next(timeout)
  }
  if (checkVisibility) {
    wait_element_visible(_SELECTOR)!
  } else {
    wait_element(_SELECTOR)!
  }
}

/**
 * Прокрутка К Элементу (BAS-функция)
 * Это действие гарантирует, что определенный элемент будет виден на экране.
 * Если элемент уже виден, то это действие ничего не сделает, иначе оно будет прокручивать окно таким образом, чтобы элемент располагался как можно ближе к центру.
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * @param {string} selector Селектор элемента
 * @param {boolean} noWait = false Не ждать появления элемента
 * @param {boolean} stopThread Остановить поток, если элемент не найден
 * @param {number} timeout Максимальное время выполнения задания (мс)
 */
function BAS_element_focus() {
  const args = _arguments()
  const selector = args.selector
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  const timeout = args.timeout

  _SELECTOR = selector
  if (timeout) {
    waiter_timeout_next(timeout)
  }
  wait_element(_SELECTOR)!
  if !(!noWait && stopThread) {
    get_element_selector(_SELECTOR, false).focus()!
  } else {
    get_element_selector(_SELECTOR, false).nowait().focus()!
  }
}

/**
 * Получить координаты (BAS-функция)
 * Получить координаты элемента относительно текущей позиции окна.
 * Например, если координаты элемента 200,200, а положение окна - 50,50, то это действие вернет 150,150. Если позиция окна равна 0,0, то это действие вернет абсолютные координаты элемента.
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * @param {string} selector Селектор элемента
 * @param {boolean} noWait = false Не ждать появления элемента
 * @param {boolean} stopThread Остановить поток, если элемент не найден
 * @param {number} timeout Максимальное время выполнения задания (мс)
 * @returns Object => {
 *  @param {number} x X
    Целое значение, смещение относительно текущей позиции окна.
    @param {number} y Y
    Целое значение, смещение относительно текущей позиции окна.
    @param {number} width Ширина
    Целое значение, ширина элемента.
    @param {number} height Высота
    Целое значение, высота элемента.
 * }
 */
function BAS_element_get_coordinates() {
  const args = _arguments()
  const selector = args.selector
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  const timeout = args.timeout
  
  _SELECTOR = selector
  if (timeout) {
    waiter_timeout_next(timeout)
  }
  wait_element(_SELECTOR)!
  const script = "(function(){var rect = self.getBoundingClientRect();return (rect.left + positionx).toString() + '|' + (rect.top + positiony).toString() + '|' + (rect.right - rect.left).toString() + '|' + (rect.bottom - rect.top).toString()})();"
  if !(!nowait && stopThread) {
    get_element_selector(_SELECTOR, false).script(script)!
  } else {
    get_element_selector(_SELECTOR, false).nowait().script(script)!
  }
  if(_result().length > 0)
  {
    const split = _result().split("|")
    VAR_X = parseInt(split[0])
    VAR_Y = parseInt(split[1])
    VAR_WIDTH = parseInt(split[2])
    VAR_HEIGHT = parseInt(split[3])
    _function_return({
      x: VAR_X,
      y: VAR_Y,
      width: VAR_WIDTH,
      height: VAR_HEIGHT
    })
  }
}

/**
 * Получить Количество Элементов (BAS-функция)
 * Получить количество элементов соответствующее запросу.
 * Чтобы сгенерировать запрос, нажмите на элемент внутри браузера и выберите действие "Получить Количество Элементов". BAS автоматически составит запрос, в который будут включены все элементы похожие на выбранный вами элемент. Этот запрос не всегда будет содержать необходимые элементы, поэтому вы можете настроить его следующим образом. Добавьте элемент, который необходимо включить в запрос, выбрав его и нажав левую кнопку
 * Это задаст зеленый фон для элемента, и он всегда будет включен в выделение. В качестве альтернативы нажмите на элемент, который был включен в выделение (элемент с синим фоном). Это задаст красный фон для элемента, и он всегда будет исключен из выделения. Постоянно уточняя, какие элементы будут в запросе, а какие нет, вы можете постепенно достичь приемлемого результата.
 * Это действие всегда возвращается мгновенно и не ждет, если элемент не существует.
 * В случае отсутствия элемента оно возвращает ноль.
 * Вы можете перебирать все элементы, которые соответствуют определенному селектору, возьмем для примера селектор по классу "c". Для этого вы должны получить количество элементов с помощью этого действия, потом начать цикл for от 0 до количества элементов - 1. И, наконец, получить элемент с помощью селектора >CSS> .c >AT> [[CYCLE_INDEX]] внутри цикла.
 * Режим мультипарсинга включен. Нажмите на элементы внутри браузера, чтобы добавить элементы, которые обязательно должны быть включены или исключены из выделения.
 * Как это работает? https://www.youtube.com/watch?v=PQSQmJRVKvk&feature=youtu.be
 * @param {stirng} selector Селектор элемента
 * @returns количество элементов, соответствующих селектору.
 */
function BAS_elements_count() {
  const args = _arguments()
  const selector = args.selector

  ;_SELECTOR = selector
  get_element_selector(_SELECTOR, true).length()!
  VAR_ELEMENT_LENGTH = _result()
  _function_return(VAR_ELEMENT_LENGTH)
}

/**
 * Получить Стиль Элемента (BAS-функция)
 * Получить css стиль элемента.
 * Используйте "display", чтобы проверить, виден ли элемент, "width" чтобы получить ширину элемента и т. д.
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * @param {string} selector Селектор элемента
 * @param {string} style Стиль
  Css стиль для получения. Это действие вызывает javascript код window.getComputedStyle(self).
  Примеры :
  display - Проверить видимость
  width - Получить ширину
  @param {boolean} noWait = false Не ждать появления элемента
  @param {boolean} stopThread = true Остановить поток, если элемент не найден
  @param {number} timeout Максимальное время выполнения задания (мс)
  @returns Значение стиля в виде строки.
 */
function BAS_get_element_style() {
  const args = _arguments()
  const selector = args.selector
  const style = args.style
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  const timeout = args.timeout

  _SELECTOR = selector
  if (timeout) {
    waiter_timeout_next(timeout)
  }
  wait_element(_SELECTOR)!
  const script = 'window.getComputedStyle(self)[' + JSON.stringify("color") + ']'
  if !(!noWait && stopThread) {
    get_element_selector(_SELECTOR, false).script(script)!
  } else {
    get_element_selector(_SELECTOR, false).nowait().script(script)!
  }
  VAR_SAVED_STYLE = _result()
  _function_return(VAR_SAVED_STYLE)
}

/**
 * Начать Перетаскивание На Элементе (BAS-функция)
 * Начать перетягивание из выбранного элемента.
 * Конечные координаты всегда случайны, но расположены близко к центру.
 * Если элемент не виден, страница будет прокручена так, чтобы он стал видимым.
 * Траектория перемещения мыши всегда случайна и напоминает выполненную человеком, вы можете изменить параметры перемещения кнопкой настройки, расположенной рядом с "Отмена".
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * После вызова этого действия, нужно также использовать "Закончить Перетаскивание" или "Закончить Перетаскивание На Элементе".
 * @param {string} selector Селектор элемента
 * @param {boolean} noWait = false Не ждать появления элемента
 * @param {boolean} stopThread = true Остановить поток, если элемент не найден
 * @param {Object} mouse Object => {
 *  @param {number} speed Скорость
    Скорость движения мыши как число с плавающей запятой, если вы меняете этот параметр, не забудьте изменить притяжение и отклонение пропорционально.
    @param {number} gravity Притяжение
    Значение плавающей запятой, которое устанавливает силу притяжения курсора к линии между начальной и конечной точками. Если вы установите слишком большое значение, курсор будет перемещаться по прямой, если слишком маленькое, курсор будет перемещаться хаотично на экране.
    @param {number} deviation Отклонение
    Значение плавающей точки, которое устанавливает силу отклонения курсора от линии между начальной и конечной точками. Это можно представить как ветер, который отклоняет курсор от этой линии.
 * }
  @param {number} timeout Максимальное время выполнения задания (мс)
 */
function BAS_element_drag_start() {
  const args = _arguments()
  const selector = args.selector
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  const mouseSettings = args.mouse
  const mouseSettingsObj = mouseSettings ? {
    speed: mouseSettings.speed || 100,
    gravity: mouseSettings.gravity || 6,
    deviation: mouseSettings.deviation || 2.5
  } : {}
  const timeout = args.timeout

  _SELECTOR = selector
  if (timeout) {
    waiter_timeout_next(timeout)
  }
   wait_element_visible(_SELECTOR)!
  _call(_random_point, {})!
  _if(_result().length > 0, function(){
    move( mouseSettingsObj )!
    if !(!noWait && stopThread) {
      get_element_selector(_SELECTOR, false).clarify(X,Y)!
    } else {
      get_element_selector(_SELECTOR, false).nowait().clarify(X,Y)!
    }
    _call(_clarify, mouseSettingsObj )!
    mouse_down(X,Y)!
  })!
}

/**
 * Закончить Перетаскивание На Элементе (BAS-функция)
 * Закончить перетягивание в заданный элемент.
 * Конечные координаты всегда случайны, но расположены близко к центру.
 * Если элемент не виден, страница будет прокручена так, чтобы он стал видимым.
 * Траектория перемещения мыши всегда случайна и напоминает выполненную человеком, вы можете изменить параметры перемещения кнопкой настройки, расположенной рядом с "Отмена".
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * Перед вызовом этого действия, нужно также использовать "Начать Перетаскивание" или "Начать Перетаскивание На Элементе".
 * @param {string} selector Селектор элемента
 * @param {boolean} noWait = false Не ждать появления элемента
 * @param {boolean} stopThread = true Остановить поток, если элемент не найден
 * @param {Object} mouse Object => {
 *  @param {number} speed Скорость
    Скорость движения мыши как число с плавающей запятой, если вы меняете этот параметр, не забудьте изменить притяжение и отклонение пропорционально.
    @param {number} gravity Притяжение
    Значение плавающей запятой, которое устанавливает силу притяжения курсора к линии между начальной и конечной точками. Если вы установите слишком большое значение, курсор будет перемещаться по прямой, если слишком маленькое, курсор будет перемещаться хаотично на экране.
    @param {number} deviation Отклонение
    Значение плавающей точки, которое устанавливает силу отклонения курсора от линии между начальной и конечной точками. Это можно представить как ветер, который отклоняет курсор от этой линии.
 * }
  @param {number} timeout Максимальное время выполнения задания (мс)
 */
function BAS_element_drag_finish() {
  const args = _arguments()
  const selector = args.selector
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  const mouseSettings = args.mouse
  const mouseSettingsObj = mouseSettings ? {
    speed: mouseSettings.speed || 100,
    gravity: mouseSettings.gravity || 6,
    deviation: mouseSettings.deviation || 2.5
  } : {}
  const timeout = args.timeout

  _SELECTOR = selector
  if (timeout) {
    waiter_timeout_next(timeout)
  }
   wait_element_visible(_SELECTOR)!
  _call(_random_point, {})!
  _if(_result().length > 0, function(){
    move( mouseSettingsObj )!
    if !(!noWait && stopThread) {
      get_element_selector(_SELECTOR, false).clarify(X,Y)!
    } else {
      get_element_selector(_SELECTOR, false).nowait().clarify(X,Y)!
    }
    _call(_clarify, mouseSettingsObj )!
    mouse_up(X,Y)!
  })!
}

/**
 * Начать Перетаскивание (BAS-функция)
 * Начать перетягивание из заданных координат.
 * Если вы хотите начать перетягивание от элемента, выберите его в браузере и нажмите на "Начать Перетаскивание На Элементе".
 * Это действие работает с абсолютными координатами.
 * Если координаты не видны, страница будет прокручена так, чтобы они стали видимы.
 * Траектория перемещения мыши всегда случайна и напоминает выполненную человеком, вы можете изменить параметры перемещения кнопкой настройки, расположенной рядом с "Отмена".
 * После вызова этого действия, нужно также использовать "Закончить Перетаскивание" или "Закончить Перетаскивание На Элементе".
 * Если вы хотите перетащить файл из файловой системы в браузер, то воспользуйтесь действием "Начать Перетягивать Файл".
 * @param {number} x X Координата
    Целое число, смещение от левого края страницы
  @param {number} y Y Координата
  Целое число, смещение от верхнего края страницы
  @param {Object} mouse Object => {
 *  @param {number} speed Скорость
    Скорость движения мыши как число с плавающей запятой, если вы меняете этот параметр, не забудьте изменить притяжение и отклонение пропорционально.
    @param {number} gravity Притяжение
    Значение плавающей запятой, которое устанавливает силу притяжения курсора к линии между начальной и конечной точками. Если вы установите слишком большое значение, курсор будет перемещаться по прямой, если слишком маленькое, курсор будет перемещаться хаотично на экране.
    @param {number} deviation Отклонение
    Значение плавающей точки, которое устанавливает силу отклонения курсора от линии между начальной и конечной точками. Это можно представить как ветер, который отклоняет курсор от этой линии.
 * }
 */
function BAS_coords_drag_start() {
  const args = _arguments()
  const x = args.x
  const y = args.y
  const mouseSettings = args.mouse
  const mouseSettingsObj = mouseSettings ? {
    speed: mouseSettings.speed || 100,
    gravity: mouseSettings.gravity || 6,
    deviation: mouseSettings.deviation || 2.5
  } : {}

  move(x, y, mouseSettingsObj)!
  mouse_down(x, y)!
}

/**
 * Закончить Перетаскивание (BAS-функция)
 * Закончить перетягивание в заданные координаты.
 * Если вы хотите закончить перетягивание в элемент, выберите его в браузере и нажмите на "Закончить Перетаскивание На Элементе".
 * Это действие работает с абсолютными координатами.
 * Если координаты не видны, страница будет прокручена так, чтобы они стали видимы.
 * Траектория перемещения мыши всегда случайна и напоминает выполненную человеком, вы можете изменить параметры перемещения кнопкой настройки, расположенной рядом с "Отмена".
 * Перед вызовом этого действия, нужно также использовать "Начать Перетаскивание" или "Начать Перетаскивание На Элементе".
 * @param {number} x X Координата
    Целое число, смещение от левого края страницы
  @param {number} y Y Координата
  Целое число, смещение от верхнего края страницы
  @param {Object} mouse Object => {
 *  @param {number} speed Скорость
    Скорость движения мыши как число с плавающей запятой, если вы меняете этот параметр, не забудьте изменить притяжение и отклонение пропорционально.
    @param {number} gravity Притяжение
    Значение плавающей запятой, которое устанавливает силу притяжения курсора к линии между начальной и конечной точками. Если вы установите слишком большое значение, курсор будет перемещаться по прямой, если слишком маленькое, курсор будет перемещаться хаотично на экране.
    @param {number} deviation Отклонение
    Значение плавающей точки, которое устанавливает силу отклонения курсора от линии между начальной и конечной точками. Это можно представить как ветер, который отклоняет курсор от этой линии.
 * }
 */
function BAS_coords_drag_finish() {
  const args = _arguments()
  const x = args.x
  const y = args.y
  const mouseSettings = args.mouse
  const mouseSettingsObj = mouseSettings ? {
    speed: mouseSettings.speed || 100,
    gravity: mouseSettings.gravity || 6,
    deviation: mouseSettings.deviation || 2.5
  } : {}

  const move_settings = mouseSettingsObj
  move_seetings["do_mouse_up"] = "true"
  move(x, y, move_settings)!
}

/**
 * Получить адрес ссылки (BAS-функция)
 * Получить адрес ссылки и сохранить его в переменной.
 * Если элемент, соответствующий селектору, не является ссылкой, будет получен адрес ближайшей ссылки.
 * Вы всегда можете изменить выбранный элемент с помощью клавиш вверх и вниз. Это полезно, если несколько элементов перекрывают друг друга и имеют одинаковые координаты.
 * В случае, если ссылка, ближайшая к выбранному элементу, не может быть найдена, будет возвращена пустая строка.
 * Это действие получает атрибут "href" из ссылки. Иногда данный атрибут может отсутствовать, а сайты обрабатывают клики по ссылкам с помощью javascript. В этом случае данное действие не будет иметь пользы.
 * @param {string} selector Селектор элемента
 * @param {boolean} noWait = false Не ждать появления элемента
 * @param {boolean} stopThread = true Остановить поток, если элемент не найден
 * @param {number} timeout Максимальное время выполнения задания
 * @returns адрес ближайшей ссылки после выполнения
 */
function BAS_element_get_url() {
  const args = _arguments()
  const selector = args.selector
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  const timeout = args.timeout

  _SELECTOR = selector
  if (timeout) {
    waiter_timeout_next(timeout)
  }
  wait_element(_SELECTOR)!
  const script = "(function(){var link = self;while(link && link.tagName.toLowerCase() != 'a'){link = link.parentNode};if(link && link.hasAttribute('href')){return link.getAttribute('href')} else {return ''};}());"
  if !(!noWait && stopThread) {
    get_element_selector(_SELECTOR, false).script(script)!
  } else {
    get_element_selector(_SELECTOR, false).nowait().script(script)!
  }
   VAR_LINK_URL = _result()
   _function_return(VAR_LINK_URL)
}

/**
 * Получить Атрибут Элемента (BAS-функция)
 * Получить html атрибут выбранного элемента.
 * Например, если элемент содержит такую разметку <a href="https://google.com">google</a>, тогда вы можете найти адрес ссылки получая атрибут href.
 * Если элемент содержит разметку <div id="message">text</a>, вы можете получить идентиификатор элемента через атрибут id.
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * @param {string} selector Селектор элемента
 * @param {string} attributeName Имя атрибута
  Имя атрибута как строка.
  Примеры :
  id - Получить id элемента
  style - Получить стили элемента
  @param {boolean} noWait = false Не ждать появления элемента
  @param {boolean} stopThread = true Остановить поток, если элемент не найден
  @param {number} timeout Максимальное время выполнения задания (мс)
  @returns значение атрибута элемента как строка
 */
function BAS_element_get_attribute() {
  const args = _arguments()
  const selector = args.selector
  const attributeName = args.attributeName
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  const timeout = args.timeout

  _SELECTOR = selector
  if (timeout) {
    waiter_timeout_next(timeout)
  }
  wait_element(_SELECTOR)!
  if !(!noWait && stopThread) {
    get_element_selector(_SELECTOR, false).attr(attributeName)!
  } else {
    get_element_selector(_SELECTOR, false).nowait().attr(attributeName)!
  }
  VAR_SAVED_ATTRIBUTE = _result()
  _function_return(VAR_SAVED_ATTRIBUTE)
}

/**
 * Установить Атрибут Элемента (BAS-функция)
 * Установить html атрибут заданного элемента.
 * Например, можно поменять атрибут id элемента с разметкой <div id="message-old">text</a> если использовать это действие с параметрами id и message-new.
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * @param {string} selector Селектор элемента
 * @param {stirng} attributeName Имя атрибута
  Имя атрибута как строка.
  @param {string} attributeValue Значение атрибута
  Эта переменная содержит значение атрибута элемента как строку
  @param {boolean} noWait = false Не ждать появления элемента
  @param {boolean} stopThread = true Остановить поток, если элемент не найден
  @param {number} timeout Максимальное время выполнения задания (мс)
 */
function BAS_element_set_attribute() {
  const args = _arguments()
  const selector = args.selector
  const attributeName = args.attributeName
  const attributeValue = args.attributeValue
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  const timeout = args.timeout

  _SELECTOR = selector
  if (timeout) {
    waiter_timeout_next(timeout)
  }
  wait_element(_SELECTOR)!
  if !(!noWait && stopThread) {
    get_element_selector(_SELECTOR, false).set_attr(attributeName, attributeValue)!
  } else {
    get_element_selector(_SELECTOR, false).nowait().set_attr(attributeName, attributeValue)!
  }
}

/**
 * Установить Значение Комбобокса (BAS-функция)
 * Ссылка на вики: https://wiki.bablosoft.com/doku.php?id=ru:how_to_set_combobox
 * Установить значение выпадающего списка. Работает только на выпадающих списках(не на текстовых полях для ввода).
 * Если выпадающий список имеет нестандартную разметку, эта функция не будет работать, в этом случае используйте действие "Установить Индекс Комбобокса".
 * Вы можете использовать действие "Ввод текста" для установки значения выпадающего списка. Для этого кликните на выпадающий список внутри браузера и выберите "Ввод текста", потом установите текст для ввода в желаемое значение или несколько первых символов с <RETURN> в конце. Например, если выпадающий список содержит два значения: мужчина и женщин, то вы можете выбрать первое значения введя мужчина<RETURN> или муж<RETURN>.
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * @param {string} selector Селектор элемента. Как найти элемент: https://wiki.bablosoft.com/doku.php?id=ru:how_to_search_for_element
 * @param {string} Строка
  Строка, которая содежит точное значение присутствующее в выпадающем списке
  @param {boolean} noWait = false Не ждать появления элемента
  @param {boolean} stopThread = true Остановить поток, если элемент не найден
  @param {number} timeout Максимальное время выполнения задания (мс)
 */
function BAS_combobox_set_value() {
  const args = _arguments()
  const selector = args.selector
  const value = args.value
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  const timeout = args.timeout

  _SELECTOR = selector
  if (timeout) {
    waiter_timeout_next(timeout)
  }
  wait_element_visible(_SELECTOR)!
  get_element_selector(_SELECTOR, false).script2("[[RESULT]]='';if(self.tagName.toLowerCase() != 'select')throw 'wrong type';var option_list = self.querySelectorAll('option');[[RESULT]] = -1;for(var i = 0;i<option_list.length;i++){var option = option_list.item(i);if(option.innerHTML == " + JSON.stringify(value) + "){[[RESULT]] = i;break;}}",JSON.stringify({}))!
  _SELECT_INDEX = JSON.parse(JSON.parse(_result()).variables)["RESULT"]
  _call(_random_point, {})!
  _if(_result().length > 0 && _SELECT_INDEX >= 0, function(){
    move({})!
    if !(!noWait && stopThread) {
      get_element_selector(_SELECTOR, false).clarify(X,Y)!
    } else {
      get_element_selector(_SELECTOR, false).nowait().clarify(X,Y)!
    }

    _call(_clarify,{})!
    mouse(X,Y)!
    if (timeout) {
      general_timeout_next(timeout)
    }
    sleep(rand(2000,3000))!
    _set_combobox_index(_SELECT_INDEX)!
    sleep(rand(1000,1200))!
  })!
}

/**
 * Установить Индекс Комбобокса (BAS-функция)
 * Ссылка на вики: https://wiki.bablosoft.com/doku.php?id=ru:how_to_set_combobox
 * Установить номер значения выпадающего списка в заданное число. Работает только на выпадающих списках(не на текстовых полях для ввода).
 * Вы можете использовать действие "Ввод текста" для установки значения выпадающего списка. Для этого кликните на выпадающий список внутри браузера и выберите "Ввод текста", потом установите текст для ввода в желаемое значение или несколько первых символов с <RETURN> в конце. Например, если выпадающий список содержит два значения: мужчина и женщин, то вы можете выбрать первое значения введя мужчина<RETURN> или муж<RETURN>.
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * @param {string} selector Селектор элемента. Как найти элемент: https://wiki.bablosoft.com/doku.php?id=ru:how_to_search_for_element
 * @param {number} Индекс
  Целое число, содержащее индекс выпадающего списка начиная с нуля
  @param {boolean} noWait = false Не ждать появления элемента
  @param {boolean} stopThread = true Остановить поток, если элемент не найден
  @param {number} timeout Максимальное время выполнения задания (мс)
 */
function BAS_combobox_set_index() {
  const args = _arguments()
  const selector = args.selector
  const index = args.index
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  const timeout = args.timeout

  _SELECTOR = selector
  if (timeout) {
    waiter_timeout_next(timeout)
  }
  wait_element_visible(_SELECTOR)!
  _call(_random_point, {})!
  _if(_result().length > 0 && _SELECT_INDEX >= 0, function(){
    move({})!
    if !(!noWait && stopThread) {
      get_element_selector(_SELECTOR, false).clarify(X,Y)!
    } else {
      get_element_selector(_SELECTOR, false).nowait().clarify(X,Y)!
    }

    _call(_clarify,{})!
    mouse(X,Y)!
    if (timeout) {
      general_timeout_next(timeout)
    }
    sleep(rand(2000,3000))!
    _set_combobox_index(index)!
    sleep(rand(1000,1200))!
  })!
}

/**
 * Выбрать Случайный Элемент Из Комбобокса (BAS-функция)
 * Ссылка на вики: https://wiki.bablosoft.com/doku.php?id=ru:how_to_set_combobox
 * Установить номер значения выпадающего списка в случайное число. Работает только на выпадающих списках(не на текстовых полях для ввода).
 * Если выпадающий список имеет нестандартную разметку, эта функция не будет работать, в этом случае используйте действие "Установить Индекс Комбобокса".
 * Вы можете использовать действие "Ввод текста" для установки значения выпадающего списка. Для этого кликните на выпадающий список внутри браузера и выберите "Ввод текста", потом установите текст для ввода в желаемое значение или несколько первых символов с <RETURN> в конце. Например, если выпадающий список содержит два значения: мужчина и женщин, то вы можете выбрать первое значения введя мужчина<RETURN> или муж<RETURN>.
 * Если элемент не будет найден после первой попытки, BAS продолжит ожидать его на протяжении минуты. Если на протяжении 10 секунд элемент не будет найден, в лог будет добавлено сообщение, если элемент не появится на протяжении минуты, поток завершится с ошибкой. Вы можете обработать эту ошибку если уберете настройку "Остановить поток, если элемент не найден" (вверху страницы) или если обернете данное действие в блок игнорирования ошибок. Вы также можете настроить максимальное время ожидания если нажмете на иконку песочных часов.
 * @param {string} selector Селектор элемента. Как найти элемент: https://wiki.bablosoft.com/doku.php?id=ru:how_to_search_for_element
  @param {boolean} noWait = false Не ждать появления элемента
  @param {boolean} stopThread = true Остановить поток, если элемент не найден
  @param {number} timeout Максимальное время выполнения задания (мс)
 */
function BAS_combobox_get_random_element() {
  const args = _arguments()
  const selector = args.selector
  const noWait = args.noWait || false
  const stopThread = args.stopThread || true
  const timeout = args.timeout

  _SELECTOR = selector
  if (timeout) {
    waiter_timeout_next(timeout)
  }
  wait_element_visible(_SELECTOR)!
  get_element_selector(_SELECTOR, false).script2("[[RESULT]]=-1;if(self.tagName.toLowerCase() != 'select')throw 'wrong type';var option_list = self.querySelectorAll('option');[[RESULT]] = -1;[[RESULT]] = Math.floor((Math.random() * (option_list.length + 1)));",JSON.stringify({}))!
  _SELECT_INDEX = JSON.parse(JSON.parse(_result()).variables)["RESULT"]
  _call(_random_point, {})!
  _if(_result().length > 0 && _SELECT_INDEX >= 0, function(){
    move({})!
    if !(!noWait && stopThread) {
      get_element_selector(_SELECTOR, false).clarify(X,Y)!
    } else {
      get_element_selector(_SELECTOR, false).nowait().clarify(X,Y)!
    }

    _call(_clarify,{})!
    mouse(X,Y)!
    if (timeout) {
      general_timeout_next(timeout)
    }
    sleep(rand(2000,3000))!
    _set_combobox_index(_SELECT_INDEX)!
    sleep(rand(1000,1200))!
  })!
}