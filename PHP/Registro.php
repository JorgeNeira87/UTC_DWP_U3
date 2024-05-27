<?php
require_once 'conexion.php';

$usuario = $_POST['usuario'];
$correo = $_POST['correo'];
$telefono = $_POST['telefono'];
$genero = $_POST['genero'];
$contrasena = $_POST['contrasena'];

// Encriptar la contraseña
$contrasena_encriptada = password_hash($contrasena, PASSWORD_DEFAULT);

try {
    $ingreso = $conexion->prepare("INSERT INTO usuarios(Nombre, Correo, Telefono, Genero, Contrasena) VALUES (:usuario, :correo, :telefono, :genero, :contrasena)");
    $ingreso->bindParam(':usuario', $usuario);
    $ingreso->bindParam(':correo', $correo);
    $ingreso->bindParam(':telefono', $telefono);
    $ingreso->bindParam(':genero', $genero);
    $ingreso->bindParam(':contrasena', $contrasena_encriptada); // Usar la contraseña encriptada
    $ingreso->execute();    
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>
