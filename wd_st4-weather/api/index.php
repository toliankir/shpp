<?php
const DAY_IN_SECONDS = 24 * 60 * 60 - 1;

spl_autoload_register(function ($className) {
    $file = dirname(__DIR__) . DIRECTORY_SEPARATOR . str_replace('\\', DIRECTORY_SEPARATOR, $className) . '.php';
    if (file_exists($file)) {
        require $file;
    }
    return false;
});

use App\Adapters\{
    JsonAdapter, MysqlAdapter, ExternalAdapter
};
use App\ConfigFactory;
use App\Services\{
    IDataService, JsonService, MysqlService, ExternalService
};
use App\ResponseCreator;
use App\WeatherFactory;

if (!isset($_GET['service'])) {
    ResponseCreator::responseCreate('Wrong request', 400);
    die();
}

$config = ConfigFactory::getConfig($_GET['service']);
if (!$config) {
    ResponseCreator::responseCreate('Config file access error', 503);
    die();
}

$serviceClass = '\\App\\Services\\' . ucfirst($_GET['service']) . 'Service';
if (!class_exists($serviceClass)) {
    ResponseCreator::responseCreate('Wrong service name', 405);
    die();
}

$service = null;
try {
    $service = new $serviceClass($config);
} catch (Exception $e) {
    ResponseCreator::responseCreate($e->getMessage(), $e->getCode());
    die();
}

if (!($service instanceof IDataService)) {
    ResponseCreator::responseCreate('Wrong service class type', 405);
    die();
}

date_default_timezone_set('UTC');
$timeOffset = 0;
if (isset($_GET['UTCOffset'])) {
    $timeOffset = $_GET['UTCOffset'] * 60;
}

$dayBeginTimestamp = mktime(0, 0, 0);
$service->setPeriod($dayBeginTimestamp + $timeOffset, $dayBeginTimestamp + DAY_IN_SECONDS + $timeOffset);

$statusCode = 200;
$statusText = 'Ok';

if (!$service->dataExist()) {
    $lastDate = $service->getLastDate();
    $lastDateDayBegin = mktime(0, 0, 0, Date('m', $lastDate), Date('d', $lastDate),
        Date('Y', $lastDate));
    $service->setPeriod($lastDateDayBegin + $timeOffset, $lastDateDayBegin + DAY_IN_SECONDS + $timeOffset);
    $statusCode = 203;
    $statusText = 'Database don\'t have requesting information. Last actual weather for ' . Date('d-m-Y', $lastDateDayBegin) . '.';
}

$weatherFactory = new WeatherFactory($service);
ResponseCreator::responseCreate($statusText, $statusCode, $weatherFactory->getWeather());




