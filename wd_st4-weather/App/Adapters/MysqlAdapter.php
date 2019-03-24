<?php

namespace App\Adapters;

class MysqlAdapter implements IAdapter
{
    private $weatherData;
    const FULLY_CLOUDS = 0.66;
    const CLOUDS = 0.33;
    const RAIN = 0.3;

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
        if ($period['rain_possibility'] > self::RAIN) {
            return 'RAIN';
        }
        if ($period['clouds'] > self::FULLY_CLOUDS) {
            return 'SKY';
        }
        if ($period['clouds'] > self::CLOUDS) {
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