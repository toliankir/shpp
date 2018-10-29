<?php
$rootDir = dirname(__DIR__) . DIRECTORY_SEPARATOR;
$jsonDir = $rootDir . "json" . DIRECTORY_SEPARATOR;

return array('chatData' => $jsonDir . 'chatdata.json',
    'usersData' => $jsonDir . 'users.json');
