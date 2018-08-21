import { middleware } from 'md-core/utils'
import { version } from '../package.json'
import { block } from './nodes'


const blockSeparatorAstNode = node => () => ({
  ...node('block-separator'),
  parse(h) {
    return '';
  }
})

export default middleware({
  version,
  name: 'block-separator',
  input: 'block',
  parse: ({ lexical }, node) => {
    const patt = /^(\s*\n)+/g
    return lexical.match(patt, block(node), blockSeparatorAstNode(node))
  },
})
