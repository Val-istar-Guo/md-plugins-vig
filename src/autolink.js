import { middleware, combine } from 'md-core/utils';
import { version } from '../package.json';
import { inline, hyperlink } from './nodes'
import text from './text'
import paragraph from './paragraph'
import angleBracketsEscaped from './escaped/angleBrackets'


const emailLink = node => email => ({
  ...node('email-link', email),
  email,
  parse(h) {
    const { email, value } = this
    return h('a', { href: `mailto:${email}` }, [value])
  }
})

const autolinkCreator = node => ([, uri, protocol, email]) => {
  if (email) return emailLink(node)(email)
  else if (protocol === 'mailto') return emailLink(node)(uri.substr("mailto:".length))
  else return hyperlink(node)(uri, uri)
}

const autolink = middleware({
  version,
  name: 'autolink',
  input: 'inline',
  parse: ({ lexical }, node) => {
    const patt = /^<(?:((https?|ftp|mailto):[^>\\]+)|(.*?@.*?\.[a-zA-Z]+))(?!\\)>/g;

    return lexical.match(patt, inline(node), autolinkCreator(node))
  },
});


export default combine(angleBracketsEscaped, paragraph, autolink, text)
