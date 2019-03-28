<?php

namespace App\Services;

use Exception;

class JsonService implements IDataService
{
    private $json, $period = [];

    /**
     * JsonService constructor.
     * @param $config
     * @throws Exception
     */
    public function __construct($config)
    {
        $this->json = $this->readData($config['dataFile']);
    }

    /**
     * Read file with weather information.
     * @param $file
     * @return mixed
     * @throws Exception
     */
    private function readData($file)
    {
        if (!$this->checkFile($file)) {
            throw new Exception('File read error', 500);
        }
        $json = json_decode(file_get_contents($file, true), true);
        if (!$json) {
            throw new Exception('Json read error', 500);
        }
        return $json;
    }

    /**
     * Checks file for existing and readable.
     * @param $file
     * @return bool
     */
    private function checkFile($file)
    {
        return (file_exists($file) && is_readable($file));
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
     * Return city name.
     * @return bool
     */
    public function getCityName()
    {
        return $this->json['city']['name'] ?? false;
    }

    /**
     * Set period for actual weather.
     * @param $from
     * @param $to
     */
    public function setPeriod($from, $to)
    {
        $this->period = [];
        foreach ($this->json['list'] as $key => $value) {
            if ($value['dt'] >= $from && $value['dt'] < $to) {
                $this->period[] = $value;
            }
        }
    }

    /**
     * Return true if file contain weather for requested period.
     * @return bool
     */
    public function dataExist()
    {
        return !empty($this->period);
    }

    /**
     * Return last date from file with weather data.
     * @return mixed
     */
    public function getLastDate()
    {
        return end($this->json['list'])['dt'];
    }
}