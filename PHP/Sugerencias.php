<?php
require_once 'Conexion.php';

$sugerencia = $_POST['sugerencia'];
try {
    $buzon = $conexion->prepare("INSERT INTO sugerencias(Sugerencia) VALUES (:sugerencia)");
    $buzon->bindParam(':sugerencia', $sugerencia);
    $buzon->execute();    
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>