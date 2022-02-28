" use strict"

const serverless = require('serverless-http');
var express = require('express')
var app = express()
var cors = require('cors')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get('/v1/weather',get_weather_v1)
app.get('/v1/hello',get_hello)
app.post('/v1/auth',post_auth)

const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlBhdmFuIiwiaWF0IjoxNTE2MjM5MDIyfQ.x4WyTjDgssFcm71b_nyx5FAB9HwSSFwOQrX6hGMbeg8"
function get_weather_v1(request, response) {
    if(request.headers.authorization == `Bearer ${access_token}`)
       response.json({"coord":{"lon":-123.262,"lat":44.5646},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":282.61,"feels_like":282.61,"temp_min":280.58,"temp_max":285.29,"pressure":1018,"humidity":84},"visibility":10000,"wind":{"speed":0.89,"deg":225,"gust":0.89},"clouds":{"all":0},"dt":1642038331,"sys":{"type":2,"id":2040223,"country":"US","sunrise":1642002454,"sunset":1642035291},"timezone":-28800,"id":5720727,"name":"Corvallis","cod":200})
    response.json("Invalid")
}

function get_hello(req,res){
    if(req.headers.authorization == `Bearer ${access_token}` )
      res.json({"hello": "Hi I am Pavan"})
    res.json("Invalid")
}

function post_auth(req,res){
    let usernames = ['Pavan','Virat','Sai']
    let passwords = ['123','456','789']
    // const obj = JSON.parse(req.body)
    let username = req.body.username
    let pwd = req.body.password

    if(usernames.includes(username)){
      if(passwords.includes(pwd)){
          res.json({
            "access-token": access_token,
            "expires": new Date()
          })
      }
  }
}
// app.listen(3000)
// console.log('Node.js Express server is running on port 3000..')

//Remember to have the same handler as export in yml file
module.exports.handler = serverless(app);
    
