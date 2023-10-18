const productsURL = 'http://127.0.0.1:3000/';
const listProducts = 'cars';
const productWrapper = document.getElementById('product-wrapper');

async function fetchData() {
  try {
    const response = await fetch(productsURL+listProducts);
    const productsArray = await response.json();
    return productsArray;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function deleteProduct(productId) {
  try {
    const response = await fetch(`${productsURL}${listProducts}/${productId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log(`Product ${productId} deleted successfully`);
      
    } else {
      console.error('Error deleting product');
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}





async function displayData() {
  const dataToDisplay = await fetchData();
  productWrapper.innerHTML = '';

  if (dataToDisplay.length === 0) {
    const noDataMessage = document.createElement('div');
    noDataMessage.textContent = 'Siuo metu automobiliu neturim';
    productWrapper.append(noDataMessage);
    return; 
  }
  dataToDisplay.forEach(product => {
    const card = document.createElement('div');
    card.setAttribute('class', "card");
    const numberplateAndTitleWrapper = document.createElement('div');
    const title = document.createElement('div');
    title.textContent =  product.title;
    const numberplate = document.createElement('div');
    numberplate.textContent = product.numberplates;
    numberplate.setAttribute('class','numberplate');
    numberplateAndTitleWrapper.append(numberplate, title)
    numberplateAndTitleWrapper.setAttribute('class','numberplateAndTitleWrapper')
    const imageWrapper = document.createElement('div');
    const image = document.createElement('img');
    image.src = product.image;
    imageWrapper.append(image);
    const deleteBtnWrapper = document.createElement('div');
    deleteBtnWrapper.setAttribute('class','delete-wrapper')
    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute('class','delete-button');
    deleteBtn.textContent = "DELETE";
    deleteBtn.setAttribute('data-product-id', product.id); 
    deleteBtn.addEventListener('click', (event) => {
      const productId = event.target.getAttribute('data-product-id');
      deleteProduct(productId);
      setTimeout(() => {
        productWrapper.innerHTML = '';
        location.href = './index.html';
    }, 1000);
    });
    deleteBtnWrapper.append(deleteBtn);

    card.append(numberplateAndTitleWrapper,imageWrapper,deleteBtnWrapper);
    
    productWrapper.append(card);
  });

  
}

displayData();

