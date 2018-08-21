import { middleware } from 'md-core/utils'
import { version } from '../package.json';
import { inline, text } from './nodes'


export default middleware({
  version,
  name: 'text',
  input: 'inline',
  parse: ({ lexical, value }, node) => {
    // NOTE: fix error when inline is an empty string
    if (lexical.end) return text(node)('')

    const char = lexical.next()
    if (lexical.end) return text(node)(char)
    return [text(node)(char), inline(node)(lexical.toEnd())]
  }
})
