<?php
require 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $token = $_POST['token'];
    $nueva_contraseña = $_POST['contrasena'];
    
    $sql = "SELECT * FROM usuarios WHERE token_recuperacion = :token AND token_expiracion > NOW()";
    $stmt = $conexion->prepare($sql);  // Cambiado de $conn a $conexion
    $stmt->bindParam(':token', $token);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        // Encriptar la nueva contraseña
        $hashed_password = password_hash($nueva_contraseña, PASSWORD_DEFAULT);
        
        $sql = "UPDATE usuarios SET Contrasena = :hashed_password, token_recuperacion = NULL, token_expiracion = NULL WHERE token_recuperacion = :token";
        $stmt = $conexion->prepare($sql);  // Cambiado de $conn a $conexion
        $stmt->bindParam(':hashed_password', $hashed_password);
        $stmt->bindParam(':token', $token);

        if ($stmt->execute()) {
            echo "Contraseña actualizada exitosamente.";
        } else {
            echo "Error: " . implode(", ", $stmt->errorInfo());
        }
    } else {
        echo "El enlace de recuperación es inválido o ha expirado.";
    }
    
    $conexion = null;  // Cambiado de $conn a $conexion
} else if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['token'])) {
    $token = $_GET['token'];
    ?>

    <?php
}
?>
