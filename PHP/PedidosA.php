<?php
    require_once 'Conexion.php';
    session_start();
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        $pedidos = $conexion->prepare(
            "SELECT 
                pedidos.PedidoId    PedidoId,
                pedidos.UsuarioId   UsuarioId,
                usuarios.Nombre     Nombre,
                pedidos.Total       Total,
                pedidos.Estado      Estado
            FROM pedidos
            INNER JOIN usuarios ON usuarios.UsuarioId = pedidos.UsuarioId"
        );
        $pedidos->execute();
        $datos = $pedidos->fetchAll(PDO::FETCH_ASSOC);

        if($pedidos->rowCount() > 0) {
            header('Content-Type: application/json');
            echo json_encode($datos);
        } else {
            echo "No hay pedidos existentes";
        }
    }
?>
