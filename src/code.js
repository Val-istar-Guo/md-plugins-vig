import { nodes } from 'md-core';
import splitBlock from './utils/splitBlock';
import { block } from './nodes';


const { vnode, vtext } = nodes;

export default () => ({
  name: 'code',
  input: 'block',
  parse: node => {
    const patt = /^(?:(?: {0,3}\t| {4}).*(?:\n|$))+/mg
    const group = splitBlock(node, patt, matched => {
      const [code] = matched
      const text = vtext(code.replace(/^( {0,3}\t| {4})/mg, ''))
        .nameAs('plain code')
      const code$ = vnode('code', [text])
      const pre$ = vnode('pre', [code$])
      return pre$
    })

    if (group.length) return group
    return node
  },
});
