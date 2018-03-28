import { nodes, middleware } from 'md-core';
import splitInline from './utils/splitInline';


const { vnode, vtext } = nodes;

export default middleware({
  name: 'inlineCode',
  input: 'inline',
  parse: node => {
    const patt = /(`+)(.*?)\1/g;
    const group = splitInline(node, patt, matched => {
      const codeText = vtext(matched[2]).nameAs('inline code')
      return vnode('code', [codeText]);
    })

    if (group.length) return group;
    return node;
  },
});
