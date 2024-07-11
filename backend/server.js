const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// Temporary in-memory storage
const items = [];

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Get all items
app.get('/items', (req, res) => {
    res.json(items);
});

// Get an item by ID
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    res.json(item);
});

// Add a new item
app.post('/items', (req, res) => {
    const newItem = { id: Date.now(), ...req.body };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Update an item by ID
app.put('/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id == req.params.id);
    if (index !== -1) {
        items[index] = { ...items[index], ...req.body };
        res.json(items[index]);
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});

// Delete an item by ID
app.delete('/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id == req.params.id);
    if (index !== -1) {
        items.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Item not found' });
    }
});


// Serve the main HTML file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

//
app.get('/api/assets/total', async (req, res) => {
    try {
        const assets = await Asset.find({});
        const totalAmount = assets.reduce((sum, asset) => sum + asset.totalAmount, 0);
        res.json(totalAmount);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/licenses/total', async (req, res) => {
    try {
        const licenses = await License.find({});
        const totalAmount = licenses.reduce((sum, license) => sum + license.totalAmount, 0);
        res.json(totalAmount);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/stocks/total', async (req, res) => {
    try {
        const stocks = await Stock.find({});
        const totalAmount = stocks.reduce((sum, stock) => sum + stock.totalAmount, 0);
        res.json(totalAmount);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
