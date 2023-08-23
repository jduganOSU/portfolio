const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const organRegistryRouter = require('./organRegistry/app');
const PORT = 3000;

// Handlebars setup
const hbs = exphbs.create({ extname: '.hbs'});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
// Set the views directory for the main Express app
app.set('views', path.join(__dirname, 'organRegistry', 'views'));

// Serve the main portfolio homepage
app.use('/', express.static('homepage'));

// Serve the organRegistry project
app.use('/organRegistry', organRegistryRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
