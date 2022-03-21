const get_process_manage_functions = (f) => {
	/**
* Запустить Процесс (BAS-функция)
* Выполнить исполняемый файл или batch скрипт.
* Параметр 'Batch скрипт или путь к исполняемому файлу' может содержать путь к исполняемому файлу, который вы хотите запустить, или batch скрипт.
* Batch скрипт может иметь несколько строк, могут использоваться утилиты windows и запускаться другие исполняемые файлы.
* Рабочая папка по умолчанию - это путь, где установлен BAS, вы можете изменить его с помощью параметра 'Рабочая папка' или запустить команду 'cd' внутри batch скрипта.
* Результат будет записан в переменные PROCESS_STANDART_OUTPUT и PROCESS_ERROR_OUTPUT, можно использовать регулярные выражения для извлечения значений из этих переменных.
* @param {string} script Batch скрипт или путь к исполняемому файлу
Это поле должно содержать либо путь к исполняемому файлу, который вы хотите запустить, либо batch скрипт. Batch может содержать любые служебные программы Windows, такие как cd, dir, echo и т. д. и может иметь несколько строк
Примеры :
c:\path\to\executable.exe - Запустить исполняемый файл
c:\path\to\executable 1.exe
c:\path\to\executable 2.exe
- Запуск нескольких исполняемых файлов один за другим
c:\path\to\executable.exe --argument1 --argument2 - Запуск исполняемого файла с параметрами командной строки
where cmd - Найти путь к cmd.exe
echo "Message" - Отобразите сообщение, оно будет доступно в переменной PROCESS_STANDART_OUTPUT.
cd c:\download
dir
- Показать содержимое папки загрузки
FOR %%G IN (a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z) DO (echo %%G) - Вывод всех букв в лог
@param {string} dir Рабочая папка
Рабочая папка, в которой будет выполнен batch. Оставьте пустым для выполнения в папке, где находится файл BrowserAutomationStudio.exe.
Примеры :
c:/dev
c:\dev
Пустая строка - Запустить в папке BAS
@returns Object {
process_standart_output: string - Стандартный вывод процесса
process_error_output: string - Вывод процесса с ошибками
}
*/
const BAS_process_run = async (params) => await f("BAS_process_run", params)

return {	BAS_process_run,
}
}

module.exports = get_process_manage_functions