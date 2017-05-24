let chai = require('chai');
let chaiHttp = require('chai-http');
let chaiDate = require('chai-date');
let should = chai.should();
let server = require('../index.js');

var expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiDate);

var today = new Date();
var tomorow = new Date();
tomorow.setDate(tomorow.getDate() + 1);

describe('Testing Restaurant Routes', ()=>{

    describe('GET /restaurants', ()=>{
        it('it should get all avaliable restaurants', (done)=>{
            chai.request('http://localhost:3000')
            .get('/restaurants')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.least(0);
              done();
            });
        })
    });

    describe('POST /restaurants', ()=>{
        it('it should allow me to vote once', (done)=>{
            chai.request('http://localhost:3000')
                .post('/restaurants')
                .send({'email' : 'a@a.com','restaurantId': 'f4e8de05-99d2-4c2e-8f0d-d35fde2851d9', 'dateVoted' :today})
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(202);
                    done();
                 });
        });

        it('it should allow me to vote ONLY once', (done)=>{
            chai.request('http://localhost:3000')
                .post('/restaurants')
                .send({'email' : 'a@a.com','restaurantId': 'f4e8de05-99d2-4c2e-8f0d-d35fde2851d9', 'dateVoted' :today})
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(203);
                    done();
                 });
        });

        it('it should not allow me to vote on other restaurant once I\'ve voted', (done)=>{
            chai.request('http://localhost:3000')
                .post('/restaurants')
                .send({'email' : 'a@a.com','restaurantId': '4c1630e3-2f5a-4436-bc29-64122a9a8615', 'dateVoted' :today})
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(203);
                    done();
                 });
        });

        it('it should allow me to vote on other restaurant once one day has passed', (done)=>{
            chai.request('http://localhost:3000')
                .post('/restaurants')
                .send({'email' : 'a@a.com','restaurantId': '4c1630e3-2f5a-4436-bc29-64122a9a8615', 'dateVoted' :tomorow})
                .end((err, res) => {
                    expect(err).to.be.null;
                    res.should.have.status(202);
                    done();
                 });
        });
    });

    describe('GET /endVoting', ()=>{
        it('it should return the winner restaurant', (done)=>{
            chai.request('http://localhost:3000')
            .get('/endVoting')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('totalVotes');
                res.body.totalVotes.should.be.least(0);
              done();
            });
        })
    });    
});