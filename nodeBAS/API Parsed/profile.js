/**
* Создать или переключиться на постоянный профиль (BAS-функция)
* Использовать указанную папку в качестве места для хранения файлов cookie, кеша, localstorage и т. д.
* Если заданная папка не существует, она будет создана.
* Если указанная папка уже существует, браузер будет загружать из нее данные профиля.
* Для переключения профиля требуется перезапуск браузера, поэтому это действие может перезапустить браузер, если он уже открыт. Перезапуск браузера также сбросит все настройки.
* Вы можете реализовать автологин с помощью этого действием, сначала вам нужно задать папку профиля, затем залогиниться на сайте, после чего вы можете перезапустить БАС и снова указать ту же папку. Браузер загрузит все данные из предыдущего сеанса, и вам не нужно будет логиниться второй раз.
* @param {string} path Путь к папке профиля
Строка с путем к папке профиля. Тип разделителя не имеет значения. Если папка не существует, она будет создана. Если папка уже существует, BAS будет использовать ее в качестве профиля и восстановит все данные из нее, такие как cookie, localstorage и т. д.
Примеры :
c:/path/to/profile
c:\path\to\profile
@param {boolean} always_upload_fingerprint Всегда загружать отпечаток из папки с профилем
В случае, если папка профиля уже существует и имеет данные отпечатка, эта настройка говорит BAS применять отпечаток использованный для данного профиля последним.
@param {boolean} always_upload_proxy Всегда загружать прокси из папки с профилем
В случае, если папка профиля уже существует и имеет данные прокси, эта настройка говорит BAS применять прокси использованный для данного профиля последним.
*/
function BAS_create_or_switch_permanent_profile() {
const args = _arguments()
ProfilePath = args.path;
_do(function(){
if(ProfilePath == _get_profile())
_break();
if(_iterator() > 30)
fail(tr("Timeout during switching to profile ") + ProfilePath);
native("filesystem", "removefile", ProfilePath + "/lockfile");
if(!JSON.parse(native("filesystem", "fileinfo", ProfilePath + "/lockfile"))["exists"])
_break();
sleep(1000)!
})!
var Params = {};
Params["ProfilePath"] = ProfilePath
Params["LoadFingerprintFromProfileFolder"] = args.always_upload_fingerprint
_settings(Params)!
_if(args.always_upload_fingerprint, function(){
FINGERPRINT_JSON = native("filesystem", "readfile", JSON.stringify({value: args.path + "/fingerprint.json",base64:false,from:0,to:0}))
_if(FINGERPRINT_JSON.length > 0, function(){
FINGERPRINT_JSON = JSON.parse(FINGERPRINT_JSON)
_call(BrowserAutomationStudio_ApplyFingerprint,[FINGERPRINT_JSON["fingerprint"],FINGERPRINT_JSON["canvas"],FINGERPRINT_JSON["webgl"],FINGERPRINT_JSON["audio"],FINGERPRINT_JSON["battery"],FINGERPRINT_JSON["rectangles"],FINGERPRINT_JSON["perfectcanvas"],FINGERPRINT_JSON["sensor"]])!
sleep(1000)!
})!
FINGERPRINT_JSON = native("filesystem", "readfile", JSON.stringify({value: args.path + "/performance.json",base64:false,from:0,to:0}))
_if(FINGERPRINT_JSON.length > 0, function(){
FINGERPRINT_JSON = JSON.parse(FINGERPRINT_JSON)
_call(BrowserAutomationStudio_PerformanceFingerprint,FINGERPRINT_JSON)!
})!
})!
_if(args.always_upload_proxy, function(){
var is_error = false;
try
{
_ARG = JSON.parse(native("filesystem", "readfile", JSON.stringify({value: args.path + "/proxy.txt",base64:false,from:0,to:0})))
_ARG["Port"] = parseInt(_ARG["Port"])
}catch(e)
{
is_error = true
}
_if(!is_error, function(){
set_proxy(_ARG["server"], _ARG["Port"], _ARG["IsHttp"], _ARG["name"], _ARG["password"])!
sleep(1000)!
set_proxy_extended(true, true, true, true, true)!
sleep(1000)!
})!
})!
}
/**
* Переключиться на временный профиль (BAS-функция)
* По умолчанию браузер BAS сохраняет все данные профиля во временной папке. Это действие переключится на новый временный профиль.
* Для переключения профиля требуется перезапуск браузера, поэтому это действие может перезапустить браузер, если он уже открыт. Перезапуск браузера также сбросит все настройки.
* В случае использования временного профиля будет создан новый временный профиль.
*/
function BAS_switch_to_temporary_profile() {
const Params = {};
Params["ProfilePath"] = "<Incognito>"
_settings(Params)!
}
/**
* Копировать профиль в другую папку
* Копировать текущий профиль в другую папку.
* Это действие не закрывает браузер и не изменять путь к текущему профилю.
* Лучшее место для использования этого действия - конец работы потока, если вы хотите сохранить свои cookie и не заходить на сайт второй раз когда позже запускаете BAS.
* @param {string} path Путь к папке профиля
Строка с путем к профилю. Тип разделителя не имеет значения. Здесь лучше использовать пустую папку или путь к несуществующей папке(она будет создана).
Примеры :
c:/path/to/profile
c:\path\to\profile
*/
function BAS_profile_copy(path) {
const path = _function_argument('path') || path
const ProfilePath = _get_profile()
native("filesystem", "copyfile", JSON.stringify({
path: ProfilePath,
dest: path
}))
}
/**
* Удалить профиль (BAS-функция)
* Удалить профиль
* Вы можете удалить текущий профиль, если запустить это действие с пустой строкой. В этом случае браузер будет остановлен. После удаления текущего профиля, будет использован новый временный профиль.
* Это действие остановит браузер, только если вы будете удалять текущий профиль.
* @param {string} path Путь к папке профиля
Тип разделителя значения не имеет.
Примеры :
c:/path/to/profile
c:\path\to\profile
Пустая строка - Удалить текущий профиль
*/
function BAS_delete_profile() {
const args = _arguments()
ProfilePath = args.path
if(ProfilePath == "")
ProfilePath = _get_profile()
_if(ProfilePath == _get_profile(), function(){
var Params = {};
Params["ProfilePath"] = "<Incognito>"
_settings(Params)!
})!
_do(function(){
if(_iterator() > 30)
fail(tr("Timeout during deleting profile ") + ProfilePath);
native("filesystem", "removefile", ProfilePath + "/lockfile");
if(!JSON.parse(native("filesystem", "fileinfo", ProfilePath + "/lockfile"))["exists"])
_break();
sleep(1000)!
})!
native("filesystem", "removefile", ProfilePath)
}
/**
* Получить информацию о текущем профиле
* Получить информацию о текущем профиле.
* Это действие не создает браузер, завершается мгновенно и может быть использовано из любого места скрипта.
* @returns Object {
*profile_id: string - Путь к профилю
*Абсолютный путь к папке профиля
*
*has_proxy: boolean - Содержит прокси
Булевое значение(true или false), содежит ли текущий профиль прокси. Его можно применить автоматически с помощью действия 'Создать или переключиться на постоянный профиль'.
has_fingerprint: boolean - Содержит отпечаток
Булевое значение(true или false), содежит ли текущий профиль отпечаток. Его можно применить автоматически с помощью действия 'Создать или переключиться на постоянный профиль'.
* }
*/
function BAS_current_profile_info() {
const profile_id = _get_profile()
const has_proxy = _get_profile().length > 0 && JSON.parse(native("filesystem", "fileinfo", _get_profile() + "/proxy.txt"))["exists"]
const has_fingerprint = _get_profile().length > 0 && JSON.parse(native("filesystem", "fileinfo", _get_profile() + "/fingerprint.json"))["exists"]
const result = {
profile_id: profile_id,
has_proxy: has_proxy,
has_fingerprint: has_fingerprint
}
_function_return(result)
return result
}
