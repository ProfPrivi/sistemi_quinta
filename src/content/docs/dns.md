---
title: "Il Sistema DNS: Gerarchia, Risoluzione e Record"
description: "Guida completa al Domain Name System: come funziona la rubrica di Internet, la gerarchia dei server e le principali tipologie di record (A, CNAME, MX, PTR)."
---

Immagina di dover ricordare a memoria l'indirizzo IP di ogni sito web che visiti: `142.250.180.14` per Google, `151.101.65.140` per Reddit, e così via. Sarebbe impossibile. 

Il **DNS (Domain Name System)**, che opera a livello applicativo (Livello 7 ISO/OSI) utilizzando principalmente la porta UDP 53, è il sistema che traduce i nomi di dominio "umani" (es. *www.villagreppi.it*) in indirizzi IP "macchina" necessari per l'instradamento dei pacchetti sulla rete.

---

## 1. Spiegazione Diretta: La Rubrica Telefonica Globale

Il DNS funziona esattamente come la rubrica del tuo smartphone. 
Quando vuoi chiamare "Mario Rossi", non digiti il suo numero di telefono (che probabilmente non ricordi), ma cerchi il suo nome. Il telefono consulta la rubrica in background, trova il numero associato (`333-1234567`) e fa partire la chiamata.

Tuttavia, Internet è troppo grande per avere un'unica rubrica centralizzata. Se ci fosse un solo server DNS per tutto il mondo, andrebbe in crash dopo 3 secondi per le troppe richieste. Ecco perché il DNS è un **database distribuito e gerarchico**.

---

## 2. La Gerarchia del DNS (L'Albero Rovesciato)

Il sistema dei nomi a dominio è strutturato come un albero a testa in giù, diviso in livelli strategici:

1. **Root Server (La radice `.`):** Sono i server più importanti di Internet (ne esistono 13 logici al mondo). Non conoscono l'IP di *www.google.com*, ma sanno a chi devi chiedere: ti indirizzano ai server che gestiscono il livello successivo (i TLD).
2. **TLD (Top-Level Domain):** Sono i domini di primo livello, come `.com`, `.it`, `.org`, `.edu`. Il server del TLD `.it` conosce tutti i domini italiani registrati.
3. **SLD (Second-Level Domain):** È il nome vero e proprio che l'azienda acquista (es. `villagreppi`, `google`, `amazon`). Questi server, chiamati **Authoritative Name Server**, contengono le vere risposte.
4. **Sottodomini (Subdomain):** Sono gestiti internamente dall'azienda per dividere i servizi (es. `www` per il sito web, `mail` per la posta, `registro` per il registro elettronico).

---

## 3. Come funziona la Risoluzione (Iterativa vs Ricorsiva)

Quando un PC cerca *www.scuola.it*, esegue una ricerca chiamata **Risoluzione Ricorsiva**. Il PC chiede al suo server DNS locale (di solito quello del provider Internet, come TIM o Fastweb, o un DNS pubblico come l'8.8.8.8 di Google): *"Trovami questo IP e dammi la risposta finale"*.

Il server DNS locale, se non ha l'IP nella sua memoria temporanea (Cache), inizia una **Risoluzione Iterativa** facendo il "lavoro sporco":
1. Chiede al **Root Server**: *"Chi gestisce il .it?"* -> (Il Root risponde con l'IP del server TLD `.it`).
2. Chiede al server **TLD .it**: *"Chi gestisce scuola.it?"* -> (Il TLD risponde con l'IP del server Authoritative dell'azienda).
3. Chiede al server **Authoritative di scuola.it**: *"Qual è l'IP del sottodominio www?"* -> (Il server risponde: `192.168.50.10`).
4. Il DNS locale consegna l'IP al tuo PC e lo salva in Cache per le richieste future.

---

## 4. Tipologie di Record DNS

Il server "Authoritative" di un'azienda contiene un file di testo (Zona DNS) con diverse righe chiamate **Record**. I fondamentali da conoscere sono:

* **Record A (Address):** È il record più importante. Associa un nome a dominio a un indirizzo **IPv4** (es. `www.scuola.it -> 85.10.20.30`).
* **Record AAAA:** Fa la stessa cosa del record A, ma per i nuovi indirizzi **IPv6**.
* **Record CNAME (Canonical Name):** Crea un "alias", ovvero un soprannome. Associa un nome a un altro nome, non a un IP. (es. `ftp.scuola.it -> punta a -> www.scuola.it`). Utile se un server cambia IP: basta aggiornare solo il record A principale.
* **Record MX (Mail Exchange):** Indica quali sono i server autorizzati a ricevere la posta elettronica per quel dominio (es. la posta inviata a *@scuola.it* deve essere consegnata al server `mail.scuola.it`).
* **Record PTR (Pointer):** È l'esatto opposto del record A (Risoluzione Inversa o *Reverse Lookup*). Dato un indirizzo IP, restituisce il nome a dominio associato. È fondamentale per i server di posta: i filtri antispam scartano le email provenienti da IP che non hanno un record PTR valido.

---

## 5. Applicazioni pratiche per la Seconda Prova

La configurazione dei record DNS è una competenza chiave nei progetti di reti aziendali e DMZ.

### Scenario A: Rete Interna (Intranet) e Active Directory
* **Richiesta tipica:** "I dipendenti devono accedere ai server interni aziendali tramite nomi facili da ricordare anziché usare gli indirizzi IP."
* **Soluzione da proporre:** Lo studente progetterà un **Server DNS Interno** (spesso integrato nel Domain Controller in ambiente Windows Server/Active Directory). Questo server gestirà una zona DNS privata (es. `azienda.local`) creando **Record A** per i server interni (es. `gestionale.azienda.local -> 192.168.10.5`). Inoltre, fungerà da *Forwarder* per le richieste Internet verso l'esterno.

### Scenario B: Pubblicazione di Servizi in DMZ
* **Richiesta tipica:** "L'azienda ospita in sede il proprio server web e il proprio server di posta, che devono essere raggiungibili da Internet."
* **Soluzione da proporre:** Lo studente posizionerà i due server in una **DMZ (Demilitarized Zone)** isolata dal Firewall. Specificherà di aver configurato (o richiesto al provider) sul DNS Pubblico dell'azienda:
  1. Un **Record A** per `www.azienda.it` che punta all'IP Pubblico del Firewall (che poi farà NAT/Port Forwarding verso il server web).
  2. Un **Record MX** per instradare le email verso il server di posta interno.

### Scenario C: Alta Affidabilità e Bilanciamento del Carico (Round Robin DNS)
* **Richiesta tipica:** "L'azienda ha un sito web con traffico elevatissimo. Un solo server web non basta a gestire tutte le richieste."
* **Soluzione da proporre:** Per distribuire il carico (Load Balancing) in modo semplice ed economico, si utilizza la tecnica del **DNS Round Robin**. Lo studente configurerà *più Record A identici* per lo stesso nome a dominio (es. tre record A per `www.sito.it` che puntano a tre IP di tre server diversi). Il DNS risponderà a ogni utente con un IP diverso a rotazione, bilanciando il traffico sui tre server fisici.