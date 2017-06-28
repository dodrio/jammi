import test from 'ava'
import jammi from '.'

test('Pool', t => {
  const prizes = {
    '101': 500,
    '102': 100,
    '103': 50,
    '104': 10,
    '105': 1
  }

  const probability = 0.1
  const total = 10000
  let winCount = 0

  for (let i = 0; i < total; i++) {
    const p = new jammi.Pool(prizes, probability, () => {
      winCount += 1
    })
    p.draw()
  }

  const realProbability = winCount / total
  // 0.07 is a magic number, right? ;)
  t.true(realProbability < probability && realProbability > 0.07)
})
