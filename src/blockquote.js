import { combine, middleware } from 'md-core/utils'
import { version } from '../package.json';
import { block } from './nodes'
import paragraph from './paragraph'
import normilize from './normilize'



const blockquoteCreator = node => ([value]) => ({
  ...node('blockquote', [block(node)(value.replace(/^>[ \f\r\t\v]*/mg, ""))]),
  parse(h) {
    const { children } = this

    return h('blockquote', {}, this.children.map(child => child.parse(h)))
  }
})


const blockquote = middleware({
  version,
  name: 'blockquote',
  input: 'block',
  parse: ({ lexical }, node) => {
    const patt = /^(?:>\s*.*(?:\n|$))+/mg;

    return lexical.match(patt, block(node), blockquoteCreator(node))
    // const group = [];

    // while(true) {
    //   const lastIndex = patt.lastIndex;
    //   const next = patt.exec(str);

    //   if (!next) {
    //     if (lastIndex && lastIndex < str.length) {
    //       group.push(block(str.substr(lastIndex)));
    //     }
    //     break;
    //   }

    //   if (next.index !== lastIndex) {
    //     group.push(block(str.substring(lastIndex, next.index)));
    //   }

    //   const block$ = block(next[0].replace(/^>[ \f\r\t\v]*/mg, ""));
    //   const blockquote$ = vnode('blockquote', [block$]);
    //   group.push(blockquote$);
    // }

    // if (group.length) return group;
    // return node;
  },
});


export default combine(normilize, blockquote, paragraph)
