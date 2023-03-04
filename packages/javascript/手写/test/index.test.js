import { describe, it, expect } from "vitest"
import mytypeof from "../类型判断"
import { unique1, unique2, unique3, unique4 } from "../unique"
import { flat1, flat2, flat3 } from "../flat"
import _instanceof from "../instanceof"
import _new from "../new"

import call from "../call"
import apply from "../apply"
import bind from "../bind"

import { curry, curry2 } from "../curry"

describe("手写测试", () => {
  it("类型判断typeof", () => {
    let a = []
    let b = "123"
    let c = {}

    expect(mytypeof(a)).toBe("array")
    expect(mytypeof(b)).toBe("string")
    expect(mytypeof(c)).toBe("object")

    expect(typeof null).toMatchInlineSnapshot('"object"')

    // instanceOf
    expect(new Date() instanceof Date).toBe(true)
    expect([] instanceof Array).toMatchInlineSnapshot("true")
  })
})

describe("数组去重", () => {
  let a = [1, 2, 3, 2, 3, 4, 5, 5, 4, 2, 1]

  it("去重函数1 -- (unique1)", () => {
    expect(unique1(a)).toEqual([1, 2, 3, 4, 5])
  })

  it("去重函数2 -- (unique2)", () => {
    expect(unique2(a)).toEqual([1, 2, 3, 4, 5])
  })

  it("去重函数3 -- (unique3)", () => {
    expect(unique3(a)).toEqual([1, 2, 3, 4, 5])
  })

  it("去重函数4 -- (unique4)", () => {
    expect(unique4(a)).toEqual([1, 2, 3, 4, 5])
  })
})

describe("数组扁平化", () => {
  const arr = [[1, [2, [3]], 6], 4]

  it("flat1 test", () => {
    expect(flat1(arr, 1)).toEqual([1, [2, [3]], 6, 4])
    expect(flat1(arr, 2)).toEqual([1, 2, [3], 6, 4])
    expect(flat1(arr, Infinity)).toEqual([1, 2, 3, 6, 4])
  })

  it("flat2 test", () => {
    expect(flat2(arr, 1)).toEqual([1, [2, [3]], 6, 4])
    expect(flat2(arr, 2)).toEqual([1, 2, [3], 6, 4])
    expect(flat2(arr, Infinity)).toEqual([1, 2, 3, 6, 4])
  })

  it("flat3 test", () => {
    expect(flat3(arr, 1)).toEqual([1, [2, [3]], 6, 4])
    expect(flat3(arr, 2)).toEqual([1, 2, [3], 6, 4])
    expect(flat3(arr, Infinity)).toEqual([1, 2, 3, 6, 4])
  })
})

it("原型判断, instanceOf", () => {
  expect(_instanceof([], Array)).toBe(true)
  expect(_instanceof("asd", Object)).toBe(false)
  expect(_instanceof("asd", Function)).toBe(false)
})

it("new运算符", () => {
  // 用法
  function Person(name, age) {
    this.name = name
    this.age = age

    // 如果构造函数内部，return 一个引用类型的对象，则整个构造函数失效，而是返回这个引用类型的对象，而不是返回this
    // 在实例中就没法获取Person原型上的getName方法
  }
  Person.prototype.say = function () {
    console.log(this.age)
  }
  let p1 = _new(Person, "porty", 18)
  expect(p1.name).toBe("porty")
})

describe("call, apply bind 测试", () => {
  function getName(...args) {
    console.log("args:", args)
    return this.name
  }

  let obj = {
    name: "siry",
  }
  it("call", () => {
    expect(call(obj, getName, "cc", "dd")).toBe("siry")
    expect(apply(obj, getName, ["cc", "dd"])).toBe("siry")
    expect(bind(obj, getName, "cc", "dd")("eee")).toBe("siry")
  })
})

it("", () => {
  const add = function (a, b, c) {
    return a + b + c
  }

  const fn = curry2(add)

  console.log(fn(1)(2)(3))

  expect(1 + 1).toBe(2)

  function getName(fn, ...args) {
    console.log(fn)
  }

  let obj = {
    name: "siry",
  }

  // getName.call(obj)
})
