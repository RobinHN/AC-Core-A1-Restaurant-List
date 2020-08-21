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

// require method-override
const methodOverride = require('method-override')

// setting bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

// setting method-override
app.use(methodOverride('_method'))

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

// require routes
app.use('/', require('./routes/home'))
app.use('/restaurants', require('./routes/restaurant'))

app.listen(3000, () => {
  console.log('App is running!')
})