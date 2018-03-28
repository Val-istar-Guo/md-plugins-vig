import { nodes, middleware } from 'md-core';
import { block } from './nodes';


const { vnode } = nodes;

export default middleware({
  name: 'blockquote',
  input: 'block',
  parse: node => {
    const str = node.text;
    const patt = /^(?:>\s*.*(?:\n|$))+/mg;
    const group = [];

    while(true) {
      const lastIndex = patt.lastIndex;
      const next = patt.exec(str);

      if (!next) {
        if (lastIndex && lastIndex < str.length) {
          group.push(block(str.substr(lastIndex)));
        }
        break;
      }

      if (next.index !== lastIndex) {
        group.push(block(str.substring(lastIndex, next.index)));
      }

      const block$ = block(next[0].replace(/^>[ \f\r\t\v]*/mg, ""));
      const blockquote$ = vnode('blockquote', [block$]);
      group.push(blockquote$);
    }

    if (group.length) return group;
    return node;
  },
});
