import { combine, middleware } from 'md-core/utils';
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

const italicsCreator = node => ([, type, content]) => ({
  ...node('bold', [inline(node)(content)]),
  type: typeName[type],
  parse(h) {
    const { children, type } = this
    return h('em', { class: type }, children.map(child => child.parse(h)))
  }
});

const inlineItalics = middleware({
  version,
  name: 'inline-italics',
  input: 'inline',
  parse: ({ lexical }, node) => {
    const patt = /^([*_])((?:\s|\S)*?[^\\])\1/g
    return lexical.match(patt, inline(node), italicsCreator(node))
  },
})


export default combine(asteriskEscaped, underscoreEscaped, paragraph, inlineItalics, text)
