<?php
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


//if (!isset($_GET['service'])) {
//    ResponseCreator::responseCreate('Wrong request', 500);
//    die();
//}
//$serviceClass = '\\App\\Services\\' . ucfirst($_GET['service']) . 'Service';
//if (!class_exists($serviceClass)) {
//    ResponseCreator::responseCreate('Wrong service name', 500);
//    die();
//}
//$service = null;
//try {
//    $service = new $serviceClass;
//} catch (Exception $e) {
//    ResponseCreator::responseCreate($e->getCode(), $e->getMessage());
//}

$service = new ExternalService();
//var_dump($service->test());
//$service->setPeriod(1493010000,1493024400);
//
//$weatherFactory = new WeatherFactory($service);
//ResponseCreator::responseCreate('Ok', 200, $weatherFactory->getWeather());
var_dump($service->getCityName());
var_dump($service->getWeatherDataPeriod());
//$data = $service->getWeatherDataPeriod(1493010000,1493024400); // Mysql
//$data = $service->getWeatherDataPeriod(1487278800,1487300400);
//$adapter = new JsonAdapter($data);
//var_dump($adapter->sumData());
//var_dump($adapter->getPeriod());


