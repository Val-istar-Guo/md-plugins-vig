import { combine, middleware } from 'md-core/utils'
import { version } from '../package.json';
import { inline } from './nodes'
import paragraph from './paragraph'
import text from './text'


const inlineCodeCreator = node => ([, , value]) => ({
  ...node('inline-code', value),
  parse(h) {
    const { value } = this
    return h('code', {}, [value])
  }
})

const inlineCode = middleware({
  version,
  name: 'inline-code',
  input: 'inline',
  parse: ({ lexical }, node) => {
    const patt = /^(`+)(.*?)\1/g;
    return lexical.match(patt, inline(node), inlineCodeCreator(node))

    // const matched = patt.exec(node.text)
    // if (!matched) return node

    // const codeText = vtext(matched[2]).nameAs('inline code')

    // const result = [vnode('code', [codeText])]

    // if (node.text.length > patt.lastIndex) {
    //   result.push(inline(node.text.substr(patt.lastIndex)))
    // }

    // return result
  },
});

export default combine(paragraph, inlineCode, text)
