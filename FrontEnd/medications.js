const productsURL = 'http://127.0.0.1:3000/';

async function getMedications() {
  try {
    const response = await fetch(productsURL + 'medications');
    const medications = await response.json();

    if (medications.length === 0) {
      document.getElementById('product-wrapper').textContent = 'Nėra įrašų';
    } else {
              
      medications.forEach((medication) => {
        const medicationCard = document.createElement('div');
        medicationCard.setAttribute('class', 'card');
        
        const id = document.createElement('div');
        id.textContent = `ID: ${medication.id}`;

        const name = document.createElement('div');
        name.textContent = `Name: ${medication.name}`;
        
        const description = document.createElement('div');
        description.textContent = `Description: ${medication.description}`;
        
        medicationCard.appendChild(id);
        medicationCard.appendChild(name);
        medicationCard.appendChild(description);
        
        document.getElementById('product-wrapper').appendChild(medicationCard);
      });

      
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

getMedications();