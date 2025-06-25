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
setupTextCounter("whyText", "wordCount2", "toDiscordBtn");

document.getElementById("toWhyBtn").addEventListener("click", () => {
  document.getElementById("step-about").classList.add("hidden");
  document.getElementById("step-why").classList.remove("hidden");
});

document.getElementById("toDiscordBtn").addEventListener("click", () => {
  document.getElementById("step-why").classList.add("hidden");
  document.getElementById("step-discord").classList.remove("hidden");
});

document.getElementById("discordInput").addEventListener("input", () => {
  const val = document.getElementById("discordInput").value.trim();
  document.getElementById("finishBtn").disabled = val.length < 4;
});

document.getElementById("noDiscordBtn").addEventListener("click", () => {
  window.open("https://meinewebsite.github.io/keindiscord", "_blank");
});

document.getElementById("finishBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const about = document.getElementById("aboutText").value.trim();
  const why = document.getElementById("whyText").value.trim();
  const discord = document.getElementById("discordInput").value.trim();

  const fullAbout = about + `\n\nDiscord: ${discord}`;

  document.querySelector(".container").innerHTML = `<div class="centerbox"><h2>Laden...</h2></div>`;

  fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(data => {
      return emailjs.send("service_5a0dtz7", "template_dz9uqh6", {
        user_email: email,
        about_text: fullAbout,
        why_text: why,
        ip_address: data.ip
      });
    })
    .then(() => {
      window.location.href = "https://meinewebsite.github.io/success";
    })
    .catch(err => {
      console.error("Fehler beim Senden:", err);
      alert("Fehler beim Senden.");
    });
});
