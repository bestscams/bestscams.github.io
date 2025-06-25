emailjs.init("GG7YHgtAyAtoBSF8z");

let currentCode = "";
let sending = false;

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

document.getElementById("sendCodeBtn").addEventListener("click", () => {
  if (sending) return;

  const email = document.getElementById("email").value.trim();
  if (!email) return alert("Bitte E-Mail eingeben.");

  sending = true;
  document.getElementById("status").textContent = "Lade...";
  currentCode = generateCode();

  emailjs.send("service_5a0dtz7", "template_wj8fyb2", {
    to_email: email,
    code: currentCode
  }).then(() => {
    document.getElementById("step-email").classList.add("hidden");
    document.getElementById("step-code").classList.remove("hidden");
  }).catch(() => {
    alert("Fehler beim Senden der Mail.");
  }).finally(() => {
    sending = false;
    document.getElementById("status").textContent = "";
  });
});

document.getElementById("verifyCodeBtn").addEventListener("click", () => {
  const code = document.getElementById("verificationCode").value.trim();
  if (code === currentCode) {
    document.getElementById("step-code").classList.add("hidden");
    document.getElementById("step-about").classList.remove("hidden");
  } else {
    document.getElementById("codeStatus").textContent = "❌ Falscher Code.";
  }
});

function toggleHint(id) {
  const el = document.getElementById(id);
  el.classList.toggle("collapsed");
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

function setupTextCounter(textareaId, counterId, buttonId) {
  const textarea = document.getElementById(textareaId);
  const counter = document.getElementById(counterId);
  const button = document.getElementById(buttonId);

  textarea.addEventListener("input", () => {
    const wordCount = countWords(textarea.value);
    counter.textContent = `${wordCount}/500`;
    button.disabled = wordCount < 500;
  });
}

setupTextCounter("aboutText", "wordCount1", "toWhyBtn");
setupTextCounter("whyText", "wordCount2", "finishBtn");

document.getElementById("toWhyBtn").addEventListener("click", () => {
  document.getElementById("step-about").classList.add("hidden");
  document.getElementById("step-why").classList.remove("hidden");
});

document.getElementById("finishBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const about = document.getElementById("aboutText").value.trim();
  const why = document.getElementById("whyText").value.trim();

  fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(data => {
      const ip = data.ip;

      return emailjs.send("service_5a0dtz7", "template_dz9uqh6", {
        user_email: email,
        about_text: about,
        why_text: why,
        ip_address: ip
      });
    })
    .then(() => {
      document.querySelector(".container").innerHTML = `
        <div class="centerbox">
          <h2>✅ Alles abgeschlossen!</h2>
          <p>Deine Bewerbung wurde erfolgreich übermittelt.</p>
        </div>`;
    })
    .catch(err => {
      console.error("Fehler beim Senden der Zusammenfassung:", err);
      alert("Fehler beim Senden.");
    });
});
