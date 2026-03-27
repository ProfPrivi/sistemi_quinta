---
title: "Protocolli Applicativi: Web (HTTP/HTTPS) e Mail (SMTP, IMAP, POP3)"
description: "Analisi dettagliata dei protocolli fondamentali per la navigazione web sicura (certificati TLS/SSL) e per la gestione della posta elettronica aziendale."
---

Senza il livello applicativo (Livello 7 del modello ISO/OSI), le reti sarebbero solo cavi e router che spostano pacchetti incomprensibili. Sono i protocolli applicativi a dare un senso a questi dati, permettendoci di navigare su siti web sicuri e di inviare e ricevere comunicazioni.

In questa dispensa analizziamo i due pilastri della comunicazione aziendale: il Web e la Posta Elettronica.

---

## 1. I Protocolli Web: HTTP vs HTTPS

L'**HTTP (HyperText Transfer Protocol)** è il protocollo alla base del World Wide Web. Lavora sulla **porta TCP 80** e ha un difetto enorme: trasmette i dati "in chiaro" (plain text). Se inserisci una password su un sito HTTP, chiunque stia "sniffando" la rete (ad esempio su un Wi-Fi pubblico) può leggerla perfettamente.

Per questo motivo oggi si usa quasi esclusivamente l'**HTTPS (HTTP Secure)**, che lavora sulla **porta TCP 443**. L'HTTPS non è un protocollo nuovo, ma è semplicemente l'HTTP "avvolto" in un tunnel crittografato dal protocollo **TLS (Transport Layer Security)**, precedentemente noto come SSL.

### Come funziona la crittografia TLS e i Certificati

Quando ti colleghi a un sito HTTPS (es. quello della tua banca), avviene un processo chiamato **TLS Handshake** ("stretta di mano"):

1. **Autenticazione (Il Certificato):** Il server invia al tuo browser il suo **Certificato Digitale**. Questo documento contiene la "Chiave Pubblica" del server ed è firmato digitalmente da un'Autorità di Certificazione (CA) fidata (es. Let's Encrypt, DigiCert). Il browser verifica la firma: se è valida, sa che il sito è autentico e non è un clone truffaldino.
2. **Scambio delle Chiavi (Crittografia Asimmetrica):** Il tuo PC usa la Chiave Pubblica del server per criptare un messaggio segreto e lo invia al server. Solo il server, che possiede la "Chiave Privata", può decifrarlo.
3. **Comunicazione Veloce (Crittografia Simmetrica):** A questo punto, PC e Server hanno concordato una chiave segreta comune. Da ora in poi, useranno questa chiave per criptare tutto il traffico (password, video, testi) in modo rapidissimo e inattaccabile.

> [!caution] **Il lucchetto non significa "sito onesto"**
> Ricorda sempre: l'HTTPS garantisce solo che nessuno stia spiando la comunicazione tra te e il server. Se ti colleghi a un sito truffa (phishing) che ha attivato l'HTTPS, la tua connessione è sicurissima... ma stai inviando i tuoi dati in modo sicurissimo direttamente al truffatore!

---

## 2. I Protocolli di Posta Elettronica

La gestione delle email richiede due protocolli separati: uno per "spedire" e uno per "ricevere". Possiamo paragonarlo al sistema postale tradizionale.

### A. SMTP (Simple Mail Transfer Protocol) - L'Invio
L'SMTP è il protocollo usato per **inviare** le email. Funziona sulla **porta TCP 25** (o 465/587 per le versioni sicure crittografate). 
Fa due lavori:
* Prende l'email dal tuo Client di posta (es. Outlook, Thunderbird) e la consegna al tuo Server di posta (es. il server di Gmail).
* Sposta l'email dal tuo Server di posta al Server di posta del destinatario.

### B. POP3 (Post Office Protocol v3) - La Ricezione (Vecchio Stile)
Il POP3 (porta **TCP 110** o 995 per la versione sicura) è un protocollo di ricezione "usa e getta". 
* **Come funziona:** Il client si collega al server, scarica fisicamente tutte le email sul disco rigido del PC e le **cancella** dal server. 
* **Il problema:** Se scarichi la posta dal PC dell'ufficio, quando apri l'app sul cellulare non troverai più nulla, perché le email sono state rimosse dal server centrale.

### C. IMAP (Internet Message Access Protocol) - La Sincronizzazione (Moderno)
L'IMAP (porta **TCP 143** o 993 per la versione sicura) è lo standard moderno. 
* **Come funziona:** Invece di scaricare e cancellare, l'IMAP **sincronizza** il client con il server. Le email rimangono sul server centrale. Se leggi un'email sul PC, questa risulterà "già letta" anche sul tuo smartphone. Se crei una cartella, apparirà su tutti i tuoi dispositivi.

---

## 3. Applicazioni pratiche per la Seconda Prova

La configurazione dei server applicativi è spessissimo il cuore della parte pratica del tema d'esame.

### Scenario A: Configurazione del Firewall per la DMZ
* **Richiesta tipica:** "L'azienda ospita internamente un Server Web e un Server di Posta. Quali regole di Firewall bisogna impostare per permettere l'accesso dall'esterno proteggendo la rete?"
* **Soluzione da proporre:** Lo studente specificherà che i server verranno posizionati in una **DMZ**. Sul Firewall perimetrale configurerà delle regole di **Port Forwarding (NAT)** che consentiranno il traffico in ingresso verso la DMZ *solo* ed *esclusivamente* su porte specifiche: 
  * **TCP 80 e 443** per il Web Server.
  * **TCP 25 / 587** per ricevere la posta da altri server (SMTP).
  * **TCP 993** (IMAP over TLS) per permettere ai dipendenti in smart-working di consultare la posta in modo sicuro. 
  Tutte le altre porte verranno bloccate (Regola *Deny All*).

### Scenario B: E-Commerce e Transazioni Sicure
* **Richiesta tipica:** "Garantire che i dati delle carte di credito inseriti dai clienti sul sito web aziendale non vengano intercettati."
* **Soluzione da proporre:** Lo studente indicherà l'implementazione obbligatoria del protocollo **HTTPS**. Specificherà inoltre la necessità di richiedere un **Certificato Digitale (TLS)** emesso da una CA (Certificate Authority) pubblica riconosciuta dai browser, configurando il Web Server aziendale (es. Apache o Nginx) per reindirizzare automaticamente in modo forzato (Redirect 301) tutto il traffico HTTP in chiaro sulla porta sicura 443.

### Scenario C: Phishing e Sicurezza Email (Autenticazione del mittente)
* **Richiesta tipica:** "Evitare che attaccanti esterni inviino email falsificando il dominio dell'azienda (Mail Spoofing)."
* **Soluzione da proporre:** Poiché il protocollo SMTP originale non verifica l'identità del mittente, lo studente proporrà di configurare sui server DNS pubblici dell'azienda i **Record SPF** (Sender Policy Framework) e **DKIM** (DomainKeys Identified Mail). Questi meccanismi permettono ai server riceventi di verificare se il server che ha inviato l'email è effettivamente autorizzato a spedire a nome di `@azienda.it`, respingendo le email truffa.