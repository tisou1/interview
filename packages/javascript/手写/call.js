/**
 * 
 * @param {*} obj 
 * @param {*} fn 
 * call 绑定做的事情
 * - 将函数绑定到对象上,作为方法调用, 然后从对象上删除
 * - 指定this到函数并传给函数指定的参数
 * - 
 */


export default function call(obj = window, fn, ...args) {
    if(typeof obj !== 'object') {
        // 值类型转换为对象类型
        obj = new Object(obj)
    } 

    // 如果在原型上更改的话, 这里,就是this了. 就不需要传递第二个参数了
    // fn.call()
    // obj.fn = fn;
    // let ans = obj.fn(...args);

    // 使用symbol创建唯一key
    const symKey = Symbol();

    obj[symKey] = fn
    let ans = obj[symKey](...args);
    Reflect.deleteProperty(obj, fn);
    // delete obj.fn

    return ans
}

// 原型链的写法

Function.prototype.myCall = function(obj = window, ...args) {
    if(typeof obj !== 'object') {
        // 值类型转换为对象类型
        obj = new Object(obj)
    } 


    // 使用symbol创建唯一key
    const symKey = Symbol();
    // this指向的fn
    obj[symKey] = this
    let ans = obj[symKey](...args);
    Reflect.deleteProperty(obj, fn);
    // delete obj.fn

    return ans
}