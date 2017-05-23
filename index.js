'use strict';

var staticData = require('./seed.js').restaurants;
var bodyParser = require('body-parser');
var express = require('express');
var app = module.exports = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;
var alreadyVoted = [];


app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  


app.use(express.static('./public/'));

// routes -------------------------------------------------------------
app.route('/restaurants')
  .get((req, res)=>{
    res.send(staticData);
  })
  .post((req,res) => {
      let restautantId = req.body.restaurantId;
      let email = req.body.email;
      let hasVoted = alreadyVoted.find((item)=>{
          return item === email;
      });
      if(!hasVoted){
          staticData.forEach(function(restautant) {
              if(restautant._id === restautantId){
                  restautant.totalVotes++;
                  io.emit('newVote', restautant);
              }
          });
          alreadyVoted.push(email)
      }
    }
  );

 // application -------------------------------------------------------------
app.get('*', function (req, res) {
    res.send(__dirname + '/public/index.html');
});

app.listen(port, function () {
  console.log('Lunch App server running on port 3000!')
})