import { nodes, middleware } from 'md-core';
import { inline } from './nodes'


const { vnode, vtext } = nodes;

export default middleware({
  name: 'inlineCode',
  input: 'inline',
  parse: node => {
    const patt = /^(`+)(.*?)\1/g;

    const matched = patt.exec(node.text)
    if (!matched) return node

    const codeText = vtext(matched[2]).nameAs('inline code')

    const result = [vnode('code', [codeText])]

    if (node.text.length > patt.lastIndex) {
      result.push(inline(node.text.substr(patt.lastIndex)))
    }

    return result
  },
});
