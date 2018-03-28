import { nodes, middleware } from 'md-core';
import { inline } from './nodes';


const { vnode } = nodes;

export default middleware({
  name: 'autolink',
  input: 'inline',
  parse: node => {
    const str = node.text;
    const patt = /<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/g;
    const group = [];

    while(true) {
      const lastIndex = patt.lastIndex;
      const next = patt.exec(str);

      if (!next) {
        if (lastIndex && lastIndex < str.length) {
          group.push(inline(str.substr(lastIndex)));
        }
        break;
      }

      if (next.index !== lastIndex) {
        group.push(inline(str.substring(lastIndex, next.index)));
      }

      let a$;
      const [, uri, protocol, email] = next;
      if (email) {
        a$ = vnode('a', { href: `mailto:${email}` }, [email]);
      } else if (protocol === "mailto") {
        a$ = vnode('a', { href: encodeURI(uri) }, [uri.substr("mailto:".length)]);
      } else {
        a$ = vnode('a', { href: uri, }, [uri]);
      }
      group.push(a$);
    }

    if (group.length) return group;
    return node;
  },
});
