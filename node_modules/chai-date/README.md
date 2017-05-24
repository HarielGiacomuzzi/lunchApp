# chai-date

An extension to the [chai](http://chaijs.com/) assertion library
that provides a set of date assertions.

## Installation

```bash
$ npm install chai-date
```

## Usage

Use the assertions with chai's `expect` or `should` assertions.

## Assertions

### `today`
Asserts that the given date is today

```javascript
var today = new Date()
today.should.be.today()
```

### `yesterday`
Asserts that the given date is yesterday

```javascript
var yesterday = new Date(today.getDate() - 1)
yesterday.should.be.yesterday()
```

### `tomorrow`
Asserts that the given date is tomorrow

```javascript
var tomorrow = new Date(today.getDate() + 1)
tomorrow.should.be.tomorrow()
```

## Test

```bash
$ npm test
```

## Authors [Christopher Garvis][0] & [Moveline][1]

[0]: http://christophergarvis.com
[1]: http://www.moveline.com

## License
MIT
