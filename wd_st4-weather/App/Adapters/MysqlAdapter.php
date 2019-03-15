<?php

namespace App\Adapters;

class MysqlAdapter implements IAdapter
{
    private $weatherData;

    public function __construct($data)
    {
        $this->weatherData = $data;
    }

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
//
//    public function sumData()
//    {
//        $sumData = [
//            'temperature' => 0,
//            'rain_possibility' => 0,
//            'clouds' => 0
//        ];
//
//        foreach ($this->weatherData as $value) {
//            $sumData['temperature'] += $value['temperature'];
//            $sumData['rain_possibility'] += $value['rain_possibility'];
//            $sumData['clouds'] += $value['clouds'];
//        }
//
//        foreach ($sumData as $key => $value) {
//            $sumData[$key] = $value / count($this->weatherData);
//        }
//
//        return [
//            'timestamp' => intval(($this->weatherData[0]['timestamp'] + $this->weatherData[count($this->weatherData) - 1]['timestamp']) / 2),
//            'imageType' => $this->getImageType($sumData),
//            'temperature' => $sumData['temperature']
//        ];
//    }

}