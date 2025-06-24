emailjs.init("GG7YHgtAyAtoBSF8z"); // Public Key

let generatedCode = "";

function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-stelliger Code
}

function sendVerificationCode() {
  const email = document.getElementById("email").value;
  if (!email) {
    showMessage("Bitte gib eine gültige E-Mail ein.", "error");
    return;
  }

  generatedCode = generateRandomCode();

  const templateParams = {
    to_email: email,
    code: generatedCode,
  };

  emailjs.send("service_5a0dtz7", "template_wj8fyb2", templateParams)
    .then(() => {
      showMessage("Code wurde gesendet. Bitte überprüfe dein E-Mail-Postfach.", "success");
      document.getElementById("email-section").style.display = "none";
      document.getElementById("code-section").style.display = "block";
    })
    .catch((error) => {
      console.error("Fehler beim Senden der E-Mail:", error);
      showMessage("Fehler beim Senden. Versuche es erneut.", "error");
    });
}

function verifyCode() {
  const userCode = document.getElementById("code-input").value;
  if (userCode === generatedCode) {
    showMessage("Erfolgreich eingeloggt!", "success");
  } else {
    showMessage("Falscher Code. Bitte versuche es erneut.", "error");
  }
}

function showMessage(message, type) {
  const msg = document.getElementById("message");
  msg.textContent = message;
  msg.className = type;
}
