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
        // 当函数体执行的时候,将timer置位null
        clearTimeout(timer)
        timer = null
      }, delay)
    }
  }
}
