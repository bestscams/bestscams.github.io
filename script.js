emailjs.init("GG7YHgtAyAtoBSF8z");

let emailCode = "";
let sending = false;

function generateRandomCode() {
  return Math.floor(Math.random() * 900000 + 100000).toString();
}

function sendVerificationCode() {
  if (sending) return;

  const btn = document.getElementById("email-send-btn");
  const loading = document.getElementById("loading-text");
  const email = document.getElementById("email").value.trim();

  if (!email) {
    showMessage("Bitte gib eine gültige E-Mail ein.", "error");
    return;
  }

  sending = true;
  btn.disabled = true;
  loading.style.display = "block";

  emailCode = generateRandomCode();

  emailjs.send("service_5a0dtz7", "template_wj8fyb2", {
    to_email: email,
    code: emailCode
  }).then(() => {
    showMessage("Code gesendet! Bitte prüfe dein Postfach.", "success");
    document.getElementById("email-section").style.display = "none";
    document.getElementById("code-section").style.display = "block";
  }).catch((err) => {
    console.error(err);
    showMessage("Fehler beim Senden. Versuche es erneut.", "error");
  }).finally(() => {
    sending = false;
    btn.disabled = false;
    loading.style.display = "none";
  });
}

function verifyEmailCode() {
  const user = document.getElementById("code-input").value.trim();
  if (user === emailCode) {
    showMessage("E-Mail bestätigt!", "success");
    document.getElementById("code-section").style.display = "none";
    document.getElementById("about-section").style.display = "block";
    document.getElementById("main-title").style.display = "none";
    setupWordCounter("about", "counter-about", "about-btn");
  } else {
    showMessage("Falscher Code.", "error");
  }
}

function setupWordCounter(textId, counterId, btnId) {
  const ta = document.getElementById(textId);
  const counter = document.getElementById(counterId);
  const btn = document.getElementById(btnId);

  const updateCounter = () => {
    const words = ta.value.trim().split(/\s+/).filter(w => w).length;
    counter.textContent = `${words}/500 Wörter`;
    btn.disabled = words < 500;
  };

  ta.addEventListener("input", updateCounter);
  updateCounter(); // Initial call
}

function nextSection() {
  document.getElementById("about-section").style.display = "none";
  document.getElementById("why-section").style.display = "block";
  setupWordCounter("why", "counter-why", "why-btn");
}

function finish() {
  document.querySelectorAll("#why-section, #main-title, #message").forEach(e => e.style.display = "none");
  document.getElementById("success-section").style.display = "block";
}

function showMessage(msg, type) {
  const el = document.getElementById("message");
  el.textContent = msg;
  el.className = type;
}

// Collapsible helper
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".collapsible").forEach(button => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      const content = button.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  });
});
