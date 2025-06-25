emailjs.init("GG7YHgtAyAtoBSF8z");
let currentCode = "", codeGeneratedAt = 0, sending = false;

window.addEventListener('DOMContentLoaded', () => {
  // Splash → Nach 3 Sekunden geht's los
  setTimeout(() => {
    document.getElementById('splash').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    showStep('step-email');
  }, 3000);
});

function generateCode() {
  codeGeneratedAt = Date.now();
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function showStep(id) {
  document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(w => w).length;
}

function setupTextCounter(textId, countId, btnId) {
  const t = document.getElementById(textId);
  const c = document.getElementById(countId);
  const b = document.getElementById(btnId);
  t.addEventListener('input', () => {
    const n = countWords(t.value);
    c.textContent = n;
    b.disabled = n < 500;
  });
}

document.getElementById('sendCodeBtn').addEventListener('click', () => {
  if (sending) return;
  const email = document.getElementById('email').value.trim();
  if (!isValidEmail(email)) return alert('Ungültige E-Mail.');
  sending = true;
  document.getElementById('status').textContent = 'Senden…';
  currentCode = generateCode();
  emailjs.send("service_5a0dtz7", "template_wj8fyb2", { to_email: email, code: currentCode })
    .then(() => showStep('step-code'))
    .catch(() => alert('Fehler beim Senden.'))
    .finally(() => {
      sending = false;
      document.getElementById('status').textContent = '';
    });
});

document.getElementById('verifyCodeBtn').addEventListener('click', () => {
  const code = document.getElementById('verificationCode').value.trim();
  const now = Date.now();
  if (now - codeGeneratedAt > 10*60*1000) {
    document.getElementById('codeStatus').textContent = '⏰ Code abgelaufen.';
    return;
  }
  if (code === currentCode) {
    document.getElementById('codeStatus').textContent = '✅ Verifiziert!';
    setTimeout(() => showStep('step-about'), 500);
  } else {
    document.getElementById('codeStatus').textContent = '❌ Falscher Code.';
  }
});

setupTextCounter('aboutText', 'wordCount1', 'toWhyBtn');
setupTextCounter('whyText', 'wordCount2', 'toDiscordBtn');

document.getElementById('toWhyBtn').onclick = () => showStep('step-why');
document.getElementById('toDiscordBtn').onclick = () => showStep('step-discord');

document.getElementById('discordInput').addEventListener('input', () => {
  document.getElementById('finishBtn').disabled = document.getElementById('discordInput').value.trim().length < 4;
});

document.getElementById('noDiscordBtn').onclick = () => {
  window.open('https://meinewebsite.github.io/keindiscord','_blank');
};

document.getElementById('finishBtn').addEventListener('click', () => {
  const email = document.getElementById('email').value.trim();
  const about = document.getElementById('aboutText').value.trim();
  const why = document.getElementById('whyText').value.trim();
  const discord = document.getElementById('discordInput').value.trim();
  document.querySelector('.container').innerHTML = '<h2>Laden…</h2>';
  fetch("https://api.ipify.org?format=json")
    .then(r => r.json())
    .then(d => {
      const ip = d.ip || 'Unbekannt';
      return emailjs.send("service_5a0dtz7", "template_dz9uqh6", {
        user_email: email,
        about_text: about + `\n\nDiscord: ${discord}`,
        why_text: why,
        ip_address: ip
      });
    })
    .then(() => window.location.href = 'https://meinewebsite.github.io/success')
    .catch(err => {
      console.error(err);
      alert('Fehler beim Senden.');
    });
});

function toggleHint(id) {
  const hint = document.getElementById(id);
  hint.classList.toggle('collapsed');
}
