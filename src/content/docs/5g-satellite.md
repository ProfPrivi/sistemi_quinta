---
title: "Connettività Globale: 5G e Reti Satellitari LEO"
description: "Approfondimento sulle tecnologie wireless di nuova generazione: architettura 5G, Network Slicing, costellazioni satellitari LEO e scenari per l'Esame di Stato."
---

L'affidabilità di una rete aziendale moderna non dipende più solo dai cavi in fibra ottica interrati. Per connettere dispositivi in movimento, sedi remote, sensori industriali e garantire la continuità operativa in caso di guasti, le tecnologie wireless di ultima generazione sono diventate fondamentali.

---

## 1. Spiegazione Diretta: Cosa cambia davvero?

Se dovessimo riassumere l'evoluzione in modo semplice: **il 4G è stato creato per connettere le persone (i nostri smartphone), il 5G è stato creato per connettere le macchine.** Non si tratta solo di "scaricare un film più velocemente". Si tratta di avere un ritardo (latenza) così basso da poter guidare un'auto a distanza, o di poter collegare un milione di sensori in un singolo chilometro quadrato senza far crollare la cella telefonica.

Per quanto riguarda il **Satellitare**, fino a pochi anni fa internet via satellite era sinonimo di "lentezza disarmante" e si usava solo sulle navi o nei deserti. Oggi, grazie alle nuove costellazioni di satelliti a bassa quota (LEO), la connessione spaziale ha latenze e velocità che competono direttamente con le connessioni terrestri in fibra misto rame (FTTC).

---

## 2. Il 5G nel dettaglio tecnico

L'architettura 5G si regge su tre grandi pilastri tecnici (definiti dall'ente standardizzatore 3GPP), pensati per soddisfare esigenze diametralmente opposte:

1. **eMBB (enhanced Mobile Broadband):** È l'evoluzione naturale del 4G. Offre velocità di picco multi-Gigabit (fino a 10-20 Gbps) per applicazioni che richiedono una banda enorme, come la realtà virtuale (VR), i video in 8K e l'accesso a Internet ad altissima velocità.
2. **URLLC (Ultra-Reliable Low Latency Communications):** È la vera rivoluzione per l'industria. Garantisce una latenza inferiore a 1 millisecondo e un'affidabilità del 99.999%. Viene usato per la telemedicina (interventi chirurgici a distanza), la guida autonoma e la robotica industriale (Industria 4.0).
3. **mMTC (massive Machine Type Communications):** Pensato per l'Internet of Things (IoT) e le Smart City. Permette di connettere fino a 1 milione di dispositivi per chilometro quadrato. Questi dispositivi (es. sensori di parcheggio, contatori dell'acqua) trasmettono pochissimi dati, ma la rete 5G garantisce che le loro batterie possano durare fino a 10 anni.

### La magia del "Network Slicing"
Come fa un'unica antenna 5G a gestire contemporaneamente il chirurgo a distanza (URLLC) e il contatore dell'acqua (mMTC)? Tramite il **Network Slicing**. 
La rete fisica viene "affettata" via software in più reti virtuali indipendenti (slice). Ogni slice ha caratteristiche di banda, sicurezza e latenza garantite e isolate dalle altre, come se fossero reti separate.

---

## 3. La rivoluzione Satellitare LEO

Le connessioni satellitari tradizionali (VSAT) utilizzano satelliti **GEO (Geostazionari)**.
* **Dove si trovano:** A 36.000 km dalla Terra. 
* **Il problema:** Il segnale radio deve fare 72.000 km (andata e ritorno). Questo genera una latenza fisica ineliminabile di circa 600-700 millisecondi. Impossibile fare una videochiamata fluida o usare una VPN in modo reattivo.

Oggi il paradigma è cambiato grazie alle costellazioni **LEO (Low Earth Orbit)**, come *Starlink* di SpaceX o *OneWeb*.
* **Dove si trovano:** Tra i 500 e i 1.200 km dalla Terra.
* **Il vantaggio:** La distanza è minima. La latenza scende a 20-40 millisecondi (paragonabile a una ADSL/FTTC terrestre). 
* **Come funziona:** Essendo così vicini, questi satelliti non sono "fissi" nel cielo rispetto a noi, ma sfrecciano velocissimi. L'antenna ricevente a terra (parabola fasata) è motorizzata o usa l'elettronica per "inseguire" un satellite e passare automaticamente al successivo prima che scompaia all'orizzonte, creando una connessione ininterrotta.

---

## 4. Applicazioni pratiche per la Seconda Prova

Queste tecnologie si sposano perfettamente con gli argomenti visti in precedenza (come SD-WAN e VPN). In un tema d'esame, citarli garantisce un progetto moderno e inattaccabile.

### Scenario A: Business Continuity (Failover estremo)
* **Richiesta tipica:** "L'azienda ospedaliera X ha bisogno di garantire che la rete della propria sede principale non cada mai, nemmeno se dei lavori stradali tranciano i cavi in fibra ottica."
* **Soluzione da proporre:** Si progetta un'architettura **SD-WAN** dotando il router di confine (Edge Router) di tre interfacce di rete (Underlay): 
  1. Connessione principale in Fibra Ottica (FTTH).
  2. Backup secondario su rete cellulare **5G** per garantire latenze minime e banda larga.
  3. Backup di emergenza assoluta (last resort) tramite parabola **Satellitare LEO** per isolare l'azienda da eventuali disastri infrastrutturali terrestri a livello regionale.

### Scenario B: Cantieri, Sedi remote e Mezzi in movimento
* **Richiesta tipica:** "Si richiede di connettere alla rete VPN aziendale un cantiere temporaneo in alta montagna o una flotta di navi cargo."
* **Soluzione da proporre:** Nelle zone in cui non arriva alcun cavo e manca la copertura cellulare (Digital Divide), si installano terminali **satellitari LEO**. Sfruttando la bassa latenza di queste connessioni, è possibile instaurare un tunnel IPsec sicuro verso il concentratore VPN della sede centrale, permettendo agli operai di usare il gestionale aziendale come se fossero in ufficio.

### Scenario C: Industria 4.0 e Sensori (IoT)
* **Richiesta tipica:** "Progettare la rete per un polo logistico automatizzato con migliaia di sensori sui pacchi e robot mobili nel magazzino."
* **Soluzione da proporre:** Per evitare l'interferenza e la congestione tipica del Wi-Fi in ambienti così densi, si propone una rete **5G Privata** (Campus Network). Utilizzando le caratteristiche **URLLC** per i robot mobili (che non possono subire ritardi nei comandi) e **mMTC** per i sensori RFID sui pacchi, separando il traffico tramite *Network Slicing*.