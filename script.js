let randomCode = "";
const emailStep = document.getElementById("emailStep");
const codeStep = document.getElementById("codeStep");
const welcome = document.getElementById("welcome");
const main = document.getElementById("main");

document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("banner").classList.add("hidden");
  main.classList.add("hidden");
  emailStep.classList.remove("hidden");
});

document.getElementById("emailNext").addEventListener("click", () => {
  const email = document.getElementById("email").value;

  if (!email.includes("@")) return alert("Bitte gültige E-Mail eingeben.");

  // Zufälliger 6-stelliger Code
  randomCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Sende E-Mail über Formspree
  fetch("https://formspree.io/f/mldnlwny", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      message: `Dein Bestätigungscode: ${randomCode}`
    })
  });

  emailStep.classList.add("hidden");
  codeStep.classList.remove("hidden");
});

document.getElementById("codeNext").addEventListener("click", () => {
  const codeInput = document.getElementById("code").value;
  const error = document.getElementById("codeError");

  if (codeInput === randomCode) {
    codeStep.classList.add("hidden");
    welcome.classList.remove("hidden");
  } else {
    error.classList.remove("hidden");
  }
});
