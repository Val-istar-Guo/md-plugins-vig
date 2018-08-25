import { combine, middleware } from 'md-core/utils'
import { version } from '../package.json';
import { inline } from './nodes'
import paragraph from './paragraph'
import text from './text'


const inlineCodeCreator = node => ([, , value]) => ({
  ...node('inline-code', value),
  parse(h) {
    const { value } = this
    return h('code', {}, [value])
  }
})

const inlineCode = middleware({
  version,
  name: 'inline-code',
  input: 'inline',
  parse: ({ lexical }, node) => {
    const patt = /^(`+)(.*?)\1/g;
    return lexical.match(patt, inline(node), inlineCodeCreator(node))
  },
});

export default combine(paragraph, inlineCode, text)
