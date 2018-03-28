import { nodes, middleware } from 'md-core';
import splitBlock from './utils/splitBlock';
import { block, plainCode } from './nodes';


const { vnode } = nodes;

export default middleware({
  name: 'code',
  input: 'block',
  parse: node => {
    const patt = /^(`{3,})(.*)\n((?:.*\n)*?)\1/mg;
    const group = splitBlock(node, patt, matched => {
      const [, , lang, text] = matched
      const text$ = plainCode(text, lang);
      const code$ = vnode('code', { class: lang }, [text$])
      const pre$ = vnode('pre', [code$])
      return pre$
    });

    if (group.length) return group
    return node
  },
});
