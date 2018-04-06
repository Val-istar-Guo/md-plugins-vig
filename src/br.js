import { nodes, middleware } from 'md-core';
import splitInline from './utils/splitInline';


const { vnode } = nodes;

export default middleware({
  name: 'br',
  input: 'inline',
  parse: node => {
    const patt = /  \n/g;
    const group = splitInline(node, patt, matched => vnode('br'))

    if (group.length) return group;
    return node;
  },
});
