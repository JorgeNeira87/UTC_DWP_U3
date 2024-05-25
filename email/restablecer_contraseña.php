<?php
require 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $token = $_POST['token'];
    $nueva_contraseña = $_POST['nueva_contraseña'];
    
    $sql = "SELECT * FROM Usuarios WHERE token_recuperacion = '$token' AND token_expiracion > NOW()";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $hashed_password = password_hash($nueva_contraseña, PASSWORD_DEFAULT);
        
        $sql = "UPDATE Usuarios SET contraseña = '$hashed_password', token_recuperacion = NULL, token_expiracion = NULL WHERE token_recuperacion = '$token'";
        
        if ($conn->query($sql) === TRUE) {
            echo "Contraseña actualizada exitosamente.";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "El enlace de recuperación es inválido o ha expirado.";
    }
    
    $conn->close();
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
      <input type="hidden" name="token" value="<?php echo $token; ?>">
      <label for="nueva_contraseña">Nueva Contraseña:</label><br>
      <input type="password" id="nueva_contraseña" name="nueva_contraseña" required><br><br>
      
      <input type="submit" value="Restablecer Contraseña">
    </form>
    
    </body>
    </html>
    <?php
}
?>
