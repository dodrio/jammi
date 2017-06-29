'use strict'

/**
 * @callback shootCallback
 */

const seedrandom = require('seedrandom')

/**
 * 时间分布型抽奖
 * @param {Object} prizes - 奖品ID 与奖品元数据所组成的对象
 * @param {number} startTime
 * @param {number} endTime
 * @param {number} probability - 总中奖概率
 * @param {shootCallback} cb - 中奖时执行的回调函数，用于测试中的中奖概率评估
 */
function period (prizes, startTime, endTime, probability = 0.1, cb) {
  const prizePool = {}

  let sumAll = 0
  for (const { sum } of Object.values(prizes)) {
    sumAll += sum
  }

  let startPoint = 0
  for (const [ id, meta ] of Object.entries(prizes)) {
    const { sum, balance } = meta
    const spaceInterval = sum / sumAll * probability

    const min = startPoint
    const max = startPoint + spaceInterval

    prizePool[id] = { min, max, sum, balance }
    startPoint = max
  }

  const random = Math.random()
  for (const [ id, meta ] of Object.entries(prizePool)) {
    const { min, max, sum, balance } = meta

    if (random > min && random <= max) {
      const now = Date.now()

      const deltaTime = (endTime - startTime) / sum
      const timeOffset = (sum - balance) * deltaTime

      const randomTimeOffset = Math.ceil(seedrandom.alea(balance)() * deltaTime)
      const releaseTime = startTime + timeOffset + randomTimeOffset
      if (now >= releaseTime) {
        if (cb) cb(id)
        return id
      } else {
        return null
      }
    }
  }

  return null
}

module.exports = period
