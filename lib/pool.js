'use strict'

/**
 * @callback shootCallback
 */

/**
 * 奖池抽奖
 * @param {Object} prizes - 奖品信息组成的数组
 * @param {number} probability - 总中奖概率
 * @param {shootCallback} cb - 中奖时执行的回调函数，用于测试中的中奖概率评估
 */
function pool (prizes, probability = 0.1, cb) {
  const prizePool = []

  let sumAll = 0
  for (const prize of prizes) {
    const { sum } = prize
    sumAll += sum
  }

  let startPoint = 0
  for (const prize of prizes) {
    const { id, sum } = prize
    const spaceInterval = sum / sumAll * probability

    const min = startPoint
    const max = startPoint + spaceInterval

    prizePool.push({ id, min, max })
    startPoint = max
  }

  const random = Math.random()
  for (const prize of prizePool) {
    const { id, min, max } = prize
    if (random > min && random <= max) {
      if (cb) cb(id)
      return id
    }
  }

  return null
}

module.exports = pool
