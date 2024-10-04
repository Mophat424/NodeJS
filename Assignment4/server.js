const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());

const todos = [
    {
        id: 1,
        title: "Complete homework",
        description: "Finish math and science assignments before tomorrow",
        completed: false
    },
    {
        id: 2,
        title: "Grocery shopping",
        description: "Buy vegetables, fruits, and bread for the week",
        completed: true
    },
    {
        id: 3,
        title: "Clean the house",
        description: "Vacuum, dust, and mop the living room and kitchen",
        completed: false
    },
    {
        id: 4,
        title: "Pay bills",
        description: "Pay electricity and internet bills online",
        completed: true
    },
    {
        id: 5,
        title: "Call mom",
        description: "Check in with mom and discuss weekend plans",
        completed: false
    }
];

// Sample product data
const addedDataJSON = [
    {
        "id": 1,
        "imageUrl": "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        "title": "Summer Music Festival",
        "price": 50,
        "date": "August 20, 2021",
        "location": "Central Park, New York City",
        "company": "Music Festivals Inc.",
    },
    // ... other products
];

// Route to get todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// CRUD operations for products
app.get('/products', (req, res) => {
    res.json(addedDataJSON);
});

// Add a new product
app.post('/products', (req, res) => {
    const newProduct = req.body;
    newProduct.id = addedDataJSON.length ? addedDataJSON[addedDataJSON.length - 1].id + 1 : 1; // Auto-increment ID
    addedDataJSON.push(newProduct);
    res.status(201).json(newProduct);
});

// Update a product
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const productIndex = addedDataJSON.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
        const updatedProduct = { ...addedDataJSON[productIndex], ...req.body };
        addedDataJSON[productIndex] = updatedProduct;
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Delete a product
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const productIndex = addedDataJSON.findIndex(product => product.id === productId);

    if (productIndex !== -1) {
        addedDataJSON.splice(productIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
