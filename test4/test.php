<?php
/**
 * Created by PhpStorm.
 * User: tolian
 * Date: 23.10.18
 * Time: 23:41
 */

function getStringFromTemplate(){
    $test = 12345;
    ob_start();
    include "template.php";
    return ob_get_clean();
}
