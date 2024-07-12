const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const config = require('./config/config');

const assetRoutes = require('./routes/assetRoutes');
const licenseRoutes = require('./routes/licenseRoutes');
const stockRoutes = require('./routes/stockRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/assets', assetRoutes);
app.use('/api/licenses', licenseRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/items', itemRoutes);

// Temporary in-memory storage for items
const items = [];

app.use(bodyParser.json());
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
