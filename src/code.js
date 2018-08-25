import { combine, middleware } from 'md-core/utils'
import { version } from '../package.json';
import normilize from './normilize'
import { block, code } from './nodes'


const codeCreator = node => ([value]) => code(node)(value.replace(/^( {0,3}\t| {4})/mg, ''))

const indentCode = middleware({
  version,
  name: 'code',
  input: 'block',
  parse: ({ lexical }, node) => {
    const patt = /^(?:(?:\s*\n)*(?: {0,3}\t| {4}).*(?:\n|$))+/g
    return lexical.match(patt, block(node), codeCreator(node))
  },
})


export default combine(normilize, indentCode)
