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
### jammi.probability(prizes)
The most common method with setting probability.
+ prizes:

```js
[
  {
    id: '61f55251-3b9c-498e-bbbe-c730de62a38d' // id of prize
    probability: 0.35 // probability of prize
  }

  ...
]
```

Return `id` or `null`.

### jammi.pool(prizes)
Prize are threw into a imaginary pool. Every can get a prize when his / her hand reach the pool.

+ prizes:

```js
[
  {
    id: '61f55251-3b9c-498e-bbbe-c730de62a38d' // id of prize
    balance: 124 // balance of prize
  }

  ...
]
```

Return `id` or `null`.

### jammi.period (prizes, startTime, endTime)
Prizes are distributed on timeline between `startTime` to `endTime`. This method gains best effect of marketing.

+ `prizes`:

```js
[
  {
    id: '61f55251-3b9c-498e-bbbe-c730de62a38d' // id of prize
    sum: 200 // sum of prize, including those which have been issued
    balance: 124 // balance of prize
  }
  ...
]
```

+ `startTime`: the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
+ `endTime`:  the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.

Return `id` or `null`.

* * *

<p align="center">Made with ❤ by <a href="http://index.m31271n.com">m31271n</a></p>
