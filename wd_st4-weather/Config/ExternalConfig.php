<?php
return [
    'host' => 'http://dataservice.accuweather.com',
    'api' => [
        'api12Hour' => '/forecasts/v1/hourly/12hour/%CITY_ID%?apikey=%API_KEY%&details=true&metric=true',
        'apiCity' => '/locations/v1/%CITY_ID%?apikey=%API_KEY%',
        'apiHist' => '/currentconditions/v1/%CITY_ID%/historical/24?apikey=%API_KEY%&details=true',
    ],
    'apiKey' => 'GYijgqYtkVHx7Vnh8oAyyX5GmTd7PDuI',
    'cityId' => 324291
];