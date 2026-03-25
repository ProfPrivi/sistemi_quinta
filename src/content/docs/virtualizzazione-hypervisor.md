---
title: Dispensa - Virtualizzazione e Hypervisor
description: Virtualizzazione, differenze tra Hypervisor di Tipo 1 (Bare-Metal) e Tipo 2 (Hosted)..
---

## 1. La Virtualizzazione: contesto
Nei decenni passati, la regola d'oro dell'informatica aziendale era: *"Un server fisico per ogni applicazione"*. Se all'azienda serviva un server di Posta, un server Web e un server per il Database, comprava tre macchine fisiche diverse. Questo approccio garantiva l'isolamento (se il server Web andava in crash, la posta continuava a funzionare), ma portava a un immenso **spreco di risorse**: i processori lavoravano mediamente solo al 10-15% delle loro capacità, consumando tantissima corrente elettrica e occupando enormi spazi nei CED (Centri Elaborazione Dati).

La **Virtualizzazione** ha rivoluzionato questo mondo, permettendo di far girare più "computer virtuali" indipendenti all'interno di un unico computer fisico, sfruttando al 100% l'hardware moderno.

## 2. Definizione
La virtualizzazione è una tecnologia che permette di creare versioni software (virtuali) di risorse fisiche come computer, reti o dispositivi di archiviazione. 
L'elemento chiave che rende possibile questa magia è l'**Hypervisor** (noto anche come VMM - *Virtual Machine Monitor*). L'Hypervisor è un software specializzato che si interpone tra l'hardware fisico e le **Macchine Virtuali (VM)**: il suo compito è prendere le risorse fisiche (RAM, CPU, Disco, Rete) e "spartirle" tra le varie macchine virtuali, garantendo che ognuna lavori nel proprio ambiente isolato senza disturbare le altre.

## 3. Spiegazione diretta
Immaginate un potente server fisico come una **villa gigantesca** con 20 stanze. 
Nel modello tradizionale, ci vive una sola persona (un solo Sistema Operativo). È un enorme spreco di spazio, luce e riscaldamento.

Con la virtualizzazione, trasformiamo la villa in un **condominio**. 
L'**Hypervisor** è l'amministratore del condominio. Divide la villa in tanti appartamenti indipendenti (le *Macchine Virtuali*), ognuno con la sua porta chiusa a chiave. L'amministratore decide quanta acqua (RAM) e quanta corrente (CPU) assegnare a ciascun appartamento. Se un inquilino dà fuoco al proprio appartamento (il server va in crash o prende un virus), le mura isolanti dell'Hypervisor fanno in modo che gli altri inquilini non si accorgano di nulla e continuino la loro vita normalmente.

## 4. Tipologie di Hypervisor

La differenza tra le due tipologie di Hypervisor è il **livello in cui vengono installati** rispetto all'hardware.

### 4.1 Hypervisor di Tipo 1 (Bare-Metal)
"Bare-metal" significa letteralmente "sul metallo nudo". Questo Hypervisor **è esso stesso il sistema operativo**. Viene installato direttamente sull'hardware vuoto del server. 
* **Come funziona:** Accendete il server fisico, e invece di avviare Windows o Linux, si avvia l'Hypervisor (es. *VMware ESXi*, *Microsoft Hyper-V*, *Proxmox*). Sopra di esso vengono create le VM.
* **Vantaggi:** Prestazioni massime, latenza minima, massima sicurezza e stabilità.
* **Ambito di utilizzo:** È lo standard assoluto per i Data Center, i Server aziendali e i servizi Cloud. **All'esame di Stato si deve usare sempre questo!**

### 4.2 Hypervisor di Tipo 2 (Hosted)
"Hosted" significa "ospitato". Questo Hypervisor è un semplice **programma (applicazione)** che viene installato sopra un sistema operativo "host" già esistente (come Windows 10, macOS o Linux).
* **Come funziona:** Avviate il vostro PC con Windows, aprite un programma (es. *VirtualBox* o *VMware Workstation*) e dentro quel programma create una VM.
* **Vantaggi:** Facilissimo da installare, ideale per fare test sul proprio portatile senza dover formattare il computer.
* **Ambito di utilizzo:** Sviluppo software, laboratori scolastici, test di sistemi operativi. **Non si usa MAI per mettere in produzione server aziendali!** Se il Windows che "ospita" il programma si blocca per un aggiornamento, tutte le macchine virtuali si spengono!

---

## 5. Esempi Applicativi per la Seconda Prova
All'esame, quando la traccia vi chiede di progettare il CED di un'azienda che deve erogare 3 o 4 servizi diversi, ecco come dovete strutturare la risposta per prendere il massimo dei punti:

> **Come scrivere nel compito:**
> *"Per soddisfare le richieste della traccia, si è deciso di non acquistare server fisici separati per ogni servizio, ma di adottare un'architettura basata sulla **Virtualizzazione**. Verranno acquistati 2 potenti server fisici sui quali verrà installato un **Hypervisor di Tipo 1 (Bare-Metal)**, come VMware vSphere o Proxmox VE. 
> Questa scelta progettuale garantisce enormi vantaggi:
> 1. **Ottimizzazione dei costi:** Si acquista meno hardware e si abbattono i consumi elettrici.
> 2. **Isolamento e Sicurezza:** Ogni servizio (Web, Database, Gestionale) girerà su una propria Macchina Virtuale isolata. Se il server Web viene compromesso da un attacco informatico, il Database resterà protetto nella sua VM.
> 3. **Disaster Recovery e Snapshot:** Grazie all'Hypervisor, prima di ogni aggiornamento critico verrà scattata una "Snapshot" (fotografia) della VM, permettendo un ripristino istantaneo in caso di errori.
> 4. **Alta Affidabilità (HA):** In caso di guasto hardware del Server Fisico 1, l'Hypervisor sposterà automaticamente e a caldo le VM sul Server Fisico 2, garantendo la continuità operativa del servizio."*

---

## 6. Schema rapido

| Caratteristica | Hypervisor Tipo 1 (Bare-Metal) | Hypervisor Tipo 2 (Hosted) |
| :--- | :--- | :--- |
| **Installazione** | Direttamente sull'Hardware (sostituisce il S.O.) | Installato come programma su un S.O. esistente |
| **Prestazioni** | Elevatissime (accesso diretto alle risorse) | Basse (le richieste passano per il S.O. host) |
| **Esempi Software**| VMware ESXi, Proxmox, MS Hyper-V | Oracle VirtualBox, VMware Workstation |
| **Uso ideale** | Server aziendali, Data Center, Cloud (IaaS) | PC personali, ambienti di Test e Laboratori |
| **All'Esame** | **La scelta vincente per progettare il CED** | Solo per testare configurazioni locali |

---

## 7. Sintesi conclusiva per lo studio

La **Virtualizzazione** è la tecnologia alla base delle moderne infrastrutture IT e del Cloud Computing. Permette di slegare i sistemi operativi dall'hardware fisico tramite un software di astrazione chiamato **Hypervisor**. 
Esistono due approcci alla virtualizzazione: gli **Hypervisor di Tipo 2 (Hosted)**, come VirtualBox, vengono installati come normali applicazioni su un sistema operativo preesistente e sono utili solo per ambienti di test. 
Per gli ambienti aziendali e la progettazione richiesta all'Esame di Stato, si utilizzano esclusivamente gli **Hypervisor di Tipo 1 (Bare-Metal)**. Questi sistemi operano direttamente sull'hardware, garantendo prestazioni eccezionali, isolamento dei processi, riduzione dei costi energetici e hardware, e offrendo funzioni avanzate di High Availability (alta affidabilità) e gestione dei backup (Snapshot).

> **💡 Definizione rapida per l'interrogazione:**
> *La virtualizzazione permette di eseguire più macchine virtuali su un singolo server fisico. È gestita dall'Hypervisor. L'Hypervisor di Tipo 2 (Hosted) si installa come programma su un OS esistente (es. VirtualBox) e si usa per test. L'Hypervisor di Tipo 1 (Bare-Metal) si installa direttamente sull'hardware vuoto (es. VMware ESXi o Proxmox), offrendo prestazioni, sicurezza e affidabilità ottimali, ed è lo standard assoluto per i server aziendali.*

---

## 8. Glossario essenziale
* **Virtualizzazione:** Astrazione delle risorse hardware fisiche per creare versioni software (virtuali) di computer, reti o storage.
* **Hypervisor (VMM - Virtual Machine Monitor):** Il software o sistema operativo che gestisce, distribuisce le risorse fisiche e isola le macchine virtuali.
* **Macchina Virtuale (VM - Virtual Machine):** Un ambiente informatico virtualizzato che si comporta esattamente come un computer fisico indipendente, con il proprio sistema operativo (Guest OS).
* **Bare-Metal (Tipo 1):** Tipologia di Hypervisor installato direttamente sull'hardware (sul metallo nudo), senza l'intermediazione di un altro sistema operativo.
* **Hosted (Tipo 2):** Tipologia di Hypervisor installato come applicazione su un sistema operativo host preesistente.
* **Snapshot:** "Fotografia" istantanea dello stato e dei dati di una macchina virtuale in un determinato momento. Permette di riportare la VM a quello stato esatto in caso di problemi (es. dopo un aggiornamento fallito).
* **High Availability (HA):** Funzionalità avanzata dei cluster virtualizzati che permette a una VM di essere riavviata automaticamente su un altro server fisico se il server originale si guasta, minimizzando i tempi di disservizio.
* **Host / Guest:** L'Host è la macchina fisica che ospita la virtualizzazione; il Guest è il sistema operativo installato all'interno della Macchina Virtuale.