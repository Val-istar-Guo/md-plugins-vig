import { combine, middleware } from 'md-core/utils';
import { version } from '../package.json';
import { inline, hyperlink } from './nodes';
import paragraph from './paragraph'
import text from './text'


const hyperlinkMiddleware = middleware({
  version,
  name: 'hyperlink',
  input: 'inline',
  parse: ({ lexical }, node, option) => {
    const patt = /^\[\s*([^\]\[]*)\s*\]\(\s*(\S*?)(?:\s+(["'])(.*?)\3)?\s*\)/g

    const { placeholder = '' } = option
    const hyperlinkCreator = ([, text, href = placeholder, , title]) =>
      hyperlink(node)(href || placeholder, text, title)

    return lexical.match(patt, inline(node), hyperlinkCreator)

    // const matched = patt.exec(node.text)
    // if (!matched) return node

    // const [, text, href = placeholder, , title] = matched

    // const inline$ = inline(text)
    // const result = [vnode('a', { href: href || placeholder, title }, [inline$])]


    // if (node.text.length > patt.lastIndex) {
    //   result.push(inline(node.text.substr(patt.lastIndex)))
    // }

    // return result
  },
});

export default combine(paragraph, hyperlinkMiddleware, text)
