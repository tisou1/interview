/**
 *
 * @param {} array
 * @description 数组去重
 */
export function unique1(array) {
  return [...new Set([...array])]
  // return Array.from(new Set(array))
}

export function unique2(array) {
  let obj = {}
  let newArray = []
  array.forEach(element => {
    if (!obj[element]) {
      obj[element] = true
      newArray.push(element)
    }
  })

  return newArray
}

export function unique3(array) {
  const res = array.filter((item, index, arr) => {
    // 判断当前index于该item在原数组当中第一次出现的位置是否相等,相等表示可以返回出去
    return arr.indexOf(item) === index
  })

  return res
}

export function unique4(array) {
  let newArray = []
  array.forEach(element => {
    if (!newArray.includes(element)) {
      newArray.push(element)
    }
  })

  return newArray
}
