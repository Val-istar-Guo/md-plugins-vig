import { combine, middleware } from 'md-core/utils'
import { version } from '../package.json';
import { inline } from './nodes'
import paragraph from './paragraph'
import text from './text'


const breakCeator = node => () => ({
  ...node('break'),
  parse(h) {
    return h('br')
  }
})

const br = middleware({
  version,
  name: 'br',
  input: 'inline',
  parse: ({ lexical }, node) => {
    const patt = /^  \n/g;
    return lexical.match(patt, inline(node), breakCeator(node))
  },
});

export default combine(paragraph, br, text);
