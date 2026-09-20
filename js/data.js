/* ==========================================================================
   Stati d'Europa — dataset
   --------------------------------------------------------------------------
   Dati approssimativi (stime 2024/2025) pensati per uso didattico.
   Puoi correggere/aggiornare qualsiasi valore modificando questo file:
   ogni paese e' un oggetto con questi campi:

   id        codice ISO 3166-1 alpha-2 minuscolo (usato per bandiera e mappa)
   nome      nome del paese in italiano
   capitale  citta' capitale
   citta     altre 2 citta' importanti
   pop       popolazione (numero stimato)
   area      superficie in km²
   pil       PIL nominale stimato, in miliardi di euro (null se non disponibile)
   regione   una delle 5 macro-regioni usate per i filtri
   sulMappa  false per i micro-stati troppo piccoli per essere cliccabili
             sulla mappa del quiz (restano comunque nell'elenco Stati)
   ========================================================================== */

const REGIONI = [
  "Europa del Nord",
  "Europa Occidentale",
  "Europa Centrale",
  "Europa Meridionale",
  "Europa Orientale"
];

const PAESI = [
  { id: "al", nome: "Albania", capitale: "Tirana", citta: ["Durazzo", "Valona"], pop: 2760000, area: 28748, pil: 23, regione: "Europa Orientale" },
  { id: "ad", nome: "Andorra", capitale: "Andorra la Vella", citta: ["Escaldes-Engordany", "Encamp"], pop: 80000, area: 468, pil: 3.7, regione: "Europa Meridionale", sulMappa: false },
  { id: "at", nome: "Austria", capitale: "Vienna", citta: ["Graz", "Linz"], pop: 9100000, area: 83879, pil: 520, regione: "Europa Centrale" },
  { id: "by", nome: "Bielorussia", capitale: "Minsk", citta: ["Homel'", "Vitebsk"], pop: 9150000, area: 207600, pil: 70, regione: "Europa Orientale" },
  { id: "be", nome: "Belgio", capitale: "Bruxelles", citta: ["Anversa", "Gand"], pop: 11700000, area: 30528, pil: 650, regione: "Europa Occidentale" },
  { id: "ba", nome: "Bosnia ed Erzegovina", capitale: "Sarajevo", citta: ["Banja Luka", "Tuzla"], pop: 3200000, area: 51209, pil: 26, regione: "Europa Orientale" },
  { id: "bg", nome: "Bulgaria", capitale: "Sofia", citta: ["Plovdiv", "Varna"], pop: 6800000, area: 110879, pil: 100, regione: "Europa Orientale" },
  { id: "hr", nome: "Croazia", capitale: "Zagabria", citta: ["Spalato", "Fiume"], pop: 3850000, area: 56594, pil: 82, regione: "Europa Orientale" },
  { id: "cy", nome: "Cipro", capitale: "Nicosia", citta: ["Limassol", "Larnaca"], pop: 1250000, area: 9251, pil: 32, regione: "Europa Meridionale" },
  { id: "cz", nome: "Repubblica Ceca", capitale: "Praga", citta: ["Brno", "Ostrava"], pop: 10900000, area: 78871, pil: 340, regione: "Europa Centrale" },
  { id: "dk", nome: "Danimarca", capitale: "Copenaghen", citta: ["Aarhus", "Odense"], pop: 5950000, area: 42933, pil: 420, regione: "Europa del Nord" },
  { id: "ee", nome: "Estonia", capitale: "Tallinn", citta: ["Tartu", "Narva"], pop: 1370000, area: 45227, pil: 42, regione: "Europa del Nord" },
  { id: "fi", nome: "Finlandia", capitale: "Helsinki", citta: ["Espoo", "Tampere"], pop: 5600000, area: 338455, pil: 300, regione: "Europa del Nord" },
  { id: "fr", nome: "Francia", capitale: "Parigi", citta: ["Marsiglia", "Lione"], pop: 68000000, area: 551695, pil: 3100, regione: "Europa Occidentale" },
  { id: "de", nome: "Germania", capitale: "Berlino", citta: ["Amburgo", "Monaco di Baviera"], pop: 84500000, area: 357588, pil: 4700, regione: "Europa Centrale" },
  { id: "gr", nome: "Grecia", capitale: "Atene", citta: ["Salonicco", "Patrasso"], pop: 10400000, area: 131957, pil: 240, regione: "Europa Meridionale" },
  { id: "hu", nome: "Ungheria", capitale: "Budapest", citta: ["Debrecen", "Szeged"], pop: 9600000, area: 93028, pil: 220, regione: "Europa Centrale" },
  { id: "is", nome: "Islanda", capitale: "Reykjavik", citta: ["Kópavogur", "Hafnarfjörður"], pop: 390000, area: 103000, pil: 32, regione: "Europa del Nord" },
  { id: "ie", nome: "Irlanda", capitale: "Dublino", citta: ["Cork", "Limerick"], pop: 5150000, area: 70273, pil: 560, regione: "Europa Occidentale" },
  { id: "it", nome: "Italia", capitale: "Roma", citta: ["Milano", "Napoli"], pop: 58900000, area: 301340, pil: 2300, regione: "Europa Meridionale" },
  { id: "xk", nome: "Kosovo", capitale: "Pristina", citta: ["Prizren", "Peja"], pop: 1600000, area: 10887, pil: 11, regione: "Europa Orientale", sulMappa: false },
  { id: "lv", nome: "Lettonia", capitale: "Riga", citta: ["Daugavpils", "Liepaja"], pop: 1850000, area: 64589, pil: 45, regione: "Europa del Nord" },
  { id: "li", nome: "Liechtenstein", capitale: "Vaduz", citta: ["Schaan", "Triesen"], pop: 40000, area: 160, pil: 7, regione: "Europa Centrale", sulMappa: false },
  { id: "lt", nome: "Lituania", capitale: "Vilnius", citta: ["Kaunas", "Klaipeda"], pop: 2860000, area: 65300, pil: 85, regione: "Europa del Nord" },
  { id: "lu", nome: "Lussemburgo", capitale: "Lussemburgo", citta: ["Esch-sur-Alzette", "Differdange"], pop: 660000, area: 2586, pil: 95, regione: "Europa Occidentale" },
  { id: "mt", nome: "Malta", capitale: "La Valletta", citta: ["Birkirkara", "Mosta"], pop: 545000, area: 316, pil: 21, regione: "Europa Meridionale" },
  { id: "md", nome: "Moldavia", capitale: "Chisinau", citta: ["Tiraspol", "Balti"], pop: 2510000, area: 33846, pil: 16, regione: "Europa Orientale" },
  { id: "mc", nome: "Monaco", capitale: "Monaco", citta: ["Monte-Carlo", "La Condamine"], pop: 39000, area: 2, pil: 8, regione: "Europa Occidentale", sulMappa: false },
  { id: "me", nome: "Montenegro", capitale: "Podgorica", citta: ["Niksic", "Herceg Novi"], pop: 620000, area: 13812, pil: 7, regione: "Europa Orientale" },
  { id: "nl", nome: "Paesi Bassi", capitale: "Amsterdam", citta: ["Rotterdam", "L'Aia"], pop: 17900000, area: 41850, pil: 1150, regione: "Europa Occidentale" },
  { id: "mk", nome: "Macedonia del Nord", capitale: "Skopje", citta: ["Bitola", "Kumanovo"], pop: 1830000, area: 25713, pil: 15, regione: "Europa Orientale" },
  { id: "no", nome: "Norvegia", capitale: "Oslo", citta: ["Bergen", "Trondheim"], pop: 5550000, area: 385207, pil: 540, regione: "Europa del Nord" },
  { id: "pl", nome: "Polonia", capitale: "Varsavia", citta: ["Cracovia", "Breslavia"], pop: 37600000, area: 312696, pil: 810, regione: "Europa Centrale" },
  { id: "pt", nome: "Portogallo", capitale: "Lisbona", citta: ["Porto", "Braga"], pop: 10500000, area: 92212, pil: 300, regione: "Europa Meridionale" },
  { id: "ro", nome: "Romania", capitale: "Bucarest", citta: ["Cluj-Napoca", "Timisoara"], pop: 19000000, area: 238397, pil: 350, regione: "Europa Orientale" },
  { id: "ru", nome: "Russia", capitale: "Mosca", citta: ["San Pietroburgo", "Novosibirsk"], pop: 144000000, area: 17098246, pil: 2080, regione: "Europa Orientale", nota: "Paese transcontinentale: dati riferiti all'intero paese." },
  { id: "sm", nome: "San Marino", capitale: "San Marino", citta: ["Serravalle", "Borgo Maggiore"], pop: 34000, area: 61, pil: 1.8, regione: "Europa Meridionale", sulMappa: false },
  { id: "rs", nome: "Serbia", capitale: "Belgrado", citta: ["Novi Sad", "Nis"], pop: 6600000, area: 88361, pil: 75, regione: "Europa Orientale" },
  { id: "sk", nome: "Slovacchia", capitale: "Bratislava", citta: ["Kosice", "Presov"], pop: 5430000, area: 49035, pil: 130, regione: "Europa Centrale" },
  { id: "si", nome: "Slovenia", capitale: "Lubiana", citta: ["Maribor", "Celje"], pop: 2120000, area: 20273, pil: 65, regione: "Europa Centrale" },
  { id: "es", nome: "Spagna", capitale: "Madrid", citta: ["Barcellona", "Valencia"], pop: 48600000, area: 505990, pil: 1620, regione: "Europa Meridionale" },
  { id: "se", nome: "Svezia", capitale: "Stoccolma", citta: ["Göteborg", "Malmö"], pop: 10550000, area: 450295, pil: 610, regione: "Europa del Nord" },
  { id: "ch", nome: "Svizzera", capitale: "Berna", citta: ["Zurigo", "Ginevra"], pop: 8900000, area: 41285, pil: 900, regione: "Europa Centrale" },
  { id: "ua", nome: "Ucraina", capitale: "Kiev", citta: ["Kharkiv", "Odessa"], pop: 37000000, area: 603628, pil: 180, regione: "Europa Orientale" },
  { id: "gb", nome: "Regno Unito", capitale: "Londra", citta: ["Birmingham", "Manchester"], pop: 68300000, area: 243610, pil: 3700, regione: "Europa Occidentale" },
  { id: "va", nome: "Città del Vaticano", capitale: "Città del Vaticano", citta: [], pop: 800, area: 0.49, pil: null, regione: "Europa Meridionale", sulMappa: false, nota: "Il più piccolo Stato del mondo: nessun dato ufficiale di PIL." }
];
