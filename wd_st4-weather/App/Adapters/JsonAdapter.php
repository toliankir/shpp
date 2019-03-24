<?php

namespace App\Adapters;

class JsonAdapter implements IAdapter
{
    private $weatherData;
    const FULLY_CLOUDS = 66;
    const CLOUDS = 33;
    const RAIN = 0.3;
    const DIFF_KELVIN_CELSIUS = 273.15;

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
        if ((isset ($period['rain']['3h']) && $period['rain']['3h'] > self::RAIN)
            || (isset ($period['snow']['3h']) && $period['snow']['3h'] > self::RAIN)) {
            return 'RAIN';
        }
        if ($period['clouds']['all'] > self::FULLY_CLOUDS) {
            return 'SKY';
        }
        if ($period['clouds']['all'] > self::CLOUDS) {
            return 'SKYSUN';
        }
        return 'SUN';
    }

    /**
     * Converts kelvin degree to celsius
     * @param $kt
     * @return int
     */
    private function kelvinToCelsius($kt)
    {
        return intval($kt - self::DIFF_KELVIN_CELSIUS);
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
                'timestamp' => $value['dt'],
                'imageType' => $this->getImageType($value),
                'temperature' => $this->kelvinToCelsius($value['main']['temp'])
            ];
        }
        return $result;
    }

}