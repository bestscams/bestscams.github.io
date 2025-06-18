let randomCode = "";
const emailStep = document.getElementById("emailStep");
const codeStep = document.getElementById("codeStep");
const welcomeForm = document.getElementById("questionnaire");
const final = document.getElementById("final");

document.getElementById("startButton").onclick = () => {
  document.getElementById("banner").classList.add("hidden");
  document.getElementById("main").classList.add("hidden");
  emailStep.classList.remove("hidden");
};

document.getElementById("emailNext").onclick = () => {
  const email = document.getElementById("email").value;
  if (!email.includes("@")) return alert("Bitte gültige E-Mail-Adresse eingeben.");

  randomCode = Math.floor(100000 + Math.random() * 900000).toString();

  emailjs.send("service_5a0dtz7", "template_wj8fyb2", {
    to_email: email,
    code: randomCode
  })
  .then(() => {
    emailStep.classList.add("hidden");
    codeStep.classList.remove("hidden");
  })
  .catch(err => alert("Fehler beim Senden: " + err));
};

document.getElementById("codeNext").onclick = () => {
  if (document.getElementById("code").value === randomCode) {
    codeStep.classList.add("hidden");
    welcomeForm.classList.remove("hidden");
  } else {
    document.getElementById("codeError").classList.remove("hidden");
  }
};

// Dynamische Felder generieren
window.onload = () => {
  const tagSel = document.getElementById("tag");
  const monatSel = document.getElementById("monat");
  const jahrSel = document.getElementById("jahr");

  for (let i = 1; i <= 31; i++) tagSel.innerHTML += `<option>${i}</option>`;
  for (let i = 1; i <= 12; i++) monatSel.innerHTML += `<option>${i}</option>`;
  for (let i = new Date().getFullYear(); i >= 1900; i--) jahrSel.innerHTML += `<option>${i}</option>`;

  const accounts = ["YouTube", "TikTok", "Snapchat", "Discord", "Roblox"];
  const accountDiv = document.getElementById("accounts");

  accounts.forEach(name => {
    const id = name.toLowerCase();
    accountDiv.innerHTML += `
      <div>
        <label><input type="checkbox" id="${id}Check"> ${name}</label>
        <input type="url" id="${id}Link" class="hidden" placeholder="Link zu deinem ${name}-Kanal">
      </div>`;
    
    document.getElementById(`${id}Check`).addEventListener("change", function () {
      document.getElementById(`${id}Link`).classList.toggle("hidden", !this.checked);
    });
  });

  document.getElementById("land").addEventListener("change", function () {
    document.getElementById("anderesLand").classList.toggle("hidden", this.value !== "Andere");
  });
};

document.getElementById("questionnaire").onsubmit = function (e) {
  e.preventDefault();

  const form = e.target;
  let antworten = {
    vorname: form.vorname.value,
    nachname: form.nachname.value,
    geburtsdatum: `${form.tag.value}.${form.monat.value}.${form.jahr.value}`,
    land: form.land.value === "Andere" ? form.anderesLand.value : form.land.value,
    bundesland: form.bundesland.value,
    geraete: form.geraete.value,
    plattformen: form.plattformen.value,
    stärken: form.staerken.value,
    warumMitmachen: form.warumMitmachen.value,
    warumWir: form.warumWir.value,
    erwartung: form.erwartung.value,
    onlinezeit: form.onlinezeit.value,
    mitgliederzahl: form.mitgliederzahl.value,
    angenommen: form.angenommen.value,
    sicher: form.sicher.checked,
  };

  ["youtube", "tiktok", "snapchat", "discord", "roblox"].forEach(id => {
    const check = document.getElementById(`${id}Check`).checked;
    const link = document.getElementById(`${id}Link`).value;
    antworten[id] = check ? link : "nein";
  });

  welcomeForm.classList.add("hidden");
  final.classList.remove("hidden");
  document.getElementById("summary").innerText = JSON.stringify(antworten, null, 2);
};
