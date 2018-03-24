import { nodes } from 'md-core';
import { inline } from './nodes';
import splitInline from './utils/splitInline';


const { vnode } = nodes;

export default (option = {}) => ({
  name: 'hyperlink',
  input: 'inline',
  parse: node => {
    const patt = /\[\s*([^\]\[]*)\s*\]\(\s*(\S*?)(?:\s+(["'])(.*?)\3)?\s*\)/g;
    const { placeholder } = option;
    const group = splitInline(node, patt, matched => {
      const [, text, href = placeholder, , title] = matched;
      const inline$ = inline(text);
      return vnode('a', { href: href || placeholder, title }, [inline$]);
    })

    if (group.length) return group;
    return node;
  },
});
