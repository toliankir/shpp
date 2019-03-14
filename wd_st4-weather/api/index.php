<?php
const DAY_IN_SECONDS = 24 * 60 * 60 - 1;

spl_autoload_register(function ($className) {
    $file = dirname(__DIR__) . DIRECTORY_SEPARATOR . str_replace('\\', DIRECTORY_SEPARATOR, $className) . '.php';
    if (file_exists($file)) {
        require dirname(__DIR__) . DIRECTORY_SEPARATOR . str_replace('\\', DIRECTORY_SEPARATOR, $className) . '.php';
    }
    return false;

});

use App\Adapters\JsonAdapter;
use App\ResponseCreator;
use App\Services\ExternalService;
use \App\Services\JsonService;
use \App\Services\MysqlService;
use \App\Adapters\MysqlAdapter;
use App\WeatherFactory;


if (!isset($_GET['service'])) {
    ResponseCreator::responseCreate('Wrong request', 400);
    die();
}
$serviceClass = '\\App\\Services\\' . ucfirst($_GET['service']) . 'Service';
if (!class_exists($serviceClass)) {
    ResponseCreator::responseCreate('Wrong service name', 405);
    die();
}

$service = null;
try {
    $service = new $serviceClass;
} catch (Exception $e) {
    ResponseCreator::responseCreate($e->getMessage(), $e->getCode());
    die();
}

$dayBeginTimestamp = mktime(0, 0, 0);
$service->setPeriod($dayBeginTimestamp, $dayBeginTimestamp + DAY_IN_SECONDS);

$statusCode = 200;
$statusText = 'Ok';

if (!$service->dataExist()) {
    $lastDate = $service->getLastDate();
    $lastDateDayBegin = mktime(0, 0, 0, Date('m', $lastDate), Date('d', $lastDate),
        Date('Y', $lastDate));
    $service->setPeriod($lastDateDayBegin, $lastDateDayBegin + DAY_IN_SECONDS);
    $statusCode = 203;
    $statusText = 'Database don\'t have requesing inforamtion. Last actual weather for ' . Date('d-m-Y', $lastDateDayBegin) . '.';
}

$weatherFactory = new WeatherFactory($service);
//$service->setPeriod(1493010000,1493024400);
ResponseCreator::responseCreate($statusText, $statusCode, $weatherFactory->getWeather());


//$service = new ExternalService();
//var_dump($service->test());
//$service->setPeriod(1493010000,1493024400);
//
//var_dump($service->getCityName());

//$data = $service->getWeatherDataPeriod(1493010000,1493024400); // Mysql
//$data = $service->getWeatherDataPeriod(1487278800,1487300400);
//$adapter = new JsonAdapter($data);
//var_dump($adapter->sumData());
//var_dump($adapter->getPeriod());


