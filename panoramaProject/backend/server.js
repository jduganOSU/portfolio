const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const { getOpenAiResponse } = require('./controllers/openaiController'); 
const panos = require('./controllers/databaseController')



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Backend server is running');
});

// chatgpt route
app.post('/openai', getOpenAiResponse)

// Database routes
// Create (add) to database
app.post('/favPanos', (req, res) => {
    console.log('Recieved POST');
    console.log('Req. Body: ', req.body);
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

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
