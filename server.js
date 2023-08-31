const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const organRegistryRouter = require('./organRegistry/app');
const panoramaApp = require('./panoramaProject/backend/server.js')
const PORT = process.env.PORT || 3000;

// Handlebars setup
const hbs = exphbs.create({ extname: '.hbs'});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
// Set the views directory for the main Express app
app.set('views', path.join(__dirname, 'organRegistry', 'views'));

// Serve the main portfolio homepage
app.use('/', express.static('homepage'));

// Use the panoramaProject app for /panorama route
app.use('/panorama', panoramaApp);

// Serve the organRegistry project
app.use('/organRegistry', organRegistryRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
