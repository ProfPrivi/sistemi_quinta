---
title: IoT e MQTT
description: Internet of Things, protocollo MQTT, architettura publish/subscribe e casi d'uso.
---

## 1. IoT e MQTT: contesto
L’**IoT (Internet of Things - Internet delle Cose)** indica l’insieme di oggetti fisici connessi alla rete, come sensori, attuatori, telecamere, contatori o dispositivi industriali, capaci di raccogliere dati dall'ambiente circostante, inviarli e ricevere comandi. Fino a qualche anno fa, i sensori erano isolati; oggi, grazie all'IoT, miliardi di dispositivi comunicano in tempo reale su scala globale. 

In ambito aziendale e industriale, l’IoT viene usato per il monitoraggio continuo, l’automazione, il controllo remoto e la raccolta di Big Data in tempo reale, aprendo la strada a concetti come la manutenzione predittiva e l'Industria 4.0.

## 2. Definizione di MQTT
Per far parlare tra loro questi miliardi di dispositivi (spesso minuscoli e a batteria), i protocolli web tradizionali come l'HTTP risultano troppo pesanti e lenti. Qui entra in gioco **MQTT (Message Queuing Telemetry Transport)**. 

MQTT è un protocollo di messaggistica di livello applicativo (Livello 7 del modello OSI) estremamente leggero, progettato per la comunicazione *Machine-to-Machine (M2M)*. È nato per far dialogare dispositivi IoT che hanno pochissime risorse hardware (poca RAM, processori lenti, batterie piccole) e che operano su reti instabili o con pochissima banda disponibile (come reti cellulari in zone remote o reti wireless a bassa potenza). 

## 3. Spiegazione diretta
Si può spiegare questa accoppiata in modo molto semplice: **l’IoT è l'infrastruttura** che collega gli oggetti intelligenti alla rete, mentre **MQTT è la "lingua"** più usata per farli comunicare in modo semplice, rapido e affidabile. 

Tipicamente, viene usato quando una flotta di dispositivi distribuiti, anche molto lontani tra loro, deve inviare messaggi piccolissimi (come "temperatura: 22°C" o "valvola: aperta") a un sistema centrale di controllo o di supervisione, senza intasare la rete.

## 4. Funzionamento essenziale: il modello Publish/Subscribe
A differenza del classico web basato sul modello *Client-Server* (dove il client fa una richiesta e aspetta una risposta), MQTT usa un modello **Publish/Subscribe**. 

In questo modello, i dispositivi non comunicano mai direttamente tra loro, ma passano sempre attraverso un server centrale chiamato **Broker**. 
* Un sensore (es. un termometro) si limita a "pubblicare" (Publish) il suo dato su un canale specifico, chiamato **Topic** (es. `serra/temperatura`).
* Un altro dispositivo o un'applicazione per smartphone interessata a quel dato, si "iscrive" (Subscribe) a quel Topic.
* Il Broker riceve il dato dal termometro e lo inoltra istantaneamente, in modo automatico, a tutti i dispositivi iscritti a quel Topic.

Questo approccio disaccoppia i dispositivi: chi invia i dati non ha bisogno di sapere chi (o quanti) li riceverà. Inoltre, MQTT opera tipicamente su protocollo di trasporto TCP/IP, mantenendo una connessione sempre aperta (*keep-alive*) tra i client e il broker, riducendo drasticamente i tempi di latenza per l'invio di nuovi messaggi.

## 5. Elementi principali dell'architettura
* **Client:** Qualsiasi dispositivo o programma che usa MQTT collegandosi al broker (es. un sensore di umidità, un microcontrollore Arduino/Raspberry, o l'app sul telefono dell'utente).
* **Broker:** Il server centrale, il vero "cuore" della rete. Riceve tutti i messaggi, li filtra in base al Topic e li smista istantaneamente ai client che ne hanno fatto richiesta.
* **Topic:** Un canale logico, simile al percorso di una cartella (es. `casa/salotto/luce`), usato dal broker per categorizzare i messaggi.
* **Publisher (Pubblicatore):** Un client quando agisce in modalità di invio di un messaggio su un Topic.
* **Subscriber (Sottoscrittore):** Un client quando dichiara al broker di voler ricevere tutti i messaggi pubblicati su un determinato Topic.

---

## 6. Scenari di utilizzo
IoT e MQTT danno il meglio di sé quando molti dispositivi distribuiti sul territorio (o in un grande impianto) devono raccogliere e trasmettere dati piccoli ma molto frequenti. Esempi classici:

* **Domotica (Smart Home):** Per collegare sensori di temperatura, luci, allarmi, prese intelligenti e attuatori a una centrale di controllo domestica (es. Home Assistant).
* **Industria 4.0:** Per monitorare macchinari, linee di produzione, vibrazioni e parametri di funzionamento in tempo reale, prevenendo i guasti.
* **Agricoltura intelligente (Smart Agriculture):** Sensori di umidità del terreno e stazioni meteo che inviano dati via MQTT per attivare l'irrigazione automatica solo quando serve.
* **Smart City:** Controllo dell'illuminazione pubblica, gestione dei parcheggi intelligenti, sensori per la qualità dell’aria e semafori connessi.
* **Telemetria e monitoraggio flotte:** Tracciamento GPS e diagnostica dei veicoli aziendali inviati in tempo reale alla sede centrale.

---

## 7. Caratteristiche, Vantaggi e Limiti

### I Vantaggi e il QoS
Il successo di MQTT nell’IoT è dovuto al fatto che genera pochissimo traffico di rete (l'intestazione del pacchetto MQTT è di soli 2 byte!) e consuma pochissima batteria. 
Un'altra caratteristica fondamentale è il supporto a tre livelli di **QoS (Quality of Service)**, che garantiscono l'affidabilità della consegna anche su reti pessime:
* **QoS 0 (At most once):** Il messaggio viene inviato una sola volta. Se si perde, è perso (ideale per dati frequenti e non critici).
* **QoS 1 (At least once):** Garantisce che il messaggio arrivi, ma potrebbe arrivare doppio se la rete cade durante la conferma.
* **QoS 2 (Exactly once):** Garantisce matematicamente che il messaggio arrivi una e una sola volta, al costo di un po' di traffico in più (ideale per comandi critici come l'apertura di un cancello).

### I Limiti e la Sicurezza
MQTT **non è pensato** per trasferire file pesanti, immagini o video; nasce solo per brevi stringhe di testo o numeri (payload).
Inoltre, per essere così leggero, di default MQTT non cifra i dati, che viaggiano in chiaro. La sicurezza dipende dalla corretta configurazione del broker (autenticazione tramite username/password) e, soprattutto, dall'incapsulamento del traffico MQTT all'interno del protocollo **TLS/SSL** (creando connessioni sicure note come *MQTTS*, sulla porta 8883 invece della classica 1883).

---

## 8. Schema rapido

| Aspetto | Sintesi |
| :--- | :--- |
| **IoT (Internet of Things)** | Rete di oggetti fisici connessi che raccolgono e scambiano dati. |
| **MQTT** | Protocollo leggero di messaggistica standard per i dispositivi IoT. |
| **Modello di comunicazione** | Publish/Subscribe centralizzato tramite un server (Broker). |
| **Punto forte** | Genera pochissimo traffico, consuma poche risorse fisiche ed è efficiente su reti instabili. |
| **Uso tipico** | Domotica, sensori ambientali, automazione industriale, smart city. |
| **Limiti** | Inadatto a dati pesanti/file; la sicurezza (cifratura TLS) va configurata esplicitamente. |

---

## 9. Sintesi conclusiva per lo studio

L’**IoT (Internet of Things)** indica l’insieme di oggetti intelligenti connessi alla rete, come sensori, attuatori e dispositivi industriali, capaci di raccogliere dati e comunicarli a sistemi centrali per scopi di automazione, monitoraggio o controllo remoto.

Per far comunicare in modo efficiente questi dispositivi si utilizza **MQTT**, un protocollo di messaggistica estremamente leggero. MQTT funziona secondo il modello *Publish/Subscribe*: i dispositivi non si parlano in modo diretto, ma inviano i loro messaggi a un server centrale chiamato *Broker*. Il Broker si occupa poi di smistare istantaneamente i messaggi ai client interessati in base agli argomenti (chiamati *Topic*) a cui si sono iscritti. È la scelta perfetta per contesti con migliaia di dispositivi, poco traffico disponibile e reti non sempre stabili (grazie anche ai livelli di QoS), a patto di implementare esternamente i protocolli di sicurezza crittografica.

> **💡 Definizione rapida per l'interrogazione:**
> *L’IoT è l’insieme di dispositivi fisici connessi alla rete che raccolgono e scambiano dati; MQTT è un protocollo leggero molto usato nell’IoT perché permette a questi dispositivi di comunicare tramite un broker usando il modello publish/subscribe, riducendo al minimo il traffico di rete, il consumo di batteria e i problemi derivanti da connessioni instabili.*

---

## 10. Glossario essenziale
* **IoT (Internet of Things):** Rete globale di oggetti fisici dotati di sensori e software per connettersi e scambiare dati su Internet.
* **MQTT (Message Queuing Telemetry Transport):** Protocollo di comunicazione di livello 7 estremamente leggero, progettato per lo scambio di dati tra dispositivi IoT con poche risorse.
* **Modello Publish/Subscribe:** Architettura di rete in cui chi invia le informazioni (Publisher) non le manda direttamente a chi le riceve (Subscriber), ma le pubblica su un server centrale che le smista.
* **Broker:** Il server centrale in una rete MQTT. Coordina tutte le comunicazioni, ricevendo i messaggi e inoltrandoli ai dispositivi interessati.
* **Topic:** Stringa di testo che funge da "canale tematico" su cui vengono pubblicati e categorizzati i messaggi in MQTT (es. `casa/cucina/temperatura`).
* **Publisher / Subscriber:** Rispettivamente il dispositivo che pubblica un dato su un Topic e il dispositivo che si iscrive a un Topic per riceverne gli aggiornamenti.
* **QoS (Quality of Service in MQTT):** Parametro (da 0 a 2) che definisce il livello di garanzia che un messaggio MQTT arrivi a destinazione senza perdersi o duplicarsi.
* **Payload:** Il contenuto utile vero e proprio del messaggio scambiato in MQTT (ad esempio, il semplice numero "25.4" che rappresenta i gradi letti da un sensore).