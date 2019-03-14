<?php


namespace App\Services;


interface IDataService
{
 public function getCityName($id);
 public function getWeatherDataPeriod();
 public function setPeriod($from, $to);
 public function dataExist();
 public function getLastDate();
}