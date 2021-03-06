import { middleware, combine } from 'md-core/utils'
import { version } from '../package.json'
import { header, block, inline, text } from './nodes'
import normilize from './normilize'
import paragraph from './paragraph'
import poundEscaped from './escaped/pound'


const headerCreator = node => ([, level, content]) =>
  header(node)(level.length, content)

const atxHeader = middleware({
  version,
  name: 'atx-header',
  input: 'block',
  parse: ({ lexical }, node, option) => {
    const patt = /^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/mg;
    return lexical.match(patt, block(node), headerCreator(node))
  },
})

const escaped = middleware({
  version,
  name: 'atx-header-escaped',
  input: 'inline',
  parse: ({ lexical }, node, option) => {
    const patt = /^\\#/g
    return lexical.match(patt, inline(node), () => text(node)('#'))
  },
})

export default combine(normilize, atxHeader, poundEscaped, paragraph)
