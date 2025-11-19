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
    } catch (error) {
      app.innerHTML = "<p>Error al cargar página.</p>";
    }
  }
});
