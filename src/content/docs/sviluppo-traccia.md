---
title: "Struttura per lo Svolgimento della Seconda Prova"
description: "Guida passo-passo e struttura consigliata (Rev. 2026) per affrontare e risolvere la traccia ministeriale della Seconda Prova di Sistemi e Reti."
---

## 1. ANALISI DELLO SCENARIO DI PARTENZA
Sostanziale riscrittura e scomposizione della traccia ministeriale per enucleare le caratteristiche fondamentali del progetto richiesto a tutti i livelli.
* **Contesto Organizzativo:** Identificazione dell'azienda/ente, numero di sedi, tipologia di utenti e finalità del business.
* **Requisiti Espliciti e Vincoli:** Elenco puntuale di tutto ciò che la traccia richiede espressamente (es. servizi da erogare, necessità di sicurezza, tecnologie menzionate).
* **Infrastruttura Esistente (As-Is):** Analisi di eventuali apparati, reti o problematiche già presenti descritte nel testo, che faranno da base per il nuovo progetto (To-Be).

## 2. PREMESSE ED IPOTESI AGGIUNTIVE
Sezione dedicata a tutte le premesse e ipotesi che lo studente formula per colmare le "zone d'ombra" della traccia e contestualizzare la soluzione. È fondamentale che le ipotesi non modifichino o si sovrappongano ai requisiti espliciti emersi nell'analisi dello scenario. In questa fase si definiscono ad esempio il numero ipotizzato di host per reparto o le specifiche necessità di banda.

## 3. TOPOLOGIA LOGICA PRELIMINARE
Rappresentazione grafica e testuale della gerarchia del sistema basata sulle deduzioni del tema d'esame.
* **Disegno della topologia:** Indicazione delle sedi, delle reti e dei nodi critici.
* **Identificazione dei ruoli:** Collocazione dei servizi e dei punti di demarcazione tra le reti.

## 4. PIANO DI INDIRIZZAMENTO E SEGMENTAZIONE
Definizione dello spazio degli indirizzi per le reti progettate.
* **Indirizzamento:** Scelta tra IPv4 (con eventuale NAT) e/o IPv6.
* **Segmentazione (VLAN):** Suddivisione logica della rete per separare i dipartimenti, il traffico critico, il traffico operativo e le reti ospiti/BYOD.

## 5. ARCHITETTURA DI SICUREZZA: AAA, DMZ E FILTRAGGIO
Dettaglio delle strategie di protezione proattiva e controllo accessi.
* **Protocollo AAA e Server RADIUS:** Implementazione di un'architettura Authentication, Authorization, and Accounting gestita tramite un server RADIUS centrale per validare le credenziali, assegnare permessi specifici (es. assegnazione dinamica della VLAN) e tracciare gli accessi.
* **Implementazione DMZ:** Progettazione di una "zona demilitarizzata" per isolare i servizi esposti all'esterno (es. Web Server, VPN Gateway) dalla rete interna privata.
* **Access Control Lists (ACL):** Definizione delle regole di filtraggio del traffico applicate agli apparati di rete per regolare le comunicazioni tra VLAN e verso la DMZ.
* **Sicurezza Perimetrale:** Utilizzo di Firewall di nuova generazione (NGFW) per il monitoraggio del traffico applicativo.

## 6. DEFINIZIONE DEI SERVIZI DI RETE
Elencazione e descrizione dei servizi necessari al funzionamento dell'infrastruttura.
* **Servizi Core:** DNS, DHCP, Identity Management (Active Directory/LDAP).
* **Servizi Applicativi:** Server Web, Mail, File sharing e Database.
* **Gestione Accessi:** Sistemi di autenticazione centralizzata e Multi-Factor Authentication (MFA).

## 7. INTERCONNESSIONE, MOBILITÀ E CLOUD
Metodi di collegamento tra le sedi e gestione della mobilità.
* **Interconnessione Sedi:** Utilizzo di tecnologie VPN (Site-to-Site) o soluzioni SD-WAN.
* **Accesso Remoto e Mobile:** Gestione dello Smart-working tramite protocolli sicuri o architetture Zero Trust.
* **Sistemi Mobile/IoT:** Metodi di connessione per dispositivi mobili o sensori (es. 5G, Wi-Fi protetto).
* **Cloud & Edge Computing:** Valutazione della collocazione dei servizi (Locale vs Cloud) per ottimizzare latenza e disponibilità.

## 8. BUSINESS CONTINUITY E DISASTER RECOVERY
Strategie per garantire la resilienza del sistema e la replicazione dei servizi.
* **Ridondanza:** Failover su linee secondarie e ridondanza degli apparati critici.
* **Backup:** Strategie di salvataggio dati e procedure di ripristino post-evento critico.

## 9. SVOLGIMENTO QUESITI (SECONDA PARTE)
Sviluppo tecnico dei quesiti opzionali scelti dal candidato.
* **Progettazione Base di Dati:** Analisi del problema, Schema Concettuale (E-R) e Schema Logico.
* **Sviluppo Software/Web:** Scelta delle tecnologie e codifica di una porzione significativa dell'applicazione.
* **Analisi Tecnica:** Risposta ai quesiti teorici o implementativi (es. gestione BYOD o analisi della sicurezza).