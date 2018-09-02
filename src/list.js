import { combine, middleware } from 'md-core/utils'
import { version } from '../package.json';
import { inline, block } from './nodes'
import normilize from './normilize'
import paragraph from './paragraph'


const prefix = (lines, string) => ({
  content: string + lines.content,
  nextItem: lines.nextItem,
  length: lines.length + string.length,
})

const matchSpace = (lexical) => {
  const buffer = []
  while(!lexical.end) {
    const char = lexical.next()
    if (char === ' ') buffer.push(char)
    else {
      lexical.backtrace()
      break
    }
  }

  if (!buffer.length) return ''

  return buffer.join('')
}

const matchIndentLine = (lexical, indent) => {
  // console.log('match indent line => ', indent)
  const buffer = []

  for (let i = 0; i < indent; i++) {
    if (lexical.end) {
      lexical.backtrace(buffer.length)
      return
    }

    const char = lexical.next()

    if (char === ' ') buffer.push(char)
    else {
      lexical.backtrace(buffer.length + 1)
      return
    }
  }

  const indentSpace = buffer.join('')

  const line = matchLine(lexical, indent)
  return { ...prefix(line, indentSpace), indent }

}

const matchLine = (lexical, indent) => {
  const buffer = []
  const beforeSpaces = matchSpace(lexical)
  if (lexical.end) {
    if (beforeSpaces.length) lexical.backtrace(beforeSpaces.length)
    return null
  }

  const next = lexical.next()
  if (next === '\n') {
    // just empty line
    lexical.backtrace(beforeSpaces.length + 1)
    return null
  }

  buffer.push(next)

  while(!lexical.end) {
    const char = lexical.next()

    if (char === '\n') {
      buffer.push(char)
      break
    }
    else buffer.push(char)
  }

  const content = beforeSpaces + buffer.join('')
  // console.log('match content: ', `"${content}"`)

  const nextItem = matchItems(lexical)
  // console.log('match content items: ', !!nextItem)
  if (nextItem) return { content, nextItem, length: content.length }

  const emptyline = matchEmptyLine(lexical, indent)
  // console.log('match empty line: ', !!emptyline)
  if (emptyline) return prefix(emptyline, content)

  const line = matchLine(lexical, indent)
  // console.log('match next line: ', !!line)
  if (line) return prefix(line, content)

  return { content, length: content.length }
}

const matchEmptyLine = (lexical, indent) => {
  const buffer = []

  while(!lexical.end) {
    const char = lexical.next()
    if (char === '\n') {
      buffer.push(char)
      break
    } else if (/\s/.test(char)) {
      buffer.push(char)
    } else {
      lexical.backtrace(buffer.length + 1)
      return null
    }
  }

  const content = buffer.join('')
  if (!content) return null

  const lines = matchEmptyLine(lexical, indent) || matchIndentLine(lexical, indent)
  if (lines) return prefix(lines, content)

  lexical.backtrace(content.length)
  return null;
}


const matchOl = lexical => {
  // console.log('match ol')
  const beforeSpaces = matchSpace(lexical)
  // console.log('ol before space length', beforeSpaces.length)

  if (beforeSpaces && beforeSpaces.length > 3) {
    lexical.backtrace(beforeSpaces.length)
    return
  }

  const buffer = []
  while (!lexical.end) {
    const char = lexical.next()
    if (/\d/.test(char)) buffer.push(char)
    else if (char === '.' && buffer.length) {
      buffer.push(char)
      break
    }
    else {
      lexical.backtrace(beforeSpaces.length + buffer.length + 1)
      return
    }
  }

  const number = buffer.join('')
  // console.log('ol tag: ', `"${number}"`)

  const afterSpaces = matchSpace(lexical)
  if (!afterSpaces) {
    lexical.backtrace(beforeSpaces.length + number.length)
    return
  }

  const content = beforeSpaces + number + afterSpaces

  return { type: 'ol', content, length: content.length }
}

const matchUl = lexical => {
  // console.log('match ul')
  const beforeSpaces = matchSpace(lexical)
  if (beforeSpaces && beforeSpaces.length > 3) {
    lexical.backtrace(beforeSpaces.length)
    return
  }

  const tag = lexical.next()
  // console.log('ul tag: ', `"${tag}"`, /[*-+]/.test(tag));
  if (!/[*\-+]/.test(tag)) {
    // console.log('ul backstrace', beforeSpaces.length + 1)
    lexical.backtrace(beforeSpaces.length + 1)
    return
  }

  const afterSpaces = matchSpace(lexical)
  // console.log('ul after space length', afterSpaces.length)
  if (!afterSpaces) {
    lexical.backtrace(beforeSpaces.length + tag.length)
    return ''
  }

  const content = beforeSpaces + tag + afterSpaces

  return { type: 'ul', content, length: content.length }
}

const matchItems = (lexical) => {
  if (lexical.end) return null;

  const tag = matchUl(lexical) || matchOl(lexical)
  if (!tag) return

  const indent = tag.length

  const lines = matchEmptyLine(lexical, indent) || matchLine(lexical, indent)
  lines.tag = tag
  lines.content = lines.content.replace(new RegExp(`\\n {${indent}}`, 'g'), '\n')

  if (lines.nextItem) {
    // console.log('item lines => ', lines)
    return {
      content: [lines].concat(lines.nextItem.content),
      length: tag.length + lines.length + lines.nextItem.length,
    }
  }
  return {
    content: [lines],
    length: tag.length + lines.length
  }
}


const matchList = lexical => {
  const items = matchItems(lexical)
  if (!items) return

  const listType = items.content[0].tag.type

  return { type: listType, content: items.content, length: items.length }
}



const listItemCreator = node => (tag, content) => ({
  ...node('list-item', content),
  type: tag.type,
  parse(h) {
    const { type, value, children } = this

    if (children.length) return h('li', { class: type }, children.map(child => child.parse(h)))
    return h('li', { class: type }, [value])
  }
})

const listCreator = node => (type, items) => ({
  ...node('list', items),
  type,
  parse(h) {
    const { type, children } = this
    return h(type, {}, children.map(child => child.parse(h)))
  }
})

const list = middleware({
  version,
  name: 'list',
  input: 'block',
  parse: ({ lexical, value }, node) => {
    // console.log('input', `"${value}"`)
    const list = matchList(lexical)

    if (!list) return
    // console.log('list => ', list)

    const items$ = list.content
      .map(item => {
        if (/^.*\n?$/.test(item.content)) {
          // sing line
          return listItemCreator(node)(item.tag, item.content.replace('\n', ''))
        }
        else {
          // multi line
          return listItemCreator(node)(item.tag, [block(node)(item.content)])
        }
      })

    const list$ = listCreator(node)(list.type, items$)

    if (!lexical.end) return [list$, block(node)(lexical.toEnd())]
    return list$
  }
})

export default combine(normilize, list, paragraph)
