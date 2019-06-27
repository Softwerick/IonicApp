<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

include 'config.php';

$postjson = json_decode(file_get_contents('php://input'), true);

if($postjson['action']=='register'){
    $query = mysqli_query($mysqli, "INSERT INTO usuario SET nome = '$postjson[nome]', email = '$postjson[email]', senha = '$postjson[senha]'");

    if($query) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false, 'msg'=>'error, please try again'));

    echo $result;
}
elseif($postjson['action']=='login'){
    $query = mysqli_query($mysqli, "SELECT * FROM usuario WHERE email = '$postjson[email]' AND senha = '$postjson[senha]'");

    $count = mysqli_num_rows($query);

    if($count) $result = json_encode(array('success'=>true));
    else $result = json_encode(array('success'=>false, 'msg'=>'Invalid email or password'));

    echo $result;
}
?>