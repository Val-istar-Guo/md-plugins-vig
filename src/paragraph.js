import { nodes } from 'md-core';
import splitBlock from './utils/splitBlock';
import { inline } from './nodes';


const { vnode, vtext } = nodes;

export default () => ({
  name: 'paragraph',
  input: 'block',
  parse: node => {
    const patt = /([\s\S]+?)(?:(?:\n(?:\s*\n)+)|$)/g;
    const group = splitBlock(node, patt, matched => {
      const p = matched[0].replace(/\s*\n/g, '');
      if (p.length) {
        const inline$ = inline(p)
        return vnode('p', [inline$]);
      }

      return vtext('');
    })

    if (group.length) return group;
    return node;
  }
});
