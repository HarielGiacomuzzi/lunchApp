const seedData = require('./seed.js');
var bodyParser = require('body-parser')
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true })); 


app.use(express.static('./public/'));

// routes -------------------------------------------------------------
app.get('/getRestaurants', function (req, res) {
  res.send(JSON.stringify(seedData));
})

app.post('/setVote', function (req, res) {
  console.log('DATA: ', req.body)
  res.send();
})

 // application -------------------------------------------------------------
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function () {
  console.log('Lunch App server running on port 3000!')
})