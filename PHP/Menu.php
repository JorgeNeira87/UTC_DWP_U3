<?php
require_once 'Conexion.php';
session_start();

try {
    $menu = $conexion->prepare("SELECT ProductoId, Nombre, Descripcion, Precio, Tipo FROM productos");
    $menu->execute();
    $datos = $menu->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($datos);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>