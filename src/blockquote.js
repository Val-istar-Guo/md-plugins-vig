import { combine, middleware } from 'md-core/utils'
import { version } from '../package.json';
import { block } from './nodes'
import paragraph from './paragraph'
import normilize from './normilize'



const blockquoteCreator = node => ([value]) => ({
  ...node('blockquote', [block(node)(value.replace(/^>[ \f\r\t\v]*/mg, ""))]),
  parse(h) {
    const { children } = this

    return h('blockquote', {}, children.map(child => child.parse(h)))
  }
})


const blockquote = middleware({
  version,
  name: 'blockquote',
  input: 'block',
  parse: ({ lexical }, node) => {
    const patt = /^(?:>\s*.*(?:\n|$))+/mg;

    return lexical.match(patt, block(node), blockquoteCreator(node))
  },
});


export default combine(normilize, blockquote, paragraph)
