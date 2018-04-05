import { nodes, middleware } from 'md-core'
import hljs from 'highlight.js'


const { vtext, vnode, html } = nodes

export default middleware({
  name: 'highlight',
  input: 'plain code',
  parse: (node, option) => {
    let { code, lang } = node
    const { lineNumber = false } = option

    // NOTE: how to support line number?
    // if (lineNumber) {
    //   const lines$ = text.split('\n')
    //     .map(line => {
    //       const htmlText = hljs.highlight(lang, line).value;
    //       console.log('line: ', { line },'\n htmlText: ', { htmlText });
    //       return vnode('li', [line]);
    //     })

    //   const orderList = vnode('ol', lines$);
    //   return orderList;
    // }

    if (lang && hljs.getLanguage(lang)) {
      code = hljs.highlight(lang, code)
    } else {
      // const htmlText = hljs.highlightAuto(text)
      console.log(hljs.highlightAuto(code))
      code = hljs.highlightAuto(code)
    }

    const code$ = vnode('code', { class: code.language }, html(code.value))
    const pre$ = vnode('pre', [code$])

    return pre$
  }
})
