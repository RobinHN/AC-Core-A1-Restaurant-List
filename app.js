const express = require('express')
const app = express()
const mongoose = require('mongoose')               // 載入mongoose

// require express-handlebars here
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// require body-parser
const bodyParser = require('body-parser')
// setting bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })  // 設定連線到 mongoDB

// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 載入 restaurantlist model
const Restaurant = require('./models/restaurant')
const restaurant = require('./models/restaurant')

// set up routes
// restaurant homepage
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .exec((err, restaurants) => { // get all data from Restaurant model
      if (err) return console.error(err)
      return res.render('index', { restaurants: restaurants }) // send data to index template
    })
})

// list all restaurant
app.get('/restaurants', (req, res) => {
  return res.redirect('/')
})
// create a restaurant page
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})
// get detail of a restaurant
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('show', { restaurant: restaurant })
    })
})
// create a restaurant
app.post('/restaurants', (req, res) => {
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
app.post('/restaurants/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id)
    .lean()
    .exec((err, restaurant) => {
      if (err) return console.error(err)
      return res.render('edit', { restaurant: restaurant })
    })
})
// edit restaurant
app.post('/restaurants/:id/edit', (req, res) => {
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
// edit restaurant page
app.post('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

app.listen(3000, () => {
  console.log('App is running!')
})


// require packages used in the project
/*const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurants.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// route setting
app.get('/', (req, res) => {
  // past the restaurant data into 'index' partial template
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {

  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})*/