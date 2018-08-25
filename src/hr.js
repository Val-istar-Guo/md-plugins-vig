import { combine, middleware } from 'md-core/utils';
import { version } from '../package.json';
import { block } from './nodes'
import normalize from './normilize';


const typeNames = {
  '-': 'dash',
  '_': 'underline',
  '*': 'asterisk',
}

const horizontalRuleCreator = node => ([, , type]) => ({
  ...node('norizontal-rule'),
  type: typeNames[type],
  parse(h) {
    const { type } = this
    return h('hr', { class: type })
  }
})


const horizontalRule = middleware({
  version,
  name: 'hr',
  input: 'block',
  parse: ({ lexical }, node) => {
    const patt = /^[ \t]*(([-_*])(?:[ \t]*\2){2,})[ \t]*(?:\n|$)/mg;
    return lexical.match(patt, block(node), horizontalRuleCreator(node))
  },
});

export default combine(normalize, horizontalRule)
