// routes/home.js
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// restaurant homepage
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .exec((err, restaurants) => { // get all data from Restaurant model
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurants }) // send data to index template
    })
})

module.exports = router