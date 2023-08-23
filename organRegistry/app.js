var express = require('express');
var router = express.Router();
var exphbs = require('express-handlebars');
var hbs = exphbs.create({extname: 'hbs'});

router.use(express.json())
router.use(express.urlencoded({extended: true}))
router.use(express.static('public'))

require('./views/helpers/handlebars-helpers')(hbs);

// Import routes
var organRoutes = require('./routes/organRoutes');
var donorRoutes = require('./routes/donorRoutes');
var recipientRoutes = require('./routes/recipientRoutes');
var transplantRoutes = require('./routes/transplantRoutes');
var matchRoutes = require('./routes/matchRoutes');
var listRoutes = require('./routes/listRoutes');


router.get('/', function(req, res) {
    return res.render('Index.hbs');
});


// Use routes
router.use('/Organs', organRoutes);
router.use('/Donors', donorRoutes);
router.use('/Recipients', recipientRoutes);
router.use('/Transplants', transplantRoutes);
router.use('/Match', matchRoutes);
router.use('/List', listRoutes);
// ...

module.exports = router;