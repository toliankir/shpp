<?php
define("ROOT_DIR", dirname(__DIR__) . DIRECTORY_SEPARATOR);
define("APP_DIR", ROOT_DIR . "app" . DIRECTORY_SEPARATOR);
define("JSON_DIR", ROOT_DIR . "json" . DIRECTORY_SEPARATOR);
define("LOG_DIR", ROOT_DIR . "log" . DIRECTORY_SEPARATOR);

const CURRENT_SERVICE_CLASS = APP_DIR . "JsonService.php";
const SERVICE_INTERFACE = APP_DIR . "IDataService.php";
const ADDITIONAL_FUNCTION = APP_DIR . "function.php";
const RESP_CREATER = APP_DIR . "ResponseCreator.php";
//Json part
const USER_DATA_FILE = JSON_DIR . 'users.json';
const CHAT_DATA_FILE = JSON_DIR . 'chatdata.json';

return array('errorLog' => LOG_DIR . 'error.log',
    'eventLog' => LOG_DIR . 'event.log',
    'appPath' => APP_DIR,
    'rootPath' => ROOT_DIR);