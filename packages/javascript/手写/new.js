/**
 * 
 * @param {*} obj 
 * @param {*} option 
 * @description 实现new 操作符
 * - 创建一个对象,该对象会继承构造函数的原型
 * - 执行构造函数,使用call/apply改变this指向
 * - 返回值为object类型则作为new方法的返回值返回，否则返回上述全新对象obj
 */
const _new = (_constructor, ...option) => {
    // 1.创建对象的方式
    // const obj = {}
    // Object.setPrototypeOf(obj, _constructor.prototype);
    // 2. 
    const obj = Object.create(_constructor.prototype);

    let ans = _constructor.apply(obj, option);

    return typeof ans === 'object' ? ans : obj
}

export default _new