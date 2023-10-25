const productsURL = 'http://127.0.0.1:3000/';
const itemId = localStorage.getItem('productId');
document.getElementById('addPrescriptionBtn').addEventListener('click', async () => {
    const medicationIdInput = document.getElementById('medication-id-input');
    const commentInput = document.getElementById('comment-input');

    const medicationId = medicationIdInput.value;
    const petId = itemId;
    const comment = commentInput.value;

    if (!medicationId || !petId || !comment) {
        displayMessage('Please fill in all required fields', 'red');
        return;
    }

    try {
        const response = await fetch(productsURL + 'prescriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ medication_id: medicationId, pet_id: petId, comment }),
        });

        if (response.status === 201) {
            displayMessage('Prescription added successfully', 'green');
            medicationIdInput.value = '';
            commentInput.value = '';
            
          
            window.location.href = 'log.html';
        } else {
            displayMessage('Failed to add prescription', 'red');
        }
    } catch (err) {
        displayMessage('Error adding prescription', 'red');
        console.error('Error:', err);
    }
});

function displayMessage(messageText, color) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = messageText;
    messageElement.style.color = color;
    messageElement.style.display = 'block';

    setTimeout(function () {
        messageElement.style.display = 'none';
    }, 2000);
}
