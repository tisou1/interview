
#### 1. js的数据类型

```
    1. 基本数据类型
        Number, String, Boolean, Symbol, BigInt, Null, Undefined
    2. 引用类型Object
        Object, Function, Array, Regxg, Date, Error
```


#### 2. js内置对象

```
    - 值属性
        Infinity, NaN, undefined, null

    - 函数属性
        eval(), parseInt(), parseFloat()

    - 基本对象
        Object, Array, Boolean, Symbol, Error, RegExp, Function

    - 数字日期
        Number, Date, Math
    
    - 集合对象
        Set, Map, WeakSet, WeakMap

    - 控制抽象对象
        Promise, Generator
```


#### 3.null和undefined的区别

```
    - null表示空对象, undefined表示未定义
    - 使用typeof时,null返回object, undefined返回undefined
    - 使用==符号作用域null和undefined返回true,使用全等返回false
```

#### 4. 全等运算符和Object.is()区别

```
    - 主要区别是在+0和-0, NaN和NaN的比较上
    +0 === -0 // true
    Object.is(+0, -0) //false

    NaN === NaN // false
    Object.is(NaN, NaN) // true
```

#### 4. ==和===的区别

```
    使用==时,会有隐式类型转换,规则比较复杂, 引用类型会被转换为基本类型
        - 如果类型不同,会进行类型的转换,将他们转换为相同类型,在比较他们的值
        1 == '1' //true
        true == 1 //true
        null == undefined //true
        [] == 0 // true
        [] == false // true        
    使用===时,类型不同直接返回false, 最后才会判断值

```
**==的转换规则**
[MDN链接](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Equality)
- 字符串和数字比较, 会将字符串转换为数字之后在进行比较
- 其他类型与布尔,现将布尔转换为数字后,在应用其他规则
- null和undefined比较,结果为真
- 对象和非对象比较,先调用对象的[@@toPrimitive()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive)
valueOf() 和 toString() 方法将对象转换为基本类型。
- 

#### 5. 获取原型的方式

- 对象

```js
    let a = {}
    console.log(a.__proto__)
```

- 函数

```js
    function Fn() {}
    console.log(Fn.prototype)
```

- 函数和对象

```js
    let a = {}
    function Fn() {}
    Object.getPrototypeOf(a)
    Object.getPrototypeOf(Fn)

```

#### 6. js中安全的number范围

```
    Number.MAX_SAFE_INTEGER 最大安全数 - 2^53 - 1     9007199254740991的常量
    Number.MIN_SAFE_INTEGER 最小安全数 - -(2^53 - 1)
```

#### 7. isNaN和Number.isNaN区别

```
    都用于检测传入的值是否是NaN
    isNaN()会首先将值转为number类型,如果不可转换或者转换后为NaN,返回true
    Number.isNaN(),会先判断传入的值是否是numebr类型,不是返回false,是的话再判断是否是NaN
```

#### 8. 字符串转为数字

- Number
    前提是所包含的字符串不包含不合法字符。
- parseInt, parseFloat
    函数可解析一个字符串，并返回一个整数。还可以设置要解析的数字的基数。当基数的值为 0，或没有设置该参数时
- +
    前提是所包含的字符串不包含不合法字符。

#### 9. 创建一个ajax请求

```js
    const xhr = new XMLHttpRequest()

    xhr.addEventListener('load', function () {
        if(xhr.status === 200) {
            console.log(xhr.response, "响应")
        } else {
             console.error('请求失败：', xhr.statusText);
        }
    })

    xhr.open('GET', url, true)
    xhr.responseType = 'json'
    xhr.send()
```

#### 10. 手机浏览器的点击延迟

```
FastClick是一款解决移动端浏览器300ms延迟问题的JavaScript插件，其实现思路如下：

在移动设备上，浏览器会在触摸屏幕后等待300ms左右，以便判断用户是否要双击屏幕。这种行为被称为"click delay"（点击延迟）。

FastClick的解决方案是监听touchstart、touchmove和touchend事件，以及click事件。当触发touchend事件时，FastClick会立即模拟一个click事件，从而绕过浏览器的300ms点击延迟，使得页面反应更加灵敏。

为了防止触发click事件的同时，浏览器还会触发原生的click事件，FastClick使用stopImmediatePropagation()方法阻止事件传播，以避免事件被触发多次。

另外，FastClick还实现了一些特殊处理，比如对于滑动（touchmove）操作，会取消后续的click事件，以避免误触。同时，FastClick还会检测目标元素的disabled、readonly、href等属性，以决定是否模拟click事件。
```