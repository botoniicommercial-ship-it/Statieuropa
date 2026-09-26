/* ==========================================================================
   Sezioni create dall'admin — lette da chiunque visiti il sito,
   scritte solo dall'area Admin (vedi admin.js + firestore.rules)
   ========================================================================== */

import { db } from "./firebase-init.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const navHolder = document.getElementById("dynamicNavItems");
const viewsHolder = document.getElementById("dynamicViews");

function renderSections(sections) {
  navHolder.innerHTML = "";
  viewsHolder.innerHTML = "";

  sections.forEach((s) => {
    const navId = "s-" + s.id;

    const btn = document.createElement("button");
    btn.dataset.nav = navId;
    btn.textContent = s.titolo || "Sezione";
    navHolder.appendChild(btn);

    const section = document.createElement("section");
    section.className = "view";
    section.id = "view-" + navId;

    const container = document.createElement("div");
    container.className = "container";

    const head = document.createElement("div");
    head.className = "section-head";
    const h2 = document.createElement("h2");
    h2.textContent = s.titolo || "Sezione";
    head.appendChild(h2);
    container.appendChild(head);

    if (s.immagine) {
      const fig = document.createElement("figure");
      fig.className = "storia-figure";
      const img = document.createElement("img");
      img.src = s.immagine;
      img.alt = s.titolo || "";
      fig.appendChild(img);
      container.appendChild(fig);
    }

    if (s.testo) {
      const p = document.createElement("p");
      p.style.whiteSpace = "pre-wrap";
      p.style.marginTop = "20px";
      p.textContent = s.testo;
      container.appendChild(p);
    }

    section.appendChild(container);
    viewsHolder.appendChild(section);
  });

  window.dispatchEvent(new CustomEvent("sections:rendered"));
}

async function loadSections() {
  try {
    const q = query(collection(db, "sections"), orderBy("creataIl", "asc"));
    const snap = await getDocs(q);
    const list = [];
    snap.forEach((d) => list.push({ id: d.id, ...d.data() }));
    renderSections(list);
  } catch (err) {
    console.error("Errore caricando le sezioni:", err);
  }
}

window.refreshSections = loadSections;
loadSections();
