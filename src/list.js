import { nodes, middleware } from 'md-core';
import { inline, block } from './nodes';
import splitBlock from './utils/splitBlock';


const { vnode } = nodes;

const clearEnter = content => {
  const matched = /\n(\s*\n)*$/g.exec(content);
  if (!matched) return undefined;

  return matched[1]
}

const paragraph = str => {
  const patt = /(^.*\S.*$)+/m
}

const blockPara = (str, prefix) => {
  const patt = new RegExp(`^(\\s*\\n)+(${prefix}.*\\S.*(\\n|$))?`)

  const matched = patt.exec(str)
  if (!matched) return { pass: false }

  if (matched[2]) return { pass: true, value: matched[0] }

  return { pass: true, value: matched[0], end: true }
}

const inlinePara = (str) => {
  const patt = /^.*\S.*(\n|$)/

  const matched = patt.exec(str)
  if (!matched) return { pass: false }

  return { pass: true, value: matched[0] }
}

const content = (str, prefix) => {
  const stack = []
  // const patt = /^ {0,3}([*+-]|(\d+.)) +/
  const patt = new RegExp(`^ {0,${prefix.length - 1}}([*+-]|(\\d+\\.)) `)

  while (true) {
    if (patt.exec(str)) break;
    const iResult = inlinePara(str, prefix)

    if (iResult.pass) {
      stack.push(iResult.value)
      str = str.substr(iResult.value.length)
      continue
    }

    const bResult = blockPara(str, prefix)

    if (bResult.pass) {
      stack.push(bResult.value)
      str = str.substr(bResult.value.length)

      if (!bResult.end) continue
    }

    break;
  }

  return stack.join('');
}

const matchList = (str, patt) => {
  const stack = []

  while (true) {
    const matched = patt.exec(str)
    if (!matched) break;
    const [all] = matched
    const prefix = new Array(all.length).fill(' ').join('')
    str = str.substr(all.length)

    const value = content(str, prefix)
    stack.push({
      content: `${prefix}${value}`.replace(new RegExp(`^${prefix}`, 'mg'), ''),
      length: all.length + value.length,
    })
    str = str.substr(value.length)
  }

  const last = stack[stack.length - 1]
  const emptyLines = clearEnter(last.content)

  if (emptyLines) {
    last.content = last.content.substr(0, last.content.length - emptyLines.length)
    last.length = last.length - emptyLines.length
  }

  return stack
    .map(item => ({
      ...item,
    content: /.*\n.*\n/.test(item.content) ?
      block(item.content) : inline(item.content.replace(/\n$/, '')),
    }))
    .map(item => ({
      length: item.length,
      node: vnode('li', [item.content])
    }))
}

const findList = str => {
  const stack = []

  while (true) {
    const matched = /^( {0,3})([*+-]|(\d+\.)) /mg.exec(str)
    if (!matched) break;

    if (matched.index !== 0) {
      stack.push(block(str.substr(0, matched.index)))
      str = str.substr(matched.index)
    }

    let list = null;
    if (matched[3]) {
      list = matchList(str, /^( {0,3})(\d+\.)( )/)
      stack.push(vnode('ol', list.map(item => item.node)))
    } else {
      list = matchList(str, /^( {0,3})([*+-])( )/)
      stack.push(vnode('ul', list.map(item => item.node)))
    }

    const length = list
      .reduce((sum, item) => sum + item.length, 0)
    str = str.substr(length)
  }

  if (stack.length && str.length) stack.push(block(str))

  return stack;
}

export default middleware({
  name: 'list',
  input: 'block',
  parse: node => {
    const group = findList(node.text)

    if (group.length) return group;
    return node;
  },
});
