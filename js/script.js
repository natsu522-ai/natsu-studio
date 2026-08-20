
const menuBtn = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");
if(menuBtn){
  menuBtn.addEventListener("click",()=>navLinks.classList.toggle("open"));
}

const orderForm = document.querySelector("#orderForm");
if(orderForm){
  const service = document.querySelector("#service");
  const formula = document.querySelector("#formula");
  const result = document.querySelector("#orderResult");

  const prices = {
    discord: {basic:5, complete:10, premium:15},
    design: {logo:3, banner:5, thumbnail:3},
    montage: {short:5, medium:10, long:15},
    roblox: {clothing:3, ui:7, map:15},
    advertising: {simple:3, design:5, visibility:8}
  };

  const formulas = {
    discord: [["basic","Basique — 5 €"],["complete","Complet — 10 €"],["premium","Premium — 15 €"]],
    design: [["logo","Logo / icône — 3 €"],["banner","Bannière — 5 €"],["thumbnail","Miniature — 3 €"]],
    montage: [["short","Short / TikTok — 5 €"],["medium","Vidéo 2–5 min — 10 €"],["long","Montage long — 15 €"]],
    roblox: [["clothing","Vêtement — 3 €"],["ui","Interface / UI — 7 €"],["map","Petite map — 15 €"]],
    advertising: [["simple","Pub simple — 3 €"],["design","Pub + design — 5 €"],["visibility","Pack visibilité — 8 €"]]
  };

  function updateFormulas(){
    const key = service.value;
    formula.innerHTML = '<option value="">Choisir une formule</option>';
    (formulas[key] || []).forEach(([value,label])=>{
      const opt=document.createElement("option");
      opt.value=value; opt.textContent=label;
      formula.appendChild(opt);
    });
  }
  service?.addEventListener("change",updateFormulas);
  updateFormulas();

  orderForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const data = new FormData(orderForm);
    const serviceKey = data.get("service");
    const formulaKey = data.get("formula");
    const price = prices[serviceKey]?.[formulaKey];
    if(!price){ result.textContent="Choisis un service et une formule."; return; }

    const subject = encodeURIComponent("Commande Natsu Studio — " + serviceKey);
    const body = encodeURIComponent(
      `Nouvelle demande Natsu Studio\n\n`+
      `Nom/Pseudo : ${data.get("name")}\n`+
      `Discord : ${data.get("discord")}\n`+
      `Service : ${serviceKey}\n`+
      `Formule : ${formulaKey}\n`+
      `Budget indicatif : ${price} €\n\n`+
      `Description :\n${data.get("description")}`
    );

    // Replace this email address with the owner's address.
    const email = "TON_EMAIL_ICI@example.com";
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    result.textContent = "Ton application de messagerie va s'ouvrir. Pense à remplacer l'adresse e-mail dans js/script.js.";
  });
}
