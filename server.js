const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Serve static files
app.use(express.static('.'));

// Basic route
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const htmlContent = fs.readFileSync(indexPath, 'utf8');
    res.send(htmlContent);
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

// Webhook endpoint for Pipedrive
app.use(express.json()); // Parse JSON bodies

app.post('/webhook', (req, res) => {
    console.log('🎣 Webhook received:', req.body);
    
    const event = req.body;
    
    // Log the deal event
    if (event && event.current) {
        console.log(`📋 Deal Event: ${event.event} - Deal ID: ${event.current.id} - Title: ${event.current.title}`);
    }
    
    // Respond to Pipedrive
    res.json({
        status: 'OK',
        message: 'Webhook processed successfully!',
        received_at: new Date().toISOString(),
        event_type: event.event || 'unknown'
    });
});

// Export for Vercel
module.exports = app;

// For local development
if (require.main === module) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`🚀 Hello Pipedrive App running at http://localhost:${PORT}`);
        console.log(`📋 Open this URL in your browser to test: http://localhost:${PORT}`);
    });
}