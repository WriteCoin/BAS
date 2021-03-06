/**
 * Воспроизвести Звук
 * Воспроизвести звуковое уведомление.
 * Это действие может привлечь внимание пользователя к важным событиям во время выполнения скрипта.
 */
function BAS_user_play_sound() {
  native("usernotification", "playsound", "")
}

/**
 * Запросить ввод от пользователя
 * Показать поле для ввода пользователю, дождаться, пока он введет какое-то значение и сохранить это значение в переменной.
 * Это действие работает как капча, но вместо изображения отображается текст.
 * Это действие не имеет ограничений по времени и продлится до тех пор, пока пользователь ничего не введет.
 * Пользователь может ввести какой-либо текст, либо отменить ввод. В первом случае действие вернет введенное значение, во втором случае поток завершится с ошибкой. Вы можете избежать завершения работы потока, используя действие 'Игнорировать ошибки'.
 * Если вы хотите получить значения от пользователя перед запуском скрипта или создать продвинутый пользовательский интерфейс, то лучше использовать систему ресурсов.
 * 
 * @param {string} text Текст, который будет показан пользователю
  Текст, который будет отображаться пользователю вместе с полем для ввода. Этот текст должен объяснять, какое именно значение нужно ввести.

  @returns Результат, который был введен пользователем.
 */
function BAS_user_input() {
  const args = _arguments()
  const text = args.text
  solve_base64("manual","BAS_USER_ASK" + "Текст")!
  VAR_USER_INPUT = _result()
  _function_return(VAR_USER_INPUT)
}