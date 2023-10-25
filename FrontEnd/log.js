const itemId = localStorage.getItem('productId');
const productsURL = 'http://127.0.0.1:3000/';
const listPrescriptions = 'prescriptions';
const listLogs = 'logs';
const productWrapper = document.getElementById('product-wrapper');
const message = document.createElement('div');
message.setAttribute('class', 'message');
message.style.display = 'none';
productWrapper.append(message);
let showLogs = true;

document.getElementById('logs-filter').addEventListener('click', function () {
  showLogs = true;
  init(itemId);
});

document.getElementById('prescriptions-filter').addEventListener('click', function () {
  showLogs = false;
  init(itemId);
});


async function getProductCard(itemId, isLogs) {
  try {
    const endpoint = isLogs ? listLogs : listPrescriptions;
    const response = await fetch(`${productsURL}${endpoint}/${itemId}`);
    const product = await response.json();
    return product;
  } catch (err) {
    console.log("error", err);
  }
}

function updateCardUI(product) {
  const list = document.getElementById('list');
  list.textContent = `${product[0].pet_name}: Health Records`;

  productWrapper.innerHTML = '';

  const cards = [];

  product.forEach((element) => {
    if (showLogs && element.log_description) {
      const logsCard = createLogsCard(element);
      cards.push(logsCard);
    } else if (!showLogs && element.comment) {
      const prescriptionsCard = createPrescriptionsCard(element);
      console.log(prescriptionsCard)
      cards.push(prescriptionsCard);
    }
  });

  if (cards.length === 0) {
    const noDataMessage = document.createElement('div');
    
    noDataMessage.textContent = 'No records to display Updatecard ui.';
    productWrapper.append(noDataMessage);
  } else {
    cards.forEach((card) => {
      productWrapper.append(card);
    });
  }
}


function createLogsCard(element) {
  const logsCard = document.createElement('div');
  logsCard.setAttribute('class', 'card');

  const status = element.log_status;
  const isDone = status ? 'Scheduled' : 'Done';
  const statusFontColor = status ? 'red' : 'green';

  logsCard.innerHTML = `<div class="pet-name">${element.log_description}</div>
    <div>Status: <span style="color: ${statusFontColor}">${isDone}</span></div>
    <div class="checkbox-wrapper">
        <label for="checkbox${element.log_id}">Mark as done</label>
        <input id="checkbox${element.log_id}" class="checkbox" type="checkbox">
    </div>`;

  return logsCard;
}

function createPrescriptionsCard(element) {
  const prescriptionsCard = document.createElement('div');
  prescriptionsCard.setAttribute('class', 'card');
  const dateString = element.timestamp;

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  
  prescriptionsCard.innerHTML = `<div class="pet-name">Medicine: ${element.name}</div>
    <div>Comment: ${element.comment}</div>
    <div>Prescription Date: ${formattedDate}</div>`;

  return prescriptionsCard;
}

async function init() {
  const card = await getProductCard(itemId, showLogs);
  if (card) {
    updateCardUI(card);
    card.forEach((element) => {
      if (element.log_id) { 
        const checkbox = document.getElementById(`checkbox${element.log_id}`);
        checkbox.addEventListener('change', async function () {
          try {
            const response = await fetch(productsURL + listLogs + '/' + element.log_id, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ status: checkbox.checked }),
            });

            if (response.status === 200) {
              displayMessage("Done", "green");
              setTimeout(function () {
                message.style.display = 'none';
                setTimeout(function () {
                  window.location.reload();
                }, 2000);
              }, 2000);
            } else {
              displayMessage("Failed to update log status", "red");
            }
          } catch (err) {
            displayMessage("Error: " + err, "red");
          }
        });
      }
    });
  }
}

function displayMessage(text, color) {
  message.textContent = text;
  message.style.color = color;
  message.style.display = 'block';
}

init();
