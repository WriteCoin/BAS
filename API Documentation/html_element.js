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