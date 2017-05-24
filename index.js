'use strict';

var staticData = require('./seed.js').restaurants;
var bodyParser = require('body-parser');
var express = require('express');
var app = module.exports = express();

var differenceInDays = require('date-fns/difference_in_days')
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
    var data = staticData.filter((item)=>{
      if(item.lastWin){
        return differenceInDays(new Date(), item.lastWin) < 7;
      }
      return item
    });
    res.send(data);
  })
  .post((req,res) => {
      var restautantId = req.body.restaurantId;
      var dateVoted = req.body.dateVoted;
      var email = req.body.email;
      var result = alreadyVoted.filter(function( obj ) {return obj.email == email;});
      if(result.length == 0 || ( result[0] && differenceInDays(dateVoted, result[0].date) >= 1 )){
          staticData.forEach((restautant)=>{
              if(restautant._id === restautantId){
                  restautant.totalVotes++;
                  io.emit('newVote', restautant);
              }
          });
          alreadyVoted.push({'email' : email, 'date' : dateVoted})
          res.status(202).end();
      }
      res.status(203).end();
    }
  );

app.route('/endVoting')
  .get((req,res)=>{
    var maxVotes = 0;
    var index = 0;
    staticData.forEach((item,idx)=>{
      if(item.totalVotes > maxVotes){
        maxVotes = item.totalVotes;
        index = idx;
      }
    });
    staticData[index].lastWin = new Date();
    res.send(staticData[index]);
  });

 // application -------------------------------------------------------------
app.get('*', function (req, res) {
    res.send(__dirname + '/public/index.html');
});

http.listen(port, function () {
  console.log('Lunch App server running on port 3000!')
})