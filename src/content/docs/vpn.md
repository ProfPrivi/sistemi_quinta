---
title: VPN (Virtual Private Network)
---

## 1. Che cos’è una VPN e perché si usa
Una VPN (Virtual Private Network) è una tecnologia che permette di creare un collegamento logico sicuro tra due o più nodi di rete attraverso un’infrastruttura non sicura, tipicamente Internet. L’idea è “simulare” una rete privata sopra una rete pubblica, garantendo riservatezza, integrità e autenticazione dei dati che viaggiano nel tunnel virtuale. Dal punto di vista dell’utente, una VPN fa sembrare remoto un host o una rete come se fosse localmente collegata alla LAN aziendale.

Le VPN sono fondamentali per scenari come il lavoro da remoto, il collegamento tra sedi diverse di una stessa azienda o l’uso sicuro di servizi interni da dispositivi mobili. In tutti questi casi si vuole evitare che i dati viaggino in chiaro sulla rete pubblica e si desidera applicare le stesse politiche di sicurezza di una rete privata interna. A seconda delle esigenze, cambiano l’architettura (remoteaccess o sitetosite), le modalità di incapsulamento (transport o tunnel) e i protocolli utilizzati (IPsec, SSL/TLS, MPLS).

## 2. Tipi di VPN: RemoteAccess e SitetoSite

### 2.1 RemoteAccess VPN
La RemoteAccess VPN collega singoli client remoti (PC, notebook, smartphone) alla rete di un’azienda o di un ente. In questo modello, ogni utente esegue un software client VPN (o usa un browser nel caso di alcune SSL VPN) che stabilisce un tunnel sicuro verso un gateway VPN aziendale. Una volta stabilita la connessione, il dispositivo remoto ottiene di solito un indirizzo IP della rete interna o di una subnet dedicata, e può accedere alle risorse come se fosse in ufficio.

Le RemoteAccess VPN sono molto usate per lo smart working, per i tecnici in trasferta o per gli studenti che accedono a laboratori virtuali. Dal punto di vista della sicurezza, prevedono fasi di autenticazione forte (credenziali, certificati digitali, talvolta fattore aggiuntivo come OTP) e cifratura endtoend del traffico tra client e gateway. I protocolli tipici sono IPsec in modalità appropriata o SSL/TLS (le cosiddette SSL VPN).

### 2.2 SitetoSite VPN
La SitetoSite VPN collega due intere reti (due sedi aziendali, sede centrale e filiale, data center e cloud, ecc.). In questo caso non sono i singoli client a instaurare la VPN, ma i router/gateway di frontiera delle due sedi. Tra i due gateway viene creato un tunnel sicuro, e il traffico che deve passare da una LAN all’altra viene incapsulato e protetto automaticamente.

Per gli utenti interni alle due sedi, tutto è trasparente: l’instradamento si occupa di inoltrare i pacchetti verso il gateway, che li incapsula e li invia all’altro estremo della VPN, dove vengono decapsulati e inoltrati alla destinazione finale. Le SitetoSite VPN sono spesso basate su IPsec in modalità tunnel, oppure su tecnologie MPLS fornite dal provider.

## 3. Modalità di funzionamento: Transport e Tunnel
Quando si parla di IPsec, uno degli aspetti chiave è la modalità con cui i pacchetti IP vengono protetti: transport o tunnel.

### 3.1 Modalità Transport
In modalità transport, il protocollo IPsec protegge solo il payload del pacchetto IP, lasciando intatto l’header IP originale. In pratica, viene inserito un header AH o ESP dopo l’header IP e prima del contenuto di livello superiore (TCP, UDP, ecc.). Il risultato è che i dati applicativi sono cifrati e/o autenticati, mentre l’indirizzo sorgente e destinazione restano visibili sulla rete.

Questa modalità è tipicamente usata per comunicazioni endtoend tra due host che supportano IPsec (ad esempio due server che scambiano dati sensibili), oppure in alcune configurazioni di RemoteAccess dove la terminazione IPsec avviene direttamente sul dispositivo utente. Il vantaggio è un overhead inferiore rispetto alla modalità tunnel, ma la struttura del pacchetto a livello IP rimane visibile ai router intermedi.

### 3.2 Modalità Tunnel
In modalità tunnel, l’intero pacchetto IP originale (header + payload) viene incapsulato dentro un nuovo pacchetto IP, che ha un nuovo header con indirizzi IP dei gateway della VPN. Tra il nuovo header IP e il pacchetto incapsulato viene inserito il protocollo AH o ESP. In questo modo, il contenuto originale, compresi gli indirizzi IP sorgente/destinazione originari, viene cifrato e/o autenticato.

La modalità tunnel è quella tipicamente usata per le SitetoSite VPN tra gateway, perché permette di proteggere l’intero traffico tra due reti indipendentemente dagli indirizzi interni. Per i router lungo il percorso, i pacchetti sono semplicemente traffico tra i due gateway (nuovi IP sorgente/destinazione), mentre le informazioni interne restano nascoste.

## 4. IPsec: ESP e AH
IPsec è una suite di protocolli per la sicurezza a livello IP, molto utilizzata per implementare VPN. Due protocolli fondamentali di IPsec sono AH (Authentication Header) ed ESP (Encapsulating Security Payload).

### 4.1 AH – Authentication Header
AH fornisce autenticazione e integrità dei pacchetti IP, ma non offre cifratura del contenuto. Inserisce un header aggiuntivo che permette di verificare che il pacchetto non sia stato modificato durante il transito e che provenga da un mittente autenticato. AH può essere usato sia in modalità transport sia in modalità tunnel.

Lo svantaggio principale è che non protegge la riservatezza: un eventuale attaccante può leggere il contenuto del pacchetto, anche se non può modificarlo senza essere rilevato. Inoltre, con AH alcuni campi dell’header IP devono restare invariati, il che può creare problemi con dispositivi che modificano il pacchetto lungo il percorso (per esempio NAT).

### 4.2 ESP – Encapsulating Security Payload
ESP è il protocollo IPsec più utilizzato nelle VPN moderne, perché offre cifratura del payload e può in più fornire autenticazione e integrità. In modalità transport, ESP protegge il payload del pacchetto IP (tipicamente il segmento TCP/UDP e i dati applicativi), mentre in modalità tunnel può cifrare l’intero pacchetto IP originale, header incluso.

Con ESP i dati viaggiano cifrati sulla rete pubblica, e solo gli endpoint della VPN possono decifrarli. Per questo motivo, quando si parla di VPN IPsec operative (sia RemoteAccess sia SitetoSite), nella pratica ci si riferisce quasi sempre a configurazioni basate su ESP in modalità tunnel o transport, eventualmente combinato con algoritmi di cifratura come AES128/256.

## 5. Trusted VPN, Secure VPN e Hybrid VPN
Oltre alla distinzione tecnica basata sui protocolli, si parla spesso di tre categorie concettuali di VPN: Trusted VPN, Secure VPN e Hybrid VPN.

### 5.1 Trusted VPN
Una Trusted VPN si basa su un’infrastruttura di rete dedicata fornita da un operatore (per esempio circuiti privati, reti MPLS del provider). In questo modello, la “virtualizzazione” deriva dal fatto che il provider garantisce che solo il traffico del cliente viaggia su certi percorsi logici, separati da quelli di altri clienti. Il cliente si fida che il provider non permetta a terzi di accedere ai suoi flussi e che mantenga determinate caratteristiche di qualità del servizio (QoS, latenza, disponibilità).

Dal punto di vista della sicurezza crittografica, però, una Trusted VPN non necessariamente cifra i dati: la protezione è basata sul controllo fisico e logico dell’infrastruttura. Per questo tipo di VPN si usano spesso tecnologie come MPLS VPN, configurate dal provider per creare “tunnel” logici tra le sedi del cliente.

### 5.2 Secure VPN
Una Secure VPN si basa sulla cifratura del traffico sopra una rete potenzialmente insicura, come Internet. In questo caso non ci si fida della rete sottostante, per cui si usano protocolli di sicurezza (IPsec o SSL/TLS) per garantire confidenzialità, integrità e autenticazione tra gli endpoint della VPN. Sia le RemoteAccess VPN che molte SitetoSite VPN su Internet rientrano in questa categoria.

La forza di una Secure VPN è che la sicurezza non dipende dal provider di connettività, ma dai meccanismi crittografici implementati sugli endpoint. Lo svantaggio è che non offre di per sé garanzie sulla qualità del percorso (latenza, banda garantita), che dipende dalla rete pubblica utilizzata.

### 5.3 Hybrid VPN
Una Hybrid VPN combina i due approcci: usa una Secure VPN (per esempio IPsec o SSL) sopra una Trusted VPN fornita dal provider, oppure combina più tecnologie di Secure VPN nello stesso gateway. In questo modo la parte “secure” aggiunge cifratura e autenticazione, mentre la parte “trusted” fornisce garanzie di qualità del servizio e isolamento logico. Ad esempio, un’azienda può avere una rete MPLS del provider che collega le sue sedi (Trusted VPN), ma decidere di cifrare ulteriormente il traffico sensibile tra due data center usando IPsec tunnel tra i router di frontiera (Secure VPN), ottenendo così una Hybrid VPN.

## 6. Protocolli tipici: IPsec, SSL/TLS, MPLS

### 6.1 IPsec
IPsec è lo standard de facto per la realizzazione di VPN a livello rete. Funziona in modalità transport o tunnel, utilizza ESP e AH, e prevede protocolli come IKE/IKEv2 per la negoziazione delle chiavi e dei parametri di sicurezza. È molto usato sia per SitetoSite VPN tra firewall/router sia per RemoteAccess VPN con client dedicati.

I vantaggi principali di IPsec sono la robustezza crittografica, la capacità di integrare autenticazione forte (certificati, chiavi precondivise), e la trasparenza rispetto alle applicazioni: qualsiasi protocollo IP può essere trasportato dentro un tunnel IPsec. Gli svantaggi sono la maggiore complessità di configurazione e la sensibilità ai problemi introdotti da NAT e firewall intermedi.

### 6.2 SSL/TLS (SSL VPN)
Le SSL VPN (oggi più corretto parlare di TLS VPN) utilizzano il protocollo SSL/TLS, lo stesso usato per HTTPS, per creare un canale cifrato tra client e gateway VPN. Spesso l’accesso avviene tramite browser o tramite un piccolo client, e il traffico viene incapsulato in connessioni HTTPS (porta 443). Questo approccio è particolarmente comodo per l’accesso remoto da postazioni non gestite (BYOD, PC di casa, internet point), perché di solito basta poter uscire su HTTPS.

Le SSL VPN sono molto usate per dare accesso a applicazioni web interne o per pubblicare in modo sicuro servizi aziendali verso utenti esterni. Alcune implementazioni creano un tunnel “full” (come IPsec), altre pubblicano solo specifiche applicazioni.

### 6.3 MPLS VPN
MPLS (Multiprotocol Label Switching) è una tecnologia di commutazione a etichette utilizzata dai provider di servizi per creare percorsi logici con determinate caratteristiche di qualità e instradamento. Una MPLS VPN è una VPN di tipo trusted, in cui il provider usa MPLS per separare il traffico di diversi clienti e garantire, ad esempio, bassa latenza o banda minima. Dal punto di vista del cliente, la MPLS VPN appare come una rete privata che collega le sue sedi, anche se fisicamente poggia su una grande infrastruttura condivisa. Non è però, di per sé, cifrata: per proteggere il contenuto dei dati, spesso si combina MPLS con una secure VPN basata su IPsec, ottenendo una Hybrid VPN.

## 7. Glossario essenziale
* **VPN (Virtual Private Network):** rete virtuale privata realizzata sopra un’infrastruttura pubblica.
* **RemoteAccess VPN:** VPN per collegare singoli utenti remoti a una rete aziendale.
* **SitetoSite VPN:** VPN per collegare in modo sicuro due o più reti.
* **Modalità transport:** in IPsec, protegge solo il payload del pacchetto IP originale.
* **Modalità tunnel:** in IPsec, incapsula e protegge l’intero pacchetto IP originale.
* **AH (Authentication Header):** protocollo IPsec per autenticazione e integrità, senza cifratura.
* **ESP (Encapsulating Security Payload):** protocollo IPsec per cifratura, integrità e autenticazione.
* **Trusted VPN:** VPN basata sulla fiducia nell’infrastruttura del provider (es. MPLS).
* **Secure VPN:** VPN basata su cifratura sopra una rete insicura (es. IPsec, SSL/TLS).
* **Hybrid VPN:** combinazione di Trusted VPN e Secure VPN, o di più tecnologie di Secure VPN.
* **IPsec:** suite di protocolli per la sicurezza a livello IP, ampiamente usata per VPN.
* **SSL/TLS VPN:** VPN che usa SSL/TLS, spesso incapsulata in HTTPS.
* **MPLS VPN:** VPN fornita dal provider utilizzando MPLS, tipicamente di tipo trusted.