/**
 * class版本的promise
 */

let c = 2
class MyPromise {
  static PENDING = "pending"
  static FULFILLED = "fulfilled"
  static REJECTED = "rejected"

  constructor(fn) {
    this.value = null
    this.state = MyPromise.PENDING

    // 保存成功的回调
    this.onFulfilledCallbacks = []
    // 保存异步的回调
    this.onRejectedCallbacks = []

    try {
      fn(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }

  // 使用箭头函数, 不然要用bind来绑定this
  resolve = value => {
    if (this.state === MyPromise.PENDING) {
      this.state = MyPromise.FULFILLED
      this.value = value``

      this.onFulfilledCallbacks.forEach(callback => callback(value))
    }
  }

  reject = reason => {
    if (this.state === MyPromise.PENDING) {
      this.state = MyPromise.REJECTED
      this.value = reason
      this.onRejectedCallbacks.forEach(callback => callback(reason))
    }
  }

  // then方法
  then = (onFulfilled, onRejected) => {
    // 2.2.7 then返回一个promise
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === MyPromise.FULFILLED) {
        setTimeout(() => {
          try {
            if (typeof onFulfilled !== "function") {
              resolve(this.value)
            } else {
              const x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            }
          } catch (e) {
            reject(e)
          }
        })
      } else if (this.state === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            if (typeof onRejected !== "function") {
              reject(this.value)
            } else {
              const x = onRejected(this.value)
              resolvePromise(promise2, x, resolve, reject)
            }
          } catch (e) {
            reject(e)
          }
        })
      } else if (this.state === MyPromise.PENDING) {
        // 把回调存起来, 在稍后执行, resolve中的回调函数要异步调用
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onFulfilled !== "function") {
                resolve(this.value)
              } else {
                const x = onFulfilled(this.value)
                resolvePromise(promise2, x, resolve, reject)
              }
            } catch (e) {
              reject(e)
            }
          })
        })

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onRejected !== "function") {
                reject(this.value)
              } else {
                const x = onRejected(this.value)
                resolvePromise(promise2, x, resolve, reject)
              }
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })

    return promise2
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) throw new TypeError("循环引用")

  //  如何x为一个promise
  if (x instanceof MyPromise) {
    x.then(y => {
      resolvePromise(promise2, y, resolve, reject)
    }, reject)
  }
  // x为对象或者函数的时候
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    let then
    try {
      then = x.then
    } catch (e) {
      // 捕获then赋值时出现的错误
      reject(e)
    }

    if (typeof then === "function") {
      // 防止多次调用then
      let called = false
      try {
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          r => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } catch (e) {
        // .then调用时的错误补货
        if (called) return
        called = true
        reject(e)
      }
    } else {
      // then不是函数
      resolve(x)
    }
  } else {
    // x不是对象或者函数
    resolve(x)
  }
}

MyPromise.deferred = function () {
  const result = {}
  result.promise = new MyPromise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

module.exports = MyPromise

//   npx promises-aplus-tests _promise.js
