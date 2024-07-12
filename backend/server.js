const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Import the path module

const config = require('./config/config');

const assetRoutes = require('./routes/assetRoutes');
const licenseRoutes = require('./routes/licenseRoutes');
const stockRoutes = require('./routes/stockRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/assets', assetRoutes);
app.use('/api/licenses', licenseRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/items', itemRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Example route for getting the total amount of assets
app.get('/api/assets/total', async (req, res) => {
    try {
        const assets = await Asset.find({});
        const totalQuantity = assets.reduce((sum, asset) => sum + asset.quantity, 0); // Assuming you have a quantity field
        res.json(totalQuantity);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/licenses/total', async (req, res) => {
    try {
        const licenses = await License.find({});
        const totalQuantity = licenses.reduce((sum, license) => sum + license.quantity, 0); // Assuming you have a quantity field
        res.json(totalQuantity);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/stocks/total', async (req, res) => {
    try {
        const stocks = await Stock.find({});
        const totalQuantity = stocks.reduce((sum, stock) => sum + stock.quantity, 0); // Assuming you have a quantity field
        res.json(totalQuantity);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
