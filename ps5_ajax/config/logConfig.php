<?php
$rootDir =dirname(__DIR__) . DIRECTORY_SEPARATOR;
$logDir = $rootDir . "log" . DIRECTORY_SEPARATOR;

return array('errorLog' => $logDir . 'error.log',
    'eventLog' => $logDir. 'event.log');