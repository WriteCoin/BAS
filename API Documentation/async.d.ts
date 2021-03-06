/**
 * Прервать асинхронную функцию
 * Прервать вызов асинхронной функции.
 * Это действие немедленно остановит выполнение асинхронной функции.
 * Если параметр "ID потока" содержит список, то каждый поток из этого списка будет остановлен.
 * Это действие работает только с асинхронными функциями, созданными с помощью действия "Вызов функции асинхронно".
 * @param thread_id ID потока
  ID потока, полученный из действия "Вызов функции асинхронно". Если параметр является списком, это действие остановит все асинхронные функций в этом списке.
  Примеры :
  [[THREAD_ID]] - Остановить одну функцию.
  [[THREAD_LIST]] - Остановить все функции из списка.
 */
declare function _thread_stop(thread_id: number): void