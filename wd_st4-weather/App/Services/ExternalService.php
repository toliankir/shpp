<?php

namespace App\Services;

use Exception;

class ExternalService implements IDataService
{
    private $config, $apiLink, $cityApi;

    public function __construct()
    {
        $this->config = require_once dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'Config' . DIRECTORY_SEPARATOR . 'ExternalConfig.php';
//        $this->apiLink = $config['api'] . '/' . $config['cityId'] . '?apikey=' . $config['apiKey'] . $config['parameters'];
//        $this->cityApi = $config['cityApi'] . '/' . $config['cityId'] . '?apikey=' . $config['apiKey'];
    }

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
        $api = $this->config['apiCity'] . '/' . $this->config['cityId'] . '?apikey=' . $this->config['apiKey'];
        if ($this->checkUrl($api)) {
            $jsonData = json_decode(file_get_contents($api, true), true);
            return $jsonData['LocalizedName'];
        } else {
            throw new Exception(get_headers($api)[0], 500);
        }
    }

    /**
     * @return mixed
     * @throws Exception
     */
    public function getWeatherDataPeriod()
    {
        $api = $this->config['api12Hour'] . '/' . $this->config['cityId'] . '?apikey=' . $this->config['apiKey'] . $this->config['parameters'];
        if ($this->checkUrl($api)) {
            $jsonData = json_decode(file_get_contents($api, true), true);
            return $jsonData;
        } else {
            throw new Exception(get_headers($api)[0], 500);
        }

    }

    /**
     * @return mixed
     * @throws Exception
     */
    public function getWeatherDay(){
        $api = $this->config['apiDaily'] . '/' . $this->config['cityId'] . '?apikey=' . $this->config['apiKey'] . $this->config['parameters'];
        if ($this->checkUrl($api)) {
            $jsonData = json_decode(file_get_contents($api, true), true);
            return $jsonData;
        } else {
            throw new Exception(get_headers($api)[0], 500);
        }
    }

    public function setPeriod($from, $to)
    {
        // TODO: Implement setPeriod() method.
    }
}