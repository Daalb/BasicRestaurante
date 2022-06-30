/**
 * @description File that contain the endpoints
 */
//*Libraries
const express = require('express');
const router = express.Router();

//*Controllers
const { getDishes, getDish, createDish, updateDish, deleteDish } = require('../controller/restaurant.controller');

//*Routes
//* Get all dishes route
router.get('/restaurant',getDishes);

//*Get one dish route
router.get('/restaurant/:id', getDish);


//*Create a dish route
router.post('/restaurant', createDish);

//*Update a dish route
router.put('/restaurant/:id', updateDish);


//*Delete a dish route
router.delete('/restaurant/:id', deleteDish);


module.exports = router;