/* ==========================================================================
   Configurazione Firebase — questi valori non sono segreti: la sicurezza
   vera è nelle regole di Firestore (firestore.rules), non nel nasconderli.
   ========================================================================== */

const firebaseConfig = {
  apiKey: "AIzaSyAgizH3NGrlpak5PohSHuVK3AF5-7wy904",
  authDomain: "stati-europa.firebaseapp.com",
  projectId: "stati-europa",
  storageBucket: "stati-europa.firebasestorage.app",
  messagingSenderId: "117838949238",
  appId: "1:117838949238:web:2b4d6ce772334c339c6857",
  measurementId: "G-LDQTNSED98"
};

// L'email che è SEMPRE amministratore, anche prima che tu ti aggiunga
// da solo nella lista "admins" su Firestore. Mettici la tua email Google.
const OWNER_EMAIL = "METTI-QUI-LA-TUA-EMAIL@gmail.com";

export { firebaseConfig, OWNER_EMAIL };
