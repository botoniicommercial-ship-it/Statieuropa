# Stati d'Europa — sito by Botonii

Sito statico (HTML + CSS + JS puro, nessuna build necessaria) con:

- **Paesi**: scheda di 46 stati europei — capitale, popolazione, superficie,
  PIL, altre città importanti. Cerca per nome/capitale o filtra per area
  geografica.
- **Quiz delle bandiere**: indovina il paese a partire dalla bandiera.
- **Quiz della mappa**: tocca il paese giusto su una vera cartina
  interattiva d'Europa (stile Toporopa), 40 paesi selezionabili.

Pensato per funzionare anche a schermo intero e touch sulle lavagne
interattive LG: bottoni grandi, niente funzionalità legate solo al mouse
(hover), layout responsive.

## Come pubblicarlo su GitHub Pages

1. Crea un nuovo repository su GitHub (es. `stati-europa`).
2. Carica **tutti** i file di questa cartella mantenendo la struttura:
   ```
   index.html
   css/style.css
   js/data.js
   js/app.js
   js/quiz-flags.js
   js/quiz-map.js
   ```
3. Nel repository vai su **Settings → Pages**.
4. In "Build and deployment" scegli **Deploy from a branch**, branch
   `main` (o `master`), cartella `/root`, poi **Save**.
5. Dopo un minuto il sito sarà online su
   `https://<tuo-utente>.github.io/<nome-repo>/`.

Non serve nessuna build, npm o server: sono solo file statici.

## Come modificare i dati dei paesi

Apri `js/data.js`: ogni paese è un oggetto con `nome`, `capitale`, `citta`,
`pop`, `area`, `pil`, `regione`. Cambia i numeri o aggiungi/rimuovi paesi
liberamente — il resto del sito si aggiorna da solo. I dati inclusi sono
stime approssimative (2024/2025) pensate per uso scolastico: se il tuo
insegnante ti fornisce dati ufficiali (es. Eurostat), sostituiscili pure.

## Come funziona la mappa cliccabile

`js/quiz-map.js` carica al volo, dal browser di chi visita il sito, una
mappa SVG del mondo con ogni paese come forma separata (vedi Crediti),
poi:

1. nasconde l'interazione su tutte le forme non europee;
2. calcola il riquadro che contiene tutti i paesi europei in `data.js`;
3. ritaglia la vista della mappa su quel riquadro (così si vede solo
   l'Europa, ingrandita);
4. rende cliccabili solo i paesi europei presenti nella mappa sorgente.

Sei microstati (Andorra, Monaco, San Marino, Città del Vaticano,
Liechtenstein, Kosovo) sono troppo piccoli per comparire come forme
separate in quella mappa: restano comunque nella sezione **Paesi** e
nel quiz delle bandiere, solo non sono cliccabili sulla cartina.

Serve una connessione Internet quando si apre il sito (per scaricare
mappa e bandiere): su una lavagna LG collegata a Internet funziona senza
problemi.

## Crediti

- Mappa: *Al MacDonald* (illustrazione originale) / *Fritz Lekschas*
  (adattamento SVG con codici ISO) — licenza CC BY-SA 3.0.
  <https://github.com/flekschas/simple-world-map>
- Bandiere: [flagcdn.com](https://flagcdn.com)
- Font: Fraunces e Public Sans (Google Fonts)

## Personalizzazione

- Colori e font: variabili in cima a `css/style.css` (sezione `:root`).
- Contatti nel footer: modifica direttamente il tag `<footer>` in
  `index.html`.
