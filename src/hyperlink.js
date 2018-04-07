import { nodes, middleware } from 'md-core';
import { inline } from './nodes';


const { vnode } = nodes;

export default middleware({
  name: 'hyperlink',
  input: 'inline',
  parse: (node, option) => {
    const patt = /^\[\s*([^\]\[]*)\s*\]\(\s*(\S*?)(?:\s+(["'])(.*?)\3)?\s*\)/g
    const { placeholder } = option

    const matched = patt.exec(node.text)
    if (!matched) return node

    const [, text, href = placeholder, , title] = matched

    const inline$ = inline(text)
    const result = [vnode('a', { href: href || placeholder, title }, [inline$])]


    if (node.text.length > patt.lastIndex) {
      result.push(inline(node.text.substr(patt.lastIndex)))
    }

    return result
  },
});
