import { nodes, middleware } from 'md-core';
import { inline } from './nodes'


const { vnode } = nodes;

const className = {
  '*': 'asterisk',
  '_': 'underline',
}

export default middleware({
  name: 'inlineCode',
  input: 'inline',
  parse: node => {
    const startPatt = /^([\*_])(?=[^*])/g
    const createEndPatt = style => style === '*' ? /(.)\*/g : /(.)_/g;

    const startMatched = startPatt.exec(node.text)
    if (!startMatched) return node;
    const [, style] = startMatched
    const endPatt = createEndPatt(style)

    const str = node.text.substr(1)
    while (true) {
      const matched = endPatt.exec(str)

      if (!matched) break;

      if (matched[1] !== '\\') {
        const result = [
          vnode('em', { class: className[style] }, [inline(str.substr(0, matched.index + 1))]),
        ]

        if (endPatt.lastIndex < str.length) {
          result.push(inline(str.substr(endPatt.lastIndex)))
        }

        return result
      }
    }

    return node
  },
})
