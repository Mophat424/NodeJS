let productList = [];

// Function to fetch products
async function fetchProducts() {
    const response = await fetch('http://localhost:3000/products');
    productList = await response.json();
    populateProducts();
}

function populateProducts() {
    const productCard = document.getElementById('productCard');
    productCard.innerHTML = '';

    productList.forEach((product) => {
        const eachProduct = document.createElement('div');
        eachProduct.className = 'product-card';

        eachProduct.innerHTML = `
            <img src="${product.imageUrl}" alt=""> 
            <h2>${product.title}</h2>
            <span>${product.date}</span>
            <p>${product.location}</p>
            <p class="price">Sh ${product.price}</p>
            <button onclick="viewProduct(${product.id})">View</button>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        `;

        productCard.appendChild(eachProduct);
    });
}

async function addProduct() {
    // Get data from a form (you need to create a form to collect this data)
    const newProduct = {
        title: 'New Product', // Replace with form values
        price: 100, // Replace with form values
        date: 'January 1, 2023', // Replace with form values
        location: 'Location', // Replace with form values
        imageUrl: 'https://example.com/image.jpg' // Replace with form values
    };

    const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    });

    if (response.ok) {
        fetchProducts(); // Refresh product list
    }
}

async function editProduct(productId) {
    const product = productList.find(item => item.id === productId);
    
    // Create a form to edit product (similar to adding a product)
    const updatedProduct = {
        ...product,
        title: prompt('Edit title:', product.title),
        price: parseFloat(prompt('Edit price:', product.price)),
        date: prompt('Edit date:', product.date),
        location: prompt('Edit location:', product.location),
        imageUrl: prompt('Edit image URL:', product.imageUrl)
    };

    const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
    });

    if (response.ok) {
        fetchProducts(); // Refresh product list
    }
}

async function deleteProduct(productId) {
    const response = await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        fetchProducts(); // Refresh product list
    }
}

function viewProduct(productId) {
    const product = productList.find(item => item.id === productId);
    const popupContent = document.getElementById('popup-content');
    popupContent.innerHTML = `
        <strong>Title:</strong> ${product.title}<br>
        <strong>Price:</strong> Sh ${product.price}<br>
        <strong>Date:</strong> ${product.date}<br>
        <strong>Location:</strong> ${product.location}<br>
        <img src="${product.imageUrl}" alt="" style="max-width: 100%;">
    `;
    document.getElementById('product-popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('product-popup').style.display = 'none';
}

// Event listener for adding product button
document.getElementById('add-product-btn').addEventListener('click', addProduct);


fetchProducts();
