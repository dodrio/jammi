'use strict'

/**
 * @callback shootCallback
 */

/**
 * 概率抽奖
 * @param {Object} prizes - 奖品信息组成的数组
 * @param {shootCallback} cb - 中奖时执行的回调函数，用于测试中的中奖概率评估
 */
function probability (prizes, cb) {
  const prizeInfo = []

  let totalProbability = 0
  for (const prize of prizes) {
    const { probability } = prize
    totalProbability += probability
  }

  if (totalProbability > 1) {
    throw Error('Total probability is bigger than 1')
  }

  let startPoint = 0
  for (const prize of prizes) {
    const { id, probability } = prize
    const spaceInterval = probability

    const min = startPoint
    const max = startPoint + spaceInterval

    prizeInfo.push({ id, min, max })
    startPoint = max
  }

  const random = Math.random()
  for (const prize of prizeInfo) {
    const { id, min, max } = prize
    if (random > min && random <= max) {
      if (cb) cb(id)
      return id
    }
  }

  return null
}

module.exports = probability
