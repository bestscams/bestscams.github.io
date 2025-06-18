// EmailJS initialisieren
emailjs.init("GG7YHgtAyAtoBSF8z"); // z. B. user_ABC123xyz

let randomCode = "";

const emailStep = document.getElementById("emailStep");
const codeStep = document.getElementById("codeStep");
const welcome = document.getElementById("welcome");
const main = document.getElementById("main");

const startButton = document.getElementById("startButton");
const emailNext = document.getElementById("emailNext");
const codeNext = document.getElementById("codeNext");
const codeError = document.getElementById("codeError");

startButton.addEventListener("click", () => {
  document.getElementById("banner").classList.add("hidden");
  main.classList.add("hidden");
  emailStep.classList.remove("hidden");
});

emailNext.addEventListener("click", () => {
  const email = document.getElementById("email").value;

  if (!email.includes("@")) {
    alert("Bitte gültige E-Mail-Adresse eingeben.");
    return;
  }

  // 6-stelliger Zufallscode generieren
  randomCode = Math.floor(100000 + Math.random() * 900000).toString();

  // E-Mail über EmailJS an den Benutzer senden
  emailjs.send("service_5a0dtz7", "template_wj8fyb2", {
    to_email: email,
    code: randomCode
  })
  .then(() => {
    console.log("Bestätigungscode gesendet!");
    emailStep.classList.add("hidden");
    codeStep.classList.remove("hidden");
  })
  .catch((error) => {
    console.error("Fehler beim Senden der E-Mail:", error);
    alert("E-Mail konnte nicht gesendet werden.");
  });
});

codeNext.addEventListener("click", () => {
  const codeInput = document.getElementById("code").value;

  if (codeInput === randomCode) {
    codeStep.classList.add("hidden");
    welcome.classList.remove("hidden");
  } else {
    codeError.classList.remove("hidden");
  }
});
