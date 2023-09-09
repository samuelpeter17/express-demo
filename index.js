const express = require('express');
const app = express();

// Import tiers data
const tiers = require('./tiers');

// Middleware function to log request information
function requestLogger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}

app.use(requestLogger);

// Define routes
app.get('/data', (req, res) => {
    res.json(tiers);
});

app.get('/data/:id', (req, res) => {
    const id = req.params.id;
    const tier = tiers.find(tier => tier.id === id);

    if (!tier) {
        return res.status(404).json({ message: 'Tier not found' });
    }

    res.json(tier);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
