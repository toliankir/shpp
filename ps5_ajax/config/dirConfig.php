<?php
define("ROOT_DIR", dirname(__DIR__) . DIRECTORY_SEPARATOR);
define("APP_DIR", ROOT_DIR . "app" . DIRECTORY_SEPARATOR);
define("JSON_DIR", ROOT_DIR . "json" . DIRECTORY_SEPARATOR);

const CURRENT_SERVICE_CLASS = APP_DIR."jsonService.php";
const SERVICE_INTERFACE = APP_DIR."service.php";
const ADDITIONAL_FUNCTION = APP_DIR."function.php";

//Json part
const USER_DATA_FILE = JSON_DIR.'users.json';
const CHAT_DATA_FILE = JSON_DIR.'chatdata.json';