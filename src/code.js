import { nodes, middleware } from 'md-core';
import splitBlock from './utils/splitBlock';
import { block, plainCode } from './nodes';


const { vnode, vtext } = nodes;

export default middleware({
  name: 'code',
  input: 'block',
  parse: node => {
    const patt = /^(?:(?: {0,3}\t| {4}).*(?:\n|$))+/mg
    const group = splitBlock(node, patt, matched => {
      const [text] = matched
      const code$ = plainCode(text.replace(/^( {0,3}\t| {4})/mg, ''))
      return code$
    })

    if (group.length) return group
    return node
  },
});
