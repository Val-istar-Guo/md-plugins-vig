import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { normalize, blockquote, paragraph } from '../src'


test.before(t => {
  t.context.parse = md()
    .use(normalize())
    .use(blockquote())
    .use(paragraph())
    .parse
})

test(
  'parse blockquote syntax',
  parse,
  '> aaaa',
  '<blockquote><p>aaaa</p></blockquote>'
)
