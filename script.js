// Initialisierung von EmailJS
emailjs.init("GG7YHgtAyAtoBSF8z");

let emailCode = "";
let phoneCode = "";

// 6-stelligen Code generieren
function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// E-Mail-Code senden
function sendVerificationCode() {
  const email = document.getElementById("email").value.trim();
  if (!email) {
    showMessage("Bitte gib eine gültige E-Mail ein.", "error");
    return;
  }

  emailCode = generateRandomCode();

  const templateParams = {
    to_email: email,
    code: emailCode,
  };

  emailjs.send("service_5a0dtz7", "template_wj8fyb2", templateParams)
    .then(() => {
      showMessage("E-Mail-Code gesendet. Bitte prüfen.", "success");
      document.getElementById("email-section").style.display = "none";
      document.getElementById("code-section").style.display = "block";
    })
    .catch((error) => {
      console.error("Fehler beim Senden:", error);
      showMessage("Fehler beim Senden der E-Mail.", "error");
    });
}

// E-Mail-Code prüfen
function verifyEmailCode() {
  const userCode = document.getElementById("code-input").value.trim();
  if (userCode === emailCode) {
    showMessage("E-Mail bestätigt. Jetzt Telefonnummer eingeben.", "success");
    document.getElementById("code-section").style.display = "none";
    document.getElementById("phone-section").style.display = "block";
  } else {
    showMessage("Falscher Code für E-Mail.", "error");
  }
}

// Telefonnummer-Format korrigieren
function normalizePhoneNumber(input) {
  let phone = input.replace(/\s+/g, '').replace(/-/g, '');

  if (phone.startsWith("+49")) {
    phone = "0" + phone.slice(3);
  } else if (phone.startsWith("0049")) {
    phone = "0" + phone.slice(4);
  }

  return phone;
}

// SMS-Code senden
function sendPhoneCode() {
  let rawPhone = document.getElementById("phone").value.trim();
  let phone = normalizePhoneNumber(rawPhone);

  if (!phone.match(/^01[0-9]{9}$/)) {
    showMessage("Bitte gültige deutsche Handynummer eingeben (z. B. 01511234567).", "error");
    return;
  }

  const gatewayEmail = phone + "@o2online.de";
  phoneCode = generateRandomCode();

  const templateParams = {
    to_email: gatewayEmail,
    code: phoneCode,
  };

  emailjs.send("service_5a0dtz7", "template_wj8fyb2", templateParams)
    .then(() => {
      showMessage("SMS-Code gesendet. Bitte prüfen.", "success");
      document.getElementById("phone-section").style.display = "none";
      document.getElementById("phone-code-section").style.display = "block";
    })
    .catch((error) => {
      console.error("Fehler beim SMS-Versand:", error);
      showMessage("Fehler beim Versand des Codes.", "error");
    });
}

// SMS-Code prüfen
function verifyPhoneCode() {
  const userCode = document.getElementById("phone-code-input").value.trim();
  if (userCode === phoneCode) {
    showMessage("✅ Erfolgreich vollständig verifiziert!", "success");
  } else {
    showMessage("Falscher SMS-Code.", "error");
  }
}

// Nachricht anzeigen
function showMessage(message, type) {
  const msg = document.getElementById("message");
  msg.textContent = message;
  msg.className = type;
}
