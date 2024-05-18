<?php
require_once 'Conexion.php';
session_start();

$usuario = $_POST['username'];
$contrasena = $_POST['password'];

try {
    $ingreso = $conexion->prepare("SELECT UsuarioId, Nombre, Foto, Correo, Telefono, Genero, Contrasena FROM usuarios WHERE Nombre = :usuario AND Contrasena = :contrasena");
    $ingreso->bindParam(':usuario', $usuario);
    $ingreso->bindParam(':contrasena', $contrasena);
    $ingreso->execute();
    $datos = $ingreso->fetchAll(PDO::FETCH_ASSOC);
    
    if($ingreso->rowCount() > 0) {
        foreach ($datos as $fila) {
            $_SESSION['ID']         = $fila['UsuarioId'];
            $_SESSION['Nombre']     = $fila['Nombre'];
            $_SESSION['Foto']       = $fila['Foto'];
            $_SESSION['Correo']     = $fila['Correo'];
            $_SESSION['Telefono']   = $fila['Telefono'];
            $_SESSION['Genero']     = $fila['Genero'];
            $_SESSION['Contrasena'] = $fila['Contrasena'];
        }
        echo($_SESSION['ID']);
    } else {
        echo("false");
    }
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>