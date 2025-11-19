<?php
require '../db/db.php';

// Validar campos vacíos
if (empty($_POST["nombre"]) || empty($_POST["correo"]) || empty($_POST["mensaje"])) {
    header("Location: ../index.php?error=1&page=contacto.php");
    exit;
}

$nombre = trim($_POST["nombre"]);
$correo = trim($_POST["correo"]);
$mensaje = trim($_POST["mensaje"]);

// Validar correo
$correoValidado = filter_var($correo, FILTER_VALIDATE_EMAIL);
if (!$correoValidado) {
    header("Location: ../index.php?error=1&page=contacto.php");
    exit;
}

// Limitar longitud del mensaje
if (strlen($mensaje) > 1000) {
    header("Location: ../index.php?error=1&page=contacto.php");
    exit;
}

// Consulta preparada
$stmt = $db->prepare("INSERT INTO mensajes (nombre, correo, mensaje) VALUES (?, ?, ?)");
$stmt->execute([$nombre, $correoValidado, $mensaje]);

header("Location: ../index.php?ok=1&page=contacto.php");
exit;
?>
