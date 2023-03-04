import call from "./call"

export default function bind(context = window, fn, ...args) {
  if (typeof obj !== "object") {
    // 值类型转换为对象类型
    context = new Object(context)
  }
  // 返回一个函数
  return function (...args2) {
    // 这里需要将bind时绑定的参数和返回函数接受的参数都传递过去
    return call(context, fn, ...args, ...args2)
  }
}

Function.prototype.myBind = function (context = window, ...args) {
  return (...args) => {
    // 这里的this取得是外层函数的,所以这里用箭头函数,
    return this.myCall(context, [...args, ...args2])
  }
}
