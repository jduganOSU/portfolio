const express = require('express');
const router = express.Router();
const dbQueries = require('../database/dbQueries');


// page load
router.get('/', async (req, res) => {
    try {
      const transplants = await dbQueries.getTransplantsPage();
      const organs_data = await dbQueries.getOrgans();
      const recipients_data = await dbQueries.getRecipients();

  
      res.render('Transplants', {data: transplants.rows, organs: organs_data.rows, recipients: recipients_data.rows});
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });


  // adding a row to the table
router.post('/add-transplant-ajax', function(req, res) {
  let data = req.body;

  dbQueries.addTransplant(data)
  .then(() => dbQueries.getTransplantsPage())
  .then(rows => res.send(rows))
  .catch(error => {
      console.log(error);
      res.sendStatus(400);
  });
});

  module.exports = router;