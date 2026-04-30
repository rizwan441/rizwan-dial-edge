const express = require('express');
const client = require('prom-client');
require('dotenv').config(); // THIS loads your .env file

const app = express();
const PORT = process.env.PORT || 3000;  // Reads PORT from .env
const SECRET_MESSAGE = process.env.SECRET_MESSAGE;  // Reads secret from .env

// Prometheus metrics
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date(),
    environment: process.env.NODE_ENV  // Shows current environment
  });
});

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Main endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Production CI/CD Pipeline!',
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    secretMessage: SECRET_MESSAGE,  // This comes from .env file
    version: process.env.APP_VERSION || '1.0.0',
    timestamp: new Date()
  });
});

// Only start server if not in test mode
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ App running on port ${PORT}`);
    console.log(`📁 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔐 Secret message: ${SECRET_MESSAGE}`);
    console.log(`📊 Metrics: http://localhost:${PORT}/metrics`);
  });
}

module.exports = app;