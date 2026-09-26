/* ==========================================================================
   Quiz della mappa — carica una mappa SVG reale del mondo e ne ritaglia
   la vista sull'Europa, rendendo cliccabili solo i paesi del nostro elenco.

   Mappa: "simple-world-map" di Al MacDonald / Fritz Lekschas, licenza
   CC BY-SA 3.0 — https://github.com/flekschas/simple-world-map
   ========================================================================== */

(function () {
  const MAP_URL = "https://cdn.jsdelivr.net/gh/flekschas/simple-world-map@master/world-map.min.svg";

  const holder = document.getElementById("europe-map-holder");
  const targetNameEl = document.getElementById("mapTargetName");
  const feedbackEl = document.getElementById("mapFeedback");
  const scoreEl = document.getElementById("mapScore");
  const totalEl = document.getElementById("mapTotal");

  let score = 0, total = 0, current = null, locked = false, ready = false;
  let playable = [];

  function playableCountries() {
    return PAESI.filter((p) => p.sulMappa !== false);
  }

  async function loadMap() {
    const res = await fetch(MAP_URL);
    const svgText = await res.text();
    holder.innerHTML = svgText;

    const svg = holder.querySelector("svg");
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

    playable = playableCountries();
    const ids = new Set(playable.map((p) => p.id));

    // Spegni tutte le forme non europee: niente interazione, colore neutro.
    svg.querySelectorAll("path").forEach((path) => {
      path.style.pointerEvents = "none";
      path.style.fill = "#dfe6ea";
    });

    // Calcola il riquadro che contiene tutti i paesi europei giocabili,
    // poi ritaglia la viewBox della mappa su quel riquadro.
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const found = [];
    ids.forEach((id) => {
      const path = svg.querySelector(`#${CSS.escape(id)}`);
      if (!path) return;
      found.push(path);
      const bb = path.getBBox();
      minX = Math.min(minX, bb.x);
      minY = Math.min(minY, bb.y);
      maxX = Math.max(maxX, bb.x + bb.width);
      maxY = Math.max(maxY, bb.y + bb.height);
    });

    if (found.length) {
      const padX = (maxX - minX) * 0.08;
      const padY = (maxY - minY) * 0.08;
      svg.setAttribute(
        "viewBox",
        `${minX - padX} ${minY - padY} ${maxX - minX + padX * 2} ${maxY - minY + padY * 2}`
      );
    }

    found.forEach((path) => {
      path.style.pointerEvents = "auto";
      path.style.fill = "";
      path.classList.add("clickable");
      path.addEventListener("click", () => handleClick(path));
    });

    ready = true;
  }

  function pickTarget() {
    current = playable[Math.floor(Math.random() * playable.length)];
    targetNameEl.textContent = current.nome;
    feedbackEl.textContent = "";
    feedbackEl.className = "quiz-feedback";
    locked = false;
    holder.querySelectorAll("path.correct, path.wrong").forEach((p) => {
      p.classList.remove("correct", "wrong", "disabled");
    });
  }

  function handleClick(path) {
    if (locked || !current) return;
    locked = true;
    total += 1;
    totalEl.textContent = total;

    const clickedId = path.id;
    if (clickedId === current.id) {
      score += 1;
      scoreEl.textContent = score;
      path.classList.add("correct");
      feedbackEl.textContent = "Esatto! 🎉";
      feedbackEl.className = "quiz-feedback ok";
    } else {
      path.classList.add("wrong");
      const right = holder.querySelector(`#${CSS.escape(current.id)}`);
      if (right) right.classList.add("correct");
      feedbackEl.textContent = `Non era questo — cercavi ${current.nome}.`;
      feedbackEl.className = "quiz-feedback no";
    }

    setTimeout(pickTarget, 1300);
  }

  window.startMapQuiz = function () {
    score = 0; total = 0;
    scoreEl.textContent = 0; totalEl.textContent = 0;
    feedbackEl.textContent = "";
    targetNameEl.textContent = "…";

    if (!ready) {
      loadMap()
        .then(pickTarget)
        .catch(() => {
          holder.innerHTML = '<p class="map-loading">Impossibile caricare la mappa: controlla la connessione a Internet.</p>';
        });
    } else {
      pickTarget();
    }
  };
})();
