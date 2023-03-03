

export default function deepClone(obj, map = new WeakMap()) {

    // 1. 检查要克隆的对象是否是一个原始值
    if (typeof obj !== 'object') {
        return obj
    }

    // 2.检查对象有没有被克隆过
    if (map.has(obj)) {
        return map.get(obj)
    }

    // 3. 如果要克隆的是一个数组,则新建数组, 是对象则新建对象
    let newObj 
    
    if(Array.isArray(obj)) {
        newObj = []
        // 遍历obj,进行拷贝
        obj.forEach((item, index) => {
            newObj[index] = deepClone(item, map)
        })
    } else {
        // 是对象
        newObj = {}
        for(let key of Object.keys(obj)) {
            // if(obj.hasOwnProperty(key)) {
            if(Reflect.hasOwn(obj, key)){
                // 原型上的不取
                newObj[key] = deepClone(obj[key], map)
            }
        }
    }
    
    // 4. 记录
    map.set(obj, newObj)


    // 5. 返回结果
    return newObj
}



// // 浅拷贝示例
// let obj1 = {a: 1, b: 2};
// let obj2 = Object.assign({}, obj1);
// console.log(obj2); // {a: 1, b: 2}

// // 深拷贝示例, 只能一层
// let obj3 = {a: {b: 1}};
// let obj4 = JSON.parse(JSON.stringify(obj3));
// console.log(obj4); // {a: {b: 1}}

/**
 * 浅拷贝通常是指拷贝数组和对象
 * 
 * - 扩展运算符 ...
 * - object.assign()
 * - concat
 * - slice
 * - Array.from
 */