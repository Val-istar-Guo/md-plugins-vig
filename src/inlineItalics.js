import { nodes, middleware } from 'md-core';
import splitInline from './utils/splitInline';


const { vnode } = nodes;

const className = {
  '*': 'asterisk',
  '_': 'underline',
}

export default middleware({
  name: 'inlineCode',
  input: 'inline',
  parse: node => {
    const patt = /([\*_])(.*?)\1/g
    const group = splitInline(node, patt, matched => {
      const [, mark, em] = matched
      return vnode('em', { class: className[mark] }, [em]);
    })

    if (group.length) return group
    return node
  },
})
