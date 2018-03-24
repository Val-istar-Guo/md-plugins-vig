import { nodes } from 'md-core';
import splitInline from './utils/splitInline';


const { vnode } = nodes;

export default (option = {}) => ({
  name: 'image',
  input: 'inline',
  parse: node => {
    const patt = /!\[\s*([^\]\[]*)\s*\]\(\s*(\S*?)(?:\s+(["'])(.*?)\3)?\s*\)/g;
    const { placeholder } = option;
    const group = splitInline(node, patt, matched => {
      const [, alt, src, , title] = matched;
      return vnode('img', { alt, src: src || placeholder, title });
    })

    if (group.length) return group;
    return node;
  },
});
