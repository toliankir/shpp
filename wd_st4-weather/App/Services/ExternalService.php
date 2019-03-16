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

    public function getCityName($id = null)
    {
        $jsonData = json_decode(file_get_contents($this->api['apiCity'], true), true);
        return $jsonData['LocalizedName'];
    }

    public function getWeatherDataPeriod()
    {
        return $this->period;
    }

    /**
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

    public function dataExist()
    {
        return count($this->period) > 0;
    }

    public function getLastDate()
    {
        return end($this->weatherData)['EpochDateTime'];
    }
}