<?php

namespace App\Adapters;


class ExternalAdapter implements IAdapter
{
    private $weatherData;
    const SECONDS_IN_MINUTE = 60;

    public function __construct($data)
    {
        $this->weatherData = $data;
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
                'imageType' => 'SUN',
                'temperature' => intval($temperature)
            ];
        }
        return $result;
    }
}