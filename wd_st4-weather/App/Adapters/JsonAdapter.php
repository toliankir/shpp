<?php

namespace App\Adapters;

class JsonAdapter implements IAdapter
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
        if ((isset ($period['rain']['3h']) && $period['rain']['3h'] > 0.3)
            || (isset ($period['snow']['3h']) && $period['snow']['3h'] > 0.3)) {
            return 'RAIN';
        }
        if ($period['clouds']['all'] > 66) {
            return 'SKY';
        }
        if ($period['clouds']['all'] > 33) {
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
        return intval($kt - 273.15);
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