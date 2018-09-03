import { middleware, combine } from 'md-core/utils'
import { version } from '../../package.json';
import { inline, text } from '../nodes'
import backslash from './backslash'


const angleBrackets = middleware({
  version,
  name: 'angle-brackets-escped',
  input: 'inline',
  parse: ({ lexical }, node) => {
    const patt = /^\\([<>])/g
    return lexical.match(patt, inline(node), ([, symbol]) => text(node)(symbol))
  },
})

export default combine(backslash, angleBrackets)
