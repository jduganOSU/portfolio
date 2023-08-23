const express = require('express');
const router = express.Router();
const dbQueries = require('../database/dbQueries');


// page load
router.get('/', async (req, res) => {
    try {
      const recipients = await dbQueries.getRecipientsPage();
      const organList_data = await dbQueries.getOrganList();
      const donors_data = await dbQueries.getDonors();
      
      res.render('Recipients', {data: recipients.rows, organList: organList_data.rows, donors: donors_data.rows});
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });


// adding a row to the table
router.post('/add-recipient-ajax', function(req, res) {
  let data = req.body;

  dbQueries.addRecipient(data)
  .then(() => dbQueries.getRecipientsPage())
  .then(rows => res.send(rows))
  .catch(error => {
      console.log(error);
      res.sendStatus(400);
  });
});


// updating a Recipients info
router.put('/put-recipient-ajax', function(req, res) {
  let data = req.body;

  dbQueries.updateRecipient(data)
  .then(() => dbQueries.getRecipientsPage())
  .then(rows => res.send(rows))
  .catch(error => {
    console.log(error);
    res.sendStatus(400);
  });
});

module.exports = router;