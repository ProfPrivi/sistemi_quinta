---
title: "Business Continuity e Disaster Recovery"
description: "Strategie fondamentali per garantire che un'azienda continui a operare in caso di guasti hardware, attacchi informatici o disastri naturali."
---

Nel mondo aziendale moderno, una rete che "funziona bene" non basta. Se il server di un ospedale, di una banca o di una fabbrica si ferma, i danni economici e sociali sono incalcolabili. 

Un progettista di reti deve sempre chiedersi: *"Cosa succede se un cavo viene tranciato? Cosa succede se un router prende fuoco? Cosa succede se un ransomware cripta i server?"* La risposta a queste domande si trova nella **Business Continuity** e nel **Disaster Recovery**.

---

## 1. Spiegazione Diretta: BC vs DR

Spesso questi due termini vengono confusi, ma rappresentano due linee di difesa diverse:

* **La Business Continuity (Continuità Operativa)** è la capacità di un'azienda di *non fermarsi mai*, nemmeno durante un guasto. È come avere la ruota di scorta in auto: se buchi, la cambi in pochi minuti e continui il viaggio. Si basa sulla prevenzione e sulla ridondanza (avere dei "doppioni" pronti a subentrare istantaneamente).
* **Il Disaster Recovery (Recupero dai Disastri)** entra in gioco quando la Business Continuity fallisce o di fronte a eventi catastrofici (un incendio distrugge l'intero data center, un terremoto, un attacco hacker devastante). È come l'assicurazione o il carro attrezzi: il viaggio si è interrotto, e ora serve un piano per ripristinare i sistemi in un luogo sicuro nel minor tempo possibile.

---

## 2. Le Metriche Fondamentali: RTO e RPO

Ogni piano di sicurezza si basa su due parametri vitali (amatissimi dalle commissioni d'esame) che definiscono la tolleranza al danno di un'azienda:

1. **RPO (Recovery Point Objective): Quanti dati posso permettermi di perdere?** Se un server esplode alle 12:00 e il mio ultimo backup risale alle 20:00 della sera prima, ho perso 16 ore di lavoro. Il mio RPO è di 16 ore. Se un'azienda (es. Amazon) ha un RPO vicino allo zero, significa che i dati devono essere replicati in tempo reale (Mirroring) in un altro data center.
   
2. **RTO (Recovery Time Objective): Quanto tempo posso restare fermo?**
   Indica il tempo massimo consentito per ripristinare il servizio prima che l'azienda subisca danni irreparabili. Per un blog potrebbe essere 2 giorni. Per una piattaforma di trading finanziario è inferiore a 1 secondo. Più l'RTO è basso, più l'infrastruttura (e i suoi costi) saranno elevati.

---

## 3. Come garantire la Business Continuity

Per ottenere una vera continuità operativa bisogna dare la caccia ed eliminare ogni **SPOF (Single Point of Failure - Singolo Punto di Guasto)**. Se un solo dispositivo o cavo può far crollare l'intera rete, quello è uno SPOF.

Ecco le tecnologie per eliminarli a tutti i livelli:

* **Livello Rete Locale (LAN):** * Utilizzo di link ridondanti tra gli switch. Per evitare i "loop" (tempeste di broadcast) si utilizza il protocollo **STP (Spanning Tree Protocol)** o le sue varianti veloci (RSTP), che blocca i percorsi doppi e li riattiva in pochi secondi solo se il cavo principale si rompe.
* **Livello Gateway (Uscita verso Internet):**
  * Se il router principale si spegne, i PC perdono la connessione. Si usano protocolli come **VRRP** (Virtual Router Redundancy Protocol) o **HSRP** (Cisco). Si mettono due router fisici che condividono un unico "indirizzo IP virtuale". Se il router "Master" muore, il router "Backup" assume l'IP virtuale in modo invisibile per gli utenti.
* **Livello WAN (Connessione Esterna):**
  * **Multi-WAN o SD-WAN**: Avere almeno due connessioni internet di fornitori (ISP) diversi e con tecnologie diverse (es. una Fibra FTTH interrata e un ponte radio 5G/Satellitare per backup).
* **Livello Hardware e Alimentazione:**
  * Dischi rigidi configurati in **RAID** (es. RAID 1 o RAID 5) per sopravvivere alla rottura fisica di un disco.
  * Gruppi di continuità (**UPS**) e generatori diesel per sopravvivere ai blackout elettrici.

---

## 4. Applicazioni pratiche per la Seconda Prova

Nei temi d'esame, inserire un paragrafo sulla tolleranza ai guasti fa la differenza tra un progetto scolastico e uno professionale.

### Scenario A: Sede centrale "Mission Critical"
* **Richiesta tipica:** "L'azienda richiede che la rete della sede centrale non subisca interruzioni, in quanto eroga servizi 24/7 alle filiali."
* **Soluzione da proporre:** Lo studente dovrà progettare una topologia "Fully Meshed" o "Partial Meshed" nel core della rete. Dovrà citare l'eliminazione dei *Single Point of Failure* installando **Switch Core in alta affidabilità (HA)**, l'utilizzo di protocolli come il **VRRP/HSRP** per il default gateway dei client, e una soluzione **SD-WAN** o *Dual-WAN* per garantire la ridondanza dell'accesso a Internet.

### Scenario B: Piano di Disaster Recovery contro i Ransomware
* **Richiesta tipica:** "Prevedere meccanismi di difesa e ripristino nel caso in cui un malware crittografi i dati aziendali."
* **Soluzione da proporre:** Oltre alle difese perimetrali (Firewall, IDS/IPS), si applica la **Regola del Backup 3-2-1**: 
  * **3** copie dei dati (1 originale + 2 backup)
  * Su **2** supporti di memorizzazione diversi (es. NAS e Tape/Cloud)
  * Con **1** copia tenuta *Off-Site* (fuori sede o in Cloud) ed **immutabile** (cioè che non può essere crittografata né cancellata per un tot di giorni, inattaccabile dai ransomware).

### Scenario C: Servizi Web e Bilanciamento del Carico (Load Balancing)
* **Richiesta tipica:** "Progettare la server farm per un sito e-commerce con un traffico molto variabile."
* **Soluzione da proporre:** Per abbattere i tempi di inattività (RTO) e garantire la Business Continuity sotto forte carico, non si usa un solo grosso server, ma un **Cluster** di server affiancati da un **Load Balancer**. Il Load Balancer distribuisce le richieste degli utenti tra i vari server in modo uniforme. Se un server del cluster va in crash, il Load Balancer se ne accorge istantaneamente e smette di mandargli traffico, dirottando i clienti sui server superstiti senza che nessuno si accorga del guasto.