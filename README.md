# VignaPlanner Campo

App per smartphone (PWA, installabile via GitHub Pages) che mostra su mappa GPS i vigneti
creati con **VignaPlanner** (l'app desktop), con tutte le informazioni per filare e per vite:
varietà, numero filare, numero vite, portainnesto, clone, numero viti per varietà, ettari, ecc.

Non serve alcun server/backend: è un'unica app statica (HTML/CSS/JS) che gira nel browser
del telefono e salva i dati in locale (localStorage), quindi funziona anche offline una volta
importato il file.

## Come funziona il collegamento con il desktop

1. Nel VignaPlanner desktop apri la scheda **"▣ Vigneti"** (i vigneti già salvati).
2. Premi il pulsante **"↓ Esporta JSON"** in alto a destra: viene scaricato un file
   `vigneti_ERSA.json` con tutti i vigneti salvati (filari, viti, varietà, posizione GPS
   di ancoraggio, rotazione, ecc.). Nessuna modifica al desktop è necessaria: questo
   pulsante esiste già nell'app che mi hai fornito.
3. Apri **VignaPlanner Campo** sul telefono, tocca **⇪** in alto a destra (o il pulsante
   "Carica file JSON" nella schermata iniziale) e seleziona quel file.
4. L'app calcola in automatico, con le stesse formule del planner desktop, la posizione
   GPS reale di ogni filare, ogni vite e ogni palo, e li disegna sulla mappa satellitare/stradale.

**Importante:** solo i vigneti che nel desktop sono stati posizionati con
"◎ Posiziona vigneto" (cioè hanno una posizione GPS di ancoraggio) verranno mostrati in
mappa. Un vigneto salvato ma mai posizionato comparirà nell'elenco ma segnalato come
"⚠ senza GPS".

Ogni volta che aggiorni/aggiungi vigneti nel desktop, ripeti semplicemente l'esportazione
e ricarica il file nell'app: sovrascrive i dati precedenti sul telefono.

## Cosa mostra l'app

- **Mappa GPS live**: pallino blu con cerchio di precisione che segue la tua posizione
  reale in campo (richiede il permesso di geolocalizzazione del telefono).
- **Filari** disegnati come linee, con etichetta essenziale (solo `F1`, `F2`, ecc.) ancorata
  all'inizio del filare ma spostata verso la capezzagna (l'esterno del filare), così non copre
  mai la prima vite, a qualunque livello di zoom. Un secondo tipo di etichetta, disattivabile
  separatamente, mostra anche la varietà del filare (es. "F3 Merlot"), oppure "Misto" o "Ampelo"
  per i filari a più varietà (cadenza mista o centro ampelografico), come nel planner desktop.
  Due pulsanti dedicati in basso a destra ("F1" e "F1 var") permettono di mostrare o nascondere
  a piacimento, in modo indipendente, ciascuno dei due tipi di etichetta.
  Poiché nei vigneti reali i filari sono spesso a soli 2-2,5 m l'uno dall'altro, quando si è
  zoomati poco (per avere una visione d'insieme) l'app mostra automaticamente solo un'etichetta
  ogni tot filari, per restare sempre leggibile e senza sovrapposizioni; avvicinandosi con lo
  zoom, le etichette aumentano di numero fino a comparire su ogni singolo filare.
- **Viti** come simboli colorati per varietà (stesso colore usato nel planner) e con la
  **forma** che indica il sistema di allevamento effettivo della vite (cerchio, quadrato,
  rombo, triangolo, stella, esagono, croce — configurabili nel desktop in "DB Allevamento");
  toccandole si apre un popup con vigneto, numero filare, numero vite, **sistema di
  allevamento**, **anno di impianto** (segnalato come "reimpianto" se diverso da quello del
  filare/vigneto, cioè una vite ripiantata in epoca diversa dal resto), portainnesto e clone.
- **Pali** come piccoli punti marroni lungo il filare.
- **Pannello "▣ Vigneti"**: elenco di tutti i vigneti importati, con filari/viti/ettari,
  varietà principali, ricerca per nome, e possibilità di accendere/spegnere la
  visualizzazione di ciascun vigneto in mappa (utile se hai molti appezzamenti). Ogni
  vigneto mostra anche tutti i suoi dati descrittivi presenti nel file esportato dal
  desktop — sistema di allevamento, comune, anno di impianto, interfilare, distanza pali,
  altezza spalliera, numero di fili, coordinate GPS e note — esattamente come nella scheda
  vigneto del planner. Se per il vigneto è stata definita anche la **struttura verticale**
  (pali, fili, cimatura), viene mostrata per intero: altezza di palo di testa e palo
  intermedio, altezza e tipo (singolo/coppia) di ogni filo con indicazione di quale sia la
  banchina, altezza totale, cimatura e parete vegetativa risultante — stessa formula del
  planner desktop.
- **Pannello "🍇 Varietà"**: elenco di tutte le varietà presenti in tutti i vigneti
  importati, con conteggio viti totale e colore, con ricerca.
- **Pannello "ⓘ Dati"**: totali complessivi (vigneti, filari, viti, ettari), pulsante per
  importare un nuovo file e pulsante per cancellare i dati salvati sul telefono.
- **Mappa orientabile a piacimento** (🧭 in basso a destra): non è più fissa a nord in alto.
  Ruotala con due dita direttamente sullo schermo (gesto naturale, come su Google/Apple Maps)
  per allinearla, ad esempio, alla direzione dei filari mentre cammini nel vigneto. Il pulsante
  bussola mostra sempre dove si trova il vero Nord e i gradi di rotazione attuali; toccandolo
  la mappa torna istantaneamente a "nord in alto".
- **Cambio mappa** (pulsante "SAT"/"MAPPA" in basso a destra): stradale (OpenStreetMap) / satellitare (Esri).
- **Funziona offline** una volta caricato il file: i dati restano salvati sul telefono
  (localStorage). Le sole immagini della mappa (tile stradali/satellitari) richiedono
  connessione dati, salvo quelle già visitate di recente che il telefono potrebbe avere
  già in cache.
- **Icona dell'app**: lo stesso simbolo "◆" usato nell'header del VignaPlanner desktop,
  su sfondo verde identico, per riconoscerla subito come parte della stessa famiglia di strumenti.

## Struttura dei file

```
VignaPlanner-Campo/
├── index.html          → l'intera app (mappa, import, elenco vigneti/varietà)
├── manifest.json        → manifest PWA (nome, icone, colori, installabilità)
├── sw.js                 → service worker (funzionamento offline dell'app)
└── icons/
    ├── icon-192.png             → icona principale
    ├── icon-512.png             → icona principale (alta risoluzione)
    ├── icon-180.png             → icona per iPhone/iPad (apple-touch-icon)
    ├── icon-192-maskable.png    → variante "maskable" (Android adatta la forma al tema del telefono)
    └── icon-512-maskable.png    → variante "maskable", alta risoluzione
```

---

## Pubblicazione su GitHub Pages (una volta sola)

1. Crea un nuovo repository su GitHub (pubblico o privato: con GitHub Pages funziona
   comunque; se privato serve un piano GitHub che lo consenta, altrimenti crealo pubblico —
   non contiene dati sensibili, solo il codice dell'app).
   - Nome suggerito: `vignaplanner-campo`
2. Carica in quel repository **tutti** i file di questa cartella (`index.html`,
   `manifest.json`, `sw.js`, e la cartella `icons/` con i 3 file al suo interno),
   mantenendo la stessa struttura di cartelle.
   - Più semplice da browser: sulla pagina del repository, "Add file" → "Upload files",
     trascina tutti i file (compresa la cartella `icons`), poi "Commit changes".
3. Vai su **Settings → Pages** del repository.
4. In "Build and deployment" → "Source" seleziona **"Deploy from a branch"**.
5. In "Branch" scegli `main` (o `master`) e cartella `/ (root)`, poi **Save**.
6. Dopo circa 1 minuto, GitHub mostrerà l'indirizzo pubblico dell'app, del tipo:
   ```
   https://TUO-UTENTE.github.io/vignaplanner-campo/
   ```
   Quello è il link da aprire sul telefono.

### In alternativa da riga di comando (git)

```bash
git init
git add .
git commit -m "VignaPlanner Campo - prima versione"
git branch -M main
git remote add origin https://github.com/TUO-UTENTE/vignaplanner-campo.git
git push -u origin main
```
Poi abilita comunque GitHub Pages come al punto 3-5 sopra.

---

## Installazione sul telefono (come "app" vera e propria)

L'app è una **PWA** (Progressive Web App): non serve alcun app store, si installa
direttamente dal browser e appare come icona sulla home, a schermo intero, senza barra
degli indirizzi.

### Su Android (Chrome)
1. Apri il link `https://TUO-UTENTE.github.io/vignaplanner-campo/` in Chrome.
2. Tocca i tre puntini in alto a destra → **"Installa app"** (o "Aggiungi a schermata Home").
3. Conferma: l'icona "VP Campo" comparirà sulla home come un'app normale.

### Su iPhone/iPad (Safari)
1. Apri il link in **Safari** (l'installazione da altri browser su iOS non è supportata da Apple).
2. Tocca l'icona di condivisione (il quadrato con la freccia verso l'alto).
3. Scorri e scegli **"Aggiungi a Home"**.
4. Conferma: comparirà l'icona "VP Campo" sulla schermata Home.

Al primo avvio, il telefono chiederà il permesso di usare il **GPS**: va concesso perché
è il cuore dell'app (senza non può mostrare la tua posizione rispetto ai filari).

---

## Aggiornare l'app in futuro

Per modificare l'app (nuove funzioni, correzioni), basta sovrascrivere i file nel
repository GitHub (stesso "Upload files" di prima, sovrascrivendo `index.html` ecc.):
GitHub Pages ripubblica automaticamente in 1-2 minuti. Chi ha già installato l'app sul
telefono riceverà l'aggiornamento la prima volta che la riapre con connessione a internet
(il service worker scarica la nuova versione della shell in background).

## Prestazioni e stabilità

L'app disegna viti, pali e filari su `<canvas>` invece che come singoli elementi grafici
separati (più leggero da spostare/ruotare/ingrandire sui telefoni, soprattutto con vigneti
di grandi dimensioni), e ricalcola le etichette dei filari solo dopo che un gesto di zoom o
rotazione si è fermato, non durante il gesto stesso — la geometria di viti/pali/filari non
viene mai ricostruita durante l'uso della mappa, solo quando cambiano i dati importati.

Con più vigneti caricati insieme, accendere o spegnere la visibilità di un singolo vigneto
nell'elenco non ricostruisce più tutti gli altri: ogni vigneto viene disegnato una sola
volta e da quel momento accenderlo/spegnerlo è istantaneo. Allo stesso modo, il salvataggio
sul telefono distingue i cambi di visibilità (istantanei) dal salvataggio dell'intero
dataset (solo quando importi un nuovo file), evitando riscritture inutili su disco durante
il normale utilizzo in campo.

Il GPS ad alta precisione si sospende automaticamente quando l'app va in background
(schermo spento o altra app in primo piano) e riprende da sé al ritorno in primo piano, per
non consumare batteria inutilmente durante una giornata di lavoro. Il ricentraggio
automatico sulla posizione ignora le micro-oscillazioni del segnale sotto 1,5 metri e non
usa animazioni, per un aggancio stabile invece che "nervoso" mentre si cammina tra i filari.

Durante l'importazione di file molto grandi compare un indicatore di caricamento, così
l'app non sembra bloccata mentre elabora migliaia di viti. Se al primissimo avvio manca la
connessione dati (necessaria una sola volta per scaricare i componenti della mappa), l'app
mostra un messaggio chiaro con un pulsante "Riprova" invece di restare bloccata in silenzio.

Su vigneti molto estesi (molte migliaia di viti complessive) qualche rallentamento
all'apertura o alla prima attivazione di un vigneto mai mostrato prima è comunque normale.

## Limiti da tenere presenti

- La precisione del posizionamento in campo dipende dal GPS del telefono (in genere
  3-8 metri in condizioni normali, peggiore vicino a filari fitti/edifici) e dalla
  precisione con cui il vigneto è stato "ancorato" nel planner desktop.
- Le mappe satellitari/stradali richiedono connessione dati la prima volta che si visita
  una zona; se lavori spesso nelle stesse zone, il telefono tende comunque a tenerle in
  cache per un po'.
- Il file `vigneti_ERSA.json` contiene i dati di **tutti** i vigneti salvati nel desktop:
  se vuoi condividere sul campo solo un sottoscritto sottoinsieme, puoi comunque importare
  il file completo e poi disattivare in app i vigneti che non ti servono (elenco "▣ Vigneti").
