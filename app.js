const express = require('express')
const app = express()
const mongoose = require('mongoose')               // 載入mongoose

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

// set up routes
// restaurant homepage
app.get('/', (req, res) => {
  res.send('restaurant in your pocket')
})

// list all restaurant
app.get('/restaurants', (req, res) => {
  res.send('list all restaurants')
})
// create a restaurant page
app.get('/restaurants/new', (req, res) => {
  res.send('create a restaurant page')
})
// get detail of a restaurant
app.get('/restaurants/:id', (req, res) => {
  res.send('get detail of a restaurant')
})
// create a restaurant
app.post('/restaurants', (req, res) => {
  res.send('create a restaurant')
})
// edit restaurant page
app.post('/restaurants/:id/edit', (req, res) => {
  res.send('edit a restaurant page')
})
// edit restaurant
app.post('/restaurants/:id/edit', (req, res) => {
  res.send('edit a restaurant')
})
// delete restaurant
// edit restaurant page
app.post('/restaurants/:id/delete', (req, res) => {
  res.send('delete a restaurant')
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