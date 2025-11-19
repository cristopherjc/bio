<div class="container mt-4">
    <h2>Formulario de Contacto</h2>

    <form action="../scripts/procesar.php" method="POST" class="mt-3">
        <div class="mb-3">
            <label class="form-label">Nombre:</label>
            <input type="text" name="nombre" class="form-control" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Correo:</label>
            <input type="email" name="correo" class="form-control" required>
        </div>

        <div class="mb-3">
            <label class="form-label">Mensaje:</label>
            <textarea name="mensaje" class="form-control" rows="4" required></textarea>
        </div>

        <button class="btn btn-primary" type="submit">Enviar</button>
    </form>
</div>
