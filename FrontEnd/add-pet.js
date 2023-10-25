const productsURL = 'http://127.0.0.1:3000/';
const listProducts = 'pets';
const addBtn = document.getElementById('addBtn');
const message = document.getElementById('message');

async function addProduct() {
  const productNameInput = document.getElementById('name-input');
  const productDobInput = document.getElementById('dob-input');
  const productEmailInput = document.getElementById('client-email-input');

  const productName = productNameInput.value;
  const productDob = productDobInput.value;
  const productEmail = productEmailInput.value;

  const validationErrors = validateProductInputs(productName, productDob, productEmail);

  if (Object.keys(validationErrors).length > 0) {
    displayValidationErrors(validationErrors);
    return;
  }

  const product = {
    name: productName,
    dob: productDob,
    client_email: productEmail,
  };

  try {
    const response = await fetch(productsURL + listProducts, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      displaySuccessMessage('Pet added successfully!');
      productNameInput.value = '';
      productDobInput.value = '';
      productEmailInput.value = '';
    } else {
      displayErrorMessage('Failed to add a pet');
    }
  } catch (err) {
    displayErrorMessage('Failed to add a pet');
  }
}

function validateProductInputs(productName, productDob, productEmail) {
  const errors = {};

  if (!productName.trim()) {
    errors.productName = 'Name is required';
  }

  if (!productDob.trim()) {
    errors.productDob = 'Date of birth is required';
  }

  if (!productEmail.trim()) {
    errors.productEmail = 'Email is required';
  } else {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(productEmail)) {
      errors.productEmail = 'Invalid email address';
    }
  }

  return errors;
}


function displayValidationErrors(errors) {
  message.innerHTML = '';
  for (const field in errors) {
    const errorMessage = errors[field];
    const errorElement = document.createElement('p');
    errorElement.textContent = `${errorMessage}`;
    message.appendChild(errorElement);
  }
  message.style.color = 'red';
}

function displaySuccessMessage(messageText) {
  message.textContent = messageText;
  message.style.color = 'green'; 
}

function displayErrorMessage(messageText) {
  message.textContent = messageText;
  message.style.color = 'red'; 
}

addBtn.addEventListener('click', addProduct)
            