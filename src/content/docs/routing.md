---
title: Il Routing
description: Routing, tabelle di instradamento, routing statico e dinamico, distanza amministrativa, rotte di backup e summarization.
---

## 1. Il Routing: contesto
Finché due computer si trovano nella stessa rete locale (stessa LAN o stessa VLAN), comunicano direttamente tra loro utilizzando gli indirizzi MAC e gli switch (Livello 2). Ma cosa succede quando un PC della rete della scuola deve visualizzare una pagina web ospitata su un server in America, oppure quando la VLAN Segreteria deve inviare un file alla VLAN Laboratori? 

I domini di broadcast sono isolati. Per far viaggiare i pacchetti dati da una rete logica all'altra, attraversando reti sconosciute o geograficamente distanti, è necessario un processo di "instradamento". Questo processo è il cuore pulsante di Internet ed è gestito da apparati specifici chiamati **Router**.

## 2. Definizione
Il **Routing (Instradamento)** è il processo di selezione del percorso migliore che un pacchetto dati deve compiere per viaggiare da una rete sorgente a una rete destinazione. 

Questo processo avviene al **Livello 3 (Rete)** del modello OSI. Il dispositivo incaricato analizza l'indirizzo IP di destinazione contenuto nell'intestazione del pacchetto, consulta una propria mappa interna chiamata **Tabella di Routing (Routing Table)** e decide su quale interfaccia di uscita inviare il pacchetto per avvicinarlo il più possibile alla meta finale (il cosiddetto *Next Hop* o salto successivo).

## 3. Spiegazione diretta
Immaginate il Router come un **casellante autostradale** e il Routing come il sistema di navigazione per le auto (i pacchetti dati).

* **La Tabella di Routing** è il cartello stradale. Se un'auto deve andare a Roma, il casellante guarda il cartello e le dice: "Prendi l'uscita 3".
* **Il Routing Statico** è come un vecchio cartello di lamiera piantato a terra. L'amministratore ha scritto a mano "Per Roma uscita 3". È velocissimo da leggere e non si rompe, ma se l'uscita 3 è bloccata per un incidente, il cartello non si aggiorna e le auto restano bloccate.
* **Il Routing Dinamico** è come **Google Maps**. I casellanti comunicano costantemente tra loro tramite radio ("Ehi, l'uscita 3 è bloccata!"). Aggiornano automaticamente i loro schermi e deviano le auto sull'uscita 4.

## 4. Funzionamento essenziale: Tabelle, Metriche e Protocolli
In sede di progettazione, è fondamentale capire come un router "sceglie" la strada migliore da inserire nella sua tabella.

### 4.1 La Distanza Amministrativa (AD)
Cosa succede se un router impara due strade diverse per raggiungere la stessa destinazione, magari una configurata a mano e l'altra scoperta tramite un protocollo dinamico? Il router decide chi "vince" usando la **Distanza Amministrativa (AD)**.
L'AD è un indice di affidabilità: **più il numero è basso, più la fonte è ritenuta attendibile**.
* Una rete direttamente connessa ha AD = 0 (vince su tutti).
* Una rotta statica inserita a mano ha AD = 1.
* Il protocollo OSPF ha AD = 110. 
*(Se un router ha sia una rotta statica che una rotta OSPF verso la stessa destinazione, sceglierà sempre quella statica).*

### 4.2 Routing Statico e Rotte di Backup
Nel routing statico, l'amministratore configura a mano i percorsi. Oltre alle normali rotte verso reti specifiche, ci sono due concetti fondamentali:
* **Default Static Route (Rotta di Default):** È una rotta speciale (indicata con l'indirizzo IP `0.0.0.0` e maschera `/0`) che l'amministratore imposta per dire al router: *"Se non conosci l'IP di destinazione, invia tutto il traffico da questa parte"*. Configurando questa rotta si stabilisce il **Gateway of Last Resort** (Cancello di ultima istanza), ovvero la via d'uscita predefinita della rete, che quasi sempre punta verso il provider Internet.
* **Floating Static Route (Rotta Statica Fluttuante):** È un trucco geniale per creare collegamenti di backup (ridondanza). L'amministratore crea una rotta statica di emergenza, ma le assegna volontariamente un'AD molto alta (es. 130). Essendo "peggiore" del protocollo principale (es. OSPF che ha 110), questa rotta non viene usata e resta "nascosta a galla". Se però il collegamento OSPF cade, la rotta fluttuante entra immediatamente in funzione, salvando la connessione dell'azienda.

### 4.3 Routing Dinamico e Protocolli (IGP)
Nel routing dinamico, i router usano protocolli per scambiarsi informazioni sulla topologia della rete, calcolare i percorsi migliori (tramite la *Metrica*) e reagire automaticamente ai guasti. Si dividono in due grandi famiglie algoritmiche:
* **Distance Vector (es. RIP):** Sceglie il percorso basandosi solo sul "numero di salti" (Hop Count), ovvero quanti router deve attraversare.
* **Link State (es. OSPF):** Il router mappa l'intera rete. OSPF calcola il percorso migliore basandosi sulla **larghezza di banda** (Cost). Sceglierà sempre la strada più veloce (Fibra Ottica), anche se richiede l'attraversamento di più router.

### 4.4 Ottimizzazione: La Route Summarization (Supernetting)
Nelle reti aziendali molto grandi, le tabelle di routing possono diventare enormi, rallentando i router e consumando troppa RAM. Per risolvere questo problema si usa la **Route Summarization** (o *Route Aggregation*).
Consiste nel "riassumere" un gruppo di sottoreti contigue in un'unica grande rotta (Supernet). Ad esempio, invece di far memorizzare a un router quattro percorsi diversi per le reti `192.168.0.0/24`, `192.168.1.0/24`, `192.168.2.0/24` e `192.168.3.0/24`, l'amministratore (o il protocollo di routing) configura una singola rotta riassuntiva `192.168.0.0/22`. Questo alleggerisce drasticamente il lavoro della CPU e velocizza l'instradamento dei pacchetti.

---

## 5. Schema rapido

| Concetto | Significato chiave |
| :--- | :--- |
| **Routing Statico** | Inserito a mano. Non si adatta ai guasti ma non consuma risorse. |
| **Routing Dinamico** | Calcolato automaticamente (OSPF). Si adatta in tempo reale ai guasti. |
| **Distanza Amministrativa** | Affidabilità della fonte della rotta (numero più basso = più affidabile). |
| **Gateway of Last Resort** | Il dispositivo (solitamente verso Internet) a cui inviare tutto il traffico sconosciuto. |
| **Default Static Route** | La rotta `0.0.0.0/0` usata per configurare il Gateway of Last Resort. |
| **Floating Static Route** | Rotta di backup manuale "nascosta" con Distanza Amministrativa volutamente alta. |
| **Route Summarization** | Tecnica di ottimizzazione per riassumere più sottoreti contigue in un'unica rotta. |

---

## 6. Sintesi conclusiva per lo studio

Il **Routing** è il meccanismo di Livello 3 che permette ai dati di navigare tra reti diverse. Si basa sulle Tabelle di Routing, che i router compilano scegliendo sempre la fonte più affidabile in base alla **Distanza Amministrativa (AD)**. 

Nella progettazione, il **Routing Statico** si usa per configurazioni manuali e per definire la **Default Static Route** (che fissa il *Gateway of Last Resort* verso Internet). Un uso avanzato del routing statico è la **Floating Static Route**, una rotta di backup che entra in gioco solo se cade il protocollo principale. 
Per le infrastrutture complesse si utilizza invece il **Routing Dinamico** (come OSPF), che mappa la rete e sceglie i percorsi migliori calcolando il costo dei collegamenti. Infine, per evitare che le tabelle di routing diventino troppo pesanti rallentando i dispositivi, i progettisti utilizzano la **Route Summarization**, una tecnica matematica che condensa più reti contigue in un'unica voce, ottimizzando l'intera infrastruttura.

> **💡 Definizione rapida per l'interrogazione:**
> *Il routing è il processo di Livello 3 con cui un router decide il percorso migliore. Le rotte possono essere statiche (come la Default Route o le Floating Route di backup) o dinamiche (come OSPF). Il router sceglie le rotte in base alla Distanza Amministrativa. Per ottimizzare le prestazioni su reti estese, le rotte multiple verso IP contigui vengono raggruppate in un'unica voce tramite la tecnica della Route Summarization.*

---

## 7. Glossario essenziale
* **Router:** Dispositivo di Livello 3 che interconnette reti diverse e instrada i pacchetti dati.
* **Tabella di Routing:** Il database interno di un router contenente la lista delle reti conosciute e l'interfaccia da usare per raggiungerle.
* **Distanza Amministrativa (AD):** Indice numerico che valuta l'affidabilità di come è stata imparata una rotta. Valori minori indicano maggiore priorità.
* **Metrica (Metric):** Il valore usato dai protocolli di routing (quando l'AD è identica) per stabilire quanto "costa" internamente un percorso.
* **Gateway of Last Resort:** L'indirizzo IP del router a cui inviare i pacchetti se non c'è nessuna destinazione specifica corrispondente nella tabella.
* **Default Static Route:** La rotta statica configurata con `0.0.0.0/0`, utilizzata per impostare concretamente il Gateway of Last Resort.
* **Floating Static Route:** Rotta statica configurata con una Distanza Amministrativa volutamente alta per agire esclusivamente come percorso di backup.
* **Route Summarization (Supernetting):** Processo di aggregazione logica di più reti con indirizzi contigui in un unico annuncio di rete più grande, per ridurre la dimensione delle tabelle di routing.
* **OSPF (Open Shortest Path First):** Protocollo di routing dinamico di tipo Link State (basato sullo stato e sulla velocità del collegamento), standard nelle reti aziendali.