<?php

namespace App\Services;

use Exception;

class ExternalService implements IDataService
{
    private $apiLink, $cityApi;

    public function __construct()
    {
        $config = require_once dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'Config' . DIRECTORY_SEPARATOR . 'ExternalConfig.php';
        $this->apiLink = $config['api'] . '/' . $config['cityId'] . '?apikey=' . $config['apiKey'] . $config['parameters'];
        $this->cityApi = $config['cityApi'] . '/' . $config['cityId'] . '?apikey=' . $config['apiKey'];
    }

//    public function test()
//    {
//        return $this->readData($this->apiLink);
//    }

//    private function readData($url)
//    {
//        if ($this->checkUrl($url)) {
//            return json_decode(file_get_contents($url, true), true);
//        }
//        return false;
//    }
    /**
     * @param $url
     * @return bool
     *
     */
    private function checkUrl($url)
    {
        $headers = get_headers($url);
        if (in_array('HTTP/1.1 200 OK', $headers)) {
            return true;
        }
        return false;
    }

    /**
     * @param null $id
     * @return
     * @throws Exception
     */
    public function getCityName($id = null)
    {
        if ($this->checkUrl($this->cityApi)) {
            $jsonData = json_decode(file_get_contents($this->cityApi, true), true);
            return $jsonData['LocalizedName'];
        } else {
            throw new Exception(get_headers($this->cityApi)[0], 500);
        }
    }

    /**
     * @return mixed
     * @throws Exception
     */
    public function getWeatherDataPeriod()
    {
        if ($this->checkUrl($this->apiLink)) {
            $jsonData = json_decode(file_get_contents($this->apiLink, true), true);
            return $jsonData;
        } else {
            throw new Exception(get_headers($this->cityApi)[0], 500);
        }

    }

    public function setPeriod($from, $to)
    {
        // TODO: Implement setPeriod() method.
    }
}