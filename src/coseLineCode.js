import { combine, middleware } from 'md-core/utils'
import { version } from '../package.json';
import { block, code } from './nodes'
import normilize from './normilize'


const codeCreator = node => ([, , lang, text]) => code(node)(text, lang)

const coseLineCode = middleware({
  version,
  name: 'cose-line-code',
  input: 'block',
  parse: ({ lexical, value }, node) => {
    const patt = /^(`{3,})(.*)\n([\S\s]*?)(?:\n\1)/g;
    return lexical.match(patt, block(node), codeCreator(node))
  },
})


export default combine(normilize, coseLineCode)
