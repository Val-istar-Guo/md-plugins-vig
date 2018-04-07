import { nodes, middleware } from 'md-core';
import { inline } from './nodes'


const { vnode } = nodes;

export default middleware({
  name: 'image',
  input: 'inline',
  parse: (node, option) => {
    const patt = /^!\[\s*([^\]\[]*)\s*\]\(\s*(\S*?)(?:\s+(["'])(.*?)\3)?\s*\)/g;
    const { placeholder } = option;

    const matched = patt.exec(node.text)
    if (!matched) return node


    const [, alt, src, , title] = matched;
    const result = [vnode('img', { alt, src: src || placeholder, title })]

    if (node.text.length > patt.lastIndex) {
      result.push(inline(node.text.substr(patt.lastIndex)))
    }

    return result
  },
});
