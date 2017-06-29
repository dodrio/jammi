'use strict'

/**
 * @callback shootCallback
 */

const seedrandom = require('seedrandom')

/**
 * 时间分布型抽奖
 * @param {Object} prizes - 奖品信息组成的数组
 * @param {number} startTime
 * @param {number} endTime
 * @param {number} probability - 总中奖概率
 * @param {shootCallback} cb - 中奖时执行的回调函数，用于测试中的中奖概率评估
 */
function period (prizes, startTime, endTime, cb) {
  const prizePool = []

  let sumAll = 0
  for (const prize of prizes) {
    const { sum } = prize
    sumAll += sum
  }

  let startPoint = 0
  for (const prize of prizes) {
    const { id, sum, balance } = prize
    const spaceInterval = sum / sumAll

    const min = startPoint
    const max = startPoint + spaceInterval

    prizePool.push({ id, min, max, sum, balance })
    startPoint = max
  }

  const random = Math.random()
  for (const prize of prizePool) {
    const { id, min, max, sum, balance } = prize

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
