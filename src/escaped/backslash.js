import { middleware } from 'md-core/utils'
import { version } from '../../package.json';
import { inline, text } from '../nodes'


export default middleware({
  version,
  name: 'backslash-escaped',
  input: 'inline',
  parse: ({ lexical }, node) => {
    const patt = /^(\\\\)/g
    return lexical.match(patt, inline(node), () => text(node)('\\'))
  },
})
