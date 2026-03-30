---
title: "Livello Fisico: Cablaggio Strutturato e Topologia"
description: "Guida alla progettazione fisica della rete: standard EIA/TIA 568, gerarchia dei centri stella, differenze tra rame e fibra, e tecnologia Power over Ethernet (PoE)."
---

Prima di parlare di indirizzi IP, VLAN o protocolli di routing, bisogna posare i cavi. Una rete progettata alla perfezione a livello logico smetterà di funzionare se i cavi sono troppo lunghi, se gli armadi rack non sono alimentati correttamente o se si sceglie il mezzo trasmissivo sbagliato. 

La progettazione fisica segue regole rigorose dettate dallo standard internazionale **EIA/TIA 568**, che definisce il concetto di **Cablaggio Strutturato**.

---

## 1. Standard e Gerarchia (Topologia a Stella Estesa)

Lo standard vieta di collegare gli switch a cascata (da uno all'altro) in modo disordinato. Impone invece una rigida gerarchia ad albero, nota come topologia a **stella centro-stella** (o stella gerarchica), divisa in tre livelli principali:

1. **Centro Stella di Comprensorio (o Campus - CD):** È il cuore assoluto della rete. Si trova in un edificio principale e collega tra loro tutti gli altri edifici dell'azienda. Qui si trovano i Core Switch ad altissime prestazioni e i collegamenti verso l'esterno (Internet/WAN).
2. **Centro Stella di Edificio (BD):** Si trova al piano terra o nei sotterranei di ogni singolo edificio. Raccoglie i cavi provenienti da tutti i piani di quel palazzo e li instrada verso il Comprensorio.
3. **Centro Stella di Piano (FD):** È l'armadio di rete presente su ogni piano. Raccoglie i cavi provenienti dalle singole prese a muro degli uffici (PC, stampanti) e li collega agli switch di accesso.

---

## 2. Armadi Rack e Apparati (MDF e IDF)

Gli apparati di rete non vengono appoggiati sulle scrivanie, ma montati in appositi armadi metallici standardizzati larghi 19 pollici, chiamati **Rack**.

Nella terminologia aziendale, i centri stella prendono nomi specifici:
* **MDF (Main Distribution Frame):** È l'armadio principale (il Centro Stella di Edificio o Comprensorio). Qui arriva la fibra ottica del provider Internet e si trovano i server, i firewall e il Core Switch.
* **IDF (Intermediate Distribution Frame):** Sono gli armadi secondari (i Centri Stella di Piano). Sono collegati all'MDF e servono gli utenti finali.

### Cosa c'è dentro un armadio Rack di piano (IDF)?
Dal basso verso l'alto, solitamente troviamo:
1. **UPS (Uninterruptible Power Supply):** Il gruppo di continuità. È una grossa batteria che mantiene accesi gli apparati di rete anche in caso di blackout elettrico.
2. **Switch di Accesso:** L'apparato attivo che smista i pacchetti dati.
3. **Cavi Patch:** Piccoli cavi morbidi (solitamente di 1 o 2 metri) che collegano le porte dello switch al Patch Panel.
4. **Patch Panel (Pannello di Permutazione):** Un pannello passivo. Dietro di esso vengono "terminati" (fissati) i cavi rigidi che passano nei muri e arrivano fino alle prese degli uffici. Davanti offre delle comode porte RJ45.

---

## 3. I Mezzi Trasmissivi: Rame vs Fibra Ottica

La scelta del cavo giusto dipende principalmente dalla larghezza di banda necessaria e, soprattutto, dalla **distanza**.

### A. Rame: Cavi a coppie intrecciate (Twisted Pair)
Si usano per il **cablaggio orizzontale**, cioè dal Centro Stella di Piano fino alla scrivania dell'utente.
* **Le Categorie:** Oggi si progetta utilizzando **Cat 6** (fino a 1 Gbps), **Cat 6A** o **Cat 7** (fino a 10 Gbps). Spesso sono schermati (FTP/STP) per evitare interferenze elettromagnetiche.
* **Il limite invalicabile:** Per standard, un cavo in rame **non può superare i 100 metri** di lunghezza (90 metri nel muro + 10 metri per i cavetti patch). Oltre questa distanza, il segnale elettrico si degrada e la rete perde pacchetti.

### B. Fibra Ottica (FO)
Si usa per il **cablaggio verticale (Dorsale o Backbone)**, cioè per collegare tra loro gli armadi di piano, o per collegare edifici diversi, superando il limite dei 100 metri del rame.
* **Fibra Multimodale (MMF):** Il nucleo è più largo, la luce "rimbalza" in più direzioni. È economica, usa trasmettitori a LED/VCSEL ed è perfetta per le dorsali interne all'edificio (fino a circa 300-500 metri a 10 Gbps).
* **Fibra Monomodale (SMF):** Il nucleo è microscopico, la luce viaggia dritta grazie a un laser. Costa di più, ma può coprire distanze enormi (da svariati chilometri fino a cavi sottomarini). È obbligatoria per collegare edifici di un grande campus o sedi cittadine.

---

## 4. Power over Ethernet (PoE / PoE+)

Una delle tecnologie fisiche più importanti nelle reti moderne è il **PoE (Standard IEEE 802.3af / at / bt)**. 

Dispositivi come **Access Point Wi-Fi, Telefoni VoIP e Telecamere IP** vengono spesso installati sui soffitti o in posizioni scomode dove non ci sono prese di corrente elettrica.
Gli switch di accesso moderni (chiamati Switch PoE) sono in grado di inviare, attraverso lo stesso identico cavo di rete in rame, sia i dati informatici sia l'**alimentazione elettrica** a bassa tensione necessaria per accendere il dispositivo. 

Questo riduce drasticamente i costi di installazione, perché l'azienda non deve pagare un elettricista per tirare nuovi cavi della corrente per ogni telecamera o telefono.

---

## 5. Applicazioni pratiche per la Seconda Prova

La topologia fisica è spesso la primissima richiesta in un tema ministeriale. Ecco come fare bella figura:

### Scenario A: Rete di un Campus Scolastico/Aziendale
* **Richiesta tipica:** "Collegare l'edificio principale con i laboratori distaccati situati a 250 metri di distanza nel cortile."
* **Soluzione da proporre:** Lo studente indicherà chiaramente che **non** utilizzerà cavi in rame (UTP/FTP) in quanto si supera il limite standard dei 100 metri. Progetterà invece una dorsale in **Fibra Ottica Multimodale o Monomodale**, interrata in appositi cavidotti per isolarla da fulmini e umidità, per collegare l'IDF dei laboratori all'MDF principale.

### Scenario B: Videosorveglianza e Wi-Fi Diffuso
* **Richiesta tipica:** "Dotare tutti i corridoi e gli uffici di copertura Wi-Fi e telecamere di sicurezza IP."
* **Soluzione da proporre:** Lo studente specificherà l'acquisto di **Switch di Accesso PoE+ (Power over Ethernet Plus)** da installare nei Centri Stella di Piano. Questo garantirà l'alimentazione diretta agli Access Point e alle telecamere tramite i cavi UTP Cat 6A, semplificando l'installazione e centralizzando l'alimentazione: in caso di blackout, basterà che il gruppo di continuità (UPS) nell'armadio rack tenga acceso lo switch per mantenere attive tutte le telecamere di sicurezza dell'azienda.

### Scenario C: Affidabilità delle Dorsali (Link Aggregation)
* **Richiesta tipica:** "Assicurare che la comunicazione tra l'armadio di un piano e la sala server principale (MDF) sia veloce e non si interrompa mai."
* **Soluzione da proporre:** Per la dorsale tra l'IDF e l'MDF, lo studente non passerà un solo cavo in fibra, ma ne poserà almeno due. Configurerà poi i due switch utilizzando il protocollo **LACP (Link Aggregation Control Protocol / EtherChannel)**. In questo modo i due cavi fisici lavoreranno come un unico grande "tubo" logico (raddoppiando la banda) e fornendo tolleranza ai guasti: se un topo rosicchia una delle due fibre, la rete continuerà a funzionare sull'altra senza interruzioni.