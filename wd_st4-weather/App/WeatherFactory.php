<?php

namespace App;

use App\Adapters\ExternalAdapter;
use App\Adapters\JsonAdapter;
use App\Adapters\MysqlAdapter;
use App\Services\IDataService;

class WeatherFactory
{
    private $service;

    public function __construct(IDataService $service)
    {
        $this->service = $service;
    }

    /**
     * Selects adapter for used service and return response with default structure.
     * @return array
     */
    public function getWeather()
    {
        $adapter = null;
        $serviceClassName = explode('\\', get_class($this->service));

        switch (end($serviceClassName)) {
            case 'MysqlService':
                $adapter = new MysqlAdapter($this->service->getWeatherDataPeriod());
                break;
            case 'JsonService':
                $adapter = new JsonAdapter($this->service->getWeatherDataPeriod());
                break;
            case 'ExternalService':
                $adapter = new ExternalAdapter($this->service->getWeatherDataPeriod());
                break;
        }
        return [
            'city' => $this->service->getCityName(),
            'period' => $adapter->getPeriod(),
        ];
    }
}