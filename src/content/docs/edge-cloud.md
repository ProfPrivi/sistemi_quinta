---
title: "Elaborazione Dati: Edge Computing vs Cloud Computing"
description: "Quando e perché elaborare i dati localmente. L'importanza dell'Edge Computing per ridurre la latenza, risparmiare banda e garantire la sicurezza in ambito IoT."
---

Negli ultimi dieci anni, il mantra dell'informatica è stato: *"Sposta tutto nel Cloud"*. E in gran parte è stato un successo. Tuttavia, con l'esplosione dell'Internet of Things (IoT), delle videocamere ad alta risoluzione e dei veicoli autonomi, le reti aziendali stanno affrontando un problema fisico insormontabile: la velocità della luce e la larghezza di banda. 

È qui che entra in gioco l'**Edge Computing**.

---

## 1. Spiegazione Diretta: La metafora del Ristorante

Per capire la differenza tra Cloud ed Edge, immagina di gestire un ristorante. 

* **Il Cloud Computing** è come avere una gigantesca cucina industriale in un'altra città. Ha risorse infinite, forni giganti e mille cuochi. Ma c'è un problema: ogni volta che un cliente ordina un caffè, devi mandare la richiesta in quell'altra città, aspettare che lo preparino e che te lo spediscano indietro. Il viaggio richiede troppo tempo (**Latenza**) e le spese di spedizione continue ti rovinano (**Consumo di Banda**).
* **L'Edge Computing** è come avere una piccola cucina veloce direttamente dentro il tuo ristorante. Per le operazioni immediate (il caffè, un panino) fai tutto in locale in pochi secondi. Mandi alla cucina industriale nell'altra città solo le richieste complesse (es. preparare un banchetto nuziale) o i resoconti a fine giornata.

Se un'auto a guida autonoma vede un ostacolo, non può permettersi di inviare l'immagine a un Cloud Server in Irlanda, aspettare che l'intelligenza artificiale la analizzi e riceva il comando "Frena!". Ci vorrebbero 100 millisecondi: troppi, l'auto avrebbe già fatto un incidente. L'elaborazione deve avvenire **immediatamente, a bordo dell'auto** (all'Edge, ovvero "al margine" della rete).

---

## 2. I limiti del Cloud Computing moderno

Il Cloud (AWS, Microsoft Azure, Google Cloud) rimane insostituibile per l'archiviazione di massa (Big Data), l'addestramento di intelligenze artificiali e l'hosting di siti web. Ma presenta tre criticità strutturali quando si parla di dispositivi in tempo reale:

1. **Latenza elevata:** Il tempo (Round-Trip Time) necessario affinché un pacchetto dati viaggi dal dispositivo IoT al server Cloud e ritorni, spesso supera i 50-100 millisecondi. Per la robotica industriale sono un'eternità.
2. **Saturazione della Banda (Bandwidth):** Immagina una fabbrica con 100 videocamere di sicurezza in 4K. Inviare tutti quei flussi video 24 ore su 24 verso un server Cloud saturerebbe istantaneamente qualsiasi connessione in fibra ottica aziendale, con costi enormi.
3. **Dipendenza dalla connessione (Single Point of Failure):** Se cade la connessione a Internet, i dispositivi IoT "stupidi" che dipendono dal Cloud smettono di funzionare, bloccando l'intera produzione aziendale.

---

## 3. I vantaggi dell'Edge Computing

L'Edge Computing sposta la potenza di calcolo (CPU, RAM, Storage) via dal data center centralizzato e la porta il più vicino possibile a dove i dati vengono generati: dentro un sensore smart, in un router aziendale (a volte chiamato *Fog Computing*) o in un piccolo server locale dentro la fabbrica.

Perché implementarlo in un'architettura di rete?
* **Latenza quasi zero:** I dati viaggiano solo per pochi metri su una LAN locale (o su un 5G privato), consentendo reazioni in tempo reale (sotto il millisecondo).
* **Ottimizzazione della Banda:** Le 100 videocamere 4K inviano il video al server Edge locale. L'intelligenza artificiale locale analizza i video. Se non succede nulla, i video vengono cancellati. Se rileva un intruso, l'Edge invia al Cloud *solo* una clip di 10 secondi. Il risparmio di banda è del 99%.
* **Continuità Operativa (Offline):** Se il router si guasta e internet cade, i macchinari della fabbrica continuano a comunicare con il server Edge locale senza interruzioni.
* **Privacy e Compliance:** Elaborando dati sensibili in locale (es. cartelle cliniche in un ospedale o riconoscimento facciale), si evita di farli transitare sulla rete pubblica, rispettando le normative GDPR.

---

## 4. Applicazioni pratiche per la Seconda Prova

Inserire il paradigma Cloud/Edge in un tema di maturità permette allo studente di dimostrare grandi capacità di analisi e ottimizzazione delle risorse.

### Scenario A: Videosorveglianza Smart e Sicurezza
* **Richiesta tipica:** "Progettare la rete per una catena di supermercati con decine di telecamere per filiale, ottimizzando i costi di connettività."
* **Soluzione da proporre:** Anziché noleggiare costose linee in fibra ottica per inviare i flussi video continui a un server Cloud centrale, si progetta un'architettura **Edge Computing**. In ogni supermercato viene installato un server locale (Edge Node) che elabora le immagini. Solo i dati aggregati (es. conteggio clienti) e gli allarmi di sicurezza verranno trasmessi al Data Center centrale (Cloud) tramite una VPN o SD-WAN.

### Scenario B: Industria 4.0 e Manutenzione Predittiva
* **Richiesta tipica:** "Garantire l'affidabilità della rete per i bracci robotici di un polo manifatturiero."
* **Soluzione da proporre:** Per evitare i problemi di latenza del Cloud, si implementa l'elaborazione **Edge** direttamente in fabbrica (sfruttando anche il 5G **URLLC**). I sensori dei robot comunicheranno con un controller locale per i movimenti in tempo reale. Il **Cloud** verrà invece utilizzato *solo* a fine giornata: riceverà i log giornalieri per addestrare algoritmi di Machine Learning capaci di prevedere quando un pezzo si guasterà (manutenzione predittiva).

### Scenario C: Ospedali e Telemedicina
* **Richiesta tipica:** "Ottimizzare la rete di una clinica per gestire macchinari di diagnostica per immagini (TAC, Risonanze) ed evitare la violazione dei dati dei pazienti."
* **Soluzione da proporre:** Le immagini ad altissima risoluzione vengono elaborate da server **Edge** all'interno dell'ospedale (garantendo latenza nulla per i medici e continuità anche in caso di down della connessione Internet). I dati inviati al **Cloud** per la ricerca medica verranno preventivamente resi anonimi dal server Edge, garantendo la totale conformità alle norme sulla privacy.