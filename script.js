// Inizializza EmailJS
(function() {
    emailjs.init("IoiZWoYOPfglP3n2SFHL-");
})();

// Funzione per inviare i dati del modulo al Google Sheet tramite il Google Apps Script
function sendEmail(event) {
    event.preventDefault();

    const templateParams = {
        business_name: document.getElementById('businessName').textContent,
        location_name: document.getElementById('locationName').textContent,
        business_id: document.getElementById('businessId').textContent,
        location_id: document.getElementById('locationId').textContent,
        device_name: document.getElementById('deviceName').textContent,
        device_id: document.getElementById('deviceId').textContent,
        user_name: document.getElementById('userName').textContent,
        user_id: document.getElementById('userId').textContent,
        request_time: document.getElementById('requestTime').textContent,
        ticket_number: document.getElementById('ticketNumber').textContent,
        request_detail: document.getElementById('requestDetail').value,
        request_type: document.getElementById('requestType').value,
        contact_phone: document.getElementById('contactPhone').value,
        contact_email: document.getElementById('contactEmail').value,
        service_block: document.getElementById('serviceBlock').checked
    };

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyus8tRS1wSjJD2Y8YuYZMQmdgZTodvoEYuxytO_YskFhSxPRuBGLjx0TRFz8MJTojL/exec';

    fetch(scriptURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateParams)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            window.location.href = 'conferma.html';  // Reindirizza alla pagina di conferma
        } else {
            alert('Errore durante l\'invio della richiesta. Contattare il numero 3333333333 per assistenza.');
        }
    })
    .catch(error => {
        console.error('Errore...', error);
        alert('Errore durante l\'invio della richiesta. Contattare il numero 3333333333 per assistenza.');
    });
}

// Al caricamento della pagina, inizializza i valori e imposta la data corrente
window.onload = function() {
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

// Funzione per generare un numero di ticket casuale
function generateTicketNumber() {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `#NR${randomNum}`;
}

// Funzione per ottenere la data e l'ora corrente
function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('it-IT');
    const time = now.toLocaleTimeString('it-IT');
    return `${date} ${time}`;
}

