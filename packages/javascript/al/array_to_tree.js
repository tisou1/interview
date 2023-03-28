const tree = [{
  id: '01',
  name: '张大大',
  pid: '',
  job: '项目经理',
  children: [{
    id: '02',
    name: '小亮',
    pid: '01',
    job: '产品leader',
    children: [{
      id: '07',
      name: '小丽',
      pid: '02',
      job: '产品经理',
    }, {
      id: '08',
      name: '大光',
      pid: '02',
      job: '产品经理',
    }],
  }, {
    id: '03',
    name: '小美',
    pid: '01',
    job: 'UIleader',
    children: [{
      id: '09',
      name: '小高',
      pid: '03',
      job: 'UI设计师',
    }],
  }, {
    id: '04',
    name: '老马',
    pid: '01',
    job: '技术leader',
    children: [{
      id: '10',
      name: '小刘',
      pid: '04',
      job: '前端工程师',
    }, {
      id: '11',
      name: '小华',
      pid: '04',
      job: '后端工程师',
    }, {
      id: '12',
      name: '小李',
      pid: '04',
      job: '后端工程师',
    }],
  }, {
    id: '05',
    name: '老王',
    pid: '01',
    job: '测试leader',
    children: [{
      id: '13',
      name: '小赵',
      pid: '05',
      job: '测试工程师',
    }, {
      id: '14',
      name: '小强',
      pid: '05',
      job: '测试工程师',
    }],
  }, {
    id: '06',
    name: '老李',
    pid: '01',
    job: '运维leader',
    children: [{
      id: '15',
      name: '小涛',
      pid: '06',
      job: '运维工程师',
    }],
  }],
}]

const data = [
  { id: '01', name: '张大大', pid: '', job: '项目经理' },
  { id: '02', name: '小亮', pid: '01', job: '产品leader' },
  { id: '03', name: '小美', pid: '01', job: 'UIleader' },
  { id: '04', name: '老马', pid: '01', job: '技术leader' },
  { id: '05', name: '老王', pid: '01', job: '测试leader' },
  { id: '06', name: '老李', pid: '01', job: '运维leader' },
  { id: '07', name: '小丽', pid: '02', job: '产品经理' },
  { id: '08', name: '大光', pid: '02', job: '产品经理' },
  { id: '09', name: '小高', pid: '03', job: 'UI设计师' },
  { id: '10', name: '小刘', pid: '04', job: '前端工程师' },
  { id: '11', name: '小华', pid: '04', job: '后端工程师' },
  { id: '12', name: '小李', pid: '04', job: '后端工程师' },
  { id: '13', name: '小赵', pid: '05', job: '测试工程师' },
  { id: '14', name: '小强', pid: '05', job: '测试工程师' },
  { id: '15', name: '小涛', pid: '06', job: '运维工程师' },
]

export function arrayToTree(arr) {
  if (!Array.isArray(arr))
    throw new TypeError('arr非数组')

  // 1. 遍历,使用map进行缓存
  const map = new Map()
  arr.forEach((item) => {
    map.set(item.id, item)
  })

  // 2. 再次遍历,开始转换
  const ans = []
  arr.forEach((item) => {
    const parent = map.get(item.pid)
    if (parent) {
      // 子节点
      if (parent.children)
        parent.children.push(item)

      else
        parent.children = [item]
    }
    else {
      // 根节点
      ans.push(item)
    }
  })

  return ans
}

// 采用的是深度遍历

export function treeToList(tree) {
  const list = []
  const stack = [...tree]
  while (stack.length) {
    // 先进后出
    const node = stack.pop()
    const children = node.children
    if (children)
      stack.push(...children)
    // 这里可以考虑把children属性去掉
    Reflect.deleteProperty(node, 'children')
    list.push(node)
  }

  return list
}

// 也可以采用广度遍历
export function treeToList2(tree) {
  const ans = []
  const queue = [...tree]
  while (queue.length) {
    // 先进先出
    const node = queue.shift()
    const children = node.children
    if (children)
      queue.push(...children)

    Reflect.deleteProperty(node, children)
    ans.push(node)
  }
}
