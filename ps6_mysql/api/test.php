<?php
require_once 'mysqlService.php';
//require_once 'jsonService.php';

$service = new MysqlService();
//$service = new jsonService();

$messages = $service->getMessages(Date('U')-60*60);
var_dump($messages);

//echo "<hr>";

//$jservice = new jsonService();
//
//$messages = $jservice->getMessages(Date('U')-60*60);
//var_dump($messages);