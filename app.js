var express = require('express')
var app = express()
var routeController = require('./controllers/routeController')
var port = 3000

app.set('view engine', 'ejs') //To use ejs file. This will internally look into ejs files in views folder
app.use(express.static('./files')) //To use static files like css, images etc. here we given the  const path = require('path');

routeController(app)

app.listen(port)
console.log("App is running in port: " + port)
