import { nodes, middleware } from 'md-core';
import splitInline from './utils/splitInline';


const { vnode } = nodes;

const className = {
  '**': 'asterisk',
  '__': 'underline',
};

export default middleware({
  name: 'inlineCode',
  input: 'inline',
  parse: node => {
    const patt = /([*_]{2})(.*?)\1/g;
    const group = splitInline(node, patt, matched => {
      const [, mark, strong] = matched;
      return vnode('strong', { class: className[mark] }, [strong]);
    })

    if (group.length) return group;
    return node;
  },
});
