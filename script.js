// Configurazione iniziale degli ombrelloni
const numeroOmbrelloni = 20;
const ombrelloni = Array(numeroOmbrelloni).fill("disponibile"); // Array che rappresenta lo stato di ogni ombrellone

// Configurazione tariffe stagionali
const tariffeStagionali = {
    bassa: 10, // Euro per giorno
    media: 20,
    alta: 30
};

// Definizione dei periodi stagionali (cambia le date in base alle tue esigenze)
const periodiStagionali = [
    { nome: "bassa", inizio: "2024-01-01", fine: "2024-05-31" },
    { nome: "media", inizio: "2024-06-01", fine: "2024-07-15" },
    { nome: "alta", inizio: "2024-07-16", fine: "2024-08-31" },
    { nome: "media", inizio: "2024-09-01", fine: "2024-09-30" },
    { nome: "bassa", inizio: "2024-10-01", fine: "2024-12-31" }
];

// Funzione per generare la griglia degli ombrelloni
function generaSpiaggia() {
    const spiaggia = document.getElementById("spiaggia");
    spiaggia.innerHTML = ""; // Pulisce la griglia
    ombrelloni.forEach((stato, index) => {
        const ombrellone = document.createElement("div");
        ombrellone.classList.add("ombrellone", stato);
        ombrellone.textContent = index + 1;
        ombrellone.addEventListener("click", () => selezionaOmbrellone(index + 1));
        spiaggia.appendChild(ombrellone);
    });
}

// Funzione per selezionare un ombrellone e aggiornare il modulo
function selezionaOmbrellone(id) {
    document.getElementById("ombrelloneId").value = id;
}

// Funzione per determinare il periodo stagionale in base alla data
function determinaPeriodoStagione(data) {
    const dataPrenotazione = new Date(data);
    for (const periodo of periodiStagionali) {
        const inizio = new Date(periodo.inizio);
        const fine = new Date(periodo.fine);
        if (dataPrenotazione >= inizio && dataPrenotazione <= fine) {
            return periodo.nome;
        }
    }
    return "bassa"; // Valore di default se nessun periodo corrisponde
}

// Funzione per calcolare il costo totale in base al periodo e alla durata
function calcolaCosto(data, durata) {
    const periodo = determinaPeriodoStagione(data);
    const tariffaGiornaliera = tariffeStagionali[periodo];
    return tariffaGiornaliera * durata;
}

// Funzione per gestire la prenotazione
document.getElementById("formPrenotazione").addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;
    const durata = parseInt(document.getElementById("durata").value, 10);
    const ombrelloneId = parseInt(document.getElementById("ombrelloneId").value, 10) - 1;

    if (ombrelloni[ombrelloneId] === "disponibile") {
        const costoTotale = calcolaCosto(data, durata);
        ombrelloni[ombrelloneId] = "prenotato";
        alert(`Ombrellone ${ombrelloneId + 1} prenotato da ${nome} per il giorno ${data} (Durata: ${durata} giorni). Costo totale: €${costoTotale}`);
        generaSpiaggia();
    } else {
        alert("L'ombrellone selezionato non è disponibile.");
    }
});

// Inizializza la griglia degli ombrelloni
generaSpiaggia();
