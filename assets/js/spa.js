document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  // Sirve para detectar si el formulario manda error o todo bien
  const params = new URLSearchParams(window.location.search);

  if (params.get("ok") == 1) {
    Swal.fire({
      icon: "success",
      title: "¡Mensaje enviado!",
      text: "Gracias por contactarme, responderé lo antes posible.",
      confirmButtonColor: "#3085d6",
    });
    // limpia la url para que no se vuelva a mostrar la alerta
    history.replaceState({}, "", "index.php");
  }

  if (params.get("error") == 1) {
    Swal.fire({
      icon: "error",
      title: "Campos incompletos",
      text: "Por favor llena todos los campos antes de enviar.",
      confirmButtonColor: "#d33",
    });
    // limpia la url para que no se vuelva a mostrar la alerta
    history.replaceState({}, "", "index.php");
  }

  // carga la página inicial
  const initialPage = params.get("page") || "inicio.php";
  loadPage(initialPage);

  // configura el SPA
  document.querySelectorAll(".spa-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      loadPage(page);
    });
  });

  async function loadPage(page) {
    try {
      const response = await fetch("/pages/" + page);
      const html = await response.text();
      app.innerHTML = html;

      // --- NUEVO: captura formularios de contacto en la página cargada ---
      const form = app.querySelector("form");
      if (form) {
        form.addEventListener("submit", async (e) => {
          e.preventDefault(); // evita que la página recargue
          const formData = new FormData(form);

          try {
            const res = await fetch(form.action, {
              method: form.method,
              body: formData,
            });

            // leer la respuesta
            const text = await res.text();

            Swal.fire({
              icon: "success",
              title: "¡Mensaje enviado!",
              text: "Gracias por contactarme, responderé lo antes posible.",
              confirmButtonColor: "#3085d6",
            });

            form.reset(); // limpia el formulario
          } catch (err) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudo enviar el mensaje",
              confirmButtonColor: "#d33",
            });
          }
        });
      }
    } catch (error) {
      app.innerHTML = "<p>Error al cargar página.</p>";
    }
  }
});
