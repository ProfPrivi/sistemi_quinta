---
title: "L'Evoluzione delle WAN: Da MPLS a SD-WAN"
description: "Dispensa avanzata sulle architetture SD-WAN come alternativa moderna, economica e cloud-ready alle tradizionali reti MPLS."
---

Fino a pochi anni fa, per collegare in modo sicuro la sede centrale di un'azienda con le sue filiali (branch office), lo standard de facto era l'utilizzo di linee dedicate basate su tecnologia **MPLS** (*Multiprotocol Label Switching*). 

Oggi, l'esplosione dei servizi Cloud (SaaS, IaaS) e l'esigenza di abbattere i costi hanno spinto le aziende verso un nuovo paradigma: la **SD-WAN** (*Software-Defined Wide Area Network*).

---

## 1. Il problema del modello tradizionale (MPLS)

L'**MPLS** è un servizio offerto dai provider di telecomunicazioni (ISP) che crea percorsi virtuali privati e garantiti tra le varie sedi aziendali.

**I Vantaggi dell'MPLS:**
* Altissima affidabilità (SLA garantiti dal provider).
* Qualità del Servizio (QoS) eccellente per traffico sensibile (VoIP, videoconferenze).
* Elevata sicurezza (traffico isolato dalla rete Internet pubblica).

**Gli Svantaggi (Perché sta diventando obsoleto):**
1. **Costi esorbitanti:** La banda MPLS costa enormemente di più rispetto alla normale banda Internet a parità di velocità.
2. **Rigidità:** Per attivare una nuova linea MPLS in una nuova filiale servono settimane o mesi di lavoro da parte dell'ISP.
3. **Il problema del "Backhauling" (Effetto Trombone):** Nelle architetture tradizionali, per motivi di sicurezza, tutto il traffico Internet delle filiali viene prima inviato alla Sede Centrale (tramite MPLS), passa dal Firewall centrale, e solo allora esce su Internet verso il Cloud. Questo genera un enorme "collo di bottiglia" e rallenta servizi come Office 365 o Google Workspace.

---

## 2. Cos'è la SD-WAN?

La **SD-WAN** applica i concetti delle reti definite dal software (SDN) alle reti geografiche (WAN). 
Il principio fondamentale è la **separazione tra il piano di controllo (Control Plane) e il piano dati (Data Plane)**. L'intelligenza della rete viene centralizzata in un software (il Controller), separandola dall'hardware fisico dei router.

### I due livelli della SD-WAN:
* **Underlay Network (Rete Fisica):** I collegamenti reali forniti dagli ISP (fibra FTTH, ADSL, connessioni 4G/5G, e persino le vecchie linee MPLS). La SD-WAN è *agnostica* rispetto al mezzo fisico: può usare qualsiasi connessione!
* **Overlay Network (Rete Logica):** Una rete di tunnel crittografati (solitamente IPsec) creati virtualmente e in automatico via software *sopra* i collegamenti fisici, collegando tutte le sedi in modo sicuro.

---

## 3. Le Funzionalità Chiave (I Vantaggi)

Perché le aziende stanno migrando in massa verso SD-WAN?

* **Application-Aware Routing (Instradamento Dinamico):** La SD-WAN riconosce che tipo di traffico sta passando. Se la linea principale ha dei rallentamenti (latenza o jitter alti), la SD-WAN sposta automaticamente in tempo reale la chiamata VoIP o la videoconferenza sulla linea di backup (es. connessione 5G), senza far cadere la linea.
* **Direct Internet Access (DIA):** Elimina il "Backhauling". La SD-WAN permette a una filiale di collegarsi direttamente a servizi Cloud fidati (come Microsoft 365) usando la propria connessione Internet locale, mentre invia il traffico aziendale interno verso la Sede Centrale tramite i tunnel crittografati.
* **Zero-Touch Provisioning (ZTP):** Per aprire una nuova filiale, basta spedire un router SD-WAN. Un dipendente non tecnico lo collega alla corrente e a Internet; il router contatta automaticamente il Controller centrale, scarica la sua configurazione ed è operativo in 5 minuti.

---

## 4. Applicazioni pratiche per la Seconda Prova

Proporre un'architettura SD-WAN nello svolgimento del tema d'esame dimostra una visione moderna e orientata al business. Ecco come inserirla:

### Scenario A: Rete Multi-Sede con Budget Limitato
* **Richiesta tipica:** "L'azienda X deve collegare la Sede Centrale con 10 nuove piccole filiali sul territorio nazionale, minimizzando i costi operativi (OPEX)."
* **Soluzione da proporre:** Anziché noleggiare 10 costose linee MPLS, si progetta una rete **SD-WAN**. Ogni filiale verrà dotata di due connessioni Internet a basso costo (es. una Fibra FTTC commerciale e un router 5G di backup). L'appliance SD-WAN creerà un tunnel IPsec sicuro in overlay (VPN) verso la sede centrale, aggregando la banda delle due linee economiche per ottenere prestazioni pari a quelle di una linea dedicata costosa.

### Scenario B: Migrazione massiccia al Cloud
* **Richiesta tipica:** "L'azienda ha dismesso i propri server interni per migrare l'intero gestionale aziendale e la posta elettronica sul Cloud (IaaS/SaaS). Si richiede di ottimizzare la rete per questo nuovo scenario."
* **Soluzione da proporre:** Implementazione di un'infrastruttura **SD-WAN con Direct Internet Access (DIA)** a livello di filiale. I router SD-WAN verranno configurati (tramite policy dal controller centrale) per instradare il traffico diretto al Cloud direttamente sull'interfaccia Internet locale, evitando il routing attraverso il data center centrale (Backhauling), riducendo drasticamente la latenza e migliorando la *User Experience* dei dipendenti.

### Scenario C: Alta Affidabilità (Business Continuity) e Failover
* **Richiesta tipica:** "In una filiale bancaria o ospedaliera è essenziale che le comunicazioni non subiscano interruzioni, nemmeno per pochi secondi."
* **Soluzione da proporre:** Uso di router Edge SD-WAN con funzionalità di **Application-Aware Routing**. Lo studente specificherà che il traffico mission-critical (es. transazioni bancarie, VoIP) viaggerà sulla linea principale (es. fibra dedicata). Il sistema SD-WAN monitorerà costantemente *latenza*, *jitter* e *packet loss*. Al superamento di una soglia critica, sposterà istantaneamente le sessioni sulla linea di backup (es. 4G/5G) senza far cadere le connessioni attive.