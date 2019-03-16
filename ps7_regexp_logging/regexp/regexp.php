<?php
$pattern = $_POST['regexp'];
$str = $_POST['str'];
$response = [
    'status' => false,
    'pattern' => $pattern,
    'string' => $str
];

if (preg_match($pattern, $str) === 1) {
    $response['status'] = true;
}

echo json_encode($response);
