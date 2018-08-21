import { middleware, combine } from 'md-core/utils'
import { version } from '../package.json';
import { header, block } from './nodes'
import normilize from './normilize'
import paragraph from './paragraph'


const headerCreator = node => ([, content, tag]) => header(node)(tag === '=' ? 1 : 2, content)

const setextHeader = middleware({
  version,
  name: 'setext-header',
  input: 'block',
  parse: ({ lexical }, node) => {
    const patt = /(.*)\n([-=])\2\2+(?:\n|$)/g;
    return lexical = lexical.match(patt, block(node), headerCreator(node))
  },
})

export default combine(normilize, setextHeader, paragraph)
