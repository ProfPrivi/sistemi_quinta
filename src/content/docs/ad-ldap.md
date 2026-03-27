---
title: "Servizi di Directory: Active Directory e LDAP"
description: "Gestione centralizzata degli utenti e delle risorse aziendali: il protocollo LDAP, l'ecosistema Active Directory, i Domain Controller e le Group Policy."
---

Immagina un'azienda con 500 dipendenti, 500 computer, 20 stampanti di rete e 10 server. Se non esistesse un sistema di gestione centralizzata, l'amministratore di rete dovrebbe creare manualmente l'account "Mario Rossi" con la sua password su ogni singolo computer che Mario potrebbe usare. E se Mario dimentica la password o viene licenziato? L'amministratore dovrebbe modificarla o cancellarla 500 volte. Un incubo.

La soluzione a questo problema si chiama **Directory Service** (Servizio di Directory), e i due nomi che dominano questo mondo sono **LDAP** e **Active Directory (AD)**.

---

## 1. Spiegazione Diretta: L'Ufficio Anagrafe Aziendale

Per capire un servizio di directory, pensalo come l'**Ufficio Anagrafe e Risorse Umane** dell'azienda, fusi insieme.

* **Senza Directory (Workgroup):** Ogni computer è come una nazione indipendente. Ha il suo database locale di utenti. Il PC della segreteria non sa chi sia registrato sul PC del direttore.
* **Con Directory (Dominio):** C'è un unico server centrale (il "Sindaco") che contiene l'anagrafe di tutti. Se Mario Rossi viene assunto, l'amministratore crea il suo account *una sola volta* nel server centrale. Da quel momento, Mario può sedersi a *qualsiasi* PC dell'azienda: il PC chiederà al server centrale "Conosci questo Mario? La password è giusta?". Il server dirà di sì, e il PC lo farà entrare. 

Questo concetto si chiama **Single Sign-On (SSO)**: un'unica identità, un'unica password, per accedere a tutto (PC, Wi-Fi, VPN, Casella di posta).

---

## 2. LDAP: Il Protocollo Standard

**LDAP (Lightweight Directory Access Protocol)** è il protocollo standard (Livello 7 ISO/OSI) utilizzato per interrogare e modificare i servizi di directory. Lavora nativamente sulla **porta TCP/UDP 389**, o sulla **636 per la versione sicura (LDAPS - LDAP over SSL/TLS)**.

LDAP non memorizza i dati in tabelle piatte (come fa un database relazionale SQL), ma organizza le informazioni in una struttura **gerarchica ad albero** (DIT - Directory Information Tree).
* **La Radice (Root):** L'organizzazione stessa (es. `dc=azienda, dc=it`).
* **I Rami (OU - Organizational Units):** I dipartimenti (es. `ou=Amministrazione`, `ou=Sviluppatori`).
* **Le Foglie (Entries):** I singoli utenti, computer o stampanti (es. `cn=Mario Rossi`).

Quando un firewall o un software di terze parti (es. un gestionale web) ha bisogno di sapere se la password inserita da un utente è corretta, fa una "query LDAP" al server aziendale.

---

## 3. Active Directory (AD): L'ecosistema Microsoft

Se LDAP è la "lingua", **Active Directory** è l'enorme "enciclopedia" sviluppata da Microsoft che parla quella lingua. Oggi, oltre il 90% delle aziende mondiali usa Active Directory basato su macchine Windows Server.

### I Componenti Fondamentali di AD:
1. **Il Dominio (Domain):** È il confine logico della rete (es. `azienda.local`). Tutti i PC, gli utenti e i server che fanno parte di questo dominio sono soggetti alle stesse regole di sicurezza.
2. **Domain Controller (DC):** È il server fisico (o la macchina virtuale) che "comanda" il dominio. Contiene il database con tutti gli utenti e le password. Per tolleranza ai guasti, in un'azienda ci devono *sempre* essere almeno due DC (Primario e Secondario) che si sincronizzano continuamente. Se uno "muore", nessuno se ne accorge.
3. **OU (Organizational Unit):** Sono delle "cartelle logiche" dentro AD per raggruppare gli utenti (es. l'OU "Docenti" e l'OU "Studenti").
4. **GPO (Group Policy Object):** Il vero superpotere di AD. Sono regole calate dall'alto dal Domain Controller a tutti i PC. Puoi creare una GPO che dice: *"Tutti gli utenti nell'OU 'Studenti' non possono aprire il Pannello di Controllo, non possono usare chiavette USB e avranno come sfondo del desktop il logo della scuola"*. Quando lo studente fa login, il PC scarica la policy e si blocca automaticamente.

> [!note] **Protocollo Kerberos**
> Mentre LDAP serve per "cercare" i dati nella rubrica, Active Directory usa tipicamente il protocollo **Kerberos (porta TCP/UDP 88)** per l'autenticazione vera e propria (il rilascio del "ticket" o pass che dimostra l'identità dell'utente) che garantisce una sicurezza crittografica altissima.

---

## 4. Applicazioni pratiche per la Seconda Prova

L'inserimento di Active Directory in un progetto d'esame è la mossa vincente per dimostrare di saper progettare una rete gestibile, sicura e scalabile (Role-Based Access Control).

### Scenario A: Sicurezza degli Endpoint e Regole Aziendali
* **Richiesta tipica:** "Impedire ai dipendenti del reparto contabilità di installare software non autorizzati (Shadow IT) sui PC aziendali ed evitare furti di dati tramite USB."
* **Soluzione da proporre:** Lo studente inserirà tutti i computer nel **Dominio Active Directory**. Creerà un'unità organizzativa (OU) dedicata alla "Contabilità" e vi applicherà una **GPO (Group Policy)** restrittiva. Questa policy rimuoverà i diritti di Amministratore Locale agli utenti, bloccherà l'esecuzione di file `.exe` non certificati e disabiliterà a livello di sistema operativo le porte USB per l'archiviazione di massa.

### Scenario B: Integrazione AAA, RADIUS e Wi-Fi (Collegamento)
* **Richiesta tipica:** "I dipendenti devono accedere alla rete Wi-Fi aziendale protetta senza l'uso di password condivise, ma usando le proprie credenziali personali."
* **Soluzione da proporre:** (Questo collega questa dispensa a quella su 802.1X). Lo studente configurerà un server