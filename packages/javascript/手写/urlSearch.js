/**
 * 使用URLSearchParams 来获取查询字符串
 *
 */

export default function getParams(url) {
  // 如果传入的不是完整的url,而只是后面的search

  // 如果只是以?开头表示时search
  let paramsStr = /$\?.+/

  if (paramsStr.test(url)) {
    let searchParams = new URLSearchParams(url)
    return Array.from(searchParams.entries())
  }

  let newUrl = new URL(url)
  let searchParams = new URLSearchParams(newUrl.search)

  return Array.from(searchParams.entries())
}

export function getParams2(url) {
  // https://example.com?foo=1&bar=2"

  // 以问号分割
  const search = url.split("?")[1]
  const parmas = search.split("&")

  const parasmObj = {}

  parmas.forEach(param => {
    let [key, value] = param.split("=")
    parasmObj[key] = value
  })

  return parasmObj
}
