import test from 'ava'
import jammi from '.'
import sleep from 'sleep'

function findIndexById (array, id) {
  for (const [ index, item ] of Object.entries(array)) {
    if (item.id === id) {
      return index
    }
  }

  throw new Error('invalid id')
}

test('probability', t => {
  const prizes = [
    {
      id: 101,
      probability: 0.01
    },
    {
      id: 102,
      probability: 0.05
    },
    {
      id: 103,
      probability: 0.15
    },
    {
      id: 104,
      probability: 0.25
    },
    {
      id: 105,
      probability: 0.35
    }
  ]

  const shootTime = {
    101: 0,
    102: 0,
    103: 0,
    104: 0,
    105: 0
  }

  const total = 100000
  let shootIds = new Set()
  let loopTime = 0

  for (let i = 0; i <= total; i++) {
    loopTime = i

    jammi.probability(prizes, id => {
      shootIds.add(id)
      shootTime[id] += 1
    })
  }

  // ensure loopTime is equal to total
  t.true(loopTime === total)

  // ensure probability is accurate
  const probabilityOffset = 0.01
  for (const id of [101, 102, 103, 104, 105]) {
    const index = findIndexById(prizes, id)
    const idealProbability = prizes[index].probability
    const realProbability = shootTime[id] / total

    t.true(
      realProbability < idealProbability + probabilityOffset &&
        realProbability > idealProbability - probabilityOffset
    )
  }

  // all prizes can be shooted
  t.true(shootIds.has(101))
  t.true(shootIds.has(102))
  t.true(shootIds.has(103))
  t.true(shootIds.has(104))
  t.true(shootIds.has(105))
})

test('period', t => {
  const prizes = [
    {
      id: 101,
      balance: 475
    },
    {
      id: 102,
      balance: 85
    },
    {
      id: 103,
      balance: 45
    },
    {
      id: 104,
      balance: 8
    },
    {
      id: 105,
      balance: 1
    }
  ]

  const total = 614
  let shootIds = new Set()
  let shootTime = 0
  let loopTime = 0

  for (let i = 0; i < total; i++) {
    loopTime += 1

    jammi.pool(prizes, id => {
      shootIds.add(id)
      shootTime += 1
    })
  }

  // ensure all the prizes is selected,
  // because this is a pool lottery
  t.true(loopTime === total)
  t.true(loopTime === shootTime)
})

test('period', t => {
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

  let shootIds = new Set()
  let biggestPrizeTime

  // test in 10 seconds
  const startTime = Date.now()
  const middleTime = Date.now() + 5 * 1000
  const endTime = Date.now() + 10 * 1000

  while (true) {
    jammi.period(prizes, startTime, endTime, id => {
      shootIds.add(id)

      const index = findIndexById(prizes, id)
      prizes[index].balance -= 1
    })

    const biggestPrizeIndex = findIndexById(prizes, 105)
    const biggestPrize = prizes[biggestPrizeIndex]
    if (biggestPrize.balance === 0) {
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
  t.true(shootIds.has(101))
  t.true(shootIds.has(102))
  t.true(shootIds.has(103))
  t.true(shootIds.has(104))
  t.true(shootIds.has(105))
})
