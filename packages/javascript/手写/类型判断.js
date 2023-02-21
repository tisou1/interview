/**
 *
 * @param {} any
 * @description 类型判断
 */
function mytypeof(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

export default mytypeof
