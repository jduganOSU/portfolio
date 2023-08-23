const express = require('express');
const router = express.Router();
const dbQueries = require('../database/dbQueries');


// page load
router.get('/', async (req, res) => {
    try {
      const donors = await dbQueries.getDonorsPage();

  
      res.render('Donors', {data: donors.rows});
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

  // adding a row to the table
router.post('/add-donor-ajax', function(req, res) {
  let data = req.body;

  dbQueries.addDonor(data)
  .then(() => dbQueries.getDonors())
  .then(rows => res.send(rows))
  .catch(error => {
      console.log(error);
      res.sendStatus(400);
  });
});

  module.exports = router;