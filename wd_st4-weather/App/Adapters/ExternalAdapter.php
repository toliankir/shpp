<?php

namespace App\Adapters;


class ExternalAdapter implements IAdapter
{
    private $weatherData;
    const SECONDS_IN_MINUTE = 60;
    const RAIN_ICONS_ID = [12, 13, 14, 15, 16, 17, 18, 25, 26, 27, 39, 40, 43, 44];
    const FLASH_ICONS_ID = [41, 42];


    public function __construct($data)
    {
        $this->weatherData = $data;
    }

    private function getImageType($period)
    {
        if (in_array($period['WeatherIcon'], self::FLASH_ICONS_ID)) {
            return 'FLASH';
        }
        if (in_array($period['WeatherIcon'], self::RAIN_ICONS_ID)) {
            return 'RAIN';
        }
        if ($period['CloudCover'])
            if ($period['CloudCover'] > 66) {
                return 'SKY';
            }
        if ($period['CloudCover'] > 33) {
            return 'SKYSUN';
        }
        return 'SUN';
    }

    public function getPeriod()
    {
        $result = [];
        foreach ($this->weatherData as $value) {
            $date = 0;
            if (key_exists('EpochDateTime', $value)) {
                $date = $value['EpochDateTime'];
            }
            if (key_exists('EpochTime', $value)) {
                $date = $value['EpochTime'];
            }

            $temperature = 0;
            if (key_exists('Metric', $value['Temperature'])) {
                $temperature = $value['Temperature']['Metric']['Value'];
            }
            if (key_exists('Value', $value['Temperature'])) {
                $temperature = $value['Temperature']['Value'];
            }

            $result[] = [
                'timestamp' => $date,
                'imageType' => $this->getImageType($value),
                'temperature' => intval($temperature)
            ];
        }
        return $result;
    }
}