---
title: Confini Reali e Confini Virtuali
description: Dispensa didattica per corso di Educazione Civica sulle VPN e la censura digitale nel mondo.
---

# Confini Reali e Confini Virtuali: Censura Internet e VPN
**Dispensa didattica per corso di Educazione Civica - Classe Quinta**
**Argomento:** Virtual Private Network (VPN) e censura digitale nel mondo
**Anno Scolastico:** 2025-2026
**A cura del Prof. Giuseppe Privitera**

---

## Introduzione
Internet è spesso percepito come uno spazio senza confini, dove le informazioni circolano liberamente e la comunicazione avviene senza restrizioni geografiche.
Tuttavia, la realtà è profondamente diversa: esistono confini virtuali che determinano quali contenuti possiamo vedere, quali servizi possiamo utilizzare e persino cosa possiamo dire online.
Questa dispensa esplora il rapporto tra tecnologia e controllo, analizzando come i governi implementano la censura digitale e quali strumenti i cittadini utilizzano per aggirare queste limitazioni.
Il caso emblematico è il Great Firewall cinese, il sistema di censura più sofisticato al mondo, che rappresenta un modello esportato in numerosi altri Paesi.

## 1. Il Great Firewall Cinese: Architettura della Censura

### 1.1 Origini e sviluppo storico
Il Golden Shield Project, meglio conosciuto come Great Firewall of China (GFW), nasce nel 1998 come progetto di sicurezza nazionale cinese.
Dopo anni di sviluppo e test, il sistema entra in piena operatività nel 2003, sotto la direzione del Ministero della Pubblica Sicurezza cinese (MPS).
Il nome "Great Firewall" è un gioco di parole ironico che richiama la Grande Muraglia cinese, ma in questo caso il muro non protegge da invasori fisici, bensì da idee e informazioni considerate pericolose dal governo.

**Timeline storica:**
* 1994: Internet arriva in Cina
* 1997: Inizio dei primi progetti di sorveglianza digitale
* 1998: Avvio ufficiale del Golden Shield Project
* 2003: Primi test operativi del Great Firewall
* 2006: Sistema pienamente funzionante
* 2025: Leak di oltre 600 GB di documentazione interna che rivela l'architettura completa

### 1.2 Motivazioni politiche e ideologiche
L'obiettivo dichiarato dal governo cinese è proteggere i cittadini da contenuti considerati pericolosi per la stabilità sociale e l'unità nazionale.
Le prime normative emanate indicavano esplicitamente cosa è proibito online: 
"È proibito utilizzare Internet per creare, replicare, recuperare, o trasmettere informazioni che incitino la resistenza alla Costituzione RPC, leggi o regolamenti amministrativi; promuovere il rovesciamento del governo o sistema socialista; minare l'unificazione nazionale; distorcere la verità, diffondere voci, o distruggere l'ordine sociale; o fornire materiale sessualmente suggestivo o incoraggiare il gioco d'azzardo, violenza, o omicidio."

La vera motivazione sottostante è il controllo del dissenso e la prevenzione di movimenti rivoluzionari che potrebbero minacciare il regime comunista.
Il governo teme l'influenza culturale occidentale e la circolazione di idee democratiche.

### 1.3 Tecniche di censura: come funziona il blocco
Il Great Firewall utilizza diverse tecniche sofisticate per controllare il traffico internet che attraversa i confini cinesi.
Queste tecniche possono essere raggruppate in tre categorie principali:

**TCP Reset Attack**
Quando un utente cinese tenta di connettersi a un sito bloccato, il sistema di censura monitora il traffico di rete in tempo reale attraverso la Deep Packet Inspection (DPI).
Se vengono rilevate parole chiave vietate o indirizzi IP proibiti, il Great Firewall invia pacchetti TCP contraffatti con il flag RST (reset) attivato.
Questo significa che il sistema si intromette nella comunicazione tra l'utente e il server, fingendosi una delle due parti, e forza l'interruzione della connessione.
Il TCP reset può essere ripetuto più volte per impedire ulteriori tentativi di connessione.

**Tecnicamente:**
* Il sistema rileva la richiesta di connessione a un server bloccato
* Identifica parole chiave vietate (es. nomi di dissidenti politici, "Tiananmen", "Tibet independence")
* Invia pacchetti TCP forgiati con bit RST = 1 a entrambi gli endpoint
* La connessione viene terminata istantaneamente
* Ulteriori tentativi vengono bloccati per un periodo variabile

A partire dal 2025, il Great Firewall è in grado di effettuare TCP reset su protocolli crittografati come HTTPS e TLS, utilizzando attacchi man-in-the-middle con certificati di autorità di certificazione (CA) controllate dallo stato.

**IP Blocking**
Il governo cinese mantiene liste nere di indirizzi IP associati a servizi vietati.
Quando un dispositivo in Cina tenta di connettersi a uno di questi indirizzi, i service provider (ISP nazionali) ricevono istruzioni di bloccare la richiesta.

**Servizi bloccati permanentemente includono:**
* Google (search, Gmail, Maps, YouTube, Chrome, Play Store)
* Facebook, Instagram, WhatsApp
* Twitter (X)
* Wikipedia (versioni in lingue diverse dal cinese mandarino)
* Telegram
* The New York Times, BBC, Reuters

**DNS Poisoning**
Quando un utente digita un nome di dominio (es. www.google.com), il computer deve tradurre questo nome in un indirizzo IP attraverso il sistema DNS (Domain Name System).
Il Great Firewall intercetta queste richieste DNS e risponde con indirizzi IP falsi o inesistenti.

**Esempio pratico:**
* Utente in Cina digita "www.facebook.com"
* La richiesta DNS viene intercettata dal Great Firewall
* Il sistema risponde con un IP falso (es. 127.0.0.1 o un server cinese)
* Il browser si connette all'IP sbagliato
* Risultato: impossibile accedere a Facebook

Nel corso del 2024, ricercatori dell'Università di Berkeley hanno testato oltre un miliardo di domini e rilevato che 943.000 domini sono censurati via DNS e 55.000 via HTTPS filtering.

### 1.4 Il leak del 2025: rivelazioni shock
L'11 settembre 2025 è stato pubblicato il più grande leak mai subito dal Great Firewall: oltre 600 gigabyte di materiale interno, inclusi repository di codice sorgente, log operativi, documentazione tecnica e corrispondenza tra sviluppatori.
Il materiale è stato rilasciato dal gruppo hacktivista Enlace Hacktivista e riguarda principalmente:
* **Geedge Networks:** azienda privata che collabora con il governo cinese
* **MESA Lab:** laboratorio dell'Istituto di Ingegneria dell'Informazione presso l'Accademia Cinese delle Scienze
* **Tiangou Secure Gateway (TSG):** la piattaforma centrale di censura

**Funzionalità rivelate dal leak:**
| Funzione | Descrizione |
| :--- | :--- |
| Deep Packet Inspection | Analisi in tempo reale del contenuto dei pacchetti dati crittografati |
| Content Classification | Classificazione automatica dei contenuti per categoria (politica, religione, pornografia, ecc.) |
| Code Injection | Iniezione di codice malevolo nelle sessioni HTTP, HTTPS, TLS e QUIC |
| DDoS mirati | Capacità di lanciare attacchi distribuiti contro obiettivi specifici |
| Tracciamento posizione | Localizzazione fisica degli utenti tramite celle telefoniche |
| Profilazione utenti | Costruzione di profili comportamentali individuali |
| Blackout selettivi | Spegnimento di internet per zone geografiche o durante eventi specifici |

Il leak ha dimostrato che la censura cinese non è più solo un progetto nazionale, ma un prodotto commerciale esportato in altri Paesi autoritari.

### 1.5 L'export della censura: clienti internazionali
I documenti trapelati rivelano che il sistema di censura cinese è stato venduto e implementato in diversi Paesi:
* **Myanmar:** Monitoraggio simultaneo di oltre 80 milioni di connessioni attraverso 26 data center. Il sistema blocca oltre 280 servizi VPN e 54 applicazioni prioritarie utilizzate dagli attivisti.
* **Pakistan:** La piattaforma cinese Geedge ha sostituito il vendor occidentale Sandvine, riutilizzando l'hardware esistente ma installando software cinese. Il sistema è stato affiancato da componenti Niagara Networks per l'intercettazione del traffico.
* **Kazakhstan:** Primo cliente straniero del TSG. Il sistema è stato utilizzato per attacchi man-in-the-middle su scala nazionale, intercettando connessioni HTTPS tramite certificati CA controllati dal governo.
* **Altri Paesi:** Etiopia, Turkmenistan, Iran e altri regimi autoritari hanno acquistato o ricevuto consulenza per implementare sistemi simili.

### 1.6 I "cloni" cinesi: servizi alternativi controllati
Una delle strategie del Great Firewall è bloccare i servizi occidentali e sostituirli con alternative cinesi, i cui server sono fisicamente localizzati in Cina e quindi sottoposti al controllo governativo:

| Servizio occidentale | Alternativa cinese | Funzione |
| :--- | :--- | :--- |
| Google | Baidu | Motore di ricerca |
| Facebook | Qzone | Social network |
| Twitter | Weibo | Microblogging |
| YouTube | Youku / Bilibili | Video sharing |
| WhatsApp | WeChat | Messaggistica |
| Wikipedia | Baidu Baike | Enciclopedia online |

Questi servizi soddisfano le esigenze di socializzazione e informazione dei cittadini cinesi, ma tutti i dati sono accessibili al governo e sottoposti a censura preventiva.

## 2. Censura Internet nel Mondo: Dati Aggiornati 2025-2026

### 2.1 Lo scenario globale: numeri allarmanti
Nel 2025, la censura internet ha raggiunto livelli senza precedenti.
Secondo il report di Surfshark pubblicato a gennaio 2026, 4,6 miliardi di persone (più della metà della popolazione mondiale) hanno subito almeno una forma di restrizione digitale durante l'anno.

**Dati chiave:**
* 81 nuove restrizioni imposte durante il 2025 (rispetto alle 47 attive a inizio anno)
* 24 casi di censura solo in India (paese con il maggior numero di blackout)
* Telegram è diventata la piattaforma più colpita (superando Facebook per la prima volta)
* 16 blackout totali a Gaza durante il 2024-2025, con il 75% delle torri di telefonia mobile distrutte

Il report Freedom on the Net 2025, pubblicato da Freedom House, documenta il quindicesimo anno consecutivo di declino della libertà digitale mondiale.
Per la prima volta, 57 dei 72 paesi monitorati hanno registrato arresti o detenzioni per espressioni online su temi sociali, politici o religiosi.

### 2.2 Classificazione dei Paesi per livello di libertà digitale
I Paesi monitorati sono classificati in tre categorie: Free (liberi), Partly Free (parzialmente liberi) e Not Free (non liberi).

**Paesi "Free" - I migliori per libertà internet**
| Paese | Punteggio | Caratteristiche |
| :--- | :--- | :--- |
| Islanda | 94/100 | Censura vietata dalla costituzione, oltre 75% delle case con fibra ottica |
| Estonia | 91/100 | Libertà di espressione protetta costituzionalmente, solo 800 siti bloccati (scommesse illegali) |
| Paesi Bassi | 84/100 | Forte protezione della privacy e della libertà di espressione |
| Francia | 76/100 | Regolamentazione equilibrata tra libertà e sicurezza |

Anche tra i Paesi "Free", tuttavia, 9 su 18 hanno registrato un declino durante il periodo giugno 2024 - maggio 2025. I cali più significativi sono stati registrati in Georgia, Germania e Stati Uniti.

**Paesi "Not Free" - I più repressivi**
| Paese | Caratteristiche della censura |
| :--- | :--- |
| Corea del Nord | Controllo totale di internet, solo contenuti governativi accessibili, VPN completamente vietate |
| Cina | Great Firewall, DPI avanzata, VPN legali solo se approvate dal governo (e inefficaci), blocco di Google, Facebook, Twitter |
| Iran | Seconda internet più restrittiva al mondo, limitazione velocità e larghezza di banda, blackout totali durante proteste. A gennaio 2026: oltre 90 ore di blackout totale |
| Turkmenistan | Un solo ISP controllato dal governo, VPN illegali, censura totale dei contenuti |
| Myanmar | Oltre 80 milioni di connessioni monitorate, blocco di 280 VPN e 54 app, legge di cybersicurezza repressiva nel 2025 |

### 2.3 I casi più eclatanti del 2025-2026
**Iran: blackout totale a inizio 2026**
Il 2026 è iniziato con un blackout quasi totale in Iran: oltre 90 ore di disconnessione completa nelle prime due settimane dell'anno, per silenziare le proteste nate a fine dicembre 2025.
Le autorità iraniane hanno preso di mira anche le connessioni satellitari Starlink, dimostrando l'evoluzione delle tecniche di censura.

**Gaza: infrastruttura distrutta**
A Gaza, la censura non è solo digitale ma fisica: entro aprile 2024, il 75% delle torri di telefonia mobile era stato distrutto.
Quando non è possibile chiamare un'ambulanza o segnalare la propria posizione sotto le macerie, la mancanza di connettività diventa una questione di vita o di morte.
Sono stati registrati almeno 16 blackout totali durante il 2024-2025, rendendo la popolazione completamente isolata dal mondo esterno durante operazioni militari.

**India: leader mondiale per numero di blackout**
L'India ha registrato 24 casi di censura internet nel 2025, il numero più alto al mondo.
I blackout sono stati giustificati con motivazioni di ordine pubblico, tensioni etniche e proteste contro il governo.

**Albania: ban di TikTok per un anno**
Dopo un tragico evento di cronaca, l'Albania ha deciso di bandire TikTok per un intero anno, dimostrando che anche Paesi europei stanno adottando misure restrittive.

**Europa vs Russia: censura incrociata**
Europa e Russia si censurano reciprocamente: ciascuna blocca i siti dell'altra con la giustificazione di "proteggere i cittadini dalla propaganda".
Gli utenti perdono la possibilità di accedere a fonti diverse e formarsi un'opinione autonoma.

### 2.4 L'assedio alle VPN
Una tendenza preoccupante del 2025-2026 è l'attacco sistematico alle VPN, gli strumenti principali utilizzati per aggirare la censura.

**Jammu e Kashmir (India):**
A inizio 2026 è stato imposto un divieto di due mesi sull'uso delle VPN.
La polizia ferma le persone per strada e controlla se sui loro smartphone ci sono app VPN "non autorizzate".

**Pakistan:**
Il governo ha iniziato a bloccare tutte le VPN non registrate presso le autorità.
Solo le VPN "approvate" rimangono legali, ma queste condividono i dati degli utenti con il governo.

**Cina:**
Dal 2013, solo le VPN approvate dal governo sono legali, ma queste non possono aggirare il Great Firewall per accedere ai contenuti bloccati, rendendole di fatto inutili.
Nel 2017, un cittadino cinese (Deng Jiewei) è stato condannato a 9 mesi di prigione per aver venduto servizi VPN online.

**Turchia:**
Un'ondata di divieti nel 2024 ha portato le autorità a colpire un provider VPN dopo l'altro.
Molti ISP turchi bloccano direttamente l'accesso alle VPN.

## 3. Virtual Private Network (VPN): Tecnologia di Libertà

### 3.1 Cos'è una VPN e come funziona
Una VPN (Virtual Private Network) è una tecnologia che crea un "tunnel" crittografato tra il dispositivo dell'utente e un server remoto, mascherando l'identità e la posizione dell'utente e proteggendo i dati da intercettazioni.

**Analogia semplice:** Immagina di dover inviare una lettera importante. Senza VPN, invii una cartolina: chiunque può leggerla durante il trasporto.
Con una VPN, metti la lettera in una busta sigillata, la inserisci in un pacco blindato, e lo spedisci attraverso un corriere privato che cambia anche l'indirizzo del mittente.

**Componenti principali di una VPN**
* **Client VPN:** Software installato sul dispositivo dell'utente (laptop, smartphone, tablet) che avvia la connessione sicura
* **Server VPN:** Computer remoto che riceve il traffico crittografato, lo decifra e lo indirizza verso la destinazione finale
* **Tunnel VPN:** Connessione crittografata che protegge i dati durante il trasporto
* **Protocollo VPN:** Set di regole che definisce come i dati vengono crittografati e trasmessi

**Come funziona passo per passo**
1. L'utente attiva il client VPN sul proprio dispositivo
2. Il client si connette a un server VPN (che può trovarsi in un altro paese)
3. Viene stabilito un "tunnel" crittografato tra dispositivo e server
4. Il traffico internet dell'utente viene crittografato e inviato attraverso il tunnel
5. Il server VPN decifra il traffico e lo inoltra alla destinazione finale (es. sito web)
6. La risposta segue il percorso inverso: dal sito al server VPN (crittografata) e poi all'utente
7. Per il sito di destinazione, la richiesta sembra provenire dal server VPN, non dall'utente

**Risultati:**
* L'indirizzo IP reale dell'utente è nascosto
* La posizione geografica apparente è quella del server VPN
* Il traffico è protetto da intercettazioni (ISP, hacker, governo)
* È possibile aggirare blocchi geografici e censure

### 3.2 Crittografia: rendere i dati illeggibili
La crittografia è il processo che trasforma i dati in un formato illeggibile per proteggere la privacy.
Funziona come una cassaforte digitale: solo chi possiede la "chiave" corretta può aprirla e leggere il contenuto.

Esempio semplice:

| Messaggio originale | Dopo crittografia |
| :--- | :--- |
| Sto visitando Wikipedia | X7$2mK9#pL@8nQ1zR4vT6yU |

Gli algoritmi moderni sono così sicuri che richiederebbero miliardi di anni per essere violati, anche con i computer più potenti.

### 3.3 Legalità delle VPN: dove sono permesse?
L'uso delle VPN è legale nella maggior parte dei Paesi democratici, ma esistono eccezioni significative.

**Paesi dove le VPN sono completamente legali**
* **Italia:** Uso completamente legale senza restrizioni
* **Unione Europea:** Tutti i Paesi membri permettono l'uso di VPN
* **Stati Uniti:** Legali e ampiamente utilizzate
* **Regno Unito:** Legali
* **Canada, Australia, Giappone, Nuova Zelanda:** Legali

In questi Paesi, le VPN sono utilizzate legittimamente per:
* Proteggere la privacy online
* Lavorare in sicurezza (smart working, accesso remoto aziendale)
* Evitare l'ISP throttling (limitazione velocità da parte del provider)
* Accedere a contenuti geo-bloccati (streaming, biblioteche digitali)

**Paesi dove le VPN sono limitate o illegali**

| Paese | Status | Dettagli |
| :--- | :--- | :--- |
| Cina | Limitato | Solo VPN approvate dal governo, che non aggirano la censura |
| Russia | Limitato | VPN devono bloccare contenuti vietati dal governo |
| Iran | Illegale | VPN vietate dal 2013, solo servizi governativi approvati |
| Corea del Nord | Illegale | Controllo totale, VPN completamente vietate |
| Turkmenistan | Illegale | VPN vietate, un solo ISP governativo |
| Bielorussia | Illegale | Legge del 2015 rende illegali le VPN |
| Myanmar | Limitato | Legge cybersicurezza 2025 punisce uso non autorizzato |
| Turchia | Limitato | Ondata di ban nel 2024, molti ISP bloccano VPN |

**Quando l'uso di VPN diventa illegale anche in Italia?**
Anche in Italia, dove le VPN sono legali, utilizzarle per scopi illeciti rimane ovviamente illegale:
* Accedere al Dark Web per acquisti illegali (droga, armi)
* Scaricare contenuti protetti da copyright (pirateria)
* Compiere frodi, truffe, hacking
* Diffondere materiale illegale (pedopornografia, terrorismo)

**Principio fondamentale:** La VPN è uno strumento neutro. Come un coltello può essere usato per cucinare o per ferire, una VPN può proteggere la privacy o nascondere attività criminali.
La responsabilità è sempre dell'utente.

## 4. Implicazioni Etiche e Politiche

### 4.1 Il diritto all'informazione vs la sovranità nazionale
La censura internet solleva un dilemma fondamentale: dove finisce la sovranità nazionale e dove inizia il diritto universale all'informazione?
* **Posizione dei governi autoritari:** La gestione di internet è una questione di sovranità nazionale. Ogni Paese ha il diritto di proteggere i propri cittadini da contenuti pericolosi, frodi, hate speech, terrorismo e informazioni che minano l'unità nazionale.
* **Posizione delle organizzazioni per i diritti umani:** L'accesso a internet è un diritto umano fondamentale riconosciuto dall'ONU. La censura digitale viola la libertà di espressione, il diritto all'informazione e limita la capacità dei cittadini di partecipare democraticamente alla vita pubblica.

### 4.2 Censura come strumento di controllo sociale
La censura non è mai solo tecnica, ma sempre politica.
Controllare l'informazione significa controllare la narrazione, e controllare la narrazione significa controllare il consenso.

**Esempi storici e attuali:**
* **Cina:** Censura di informazioni sulla piazza Tiananmen del 1989, sul Tibet, sullo Xinjiang, sui dissidenti politici
* **Iran:** Blackout durante le proteste per impedire la diffusione di video e testimonianze
* **Myanmar:** Blocco di app di messaggistica utilizzate dagli attivisti democratici
* **Russia:** Censura reciproca con l'Europa per controllare la narrativa sulla guerra in Ucraina

### 4.3 La "Splinternet": un web frammentato
Il termine Splinternet descrive la frammentazione di internet in "isole digitali" nazionali, dove ogni Paese decide quali contenuti sono accessibili ai propri cittadini.

**Conseguenze:**
* Fine dell'internet globale e universale
* Creazione di "bolle informative" nazionali
* Impossibilità per i cittadini di verificare informazioni da fonti indipendenti
* Perdita della funzione democratica di internet come spazio di dibattito libero

Secondo gli esperti, se la tendenza attuale continua, entro il 2030 il concetto di internet "globale" potrebbe essere solo un ricordo.
Navigare fuori dai confini digitali del proprio Paese richiederà permessi speciali o comporterà rischi legali enormi.

### 4.4 Il ruolo delle multinazionali tecnologiche
Le aziende tecnologiche occidentali si trovano in una posizione contradittoria: da un lato proclamano valori di libertà e privacy, dall'altro collaborano con regimi autoritari per accedere ai loro mercati.

**Caso Apple:**
* Nel 2017, Apple ha rimosso dall'App Store cinese tutte le app VPN disponibili, su richiesta del governo di Pechino.
* L'azienda ha giustificato la decisione affermando di voler "rispettare le norme dei mercati in cui opera".
* Il mercato cinese vale per Apple il 9,6% dei ricavi globali (circa 45 milioni di iPhone venduti all'anno).
* Rischiare un ban non rientra nei piani economici dell'azienda.
* **Paradosso:** La stessa Apple che si è rifiutata di collaborare con l'FBI per sbloccare l'iPhone del terrorista di San Bernardino (per proteggere la privacy degli utenti) ha accettato di rimuovere le VPN in Cina (limitando la libertà degli utenti).

**Caso Cisco Systems:**
* L'infrastruttura del Great Firewall è stata costruita con l'aiuto di multinazionali americane come Cisco Systems, che ha fornito cablaggi, router, switch e apparecchiature di rete dislocate lungo le arterie principali cinesi.

### 4.5 Social network e controllo dell'opinione pubblica
Finora abbiamo visto forme di censura che agiscono sull'infrastruttura: cavi, router, DNS, firewall nazionali.
Oggi esiste però una forma di controllo più sottile: non serve spegnere Internet, basta decidere cosa le persone vedono nei loro feed su Facebook, X, Instagram o TikTok.
I social network sono diventati per milioni di persone la fonte principale di informazione politica: chi controlla gli algoritmi di raccomandazione, la moderazione dei contenuti e le regole sulle fake news può influenzare l'opinione pubblica senza toccare direttamente i singoli cittadini, ma agendo sulle piattaforme.
Questo controllo non avviene solo con leggi dure e blocchi tecnici, ma anche attraverso accordi formali, pressioni politiche e forme di "soft censorship".

Alcuni esempi:
* accordi tra governi e piattaforme per rimuovere o limitare certi contenuti (es. hate speech, terrorismo, propaganda straniera);
* "moral suasion": governi che invitano le piattaforme ad autoregolarsi, lasciando intendere che, se non lo faranno, arriveranno leggi più severe;
* codici di condotta e regolamenti (come il Digital Services Act europeo) che spingono le piattaforme a moderare attivamente disinformazione e contenuti illegali.

Negli ultimi anni Meta (Facebook, Instagram, Threads) ha annunciato un ridimensionamento del fact‑checking professionale: meno verifiche affidate a fact‑checker esterni e più importanza a sistemi di "note della comunità", simili alle Community Notes di X. In pratica, invece di intervenire dall'alto per correggere o oscurare contenuti falsi, l'azienda punta di più sui contributi degli utenti e su etichette contestualizzanti.
* in alcuni Paesi questo significa maggiore tolleranza verso post controversi, soprattutto su temi politici;
* in Europa, invece, regolamenti come il Digital Services Act obbligano ancora le piattaforme a mantenere sistemi robusti contro hate speech e disinformazione, con sanzioni molto elevate in caso di violazioni.

Il risultato è che algoritmi e regole di moderazione cambiano in base al contesto politico e normativo, con effetti diretti su quali notizie si diffondono e quali restano invisibili.
Controllare direttamente i cittadini (sorveglianza di massa, riconoscimento facciale, ecc.) è costoso e rischioso dal punto di vista dell'immagine.
È spesso più efficiente modellare l'ambiente informativo in cui i cittadini si muovono. Questo può avvenire, ad esempio:
* non oscurando alcune fake news e lasciandole circolare fino a diventare virali;
* spingendo in alto nei feed contenuti che favoriscono una certa narrativa politica;
* dando più visibilità a fonti "amiche" e marginalizzando quelle critiche, senza bandirle formalmente;
* usando il micro-targeting pubblicitario per mostrare messaggi diversi a gruppi diversi di elettori, in modo poco trasparente.

In questo scenario, non serve un "Great Firewall" per condizionare l'opinione pubblica: basta che governi, partiti o grandi gruppi di interesse riescano a influenzare le scelte delle piattaforme, o a concordare regole informali su cosa è accettabile e cosa no.
Accanto a questo fenomeno, negli ultimi anni sono nate piattaforme "di parte", pensate per dare voce a specifiche comunità politiche.
Il caso più noto è Truth Social, il social network creato da Donald Trump dopo la sospensione da Twitter e Facebook in seguito ai fatti del 6 gennaio 2021. Truth Social si presenta come piattaforma del "free speech" contro la "censura" delle Big Tech, ma di fatto costruisce uno spazio informativo fortemente orientato, frequentato quasi solo da sostenitori, con scarsa contraddizione interna.
Molti messaggi politici di Trump passano prima da Truth Social e solo dopo vengono ripresi dai media tradizionali, trasformando il social in uno strumento diretto di propaganda.
Questa forma di controllo non usa firewall nazionali, ma produce comunque confini virtuali: confini algoritmici, perché ciò che vediamo o non vediamo nel feed dipende da scelte invisibili di aziende private;
e confini comunitari, perché piattaforme come Truth Social creano "bolle politiche" separate, dove la realtà è filtrata da un'unica narrazione dominante.

Per l'educazione civica questo apre alcune domande chiave:
* È più pericoloso un governo che controlla i cavi (come nel caso della Cina) o un sistema in cui pochi attori privati controllano gli algoritmi dei social?
* Se la principale fonte di notizie è il feed di una piattaforma, chi decide davvero che cosa sappiamo e che cosa ignoriamo?
* La nascita di social "di parte" aumenta la libertà di espressione o rischia di trasformare il dibattito pubblico in una somma di monologhi paralleli?

## 5. Riflessioni Finali: Confini Virtuali e Libertà

### 5.1 Internet come diritto umano
Nel 2016, le Nazioni Unite hanno dichiarato che l'accesso a internet è un diritto umano.
La risoluzione afferma che gli stessi diritti che le persone hanno offline devono essere protetti anche online, in particolare la libertà di espressione.
Tuttavia, la realtà è che miliardi di persone vivono sotto regimi che violano sistematicamente questo diritto.
La censura internet non è più un'eccezione limitata a "Stati canaglia", ma una condizione sistemica che riguarda più della metà del pianeta.

### 5.2 Il fenomeno "Splinternet": internet come arcipelago di isole
Il termine Splinternet descrive la frammentazione di internet in "isole digitali" nazionali, dove ogni Paese decide quali contenuti sono accessibili ai propri cittadini.
Con oltre 700-900 milioni di utenti internet cinesi (oltre la metà usa smartphone, la maggioranza banda larga), ma confinati in un ecosistema digitale separato dal resto del mondo, la Cina rappresenta l'esempio più estremo di Splinternet.
Il governo possiede e controlla i principali punti di accesso internet: CSTNET, ChinaNet, CERNET e CHINAGBN, recentemente espansi a 10 punti di accesso per gestire il traffico crescente.

**Conseguenze dello Splinternet:**
* Fine dell'internet globale e universale
* Creazione di "bolle informative" nazionali
* Impossibilità per i cittadini di verificare informazioni da fonti indipendenti
* Perdita della funzione democratica di internet come spazio di dibattito libero

Secondo gli esperti, se il trend attuale continua, entro il 2030 il concetto di internet "globale" potrebbe essere solo un ricordo.
Navigare fuori dai confini digitali del proprio Paese richiederà permessi speciali o comporterà rischi legali enormi.

### 5.3 L'export tecnologico: da TikTok alla censura globale
La Cina non esporta solo prodotti manifatturieri, ma anche piattaforme digitali e tecnologie di controllo.
TikTok, lanciata nel 2016, è l'esempio più noto di esportazione tecnologica cinese.
Ogni nuova app o sito basato in Cina viene accolto con sospetto nei Paesi occidentali, portando talvolta a versioni modificate che rimuovono funzionalità "potenzialmente dannose".
Ma l'export più preoccupante riguarda le tecnologie di sorveglianza e censura.
Come rivelato dal leak del 2025, Paesi come Myanmar, Pakistan, Kazakhstan ed Etiopia hanno acquistato o ricevuto consulenza per implementare sistemi ispirati al Great Firewall.
Anche Cuba e Zimbabwe hanno utilizzato tecnologie cinesi per i loro sistemi di controllo internet.

### 5.4 La responsabilità individuale
Come cittadini digitali, abbiamo la responsabilità di:
* **Informarci** da fonti diverse e verificare le informazioni
* **Proteggere** la nostra privacy online utilizzando strumenti come VPN, crittografia, browser sicuri
* **Sostenere** organizzazioni che difendono la libertà digitale (EFF, Reporters Without Borders, Access Now)
* **Essere consapevoli** che la tecnologia è neutrale: siamo noi a decidere come usarla

### 5.5 Domande per la riflessione e il dibattito in classe
* Il termine "Grande Muraglia digitale" è solo una metafora poetica o descrive qualcosa di reale?
* In che senso un firewall è un "confine"?
* La censura può mai essere giustificata per proteggere la sicurezza nazionale o l'ordine pubblico?
* Dove tracciamo il confine tra libertà di espressione e contenuti dannosi (hate speech, fake news, terrorismo)?
* Le multinazionali tecnologiche dovrebbero rifiutarsi di collaborare con regimi autoritari, anche a costo di perdere quei mercati?
* L'uso di VPN per aggirare la censura in Paesi autoritari è un atto di disobbedienza civile legittimo?
* Il Golden Shield è nato per ragioni di "sicurezza nazionale". Dove finisce la sicurezza e inizia il controllo sociale?
* Se la Cina esporta il suo modello di internet in altri Paesi, cosa potrebbe succedere alla rete globale nei prossimi 10 anni?
* Il leak del 2025 ha mostrato che il Great Firewall può lanciare attacchi informatici offensivi (Great Cannon). Questo cambia la percezione di internet come spazio "neutro"?
* Siamo disposti a rinunciare a parte della nostra privacy per maggiore sicurezza online?
* È giusto che alcuni cittadini del mondo possano accedere liberamente a tutte le informazioni mentre altri vivono in "bolle digitali" nazionali?
* Fang Binxing, il "padre del Great Firewall", è stato bloccato dal suo stesso sistema e ha dovuto usare una VPN. Questa ironia cosa ci dice sulla natura della censura?
* È più pericoloso un governo che controlla i cavi (come nel caso della Cina) o un sistema in cui pochi attori privati controllano gli algoritmi dei social?
* Se la principale fonte di notizie è il feed di una piattaforma, chi decide davvero che cosa sappiamo e che cosa ignoriamo?
* La nascita di social "di parte" come Truth Social aumenta la libertà di espressione o rischia di trasformare il dibattito pubblico in una somma di monologhi paralleli?
* Censura e Propaganda nella gestione del consenso e dell’opinione pubblica, due facce della stessa medaglia?

### 5.6 Conclusione: la battaglia per un web libero
La battaglia per la libertà digitale non si gioca solo sul terreno della tecnologia, ma su quello della geopolitica, dell'economia e dei valori umani.
Come ha scritto il sito Futuro Prossimo nel gennaio 2026:
"La verità è che la censura internet è un virus silenzioso: non senti dolore finché non provi ad aprire una finestra e scopri che è stata murata durante la notte. Forse dovremmo smetterla di considerare l'accesso alla rete come un privilegio tech e iniziare a vederlo per quello che è: un diritto umano fondamentale. Perché senza bit, oggi, non sei solo offline. Sei invisibile."
Il futuro di internet dipende dalle scelte che facciamo oggi: accettare la frammentazione e il controllo, o lottare per preservare uno spazio digitale globale, libero e aperto a tutti.

## Glossario Tecnico
* **Deep Packet Inspection (DPI):** Tecnica di analisi avanzata del traffico di rete che esamina il contenuto dei pacchetti dati, non solo gli header
* **DNS (Domain Name System):** Sistema che traduce i nomi di dominio (es. google.com) in indirizzi IP numerici
* **DNS Poisoning:** Falsificazione delle risposte DNS per impedire la risoluzione di un dominio o reindirizzare a IP falsi
* **IP Address:** Indirizzo numerico univoco assegnato a ogni dispositivo connesso a internet
* **ISP (Internet Service Provider):** Fornitore di servizi internet (es. TIM, Vodafone, Fastweb)
* **TCP (Transmission Control Protocol):** Protocollo di comunicazione che garantisce la consegna affidabile dei dati
* **TCP Reset Attack:** Tecnica di interruzione forzata di una connessione tramite pacchetti RST contraffatti
* **UDP (User Datagram Protocol):** Protocollo di comunicazione più veloce ma meno affidabile di TCP
* **TLS/SSL:** Protocolli di crittografia utilizzati per proteggere le connessioni HTTPS
* **Man-in-the-Middle (MITM):** Attacco in cui un attaccante si interpone tra due parti che comunicano
* **Firewall:** Sistema di sicurezza che controlla il traffico di rete in entrata e uscita
* **Proxy:** Server intermedio che inoltra le richieste degli utenti verso internet
* **Tunneling:** Tecnica di incapsulamento dei dati per creare una connessione sicura attraverso una rete non sicura
* **Crittografia end-to-end:** Crittografia in cui solo mittente e destinatario possono decifrare i messaggi
* **Golden Shield Project:** Progetto ombrello di sorveglianza digitale del governo cinese, avviato nel 1998
* **Great Firewall (GFW):** Sottosistema del Golden Shield che filtra e censura il traffico internet verso l'esterno
* **Great Cannon:** Strumento offensivo cinese per attacchi DDoS, separato ma integrato con il GFW
* **Splinternet:** Termine per descrivere un internet frammentato in reti nazionali separate
* **Geedge Networks:** Azienda cinese privata che sviluppa tecnologia di censura per il governo cinese (emersa dal leak 2025)
* **TSG (Tiangou Secure Gateway):** Piattaforma commerciale di censura rivelata dal leak 2025
* **Fang Binxing:** Informatico cinese, principale creatore tecnico del Great Firewall (soprannominato "padre del GFW")

## Bibliografia e Fonti
* Futuro Prossimo (2026). "Ve lo dico io: la censura internet non è mai stata così forte". Basato su Surfshark Internet Censorship Recap 2025/2026.
* Red Hot Cyber (2026). "Great Firewall leak: la censura cinese industrializzata". Analisi del leak di settembre 2025 (600+ GB di documentazione).
* Video YouTube - Ferry (2020). "GREAT FIREWALL (CENSURA CINESE) | COS'È E COME FUNZIONA".
* Panorama (2017). "Censura su internet: cosa sta succedendo in Cina".
* Wired Italia (2019). "Cina internet censura".
* Wikipedia (2025). "TCP reset attack".
* NordVPN (2024-2026). "La VPN è legale nel 2026? Scopriamolo assieme".
* Internet Society Italia (2025). "Sorveglianza e censura: il campo minato della libertà su Internet". Basato su Freedom on the Net 2024.
* Tech Policy Press (2025). "Global Internet Freedom Declines for 15th Consecutive Year". Freedom on the Net 2025 report.
* Addictivetips (2024). "I migliori e peggiori paesi per libertà di internet 2026".
* Surfshark (2023-2025). "Le VPN sono legali? Guida per il 2025".
* Amazon Web Services (2026). "Cos'è una VPN? - Spiegazione di una rete privata virtuale".
* Avira (2025). "Che cos'è una VPN e come funziona?".
* ExpressVPN (2025). "WireGuard vs. OpenVPN: Which VPN protocol is better in 2026?".
* Surfshark (2024). "Protocolli VPN: come scegliere quello giusto nel 2026".
* Diritto.it (2026). "Le VPN sono legali? Facciamo chiarezza sui miti più diffusi".
* Wikipedia (2025). "Golden Shield Project". https://en.wikipedia.org/wiki/Golden_Shield_Project
* Giano News (2025). "L'evoluzione della sorveglianza informativa in Cina".
* IUS in Itinere (2017). "Il Great Firewall: la censura cinese 2.0".
* The History of Computing (n.d.). "The Great Firewall of China".
* The China Story (2013). "Fang Binxing and the Great Firewall".
* TIME Magazine (2016). "China: Great Firewall Creator Blocked by His Own Firewall".
* The History of Computing (n.d.). "The Great Firewall of China - Complete Historical Analysis".
* CBS News (2011). "Cisco Sued For Helping China Build 'Great Firewall'".
* Reuters (2011). "Cisco suits on China rights abuses to test legal reach".
* Electronic Frontier Foundation (2016). "Cisco's Latest Attempt to Dodge Responsibility for Facilitating Human Rights Abuses".

**Note per gli studenti:**
Questa dispensa è stata creata con materiali aggiornati a marzo 2026. La censura internet e le tecnologie di evasione sono in continua evoluzione. Si incoraggia a:
* Seguire gli aggiornamenti dei report annuali di Freedom House (Freedom on the Net)
* Consultare le mappe interattive di censura internet (es. Surfshark Censorship Map)
* Verificare sempre le fonti delle informazioni che leggete online
* Riflettere criticamente sul ruolo della tecnologia nella società