<?php
header('Content-type: application/json');
$response = [
    'status' => false
];

if (isset($_POST['regexp'], $_POST['str'])) {
    if (preg_match($_POST['regexp'], $_POST['str']) === 1) {
        $response['status'] = true;
    }
}

echo json_encode($response);
