import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { normalize, coseLineCode } from '../src'


test.before(t => {
  t.context.parse = md()
    .use(normalize())
    .use(coseLineCode())
    .parse
})

test(
  'parse cose line code syntax',
  parse,
  '```\n/** i am code */\n```',
  '<pre><code>/** i am code */</code></pre>'
)
