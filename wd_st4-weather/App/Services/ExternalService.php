<?php

namespace App\Services;

use Exception;

class ExternalService implements IDataService
{
    private $api = [], $weatherData = [], $period = [], $dump;

    public function __construct()
    {
        $config = require_once dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'Config' . DIRECTORY_SEPARATOR . 'ExternalConfig.php';
        $this->api = $this->getApi($config);
        $this->weatherData = $this->getWeatherData();
    }

    /**
     * Return compiled api urls array.
     * @param $config Config array.
     * @return array
     */
    private function getApi($config)
    {
        $api = $config['api'];
        $generatedApi = [];
        foreach ($api as $key => $value) {
            $generatedApi[$key] = $config['host']
                . str_replace('%CITY_ID%', $config['cityId'],
                    str_replace('%API_KEY%', $config['apiKey'], $value));
        }
        return $generatedApi;
    }

    /**
     * If http get response have error header run Exception.
     * @param $headers
     * @throws Exception
     */
    private function checkHeaders($headers)
    {
        if (!in_array('HTTP/1.1 200 OK', $headers)) {
            throw new Exception('Api access error: ' . $headers[0], 500);
        }
    }


    /**
     * Get all weather information from remote service.
     * @return array
     * @throws Exception
     */
    private function getWeatherData()
    {
        $histData = json_decode(@file_get_contents($this->api['apiHist'], true), true);
        $this->checkHeaders($http_response_header);
        $actualData = json_decode(file_get_contents($this->api['api12Hour'], true), true);
        $this->checkHeaders($http_response_header);
        return array_merge(array_reverse($histData), $actualData);
//        $file = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'data' . DIRECTORY_SEPARATOR . 'ext.json';
//        return json_decode(file_get_contents($file, true), true);
    }

    /**
     * Return location name, id parameter don't needed.
     * @return mixed
     */
    public function getCityName()
    {
        $jsonData = json_decode(file_get_contents($this->api['apiCity'], true), true);
        return $jsonData['LocalizedName'];
//        return 'Test City';
    }

    /**
     * Return weather for settled period.
     * @return array
     */
    public function getWeatherDataPeriod()
    {
        return $this->period;
    }

    /**
     * Set period for actual weather.
     * @param $from
     * @param $to
     * @throws Exception
     */
    public function setPeriod($from, $to)
    {
        $this->period = [];
        foreach ($this->weatherData as $weatherItem) {
            $date = 0;
            if (key_exists('EpochDateTime', $weatherItem)) {
                $date = $weatherItem['EpochDateTime'];
            }
            if (key_exists('EpochTime', $weatherItem)) {
                $date = $weatherItem['EpochTime'];
            }
            if ($date === 0) {
                throw new Exception('Incorrect data in response', 500);
            }
            if ($date >= $from && $date < $to) {
                $this->period[] = $weatherItem;
            }
        }
    }

    /**
     * Return true if http response contain weather for requested period.
     * @return bool
     */
    public function dataExist()
    {
        return count($this->period) > 0;
    }

    /**
     * Return last date from external weather response.
     * @return mixed
     */
    public function getLastDate()
    {
        return end($this->weatherData)['EpochDateTime'];
    }
}