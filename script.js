// Initialize EmailJS with user ID to send emails directly from the form
(function() {
    emailjs.init("IoiZWoYOPfglP3n2SFHL-");
})();

// Function to handle form submission
function sendEmail(event) {
    event.preventDefault(); // Prevent the default form submission action

    // Collecting data from the form fields
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
    };

    // Sending email using EmailJS
    emailjs.send('service_r733b7i', 'template_yxd9qd8', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            showSummary(); // Display the summary section on success
        }, function(error) {
            console.log('FAILED...', error);
            alert('Submission failed. Please try again later.'); // Show error alert
        });
}

// Function to show the summary section after successful submission
function showSummary() {
    document.getElementById('supportForm').style.display = 'none'; // Hide the form
    document.getElementById('summaryTicketNumber').textContent = document.getElementById('ticketNumber').textContent;
    document.getElementById('summary').style.display = 'block'; // Show the summary
}
