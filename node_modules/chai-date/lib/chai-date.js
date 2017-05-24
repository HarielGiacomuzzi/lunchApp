var getEndOfDay = function getEndOfDay(date) {
  var eod  = new Date(date.getTime());
  eod.setHours(23);
  eod.setMinutes(59);
  eod.setSeconds(59);
  eod.setMilliseconds(999);
  return eod;
};
module.exports = function(chai, _) {
  var Assertion = chai.Assertion
    , i = _.inspect;

    var now = new Date()
      , today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      , yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
      , tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  /**
   * # .today
   *
   * Assert that the date is today
   *
   * @api public
   */
  Assertion.addProperty('today', function() {
    var start = new Date(today.getTime() - 1);
    var end = getEndOfDay(today);
    this.assert(
      Dates.inRange(this._obj, start, end),
      'expected ' + i(this._obj) + ' to be between ' + i(start) + ' and ' + i(end),
      'expected ' + i(this._obj) + ' to not be between ' + i(start) + ' and ' + i(end)
    );
  });

  Assertion.addProperty('yesterday', function() {
    var start = new Date(yesterday.getTime() - 1);
    var end = getEndOfDay(yesterday);
    this.assert(
      Dates.inRange(this._obj, start, end),
      'expected ' + i(this._obj) + ' to be between ' + i(start) + ' and ' + i(end),
      'expected ' + i(this._obj) + ' to not be between ' + i(start) + ' and ' + i(end)
    );
  });

  Assertion.addProperty('tomorrow', function() {
    var start = new Date(tomorrow.getTime() - 1);
    var end = getEndOfDay(tomorrow);
    this.assert(
      Dates.inRange(this._obj, start, end),
      'expected ' + i(this._obj) + ' to be between ' + i(start) + ' and ' + i(end),
      'expected ' + i(this._obj) + ' to not be between ' + i(start) + ' and ' + i(end)
    );
  });
};

var Dates = {
  compare: function(a,b) {
    return (
      isFinite(a=this.convert(a).valueOf()) &&
      isFinite(b=this.convert(b).valueOf()) ?
      (a>b)-(a<b) :
      NaN
    );
  },
  convert: function(d) {
    // Compare two dates (could be of any type supported by the convert
    // function above) and returns:
    //  -1 : if a < b
    //   0 : if a = b
    //   1 : if a > b
    // NaN : if a or b is an illegal date
    // NOTE: The code inside isFinite does an assignment (=).
    return (
      d.constructor === Date ? d :
      d.constructor === Array ? new Date(d[0],d[1],d[2]) :
      d.constructor === Number ? new Date(d) :
      d.constructor === String ? new Date(d) :
      typeof d === "object" ? new Date(d.year,d.month,d.date) :
      NaN
    );
  },
  inRange:function(d,start,end) {
    // Checks if date in d is between dates in start and end.
    // Returns a boolean or NaN:
    //    true  : if d is between start and end (exclusive)
    //    false : if d is before start or after end
    //    NaN   : if one or more of the dates is illegal.
    // NOTE: The code inside isFinite does an assignment (=).
    return (
      isFinite(d=this.convert(d).valueOf()) &&
      isFinite(start=this.convert(start).valueOf()) &&
      isFinite(end=this.convert(end).valueOf()) ?
      start < d && d < end :
      NaN
    );
  }
};
