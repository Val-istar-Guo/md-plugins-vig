import { nodes } from 'md-core';
import { inline, block } from './nodes';
import splitBlock from './utils/splitBlock';


const { vnode } = nodes;

export default () => ({
  name: 'atxHeader',
  input: 'block',
  parse: node => {
    const patt = /^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/mg;
    const group = splitBlock(node, patt, matched => {
      const [, leave, header] = matched;
      const inline$ = inline(header);
      const header$ = vnode(`h${leave.length}`, [inline$]);
      return header$;
    });

    if (group.length) return group;
    return node;
  }
});
