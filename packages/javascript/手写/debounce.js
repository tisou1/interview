/**
 *
 * @param {Function} fn
 * @param {Number} delay
 * @description 节流函数
 */

export const debounce = (fn, delay) => {
  let timer = null
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
