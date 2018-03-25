import hljs from 'highlight.js';
import { nodes } from 'md-core';


const { vtext, vnode, html } = nodes;

export default (option = {}) =>({
  name: 'highlight',
  input: 'plain code',
  parse: node => {
    const { text, lang } = node;
    const { lineNumber = false } = option;

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


    const htmlText = hljs.highlight(lang, text).value;
    return html(htmlText)
  }
})
