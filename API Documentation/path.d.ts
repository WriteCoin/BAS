/**
 * Путь к файлу проекта
 * Получить полный путь к файлу проекта.
 * Это действие вернет полный путь к файлу проекта. Если скрипт не скомпилирован, то это действие вернет путь к открытому файлу проекта. А если скрипт скомпилирован, то это действие вернет путь к файлу project.xml находящемуся в корневой папке движка.
 * Например, если скрипт не скомпилирован и открыт проект "Gparser" находящийся в папке "D:/projects", то действие вернет "D:/projects/Gparser.xml".
 * У скомпилированных незащищенных и защищенных скриптов пути немного отличаются, так как незащищенный скрипт сохраняет движок в папку appslocal, а защищенный в папку appsremote.
 * Например, если скрипт скомпилирован без защиты и находится в папке "D:/Gparser", то действие вернет "D:/Gparser/appslocal/ibq8y9qo/SIDbfzc5bdv/engine/project.xml".
 * Например, если скрипт скомпилирован с защитой и находится в папке "D:/Gparser", то действие вернет "D:/Gparser/appsremote/Gparser/SIDic9cmk8n/engine/project.xml".
 * @returns Путь к файлу проекта.
  Примеры :
  D:/projects/Gparser.xml - Не скомпилированный скрипт
  D:/Gparser/appslocal/ibq8y9qo/SID/engine/project.xml - Незащищенный скомпилированный скрипт
  D:/Gparser/appsremote/Gparser/SID/engine/project.xml - Защищенный скомпилированный скрипт
 */
declare function project_path(): string

/**
 * Путь к директории проекта
 * Получить полный путь к директории проекта.
 * Это действие вернет полный путь к директории проекта. Если скрипт не скомпилирован, то это действие вернет путь к директории в которой находится открытый файл проекта. А если скрипт скомпилирован, то это действие вернет путь к корневой директории скрипта.
 * @returns Путь к директории проекта.
  Примеры :
  D:/projects - Не скомпилированный скрипт
  D:/Gparser - Незащищенный скомпилированный скрипт/Защищенный скомпилированный скрипт
 */
declare function project_directory(): string

/**
 * Путь установки
 * Получить полный путь установки.
 * Это действие вернет полный путь к директории, в которой находится исполняемый файл.
 * Например, если скрипт не скомпилирован и запущен BAS версии 24.0.8 установленный в папку "C:/BrowserAutomationStudio", то действие вернет "C:/BrowserAutomationStudio/apps/24.0.8".
 * У скомпилированных незащищенных и защищенных скриптов пути немного отличаются, так как незащищенный скрипт сохраняет движок в папку appslocal, а защищенный в папку appsremote.
 * Например, если скрипт скомпилирован без защиты и находится в папке "D:/Gparser", то действие вернет "D:/Gparser/appslocal/ibq8y9qo/SIDbfzc5bdv/engine".
 * Например, если скрипт скомпилирован с защитой и находится в папке "D:/Gparser", то действие вернет "D:/Gparser/appsremote/Gparser/SIDic9cmk8n/engine".
 * @returns Путь установки
  Примеры :
  C:/BrowserAutomationStudio/apps/24.0.8 - Не скомпилированный скрипт
  D:/Gparser/appslocal/ibq8y9qo/SID/engine - Незащищенный скомпилированный скрипт
  D:/Gparser/appsremote/Gparser/SID/engine - Защищенный скомпилированный скрипт
 */
declare function installation_path(): string
