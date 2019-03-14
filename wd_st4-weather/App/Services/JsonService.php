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

    private function checkFile($file)
    {
        return (file_exists($file) && is_readable($file));
    }


    public function getWeatherDataPeriod()
    {
        return $this->period;
    }

    public function getCityName($id = null)
    {
        if ($this->json['city']['name']) {
            return $this->json['city']['name'];
        }
        return false;
    }

    public function setPeriod($from, $to)
    {
        $this->period = [];
        foreach ($this->json['list'] as $key => $value) {
            if ($value['dt'] >= $from && $value['dt'] <= $to) {
                $this->period[] = $value;
            }
        }
    }

    public function dataExist(){
        return count($this->period) > 0;
    }

    public function getLastDate() {
        return end($this->json['list'])['dt'];
    }
}