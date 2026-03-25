---
title: MPLS (Multiprotocol Label Switching)
---

## 1. MPLS: contesto
MPLS, acronimo di Multiprotocol Label Switching, è una tecnologia di rete usata soprattutto nelle WAN (Wide Area Network) aziendali per collegare tra loro sedi geograficamente distanti, come filiali, uffici periferici e data center. L'obiettivo principale di MPLS è fare in modo che queste sedi comunichino come se facessero parte di un’unica grande rete locale (LAN) privata e sicura, sebbene fisicamente distanti chilometri. 

In pratica, MPLS è la soluzione ideale quando un’azienda ha una sede centrale e svariate sedi periferiche che devono scambiarsi dati in modo affidabile, continuo e con prestazioni garantite e prevedibili, superando i limiti di latenza e congestione del normale traffico Internet pubblico.

## 2. Definizione
MPLS è una tecnica avanzata di inoltro dei pacchetti che utilizza **etichette (label)** invece del solo indirizzo IP di destinazione per decidere rapidamente il percorso che i dati devono seguire all'interno della rete del provider. 

Nei router IP tradizionali, ogni router deve spacchettare l'intestazione, leggere l'indirizzo IP di destinazione e consultare lunghe tabelle di routing per decidere l'hop (salto) successivo. MPLS elimina questo collo di bottiglia: la decisione di inoltro si basa esclusivamente sulla lettura di una breve etichetta. Per questo motivo, operando a metà strada tra i protocolli di datalink (come Ethernet, Livello 2) e i protocolli di rete (come IP, Livello 3), MPLS viene spesso definita come una tecnologia di **Livello 2,5** del modello OSI.

## 3. Spiegazione diretta
Si può spiegare MPLS in questo modo: immaginate una rete stradale in cui, invece di fermarvi a ogni incrocio per leggere la mappa (routing IP tradizionale), vi viene assegnato un "telepass" all'ingresso dell'autostrada. Tutti i caselli successivi leggeranno solo quel telepass, facendovi viaggiare su una corsia preferenziale senza interruzioni fino a destinazione.

MPLS è esattamente questo: una soluzione utilizzata per creare una **rete privata geografica** che collega sedi aziendali separate attraverso l’infrastruttura di un provider di telecomunicazioni. Questa architettura garantisce buone prestazioni, priorità del traffico (Quality of Service - QoS) e continuità operativa. È quindi indispensabile quando tra le sedi devono transitare servizi "critici" e sensibili ai ritardi, come database aziendali, software gestionali (ERP), chiamate telefoniche VoIP, flussi di videosorveglianza o l'accesso ai server centrali.

## 4. Funzionamento essenziale
Il funzionamento di una rete MPLS si basa su una netta divisione dei compiti tra i router di bordo (ai confini della rete) e i router interni:

1. **Ingresso (Push):** Quando un pacchetto IP generato dall'azienda entra nella rete MPLS del provider, il router di ingresso (chiamato *Label Edge Router* o LER) analizza il pacchetto e gli "appiccica" sopra una specifica etichetta (label).
2. **Transito (Swap):** I router interni alla rete del provider (chiamati *Label Switching Router* o LSR) non guardano più l'indirizzo IP originale. Si limitano a leggere l'etichetta, consultare una tabella velocissima, sostituire l'etichetta con una nuova e inoltrare il pacchetto al router successivo. Questo crea un percorso predefinito chiamato *LSP (Label Switched Path)*.
3. **Uscita (Pop):** Quando il pacchetto raggiunge il router di uscita (l'ultimo LER prima della sede di destinazione), l'etichetta viene rimossa. Il pacchetto torna a essere un normale pacchetto IP e viene consegnato alla rete locale.

Questo meccanismo consente percorsi molto più veloci, flessibili e controllabili. Tuttavia, essendo una tecnologia legata all'infrastruttura fisica di un provider, risulta meno flessibile delle soluzioni più moderne (come le SD-WAN) pensate per ambienti molto orientati al cloud. Inoltre, **non essendo cifrato in modo nativo**, il traffico MPLS può richiedere tecnologie aggiuntive (come l'incapsulamento in tunnel IPsec) per garantire la protezione completa dei dati contro le intercettazioni.

---

## 5. Schema rapido

| Aspetto | Sintesi |
| :--- | :--- |
| **Cos’è** | Tecnologia WAN basata su label (etichette) per instradare velocemente il traffico. |
| **A cosa serve** | Collegare sedi aziendali separate creando una rete privata ad alte prestazioni. |
| **Dove si usa** | Aziende multisede, filiali, data center, servizi critici (VoIP, video). |
| **Punto forte** | Prestazioni stabili, prevedibilità e supporto nativo per la QoS (Quality of Service). |
| **Punto debole** | Costo elevato, rigidità architetturale e crittografia non inclusa nativamente. |

---

## 6. Sintesi conclusiva per lo studio

**MPLS (Multiprotocol Label Switching)** è una tecnologia utilizzata soprattutto per collegare sedi aziendali geograficamente separate, come filiali e sede centrale, all’interno di una WAN privata gestita da un provider. Il traffico viene inoltrato usando speciali etichette (label) al posto dei complessi indirizzi IP, garantendo prestazioni molto più stabili rispetto al normale Internet pubblico. 

La sua caratteristica principale è la possibilità di assegnare priorità (QoS) ai servizi critici, come voce (VoIP), video e applicazioni gestionali, evitando che subiscano rallentamenti. Per questo MPLS è lo standard nelle reti aziendali multisede tradizionali, anche se comporta costi generalmente più alti rispetto alle normali connessioni e non include di per sé la cifratura dei dati (spesso compensata integrandolo con una VPN IPsec).

> **💡 Definizione rapida per l'interrogazione:**
> *MPLS è una tecnologia WAN usata principalmente per collegare sedi aziendali separate tramite una rete privata fornita da un provider, garantendo comunicazioni affidabili, bassa latenza e la possibilità di dare priorità assoluta al traffico dei servizi più importanti.*

---

## 7. Glossario essenziale
* **MPLS (Multiprotocol Label Switching):** Tecnologia di inoltro dei dati basata sull'uso di etichette per velocizzare il routing e garantire la qualità del servizio.
* **Label (Etichetta):** Un breve identificatore aggiunto al pacchetto dati usato dai router MPLS per decidere dove inoltrare il traffico senza dover leggere l'indirizzo IP.
* **QoS (Quality of Service):