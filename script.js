emailjs.init("GG7YHgtAyAtoBSF8z");

let randomCode = "";

// Navigation
document.getElementById("startButton").addEventListener("click", () => {
  document.getElementById("mainScreen").classList.add("hidden");
  document.getElementById("emailStep").classList.remove("hidden");
});

document.getElementById("emailNext").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();

  if (!email.includes("@")) {
    alert("Bitte gültige E-Mail-Adresse eingeben.");
    return;
  }

  randomCode = Math.floor(100000 + Math.random() * 900000).toString();
  console.log("Generierter Code:", randomCode);

  emailjs.send("service_5a0dtz7", "template_wj8fyb2", {
    to_email: email,
    code: randomCode
  }).then(() => {
    document.getElementById("emailStep").classList.add("hidden");
    document.getElementById("codeStep").classList.remove("hidden");
  }).catch(err => {
    console.error("Fehler beim Senden:", err);
    alert("Fehler beim Senden:\n" + (err.text || JSON.stringify(err)));
  });
});

document.getElementById("codeNext").addEventListener("click", () => {
  const codeInput = document.getElementById("code").value.trim();

  if (codeInput === randomCode) {
    document.getElementById("codeStep").classList.add("hidden");
    startQuestionnaire();
  } else {
    document.getElementById("codeError").classList.remove("hidden");
  }
});

function startQuestionnaire() {
  document.getElementById("form").classList.remove("hidden");
  const firstStep = document.querySelector(".questionStep");
  firstStep.classList.add("active");
}

// Dynamik für "Andere" Länderfeld
document.getElementById("land").addEventListener("change", e => {
  const andere = document.getElementById("landAndere");
  if (e.target.value === "Andere") {
    andere.classList.remove("hidden");
    andere.required = true;
  } else {
    andere.classList.add("hidden");
    andere.required = false;
  }
});

// Navigation durch Fragen
const steps = document.querySelectorAll(".questionStep");
steps.forEach((step, index) => {
  const nextBtn = step.querySelector(".nextBtn");
  const inputs = step.querySelectorAll("input, textarea, select");

  // Validierung aktivieren
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      const isValid = Array.from(inputs).every(el => {
        if (el.type === "checkbox") return el.checked;
        if (el.hasAttribute("minlength")) return el.value.length >= parseInt(el.getAttribute("minlength"));
        if (el.hasAttribute("required")) return el.value.trim() !== "";
        return true;
      });
      if (nextBtn) nextBtn.disabled = !isValid;
    });
  });

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      step.classList.remove("active");
      if (steps[index + 1]) {
        steps[index + 1].classList.add("active");
      }
    });
  }
});

// Formular abschicken
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.target);
  let output = "";

  for (let [key, value] of data.entries()) {
    output += `${key}: ${value}\n`;
  }

  console.log("Bewerbung gesendet:\n" + output);

  document.getElementById("form").classList.add("hidden");
  document.getElementById("endScreen").classList.remove("hidden");
});
