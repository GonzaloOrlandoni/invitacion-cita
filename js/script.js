const btnYes = document.getElementById("btn-yes");
const btnNo = document.getElementById("btn-no");
const buttonsContainer = document.getElementById("buttons-container");
const datePickerContainer = document.getElementById("date-picker-container");
const questionText = document.getElementById("question-text");
const emojiDisplay = document.getElementById("emoji-display");
const btnSubmit = document.getElementById("btn-submit");
const finalMessage = document.getElementById("final-message");
const dateTimeInput = document.getElementById("meeting-time");

let noButtonScale = 1;

// Función para achicar el botón "No" y agrandar el "Sí"
const shrinkNoButton = () => {
  noButtonScale -= 0.15; // Se achica un 15% por cada intento

  if (noButtonScale <= 0.1) {
    // Cuando es muy chiquito, directamente lo desaparecemos
    btnNo.style.display = "none";
  } else {
    btnNo.style.transform = `scale(${noButtonScale})`;
  }

  // Hacemos que el botón 'Sí' crezca un poquito para que sea la única opción tentadora
  const yesScale = 1 + (1 - noButtonScale) * 0.4;
  btnYes.style.transform = `scale(${yesScale})`;
};

// Escuchamos tanto el pasar el mouse por encima (PC) como el tocar la pantalla (Mobile)
btnNo.addEventListener("mouseover", shrinkNoButton);
btnNo.addEventListener("touchstart", (e) => {
  e.preventDefault();
  shrinkNoButton();
});

// Evento cuando dice "¡SÍ!"
btnYes.addEventListener("click", () => {
  // Las copas se mantienen iguales (🍷🍷)

  // Ocultamos la pregunta y los botones
  buttonsContainer.style.display = "none";
  questionText.style.display = "none";

  // Mostramos el selector de fecha
  datePickerContainer.style.display = "flex";

  // Tiramos confeti suave para celebrar
  confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 },
    colors: ["#ff4b82", "#ff9a9e", "#ffffff"],
  });
});

// Evento cuando confirma la fecha
btnSubmit.addEventListener("click", () => {
  if (!dateTimeInput.value) {
    alert("¡Por favor elige un día y horario antes de confirmar! 🥺");
    return;
  }

  // Formatear la fecha y mostrarla (Ej: Sábado 15 de agosto, 18:30 Hs)
  const dateObj = new Date(dateTimeInput.value);
  const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const diaSemana = dias[dateObj.getDay()];
  const diaMes = dateObj.getDate();
  const mes = meses[dateObj.getMonth()];
  const hora = dateObj.getHours().toString().padStart(2, "0");
  const minutos = dateObj.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${diaSemana} ${diaMes} de ${mes}, ${hora}:${minutos} Hs`;
  document.getElementById("confirmed-date").innerText = formattedDate;

  // Ocultamos el selector y mostramos el mensaje final
  datePickerContainer.style.display = "none";
  finalMessage.style.display = "block";

  // Las copas se mantienen iguales

  // Lanzamos confeti constante durante 3 segundos
  var duration = 3 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ["#ff4b82", "#ff9a9e", "#ffffff", "#ffd700"],
      }),
    );
  }, 250);
});
