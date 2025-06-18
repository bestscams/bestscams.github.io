emailjs.init("GG7YHgtAyAtoBSF8z");

let randomCode = "";

const startButton = document.getElementById("startButton");
const emailNext = document.getElementById("emailNext");
const codeNext = document.getElementById("codeNext");
const codeError = document.getElementById("codeError");
const form = document.getElementById("form");

startButton.addEventListener("click", () => {
  document.getElementById("banner").classList.add("hidden");
  document.getElementById("main").classList.add("hidden");
  document.getElementById("emailStep").classList.remove("hidden");
});

emailNext.addEventListener("click", () => {
  const email = document.getElementById("email").value;

  if (!email.includes("@")) {
    alert("Bitte gültige E-Mail-Adresse eingeben.");
    return;
  }

  randomCode = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("Generierter Code:", randomCode);

  emailjs.send("service_5a0dtz7", "template_wj8fyb2", {
    to_email: email,
    code: randomCode
  })
  .then(() => {
    document.getElementById("emailStep").classList.add("hidden");
    document.getElementById("codeStep").classList.remove("hidden");
  })
  .catch(err => {
    console.error("Fehler beim Senden:", err);
    alert("Fehler beim Senden:\n" + (err.text || JSON.stringify(err)));
  });
});

codeNext.addEventListener("click", () => {
  const codeInput = document.getElementById("code").value;

  if (codeInput === randomCode) {
    document.getElementById("codeStep").classList.add("hidden");
    document.getElementById("questionnaire").classList.remove("hidden");
  } else {
    codeError.classList.remove("hidden");
  }
});

document.getElementById("land").addEventListener("change", (e) => {
  const andere = document.getElementById("landAndere");
  andere.classList.toggle("hidden", e.target.value !== "Andere");
  andere.required = e.target.value === "Andere";
});

["YouTube", "TikTok", "Snapchat", "Discord", "Roblox"].forEach(plattform => {
  const check = document.getElementById(`${plattform}Check`);
  const input = document.getElementById(`${plattform}Link`);

  check.addEventListener("change", () => {
    input.classList.toggle("hidden", !check.checked);
    input.required = check.checked;
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  let answers = "";

  for (let [key, value] of data.entries()) {
    answers += `${key}: ${value}\n`;
  }

  console.log("Gesammelte Antworten:\n", answers);
  document.getElementById("questionnaire").classList.add("hidden");
  document.getElementById("endScreen").classList.remove("hidden");
});
