<?php
namespace app;

interface IDataService
{
    public function login($user, $password);

    public function addUser($user, $password);

    public function getMessages($timestamp);

    public function sendMessage($user, $message);
}

