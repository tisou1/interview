# js进阶学习

## 作用域与作用域链

### 词法作用域

词法作用域是js中最常见的作用域类型,它主要是在代码编写阶段确定,而不是在代码执行的时候确定.在词法作用域中,变量的访问权限都是由它们在代码中的文职决定的

```js
function outer() {
  var outerVariable = "Hello";

  function inner() {
    var innerVariable = "World";
    console.log(outerVariable + " " + innerVariable);
  }

  inner();
}

outer(); // 输出: Hello World

```

上面的示例中,在`inner`函数内部可以访问`outer`函数中的变量`outerVariable`

**词法作用域的使用场景**
- 变量访问控制: 词法作用域使得我们可以控制变量的可见性和访问权限，避免命名冲突和变量污染。
- 模块化开发: 通过使用函数和闭包，可以实现模块化的代码组织，将变量和函数封装在私有作用域中，提供了良好的封装性和代码组织性。
- 函数嵌套: 函数嵌套是 JavaScript 中常见的编程模式，词法作用域确保了内部函数可以访问外部函数的变量，实现了信息的隐藏和封装。


### 作用域链

作用域链是js中用于查找变量的一种机制.它由当前作用域和其所有父级作用域的变量对象组成.  
当访问一个变量时,js会首先在当前作用域内查找,找不到的话会沿着作用域链逐层向上找,知道顶级作用域结束(全局作用域)

```js
var globalVariable = "Global";

function outer() {
  var outerVariable = "Hello";

  function inner() {
    var innerVariable = "World";
    console.log(globalVariable + " " + outerVariable + " " + innerVariable);
  }

  inner();
}

outer(); // 输出: Global Hello World

```
函数 inner 内部可以访问全局作用域中定义的变量 globalVariable，以及外部函数 outer 中定义的变量 outerVariable，这是因为 JavaScript 引擎按照作用域链的顺序查找变量。

**作用域链的使用场景**
- 变量查找: 作用域链决定了变量的查找顺序，使得 JavaScript 可以正确地找到并访问变量。
- 闭包: 通过创建闭包，内部函数可以访问外部函数的变量，实现了信息的保留和共享。
- 模块化开发: 作用域链的特性使得我们可以实现模块化的代码组织，将变量和函数封装在私有作用域中，提供了良好的封装性和代码组织性。



### 闭包
闭包是一个函数和其词法环境的组合.
闭包的概念就是,内部函数可以访问外部函数作用域中变量

```js
function createCounter() {
  var count = 0;

  return function() {
    count++;
    console.log(count);
  };
}

var counter = createCounter();
counter(); // 输出: 1
counter(); // 输出: 2
```

这里createCounter返回一个函数`counter`,每一次调用`counter`,`count`的值都会进行加1  
即使在外部函数执行完毕后，内部函数依然可以访问并修改变量 count，这就是闭包的特性。

**闭包的应用场景**

- 私有变量：闭包提供了一种实现私有变量的机制，可以隐藏变量并提供访问控制。
- 模块化开发：通过创建闭包，可以实现模块化的代码组织，将变量和函数封装在私有作用域中，提供了良好的封装性和代码组织性。
- 延迟执行：通过使用闭包，可以延迟执行函数，实现异步操作和事件处理。


## 执行上下文与闭包


## 函数上下文与this关键字


## 数组

常用方法:

**添加删除**
- push()
- pop()
- shift()
- unshift()
- splice()

**修改和访问元素**
- slice()
- concat()
- join()
- reverse()
- sort()


**数组遍历**
- forEach()
- map()
- some()
- every()
- reduce()
- filter()
- find()
- findLast()
- findIndex()
- findLastIndex()
- indexOf()
- lastIndexOf()


**其他方法**
- join()
- toString()
- at()  返回指定位置元素, 允许负数索引
- copyWith()
- entries()
- fill()
- flat()
- flat
- from()
- fromAsync() 由一个异步可迭代对象、可迭代对象或类数组对象创建一个新的、浅拷贝的 Array 实例。 实验性API
- isArray()
- keys()
- toReversed() 返回一个逆序之后的副本
- toSorted()  返回排序后的副本
- toSpliced() 返回删除和增加元素后的副本



## 原型和原型链

