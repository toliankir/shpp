<?php

namespace App\Adapters;

class JsonAdapter implements IAdapter
{
    private $weatherData;

    public function __construct($data)
    {
        $this->weatherData = $data;
    }

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

    private function kelvinToCelsius($kt)
    {
        return intval($kt - 273.15);
    }

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

    public function sumData()
    {
        $sumData = [
            'clouds' => ['all' => 0],
            'rain' => ['3h' => 0],
            'snow' => ['3h' => 0],
            'main' => ['temp' => 0]
        ];

        foreach ($this->weatherData as $value) {
            if (isset($value['rain']['3h'])) $sumData['rain']['3h'] += $value['rain']['3h'];
            if (isset($value['snow']['3h'])) $sumData['snow']['3h'] += $value['snow']['3h'];
            $sumData['clouds']['all'] += $value['clouds']['all'];
            $sumData['main']['temp'] += $value['main']['temp'];
        }

        $sumData['clouds']['all'] = intval($sumData['clouds']['all'] / count($this->weatherData));
        $sumData['main']['temp'] = intval($sumData['main']['temp'] / count($this->weatherData));
        $sumData['rain']['3h'] = $sumData['rain']['3h'] / count($this->weatherData);
        $sumData['snow']['3h'] = $sumData['snow']['3h'] / count($this->weatherData);

        return [
            'timestamp' => intval(($this->weatherData[0]['dt']+$this->weatherData[count($this->weatherData)-1]['dt'])/2),
            'imageType' => $this->getImageType($sumData),
            'temperature' => $this->kelvinToCelsius($sumData['main']['temp'])
        ];
    }

}