<?php
require 'Conexion.php';
session_start();

if (isset($_SESSION['ID'])) {
    $usuario_id = $_SESSION['ID'];
} else {
    echo json_encode(["success" => false, "error" => "Usuario no autenticado"]);
    exit();
}

if (isset($_POST['correo']) && isset($_POST['telefono'])) {
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];

    $sql = "UPDATE usuarios SET Correo='$correo', Telefono='$telefono' WHERE UsuarioId=$usuario_id";

    if ($conexion->query($sql) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $conexion->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Datos incompletos"]);
}

$conexion->close();
?>
