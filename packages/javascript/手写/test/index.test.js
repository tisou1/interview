import { describe, it, expect } from "vitest"
import mytypeof from "../类型判断"
import { unique1, unique2, unique3, unique4 } from "../unique"
import { flat1, flat2, flat3 } from "../flat"
import _instanceof from '../instanceof'

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


it("原型判断", () => {
  expect(_instanceof([], Array)).toBe(true)
  expect(_instanceof('asd', Object)).toBe(true)
  expect(_instanceof('asd', Function)).toBe(false)
})