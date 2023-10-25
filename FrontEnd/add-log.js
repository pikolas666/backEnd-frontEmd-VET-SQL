const itemId = localStorage.getItem('productId');
const productsURL = 'http://127.0.0.1:3000/';

document.getElementById('addLogBtn').addEventListener('click', async () => {
  const descriptionInput = document.getElementById('description-input');
  const description = descriptionInput.value;

  if (!description) {
    alert('Please enter a description for the log');
    return;
  }

  // You need to obtain the pet_id of the selected pet from your application logic.
  // For this example, let's assume you have the pet_id stored in a variable called "selectedPetId."

  try {
    const response = await fetch(productsURL + 'logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pet_id: itemId, description }),
    });

    if (response.status === 201) {
    
      const messageElement = document.getElementById('message');
      messageElement.textContent = 'Log added successfully';
      messageElement.style.color = 'green';

      descriptionInput.value = '';

      
      setTimeout(() => {
        window.location.href = 'log.html'; 
      }, 2000);
    } else {
      alert('Failed to add log');
    }
  } catch (err) {
    console.error('Error:', err);
  }
});
