<?php
session_start();
$usuarios = $_POST['usuariosID'];

if (isset($_SESSION['usuario'][$usuarios]) ){
 $datos = $_SESSION['usuarios'][$usuario];



    header('Content-Type: application/json');
    echo json_encode($datos);
} else {
    http_response_code(401);
    echo json_encode(array("error" => "No hay sesión válida"));
}


?>