import { combine, middleware } from 'md-core/utils';
import { version } from '../package.json';
import { inline } from './nodes'
import paragraph from './paragraph'
import text from './text'


const imageCreator = (node, placeholder) => ([, alt, src, , title]) => ({
  ...node('img'),
  src: src || placeholder,
  alt,
  title,
  parse(h) {
    const { src, alt, title } = this
    return h('img', { src, alt, title })
  }
})

const image = middleware({
  version,
  name: 'image',
  input: 'inline',
  parse: ({ lexical }, node, option) => {
    const { placeholder } = option;
    const patt = /^!\[\s*([^\]\[]*)\s*\]\(\s*(\S*?)(?:\s+(["'])(.*?)\3)?\s*\)/g;

    return lexical.match(patt, inline(node), imageCreator(node, placeholder))


    // const matched = patt.exec(node.text)
    // if (!matched) return node


    // const [, alt, src, , title] = matched;
    // const result = [vnode('img', { alt, src: src || placeholder, title })]

    // if (node.text.length > patt.lastIndex) {
    //   result.push(inline(node.text.substr(patt.lastIndex)))
    // }

    // return result
  },
});

export default combine(paragraph, image, text)
