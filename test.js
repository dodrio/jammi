import test from 'ava'
import jammi from '.'
import sleep from 'sleep'

const OFFSET = 0.01

test('pool', t => {
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

  const probability = 0.5
  const total = 100000
  let shoot = 0
  let shootIds = new Set()
  let loopTime = 0

  for (let i = 0; i <= total; i++) {
    loopTime = i

    jammi.pool(prizes, probability, id => {
      shootIds.add(id)
      shoot += 1
    })
  }

  // ensure loopTime is equal to total
  t.true(loopTime === total)

  // probability is approximated with value specified by `probability`
  const realProbability = shoot / total
  t.true(realProbability < probability + OFFSET && realProbability > probability - OFFSET)

  // all prizes can be shooted
  t.true(shootIds.has(101))
  t.true(shootIds.has(102))
  t.true(shootIds.has(103))
  t.true(shootIds.has(104))
  t.true(shootIds.has(105))
})

test('period', t => {
  const prizes = {
    '101': {
      sum: 500,
      balance: 475
    },
    '102': {
      sum: 100,
      balance: 85
    },
    '103': {
      sum: 50,
      balance: 45
    },
    '104': {
      sum: 10,
      balance: 8
    },
    '105': {
      sum: 1,
      balance: 1
    }
  }

  let shootIds = new Set()
  let biggestPrizeTime

  // test in 10 seconds
  const startTime = Date.now()
  const middleTime = Date.now() + 5 * 1000
  const endTime = Date.now() + 10 * 1000

  while (true) {
    jammi.period(prizes, startTime, endTime, id => {
      shootIds.add(id)
      prizes[id].balance -= 1
    })

    if (prizes['105'].balance === 0) {
      if (!biggestPrizeTime) {
        biggestPrizeTime = Date.now()
      }
    }

    if (Date.now() > endTime) {
      break
    }

    sleep.usleep(3000)
  }

  // biggest prize is shooted after middleTime
  t.true(biggestPrizeTime > middleTime)

  // all prizes can be shooted
  t.true(shootIds.has('101'))
  t.true(shootIds.has('102'))
  t.true(shootIds.has('103'))
  t.true(shootIds.has('104'))
  t.true(shootIds.has('105'))
})
