const productsURL = 'http://127.0.0.1:3000/';
const listProducts = 'cars';
const addBtn = document.getElementById('addBtn');
const message = document.getElementById('message');

async function addProduct() {
  const productTitleInput = document.getElementById('title-input');
  const productImageInput = document.getElementById('image-input');
  const productPriceInput = document.getElementById('price-input');
  const numberplatesInput = document.getElementById('numberplates-input');
  

  const productTitle = productTitleInput.value;
  const productImage = productImageInput.value;
  const productPrice = productPriceInput.value;
  const numberplates = numberplatesInput.value;


  const validationErrors = validateProductInputs(productTitle, productImage, productPrice, numberplates);

  if (Object.keys(validationErrors).length > 0) {
 
    displayValidationErrors(validationErrors);
    return; 
  }

  const product = {
    title: productTitle,
    image: productImage,
    price: parseFloat(productPrice), 
    numberplates: numberplates,
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
     
      displaySuccessMessage('Product added successfully!');
  
      productTitleInput.value = '';
      productImageInput.value = '';
      productPriceInput.value = '';
      numberplatesInput.value = '';
    } else {
   
      displayErrorMessage('Failed to add product');
    }
  } catch (err) {

    displayErrorMessage('Failed to add product');
  }
}


function displayValidationErrors(errors) {
  message.innerHTML = '';
  for (const field in errors) {
    const errorMessage = errors[field];
    const errorElement = document.createElement('p');
    errorElement.textContent = `${field}: ${errorMessage}`;
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

function validateProductInputs(title, image, price, numberplates) {
  const errors = {};

  if (!title.trim()) {
    errors.title = 'Title is required';
  }

  if (!image.trim() || !isValidImageUrl(image)) {
    errors.image = 'Invalid image URL';
  }

  if (isNaN(parseFloat(price)) || price <= 0) {
    errors.price = 'Invalid price';
  }

  if (!isValidNumberplates(numberplates)) {
    errors.numberplates = 'Invalid numberplates format';
  }

  return errors;
}


function isValidImageUrl(url) {
  const urlRegex = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/;
  return urlRegex.test(url);
}


function isValidNumberplates(numberplates) {
  const numberplatesRegex = /^[A-Z]{3}\d{3}$/;
  return numberplatesRegex.test(numberplates);
}


addBtn.addEventListener('click', addProduct)
            