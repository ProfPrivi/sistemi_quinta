---
title: "Sviluppo Backend: Database (E-R) e API REST"
description: "Guida completa alla progettazione di basi di dati (dal modello concettuale al logico) e all'esposizione dei dati tramite architetture web e API RESTful."
---

Ogni applicazione moderna, che sia un'app per smartphone, un gestionale aziendale o un e-commerce, ha bisogno di due elementi fondamentali "dietro le quinte" (nel Backend): un posto sicuro e organizzato dove salvare i dati (il **Database**) e un "linguaggio universale" per far comunicare questi dati con il mondo esterno (le **API REST**).

---

## 1. Spiegazione Diretta: Il Ristorante Digitale

Per capire come interagiscono Web, API e Database, usiamo la metafora del ristorante:

* **Il Cliente (Frontend / App Mobile):** È chi usa l'applicazione. Guarda il menu e sa cosa vuole ordinare, ma non può entrare in cucina a cucinarselo da solo.
* **Il Cameriere (Le API REST):** È il tramite. Prende l'ordine dal cliente (una richiesta HTTP), lo porta in cucina con un formato standard, aspetta che il piatto sia pronto e lo riporta al tavolo.
* **La Cucina (Il Server Web / Backend):** Riceve l'ordine dal cameriere, applica la logica aziendale (es. controlla se gli ingredienti sono disponibili, cucina il piatto).
* **La Dispensa (Il Database):** È il luogo fisico dove sono conservati in modo rigoroso e ordinato tutti gli ingredienti. Il cuoco preleva e inserisce gli ingredienti seguendo regole precise (lo Schema del DB).

Senza il cameriere (API), il cliente dovrebbe entrare in dispensa. Nel mondo informatico, questo significherebbe dare all'app del telefono l'accesso diretto al Database: un disastro in termini di sicurezza e architettura!

---

## 2. Progettazione della Base di Dati

La creazione della "dispensa" (il database relazionale) non si fa scrivendo subito codice SQL, ma passa attraverso due fasi di progettazione fondamentali, richiestissime all'Esame di Stato.

### A. Fase Concettuale (Il Modello E-R)
Il Modello Entità-Relazione (E-R) serve a descrivere la realtà in modo indipendente dal software che si userà. Si basa su:
* **Entità:** Gli "oggetti" del mondo reale (es. `STUDENTE`, `CORSO`, `DOCENTE`). Si rappresentano con rettangoli.
* **Attributi:** Le proprietà delle entità (es. Nome, Cognome, Matricola). L'attributo univoco diventa la Chiave Primaria (PK).
* **Relazioni (Associazioni):** I legami logici tra le entità (es. uno studente "frequenta" un corso). Si rappresentano con rombi.
* **Cardinalità:** Definisce quanti elementi partecipano alla relazione. Le più comuni sono **1:N** (Uno a Molti - es. Un reparto ha molti dipendenti) e **N:M** (Molti a Molti - es. Uno studente frequenta molti corsi, e un corso è frequentato da molti studenti).

### B. Fase Logica (Lo Schema Relazionale)
Il modello E-R viene tradotto in tabelle, seguendo regole rigide per evitare ridondanze e anomalie (Normalizzazione, solitamente fino alla Terza Forma Normale - 3NF).
* Le **Entità** diventano **Tabelle**.
* Gli **Attributi** diventano le **Colonne** (campi).
* **Relazione 1:N:** La chiave primaria (PK) della tabella con cardinalità 1 "migra" nella tabella con cardinalità N, diventando una **Chiave Esterna (Foreign Key - FK)**.
* **Relazione N:M:** I database relazionali non supportano il "Molti a Molti" diretto. Si deve creare una **Tabella Associativa** (o di legame) nel mezzo, che conterrà come chiavi esterne le PK di entrambe le entità originarie.

---

## 3. Sviluppo Web: Le API REST

Una volta che il Database è pronto, dobbiamo farci parlare le applicazioni. Oggi lo standard assoluto è l'architettura **REST** (Representational State Transfer).

Un'API RESTful utilizza i metodi standard del protocollo **HTTP** per eseguire le classiche operazioni sui dati (chiamate **CRUD**: Create, Read, Update, Delete):

1. **POST (Create):** Inserisce un nuovo dato. (es. `POST /studenti` per aggiungere un nuovo alunno).
2. **GET (Read):** Legge o cerca i dati. (es. `GET /studenti/123` restituisce i dati dello studente con matricola 123).
3. **PUT / PATCH (Update):** Modifica un dato esistente. (es. `PUT /studenti/123` per aggiornare l'indirizzo).
4. **DELETE (Delete):** Elimina un dato. (es. `DELETE /studenti/123`).

### Il formato JSON
Quando il "cameriere" (l'API) riporta i dati al "cliente" (l'App), non usa tabelle o codice HTML, ma un formato di testo leggero e universale chiamato **JSON** (JavaScript Object Notation).
Esempio di risposta a una chiamata `GET /studenti/123`:
```json
{
  "matricola": 123,
  "nome": "Mario",
  "cognome": "Rossi",
  "classe": "5A Informatica"
}
```

---

## 4. Applicazioni pratiche per la Seconda Prova

La combo Database + API è il jolly definitivo se la traccia richiede lo sviluppo di un servizio web o l'integrazione tra diverse filiali.

### Scenario A: Sviluppo di un Gestionale (Es. Prenotazione Visite Mediche)
* **Richiesta tipica:** "Progettare la base di dati per gestire pazienti, medici e le relative visite prenotate."
* **Soluzione da proporre:** Lo studente disegnerà il Modello E-R con le entità `PAZIENTE` e `MEDICO`. Poiché un medico ha tanti pazienti e un paziente può vedere più medici, c'è una relazione **N:M**. Nello schema logico, creerà la tabella associativa `VISITA` contenente `ID_Paziente` (FK), `ID_Medico` (FK), Data e Ora.

### Scenario B: Integrazione di un'App Mobile
* **Richiesta tipica:** "I dipendenti sul territorio, dotati di smartphone, devono poter inviare in tempo reale i dati dei sensori al server centrale."
* **Soluzione da proporre:** Si esclude l'accesso diretto dell'app al database aziendale per motivi di sicurezza e disaccoppiamento. Si progetta un **Web Service basato su API REST**. L'App mobile invierà i dati effettuando una chiamata **HTTP POST** con un payload (carico utile) in formato **JSON**. Il Backend centrale riceverà il JSON, lo validerà e lo inserirà nel DB.

### Scenario C: Sicurezza delle API e Zero Trust (Collegamento)
* **Richiesta tipica:** "Garantire che solo gli utenti autorizzati possano leggere o modificare i dati tramite i servizi web."
* **Soluzione da proporre:** Collegandosi ai concetti di sicurezza e Zero Trust, lo studente specificherà che le API REST devono viaggiare su canale cifrato (**HTTPS / TLS**). Inoltre, implementerà un'autenticazione basata su **Token (es. JWT - JSON Web Token)**: l'utente fa login una volta e riceve un token. Per ogni successiva richiesta GET o POST, l'app dovrà allegare questo token nell'header HTTP per dimostrare di essere autorizzata, implementando di fatto un controllo accessi continuo senza dover salvare sessioni sul server (Stateless).