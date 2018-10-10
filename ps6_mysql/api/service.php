<?php
interface dataService
{
    public function login($user, $password);

    public function addUser($user, $password);

    public function getMessages($timestamp);

    public function sendMessage($user, $message);
}