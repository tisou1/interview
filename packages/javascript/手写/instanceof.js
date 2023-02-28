/**
 * 
 * @param {*} instance 
 * @param {*} target 
 * @description 实现instanceOf,检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
 */


const  _instanceof = (instance, _constructor) => {
    // 由于要检测的是object
    if(typeof instance !== 'object' || instance === null) return

    // 获取当前实例对象的原型
    let proto = Object.getPrototypeOf(instance)
    while(proto) {
        // 实例原型 等于 构造函数的原型
        if (proto === _constructor.prototype) {
            return true
        }
        proto = Object.getPrototypeOf(proto)
    }

    return false
}

export default _instanceof