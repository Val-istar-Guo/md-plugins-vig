import { combine, middleware } from 'md-core/utils';
import { version } from '../package.json';
import { inline } from './nodes'
import paragraph from './paragraph'
import text from './text'


const typeName = {
  '*': 'asterisk',
  '_': 'underline',
}

const italicsCreator = node => ([, type, content]) => ({
  ...node('bold', [inline(node)(content)]),
  type: typeName[type],
  parse(h) {
    const { children, type } = this
    return h('em', { class: type }, children.map(child => child.parse(h)))
  }
});

const inlineItalics = middleware({
  version,
  name: 'inline-italics',
  input: 'inline',
  parse: ({ lexical }, node) => {
    const patt = /^([*_])((?:\s|\S)+)(?!\\)\1/g
    return lexical.match(patt, inline(node), italicsCreator(node))
    // const startPatt = /^([\*_])(?=[^*])/g
    // const createEndPatt = style => style === '*' ? /(.)\*/g : /(.)_/g;

    // const startMatched = startPatt.exec(node.text)
    // if (!startMatched) return node;
    // const [, style] = startMatched
    // const endPatt = createEndPatt(style)

    // const str = node.text.substr(1)
    // while (true) {
    //   const matched = endPatt.exec(str)

    //   if (!matched) break;

    //   if (matched[1] !== '\\') {
    //     const result = [
    //       vnode('em', { class: className[style] }, [inline(str.substr(0, matched.index + 1))]),
    //     ]

    //     if (endPatt.lastIndex < str.length) {
    //       result.push(inline(str.substr(endPatt.lastIndex)))
    //     }

    //     return result
    //   }
    // }

    // return node
  },
})


export default combine(paragraph, inlineItalics, text)
