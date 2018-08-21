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
    // const patt = /^(?:(?: {0,3}\t| {4}).*(?:\n|$))+/mg
    const patt = /^(?:(?:\s*\n)*(?: {0,3}\t| {4}).*(?:\n|$))+/g
    return lexical.match(patt, block(node), codeCreator(node))

    // const group = splitBlock(node, patt, matched => {
    //   const [text] = matched
    //   const code$ = plainCode(text.replace(/^( {0,3}\t| {4})/mg, ''))
    //   return code$
    // })

    // if (group.length) return group
    // return node
  },
})


export default combine(normilize, indentCode)
