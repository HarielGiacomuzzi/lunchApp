const seedData = require('./seed.js');
var port = process.env.PORT || 3000;
var express = require('express');
var app = express();

app.use(express.static('./public/'));

app.get('/getRestaurants', function (req, res) {
  res.send(seedData);
})

 // application -------------------------------------------------------------
app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, function () {
  console.log('Lunch App server running on port 3000!')
})