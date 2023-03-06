// promise三种状态
const PENDING = "pending"
const RESOLVED = "resolved"
const REJECTED = "rejected"

function MyPromise(fn) {
  // promise状态
  this.status = PENDING

  // 为Resolved状态时的值
  this.value = null

  // 为rejected状态的值
  this.reason = null

  // resolved的回调函数集合
  this.resolvedCallbacks = []

  // rejected的回调函数集合
  this.rejectedCallbacks = []

  function resolve(value) {
    // 需要保证回调是在本轮事件循环的末尾执行
    setTimeout(() => {
      // 只有pending状态才可以操作
      if (this.status === PENDING) {
        // 改变当前promise的状态
        this.status = RESOLVED
        // 赋值
        this.value = value

        // 执行回调函数
        this.resolvedCallbacks.forEach(callback => {
          callback(value)
        })
      }
    })
  }

  function reject(reason) {
    setTimeout(() => {
      // 只有pending状态才可以操作
      if (this.status === PENDING) {
        // 改变当前promise的状态
        this.status = REJECTED
        // 赋值
        this.reason = reason

        // 执行回调函数
        this.rejectedCallbacks.forEach(callback => {
          callback(value)
        })
      }
    })
  }

  // 执行传入的函数
  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

// 实现then方法
MyPromise.prototype.then = function (onResolved, onReJected) {
  // 首先判断两个参数是否是函数
  onReJected = typeof onReJected === "function" ? onReJected : v => v

  onResolved =
    typeof onResolved === "function"
      ? onResolved
      : err => {
          throw err
        }

  // 需要判断状态

  // 1. 如果是pending状态, 则需要加入队列
  if (this.status === PENDING) {
    this.resolvedCallbacks.push(onResolved)
    this.rejectedCallbacks.push(onReJected)
  }

  // 2. 状态时resolved,则执行onResolved
  if (this.status === RESOLVED) {
    onResolved(this.value)
  }

  // 3. 状态时rejected,则执行onRejected
  if (this.status === REJECTED) {
    onReJected(this.reason)
  }

  // then的返回值,也还是一个promise
}
