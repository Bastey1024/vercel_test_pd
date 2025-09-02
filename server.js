const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files
app.use(express.static('.'));

// Basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Pipedrive Hello App is running!' });
});

// OAuth callback (if needed)
app.get('/callback', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Callback received!',
        query: req.query 
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Hello Pipedrive App running at http://localhost:${PORT}`);
    console.log(`📋 Open this URL in your browser to test: http://localhost:${PORT}`);
});