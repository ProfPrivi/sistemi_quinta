---
title: Container e Docker
description: Containerizzazione, cos'è Docker, differenze con le Macchine Virtuali (VM) ed esempi per l'Esame di Stato 5IA.
---

## 1. La Containerizzazione: contesto
Abbiamo visto come la virtualizzazione tramite Hypervisor abbia risolto il problema dello spreco di risorse dei server fisici. Tuttavia, le Macchine Virtuali (VM) portano con sé un "peso" notevole: per far girare una semplice applicazione web da 50 MB, bisogna installare un intero Sistema Operativo *Guest* (es. 20 GB di Windows o Linux), assegnargli RAM dedicata e aspettare i minuti necessari per il suo avvio. 

Nel mondo moderno del Cloud e dello sviluppo software, serviva un modo per pacchettizzare ed eseguire le applicazioni in modo **immediato e leggerissimo**, senza doversi portare dietro il peso di un intero sistema operativo ogni volta. La risposta a questa esigenza è la **Containerizzazione**.

## 2. Definizione
La containerizzazione è una forma di virtualizzazione a **livello di Sistema Operativo**. 
Invece di virtualizzare l'intero hardware (come fa l'Hypervisor), si virtualizza solo l'ambiente di esecuzione dell'applicazione. Un **Container** è un pacchetto software standardizzato che contiene *esattamente e solo* ciò che serve all'applicazione per funzionare (il codice, le librerie e le configurazioni), condividendo il "motore" (Kernel) del sistema operativo sottostante.

**Docker** è la piattaforma software (l'azienda e lo strumento principale) diventata lo standard mondiale per creare, distribuire ed eseguire questi container.

## 3. Spiegazione diretta
Immaginate lo sviluppo del software come il **trasporto marittimo delle merci**.

* **Prima dei Container:** Ogni volta che si caricava una nave, bisognava adattare la stiva a merci diverse (sacchi di grano, barili d'olio, pianoforti). Era un caos: le merci si mischiavano, i barili perdevano olio sul grano, e scaricare la nave richiedeva settimane. (Questo è quando si installavano le app direttamente sui server fisici).
* **Le Macchine Virtuali (VM):** Per non far toccare le merci, compriamo **una nave diversa per ogni tipo di merce**. Isolamento perfetto, ma costo immenso e spreco di spazio (ogni nave ha il suo capitano, il suo motore, il suo equipaggio = *il Sistema Operativo Guest*).
* **I Container (Docker):** Abbiamo inventato i **Container navali in metallo**. Tutti hanno la stessa forma esterna standard. Dentro uno ci metti il grano, dentro un altro i pianoforti. Si caricano tutti sulla **stessa nave** (il *Server Host*), condividono lo **stesso motore ed equipaggio** (il *Kernel del S.O.*), non si sporcano a vicenda e si caricano/scaricano in un secondo.

## 4. Architettura: Docker vs VM
Questa è la differenza tecnica da imparare a memoria per l'Esame di Stato:

### 4.1 Architettura della Macchina Virtuale (VM)
1. **Server Fisico** (Hardware).
2. **Hypervisor** (es. VMware ESXi).
3. **Guest OS** (Un intero S.O. pesante per ogni singola macchina virtuale).
4. **App + Librerie** (L'applicazione finale).
* *Risultato:* Isolamento totale, ma avvio in minuti, grande consumo di RAM e spazio su disco.

### 4.2 Architettura Docker (Container)
1. **Server Fisico** (Hardware).
2. **Sistema Operativo Host** (es. Linux).
3. **Docker Engine** (Il motore che gestisce i container).
4. **Container** (Solo l'App + le sue Librerie essenziali).
* *Risultato:* I container condividono il Kernel di Linux. Pesano pochi Megabyte, si avviano in **frazioni di secondo** e su un solo server possono girare migliaia di container contemporaneamente. L'isolamento è leggermente inferiore a quello di una VM, ma l'efficienza è impareggiabile.

---

## 5. Esempi Applicativi per la Seconda Prova
Quando la traccia d'esame vi chiede di progettare un'infrastruttura per un'azienda che sviluppa software moderno, o che deve erogare un'applicazione Web divisa in "Microservizi" (es. il sito da una parte e il database dall'altra), citare Docker è la mossa vincente.

> **Come scrivere nel compito:**
> *"Per l'erogazione del nuovo applicativo web aziendale, si propone di abbandonare la tradizionale architettura monolitica basata su Macchine Virtuali a favore di un'architettura a **Microservizi basata su Containerizzazione (Docker)**.
> Nello specifico, si predisporrà un server (fisico o VM) dotato di sistema operativo Linux e **Docker Engine**. L'applicativo verrà diviso in due container separati:
> 1. Un container contenente il Server Web (es. Nginx + PHP).
> 2. Un container contenente il Database (es. MySQL).
> 
> Questa scelta progettuale porta tre vantaggi fondamentali all'azienda:
> * **Efficienza delle risorse:** I container non necessitano di un Sistema Operativo Guest, riducendo drasticamente l'uso di RAM e CPU rispetto a due VM separate.
> * **Portabilità assoluta:** Il container garantisce che l'applicazione funzioni perfettamente in qualsiasi ambiente (sviluppo, test e produzione), eliminando il classico problema del 'sul mio PC funzionava'.
> * **Scalabilità rapida:** In caso di picchi di traffico sul sito, Docker permette di avviare 10 o 100 nuove copie del container Web in pochissimi secondi, cosa impossibile da fare con i tempi di avvio di una Macchina Virtuale tradizionale. Se la rete dovesse crescere ulteriormente, si suggerisce l'implementazione di un orchestratore come **Kubernetes**."*

---

## 6. Schema rapido

| Caratteristica | Macchina Virtuale (VM) | Container (Docker) |
| :--- | :--- | :--- |
| **Tecnologia alla base** | Hypervisor (Virtualizza l'hardware) | Docker Engine (Virtualizza il S.O.) |
| **Sistema Operativo** | Ogni VM ha un proprio S.O. Guest completo | Tutti i container condividono il S.O. Host |
| **Peso e Spazio** | Gigabyte (GB) | Megabyte (MB) |
| **Tempo di Avvio** | Minuti | Secondi o Millisecondi |
| **Isolamento** | Massimo (isolamento hardware) | Buono (isolamento logico a livello di processi) |
| **Caso d'uso ideale** | Server monolitici, Sistemi operativi diversi (es. Windows su Linux) | Microservizi, Sviluppo Web, Scalabilità rapida (Cloud) |

---

## 7. Sintesi conclusiva per lo studio

La **Containerizzazione** è l'evoluzione dell'infrastruttura IT moderna. Mentre la virtualizzazione tradizionale usa un *Hypervisor* per creare interi computer virtuali (le Macchine Virtuali) dotati ognuno di un proprio pesante Sistema Operativo, i **Container** utilizzano un motore software (come **Docker Engine**) per pacchettizzare le applicazioni e le loro librerie, facendole girare direttamente sul Kernel del Sistema Operativo Host condiviso.

Questo rende i container incredibilmente leggeri (pesano pochi MB), portabili su qualsiasi computer senza errori di compatibilità e capaci di avviarsi istantaneamente. Per l'Esame di Stato, proporre un'architettura basata su Docker è la soluzione ottimale per erogare applicazioni web scalabili e architetture a **Microservizi**, riducendo i costi hardware e garantendo tempi di reazione immediati ai picchi di traffico.

> **💡 Definizione rapida per l'interrogazione:**
> *Un Container è un pacchetto software leggero e portabile che include un'applicazione e le sue librerie, eseguito isolatamente condividendo il Kernel del sistema operativo host. A differenza delle Macchine Virtuali, che richiedono un Hypervisor e un intero Sistema Operativo Guest per funzionare, i container (gestiti tramite piattaforme come Docker) non sprecano risorse per l'OS, risultando infinitesimalmente più leggeri, veloci da avviare e ideali per le moderne architetture Cloud a microservizi.*

---

## 8. Glossario essenziale
* **Container:** Un'unità standard di software che pacchetta il codice e tutte le sue dipendenze per far girare l'applicazione in modo rapido e affidabile da un ambiente all'altro.
* **Docker:** L'azienda e la piattaforma software open-source più famosa al mondo per la creazione e la gestione dei container.
* **Docker Engine:** Il motore di base installato sul server Host che permette di creare ed eseguire i container (l'equivalente dell'Hypervisor per le VM).
* **Immagine (Docker Image):** Un file di sola lettura, simile a un "calco" o a uno stampo, che contiene le istruzioni per creare un container. 
* **Guest OS:** Il sistema operativo completo installato all'interno di una Macchina Virtuale classica (totalmente assente nei container).
* **Microservizi:** Architettura di sviluppo in cui una grande applicazione (monolitica) viene divisa in tanti piccoli servizi indipendenti (es. carrello, login, catalogo), ognuno fatto girare nel proprio container.
* **Kubernetes (K8s):** Sistema open-source per l'automazione, il deployment, il dimensionamento e la gestione di applicazioni containerizzate (il "direttore d'orchestra" di Docker).
* **Kernel:** Il nucleo centrale di un sistema operativo (es. Linux). I container sullo stesso server condividono lo stesso Kernel.