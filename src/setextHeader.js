import { nodes, middleware } from 'md-core';
import splitBlock from './utils/splitBlock';
import { inline } from './nodes';


const { vnode } = nodes;

export default middleware({
  name: 'setext header',
  input: 'block',
  parse: node => {
    const patt = /(.*)\n([-=])\2\2+(?:\n|$)/g;
    const group = splitBlock(node, patt, matched => {
      const tagName = matched[2] === '=' ? 'h1' : 'h2';
      const inline$ = inline(matched[1]);
      const header$ = vnode(tagName, [inline$]);

      return header$;
    })

    if (group.length) return group;
    return node;
  },
});
