<?php
require 'conexion.php';

// Recibe los datos del formulario
$correo = $_POST['correo'];
$telefono = $_POST['telefono'];
$contraseña = $_POST['contraseña'];
$nombre = $_POST['nombre'];

$hashed_password = password_hash($contraseña, PASSWORD_DEFAULT);

// Inserta los datos en la base de datos
$sql = "INSERT INTO Usuarios (correo, telefono, contraseña, nombre)
VALUES ('$correo', '$telefono', '$hashed_password', '$nombre')";

if ($conn->query($sql) === TRUE) {
    echo "Registro exitoso";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cierra la conexión
$conn->close();
?>
