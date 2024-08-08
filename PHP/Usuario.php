<?php
session_start();
$usuarios = $_POST['usuarioID'];

if (isset($_SESSION['usuarios'][$usuarios]) ){
 $datos = $_SESSION['usuarios'][$usuario];



    header('Content-Type: application/json');
    echo json_encode($datos);
} else {
    http_response_code(401);
    echo json_encode(array("error" => "No hay sesión válida"));
}


?>