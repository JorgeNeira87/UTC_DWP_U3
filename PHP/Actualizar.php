<?php
include 'Conexion.php';
session_start();

if (isset($_SESSION['user_id'])) {
    $usuario_id = $_SESSION['user_id'];
} else {
    echo json_encode(["success" => false, "error" => "Usuario no autenticado"]);
    exit();
}

if (isset($_POST['nombre']) && isset($_POST['correo']) && isset($_POST['telefono'])) {
    $nombre = $conn->real_escape_string($_POST['nombre']);
    $correo = $conn->real_escape_string($_POST['correo']);
    $telefono = $conn->real_escape_string($_POST['telefono']);

    $sql = "UPDATE usuarios SET Nombre='$nombre', Correo='$correo', Telefono='$telefono' WHERE id=$usuario_id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Datos incompletos"]);
}

$conn->close();
?>
