const seedData = require('../seed.js');

function getRestaurants(req, res){
    res.send(seedData);
}

function updateVotes(req, res){
    let restautantId = '1234'
    seedData.forEach(function(restautant) {
        if(restautant.id === restautantId){
            restautant.totalVotes++;
        }
    });
}

module.exports = {
    getRestaurants,
    updateVotes
}