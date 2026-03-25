---
title: VLAN (Virtual LAN)
---

## 1. VLAN: contesto
In una rete tradizionale, tutti i dispositivi collegati allo stesso switch fisico appartengono allo stesso **dominio di broadcast**. Questo significa che se un PC invia un messaggio a tutti (broadcast, come una richiesta ARP o DHCP), quel messaggio raggiunge ogni singolo computer connesso. 

Man mano che un'azienda cresce, avere un unico enorme dominio di broadcast genera due problemi critici:
1. **Prestazioni:** La rete viene inondata di traffico inutile, rallentando le comunicazioni.
2. **Sicurezza:** Tutti i dipartimenti (es. Direzione, Segreteria, Ospiti) si "vedono" tra loro a livello 2, permettendo facilmente intercettazioni o accessi non autorizzati.

Comprare uno switch fisico separato e tirare cavi diversi per ogni dipartimento sarebbe un incubo logistico ed economico. La soluzione elegante e standard a questo problema è la **VLAN**.

## 2. Definizione
Una **VLAN (Virtual LAN)** è una tecnologia di Livello 2 (Data Link) del modello OSI che permette di suddividere logicamente un singolo switch fisico in più switch virtuali isolati. 

Grazie alle VLAN, è possibile raggruppare i dispositivi in reti separate in base alla loro funzione, dipartimento o applicazione (es. VLAN per i dati, VLAN per i telefoni VoIP), indipendentemente da dove si trovino fisicamente i PC o a quale porta dello switch siano collegati. Dispositivi in VLAN diverse non possono comunicare direttamente tra loro, garantendo sicurezza e isolamento totale a livello datalink.

## 3. Spiegazione diretta
Immaginate lo switch della scuola come un'enorme **palestra vuota**. Se ci mettete dentro gli studenti, i professori e il preside, tutti sentiranno l'eco delle urla di tutti (il traffico di *broadcast*) e chiunque potrà sbirciare i documenti sulla scrivania del preside (problema di *sicurezza*).

Le VLAN sono come dei **muri invisibili e insonorizzati** che potete alzare istantaneamente dentro la palestra. Potete creare la "Stanza Studenti" (VLAN 10), la "Stanza Prof" (VLAN 20) e la "Stanza Preside" (VLAN 30). Anche se si trovano tutti nello stesso edificio (lo stesso switch), chi è nella VLAN 10 non può né vedere né sentire chi è nella VLAN 20. 
E se un prof deve mandare un documento al preside? Dovrà uscire dalla sua stanza, passare per un "portiere" autorizzato (il **Router**) e farsi consegnare il pacchetto nell'altra stanza.

## 4. Funzionamento essenziale: Tagging e Porte
Per far funzionare le VLAN, gli switch utilizzano un meccanismo standardizzato chiamato **IEEE 802.1Q**. Questo protocollo "appiccica" una piccola etichetta (Tag) di 4 byte a ogni pacchetto dati (Frame Ethernet) che transita nello switch, scrivendoci sopra il numero della VLAN a cui appartiene.

Per gestire questo traffico, le porte degli switch vengono configurate in due modi:
* **Porte Access (Access Port):** Sono le porte a cui si collegano i dispositivi finali (PC, stampanti). Appartengono a **una sola VLAN**. Il PC non sa nulla delle VLAN: quando invia un dato, lo switch riceve il frame e gli "appiccica" il Tag. Quando lo switch deve inviare un dato al PC, rimuove il Tag prima di consegnarlo.
* **Porte Trunk (Trunk Port):** Sono i "tubi principali", le porte usate per collegare due switch tra loro o uno switch a un router. Su una porta Trunk passano **tutte le VLAN contemporaneamente**. Qui i pacchetti viaggiano con l'etichetta (Tag) ben visibile, così lo switch di destinazione sa esattamente a quale VLAN smistarli.

### L'Inter-VLAN Routing
Cosa succede se un PC della VLAN Segreteria deve per forza parlare con un PC della VLAN Direzione? Dato che a Livello 2 sono isolati, serve un apparato di Livello 3 (Rete) per farli comunicare: un Router o uno Switch Layer 3.
All'esame di Stato si usa quasi sempre la tecnica del **Router-on-a-Stick**: si collega il router allo switch con *un solo cavo* su una porta Trunk. Il router riceve il traffico di tutte le VLAN, lo analizza, lo instrada e lo rimanda giù verso la VLAN di destinazione.

---

## 5. Schema rapido

| Aspetto | Sintesi |
| :--- | :--- |
| **Cos'è** | Suddivisione logica di una rete fisica in più reti virtuali isolate. |
| **A cosa serve** | Ridurre il traffico di broadcast, migliorare le prestazioni e aumentare la sicurezza. |
| **Livello OSI** | Livello 2 (Data Link / Collegamento Dati). |
| **Standard di riferimento** | **IEEE 802.1Q** (aggiunge il Tag al Frame Ethernet). |
| **Porta Access** | Collega i PC finali, gestisce una sola VLAN, traffico *untagged* (senza etichetta). |
| **Porta Trunk** | Collega Switch-Switch o Switch-Router, porta traffico di più VLAN (*tagged*). |

---

## 6. Sintesi conclusiva per lo studio

Le **VLAN (Virtual LAN)** sono uno strumento fondamentale per la progettazione delle reti aziendali. Permettono di segmentare un'infrastruttura fisica in domini di broadcast logici separati, garantendo che il traffico di un dipartimento non interferisca con gli altri e migliorando radicalmente la sicurezza interna. 

Questa separazione è resa possibile dallo standard **802.1Q**, che inserisce un identificativo (Tag) nei frame Ethernet. Affinché i pacchetti possano viaggiare attraverso l'infrastruttura, si utilizzano le *Porte Trunk* per i collegamenti tra gli apparati di rete (facendo passare più VLAN) e le *Porte Access* per i collegamenti verso i dispositivi finali. Poiché le VLAN sono isolate a Livello 2, qualsiasi comunicazione tra dispositivi appartenenti a VLAN differenti richiede obbligatoriamente un processo di instradamento a Livello 3, noto come **Inter-VLAN Routing**.

> **💡 Definizione rapida per l'interrogazione:**
> *Una VLAN è una rete locale virtuale che permette di suddividere logicamente uno switch fisico in più domini di broadcast isolati a Livello 2. Serve per migliorare le prestazioni, limitare il traffico inutile e garantire la sicurezza separando i dipartimenti, utilizzando lo standard 802.1Q per etichettare i pacchetti e il routing di Livello 3 per farli comunicare tra loro.*

---

## 7. Glossario essenziale
* **VLAN (Virtual LAN):** Rete locale virtuale creata logicamente via software all'interno di switch fisici.
* **Dominio di Broadcast:** L'insieme di tutti i dispositivi che ricevono un messaggio di broadcast inviato da un host nella rete. Le VLAN servono per rimpicciolire questi domini.
* **IEEE 802.1Q:** Lo standard internazionale che definisce come implementare le VLAN, inserendo un Tag (etichetta) di 4 byte nell'intestazione del frame Ethernet.
* **Tag:** L'etichetta inserita nel pacchetto dati che indica a quale VLAN appartiene (VLAN ID).
* **Porta Access:** Porta dello switch assegnata a una singola VLAN. Si usa per collegare dispositivi finali che non supportano il tagging (come i normali PC).
* **Porta Trunk:** Porta dello switch configurata per trasportare il traffico di molteplici VLAN contemporaneamente (traffico tagged), usata per i collegamenti tra switch o verso i router.
* **Inter-VLAN Routing:** Processo che permette lo scambio di pacchetti tra VLAN diverse tramite un apparato di Livello 3 (Router o Switch Layer 3).
* **Router-on-a-Stick:** Configurazione in cui un singolo router è collegato a uno switch tramite un unico cavo fisico (configurato in Trunk) per eseguire l'Inter-VLAN routing creando "sotto-interfacce" virtuali.
* **Switch Layer 3:** Uno switch avanzato che, oltre a fare il normale lavoro di smistamento a Livello 2, integra le funzioni di un router, potendo instradare il traffico tra le VLAN internamente in modo rapidissimo.