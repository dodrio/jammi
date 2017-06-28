import test from 'ava'
import jammi from '.'

const OFFSET = 0.01

test('Pool', t => {
  const prizes = {
    '101': 500,
    '102': 100,
    '103': 50,
    '104': 10,
    '105': 1
  }

  const probability = 0.5
  const total = 100000
  let shoot = 0
  let shootIds = new Set()

  for (let i = 0; i < total; i++) {
    jammi.pool(prizes, probability, (id) => {
      shootIds.add(id)
      shoot += 1
    })
  }

  // probability is approximated with value specified by `probability`
  const realProbability = shoot / total
  t.true(realProbability < probability + OFFSET && realProbability > probability - OFFSET)

  // all prizes can be shooted
  t.true(shootIds.has('101'))
  t.true(shootIds.has('102'))
  t.true(shootIds.has('103'))
  t.true(shootIds.has('104'))
  t.true(shootIds.has('105'))
})

// test('Period', t => {
//   const prizes = {
//     '101': {
//       sum: 500,
//       balance: 475
//     },
//     '102': {
//       sum: 100,
//       balance: 85
//     },
//     '103': {
//       sum: 50,
//       balance: 45
//     },
//     '104': {
//       sum: 10,
//       balance: 8
//     },
//     '105': {
//       sum: 1,
//       balance: 1
//     }
//   }

//   const startTime = Date.now()
//   const endTime = Date.now() + 60 * 1000

//   // for (let i = 0; i < 1000; i++) {
//   //   jammi.period(prizes, startTime, endTime, 1)
//   // }

//   t.true(true)
// })
