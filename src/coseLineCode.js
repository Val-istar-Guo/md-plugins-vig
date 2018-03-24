import { nodes } from 'md-core';
import splitBlock from './utils/splitBlock';
import { block } from './nodes';


const { vnode, vtext } = nodes;

export default () => ({
  name: 'code',
  input: 'block',
  parse: node => {
    const patt = /^(`{3,})(.*)\n((?:.*\n)*?)\1/mg;
    const group = splitBlock(node, patt, matched => {
      const [, , lang, code] = matched
      const text = vtext(code).nameAs('plain code')
      const code$ = vnode('code', { class: lang }, [code])
      const pre$ = vnode('pre', [code$])
      return pre$

    });

    if (group.length) return group
    return node
  },
});
