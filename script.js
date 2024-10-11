// Funzione per adattare il layout in base all'orientamento del dispositivo
function adjustLayoutBasedOnOrientation() {
    const container = document.querySelector('.container');

    if (window.matchMedia("(orientation: landscape)").matches) {
        // Modalità orizzontale
        container.style.maxWidth = '900px'; // Espandi il contenitore in modalità orizzontale
        container.style.padding = '20px'; // Riduci il padding per risparmiare spazio
    } else {
        // Modalità verticale
        container.style.maxWidth = '600px'; // Torna alla dimensione normale in verticale
        container.style.padding = '30px'; // Ripristina il padding originale
    }
}

// Aggiungi l'evento di ascolto per il cambiamento di orientamento
window.addEventListener('resize', adjustLayoutBasedOnOrientation);
window.addEventListener('orientationchange', adjustLayoutBasedOnOrientation);

// Chiama la funzione al caricamento della pagina per adattare il layout correttamente
window.onload = function() {
    adjustLayoutBasedOnOrientation();
    // Inizializza anche altre parti della pagina come la data e il numero del ticket
    const urlParams = new URLSearchParams(window.location.search);
    const fields = [
        'businessName', 'businessId', 'locationName', 'locationId',
        'deviceName', 'deviceId', 'userName', 'userId'
    ];
    fields.forEach(field => {
        const value = urlParams.get(field);
        if (value) {
            document.getElementById(field).textContent = value;
        }
    });

    document.getElementById('requestTime').textContent = getCurrentDateTime();
    document.getElementById('ticketNumber').textContent = generateTicketNumber();
};

// Funzioni già esistenti per il numero del ticket e la data
function generateTicketNumber() {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `#NR${randomNum}`;
}

function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('it-IT');
    const time = now.toLocaleTimeString('it-IT');
    return `${date} ${time}`;
}
