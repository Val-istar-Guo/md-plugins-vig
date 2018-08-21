import { combine, middleware } from 'md-core/utils'
import { version } from '../package.json';
import { inline } from './nodes'
import paragraph from './paragraph'
import text from './text'


const typeName = {
  '*': 'asterisk',
  '_': 'underline',
}

const boldCreator = node => ([, , type, content]) => ({
  ...node('bold', [inline(node)(content)]),
  type: typeName[type],
  parse(h) {
    const { children, type } = this
    return h('strong', { class: type }, children.map(child => child.parse(h)))
  }
});


const inlineBold = middleware({
  version,
  name: 'inline-bold',
  input: 'inline',
  parse: ({ lexical }, node) => {
    // const startPatt = /^([\*_])\1(?=[^*])/g
    // const createEndPatt = style => style === '*' ? /(.)\*\*/g : /(.)__/g;

    const patt = /^(([*_])\2)((?:\s|\S)+)(?!\\)\1/g
    return lexical.match(patt, inline(node), boldCreator(node))

    // const startMatched = startPatt.exec(node.text)
    // if (!startMatched) return node;
    // const [, style] = startMatched
    // const endPatt = createEndPatt(style)

    // const str = node.text.substr(2)
    // while (true) {
    //   const matched = endPatt.exec(str)

    //   if (!matched) break;

    //   if (matched[1] !== '\\') {
    //     const result = [
    //       vnode('strong', { class: className[style] }, [inline(str.substr(0, matched.index + 1))]),
    //     ]

    //     if (endPatt.lastIndex < str.length) {
    //       result.push(inline(str.substr(endPatt.lastIndex)))
    //     }

    //     return result
    //   }
    // }

    // return node
  },
});

export default combine(paragraph, inlineBold, text)
