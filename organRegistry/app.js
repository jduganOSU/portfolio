var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var hbs = exphbs.create({extname: 'hbs'});

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.engine('.hbs', hbs.engine);  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

require('./views/helpers/handlebars-helpers')(hbs);
const PORT = process.env.PORT || 4659;
// Import routes
var organRoutes = require('./routes/organRoutes');
var donorRoutes = require('./routes/donorRoutes');
var recipientRoutes = require('./routes/recipientRoutes');
var transplantRoutes = require('./routes/transplantRoutes');
var matchRoutes = require('./routes/matchRoutes');
var listRoutes = require('./routes/listRoutes');


// Import database queries
var db = require('./database/db-connector');

app.get('/', function(req, res) {
    return res.render('Index.hbs');
});

app.get('/Test', function(req, res) {
    return res.render('test.hbs')
});

// Use routes
app.use('/Organs', organRoutes);
app.use('/Donors', donorRoutes);
app.use('/Recipients', recipientRoutes);
app.use('/Transplants', transplantRoutes);
app.use('/Match', matchRoutes);
app.use('/List', listRoutes);
// ...

// Listener
app.listen(PORT, function() {
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});
