'use strict';

var staticData = require('../seed.js').restaurants;
var io = require('../app');

var alreadyVoted = [];

function getRestaurants(req, res){
    res.send(staticData);
}

function updateVotes(req, res){
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

module.exports = {
    getRestaurants,
    updateVotes
}