<?php
define("ROOT_DIR", dirname(__DIR__) . DIRECTORY_SEPARATOR);
define("APP_DIR", ROOT_DIR . "app" . DIRECTORY_SEPARATOR);
define("CONFIG_DIR", ROOT_DIR . "config" . DIRECTORY_SEPARATOR);
define("LOG_DIR", ROOT_DIR . "log" . DIRECTORY_SEPARATOR);

const CURRENT_SERVICE_CLASS = APP_DIR."MysqlService.php";
const SERVICE_INTERFACE = APP_DIR."service.php";
const ADDITIONAL_FUNCTION = APP_DIR."function.php";
const LOG_FILE = LOG_DIR."chat.log";

//MysqlService part
include_once CONFIG_DIR."mysqlConfig.php";

