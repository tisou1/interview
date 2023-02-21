import { describe, it, expect } from "vitest"
import mytypeof from "../类型判断"
import { unique1, unique2, unique3, unique4 } from "../unique"

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
    expect(unique3(a)).toEqual([1, 2, 3, 4, 5])
  })
})
