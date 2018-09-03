import { middleware, combine } from 'md-core/utils'
import { version } from '../../package.json';
import { inline, text } from '../nodes'
import backslash from './backslash';


const underscore = middleware({
  version,
  name: 'underscore-escaped',
  input: 'inline',
  parse: ({ lexical }, node) => {
    const patt = /^\\_/g
    return lexical.match(patt, inline(node), () => text(node)('_'))
  },
})

export default combine(backslash, underscore);
