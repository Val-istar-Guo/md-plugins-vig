import { middleware } from 'md-core/utils'
import { version } from '../package.json';
import { text } from './nodes'


export default middleware({
  version,
  name: 'normalize',
  input: 'source',
  parse: ({ lexical }, node) => {
    // console.log(lexical.toEnd())
    const string = lexical.toEnd()
      .replace(/^\s*\n/, "")
      .replace(/\s*$/, '')
    if (string.length) return node('block', string)
    else return text(node)('')
  }
})
