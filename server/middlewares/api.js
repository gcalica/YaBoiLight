const express = require('express');
const router = express.Router();
// const Bulb = require('../../app/models/bulb');

router.use((req, res, next) => {
  console.log('Something is happening.');
  next();
});

router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

// router.route('/bulbs').post((req, res) => {
//   const bulb = new Bulb();
// });

module.exports = router;
