import { middleware, combine } from 'md-core/utils'
import { version } from '../package.json';
import normilize from './normilize'
import blockSeparator from './blockSeparator'
import text from './text'
import { inline, block } from './nodes'


const paragraphCreator = node => ([content]) => ({
  ...node('paragraph', [inline(node)(content)]),
  parse(h) {
    const { children } = this
    return h('p', {}, children.map(child => child.parse(h)))
  }
})

const paragraph = middleware({
  version,
  name: 'paragraph',
  input: 'block',
  parse: ({ lexical }, node) => {
    const patt = /^(\s*\S[\s\S]*?)(?:(?:(?:\s*\n){2})|(?:\n\s*$)|$)/g
    return lexical.match(patt, block(node), paragraphCreator(node))
  }
});

export default combine(normilize, blockSeparator, paragraph, text)
