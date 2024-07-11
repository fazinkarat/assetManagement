const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const dataFile = 'data.json';

// Initialize data file if not exists
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ items: [] }, null, 2));
}

// Read items
app.get('/items', (req, res) => {
    const data = JSON.parse(fs.readFileSync(dataFile));
    res.json(data.items);
});

// Add item
app.post('/items', (req, res) => {
    const newItem = req.body;
    const data = JSON.parse(fs.readFileSync(dataFile));
    data.items.push(newItem);
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
    res.status(201).json(newItem);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
