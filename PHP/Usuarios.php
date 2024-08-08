<?php
session_start();
require_once 'Conexion.php';

?>

  		<?php echo $_SESSION['Nombre']; ?>
          
<td><?php echo $fila['Nombre']; ?></td>
<td><?php echo $fila['Correo']; ?></td>
<td><?php echo $fila['Telefono']; ?></td>
<td><?php echo $fila['Contrasena']; ?></td>
<td><?php echo $fila['rol']; ?></td>

<?php

else{
    ?>
    <tr class="text-center">
    <td colspan="16">No existen registros</td>
    </tr>
    <?php
}
?>
	</body>
  </table>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.js"></script>
<script src="../js/user.js"></script>
</html>