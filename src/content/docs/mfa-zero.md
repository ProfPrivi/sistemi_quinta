---
title: "Sicurezza Moderna: Zero Trust (ZTNA) e MFA"
description: "Il cambio di paradigma nella sicurezza di rete: dal modello perimetrale all'approccio Zero Trust, con integrazione della Multi-Factor Authentication."
---

L'evoluzione delle reti aziendali, spinta dal cloud computing e dallo smart working, ha reso obsoleti i vecchi modelli di sicurezza. Oggi, il perimetro di una rete aziendale non è più definito dalle mura dell'ufficio.

---

## 1. Dal modello "Castle-and-Moat" allo Zero Trust

Storicamente, la sicurezza informatica si basava sul modello "Castello e Fossato": il Firewall (il fossato) teneva fuori i cattivi, mentre tutto ciò che era all'interno della LAN (il castello) veniva considerato automaticamente sicuro e affidabile.

**Il problema:** Se un attaccante riesce a superare il Firewall (ad esempio tramite un'email di phishing o un malware su una chiavetta USB), ha campo libero per muoversi indisturbato in tutta la rete aziendale (movimento laterale).

### Il Paradigma Zero Trust
Il modello **Zero Trust** ribalta questa logica e si basa sul principio: **"Never trust, always verify"** (Non fidarti mai, verifica sempre). 
In un'architettura Zero Trust, nessun utente o dispositivo è considerato attendibile di default, nemmeno se è collegato fisicamente alla rete della sede centrale. Ogni singola richiesta di accesso a una risorsa deve essere autenticata, autorizzata e crittografata.

---

## 2. ZTNA: Zero Trust Network Access

Lo **ZTNA** è l'implementazione pratica del modello Zero Trust per l'accesso remoto e interno, e sta rapidamente sostituendo le classiche VPN.

* **Come funziona una VPN tradizionale:** Autentica l'utente e gli dà accesso all'intera rete aziendale (o a un'ampia sottorete). È come dare le chiavi del portone principale dell'edificio.
* **Come funziona lo ZTNA:** Fornisce l'accesso **solo a specifiche applicazioni**, nascondendo il resto della rete. Inoltre, verifica continuamente non solo l'identità dell'utente, ma anche la "salute" del dispositivo (es. l'antivirus è aggiornato? Il sistema operativo è patchato?). È come dare una chiave magnetica che apre solo la porta dell'ufficio in cui devi lavorare, e solo per il tempo necessario.

---

## 3. MFA: Multi-Factor Authentication

Perché il modello Zero Trust funzioni, l'autenticazione deve essere blindata. Le sole password (Single-Factor Authentication) sono vulnerabili a furti, data breach o attacchi di forza bruta.

L'**MFA (Autenticazione a più fattori)** richiede che l'utente dimostri la propria identità utilizzando almeno due elementi scelti tra tre diverse categorie:
1. **Qualcosa che sai (Knowledge):** Una password o un PIN.
2. **Qualcosa che hai (Possession):** Uno smartphone (app Authenticator come Google/Microsoft Authenticator, oppure ricezione di un OTP via SMS) o un token hardware (chiavette FIDO2/YubiKey).
3. **Qualcosa che sei (Inherence):** Dati biometrici come l'impronta digitale o il riconoscimento facciale.

> [!caution] **Attenzione agli SMS**
> L'MFA basata su SMS è oggi considerata la meno sicura a causa degli attacchi di *SIM Swapping* (clonazione della SIM). In ambito aziendale si preferiscono le app Authenticator o i token hardware.

---

## 4. Applicazioni pratiche per la Seconda Prova

In un tema d'esame, l'inserimento di un'architettura Zero Trust/MFA è perfetto per gestire scenari moderni e complessi. Ecco come proporre queste soluzioni:

### Scenario A: Lavoro Agile (Smart Working) e BYOD
* **Richiesta tipica:** "Permettere ai dipendenti di lavorare da casa, anche utilizzando dispositivi personali (BYOD - Bring Your Own Device), accedendo in sicurezza ai server aziendali."
* **Soluzione da proporre:** Anziché proporre una classica VPN Client-to-Site (che esporrebbe la rete ai virus presenti sui PC personali dei dipendenti), si progetta un'infrastruttura **ZTNA**. L'accesso ai servizi aziendali sarà protetto da **MFA** obbligatoria e il gateway ZTNA controllerà la conformità di sicurezza del dispositivo prima di instaurare il tunnel crittografato verso la singola applicazione.

### Scenario B: Mitigazione dei Ransomware
* **Richiesta tipica:** "Progettare la rete in modo da limitare i danni nel caso in cui un computer della segreteria venga infettato da un malware/ransomware."
* **Soluzione da proporre:** Oltre alla segmentazione in VLAN, si applica il principio del **Least Privilege** (Minimo Privilegio) tipico del framework **Zero Trust**. Le regole di routing e di firewall interno impediranno al PC della segreteria di "vedere" i server di produzione o di backup, bloccando la propagazione del virus (movimento laterale).

### Scenario C: Accesso di Fornitori Esterni
* **Richiesta tipica:** "Consentire ai tecnici di un'azienda esterna di fare manutenzione sui server web aziendali."
* **Soluzione da proporre:** Implementazione di un portale di accesso remoto basato su **ZTNA con MFA**. Al tecnico esterno non verrà fornito l'accesso alla rete (no VPN), ma solo una sessione remota temporanea, tracciata e limitata esclusivamente all'IP e alla porta del server web da manutenere.