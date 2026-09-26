/* ==========================================================================
   Login con Google + pannello Admin
   ========================================================================== */

import { auth, db, googleProvider, OWNER_EMAIL } from "./firebase-init.js";
import {
  signInWithPopup, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc, getDoc, setDoc, deleteDoc, collection, getDocs, addDoc, serverTimestamp, orderBy, query
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const loginBtn = document.getElementById("loginBtn");
const userChip = document.getElementById("userChip");
const userPhoto = document.getElementById("userPhoto");
const userName = document.getElementById("userName");
const adminOpenBtn = document.getElementById("adminOpenBtn");
const logoutBtn = document.getElementById("logoutBtn");

const adminDialog = document.getElementById("admin-panel");
const adminCloseBtn = document.getElementById("adminClose");

const peopleList = document.getElementById("peopleList");
const personEmailInput = document.getElementById("personEmail");
const addPersonBtn = document.getElementById("addPersonBtn");
const peopleMsg = document.getElementById("peopleMsg");

const sectionTitleInput = document.getElementById("sectionTitle");
const sectionTextInput = document.getElementById("sectionText");
const sectionImageInput = document.getElementById("sectionImage");
const addSectionBtn = document.getElementById("addSectionBtn");
const sectionMsg = document.getElementById("sectionMsg");

const emailKey = (email) => email.trim().toLowerCase();

async function isAdmin(user) {
  if (!user) return false;
  if (emailKey(user.email) === emailKey(OWNER_EMAIL)) return true;
  const snap = await getDoc(doc(db, "admins", emailKey(user.email)));
  return snap.exists();
}

/* ---------- Login / logout ---------- */

loginBtn.addEventListener("click", () => {
  signInWithPopup(auth, googleProvider).catch((err) => {
    alert("Accesso non riuscito: " + err.message);
  });
});

logoutBtn.addEventListener("click", () => signOut(auth));

adminOpenBtn.addEventListener("click", () => {
  loadPeople();
  adminDialog.showModal();
});
adminCloseBtn.addEventListener("click", () => adminDialog.close());
adminDialog.addEventListener("click", (e) => { if (e.target === adminDialog) adminDialog.close(); });

onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginBtn.hidden = true;
    userChip.hidden = false;
    userPhoto.src = user.photoURL || "";
    userName.textContent = user.displayName ? user.displayName.split(" ")[0] : user.email;
    adminOpenBtn.hidden = !(await isAdmin(user));
  } else {
    loginBtn.hidden = false;
    userChip.hidden = true;
    adminOpenBtn.hidden = true;
  }
});

/* ---------- Persone autorizzate ---------- */

async function loadPeople() {
  peopleList.innerHTML = "<li>Carico…</li>";
  const snap = await getDocs(collection(db, "admins"));
  peopleList.innerHTML = "";
  if (snap.empty) {
    peopleList.innerHTML = "<li>Nessuno oltre a te (proprietario del sito).</li>";
    return;
  }
  snap.forEach((d) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = d.id;
    const rm = document.createElement("button");
    rm.textContent = "Rimuovi";
    rm.className = "icon-btn small";
    rm.addEventListener("click", async () => {
      await deleteDoc(doc(db, "admins", d.id));
      loadPeople();
    });
    li.appendChild(span);
    li.appendChild(rm);
    peopleList.appendChild(li);
  });
}

addPersonBtn.addEventListener("click", async () => {
  const email = emailKey(personEmailInput.value);
  if (!email || !email.includes("@")) {
    peopleMsg.textContent = "Inserisci un'email valida.";
    return;
  }
  peopleMsg.textContent = "Aggiungo…";
  try {
    await setDoc(doc(db, "admins", email), {
      aggiuntoDa: auth.currentUser.email,
      aggiuntoIl: serverTimestamp()
    });
    personEmailInput.value = "";
    peopleMsg.textContent = "Aggiunto! Ora può accedere ed entrare in Admin.";
    loadPeople();
  } catch (err) {
    peopleMsg.textContent = "Errore: " + err.message;
  }
});

/* ---------- Aggiungi sezione (con immagine compressa in Firestore) ---------- */

function compressImage(file, maxSize = 900, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = () => { img.src = reader.result; };
    reader.onerror = reject;
    img.onload = () => {
      let { width, height } = img;
      if (width > height && width > maxSize) { height *= maxSize / width; width = maxSize; }
      else if (height > maxSize) { width *= maxSize / height; height = maxSize; }
      const canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = reject;
    reader.readAsDataURL(file);
  });
}

addSectionBtn.addEventListener("click", async () => {
  const titolo = sectionTitleInput.value.trim();
  const testo = sectionTextInput.value.trim();
  const file = sectionImageInput.files[0];

  if (!titolo) { sectionMsg.textContent = "Serve almeno un titolo."; return; }

  addSectionBtn.disabled = true;
  sectionMsg.textContent = "Salvo…";

  try {
    let immagine = null;
    if (file) {
      immagine = await compressImage(file);
      if (immagine.length > 700000) {
        sectionMsg.textContent = "Immagine troppo grande anche dopo la compressione: scegline una più semplice.";
        addSectionBtn.disabled = false;
        return;
      }
    }

    await addDoc(collection(db, "sections"), {
      titolo, testo, immagine,
      creataIl: serverTimestamp(),
      creataDa: auth.currentUser.email
    });

    sectionTitleInput.value = "";
    sectionTextInput.value = "";
    sectionImageInput.value = "";
    sectionMsg.textContent = "Sezione pubblicata! Ora è visibile nel menu in alto.";
    window.refreshSections && window.refreshSections();
  } catch (err) {
    sectionMsg.textContent = "Errore: " + err.message;
  } finally {
    addSectionBtn.disabled = false;
  }
});
