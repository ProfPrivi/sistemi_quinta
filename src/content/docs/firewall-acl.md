---
title: Firewall e ACL
description: Firewall, differenze tra Packet Filter e Stateful, e guida pratica alla stesura delle ACL.
---

## 1. Il Firewall: contesto
Quando si progetta una rete aziendale collegata a Internet, il primo e più importante problema da risolvere è decidere **chi può entrare e chi può uscire**. Senza un sistema di controllo, qualsiasi utente su Internet potrebbe accedere ai server interni dell'azienda, e qualsiasi dipendente potrebbe navigare su siti non sicuri scaricando malware.
Il dispositivo incaricato di fare da "dogana" tra la rete interna (sicura) e la rete esterna (insicura) è il **Firewall**.

## 2. Definizione
Un **Firewall** (letteralmente *muro di fuoco*, un termine preso dall'edilizia per indicare i muri che bloccano la propagazione degli incendi) è un apparato hardware o software di sicurezza perimetrale. Il suo compito è monitorare e controllare il traffico di rete in entrata (Inbound) e in uscita (Outbound) basandosi su un insieme di regole di sicurezza predefinite chiamate **ACL (Access Control List)**.

## 3. Spiegazione diretta
Immaginate il Firewall come il **Buttafuori di una discoteca esclusiva**.

* **Il Packet Filter (Firewall di vecchia generazione):** È un buttafuori poco intelligente. Controlla solo la carta d'identità e il biglietto (Indirizzo IP e Porta). Se il biglietto è valido, ti fa entrare. Il problema? Se esci un attimo nel cortile per fumare e poi vuoi rientrare, questo buttafuori non si ricorda di te e ti chiede di nuovo il biglietto, bloccandoti se l'hai buttato via.
* **Il Firewall Stateful (Firewall moderno):** È un buttafuori intelligente dotato di memoria spaziale. Non solo ti controlla all'ingresso, ma **si annota su un taccuino** che sei entrato regolarmente. Se esci un attimo in cortile e poi torni alla porta, il buttafuori ti riconosce, consulta il taccuino e ti fa rientrare subito senza chiederti i documenti. Nelle reti, questa "memoria" si chiama *Tabella di Stato delle Connessioni*.

## 4. Tipologie di Firewall

### 4.1 Stateless Packet Filter (Filtro di Pacchetti)
Opera ai livelli 3 e 4 del modello OSI. Analizza ogni singolo pacchetto in modo isolato, leggendo l'IP sorgente, l'IP destinazione e le porte (es. porta 80 per HTTP). 
* **Pro:** Velocissimo, non consuma RAM.
* **Contro:** Cieco al contesto. Se un PC interno fa una richiesta a un sito web, il firewall bloccherà la risposta del sito web se non c'è una regola esplicita che permette il traffico in ingresso!

### 4.2 Stateful Inspection Firewall
È lo standard attuale. Opera sempre ai livelli 3 e 4, ma mantiene traccia dello "stato" di ogni connessione attiva (TCP handshake, UDP stream).
* **Come funziona:** Se il firewall sa che il "PC di Marco" ha appena richiesto la pagina web di Google, quando Google invia i dati di risposta, il firewall capisce che quella risposta fa parte di una sessione legittima già iniziata dall'interno e **la lascia passare automaticamente**, senza bisogno di regole in ingresso.

*(Nota: L'evoluzione successiva è il NGFW - Next-Generation Firewall, che integra anche l'IPS e la DPI che abbiamo visto nella dispensa precedente, arrivando al Livello 7).*

## 5. Le ACL (Access Control List): Regole d'oro
Le ACL sono le liste di regole scritte dall'amministratore che dicono al firewall cosa fare. Per non sbagliare all'Esame di Stato, bisogna ricordare tre regole d'oro:

1. **Lettura Top-Down (Dall'alto verso il basso):** Il firewall legge le regole partendo dalla riga 1. Appena trova una regola che fa "match" (corrisponde) al pacchetto, esegue l'azione (Permetti o Blocca) e **si ferma**. Ignora tutte le righe successive! Bisogna quindi mettere prima le regole specifiche e poi quelle generiche.
2. **Implicit Deny (Nega tutto il resto):** Alla fine di ogni ACL c'è sempre una regola invisibile chiamata *Implicit Deny Any Any*. Significa che "tutto ciò che non è esplicitamente permesso nelle righe sopra, viene bloccato e cestinato (Drop)".
3. **Il formato della regola:** Una buona regola d'esame contiene sempre: *Azione | Sorgente | Destinazione | Protocollo | Porta*.

---

## 6. Esempi Applicativi per la Seconda Prova
All'esame capita spesso di dover progettare una **DMZ (Demilitarized Zone)**, ovvero una sottorete isolata dove posizionare i server pubblici (come il Server Web della scuola), per separarli dalla LAN interna dove ci sono i PC dei dipendenti.

Ecco come uno studente dovrebbe presentare le regole del Firewall nel compito.

### Scenario: Protezione di un Web Server in DMZ
**Obiettivo:** Permettere a tutto il mondo di vedere il sito web aziendale (nella DMZ), permettere ai PC interni di navigare su Internet, ma **bloccare assolutamente** l'accesso da Internet verso la LAN interna.

**Tabella delle ACL da inserire nel compito:**

| Regola | Azione | IP Sorgente | IP Destinazione | Protocollo | Porta Dest. | Motivazione (da scrivere all'esame) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **PERMIT** | ANY (Tutti) | IP Web Server | TCP | 80 / 443 | Permette al mondo di visitare il sito web HTTP/HTTPS. |
| **2** | **PERMIT** | Rete LAN | ANY (Tutti) | TCP/UDP | ANY | Permette ai dipendenti della LAN di navigare su Internet. |
| **3** | **PERMIT** | IP Admin | IP Web Server | TCP | 22 (SSH) | Consente solo all'Amministratore di gestire il server web da remoto. |
| **4** | **DENY** | ANY (Tutti) | IP Web Server | TCP | 22 (SSH) | Blocca i tentativi degli hacker di accedere al server web. |
| **5** | **DENY** | ANY (Tutti) | ANY (Tutti) | IP | ANY | *Implicit Deny*: blocca tutto il resto (es. traffico da Internet a LAN). |

> **Trucco per l'Esame:** *Scrivete sempre esplicitamente la regola numero 5 (Implicit Deny) nella vostra tabella, dimostrerà alla commissione che sapete esattamente come ragiona un firewall! Inoltre, specificate che state usando un firewall **Stateful**, così non dovrete impazzire a scrivere le regole di ritorno per il traffico web.*

---

## 7. Sintesi conclusiva per lo studio

Il **Firewall** è il dispositivo hardware o software fondamentale per la difesa perimetrale di una rete informatica. La sua funzione è filtrare i pacchetti in base a liste di regole chiamate **ACL (Access Control List)**. 
I firewall moderni utilizzano la tecnologia **Stateful Inspection**: a differenza dei vecchi Packet Filter (Stateless) che valutano ogni pacchetto isolatamente, i firewall stateful tengono traccia delle sessioni attive, permettendo automaticamente il traffico di ritorno per le connessioni iniziate legittimamente dall'interno.

La configurazione delle ACL richiede grande attenzione logica: le regole vengono lette in ordine sequenziale (Top-Down) e terminano sempre con un'istruzione di **Implicit Deny**, che scarta qualsiasi pacchetto non esplicitamente autorizzato. All'Esame di Stato, progettare correttamente queste regole è essenziale per difendere la rete interna e regolare gli accessi verso le zone pubbliche, come le DMZ.

> **💡 Definizione rapida per l'interrogazione:**
> *Il Firewall è un sistema di sicurezza perimetrale che controlla il traffico in entrata e in uscita. Si basa sulle ACL (liste di regole lette dall'alto verso il basso che terminano con un blocco totale di default). I firewall moderni sono di tipo "Stateful", ovvero ricordano le connessioni stabilite per far passare automaticamente le risposte legittime, superando i limiti dei vecchi firewall "Stateless" (Packet Filter).*

---

## 8. Glossario essenziale
* **Firewall:** Dispositivo di sicurezza di rete che monitora e controlla il traffico in base a regole di sicurezza.
* **ACL (Access Control List):** Un elenco sequenziale di regole (Permit o Deny) applicate dal firewall per filtrare i pacchetti.
* **Stateless (Packet Filter):** Firewall che analizza i pacchetti singolarmente solo in base a IP e Porte, senza ricordare il contesto della comunicazione.
* **Stateful Inspection:** Firewall avanzato che tiene traccia dello stato delle connessioni (sessioni attive), agevolando il traffico di risposta sicuro.
* **Inbound / Outbound:** Rispettivamente il traffico "In entrata" (dall'esterno verso l'interno) e "In uscita" (dall'interno verso l'esterno).
* **Implicit Deny:** Regola fondamentale e invisibile posta alla fine di ogni ACL: "Tutto ciò che non è esplicitamente permesso, è vietato".
* **Top-Down:** Il metodo di lettura sequenziale delle ACL. La prima regola che corrisponde al pacchetto viene applicata e la lettura si interrompe.
* **DMZ (Demilitarized Zone):** Una sottorete isolata e parzialmente pubblica dove vengono posizionati i server accessibili da Internet (es. Web Server, Mail Server), in modo che un attacco a questi non comprometta la LAN interna aziendale.