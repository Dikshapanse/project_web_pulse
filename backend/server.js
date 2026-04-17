/**
 * Web Pulse Backend Server
 * Main entry point for the monitoring application backend.
 * Handles authentication, website monitoring management, and API documentation.
 */

const express = require('express');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const authRoutes = require('./src/modules/userauth/userauth_routes');
const websiteRoutes = require('./src/modules/websiteMonitor/website_routes');
const monitorService = require('./src/modules/websiteMonitor/monitor_service');

const app = express();

// Initialize the background monitoring service that checks website status at set intervals
monitorService.initMonitor();



const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Web Pulse API Documentation',
            version: '1.0.0',
            description: 'API for Web Pulse Monitoring App',
        },
        servers: [
            {
                url: 'http://127.0.0.1:5000',

            },
        ],
    },
    apis: ['./src/modules/**/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json());

// Main Auth Routes Integration
app.use('/api/userauth', authRoutes);
app.use('/api/websites', websiteRoutes);


app.get('/', (req,res)=>{
    res.send("Web Pulse Backend Running with Complete Authentication and Swagger!");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
