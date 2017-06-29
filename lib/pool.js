'use strict'

/**
 * @callback winCallback
 */

/**
 * 奖池抽奖
 * @param {Object} prizes - 奖项 ID 与奖项对应的奖品数量所组成的对象
 * @param {number} probability - 总中奖概率
 * @param {winCallback} cb - 中奖时执行的回调函数，用于测试中的中奖概率评估
 */
function pool (prizes, probability = 0.1, cb) {
  const prizePool = {}

  let sumAll = 0
  for (const sum of Object.values(prizes)) {
    sumAll += sum
  }

  let startPoint = 0
  for (const [ id, sum ] of Object.entries(prizes)) {
    const spaceInterval = sum / sumAll * probability

    const min = startPoint
    const max = startPoint + spaceInterval

    prizePool[id] = { min, max }
    startPoint = max
  }

  const random = Math.random()
  for (const [ id, meta ] of Object.entries(prizePool)) {
    const { min, max } = meta
    if (random > min && random <= max) {
      if (cb) cb(id)
      return id
    }
  }

  return null
}

module.exports = pool
