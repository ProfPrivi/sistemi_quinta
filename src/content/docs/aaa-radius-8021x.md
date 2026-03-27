---
title: "Controllo Accessi Fisici: AAA, RADIUS e 802.1X"
description: "Sicurezza degli accessi a livello di porta, il framework AAA e il protocollo RADIUS."
---

La sicurezza di una rete non riguarda solo la difesa da attacchi esterni tramite Firewall o VPN. Uno dei rischi più grandi è rappresentato dagli accessi non autorizzati **dall'interno**: cosa succede se un estraneo entra in azienda e collega il proprio portatile a una presa di rete a muro? 

Senza un controllo degli accessi fisici, quel dispositivo riceverebbe un indirizzo IP dal DHCP e sarebbe immediatamente dentro la LAN. Per evitare questo, si utilizza lo standard **IEEE 802.1X** combinato con un'architettura **AAA** e un server **RADIUS**.

---

## 1. Il Framework AAA

Il modello **AAA** è il pilastro della sicurezza degli accessi e si divide in tre fasi sequenziali:

1. **Authentication (Autenticazione):** "Chi sei?". È la fase in cui l'utente o il dispositivo dimostra la propria identità (es. tramite username/password o un certificato digitale).
2. **Authorization (Autorizzazione):** "Cosa sei autorizzato a fare?". Una volta riconosciuto, il sistema decide a quali risorse l'utente può accedere (es. assegnazione dinamica a una specifica VLAN).
3. **Accounting (Tracciamento):** "Cosa hai fatto?". Il sistema registra le attività dell'utente, come l'orario di login/logout e il traffico generato, utile per audit di sicurezza.

---

## 2. Il Server RADIUS

Per non dover configurare username e password su ogni singolo switch o access point aziendale, si centralizza tutto utilizzando il protocollo **RADIUS** (*Remote Authentication Dial-In User Service*).

Il RADIUS funziona con un'architettura Client/Server particolare:
* **Il Server RADIUS:** Contiene (o si interfaccia con) il database delle credenziali (es. Active Directory o LDAP).
* **Il Client RADIUS (NAS - Network Access Server):** Non è il PC dell'utente, ma è l'apparato di rete (lo Switch o l'Access Point) che fa da "intermediario" tra l'utente e il server.

---

## 3. Lo Standard IEEE 802.1X (Port-Based Access Control)

Lo standard **802.1X** implementa il controllo degli accessi direttamente a livello di porta fisica (o virtuale nel caso del Wi-Fi). Fino a quando l'autenticazione non ha successo, la porta dello switch rimane "bloccata" e non lascia passare alcun traffico dati (tranne i pacchetti di autenticazione).

### I tre attori dell'802.1X:
1. **Supplicant:** Il dispositivo dell'utente che richiede l'accesso (PC, smartphone, stampante) e fornisce le credenziali.
2. **Authenticator:** Lo switch di accesso o l'Access Point. Mantiene la porta bloccata e inoltra le credenziali al server RADIUS.
3. **Authentication Server:** Il server RADIUS che verifica le credenziali e risponde all'Authenticator con un messaggio di `Access-Accept` o `Access-Reject`.

---

## 4. Applicazioni pratiche per la Seconda Prova

Inserire l'architettura AAA/802.1X nello svolgimento della Seconda Prova (esame di Stato) arricchisce enormemente il progetto. Ecco come puoi contestualizzarlo in base alle richieste della traccia:

### Scenario A: Sicurezza delle prese di rete pubbliche
* **Richiesta tipica:** "La sede aziendale prevede aule riunioni, biblioteche o sale d'attesa con prese di rete cablate. Bisogna impedire che visitatori non autorizzati accedano alla LAN aziendale."
* **Soluzione da proporre:** Implementazione del protocollo **IEEE 802.1X sugli switch di accesso**. I dipendenti verranno autenticati tramite un Server **RADIUS** (posizionato nella Server Farm aziendale). Le porte a cui si collegano dispositivi non riconosciuti verranno bloccate o assegnate a una *Guest VLAN* isolata che fornisce solo accesso a Internet.

### Scenario B: Assegnazione Dinamica delle VLAN
* **Richiesta tipica:** "I dipendenti non hanno una postazione fissa, ma devono poter collegare il proprio portatile in qualsiasi ufficio ed essere inseriti automaticamente nella VLAN del proprio reparto (es. Amministrazione o Produzione)."
* **Soluzione da proporre:** Utilizzo del **RADIUS per l'assegnazione dinamica delle VLAN**. Dopo l'autenticazione 802.1X, il server RADIUS comunica allo switch non solo l'OK per l'accesso, ma anche l'ID della VLAN a cui assegnare dinamicamente quella specifica porta.

### Scenario C: Rete Wi-Fi Aziendale (WPA-Enterprise)
* **Richiesta tipica:** "Progettare una rete wireless sicura per i dipendenti, evitando l'uso di una password condivisa (Pre-Shared Key) che potrebbe essere facilmente diffusa a estranei."
* **Soluzione da proporre:** Configurazione degli Access Point con standard **WPA2/WPA3-Enterprise**, che si appoggia proprio allo standard 802.1X e a un server RADIUS per autenticare ogni dipendente con le proprie credenziali personali (username e password di dominio).