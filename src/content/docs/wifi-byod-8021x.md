---
title: "Reti Wi-Fi: Sicurezza, Crittografia e 802.1X"
description: "Analisi approfondita delle vulnerabilità wireless, evoluzione degli standard crittografici (WEP, WPA2, WPA3), infrastrutture centralizzate (WLC) e autenticazione IEEE 802.1X."
---

Con l'evoluzione degli spazi di lavoro e la diffusione del **BYOD** (*Bring Your Own Device*), l'infrastruttura Wireless (WLAN) è diventata il cuore pulsante delle aziende. Tuttavia, a differenza di un cavo in rame protetto dai muri dell'edificio, **le onde radio si propagano all'esterno**, rendendo la rete intrinsecamente vulnerabile a intercettazioni e attacchi. 

Per progettare una WLAN sicura in un tema d'esame, un sistemista deve conoscere le minacce, la crittografia e i protocolli di autenticazione forte.

---

## 1. I Principali Rischi per la Sicurezza Wireless

Le reti Wi-Fi sono esposte a minacce specifiche che non esistono (o sono marginali) nel mondo cablato:

* **Sniffing e Intercettazione Passiva:** Un attaccante (o *wardriver*) nelle vicinanze può catturare i frame radio. Se la rete non usa una crittografia robusta, strumenti software (Sniffer) possono ricostruire il traffico, rubando password e dati sensibili.
* **Access Point Rogue (APR):** È un Access Point non autorizzato. Può essere installato ingenuamente da un dipendente per avere più "campo", o piazzato da un hacker. Un APR crea una backdoor (porta di servizio) priva di difese verso la rete aziendale interna.
* **Spoofing ARP (Man-in-the-Middle):** Un attaccante connesso alla rete invia pacchetti ARP falsificati per associare il proprio indirizzo MAC all'IP del gateway (o di un altro client). Tutto il traffico della vittima transiterà dal PC dell'hacker prima di uscire su Internet.
* **Attacchi DoS (Denial of Service):** Nelle reti Wi-Fi, il DoS può avvenire a livello fisico tramite dispositivi che generano *jamming* (interferenze radio) per saturare le frequenze e rendere inutilizzabile la rete.

---

## 2. L'Evoluzione della Crittografia (Da WEP a WPA3)

Per difendersi dallo sniffing, l'IEEE ha sviluppato diversi standard crittografici nel tempo. Conoscerne l'evoluzione è fondamentale per giustificare le scelte progettuali.

### A. I protocolli obsoleti (WEP e TKIP)
* **WEP (Wired Equivalent Privacy):** Il primo e ormai defunto standard. Utilizza l'algoritmo a chiave simmetrica **RC4**. La sua debolezza risiede nell'uso di un vettore di inizializzazione (IV) di soli 24 bit, trasmesso in chiaro. Un hacker può craccare una rete WEP in pochi minuti analizzando i pacchetti.
* **TKIP (Temporal Key Integrity Protocol):** Introdotto col primo WPA per tappare le falle del WEP. Usa una chiave temporale a 128 bit rigenerata dinamicamente, ma si appoggia ancora al debole algoritmo RC4. Anche questo è oggi considerato insicuro.

### B. Gli standard moderni (WPA2 e WPA3)
Oggi l'unico algoritmo crittografico accettabile è l'**AES (Advanced Encryption Standard)**, un sistema a blocchi estremamente robusto (Rijndael) che richiede hardware dedicato (coprocessori) sugli Access Point per funzionare senza rallentare la rete.

* **WPA2 (con AES):** È lo standard dominante, ma nella sua versione "Personal" (con password condivisa PSK) è vulnerabile ad attacchi di tipo *brute force* (es. attacco KRACK).
* **WPA3:** Il nuovo standard globale. Nella versione Personal introduce il protocollo **SAE (Simultaneous Authentication of Equals)** che rende inutili gli attacchi a forza bruta bloccando i tentativi ripetuti. Nella versione Enterprise, offre una crittografia AES a **192 bit**, lo standard richiesto per reti governative e militari.

---

## 3. Gestione Centralizzata e Autenticazione (IEEE 802.1X)

Nascondere il nome della rete (SSID in *stealth*) o filtrare gli indirizzi MAC sono misure di sicurezza deboli: i MAC address possono essere facilmente clonati (MAC Spoofing). La vera sicurezza si ottiene solo combinando un'infrastruttura centralizzata con un'**autenticazione reciproca**.

### L'Infrastruttura: WLC e Lightweight AP
In azienda non si usano Access Point "stand-alone". Si utilizzano **LAP (Lightweight Access Point)**, antenne "stupide" gestite centralmente da un **WLC (Wireless LAN Controller)** posizionato nel Centro Stella. Il WLC garantisce il *seamless roaming* (spostamento tra i piani senza cadute di linea) e rileva automaticamente eventuali *Rogue AP*.

### Il Controllo degli Accessi: IEEE 802.1X e RADIUS (Repetita iuvant)
Per gestire dispositivi aziendali e terminali privati (BYOD), la password condivisa (PSK) è bandita. Si utilizza lo standard **IEEE 802.1X** (Port-Based Network Access Control) che si affida al protocollo **EAP (Extensible Authentication Protocol)**.

L'architettura AAA si divide in tre componenti:
1. **Supplicant (Il Client):** Il software sul PC/Smartphone dell'utente.
2. **Authenticator (WLC / AP):** Il "cancello" che blocca il traffico IP finché l'utente non è autorizzato, permettendo solo il transito dei messaggi EAPoL (EAP over LAN).
3. **Authentication Server (RADIUS):** Il server che interroga il database aziendale (es. Active Directory). 

Solo se le credenziali personali dell'utente (o il suo certificato digitale, nel caso del protocollo **EAP-TLS**) risultano corrette, il RADIUS invia un messaggio di *Access-Accept*, il WLC sblocca la porta virtuale e il client ottiene un indirizzo IP via DHCP.

---

## 4. Applicazioni pratiche per la Seconda Prova

Integrare questi concetti in un tema d'esame garantisce una valutazione d'eccellenza. Ecco come sfruttarli:

### Scenario A: Messa in sicurezza di un ambiente BYOD (Smart Working)
* **Richiesta tipica:** "L'azienda consente ai dipendenti di usare i propri tablet personali per lavorare, ma teme fughe di dati se un dipendente viene licenziato."
* **Soluzione da proporre:** Lo studente scarterà l'uso di WPA2-Personal/PSK. Progetterà un'infrastruttura basata su **WPA3-Enterprise con standard 802.1X**. Integrerà un server **RADIUS** interfacciato con l'Active Directory. In questo modo, ogni dipendente accederà al Wi-Fi con il proprio account individuale. In caso di licenziamento, basterà disabilitare l'utente nell'Active Directory: il tablet personale del dipendente si vedrà immediatamente respingere l'accesso dal RADIUS, mettendo al sicuro i dati aziendali.

### Scenario B: Prevenzione contro Rogue AP e Intercettazioni
* **Richiesta tipica:** "Evitare che utenti malintenzionati possano catturare il traffico dei colleghi o installare apparati non autorizzati."
* **Soluzione da proporre:** Lo studente proporrà l'uso di un **Wireless LAN Controller (WLC)** con funzionalità WIDS/WIPS (*Wireless Intrusion Prevention System*), in grado di scansionare le frequenze radio e disabilitare automaticamente eventuali **Rogue AP**. Per prevenire le intercettazioni interne, si abiliterà la funzione di *Client Isolation* sul WLC (per impedire ai client wireless di comunicare tra loro) e si specificherà l'uso obbligatorio dell'algoritmo crittografico **AES** per rendere incomprensibile il traffico radio a eventuali sniffer.

### Scenario C: Dispositivi IoT senza interfaccia (Wi-Fi Easy Connect)
* **Richiesta tipica:** "L'azienda deve collegare al Wi-Fi decine di sensori termici e telecamere IP sprovvisti di schermo o tastiera per inserire password complesse."
* **Soluzione da proporre:** (Basata sulle specifiche WPA3). Lo studente separerà il traffico IoT in una VLAN dedicata. Per l'associazione sicura senza tastiera, menzionerà l'utilizzo del protocollo **Wi-Fi Easy Connect (Device Provisioning Protocol)**: l'amministratore utilizzerà uno smartphone o un tablet autorizzato ("Configuratore") per scansionare il **codice QR** stampato fisicamente sul sensore IoT. Questo processo trasferirà in modo sicuro le credenziali crittografiche al dispositivo, autenticandolo sulla rete senza mai trasmettere password in chiaro.