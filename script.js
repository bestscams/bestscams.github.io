emailjs.init("GG7YHgtAyAtoBSF8z");

let emailCode = "";
let phoneCode = "";

function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendVerificationCode() {
  const email = document.getElementById("email").value;
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

function verifyEmailCode() {
  const userCode = document.getElementById("code-input").value;
  if (userCode === emailCode) {
    showMessage("E-Mail bestätigt. Jetzt Telefonnummer eingeben.", "success");
    document.getElementById("code-section").style.display = "none";
    document.getElementById("phone-section").style.display = "block";
  } else {
    showMessage("Falscher Code für E-Mail.", "error");
  }
}

function sendPhoneCode() {
  const phone = document.getElementById("phone").value;
  const gatewayEmail = phone + "@o2online.de"; // ggf. Provider prüfen

  if (!phone.match(/^01[0-9]{9}$/)) {
    showMessage("Bitte gültige Handynummer eingeben (z.B. 01511234567).", "error");
    return;
  }

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
      console.error("SMS-Sendefehler:", error);
      showMessage("Fehler beim SMS-Versand.", "error");
    });
}

function verifyPhoneCode() {
  const userCode = document.getElementById("phone-code-input").value;
  if (userCode === phoneCode) {
    showMessage("Erfolgreich komplett verifiziert!", "success");
  } else {
    showMessage("Falscher SMS-Code.", "error");
  }
}

function showMessage(message, type) {
  const msg = document.getElementById("message");
  msg.textContent = message;
  msg.className = type;
}
