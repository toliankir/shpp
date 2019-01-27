<?php
namespace App;

interface IDataService
{
    public function login($user, $password);

    public function addUser($user, $password);

    public function getMessages($id, $timestamp);

    public function sendMessage($user, $message);
}
