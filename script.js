emailjs.init("GG7YHgtAyAtoBSF8z");

let currentCode = "", codeGeneratedAt = 0, sending = false;

window.addEventListener('DOMContentLoaded', () => {
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
  transitionShow(id);
}

function transitionShow(nextId) {
  document.getElementById('loading').classList.remove('hidden');
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    document.getElementById(nextId).classList.add('active');
  }, 3000);
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

// Word counters
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

// Step handlers
document.getElementById('sendCodeBtn').onclick = () => {
  if (sending) return;
  const email = document.getElementById('email').value.trim();
  if (!isValidEmail(email)) return alert('Ungültige E-Mail.');
  sending = true;
  currentCode = generateCode();
  emailjs.send("service_5a0dtz7","template_wj8fyb2",{ to_email: email, code: currentCode })
    .then(() => showStep('step-code'))
    .catch(() => alert('Fehler beim Senden.'))
    .finally(() => sending = false);
};

document.getElementById('verifyCodeBtn').onclick = () => {
  const code = document.getElementById('verificationCode').value.trim();
  if (Date.now() - codeGeneratedAt > 10*60*1000) return alert('⏰ Code abgelaufen.');
  if (code === currentCode) showStep('step-about');
  else alert('❌ Falscher Code.');
};

document.getElementById('toWhyBtn').onclick = () => showStep('step-why');
document.getElementById('toDiscordBtn').onclick = () => showStep('step-discord');

document.getElementById('discordInput').oninput = () => {
  document.getElementById('finishBtn').disabled = document.getElementById('discordInput').value.trim().length < 4;
};

document.getElementById('noDiscordBtn').onclick = () => {
  window.open('https://meinewebsite.github.io/keindiscord','_blank');
};

document.getElementById('finishBtn').onclick = () => {
  const email = document.getElementById('email').value.trim();
  const about = document.getElementById('aboutText').value.trim();
  const why = document.getElementById('whyText').value.trim();
  const discord = document.getElementById('discordInput').value.trim();
  const fullAbout = about + `\n\nDiscord: ${discord}`;

  document.getElementById('loading-text').textContent = 'Laden…';
  document.getElementById('loading').classList.remove('hidden');

  fetch("https://api.ipify.org?format=json")
    .then(r => r.json()).then(d => {
      return emailjs.send("service_5a0dtz7","template_dz9uqh6",{
        user_email: email,
        about_text: fullAbout,
        why_text: why,
        ip_address: d.ip || 'Unbekannt'
      });
    })
    .then(() => setTimeout(() => {
      window.location.href = 'https://meinewebsite.github.io/success';
    }, 3000))
    .catch(err => {
      console.error(err);
      alert('Fehler beim Senden.');
      document.getElementById('loading').classList.add('hidden');
    });
};
