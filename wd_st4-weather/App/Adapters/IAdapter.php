<?php

namespace App\Adapters;


interface IAdapter
{
    public function getPeriod();
    public function sumData();
}