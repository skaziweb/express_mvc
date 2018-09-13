const express = require('express');
const router = express.Router();
const errController = require('../controllers/err')

module.exports = router.get('/test', errController.testRoute)
module.exports = router.get('/*', errController.err)