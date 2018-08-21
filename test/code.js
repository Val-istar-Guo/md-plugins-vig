import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { code } from '../src'


test.before(t => {
  t.context.parse = md()
    .use(code())
    .parse
})

test(
  'parse code syntax',
  parse,
  '    /** i am code */',
  '<pre><code>/** i am code */</code></pre>'
)
