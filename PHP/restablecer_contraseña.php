<?php
require 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $token = $_POST['token'];
    $nueva_contraseña = $_POST['nueva_contraseña'];
    
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
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecer Contraseña</title>
    </head>
    <body>
    
    <h2>Restablecer Contraseña</h2>
    <form action="restablecer_contraseña.php" method="post">
      <input type="hidden" name="token" value="<?php echo htmlspecialchars($token); ?>">
      <label for="nueva_contraseña">Nueva Contraseña:</label><br>
      <input type="password" id="nueva_contraseña" name="nueva_contraseña" required><br><br>
      
      <input type="submit" value="Restablecer Contraseña">
    </form>
    
    </body>
    </html>
    <?php
}
?>
