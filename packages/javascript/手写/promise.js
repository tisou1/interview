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


  // 要使用箭头函数,来保证resolve中的this指向构造函数MyPromise
  const resolve = (value) => {
    // 需要保证回调是在本轮事件循环的末尾执行
    console.log(this);
  
      // 只有pending状态才可以操作
      if (this.status === PENDING) {
        setTimeout(() => {
        // 改变当前promise的状态
        this.status = RESOLVED
        // 赋值
        this.value = value

        // 执行回调函数
        this.resolvedCallbacks.forEach(callback => {
          callback(value)
        })
       })
      }
  }

  const reject = (reason) => {
  
      // 只有pending状态才可以操作
      if (this.status === PENDING) {
        setTimeout(() => {
        // 改变当前promise的状态
        this.status = REJECTED
        // 赋值
        this.reason = reason

        // 执行回调函数
        this.rejectedCallbacks.forEach(callback => {
          callback(reason)
        })
    })
      }
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
  // onReJected = typeof onReJected === "function" ? onReJected : v => v

  // onResolved =
  //   typeof onResolved === "function"
  //     ? onResolved
  //     : err => {
  //         throw err
  //       }

  // 需要判断状态

  // 1. 如果是pending状态, 则需要加入队列
  // if (this.status === PENDING) {
  //   this.resolvedCallbacks.push(onResolved)
  //   this.rejectedCallbacks.push(onReJected)
  // }

  // // 2. 状态时resolved,则执行onResolved
  // if (this.status === RESOLVED) {
  //   onResolved(this.value)
  // }

  // // 3. 状态时rejected,则执行onRejected
  // if (this.status === REJECTED) {
  //   onReJected(this.reason)
  // }

  // then的返回值,也还是一个promise


  const promise2 = new MyPromise((resolve, reject) => {
    // .then是一个微任务,这里使用setTimeout模拟
    // 根据状态值来,进行
    if(this.status === RESOLVED) {
      setTimeout(() => {
        try {
          if(typeof onResolved !== 'function') {
            resolve(this.value)
          } else {
            let x = onResolved(this.value)
            resolvePromise(promise2, x, resolve, reject)
          }
        } catch(error) {
          reject(error)
        }
      })
    } else if(this.status === REJECTED) {
      setTimeout(() => {
        try{
         if(typeof onReJected !== 'function') {
          reject(this.reason)
         } else {
          let x = onReJected(this.reason)
          resolvePromise(promise2, x, resolve, reject)
         }
        } catch(err) {
          reject(err)
        }
      })
    } else if(this.status === PENDING) {
      // 需要暂存回调函数
      this.resolvedCallbacks.push(() => {
        try{
          if(typeof onResolved !== 'function') {
            resolve(this.value)
          } else {
            let x = onResolved(this.value)
            resolvePromise(promise2, x, resolve, reject)
          }
        } catch(err) {
            reject(err)
        }
      })


      this.rejectedCallbacks.push(() => {
        try{
          if(typeof onReJected !== 'function') {
           reject(this.reason)
          } else {
           let x = onReJected(this.reason)
           resolvePromise(promise2, x, resolve, reject)
          }
        } catch(err) {
          reject(err)
        }
      })
    }
  })

  return promise2
}


/**
 * 
 * @param promise2 promise1.then的返回值
 * @param x promise1中onResolved的返回值
 * @param resolve promise2的resolve方法
 * @param reject promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject){
  // todo

  // 1.如果promise2 等于x, 避免循环引用

  if(x === promise2) {
    throw new TypeError('产生循环引用')
  }
  // 2. x为一个promise
  if(x instanceof MyPromise) {
    x.then(y => {
      resolvePromise(promise2, y, resolve, reject)
    }, reject)
  } else if(x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let then
    // x为对象或者为函数  
      try{
        // 把x.then赋值给then
        then = x.then
      } catch(e) {
        return reject(e)
      }
      // x为函数
      if(typeof then === 'function') {
        let called = false // 避免多次调用.

        try{
          // 如果resolved以参数y进行调用,则运行resolvePromise
          then.call(x, 
            y => {
              if (called) return
              called = true
              resolvePromise(promise2, y, resolve, reject)
            },
          // 如果rejected以参数r进行调用,则运行resolvePromise
            r => {
              if (called) return
              called = true
              // 如果reject以r为参数调用,则依据r拒绝promise
              reject(r)
            })
        } catch(e) {
          // 如果调用then方法出现问题
          // 如果resolved和rejected已经被调用了, 则忽略
          if (called) return
          called = true
          // 否则以e拒绝promise
          reject(e)
        }
      }else {
        // then不是函数, 以x调用resolve
        resolve(x)
      }
    } else {
      // x不是对象或者函数,以x为参数执行promise
      return resolve(x)
    }

}




/**
 * 
 * 
 * 
 * 需要安装 npm install promises-aplus-tests -D
 * 进行测试
 * 
 * MyPromise.deferred = function () {
  const result = {}
  result.promise = new MyPromise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

module.exports = MyPromise
 */