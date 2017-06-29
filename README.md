# jammi

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://standardjs.com/)
[![Dependency Status](https://img.shields.io/david/m31271n/jammi.svg)](#)
[![DevDependency Status](https://img.shields.io/david/m31271n/jammi.svg)](#)
[![NPM Downloads](https://img.shields.io/npm/dm/jammi.svg)](#)
[![Travis Build Status](https://img.shields.io/travis/m31271n/jammi.svg)](#)

> Simple solutions of lucky draw.

## Install

```
$ npm install jammi
```

## API
### about `prizes` parameter

Format:

```js
[
  {
    id: <id>
    sum: <sum>
    balance: <balance>
  }
]
```

Example:

```js
const prizes = [
  {
    id: 101,
    sum: 500,
    balance: 475
  },
  {
    id: 102,
    sum: 100,
    balance: 85
  },
  {
    id: 103,
    sum: 50,
    balance: 45
  },
  {
    id: 104,
    sum: 10,
    balance: 8
  },
  {
    id: 105,
    sum: 1,
    balance: 1
  }
]
```

### jammi.pool(prizes, probability = 0.1)

Return `prizeId` or `null`.

### jammi.period (prizes, startTime, endTime)

Return `prizeId` or `null`.

* * *

<p align="center">Made without ❤ by <a href="http://index.m31271n.com">m31271n</a></p>
