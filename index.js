let restaurant = require('./lib/restaurant.js');
var bodyParser = require('body-parser')
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  


app.use(express.static('./public/'));

// routes -------------------------------------------------------------
app.route('/getRestaurants')
  .get(restaurant.getRestaurants)
  .post(restaurant.updateVotes)

 // application -------------------------------------------------------------
app.get('*', function (req, res) {
    res.render(__dirname + '/public/index.html');
});

app.listen(port, function () {
  console.log('Lunch App server running on port 3000!')
})