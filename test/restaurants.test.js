let Restaurants = require('../lib/restaurant.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../index.js');
chai.use(chaiHttp);

describe('Testing Restaurant Routes', ()=>{

    describe('GET /restaurants', ()=>{
        it('it should get all the restaurants', (done)=>{
            chai.request('http://localhost:3000')
                .get('/getRestaurants')
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('restaurants');
                    res.body.restaurants.should.be.a('array');
                    res.body.restaurants.length.should.be.above(0);
                    done();
                 });
        })
    });

    
});