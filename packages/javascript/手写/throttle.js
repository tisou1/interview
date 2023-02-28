/**
 *
 * @param {Function} fn
 * @param {Number} delay
 * @description 节流函数
 */

// 定时器版本
export const throttle = (fn, delay) => {
  let timer = null
  return (...args) => {
    if (!timer) {
      fn(...args)
      timer = setTimeout(() => {
        // 当函数体执行的时候,将timer置为null
        clearTimeout(timer)
        timer = null
      }, delay)
    }
  }
}

// 时间戳版本
export const throttle2 = (fn, delay) => {
  let preDate = 0

  return (...args) => {
    let nowDate = Date.now()

    if(nowDate - preDate > delay) {
      // 如果时间差大于设置的阈值delay,则执行fn
      preDate = nowDate
      fn(args)
    }
  }
}