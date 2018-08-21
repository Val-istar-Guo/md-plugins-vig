import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { blockquote } from '../src'


test.before(t => {
  t.context.parse = md()
    .use(blockquote())
    .parse
})

test(
  'parse blockquote syntax',
  parse,
  '> aaaa',
  '<blockquote><p>aaaa</p></blockquote>'
)
