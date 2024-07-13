const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const config = require('./config/config');

const assetRoutes = require('./routes/assetRoutes');
const licenseRoutes = require('./routes/licenseRoutes');
const stockRoutes = require('./routes/stockRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect(config.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/assets', assetRoutes);
app.use('/api/licenses', licenseRoutes);
app.use('/api/stocks', stockRoutes);

// Serve the main HTML file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
