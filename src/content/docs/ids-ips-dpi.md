---
title: Dispensa - IDS, IPS e DPI
description: Sistemi avanzati di sicurezza di rete (Intrusion Detection, Intrusion Prevention e Deep Packet Inspection).
---

## Introduzione
Nelle moderne infrastrutture di rete, garantire la sicurezza oltre il semplice firewall richiede sistemi specializzati in grado di riconoscere attacchi sofisticati e minacce che sfruttano protocolli leciti. La protezione perimetrale da sola non è più sufficiente: un firewall tradizionale che consente il traffico HTTP verso un server web interno non può distinguere tra una richiesta legittima e un attacco informatico nascosto nel contenuto del pacchetto. 

Per questo motivo, le tre tecnologie affrontate in questa dispensa rappresentano la difesa moderna per eccellenza: **IDS (Intrusion Detection System)**, **IPS (Intrusion Prevention System)** e **DPI (Deep Packet Inspection)**. L'obiettivo è comprendere le funzioni, le differenze e i contesti di applicazione di questi sistemi, fondamentali per l'Esame di Stato.

---

## 1. IDS – Intrusion Detection System

### 1.1 Definizione e Ruolo
Un IDS (Intrusion Detection System) è un sistema di sicurezza progettato per **rilevare** potenziali intrusioni, violazioni di policy o comportamenti anomali nel traffico di rete o nelle attività di sistema. Il suo ruolo fondamentale è quello di "sensore e sistema di allarme": analizza il traffico, lo confronta con regole predefinite e genera notifiche quando nota qualcosa di sospetto.

La caratteristica distintiva dell'IDS è che **lavora in modo passivo**. Non blocca direttamente il traffico, non modifica i pacchetti e non interviene nel flusso dei dati. Semplicemente osserva, analizza e segnala all'amministratore.

### 1.2 Posizionamento nella Rete
A differenza del firewall, che si trova fisicamente sul percorso obbligato dei pacchetti (in linea), l'IDS viene posizionato **a lato della rete**, spesso collegato a una porta speciale dello switch chiamata *Porta Mirror* (SPAN) o a un dispositivo passivo chiamato TAP.
* **Vantaggio:** Ricevendo solo una *copia* del traffico, se l'IDS si guasta la rete continua a funzionare normalmente.
* **Svantaggio:** Non essendo sul percorso dei dati, non può intervenire fisicamente per bloccare l'attacco; può solo lanciare l'allarme.

### 1.3 Tipologie di IDS
* **NIDS (Network-based IDS):** Monitora il traffico che viaggia sui cavi di rete. Esamina i pacchetti in transito alla ricerca di schemi di attacco. È centralizzato e "vede" tutto ciò che passa su quel segmento.
* **HIDS (Host-based IDS):** È un software installato sui singoli computer/server (host). Monitora le attività locali, come i file di log, i processi in memoria e le modifiche ai file di sistema, rilevando minacce che magari non generano traffico di rete anomalo.

### 1.4 Tecniche di Rilevamento
* **Rilevamento a Firme (Signature-based):** L'IDS possiede un database di "identikit" (firme) di attacchi noti (es. una specifica sequenza di byte di un malware). Se il traffico corrisponde all'identikit, scatta l'allarme. È infallibile contro le minacce conosciute, ma inutile contro quelle nuove (*Zero-Day*).
* **Rilevamento ad Anomalie (Anomaly-based):** L'IDS studia la rete per giorni e crea un modello di "comportamento normale" (Baseline). Se improvvisamente il traffico devia da questa normalità (es. un PC inizia a inviare migliaia di email di notte), scatta l'allarme. È ottimo per scovare attacchi nuovi, ma rischia di generare molti "falsi allarmi" (Falsi Positivi).

---

## 2. IPS – Intrusion Prevention System

### 2.1 Definizione e Ruolo
Un IPS (Intrusion Prevention System) è l'evoluzione dell'IDS. Non si limita a rilevare le intrusioni, ma **interviene attivamente per bloccarle** in tempo reale. 
Se l'IDS è come una "telecamera a circuito chiuso" che registra il furto e fa suonare l'allarme, l'IPS è una "guardia giurata armata": riconosce la minaccia e interviene fisicamente per fermarla in automatico.

### 2.2 Posizionamento nella Rete
Per poter bloccare le minacce, l'IPS **deve essere posizionato in linea (inline)** sul percorso critico dei dati (solitamente subito dietro al firewall). Tutto il traffico deve obbligatoriamente attraversarlo.
* **Vantaggio:** Risposta immediata agli attacchi, bloccati prima che raggiungano il bersaglio.
* **Svantaggio:** Se l'IPS si guasta, la rete si blocca (diventa un *Single Point of Failure*). Inoltre, analizzando tutto il traffico in tempo reale, può introdurre dei leggeri ritardi (latenza).

### 2.3 Azioni di Blocco dell'IPS
Quando l'IPS individua un attacco, può agire in vari modi:
* **Drop dei pacchetti:** Scarta i pacchetti malevoli cestinandoli.
* **Reset della connessione:** Invia comandi specifici (TCP RST) per chiudere bruscamente la comunicazione tra attaccante e vittima.
* **Blocco dinamico:** Dialoga con il firewall dicendogli di bloccare temporaneamente tutto il traffico proveniente dall'indirizzo IP dell'attaccante.

---

## 3. DPI – Deep Packet Inspection

### 3.1 Definizione e Concetto
La Deep Packet Inspection (DPI) non è un dispositivo fisico a sé stante, ma una **tecnica di analisi avanzata** integrata spesso nei firewall di nuova generazione (NGFW) e negli IPS. 
Mentre un firewall classico si limita a leggere l'intestazione del pacchetto (Livelli 2, 3 e 4 del Modello OSI: MAC, IP, Porte), la DPI "apre" la busta e legge il contenuto effettivo del messaggio (Livelli 5, 6 e 7 del Modello OSI: i dati dell'applicazione).

> **💡 Metafora per gli studenti:** Se il firewall classico è un postino che smista le lettere leggendo solo l'indirizzo sulla busta, la DPI è uno scanner a raggi X (o un ispettore) che apre la busta, legge il contenuto della lettera e capisce se dentro ci sono scritte informazioni pericolose.

### 3.2 Cosa permette di fare la DPI?
* **Identificare la vera applicazione:** Capisce se su una comune porta 80 sta passando una normale pagina web o, ad esempio, un trasferimento illecito di file P2P, bloccandolo.
* **Intercettare minacce nascoste:** Scova malware, virus o comandi pericolosi (es. SQL Injection) camuffati dentro un traffico apparentemente innocuo.
* **Filtraggio dei contenuti e DLP:** Permette di bloccare specifiche parole chiave, impedire l'uso dei social network in ufficio o evitare che i dipendenti inviino documenti riservati all'esterno (Data Loss Prevention).

Tuttavia, la DPI richiede un'enorme potenza di calcolo, rallenta il traffico e solleva enormi problemi di Privacy (specialmente con il traffico cifrato HTTPS).

---

## 4. Visione d'Insieme e Scenario di Difesa

| Elemento | Ruolo Primario | Posizionamento | Modalità | Azione |
| :--- | :--- | :--- | :--- | :--- |
| **Firewall** | Controllo accessi base sulle porte | Sul perimetro, in linea | Attivo | Permette/blocca in base a IP e Porte |
| **IDS** | Rilevamento e allarme | A lato della rete (Porta Mirror) | Passivo | Genera alert, non tocca i pacchetti |
| **IPS** | Prevenzione attiva | In linea (dopo il firewall) | Attivo | Blocca pacchetti, chiude connessioni |
| **DPI** | Tecnica di ispezione profonda | Dentro Firewall/IPS | Attiva | Analizza il payload (contenuto) al livello 7 |

### 4.1 Scenario pratico di esame: Attacco a un Server Web
Immaginiamo che un attaccante tenti un attacco XSS (Cross-Site Scripting) verso il server web della scuola per rubare i dati degli utenti:
1. **Il Firewall** vede arrivare una richiesta sulla porta 80/443 (HTTP/HTTPS). Visto che il server web *deve* essere pubblico, la porta è aperta: il firewall la fa passare senza sospetti.
2. **L'IPS (dotato di DPI)** riceve il traffico dal firewall. Apre il pacchetto e ispeziona il contenuto (DPI). Trova dei frammenti di codice JavaScript malevolo (il payload dell'attacco XSS). 
3. L'IPS fa "match" con le sue firme, capisce che è un attacco, blocca istantaneamente il pacchetto e chiude la connessione dell'hacker, inviando un alert all'amministratore. La scuola è salva!

---

## 5. Sintesi conclusiva per lo studio

La sicurezza di una rete moderna non può basarsi unicamente sul firewall tradizionale. L'evoluzione delle minacce informatiche ha reso indispensabile un'architettura di sicurezza stratificata (*Defense in Depth*):
* **L'IDS** fornisce visibilità e consapevolezza (allarmando in caso di anomalie).
* **L'IPS** fornisce una protezione automatica e reattiva contro minacce note.
* **La DPI** fornisce "gli occhi" per guardare dentro i pacchetti e riconoscere attacchi avanzati e l'uso improprio delle applicazioni.

Per l'esame di Stato, è cruciale ricordare che l'integrazione di questi tre strumenti permette non solo di decidere *chi* entra nella rete (compito del firewall), ma di controllare *cosa* fa e *come* si comporta una volta dentro.

> **💡 Definizione rapida per l'interrogazione:**
> *L'**IDS** è un sistema di sicurezza passivo che analizza una copia del traffico di rete per rilevare e segnalare intrusioni o anomalie. L'**IPS** è la sua evoluzione attiva: posizionato sul percorso dei dati, rileva le minacce e interviene automaticamente per bloccarle. Entrambi si affidano spesso alla **DPI (Deep Packet Inspection)**, una tecnica avanzata che analizza il contenuto profondo (payload) dei pacchetti di rete a livello applicativo per scovare minacce nascoste nel traffico apparentemente legittimo.*

---

## 6. Glossario essenziale

* **ACL (Access Control List):** Elenco di regole statiche usate da router e firewall per consentire o bloccare il passaggio dei pacchetti in base a IP e Porte.
* **Anomaly-Based Detection:** Rilevamento basato sulle anomalie. Identifica attacchi confrontando il traffico attuale con un profilo di comportamento "normale" della rete (Baseline).
* **Baseline:** Profilo che rappresenta lo stato di normalità di una rete (es. orari di picco, protocolli più usati), fondamentale per gli IDS ad anomalie.
* **DPI (Deep Packet Inspection):** Tecnica di analisi che ispeziona il payload completo dei pacchetti (fino al Livello 7 del modello OSI), superando i limiti della sola lettura degli header IP.
* **Drop:** Azione tipica dell'IPS e del firewall che consiste nello scartare (cestinare) un pacchetto di rete malevolo o non autorizzato.
* **Exploit:** Codice o script che sfrutta una specifica vulnerabilità (bug) in un sistema informatico per prenderne il controllo o sottrarre dati.
* **Falso Positivo:** Un allarme generato per errore da un sistema di sicurezza quando analizza un traffico in realtà perfettamente legittimo.
* **Firma di Attacco (Signature):** Pattern specifico di byte (l'"identikit" digitale) che corrisponde a un attacco informatico noto, usato dai sistemi Signature-Based.
* **NIDS / HIDS:** Network-based IDS (monitora un intero segmento di rete) e Host-based IDS (installato come software per proteggere un singolo computer/server).
* **Payload:** Il carico utile di un pacchetto di rete, ovvero i dati effettivi dell'applicazione trasportati al netto delle intestazioni di protocollo (header).
* **SPAN (Porta Mirror):** Configurazione di uno switch che copia tutto il traffico di una o più porte verso un'altra porta, alla quale è solitamente collegato un IDS passivo.
* **Zero-Day:** Vulnerabilità di sicurezza informatica appena scoperta, per la quale i produttori del software non hanno ancora rilasciato una patch di correzione.