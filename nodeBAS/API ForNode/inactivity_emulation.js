const get_inactivity_emulation_functions = (f) => {
	/**
* Эмуляция бездействия (BAS-функция)
* Имитировать просмотр пользователем веб-страницы.
* Это действие - более правдободобная замена действия 'Спать'.
* Во время бездействия страница может быть прокручена и курсор мыши может перемещаться, но клики не выполняются.
* Все бездействие разделяется на интервалы. Каждый интервал имеет тип. Вот список типов:
* 1 - прокрутка страницы колесом мыши.
* 2 - случайные движения мыши на большое расстояние.
* 3 - случайные движения мыши на короткое расстояние.
* 4 - сон.
* Каждый раз появление интервала выбирается случайным образом. Это означает, что вы будете получать разные результаты каждый раз, когда запускаете это действие.
* Кроме того, частота появления интервала с одними типами может быть больше, чем с другими.
* Параметр 'Тип ожидания и его наполнение' должен содержать список типов, чем чаще в списке появляются определенные типы, тем чаще они будут встречаться во время выполнения действия. Прочтите помощь к параметру 'Тип ожидания и его наполнение' чтобы увидеть примеры.
* @param {number} time Время, проведенное на странице в секундах
Этот параметр задает длительность бездействия в секундах. Заданное время не является точным, фактическая длительность действия может быть немного дольше, чем указано.
Примеры :
60 - Бездействие в течение одной минуты
300 - Бездействие в течение 5 минут
@param {Array} expectations Тип ожидания и его наполнение
Все бездействие разделяется на интервалы. Каждый интервал имеет тип. Вот список типов интервалов: 1 - прокрутка страницы колесом мыши, 2 - случайные движения мыши на большое расстояние, 3 - случайные движения мыши на короткое расстояние, 4 - сон. Кроме того, частота появления интервала с одними типами может быть больше, чем с другими. Этот параметр должен содержать список типов, чем чаще в списке появляются определенные типы, тем чаще они будут встречаться во время выполнения действия.
Примеры :
[1] - Выполнять только прокрутку страницы.
[1,4] - Выполнять прокрутку страницы и сон. И сон и прокрутка будут иметь одинаковую частоту появления
[1,4,4] - Выполнять прокрутку страницы и сон. Сон будет выполняться в 2 раза чаще, чем прокрутка.
[1,3,4,4] - Выполнять прокрутку страницы, сон и движения мыши на коротком состоянии. Сон будет выполняться в 2 раза чаще, чем прокрутка. Прокрутка и короткие движения мыши будут иметь одинаковую частоту появления
*/
const BAS_inactivity_emulation = async (params) => await f("BAS_inactivity_emulation", params || {})

return {	BAS_inactivity_emulation,
}
}

module.exports = get_inactivity_emulation_functions