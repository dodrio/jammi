'use strict'

/**
 * @callback winCallback
 */

class Pool {
  /**
   * 创建奖池
   * @param {Object} prizes - 奖项 ID 与奖项对应的奖品数量所组成的对象
   * @param {number} probability - 总中奖概率
   * @param {winCallback} cb - 中奖时执行的回调函数，用于测试中的中奖概率评估
   */
  constructor (prizes, probability = 0.1, cb) {
    this.cb = cb
    this.prizePool = {}

    let sumAll = 0
    for (const sum of Object.values(prizes)) {
      sumAll += sum
    }

    let startPoint = 0
    for (const [ id, sum ] of Object.entries(prizes)) {
      const spaceInterval = sum / sumAll * probability

      const min = startPoint
      const max = startPoint + spaceInterval

      this.prizePool[id] = { min, max }
      startPoint = max
    }
  }

  draw () {
    const random = Math.random()

    for (const [id, meta] of Object.entries(this.prizePool)) {
      if (random >= meta.min && random <= meta.max) {
        if (this.cb) {
          this.cb()
        }

        return id
      } else {
        return null
      }
    }
  }
}

module.exports = Pool
