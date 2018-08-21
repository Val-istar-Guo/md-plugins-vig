import test from 'ava'
import md from 'md-core'
import { parse } from './macros'
import { hr } from '../src'


test.before(t => {
  t.context.parse = md()
    .use(hr())
    .parse
})

test(
  'parse hr syntax written with dash',
  parse,
  '---------',
  '<hr class="dash" />'
)

test.todo(
  'parse hr syntax written with equal sign'
)
