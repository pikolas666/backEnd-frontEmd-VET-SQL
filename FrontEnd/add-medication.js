const productsURL = 'http://127.0.0.1:3000/';

document.getElementById('addMedicationBtn').addEventListener('click', async () => {
  const nameInput = document.getElementById('name-input');
  const descriptionInput = document.getElementById('description-input');
  const messageElement = document.getElementById('message');

  const name = nameInput.value;
  const description = descriptionInput.value;

  if (!name || !description) {
    messageElement.textContent = 'Please fill in both name and description fields';
    messageElement.style.color = 'red';
    return;
  }

  try {
    const response = await fetch(productsURL + 'medications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });

    if (response.status === 201) {
      messageElement.textContent = 'Medication added successfully';
      messageElement.style.color = 'green';

      
      nameInput.value = '';
      descriptionInput.value = '';
    } else {
      messageElement.textContent = 'Failed to add medication';
      messageElement.style.color = 'red';
    }
  } catch (err) {
    console.error('Error:', err);
  }
});
