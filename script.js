emailjs.init("GG7YHgtAyAtoBSF8z");

let currentCode = "", codeGeneratedAt = 0, sending = false;

// Start: Splash → Show first step after 3s
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('splash').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
    showStep('step-email');
  }, 3000);
});

// Helpers
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
function toggleHint(id) {
  document.getElementById(id).classList.toggle('open');
}

// Delay transition with overlay
function transition(nextId) {
  document.querySelector('.overlay').classList.remove('hidden');
  setTimeout(() => {
    document.querySelector('.overlay').classList.add('hidden');
    showStep(nextId);
  }, 3000);
}

// Setup word counters
function setupTextCounter(textId, countId, btnId) {
  const ta = document.getElementById(textId),
        cnt = document.getElementById(countId),
        btn = document.getElementById(btnId);
  ta.addEventListener('input', () => {
    const n = countWords(ta.value);
    cnt.textContent = n;
    btn.disabled = n < 500;
  });
}
setupTextCounter('aboutText','wordCount1','toWhyBtn');
setupTextCounter('whyText','wordCount2','toDiscordBtn');

// Step 1 → send code
document.getElementById('sendCodeBtn').onclick = () => {
  if (sending) return;
  const email = document.getElementById('email').value.trim();
  if (!isValidEmail(email)) return alert('Ungültige E-Mail.');
  sending = true;
  currentCode = generateCode();
  emailjs.send("service_5a0dtz7","template_wj8fyb2",{ to_email: email, code: currentCode })
    .then(() => transition('step-code'))
    .catch(() => alert('Fehler beim Senden.'))
    .finally(() => sending = false);
};

// Step 2 → verify code
document.getElementById('verifyCodeBtn').onclick = () => {
  const code = document.getElementById('verificationCode').value.trim();
  if (Date.now() - codeGeneratedAt > 10*60*1000) return alert('⏰ Code abgelaufen.');
  if (code === currentCode) transition('step-about');
  else alert('❌ Falscher Code.');
};

// Step 3 → next
document.getElementById('toWhyBtn').onclick = () => transition('step-why');

// Step 4 → next
document.getElementById('toDiscordBtn').onclick = () => transition('step-discord');

// Step 5 buttons
document.getElementById('discordInput').oninput = () => {
  document.getElementById('finishBtn').disabled = document.getElementById('discordInput').value.trim().length < 4;
};
document.getElementById('noDiscordBtn').onclick = () => {
  window.open('https://meinewebsite.github.io/keindiscord','_blank');
};

// Final → send summary & redirect
document.getElementById('finishBtn').onclick = () => {
  const email = document.getElementById('email').value.trim();
  const about = document.getElementById('aboutText').value.trim();
  const why   = document.getElementById('whyText').value.trim();
  const discord = document.getElementById('discordInput').value.trim();
  document.querySelector('.overlay span').textContent = 'Laden…';
  document.querySelector('.overlay').classList.remove('hidden');

  fetch("https://api.ipify.org?format=json")
    .then(r => r.json()).then(d => {
      return emailjs.send("service_5a0dtz7","template_dz9uqh6",{
        user_email: email,
        about_text: about + `\n\nDiscord: ${discord}`,
        why_text: why,
        ip_address: d.ip || 'Unbekannt'
      });
    })
    .then(() => setTimeout(() => {
      window.location.href = 'https://meinewebsite.github.io/success';
    },3000))
    .catch(err => {
      console.error(err);
      alert('Fehler beim Senden.');
      document.querySelector('.overlay').classList.add('hidden');
    });
};
