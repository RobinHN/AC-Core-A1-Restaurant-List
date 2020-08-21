// routes/restaurant.js
const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

// set up routes
// restaurant homepage
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .exec((err, restaurants) => { // get all data from Restaurant model
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurants }) // send data to index template
    })
})

// list all restaurant
router.get('/', (req, res) => {
  return res.redirect('/')
})
// create a restaurant page
router.get('/new', (req, res) => {
  return res.render('new')
})
// get detail of a restaurant
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('show', { restaurant: restaurant })
    })
})
// create a restaurant
router.post('/', (req, res) => {
  // 建立 Restaurant model 實例
  const restaurant = new Restaurant({
    name: req.body.name,    // name come from new page
  })
  // store in database
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')  // create done, redirect to homepage
  })
})
// edit restaurant page
router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('edit', { restaurant: restaurant })
    })
})
// edit restaurant
router.put('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
      restaurant.name = req.body.name
      restaurant.name_en = req.body.name_en
      restaurant.category = req.body.category
      restaurant.image = req.body.image
      restaurant.location = req.body.location
      restaurant.phone = req.body.phone
      restaurant.google_map = req.body.google_map
      restaurant.rating = req.body.rating
      restaurant.description = req.body.description
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})
// delete restaurant
router.delete('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

// setting route of /restaurants
module.exports = router