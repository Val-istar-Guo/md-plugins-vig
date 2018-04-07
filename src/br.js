import { nodes, middleware } from 'md-core';
import { inline } from './nodes'


const { vnode } = nodes;

export default middleware({
  name: 'br',
  input: 'inline',
  parse: node => {
    const patt = /^  \n/g;
    const matched = patt.exec(node.text)
    if (!matched) return node

    const result = [vnode('br')]
    if (node.text.length > patt.lastIndex) {
      result.push(inline(node.text.substr(patt.lastIndex)))
    }

    return result
  },
});
