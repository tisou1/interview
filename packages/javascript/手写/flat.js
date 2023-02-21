/**
 *
 * @param {*} arr
 * @description 数组扁平化
 */

// 递归
export const flat1 = (arr, depth = 1) => {
  let ans = []

  arr.forEach(element => {
    if (Array.isArray(element) && depth !== 0) {
      // 进入递归
      ans = ans.concat(flat1(element, depth - 1))
    } else {
      ans.push(element)
    }
  })

  return ans
}

// reduce
export const flat2 = (arr, depth = 1) => {
  return depth > 0
    ? arr.reduce(
        (total, item) =>
          Array.isArray(item)
            ? total.concat(flat2(item, depth - 1))
            : // 如果使用数组结构的话
              // [...total, ...flat2(item, depth - 1)]
              total.concat(item),
        []
      )
    : arr
}

// es6 some

export const flat3 = (arr, depth = 1) => {
  while (arr.some(item => Array.isArray(item)) && depth > 0) {
    arr = [].concat(...arr)
    depth--
  }

  return arr
}
