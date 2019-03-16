<?php

namespace App\Services;

use Exception;

class JsonService implements IDataService
{
    private $json, $period = [];

    /**
     * JsonService constructor.
     * @throws Exception
     */
    public function __construct()
    {
        $config = require_once dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'Config' . DIRECTORY_SEPARATOR . 'JsonConfig.php';
        $this->json = $this->readData(dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . $config['dataFile']);
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
        if ($this->json['city']['name']) {
            return $this->json['city']['name'];
        }
        return false;
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
    public function dataExist(){
        return count($this->period) > 0;
    }

    /**
     * Return last date from file with weather data.
     * @return mixed
     */
    public function getLastDate() {
        return end($this->json['list'])['dt'];
    }
}