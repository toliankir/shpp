<?php

namespace App\Adapters;

class MysqlAdapter implements IAdapter
{
    private $weatherData;

    public function __construct($data)
    {
        $this->weatherData = $data;
    }

    /**
     * Calculates image type for settled weather.
     * @param $period
     * @return string
     */
    private function getImageType($period)
    {
        if ($period['rain_possibility'] > 0.3) {
            return 'RAIN';
        }
        if ($period['clouds'] > 0.6) {
            return 'SKY';
        }
        if ($period['clouds'] > 0.3) {
            return 'SKYSUN';
        }
        return 'SUN';
    }

    /**
     * Converts service response to default weather response structure.
     * @return array
     */
    public function getPeriod()
    {
        $result = [];
        foreach ($this->weatherData as $value) {
            $result[] = [
                'timestamp' => $value['timestamp'],
                'imageType' => $this->getImageType($value),
                'temperature' => $value['temperature']];
        }
        return $result;
    }
}