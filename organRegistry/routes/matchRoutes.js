const express = require('express');
const router = express.Router();
const dbQueries = require('../database/dbQueries');


// page load
router.get('/', async (req, res) => {
    try {
      const matches = await dbQueries.getMatchPage();
      const organs_data = await dbQueries.getOrgans();
      const recipients_data = await dbQueries.getRecipients();
  
      res.render('Match', {data: matches.rows, organs: organs_data.rows, recipients: recipients_data.rows});
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });


// adding a row to the table
router.post('/add-match-ajax', function(req, res) {
  let data = req.body;
  
  dbQueries.addMatch(data)
  .then(() => dbQueries.getMatchPage())
  .then(rows => res.send(rows))
  .catch(error => {
      console.log(error);
      res.sendStatus(400);
  });
});


// updating a match
router.put('/put-match-ajax', function(req, res) {
  let data = req.body;

  dbQueries.updateMatch(data)
  .then(() => dbQueries.getMatchPage())
  .then(rows => res.send(rows))
  .catch(error => {
    console.log(error);
    res.sendStatus(400);
  });
});


// delete a row
router.delete('/delete-match-ajax', function(req, res) {
  let data = req.body;

  dbQueries.deleteMatch(data)
  .then(() => dbQueries.getMatch())
  .then(() => res.sendStatus(204))
  .catch(error => {
    console.log(error);
    res.sendStatus(400);
  });
});

module.exports = router;