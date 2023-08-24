const express = require('express');
const router = express.Router();
const dbQueries = require('../database/dbQueries');


router.get('/', async (req, res) => {
  try {
    const organs_data = await dbQueries.getOrgansPage();
    const donors_data = await dbQueries.getDonors();
    const organList_data = await dbQueries.getOrganList();

    res.render('Organs', {data: organs_data.rows, donors: donors_data.rows, organList: organList_data.rows });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


// adding a row to the table
router.post('/add-organ-ajax', function(req, res) {
    let data = req.body;

    dbQueries.addOrgan(data)
    .then(() => dbQueries.getOrgansPage())
    .then(rows => res.send(rows))
    .catch(error => {
        console.log(error);
        res.sendStatus(400);
    });
});


// updating an organs info
router.put('/put-organ-ajax', function(req, res) {
    let data = req.body;

    dbQueries.updateOrgan(data)
    .then(() => dbQueries.getOrgansPage())
    .then(rows => res.send(rows))
    .catch(error => {
      console.log(error);
      res.sendStatus(400);
    });
});


// delete a row
router.delete('/delete-organ-ajax', function(req, res) {
  let data = req.body;

  dbQueries.deleteOrgan(data.organID)
  .then(() => res.sendStatus(204))
  .catch(error => {
    console.log(error);
    res.sendStatus(400);
  });
});


module.exports = router;
