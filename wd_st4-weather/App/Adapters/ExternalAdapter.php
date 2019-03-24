<?php

namespace App\Adapters;


class ExternalAdapter implements IAdapter
{
    private $weatherData;
    const SECONDS_IN_MINUTE = 60;
    const RAIN_ICONS_ID = [12, 13, 14, 15, 16, 17, 18, 25, 26, 27, 39, 40, 43, 44];
    const FLASH_ICONS_ID = [41, 42];
    const FULLY_CLOUDS = 66;
    const CLOUDS = 33;


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
        if (in_array($period['WeatherIcon'], self::FLASH_ICONS_ID)) {
            return 'FLASH';
        }
        if (in_array($period['WeatherIcon'], self::RAIN_ICONS_ID)) {
            return 'RAIN';
        }
        if ($period['CloudCover'])
            if ($period['CloudCover'] > self::FULLY_CLOUDS) {
                return 'SKY';
            }
        if ($period['CloudCover'] > self::CLOUDS) {
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