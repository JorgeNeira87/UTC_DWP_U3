<?php
require_once 'Conexion.php';

$usuario = $_POST['username'];
$correo = $_POST['correo'];
$telefono = $_POST['telefono'];
$genero = $_POST['inlineRadioOptions'];
$contrasena = $_POST['contrasena'];

try {
    $ingreso = $conexion->prepare("INSERT INTO usuarios(Nombre, Correo, Telefono, Genero, Contrasena) VALUES (:usuario, :correo, :telefono, :genero, :contrasena)");
    $ingreso->bindParam(':usuario', $usuario);
    $ingreso->bindParam(':correo', $correo);
    $ingreso->bindParam(':telefono', $telefono);
    $ingreso->bindParam(':genero', $genero);
    $ingreso->bindParam(':contrasena', $contrasena);
    $ingreso->execute();    
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>