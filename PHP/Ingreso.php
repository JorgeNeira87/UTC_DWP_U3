<?php
require_once 'Conexion.php';
session_start();

$usuario = $_POST['usuario'];
$contrasena = $_POST['contrasena'];

try {
    $ingreso = $conexion->prepare("SELECT UsuarioId, Nombre, Foto, Correo, Telefono, Genero, Contrasena, rol FROM usuarios WHERE Nombre = :usuario AND Contrasena = :contrasena");
    $ingreso->bindParam(':usuario', $usuario);
    $ingreso->bindParam(':contrasena', $contrasena);
    $ingreso->execute();
    $datos = $ingreso->fetchAll(PDO::FETCH_ASSOC);
    
    if($ingreso->rowCount() > 0) {
        $_SESSION['usuarios']= array();

        foreach ($datos as $fila) {
            $_SESSION['usuarios'][$fila['UsuarioId']] = array(
                'ID'            => $fila['UsuarioId'],
                'Nombre'        => $fila['Nombre'],
                'Foto'          => $fila['Foto'],
                'Correo'        => $fila['Correo'],
                'Telefono'      => $fila['Telefono'],
                'Genero'        => $fila['Genero'],
                'Contrasena'    => $fila['Contrasena'],
                'Rol'           => $fila['rol']
            );
            header('Content-Type: application/json');
            echo json_encode($_SESSION['usuarios'][$fila['UsuarioId']]);
        }
    } else {
        echo("false");
    }
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>