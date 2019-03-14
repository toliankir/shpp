<?php

namespace App;

use App\Adapters\JsonAdapter;
use App\Adapters\MysqlAdapter;

class WeatherFactory
{
    private $service;

    public function __construct($service)
    {
        $this->service = $service;
    }

    public function getWeather(){
        $adapter = null;
        $serviceClassName = explode('\\',get_class($this->service));

       switch (end($serviceClassName)) {
           case 'MysqlService':
               $adapter = new MysqlAdapter($this->service->getWeatherDataPeriod());
               break;
           case 'JsonService':
               $adapter = new JsonAdapter($this->service->getWeatherDataPeriod());
               break;
           case 'ExternalService':
               break;
       }
       return [
           'city' => $this->service->getCityName(),
           'period' => $adapter->getPeriod(),
           'sum' => $adapter->sumData()
       ];
    }
}