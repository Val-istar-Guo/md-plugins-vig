import { combine, middleware } from 'md-core/utils'
import { version } from '../package.json';
import { inline } from './nodes'
import paragraph from './paragraph'
import text from './text'
import asteriskEscaped from './escaped/asterisk'
import underscoreEscaped from './escaped/underscore'


const typeName = {
  '*': 'asterisk',
  '_': 'underline',
}

const boldCreator = node => ([, , type, content]) => ({
  ...node('bold', [inline(node)(content)]),
  type: typeName[type],
  parse(h) {
    const { children, type } = this
    return h('strong', { class: type }, children.map(child => child.parse(h)))
  }
});


const inlineBold = middleware({
  version,
  name: 'inline-bold',
  input: 'inline',
  parse: ({ lexical }, node) => {
    const patt = /^(([*_])\2)((?:\s|\S)*?[^\\])\1/g
    return lexical.match(patt, inline(node), boldCreator(node))
  },
});

export default combine(asteriskEscaped, underscoreEscaped, paragraph, inlineBold, text)
