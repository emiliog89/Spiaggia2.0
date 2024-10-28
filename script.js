// Configurazione iniziale degli ombrelloni
const numeroOmbrelloni = 20;
const ombrelloni = Array(numeroOmbrelloni).fill("disponibile"); // Array che rappresenta lo stato di ogni ombrellone

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

// Funzione per gestire la prenotazione
document.getElementById("formPrenotazione").addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const data = document.getElementById("data").value;
    const durata = document.getElementById("durata").value;
    const ombrelloneId = parseInt(document.getElementById("ombrelloneId").value, 10) - 1;

    if (ombrelloni[ombrelloneId] === "disponibile") {
        ombrelloni[ombrelloneId] = "prenotato";
        alert(`Ombrellone ${ombrelloneId + 1} prenotato da ${nome} per il giorno ${data} (Durata: ${durata} giorni)`);
        generaSpiaggia();
    } else {
        alert("L'ombrellone selezionato non è disponibile.");
    }
});

// Inizializza la griglia degli ombrelloni
generaSpiaggia();
