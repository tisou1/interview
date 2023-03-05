export default class EventBus {
  constructor() {
    this.eventMap = new Map()
  }
  // 注册监听
  on(name, callback) {
    let task = this.#checkEventName(name)
    if (task) {
      task.push(callback)
    } else {
      this.eventMap.set(name, [callback])
    }
  }

  // 清除监听
  off(name, callback) {
    let task = this.#checkEventName(name)
    if (task) {
      const index = task.findIndex(v => v === callback)
      if (index >= 0) {
        task.splice(index, 1)
      }
    }
  }

  // 清除所有
  offAll(name) {
    let task = this.#checkEventName(name)
    if (task) {
      this.eventMap.set(name, [])
    }
  }

  // 触发事件
  emit(name, ...args) {
    let task = this.#checkEventName(name)
    if (task) {
      task.forEach(callback => {
        callback(...args)
      })
    }
  }

  // 私有方法
  #checkEventName(name) {
    const task = this.eventMap.get(name)
    console.log(name, this.eventMap.keys(), task)
    if (task) return task
    return false
  }
}
