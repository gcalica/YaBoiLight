const express = require('express');
const router = express.Router();
const controller = require('../controller');

router.route('/discover').get((req, res) => {
  controller.initServer();
  controller.initClient();
  res.status(200).send({ message: 'success' });
});

// router.route('/bulbs').post((req, res) => {
//   const bulb = new Bulb();
// });

module.exports = router;
