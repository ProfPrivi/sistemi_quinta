---
title: I Modelli di Servizio Cloud
description: Cloud Computing, differenze tra IaaS, PaaS e SaaS ed esempi strategici per la Seconda Prova 5IA.
---

## 1. Il Cloud Computing: contesto
Fino a dieci anni fa, se un'azienda voleva lanciare un nuovo sito web o un gestionale, doveva comprare un server fisico (pagandolo migliaia di euro in anticipo - costo **CAPEX**), metterlo in una stanza raffreddata, configurare la rete e pagare un tecnico per la manutenzione. Se il server si rompeva, il sito andava offline. Se il sito aveva un picco di visite, il server andava in blocco.

Il **Cloud Computing** ha stravolto questo modello. Oggi le aziende non comprano più i server fisici, ma li "affittano" tramite Internet da grandi provider (come Amazon AWS, Microsoft Azure o Google Cloud) pagando solo per ciò che consumano realmente (modello *Pay-as-you-go*, costo **OPEX**). Ma cosa si affitta esattamente? A seconda di quanto lavoro vogliamo fare noi e quanto vogliamo delegare al provider, esistono tre modelli di servizio principali: **IaaS, PaaS e SaaS**.

## 2. Definizione
I modelli di servizio Cloud definiscono il **livello di responsabilità** (Shared Responsibility Model) tra il cliente e il fornitore Cloud:
* **IaaS (Infrastructure as a Service):** Il provider ti affitta l'infrastruttura di base (Macchine Virtuali, Storage, Reti). Tu devi installare il Sistema Operativo e gestire tutto il resto.
* **PaaS (Platform as a Service):** Il provider ti fornisce una piattaforma già pronta (Server + S.O. + Database + Linguaggi di programmazione). Tu devi solo scrivere il codice della tua applicazione.
* **SaaS (Software as a Service):** Il provider ti fornisce il software finale pronto all'uso, accessibile via browser. Tu devi solo usarlo.

## 3. Spiegazione diretta
La metafora più famosa per capire il Cloud è **"La Pizza as a Service"**.

* **On-Premises (Fatto in casa):** Fai la pizza a casa tua. Devi comprare gli ingredienti, usare il tuo forno, consumare il tuo gas, apparecchiare la tua tavola e lavare i piatti. (Gestisci tutto tu, dal server fisico all'applicazione).
* **IaaS (Infrastruttura):** Vai in un supermercato e compri una pizza surgelata. L'impasto e il condimento te li ha preparati il fornitore, ma tu devi usare il tuo forno, il tuo tavolo e lavare i tuoi piatti. (Ti danno il server virtuale, tu ci installi il sistema operativo e l'app).
* **PaaS (Piattaforma):** Ordini la pizza a domicilio (Delivery). Il fornitore prepara la pizza e la cuoce nel suo forno. A te arriva già pronta, devi solo metterci il tuo tavolo e le tue bibite. (Ti danno l'ambiente pronto, tu ci metti solo il tuo codice).
* **SaaS (Software):** Vai a mangiare in Pizzeria. Ti siedi, mangi, e te ne vai. Non devi cucinare, non devi apparecchiare e non devi lavare i piatti. Paghi solo il conto. (Usi un software già pronto su Internet, come Gmail o Netflix).

---

## 4. Analisi dei Modelli per l'Esame

### 4.1 IaaS (Infrastructure as a Service)
È il modello più flessibile. Il fornitore gestisce l'Hardware fisico, la Virtualizzazione (Hypervisor) e la Rete del Data Center. Il cliente ha accesso root/amministratore a una Macchina Virtuale vuota.
* **Chi lo usa:** Sistemisti (System Administrator).
* **Vantaggi:** Controllo totale sul sistema operativo. Perfetto per la migrazione "Lift & Shift" (prendo i server vecchi dell'azienda e li copio identici nel cloud).
* **Esempi:** Amazon EC2, Azure Virtual Machines.

### 4.2 PaaS (Platform as a Service)
Il fornitore gestisce tutto l'Hardware e anche i Sistemi Operativi, i Middleware e l'ambiente di runtime (es. PHP, Java, MySQL). Il cliente non vede mai il sistema operativo sottostante.
* **Chi lo usa:** Sviluppatori Software (Developer).
* **Vantaggi:** Annulla i tempi di configurazione dei server. Lo sviluppatore carica il codice e il PaaS lo fa funzionare automaticamente, scalandolo se ci sono tanti utenti.
* **Esempi:** Google App Engine, Heroku, AWS Elastic Beanstalk.

### 4.3 SaaS (Software as a Service)
L'intera pila tecnologica è gestita dal fornitore. L'utente finale si limita ad accedere tramite browser web o App e a pagare un abbonamento (solitamente mensile o per utente).
* **Chi lo usa:** L'utente finale o le aziende per i servizi d'ufficio.
* **Vantaggi:** Zero manutenzione, zero installazione, aggiornamenti automatici e disponibilità globale.
* **Esempi:** Google Workspace (Docs, Drive), Microsoft 365, Dropbox, Salesforce.

---

## 5. Esempi Applicativi per la Seconda Prova
All'Esame di Stato, la traccia spesso presenta un'azienda con un CED obsoleto che deve modernizzarsi, oppure una software house che deve sviluppare una nuova app. Ecco come giustificare la scelta del Cloud nel tema:

> **Scenario 1 - L'Azienda deve dismettere il vecchio CED (Sostituzione Server):**
> *"Visti gli elevati costi di manutenzione e i frequenti guasti hardware del CED aziendale, si propone la migrazione dell'infrastruttura verso il Cloud adottando un modello **IaaS (Infrastructure as a Service)**. I vecchi server fisici verranno sostituiti da **Macchine Virtuali** ospitate presso un provider cloud (es. AWS o Azure). Questa scelta trasforma i costi dell'azienda da CAPEX (investimenti anticipati in hardware) a OPEX (spese operative a consumo), garantendo al contempo Alta Affidabilità (HA) e la possibilità di scalare le risorse hardware (RAM/CPU) istantaneamente in base alle necessità."*

> **Scenario 2 - L'Azienda deve sviluppare una nuova Web App per i clienti:**
> *"Per lo sviluppo e il rilascio della nuova applicazione web, si è deciso di non gravare sui sistemisti per la configurazione dei server, adottando invece una soluzione **PaaS (Platform as a Service)**. Il team di programmatori potrà concentrarsi esclusivamente sulla stesura del codice, caricandolo direttamente sulla piattaforma Cloud che si occuperà in totale autonomia di gestire il Sistema Operativo, il bilanciamento del carico e gli aggiornamenti di sicurezza del server web."*

> **Scenario 3 - L'Azienda deve gestire la posta elettronica e i documenti dei dipendenti:**
> *"Invece di installare e mantenere un costoso e complesso server di posta interno (come Microsoft Exchange), si suggerisce l'adozione di una soluzione **SaaS (Software as a Service)** come Google Workspace o Microsoft 365. L'azienda pagherà un canone mensile per utente, azzerando i costi di manutenzione, delegando al provider i backup e garantendo ai dipendenti l'accesso ai documenti aziendali da qualsiasi dispositivo, facilitando così lo Smart Working."*

---

## 6. Schema rapido

| Modello | Chi gestisce l'App e i Dati? | Chi gestisce Sistema Operativo e Hardware? | Utente Tipico | Esempio Pratico |
| :--- | :--- | :--- | :--- | :--- |
| **On-Premises** | Azienda | Azienda (comprano i server) | Tutti | CED Interno tradizionale |
| **IaaS** | Azienda | Provider Cloud | Sistemisti | Macchina Virtuale in affitto |
| **PaaS** | Azienda (solo il codice dell'app) | Provider Cloud | Programmatori | Ambiente di hosting codice |
| **SaaS** | Provider Cloud | Provider Cloud | Utenti Finali | Gmail, Office 365, Dropbox |

---

## 7. Sintesi conclusiva per lo studio

Il **Cloud Computing** ha trasformato l'informatica da un "bene da acquistare" (modello On-Premises) a un "servizio a consumo" (Pay-as-you-go). 
Quando si progetta la migrazione verso il Cloud, si deve scegliere il giusto modello di servizio in base alle competenze dell'azienda e all'obiettivo. Il modello **IaaS** offre il massimo controllo affittando macchine virtuali vuote, ideale per migrare sistemi già esistenti. Il modello **PaaS** nasconde la complessità dei sistemi operativi per fornire ambienti pronti all'uso, perfetti per chi deve sviluppare software. Infine, il modello **SaaS** fornisce applicazioni finali chiavi in mano accessibili via web, azzerando qualsiasi onere di manutenzione sistemistica per l'azienda cliente.

> **💡 Definizione rapida per l'interrogazione:**
> *Il Cloud Computing offre risorse IT on-demand. Nel modello IaaS (es. AWS EC2) si noleggiano le infrastrutture virtuali come RAM, CPU e Reti, gestendo in proprio i Sistemi Operativi. Nel modello PaaS (es. Heroku) si affitta l'intera piattaforma di esecuzione, ideale per gli sviluppatori che vogliono solo caricare il codice. Nel modello SaaS (es. Microsoft 365) si usa un software applicativo pronto, gestito interamente dal fornitore Cloud.*

---

## 8. Glossario essenziale
* **Cloud Computing:** Erogazione di risorse informatiche (server, storage, database, software) tramite Internet, con tariffazione a consumo.
* **IaaS (Infrastructure as a Service):** Servizio Cloud che fornisce risorse infrastrutturali virtualizzate (elaborazione, rete, archiviazione).
* **PaaS (Platform as a Service):** Servizio Cloud che fornisce una piattaforma e un ambiente per consentire agli sviluppatori di creare app via web.
* **SaaS (Software as a Service):** Modello in cui il provider ospita l'applicazione e la rende disponibile ai clienti tramite Internet (solitamente browser).
* **On-Premises:** Il modello tradizionale in cui i server fisici sono acquistati e tenuti fisicamente all'interno dell'azienda.
* **CAPEX (Capital Expenditure):** Spesa in conto capitale, ovvero i soldi spesi in anticipo per comprare beni fisici (es. comprare un Server a 5000€).
* **OPEX (Operational Expenditure):** Spesa operativa, ovvero i costi di gestione pagati nel tempo (es. affittare un server Cloud a 50€ al mese). Il Cloud trasforma i CAPEX in OPEX.
* **Scalabilità:** La capacità del Cloud di aggiungere (o rimuovere) RAM, CPU o interi server in pochi secondi per gestire i picchi di traffico.