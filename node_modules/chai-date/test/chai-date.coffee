unless chai
  chai = require 'chai'
  date = require '..'
  chai.use date

should = chai.should()

describe 'Chai Date', ->
  now = new Date()
  today = new Date now.getFullYear(), now.getMonth(), now.getDate()
  yesterday = new Date now.getFullYear(), now.getMonth(), now.getDate() - 1
  tomorrow = new Date now.getFullYear(), now.getMonth(), now.getDate() + 1

  describe 'today', ->
    it 'should pass when today', ->
      today.should.be.today

    it 'should pass when today with time', ->
      todayWithTime = new Date(today.setHours(5))
      todayWithTime.should.be.today

    it 'should fail when tomorrow', ->
      ( ->
        tomorrow.should.be.today
      ).should.throw(chai.AssertionError)

    it 'should fail when yesterday', ->
      ( ->
        yesterday.should.be.today
      ).should.throw(chai.AssertionError)

  describe 'yesterday', ->
    it 'should pass when yesterday', ->
      yesterday.should.be.yesterday

    it 'should pass when yesterday with time', ->
      yesterdayWithTime = new Date(yesterday.setHours(5))
      yesterdayWithTime.should.be.yesterday

    it 'should fail when today', ->
      ( ->
        today.should.be.yesterday
      ).should.throw(chai.AssertionError)

  describe 'tomorrow', ->
    it 'should pass when tomorrow', ->
      tomorrow.should.be.tomorrow

    it 'should pass when tomorrow with time', ->
      tomorrowWithTime = new Date(tomorrow.setHours(5))
      tomorrowWithTime.should.be.tomorrow

    it 'should fail when today', ->
      ( ->
        today.should.be.tomorrow
      ).should.throw(chai.AssertionError)
