# 手写

## 1. 类型判断

对于基本类型,使用`typeof`判断即可
`number`, `string`, `undefined`, `symbol`, `bigInt`, `boolean`, `Function`

## 注意,typeof判断引用类型和null都是返回'object'
`typeof null === object`

对于引用类型,可以使用instanceOf
`Array`, 'Object', 'null', 'Regexp', 'Date',

> Array还可以使用 Arrar.isArray()来判断

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);
```