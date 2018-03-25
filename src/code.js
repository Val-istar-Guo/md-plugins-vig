import { nodes } from 'md-core';
import splitBlock from './utils/splitBlock';
import { block, plainCode } from './nodes';


const { vnode, vtext } = nodes;

export default () => ({
  name: 'code',
  input: 'block',
  parse: node => {
    const patt = /^(?:(?: {0,3}\t| {4}).*(?:\n|$))+/mg
    const group = splitBlock(node, patt, matched => {
      const [text] = matched
      const text$ = plainCode(text.replace(/^( {0,3}\t| {4})/mg, ''))
      const code$ = vnode('code', [text$]);
      const pre$ = vnode('pre', [code$])
      return pre$
    })

    if (group.length) return group
    return node
  },
});
