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
function BAS_inactivity_emulation() {
const args = _arguments()
IDDLE_EMULATION_END = Date.now() + 1000 * (args.time)
IDDLE_EMULATION_DISTRIBUTION = args.expectations
_get_browser_screen_settings()!
IDDLE_EMULATION_RESULT = JSON.parse(_result())
IDDLE_CURSOR_POSITION_X = IDDLE_EMULATION_RESULT["CursorX"]
IDDLE_CURSOR_POSITION_Y = IDDLE_EMULATION_RESULT["CursorY"]
IDDLE_CURSOR_POSITION_WIDTH = IDDLE_EMULATION_RESULT["Width"]
IDDLE_CURSOR_POSITION_HEIGHT = IDDLE_EMULATION_RESULT["Height"]
IDDLE_CURSOR_POSITION_WAS_SCROLL = false
_do(function(){
if(Date.now() >= IDDLE_EMULATION_END)
_break()
IDDLE_EMULATION_CURRENT_ITEM = IDDLE_EMULATION_DISTRIBUTION[Math.floor(Math.random()*IDDLE_EMULATION_DISTRIBUTION.length)]
if(_iterator() == 1 && IDDLE_EMULATION_DISTRIBUTION.indexOf(2)>=0)
IDDLE_EMULATION_CURRENT_ITEM = 2
_if(IDDLE_EMULATION_CURRENT_ITEM == 1, function(){
IDDLE_EMULATION_CURRENT_DIRECTION = (rand(1,2) == 2) ? "<MOUSESCROLLUP>" : "<MOUSESCROLLDOWN>"
if(!IDDLE_CURSOR_POSITION_WAS_SCROLL)
IDDLE_EMULATION_CURRENT_DIRECTION = "<MOUSESCROLLDOWN>"
IDDLE_CURSOR_POSITION_WAS_SCROLL = true
IDDLE_EMULATION_CURRENT_NUMBER = rand(1,5)
_do(function(){
if(_iterator() >= IDDLE_EMULATION_CURRENT_NUMBER)
_break()
_type(IDDLE_EMULATION_CURRENT_DIRECTION,1000)!
sleep(rand(300,1000))!
})!
})!
_if(IDDLE_EMULATION_CURRENT_ITEM == 2, function(){
page().script("document.documentElement.scrollLeft")!
IDDLE_CURSOR_POSITION_SCROLL_X = parseInt(_result())
page().script("document.documentElement.scrollTop")!
IDDLE_CURSOR_POSITION_SCROLL_Y = parseInt(_result())
IDDLE_CURSOR_POSITION_X = rand(1,IDDLE_CURSOR_POSITION_WIDTH)
IDDLE_CURSOR_POSITION_Y = rand(1,IDDLE_CURSOR_POSITION_HEIGHT)
move(IDDLE_CURSOR_POSITION_SCROLL_X + IDDLE_CURSOR_POSITION_X,IDDLE_CURSOR_POSITION_SCROLL_Y + IDDLE_CURSOR_POSITION_Y)!
})!
_if(IDDLE_EMULATION_CURRENT_ITEM == 3, function(){
if(IDDLE_CURSOR_POSITION_X < 0 || IDDLE_CURSOR_POSITION_Y < 0)
_break()
page().script("document.documentElement.scrollLeft")!
IDDLE_CURSOR_POSITION_SCROLL_X = parseInt(_result())
page().script("document.documentElement.scrollTop")!
IDDLE_CURSOR_POSITION_SCROLL_Y = parseInt(_result())
IDDLE_EMULATION_CURRENT_NUMBER = rand(1,4)
_do(function(){
if(_iterator() >= IDDLE_EMULATION_CURRENT_NUMBER)
_break()
IDDLE_CURSOR_POSITION_X += rand(-50,50)
IDDLE_CURSOR_POSITION_Y += rand(-50,50)
if(IDDLE_CURSOR_POSITION_X > IDDLE_CURSOR_POSITION_WIDTH)
IDDLE_CURSOR_POSITION_X = IDDLE_CURSOR_POSITION_WIDTH
if(IDDLE_CURSOR_POSITION_Y > IDDLE_CURSOR_POSITION_HEIGHT)
IDDLE_CURSOR_POSITION_Y = IDDLE_CURSOR_POSITION_HEIGHT
if(IDDLE_CURSOR_POSITION_X < 0)
IDDLE_CURSOR_POSITION_X = 0
if(IDDLE_CURSOR_POSITION_Y < 0)
IDDLE_CURSOR_POSITION_Y = 0
move(IDDLE_CURSOR_POSITION_SCROLL_X + IDDLE_CURSOR_POSITION_X,IDDLE_CURSOR_POSITION_SCROLL_Y + IDDLE_CURSOR_POSITION_Y)!
_if(rand(1,10) > 3,function(){
sleep(rand(10,300))!
})!
})!
})!
_if(IDDLE_EMULATION_CURRENT_ITEM == 4, function(){
sleep(rand(500,5000))!
})!
})!
}
