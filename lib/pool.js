'use strict'

function randomInteger (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * @callback shootCallback
 */

/**
 * 奖池抽奖
 * @param {Object} prizes - 奖品信息组成的数组
 * @param {shootCallback} cb - 中奖时执行的回调函数，用于测试中的中奖概率评估
 */
function pool (prizes, cb) {
  const prizePool = []

  let balanceAll = 0
  for (const prize of prizes) {
    const { balance } = prize
    balanceAll += balance
  }

  let startPoint = 1
  for (const prize of prizes) {
    const { id, balance } = prize
    const spaceInterval = balance

    const min = startPoint
    const max = startPoint + spaceInterval

    prizePool.push({ id, min, max })
    startPoint = max
  }

  const random = randomInteger(1, balanceAll)
  for (const prize of prizePool) {
    const { id, min, max } = prize
    if (random >= min && random < max) {
      if (cb) cb(id)
      return id
    }
  }

  return null
}

module.exports = pool
