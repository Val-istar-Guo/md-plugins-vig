import { nodes, middleware } from 'md-core';
import { inline } from './nodes'


const { vnode } = nodes;

export default middleware({
  name: 'inlineCode',
  input: 'inline',
  parse: node => {
    const { text } = node
    if (text.length > 1) return [
      inline(text.charAt(0)),
      inline(text.substr(1)),
    ]

    return node
  },
})
