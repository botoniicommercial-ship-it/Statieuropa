/* ==========================================================================
   Quiz delle bandiere
   ========================================================================== */

(function () {
  let score = 0;
  let total = 0;
  let current = null;
  let locked = false;

  const img = document.getElementById("flagImg");
  const optionsEl = document.getElementById("flagOptions");
  const feedbackEl = document.getElementById("flagFeedback");
  const scoreEl = document.getElementById("flagScore");
  const totalEl = document.getElementById("flagTotal");

  function pickRandom(arr, n, excludeId) {
    const pool = arr.filter((p) => p.id !== excludeId);
    const picked = [];
    while (picked.length < n && pool.length) {
      const i = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(i, 1)[0]);
    }
    return picked;
  }

  function nextRound() {
    locked = false;
    feedbackEl.textContent = "";
    feedbackEl.className = "quiz-feedback";

    current = PAESI[Math.floor(Math.random() * PAESI.length)];
    img.src = flagUrl(current.id);
    img.alt = "Bandiera da indovinare";

    const distractors = pickRandom(PAESI, 3, current.id);
    const options = [...distractors, current].sort(() => Math.random() - 0.5);

    optionsEl.innerHTML = "";
    options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.textContent = opt.nome;
      btn.addEventListener("click", () => answer(opt, btn));
      optionsEl.appendChild(btn);
    });
  }

  function answer(opt, btn) {
    if (locked) return;
    locked = true;
    total += 1;
    totalEl.textContent = total;

    if (opt.id === current.id) {
      score += 1;
      scoreEl.textContent = score;
      btn.classList.add("correct");
      feedbackEl.textContent = "Esatto! 🎉";
      feedbackEl.className = "quiz-feedback ok";
    } else {
      btn.classList.add("wrong");
      feedbackEl.textContent = `Sbagliato — era ${current.nome}.`;
      feedbackEl.className = "quiz-feedback no";
      [...optionsEl.children].forEach((b) => {
        if (b.textContent === current.nome) b.classList.add("correct");
      });
    }
  }

  document.getElementById("flagNext").addEventListener("click", nextRound);

  window.startFlagQuiz = function () {
    score = 0; total = 0;
    scoreEl.textContent = 0; totalEl.textContent = 0;
    nextRound();
  };
})();
