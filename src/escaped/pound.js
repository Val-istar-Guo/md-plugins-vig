import { middleware, combine } from 'md-core/utils'
import { version } from '../../package.json';
import { inline, text } from '../nodes'
import backslash from './backslash';


const pound = middleware({
  version,
  name: 'pound-escaped',
  input: 'inline',
  parse: ({ lexical }, node) => {
    const patt = /^\\#/g
    return lexical.match(patt, inline(node), () => text(node)('#'))
  },
})

export default combine(backslash, pound);
