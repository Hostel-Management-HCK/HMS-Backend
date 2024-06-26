const express = require('express');
const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require("cors");
const routes = require('./routes/index.routes'); // Importing index routes
const updatePaymentStatus = require('./paymentAutoUpdater'); // Import function to auto update payment status
dotenv.config();

// Middleware
app.use(morgan("dev")); // Logging middleware
app.use(bodyParser.json()); // Body parsing middleware

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HostelStays Api Services',
      version: '1.0.0',
      description: 'API for a hostel management system "HostelStays"',
    },
    security: [{ bearerAuth: [] }],
    components:{
      securitySchemes:{ 
        bearerAuth: {
          type : 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./routes/*.js', './models/*.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger middleware

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connected!!!"))
    .catch(err => console.error("Database Connection Error:", err.message));

app.use(cors());

// Routes
app.use('/api', routes); // Mounting index routes

// Function to update payment status (billing) automatically daily
updatePaymentStatus();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`HostelStays Backend Services is listening on port: ${port}`);
    console.log(`View the docs at http://localhost:${port}/api-docs/`);
});