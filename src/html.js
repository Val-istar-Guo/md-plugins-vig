import { middleware, combine, htmlDecode } from 'md-core/utils'
import { version } from '../package.json';
import paragraph from './paragraph'
import text from './text'
import { inline, text as textNode } from './nodes';


const combineString = arr => {
  let stringArr = []
  const resultArr = []

  arr.forEach(value => {
    if (typeof value === 'string' || typeof value === 'number') stringArr.push(value)
    else {
      if (stringArr.length) resultArr.push(stringArr.join(''))
      resultArr.push(value)
      stringArr = []
    }
  })

  if (stringArr.length) resultArr.push(stringArr.join(''))

  return resultArr
}

const parseProps = str => {
  const patt = / (\S+?)(?:=(["']?)(.*?)\2)?(?=\s|$)/g
  const group = []

  while(true) {
    const matched = patt.exec(str)
    if (!matched) break

    const [, key, , value] = matched
    group.push({ key, value: value || true })
  }

  return group
    .reduce((obj, { key, value }) => {
      obj[key] = value
      return obj
    }, {})
}

const parseTag = string => {
  const matched = /^([\w-]+)((?: \S+(?:=(["']?).*?\3))*)\s*$/.exec(string)
  if (!matched) throw new Error()

  const [, tagName, props] = matched
  const properties = parseProps(props)

  return { type: 'node', tagName, properties, children: [] }
}

const patt = /([\s\S]*?)((?:<!--(.*?)-->)|(?:<\/([\w-]+?)>)|(?:<(.+?)\/>)|(?:<(.+?)>))/g

const parse = (string) => {
  const stack = []
  let lastIndex = 0
  let node = { type: 'node', tagName: '', properties: {}, children: [] }

  const pushString = (n, s) => {
    if (stack.length) {
      n.children.push(htmlDecode(s))
    } else n.children.push(s)
  }

  while (true) {
    if (!stack.length && node.children.length) {
      // 不是html标签开头字符串
      if (typeof node.children[0] !== 'object') return

      // 已经匹配到一个完整的标签
      if (string.length > lastIndex) pushString(node, string.substr(lastIndex))
      break
    }

    const matched = patt.exec(string)

    if (!matched) {
      // NOTE: 如果stack且node.children为空，则未匹配到html标签，不解析
      if (!stack.length && !node.children.length) return
      if (string.length > lastIndex) pushString(node, string.substr(lastIndex))
      break
    }

    lastIndex = patt.lastIndex
    const [, text, tagString, htmlAnnotation, endTag, selfCloseTag, startTag] = matched
    if (text) pushString(node, text)

    if (startTag) {
      stack.push(node)
      try {
        node = parseTag(startTag)
      } catch (e) {
        node = stack.pop()
        node.children.push(tagString)
      }
    } else if (endTag) {
      if (stack.length && node.tagName === endTag) {
        // const node$ = vnode(node.tagName, node.properties, node.children)
        const lastNode = node
        node = stack.pop()
        node.children.push(lastNode)
      } else {
        pushString(node, tagString)
      }
    } else if (selfCloseTag) {
      try {
        node.children.push(parseTag(selfCloseTag))
      } catch (e) {
        pushString(node, tagString)
      }
    } else if (htmlAnnotation) {
      // const node$ = annotation(htmlAnnotation)
      node.children.push({ type: 'annotation', value: htmlAnnotation })
    }
  }

  // 处理未出栈的标签
  while (stack.length) {
    const lastNode = node
    node = stack.pop()
    node.children.push(lastNode)
  }

  return combineString(node.children)
}



const htmlCreator = node => ({ tagName, properties, children }) => ({
  ...node('html', children.map(child => {
    if (typeof child === 'string') return textNode(node)(child)
    return htmlCreator(node)(child)
  })),
  tagName,
  properties,
  parse(h) {
    const { tagName, properties, children } = this
    return h(tagName, properties, children.map(child => child.parse(h)))
  }
})

const annotationCreaotr = node => ({ value }) => ({
  ...node('annotation', value),
  parse() {
    return ''
  }
})

const html = middleware({
  version,
  name: 'html',
  input: 'inline',
  parse: ({ value }, node) => {
    const nodes = parse(value)
    if (!nodes) return

    return nodes.map(item => {
      // tag
      if (typeof item === 'object') {
        if (item.type === 'node') return htmlCreator(node)(item)
        else return annotationCreaotr(node)(item)
      }
      // string
      return inline(node)(item)
    })
  },
});


export default combine(paragraph, html, text)
