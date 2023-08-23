const express = require('express');
const router = express.Router();
const dbQueries = require('../database/dbQueries');


// page load
router.get('/', async (req, res) => {
    try {
      const list = await dbQueries.getOrganListPage();

  
      res.render('List', {data: list.rows});
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });


// adding a row to the table
router.post('/add-list-ajax', function(req, res) {
  let data = req.body;


  dbQueries.addOrganList(data)
  .then(() => dbQueries.getOrganList())
  .then(rows => res.send(rows))
  .catch(error => {
      console.log(error);
      res.sendStatus(400);
  });
});



  module.exports = router;