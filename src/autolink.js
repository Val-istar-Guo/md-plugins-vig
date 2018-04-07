import { nodes, middleware } from 'md-core';
import { inline } from './nodes';


const { vnode } = nodes;

export default middleware({
  name: 'autolink',
  input: 'inline',
  parse: node => {
    const str = node.text;
    const patt = /^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/g;

    const matched = patt.exec(node.text)
    if (!matched) return node

    let a$;
    const [, uri, protocol, email] = matched;
    if (email) {
      a$ = vnode('a', { href: `mailto:${email}` }, [email]);
    } else if (protocol === "mailto") {
      a$ = vnode('a', { href: encodeURI(uri) }, [uri.substr("mailto:".length)]);
    } else {
      a$ = vnode('a', { href: uri, }, [uri]);
    }

    const result = [a$]

    if (node.text.length > patt.lastIndex) {
      result.push(inline(node.text.substr(patt.lastIndex)))
    }

    return result
  },
});
