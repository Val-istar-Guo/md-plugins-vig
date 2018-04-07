import { nodes, middleware } from 'md-core';
import { inline } from './nodes'


const { vtext } = nodes;

// Only esacape: \ ` * _ { } [ ] ( ) # * + - . ! < >
export default middleware({
  name: 'escaped',
  input: 'inline',
  parse: node => {
    const patt = /^\\([\\`\*_{}\[\]()#\+.!\-<>])/g
    const matched = patt.exec(node.text)

    if (!matched) return node;

    const result = [vtext(matched[1]).nameAs('escaped')]
    if (node.text.length > patt.lastIndex) {
      result.push(inline(node.text.substr(patt.lastIndex)))
    }

    return result
  },
});
