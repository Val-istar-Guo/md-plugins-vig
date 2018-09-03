import { middleware, combine } from 'md-core/utils'
import { version } from '../../package.json';
import { inline, text } from '../nodes'
import backslash from './backslash';


const parenthesis = middleware({
  version,
  name: 'parenthesis-escaped',
  input: 'inline',
  parse: ({ lexical }, node) => {
    const patt = /^\\([()])/g
    return lexical.match(patt, inline(node), ([, symbol]) => text(node)(symbol))
  },
})

export default combine(backslash, parenthesis);
