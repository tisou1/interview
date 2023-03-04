/**
 * 函数科里化
 */

function sub_cur(fn) {
  console.log(fn, "fn")
  let args = [].slice.call(arguments, 1)
  return function () {
    return fn.apply(this, args.concat([].slice.call(arguments)))
  }
}

export function curry(fn, length) {
  length = length || fn.length

  let slice = Array.prototype.slice

  return function () {
    console.log("arguments:", [].slice.call(arguments))
    if (arguments.length < length) {
      let combined = [fn].concat(slice.call(arguments))
      console.log("combined:", combined)
      return curry(sub_cur.apply(this, combined), length - arguments.length)
    } else {
      return fn.apply(this, arguments)
    }
  }
}

export function curry2(fn, args = []) {
  // 获取函数的参数个数
  let length = fn.length

  return function (...args2) {
    args2.forEach(item => {
      args.push(item)
    })

    if (args.length < length) {
      return curry2.call(this, fn, args)
    } else {
      return fn.apply(this, args)
    }
  }
}
