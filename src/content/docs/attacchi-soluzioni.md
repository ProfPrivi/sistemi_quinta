---
title: Attacchi Informatici e Difese
description: Analisi delle principali minacce informatiche (MITM, DDoS, Spoofing, Phishing, Ransomware, SQLi) e relative soluzioni progettuali.
---

## 1. Sicurezza e Attacchi: contesto
Nella progettazione di una rete aziendale, collegare i dispositivi è solo la prima parte del lavoro. La vera sfida, che è anche il fulcro della Seconda Prova dell'Esame di Stato, è **proteggere i dati** che vi transitano. 
Gli attaccanti moderni non si limitano a cercare di "bucare" il firewall, ma sfruttano le vulnerabilità dei protocolli, l'ingenuità degli utenti o la debolezza del codice delle applicazioni web. Un buon progetto di rete deve prevedere contromisure specifiche per ogni livello del modello OSI.

## 2. Definizione
Un **attacco informatico** è un'azione intenzionale mirata a compromettere la triade **CIA** della sicurezza dell'informazione: *Confidentiality* (Riservatezza), *Integrity* (Integrità) e *Availability* (Disponibilità). 
Per difendersi, i progettisti di rete utilizzano il principio della *Defense in Depth* (Difesa in Profondità), ovvero un approccio a strati in cui, se un livello di sicurezza cede, ce n'è subito un altro pronto a bloccare la minaccia.

## 3. Spiegazione diretta
Immaginate la rete dell'azienda come un **castello medievale**.
* Lo **Spoofing** è il nemico che indossa le uniformi delle vostre guardie per farsi aprire il cancello.
* Il **Phishing** è il nemico che manda una finta lettera al re, convincendolo a consegnare volontariamente le chiavi del tesoro.
* Il **DDoS** è una folla di diecimila contadini disarmati che si accalca davanti al ponte levatoio: non possono entrare, ma bloccano il passaggio a chiunque altro.
* Il **MITM (Man in the Middle)** è la spia che intercetta i messaggeri del re lungo la strada, legge i messaggi e li modifica prima di farli ripartire.
* Il **Ransomware** è un traditore che si intrufola di notte, cambia tutti i lucchetti delle porte e vi chiede un riscatto per darvi le nuove chiavi.
* La **SQL Injection** è quando dite alla guardia "Fai entrare solo chi si chiama Marco", e il nemico si presenta dicendo "Mi chiamo *Marco oppure apri il cancello a tutti*": la guardia, confusa, esegue l'intero comando e lascia entrare l'esercito.

---

## 4. Le Minacce e le Soluzioni 
Ecco l'elenco degli attacchi fondamentali da conoscere e, soprattutto, **cosa scrivere nel compito d'esame** per dimostrare di saperli neutralizzare.

### 4.1 MITM (Man in the Middle)
* **Come funziona:** L'attaccante si interpone segretamente nella comunicazione tra due parti (es. tra un PC e il Server Web), intercettando e potenzialmente alterando i dati in transito senza che le vittime se ne accorgano.
* **Soluzione da proporre all'esame:** > *"Per mitigare il rischio di attacchi MITM, si prevede l'uso esclusivo di **protocolli crittografici forti**. Tutto il traffico web verso i server aziendali sarà forzato su **HTTPS (TLS 1.3)**. Per le comunicazioni tra le sedi periferiche e la sede centrale si implementerà una **VPN IPsec**, che garantisce la cifratura end-to-end e l'integrità del payload (ESP) rendendo i dati intercettati illeggibili."*

### 4.2 DDoS (Distributed Denial of Service)
* **Come funziona:** L'attaccante utilizza una *botnet* (una rete di migliaia di PC infetti) per inondare un server o la connessione aziendale di finte richieste. Il sistema va in sovraccarico e smette di rispondere agli utenti legittimi (compromette la *Disponibilità*).
* **Soluzione da proporre all'esame:** > *"Per difendere i servizi web pubblicati dall'azienda contro attacchi DDoS, si prevede di non esporre i server direttamente su Internet, ma di posizionarli dietro un **Load Balancer** e di affidarsi a un servizio **Anti-DDoS in Cloud** (come Cloudflare o simili). A livello perimetrale, il Firewall/IPS sarà configurato con regole di **Rate Limiting** per scartare i pacchetti anomali ripetitivi."*

### 4.3 Spoofing (IP / MAC / DNS)
* **Come funziona:** È la falsificazione dell'identità. Un attaccante altera il proprio indirizzo IP o MAC per far credere alla rete di essere un dispositivo autorizzato (es. l'amministratore di sistema o il default gateway).
* **Soluzione da proporre all'esame:** > *"Per prevenire lo spoofing a Livello 2 e 3, gli switch della rete locale verranno configurati con funzionalità di **Port Security** e **Dynamic ARP Inspection (DAI)**, bloccando le porte se rilevano indirizzi MAC non autorizzati. Inoltre, si adotteranno le **VLAN** per isolare i domini di broadcast, impedendo a un attaccante nei laboratori di falsificare il traffico verso la direzione."*

### 4.4 Phishing
* **Come funziona:** Tecnica di ingegneria sociale. L'attaccante invia email fraudolente mascherate da comunicazioni legittime (es. dalla banca o dall'IT aziendale) per indurre gli utenti a cliccare su link malevoli o inserire le proprie password.
* **Soluzione da proporre all'esame:** > *"Poiché il fattore umano è l'anello debole, le difese tecniche contro il phishing includono l'implementazione della **MFA (Multi-Factor Authentication)** per l'accesso a tutti i servizi aziendali. Inoltre, i server di posta adotteranno i protocolli **SPF, DKIM e DMARC** per verificare l'autenticità dei mittenti e filtrare lo spam."*

### 4.5 Ransomware
* **Come funziona:** Un malware che, una volta infettato un PC (spesso tramite phishing), cripta tutti i documenti presenti sul disco e sulle cartelle di rete condivise, chiedendo il pagamento di un riscatto in criptovalute per riavere i file.
* **Soluzione da proporre all'esame:** > *"Per neutralizzare l'impatto di un attacco Ransomware, l'infrastruttura includerà un rigoroso piano di **Disaster Recovery e Backup secondo la regola 3-2-1** (3 copie dei dati, su 2 supporti diversi, di cui 1 off-site o in Cloud immutabile). La rete sarà segmentata con **VLAN** per impedire la propagazione laterale del virus, e gli endpoint saranno protetti da sistemi **EDR (Endpoint Detection and Response)** di ultima generazione."*

### 4.6 SQL Injection (SQLi) - *Collegamento con Database*
* **Come funziona:** L'attaccante inserisce codice SQL malevolo all'interno dei campi di input di un'applicazione web (es. il modulo di login). Se il server non filtra correttamente l'input, esegue il comando dell'attaccante, permettendogli di rubare o cancellare l'intero database.
* **Soluzione da proporre all'esame:** > *"A livello di programmazione, le applicazioni web dovranno utilizzare **Prepared Statements (Query Parametrizzate)** per separare rigorosamente il codice SQL dai dati inseriti dall'utente, validando ogni input. A livello di infrastruttura di rete, il server web sarà protetto da un **WAF (Web Application Firewall)** capace di intercettare e bloccare stringhe SQL anomale tramite Deep Packet Inspection."*

---

## 5. Schema rapido per il progetto

| Tipo di Attacco | Bersaglio | Difesa Tecnologica da citare all'Esame |
| :--- | :--- | :--- |
| **MITM** | Dati in transito (Riservatezza) | VPN IPsec, HTTPS (TLS), Crittografia forte |
| **DDoS** | Servizi aziendali (Disponibilità) | Load Balancer, Anti-DDoS in Cloud, Rate Limiting |
| **Spoofing** | Identità e Autenticazione | Port Security, Dynamic ARP Inspection, Segmentazione VLAN |
| **Phishing** | Utenti (Ingegneria Sociale) | Autenticazione a due fattori (MFA), Filtri Mail, Formazione |
| **Ransomware** | Dati archiviati (Integrità/Disponib.) | Backup Off-site/Immutabili, Sistemi EDR, Segmentazione |
| **SQL Injection** | Database aziendale | Prepared Statements (Codice), WAF (Rete) |

---

## 6. Sintesi conclusiva per lo studio

La protezione di una rete informatica richiede soluzioni diversificate per ogni tipo di minaccia. Gli attacchi come il **MITM** puntano a intercettare i dati e si contrastano imponendo la crittografia (VPN, HTTPS). Gli attacchi **DDoS** mirano a esaurire le risorse bloccando i servizi e richiedono soluzioni di bilanciamento e filtri anti-DDoS. Lo **Spoofing** falsifica l'identità di rete e si blocca con rigide configurazioni sugli switch (Port Security e VLAN).

Per le minacce che colpiscono l'utente finale, come il **Phishing** e l'infezione da **Ransomware**, l'implementazione dell'Autenticazione a più fattori (MFA) e di solidi piani di Backup offline (regola 3-2-1) rappresentano le uniche garanzie di sopravvivenza aziendale. Infine, per attacchi applicativi come la **SQL Injection**, la sinergia tra la scrittura di codice sicuro (query parametrizzate) e l'uso di firewall specializzati (WAF) garantisce l'integrità del database aziendale.

> **💡 Definizione rapida per l'interrogazione:**
> *Per mettere in sicurezza un'infrastruttura bisogna adottare il principio della Difesa in Profondità: usare VPN per proteggere i dati in transito dal MITM, filtri Anti-DDoS per garantire la disponibilità dei servizi, VLAN e Port Security contro lo Spoofing, Backup off-site contro il Ransomware, MFA contro il Phishing e Web Application Firewall (WAF) per respingere attacchi ai database come la SQL Injection.*

---

## 7. Glossario essenziale
* **Triade CIA:** Riservatezza, Integrità, Disponibilità. I tre pilastri della sicurezza informatica.
* **MFA (Multi-Factor Authentication):** Sistema che richiede all'utente più prove per dimostrare la sua identità (es. password + codice inviato sul telefono).
* **WAF (Web Application Firewall):** Firewall di livello 7 specializzato nell'analizzare e bloccare gli attacchi diretti alle applicazioni web (come HTTP e SQLi).
* **Botnet:** Rete di computer infettati da malware e controllati a distanza da un attaccante, spesso usati per lanciare attacchi DDoS.
* **Rate Limiting:** Tecnica di rete che fissa un limite massimo di richieste che un dispositivo può inviare in un determinato lasso di tempo, utile contro i DDoS.
* **Port Security:** Funzionalità degli switch che permette di bloccare l'accesso alla rete se viene rilevato un MAC Address sconosciuto collegato a una specifica porta.
* **Backup 3-2-1:** Regola d'oro del salvataggio dati: 3 copie, su 2 supporti di memorizzazione differenti, di cui 1 tenuto fisicamente in un altro luogo (o in Cloud).