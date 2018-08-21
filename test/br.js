import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { br } from '../src'


test.before(t => {
  t.context.parse = md()
    .use(br())
    .parse
})

test(
  'parse hr syntax',
  parse,
  'nihaonihao  \nnext line',
  '<p>nihaonihao<br />next line</p>'
)
