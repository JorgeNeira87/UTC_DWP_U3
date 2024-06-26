<?php
session_start();

if (isset($_SESSION['ID']) && isset($_SESSION['Nombre']) && isset($_SESSION['Foto']) && isset($_SESSION['Correo']) && isset($_SESSION['Telefono']) && isset($_SESSION['Genero']) && isset($_SESSION['Contrasena'])) {
    $datos = array(
    "ID" => $_SESSION['ID'],
    "Nombre" => $_SESSION['Nombre'],
    "Foto" => $_SESSION['Foto'],
    "Correo" => $_SESSION['Correo'],
    "Telefono" => $_SESSION['Telefono'],
    "Genero" => $_SESSION['Genero'],
    "Contrasena" => $_SESSION['Contrasena']
    );

    header('Content-Type: application/json');
    echo json_encode($datos);
} else {
    http_response_code(401);
    echo json_encode(array("error" => "No hay sesión válida"));
}


?>