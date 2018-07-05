import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { normalize, paragraph, br, splitChar } from '../src'


test.before(t => {
  t.context.parse = md()
    .use(normalize())
    .use(paragraph())
    .use(br())
    .use(splitChar())
    .parse
})

test(
  'parse hr syntax',
  parse,
  'nihaonihao  \nnext line',
  '<p>nihaonihao<br />next line</p>'
)
