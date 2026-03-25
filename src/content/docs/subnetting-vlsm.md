---
title: Subnetting e VLSM
description: Calcolo delle sottoreti, differenze tra FLSM e VLSM e ottimizzazione degli indirizzi IPv4..
---

## 1. Subnetting e VLSM: contesto
Nel mondo delle reti IPv4, gli indirizzi a disposizione sono limitati (circa 4,3 miliardi) e la loro gestione deve essere estremamente oculata. Quando un'azienda o un provider ottiene un blocco di indirizzi IP, non può assegnarli tutti a un'unica immensa rete locale. Un'unica grande rete creerebbe enormi problemi di congestione (a causa del traffico di broadcast) e di sicurezza (tutti i dipartimenti si vedrebbero tra loro). 

Per risolvere questo problema si usa il **Subnetting**, ovvero la tecnica che permette di suddividere una singola grande rete fisica in più "sottoreti" (subnet) logiche, più piccole e isolate, migliorando le prestazioni e la sicurezza. Il **VLSM** è l'evoluzione di questa tecnica, fondamentale per non sprecare nemmeno un indirizzo IP.

## 2. Definizione
Il **Subnetting** agisce modificando la Subnet Mask (maschera di sottorete). Prende "in prestito" alcuni bit che originariamente erano destinati agli host (i dispositivi) e li riassegna alla porzione di rete. In questo modo si creano più reti, ma ciascuna con meno host al suo interno.

Il **VLSM (Variable Length Subnet Mask)** è una tecnica avanzata di subnetting. Nel subnetting classico (chiamato FLSM - *Fixed Length Subnet Mask*), tutte le sottoreti create hanno esattamente la stessa dimensione (stesso numero di host). Con il VLSM, invece, si possono assegnare maschere di sottorete di lunghezza diversa a ciascuna subnet, creando reti "su misura" in base al numero reale di dispositivi presenti in ogni dipartimento.

## 3. Spiegazione diretta
La metafora migliore per spiegare la differenza tra Subnetting classico (FLSM) e VLSM è **la metafora della torta (o del palazzo)**.

* **Subnetting Classico (FLSM):** Avete una torta e dovete dividerla per 4 tavoli. Tagliate la torta in 4 fette esattamente uguali. Il problema è che al primo tavolo ci sono 100 persone (e la fetta non basta), mentre al secondo tavolo c'è solo 1 persona (che non la finirà mai, sprecando un sacco di torta).
* **VLSM:** Avete la stessa torta, ma prima di tagliare chiedete quanti ospiti ci sono a ogni tavolo. Tagliate una fetta enorme per il tavolo da 100 persone e una fettina minuscola per la persona da sola. Nessuno resta senza e non si spreca nulla!

In informatica, la "torta" sono gli indirizzi IP: se collego due router tra loro (collegamento punto-punto) mi servono solo **2 indirizzi IP**. Se uso il subnetting classico e assegno a quel collegamento una rete da 254 indirizzi, ne sto sprecando 252! Con il VLSM assegnerò una subnet mask `/30` che fornisce esattamente 2 indirizzi utili.

## 4. Funzionamento essenziale: le regole d'oro
Per risolvere gli esercizi di progettazione all'Esame di Stato, i ragazzi devono padroneggiare queste regole:

1. **La formula magica degli Host:** Il numero di indirizzi IP utili in una sottorete si calcola con la formula **$2^h - 2$** (dove *h* è il numero di bit lasciati per gli host, ovvero i bit a "0" nella maschera). I "$-2$" servono perché il primo indirizzo identifica la rete (Net ID) e l'ultimo è l'indirizzo di Broadcast.
2. **La regola d'oro del VLSM:** Si parte sempre dalla sottorete più grande! Quando si deve dividere una rete con VLSM, si mettono in ordine decrescente i dipartimenti (es. Sede Centrale 100 PC, Filiale 50 PC, Router point-to-point 2 PC) e si calcolano le reti in questo ordine, calcolando di volta in volta il nuovo indirizzo di partenza.
3. **Le maschere notevoli (CIDR):** All'esame, i collegamenti punto-punto (router-router) sono onnipresenti. Devono sapere a memoria che per un collegamento punto-punto serve sempre una maschera **`/30`** (ovvero $255.255.255.252$), che lascia 2 bit per gli host ($2^2 - 2 = 2$ IP utili perfetti per i due router).

---

## 5. Schema rapido

| Aspetto | Subnetting Classico (FLSM) | VLSM (Variable Length Subnet Mask) |
| :--- | :--- | :--- |
| **Definizione** | Divisione di una rete in sottoreti tutte della stessa grandezza. | Divisione di una rete in sottoreti di dimensioni diverse "su misura". |
| **Subnet Mask** | Identica per tutte le sottoreti create. | Diversa per ogni sottorete a seconda del bisogno. |
| **Spreco di IP** | **Elevatissimo.** Le reti piccole sprecano gli IP non usati. | **Minimo.** Ogni rete riceve solo gli IP strettamente necessari. |
| **Complessità** | Molto semplice da calcolare. | Più complesso (richiede calcoli sequenziali a partire dalla rete più grande). |
| **Quando si usa** | Reti legacy, vecchi protocolli di routing (RIPv1). | **Sempre.** È lo standard assoluto nel networking moderno e per l'Esame di Stato. |

---

## 6. Sintesi conclusiva per lo studio

Il **Subnetting** è la pratica di suddividere una rete IP principale in porzioni più piccole, migliorando la sicurezza, l'organizzazione e riducendo il traffico di broadcast. Poiché gli indirizzi IPv4 sono una risorsa limitata, non ci si può permettere di assegnare blocchi enormi di indirizzi a dipartimenti che contano pochi dispositivi. 

Per risolvere questo problema si utilizza il **VLSM (Variable Length Subnet Mask)**. A differenza del subnetting tradizionale, che taglia la rete in blocchi tutti uguali sprecando un'infinità di indirizzi, il VLSM permette di applicare maschere di sottorete diverse all'interno dello stesso spazio di indirizzamento. In questo modo, a un grande dipartimento viene assegnata una subnet capiente (es. `/24` per 254 host), mentre a un collegamento diretto tra due router viene assegnata una subnet minuscola (es. `/30` per soli 2 host), ottimizzando perfettamente l'uso degli IP a disposizione.

> **💡 Definizione rapida per l'interrogazione:**
> *Il Subnetting è la tecnica che divide una singola rete fisica in più sottoreti logiche per ragioni di sicurezza e prestazioni. Il VLSM (Variable Length Subnet Mask) è la sua evoluzione: permette di assegnare a ogni sottorete una maschera di lunghezza diversa in base al numero effettivo di dispositivi presenti, azzerando gli sprechi di indirizzi IP.*

---

## 7. Glossario essenziale
* **Subnetting:** Suddivisione di una rete IP grande in sottoreti più piccole prendendo in prestito bit dalla porzione host.
* **Subnet Mask (Maschera di sottorete):** Numero a 32 bit che permette ai dispositivi di capire quale parte di un indirizzo IP identifica la rete e quale identifica l'host.
* **CIDR (Classless Inter-Domain Routing):** La notazione breve per indicare la subnet mask, scritta come uno slash seguito dal numero di bit a "1" (es. `/24` equivale a `255.255.255.0`).
* **VLSM (Variable Length Subnet Mask):** Tecnica che permette di utilizzare maschere di sottorete di lunghezza diversa (e quindi reti di grandezza diversa) all'interno dello stesso spazio di indirizzamento.
* **Net ID (Indirizzo di Rete):** Il primo indirizzo di una sottorete. Tutti i bit della porzione host sono a "0". Non è assegnabile ai PC.
* **Indirizzo di Broadcast:** L'ultimo indirizzo di una sottorete. Tutti i bit della porzione host sono a "1". Serve per inviare un messaggio a tutti i PC della rete contemporaneamente.
* **Point-to-Point (Punto a Punto):** Collegamento diretto tra due router. Negli esercizi di VLSM richiede sempre e rigorosamente una subnet `/30`.
* **Traffico di Broadcast:** Dati inviati indiscriminatamente a tutti i dispositivi di una rete. Troppo broadcast rallenta l'infrastruttura; il subnetting serve proprio a contenerlo.