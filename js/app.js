/* ==========================================================================
   Navigazione tra le sezioni + elenco/scheda dei paesi
   ========================================================================== */

const flagUrl = (iso2) => `https://flagcdn.com/${iso2}.svg`;

const fmt = (n) => (n == null ? "—" : new Intl.NumberFormat("it-IT").format(n));

function fmtPil(bn) {
  if (bn == null) return "Non disponibile";
  return bn >= 1000
    ? `${(bn / 1000).toLocaleString("it-IT", { maximumFractionDigits: 2 })} mila mld €`
    : `${bn.toLocaleString("it-IT")} mld €`;
}

function fmtArea(km2) {
  if (km2 < 1) return `${(km2 * 100).toFixed(0)} ettari`;
  return `${fmt(Math.round(km2))} km²`;
}

/* ---------- Navigazione ---------- */

const views = {
  home: document.getElementById("view-home"),
  stati: document.getElementById("view-stati"),
  giochi: document.getElementById("view-giochi")
};

function goTo(name) {
  Object.entries(views).forEach(([key, el]) => el.classList.toggle("active", key === name));
  document.querySelectorAll(".main-nav button[data-nav]").forEach((btn) => {
    const target = btn.dataset.nav;
    if (["home", "stati", "giochi"].includes(target)) {
      btn.toggleAttribute("aria-current", target === name);
      if (target === name) btn.setAttribute("aria-current", "page");
      else btn.removeAttribute("aria-current");
    }
  });
  if (name === "giochi") showGameMenu();
  document.getElementById("mainNav").classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showGameMenu() {
  document.getElementById("gameMenu").style.display = "grid";
  document.getElementById("quiz-flags").classList.remove("active");
  document.getElementById("quiz-map").classList.remove("active");
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-nav]");
  if (!btn) return;
  const target = btn.dataset.nav;
  if (["home", "stati", "giochi"].includes(target)) {
    goTo(target);
  } else if (target === "quiz-flags" || target === "quiz-map") {
    document.getElementById("gameMenu").style.display = "none";
    document.getElementById("quiz-flags").classList.toggle("active", target === "quiz-flags");
    document.getElementById("quiz-map").classList.toggle("active", target === "quiz-map");
    if (target === "quiz-flags") window.startFlagQuiz && window.startFlagQuiz();
    if (target === "quiz-map") window.startMapQuiz && window.startMapQuiz();
  }
});

document.getElementById("navToggle").addEventListener("click", () => {
  const nav = document.getElementById("mainNav");
  const open = nav.classList.toggle("open");
  document.getElementById("navToggle").setAttribute("aria-expanded", String(open));
});

/* ---------- Elenco paesi ---------- */

const listEl = document.getElementById("countryList");
const searchEl = document.getElementById("searchInput");
const chipsEl = document.getElementById("regionChips");

let activeRegion = null;

function buildChips() {
  const all = document.createElement("button");
  all.className = "chip";
  all.textContent = "Tutte";
  all.setAttribute("aria-pressed", "true");
  all.addEventListener("click", () => setRegion(null));
  chipsEl.appendChild(all);

  REGIONI.forEach((r) => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.textContent = r;
    chip.setAttribute("aria-pressed", "false");
    chip.addEventListener("click", () => setRegion(r));
    chipsEl.appendChild(chip);
  });
}

function setRegion(region) {
  activeRegion = region;
  [...chipsEl.children].forEach((chip) => {
    const isAll = chip.textContent === "Tutte";
    chip.setAttribute("aria-pressed", String(isAll ? region === null : chip.textContent === region));
  });
  renderList();
}

function renderList() {
  const q = searchEl.value.trim().toLowerCase();
  const filtered = PAESI.filter((p) => {
    const matchesRegion = !activeRegion || p.regione === activeRegion;
    const matchesQuery = !q || p.nome.toLowerCase().includes(q) || p.capitale.toLowerCase().includes(q);
    return matchesRegion && matchesQuery;
  }).sort((a, b) => a.nome.localeCompare(b.nome, "it"));

  listEl.innerHTML = "";
  if (filtered.length === 0) {
    listEl.innerHTML = `<div class="empty-state">Nessun paese trovato.</div>`;
    return;
  }

  filtered.forEach((p) => {
    const row = document.createElement("button");
    row.className = "country-row";
    row.innerHTML = `
      <img class="flag" src="${flagUrl(p.id)}" alt="Bandiera ${p.nome}" loading="lazy">
      <span>
        <span class="name">${p.nome}</span><br>
        <span class="capital">Capitale: ${p.capitale}</span>
      </span>
      <span class="chevron" aria-hidden="true">›</span>
    `;
    row.addEventListener("click", () => openDetail(p));
    listEl.appendChild(row);
  });
}

searchEl.addEventListener("input", renderList);

/* ---------- Scheda paese ---------- */

const dialog = document.getElementById("country-detail");

function openDetail(p) {
  document.getElementById("detailFlag").src = flagUrl(p.id);
  document.getElementById("detailFlag").alt = `Bandiera ${p.nome}`;
  document.getElementById("detailName").textContent = p.nome;
  document.getElementById("detailRegion").textContent = p.regione;
  document.getElementById("detailCapital").textContent = p.capitale;
  document.getElementById("detailPop").textContent = fmt(p.pop) + " ab.";
  document.getElementById("detailArea").textContent = fmtArea(p.area);
  document.getElementById("detailPil").textContent = fmtPil(p.pil);
  document.getElementById("detailCities").textContent = p.citta.length
    ? "Altre città importanti: " + p.citta.join(", ")
    : "";
  const note = document.getElementById("detailNote");
  if (p.nota) { note.textContent = p.nota; note.hidden = false; }
  else { note.hidden = true; }
  dialog.showModal();
}

document.getElementById("detailClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });

/* ---------- Init ---------- */

buildChips();
renderList();
document.getElementById("statCountries").textContent = PAESI.length;
document.getElementById("statPlayable").textContent = PAESI.filter((p) => p.sulMappa !== false).length;
