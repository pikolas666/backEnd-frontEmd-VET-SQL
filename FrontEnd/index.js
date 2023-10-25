const productsURL = 'http://127.0.0.1:3000/';
const listProducts = 'pets';
const productWrapper = document.getElementById('product-wrapper');
const messageElement = document.getElementById('message');

async function fetchData() {
  try {
    const response = await fetch(productsURL + listProducts);
    const productsArray = await response.json();
    return productsArray;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function deleteProduct(productId) {
  try {
    const response = await fetch(`${productsURL}${listProducts}/${productId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      displayMessage('Pet deleted successfully', 'green');
    } else {
      displayMessage('Error deleting the pet', 'red');
    }
  } catch (error) {
    console.error('Network error:', error);
    displayMessage('Network error', 'red');
  }
}

function displayMessage(messageText, color) {
  messageElement.textContent = messageText;
  messageElement.style.color = color;
  messageElement.style.display = 'block';

  // Hide the message after 2 seconds
  setTimeout(function () {
    messageElement.style.display = 'none';
  }, 2000);
}

async function displayData() {
  const dataToDisplay = await fetchData();
  productWrapper.innerHTML = '';

  if (dataToDisplay.length === 0) {
    const noDataMessage = document.createElement('div');
    noDataMessage.textContent = 'No pets to display';
    productWrapper.append(noDataMessage);
    return;
  }
  dataToDisplay.forEach((product) => {
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    card.innerHTML = `
    <div class="pet-name">${product.name}</div>
    <div class="dateAndMail-wrapper">
      <div>${product.dob}</div>
      <div>${product.client_email}</div>
    </div>
    `;
    const btnWrapper = document.createElement('div');
    btnWrapper.setAttribute('class', 'btnWrapper');
    const logBtn = document.createElement('button');
    logBtn.setAttribute('class', 'log-button');
    logBtn.textContent = 'VIEW LOG';
    logBtn.addEventListener('click', () => {
      localStorage.setItem('productId', product.id);
      localStorage.setItem('logId', product.log_id);
      setTimeout(() => {
        location.href = './log.html';
      }, 1000);
    });
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'delete-button');
    deleteBtn.textContent = 'DELETE';
    deleteBtn.setAttribute('data-product-id', product.id);
    deleteBtn.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('data-product-id');
      deleteProduct(productId);
      setTimeout(() => {
        productWrapper.innerHTML = '';
        location.href = './index.html';
      }, 2000);
    });
    btnWrapper.append(logBtn, deleteBtn);

    card.append(btnWrapper);
    productWrapper.append(card);
  });
}

displayData();
