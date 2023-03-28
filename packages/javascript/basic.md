
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
const a = {}
console.log(a.__proto__)
```

- 函数

```js
function Fn() {}
console.log(Fn.prototype)
```

- 函数和对象

```js
const a = {}
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

xhr.addEventListener('load', () => {
  if (xhr.status === 200)
    console.log(xhr.response, '响应')

  else
    console.error('请求失败：', xhr.statusText)

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


#### 11. let和const注意点

- 声明的变量只在声明时的代码块有效
- 不存在变量提升
- 存在暂时性死区没如果在变量声明前使用,会报错
- 不允许重复声明


#### 12. Es6都有什么Iterator遍历器

Set Map
遍历器(Iterator)是一种接口,为各种不同的数据结构提供统一的访问机制.任何数据结构只要部署了`Iterator`接口,就可以完成遍历操作.

默认部署了`Iterator`的数据有Array, Set, Map, String, arguments, NodeList, TypesArray


#### 13. Es6中的类的概念

是一种语法糖, 其绝大多数功能,ES5都可以实现,`class`写法只是让对象原型的写法更加清晰

类中所有方法都是定义在类的`prototype`属性上的

```js
    class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

=========== 等同于 ==============

function Point() {}

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```

**静态方法和私有方法**, 静态方法只能通过类名来调用, 而私有方法只能在类内部使用,通过`this.#getName`形式化来调用  
这两种方法,都不能被实例对象调用.

#### 14. this指向问题

**具体来说，this 的值由以下几个因素决定：**

- 函数调用方式：函数可以通过四种方式进行调用，包括作为函数、方法、构造函数和事件处理程序进行调用。这些调用方式会影响 this 的值。

- 执行上下文：每个函数都有自己的执行上下文，在执行上下文中，this 的值被绑定到特定的对象。函数的执行上下文取决于函数调用的方式，以及在哪个上下文中定义该函数。

- 箭头函数：箭头函数没有自己的 this 绑定，它会继承外层作用域的 this 值。因此，在箭头函数中使用 this 时，它将引用外层作用域的 this。

**常见的函数调用方式**

- 在函数中，this 指向全局对象（window）。

- 在对象方法中，this 指向调用该方法的对象。

- 在构造函数中，this 指向实例化的对象。

- 在事件处理程序中，this 指向触发事件的元素。


#### 15. base64编码

Base64编码是一种将二进制数据转换为ASCII字符的编码方法，它并不是一种压缩算法，它不会减少数据的大小。Base64编码只是将原始数据转换为可打印的字符集，例如字母、数字和一些特殊字符，以便于在网络上传输和存储。

在实际应用中，Base64编码通常用于将二进制数据转换为文本格式，以便于在各种网络环境下进行传输和处理，例如在电子邮件中嵌入图像、在网页中嵌入图片或在网络API中传递二进制数据。但是，Base64编码并不能减少数据的大小，实际上，它会将原始数据增加了1/3左右的大小，因为每3个字节的二进制数据会被编码为4个字符。

如果需要对数据进行压缩，可以使用各种压缩算法，例如gzip、deflate、bzip2等。这些压缩算法可以将数据的大小减少到原来的一部分或更小，以便更有效地传输和存储数据。在实际应用中，通常会先对数据进行压缩，然后再使用Base64编码将压缩后的数据转换为文本格式，以便于传输和处理。


#### 16. EventLoop

当前执行栈执行完毕时会立刻先处理所有微任务队列中的事件，然后再去宏任务队列中取出一个事件。同一次事件循环中，微任务永远在宏任务之前执行。


#### 17. 异步处理

- 回调函数
```js
function getData(url, callBack) {
  // 模拟发送网络请求
  setTimeout(() => {
    // 假设 res 就是返回的数据
    const res = {
      url,
      data: Math.random(),
    }
    // 执行回调，将数据作为参数传递
    callBack(res)
  }, 1000)
}

// 模拟发送请求

getData('/page/1?param=123', (res1) => {
  console.log(res1)
  getData(`/page/2?param=${res1.data}`, (res2) => {
    console.log(res2)
    getData(`/page/3?param=${res2.data}`, (res3) => {
      console.log(res3)
    })
  })
})
```
- Promise

```js
function getDataAsync(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = {
        url,
        data: Math.random(),
      }
      resolve(res)
    }, 1000)
  })
}

getDataAsync('/page/1?param=123')
  .then((res1) => {
    console.log(res1)
    return getDataAsync(`/page/2?param=${res1.data}`)
  })
  .then((res2) => {
    console.log(res2)
    return getDataAsync(`/page/3?param=${res2.data}`)
  })
  .then((res3) => {
    console.log(res3)
  })
```
- Generator函数

```js
function * getData() {
  const res1 = yield getDataAsync('/page/1?param=123')
  console.log(res1)
  const res2 = yield getDataAsync(`/page/2?param=${res1.data}`)
  console.log(res2)
  const res3 = yield getDataAsync(`/page/2?param=${res2.data}`)
  console.log(res3)
}

const g = getData()
g.next().value.then((res1) => {
  g.next(res1).value.then((res2) => {
    g.next(res2).value.then(() => {
      g.next()
    })
  })
})
```


- async/await

```js
async function getData() {
  const res1 = await getDataAsync('/page/1?param=123')
  console.log(res1)
  const res2 = await getDataAsync(`/page/2?param=${res1.data}`)
  console.log(res2)
  const res3 = await getDataAsync(`/page/2?param=${res2.data}`)
  console.log(res3)
}
```