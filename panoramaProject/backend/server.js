const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const { getOpenAiResponse } = require('./controllers/openaiController'); 
const panos = require('./controllers/databaseController')
const path = require('path');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, '../frontend/build')));

// chatgpt route
app.post('/openai', getOpenAiResponse)

// Database routes
// Create (add) to database
app.post('/favPanos', (req, res) => {
    panos.createPanorama(
        req.body.latitude,
        req.body.longitude,
        req.body.description
    )
    .then(panorama => {
        res.status(201).json(panorama)
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({error: "User error, failed to create a new panorama."});
    });
  });

// Retrieve data from database
  app.get('/favPanos', (req, res) => {
    panos.retrievePanorama()
    .then(panorama => {
        if (panorama === null) {
            res.status(404).json({ error: 'Error. Panorama not found.'});
        } else {
            res.json(panorama);
        }
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ error: 'Error. User input was incorrect.'})
    });
  });

app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
    });

module.exports = app;