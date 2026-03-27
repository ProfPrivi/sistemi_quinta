---
title: "Il Protocollo DHCP: Gestione Dinamica degli Indirizzi"
description: "Analisi approfondita del protocollo DHCP: il processo DORA, i DHCP Relay Agent per le VLAN e le difese di sicurezza (DHCP Snooping)."
---

Immagina di dover configurare a mano l'indirizzo IP, la Subnet Mask, il Default Gateway e i server DNS per ogni singolo computer, smartphone o stampante che si collega alla rete di una grande azienda. Sarebbe un incubo logistico e la probabilità di inserire due volte lo stesso IP (conflitto di indirizzi) sarebbe altissima. 

Il **DHCP (Dynamic Host Configuration Protocol)**, che lavora a livello applicativo (Livello 7 ISO/OSI) tramite le porte UDP 67 (Server) e 68 (Client), automatizza completamente questo processo.

---

## 1. Spiegazione Diretta: L'Hotel e la Reception

Per capire il DHCP, immagina di arrivare in un grande hotel:
1. Quando entri, non scegli tu la tua stanza a caso, ma vai alla reception (il **Server DHCP**).
2. Il receptionist controlla nel suo computer (il **Pool di indirizzi**) quali stanze sono libere.
3. Te ne assegna una, ti consegna le chiavi (l'**Indirizzo IP**) e ti comunica dove sono le uscite di sicurezza e i servizi (il **Default Gateway** e i **DNS**).
4. Ti dice anche per quanti giorni puoi tenere quella stanza (il **Lease Time**).
5. Scaduto il tempo, se non chiedi di prolungare il soggiorno, il receptionist libererà la tua stanza per darla a un nuovo cliente.

---

## 2. Dettaglio Tecnico: Il Processo D.O.R.A.

Quando colleghi un dispositivo (Client) a una rete configurata in DHCP, avviene una negoziazione dietro le quinte composta da quattro messaggi, nota con l'acronimo **D.O.R.A.**:

* **1. DISCOVER (Client -> Broadcast):** Il client non ha un IP e non sa chi sia il server DHCP. Quindi "urla" a tutta la rete locale inviando un pacchetto broadcast (indirizzo di destinazione `255.255.255.255` e MAC `FF:FF:FF:FF:FF:FF`): *"C'è un server DHCP qui in giro? Ho bisogno di parametri di rete!"*
* **2. OFFER (Server -> Client):** Il server DHCP riceve la richiesta, prenota un indirizzo IP dal suo pool e risponde al client: *"Sono qui, ti propongo l'indirizzo IP 192.168.1.50"*.
* **3. REQUEST (Client -> Broadcast):** Il client accetta l'offerta. Risponde in broadcast perché potrebbero esserci più server DHCP sulla rete che gli hanno fatto un'offerta, e in questo modo avvisa tutti dicendo: *"Accetto l'offerta del Server A. Gli altri server possono rimettere i loro IP nel pool"*.
* **4. ACKNOWLEDGE (Server -> Client):** Il Server A invia l'ACK, confermando l'assegnazione e inviando i dati completi (Subnet, Gateway, DNS, Lease time). Ora il client può iniziare a navigare.

---

## 3. Concetti Avanzati: Relay Agent e Sicurezza

Nelle reti aziendali reali, il DHCP non è così semplice. Ci sono due sfide fondamentali da affrontare:

### A. Il problema dei Router (DHCP Relay Agent)
I pacchetti di *Discover* sono di tipo Broadcast. Per definizione, **i router bloccano i broadcast**. Se hai un'azienda con 10 VLAN diverse, dovresti mettere un server DHCP fisico dentro ogni VLAN? Ovviamente no.
Si utilizza un server DHCP centralizzato e si configurano i router (o gli switch Layer 3) come **DHCP Relay Agent** (sui dispositivi Cisco il comando è `ip helper-address`). Il router ascolta i "Discover" broadcast della VLAN, li trasforma in pacchetti *Unicast* e li spedisce direttamente al server DHCP centrale.

### B. Sicurezza: L'attacco "Rogue DHCP"
Cosa succede se un dipendente sbadato (o un hacker) porta da casa un router Wi-Fi e lo collega a una presa di rete aziendale? Questo router inizierà a distribuire indirizzi IP sbagliati ai PC dell'azienda, "rubando" il lavoro al vero server DHCP e dirottando tutto il traffico (attacco *Man-in-the-Middle*).
Per impedirlo si configura sugli switch il **DHCP Snooping**: il sistemista decide quali porte fisiche dello switch sono "Trusted" (affidabili, a cui è collegato il vero server) e quali sono "Untrusted". Se uno switch riceve un messaggio DHCP *Offer* da una porta Untrusted, lo blocca immediatamente e spegne la porta.

---

## 4. Applicazioni pratiche per la Seconda Prova

Nei progetti di Seconda Prova, la gestione degli indirizzi è una richiesta fissa. Ecco come dimostrare una competenza superiore:

### Scenario A: Rete Multi-VLAN con Server Centralizzato
* **Richiesta tipica:** "L'azienda ha 5 reparti isolati tramite VLAN. Ottimizzare l'assegnazione degli indirizzi IP."
* **Soluzione da proporre:** Invece di configurare un servizio DHCP separato su ogni switch, lo studente proporrà un **Server DHCP centralizzato** (es. su Windows Server o Linux) posizionato nella VLAN dei server (DMZ/Server Farm). Sugli switch Layer 3 che fanno da gateway per le VLAN, lo studente specificherà di aver configurato la funzione di **DHCP Relay** (`ip helper-address`), inoltrando le richieste dei client al server centrale.

### Scenario B: Assegnazione IP a Stampanti e Server
* **Richiesta tipica:** "Assicurarsi che i server aziendali e le stampanti di reparto siano sempre raggiungibili in modo affidabile."
* **Soluzione da proporre:** I server e le stampanti non dovrebbero mai cambiare IP. Lo studente specificherà l'uso delle **DHCP Reservations** (o Prenotazioni): configurerà il Server DHCP affinché leghi un IP specifico al **MAC Address** della stampante. In questo modo la gestione resta centralizzata sul server DHCP, ma la stampante riceverà *sempre* lo stesso identico indirizzo IP ad ogni riavvio.

### Scenario C: Rete Guest (Ospiti / Wi-Fi Pubblico)
* **Richiesta tipica:** "Fornire connettività ai clienti/visitatori che transitano per poche ore nella sala d'attesa."
* **Soluzione da proporre:** Oltre a isolare la rete Guest in una VLAN dedicata per motivi di sicurezza, lo studente ottimizzerà il **Lease Time**. Per la VLAN dei dipendenti manterrà un lease standard (es. 8 o 24 ore), mentre per il Pool DHCP della rete Guest imposterà un Lease Time molto breve (es. **1 ora** o **2 ore**). Questo evita l'esaurimento rapido degli indirizzi IP disponibili a causa del continuo ricambio di smartphone dei visitatori.